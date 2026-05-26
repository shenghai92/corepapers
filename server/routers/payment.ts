import { z } from "zod";
import Stripe from "stripe";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { subscriptions, users } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import { PLANS, type PlanId } from "../products";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("Stripe not configured");
  return new Stripe(key, { apiVersion: "2025-04-30.basil" });
}

export const paymentRouter = router({
  createCheckout: protectedProcedure
    .input(
      z.object({
        planId: z.enum(["student_monthly", "student_annual", "pro_monthly", "pro_annual"]),
        origin: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const stripe = getStripe();
      const plan = PLANS[input.planId as PlanId];

      if (!plan.stripePriceId) {
        throw new Error("This plan is not yet configured. Please contact support.");
      }

      // Get or create Stripe customer
      const db = await getDb();
      let stripeCustomerId = ctx.user.stripeCustomerId;

      if (!stripeCustomerId) {
        const customer = await stripe.customers.create({
          email: ctx.user.email ?? undefined,
          name: ctx.user.name ?? undefined,
          metadata: { userId: ctx.user.id.toString() },
        });
        stripeCustomerId = customer.id;

        if (db) {
          await db
            .update(users)
            .set({ stripeCustomerId })
            .where(eq(users.id, ctx.user.id));
        }
      }

      const session = await stripe.checkout.sessions.create({
        customer: stripeCustomerId,
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [{ price: plan.stripePriceId, quantity: 1 }],
        allow_promotion_codes: true,
        success_url: `${input.origin}/dashboard?payment=success&plan=${input.planId}`,
        cancel_url: `${input.origin}/pricing?payment=canceled`,
        client_reference_id: ctx.user.id.toString(),
        metadata: {
          user_id: ctx.user.id.toString(),
          plan_id: input.planId,
          customer_email: ctx.user.email ?? "",
          customer_name: ctx.user.name ?? "",
        },
      });

      return { url: session.url };
    }),

  getSubscription: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return null;

    const result = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, ctx.user.id))
      .limit(1);

    return result[0] ?? null;
  }),

  cancelSubscription: protectedProcedure.mutation(async ({ ctx }) => {
    const stripe = getStripe();
    const db = await getDb();
    if (!db) throw new Error("Database unavailable");

    const result = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, ctx.user.id))
      .limit(1);

    const sub = result[0];
    if (!sub?.stripeSubscriptionId) throw new Error("No active subscription found");

    await stripe.subscriptions.update(sub.stripeSubscriptionId, {
      cancel_at_period_end: true,
    });

    await db
      .update(subscriptions)
      .set({ cancelAtPeriodEnd: true })
      .where(eq(subscriptions.userId, ctx.user.id));

    return { success: true };
  }),

  getPlans: publicProcedure.query(() => {
    return Object.entries(PLANS).map(([id, plan]) => ({
      id,
      name: plan.name,
      price: plan.price,
      currency: plan.currency,
      interval: plan.interval,
    }));
  }),
});
