import { Link } from "wouter";
import { ArrowRight, CheckCircle2, ClipboardCheck, FileText, SearchCheck } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";

const REVISION_CHECKLIST_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Research Paper Revision Checklist: An Eight-Step Workflow",
  description:
    "A researcher-first revision checklist for international students: check assignment fit, focus, organization, evidence, sources, paragraphs, language, and final submission responsibility.",
  mainEntityOfPage: "https://corepapers.space/research-paper-revision-checklist/",
  author: { "@type": "Organization", name: "CorePapers" },
  publisher: { "@type": "Organization", name: "CorePapers" },
};

const STEPS = [
  ["01", "Reopen the task and reader", "Read the assignment, rubric, section instructions, word limit, genre, audience, citation system, and submission rule again. Decide what the finished paper must help a reader understand, evaluate, or do."],
  ["02", "Test the focus and central claim", "State the research question, purpose, or thesis in one sentence. Check whether the paper answers that exact commitment without widening the population, setting, period, evidence, or conclusion."],
  ["03", "Map the argument and section jobs", "Give each section and paragraph a job. Check sequence, repeated points, missing reasoning, transitions, and whether Introduction, Methods, Results, Discussion, and Conclusion are doing the work the task requires."],
  ["04", "Read each paragraph as a unit", "For every paragraph, identify its point, support, explanation, connection, and limit. Ask whether the paragraph advances the central claim rather than merely placing a quotation or source summary after a topic sentence."],
  ["05", "Verify evidence and source records", "Open original sources. Check author, year, page or locator, version, quotation accuracy, paraphrased meaning, data context, and whether every source-based statement has appropriate attribution."],
  ["06", "Keep limits, objections, and uncertainty visible", "Check for counterevidence, alternate explanations, method limits, sample or context boundaries, and cautious language. Remove a causal, universal, or certainty claim that the available evidence cannot support."],
  ["07", "Edit language and required format last", "After the argument is stable, check terminology, sentence clarity, cohesion, grammar, spelling, punctuation, tables, headings, citations, reference list, and the specific style required by the task."],
  ["08", "Perform a reader and responsibility pass", "Read the paper aloud or after a break. Ask what a skeptical reader could misunderstand. Confirm you can explain every claim, source, decision, and permitted use of writing support before submission."],
] as const;

