import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import SEOHead from "@/components/SEOHead";
import {
  Sparkles,
  BookOpen,
  Quote,
  CheckCircle2,
  ArrowRight,
  GraduationCap,
} from "lucide-react";

const FEATURES = [
  {
    icon: Sparkles,
    title: "AI Essay Polishing",
    desc: "Our AI identifies non-native expressions—Chinglish, Spanglish, and more—and rewrites them into fluent, academic English with full explanations.",
    href: "/polish",
    color: "bg-lavender-light",
    iconColor: "text-primary",
  },
  {
    icon: BookOpen,
    title: "Academic Phrase Library",
    desc: "Discipline-specific sentence templates for STEM, Social Sciences, and Humanities. Master hedging, boosting, and academic stance with one click.",
    href: "/phrases",
    color: "bg-blush-light",
    iconColor: "text-rose-500",
  },
  {
    icon: Quote,
    title: "Citation Generator",
    desc: "Generate perfect APA, MLA, Chicago, and IEEE citations instantly. Never lose marks over formatting errors again.",
    href: "/citations",
    color: "bg-mint-light",
    iconColor: "text-emerald-600",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Paste Your Text",
    desc: "Copy your draft essay or paragraph into CorePapers. Works with any academic writing—essays, reports, dissertations.",
  },
  {
    step: "02",
    title: "AI Analyzes & Polishes",
    desc: "Our AI detects non-native patterns, suggests academic vocabulary upgrades, and improves sentence variety—all in seconds.",
  },
  {
    step: "03",
    title: "Learn & Improve",
    desc: "Every suggestion comes with a clear explanation so you understand why the change improves your writing.",
  },
];

const PAIN_POINTS = [
  { icon: "🔴", before: "\"The research show that...\"", after: "\"The research demonstrates that...\"" },
  { icon: "🔴", before: "\"In my opinion, I think...\"", after: "\"This analysis suggests...\"" },
  { icon: "🔴", before: "\"Very important factor\"", after: "\"A critical determinant\"" },
  { icon: "🔴", before: "\"According to my knowledge\"", after: "\"Based on the existing literature\"" },
];

