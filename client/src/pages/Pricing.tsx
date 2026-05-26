import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SEOHead from "@/components/SEOHead";
import { CheckCircle2, X, ArrowRight, GraduationCap, Zap, Star, Loader2 } from "lucide-react";
import { getLoginUrl } from "@/const";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";

const PLANS = [
  {
    id: "free",
    name: "Free",
    icon: "✦",
    monthlyPrice: 0,
    annualPrice: 0,
    description: "Perfect for trying out CorePapers",
    cta: "Start Free",
    ctaHref: getLoginUrl(),
    highlight: false,
    badge: null,
    features: [
      { text: "5 AI essay polishes per day", included: true },
      { text: "Up to 300 words per polish", included: true },
      { text: "Basic grammar suggestions", included: true },
      { text: "Academic phrase library (limited)", included: true },
      { text: "Citation generator (3/day)", included: true },
      { text: "Save writing sessions", included: false },
      { text: "Unlimited word count", included: false },
      { text: "Discipline-specific polish", included: false },
      { text: "Priority AI processing", included: false },
      { text: "Writing history & analytics", included: false },
    ],
  },
  {
    id: "student",
    name: "Student",
    icon: "🎓",
    monthlyPrice: 7.9,
    annualPrice: 59,
    description: "For international students who write regularly",
    cta: "Get Student Plan",
    ctaHref: getLoginUrl(),
    highlight: true,
    badge: "Most Popular",
    eduBadge: true,
    features: [
      { text: "Unlimited AI essay polishes", included: true },
      { text: "Up to 2,000 words per polish", included: true },
      { text: "Advanced non-native expression detection", included: true },
      { text: "Full academic phrase library", included: true },
      { text: "Unlimited citation generation", included: true },
      { text: "Save writing sessions", included: true },
      { text: "Discipline-specific polish (STEM/SS/Humanities)", included: true },
      { text: "Writing history & analytics", included: true },
      { text: "Priority AI processing", included: false },
      { text: "API access", included: false },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    icon: "⚡",
    monthlyPrice: 14.9,
    annualPrice: 99,
    description: "For researchers, PhD students & professionals",
    cta: "Get Pro",
    ctaHref: getLoginUrl(),
    highlight: false,
    badge: null,
    features: [
      { text: "Everything in Student, plus:", included: true },
      { text: "Up to 10,000 words per polish", included: true },
      { text: "Priority AI processing (2× faster)", included: true },
      { text: "Advanced writing analytics dashboard", included: true },
      { text: "Plagiarism-aware suggestions", included: true },
      { text: "Export to Word / PDF", included: true },
      { text: "Team collaboration (up to 3 users)", included: true },
      { text: "API access for integrations", included: true },
      { text: "Dedicated support", included: true },
      { text: "Early access to new features", included: true },
    ],
  },
];

const FAQ = [
  {
    q: "How is CorePapers different from Grammarly?",
    a: "Grammarly checks general grammar. CorePapers specifically targets non-native English patterns — like Chinglish, Spanish-influenced phrasing, or direct translations — and explains why each change improves your academic writing. We're built for international students, not general users.",
  },
  {
    q: "Do I get a discount with a .edu email?",
    a: "Yes! Verify your .edu email address to unlock an additional 20% discount on any paid plan. This is our way of supporting students at accredited universities.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Absolutely. You can cancel your subscription at any time from your dashboard. You'll retain access until the end of your billing period.",
  },
  {
    q: "Is there a free trial for paid plans?",
    a: "Our Free plan gives you a generous taste of CorePapers with no credit card required. If you upgrade and aren't satisfied within 7 days, we offer a full refund.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit and debit cards through our secure Creem checkout. All transactions are secured with bank-level encryption.",
  },
  {
    q: "How does the annual plan save me money?",
    a: "Annual plans save you approximately 38% compared to monthly billing. Student annual is $59/year (vs $94.8/year monthly), and Pro annual is $99/year (vs $178.8/year monthly).",
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  const createCheckout = trpc.payment.createCheckout.useMutation({
    onSuccess: ({ url }) => {
      if (url) {
        window.open(url, '_blank');
      }
      setCheckoutLoading(null);
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to start checkout. Please try again.');
      setCheckoutLoading(null);
    },
  });

  const handleUpgrade = (planId: string) => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }
    const checkoutPlanId = annual
      ? (planId === 'student' ? 'student_annual' : 'pro_annual')
      : (planId === 'student' ? 'student_monthly' : 'pro_monthly');
    setCheckoutLoading(checkoutPlanId);
    toast.info('Redirecting to secure checkout...');
    createCheckout.mutate({ planId: checkoutPlanId as 'student_monthly' | 'student_annual' | 'pro_monthly' | 'pro_annual', origin: window.location.origin });
  };

  return (
    <>
      <SEOHead
        title="Pricing – Affordable Academic Writing Plans for Students"
        description="CorePapers starts at $7.9/month for students — 68% cheaper than Paperpal ($25/mo). Free plan available. No credit card required. .edu email discount."
        keywords="academic writing tool pricing, cheap essay writing assistant, student writing app price, affordable Grammarly alternative, Paperpal alternative cheaper"
        canonical="/pricing"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />

      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-sans font-medium mb-4">
              <Star size={13} className="fill-primary" />
              Transparent Pricing
            </div>
            <h1 className="font-serif font-light text-4xl sm:text-5xl text-slate-purple mb-4">
              Academic Quality,
              <span className="italic"> Student Budget</span>
            </h1>
            <p className="text-muted-foreground font-sans max-w-lg mx-auto leading-relaxed mb-8">
              Starting at <strong className="text-foreground">$7.9/month</strong> — significantly more affordable than Paperpal ($25/mo) or Writefull ($150/yr).
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-3 bg-secondary rounded-xl p-1.5">
              <button
                onClick={() => setAnnual(false)}
                className={`px-5 py-2 rounded-lg text-sm font-sans font-medium transition-all ${
                  !annual ? "bg-white shadow-card text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setAnnual(true)}
                className={`px-5 py-2 rounded-lg text-sm font-sans font-medium transition-all flex items-center gap-2 ${
                  annual ? "bg-white shadow-card text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Annual
                <Badge className="bg-emerald-100 text-emerald-700 border-0 text-xs font-sans">Save 38%</Badge>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
            {PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-2xl border p-8 flex flex-col transition-all ${
                  plan.highlight
                    ? "border-primary bg-primary/5 shadow-soft scale-[1.02]"
                    : "border-border bg-white"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-white border-0 font-sans px-3 py-1 shadow-soft">
                      {plan.badge}
                    </Badge>
                  </div>
                )}

                <div className="mb-6">
                  <div className="text-2xl mb-3">{plan.icon}</div>
                  <h2 className="font-serif font-medium text-2xl text-slate-purple mb-1">{plan.name}</h2>
                  <p className="text-xs text-muted-foreground font-sans">{plan.description}</p>
                </div>

                <div className="mb-6">
                  {plan.monthlyPrice === 0 ? (
                    <div className="font-serif text-5xl font-light text-slate-purple">Free</div>
                  ) : (
                    <>
                      <div className="flex items-end gap-1">
                        <span className="font-serif text-5xl font-light text-slate-purple">
                          ${annual ? (plan.annualPrice / 12).toFixed(2) : plan.monthlyPrice}
                        </span>
                        <span className="text-muted-foreground font-sans text-sm mb-2">/month</span>
                      </div>
                      {annual && (
                        <p className="text-xs text-muted-foreground font-sans mt-1">
                          Billed as <strong>${plan.annualPrice}/year</strong>
                          <span className="ml-2 text-emerald-600">
                            (save ${((plan.monthlyPrice * 12) - plan.annualPrice).toFixed(0)})
                          </span>
                        </p>
                      )}
                    </>
                  )}

                  {plan.eduBadge && (
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-primary font-sans">
                      <GraduationCap size={13} />
                      <span>Extra 20% off with .edu email</span>
                    </div>
                  )}
                </div>

                {plan.id === 'free' ? (
                  <Button
                    asChild
                    className="mb-6 py-5 text-base font-sans rounded-xl bg-secondary text-foreground border border-border hover:bg-secondary/80"
                  >
                    <a href={getLoginUrl()}>
                      {plan.cta}
                      <ArrowRight size={16} className="ml-2" />
                    </a>
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleUpgrade(plan.id)}
                    disabled={checkoutLoading !== null}
                    className={`mb-6 py-5 text-base font-sans rounded-xl w-full ${
                      plan.highlight
                        ? "bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90"
                        : "bg-secondary text-foreground border border-border hover:bg-secondary/80"
                    }`}
                  >
                    {checkoutLoading && checkoutLoading.startsWith(plan.id) ? (
                      <><Loader2 size={16} className="animate-spin mr-2" />Processing...</>
                    ) : (
                      <>{plan.cta}<ArrowRight size={16} className="ml-2" /></>
                    )}
                  </Button>
                )}

                <ul className="space-y-3 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm font-sans">
                      {feature.included ? (
                        <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X size={16} className="text-muted-foreground/40 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={feature.included ? "text-foreground" : "text-muted-foreground/60"}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Competitor Comparison */}
          <div className="max-w-3xl mx-auto mb-16 p-6 bg-white border border-border rounded-2xl">
            <h3 className="font-serif font-medium text-xl text-slate-purple mb-4 text-center">
              How We Compare
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-sans">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 text-muted-foreground font-medium">Tool</th>
                    <th className="py-3 text-center text-muted-foreground font-medium">Monthly</th>
                    <th className="py-3 text-center text-muted-foreground font-medium">Annual</th>
                    <th className="py-3 text-center text-muted-foreground font-medium">ESL-Focused</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "CorePapers Student", monthly: "$7.9", annual: "$59", esl: true, highlight: true },
                    { name: "CorePapers Pro", monthly: "$14.9", annual: "$99", esl: true, highlight: true },
                    { name: "Grammarly Premium", monthly: "$30", annual: "$144", esl: false, highlight: false },
                    { name: "Paperpal", monthly: "$25", annual: "$199", esl: false, highlight: false },
                    { name: "Writefull", monthly: "N/A", annual: "$150", esl: false, highlight: false },
                  ].map((row) => (
                    <tr key={row.name} className={`border-b border-border/50 ${row.highlight ? "bg-primary/5" : ""}`}>
                      <td className={`py-3 font-medium ${row.highlight ? "text-primary" : "text-foreground"}`}>{row.name}</td>
                      <td className="py-3 text-center">{row.monthly}</td>
                      <td className="py-3 text-center">{row.annual}</td>
                      <td className="py-3 text-center">
                        {row.esl ? (
                          <CheckCircle2 size={16} className="text-emerald-500 mx-auto" />
                        ) : (
                          <X size={16} className="text-muted-foreground/40 mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ */}
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif font-light text-3xl text-slate-purple text-center mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {FAQ.map((item, i) => (
                <div key={i} className="bg-white border border-border rounded-xl overflow-hidden">
                  <button
                    className="w-full p-5 text-left flex items-center justify-between gap-4"
                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  >
                    <span className="font-sans font-medium text-foreground text-sm">{item.q}</span>
                    <span className="text-muted-foreground text-lg flex-shrink-0">
                      {expandedFaq === i ? "−" : "+"}
                    </span>
                  </button>
                  {expandedFaq === i && (
                    <div className="px-5 pb-5 text-sm text-muted-foreground font-sans leading-relaxed border-t border-border pt-4">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center mt-16">
            <p className="text-muted-foreground font-sans mb-4">Still not sure? Start with our free plan — no credit card required.</p>
            <Button asChild size="lg" className="bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90 px-10 py-6 text-base rounded-xl">
              <a href={getLoginUrl()}>
                Start Free Today <ArrowRight size={18} className="ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
