// CorePapers Subscription Plans
// These price IDs should be created in your Stripe Dashboard
// and referenced here for consistency across the codebase.

export const PLANS = {
  student_monthly: {
    id: "student_monthly",
    name: "Student Plan (Monthly)",
    price: 7.9,
    currency: "usd",
    interval: "month" as const,
    // Replace with actual Stripe Price ID from your dashboard
    stripePriceId: process.env.STRIPE_STUDENT_MONTHLY_PRICE_ID ?? "",
    features: [
      "Unlimited AI essay polishes",
      "Up to 2,000 words per polish",
      "Full academic phrase library",
      "Unlimited citation generation",
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
    stripePriceId: process.env.STRIPE_STUDENT_ANNUAL_PRICE_ID ?? "",
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
    stripePriceId: process.env.STRIPE_PRO_MONTHLY_PRICE_ID ?? "",
    features: [
      "Everything in Student, plus:",
      "Up to 10,000 words per polish",
      "Priority AI processing",
      "Advanced writing analytics",
      "Export to Word/PDF",
      "Team collaboration",
      "API access",
    ],
  },
  pro_annual: {
    id: "pro_annual",
    name: "Pro Plan (Annual)",
    price: 99,
    currency: "usd",
    interval: "year" as const,
    stripePriceId: process.env.STRIPE_PRO_ANNUAL_PRICE_ID ?? "",
    features: [
      "Everything in Pro Monthly",
      "Save $79.80 vs monthly billing",
    ],
  },
} as const;

export type PlanId = keyof typeof PLANS;
