import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, GraduationCap, Scale } from "lucide-react";
import { getLoginUrl } from "@/const";

const FAQ = [
  {
    q: "Who might need an academic writing alternative?",
    a: "Students who want revision help that is more closely aligned with academic English, non-native phrasing, citations, and research-writing tasks may want a more specialized workflow.",
  },
  {
    q: "What makes CorePapers different in practice?",
    a: "CorePapers focuses on academic wording, international student use cases, and adjacent tasks such as phrase support and citation generation.",
  },
  {
    q: "Can I try it before choosing a paid plan?",
    a: "Yes. You can start with the free workflow and see whether the writing support fits your assignments.",
  },
];

const GRAMMARLY_ALT_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Academic Writing Alternative for International Students",
    url: "https://corepapers.space/academic-writing-alternative-for-international-students",
    description: "A more academic-writing-focused alternative page for international students and non-native English writers.",
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

export default function SeoLandingGrammarlyAlternative() {
  return (
    <>
      <SEOHead
        title="Academic Writing Alternative for International Students"
        description="Explore an academic-writing-focused alternative for international students who want help with non-native phrasing, academic tone, and citation workflows."
        keywords="academic writing alternative for international students, academic writing tool for non-native English writers, alternative for academic writing"
        canonical="/academic-writing-alternative-for-international-students"
        jsonLd={GRAMMARLY_ALT_SCHEMA}
      />

      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-sans font-medium mb-4">
              <Scale size={13} />
              Academic Writing Workflow
            </div>
            <h1 className="font-serif font-light text-3xl sm:text-5xl text-slate-purple mb-4 leading-tight">
              A more academic-writing-focused
              <span className="italic"> alternative for international students</span>
            </h1>
            <p className="text-muted-foreground font-sans max-w-2xl mx-auto leading-relaxed mb-8">
              Some writing tools are broad by design. CorePapers is narrower and more focused: academic English, non-native phrasing, citation support, and student writing workflows.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90">
                <Link href="/polish">
                  Try Academic Revision
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
              "More emphasis on non-native English phrasing in academic contexts.",
              "Closer connection between revision, academic phrases, and citations.",
              "A workflow that fits essays, literature reviews, and research-oriented writing.",
            ].map((item) => (
              <div key={item} className="p-6 bg-white border border-border rounded-2xl">
                <CheckCircle2 size={18} className="text-emerald-500 mb-3" />
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          <div className="max-w-5xl mx-auto grid lg:grid-cols-[1.3fr_0.9fr] gap-6 mb-10">
            <section className="p-8 bg-white border border-border rounded-2xl">
              <h2 className="font-serif text-3xl text-slate-purple mb-4">When a focused tool can make more sense</h2>
              <div className="space-y-4 text-sm text-muted-foreground font-sans leading-relaxed">
                <p>
                  International students often need more than surface grammar feedback. They may need help with academic tone, source integration, hedging, and sentence patterns that sound translated.
                </p>
                <p>
                  That is where a narrower academic-writing workflow can be more useful. Instead of trying to cover every kind of writing equally, CorePapers concentrates on student academic use cases.
                </p>
                <p>
                  You can start with <Link href="/ai-essay-polisher-for-non-native-english-writers" className="text-primary underline">AI essay polish</Link>, then move to <Link href="/citations" className="text-primary underline">citations</Link> or the <Link href="/phrases" className="text-primary underline">phrase library</Link>.
                </p>
              </div>
            </section>

            <aside className="p-8 bg-hero-gradient border border-border rounded-2xl">
              <div className="inline-flex items-center gap-2 mb-4 text-xs font-sans font-semibold tracking-widest uppercase text-primary">
                <GraduationCap size={13} />
                Quick fit check
              </div>
              <div className="space-y-4 text-sm text-muted-foreground font-sans leading-relaxed">
                <p>If your assignments involve essays, reports, literature reviews, or citation-heavy work, the academic workflow will usually matter more than broad generic writing coverage.</p>
              </div>
              <div className="space-y-3 mt-6">
                <Button asChild className="w-full bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90">
                  <Link href="/pricing">
                    See Pricing
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full bg-white border-border">
                  <Link href="/polish">
                    Try Essay Polish
                  </Link>
                </Button>
              </div>
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
        </div>
      </main>
    </>
  );
}
