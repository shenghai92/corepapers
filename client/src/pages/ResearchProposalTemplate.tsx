import { Link } from "wouter";
import { ArrowRight, CheckCircle2, ClipboardCheck, Compass, Lightbulb, Route } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";

const PROPOSAL_SECTIONS = [
  ["Working title", "Use a concise, accurate title that helps a reader identify the topic, context, or key concept. Revise the title after the question and scope are clearer."],
  ["Problem, context, and rationale", "Define the focused problem, provide only the background needed to understand it, and explain why this question deserves attention in the assignment, field, or setting."],
  ["Aim, objectives, or research questions", "State what the proposed project will investigate. Keep objectives specific, realistic, and visibly connected to the central problem."],
  ["Focused literature review", "Synthesize relevant scholarship by theme, method, debate, or context. Use verified sources to show what is known, limited, contested, or worth examining further."],
  ["Proposed design and methods", "Explain the approach, data or sources, selection, collection, analysis, rationale, ethics, and foreseeable limits at the level the discipline requires."],
  ["Feasibility and project plan", "State the time, access, skills, permissions, resources, and revision steps needed to complete the proposed work. Include a timeline or budget only when requested."],
  ["Expected contribution and references", "Describe a proportionate potential contribution without inventing findings, then cite the sources that actually informed the proposal in the required style."],
] as const;

