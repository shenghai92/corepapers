import { Link, useLocation } from "wouter";
import {
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  Lightbulb,
  TableProperties,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";

type PracticeKind = "introduction" | "results" | "methodology" | "discussion" | "conclusion";

const authority = {
  introduction: "https://libguides.usc.edu/writingguide/introduction",
  results: "https://library.sacredheart.edu/c.php?g=29803&p=185931",
  methodology: "https://libguides.usc.edu/writingguide/methodology",
  discussion: "https://libguides.usc.edu/writingguide/discussion",
  conclusion: "https://writingcenter.unc.edu/tips-and-tools/conclusions/",
};

const data = {
  introduction: {
    canonical: "/introduction-section-example-research-paper/",
    title: "Introduction Section Example for a Research Paper: Structure and Template",
    description: "Use a fictional research-paper introduction example, a practical structure, and a checklist for moving from context to a focused research purpose.",
    keywords: "introduction section example research paper, research paper introduction template, how to write introduction research paper",
    eyebrow: "Research paper introduction practice",
    h1: "Introduction section example for a research paper",
    intro: "Use this fictional learning example to see how an Introduction can move from a defined context to a research problem, evidence-based gap, and focused purpose. It is a writing model, not real research or a substitute for your assignment brief.",
    question: "What problem does this study address, and why does that question matter?",
    checklist: [
      "I gave readers only the context they need to understand the specific problem.",
      "I used and cited relevant sources when I described what previous research has shown.",
      "I stated a focused gap, purpose, or research question rather than a broad topic.",
      "I did not report results or make claims that belong in the Discussion section.",
    ],
    sampleTitle: "Fictional introduction example",
    sample: "Students often use digital planning tools to manage coursework, yet there is limited evidence about how particular planning routines relate to assignment completion in first-year programmes. This fictional study therefore examines the association between weekly planning frequency and self-reported assignment completion among undergraduate students.",
    explanation: "The paragraph narrows from a recognisable context to a specific knowledge need and research purpose. In a real paper, any statement about previous evidence would require accurate, relevant citations.",
    next: "/research-question-examples",
    nextLabel: "Refine a research question",
  },
  results: {
    canonical: "/results-section-example-research-paper/",
    title:
      "How to Write a Results Section for a Research Paper: Example and Checklist",
    description:
      "Learn how to write a results section for a research paper with a fictional example, a practical template, and a checklist for reporting findings without turning them into discussion.",
    keywords:
      "how to write results section research paper, how to write a results section for a research paper, results section example research paper, results section sample, research paper results section example, results section template",
    eyebrow: "Research paper results practice",
    h1: "How to write a Results section for a research paper",
    intro:
      "Learn how to write a Results section that reports findings in a logical order through this fictional learning example, practical structure, and self-check. It is a writing model, not real research data, and it should never replace your own analysis or course requirements.",
    question: "What did the study find?",
    checklist: [
      "I organised findings around a research question, hypothesis, or clearly named theme.",
      "I reported only information that helps answer the research question.",
      "I used past tense and referred to every table or figure in numerical order.",
      "I removed explanations of why a result occurred; those belong in the Discussion section.",
    ],
    sampleTitle: "Fictional quantitative example",
    sample:
      "To examine whether weekly planning was associated with assignment completion, a linear regression was conducted. Planning frequency was positively associated with completion score, b = 0.31, p = .02. As shown in Table 1, participants who reported planning at least four days per week had a higher mean completion score than participants who reported planning one day or fewer.",
    explanation:
      "This paragraph names the analysis, reports the association, and directs the reader to the table. It does not claim why planning helped or recommend an intervention.",
    next: "/phrases/results",
    nextLabel: "Open Results phrases",
  },
  conclusion: {
    canonical: "/conclusion-section-example-research-paper/",
    title: "Conclusion Section Example for a Research Paper: Template and Checklist",
    description: "Use a fictional conclusion section example, a research-paper conclusion template, and a checklist for summarizing contributions without repeating the abstract.",
    keywords: "conclusion section example research paper, research paper conclusion template, how to write conclusion section research paper",
    eyebrow: "Research paper conclusion practice",
    h1: "Conclusion section example for a research paper",
    intro: "Use this fictional learning example to bring a research paper to a clear close. A conclusion should restate the central answer and contribution in fresh, concise language without adding new evidence or making claims beyond the study’s limits.",
    question: "What should readers take away from the completed paper?",
    checklist: [
      "I returned to the research question or central argument in concise language.",
      "I summarized the paper’s contribution without copying the abstract sentence by sentence.",
      "I stated implications that match the scope and limits of the evidence.",
      "I removed new data, new citations, and broad claims that the paper cannot support.",
    ],
    sampleTitle: "Fictional conclusion example",
    sample: "This fictional study found an association between weekly planning frequency and self-reported assignment completion among first-year undergraduates. The pattern suggests that planning routines may be a useful focus for student-support research, but the cross-sectional self-report design cannot establish causation. Future longitudinal work could examine how routines change across a semester.",
    explanation: "The conclusion returns to the central finding, states a limited contribution, and ends with a focused next step. It does not introduce a new result or repeat every detail from the abstract.",
    next: "/how-to-write-an-abstract-research-paper",
    nextLabel: "Review the abstract guide",
  },
  discussion: {
    canonical: "/discussion-section-example-research-paper/",
    title: "Discussion Section Example for a Research Paper: Template and Checklist",
    description: "Use a fictional discussion section example, a research-paper discussion template, and a checklist for interpreting findings without overstating evidence.",
    keywords: "discussion section example research paper, discussion section template, how to write discussion section research paper",
    eyebrow: "Research paper discussion practice",
    h1: "Discussion section example for a research paper",
    intro: "Use this fictional learning example to practise explaining what a finding may mean, connecting it to relevant research, and stating limits. It is a writing model, not real research evidence or a conclusion you can submit unchanged.",
    question: "What do the findings mean in light of the research question, prior work, and study limits?",
    checklist: [
      "I began by interpreting a principal finding rather than repeating every result.",
      "I compared the finding with relevant prior research and cited those sources accurately.",
      "I explained implications cautiously and did not claim causation from correlational evidence.",
      "I acknowledged a relevant limitation and kept new evidence out of this section.",
    ],
    sampleTitle: "Fictional discussion example",
    sample: "The positive association between weekly planning and assignment completion may suggest that regular planning is useful for this group of students. However, because the fictional study used self-reported, cross-sectional data, the finding cannot show that planning caused higher completion. Future research could test this relationship with a longitudinal or experimental design.",
    explanation: "The paragraph interprets the reported pattern, limits what can be claimed from the design, and identifies a specific next research step. It does not introduce a new result or turn an association into proof.",
    next: "/academic-argument-evidence",
    nextLabel: "Build a cautious argument",
  },
  methodology: {
    canonical: "/methodology-section-example-research-paper/",
    title:
      "How to Write a Methodology Section for a Research Paper: Example and Planner",
    description:
      "Learn how to write a methodology or methods section for a research paper with a fictional example and planner for design, participants, data collection, analysis, and limitations.",
    keywords:
      "how to write methodology section research paper, how to write a methodology section of a research paper, methodology section example research paper, sample methodology section, methodology section template, methods section research paper",
    eyebrow: "Research methodology planner",
    h1: "How to write a Methodology section for a research paper",
    intro:
      "Learn how to write a Methodology or Methods section through this fictional learning example and planner for describing research design. Replace every bracketed placeholder with verified details from your study and follow any method, ethics, or format requirements from your instructor.",
    question:
      "How was information collected or generated, and how was it analysed?",
    checklist: [
      "I stated the research design and explained why it fits the research question.",
      "I described the participants, data, setting, or sources and how they were selected.",
      "I explained collection procedures and the steps used to analyse the information.",
      "I identified relevant limitations and separated what I did from the interpretation of results.",
    ],
    sampleTitle: "Fictional methodology example",
    sample:
      "This study used a cross-sectional survey design to examine the association between weekly planning and assignment completion among undergraduate students. Participants were recruited through [approved course channel] and completed an anonymous online questionnaire. Responses were screened using the predefined inclusion criteria. Descriptive statistics and linear regression were used to examine the relationship between planning frequency and completion score.",
    explanation:
      "This paragraph gives a reader enough information to understand the design, sample route, procedure, and analysis. It does not report findings or argue that planning is effective.",
    next: "/methodology-vs-methods-research-paper",
    nextLabel: "Compare methodology and methods",
  },
} satisfies Record<PracticeKind, Record<string, string | string[]>>;

export default function SectionWritingPractice({
  kind,
}: {
  kind: PracticeKind;
}) {
  const item = data[kind];
  const [, setLocation] = useLocation();
  const isResults = kind === "results";
  const isMethodology = kind === "methodology";
  const isIntroduction = kind === "introduction";
  const isDiscussion = kind === "discussion";
  const isConclusion = kind === "conclusion";
  const sectionProcess = isResults
    ? [
        ["1. Reopen the research question", "List the research questions, hypotheses, or qualitative themes, then decide the reader-friendly order in which each finding will answer the task."],
        ["2. Choose the evidence readers need", "Select the results, quotations, descriptive statistics, comparisons, or displays that are necessary to answer the question; do not reproduce every raw observation."],
        ["3. Prepare tables and figures first", "Check labels, notes, units, captions, and numbering before drafting. Refer to each table or figure only after introducing the relevant finding."],
        ["4. Report the main finding precisely", "Name the analysis, finding, pattern, or theme accurately and use language that matches the actual measure, comparison, and degree of uncertainty."],
        ["5. Include meaningful exceptions", "Check relevant unexpected, negative, or non-supporting findings against the analysis. Do not hide them because they complicate a preferred conclusion."],
        ["6. Preserve the Discussion boundary", "Report what the analysis shows here; move explanations of why it happened, comparisons with earlier studies, implications, and recommendations to Discussion unless the task explicitly combines the sections."],
      ]
    : isMethodology
      ? [
          ["1. Reopen the research question", "State enough of the question, problem, or objective for readers to see what the design needs to investigate; do not add a method simply because it sounds sophisticated."],
          ["2. Match design to the task", "Name the qualitative, quantitative, mixed, archival, experimental, or other approach and explain why it can address this particular question within the assignment's scope."],
          ["3. Make the selection path visible", "Explain what participants, cases, documents, datasets, or materials were selected, how they were located or included, and why that route fits the research problem."],
          ["4. Record what actually happened", "Describe completed collection or generation procedures in accurate tense. Never invent approval, consent, recruitment, access, measures, or analytical decisions that your project did not use."],
          ["5. Trace the analysis route", "Identify how information was processed or analysed and how the approach connects evidence to the research question; distinguish a named analytic approach from an unsupported result."],
          ["6. Name limits and safeguards", "State relevant practical limits, anticipated problems, data gaps, or safeguards honestly. Mention ethics, consent, or approval only when actually applicable and verified."],
          ["7. Preserve section boundaries", "Keep findings for Results and explanations of meaning for Discussion. Cite methodological sources when they informed a non-obvious design choice, rather than turning the section into a general literature review."],
        ]
      : isIntroduction
        ? [
            ["1. Confirm the Introduction task", "Re-read the assignment, paper type, required headings, word limit, evidence expectations, and whether it asks for a question, hypothesis, thesis, method preview, significance statement, or roadmap. Do not import every convention from a generic research-article template."],
            ["2. Identify the reader and task", "Name the specific problem, disciplinary conversation, and reader need that make this inquiry worth following. Use the paper title's key terms early enough to establish focus, but do not rely on a dramatic hook, dictionary definition, or unsupported trend to create importance."],
            ["3. Establish only necessary context", "Give readers the smallest accurate amount of background, history, setting, definition, or foundational scholarship needed to understand the problem. Move detailed historical material or comprehensive source comparison into the Literature Review when the assignment uses one."],
            ["4. Show what is known and verifiably limited", "Use selected, accurately cited sources to establish what relevant work has found, debated, measured, or left uncertain in the defined context. Distinguish a balanced introductory foundation from a complete literature review, and do not make a source sound broader than its evidence."],
            ["5. State a cautious gap or tension", "Describe a specific limitation, disagreement, underexplored context, unanswered relationship, methodological constraint, or practical tension shown by the reviewed material. Do not say no research exists unless a genuinely exhaustive, supportable search makes that claim appropriate."],
            ["6. Declare a focused purpose and scope", "State what the paper examines, asks, argues, or tests; identify relevant cases, population, evidence, setting, time frame, or conceptual boundary when needed. Make clear what the study does not cover when that decision keeps the question feasible; delimitations are not failures or post-study limitations."],
            ["7. Provide a conditional roadmap", "Briefly forecast the argument, sections, or approach only when the genre and assignment call for it. Make every method preview, section promise, and outcome-oriented statement conditional on what the completed paper can accurately show."],
            ["8. Align with the final completed paper", "After drafting the body, reverse-check that the Introduction's context, cited conversation, question, scope, design preview, roadmap, and significance still describe the work you actually completed. Revise the opening rather than preserving an attractive promise the evidence, structure, or conclusion no longer supports."],
          ]
        : isDiscussion
          ? [
              ["1. Check the Discussion contract", "Confirm whether the assignment separates Results, Discussion, and Conclusion or combines them, then identify where interpretation, implications, limitations, recommendations, and future research belong. Follow the required genre rather than copying a generic template."],
              ["2. Reopen the reported finding", "Name the specific result, comparison, pattern, theme, exception, or unresolved question that will be interpreted. Use a short bridge from Results; do not repeat a table, statistic, quotation, or full Results paragraph."],
              ["3. Explain a bounded meaning", "State what the reported evidence may suggest for the research question in language that fits the design, measure, analysis, population, context, and degree of uncertainty. Separate an interpretation from a fact reported in Results."],
              ["4. Compare with a specific research relationship", "Connect the interpretation to prior research by identifying what genuinely aligns, differs, extends, or remains uncertain in relation to the same question, evidence, setting, method, population, or outcome. Cite each source-based relationship accurately."],
              ["5. Consider alternatives and unexpected detail", "Test a plausible competing explanation, unexpected finding, negative result, contextual factor, measurement issue, or design feature without selectively choosing only the account that supports a preferred argument. Label speculation as speculation."],
              ["6. Name limitations that change reach", "Explain how sample, setting, source, measure, design, missing data, timing, analytic choice, or other verified limitation affects the interpretation, transferability, or certainty of the claim. Do not apologize or invent a limitation for effect."],
              ["7. State a proportionate implication or next question", "Link the analysis to theory, practice, policy, or further research only where evidence and prior scholarship support that move. Make recommendations conditional, specify context, and connect future research to a real unanswered question or limitation."],
              ["8. Reconcile section boundaries", "Check that every fact, statistic, theme, quotation, or display was reported in Results; every comparison is supported by cited source; and any final takeaway or repeated recommendation is placed once in the location required by the paper's conclusion structure."],
            ]
          : isConclusion
            ? [
                ["1. Confirm the ending task", "Check whether the assignment calls the final section Conclusion, Discussion, Reflection, Implications, Recommendations, or a combined Discussion and Conclusion. Identify what must be synthesized here and what the required genre already placed elsewhere."],
                ["2. Return to the completed question", "Revisit the final research question, purpose, thesis, or central problem in language that matches the paper you actually completed. If the question, scope, or objective changed during research, revise the Introduction and Conclusion until they tell the same accurate story."],
                ["3. Synthesize the evidence path", "Show how the main claim, reasons, results, source relationships, analysis, and limitations converge to address the completed question. Do not merely list section headings, repeat the abstract, or copy Results and Discussion sentence by sentence."],
                ["4. Name a bounded contribution", "State what the paper adds, clarifies, qualifies, documents, or helps readers see differently in relation to the defined problem and existing conversation. Make the contribution match the study design, evidence, setting, population, and uncertainty."],
                ["5. Keep limitations and negative detail visible", "Retain limitations, unexpected or negative results, unresolved questions, and conditions that qualify the final takeaway. Do not apologize for a limitation or turn it into a reason to make the conclusion sound more cautious than evidence requires."],
                ["6. Explain why the answer matters", "Move from the specific completed problem to a realistic implication, significance, or broader context grounded in analysis already developed. Avoid a universal policy claim, urgency statement, or application that the paper has not supported."],
                ["7. Place future research once", "When further research belongs in the conclusion, connect it to a real limitation, unanswered question, conflicting finding, or next test. Do not repeat a recommendation already developed in Discussion unless the assignment explicitly asks for recap."],
                ["8. Run the no-new-material check", "Verify that every statistic, quotation, citation, finding, counterargument, policy recommendation, method detail, and claim was already established in the paper. Move genuinely new evidence into the relevant body section, then check that final wording preserves author responsibility."],
              ]
            : null;
  const sectionProcessTitle = isResults
    ? "How to build a Results section step by step"
    : isMethodology
      ? "How to build a Methodology section step by step"
      : isIntroduction
        ? "How to build an Introduction section step by step"
        : isDiscussion
          ? "How to build a Discussion section step by step"
          : "How to build a Conclusion section step by step";
  const sectionProcessBoundary = isResults
    ? "A fictional model can help you see the reporting order, but use only your own verified analysis, tables, figures, and course conventions in a submitted paper."
    : isMethodology
      ? "A fictional model can help you plan transparency, but use only verified details from your own design and follow your instructor, ethics process, discipline, or target journal where requirements differ."
      : isIntroduction
        ? "A fictional model can help you practise an Introduction's narrowing path, but use only accurate context, verified source relationships, a cautious research gap, and a purpose, scope, design preview, and roadmap that your completed paper can genuinely support. Do not invent a field-wide problem, source, method, finding, reader need, or significance claim merely because a model has a place for one."
        : isDiscussion
          ? "A fictional model can help you practise interpretation, but use only your own reported findings, verified sources, and actual limitations. Do not invent a result, citation, explanation, policy implication, exception, or causal conclusion; keep every move proportionate to evidence and your assignment's section structure."
          : "A fictional model can help you practise synthesis, but use only material already established in your own paper. Do not invent a result, citation, limitation, contribution, policy recommendation, or future-research need; make every final takeaway follow from the completed question, evidence, analysis, and limits.";

  return (
    <>
      <SEOHead
        title={item.title as string}
        description={item.description as string}
        keywords={item.keywords as string}
        canonical={item.canonical as string}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: item.title,
            url: `https://corepapers.space${item.canonical}`,
            description: item.description,
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://corepapers.space/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Research paper sections",
                item: "https://corepapers.space/research-paper-sections/",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: item.h1,
                item: `https://corepapers.space${item.canonical}`,
              },
            ],
          },
        ]}
      />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container">
          <header className="max-w-4xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-sans font-medium mb-4">
              <FileCheck2 size={14} />
              {item.eyebrow as string}
            </div>
            <h1 className="font-serif font-light text-4xl sm:text-5xl text-slate-purple mb-4">
              {item.h1 as string}
            </h1>
            <p className="text-muted-foreground font-sans max-w-2xl mx-auto leading-relaxed">
              {item.intro as string}
            </p>
          </header>
          <section className="max-w-5xl mx-auto grid lg:grid-cols-[1.15fr_0.85fr] gap-6">
            <article className="p-7 bg-white border border-border rounded-2xl">
              <p className="text-xs font-sans font-semibold tracking-widest uppercase text-primary mb-3">
                Guiding question
              </p>
              <h2 className="font-serif text-3xl text-slate-purple mb-4">
                {item.question as string}
              </h2>
              <div className="rounded-xl bg-muted/50 p-5">
                <p className="text-xs font-sans font-semibold tracking-widest uppercase text-muted-foreground mb-3">
                  {item.sampleTitle as string}
                </p>
                <p className="text-sm text-foreground/80 leading-relaxed font-sans">
                  {item.sample as string}
                </p>
              </div>
              <p className="mt-5 text-sm text-muted-foreground leading-relaxed font-sans">
                <strong className="text-foreground">Why this works:</strong>{" "}
                {item.explanation as string}
              </p>
            </article>
            <aside className="p-7 bg-hero-gradient border border-border rounded-2xl">
              <div className="flex gap-2 text-primary mb-4">
                <Lightbulb size={18} />
                <span className="text-xs font-sans font-semibold tracking-widest uppercase">
                  Before you submit
                </span>
              </div>
              <h2 className="font-serif text-2xl text-slate-purple mb-4">
                Section self-check
              </h2>
              <ul className="space-y-3">
                {(item.checklist as string[]).map(line => (
                  <li
                    key={line}
                    className="flex gap-2 text-sm text-muted-foreground font-sans leading-relaxed"
                  >
                    <CheckCircle2
                      size={16}
                      className="text-emerald-500 shrink-0 mt-0.5"
                    />
                    {line}
                  </li>
                ))}
              </ul>
            </aside>
          </section>
          {sectionProcess && (
            <section className="max-w-5xl mx-auto mt-8 p-7 bg-white border border-border rounded-2xl" aria-labelledby={`${kind}-process-title`}>
              <p className="text-xs font-sans font-semibold tracking-widest uppercase text-primary mb-3">Drafting workflow</p>
              <h2 id={`${kind}-process-title`} className="font-serif text-3xl text-slate-purple mb-5">
                {sectionProcessTitle}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {sectionProcess.map(([title, copy], index) => (
                  <article key={title} className="rounded-xl bg-muted/50 p-5">
                    <p className="text-xs font-sans font-semibold text-primary mb-2">STEP {index + 1}</p>
                    <h3 className="font-serif text-xl text-slate-purple mb-2">{title}</h3>
                    <p className="text-sm font-sans text-muted-foreground leading-relaxed">{copy}</p>
                  </article>
                ))}
              </div>
              <p className="mt-5 text-sm font-sans text-muted-foreground leading-relaxed">
                {sectionProcessBoundary}
              </p>
            </section>
          )}
          {isMethodology && (
            <section className="max-w-5xl mx-auto mt-8 grid lg:grid-cols-2 gap-6" aria-labelledby="methodology-evidence-title">
              <article className="p-7 bg-hero-gradient border border-border rounded-2xl">
                <p className="text-xs font-sans font-semibold tracking-widest uppercase text-primary mb-3">Fictional learning example</p>
                <h2 id="methodology-evidence-title" className="font-serif text-3xl text-slate-purple mb-4">Describe a secondary-data route without inventing access or approval</h2>
                <p className="text-sm font-sans text-muted-foreground leading-relaxed"><strong className="text-foreground">This fictional learning example is invented for practice.</strong> A fictional project examines publicly available course-policy documents from a defined set of institutions during a stated period. Its Methodology could identify the inclusion criteria, document retrieval date, coding categories, and analytic approach, then explain why these materials can address the fictional question. It must not claim interviews, consent, ethics approval, a dataset licence, institutional access, or a coding process that did not actually occur.</p>
              </article>
              <article className="p-7 bg-white border border-border rounded-2xl">
                <h2 className="font-serif text-3xl text-slate-purple mb-4">Use a transparency record before you draft</h2>
                <ul className="space-y-3 text-sm font-sans text-muted-foreground leading-relaxed"><li><strong className="text-foreground">Question-to-design link:</strong> can you explain why this type of evidence and approach answers the stated question?</li><li><strong className="text-foreground">Selection record:</strong> can you identify inclusion and exclusion decisions, setting, time frame, sample, corpus, or data origin without placeholders?</li><li><strong className="text-foreground">Action record:</strong> can you verify what you collected, transformed, coded, measured, or analysed and what you did not do?</li><li><strong className="text-foreground">Limits and safeguards:</strong> can you distinguish a real limitation or required safeguard from a sentence copied from a model?</li></ul>
              </article>
              <article className="lg:col-span-2 p-7 bg-white border border-border rounded-2xl">
                <h2 className="font-serif text-3xl text-slate-purple mb-3">Use methodology guidance, then follow your project&apos;s requirements</h2>
                <p className="text-sm font-sans text-muted-foreground leading-relaxed"><a className="text-primary underline underline-offset-4" href="https://libguides.usc.edu/writingguide/methodology" target="_blank" rel="noreferrer">USC Libraries</a> explains that a methods section should show what actions were taken to investigate a problem and why the chosen procedures fit, including data or participant selection, collection, processing, analysis, rationale, and anticipated limitations. <a className="text-primary underline underline-offset-4" href="https://library.sacredheart.edu/c.php?g=29803&p=185928" target="_blank" rel="noreferrer">Sacred Heart University Library</a> similarly emphasizes direct, precise reporting of how data were obtained and analysed, the match between method and objective, and honest treatment of practical problems. Instructor, ethics-review, journal, and disciplinary requirements control where they differ.</p>
              </article>
            </section>
          )}
          {isIntroduction && (
            <section className="max-w-5xl mx-auto mt-8 grid lg:grid-cols-2 gap-6" aria-labelledby="introduction-evidence-title">
              <article className="p-7 bg-hero-gradient border border-border rounded-2xl">
                <p className="text-xs font-sans font-semibold tracking-widest uppercase text-primary mb-3">Fictional learning example</p>
                <h2 id="introduction-evidence-title" className="font-serif text-3xl text-slate-purple mb-4">Narrow a fictional problem without manufacturing a research gap</h2>
                <p className="text-sm font-sans text-muted-foreground leading-relaxed"><strong className="text-foreground">This fictional learning example is invented for practice; it is not a real research gap, source, method, finding, or Introduction to submit.</strong> A fictional writer begins with a defined question about weekly planning routines in one first-year programme. The writer uses invented, clearly labelled background notes only to practise narrowing from the local context to a fictional tension: available fictional accounts describe planning in general, while the fictional assignment asks about a particular routine and setting. The writer then states a bounded fictional purpose and a provisional roadmap. The writer must not convert a limited fictional reading into “no research exists,” cite an invented study, promise results not yet reported, or imply that a planning routine causes assignment completion.</p>
              </article>
              <article className="p-7 bg-white border border-border rounded-2xl">
                <h2 className="font-serif text-3xl text-slate-purple mb-4">Use an Introduction record before you draft the opening</h2>
                <ul className="space-y-3 text-sm font-sans text-muted-foreground leading-relaxed"><li><strong className="text-foreground">Context check:</strong> can you identify the smallest relevant setting, history, definition, or source-based background the reader needs before the problem?</li><li><strong className="text-foreground">Known-and-limited check:</strong> can you trace each claim about existing research to an accurate source and distinguish a limited evidence base from a universal claim?</li><li><strong className="text-foreground">Gap check:</strong> can you state the specific relationship, context, method, population, period, debate, or evidence condition that remains uncertain without saying nothing exists?</li><li><strong className="text-foreground">Purpose-and-scope check:</strong> can you show how the question, claim, evidence route, boundaries, and roadmap fit the final task rather than an attractive generic template?</li></ul>
              </article>
              <article className="lg:col-span-2 p-7 bg-white border border-border rounded-2xl">
                <h2 className="font-serif text-3xl text-slate-purple mb-3">Use Introduction guidance, then follow your assignment&apos;s opening rules</h2>
                <p className="text-sm font-sans text-muted-foreground leading-relaxed"><a className="text-primary underline underline-offset-4" href="https://libguides.usc.edu/writingguide/introduction" target="_blank" rel="noreferrer">USC Libraries</a> describes an Introduction as a path from a general subject area to a particular inquiry, with necessary context, existing understanding, a focused problem or purpose, possible design framing, and a structure that must be reviewed against the completed paper. <a className="text-primary underline underline-offset-4" href="https://library.sacredheart.edu/c.php?g=29803&amp;p=185916" target="_blank" rel="noreferrer">Sacred Heart University Library</a> similarly recommends a concise, balanced foundation in published work, a defined research niche, explicit scope decisions, and a roadmap that matches the finished paper. <a className="text-primary underline underline-offset-4" href="https://www.utep.edu/uwc/writing%20help%20online/researchpaper-intro.html" target="_blank" rel="noreferrer">UTEP University Writing Center</a> frames the Introduction as a reader reference framework that defines scope and boundaries, identifies relevant deficiencies cautiously, and uses a specific, neutral purpose statement. Your instructor, discipline, journal, and paper type control where they differ.</p>
              </article>
            </section>
          )}
          {isResults && (
            <section className="max-w-5xl mx-auto mt-8 grid lg:grid-cols-2 gap-6" aria-labelledby="results-evidence-title">
              <article className="p-7 bg-hero-gradient border border-border rounded-2xl">
                <p className="text-xs font-sans font-semibold tracking-widest uppercase text-primary mb-3">Fictional learning example</p>
                <h2 id="results-evidence-title" className="font-serif text-3xl text-slate-purple mb-4">Report a qualitative pattern without making it a conclusion</h2>
                <p className="text-sm font-sans text-muted-foreground leading-relaxed"><strong className="text-foreground">This fictional learning example is invented for practice.</strong> A fictional interview project identifies three recurring descriptions of assignment planning: setting a weekly time, using reminders, and revising plans after missed deadlines. A Results section could introduce each theme, give a short, clearly attributed participant excerpt if the assignment permits, and show how the theme connects to the research question. It should not assert that reminders improve achievement or recommend a campus policy before the discussion has evaluated what the fictional evidence can and cannot show.</p>
              </article>
              <article className="p-7 bg-white border border-border rounded-2xl">
                <h2 className="font-serif text-3xl text-slate-purple mb-4">Make displays do work, not repeat the paragraph</h2>
                <ul className="space-y-3 text-sm font-sans text-muted-foreground leading-relaxed"><li><strong className="text-foreground">Introduce each display in prose:</strong> tell readers what finding to look for, then refer to the numbered table or figure.</li><li><strong className="text-foreground">Choose a logical order:</strong> organize by question, hypothesis, theme, or key comparison rather than the order in which data happened to be collected.</li><li><strong className="text-foreground">Avoid duplication:</strong> highlight the relevant pattern instead of restating every value already visible in a table, caption, or figure.</li><li><strong className="text-foreground">Keep source records visible:</strong> check figures, quotations, data transformations, and statistical values against the verified analysis or approved project record.</li></ul>
              </article>
              <article className="lg:col-span-2 p-7 bg-white border border-border rounded-2xl">
                <h2 className="font-serif text-3xl text-slate-purple mb-3">Use Results guidance, then follow your assignment&apos;s reporting rules</h2>
                <p className="text-sm font-sans text-muted-foreground leading-relaxed"><a className="text-primary underline underline-offset-4" href="https://guides.lib.uci.edu/scientificwriting/results" target="_blank" rel="noreferrer">UC Irvine Libraries</a> advises writers to present representative data in logical order, use meaningful statistics, refer to each included table or figure in the text, and keep evaluation of significance for the Discussion. <a className="text-primary underline underline-offset-4" href="https://library.sacredheart.edu/c.php?g=29803&p=185931" target="_blank" rel="noreferrer">Sacred Heart University Library</a> likewise recommends a concise, factual Results section that focuses on findings relevant to the research question, does not ignore negative results, and distinguishes raw data or appendices from the main report. Check your instructor, department, journal, and discipline when they use a different structure or combine Results and Discussion.</p>
              </article>
            </section>
          )}
          {isDiscussion && (
            <section className="max-w-5xl mx-auto mt-8 grid lg:grid-cols-2 gap-6" aria-labelledby="discussion-evidence-title">
              <article className="p-7 bg-hero-gradient border border-border rounded-2xl">
                <p className="text-xs font-sans font-semibold tracking-widest uppercase text-primary mb-3">Fictional learning example</p>
                <h2 id="discussion-evidence-title" className="font-serif text-3xl text-slate-purple mb-4">Interpret a reported pattern without making it a causal or universal claim</h2>
                <p className="text-sm font-sans text-muted-foreground leading-relaxed"><strong className="text-foreground">This fictional learning example is invented for practice; it is not a real finding, source, comparison, limitation, policy recommendation, or paragraph to submit.</strong> A fictional Results section reported an association between weekly planning and assignment completion in one fictional self-report sample. A fictional Discussion can briefly bridge to that reported association, say it may be consistent with an invented account of planning as a support routine, and compare it cautiously with an invented study in a different setting. It should name the fictional cross-sectional self-report limitation, consider reverse direction or an unmeasured factor as possible alternatives, and propose a fictional longitudinal question. It must not invent a supporting source, claim that planning caused completion, promise a universal intervention, or add a new statistic that Results did not report.</p>
              </article>
              <article className="p-7 bg-white border border-border rounded-2xl">
                <h2 className="font-serif text-3xl text-slate-purple mb-4">Use an interpretation record before choosing a confident sentence</h2>
                <ul className="space-y-3 text-sm font-sans text-muted-foreground leading-relaxed"><li><strong className="text-foreground">Finding bridge:</strong> can a reader locate the exact reported result, theme, exception, or unanswered question you are interpreting?</li><li><strong className="text-foreground">Meaning path:</strong> can you distinguish what data reported, what you infer, and what prior research supports?</li><li><strong className="text-foreground">Comparison basis:</strong> can you name the shared question and the particular evidence, design, setting, population, measure, or outcome that aligns or differs?</li><li><strong className="text-foreground">Reach check:</strong> can you identify relevant alternatives, limitations, uncertainty, and conditions before stating an implication or next question?</li></ul>
              </article>
              <article className="lg:col-span-2 p-7 bg-white border border-border rounded-2xl">
                <h2 className="font-serif text-3xl text-slate-purple mb-3">Use Discussion guidance, then follow your assignment&apos;s section rules</h2>
                <p className="text-sm font-sans text-muted-foreground leading-relaxed"><a className="text-primary underline underline-offset-4" href="https://libguides.usc.edu/writingguide/discussion" target="_blank" rel="noreferrer">USC Libraries</a> describes Discussion as evidence-based interpretation of findings in relation to the research problem and prior work; it advises writers to compare relevant studies, consider alternatives, acknowledge limitations, state significance proportionately, and avoid restating Results or introducing new results. <a className="text-primary underline underline-offset-4" href="https://library.sacredheart.edu/c.php?g=29803&p=185933" target="_blank" rel="noreferrer">Sacred Heart University Library</a> likewise recommends explaining meaning, comparing research, retaining conflicting detail, discussing limitations, and linking future research to unanswered questions. <a className="text-primary underline underline-offset-4" href="https://explore.plos.org/author-resources/how-to-write-effective-discussions-and-conclusions" target="_blank" rel="noreferrer">PLOS Author Resources</a> emphasizes realistic implications, limitations and negative results, and avoiding new evidence or overstated importance. Your instructor, discipline, journal, and paper structure control where they differ.</p>
              </article>
            </section>
          )}
          {isConclusion && (
            <section className="max-w-5xl mx-auto mt-8 grid lg:grid-cols-2 gap-6" aria-labelledby="conclusion-evidence-title">
              <article className="p-7 bg-hero-gradient border border-border rounded-2xl">
                <p className="text-xs font-sans font-semibold tracking-widest uppercase text-primary mb-3">Fictional learning example</p>
                <h2 id="conclusion-evidence-title" className="font-serif text-3xl text-slate-purple mb-4">Close a completed paper without inflating the contribution</h2>
                <p className="text-sm font-sans text-muted-foreground leading-relaxed"><strong className="text-foreground">This fictional learning example is invented for practice; it is not a real finding, source, limitation, contribution, recommendation, or conclusion to submit.</strong> A fictional paper examined an association between weekly planning and assignment completion in a defined self-report sample. Its fictional conclusion can return to that completed question, synthesize the fictional design, reported association, cautious Discussion, and cross-sectional limitation, then say the work may help frame a focused future longitudinal question. It must not add an invented statistic or citation, convert association into cause, promise a universal student-support policy, claim a contribution the fictional analysis did not establish, or repeat a recommendation that its fictional Discussion already handled.</p>
              </article>
              <article className="p-7 bg-white border border-border rounded-2xl">
                <h2 className="font-serif text-3xl text-slate-purple mb-4">Use a final synthesis record before you end the draft</h2>
                <ul className="space-y-3 text-sm font-sans text-muted-foreground leading-relaxed"><li><strong className="text-foreground">Question-to-answer check:</strong> does the final takeaway answer the completed question, purpose, or thesis—not an earlier version of the topic?</li><li><strong className="text-foreground">Contribution check:</strong> can you trace each claimed contribution to a specific analytical path, finding, source relationship, or qualified insight already established?</li><li><strong className="text-foreground">Reach check:</strong> do scope, design, population, source, method, negative detail, and limitation still constrain your significance or application claim?</li><li><strong className="text-foreground">New-material check:</strong> can you point to the earlier paper section that already introduced every statistic, quotation, citation, counterargument, recommendation, and future-research premise?</li></ul>
              </article>
              <article className="lg:col-span-2 p-7 bg-white border border-border rounded-2xl">
                <h2 className="font-serif text-3xl text-slate-purple mb-3">Use Conclusion guidance, then follow your assignment&apos;s ending rules</h2>
                <p className="text-sm font-sans text-muted-foreground leading-relaxed"><a className="text-primary underline underline-offset-4" href="https://libguides.usc.edu/writingguide/conclusion" target="_blank" rel="noreferrer">USC Libraries</a> describes a conclusion as a synthesis of key points derived from analysis, not a topic list or repeated research problem; it recommends concise contribution and significance grounded in the completed paper, appropriate future research, and no new information. <a className="text-primary underline underline-offset-4" href="https://library.sacredheart.edu/c.php?g=29803&p=185935" target="_blank" rel="noreferrer">Sacred Heart University Library</a> likewise emphasizes synthesis, clear larger significance, honest qualification through problems or negative results, and avoiding unsupported speculation or new material. <a className="text-primary underline underline-offset-4" href="https://writingcenter.fas.harvard.edu/conclusions" target="_blank" rel="noreferrer">Harvard College Writing Center</a> emphasizes that endings depend on the discipline and full argument, and can return to what, why it matters, and what follows without exhaustive repetition. Your instructor, discipline, journal, and paper structure control where they differ.</p>
              </article>
            </section>
          )}
          <section className="max-w-5xl mx-auto mt-7 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href={item.next as string} className="block">
              <div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30">
                <TableProperties size={18} className="text-primary mb-3" />
                <h2 className="font-serif text-xl text-slate-purple mb-2">
                  {item.nextLabel as string}
                </h2>
                <p className="text-sm text-muted-foreground font-sans">
                  Use sentence patterns after you have checked the structure.
                </p>
              </div>
            </Link>
            {isIntroduction && (
              <>
                <Link href="/research-gap-examples" className="block"><div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">State a cautious gap</h2><p className="text-sm text-muted-foreground font-sans">Connect a visible limit, tension, or underexplored context to a focused purpose without saying nothing exists.</p></div></Link>
                <Link href="/research-question-examples" className="block"><div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Refine the research question</h2><p className="text-sm text-muted-foreground font-sans">Test whether the question is focused, researchable, and compatible with the evidence route you can complete.</p></div></Link>
                <Link href="/literature-review-example" className="block"><div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Separate context from full synthesis</h2><p className="text-sm text-muted-foreground font-sans">Use only necessary foundational context here, then develop full source relationships in the Literature Review.</p></div></Link>
                <Link href="/methodology-section-example-research-paper" className="block"><div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Check the Methods promise</h2><p className="text-sm text-muted-foreground font-sans">Make sure any design preview or evidence route in the opening describes what you can actually document later.</p></div></Link>
                <Link href="/phrases/introduction" className="block"><div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Choose Introduction phrases carefully</h2><p className="text-sm text-muted-foreground font-sans">Adapt context, gap, purpose, scope, and roadmap language after checking the source and section responsibility.</p></div></Link>
                <Link href="/hedging-language-academic-writing" className="block"><div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Calibrate the gap claim</h2><p className="text-sm text-muted-foreground font-sans">Use cautious language when existing evidence is limited, uneven, mixed, or context-bound.</p></div></Link>
                <Link href="/academic-argument-evidence" className="block"><div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Build the argument path</h2><p className="text-sm text-muted-foreground font-sans">Connect the opening problem to a traceable claim, source record, reasoning route, and bounded conclusion.</p></div></Link>
                <Link href="/academic-integrity-and-source-use" className="block"><div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Keep the opening traceable</h2><p className="text-sm text-muted-foreground font-sans">Check that every source-based context, paraphrase, and gap statement preserves accurate attribution.</p></div></Link>
                <Link href="/citations" className="block"><div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Verify cited context</h2><p className="text-sm text-muted-foreground font-sans">Confirm citation choices and reference entries before presenting previous research in the opening.</p></div></Link>
              </>
            )}
            {isResults && (
              <>
                <Link href="/how-to-write-discussion-section" className="block">
                  <div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30">
                    <h2 className="font-serif text-xl text-slate-purple mb-2">
                      Interpret findings in Discussion
                    </h2>
                    <p className="text-sm text-muted-foreground font-sans">
                      Move from reported patterns to careful explanations, limits, and implications.
                    </p>
                  </div>
                </Link>
                <Link href="/methodology-section-example-research-paper" className="block">
                  <div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30">
                    <h2 className="font-serif text-xl text-slate-purple mb-2">
                      Recheck the Methods path
                    </h2>
                    <p className="text-sm text-muted-foreground font-sans">
                      Confirm that every reported result follows from the design, data source, procedure, and analysis you actually described.
                    </p>
                  </div>
                </Link>
                <Link href="/research-question-examples" className="block">
                  <div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30">
                    <h2 className="font-serif text-xl text-slate-purple mb-2">
                      Return to the research question
                    </h2>
                    <p className="text-sm text-muted-foreground font-sans">
                      Decide which finding genuinely answers the question before adding another table, quotation, or statistic.
                    </p>
                  </div>
                </Link>
                <Link href="/hedging-language-academic-writing" className="block">
                  <div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30">
                    <h2 className="font-serif text-xl text-slate-purple mb-2">
                      Match language to the result
                    </h2>
                    <p className="text-sm text-muted-foreground font-sans">
                      Use cautious reporting and interpretation language when design, sample, measure, or uncertainty limits the claim.
                    </p>
                  </div>
                </Link>
                <Link href="/academic-argument-evidence" className="block">
                  <div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30">
                    <h2 className="font-serif text-xl text-slate-purple mb-2">
                      Connect results to argument
                    </h2>
                    <p className="text-sm text-muted-foreground font-sans">
                      Explain in the right section how a reported finding supports, complicates, or limits the broader claim.
                    </p>
                  </div>
                </Link>
              </>
            )}
            {isMethodology && (
              <>
                <Link href="/methodology-vs-methods-research-paper" className="block">
                  <div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30">
                    <h2 className="font-serif text-xl text-slate-purple mb-2">
                      Compare methodology and methods
                    </h2>
                    <p className="text-sm text-muted-foreground font-sans">
                      Check whether your assignment expects procedures, a rationale, or both.
                    </p>
                  </div>
                </Link>
                <Link href="/research-question-examples" className="block">
                  <div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30">
                    <h2 className="font-serif text-xl text-slate-purple mb-2">
                      Test the research-question fit
                    </h2>
                    <p className="text-sm text-muted-foreground font-sans">
                      Check whether your evidence source, design, and planned analysis can actually address the question you wrote.
                    </p>
                  </div>
                </Link>
                <Link href="/results-section-example-research-paper" className="block">
                  <div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30">
                    <h2 className="font-serif text-xl text-slate-purple mb-2">
                      Align the Results path
                    </h2>
                    <p className="text-sm text-muted-foreground font-sans">
                      Make sure every result you plan to report follows from the data, procedure, and analysis you have actually described.
                    </p>
                  </div>
                </Link>
                <Link href="/academic-integrity-and-source-use" className="block">
                  <div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30">
                    <h2 className="font-serif text-xl text-slate-purple mb-2">
                      Keep records and sources responsible
                    </h2>
                    <p className="text-sm text-muted-foreground font-sans">
                      Preserve traceable notes for borrowed procedures, datasets, measures, quotations, and decisions before revising your Methods prose.
                    </p>
                  </div>
                </Link>
                <Link href="/research-paper-sections" className="block">
                  <div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30">
                    <h2 className="font-serif text-xl text-slate-purple mb-2">
                      Check the full section contract
                    </h2>
                    <p className="text-sm text-muted-foreground font-sans">
                      Verify that the question, method, results, discussion, and conclusion make compatible promises to the reader.
                    </p>
                  </div>
                </Link>
              </>
            )}
            {isDiscussion && (
              <>
                <Link href="/how-to-write-discussion-section" className="block"><div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Plan the full Discussion</h2><p className="text-sm text-muted-foreground font-sans">Move from a finding to careful interpretation, limitations, implications, and next research.</p></div></Link>
                <Link href="/results-section-example-research-paper" className="block"><div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Keep Results distinct</h2><p className="text-sm text-muted-foreground font-sans">Separate factual reporting from interpretation before making a claim about meaning.</p></div></Link>
                <Link href="/methodology-section-example-research-paper" className="block"><div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Recheck the Methods path</h2><p className="text-sm text-muted-foreground font-sans">Use the actual design, source, measure, procedure, and analysis to define what a finding can support.</p></div></Link>
                <Link href="/phrases/discussion" className="block"><div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Choose Discussion phrases carefully</h2><p className="text-sm text-muted-foreground font-sans">Select comparison, limitation, implication, and future-research language after identifying its evidence responsibility.</p></div></Link>
                <Link href="/hedging-language-academic-writing" className="block"><div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Calibrate certainty</h2><p className="text-sm text-muted-foreground font-sans">Match possible explanations and implications to evidence strength, uncertainty, and design limits.</p></div></Link>
                <Link href="/conclusion-section-example-research-paper" className="block"><div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Place the final takeaway</h2><p className="text-sm text-muted-foreground font-sans">Decide what belongs in Discussion and what should be held for final conclusion synthesis.</p></div></Link>
                <Link href="/academic-argument-evidence" className="block"><div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Test the argument path</h2><p className="text-sm text-muted-foreground font-sans">Check how a finding supports, complicates, limits, or leaves a broader claim unresolved.</p></div></Link>
                <Link href="/literature-review-synthesis-matrix" className="block"><div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Compare research precisely</h2><p className="text-sm text-muted-foreground font-sans">Map themes, designs, findings, contexts, and limits before declaring alignment or difference.</p></div></Link>
                <Link href="/research-question-examples" className="block"><div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Return to the research question</h2><p className="text-sm text-muted-foreground font-sans">Decide which reported finding genuinely answers the question before expanding an implication.</p></div></Link>
                <Link href="/research-gap-examples" className="block"><div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">State a careful next question</h2><p className="text-sm text-muted-foreground font-sans">Connect a limitation or unresolved result to specific future research without saying nothing exists.</p></div></Link>
                <Link href="/academic-integrity-and-source-use" className="block"><div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Keep comparisons traceable</h2><p className="text-sm text-muted-foreground font-sans">Check that every cited study, paraphrase, limitation, and interpretation has accurate source support.</p></div></Link>
                <Link href="/citations" className="block"><div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Verify citations in context</h2><p className="text-sm text-muted-foreground font-sans">Confirm that sources used to compare or contextualize findings are accurately cited and formatted.</p></div></Link>
              </>
            )}
            {isConclusion && (
              <>
                <Link href="/how-to-write-discussion-section" className="block"><div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Place implications carefully</h2><p className="text-sm text-muted-foreground font-sans">Decide whether implications, limitations, and future research belong in Discussion or Conclusion.</p></div></Link>
                <Link href="/discussion-section-example-research-paper" className="block"><div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Recheck the Discussion path</h2><p className="text-sm text-muted-foreground font-sans">Confirm that interpretation, comparisons, limitations, and recommendations were already established before final synthesis.</p></div></Link>
                <Link href="/results-section-example-research-paper" className="block"><div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Trace findings to Results</h2><p className="text-sm text-muted-foreground font-sans">Verify that every final claim, negative detail, and limitation has a reported evidence path.</p></div></Link>
                <Link href="/research-question-examples" className="block"><div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Return to the final question</h2><p className="text-sm text-muted-foreground font-sans">Check whether the conclusion answers the completed research question rather than a broad original topic.</p></div></Link>
                <Link href="/research-gap-examples" className="block"><div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Frame a justified next question</h2><p className="text-sm text-muted-foreground font-sans">Connect future research to a real unresolved point or limitation without saying no research exists.</p></div></Link>
                <Link href="/literature-review-synthesis-matrix" className="block"><div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Locate the contribution in prior work</h2><p className="text-sm text-muted-foreground font-sans">Use theme, method, finding, context, and limit comparisons to keep contribution claims precise.</p></div></Link>
                <Link href="/phrases/conclusion" className="block"><div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Choose Conclusion phrases carefully</h2><p className="text-sm text-muted-foreground font-sans">Select synthesis, contribution, limitation, implication, and future-research language after checking responsibility.</p></div></Link>
                <Link href="/hedging-language-academic-writing" className="block"><div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Calibrate the final claim</h2><p className="text-sm text-muted-foreground font-sans">Match the conclusion&apos;s certainty and significance to study design, evidence, scope, and uncertainty.</p></div></Link>
                <Link href="/academic-argument-evidence" className="block"><div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Check the argument path</h2><p className="text-sm text-muted-foreground font-sans">Make the final takeaway follow from the claim, support, reasoning, and limits in the body.</p></div></Link>
                <Link href="/academic-integrity-and-source-use" className="block"><div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Keep final claims traceable</h2><p className="text-sm text-muted-foreground font-sans">Check sources, paraphrases, quotations, and references before repeating a claim in the last section.</p></div></Link>
                <Link href="/citations" className="block"><div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30"><h2 className="font-serif text-xl text-slate-purple mb-2">Verify citations in context</h2><p className="text-sm text-muted-foreground font-sans">Confirm that any source recalled in the conclusion was accurately cited and already integrated into the paper.</p></div></Link>
              </>
            )}
            <Link href="/research-paper-templates" className="block">
              <div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30">
                <h2 className="font-serif text-xl text-slate-purple mb-2">
                  Use the section planner
                </h2>
                <p className="text-sm text-muted-foreground font-sans">
                  Turn the checklist into a draft plan with your own verified
                  details.
                </p>
              </div>
            </Link>
            <a
              href={authority[kind]}
              target="_blank"
              rel="noreferrer"
              className="block"
            >
              <div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30">
                <h2 className="font-serif text-xl text-slate-purple mb-2">
                  Read university guidance
                </h2>
                <p className="text-sm text-muted-foreground font-sans">
                  Compare with detailed university writing guidance for your
                  discipline.
                </p>
              </div>
            </a>
          </section>
          <div className="max-w-5xl mx-auto mt-8 text-center">
            <Button
              onClick={() => setLocation("/polish")}
              className="bg-cta-gradient text-white border-0"
            >
              Revise your own draft <ArrowRight size={16} className="ml-2" />
            </Button>
            <p className="mt-3 text-xs text-muted-foreground font-sans">
              CorePapers supports revision. You remain responsible for your
              research design, evidence, citations, and course requirements.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
