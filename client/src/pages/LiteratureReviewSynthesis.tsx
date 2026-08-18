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
                      <th className="text-left p-3 border">Theme</th>
                      <th className="text-left p-3 border">Source A</th>
                      <th className="text-left p-3 border">Source B</th>
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
            <p className="text-xs font-sans font-semibold tracking-widest uppercase text-primary mb-3">
              Fictional learning example
            </p>
            <h2 className="font-serif text-3xl text-slate-purple mb-4">
              Move beyond “Source A says … Source B says …”
            </h2>
            <p className="text-sm text-foreground/80 font-sans leading-relaxed">
              Studies in this fictional example suggest that regular planning
              may be associated with assignment completion, but they do not
              support the same conclusion equally. Source A reports a positive
              association across its sample, whereas Source B observes the
              pattern only among first-year students. Taken together, the
              studies point to a possible relationship while also showing that
              self-reported measures and small local samples limit
              generalisation.
            </p>
            <p className="mt-4 text-sm text-muted-foreground font-sans">
              This paragraph groups sources by a shared theme, names a
              difference, and states a cautious conclusion. It does not invent a
              research gap or claim that the evidence proves causation.
            </p>
          </section>
          <section className="max-w-5xl mx-auto mt-7 grid sm:grid-cols-3 gap-4">
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
