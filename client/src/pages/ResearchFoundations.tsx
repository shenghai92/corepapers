import { Link } from "wouter";
import { CheckCircle2, ArrowRight } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";

type Kind = "sources" | "questions" | "evidence" | "paragraphs" | "thesis";
const DATA: Record<
  Kind,
  {
    title: string;
    desc: string;
    eyebrow: string;
    h2: string;
    intro: string;
    checklist: string[];
    example: string;
    source: string;
    sourceLabel: string;
  }
> = {
  sources: {
    title: "How to evaluate academic sources: a student checklist",
    desc: "Evaluate academic sources by checking authorship, purpose, evidence, timeliness, references, and cross-checking before you cite.",
    eyebrow: "Research foundations",
    h2: "Evaluate a source before you build a paragraph around it",
    intro:
      "A credible source is not just a website with a professional design. Check who created it, why it exists, what evidence it presents, whether its details are current for your topic, and whether you can verify key claims elsewhere.",
    checklist: [
      "Can you identify the author, affiliation, and relevant expertise?",
      "What is the source trying to explain, sell, or persuade you to believe?",
      "Does it show evidence and references you can follow?",
      "Is its date appropriate for this discipline and claim?",
      "Can you cross-check important factual claims?",
    ],
    example:
      "Fictional learning example: A recent journal article with named authors, methods, references, and a scope relevant to your question may be useful evidence. A commercial blog can still help you locate terms, but it should not automatically carry the same weight.",
    source:
      "https://owl.purdue.edu/owl/research_and_citation/conducting_research/evaluating_sources_of_information/general_guidelines.html",
    sourceLabel: "Read Purdue OWL source-evaluation guidance",
  },
  questions: {
    title:
      "Research question examples: make a topic clear, focused, and arguable",
    desc: "Turn a broad academic topic into a clear, focused, complex, and arguable research question with fictional examples and a revision checklist.",
    eyebrow: "Research foundations",
    h2: "A useful question gives your research a direction",
    intro:
      "A research question is not a title or a fact you can look up quickly. It sets a focused path for finding and analysing evidence, while leaving room for an answer that needs explanation and argument.",
    checklist: [
      "Is the wording clear to a reader outside your own notes?",
      "Is the scope narrow enough for the assignment length?",
      "Does it require research and analysis rather than a yes/no answer?",
      "Could reasonable evidence lead writers to different answers?",
      "Does it fit the methods and expectations of your discipline?",
    ],
    example:
      "Fictional learning example: Instead of asking “What is social media?”, a student might ask how a defined platform’s privacy settings affect a specified group’s willingness to share personal information. The revised question names a context and invites evidence-based analysis.",
    source:
      "https://writingcenter.gmu.edu/writing-resources/research-based-writing/how-to-write-a-research-question",
    sourceLabel: "Read George Mason University Writing Center guidance",
  },
  thesis: {
    title: "Thesis statement examples: make an academic claim specific and arguable",
    desc: "Build a clearer thesis statement by turning a broad topic into a specific, arguable, evidence-led claim with a fictional learning example and checklist.",
    eyebrow: "Research foundations",
    h2: "A thesis gives readers the paper’s controlling claim",
    intro: "A thesis statement is not merely a topic announcement. It makes a claim that a paper can explain and support with evidence. Its exact form differs by discipline and assignment, so use this as a revision framework rather than a fixed formula.",
    checklist: ["Does the statement make a claim rather than only name a topic?", "Is the claim specific enough for the assignment length and available evidence?", "Could a reasonable reader ask for evidence or offer a different interpretation?", "Does the rest of the paper’s structure help demonstrate the claim?"],
    example: "Fictional learning example: A broad topic such as student planning can become an arguable claim: ‘In first-year seminar courses, regular weekly planning may support assignment completion by helping students make deadlines visible.’ The claim is scoped, cautious, and opens a path for evidence rather than presenting a universal fact.",
    source: "https://writingcenter.unc.edu/tips-and-tools/thesis-statements/",
    sourceLabel: "Read University of North Carolina Writing Center guidance",
  },
  paragraphs: {
    title: "Academic paragraph structure: topic sentence, evidence, and explanation",
    desc: "Build clearer academic paragraphs with a topic sentence, relevant evidence, explanation, and a purposeful link to the next idea.",
    eyebrow: "Research foundations",
    h2: "A paragraph should develop one controllable idea",
    intro: "Academic paragraphs help readers process an argument in meaningful units. Start with a clear controlling point, introduce relevant evidence, explain its significance, and connect the paragraph to the larger line of reasoning.",
    checklist: ["Does the opening sentence make a specific point?", "Does the evidence directly support that point?", "Have you explained why the evidence matters?", "Does the final sentence create a logical link or finish the point?"],
    example: "Fictional learning example: A paragraph may begin by stating that a privacy setting changes what users can share, then cite relevant evidence, explain the relationship, and note that the conclusion is limited to the platform and group studied.",
    source: "https://writingcenter.unc.edu/tips-and-tools/paragraphs/",
    sourceLabel: "Read University of North Carolina Writing Center guidance",
  },
  evidence: {
    title: "Academic argument and evidence: build a claim readers can follow",
    desc: "Learn a practical claim–evidence–explanation–limitation framework for academic paragraphs, with a fictional learning example and source checklist.",
    eyebrow: "Research foundations",
    h2: "Evidence needs explanation, not just a citation",
    intro:
      "Academic arguments make a claim, support it with relevant evidence, explain why that evidence matters, and acknowledge limits where they affect the conclusion. Your course or discipline may require a different structure, so treat this as a learning framework rather than a substitute for instructions.",
    checklist: [
      "Can a reader identify your paragraph’s main claim?",
      "Is the evidence specific and properly cited?",
      "Have you explained the connection rather than leaving a quotation to speak for itself?",
      "Have you avoided claiming more than the evidence can support?",
      "Have you considered a relevant limitation or counter-example?",
    ],
    example:
      "Fictional learning example: If two studies report a similar association, you may explain that they support a cautious pattern. You should not claim that they prove causation if the studies are observational or their designs do not support that conclusion.",
    source:
      "https://owl.purdue.edu/owl/general_writing/academic_writing/establishing_arguments/research_and_evidence.html",
    sourceLabel: "Read Purdue OWL guidance on research and evidence",
  },
};
export default function ResearchFoundations({ kind }: { kind: Kind }) {
  const d = DATA[kind];
  const canonical = `/${kind === "sources" ? "evaluate-academic-sources" : kind === "questions" ? "research-question-examples" : kind === "paragraphs" ? "academic-paragraph-structure" : kind === "thesis" ? "thesis-statement-examples" : "academic-argument-evidence"}/`;
  return (
    <>
      <SEOHead
        title={`${d.title} | CorePapers`}
        description={d.desc}
        keywords={
          kind === "sources"
            ? "evaluate academic sources checklist, credible sources research paper"
            : kind === "questions"
              ? "research question examples, how to write a research question"
              : kind === "paragraphs" ? "academic paragraph structure, topic sentence evidence explanation" : kind === "thesis" ? "thesis statement examples, academic thesis statement, arguable claim" : "academic argument evidence example, claim evidence explanation"
        }
        canonical={canonical}
      />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container max-w-5xl">
          <header className="text-center max-w-3xl mx-auto mb-10">
            <p className="text-primary text-xs uppercase tracking-widest font-sans mb-3">
              {d.eyebrow}
            </p>
            <h1 className="font-serif font-light text-4xl sm:text-5xl text-slate-purple mb-4">
              {d.title}
            </h1>
            <p className="text-muted-foreground font-sans leading-relaxed">
              {d.desc}
            </p>
          </header>
          <section className="p-7 bg-white border border-border rounded-2xl mb-6">
            <h2 className="font-serif text-3xl text-slate-purple mb-3">
              {d.h2}
            </h2>
            <p className="font-sans text-muted-foreground leading-relaxed">
              {d.intro}
            </p>
          </section>
          <section className="grid lg:grid-cols-2 gap-6">
            <div className="p-7 bg-hero-gradient border border-border rounded-2xl">
              <h2 className="font-serif text-2xl text-slate-purple mb-4">
                Use this self-check
              </h2>
              <ul className="space-y-3">
                {d.checklist.map(x => (
                  <li
                    key={x}
                    className="flex gap-2 text-sm font-sans text-muted-foreground"
                  >
                    <CheckCircle2
                      size={16}
                      className="text-emerald-500 shrink-0 mt-0.5"
                    />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-7 bg-white border border-border rounded-2xl">
              <p className="text-xs font-sans uppercase tracking-widest text-primary mb-3">
                Fictional learning example
              </p>
              <p className="font-sans text-sm leading-relaxed text-foreground/80">
                {d.example}
              </p>
              <a
                className="inline-flex mt-5 text-sm font-sans text-primary hover:underline"
                href={d.source}
                target="_blank"
                rel="noreferrer"
              >
                {d.sourceLabel} <ArrowRight size={15} className="ml-1" />
              </a>
            </div>
          </section>
          {kind === "evidence" && (
            <>
              <section className="mt-8 p-7 bg-white border border-border rounded-2xl">
                <p className="text-xs font-sans uppercase tracking-widest text-primary mb-3">A reasoning workflow, not a fixed paragraph formula</p>
                <h2 className="font-serif text-3xl text-slate-purple mb-5">Build an argument readers can test rather than an information list</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">1. TASK + READER</p><h3 className="font-serif text-xl text-slate-purple mb-2">Name the decision the paper must make</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">Identify whether the assignment asks for analysis, explanation, comparison, evaluation, proposal, or another form of argument, then consider what an informed but unconvinced reader would need to see.</p></article>
                  <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">2. WORKING CLAIM</p><h3 className="font-serif text-xl text-slate-purple mb-2">State a supportable answer</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">Draft a focused, contestable claim in your own words. Define its setting, population, text, time, condition, or comparison so the claim matches a realistic research path.</p></article>
                  <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">3. RELEVANT EVIDENCE</p><h3 className="font-serif text-xl text-slate-purple mb-2">Choose material that can do this job</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">Select data, scholarly findings, quotations, textual details, examples, or observations that directly bear on this particular point and are appropriate to the discipline, question, and source-use rules.</p></article>
                  <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">4. REASONING</p><h3 className="font-serif text-xl text-slate-purple mb-2">Explain the bridge</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">Tell readers how the material supports, illustrates, complicates, tests, or limits the claim. A citation identifies where information came from; it does not by itself state why the evidence matters.</p></article>
                  <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">5. SCOPE + LIMITS</p><h3 className="font-serif text-xl text-slate-purple mb-2">Calibrate what follows</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">Check design, source, context, measurement, alternative explanation, exception, or missing evidence. Narrow or qualify the claim when the record cannot support a universal conclusion.</p></article>
                  <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">6. COUNTERARGUMENT</p><h3 className="font-serif text-xl text-slate-purple mb-2">Test the strongest reasonable objection</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">Fairly represent a serious alternative, competing interpretation, unsupported premise, or drawback. Respond with evidence and reasoning, concede a valid point, or revise the claim if the objection changes what it can responsibly say.</p></article>
                  <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">7. REVERSE CHECK</p><h3 className="font-serif text-xl text-slate-purple mb-2">Trace each conclusion backward</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">For each key conclusion, locate the exact evidence, citation or data record, explanatory sentence, limitation, and response to a likely objection. Repair gaps before editing grammar or style.</p></article>
                </div>
              </section>

              <section className="mt-6 grid lg:grid-cols-2 gap-6">
                <article className="p-7 bg-hero-gradient border border-border rounded-2xl">
                  <p className="text-xs font-sans uppercase tracking-widest text-primary mb-3">Fictional learning example</p>
                  <h2 className="font-serif text-3xl text-slate-purple mb-3">Map the reasoning, not just the citation</h2>
                  <p className="text-sm font-sans text-muted-foreground leading-relaxed"><strong className="text-foreground">This fictional learning example is invented for practice; it contains no real study, source, result, quotation, or recommendation.</strong> For an invented campus-policy assignment, a fictional writer begins with a provisional claim that a fictional late-evening shuttle change may improve access for a defined group. The writer records which fictional travel record would be relevant, explains that the record could support an access pattern rather than prove every cause of attendance, and notes a fictional limitation about the term covered. A fictional objection asks whether a different service change could explain the pattern. The writer either narrows the invented claim or explains what further fictional evidence would be needed; the writer does not invent data, citations, or consensus to make the conclusion sound stronger.</p>
                </article>
                <article className="p-7 bg-white border border-border rounded-2xl">
                  <h2 className="font-serif text-3xl text-slate-purple mb-4">Keep the evidence and the reasoning distinct</h2>
                  <ul className="space-y-3 text-sm font-sans text-muted-foreground leading-relaxed">
                    <li className="flex gap-2"><CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" /><span><strong className="text-foreground">Evidence says:</strong> what a source, dataset, observation, text, or other material actually reports within its own method and context.</span></li>
                    <li className="flex gap-2"><CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" /><span><strong className="text-foreground">Your reasoning adds:</strong> why that material is relevant to the claim, what inference is warranted, and what it does not establish.</span></li>
                    <li className="flex gap-2"><CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" /><span><strong className="text-foreground">A citation does:</strong> distinguish a source&apos;s information or language from your own and let readers locate it; it cannot repair an irrelevant source or an unexplained jump in logic.</span></li>
                    <li className="flex gap-2"><CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" /><span><strong className="text-foreground">A limitation or objection does:</strong> test the reach of the claim. It does not require false balance or a list of every imaginable disagreement.</span></li>
                  </ul>
                </article>
              </section>

              <section className="mt-6 p-7 bg-white border border-border rounded-2xl">
                <h2 className="font-serif text-3xl text-slate-purple mb-3">Use academic argument guidance as a reasoning check</h2>
                <p className="text-sm font-sans text-muted-foreground leading-relaxed"><a className="text-primary underline underline-offset-4" href="https://writingcenter.unc.edu/tips-and-tools/argument/" target="_blank" rel="noreferrer">UNC Writing Center</a> frames academic argument as a claim supported by evidence and notes that disciplines differ in what counts as acceptable proof. <a className="text-primary underline underline-offset-4" href="https://wts.indiana.edu/writing-guides/using-evidence.html" target="_blank" rel="noreferrer">Indiana University Writing Tutorial Services</a> recommends stating a claim, giving related evidence, and commenting on how that evidence supports it. <a className="text-primary underline underline-offset-4" href="https://writingcenter.fas.harvard.edu/counterargument" target="_blank" rel="noreferrer">Harvard College Writing Center</a> advises writers to consider reasonable challenges to a thesis, assumptions, terms, evidence, or interpretation and to revise a claim when an objection changes it. <a className="text-primary underline underline-offset-4" href="https://writingcenter.tamu.edu/guides/resources/arguments.html" target="_blank" rel="noreferrer">Texas A&amp;M University Writing Center</a> similarly emphasizes relevant support, strategic qualification, fair representation of strong objections, and revision where a response cannot be sustained. Assignment, discipline, and instructor expectations remain controlling.</p>
              </section>

              <section className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link href="/research-question-examples" className="block"><article className="h-full p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Start with a researchable question</h2><p className="text-sm font-sans text-muted-foreground">Define the problem, context, and evidence path before committing to a conclusion.</p></article></Link>
                <Link href="/thesis-statement-examples" className="block"><article className="h-full p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Calibrate the central claim</h2><p className="text-sm font-sans text-muted-foreground">Turn a topic into an arguable, scoped working thesis that the paper can develop.</p></article></Link>
                <Link href="/academic-paragraph-structure" className="block"><article className="h-full p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Develop one reasoning unit</h2><p className="text-sm font-sans text-muted-foreground">Make a paragraph&apos;s point, support, explanation, and connection visible to readers.</p></article></Link>
                <Link href="/hedging-language-academic-writing" className="block"><article className="h-full p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Match certainty to support</h2><p className="text-sm font-sans text-muted-foreground">Use careful language when evidence supports a pattern, possibility, or limited conclusion rather than proof.</p></article></Link>
                <Link href="/evaluate-academic-sources" className="block"><article className="h-full p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Evaluate a source&apos;s role</h2><p className="text-sm font-sans text-muted-foreground">Check whether a source fits the claim, field, context, and evidence job it is being asked to perform.</p></article></Link>
                <Link href="/literature-review-synthesis-matrix" className="block"><article className="h-full p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Compare evidence across sources</h2><p className="text-sm font-sans text-muted-foreground">Map themes, methods, agreements, differences, and limits before writing cross-source conclusions.</p></article></Link>
                <Link href="/academic-paraphrasing-tool-for-esl-students" className="block"><article className="h-full p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Integrate a source responsibly</h2><p className="text-sm font-sans text-muted-foreground">Retain a source&apos;s meaning, preserve attribution, and add your own analysis rather than cosmetic rewriting.</p></article></Link>
                <Link href="/citations" className="block"><article className="h-full p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Check citation details</h2><p className="text-sm font-sans text-muted-foreground">Verify source records and in-text attribution after the argument is built from traceable material.</p></article></Link>
                <Link href="/academic-integrity-and-source-use" className="block"><article className="h-full p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Keep source use traceable</h2><p className="text-sm font-sans text-muted-foreground">Distinguish your ideas, source material, notes, data, paraphrases, and quotations throughout drafting.</p></article></Link>
              </section>
            </>
          )}
          {kind === "paragraphs" && (
            <>
              <section className="mt-8 p-7 bg-white border border-border rounded-2xl">
                <p className="text-xs font-sans uppercase tracking-widest text-primary mb-3">A flexible writing sequence, not a universal template</p>
                <h2 className="font-serif text-3xl text-slate-purple mb-5">Build a paragraph that readers can follow and evaluate</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[['1. FUNCTION', 'Name the paragraph’s job', 'Decide whether the paragraph introduces a reason, interprets evidence, qualifies a claim, compares views, defines a term, reports a result, or moves the argument forward.'], ['2. CONTROLLING POINT', 'Give it one focus', 'State or make clear the point readers should carry through the paragraph. Topic-sentence placement can vary by purpose and genre, but the paragraph must have a recoverable single focus.'], ['3. EVIDENCE ROLE', 'Choose support with a job', 'Use source, data point, observation, example, definition, or textual detail that actually develops this point. Identify whether it supplies evidence, context, contrast, illustration, or limitation.'], ['4. SOURCE BOUNDARY', 'Make attribution visible', 'Signal whose evidence or language appears, keep citation scope clear, and do not let a quotation, paraphrase, statistic, or generated reference replace the writer’s own explanation.'], ['5. EXPLANATION', 'Show the reasoning connection', 'Explain how the material supports, complicates, illustrates, or limits the point. A citation identifies a source; it does not complete the reasoning for you.'], ['6. LIMIT', 'Keep claims proportionate', 'Identify conditions, competing reading, exception, uncertainty, or scope limit when it materially changes what the paragraph can claim; do not turn every paragraph into false balance.'], ['7. CONNECTION', 'Guide readers through a real relationship', 'Move from familiar to new information and signal continuation, contrast, concession, cause, clarification, or conclusion only when that relationship actually exists.'], ['8. REVERSE CHECK', 'Test unity, development, and sequence', 'Write a short margin note stating what the paragraph does and how it connects to the next. If note needs two ideas or connection is unclear, split, reorder, or revise before polishing.']].map(([step, title, copy]) => <article key={step} className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">{step}</p><h3 className="font-serif text-xl text-slate-purple mb-2">{title}</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">{copy}</p></article>)}
                </div>
              </section>

              <section className="mt-6 grid lg:grid-cols-2 gap-6">
                <article className="p-7 bg-hero-gradient border border-border rounded-2xl">
                  <p className="text-xs font-sans uppercase tracking-widest text-primary mb-3">Fictional learning example</p>
                  <h2 className="font-serif text-3xl text-slate-purple mb-3">Move from cited material to explained reasoning</h2>
                  <p className="text-sm font-sans text-muted-foreground leading-relaxed"><strong className="text-foreground">This fictional learning example is invented for practice; it is not a real problem, evidence, source, datum, causal relationship, conclusion, paragraph, or text to submit.</strong> In an invented first-year writing course, a student needs to argue that clear deadline information can reduce avoidable confusion in a fictional course portal. The student&apos;s paragraph begins with the focused point that reminders are most useful when they tell students what action to take. It then introduces an invented student-feedback pattern, explains that the pattern concerns clarity rather than every cause of missed work, and links to the next paragraph on how the portal should present the information. The evidence is not left to “speak for itself,” and the wording does not turn a fictional association into a universal causal finding.</p>
                </article>
                <article className="p-7 bg-white border border-border rounded-2xl">
                  <h2 className="font-serif text-3xl text-slate-purple mb-4">Use paragraph frameworks as prompts, not rules</h2>
                  <ul className="space-y-3 text-sm font-sans text-muted-foreground leading-relaxed">
                    <li className="flex gap-2"><CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" /><span><strong className="text-foreground">PEEL, TEEL, and TTEB</strong> can remind writers to make a point, support it, explain its significance, and link it to the larger argument.</span></li>
                    <li className="flex gap-2"><CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />They are especially useful when practising short argumentative paragraphs, but a literature review, methods section, close reading, or discipline-specific genre may organize a paragraph differently.</li>
                    <li className="flex gap-2"><CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />A topic sentence need not always be the first sentence, provided a reader can still identify the paragraph&apos;s controlling idea and its role in the paper.</li>
                    <li className="flex gap-2"><CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />Transitions clarify an existing logical relationship; they cannot repair a paragraph sequence whose underlying reasoning is unclear.</li>
                  </ul>
                </article>
              </section>

              <section className="mt-6 p-7 bg-white border border-border rounded-2xl">
                <h2 className="font-serif text-3xl text-slate-purple mb-3">Make coherence visible rather than merely adding connectors</h2>
                <p className="text-sm font-sans text-muted-foreground leading-relaxed"><a className="text-primary underline underline-offset-4" href="https://owl.purdue.edu/owl/general_writing/academic_writing/paragraphs_and_paragraphing/index.html" target="_blank" rel="noreferrer">Purdue OWL&apos;s paragraph guidance</a> identifies unity, coherence, a controlling topic, and adequate development as overlapping qualities of an effective paragraph. Its <a className="text-primary underline underline-offset-4" href="https://owl.purdue.edu/owl/general_writing/common_writing_assignments/argument_papers/body_paragraphs.html" target="_blank" rel="noreferrer">body-paragraph resource</a> presents Transition, Topic sentence, specific Evidence and analysis, and brief wrap-up (TTEB) for an argument-paper context. <a className="text-primary underline underline-offset-4" href="https://writingcenter.unc.edu/tips-and-tools/transitions/" target="_blank" rel="noreferrer">UNC Writing Center</a> advises writers to identify the relationship between ideas and check organization before relying on transition words. <a className="text-primary underline underline-offset-4" href="https://writingcenter.fas.harvard.edu/transitions" target="_blank" rel="noreferrer">Harvard College Writing Center</a> similarly recommends moving from familiar to new information and reserving causal language for genuine causal relationships.</p>
              </section>

              <section className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link href="/thesis-statement-examples" className="block"><article className="h-full p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Return to the central claim</h2><p className="text-sm font-sans text-muted-foreground">Check that each paragraph contributes a reason, analysis, qualification, or evidence path for the thesis.</p></article></Link>
                <Link href="/academic-argument-evidence" className="block"><article className="h-full p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Explain evidence carefully</h2><p className="text-sm font-sans text-muted-foreground">Use claim, evidence, explanation, and limitation to avoid citation-only paragraphs.</p></article></Link>
                <Link href="/phrases/introduction" className="block"><article className="h-full p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Signal a precise move</h2><p className="text-sm font-sans text-muted-foreground">Browse introduction phrases after identifying the relationship you truly need to signal.</p></article></Link>
                <Link href="/hedging-language-academic-writing" className="block"><article className="h-full p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Calibrate the conclusion</h2><p className="text-sm font-sans text-muted-foreground">Match certainty and causal language to the evidence the paragraph actually presents.</p></article></Link>
                <Link href="/academic-integrity-and-source-use" className="block"><article className="h-full p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Keep paragraph sources traceable</h2><p className="text-sm font-sans text-muted-foreground">Separate source material, citation, your explanation, and the claim the paragraph is asking readers to accept.</p></article></Link>
                <Link href="/citations" className="block"><article className="h-full p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Verify cited support</h2><p className="text-sm font-sans text-muted-foreground">Check original source records and in-text attribution after the paragraph’s reasoning is clear.</p></article></Link>
                <Link href="/research-paper-outline-template" className="block"><article className="h-full p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Reverse-outline the draft</h2><p className="text-sm font-sans text-muted-foreground">Test whether each paragraph has one function and a defensible place in the paper’s evidence path.</p></article></Link>
              </section>
            </>
          )}
          {kind === "thesis" && (
            <>
              <section className="mt-8 p-7 bg-white border border-border rounded-2xl">
                <p className="text-xs font-sans uppercase tracking-widest text-primary mb-3">A drafting sequence, not a one-sentence formula</p>
                <h2 className="font-serif text-3xl text-slate-purple mb-5">Move from a task and evidence to a supportable working thesis</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {[['1. TASK', 'Confirm the assignment and reader', 'Check whether the paper calls for analysis, interpretation, comparison, evaluation, explanation, proposal, or another controlling move; match the thesis form to the actual genre and reader.'], ['2. QUESTION', 'Frame a problem worth answering', 'Turn the topic into a focused analytical or normative question, then identify what is at stake for a reader rather than assuming the subject alone creates an argument.'], ['3. EVIDENCE', 'Study the available material', 'Collect and organize verified sources, data, observations, or textual details before deciding what a paper can responsibly claim.'], ['4. CLAIM TYPE', 'Choose the kind of claim', 'Distinguish interpretive, causal, evaluative, definitional, or policy claims. Different claims require different reasons, criteria, evidence, and counterpoints.'], ['5. WORKING CLAIM', 'State a provisional answer', 'Draft a central interpretation or position in your own words. A working thesis can change as research reveals a stronger relationship, alternative, or limitation.'], ['6. CALIBRATION', 'Set scope and certainty', 'Name the relevant population, text, setting, time, condition, or reason; use qualifiers when the available evidence does not justify a universal claim.'], ['7. SUPPORT PATH', 'Map reasons and challenges', 'Check that planned sections and paragraphs can provide analysis, evidence, explanation, counterpoint, or criteria a thoughtful reader needs to assess the claim.'], ['8. REVERSE CHECK', 'Revise against the completed paper', 'Re-read the prompt, thesis, evidence map, and draft together. Change the claim, scope, or body when they no longer match rather than defending an early sentence.']].map(([step, title, copy]) => <article key={step} className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">{step}</p><h3 className="font-serif text-xl text-slate-purple mb-2">{title}</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">{copy}</p></article>)}
                </div>
              </section>

              <section className="mt-6 grid lg:grid-cols-2 gap-6">
                <article className="p-7 bg-hero-gradient border border-border rounded-2xl">
                  <p className="text-xs font-sans uppercase tracking-widest text-primary mb-3">Fictional learning example</p>
                  <h2 className="font-serif text-3xl text-slate-purple mb-3">A claim becomes useful when it names a supportable relationship</h2>
                  <p className="text-sm font-sans text-muted-foreground leading-relaxed"><strong className="text-foreground">This fictional learning example is invented for practice; it is not a real source set, policy, record, claim, reason, counterpoint, or thesis to submit.</strong> After reviewing a small fictional set of campus-transport materials, a student first writes: “Universities should improve transport.” The statement has a topic and an opinion, but no defined context or reasoning path. For an invented policy-analysis assignment, the student revises it to: “At the fictional Northfield campus, extending the late-evening shuttle route should be prioritized over adding parking permits because the available student-travel records describe the largest unmet need after scheduled classes.” The revision identifies a context, type of claim, comparison, and evidence boundary; it still requires the paper to test whether the fictional records and policy criteria actually support that conclusion.</p>
                </article>
                <article className="p-7 bg-white border border-border rounded-2xl">
                  <h2 className="font-serif text-3xl text-slate-purple mb-4">Match the claim to the work the paper must do</h2>
                  <ul className="space-y-3 text-sm font-sans text-muted-foreground leading-relaxed">
                    <li className="flex gap-2"><CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />An analytical thesis interprets evidence, a text, or a relationship; it should not merely summarize the topic.</li>
                    <li className="flex gap-2"><CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />A normative or policy thesis makes a value or action claim and needs criteria, reasons, and attention to relevant alternatives.</li>
                    <li className="flex gap-2"><CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />A descriptive report, research proposal, or literature review may use a purpose statement, question, synthesis claim, or section-level claim instead of the same essay-style thesis.</li>
                    <li className="flex gap-2"><CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />A thesis often appears early, but placement and form should follow the assignment, genre, and disciplinary conventions.</li>
                  </ul>
                </article>
              </section>

              <section className="mt-6 p-7 bg-white border border-border rounded-2xl">
                <h2 className="font-serif text-3xl text-slate-purple mb-3">Test and revise rather than defend the first draft</h2>
                <p className="text-sm font-sans text-muted-foreground leading-relaxed"><a className="text-primary underline underline-offset-4" href="https://writingcenter.fas.harvard.edu/thesis" target="_blank" rel="noreferrer">Harvard College Writing Center</a> describes a strong thesis as arguable and appropriately scoped to available evidence. <a className="text-primary underline underline-offset-4" href="https://writingcenter.unc.edu/tips-and-tools/thesis-statements/" target="_blank" rel="noreferrer">UNC Writing Center</a> frames the thesis as an interpretation and map that can begin as a working claim and change as research and drafting proceed. <a className="text-primary underline underline-offset-4" href="https://owl.purdue.edu/owl/general_writing/academic_writing/establishing_arguments/index.html" target="_blank" rel="noreferrer">Purdue OWL</a> distinguishes debatable, narrow claims from broad statements that cannot be adequately supported. Ask whether your reader can see the answer, why it matters, and how the planned evidence will develop it.</p>
              </section>

              <section className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link href="/research-question-examples" className="block"><article className="h-full p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Start with a workable question</h2><p className="text-sm font-sans text-muted-foreground">Narrow a topic and test whether a realistic evidence path exists.</p></article></Link>
                <Link href="/academic-argument-evidence" className="block"><article className="h-full p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Build the evidence path</h2><p className="text-sm font-sans text-muted-foreground">Show why evidence supports, complicates, or limits the working claim.</p></article></Link>
                <Link href="/academic-paragraph-structure" className="block"><article className="h-full p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Develop one point per paragraph</h2><p className="text-sm font-sans text-muted-foreground">Turn a thesis reason into a topic sentence, evidence, and explanation.</p></article></Link>
                <Link href="/research-paper-outline-template" className="block"><article className="h-full p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Map the paper&apos;s support</h2><p className="text-sm font-sans text-muted-foreground">Check whether each section and heading advances the central purpose.</p></article></Link>
                <Link href="/hedging-language-academic-writing" className="block"><article className="h-full p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Calibrate the claim</h2><p className="text-sm font-sans text-muted-foreground">Match certainty, scope, and qualification to the evidence you can show.</p></article></Link>
                <Link href="/academic-integrity-and-source-use" className="block"><article className="h-full p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Keep support traceable</h2><p className="text-sm font-sans text-muted-foreground">Separate your central claim, source evidence, explanation, and accurate attribution.</p></article></Link>
                <Link href="/citations" className="block"><article className="h-full p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Verify evidence citations</h2><p className="text-sm font-sans text-muted-foreground">Check original source records and in-text credit before relying on a formatted entry.</p></article></Link>
              </section>
            </>
          )}
          {kind === "sources" && (
            <>
              <section className="mt-8 p-7 bg-white border border-border rounded-2xl">
                <p className="text-xs font-sans uppercase tracking-widest text-primary mb-3">A critical-reading sequence, not a scorecard</p>
                <h2 className="font-serif text-3xl text-slate-purple mb-5">Evaluate how a source can serve this project</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">1. FIT</p><h3 className="font-serif text-xl text-slate-purple mb-2">Start with the task</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">Check whether the source addresses your research question, required genre, audience, scope, and the role it would play in the paragraph.</p></article>
                  <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">2. CONTEXT</p><h3 className="font-serif text-xl text-slate-purple mb-2">Identify the creator</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">Look for author expertise, affiliations, publication venue, purpose, audience, date, and any revision history relevant to the topic.</p></article>
                  <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">3. EVIDENCE</p><h3 className="font-serif text-xl text-slate-purple mb-2">Read beyond the title</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">Inspect claims, methods, data, citations, omissions, and whether the material lets you trace important information to original sources.</p></article>
                  <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">4. PERSPECTIVE</p><h3 className="font-serif text-xl text-slate-purple mb-2">Locate the viewpoint</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">Ask whose interests, assumptions, population, and alternatives are visible or absent; perspective can be useful without being universal.</p></article>
                  <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">5. DECISION</p><h3 className="font-serif text-xl text-slate-purple mb-2">Cross-check before use</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">Compare central claims with other appropriate sources, record how you will use the item, and cite the original material accurately.</p></article>
                </div>
              </section>

              <section className="mt-6 grid lg:grid-cols-2 gap-6">
                <article className="p-7 bg-hero-gradient border border-border rounded-2xl">
                  <p className="text-xs font-sans uppercase tracking-widest text-primary mb-3">Fictional learning example</p>
                  <h2 className="font-serif text-3xl text-slate-purple mb-3">Ask what a source can show</h2>
                  <p className="text-sm font-sans text-muted-foreground leading-relaxed"><strong className="text-foreground">This fictional learning example contains no real sources or findings.</strong> A student finds an invented nonprofit report arguing that late library hours would improve student wellbeing. Instead of accepting or discarding it because of the organization&apos;s viewpoint, the student checks who funded it, what population and data it used, whether the report cites accessible evidence, and whether independent studies address the same outcome. The report might help explain one stakeholder perspective, but it cannot by itself establish a general causal conclusion.</p>
                </article>
                <article className="p-7 bg-white border border-border rounded-2xl">
                  <h2 className="font-serif text-3xl text-slate-purple mb-4">Avoid quick signals and automatic decisions</h2>
                  <ul className="space-y-3 text-sm font-sans text-muted-foreground leading-relaxed">
                    <li className="flex gap-2"><CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />A peer-reviewed article or university press may be a strong starting point, but it still needs to fit the particular claim, date, population, and task.</li>
                    <li className="flex gap-2"><CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />A polished design, a .edu/.org domain, or a familiar organization name does not itself verify an online claim or method.</li>
                    <li className="flex gap-2"><CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />Finding a perspective, sponsor, or limitation does not automatically make the source unusable; decide what it can responsibly contribute.</li>
                    <li className="flex gap-2"><CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />Never invent an author, publication date, DOI, source detail, or evidence trail because a reference seems convenient.</li>
                  </ul>
                </article>
              </section>

              <section className="mt-6 p-7 bg-white border border-border rounded-2xl">
                <h2 className="font-serif text-3xl text-slate-purple mb-3">Use source criteria in context</h2>
                <p className="text-sm font-sans text-muted-foreground leading-relaxed"><a className="text-primary underline underline-offset-4" href="https://writingcenter.unc.edu/tips-and-tools/evaluating-print-sources/" target="_blank" rel="noreferrer">UNC Writing Center</a> recommends evaluating both a source&apos;s context and its argument, and notes that recognizing a perspective helps determine how it can inform a project. <a className="text-primary underline underline-offset-4" href="https://libguides.usc.edu/writingguide/evaluatesources" target="_blank" rel="noreferrer">USC Libraries</a> discusses authority, validity, reliability, evidence, coverage, online attribution, and multiple perspectives. <a className="text-primary underline underline-offset-4" href="https://knight.as.cornell.edu/writing-resource-evaluating-sources" target="_blank" rel="noreferrer">Cornell Knight Institute</a> links evaluation to evidence, alternative views, genre, purpose, readability, and project connection. <a className="text-primary underline underline-offset-4" href="https://usingsources.fas.harvard.edu/evaluating-sources-0" target="_blank" rel="noreferrer">Harvard&apos;s Guide to Using Sources</a> emphasizes author qualifications, context, coverage, and appropriate currency. Your discipline and assignment determine what counts as adequate support.</p>
              </section>

              <section className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link href="/research-question-examples" className="block"><article className="h-full p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Refine the research question</h2><p className="text-sm font-sans text-muted-foreground">Use early reading to test whether a narrower question has an evidence path.</p></article></Link>
                <Link href="/literature-review-synthesis-matrix" className="block"><article className="h-full p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Compare sources across themes</h2><p className="text-sm font-sans text-muted-foreground">Track agreements, limits, settings, and questions before drafting a review.</p></article></Link>
                <Link href="/academic-argument-evidence" className="block"><article className="h-full p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Use evidence in an argument</h2><p className="text-sm font-sans text-muted-foreground">Explain how a verified source supports or qualifies a specific claim.</p></article></Link>
                <Link href="/annotated-bibliography-example" className="block"><article className="h-full p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Document why it matters</h2><p className="text-sm font-sans text-muted-foreground">Practice summary, evaluation, and project relevance without copying the source.</p></article></Link>
              </section>
            </>
          )}
          {kind === "questions" && (
            <>
              <section className="mt-8 p-7 bg-white border border-border rounded-2xl">
                <p className="text-xs font-sans uppercase tracking-widest text-primary mb-3">A planning sequence, not a universal formula</p>
                <h2 className="font-serif text-3xl text-slate-purple mb-5">Move from a topic to a workable research question</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {[['1. TASK', 'Confirm the assignment and reader', 'Check the discipline, genre, word count, deadline, permitted methods, ethics requirements, and what readers need the question to help the paper investigate.'], ['2. TOPIC', 'Name a broad area to understand', 'Begin with a subject, relationship, practice, text, or problem you need to investigate, not a conclusion, harm, effect, or research gap you have already decided is true.'], ['3. READING', 'Scan terms, evidence, and conversations', 'Use preliminary reading to identify key terms, debates, methods, constraints, perspectives, and searchable language; record original sources rather than relying on snippets.'], ['4. OPEN QUESTION', 'Draft a genuinely open inquiry', 'Use an analytical, explanatory, exploratory, evaluative, or other discipline-appropriate form that cannot be answered by a quick fact lookup or simple yes/no response.'], ['5. BOUNDARY', 'Set useful scope', 'Specify a relationship, group, setting, period, text, practice, process, or comparison that can be addressed thoroughly in the available space.'], ['6. COMPLEXITY', 'Check the reasoning demand', 'Ask whether a responsible answer will require analysis and synthesis, whether possible answers remain debatable, and whether key terms are clear enough for readers.'], ['7. FEASIBILITY', 'Test access, methods, and ethics', 'Check time, credible sources or data, access, skills, permitted method, consent, privacy, risk, approval requirements, and limits before promising an answer.'], ['8. ITERATION', 'Rebuild and reverse-check', 'Test search terms, a rough outline, working thesis, and feedback; revise when the literature, evidence path, ethics, assignment, or available time reveals a better question.']].map(([step, title, copy]) => <article key={step} className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">{step}</p><h3 className="font-serif text-xl text-slate-purple mb-2">{title}</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">{copy}</p></article>)}
                </div>
              </section>

              <section className="mt-6 grid lg:grid-cols-2 gap-6">
                <article className="p-7 bg-hero-gradient border border-border rounded-2xl">
                  <p className="text-xs font-sans uppercase tracking-widest text-primary mb-3">Fictional learning example</p>
                  <h2 className="font-serif text-3xl text-slate-purple mb-3">Narrow without assuming the answer</h2>
                  <p className="text-sm font-sans text-muted-foreground leading-relaxed"><strong className="text-foreground">This fictional learning example is invented for practice; it is not a real topic, platform, participant group, source set, research gap, method, permission, result, question, or template to submit.</strong> A student begins with “online privacy.” After introductory reading, they notice that platform settings, a defined group, and a particular sharing decision could make the topic manageable. Instead of asking “Are social media sites harmful?”, the student drafts: “How do university students describe the effect of privacy-setting changes on their willingness to share location information on [a defined platform]?” The question is narrower and open to evidence; it does not claim that harm, an effect, or a research gap has already been proven.</p>
                </article>
                <article className="p-7 bg-white border border-border rounded-2xl">
                  <h2 className="font-serif text-3xl text-slate-purple mb-4">Check scope, sources, and method fit</h2>
                  <ul className="space-y-3 text-sm font-sans text-muted-foreground leading-relaxed">
                    <li className="flex gap-2"><CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />Can the question be answered thoroughly in the available word count and time, rather than only introduced?</li>
                    <li className="flex gap-2"><CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />Does preliminary reading reveal enough credible material, data, texts, or participants for the type of assignment you have?</li>
                    <li className="flex gap-2"><CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />Does the wording invite analysis and synthesis instead of a quick factual lookup or a simple yes/no answer?</li>
                    <li className="flex gap-2"><CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />Does the question fit the discipline, ethical requirements, permitted methods, and audience set by your course or project?</li>
                  </ul>
                </article>
              </section>

              <section className="mt-6 p-7 bg-white border border-border rounded-2xl">
                <h2 className="font-serif text-3xl text-slate-purple mb-3">Use local requirements before a generic checklist</h2>
                <p className="text-sm font-sans text-muted-foreground leading-relaxed"><a className="text-primary underline underline-offset-4" href="https://writingcenter.gmu.edu/writing-resources/research-based-writing/how-to-write-a-research-question" target="_blank" rel="noreferrer">George Mason University Writing Center</a> identifies clarity, focus, complexity, and arguability as useful question qualities. <a className="text-primary underline underline-offset-4" href="https://hub.williams.edu/peer-academic-support/the-writing-center/developing-a-strong-research-question/" target="_blank" rel="noreferrer">Williams College Writing Center</a> connects scope to the actual time available for the assignment. <a className="text-primary underline underline-offset-4" href="https://writingcenter.uci.edu/2024/03/22/developing-a-research-question/" target="_blank" rel="noreferrer">UC Irvine Writing Center</a> notes that questions may change as research proceeds. A how/why construction can be useful, but it is not a rule; follow the form, method, ethics requirements, and terminology of your discipline.</p>
              </section>

              <section className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link href="/research-gap-examples" className="block"><article className="h-full p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Locate a supportable gap</h2><p className="text-sm font-sans text-muted-foreground">Use limits in reviewed literature, not an unsupported claim that nothing exists.</p></article></Link>
                <Link href="/evaluate-academic-sources" className="block"><article className="h-full p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Evaluate possible support</h2><p className="text-sm font-sans text-muted-foreground">Check the sources that can actually help answer the narrowed question.</p></article></Link>
                <Link href="/academic-argument-evidence" className="block"><article className="h-full p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Build a provisional argument</h2><p className="text-sm font-sans text-muted-foreground">Turn emerging evidence into a claim that remains proportionate to its support.</p></article></Link>
                <Link href="/research-proposal-template" className="block"><article className="h-full p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Plan a proposal</h2><p className="text-sm font-sans text-muted-foreground">Connect the question to a manageable purpose, design, and source plan.</p></article></Link>
                <Link href="/methodology-vs-methods-research-paper" className="block"><article className="h-full p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Test question-to-method fit</h2><p className="text-sm font-sans text-muted-foreground">Check that the design, materials, procedure, analysis, and safeguards could address the refined question.</p></article></Link>
                <Link href="/thesis-statement-examples" className="block"><article className="h-full p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Build a working thesis</h2><p className="text-sm font-sans text-muted-foreground">Turn a supported answer into a provisional, scoped claim only after the evidence path is visible.</p></article></Link>
                <Link href="/research-paper-outline-template" className="block"><article className="h-full p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Test the paper path</h2><p className="text-sm font-sans text-muted-foreground">Use a rough outline to see whether the question can be answered fully within the assignment.</p></article></Link>
                <Link href="/academic-integrity-and-source-use" className="block"><article className="h-full p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Keep early reading traceable</h2><p className="text-sm font-sans text-muted-foreground">Record what a verified source says, where it came from, and how it changes the question.</p></article></Link>
              </section>
            </>
          )}
          {kind === "evidence" && (
            <>
              <section className="mt-8 p-7 bg-white border border-border rounded-2xl">
                <p className="text-xs font-sans uppercase tracking-widest text-primary mb-3">A revision sequence, not a universal formula</p>
                <h2 className="font-serif text-3xl text-slate-purple mb-5">Move from a claim to a qualified implication</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">1. CLAIM</p><h3 className="font-serif text-xl text-slate-purple mb-2">Say what you can defend</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">Make a focused, arguable point that answers the question rather than naming a topic or repeating a source.</p></article>
                  <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">2. EVIDENCE</p><h3 className="font-serif text-xl text-slate-purple mb-2">Choose support that fits</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">Use relevant data, examples, source details, or findings that your discipline treats as appropriate support for this particular claim.</p></article>
                  <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">3. ANALYSIS</p><h3 className="font-serif text-xl text-slate-purple mb-2">Explain the connection</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">Show how the evidence supports, complicates, or limits the claim. A quotation, number, or citation does not explain itself.</p></article>
                  <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">4. IMPLICATION</p><h3 className="font-serif text-xl text-slate-purple mb-2">Keep the conclusion proportionate</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">State a carefully bounded takeaway, acknowledge a meaningful limit or counterpoint, and revise the claim if strong evidence challenges it.</p></article>
                </div>
              </section>

              <section className="mt-6 grid lg:grid-cols-2 gap-6">
                <article className="p-7 bg-hero-gradient border border-border rounded-2xl">
                  <p className="text-xs font-sans uppercase tracking-widest text-primary mb-3">Fictional learning example</p>
                  <h2 className="font-serif text-3xl text-slate-purple mb-3">Show your reasoning after the citation</h2>
                  <p className="text-sm font-sans text-muted-foreground leading-relaxed"><strong className="text-foreground">All studies, authors, results, and citations here are invented for learning.</strong> They are not real evidence and must not be submitted or cited. A fictional paper claims that visible assignment deadlines may support more consistent planning among first-year students. It then cites two fictional observational studies with similar patterns. The analysis explains that the studies support a limited association in their reported settings, while their self-reported cross-sectional designs do not show that deadline visibility caused the change. The paragraph therefore uses a cautious implication rather than a causal recommendation.</p>
                </article>
                <article className="p-7 bg-white border border-border rounded-2xl">
                  <h2 className="font-serif text-3xl text-slate-purple mb-4">Test what the evidence can actually show</h2>
                  <ul className="space-y-3 text-sm font-sans text-muted-foreground leading-relaxed">
                    <li className="flex gap-2"><CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />Does the source address the same population, setting, outcome, or period named in the claim?</li>
                    <li className="flex gap-2"><CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />Have you distinguished a reported association, interpretation, prediction, or causal conclusion?</li>
                    <li className="flex gap-2"><CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />Would a skeptical reader understand why this evidence matters before they reach the next citation?</li>
                    <li className="flex gap-2"><CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />Have you represented a serious counterpoint fairly, or revised the claim when the evidence requires it?</li>
                  </ul>
                </article>
              </section>

              <section className="mt-6 p-7 bg-white border border-border rounded-2xl">
                <h2 className="font-serif text-3xl text-slate-purple mb-3">Use discipline and assignment expectations first</h2>
                <p className="text-sm font-sans text-muted-foreground leading-relaxed"><a className="text-primary underline underline-offset-4" href="https://writingcenter.unc.edu/tips-and-tools/argument/" target="_blank" rel="noreferrer">UNC Writing Center</a> describes academic argument as a claim supported with evidence and recommends considering counterarguments fairly. <a className="text-primary underline underline-offset-4" href="https://writingcenter.tamu.edu/guides/resources/arguments.html" target="_blank" rel="noreferrer">Texas A&amp;M University Writing Center</a> explains that evidence must be relevant to the conclusion and that strong claims often need strategic qualification. <a className="text-primary underline underline-offset-4" href="https://www.brandeis.edu/writing-program/resources/students/academic/drafting-revision/elements-of-academic-argument-humanities.html" target="_blank" rel="noreferrer">Brandeis Writing Program</a> distinguishes evidence from analysis and emphasizes accurate, fair source integration. These practices vary by discipline, course, genre, and assignment; use your instructor&apos;s guidance when it differs.</p>
              </section>

              <section className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link href="/research-question-examples" className="block"><article className="h-full p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Focus the question</h2><p className="text-sm font-sans text-muted-foreground">Give the argument a researchable direction before looking for support.</p></article></Link>
                <Link href="/evaluate-academic-sources" className="block"><article className="h-full p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Evaluate the support</h2><p className="text-sm font-sans text-muted-foreground">Check authorship, purpose, evidence, and fit before a source carries a claim.</p></article></Link>
                <Link href="/hedging-language-academic-writing" className="block"><article className="h-full p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Match certainty to evidence</h2><p className="text-sm font-sans text-muted-foreground">Use cautious wording when the design or scope limits a stronger claim.</p></article></Link>
                <Link href="/how-to-write-discussion-section" className="block"><article className="h-full p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Interpret carefully in Discussion</h2><p className="text-sm font-sans text-muted-foreground">Connect findings to prior work, limitations, and implications without overclaiming.</p></article></Link>
              </section>
            </>
          )}
          <section className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/literature-review-synthesis-matrix"
              className="p-5 bg-white border border-border rounded-xl"
            >
              <h2 className="font-serif text-xl text-slate-purple">
                Synthesize sources
              </h2>
              <p className="text-sm mt-2 text-muted-foreground font-sans">
                Build a matrix before drafting.
              </p>
            </Link>
            {kind === "questions" && (
              <Link
                href="/research-gap-examples"
                className="p-5 bg-white border border-border rounded-xl"
              >
                <h2 className="font-serif text-xl text-slate-purple">
                  Locate a supportable gap
                </h2>
                <p className="text-sm mt-2 text-muted-foreground font-sans">
                  Use a literature-based limit to guide the next question.
                </p>
              </Link>
            )}
            <Link
              href="/academic-integrity-and-source-use"
              className="p-5 bg-white border border-border rounded-xl"
            >
              <h2 className="font-serif text-xl text-slate-purple">
                Use sources responsibly
              </h2>
              <p className="text-sm mt-2 text-muted-foreground font-sans">
                Check attribution and paraphrasing.
              </p>
            </Link>
            <Link
              href="/citations"
              className="p-5 bg-white border border-border rounded-xl"
            >
              <h2 className="font-serif text-xl text-slate-purple">
                Check your citations
              </h2>
              <p className="text-sm mt-2 text-muted-foreground font-sans">
                Format after verifying source details.
              </p>
            </Link>
          </section>
          <div className="text-center mt-8">
            <Button asChild className="bg-cta-gradient text-white border-0">
              <Link href="/polish">
                Polish an academic paragraph{" "}
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
