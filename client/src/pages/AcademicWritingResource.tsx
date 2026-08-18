import { Link } from "wouter";
import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  FileCheck2,
  GraduationCap,
  Quote,
  Scale,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";

type ResourceKind =
  | "integrity"
  | "examples"
  | "templates"
  | "citation-examples"
  | "mla-citation-examples";

type ResourcePageProps = { kind: ResourceKind };

const commonClass = {
  card: "bg-white border border-border rounded-2xl p-6 sm:p-7",
  title: "font-serif text-3xl text-slate-purple mb-3",
  copy: "text-sm text-muted-foreground font-sans leading-relaxed",
};

const sourceLinks = {
  apaParaphrases:
    "https://apastyle.apa.org/style-grammar-guidelines/citations/paraphrasing",
  purdueParaphrase:
    "https://owl.purdue.edu/owl/research_and_citation/using_research/quoting_paraphrasing_and_summarizing/paraphrasing.html",
  purdueSourceUse:
    "https://owl.purdue.edu/owl/research_and_citation/using_research/quoting_paraphrasing_and_summarizing/index.html",
  uciResults: "https://guides.lib.uci.edu/scientificwriting/results",
  mlaStyle: "https://style.mla.org/",
  mlaQuickGuide: "https://writingcenter.gmu.edu/writing-resources/citing-sources/mla-citation-style-quick-guide",
  mlaInText: "https://owl.purdue.edu/owl/research_and_citation/mla_style/mla_formatting_and_style_guide/mla_in_text_citations_the_basics.html",
};

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-primary underline underline-offset-4"
    >
      {children}
    </a>
  );
}

function ResourceHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
}) {
  return (
    <header className="max-w-3xl mx-auto text-center mb-12">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-sans font-medium mb-4">
        <GraduationCap size={14} />
        {eyebrow}
      </div>
      <h1 className="font-serif font-light text-4xl sm:text-5xl text-slate-purple mb-4 leading-tight">
        {title}
      </h1>
      <p className="text-muted-foreground font-sans leading-relaxed text-lg">
        {description}
      </p>
    </header>
  );
}

function ToolNextStep({
  title,
  copy,
  href,
  label,
}: {
  title: string;
  copy: string;
  href: string;
  label: string;
}) {
  return (
    <Link href={href} className="block group">
      <article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30 transition-all">
        <h2 className="font-serif text-2xl text-slate-purple mb-2">{title}</h2>
        <p className="text-sm text-muted-foreground font-sans leading-relaxed">
          {copy}
        </p>
        <span className="inline-flex items-center gap-1.5 text-sm font-sans font-medium text-primary mt-4">
          {label} <ArrowRight size={15} />
        </span>
      </article>
    </Link>
  );
}