export default function ResearchPaperRevisionChecklist() {
  return (
    <>
      <SEOHead
        title="Research Paper Revision Checklist: Eight Steps | CorePapers"
        description="Use a research paper revision checklist to check assignment fit, thesis, organization, paragraphs, evidence, citations, limits, academic English, and submission responsibility."
        keywords="research paper revision checklist, research paper editing checklist, revise research paper, academic paper checklist, revise essay international students"
        canonical="/research-paper-revision-checklist/"
        jsonLd={REVISION_CHECKLIST_SCHEMA}
      />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container max-w-5xl">
          <header className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-sans font-medium mb-4"><ClipboardCheck size={14} /> Researcher-first revision</div>
            <h1 className="font-serif font-light text-4xl sm:text-5xl text-slate-purple mb-4 leading-tight">Research paper revision checklist: <span className="italic">fix the argument before the commas</span></h1>
            <p className="text-muted-foreground font-sans leading-relaxed text-lg">A revision checklist for international students and multilingual writers who need to inspect a research paper from assignment fit and evidence to paragraphs, citations, language, and final responsibility.</p>
          </header>

          <section className="p-7 bg-white border border-border rounded-2xl">
            <h2 className="font-serif text-3xl text-slate-purple mb-3">Revision is more than proofreading</h2>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed">Proofreading can improve a finished sentence, but it cannot repair an unclear research purpose, unsupported inference, disorganized section, missing explanation, weak source record, or conclusion that reaches beyond the evidence. Start with decisions that affect the paper&apos;s meaning, then move toward sentence-level editing and formatting.</p>
          </section>

          <section className="mt-8 p-7 bg-hero-gradient border border-border rounded-2xl">
            <p className="text-xs font-sans uppercase tracking-widest text-primary font-semibold mb-3">Submission-ready process</p>
            <h2 className="font-serif text-3xl text-slate-purple mb-5">An eight-step research paper revision workflow</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {STEPS.map(([step, title, text]) => <article key={step} className="rounded-xl bg-white/80 border border-white p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">STEP {step}</p><h3 className="font-serif text-xl text-slate-purple mb-2">{title}</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">{text}</p></article>)}
            </div>
          </section>

          <section className="mt-8 grid lg:grid-cols-3 gap-5">
            <article className="p-6 bg-white border border-border rounded-2xl"><FileText size={22} className="text-primary mb-4" /><h2 className="font-serif text-2xl text-slate-purple mb-2">A polished paper can still miss the task</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Compare your opening, section headings, evidence selection, conclusion, and reference style with the actual assignment—not with a generic model.</p></article>
            <article className="p-6 bg-white border border-border rounded-2xl"><SearchCheck size={22} className="text-primary mb-4" /><h2 className="font-serif text-2xl text-slate-purple mb-2">A reference list cannot verify a claim</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Open the original source. Check the exact passage, result, date, context, source version, and relation between the evidence and the sentence you wrote.</p></article>
            <article className="p-6 bg-white border border-border rounded-2xl"><CheckCircle2 size={22} className="text-primary mb-4" /><h2 className="font-serif text-2xl text-slate-purple mb-2">A checklist supports judgment</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">No checklist can decide whether your method, field-specific terminology, evidence threshold, or ethical claim is sound. Use the local rubric and expert feedback when needed.</p></article>
          </section>

          <section className="mt-8 p-7 bg-hero-gradient border border-border rounded-2xl">
            <p className="text-xs font-sans uppercase tracking-widest text-primary font-semibold mb-3">Fictional learning example</p>
            <h2 className="font-serif text-3xl text-slate-purple mb-4">Revise the evidence path before the wording</h2>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed mb-5"><strong>This fictional learning example is invented for practice; it is not a real student paper, study, source, finding, citation, or paragraph to submit.</strong> A fictional writer has a well-edited paragraph claiming that a fictional campus intervention “proved” an outcome. During step five, the writer reopens the fictional study note and finds that it describes a small voluntary survey, not a controlled study. The writer returns to steps two and six, changes the claim to a bounded association, adds the fictional context and limitation, checks the fictional citation, and only then edits wording and transitions. The example does not provide evidence for a real intervention.</p>
            <div className="grid md:grid-cols-3 gap-4"><article className="rounded-xl bg-white/80 border border-white p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">Surface-only revision</p><p className="text-sm font-sans text-foreground/80 leading-relaxed">Replace “proved” with a more formal verb while leaving the unsupported causal claim intact.</p></article><article className="rounded-xl bg-white/80 border border-white p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">Evidence-led revision</p><p className="text-sm font-sans text-foreground/80 leading-relaxed">Recheck the study design, revise the scope and certainty, explain the limitation, then preserve an accurate source link.</p></article><article className="rounded-xl bg-white/80 border border-white p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">Author responsibility</p><p className="text-sm font-sans text-foreground/80 leading-relaxed">Submit only a sentence and conclusion that the writer can trace back to real evidence and explain to a reader.</p></article></div>
          </section>

          <section className="mt-8 p-7 bg-white border border-border rounded-2xl">
            <h2 className="font-serif text-3xl text-slate-purple mb-3">Use a real revision pass, not a single all-purpose scan</h2>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed">George Mason University&apos;s editing checklist begins with assignment requirements, a specific thesis, paragraph work, source integration, documentation, and then sentence-level checks. The UNC Writing Center separates subject/audience/purpose, organization, paragraphs, sentences, and final checks. Excelsior OWL adds focus, transitions, credibility, source integration, and clear acknowledgement of paraphrases and summaries. Use their original guidance alongside your task requirements, not as a replacement for them.</p>
            <p className="text-sm font-sans mt-4"><a className="text-primary underline underline-offset-4" href="https://writingcenter.gmu.edu/writing-resources/writing-as-process/editing-checklist" target="_blank" rel="noreferrer">George Mason University Writing Center</a> · <a className="text-primary underline underline-offset-4" href="https://writingcenter.unc.edu/faculty-resources/classroom-handouts/revision-checklist/" target="_blank" rel="noreferrer">UNC Writing Center</a> · <a className="text-primary underline underline-offset-4" href="https://owl.excelsior.edu/research/revising-and-editing-a-research-paper/revising-and-editing-revision-checklist/" target="_blank" rel="noreferrer">Excelsior OWL</a></p>
          </section>

          <section className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/research-paper-sections" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Check section jobs</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Compare Methods, Results, Discussion, and Conclusion responsibilities before revising prose.</p></article></Link>
            <Link href="/academic-argument-evidence" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Review argument and evidence</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Trace claim, support, reasoning, counterpoint, and limitation together.</p></article></Link>
            <Link href="/evaluate-academic-sources" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Evaluate sources</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Check authority, purpose, evidence, context, and relevance before a citation is final.</p></article></Link>
            <Link href="/hedging-language-academic-writing" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Calibrate certainty</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Match conclusion language to the strength and reach of your evidence.</p></article></Link>
          </section>
          <div className="text-center mt-10"><Button asChild className="bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90"><Link href="/polish">Inspect language after the research pass <ArrowRight size={16} className="ml-2" /></Link></Button></div>
        </div>
      </main>
    </>
  );
}
