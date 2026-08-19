import { Link } from "wouter";
import { ArrowRight, CheckCircle2, GitBranch, ListTree, PencilRuler } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";

const OUTLINE_STEPS = [
  ["I. Introduction", "Context, a focused problem, a thesis or research question, and—when appropriate—a concise paper map."],
  ["II. Theme or claim one", "A topic sentence or subclaim, relevant evidence, explanation, and a link to the next point."],
  ["III. Theme or claim two", "A second stage of reasoning, comparison, alternative explanation, or counterargument as the assignment requires."],
  ["IV. Research-method section or evidence approach", "For empirical work, state design, data, and analysis. For argumentative work, explain source selection or analytical approach only if the assignment expects it."],
  ["V. Findings, analysis, or developed body sections", "Arrange evidence in the order that best helps the reader follow the argument; do not force an IMRaD section into a paper that does not use it."],
  ["VI. Conclusion", "Return to the central answer, summarize the contribution, and state a proportionate implication without adding new evidence."],
];

export default function ResearchPaperOutline() {
  return (
    <>
      <SEOHead
        title="Research Paper Outline Template: Structure and Evidence Plan"
        description="Use a flexible research paper outline template to organize a thesis, claims, evidence, section functions, and revision checks without treating one outline as universal."
        keywords="research paper outline template, research paper outline example, how to outline research paper, academic paper outline"
        canonical="/research-paper-outline-template/"
      />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container max-w-5xl">
          <header className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-sans font-medium mb-4"><ListTree size={14} /> Research writing planner</div>
            <h1 className="font-serif font-light text-4xl sm:text-5xl text-slate-purple mb-4 leading-tight">Research paper outline template for <span className="italic">a logical evidence path</span></h1>
            <p className="text-muted-foreground font-sans leading-relaxed text-lg">Use this adaptable outline to plan what each section needs to do, then revise it as your argument, evidence, and assignment requirements become clearer.</p>
          </header>

          <section className="p-7 bg-white border border-border rounded-2xl">
            <h2 className="font-serif text-3xl text-slate-purple mb-3">An outline is a decision tool, not a paper to fill in</h2>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed">A useful outline makes the relationship among ideas visible. It helps you group related evidence, decide the order of claims, locate missing support, and prevent a draft from becoming a list of disconnected points. Its format may use Roman numerals, headings, bullets, complete sentences, or fragments depending on your discipline and working style.</p>
          </section>

          <section className="mt-8 p-7 bg-white border border-border rounded-2xl" aria-labelledby="research-outline-process-title">
            <p className="text-xs font-sans font-semibold tracking-widest uppercase text-primary mb-3">Planning workflow</p>
            <h2 id="research-outline-process-title" className="font-serif text-3xl text-slate-purple mb-5">Build an outline from a task, evidence path, and reader&apos;s next question</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                ["1. Confirm the task and reader", "Re-read the assignment, paper type, required sections, length, source expectations, evidence rules, and audience. Decide whether you are planning an argument, literature review, proposal, empirical report, reflection, or another genre before importing a generic outline."],
                ["2. State a working purpose or claim", "Write a provisional research question, thesis, purpose, hypothesis, or central problem that gives the outline a direction. Let research change it when needed; do not force later evidence to prove an early wording."],
                ["3. Inventory usable material", "List verified sources, data, observations, examples, concepts, quotations, counterpoints, methods, or required sections. Note what each item can support and what it cannot establish before treating it as evidence."],
                ["4. Group related work", "Combine material by claim, question, theme, reason, evidence condition, method, time, setting, or other meaningful relationship. Keep a body section from becoming a pile of notes collected in search order."],
                ["5. Choose a reader-facing order", "Arrange sections from general to specific, question to answer, cause to effect, claim to counterclaim, chronology, method to results, or another route that genuinely helps the reader follow the task. A familiar IMRaD sequence is not universal."],
                ["6. Label hierarchy and evidence jobs", "Use headings, numbers, bullets, phrases, or complete sentences in whatever format suits the assignment. For each main and subpoint, state its function, planned support, explanation, limit, transition, and the reader question it answers."],
                ["7. Check the full paper contract", "Trace the working question or claim through Introduction, source approach or method, body evidence or findings, interpretation, and conclusion. Remove headings that do not advance the purpose and separate reporting from interpretation where the genre requires it."],
                ["8. Revise as research develops", "Update the order when new evidence, feedback, source limits, a changed question, or a clearer claim changes the paper&apos;s best route. The final outline should describe the completed paper, not preserve a convenient early plan."],
              ].map(([title, copy], index) => <article key={title} className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">STEP {index + 1}</p><h3 className="font-serif text-xl text-slate-purple mb-2">{title}</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">{copy}</p></article>)}
            </div>
            <p className="mt-5 text-sm font-sans text-muted-foreground leading-relaxed">A fictional template can help you see hierarchy and sequence, but use only your own verified task, evidence, sources, findings, required sections, and argument. Do not invent a study, quotation, source, result, counterargument, method, or conclusion merely because an outline has a heading for it.</p>
          </section>

          <section className="mt-6 grid md:grid-cols-3 gap-5">
            {[
              [PencilRuler, "Begin with purpose", "Clarify the question, thesis, or central task before deciding what each major section must prove or explain."],
              [GitBranch, "Group and order", "Collect related claims and evidence, then order sections from general to specific or in another sequence that readers can follow."],
              [CheckCircle2, "Revise as you learn", "Change the outline when new evidence, feedback, or a clearer argument changes the paper’s best structure."],
            ].map(([Icon, title, copy]) => {
              const CardIcon = Icon as typeof PencilRuler;
              return <article key={title as string} className="p-6 bg-white border border-border rounded-2xl"><CardIcon size={22} className="text-primary mb-4" /><h2 className="font-serif text-2xl text-slate-purple mb-2">{title as string}</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">{copy as string}</p></article>;
            })}
          </section>

          <section className="mt-8 p-7 bg-hero-gradient border border-border rounded-2xl">
            <p className="text-xs font-sans uppercase tracking-widest text-primary font-semibold mb-3">Flexible template</p>
            <h2 className="font-serif text-3xl text-slate-purple mb-5">Plan the function before you draft the paragraph</h2>
            <div className="space-y-3">
              {OUTLINE_STEPS.map(([heading, copy]) => <div key={heading} className="rounded-xl bg-white/80 border border-white p-5"><h3 className="font-serif text-xl text-slate-purple mb-2">{heading}</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">{copy}</p></div>)}
            </div>
            <p className="mt-5 text-sm font-sans text-muted-foreground leading-relaxed">This is a planning template, not a universal sequence. A qualitative report, humanities essay, laboratory paper, literature review, or proposal may need different sections. Follow the assignment, course guide, journal, or supervisor when it specifies a structure.</p>
          </section>

          <section className="mt-8 grid lg:grid-cols-2 gap-6">
            <article className="p-7 bg-white border border-border rounded-2xl">
              <p className="text-xs font-sans uppercase tracking-widest text-primary font-semibold mb-3">Fictional learning example</p>
              <h2 className="font-serif text-3xl text-slate-purple mb-4">From broad topic to an evidence plan</h2>
              <p className="text-sm font-sans text-muted-foreground leading-relaxed"><strong className="text-foreground">This fictional learning example is invented for practice; it is not a real student paper, source, result, evidence plan, or outline to submit.</strong> A fictional writer investigating planning routines might outline: (I) why deadline visibility matters for first-year students; (II) fictional evidence on calendar reminders; (III) fictional evidence on adaptable planning routines; (IV) a comparison of what fictional studies can and cannot show; and (V) a cautious fictional next research question. Each point is a job for the fictional paper, not a claim, source, or sequence to copy unchanged.</p>
            </article>
            <article className="p-7 bg-white border border-border rounded-2xl">
              <h2 className="font-serif text-3xl text-slate-purple mb-4">Use an evidence-path record before drafting</h2>
              <ul className="space-y-3 text-sm font-sans text-muted-foreground leading-relaxed"><li><strong className="text-foreground">Task-to-heading check:</strong> can you say what assignment requirement, reader need, question, or claim each main heading addresses?</li><li><strong className="text-foreground">Heading-to-evidence check:</strong> can you name the source, data, example, analysis, result, or reasoning each body section will use—and identify its limit?</li><li><strong className="text-foreground">Order check:</strong> does each section prepare the reader&apos;s next question, rather than reflecting the order you found notes or sources?</li><li><strong className="text-foreground">Whole-paper check:</strong> do Introduction, evidence approach or method, body sections, interpretation, and conclusion still make compatible promises?</li></ul>
            </article>
          </section>

          <section className="mt-8 p-7 bg-white border border-border rounded-2xl">
            <h2 className="font-serif text-3xl text-slate-purple mb-3">Use writing-center guidance, then adapt it</h2>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed">              <a className="text-primary underline underline-offset-4" href="https://owl.purdue.edu/owl/general_writing/the_writing_process/developing_an_outline/how_to_outline.html" target="_blank" rel="noreferrer">Purdue OWL</a> explains that outlines can show hierarchy and logical ordering, helping writers organize ideas, show relationships, define boundaries, and group material after considering purpose, audience, and a thesis or central purpose. The <a className="text-primary underline underline-offset-4" href="https://writingcenter.gmu.edu/writing-resources/writing-as-process/outlining" target="_blank" rel="noreferrer">George Mason University Writing Center</a> describes outlines as planning maps that may use different formats, should become as specific as the task needs, and can change as a draft develops. Use the outline structure that your assignment and discipline require.</p>
          </section>

          <section className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/research-question-examples" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Refine the research question</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Test whether the question gives the planned sections a feasible evidence route.</p></article></Link>
            <Link href="/thesis-statement-examples" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Refine the thesis</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Give the outline a controlling claim that the paper can develop with evidence.</p></article></Link>
            <Link href="/academic-paragraph-structure" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Build each paragraph</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Turn an outline point into a focused paragraph with evidence and explanation.</p></article></Link>
            <Link href="/research-paper-sections" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Plan section functions</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Use the research-paper hub for section-specific purpose, examples, and checks.</p></article></Link>
            <Link href="/literature-review-synthesis-matrix" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Map source relationships</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Group sources and evidence by theme, method, finding, context, or limitation before building sections.</p></article></Link>
            <Link href="/academic-argument-evidence" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Build an evidence-led argument</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Trace the path from claim to support, reasoning, counterpoint, and limitation across the outline.</p></article></Link>
            <Link href="/academic-integrity-and-source-use" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Keep sources traceable</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Record what each source can support before turning it into a section heading or evidence point.</p></article></Link>
            <Link href="/citations" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Verify citations</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Check source details and citation choices as the outline becomes a draft with attributable evidence.</p></article></Link>
          </section>
          <div className="text-center mt-10"><Button asChild className="bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90"><Link href="/polish">Polish a completed outline section <ArrowRight size={16} className="ml-2" /></Link></Button></div>
        </div>
      </main>
    </>
  );
}
