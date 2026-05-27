import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SEOHead from "@/components/SEOHead";
import { CheckCircle2, X, ArrowRight, GraduationCap, Star, Loader2 } from "lucide-react";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";
import { Link } from "wouter";

const PLANS = [
  {
    id: "free",
    name: "Free",
    label: "Starter",
    monthlyPrice: 0,
    annualPrice: 0,
    description: "A simple starting point for trying CorePapers",
    cta: "Start Free",
    highlight: false,
    features: [
      { text: "5 AI essay polishes per day", included: true },
      { text: "Up to 300 words per polish", included: true },
      { text: "Basic grammar suggestions", included: true },
      { text: "Academic phrase library (limited)", included: true },
      { text: "Citation generator (3 per day)", included: true },
      { text: "Save writing sessions", included: false },
    ],
  },
  {
    id: "student",
    name: "Student",
    label: "Most Popular",
    monthlyPrice: 7.9,
    annualPrice: 59,
    description: "For international students who write regularly",
    cta: "Get Student Plan",
    highlight: true,
    eduBadge: true,
    features: [
      { text: "Unlimited AI essay polishes", included: true },
      { text: "Up to 2,000 words per polish", included: true },
      { text: "Advanced non-native expression detection", included: true },
      { text: "Full academic phrase library", included: true },
      { text: "Unlimited citation generation", included: true },
      { text: "Save writing sessions", included: true },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    label: "Research",
    monthlyPrice: 14.9,
    annualPrice: 99,
    description: "For researchers, PhD students, and advanced users",
    cta: "Get Pro",
    highlight: false,
    features: [
      { text: "Everything in Student", included: true },
      { text: "Up to 10,000 words per polish", included: true },
      { text: "Priority AI processing", included: true },
      { text: "Advanced writing analytics", included: true },
      { text: "Export options", included: true },
      { text: "Dedicated support", included: true },
    ],
  },
];

const FAQ = [
  {
    q: "How is CorePapers different from Grammarly?",
    a: "Grammarly focuses on general writing feedback. CorePapers is built around non-native English academic writing, including phrasing issues, academic tone, and student-friendly support.",
  },
  {
    q: "Do I get a discount with a .edu email?",
    a: "Yes. Verified .edu users can unlock an additional student discount on paid plans.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. You can cancel at any time and keep access through the end of the billing period.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes. The free plan lets you try essay polishing, citations, and the phrase library without entering a card.",
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
        window.location.href = url;
        return;
      }
      setCheckoutLoading(null);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to start checkout. Please try again.");
      setCheckoutLoading(null);
    },
  });

  const handleUpgrade = (planId: string) => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }
    const checkoutPlanId = annual
      ? planId === "student"
        ? "student_annual"
        : "pro_annual"
      : planId === "student"
        ? "student_monthly"
        : "pro_monthly";
    setCheckoutLoading(checkoutPlanId);
    toast.info("Redirecting to secure checkout...");
    createCheckout.mutate({
      planId: checkoutPlanId as "student_monthly" | "student_annual" | "pro_monthly" | "pro_annual",
      origin: window.location.origin,
    });
  };

  return (
    <>
      <SEOHead
        title="Pricing for International Student Writing Support"
        description="Compare CorePapers plans for essay polishing, citation generation, and academic phrase support. Free plan available, with affordable options for students and researchers."
        keywords="academic writing tool pricing, essay polish pricing, citation tool pricing, international student writing app, affordable academic writing assistant"
        canonical="/pricing"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "CorePapers",
            applicationCategory: "EducationalApplication",
            operatingSystem: "Web",
            offers: [
              { "@type": "Offer", name: "Free", price: "0", priceCurrency: "USD" },
              { "@type": "Offer", name: "Student", price: "7.9", priceCurrency: "USD" },
              { "@type": "Offer", name: "Pro", price: "14.9", priceCurrency: "USD" },
            ],
          },
        ]}
      />

      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-sans font-medium mb-4">
              <Star size={13} className="fill-primary" />
              Transparent Pricing
            </div>
            <h1 className="font-serif font-light text-4xl sm:text-5xl text-slate-purple mb-4">
              Academic support
              <span className="italic"> at student-friendly prices</span>
            </h1>
            <p className="text-muted-foreground font-sans max-w-lg mx-auto leading-relaxed mb-8">
              Choose a plan for polishing, phrase support, and citation help without overpaying for general-purpose writing software. Start free when you are testing, then upgrade when your assignments become regular.
            </p>

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

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
            {PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-2xl border p-8 flex flex-col transition-all ${
                  plan.highlight ? "border-primary bg-primary/5 shadow-soft scale-[1.02]" : "border-border bg-white"
                }`}
              >
                <div className="mb-6">
                  <div className="text-xs font-sans font-semibold uppercase tracking-wide text-primary mb-3">{plan.label}</div>
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
                      {annual && <p className="text-xs text-muted-foreground font-sans mt-1">Billed as ${plan.annualPrice}/year</p>}
                    </>
                  )}

                  {plan.eduBadge && (
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-primary font-sans">
                      <GraduationCap size={13} />
                      <span>Extra student discount with .edu email</span>
                    </div>
                  )}

                  {plan.id === "free" && (
                    <p className="mt-3 text-xs text-muted-foreground font-sans">
                      Best for trying short real assignments before you commit.
                    </p>
                  )}
                  {plan.id === "student" && (
                    <p className="mt-3 text-xs text-muted-foreground font-sans">
                      Best for weekly coursework, essay revision, and regular citation use.
                    </p>
                  )}
                  {plan.id === "pro" && (
                    <p className="mt-3 text-xs text-muted-foreground font-sans">
                      Best for longer research projects, thesis work, and heavier writing volume.
                    </p>
                  )}
                </div>

                {plan.id === "free" ? (
                  <Button asChild className="mb-6 py-5 text-base font-sans rounded-xl bg-secondary text-foreground border border-border hover:bg-secondary/80">
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
                      <>
                        <Loader2 size={16} className="animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        {plan.cta}
                        <ArrowRight size={16} className="ml-2" />
                      </>
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
                      <span className={feature.included ? "text-foreground" : "text-muted-foreground/60"}>{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="max-w-5xl mx-auto mb-16 grid md:grid-cols-3 gap-5">
            {[
              {
                title: "Stay on Free if...",
                desc: "you only polish short passages occasionally, generate a few citations, and want to explore the workflow before committing.",
              },
              {
                title: "Upgrade to Student if...",
                desc: "you revise essays every week, need higher word limits, and want citation help plus full phrase access in one place.",
              },
              {
                title: "Choose Pro if...",
                desc: "you are working on longer research papers, dissertation chapters, or heavier writing loads that need bigger limits.",
              },
            ].map((item) => (
              <div key={item.title} className="p-6 bg-white border border-border rounded-2xl">
                <h2 className="font-serif text-2xl text-slate-purple mb-3">{item.title}</h2>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif font-light text-3xl text-slate-purple text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {FAQ.map((item, i) => (
                <div key={i} className="bg-white border border-border rounded-xl overflow-hidden">
                  <button
                    className="w-full p-5 text-left flex items-center justify-between gap-4"
                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  >
                    <span className="font-sans font-medium text-foreground text-sm">{item.q}</span>
                    <span className="text-muted-foreground text-lg flex-shrink-0">{expandedFaq === i ? "-" : "+"}</span>
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

          <div className="text-center mt-16">
            <p className="text-muted-foreground font-sans mb-4">Start with the free plan if you want to explore before upgrading.</p>
            <Button asChild size="lg" className="bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90 px-10 py-6 text-base rounded-xl">
              <a href={getLoginUrl()}>
                Start Free Today <ArrowRight size={18} className="ml-2" />
              </a>
            </Button>
          </div>

          <div className="max-w-4xl mx-auto mt-10 grid sm:grid-cols-2 gap-4">
            <Link href="/polish" className="block">
              <div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30 hover:shadow-card transition-all">
                <h2 className="font-serif text-2xl text-slate-purple mb-2">See what the plans unlock</h2>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                  Try the essay polish workflow to see how free and paid usage limits map to real writing tasks.
                </p>
              </div>
            </Link>
            <Link href="/phrases" className="block">
              <div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30 hover:shadow-card transition-all">
                <h2 className="font-serif text-2xl text-slate-purple mb-2">Explore the phrase library</h2>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                  Browse the academic phrase library to understand what is included before you choose a plan.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