function IntegrityPage() {
  return (
    <>
      <SEOHead
        title="Academic Integrity and Source Use for International Students"
        description="Learn when to quote, paraphrase, or summarize a source, how to keep citations clear, and how to review AI-assisted academic writing responsibly."
        keywords="academic integrity for international students, paraphrasing vs quoting vs summarizing, how to cite a paraphrase, source use in academic writing"
        canonical="/academic-integrity-and-source-use/"
      />
      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container">
          <ResourceHeader
            eyebrow="Source-based writing guide"
            title={
              <>
                Academic integrity starts with{" "}
                <span className="italic">clear source use</span>
              </>
            }
            description="Use this practical guide to decide whether a source needs a quotation, paraphrase, or summary—and to keep your own analysis visible in the final draft."
          />

          <section
            className="max-w-5xl mx-auto grid md:grid-cols-3 gap-5"
            aria-labelledby="source-choice-title"
          >
            <h2 id="source-choice-title" className="sr-only">
              Choose a source-use approach
            </h2>
            <article className={commonClass.card}>
              <Quote className="text-primary mb-4" size={24} />
              <h3 className="font-serif text-2xl text-slate-purple mb-2">
                Quote
              </h3>
              <p className={commonClass.copy}>
                Use the author&apos;s exact words only when the wording itself
                matters, then mark it clearly and provide the required citation.
              </p>
            </article>
            <article className={commonClass.card}>
              <BookOpenCheck className="text-primary mb-4" size={24} />
              <h3 className="font-serif text-2xl text-slate-purple mb-2">
                Paraphrase
              </h3>
              <p className={commonClass.copy}>
                Restate a specific idea in a new sentence structure when the
                idea matters more than the original wording. The source still
                needs credit.
              </p>
            </article>
            <article className={commonClass.card}>
              <FileCheck2 className="text-primary mb-4" size={24} />
              <h3 className="font-serif text-2xl text-slate-purple mb-2">
                Summarize
              </h3>
              <p className={commonClass.copy}>
                Condense the main point of a broader source when readers need
                context, background, or a short account of an argument.
              </p>
            </article>
          </section>

          <section className={`max-w-4xl mx-auto mt-12 ${commonClass.card}`}>
            <h2 className={commonClass.title}>
              Illustrative paraphrasing case
            </h2>
            <p className={commonClass.copy}>
              This is a fictional learning example, not a real student
              submission or a source to cite. It shows the difference between
              swapping a few words and rebuilding an idea in your own sentence.
            </p>
            <div className="grid md:grid-cols-2 gap-5 mt-6">
              <div className="rounded-xl bg-muted/50 p-5">
                <p className="text-xs font-sans font-semibold uppercase tracking-wider text-primary mb-2">
                  Illustrative source claim
                </p>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  “Students who receive specific feedback revise more
                  effectively than students who only receive a score.”
                </p>
              </div>
              <div className="rounded-xl bg-primary/5 p-5 border border-primary/15">
                <p className="text-xs font-sans font-semibold uppercase tracking-wider text-primary mb-2">
                  Responsible paraphrase
                </p>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  Specific comments can help students make more useful revisions
                  than a grade alone, because they identify what to change
                  (Author, year).
                </p>
              </div>
            </div>
            <p className={`${commonClass.copy} mt-5`}>
              The revision changes both the wording and the sentence structure,
              but it still credits the original idea. A citation does not
              disappear just because the words have changed.
            </p>
          </section>

          <section className="max-w-4xl mx-auto mt-8 grid md:grid-cols-2 gap-5">
            <article className={commonClass.card}>
              <h2 className={commonClass.title}>A four-step source check</h2>
              <ol className="space-y-3 text-sm text-muted-foreground font-sans leading-relaxed list-decimal pl-5">
                <li>
                  Read until you can explain the source claim without looking at
                  the sentence.
                </li>
                <li>
                  Write your version from memory, then compare it with the
                  original for accuracy.
                </li>
                <li>
                  Use quotation marks for distinctive language you keep exactly.
                </li>
                <li>
                  Place a citation where a reader can see which source supports
                  the idea.
                </li>
              </ol>
            </article>
            <article className={commonClass.card}>
              <h2 className={commonClass.title}>Use AI as a revision step</h2>
              <p className={commonClass.copy}>
                An AI suggestion can help you notice literal translation or
                awkward wording, but it cannot decide whether a claim is
                accurate, whether a source supports it, or what your university
                permits. Compare every revision with your intended meaning and
                your course policy.
              </p>
            </article>
          </section>

          <section className={`max-w-4xl mx-auto mt-8 ${commonClass.card}`}>
            <h2 className={commonClass.title}>Why this workflow matters</h2>
            <p className={commonClass.copy}>
              APA Style explains that a paraphrase restates another
              author&apos;s idea in your own words and still requires a
              citation. Purdue OWL similarly frames paraphrasing as a legitimate
              form of source use only when it is accurately documented. Read the
              primary guidance before relying on a tool or a course handout:{" "}
              <ExternalLink href={sourceLinks.apaParaphrases}>
                APA Style on paraphrases
              </ExternalLink>
              ,{" "}
              <ExternalLink href={sourceLinks.purdueParaphrase}>
                Purdue OWL on paraphrasing
              </ExternalLink>
              , and{" "}
              <ExternalLink href={sourceLinks.purdueSourceUse}>
                Purdue OWL on quoting, paraphrasing, and summarizing
              </ExternalLink>
              .
            </p>
          </section>

          <section className="max-w-5xl mx-auto mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ToolNextStep
              title="Use a full paraphrase process"
              copy="Work from source understanding to purpose-led restructuring, accuracy review, and visible attribution."
              href="/how-to-paraphrase-without-plagiarizing"
              label="Read the paraphrasing guide"
            />
            <ToolNextStep
              title="Build an annotated bibliography"
              copy="Summarize, evaluate, and connect a verified source to your research question."
              href="/annotated-bibliography-example"
              label="Read the annotation guide"
            />
            <ToolNextStep
              title="Check a paraphrase"
              copy="Review non-native phrasing after you have written and cited the idea yourself."
              href="/academic-paraphrasing-tool-for-esl-students"
              label="Open paraphrasing support"
            />
            <ToolNextStep
              title="Build the reference"
              copy="Generate a citation after checking the original source information."
              href="/citations"
              label="Open Citation Generator"
            />
          </section>
        </div>
      </main>
    </>
  );
}

