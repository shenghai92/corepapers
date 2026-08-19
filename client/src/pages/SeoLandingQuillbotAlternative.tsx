import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, GraduationCap, PenTool } from "lucide-react";
import { getLoginUrl } from "@/const";

const FAQ = [
  {
    q: "Who is this page meant for?",
    a: "It is for students who need to decide how to integrate a source into an academic paragraph: whether to quote, paraphrase, summarize, provide their own analysis, and document the source accurately.",
  },
  {
    q: "When should I paraphrase instead of quote or summarize?",
    a: "Paraphrase when the source&apos;s idea or evidence matters more than its exact language and you need detail for your point. Quote when the exact wording needs analysis or would lose significance; summarize when a broad source pattern or context is sufficient. All three can require attribution.",
  },
  {
    q: "Can a paraphrasing tool make a source-based sentence safe to submit?",
    a: "No. A tool cannot confirm the original source, assess whether you have understood it, decide if wording is distinctive, verify a citation, or replace your course&apos;s academic-integrity requirements. Compare your draft with the source and take responsibility for the final wording and attribution.",
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
              Academic paraphrasing support
              <span className="italic"> for source-based writing</span>
            </h1>
            <p className="text-muted-foreground font-sans max-w-2xl mx-auto leading-relaxed mb-8">
              Choose whether to quote, paraphrase, or summarize a source; rebuild the relevant idea for your own argument; then preserve clear, accurate attribution in essays, literature reviews, and research papers.
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

          <section className="max-w-5xl mx-auto mb-10 p-7 bg-white border border-border rounded-2xl shadow-card">
            <p className="text-xs font-sans font-semibold tracking-widest uppercase text-primary mb-3">Choose the source move before revising language</p>
            <h2 className="font-serif text-3xl text-slate-purple mb-5">An eight-step source-based paraphrasing workflow</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">STEP 1 · RECORD</p><h3 className="font-serif text-xl text-slate-purple mb-2">Open the source you used</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Work from the full, actual source—not a search snippet, a copied bibliography, or a tool&apos;s reconstruction. Record enough details to return to it.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">STEP 2 · UNDERSTAND</p><h3 className="font-serif text-xl text-slate-purple mb-2">Read for the original claim</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Identify the source&apos;s point, evidence, scope, method or context, and qualification before you write. Do not paraphrase a sentence you have not understood.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">STEP 3 · DECIDE</p><h3 className="font-serif text-xl text-slate-purple mb-2">Choose the source move</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Quote distinctive wording, paraphrase needed detail, summarize a broader pattern, or leave room for your own analysis. The paragraph purpose decides the move.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">STEP 4 · PLAN</p><h3 className="font-serif text-xl text-slate-purple mb-2">State your paragraph purpose</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Name the claim, question, comparison, or explanation the source will serve. Source material should advance your reasoning, not replace it.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">STEP 5 · REBUILD</p><h3 className="font-serif text-xl text-slate-purple mb-2">Close the source and write</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Rebuild only the relevant idea in a new structure and emphasis for your paragraph. Do not swap synonyms around the source sentence.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">STEP 6 · COMPARE</p><h3 className="font-serif text-xl text-slate-purple mb-2">Check accuracy and distance</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Reopen the source. Check that your wording preserves evidence, scope, and uncertainty, and mark distinctive borrowed words when quotation is required.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">STEP 7 · ATTRIBUTE</p><h3 className="font-serif text-xl text-slate-purple mb-2">Place citation near the idea</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Make clear which material comes from the source, use the required in-text citation, and create a matching reference from checked source details.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">STEP 8 · EXPLAIN</p><h3 className="font-serif text-xl text-slate-purple mb-2">Add your own analysis</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Show how the material supports, complicates, contrasts with, or limits your claim, then reread the paragraph as a reader who cannot see your notes.</p></article>
            </div>
            <p className="text-sm font-sans text-primary font-medium mt-5">No choice removes attribution responsibility. Keep a record of the source you actually read, compare your wording with it, place the required citation where readers can identify the borrowed material, and create a matching reference entry.</p>
          </section>

          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-5 mb-10">
            {[
              "Decide the source move before you change a sentence&apos;s wording.",
              "Link paraphrase, quotation, summary, analysis, and citation in the same source-use workflow.",
              "Support international students working with source-heavy assignments without treating synonym swaps as academic revision.",
            ].map((item) => (
              <div key={item} className="p-6 bg-white border border-border rounded-2xl">
                <CheckCircle2 size={18} className="text-emerald-500 mb-3" />
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          <div className="max-w-5xl mx-auto grid lg:grid-cols-[1.3fr_0.9fr] gap-6 mb-10">
            <section className="p-8 bg-white border border-border rounded-2xl">
              <h2 className="font-serif text-3xl text-slate-purple mb-4">Integrate a source for a clear academic purpose</h2>
              <div className="space-y-4 text-sm text-muted-foreground font-sans leading-relaxed">
                <p>Academic context determines the source move. A literature review may summarize a debate, paraphrase a study&apos;s method or result, and quote a distinctive definition; an argument paragraph then explains how that material advances the writer&apos;s claim.</p>
                <p><a className="text-primary underline underline-offset-4" href="https://owl.purdue.edu/owl/research_and_citation/using_research/quoting_paraphrasing_and_summarizing/paraphrasing.html" target="_blank" rel="noreferrer">Purdue OWL</a> describes a paraphrase as a new rendition of another writer&apos;s essential information and ideas that still needs documentation. <a className="text-primary underline underline-offset-4" href="https://writing.wisc.edu/handbook/quotingsources/" target="_blank" rel="noreferrer">University of Wisconsin–Madison Writing Center</a> distinguishes source moves by purpose and stresses that borrowed ideas require credit even when rendered in new words.</p>
                <p><strong className="text-foreground">Fictional learning example.</strong> <strong>This fictional learning example is invented for practice; it is not student work, research evidence, a source, or text to submit.</strong> A fictional writer summarizes a debate&apos;s overall position, paraphrases one study&apos;s relevant finding to support a paragraph, quotes only a distinctive definition, and then adds analysis explaining the connection to the writer&apos;s claim.</p>
                <p>For a full understanding—rebuild—compare—attribute workflow, use <Link href="/how-to-paraphrase-without-plagiarizing" className="text-primary underline">the paraphrasing guide</Link>, then review the paragraph and citation details before submission.</p>
              </div>
            </section>

            <aside className="p-8 bg-hero-gradient border border-border rounded-2xl">
              <div className="inline-flex items-center gap-2 mb-4 text-xs font-sans font-semibold tracking-widest uppercase text-primary">
                <GraduationCap size={13} />
                Best next move
              </div>
              <div className="space-y-4 text-sm text-muted-foreground font-sans leading-relaxed">
                <p>First select the right source move, then draft the paragraph in your own structure and voice. Compare it with the original, verify the citation, and check how the source supports your analysis.</p>
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

          <section className="max-w-5xl mx-auto mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: "/how-to-paraphrase-without-plagiarizing", title: "Paraphrase without plagiarizing", desc: "Follow a full source understanding, purpose, reconstruction, comparison, and attribution process." },
              { href: "/academic-paraphrasing-tool-for-esl-students", title: "Academic paraphrasing for ESL students", desc: "Review a source-based paragraph after you have rebuilt the relevant idea for your own purpose." },
              { href: "/academic-integrity-and-source-use", title: "Academic integrity and source use", desc: "Distinguish quotation, paraphrase, summary, citation, and source verification responsibilities." },
              { href: "/evaluate-academic-sources", title: "Evaluate the source first", desc: "Check author, purpose, evidence, currency, and source records before presenting a source confidently." },
              { href: "/academic-argument-evidence", title: "Connect evidence to argument", desc: "Show how a source supports, limits, or complicates your claim instead of leaving evidence unexplained." },
              { href: "/citations", title: "Generate, then verify citations", desc: "Build references from source details you checked against the actual work and required style." },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="block"><article className="h-full p-5 bg-white border border-border rounded-xl hover:border-primary/30 hover:shadow-card transition-all"><h2 className="font-serif text-2xl text-slate-purple mb-2">{item.title}</h2><p className="text-sm text-muted-foreground font-sans leading-relaxed">{item.desc}</p></article></Link>
            ))}
          </section>

          <div className="max-w-4xl mx-auto mt-10">
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
