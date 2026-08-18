import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import SEOHead from "@/components/SEOHead";
import { trackEvent } from "@/lib/analytics";
import {
  Sparkles,
  BookOpen,
  Quote,
  CheckCircle2,
  ArrowRight,
  GraduationCap,
} from "lucide-react";

const FEATURED_GUIDES = [
  {
    title: "How to Improve Academic Writing Skills",
    href: "/blog/how-to-improve-academic-writing-skills-for-international-students",
    desc: "Build clearer structure, stronger vocabulary, and better revision habits.",
  },
  {
    title: "APA 7th Edition Citation Format Guide",
    href: "/blog/apa-7th-edition-citation-format-guide-with-examples",
    desc: "See how APA 7 references and in-text citations should look in real assignments.",
  },
  {
    title: "How to Avoid Plagiarism in Academic Writing",
    href: "/blog/how-to-avoid-plagiarism-in-academic-writing",
    desc: "Learn safe paraphrasing, source use, and citation habits for coursework.",
  },
];

const RESOURCE_CENTERS = [
  {
    title: "Academic Integrity & Source Use",
    href: "/academic-integrity-and-source-use",
    desc: "Choose when to quote, paraphrase, or summarize, then keep sources clear.",
  },
  {
    title: "Academic Writing Examples",
    href: "/academic-writing-examples",
    desc: "Study labelled examples for source-based writing, methods, and results.",
  },
  {
    title: "Research Paper Templates",
    href: "/research-paper-templates",
    desc: "Plan methods, results, and discussion with flexible evidence-first prompts.",
  },
  {
    title: "APA Citation Examples",
    href: "/citation-examples",
    desc: "Check common reference and in-text citation structures before submitting.",
  },
  {
    title: "APA 7 Non-English Sources",
    href: "/apa-7-non-english-sources",
    desc: "Cite original-language sources, published translations, and transliterated titles carefully.",
  },
  {
    title: "IEEE Citation Examples",
    href: "/ieee-citation-examples",
    desc: "Use bracketed in-text numbers and a reference list ordered by first appearance for technical writing.",
  },
  {
    title: "Chicago 18 Citation Examples",
    href: "/chicago-citation-examples",
    desc: "Choose Notes–Bibliography or Author–Date before formatting Chicago references.",
  },
  {
    title: "Research Foundations",
    href: "/evaluate-academic-sources",
    desc: "Evaluate sources, focus a research question, shape a thesis, and build an evidence-based argument.",
  },
];

const FEATURES = [
  {
    icon: Sparkles,
    title: "AI Essay Polishing",
    desc: "Detect non-native phrasing and rewrite it into clearer academic English with explanations for every change.",
    href: "/polish",
    color: "bg-lavender-light",
    iconColor: "text-primary",
  },
  {
    icon: BookOpen,
    title: "Academic Phrase Library",
    desc: "Browse discipline-specific phrase templates for hedging, analysis, literature review, and academic stance.",
    href: "/phrases",
    color: "bg-blush-light",
    iconColor: "text-rose-500",
  },
  {
    icon: Quote,
    title: "Citation Generator",
    desc: "Create APA, MLA, Chicago, and IEEE citations quickly without formatting guesswork.",
    href: "/citations",
    color: "bg-mint-light",
    iconColor: "text-emerald-600",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Paste Your Draft",
    desc: "Add your essay, paragraph, or report to CorePapers in seconds.",
  },
  {
    step: "02",
    title: "Get Academic Feedback",
    desc: "See non-native patterns, vocabulary upgrades, and sentence-level improvements right away.",
  },
  {
    step: "03",
    title: "Revise With Confidence",
    desc: "Understand every suggestion so your next draft sounds stronger and more natural.",
  },
];

const PAIN_POINTS = [
  {
    icon: "x",
    before: '"The research show that..."',
    after: '"The research demonstrates that..."',
  },
  {
    icon: "x",
    before: '"In my opinion, I think..."',
    after: '"This analysis suggests..."',
  },
  {
    icon: "x",
    before: '"Very important factor"',
    after: '"A critical determinant"',
  },
  {
    icon: "x",
    before: '"According to my knowledge"',
    after: '"Based on the existing literature"',
  },
];