function ExamplesPage() {
  return (
    <>
      <SEOHead
        title="Academic Writing Examples for Research Papers and Essays"
        description="Study clear, labelled examples of source-based writing, methods descriptions, and results reporting, with explanations for international students."
        keywords="academic writing examples, research paper examples, paraphrasing example, methods section example, results section example"
        canonical="/academic-writing-examples/"
      />
      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container">
          <ResourceHeader
            eyebrow="Illustrative writing examples"
            title={
              <>
                See the writing move, then{" "}
                <span className="italic">make it your own</span>
              </>
            }
            description="These short, synthetic examples show how a sentence changes when you move from source notes to a paraphrase, a methods description, or a results statement."
          />
          <section className={`max-w-4xl mx-auto ${commonClass.card}`}>
            <p className="text-sm font-sans text-primary font-medium">
              Important: every example below is fictional and simplified for
              learning. Replace the bracketed details with your own evidence,
              data, discipline conventions, and required citations.
            </p>
          </section>

          <section
            className="max-w-4xl mx-auto mt-8 space-y-6"
            aria-label="Academic writing examples"
          >
            <article className={commonClass.card}>
              <div className="flex items-center gap-2 text-primary mb-3">
                <Scale size={18} />
                <span className="text-xs font-sans font-semibold uppercase tracking-wider">
                  Example 1 · Source-based writing
                </span>
              </div>
              <h2 className={commonClass.title}>
                Move from a note to a cited claim
              </h2>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <p className="text-xs font-sans font-semibold text-muted-foreground mb-2">
                    Research note
                  </p>
                  <p className={commonClass.copy}>
                    The fictional study reports that peer feedback helped
                    first-year students identify unclear claims.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-sans font-semibold text-muted-foreground mb-2">
                    Draft sentence
                  </p>
                  <p className={commonClass.copy}>
                    Peer feedback may help first-year writers notice claims that
                    need clarification (Author, year).
                  </p>
                </div>
              </div>
              <p className={`${commonClass.copy} mt-5`}>
                The verb <em>may help</em> keeps the claim proportionate to the
                evidence. The citation identifies the source of the idea, while
                the sentence remains part of the writer&apos;s argument.
              </p>
            </article>

            <article className={commonClass.card}>
              <div className="flex items-center gap-2 text-primary mb-3">
                <FileCheck2 size={18} />
                <span className="text-xs font-sans font-semibold uppercase tracking-wider">
                  Example 2 · Methods section
                </span>
              </div>
              <h2 className={commonClass.title}>Name what you actually did</h2>
              <p className="rounded-xl bg-muted/50 p-5 text-sm text-foreground/80 leading-relaxed">
                This study used semi-structured interviews to explore how
                [participant group] experienced [topic]. Participants were
                recruited through [method], and interview transcripts were
                analysed using [named approach].
              </p>
              <p className={`${commonClass.copy} mt-5`}>
                This pattern tells readers the design, participants, collection
                method, and analysis method. It is a structure prompt, not a
                sentence to use unchanged. Add the details that let a reader
                understand your actual procedure.
              </p>
            </article>

            <article className={commonClass.card}>
              <div className="flex items-center gap-2 text-primary mb-3">
                <BookOpenCheck size={18} />
                <span className="text-xs font-sans font-semibold uppercase tracking-wider">
                  Example 3 · Results section
                </span>
              </div>
              <h2 className={commonClass.title}>
                Report the pattern before explaining it
              </h2>
              <p className="rounded-xl bg-muted/50 p-5 text-sm text-foreground/80 leading-relaxed">
                As shown in Table 1, the [intervention] group reported a higher
                mean [measure] than the comparison group. The difference was
                statistically significant, <em>p</em> = [value].
              </p>
              <p className={`${commonClass.copy} mt-5`}>
                This example states what the analysis found and directs the
                reader to the table. Save a claim about why the difference
                occurred or what it means for the discussion. The{" "}
                <ExternalLink href={sourceLinks.uciResults}>
                  UC Irvine scientific-writing guide
                </ExternalLink>{" "}
                likewise advises writers to present results in logical order and
                keep evaluation of their meaning for the discussion.
              </p>
            </article>
          </section>

          <section className="max-w-4xl mx-auto mt-8 grid sm:grid-cols-2 gap-4">
            <ToolNextStep
              title="Find section phrases"
              copy="Adapt sentence starters for your methods and results instead of copying a complete model."
              href="/phrases"
              label="Browse Phrase Library"
            />
            <ToolNextStep
              title="Learn the full structure"
              copy="Use the research-paper hub when you need the purpose and sequence for each section."
              href="/research-paper-sections"
              label="Explore paper sections"
            />
          </section>
        </div>
      </main>
    </>
  );
}

