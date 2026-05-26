import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { subscriptions } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import { createCreemCheckout, cancelCreemSubscription } from "../creem";
import { assertCreemProductId, getPlan, getPlans, type PlanId } from "../products";

export const paymentRouter = router({
  createCheckout: protectedProcedure
    .input(
      z.object({
        planId: z.enum(["student_monthly", "student_annual", "pro_monthly", "pro_annual"]),
        origin: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const plan = getPlan(input.planId as PlanId, ctx.env);
      const creemProductId = assertCreemProductId(
        plan.name,
        plan.creemProductEnv,
        plan.creemProductId
      );

      const url = await createCreemCheckout(ctx.env, {
        productId: creemProductId,
        planId: input.planId,
        origin: input.origin,
        user: ctx.user,
      });

      return { url };
    }),

  getSubscription: protectedProcedure.query(async ({ ctx }) => {
    const db = ctx.db;
    if (!db) return null;

    const result = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, ctx.user.id))
      .limit(1);

    return result[0] ?? null;
  }),

  cancelSubscription: protectedProcedure.mutation(async ({ ctx }) => {
    const db = ctx.db;
    if (!db) throw new Error("Database unavailable");

    const result = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, ctx.user.id))
      .limit(1);

    const sub = result[0];
    if (!sub?.stripeSubscriptionId) throw new Error("No active subscription found");

    await cancelCreemSubscription(ctx.env, sub.stripeSubscriptionId);

    await db
      .update(subscriptions)
      .set({ cancelAtPeriodEnd: true })
      .where(eq(subscriptions.userId, ctx.user.id));

    return { success: true };
  }),

  getPlans: publicProcedure.query(({ ctx }) => {
    return getPlans(ctx.env).map((plan) => ({
      id: plan.id,
      name: plan.name,
      price: plan.price,
      currency: plan.currency,
      interval: plan.interval,
    }));
  }),
});
