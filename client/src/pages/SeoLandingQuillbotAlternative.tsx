import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, GraduationCap, PenTool } from "lucide-react";
import { getLoginUrl } from "@/const";

const FAQ = [
  {
    q: "Who is this page meant for?",
    a: "It is aimed at students who want paraphrasing and revision help that fits academic writing rather than only generic rewriting.",
  },
  {
    q: "What kind of tasks does CorePapers fit well?",
    a: "It fits source-based writing, paraphrasing, essay revision, literature review drafting, and citation-adjacent academic workflows.",
  },
  {
    q: "Can I test the workflow without paying first?",
    a: "Yes. You can start free and see whether the revision style works for your assignments.",
  },
];

const QUILLBOT_ALT_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Paraphrasing Alternative for Academic Writing",
    url: "https://corepapers.space/paraphrasing-alternative-for-academic-writing",
    description: "A more academic-writing-focused paraphrasing alternative page for students and ESL writers.",
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

export default function SeoLandingQuillbotAlternative() {
  return (
    <>
      <SEOHead
        title="Paraphrasing Alternative for Academic Writing"
        description="Explore a more academic-writing-focused paraphrasing alternative for essays, literature reviews, and source-based writing."
        keywords="paraphrasing alternative for academic writing, academic paraphrasing alternative, ESL paraphrasing tool for essays"
        canonical="/paraphrasing-alternative-for-academic-writing"
        jsonLd={QUILLBOT_ALT_SCHEMA}
      />

      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-sans font-medium mb-4">
              <PenTool size={13} />
              Academic Paraphrasing Workflow
            </div>
            <h1 className="font-serif font-light text-3xl sm:text-5xl text-slate-purple mb-4 leading-tight">
              A paraphrasing alternative
              <span className="italic"> for academic writing</span>
            </h1>
            <p className="text-muted-foreground font-sans max-w-2xl mx-auto leading-relaxed mb-8">
              If you need paraphrasing help for essays, literature reviews, and source-based academic writing, a more academic-focused revision workflow may be a better fit than generic rewriting alone.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90">
                <Link href="/academic-paraphrasing-tool-for-esl-students">
                  Try Academic Paraphrasing
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
              "Keep the focus on academic tone instead of only sentence variation.",
              "Connect paraphrasing with citation support and essay revision.",
              "Support international students working with source-heavy assignments.",
            ].map((item) => (
              <div key={item} className="p-6 bg-white border border-border rounded-2xl">
                <CheckCircle2 size={18} className="text-emerald-500 mb-3" />
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          <div className="max-w-5xl mx-auto grid lg:grid-cols-[1.3fr_0.9fr] gap-6 mb-10">
            <section className="p-8 bg-white border border-border rounded-2xl">
              <h2 className="font-serif text-3xl text-slate-purple mb-4">When the academic context matters more</h2>
              <div className="space-y-4 text-sm text-muted-foreground font-sans leading-relaxed">
                <p>
                  Students often do not need paraphrasing in isolation. They need paraphrasing that works inside argument paragraphs, literature reviews, and cited academic writing.
                </p>
                <p>
                  That is why the surrounding workflow matters. CorePapers tries to support the paragraph after the rewrite too, with polish, phrase support, and citation tools close by.
                </p>
                <p>
                  For practical background, read <Link href="/blog/how-to-paraphrase-without-plagiarizing-in-academic-writing" className="text-primary underline">the paraphrasing guide</Link>.
                </p>
              </div>
            </section>

            <aside className="p-8 bg-hero-gradient border border-border rounded-2xl">
              <div className="inline-flex items-center gap-2 mb-4 text-xs font-sans font-semibold tracking-widest uppercase text-primary">
                <GraduationCap size={13} />
                Best next move
              </div>
              <div className="space-y-4 text-sm text-muted-foreground font-sans leading-relaxed">
                <p>Revise the paraphrased paragraph first, then build the citation for the source and check whether the tone fits the rest of your draft.</p>
              </div>
              <div className="space-y-3 mt-6">
                <Button asChild className="w-full bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90">
                  <Link href="/pricing">
                    Compare Plans
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full bg-white border-border">
                  <Link href="/polish">
                    Try Paragraph Revision
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
