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
        description="Use flexible research paper templates and checklists for methods, results, and discussion sections, designed for international students writing in academic English."
        keywords="research paper template, methods section template, results section template, discussion section template, research writing checklist"
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
            description="Use these section-by-section prompts to organise your own evidence and draft a research paper with a clearer sequence."
          />
          <section className="max-w-4xl mx-auto grid md:grid-cols-3 gap-5">
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
            <h2 className={commonClass.title}>A note on results reporting</h2>
            <p className={commonClass.copy}>
              A useful template should reduce uncertainty about order, not
              invent evidence. The{" "}
              <ExternalLink href={sourceLinks.uciResults}>
                UC Irvine guide to writing results
              </ExternalLink>{" "}
              recommends factual, evidence-supported reporting in a logical
              order, with tables and figures mentioned in the text. Use your
              institution&apos;s requirements if they differ.
            </p>
          </section>

          <section className="max-w-4xl mx-auto mt-8 grid sm:grid-cols-2 gap-4">
            <ToolNextStep
              title="Methods phrase bank"
              copy="Choose sentence starters for design, participants, collection, and analysis."
              href="/phrases/methods"
              label="Open Methods phrases"
            />
            <ToolNextStep
              title="Results phrase bank"
              copy="Report tables, themes, statistics, and non-significant findings carefully."
              href="/phrases/results"
              label="Open Results phrases"
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
        title="APA 7 Citation Examples and In-Text Citation Examples"
        description="Use clear, labelled APA 7 citation examples for common source types and learn what to check before using a citation generator."
        keywords="APA citation examples, APA 7 reference examples, APA in-text citation examples, citation generator examples, how to cite sources"
        canonical="/citation-examples/"
      />
      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container">
          <ResourceHeader
            eyebrow="Citation example guide"
            title={
              <>
                APA citation examples with a{" "}
                <span className="italic">source-detail check</span>
              </>
            }
            description="Use these simplified examples to understand the parts of an APA 7 reference and in-text citation before you generate and review your own citation."
          />
          <section className={`max-w-4xl mx-auto ${commonClass.card}`}>
            <p className="text-sm font-sans text-primary font-medium">
              The names, titles, publishers, journals, and DOI values below are
              fictional. They demonstrate reference structure only and should
              never be submitted as real sources.
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

          <section className="max-w-4xl mx-auto mt-8 grid sm:grid-cols-2 gap-4">
            <ToolNextStep
              title="Generate a citation"
              copy="Enter the source details you have checked, then review the finished reference before submission."
              href="/citations"
              label="Open Citation Generator"
            />
            <ToolNextStep
              title="Use sources responsibly"
              copy="Decide whether your source needs a quotation, paraphrase, or summary."
              href="/academic-integrity-and-source-use"
              label="Read source-use guide"
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
