import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Layers3, Network, SearchCheck } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";

const SOURCE = {
  gmu: "https://writingcenter.gmu.edu/writing-resources/research-based-writing/writing-a-literature-review",
  unc: "https://writingcenter.unc.edu/tips-and-tools/literature-reviews/",
  jhu: "https://guides.library.jhu.edu/lit-review/synthesize",
};

export default function LiteratureReviewExample() {
  return (
    <>
      <SEOHead
        title="Literature Review Example: Thematic Synthesis and Research Gap"
        description="Use a fictional literature review example to organize sources by theme, write synthesis paragraphs, and identify a cautious research gap without listing one study at a time."
        keywords="literature review example, literature review synthesis example, thematic literature review, research gap example, how to write literature review"
        canonical="/literature-review-example/"
      />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container max-w-5xl">
          <header className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-sans font-medium mb-4">
              <Layers3 size={14} /> Literature review practice
            </div>
            <h1 className="font-serif font-light text-4xl sm:text-5xl text-slate-purple mb-4 leading-tight">
              Literature review example: <span className="italic">synthesize by theme</span>
            </h1>
            <p className="text-muted-foreground font-sans leading-relaxed text-lg">
              See how to move from isolated source notes to a thematic paragraph, then describe a limited research gap without claiming that no research exists.
            </p>
          </header>

          <section className="p-7 bg-white border border-border rounded-2xl">
            <h2 className="font-serif text-3xl text-slate-purple mb-3">A review maps a conversation, not a reading list</h2>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed">
              A literature review explains what relevant scholarship says, how studies connect or differ, and what the pattern means for a focused research problem. It usually needs summary and synthesis. Organizing one source per paragraph often leaves readers with a sequence of reports rather than a reasoned account of the field.
            </p>
          </section>

          <section className="mt-8 p-7 bg-white border border-border rounded-2xl" aria-labelledby="literature-review-process-title">
            <p className="text-xs font-sans font-semibold tracking-widest uppercase text-primary mb-3">Drafting workflow</p>
            <h2 id="literature-review-process-title" className="font-serif text-3xl text-slate-purple mb-5">Build a Literature Review from source relationships, not source order</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                ["1. Confirm the review task and reader", "Re-read the assignment, paper type, scope, expected source types, evidence standard, and whether the review is a stand-alone paper, proposal section, or part of a larger report. Decide what a disciplinary but non-specialist reader must understand."],
                ["2. Build a source relationship record", "For each potentially relevant source, record its question, claim, evidence, method, setting, population or material, conclusion, limitation, and full citation. Keep a note traceable to the original source rather than relying on a memory or a copied sentence."],
                ["3. Choose an organizing lens", "Group sources by a genuine shared theme, question, method, variable, debate, historical shift, theoretical position, or context. Do not use an author-by-author order unless the assignment specifically needs an intellectual history."],
                ["4. Check evidence scope before grouping", "Ask what each source can actually support and where designs, measures, samples, dates, settings, or definitions differ. A shared keyword does not make evidence comparable, and a small source set does not automatically represent a field."],
                ["5. Draft a theme-led claim", "Begin the paragraph with your own carefully limited point about a relationship across sources, then use selected evidence to show how the pattern, contrast, exception, or limit supports that point."],
                ["6. Compare on a specific basis", "Name the question, evidence type, method, population, setting, time frame, outcome, or conclusion that makes sources align, differ, or qualify one another. Do not place author names beside each other and call that synthesis."],
                ["7. Frame a bounded research limitation or next question", "Describe a limited, mixed, conflicting, underexplored, or context-bound pattern that is visible in the reviewed material. Connect the next question to that specific pattern without claiming that no research exists."],
                ["8. Verify attribution and review boundaries", "Check every source claim, quotation, paraphrase, synthesis statement, and reference entry against the original. Keep your review distinct from an Introduction&apos;s short context, a Methods section, new data, or a Conclusion&apos;s final contribution."],
              ].map(([title, copy], index) => (
                <article key={title} className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">STEP {index + 1}</p><h3 className="font-serif text-xl text-slate-purple mb-2">{title}</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">{copy}</p></article>
              ))}
            </div>
            <p className="mt-5 text-sm font-sans text-muted-foreground leading-relaxed">A fictional model can help you practise synthesis, but use only source relationships you can trace to your own verified reading. Do not invent an author, study, research gap, agreement, disagreement, method, result, limitation, or citation merely because a model has a place for one.</p>
          </section>

          <section className="mt-6 grid md:grid-cols-3 gap-5">
            {[
              [Network, "Group by a meaningful pattern", "Sort evidence around themes, approaches, debates, populations, or time periods only when that order helps readers understand the question."],
              [SearchCheck, "Compare before you draft", "Record what each source studies, how it studies it, what it finds, and where its scope or design differs from related sources."],
              [CheckCircle2, "State the gap carefully", "A gap can be a limited population, context, method, outcome, or unresolved inconsistency. It is not automatically proof that no research exists."],
            ].map(([Icon, title, copy]) => {
              const CardIcon = Icon as typeof Network;
              return (
                <article key={title as string} className="p-6 bg-white border border-border rounded-2xl">
                  <CardIcon size={22} className="text-primary mb-4" />
                  <h2 className="font-serif text-2xl text-slate-purple mb-2">{title as string}</h2>
                  <p className="text-sm font-sans text-muted-foreground leading-relaxed">{copy as string}</p>
                </article>
              );
            })}
          </section>

          <section className="mt-8 p-7 bg-hero-gradient border border-border rounded-2xl">
            <p className="text-xs font-sans uppercase tracking-widest text-primary font-semibold mb-3">Fictional learning example</p>
            <h2 className="font-serif text-3xl text-slate-purple mb-4">From notes to a thematic synthesis paragraph</h2>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed mb-5">
              <strong className="text-foreground">This fictional learning example is invented for practice; it is not a real study, author, finding, research gap, citation, or Literature Review to submit.</strong> The studies, authors, findings, and citations below are invented learning material; they are not real evidence and must not be submitted as research sources.
            </p>
            <div className="grid lg:grid-cols-3 gap-4 mb-5">
              {[
                ["Study A", "Weekly planning was associated with self-reported assignment completion among first-year students."],
                ["Study B", "Calendar reminders helped students notice deadlines, but the study did not measure completed work."],
                ["Study C", "Interview participants described planning as useful when they could adapt routines around paid work."],
              ].map(([label, note]) => (
                <div key={label} className="rounded-xl bg-white/80 border border-white p-4">
                  <p className="font-sans text-xs font-semibold text-primary mb-2">{label} — fictional note</p>
                  <p className="font-sans text-sm text-foreground/80 leading-relaxed">{note}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl bg-white border border-primary/15 p-5">
              <p className="font-sans text-xs font-semibold uppercase tracking-wider text-primary mb-3">Thematic synthesis paragraph</p>
              <p className="font-sans text-sm text-foreground/80 leading-relaxed">
                Across the fictional studies, planning tools appear most useful when they make upcoming deadlines visible and fit into students&apos; existing routines. Study A links frequent planning with self-reported completion, while Study B narrows the possible mechanism to noticing deadlines rather than demonstrating completed work. Study C further suggests that routine flexibility may shape whether students use planning consistently. Together, these findings point to a need for research that examines completion outcomes alongside students&apos; work schedules rather than treating planning as a uniform practice (Fictional Author, year).
              </p>
            </div>
            <p className="mt-4 text-sm font-sans text-muted-foreground leading-relaxed">
              The paragraph begins with a theme, compares sources, identifies a limit in the pattern, and ends with a cautious next question. It does not announce one source after another or claim that the fictional evidence proves causation.
            </p>
          </section>

          <section className="mt-8 grid lg:grid-cols-2 gap-6">
            <article className="p-7 bg-white border border-border rounded-2xl">
              <h2 className="font-serif text-3xl text-slate-purple mb-4">Use a source relationship record before drafting</h2>
              <ul className="space-y-3 text-sm text-muted-foreground font-sans leading-relaxed"><li><strong className="text-foreground">Question-to-source check:</strong> can you state how each source addresses the review question rather than only its general topic?</li><li><strong className="text-foreground">Evidence-and-context check:</strong> can you identify relevant design, method, sample, material, setting, time, measure, and limit before comparing a finding?</li><li><strong className="text-foreground">Relationship check:</strong> can you name the exact basis on which sources align, differ, extend, or leave a point unresolved?</li><li><strong className="text-foreground">Attribution check:</strong> can a reader trace each summary, paraphrase, quotation, and citation to the original source and appropriate reference entry?</li></ul>
            </article>
            <article className="p-7 bg-white border border-border rounded-2xl">
              <h2 className="font-serif text-3xl text-slate-purple mb-4">Check your research-gap wording</h2>
              <ul className="space-y-3 text-sm text-muted-foreground font-sans leading-relaxed">
                {[
                  "Does the gap describe the limits of the sources you actually reviewed?",
                  "Have you named a population, setting, method, outcome, or disagreement that makes the next question focused?",
                  "Have you avoided saying ‘no studies exist’ unless your search process can support that very strong claim?",
                  "Does your next question follow logically from the synthesis rather than from a topic you simply prefer?",
                ].map(item => <li key={item} className="flex gap-3"><CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />{item}</li>)}
              </ul>
            </article>
          </section>

          <section className="mt-8 p-7 bg-white border border-border rounded-2xl">
            <h2 className="font-serif text-3xl text-slate-purple mb-3">Use writing-center guidance, then follow your assignment</h2>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed">
              The <a className="text-primary underline underline-offset-4" href={SOURCE.gmu} target="_blank" rel="noreferrer">George Mason University Writing Center</a> explains that a literature review should synthesize rather than sequence summaries, organize material around themes or approaches, and use a writer-led point to introduce source discussion. The <a className="text-primary underline underline-offset-4" href={SOURCE.unc} target="_blank" rel="noreferrer">UNC Writing Center</a> likewise distinguishes summary from synthesis and describes thematic, chronological, and methodological structures. <a className="text-primary underline underline-offset-4" href={SOURCE.jhu} target="_blank" rel="noreferrer">Johns Hopkins Libraries</a> explains that a synthesis matrix can record source points and relationships by theme or variable before writers weave them into a narrative. Your instructor or discipline may use a different review type or evidence standard.
            </p>
          </section>

          <section className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/literature-review-synthesis-matrix" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Build a synthesis matrix</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Sort source notes by theme before drafting the paragraph.</p></article></Link>
            <Link href="/research-gap-examples" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">State a research gap</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Check whether a limit is supportable, meaningful, and feasible before writing the rationale.</p></article></Link>
            <Link href="/research-question-examples" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Refine the next question</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Turn a cautiously identified limit into a focused research question.</p></article></Link>
            <Link href="/phrases/literature-review" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Use Literature Review phrases</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Adapt careful language for comparisons, patterns, evidence limits, and research gaps.</p></article></Link>
            <Link href="/introduction-section-example-research-paper" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Separate the Introduction&apos;s job</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Keep short opening context distinct from the fuller cross-source synthesis that belongs in a Literature Review.</p></article></Link>
            <Link href="/academic-argument-evidence" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Build an evidence-led argument</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Connect the synthesized pattern to a traceable claim, reasoning path, counterpoint, and bounded conclusion.</p></article></Link>
            <Link href="/hedging-language-academic-writing" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Calibrate the synthesis claim</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Match claims about agreement, difference, and research limitations to the evidence and uncertainty you have checked.</p></article></Link>
            <Link href="/academic-integrity-and-source-use" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Keep source use traceable</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Distinguish source claims, summaries, paraphrases, quotations, synthesis, and your own reasoning.</p></article></Link>
            <Link href="/citations" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Verify citations in context</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Check that every source-based relationship is accurately attributed and matched to its reference entry.</p></article></Link>
          </section>

          <div className="text-center mt-10">
            <Button asChild className="bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90"><Link href="/polish">Polish a literature review draft <ArrowRight size={16} className="ml-2" /></Link></Button>
          </div>
        </div>
      </main>
    </>
  );
}
