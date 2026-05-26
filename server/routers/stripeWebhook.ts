import express, { type Express } from "express";
import Stripe from "stripe";
import { getDb } from "../db";
import { subscriptions, users } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

export function registerStripeWebhook(app: Express) {
  app.post(
    "/api/stripe/webhook",
    express.raw({ type: "application/json" }),
    async (req, res) => {
      const stripeKey = process.env.STRIPE_SECRET_KEY;
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

      if (!stripeKey || !webhookSecret) {
        console.warn("[Stripe Webhook] Stripe not configured, skipping");
        return res.json({ received: true });
      }

      const stripe = new Stripe(stripeKey, { apiVersion: "2026-04-22.dahlia" });
      const sig = req.headers["stripe-signature"];

      let event: Stripe.Event;

      try {
        event = stripe.webhooks.constructEvent(req.body, sig as string, webhookSecret);
      } catch (err) {
        console.error("[Stripe Webhook] Signature verification failed:", err);
        return res.status(400).json({ error: "Webhook signature verification failed" });
      }

      console.log(`[Stripe Webhook] Event: ${event.type} (${event.id})`);

      // Handle test events
      if (event.id.startsWith("evt_test_")) {
        console.log("[Stripe Webhook] Test event detected, returning verification response");
        return res.json({ verified: true });
      }

      const db = await getDb();
      if (!db) {
        console.warn("[Stripe Webhook] Database unavailable");
        return res.json({ received: true });
      }

      try {
        switch (event.type) {
          case "checkout.session.completed": {
            const session = event.data.object as Stripe.Checkout.Session;
            const userId = session.metadata?.user_id
              ? parseInt(session.metadata.user_id)
              : null;
            const planId = session.metadata?.plan_id ?? "";
            const subscriptionId = session.subscription as string | null;

            if (!userId || !subscriptionId) break;

            const plan = planId.startsWith("pro") ? "pro" : "student";
            const billingCycle = planId.endsWith("annual") ? "annual" : "monthly";

            // Upsert subscription record
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
                  plan: plan as "student" | "pro",
                  billingCycle: billingCycle as "monthly" | "annual",
                  status: "active",
                  cancelAtPeriodEnd: false,
                })
                .where(eq(subscriptions.userId, userId));
            } else {
              await db.insert(subscriptions).values({
                userId,
                stripeSubscriptionId: subscriptionId,
                plan: plan as "student" | "pro",
                billingCycle: billingCycle as "monthly" | "annual",
                status: "active",
              });
            }

            // Update stripe customer ID on user if available
            if (session.customer) {
              await db
                .update(users)
                .set({ stripeCustomerId: session.customer as string })
                .where(eq(users.id, userId));
            }

            console.log(`[Stripe Webhook] Subscription activated for user ${userId}: ${plan} ${billingCycle}`);
            break;
          }

          case "customer.subscription.updated": {
            const sub = event.data.object as Stripe.Subscription;
            const existing = await db
              .select()
              .from(subscriptions)
              .where(eq(subscriptions.stripeSubscriptionId, sub.id))
              .limit(1);

            if (existing.length > 0) {
                  const periodStart = (sub as unknown as { current_period_start?: number }).current_period_start;
                  const periodEnd = (sub as unknown as { current_period_end?: number }).current_period_end;
                  await db
                .update(subscriptions)
                .set({
                  status: sub.status as "active" | "canceled" | "past_due" | "trialing" | "incomplete",
                  cancelAtPeriodEnd: sub.cancel_at_period_end,
                  currentPeriodStart: periodStart ? new Date(periodStart * 1000) : undefined,
                  currentPeriodEnd: periodEnd ? new Date(periodEnd * 1000) : undefined,
                })
                .where(eq(subscriptions.stripeSubscriptionId, sub.id));
            }
            break;
          }

          case "customer.subscription.deleted": {
            const sub = event.data.object as Stripe.Subscription;
            await db
              .update(subscriptions)
              .set({ status: "canceled", plan: "free" })
              .where(eq(subscriptions.stripeSubscriptionId, sub.id));
            console.log(`[Stripe Webhook] Subscription canceled: ${sub.id}`);
            break;
          }

          case "invoice.payment_failed": {
            const invoice = event.data.object as Stripe.Invoice;
            const subId = (invoice as unknown as { subscription?: string }).subscription ?? null;
            if (subId) {
              await db
                .update(subscriptions)
                .set({ status: "past_due" })
                .where(eq(subscriptions.stripeSubscriptionId, subId));
            }
            break;
          }

          default:
            console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
        }
      } catch (err) {
        console.error("[Stripe Webhook] Error processing event:", err);
      }

      res.json({ received: true });
    }
  );
}
