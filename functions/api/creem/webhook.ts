import { eq } from "drizzle-orm";
import { getDb } from "../../../server/db";
import { subscriptions, users } from "../../../drizzle/schema";
import { buildRuntimeEnv } from "../../../server/_core/env";
import {
  getCreemEventObject,
  getCreemEventType,
  type CreemWebhookEvent,
  verifyCreemSignature,
} from "../../../server/creem";
import { getPlanByCreemProductId, type PlanId } from "../../../server/products";

type PagesContext = {
  request: Request;
  env: Record<string, unknown>;
};

function asRecord(value: unknown) {
  return value && typeof value === "object"
    ? (value as Record<string, unknown>)
    : {};
}

function asString(value: unknown) {
  return typeof value === "string" ? value : "";
}

function numberFromString(value: string) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : null;
}

function getMetadata(object: Record<string, unknown>) {
  return asRecord(object.metadata);
}

function getNestedId(object: Record<string, unknown>, key: string) {
  const value = object[key];
  if (typeof value === "string") return value;
  return asString(asRecord(value).id);
}

function getSubscriptionId(object: Record<string, unknown>) {
  return (
    getNestedId(object, "subscription") ||
    asString(object.subscription_id) ||
    asString(object.id)
  );
}

function getProductId(object: Record<string, unknown>) {
  return (
    getNestedId(object, "product") ||
    asString(object.product_id) ||
    asString(asRecord(object.order).product)
  );
}

function getCustomerId(object: Record<string, unknown>) {
  return (
    getNestedId(object, "customer") ||
    asString(object.customer_id) ||
    asString(asRecord(object.order).customer)
  );
}

function getUserId(object: Record<string, unknown>) {
  const metadata = getMetadata(object);
  const direct = asString(metadata.user_id) || asString(metadata.userId);
  if (direct) return numberFromString(direct);

  const subscription = asRecord(object.subscription);
  const subMetadata = getMetadata(subscription);
  const nested = asString(subMetadata.user_id) || asString(subMetadata.userId);
  return nested ? numberFromString(nested) : null;
}

function getPlanId(object: Record<string, unknown>) {
  const metadata = getMetadata(object);
  const planId = asString(metadata.plan_id) || asString(metadata.planId);
  return planId as PlanId | "";
}

export async function onRequestPost(context: PagesContext) {
  const env = buildRuntimeEnv(context.env);
  const body = await context.request.text();
  const signature = context.request.headers.get("creem-signature");

  const isValid = await verifyCreemSignature(
    body,
    signature,
    env.CREEM_WEBHOOK_SECRET
  );
  if (!isValid) {
    return Response.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  const db = await getDb(env);
  if (!db) {
    return Response.json({ received: true });
  }

  let event: CreemWebhookEvent;
  try {
    event = JSON.parse(body) as CreemWebhookEvent;
  } catch (error) {
    return Response.json(
      { error: `Invalid webhook body: ${String(error)}` },
      { status: 400 }
    );
  }

  const eventType = getCreemEventType(event);
  const object = getCreemEventObject(event);

  try {
    switch (eventType) {
      case "checkout.completed":
      case "subscription.active":
      case "subscription.paid":
      case "subscription.trialing": {
        const userId = getUserId(object);
        const productId = getProductId(object);
        const subscriptionId = getSubscriptionId(object);
        const plan =
          getPlanId(object) || getPlanByCreemProductId(productId, env)?.id || "";

        if (!userId || !subscriptionId || !plan) break;

        const paidPlan = plan.startsWith("pro") ? "pro" : "student";
        const billingCycle = plan.endsWith("annual") ? "annual" : "monthly";

        const existing = await db
          .select()
          .from(subscriptions)
          .where(eq(subscriptions.userId, userId))
          .limit(1);

        if (existing.length > 0) {
          await db
            .update(subscriptions)
            .set({
              stripeSubscriptionId: subscriptionId,
              plan: paidPlan as "student" | "pro",
              billingCycle: billingCycle as "monthly" | "annual",
              status: eventType === "subscription.trialing" ? "trialing" : "active",
              cancelAtPeriodEnd: false,
            })
            .where(eq(subscriptions.userId, userId));
        } else {
          await db.insert(subscriptions).values({
            userId,
            stripeSubscriptionId: subscriptionId,
            plan: paidPlan as "student" | "pro",
            billingCycle: billingCycle as "monthly" | "annual",
            status: eventType === "subscription.trialing" ? "trialing" : "active",
          });
        }

        const customerId = getCustomerId(object);
        if (customerId) {
          await db
            .update(users)
            .set({ stripeCustomerId: customerId })
            .where(eq(users.id, userId));
        }

        break;
      }
      case "subscription.canceled":
      case "subscription.expired": {
        const subscriptionId = getSubscriptionId(object);
        if (subscriptionId) {
          await db
            .update(subscriptions)
            .set({ status: "canceled", plan: "free" })
            .where(eq(subscriptions.stripeSubscriptionId, subscriptionId));
        }
        break;
      }
      case "subscription.update":
      case "subscription.paused": {
        const subscriptionId = getSubscriptionId(object);
        if (subscriptionId) {
          await db
            .update(subscriptions)
            .set({
              status: eventType === "subscription.paused" ? "past_due" : "active",
            })
            .where(eq(subscriptions.stripeSubscriptionId, subscriptionId));
        }
        break;
      }
    }
  } catch (error) {
    return Response.json(
      { error: `Webhook handling failed: ${String(error)}` },
      { status: 500 }
    );
  }

  return Response.json({ received: true });
}