const HOME_FAQ = [
  {
    q: "Who is CorePapers best for?",
    a: "CorePapers is built for international students and non-native English writers who already have a draft, paragraph, citation list, or research section they need to improve quickly.",
  },
  {
    q: "Can I use CorePapers for more than grammar correction?",
    a: "Yes. CorePapers is designed for academic phrasing, non-native expression fixes, citation support, and sentence-level revision guidance rather than only surface grammar checks.",
  },
  {
    q: "What should I try first?",
    a: "Most users start with the essay polisher for draft revision, then use the phrase library for sentence patterns and the citation generator for reference formatting.",
  },
];

const HOME_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "CorePapers",
    url: "https://corepapers.space",
    description:
      "AI academic writing assistant for international students and non-native English writers.",
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CorePapers",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "CorePapers helps international students polish essays, generate citations, and improve academic English.",
    url: "https://corepapers.space",
    featureList: [
      "AI essay polishing for non-native English writing",
      "Academic phrase library for ESL students",
      "APA MLA Chicago IEEE citation generator",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOME_FAQ.map(item => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  },
];

export default function Home() {
  return (
    <>
      <SEOHead
        title="CorePapers: Academic Writing Tool for International Students | Essay Polish, Phrases & Citations"
        description="CorePapers helps international students fix non-native phrasing, find academic sentence templates, and generate APA, MLA, Chicago, and IEEE citations in seconds. Free to start."
        keywords="CorePapers, core papers, AI academic writing assistant, academic phrase bank, writing tools for international students, AI essay polisher, APA 7 citation generator"
        canonical="/"
        jsonLd={HOME_SCHEMA}
      />

      <main className="pt-16">
        <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-hero-gradient">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-20 right-[10%] w-72 h-72 rounded-full bg-lavender/20 blur-3xl" />
            <div className="absolute bottom-20 left-[5%] w-56 h-56 rounded-full bg-blush/30 blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-mint/10 blur-3xl" />
            <div className="absolute top-32 left-[15%] w-px h-24 bg-gradient-to-b from-transparent via-lavender/40 to-transparent" />
            <div className="absolute bottom-40 right-[20%] w-px h-16 bg-gradient-to-b from-transparent via-blush/50 to-transparent" />
          </div>

          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-border text-xs font-sans font-medium text-slate-purple mb-8 shadow-card">
                <GraduationCap size={14} />
                <span>Built for international students writing in English</span>
              </div>

              <h1 className="font-serif font-light text-4xl sm:text-6xl lg:text-7xl text-slate-purple leading-tight mb-6">
                Polish essays,
                <br />
                <span className="italic font-normal">
                  write stronger academic English
                </span>
              </h1>

              <p className="font-sans text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto tracking-wide">
                CorePapers helps international students and non-native English
                speakers fix translated phrasing, strengthen academic
                vocabulary, find better academic English expressions, and
                generate accurate citations so each draft reads more clearly and
                credibly.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <Button
                  asChild
                  size="lg"
                  className="bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90 transition-all duration-200 px-8 py-6 text-base font-sans font-medium rounded-xl"
                >
                  <a
                    href={getLoginUrl()}
                    onClick={() =>
                      trackEvent("cta_click", {
                        location: "home_hero",
                        target: "start_free",
                      })
                    }
                  >
                    Start Free in Minutes
                    <ArrowRight size={18} className="ml-2" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="bg-white/70 backdrop-blur-sm border-border text-foreground hover:bg-white px-8 py-6 text-base font-sans rounded-xl"
                >
                  <Link
                    href="/polish"
                    onClick={() =>
                      trackEvent("cta_click", {
                        location: "home_hero",
                        target: "try_polish",
                      })
                    }
                  >
                    Try Essay Polish Now
                  </Link>
                </Button>
              </div>

              <p className="text-sm text-muted-foreground font-sans mb-6">
                Best for students who already have a draft, paragraph, source
                list, or discussion section and need faster academic revision
                support without losing control of meaning.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground font-sans">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-500" />
                  No credit card required
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-500" />
                  Free plan for trying real tasks
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-500" />
                  Upgrade when your writing load grows
                </span>
              </div>
            </div>

            <div className="mt-16 max-w-2xl mx-auto">
              <div className="glass-card rounded-2xl p-6 shadow-soft">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="ml-2 text-xs text-muted-foreground font-sans">
                    CorePapers AI Polish
                  </span>
                </div>
                <div className="space-y-3">
                  {PAIN_POINTS.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm">
                      <span className="text-base mt-0.5 text-rose-500 font-semibold">
                        {item.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <span className="line-through text-muted-foreground font-sans">
                          {item.before}
                        </span>
                        <span className="mx-2 text-muted-foreground">
                          -&gt;
                        </span>
                        <span className="text-emerald-700 font-medium font-sans">
                          {item.after}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-border flex items-center gap-2 text-xs text-muted-foreground">
                  <Sparkles size={12} className="text-primary" />
                  <span className="font-sans">
                    4 non-native expressions detected and improved
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-background" id="features">
          <div className="container">
            <div className="text-center mb-16">
              <p className="text-xs font-sans font-semibold tracking-widest uppercase text-primary mb-3">
                Core Tools
              </p>
              <h2 className="font-serif font-light text-4xl sm:text-5xl text-slate-purple mb-4">
                Support for the
                <br />
                <span className="italic">whole writing workflow</span>
              </h2>
              <p className="text-muted-foreground font-sans max-w-xl mx-auto leading-relaxed">
                Built for academic writing, not generic grammar checks.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {FEATURES.map(feature => (
                <Link
                  key={feature.title}
                  href={feature.href}
                  className="group block"
                >
                  <div className="h-full p-8 rounded-2xl bg-white border border-border hover:border-primary/30 hover:shadow-soft transition-all duration-300 cursor-pointer">
                    <div
                      className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-6`}
                    >
                      <feature.icon size={22} className={feature.iconColor} />
                    </div>
                    <h2 className="font-serif font-medium text-xl text-slate-purple mb-3 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h2>
                    <p className="text-sm text-muted-foreground font-sans leading-relaxed mb-4">
                      {feature.desc}
                    </p>
                    <span className="text-xs font-sans font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                      Explore tool <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-hero-gradient">
          <div className="container">
            <div className="text-center mb-16">
              <p className="text-xs font-sans font-semibold tracking-widest uppercase text-primary mb-3">
                Simple Process
              </p>
              <h2 className="font-serif font-light text-4xl sm:text-5xl text-slate-purple mb-4">
                From rough draft to
                <span className="italic"> stronger academic writing</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {HOW_IT_WORKS.map((step, i) => (
                <div key={step.step} className="relative text-center">
                  {i < HOW_IT_WORKS.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-lavender/40 to-transparent" />
                  )}
                  <div className="w-16 h-16 rounded-full bg-white/80 backdrop-blur-sm border border-border flex items-center justify-center mx-auto mb-6 shadow-card">
                    <span className="font-serif text-2xl font-light text-primary">
                      {step.step}
                    </span>
                  </div>
                  <h2 className="font-serif font-medium text-xl text-slate-purple mb-3">
                    {step.title}
                  </h2>
                  <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-14">
                <p className="text-xs font-sans font-semibold tracking-widest uppercase text-primary mb-3">
                  Why CorePapers
                </p>
                <h2 className="font-serif font-light text-4xl sm:text-5xl text-slate-purple mb-4">
                  Made for non-native writers
                </h2>
                <p className="text-muted-foreground font-sans max-w-xl mx-auto">
                  Current academic writing tools often focus on grammar first.
                  CorePapers is positioned around international students who
                  need phrase support, citation help, and clearer academic
                  English.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm font-sans">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-4 pr-6 text-muted-foreground font-medium">
                        Feature
                      </th>
                      <th className="py-4 px-4 text-center">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 rounded-full text-primary font-semibold text-xs">
                          <span className="w-2 h-2 rounded-full bg-primary" />
                          CorePapers
                        </div>
                      </th>
                      <th className="py-4 px-4 text-center text-muted-foreground font-normal">
                        Grammarly
                      </th>
                      <th className="py-4 px-4 text-center text-muted-foreground font-normal">
                        Paperpal
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      [
                        "Non-native expression detection",
                        true,
                        false,
                        "partial",
                      ],
                      [
                        "Academic phrase library by discipline",
                        true,
                        false,
                        true,
                      ],
                      [
                        "Explanation for every suggestion",
                        true,
                        true,
                        "partial",
                      ],
                      ["Citation generator", true, false, true],
                      ["Student-friendly pricing", true, false, false],
                      ["Built for international students", true, false, false],
                    ].map(([feature, cp, gr, pp]) => (
                      <tr
                        key={String(feature)}
                        className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
                      >
                        <td className="py-3.5 pr-6 text-foreground">
                          {String(feature)}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {cp === true ? (
                            <CheckCircle2
                              size={18}
                              className="text-emerald-500 mx-auto"
                            />
                          ) : cp === "partial" ? (
                            <span className="text-amber-500 text-xs">
                              Partial
                            </span>
                          ) : (
                            <span className="text-muted-foreground/40">No</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {gr === true ? (
                            <CheckCircle2
                              size={18}
                              className="text-emerald-500 mx-auto"
                            />
                          ) : gr === "partial" ? (
                            <span className="text-amber-500 text-xs">
                              Partial
                            </span>
                          ) : (
                            <span className="text-muted-foreground/40">No</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {pp === true ? (
                            <CheckCircle2
                              size={18}
                              className="text-emerald-500 mx-auto"
                            />
                          ) : pp === "partial" ? (
                            <span className="text-amber-500 text-xs">
                              Partial
                            </span>
                          ) : (
                            <span className="text-muted-foreground/40">No</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-background">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <p className="text-xs font-sans font-semibold tracking-widest uppercase text-primary mb-3">
                  When It Fits
                </p>
                <h2 className="font-serif font-light text-4xl sm:text-5xl text-slate-purple mb-4">
                  Best for students who already
                  <span className="italic"> have real writing to finish</span>
                </h2>
                <p className="text-muted-foreground font-sans max-w-2xl mx-auto leading-relaxed">
                  CorePapers is strongest when the goal is not vague
                  improvement, but getting a draft, paragraph, citation, or
                  literature review section into better academic shape quickly.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-5">
                {[
                  {
                    title: "Essay deadlines",
                    desc: "You have a draft and need to improve tone, clarity, and non-native phrasing before submission.",
                    href: "/ai-essay-polisher-for-non-native-english-writers",
                  },
                  {
                    title: "Citation-heavy assignments",
                    desc: "You need references and in-text citations that look correct without spending extra time on formatting.",
                    href: "/apa-citation-generator-for-international-students",
                  },
                  {
                    title: "Source-based writing",
                    desc: "You are paraphrasing research and want the wording to sound more natural and academically safe.",
                    href: "/academic-paraphrasing-tool-for-esl-students",
                  },
                ].map(item => (
                  <Link key={item.href} href={item.href} className="block">
                    <div className="h-full p-6 rounded-2xl border border-border bg-white hover:border-primary/30 hover:shadow-soft transition-all">
                      <h3 className="font-serif text-2xl text-slate-purple mb-3">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground font-sans leading-relaxed mb-4">
                        {item.desc}
                      </p>
                      <span className="text-xs font-sans font-medium text-primary flex items-center gap-1">
                        See use case <ArrowRight size={12} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-xs font-sans font-semibold tracking-widest uppercase text-primary mb-3">
                Explore More
              </p>
              <h2 className="font-serif font-light text-4xl sm:text-5xl text-slate-purple mb-4">
                Learn, polish, and cite
              </h2>
              <p className="text-muted-foreground font-sans mb-10 leading-relaxed">
                Move between essay polishing, phrase search, citations, and
                writing guides without leaving the same workflow.
              </p>

              <div className="grid sm:grid-cols-3 gap-4 mb-10">
                {[
                  {
                    name: "Essay Polish",
                    href: "/polish",
                    desc: "Fix non-native phrasing in seconds",
                  },
                  {
                    name: "Phrase Library",
                    href: "/phrases",
                    desc: "Find academic sentence templates",
                  },
                  {
                    name: "Writing Blog",
                    href: "/blog",
                    desc: "Read practical ESL writing guides",
                  },
                ].map(item => (
                  <Link key={item.name} href={item.href} className="block">
                    <div className="p-6 rounded-2xl border border-border bg-background hover:border-primary/30 hover:shadow-soft transition-all">
                      <div className="font-sans font-semibold text-foreground mb-2">
                        {item.name}
                      </div>
                      <div className="text-xs text-muted-foreground font-sans">
                        {item.desc}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="grid sm:grid-cols-3 gap-4 mb-8 text-left">
                {FEATURED_GUIDES.map(guide => (
                  <Link key={guide.href} href={guide.href} className="block">
                    <div className="p-6 rounded-2xl border border-border bg-background hover:border-primary/30 hover:shadow-soft transition-all">
                      <div className="text-xs font-sans font-semibold tracking-widest uppercase text-primary mb-2">
                        Featured Guide
                      </div>
                      <h3 className="font-serif text-xl text-slate-purple mb-2 leading-snug">
                        {guide.title}
                      </h3>
                      <p className="text-xs text-muted-foreground font-sans leading-relaxed">
                        {guide.desc}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-10 text-left">
                {RESOURCE_CENTERS.map(resource => (
                  <Link
                    key={resource.href}
                    href={resource.href}
                    className="block"
                  >
                    <div className="h-full p-6 rounded-2xl border border-border bg-white hover:border-primary/30 hover:shadow-soft transition-all">
                      <div className="text-xs font-sans font-semibold tracking-widest uppercase text-primary mb-2">
                        Learning Resource
                      </div>
                      <h3 className="font-serif text-xl text-slate-purple mb-2 leading-snug">
                        {resource.title}
                      </h3>
                      <p className="text-xs text-muted-foreground font-sans leading-relaxed">
                        {resource.desc}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              <Button
                asChild
                size="lg"
                className="bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90 px-10 py-6 text-base rounded-xl"
              >
                <Link
                  href="/pricing"
                  onClick={() =>
                    trackEvent("cta_click", {
                      location: "home_footer",
                      target: "see_pricing",
                    })
                  }
                >
                  See Pricing <ArrowRight size={18} className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-24 bg-background">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <p className="text-xs font-sans font-semibold tracking-widest uppercase text-primary mb-3">
                  Common Questions
                </p>
                <h2 className="font-serif font-light text-4xl sm:text-5xl text-slate-purple mb-4">
                  Quick answers before you start
                </h2>
                <p className="text-muted-foreground font-sans leading-relaxed">
                  If you are comparing tools or deciding where to begin, these
                  are the questions students usually ask first.
                </p>
              </div>

              <div className="space-y-4">
                {HOME_FAQ.map(item => (
                  <div
                    key={item.q}
                    className="rounded-2xl border border-border bg-white p-6"
                  >
                    <h3 className="font-sans font-semibold text-foreground mb-2">
                      {item.q}
                    </h3>
                    <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid sm:grid-cols-3 gap-4 mt-8">
                {[
                  {
                    href: "/polish",
                    title: "Try essay polish",
                    desc: "Start with a real paragraph or draft.",
                  },
                  {
                    href: "/pricing",
                    title: "Compare plans",
                    desc: "See which limits fit your writing load.",
                  },
                  {
                    href: "/blog",
                    title: "Read guides",
                    desc: "Learn paraphrasing, hedging, and structure.",
                  },
                ].map(item => (
                  <Link key={item.href} href={item.href} className="block">
                    <div className="h-full rounded-2xl border border-border bg-white p-5 hover:border-primary/30 hover:shadow-soft transition-all">
                      <h3 className="font-serif text-2xl text-slate-purple mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
