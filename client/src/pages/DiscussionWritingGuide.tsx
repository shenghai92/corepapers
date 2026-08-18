import { Link } from "wouter";
import {
  ArrowRight,
  CheckCircle2,
  GitCompareArrows,
  Lightbulb,
  Scale,
  Waypoints,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";

const STEPS = [
  ["Return to the question", "Briefly remind readers of the research problem and state the principal answer or pattern. Do not reproduce every number, table, quotation, or theme from Results."],
  ["Explain what the finding may mean", "Interpret the relationship, pattern, exception, or absence of a pattern in language that the design and evidence can support."],
  ["Compare with relevant research", "Show where the finding aligns with, extends, qualifies, or differs from carefully chosen studies. Explain the comparison; do not simply attach citations."],
  ["Consider alternatives and limits", "Address plausible alternative explanations, unexpected findings, scope conditions, and limitations honestly. A limitation changes what can be concluded; it is not a reason to abandon the analysis."],
  ["State a proportionate implication", "End with what the analysis contributes and, if useful, a focused next question. Keep practical recommendations and future research tied to the evidence and assignment expectations."],
] as const;

export default function DiscussionWritingGuide() {
  return (
    <>
      <SEOHead
        title="How to Write a Discussion Section: Structure and Checklist"
        description="Learn how to write a discussion section for a research paper: interpret findings, compare prior research, address limitations, state careful implications, and avoid repeating Results."
        keywords="how to write discussion section, discussion section research paper, discussion section structure, how to discuss research findings, results vs discussion section"
        canonical="/how-to-write-discussion-section/"
      />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container max-w-5xl">
          <header className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-sans font-medium mb-4"><Waypoints size={14} /> Research paper discussion guide</div>
            <h1 className="font-serif font-light text-4xl sm:text-5xl text-slate-purple mb-4 leading-tight">How to write a discussion section: <span className="italic">move from findings to meaning</span></h1>
            <p className="text-muted-foreground font-sans leading-relaxed text-lg">A discussion section explains what your findings mean in relation to the question, prior research, and the limits of the study. It does more than report results, but it cannot claim more than the evidence allows.</p>
          </header>

          <section className="p-7 bg-white border border-border rounded-2xl">
            <h2 className="font-serif text-3xl text-slate-purple mb-3">The discussion interprets; it does not become a second Results section</h2>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed">Most research reports use the Results section to show what the analysis found and the Discussion to explain why the pattern matters. The Discussion reconnects readers to the research question and literature, tests possible interpretations, explains boundaries, and states a careful contribution. Some disciplines combine Results and Discussion, so follow the format, evidence expectations, and terminology required by your course, supervisor, or target journal.</p>
          </section>

          <section className="mt-6 grid md:grid-cols-3 gap-5">
            <article className="p-6 bg-white border border-border rounded-2xl"><GitCompareArrows size={22} className="text-primary mb-4" /><h2 className="font-serif text-2xl text-slate-purple mb-2">Results</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Report the observed finding in a logical order. Tables, figures, quotations, themes, and statistics help readers see what was found.</p></article>
            <article className="p-6 bg-hero-gradient border border-border rounded-2xl"><Lightbulb size={22} className="text-primary mb-4" /><h2 className="font-serif text-2xl text-slate-purple mb-2">Discussion</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Interpret the finding, compare it with relevant scholarship, test alternative explanations, acknowledge limits, and explain its bounded significance.</p></article>
            <article className="p-6 bg-white border border-border rounded-2xl"><Scale size={22} className="text-primary mb-4" /><h2 className="font-serif text-2xl text-slate-purple mb-2">Conclusion</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Bring the overall paper to a concise close by returning to its central answer and contribution without reopening the full analysis or adding new evidence.</p></article>
          </section>

          <section className="mt-8 p-7 bg-hero-gradient border border-border rounded-2xl">
            <p className="text-xs font-sans uppercase tracking-widest text-primary font-semibold mb-3">A flexible discussion sequence</p>
            <h2 className="font-serif text-3xl text-slate-purple mb-5">Give each paragraph an interpretive job</h2>
            <div className="space-y-3">
              {STEPS.map(([title, copy], index) => <article key={title} className="rounded-xl bg-white/80 border border-white p-5"><div className="flex gap-3"><span className="inline-flex items-center justify-center shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary font-sans text-sm font-semibold">{index + 1}</span><div><h3 className="font-serif text-xl text-slate-purple mb-1">{title}</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">{copy}</p></div></div></article>)}
            </div>
            <p className="mt-5 text-sm font-sans text-muted-foreground leading-relaxed">This is a planning sequence, not a universal template. A short laboratory report may be more concise; a dissertation chapter may use thematic subheadings; a humanities project may interpret an argument or corpus rather than numerical findings. Keep the order that makes your evidence and reasoning easiest to follow.</p>
          </section>

          <section className="mt-8 grid lg:grid-cols-2 gap-6">
            <article className="p-7 bg-white border border-border rounded-2xl">
              <p className="text-xs font-sans uppercase tracking-widest text-primary font-semibold mb-3">Fictional learning example</p>
              <h2 className="font-serif text-3xl text-slate-purple mb-4">Bridge a finding to a cautious interpretation</h2>
              <p className="text-sm font-sans text-muted-foreground leading-relaxed mb-4">This fictional learning example is invented for practice. The study, participants, data, findings, citations, and implication below are not real evidence and must not be submitted as research.</p>
              <div className="rounded-xl bg-hero-gradient border border-border p-5 text-sm font-sans text-foreground/80 leading-relaxed">In this fictional study, frequent weekly planning was associated with higher self-reported assignment completion among first-year students. This pattern may suggest that planning routines help some students make deadlines more visible; however, the cross-sectional self-report design cannot show that planning caused completion. The result is consistent with fictional work on deadline awareness, but it may also reflect differences in workload, prior study habits, or course support. Because the sample came from one programme, the finding should not be generalized to all students. Future research could examine planning routines over time while accounting for work schedules and course demands.</div>
            </article>
            <article className="p-7 bg-white border border-border rounded-2xl">
              <p className="text-xs font-sans uppercase tracking-widest text-primary font-semibold mb-3">Paragraph-level self-check</p>
              <h2 className="font-serif text-3xl text-slate-purple mb-4">Can a reader follow the reasoning?</h2>
              <ul className="space-y-3 text-sm font-sans text-muted-foreground leading-relaxed">
                {["Does the paragraph identify the finding only as much as readers need to follow the interpretation?", "Have you explained how the finding answers or complicates the research question?", "When you compare prior work, have you made the relationship or difference explicit?", "Have you distinguished a possible explanation from a demonstrated conclusion?", "Do the limitation and implication match the study design, evidence, scope, and uncertainty?"].map(item => <li key={item} className="flex gap-3"><CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />{item}</li>)}
              </ul>
            </article>
          </section>

          <section className="mt-8 grid lg:grid-cols-2 gap-6">
            <article className="p-7 bg-white border border-border rounded-2xl"><h2 className="font-serif text-3xl text-slate-purple mb-4">Common revision problems</h2><ul className="space-y-3 text-sm font-sans text-muted-foreground leading-relaxed"><li><strong>Repeating Results:</strong> use a short bridge to the relevant finding, then spend the paragraph on explanation and significance.</li><li><strong>Ignoring disagreement:</strong> if previous research differs, explain possible differences in samples, settings, designs, measures, or scope instead of omitting it.</li><li><strong>Overstating:</strong> correlation, a small sample, a single context, or one method may support a cautious interpretation, not a universal causal claim.</li><li><strong>Hiding limitations:</strong> name important limits and explain their effect on interpretation without apologizing or undermining the work.</li><li><strong>Adding new evidence:</strong> introduce necessary results and sources in the right part of the paper rather than using the Discussion to rescue an unsupported claim.</li></ul></article>
            <article className="p-7 bg-white border border-border rounded-2xl"><h2 className="font-serif text-3xl text-slate-purple mb-4">Use language that signals the right level of certainty</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed mb-4">Match verbs to what your design and evidence can show:</p><div className="space-y-3 text-sm font-sans text-muted-foreground leading-relaxed"><p><strong>For interpretation:</strong> “may suggest,” “is consistent with,” “could reflect,” “offers one explanation for,” or “points to a pattern in this sample.”</p><p><strong>For comparison:</strong> “aligns with,” “differs from,” “extends,” “qualifies,” or “contrasts with” prior work.</p><p><strong>For limitations:</strong> “should be interpreted in light of,” “was limited to,” “cannot establish,” or “may not generalize beyond.”</p><p><strong>For implications:</strong> “may inform,” “provides a basis for,” or “warrants further examination.”</p></div></article>
          </section>

          <section className="mt-8 p-7 bg-white border border-border rounded-2xl">
            <h2 className="font-serif text-3xl text-slate-purple mb-3">Use authoritative guidance, then follow the required format</h2>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed"><a className="text-primary underline underline-offset-4" href="https://libguides.usc.edu/writingguide/discussion" target="_blank" rel="noreferrer">USC Libraries</a> describes a discussion as evidence-based interpretation that reconnects findings to the research problem, prior research, alternative explanations, limitations, and a concise implication. <a className="text-primary underline underline-offset-4" href="https://explore.plos.org/author-resources/how-to-write-effective-discussions-and-conclusions" target="_blank" rel="noreferrer">PLOS author resources</a> recommends leading with principal findings, placing them in context, acknowledging limitations, and avoiding overstated importance. <a className="text-primary underline underline-offset-4" href="https://guides.lib.uci.edu/scientificwriting/discussion" target="_blank" rel="noreferrer">UC Irvine Libraries</a> cautions against repeating Results, ignoring non-supporting findings, or drawing conclusions without a logical evidence path. Your discipline may organize this work differently, so give priority to the assignment rubric or journal instructions.</p>
          </section>

          <section className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/results-section-example-research-paper" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Separate Results from Discussion</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Practice reporting a finding before you interpret it.</p></article></Link>
            <Link href="/discussion-section-example-research-paper" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">See a discussion example</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Review a shorter fictional model and section checklist.</p></article></Link>
            <Link href="/phrases/discussion" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Use discussion phrases</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Adapt cautious language for interpretation, limits, and implications.</p></article></Link>
            <Link href="/conclusion-section-example-research-paper" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Close the full paper</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Keep the final takeaway concise once the discussion is complete.</p></article></Link>
          </section>

          <div className="text-center mt-10"><Button asChild className="bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90"><Link href="/polish">Polish a discussion paragraph <ArrowRight size={16} className="ml-2" /></Link></Button></div>
        </div>
      </main>
    </>
  );
}
