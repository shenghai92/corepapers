import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Sparkles, GraduationCap } from "lucide-react";
import { getLoginUrl } from "@/const";

const FAQ = [
  {
    q: "What kind of writing is this essay polisher best for?",
    a: "It works best for essays, reports, research papers, and dissertation sections written by non-native English speakers who want clearer academic phrasing.",
  },
  {
    q: "Does it only check grammar?",
    a: "No. It also focuses on non-native phrasing, academic tone, vocabulary choice, sentence clarity, and hedging.",
  },
  {
    q: "Can I try it before paying?",
    a: "Yes. There is a free option so you can test the polish workflow before upgrading.",
  },
];

const POLISH_LANDING_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CorePapers AI Essay Polisher",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    url: "https://corepapers.space/ai-essay-polisher-for-non-native-english-writers",
    description: "AI essay polisher for non-native English writers and international students.",
    featureList: [
      "Non-native expression detection",
      "Academic vocabulary improvements",
      "Clear sentence-level explanations",
      "Discipline-aware revision support",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  },
];

export default function SeoLandingEssayPolish() {
  return (
    <>
      <SEOHead
        title="AI Essay Polisher for Non-Native English Writers"
        description="Improve academic essays, reports, and research papers with an AI essay polisher built for non-native English writers and international students."
        keywords="AI essay polisher, essay polisher for non-native English writers, ESL essay correction, academic writing polish tool"
        canonical="/ai-essay-polisher-for-non-native-english-writers"
        jsonLd={POLISH_LANDING_SCHEMA}
      />

      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-sans font-medium mb-4">
              <Sparkles size={13} />
              Academic Writing Revision
            </div>
            <h1 className="font-serif font-light text-3xl sm:text-5xl text-slate-purple mb-4 leading-tight">
              AI essay polisher
              <span className="italic"> for non-native English writers</span>
            </h1>
            <p className="text-muted-foreground font-sans max-w-2xl mx-auto leading-relaxed mb-8">
              Improve academic tone, fix non-native expressions, and strengthen clarity with a revision workflow built for international students.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90">
                <Link href="/polish">
                  Try Essay Polish
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-white border-border">
                <a href={getLoginUrl()}>
                  Start Free
                </a>
              </Button>
            </div>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-5 mb-10">
            {[
              "Catch sentence patterns that sound translated instead of naturally academic.",
              "Upgrade weak or repetitive vocabulary without making the text sound artificial.",
              "Learn from explanations instead of only getting a black-box rewrite.",
            ].map((item) => (
              <div key={item} className="p-6 bg-white border border-border rounded-2xl">
                <CheckCircle2 size={18} className="text-emerald-500 mb-3" />
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          <div className="max-w-5xl mx-auto grid lg:grid-cols-[1.3fr_0.9fr] gap-6 mb-10">
            <section className="p-8 bg-white border border-border rounded-2xl">
              <h2 className="font-serif text-3xl text-slate-purple mb-4">Why this is closer to purchase intent</h2>
              <div className="space-y-4 text-sm text-muted-foreground font-sans leading-relaxed">
                <p>
                  Students searching for an AI essay polisher are usually much closer to action than students browsing general writing advice. They already have text, they already feel friction, and they want help now.
                </p>
                <p>
                  That makes this page more commercially meaningful than broad blog content. It speaks directly to revision pain: awkward phrasing, weak academic tone, and uncertainty about whether the writing sounds natural.
                </p>
                <p>
                  For supporting guides, start with <Link href="/blog/how-to-avoid-common-esl-writing-mistakes" className="text-primary underline">common ESL writing mistakes</Link> or <Link href="/blog/how-to-use-hedging-language-in-academic-writing" className="text-primary underline">hedging language in academic writing</Link>.
                </p>
              </div>
            </section>

            <aside className="p-8 bg-hero-gradient border border-border rounded-2xl">
              <div className="inline-flex items-center gap-2 mb-4 text-xs font-sans font-semibold tracking-widest uppercase text-primary">
                <GraduationCap size={13} />
                Fastest path
              </div>
              <div className="space-y-4 text-sm text-muted-foreground font-sans leading-relaxed">
                <p>Paste a paragraph, choose your discipline, and review sentence-level improvements immediately.</p>
                <p>Then move into citations or phrase support without leaving the same workflow.</p>
              </div>
              <Button asChild className="w-full mt-6 bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90">
                <Link href="/polish">
                  Polish My Writing
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </aside>
          </div>

          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif font-light text-3xl text-slate-purple text-center mb-6">Frequently asked questions</h2>
            <div className="space-y-3">
              {FAQ.map((item) => (
                <div key={item.q} className="p-5 bg-white border border-border rounded-xl">
                  <h3 className="font-sans font-medium text-foreground mb-2">{item.q}</h3>
                  <p className="text-sm text-muted-foreground font-sans leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto mt-10 grid sm:grid-cols-2 gap-4">
            <Link href="/pricing" className="block">
              <div className="p-6 bg-white border border-border rounded-2xl hover:border-primary/30 hover:shadow-card transition-all">
                <h2 className="font-serif text-2xl text-slate-purple mb-2">Compare free and paid polish limits</h2>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                  Check whether the free tier is enough for occasional revisions or whether you need a higher word limit.
                </p>
              </div>
            </Link>
            <Link href="/phrases" className="block">
              <div className="p-6 bg-white border border-border rounded-2xl hover:border-primary/30 hover:shadow-card transition-all">
                <h2 className="font-serif text-2xl text-slate-purple mb-2">Browse phrase support too</h2>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                  Reinforce revision with ready-to-use academic phrases for introductions, discussion, and stance.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
