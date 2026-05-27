import type { RuntimeEnv } from "./_core/env";

// CorePapers Subscription Plans. Creem product IDs are read from runtime env so
// Cloudflare bindings work the same way as local process.env.

export const PLANS = {
  student_monthly: {
    id: "student_monthly",
    name: "Student Plan (Monthly)",
    price: 7.9,
    currency: "usd",
    interval: "month" as const,
    creemProductEnv: "CREEM_STUDENT_MONTHLY_PRODUCT_ID",
    features: [
      "Up to 20,000 AI polish words per day",
      "Up to 2,000 words per polish",
      "Up to 30 polish runs per day",
      "Academic phrase library",
      "Up to 30 citation generations per day",
      "Save writing sessions",
      "Discipline-specific polish",
    ],
  },
  student_annual: {
    id: "student_annual",
    name: "Student Plan (Annual)",
    price: 59,
    currency: "usd",
    interval: "year" as const,
    creemProductEnv: "CREEM_STUDENT_ANNUAL_PRODUCT_ID",
    features: [
      "Everything in Student Monthly",
      "Save $35.80 vs monthly billing",
      "Priority support",
    ],
  },
  pro_monthly: {
    id: "pro_monthly",
    name: "Pro Plan (Monthly)",
    price: 14.9,
    currency: "usd",
    interval: "month" as const,
    creemProductEnv: "CREEM_PRO_MONTHLY_PRODUCT_ID",
    features: [
      "Everything in Student, plus:",
      "Up to 50,000 AI polish words per day",
      "Up to 5,000 words per polish",
      "Up to 80 polish runs per day",
      "Up to 80 citation generations per day",
    ],
  },
  pro_annual: {
    id: "pro_annual",
    name: "Pro Plan (Annual)",
    price: 99,
    currency: "usd",
    interval: "year" as const,
    creemProductEnv: "CREEM_PRO_ANNUAL_PRODUCT_ID",
    features: [
      "Everything in Pro Monthly",
      "Save $79.80 vs monthly billing",
    ],
  },
} as const;

export type PlanId = keyof typeof PLANS;
export type Plan = (typeof PLANS)[PlanId] & {
  creemProductId: string;
};

function readRuntimeValue(env: RuntimeEnv | undefined, key: string) {
  const runtimeValue = env?.[key as keyof RuntimeEnv];
  if (typeof runtimeValue === "string") return runtimeValue;
  return globalThis.process?.env?.[key] ?? "";
}

export function getPlan(planId: PlanId, env?: RuntimeEnv): Plan {
  const plan = PLANS[planId];
  return {
    ...plan,
    creemProductId: readRuntimeValue(env, plan.creemProductEnv),
  };
}

export function getPlans(env?: RuntimeEnv): Plan[] {
  return (Object.keys(PLANS) as PlanId[]).map((id) => getPlan(id, env));
}

export function assertCreemProductId(
  planName: string,
  creemProductEnv: string,
  creemProductId: string
) {
  const normalized = creemProductId.trim();

  if (!normalized) {
    throw new Error(
      `${planName} is not configured for Creem checkout. Set ${creemProductEnv} to a Creem product ID like prod_1234...`
    );
  }

  if (!normalized.startsWith("prod_")) {
    throw new Error(
      `${planName} has an invalid Creem product ID in ${creemProductEnv}: "${creemProductId}". Set it to the Creem product ID, not the display price text.`
    );
  }

  return normalized;
}

export function getPlanByCreemProductId(productId: string, env?: RuntimeEnv) {
  return getPlans(env).find((plan) => plan.creemProductId === productId);
}