export default function ResearchProposalTemplate() {
  return (
    <>
      <SEOHead
        title="Research Proposal Template: Structure, Example, and Checklist"
        description="Use a flexible research proposal template to plan a research problem, rationale, question, literature review, methods, feasibility, and references with a fictional learning example."
        keywords="research proposal template, research proposal outline, research proposal example, research proposal structure, how to write research proposal"
        canonical="/research-proposal-template/"
      />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container max-w-5xl">
          <header className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-sans font-medium mb-4"><ClipboardCheck size={14} /> Research proposal planner</div>
            <h1 className="font-serif font-light text-4xl sm:text-5xl text-slate-purple mb-4 leading-tight">Research proposal template for <span className="italic">a focused, feasible study plan</span></h1>
            <p className="text-muted-foreground font-sans leading-relaxed text-lg">Use this adaptable proposal structure to explain what you plan to study, why it matters, and how the work could be carried out—then reshape it to the expectations of your assignment, supervisor, or funding call.</p>
          </header>

          <section className="p-7 bg-white border border-border rounded-2xl">
            <h2 className="font-serif text-3xl text-slate-purple mb-3">A proposal makes a case for work you have not completed yet</h2>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed">A strong proposal does not report invented results. It gives readers enough evidence to assess the proposed problem, purpose, source base, design, feasibility, and potential contribution. Course proposals, grant applications, undergraduate projects, theses, and dissertations may use different headings, word limits, and evidence standards, so treat this page as a planning framework rather than a universal form.</p>
          </section>

          <section className="mt-6 grid md:grid-cols-3 gap-5">
            {[
              [Compass, "Clarify the question", "Define a manageable research problem, context, and aim before deciding what the proposal must demonstrate."],
              [Route, "Show the connections", "Make the problem, rationale, literature, method, timeline, and expected contribution visibly support one another."],
              [CheckCircle2, "Test feasibility", "Check access, time, ethics, skills, data or sources, and required permissions before presenting a plan as achievable."],
            ].map(([Icon, title, copy]) => {
              const CardIcon = Icon as typeof Compass;
              return <article key={title as string} className="p-6 bg-white border border-border rounded-2xl"><CardIcon size={22} className="text-primary mb-4" /><h2 className="font-serif text-2xl text-slate-purple mb-2">{title as string}</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">{copy as string}</p></article>;
            })}
          </section>

          <section className="mt-8 p-7 bg-hero-gradient border border-border rounded-2xl">
            <p className="text-xs font-sans uppercase tracking-widest text-primary font-semibold mb-3">Flexible proposal template</p>
            <h2 className="font-serif text-3xl text-slate-purple mb-5">Plan the purpose of each section before drafting it</h2>
            <div className="space-y-3">
              {PROPOSAL_SECTIONS.map(([heading, copy]) => <div key={heading} className="rounded-xl bg-white/80 border border-white p-5"><h3 className="font-serif text-xl text-slate-purple mb-2">{heading}</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">{copy}</p></div>)}
            </div>
            <p className="mt-5 text-sm font-sans text-muted-foreground leading-relaxed">Use only the sections your brief requires. A short course proposal may combine background and literature; a grant proposal may require a budget, qualifications, data-management plan, or impact statement; a humanities proposal may explain an analytical corpus rather than participant recruitment. Read the call, rubric, or supervisor guidance first.</p>
          </section>

          <section className="mt-8 grid lg:grid-cols-2 gap-6">
            <article className="p-7 bg-white border border-border rounded-2xl">
              <p className="text-xs font-sans uppercase tracking-widest text-primary font-semibold mb-3">Fictional learning example</p>
              <h2 className="font-serif text-3xl text-slate-purple mb-4">Turn a broad interest into a feasible proposal</h2>
              <p className="text-sm font-sans text-muted-foreground leading-relaxed">This fictional learning example is not a real proposal, project, result, source set, or method to submit unchanged. A writer interested in peer-feedback routines might narrow the topic to a defined student group and course context; identify a limited question about how students describe usable feedback; review verified scholarship on feedback and revision; propose a small, permission-aware interview or document-analysis approach; and state what access, time, and ethics limits make the plan realistic. The example illustrates alignment among choices, not evidence that any outcome will occur.</p>
            </article>
            <article className="p-7 bg-white border border-border rounded-2xl">
              <h2 className="font-serif text-3xl text-slate-purple mb-4">Proposal alignment check</h2>
              <ul className="space-y-3 text-sm font-sans text-muted-foreground leading-relaxed">
                {["Does the introduction define a focused problem rather than only a broad topic?", "Does the rationale use verified literature and avoid claiming that no research exists without an appropriate search?", "Can a reader see how the question, objectives, design, data or sources, and analysis fit together?", "Have you named access, timeline, skills, permissions, ethics, or resource constraints honestly?", "Does the expected contribution stay proportionate and avoid predicting findings before the study exists?"].map(item => <li key={item} className="flex gap-3"><CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />{item}</li>)}
              </ul>
            </article>
          </section>

          <section className="mt-8 p-7 bg-white border border-border rounded-2xl">
            <h2 className="font-serif text-3xl text-slate-purple mb-3">Use university guidance, then follow the actual requirements</h2>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed"><a className="text-primary underline underline-offset-4" href="https://ugradresearch.uconn.edu/proposal-writing/" target="_blank" rel="noreferrer">UConn’s Office of Undergraduate Research</a> recommends making the purpose, execution steps, significance, audience, and feasibility specific and allowing time for feedback and revision. <a className="text-primary underline underline-offset-4" href="https://libguides.usc.edu/writingguide/assignments/researchproposal" target="_blank" rel="noreferrer">USC Libraries</a> explains that a proposal must justify the need to study a problem while presenting practical ways to conduct the work. <a className="text-primary underline underline-offset-4" href="https://writersworkshop.illinois.edu/resources-2/writer-resources/academic-writing/research-proposals/" target="_blank" rel="noreferrer">University of Illinois Writers Workshop</a> provides section-level prompts for scope, coherence, feasibility, precision, and clarity. These are guides, not substitutes for the format and approval process required by your institution.</p>
          </section>

          <section className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/research-question-examples" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Focus the question</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Test whether the research question is specific, researchable, and manageable for the proposed scope.</p></article></Link>
            <Link href="/literature-review-synthesis-matrix" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Build the source base</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Map themes, methods, limits, and relevance before making a literature-based rationale.</p></article></Link>
            <Link href="/research-gap-examples" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Support the rationale</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Describe a research gap that matches the evidence reviewed instead of claiming that no research exists.</p></article></Link>
            <Link href="/methodology-vs-methods-research-paper" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Plan the approach</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Distinguish practical methods from the rationale behind a proposed research approach.</p></article></Link>
          </section>
          <div className="text-center mt-10"><Button asChild className="bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90"><Link href="/polish">Polish a completed proposal section <ArrowRight size={16} className="ml-2" /></Link></Button></div>
        </div>
      </main>
    </>
  );
}