export default function Home() {
  return (
    <>
      <SEOHead
        title="AI Academic Writing Assistant for International Students"
        description="CorePapers helps non-native English speaking students write better academic papers. AI essay polishing, citation generator, and academic phrase library. Fix Chinglish, master academic English."
        keywords="academic writing assistant, ESL writing tool, essay polishing international students, non-native English writing, citation generator APA MLA, academic English improvement"
        canonical="/"
      />

      <main className="pt-16">
        {/* ── Hero Section ── */}
        <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-hero-gradient">
          {/* Decorative geometric elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-20 right-[10%] w-72 h-72 rounded-full bg-lavender/20 blur-3xl" />
            <div className="absolute bottom-20 left-[5%] w-56 h-56 rounded-full bg-blush/30 blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-mint/10 blur-3xl" />
            {/* Thin line decorations */}
            <div className="absolute top-32 left-[15%] w-px h-24 bg-gradient-to-b from-transparent via-lavender/40 to-transparent" />
            <div className="absolute bottom-40 right-[20%] w-px h-16 bg-gradient-to-b from-transparent via-blush/50 to-transparent" />
            <div className="absolute top-1/3 right-[8%] text-lavender/20 font-serif text-8xl select-none">〈〉</div>
          </div>

          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-border text-xs font-sans font-medium text-slate-purple mb-8 shadow-card">
                <GraduationCap size={14} />
                <span>Built for International Students at Top Universities</span>
              </div>

              {/* Headline */}
              <h1 className="font-serif font-light text-5xl sm:text-6xl lg:text-7xl text-slate-purple leading-tight mb-6">
                Write Academic English
                <br />
                <span className="italic font-normal">Like a Native Speaker</span>
              </h1>

              {/* Subheadline */}
              <p className="font-sans text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto tracking-wide">
                CorePapers uses AI to detect non-native expressions, upgrade your academic vocabulary, and generate perfect citations — so you can focus on your ideas, not your grammar.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <Button
                  asChild
                  size="lg"
                  className="bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90 transition-all duration-200 px-8 py-6 text-base font-sans font-medium rounded-xl"
                >
                  <a href={getLoginUrl()}>
                    Start Writing Free
                    <ArrowRight size={18} className="ml-2" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="bg-white/70 backdrop-blur-sm border-border text-foreground hover:bg-white px-8 py-6 text-base font-sans rounded-xl"
                >
                  <Link href="/polish">See It In Action</Link>
                </Button>
              </div>

              {/* Trust signals */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground font-sans">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-500" />
                  No credit card required
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-500" />
                  Free plan available
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-500" />
                  Student discount with .edu email
                </span>
              </div>
            </div>

            {/* Hero Demo Card */}
            <div className="mt-16 max-w-2xl mx-auto">
              <div className="glass-card rounded-2xl p-6 shadow-soft">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="ml-2 text-xs text-muted-foreground font-sans">CorePapers AI Polish</span>
                </div>
                <div className="space-y-3">
                  {PAIN_POINTS.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm">
                      <span className="text-base mt-0.5">{item.icon}</span>
                      <div className="flex-1 min-w-0">
                        <span className="line-through text-muted-foreground font-sans">{item.before}</span>
                        <span className="mx-2 text-muted-foreground">→</span>
                        <span className="text-emerald-700 font-medium font-sans">{item.after}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-border flex items-center gap-2 text-xs text-muted-foreground">
                  <Sparkles size={12} className="text-primary" />
                  <span className="font-sans">4 non-native expressions detected and improved</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Core Features ── */}
        <section className="py-24 bg-background" id="features">
          <div className="container">
            <div className="text-center mb-16">
              <p className="text-xs font-sans font-semibold tracking-widest uppercase text-primary mb-3">Core Tools</p>
              <h2 className="font-serif font-light text-4xl sm:text-5xl text-slate-purple mb-4">
                Everything You Need to
                <br />
                <span className="italic">Excel Academically</span>
              </h2>
              <p className="text-muted-foreground font-sans max-w-xl mx-auto leading-relaxed">
                Purpose-built for non-native English speakers navigating Western academic writing standards.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {FEATURES.map((feature) => (
                <Link
                  key={feature.title}
                  href={feature.href}
                  className="group block"
                >
                  <div className="h-full p-8 rounded-2xl bg-white border border-border hover:border-primary/30 hover:shadow-soft transition-all duration-300 cursor-pointer">
                    <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-6`}>
                      <feature.icon size={22} className={feature.iconColor} />
                    </div>
                    <h3 className="font-serif font-medium text-xl text-slate-purple mb-3 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-sans leading-relaxed mb-4">
                      {feature.desc}
                    </p>
                    <span className="text-xs font-sans font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                      Try it free <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── How It Works ── */}
        <section className="py-24 bg-hero-gradient">
          <div className="container">
            <div className="text-center mb-16">
              <p className="text-xs font-sans font-semibold tracking-widest uppercase text-primary mb-3">Simple Process</p>
              <h2 className="font-serif font-light text-4xl sm:text-5xl text-slate-purple mb-4">
                From Draft to
                <span className="italic"> Academic Excellence</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {HOW_IT_WORKS.map((step, i) => (
                <div key={step.step} className="relative text-center">
                  {i < HOW_IT_WORKS.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-lavender/40 to-transparent" />
                  )}
                  <div className="w-16 h-16 rounded-full bg-white/80 backdrop-blur-sm border border-border flex items-center justify-center mx-auto mb-6 shadow-card">
                    <span className="font-serif text-2xl font-light text-primary">{step.step}</span>
                  </div>
                  <h3 className="font-serif font-medium text-xl text-slate-purple mb-3">{step.title}</h3>
                  <p className="text-sm text-muted-foreground font-sans leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why CorePapers vs Competitors ── */}
        <section className="py-24 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-14">
                <p className="text-xs font-sans font-semibold tracking-widest uppercase text-primary mb-3">Why CorePapers</p>
                <h2 className="font-serif font-light text-4xl sm:text-5xl text-slate-purple mb-4">
                  Designed for <span className="italic">Your</span> Challenges
                </h2>
                <p className="text-muted-foreground font-sans max-w-xl mx-auto">
                  Generic tools like Grammarly check grammar. CorePapers understands the specific challenges of non-native English academic writing.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm font-sans">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-4 pr-6 text-muted-foreground font-medium">Feature</th>
                      <th className="py-4 px-4 text-center">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 rounded-full text-primary font-semibold text-xs">
                          <span className="w-2 h-2 rounded-full bg-primary" />
                          CorePapers
                        </div>
                      </th>
                      <th className="py-4 px-4 text-center text-muted-foreground font-normal">Grammarly</th>
                      <th className="py-4 px-4 text-center text-muted-foreground font-normal">Paperpal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Non-native expression detection", true, false, "partial"],
                      ["Chinglish / mother-tongue interference fix", true, false, false],
                      ["Academic phrase library by discipline", true, false, true],
                      ["Explanation for every suggestion", true, true, "partial"],
                      ["Multi-format citation generator", true, false, true],
                      ["Student pricing under $10/mo", true, false, false],
                      ["Built for ESL international students", true, false, false],
                    ].map(([feature, cp, gr, pp]) => (
                      <tr key={String(feature)} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                        <td className="py-3.5 pr-6 text-foreground">{String(feature)}</td>
                        <td className="py-3.5 px-4 text-center">
                          {cp === true ? <CheckCircle2 size={18} className="text-emerald-500 mx-auto" /> : cp === "partial" ? <span className="text-amber-500 text-xs">Partial</span> : <span className="text-muted-foreground/40">—</span>}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {gr === true ? <CheckCircle2 size={18} className="text-emerald-500 mx-auto" /> : gr === "partial" ? <span className="text-amber-500 text-xs">Partial</span> : <span className="text-muted-foreground/40">—</span>}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {pp === true ? <CheckCircle2 size={18} className="text-emerald-500 mx-auto" /> : pp === "partial" ? <span className="text-amber-500 text-xs">Partial</span> : <span className="text-muted-foreground/40">—</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/20 text-center">
                <p className="text-sm font-sans text-foreground">
                  <span className="font-semibold text-primary">CorePapers Student Plan: $7.9/mo</span>
                  <span className="text-muted-foreground mx-2">vs</span>
                  <span className="line-through text-muted-foreground">Paperpal $25/mo</span>
                  <span className="text-muted-foreground mx-2">·</span>
                  <span className="line-through text-muted-foreground">Writefull $150/yr</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Pricing Teaser ── */}
        <section className="py-24 bg-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-xs font-sans font-semibold tracking-widest uppercase text-primary mb-3">Pricing</p>
              <h2 className="font-serif font-light text-4xl sm:text-5xl text-slate-purple mb-4">
                Academic Quality,
                <span className="italic"> Student Budget</span>
              </h2>
              <p className="text-muted-foreground font-sans mb-10 leading-relaxed">
                Starting at just $7.9/month for students — significantly more affordable than Paperpal ($25/mo) or Writefull ($150/yr).
              </p>

              <div className="grid sm:grid-cols-3 gap-4 mb-10">
                {[
                  { name: "Free", price: "$0", desc: "Basic grammar & 5 AI polishes/day", highlight: false },
                  { name: "Student", price: "$7.9", desc: "Unlimited polish, phrase library, citations", highlight: true, badge: ".edu discount" },
                  { name: "Pro", price: "$14.9", desc: "Everything + priority AI + advanced analytics", highlight: false },
                ].map((plan) => (
                  <div
                    key={plan.name}
                    className={`p-6 rounded-2xl border transition-all ${
                      plan.highlight
                        ? "border-primary bg-primary/5 shadow-soft"
                        : "border-border bg-background"
                    }`}
                  >
                    {plan.badge && (
                      <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full font-sans mb-3 inline-block">
                        {plan.badge}
                      </span>
                    )}
                    <div className="font-serif text-3xl font-light text-slate-purple mb-1">
                      {plan.price}<span className="text-sm text-muted-foreground font-sans">/mo</span>
                    </div>
                    <div className="font-sans font-semibold text-foreground mb-2">{plan.name}</div>
                    <div className="text-xs text-muted-foreground font-sans">{plan.desc}</div>
                  </div>
                ))}
              </div>

              <Button asChild size="lg" className="bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90 px-10 py-6 text-base rounded-xl">
                <Link href="/pricing">View All Plans <ArrowRight size={18} className="ml-2" /></Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="py-24 bg-hero-gradient">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <div className="text-4xl mb-6">✦</div>
              <h2 className="font-serif font-light text-4xl sm:text-5xl text-slate-purple mb-6">
                Your Academic Journey
                <br />
                <span className="italic">Starts Here</span>
              </h2>
              <p className="text-muted-foreground font-sans mb-10 leading-relaxed">
                Start writing with clearer academic English, better citations, and tools built for non-native speakers.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90 px-10 py-6 text-base rounded-xl"
                >
                  <a href={getLoginUrl()}>
                    Start Free Today
                    <ArrowRight size={18} className="ml-2" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="bg-white/70 backdrop-blur-sm border-border px-8 py-6 text-base rounded-xl">
                  <Link href="/pricing">See Pricing</Link>
                </Button>
              </div>
              <p className="mt-6 text-xs text-muted-foreground font-sans">
                Free plan · No credit card · Cancel anytime
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