function TemplatesPage() {
  return (
    <>
      <SEOHead
        title="Research Paper Templates for Methods, Results, and Discussion"
        description="Use flexible research paper templates, section planners, and evidence-path checklists for empirical reports, literature reviews, proposals, methods, results, and discussion."
        keywords="research paper template, research paper outline template, methods section template, results section template, discussion section template, research writing checklist"
        canonical="/research-paper-templates/"
      />
      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container">
          <ResourceHeader
            eyebrow="Research writing templates"
            title={
              <>
                Templates that help you plan, not{" "}
                <span className="italic">fill in a paper</span>
              </>
            }
            description="Choose a structure that fits the assignment, map what each section must accomplish, and replace every prompt with your own verified evidence and course requirements."
          />

          <section className={`max-w-5xl mx-auto ${commonClass.card}`}>
            <p className="text-xs font-sans font-semibold tracking-widest uppercase text-primary mb-3">A planning sequence, not a paper generator</p>
            <h2 className={commonClass.title}>Move from the assignment to an evidence-led paper plan</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-5">
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">1. TASK</p><h3 className="font-serif text-xl text-slate-purple mb-2">Confirm the deliverable</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">Identify the paper type, question or prompt, target reader, required sources, length, citation style, and any mandatory headings.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">2. STRUCTURE</p><h3 className="font-serif text-xl text-slate-purple mb-2">Choose a fitting architecture</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">Select a section pattern that matches the assignment and discipline instead of forcing every project into the same IMRaD sequence.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">3. FUNCTION</p><h3 className="font-serif text-xl text-slate-purple mb-2">Give every section a job</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">Write a short purpose statement, planned claim or question, and evidence placeholder for each section before drafting full sentences.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">4. EVIDENCE</p><h3 className="font-serif text-xl text-slate-purple mb-2">Test the support path</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">Check that sources, data, methods, and analysis can actually develop the outline rather than being added after a conclusion is chosen.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">5. REVISE</p><h3 className="font-serif text-xl text-slate-purple mb-2">Reverse-outline the draft</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">After drafting, summarize each paragraph or section in the margin and reorganize when the emerging evidence changes the paper&apos;s focus.</p></article>
            </div>
          </section>

          <section className="max-w-5xl mx-auto mt-8 grid lg:grid-cols-2 gap-6">
            <article className="p-7 bg-hero-gradient border border-border rounded-2xl">
              <h2 className="font-serif text-3xl text-slate-purple mb-4">Choose a pattern that fits the work</h2>
              <ul className="space-y-3 text-sm text-muted-foreground font-sans leading-relaxed">
                <li><strong className="text-foreground">Empirical report:</strong> commonly uses a research-context introduction, methods, results, discussion, and references; exact headings and placement can differ.</li>
                <li><strong className="text-foreground">Literature review:</strong> typically organizes sources by theme, method, debate, or trend instead of forcing separate methods and results sections.</li>
                <li><strong className="text-foreground">Research proposal:</strong> usually connects a problem, literature-based rationale, question, feasible approach, and practical or ethical considerations.</li>
                <li><strong className="text-foreground">Argument paper or course report:</strong> may need an introduction, claims and evidence, counter-considerations, and conclusion rather than an experimental-report structure.</li>
              </ul>
            </article>
            <article className="p-7 bg-white border border-border rounded-2xl">
              <p className="text-xs font-sans font-semibold tracking-widest uppercase text-primary mb-3">Fictional learning example</p>
              <h2 className="font-serif text-3xl text-slate-purple mb-4">Map section functions before drafting</h2>
              <p className="text-sm text-muted-foreground font-sans leading-relaxed"><strong className="text-foreground">This fictional learning example is invented for practice and is not a submission template.</strong> For an invented study of a fictional student-planning workshop, a writer maps the Introduction to the problem and question, the Methods to the invented design and data route, the Results to planned factual reporting, and the Discussion to cautious interpretation and limits. When the writer finds that the available fictional notes cannot support a planned comparison, the outline changes before a conclusion is drafted. The lesson is to let an evidence path shape the structure, not to fill brackets with invented details.</p>
            </article>
          </section>

          <section className="max-w-4xl mx-auto mt-8 grid md:grid-cols-3 gap-5">
            <p className="md:col-span-3 text-xs font-sans font-semibold tracking-widest uppercase text-primary -mb-1">Fictional learning prompts — adapt only with verified project details</p>
            {[
              [
                "Methods",
                "What did you do, with whom or what data, and how did you analyse it?",
                "This study used [design] to examine [question]. Data were collected from [source/participants] through [method] and analysed using [approach].",
              ],
              [
                "Results",
                "What did the data show, in what logical order, and where should readers look?",
                "[Finding] was observed for [group/condition] (see Table/Figure [X]). The analysis showed [pattern or statistic].",
              ],
              [
                "Discussion",
                "What does the finding mean in relation to the question, literature, and study limits?",
                "This finding suggests [interpretation]. It is consistent/inconsistent with [prior research] because [reason]. One limitation is [limit].",
              ],
            ].map(([heading, purpose, template]) => (
              <article key={heading} className={commonClass.card}>
                <h2 className="font-serif text-2xl text-slate-purple mb-3">
                  {heading}
                </h2>
                <p className={commonClass.copy}>{purpose}</p>
                <p className="mt-5 rounded-xl bg-muted/50 p-4 text-sm text-foreground/80 leading-relaxed">
                  {template}
                </p>
              </article>
            ))}
          </section>

          <section className={`max-w-4xl mx-auto mt-8 ${commonClass.card}`}>
            <h2 className={commonClass.title}>
              Use a template with an evidence check
            </h2>
            <ul className="space-y-3 text-sm text-muted-foreground font-sans leading-relaxed">
              <li className="flex gap-3">
                <CheckCircle2
                  size={18}
                  className="text-primary shrink-0 mt-0.5"
                />
                Replace every bracket with details you can support from your own
                study, notes, or approved sources.
              </li>
              <li className="flex gap-3">
                <CheckCircle2
                  size={18}
                  className="text-primary shrink-0 mt-0.5"
                />
                Use the terminology, tense, reporting standards, and formatting
                rules required by your course or discipline.
              </li>
              <li className="flex gap-3">
                <CheckCircle2
                  size={18}
                  className="text-primary shrink-0 mt-0.5"
                />
                Move explanation and implications out of Results and into
                Discussion unless your discipline uses a combined section.
              </li>
            </ul>
          </section>

          <section className={`max-w-4xl mx-auto mt-8 ${commonClass.card}`}>
            <h2 className={commonClass.title}>Use templates as adjustable planning tools</h2>
            <p className={commonClass.copy}>
              <ExternalLink href="https://owl.purdue.edu/owl/general_writing/the_writing_process/developing_an_outline/how_to_outline.html">Purdue OWL</ExternalLink>{" "}
              recommends beginning an outline by clarifying purpose, audience, and thesis, then listing, grouping, ordering, and labelling material. <ExternalLink href="https://libguides.usc.edu/writingguide/outline">USC Libraries</ExternalLink>{" "}
              describes an outline as a framework for testing connections, order, gaps, and evidence; it should guide rather than constrain a project as research develops. For APA-style empirical reporting, <ExternalLink href="https://psychology.ucsd.edu/undergraduate-program/undergraduate-resources/academic-writing-resources/writing-research-papers/research-paper-structure.html">UC San Diego Psychology</ExternalLink>{" "}
              identifies common sections and important variations for literature reviews, multi-experiment papers, in-progress projects, and course assignments. The <ExternalLink href={sourceLinks.uciResults}>UC Irvine Results guide</ExternalLink> also recommends factual, evidence-supported reporting in a logical order, with tables and figures mentioned in the text. Follow your instructor, supervisor, target journal, and approved research process wherever requirements differ.
            </p>
          </section>

          <section className="max-w-5xl mx-auto mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ToolNextStep
              title="Build a research paper outline"
              copy="Map claims, section functions, and evidence before drafting the full paper."
              href="/research-paper-outline-template"
              label="Open outline template"
            />
            <ToolNextStep
              title="Choose the right paper sections"
              copy="Check how Introduction, Methods, Results, Discussion, and Conclusion differ by task."
              href="/research-paper-sections"
              label="Explore paper sections"
            />
            <ToolNextStep
              title="Synthesize the source base"
              copy="Map themes, methods, limits, and source relationships before a literature-based claim."
              href="/literature-review-synthesis-matrix"
              label="Use synthesis matrix"
            />
            <ToolNextStep
              title="Plan section-level language"
              copy="Choose methods and results phrases only after you know the evidence and reporting function."
              href="/phrases/methods"
              label="Open Methods phrases"
            />
            <ToolNextStep
              title="Report results responsibly"
              copy="Keep factual findings distinct from interpretation and connect tables or themes logically."
              href="/results-section-example-research-paper"
              label="Use Results guide"
            />
            <ToolNextStep
              title="Interpret findings carefully"
              copy="Move meaning, limitations, and implications into a focused Discussion section."
              href="/how-to-write-discussion-section"
              label="Use Discussion guide"
            />
            <ToolNextStep
              title="Check citation details"
              copy="Generate and review references only after verifying the source information you are using."
              href="/citations"
              label="Open Citation Generator"
            />
            <ToolNextStep
              title="Use sources with integrity"
              copy="Keep source notes, paraphrases, quotations, and citations traceable while you draft."
              href="/academic-integrity-and-source-use"
              label="Read source-use guide"
            />
          </section>
        </div>
      </main>
    </>
  );
}

