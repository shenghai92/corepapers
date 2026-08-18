import { Link } from "wouter";
import { ArrowRight, BookMarked, CheckCircle2, SearchCheck, Sparkles } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";

const SOURCE_LINKS = {
  unc: "https://writingcenter.unc.edu/tips-and-tools/annotated-bibliographies/",
  gmu: "https://writingcenter.gmu.edu/writing-resources/research-based-writing/a-guide-to-annotated-bibliographies",
  purdue: "https://owl.purdue.edu/owl/general_writing/common_writing_assignments/annotated_bibliographies/index.html",
};

export default function AnnotatedBibliography() {
  return (
    <>
      <SEOHead
        title="Annotated Bibliography Example: Citation, Summary, Evaluation, and Reflection"
        description="Use a fictional annotated bibliography example and a practical checklist to distinguish citation, source summary, evaluation, and research relevance."
        keywords="annotated bibliography example, how to write annotated bibliography, annotated bibliography template, annotated bibliography summary evaluation"
        canonical="/annotated-bibliography-example/"
      />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container max-w-5xl">
          <header className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-sans font-medium mb-4"><BookMarked size={14} /> Source-based writing practice</div>
            <h1 className="font-serif font-light text-4xl sm:text-5xl text-slate-purple mb-4 leading-tight">Annotated bibliography example: <span className="italic">citation, summary, and evaluation</span></h1>
            <p className="text-muted-foreground font-sans leading-relaxed text-lg">Use a clear workflow to show what a source says, assess its usefulness, and explain how it informs a focused research project.</p>
          </header>

          <section className="p-7 bg-white border border-border rounded-2xl">
            <h2 className="font-serif text-3xl text-slate-purple mb-3">An annotation adds analysis beyond a reference entry</h2>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed">An annotated bibliography lists sources and adds a brief note for each one. Depending on the assignment, an annotation may summarize the source, evaluate its authority or limits, and reflect on how the source fits your research question. Citation style, length, headings, and required annotation type must follow the assignment instructions.</p>
          </section>

          <section className="mt-6 grid md:grid-cols-3 gap-5">
            {[
              [BookMarked, "1. Cite", "Record the source in the required style after checking the original author, title, container, date, pages, DOI, or URL."],
              [SearchCheck, "2. Summarize", "State the author’s purpose, approach, main claim or finding, and conclusion in your own accurate wording."],
              [Sparkles, "3. Evaluate and reflect", "Explain relevant strengths, limits, audience, or usefulness for your particular project when your assignment requires it."],
            ].map(([Icon, title, copy]) => {
              const CardIcon = Icon as typeof BookMarked;
              return <article key={title as string} className="p-6 bg-white border border-border rounded-2xl"><CardIcon size={22} className="text-primary mb-4" /><h2 className="font-serif text-2xl text-slate-purple mb-2">{title as string}</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">{copy as string}</p></article>;
            })}
          </section>

          <section className="mt-8 p-7 bg-hero-gradient border border-border rounded-2xl">
            <p className="text-xs font-sans uppercase tracking-widest text-primary font-semibold mb-3">Fictional learning example</p>
            <h2 className="font-serif text-3xl text-slate-purple mb-4">A combined summary and evaluative annotation</h2>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed mb-5">The source details, author, journal, findings, and annotation below are fictional learning material. They are not a real source, research result, or completed student submission, and must not be cited or copied into coursework.</p>
            <div className="rounded-xl bg-white border border-primary/15 p-5">
              <p className="font-sans text-sm text-foreground/80 leading-relaxed mb-4"><strong>Fictional APA-style reference:</strong> Nguyen, T. (2025). Planning routines and assignment completion in first-year courses. <em>Journal of Student Learning</em>, 9(2), 41–58. https://doi.org/10.xxxx/example</p>
              <p className="font-sans text-sm text-foreground/80 leading-relaxed">Nguyen&apos;s fictional study examines the relationship between weekly planning routines and self-reported assignment completion in first-year courses. The article uses a cross-sectional survey and reports an association between more frequent planning and higher completion scores. Although the fictional design cannot establish causation and depends on self-reported data, it is useful for a project asking how planning practices may relate to students&apos; deadline management. A further source with observational or longitudinal evidence would be needed to evaluate change over time.</p>
            </div>
            <p className="mt-4 text-sm font-sans text-muted-foreground leading-relaxed">The annotation identifies a purpose, method, main finding, limit, and specific relevance. It does not say merely that the source is “good” or repeat background details unrelated to the research question.</p>
          </section>

          <section className="mt-8 grid lg:grid-cols-2 gap-6">
            <article className="p-7 bg-white border border-border rounded-2xl">
              <h2 className="font-serif text-3xl text-slate-purple mb-4">Choose the annotation your assignment asks for</h2>
              <ul className="space-y-3 text-sm font-sans text-muted-foreground leading-relaxed">
                {["Summary: explain the source’s purpose, method or approach, and main conclusion.", "Evaluation: assess authority, evidence, perspective, limitations, or suitability for a defined audience.", "Reflection: explain how the source informed, complicated, or did not inform your own research path.", "Combination: integrate summary and evaluation when the assignment asks for both."].map(item => <li key={item} className="flex gap-3"><CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />{item}</li>)}
              </ul>
            </article>
            <article className="p-7 bg-white border border-border rounded-2xl">
              <h2 className="font-serif text-3xl text-slate-purple mb-4">Before you submit</h2>
              <ul className="space-y-3 text-sm font-sans text-muted-foreground leading-relaxed">
                {["Have you followed the requested citation style and source order?", "Does the summary accurately state the source’s own conclusion rather than your response to it?", "Is the evaluation tied to a relevant criterion such as evidence, scope, method, audience, or authority?", "Have you connected usefulness to your exact research question rather than adding generic praise?", "Did you check your course rules for word count, paragraphing, spacing, and headings?"].map(item => <li key={item} className="flex gap-3"><CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />{item}</li>)}
              </ul>
            </article>
          </section>

          <section className="mt-8 p-7 bg-white border border-border rounded-2xl">
            <h2 className="font-serif text-3xl text-slate-purple mb-3">Use authoritative guidance, then follow the assignment</h2>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed">The <a className="text-primary underline underline-offset-4" href={SOURCE_LINKS.unc} target="_blank" rel="noreferrer">UNC Writing Center</a> explains that annotated bibliographies can include citation information, explanation of main points, authority assessment, usefulness, perspective, and links to related work. The <a className="text-primary underline underline-offset-4" href={SOURCE_LINKS.gmu} target="_blank" rel="noreferrer">George Mason University Writing Center</a> distinguishes summary, evaluation, and reflection, while <a className="text-primary underline underline-offset-4" href={SOURCE_LINKS.purdue} target="_blank" rel="noreferrer">Purdue OWL</a> frames annotations as summaries and/or evaluations. Your professor determines which elements, length, and citation style apply.</p>
          </section>

          <section className="mt-8 grid sm:grid-cols-3 gap-4">
            <Link href="/evaluate-academic-sources" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Evaluate the source</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Check author, purpose, evidence, currency, and cross-checking before writing the annotation.</p></article></Link>
            <Link href="/citations" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Check the citation</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Generate and review a reference only after verifying the source details.</p></article></Link>
            <Link href="/literature-review-synthesis-matrix" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Synthesize across sources</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Use source notes to find relationships before drafting a literature review.</p></article></Link>
          </section>
          <div className="text-center mt-10"><Button asChild className="bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90"><Link href="/polish">Polish an annotation draft <ArrowRight size={16} className="ml-2" /></Link></Button></div>
        </div>
      </main>
    </>
  );
}
