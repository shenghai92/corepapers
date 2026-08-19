import { Link } from "wouter";
import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  FilePenLine,
  LibraryBig,
  Target,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";

const FOUNDATIONS = [
  [Target, "Start with genre, audience, and purpose", "A seminar paper, literature review, research proposal, thesis chapter, conference abstract, and journal article may all require different evidence, section functions, terminology, and levels of detail. Read the prompt, model texts, departmental guidance, or target journal before drafting."],
  [BookOpenCheck, "Build an argument readers can trace", "Make the central claim or research question visible; group evidence around meaningful points; and explain why each source, result, example, or quotation matters to the next stage of your reasoning."],
  [LibraryBig, "Maintain a source workflow", "Record full source details as you read, distinguish notes from your own analysis, retain location details for complex claims, and verify each citation against the original source and required style."],
  [FilePenLine, "Revise in more than one pass", "Separate argument, structure, source use, clarity, and formatting checks. Feedback can reveal patterns, but you remain responsible for the claims, evidence, permissions, citations, and submission rules."],
] as const;

export default function GraduateAcademicWriting() {
  return (
    <>
      <SEOHead
        title="Academic Writing for Graduate Students: A Practical Guide"
        description="Build stronger graduate-level academic writing with a practical guide to audience, genres, argument, evidence, source workflow, revision, and sustainable writing habits."
        keywords="academic writing for graduate students, graduate academic writing, graduate student writing guide, academic writing skills graduate students, writing research paper graduate school"
        canonical="/academic-writing-for-graduate-students/"
      />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container max-w-5xl">
          <header className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-sans font-medium mb-4"><BookOpenCheck size={14} /> Graduate research writing</div>
            <h1 className="font-serif font-light text-4xl sm:text-5xl text-slate-purple mb-4 leading-tight">Academic writing for graduate students: <span className="italic">build a repeatable research-writing practice</span></h1>
            <p className="text-muted-foreground font-sans leading-relaxed text-lg">Graduate writing is not one universal “advanced” style. It is a set of research, argument, genre, revision, and collaboration decisions that change with your field, project, audience, and stage of study.</p>
          </header>

          <section className="p-7 bg-white border border-border rounded-2xl">
            <h2 className="font-serif text-3xl text-slate-purple mb-3">Strong graduate writing makes its choices visible</h2>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed">Readers need to see what question or claim organizes the work, how your evidence was selected or produced, how the parts of the argument connect, what the limits are, and why the discussion matters in the relevant scholarly conversation. Vocabulary alone cannot supply these decisions. Use clear academic English to make the thinking easier to evaluate, not to hide uncertainty or add complexity for its own sake.</p>
          </section>

          <section className="mt-6 grid md:grid-cols-2 gap-5">
            {FOUNDATIONS.map(([Icon, title, copy]) => {
              const CardIcon = Icon as typeof Target;
              return <article key={title as string} className="p-6 bg-white border border-border rounded-2xl"><CardIcon size={22} className="text-primary mb-4" /><h2 className="font-serif text-2xl text-slate-purple mb-2">{title as string}</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">{copy as string}</p></article>;
            })}
          </section>

          <section className="mt-8 grid lg:grid-cols-2 gap-6">
            <article className="p-7 bg-hero-gradient border border-border rounded-2xl">
              <p className="text-xs font-sans uppercase tracking-widest text-primary font-semibold mb-3">Before you draft</p>
              <h2 className="font-serif text-3xl text-slate-purple mb-4">A project compass for graduate writers</h2>
              <ul className="space-y-3 text-sm font-sans text-muted-foreground leading-relaxed">
                {["What exact problem, question, claim, or task must this document address?", "Who will read it, and what do they already know, expect, or need to evaluate?", "What genre conventions, section headings, citation style, ethics rules, and word limits apply?", "Which sources, data, examples, or methods are necessary to support the central point?", "What could a reasonable reader challenge, and where should you clarify scope, evidence, or limitations?", "What is the smallest useful next writing task you can complete before the next review point?"] .map(item => <li key={item} className="flex gap-3"><CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />{item}</li>)}
              </ul>
            </article>
            <article className="p-7 bg-white border border-border rounded-2xl">
              <p className="text-xs font-sans uppercase tracking-widest text-primary font-semibold mb-3">Fictional learning example</p>
              <h2 className="font-serif text-3xl text-slate-purple mb-4">Plan a seminar-paper draft without treating it as a template to submit</h2>
              <p className="text-sm font-sans text-muted-foreground leading-relaxed">This fictional learning example is invented for practice. It is not a real graduate project, source set, finding, timeline, or assignment answer to copy. A writer preparing a fictional education seminar paper might first narrow a question about feedback routines in a defined course setting; map a small, verified source set by theme and method; outline a claim and the evidence each section needs; draft one source-based paragraph at a time; then ask a peer or supervisor whether the argument, scope, and citations are intelligible. The sequence illustrates a revisable process, not a guarantee that any project will meet a particular programme&apos;s requirements.</p>
            </article>
          </section>

          <section className="mt-8 p-7 bg-white border border-border rounded-2xl">
            <p className="text-xs font-sans uppercase tracking-widest text-primary font-semibold mb-3">Project architecture</p>
            <h2 className="font-serif text-3xl text-slate-purple mb-3">Turn a large graduate project into a sequence of testable decisions</h2>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed mb-6">Graduate writing often changes direction as reading, data, feedback, and programme milestones develop. A useful project map is not a promise to write every document in the same order. It is a way to make the next decision, reader expectation, evidence need, and revision question visible before a long project becomes vague.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                ["1. Name the current product", "Distinguish a seminar paper, proposal or prospectus, thesis or dissertation chapter, conference abstract, article draft, or public-facing summary. Each has a different reader task and completion standard."],
                ["2. Find local conventions", "Use the prompt, programme handbook, target journal, recent department models, and supervisor guidance to identify required sections, evidence, terminology, format, and approval steps."],
                ["3. Map the contribution", "Write a provisional answer to: What problem, question, tension, result, or interpretation will this document help readers understand? Then attach the source, data, or reasoning each major part needs."],
                ["4. Choose a bounded next unit", "Select a paragraph map, source-comparison table, methods description, figure note, section opening, or revision pass that can be checked. A chapter title alone is usually too large to guide a session."],
                ["5. Ask a staged feedback question", "Request the kind of response the draft can use now: scope, argument path, evidence selection, organisation, reader clarity, or sentence-level wording. Do not ask one reader to solve every stage at once."],
                ["6. Reconcile the milestone", "Before submission, confirm that the current document still matches its purpose, required form, evidence record, permissions, claims, citations, and the next project decision."],
              ].map(([title, copy]) => <article key={title} className="rounded-xl bg-muted/50 p-5"><h3 className="font-serif text-xl text-slate-purple mb-2">{title}</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">{copy}</p></article>)}
            </div>
          </section>

          <section className="mt-6 grid lg:grid-cols-2 gap-6">
            <article className="p-7 bg-hero-gradient border border-border rounded-2xl">
              <p className="text-xs font-sans uppercase tracking-widest text-primary font-semibold mb-3">Fictional learning example</p>
              <h2 className="font-serif text-3xl text-slate-purple mb-4">Ask for feedback a reader can actually give</h2>
              <p className="text-sm font-sans text-muted-foreground leading-relaxed"><strong className="text-foreground">This fictional learning example is invented for practice.</strong> A fictional doctoral writer is revising a literature-review chapter. Instead of emailing “Is this good?”, the writer sends a two-page section map and asks a supervisor: “Could you focus on whether the three themes lead logically to the question at the end? I will check citations and sentence edits after I revise the structure.” A peer then reads one revised section for clarity. The example shows how a focused question can make feedback usable; it does not prescribe a programme&apos;s process or replace advisor guidance.</p>
            </article>
            <article className="p-7 bg-white border border-border rounded-2xl">
              <h2 className="font-serif text-3xl text-slate-purple mb-4">Keep responsibility with the right person</h2>
              <div className="space-y-3 text-sm font-sans text-muted-foreground leading-relaxed"><p><strong className="text-foreground">You, the author:</strong> make final decisions and remain responsible for claims, evidence, permissions, source attribution, and submission requirements.</p><p><strong className="text-foreground">Supervisor or committee:</strong> clarify field-specific expectations, project scope, and the kind of scholarly contribution your programme requires.</p><p><strong className="text-foreground">Peer or writing support:</strong> provide a reader&apos;s response to argument flow, organisation, clarity, or a defined revision question; they do not certify research accuracy.</p><p><strong className="text-foreground">Librarian, style guide, or citation resource:</strong> help locate and document sources, but you must verify your original materials and required citation system.</p><p><strong className="text-foreground">Language tool:</strong> may surface wording options, but cannot determine whether a research claim, interpretation, or policy choice is correct.</p></div>
            </article>
          </section>

          <section className="mt-8 p-7 bg-hero-gradient border border-border rounded-2xl">
            <p className="text-xs font-sans uppercase tracking-widest text-primary font-semibold mb-3">A sustainable writing-and-feedback loop</p>
            <h2 className="font-serif text-3xl text-slate-purple mb-5">Keep progress visible across a long project</h2>
            <div className="grid md:grid-cols-5 gap-3">
              {["Define a modest session goal", "Read or review notes with a question in mind", "Draft a bounded unit such as a paragraph, outline block, or section map", "Check the unit for evidence, attribution, logic, and clarity", "Record the next specific task before you stop"].map((item, index) => <article key={item} className="p-4 rounded-xl bg-white/80 border border-white"><p className="font-sans text-xs font-semibold text-primary mb-2">Step {index + 1}</p><p className="font-sans text-sm text-foreground/80 leading-relaxed">{item}</p></article>)}
            </div>
            <p className="mt-5 text-sm font-sans text-muted-foreground leading-relaxed">A regular schedule can help, but it is not a measure of your intelligence or worth as a writer. Adjust the size and rhythm of sessions to research access, employment, health, caring responsibilities, supervisor deadlines, and the way your discipline develops a project.</p>
          </section>

          <section className="mt-8 grid lg:grid-cols-2 gap-6">
            <article className="p-7 bg-white border border-border rounded-2xl"><h2 className="font-serif text-3xl text-slate-purple mb-4">What revision support can and cannot do</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed mb-4">A phrase library or language tool can help you notice unclear wording, literal translation, overly broad claims, or sentence-level alternatives. It cannot determine whether a research question is valuable, whether a method is ethical, whether sources have been interpreted accurately, or whether a submission follows programme-specific rules.</p><p className="text-sm font-sans text-muted-foreground leading-relaxed">Use tools to review your own draft, compare suggested changes with your intended meaning, and keep final decisions and source verification under your control.</p></article>
            <article className="p-7 bg-white border border-border rounded-2xl"><h2 className="font-serif text-3xl text-slate-purple mb-4">Graduate-level revision priorities</h2><ul className="space-y-3 text-sm font-sans text-muted-foreground leading-relaxed"><li><strong>First:</strong> purpose, research question, claim, scope, and section sequence.</li><li><strong>Then:</strong> evidence selection, synthesis, attribution, method or analytical logic, and stated limits.</li><li><strong>Then:</strong> paragraph cohesion, transitions, terminology, and the reader&apos;s ability to follow the argument.</li><li><strong>Finally:</strong> sentence clarity, grammar, citation formatting, headings, figures, tables, and submission details.</li></ul></article>
          </section>

          <section className="mt-8 p-7 bg-white border border-border rounded-2xl">
            <h2 className="font-serif text-3xl text-slate-purple mb-3">Use graduate-writing guidance and the requirements of your field</h2>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed"><a className="text-primary underline underline-offset-4" href="https://writingcenter.unc.edu/tips-and-tools/dissertation-strategies/" target="_blank" rel="noreferrer">UNC Writing Center&apos;s dissertation guidance</a> recommends breaking a long project into concrete tasks, adapting drafting order to the project, and requesting specific feedback at appropriate stages. <a className="text-primary underline underline-offset-4" href="https://writingcenter.utk.edu/dissertation-writing-guide/" target="_blank" rel="noreferrer">University of Tennessee Knoxville&apos;s dissertation guide</a> treats a dissertation as a non-linear, discipline- and project-specific process and directs writers to match structures, milestones, and requirements to their department and committee. <a className="text-primary underline underline-offset-4" href="https://gsc.upenn.edu/strengthen-your-academic-writing" target="_blank" rel="noreferrer">University of Pennsylvania&apos;s Graduate Student Center</a> recommends early attention to purpose, key terms, scope, evidence, real-time reference tracking, and paragraph-level argument and support. <a className="text-primary underline underline-offset-4" href="https://poorvucenter.yale.edu/writing/writing-resources-for-graduate-students" target="_blank" rel="noreferrer">Yale&apos;s Graduate Writing Lab</a> organizes support by genres, style and conventions, writing skills, integrity, and discipline-specific needs. Follow your programme&apos;s actual rules where they differ.</p>
          </section>

          <section className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/academic-english-for-esl-students" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Strengthen academic English</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Work on clarity, hedging, translation patterns, and sentence-level revision.</p></article></Link>
            <Link href="/research-proposal-template" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Plan a proposal</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Align a problem, rationale, literature, design, and feasible contribution.</p></article></Link>
            <Link href="/literature-review-synthesis-matrix" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Synthesize sources</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Map a scholarly conversation before making a literature-based claim.</p></article></Link>
            <Link href="/research-question-examples" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Refine a research question</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Turn a broad interest into a focused, feasible question that your project can address.</p></article></Link>
            <Link href="/research-gap-examples" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">State a bounded research gap</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Describe what is limited or underexplored without claiming that no research exists.</p></article></Link>
            <Link href="/research-paper-sections" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Map section responsibilities</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Choose an appropriate paper structure and check that each section performs a distinct reader-facing job.</p></article></Link>
            <Link href="/academic-integrity-and-source-use" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Keep source use accountable</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Distinguish quotation, paraphrase, summary, and your own analysis while maintaining clear attribution.</p></article></Link>
            <Link href="/citations" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Verify citations</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Create a reviewable formatting draft, then check it against original source details and required style rules.</p></article></Link>
            <Link href="/polish" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Review a draft</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Use revision suggestions as prompts to check meaning and academic clarity after reviewing the argument and evidence.</p></article></Link>
          </section>

          <div className="text-center mt-10"><Button asChild className="bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90"><Link href="/polish">Polish an academic paragraph <ArrowRight size={16} className="ml-2" /></Link></Button></div>
        </div>
      </main>
    </>
  );
}