function MlaCitationExamplesPage() {
  return (
    <>
      <SEOHead
        title="MLA 9 Citation Examples: Works Cited and In-Text Citations"
        description="Use clear, labelled MLA 9 Works Cited and in-text citation examples for books, journal articles, and web pages, with a source-detail review checklist."
        keywords="MLA citation examples, MLA 9 Works Cited examples, MLA in-text citation examples, how to cite MLA"
        canonical="/mla-citation-examples/"
      />
      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container">
          <ResourceHeader
            eyebrow="MLA citation example guide"
            title={<>MLA 9 examples for <span className="italic">Works Cited and in-text citations</span></>}
            description="Use these simplified examples to identify the parts of an MLA Works Cited entry and link each source-based claim to the correct in-text citation."
          />
          <section className={`max-w-4xl mx-auto ${commonClass.card}`}>
            <p className="text-sm font-sans text-primary font-medium">The names, titles, publishers, journals, pages, and URLs below are fictional learning examples. They demonstrate citation structure only and must never be presented as real sources.</p>
          </section>
          <section className="max-w-4xl mx-auto mt-8 space-y-5">
            {[
              ["Book", "Okafor, Mara. Writing with Evidence. Academic Press, 2024.", "Narrative: Okafor argues that careful source use supports a reader’s trust (42). · Parenthetical: (Okafor 42)."],
              ["Journal article", "Rivera, Elena, and Daniel Kim. “Revision Feedback and Undergraduate Writers.” Journal of Academic Learning, vol. 8, no. 2, 2025, pp. 44–61. https://doi.org/10.xxxx/example.", "Narrative: Rivera and Kim report that specific feedback can support revision (51). · Parenthetical: (Rivera and Kim 51)."],
              ["Web page", "Global Learning Centre. “Planning a Literature Review.” Global Learning Centre, 8 May 2025, https://example.edu/literature-review. Accessed 18 Aug. 2026.", "If the author is the organisation and no page number is available, introduce it clearly in the sentence or use a shortened title that matches the Works Cited entry."],
            ].map(([type, reference, inText]) => (
              <article key={type} className={commonClass.card}>
                <h2 className="font-serif text-2xl text-slate-purple mb-4">{type}</h2>
                <p className="rounded-xl bg-muted/50 p-5 text-sm text-foreground/80 leading-relaxed break-words">{reference}</p>
                <p className={`${commonClass.copy} mt-4`}><strong className="text-foreground/80">In-text connection:</strong> {inText}</p>
              </article>
            ))}
          </section>
          <section className={`max-w-4xl mx-auto mt-8 ${commonClass.card}`}>
            <h2 className={commonClass.title}>A source-detail check before you submit</h2>
            <ul className="space-y-3 text-sm text-muted-foreground font-sans leading-relaxed">
              {["Check the exact creator, title, container, other contributors, version or number, publisher, date, and location available for the source.", "Make sure the first meaningful element in the in-text citation helps a reader find the matching Works Cited entry.", "Use page numbers only when they exist in the source; do not invent page or paragraph numbers for a web page.", "Compare the finished citation with the course, instructor, or current MLA guidance that applies to your work."].map(item => <li key={item} className="flex gap-3"><CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />{item}</li>)}
            </ul>
            <p className={`${commonClass.copy} mt-5`}>For authoritative guidance, consult the <ExternalLink href={sourceLinks.mlaStyle}>MLA Style Center</ExternalLink>, the <ExternalLink href={sourceLinks.mlaQuickGuide}>George Mason University MLA quick guide</ExternalLink>, and <ExternalLink href={sourceLinks.mlaInText}>Purdue OWL&apos;s MLA in-text citation guide</ExternalLink>. A generator can format details you provide, but it cannot verify a source or decide whether you have credited every borrowed idea.</p>
          </section>
          <section className="max-w-4xl mx-auto mt-8 grid sm:grid-cols-2 gap-4">
            <ToolNextStep title="Generate a citation" copy="Enter checked source details, then review the final Works Cited entry before submission." href="/citations" label="Open Citation Generator" />
            <ToolNextStep title="Use sources responsibly" copy="Choose whether to quote, paraphrase, or summarize—and cite the borrowed idea clearly." href="/academic-integrity-and-source-use" label="Read source-use guide" />
          </section>
        </div>
      </main>
    </>
  );
}

