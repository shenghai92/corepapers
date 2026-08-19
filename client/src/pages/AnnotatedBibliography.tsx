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

          <section className="mt-8 p-7 bg-white border border-border rounded-2xl" aria-labelledby="annotated-bibliography-process-title">
            <p className="text-xs font-sans font-semibold tracking-widest uppercase text-primary mb-3">Drafting workflow</p>
            <h2 id="annotated-bibliography-process-title" className="font-serif text-3xl text-slate-purple mb-5">Build an annotation from a verified source record</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                ["1. Confirm the annotation task", "Re-read the assignment for citation style, source types, order, annotation length, spacing, headings, and whether it asks for summary, evaluation, reflection, or a combination. Do not treat one sample format as a universal rule."],
                ["2. Verify the original source record", "Open the original work or reliable publication record and confirm author, title, container, contributors, date, volume, issue, pages, DOI, URL, and access details required by the chosen style. A citation generator can draft fields but cannot prove them."],
                ["3. Identify the source&apos;s specific job", "Record the author&apos;s purpose, question, argument, method or approach, evidence, main finding or conclusion, audience, and stated limitation only as the source actually presents them."],
                ["4. Write an accurate, bounded summary", "Use your own wording to state directly relevant claims, approach, evidence, and conclusion. Do not turn a topic into a finding, make a correlation causal, transfer a result to a new population, or insert background details that do not help the assignment&apos;s reader."],
                ["5. Evaluate on a named criterion", "Assess authority, evidence, method, scope, currency, audience, perspective, limitation, or reliability in relation to the task. Replace generic praise such as “good source” with a precise, supportable reason."],
                ["6. Reflect on a specific research use", "Explain how the source informs, complicates, limits, or does not inform your defined question, claim, method, or next search. Reflection is your reasoned response, not a claim that the source itself made."],
                ["7. Compare only when the assignment calls for it", "When linking another source, identify the shared question and the exact agreement, difference, evidence condition, or perspective. Do not manufacture a debate or make one annotation perform a full Literature Review."],
                ["8. Verify format, attribution, and boundaries", "Check the citation and annotation against the original source and style guide, then confirm every summary, evaluation, reflection, quotation, and reference entry is traceable. Keep the annotation distinct from a research-paper paragraph or a final literature synthesis."],
              ].map(([title, copy], index) => <article key={title} className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">STEP {index + 1}</p><h3 className="font-serif text-xl text-slate-purple mb-2">{title}</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">{copy}</p></article>)}
            </div>
            <p className="mt-5 text-sm font-sans text-muted-foreground leading-relaxed">A fictional model can help you distinguish citation, summary, evaluation, and reflection, but use only source details and reasoning you can verify. Do not invent author credentials, design, finding, limitation, bias, usefulness, source relationship, or citation merely because a model has a place for one.</p>
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
            <p className="text-sm font-sans text-muted-foreground leading-relaxed mb-5"><strong className="text-foreground">This fictional learning example is invented for practice; it is not a real source, author, research result, evaluation, citation, or annotated bibliography to submit.</strong> The source details, author, journal, findings, and annotation below are invented learning material and must not be cited or copied into coursework.</p>
            <div className="rounded-xl bg-white border border-primary/15 p-5">
              <p className="font-sans text-sm text-foreground/80 leading-relaxed mb-4"><strong>Fictional APA-style reference:</strong> Nguyen, T. (2025). Planning routines and assignment completion in first-year courses. <em>Journal of Student Learning</em>, 9(2), 41–58. https://doi.org/10.xxxx/example</p>
              <p className="font-sans text-sm text-foreground/80 leading-relaxed">Nguyen&apos;s fictional study examines the relationship between weekly planning routines and self-reported assignment completion in first-year courses. The article uses a cross-sectional survey and reports an association between more frequent planning and higher completion scores. Although the fictional design cannot establish causation and depends on self-reported data, it is useful for a project asking how planning practices may relate to students&apos; deadline management. A further source with observational or longitudinal evidence would be needed to evaluate change over time.</p>
            </div>
            <p className="mt-4 text-sm font-sans text-muted-foreground leading-relaxed">The annotation identifies a purpose, method, main finding, limit, and specific relevance. It does not say merely that the source is “good” or repeat background details unrelated to the research question.</p>
          </section>

          <section className="mt-8 grid lg:grid-cols-2 gap-6">
            <article className="p-7 bg-white border border-border rounded-2xl">
              <h2 className="font-serif text-3xl text-slate-purple mb-4">Use a source record before drafting</h2>
              <ul className="space-y-3 text-sm font-sans text-muted-foreground leading-relaxed"><li><strong className="text-foreground">Citation record:</strong> can you verify each field in the required reference against the original work or reliable publication record?</li><li><strong className="text-foreground">Summary record:</strong> can you distinguish the author&apos;s purpose, approach, evidence, and conclusion from your response to the source?</li><li><strong className="text-foreground">Evaluation record:</strong> can you identify one relevant authority, evidence, scope, audience, perspective, or limitation criterion without generic praise?</li><li><strong className="text-foreground">Research-use record:</strong> can you explain precisely how the source supports, complicates, limits, or redirects your current research task?</li></ul>
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

          <section className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/evaluate-academic-sources" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Evaluate the source</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Check author, purpose, evidence, currency, context, and cross-checking before writing the annotation.</p></article></Link>
            <Link href="/how-to-paraphrase-without-plagiarizing" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Summarize and paraphrase responsibly</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Understand the original and rebuild the relevant point before making it part of an annotation.</p></article></Link>
            <Link href="/citations" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Check the citation</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Generate and review a reference only after verifying source details against the original record.</p></article></Link>
            <Link href="/literature-review-synthesis-matrix" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Synthesize across sources</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Use source records to find relationships before drafting a Literature Review.</p></article></Link>
            <Link href="/literature-review-example" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Build a theme-led review</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Move from individual annotations to a cautious cross-source claim without making a reading list do synthesis work.</p></article></Link>
            <Link href="/research-question-examples" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Refine the research question</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Use the source record to test what question the available evidence can actually address.</p></article></Link>
            <Link href="/academic-integrity-and-source-use" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Keep source use traceable</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Distinguish source claims, your paraphrase, evaluation, reflection, quotation, and citation choices.</p></article></Link>
            <Link href="/academic-argument-evidence" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Build an evidence-led argument</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Decide when a source record is ready to inform a claim, reason, counterpoint, or limitation in the paper.</p></article></Link>
          </section>
          <div className="text-center mt-10"><Button asChild className="bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90"><Link href="/polish">Polish an annotation draft <ArrowRight size={16} className="ml-2" /></Link></Button></div>
        </div>
      </main>
    </>
  );
}
