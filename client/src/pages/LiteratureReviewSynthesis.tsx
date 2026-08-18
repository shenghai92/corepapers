import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Rows3 } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";

const SOURCE =
  "https://owl.purdue.edu/owl/research_and_citation/conducting_research/research_overview/synthesizing_sources.html";

export default function LiteratureReviewSynthesis() {
  return (
    <>
      <SEOHead
        title="How to Synthesize Sources in a Literature Review: Matrix and Example"
        description="Learn how to synthesize sources in a literature review with a simple synthesis matrix, a fictional paragraph example, and a source-based writing checklist."
        keywords="how to synthesize sources literature review, synthesis matrix example, literature review synthesis example, research gap literature review"
        canonical="/literature-review-synthesis-matrix/"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "How to Synthesize Sources in a Literature Review: Matrix and Example",
            url: "https://corepapers.space/literature-review-synthesis-matrix/",
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://corepapers.space/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Literature review synthesis",
                item: "https://corepapers.space/literature-review-synthesis-matrix/",
              },
            ],
          },
        ]}
      />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container">
          <header className="max-w-4xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-sans font-medium mb-4">
              <Rows3 size={14} /> Literature review practice
            </div>
            <h1 className="font-serif font-light text-4xl sm:text-5xl text-slate-purple mb-4">
              How to synthesize sources in a{" "}
              <span className="italic">literature review</span>
            </h1>
            <p className="text-muted-foreground font-sans max-w-2xl mx-auto leading-relaxed">
              A synthesis brings multiple sources into conversation around a
              theme. It is not a sequence of source summaries or a way to force
              agreement where sources differ.
            </p>
          </header>
          <section className="max-w-5xl mx-auto grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
            <article className="p-7 bg-white border border-border rounded-2xl">
              <h2 className="font-serif text-3xl text-slate-purple mb-4">
                Build a synthesis matrix before drafting
              </h2>
              <p className="text-sm text-muted-foreground font-sans leading-relaxed mb-5">
                List sources across the top and themes or variables down the
                side. Record only the point that matters for each theme, then
                look for agreement, tension, limits, and unanswered questions.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm font-sans border-collapse">
                  <thead>
                    <tr className="bg-muted/50">
                        <th className="text-left p-3 border">Fictional theme</th>
                        <th className="text-left p-3 border">Fictional source note A</th>
                        <th className="text-left p-3 border">Fictional source note B</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 border font-medium">Planning habit</td>
                      <td className="p-3 border">
                        Reports a positive association
                      </td>
                      <td className="p-3 border">
                        Finds an effect only in first-year students
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 border font-medium">Limitation</td>
                      <td className="p-3 border">Self-reported measure</td>
                      <td className="p-3 border">Small local sample</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>
            <aside className="p-7 bg-hero-gradient border border-border rounded-2xl">
              <h2 className="font-serif text-2xl text-slate-purple mb-4">
                Synthesis self-check
              </h2>
              <ul className="space-y-3">
                {[
                  "Each paragraph is organised by a theme, question, or method—not author order.",
                  "I show where sources agree, differ, or address different conditions.",
                  "I keep citations close to the ideas they support.",
                  "A claimed research gap is specific and supported by the sources I reviewed.",
                ].map(x => (
                  <li
                    key={x}
                    className="flex gap-2 text-sm text-muted-foreground font-sans"
                  >
                    <CheckCircle2
                      size={16}
                      className="text-emerald-500 shrink-0 mt-0.5"
                    />
                    {x}
                  </li>
                ))}
              </ul>
            </aside>
          </section>
          <section className="max-w-5xl mx-auto mt-7 p-7 bg-white border border-border rounded-2xl">
            <p className="text-xs font-sans font-semibold tracking-widest uppercase text-primary mb-3">A research workflow, not just a spreadsheet</p>
            <h2 className="font-serif text-3xl text-slate-purple mb-5">Build the matrix from the question to a supportable synthesis</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">1. SCOPE</p><h3 className="font-serif text-xl text-slate-purple mb-2">Start with a question</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Define the question, review purpose, source types, and time or disciplinary boundary before adding notes.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">2. RECORD</p><h3 className="font-serif text-xl text-slate-purple mb-2">Keep each source traceable</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Record the full citation or stable identifier alongside relevant claims, methods, context, findings, and stated limits.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">3. CODE</p><h3 className="font-serif text-xl text-slate-purple mb-2">Compare like with like</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Use columns or tags for themes, variables, methods, population or setting, evidence type, and limitation so distinctions remain visible.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">4. GROUP</p><h3 className="font-serif text-xl text-slate-purple mb-2">Find relationships</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Group relevant notes by shared pattern, contrast, trend, method, or condition. Re-check the original source whenever a note is unclear.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">5. ASSERT</p><h3 className="font-serif text-xl text-slate-purple mb-2">Draft a synthesis claim</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Turn a label such as “planning habit” into a cautious, cited assertion that says what the grouped sources collectively show and where they differ.</p></article>
            </div>
          </section>
          <section className="max-w-5xl mx-auto mt-7 p-7 bg-white border border-border rounded-2xl">
            <p className="text-xs font-sans font-semibold tracking-widest uppercase text-primary mb-3">
              Fictional learning example
            </p>
            <h2 className="font-serif text-3xl text-slate-purple mb-4">
              Move beyond “Source A says … Source B says …”
            </h2>
            <p className="text-sm text-foreground/80 font-sans leading-relaxed">
              <strong>This entire fictional learning example, including the table, is invented for practice and is not research evidence.</strong>{" "}
              The fictional source notes suggest that regular planning may be associated with assignment completion, but they do not support the same conclusion equally. Note A reports a positive association across its invented sample, whereas Note B observes the pattern only among fictional first-year students. Taken together, the notes point to a possible relationship while also showing that self-reported measures and small local samples limit generalisation.
            </p>
            <p className="mt-4 text-sm text-muted-foreground font-sans">
              This paragraph groups sources by a shared theme, names a
              difference, and states a cautious conclusion. It does not invent a
              research gap or claim that the evidence proves causation.
            </p>
          </section>
          <section className="max-w-5xl mx-auto mt-7 grid lg:grid-cols-2 gap-6">
            <article className="p-7 bg-hero-gradient border border-border rounded-2xl">
              <h2 className="font-serif text-3xl text-slate-purple mb-4">Let the matrix reveal questions, not prove absences</h2>
              <p className="text-sm text-muted-foreground font-sans leading-relaxed">A thin row, an underrepresented population, or a repeated limitation can help you decide what to search for next. It does not by itself establish that “no research exists.” Check the search scope, databases, vocabulary, publication dates, and disciplinary conventions before describing a field as limited or underexplored. A matrix is an organizing tool; it cannot replace reading, source evaluation, accurate paraphrasing, citation, or your instructor&apos;s requirements.</p>
            </article>
            <article className="p-7 bg-white border border-border rounded-2xl">
              <h2 className="font-serif text-3xl text-slate-purple mb-4">Use writing-center and library guidance</h2>
              <p className="text-sm text-muted-foreground font-sans leading-relaxed"><a className="text-primary underline underline-offset-4" href="https://guides.library.jhu.edu/lit-review/synthesize" target="_blank" rel="noreferrer">Johns Hopkins Libraries</a> describes a synthesis matrix as a way to record source points and relationships by theme or variable. <a className="text-primary underline underline-offset-4" href="https://writingcenter.unc.edu/tips-and-tools/literature-reviews/" target="_blank" rel="noreferrer">UNC Writing Center</a> distinguishes a source summary from a review that reorganizes information around ideas, trends, methods, or debates. <a className="text-primary underline underline-offset-4" href="https://writingcenter.gmu.edu/writing-resources/research-based-writing/organizing-literature-reviews-the-basics" target="_blank" rel="noreferrer">George Mason University Writing Center</a> recommends selecting relevant material, arranging it in a grid, grouping related points, and turning labels into assertions linked to the research question.</p>
            </article>
          </section>
          <section className="max-w-5xl mx-auto mt-7 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/literature-review-example" className="block">
              <div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30">
                <h2 className="font-serif text-xl text-slate-purple mb-2">See thematic synthesis in practice</h2>
                <p className="text-sm text-muted-foreground font-sans">Compare fictional source notes and turn them into a careful literature-review paragraph.</p>
              </div>
            </Link>
            <Link
              href="/blog/how-to-write-a-literature-review-for-international-students"
              className="block"
            >
              <div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30">
                <h2 className="font-serif text-xl text-slate-purple mb-2">
                  Read the literature review guide
                </h2>
                <p className="text-sm text-muted-foreground font-sans">
                  Plan your review structure before drafting.
                </p>
              </div>
            </Link>
            <Link href="/academic-integrity-and-source-use" className="block">
              <div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30">
                <h2 className="font-serif text-xl text-slate-purple mb-2">
                  Use sources responsibly
                </h2>
                <p className="text-sm text-muted-foreground font-sans">
                  Check paraphrasing and citation decisions.
                </p>
              </div>
            </Link>
            <Link href="/research-gap-examples" className="block">
              <div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30">
                <h2 className="font-serif text-xl text-slate-purple mb-2">State a research gap cautiously</h2>
                <p className="text-sm text-muted-foreground font-sans">Turn a specific, checked pattern into a focused next question without overstating absence.</p>
              </div>
            </Link>
            <a href={SOURCE} target="_blank" rel="noreferrer" className="block">
              <div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30">
                <h2 className="font-serif text-xl text-slate-purple mb-2">
                  Read Purdue OWL guidance
                </h2>
                <p className="text-sm text-muted-foreground font-sans">
                  Review the difference between summary and synthesis.
                </p>
              </div>
            </a>
          </section>
          <div className="max-w-5xl mx-auto mt-8 text-center">
            <Button asChild className="bg-cta-gradient text-white border-0">
              <Link href="/polish">
                Revise your source-based paragraph{" "}
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