function CitationExamplesPage() {
  return (
    <>
      <SEOHead
        title="Citation Examples: Choose APA 7, MLA 9, Chicago 18, or IEEE"
        description="Choose APA 7, MLA 9, Chicago 18, or IEEE citation examples, verify source details, match in-text citations to reference entries, and review generated output."
        keywords="citation examples, APA 7 citation examples, MLA 9 citation examples, Chicago 18 citation examples, IEEE citation examples, citation generator"
        canonical="/citation-examples/"
      />
      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container">
          <ResourceHeader
            eyebrow="Citation example guide"
            title={
              <>
                Citation examples start with the <span className="italic">right system and source record</span>
              </>
            }
            description="Choose the required citation system, verify the item you actually read, match every in-text or note citation to its full entry, then generate and review the final format."
          />

          <section className={`max-w-5xl mx-auto ${commonClass.card}`}>
            <p className="text-xs font-sans font-semibold tracking-widest uppercase text-primary mb-3">A citation workflow, not a format shortcut</p>
            <h2 className={commonClass.title}>Build a traceable citation before you polish punctuation</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">1. REQUIREMENT</p><h3 className="font-serif text-xl text-slate-purple mb-2">Confirm what is required</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">Check the course, discipline, supervisor, or target publication for the citation system, edition, and whether notes, in-text citations, or a bibliography are required.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">2. ITEM</p><h3 className="font-serif text-xl text-slate-purple mb-2">Identify the exact source</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">Record the version, source type, author or group author, title, container, contributors, date, pages, DOI, URL, and any required access information from the original item.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">3. SYSTEM</p><h3 className="font-serif text-xl text-slate-purple mb-2">Choose the matching format</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">Use the system and example family that match the source type and requirement; do not re-label a journal article as a web page because both have URLs.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">4. LINK</p><h3 className="font-serif text-xl text-slate-purple mb-2">Connect borrowed ideas</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">Place an accurate in-text citation, note, or signal where a reader can see which source supports the quotation, paraphrase, data, or idea.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">5. MATCH</p><h3 className="font-serif text-xl text-slate-purple mb-2">Reconcile both sides</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">Check that each cited work has one matching full entry and that each listed work is actually cited, unless your assignment has a different rule.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">6. REVIEW</p><h3 className="font-serif text-xl text-slate-purple mb-2">Verify generated output</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">Treat a generator as a formatting draft. Compare key fields and the final punctuation or ordering with official guidance and your assignment.</p></article>
            </div>
          </section>

          <section className="max-w-5xl mx-auto mt-8 grid lg:grid-cols-2 gap-6">
            <article className="p-7 bg-hero-gradient border border-border rounded-2xl">
              <h2 className="font-serif text-3xl text-slate-purple mb-4">Choose the system before choosing an example</h2>
              <ul className="space-y-3 text-sm text-muted-foreground font-sans leading-relaxed">
                <li><strong className="text-foreground">APA 7:</strong> author–date in-text citations paired with a reference list; commonly required in many social and behavioral science settings.</li>
                <li><strong className="text-foreground">MLA 9:</strong> author-page citations paired with a Works Cited list constructed from applicable core elements.</li>
                <li><strong className="text-foreground">Chicago 18:</strong> choose Notes–Bibliography or Author–Date based on your course, publication, and disciplinary practice.</li>
                <li><strong className="text-foreground">IEEE:</strong> bracketed source numbers in the order readers meet them, paired with a numbered reference list.</li>
              </ul>
            </article>
            <article className="p-7 bg-white border border-border rounded-2xl">
              <h2 className="font-serif text-3xl text-slate-purple mb-4">What a citation generator cannot decide</h2>
              <p className="text-sm text-muted-foreground font-sans leading-relaxed">A tool cannot confirm that you used the version you cite, detect every borrowed idea, decide if a quotation is accurate, resolve a missing author or date, choose a course-specific system, or guarantee that imported metadata is complete. You remain responsible for checking the original source, your wording, and the final relationship between text, notes, and reference entries.</p>
            </article>
          </section>

          <section className={`max-w-4xl mx-auto mt-8 ${commonClass.card}`}>
            <p className="text-sm font-sans text-primary font-medium">
              Fictional learning examples: the names, titles, publishers, journals, URLs, and DOI values below are invented to demonstrate APA 7 reference structure only. They are not real sources, and must not be submitted, cited, or used as evidence.
            </p>
          </section>
          <section className="max-w-4xl mx-auto mt-8 space-y-5">
            {[
              [
                "Journal article",
                "Nguyen, T., & Patel, R. (2025). Feedback timing and revision choices in undergraduate writing. Journal of Learning Research, 12(3), 44–61. https://doi.org/10.xxxx/example",
                "Parenthetical: (Nguyen & Patel, 2025) · Narrative: Nguyen and Patel (2025)",
              ],
              [
                "Web page",
                "Global Learning Centre. (2025, May 8). Planning a literature review. https://example.edu/literature-review",
                "Parenthetical: (Global Learning Centre, 2025) · Narrative: Global Learning Centre (2025)",
              ],
              [
                "Book",
                "Okafor, M. (2024). Writing with evidence. Academic Press.",
                "Parenthetical: (Okafor, 2024) · Narrative: Okafor (2024)",
              ],
            ].map(([type, reference, inText]) => (
              <article key={type} className={commonClass.card}>
                <h2 className="font-serif text-2xl text-slate-purple mb-4">
                  {type}
                </h2>
                <p className="rounded-xl bg-muted/50 p-5 text-sm text-foreground/80 leading-relaxed break-words">
                  {reference}
                </p>
                <p className={`${commonClass.copy} mt-4`}>
                  <strong className="text-foreground/80">
                    In-text citation:
                  </strong>{" "}
                  {inText}
                </p>
              </article>
            ))}
          </section>

          <section className={`max-w-4xl mx-auto mt-8 ${commonClass.card}`}>
            <h2 className={commonClass.title}>Use official guidance to check the final decision</h2>
            <p className={commonClass.copy}>
              <ExternalLink href="https://apastyle.apa.org/style-grammar-guidelines/citations/basic-principles/author-date">APA Style</ExternalLink>{" "}
              describes an author–date system in which each cited work has a corresponding reference-list entry. The <ExternalLink href="https://style.mla.org/works-cited/">MLA Style Center</ExternalLink>{" "}
              recommends assessing which core elements apply to the work before building a Works Cited entry. The <ExternalLink href="https://www.chicagomanualofstyle.org/tools_citationguide.html">Chicago Manual of Style</ExternalLink>{" "}
              distinguishes Notes–Bibliography from Author–Date and asks students to check with their instructor when choosing. Use the detailed APA, MLA, Chicago, and IEEE pages below for source-type-specific examples.
            </p>
          </section>

          <section className={`max-w-4xl mx-auto mt-8 ${commonClass.card}`}>
            <h2 className={commonClass.title}>
              Before you trust generated output
            </h2>
            <ol className="space-y-3 text-sm text-muted-foreground font-sans leading-relaxed list-decimal pl-5">
              <li>
                Open the original source and check author names, publication
                date, title, container, pages, and DOI or stable URL.
              </li>
              <li>
                Use the source type that actually matches the item you read; a
                web page and a journal article do not use the same fields.
              </li>
              <li>
                Compare your final reference and in-text citation with the
                guidance required by your course, journal, or supervisor.
              </li>
            </ol>
            <p className={`${commonClass.copy} mt-5`}>
              For official APA guidance on citing paraphrased ideas, consult{" "}
              <ExternalLink href={sourceLinks.apaParaphrases}>
                APA Style&apos;s paraphrasing guidance
              </ExternalLink>
              . A generator formats the information you provide; it does not
              verify that a source exists, that the metadata is complete, or
              that you have cited every borrowed idea.
            </p>
          </section>

          <section className="max-w-5xl mx-auto mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ToolNextStep
              title="APA 7 examples"
              copy="Check author–date citations and common reference entries, including source-specific details."
              href="/citation-examples"
              label="Review APA 7 examples"
            />
            <ToolNextStep
              title="MLA 9 examples"
              copy="Build a Works Cited entry from relevant core elements and align it with in-text citation."
              href="/mla-citation-examples"
              label="Review MLA 9 examples"
            />
            <ToolNextStep
              title="Chicago 18 examples"
              copy="Choose Notes–Bibliography or Author–Date before formatting a source."
              href="/chicago-citation-examples"
              label="Review Chicago examples"
            />
            <ToolNextStep
              title="IEEE examples"
              copy="Use numbered references and bracketed in-text citations in a consistent source order."
              href="/ieee-citation-examples"
              label="Review IEEE examples"
            />
            <ToolNextStep
              title="Cite non-English sources"
              copy="Check APA 7 rules for original-language titles, transliteration, and published translations."
              href="/apa-7-non-english-sources"
              label="Use APA multilingual guide"
            />
            <ToolNextStep
              title="Generate a citation"
              copy="Enter checked source details, then review the finished citation against the original work."
              href="/citations"
              label="Open Citation Generator"
            />
            <ToolNextStep
              title="Use sources responsibly"
              copy="Decide whether a source needs a quotation, paraphrase, or summary and cite it clearly."
              href="/academic-integrity-and-source-use"
              label="Read source-use guide"
            />
            <ToolNextStep
              title="Paraphrase with attribution"
              copy="Reshape language after understanding the source, then preserve accurate credit and source traceability."
              href="/how-to-paraphrase-without-plagiarizing"
              label="Read paraphrasing guide"
            />
          </section>
          <div className="max-w-4xl mx-auto mt-10 text-center">
            <Button
              asChild
              className="bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90"
            >
              <Link href="/citations">
                Create a citation <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}

export default function AcademicWritingResource({ kind }: ResourcePageProps) {
  if (kind === "integrity") return <IntegrityPage />;
  if (kind === "examples") return <ExamplesPage />;
  if (kind === "templates") return <TemplatesPage />;
  if (kind === "mla-citation-examples") return <MlaCitationExamplesPage />;
  return <CitationExamplesPage />;
}
