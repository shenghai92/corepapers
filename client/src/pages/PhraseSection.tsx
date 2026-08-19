import { useLocation, Link } from "wouter";
import { ArrowRight, CheckCircle2, Copy } from "lucide-react";
import { useState } from "react";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type SectionKey = "introduction" | "methods" | "results" | "discussion" | "literature-review" | "conclusion";

type Phrase = {
  text: string;
  label: string;
  note: string;
};

const SECTION_CONTENT: Record<
  SectionKey,
  {
    eyebrow: string;
    title: string;
    description: string;
    canonical: string;
    keywords: string;
    intro: string;
    phrases: Phrase[];
    checks: string[];
    guideHref: string;
    guideTitle: string;
    deepDive?: {
      title: string;
      intro: string;
      steps: { title: string; text: string }[];
      fictionalTitle: string;
      fictionalText: string;
      authorityText: string;
      authorityLinks: { href: string; label: string }[];
      resources: { href: string; title: string; text: string }[];
      evidenceDecision?: {
        title: string;
        intro: string;
        cards: { title: string; text: string }[];
      };
    };
  }
> = {
  introduction: {
    eyebrow: "Academic phrase library · Introduction",
    title: "Academic phrases for research paper introductions",
    description: "Use academic introduction phrases to establish context, identify a research gap, state a purpose, and introduce a focused research question.",
    canonical: "/phrases/introduction/",
    keywords: "introduction section phrases, research paper introduction sentence starters, research gap phrases, academic introduction phrases",
    intro: "Adapt these sentence starters to introduce a focused research problem. Replace each bracketed item with accurate, cited details from your own field and assignment.",
    phrases: [
      { label: "Context", text: "[Topic] has received increasing attention because [specific reason].", note: "Use a source when the context or trend comes from published evidence." },
      { label: "What is known", text: "Previous research has shown that [specific finding] (Author, year).", note: "Cite the original, relevant source and avoid claiming more than it reports." },
      { label: "Research gap", text: "However, less is known about [specific relationship, group, setting, or mechanism].", note: "Name a real and manageable gap rather than saying nothing is known." },
      { label: "Purpose", text: "This study examines [focused topic] among/in [defined context or group].", note: "Make the scope match the evidence and methods you will actually use." },
      { label: "Research question", text: "Accordingly, this study asks: How does [X] relate to [Y] in [context]?", note: "Use a question that is answerable within the assignment length and design." },
      { label: "Road map", text: "The paper first [step], then [step], and finally [step].", note: "Use a road map only when your discipline or instructor expects one." },
    ],
    checks: ["Cite all factual claims about prior research or the research context.", "Move from broad context to a defined problem without adding unrelated background.", "State a purpose or question that your paper can genuinely answer."],
    guideHref: "/introduction-section-example-research-paper",
    guideTitle: "Read the Introduction structure and example guide",
    deepDive: {
      title: "Guide readers from a bounded context to a research question",
      intro: "An introduction phrase has a job in a sequence: orient the reader, establish what is known, define a focused problem or gap, state what the paper will do, and make the scope match the work that follows. Recheck this sequence after the body is complete.",
      steps: [
        { title: "1. Place the topic", text: "Begin with context readers need to understand the specific research problem, not a broad dictionary definition or unsupported trend claim." },
        { title: "2. Establish what is known", text: "Use selected, cited background to show the relevant conversation without turning the opening into a full literature review." },
        { title: "3. Define a bounded problem", text: "Identify a specific unanswered question, limited evidence base, conflicting pattern, or defined context; do not claim that no research exists without a transparent search basis." },
        { title: "4. State purpose and route", text: "Tell readers what the study or paper examines, asks, or argues, and use a roadmap only when the discipline or assignment expects one." },
        { title: "5. Reconcile scope at the end", text: "After completing the paper, check that the stated question, method, delimitations, results, and structural forecast still describe what the final paper actually does." },
      ],
      fictionalTitle: "Fictional learning example: turn a broad opening into a focused entry point",
      fictionalText: "This invented practice situation is not a research claim or paragraph to submit. A fictional writer replaces an unsupported broad statement with cited context, identifies a limited population and setting, uses a cautious gap phrase tied to reviewed sources, then states a question the planned evidence can address. The writer revisits the opening after drafting to remove a roadmap promise the paper no longer keeps.",
      authorityText: "USC Libraries describes an introduction as a path from a general subject area to a particular inquiry, establishing context and significance before stating a focused purpose or problem. Its guidance also recommends reviewing the introduction after the paper is completed so the scope and roadmap match the final work.",
      authorityLinks: [
        { href: "https://libguides.usc.edu/writingguide/introduction", label: "Read USC Libraries' Introduction guidance" },
      ],
      resources: [
        { href: "/research-question-examples", title: "Research question examples", text: "Test whether a topic has become a clear, focused, complex, and answerable research question." },
        { href: "/research-gap-examples", title: "Research gap examples", text: "Frame limited or underexplored evidence carefully without claiming that nothing exists." },
        { href: "/introduction-section-example-research-paper", title: "Introduction section example", text: "Review section functions and a clearly labelled fictional learning example before drafting." },
        { href: "/research-paper-sections", title: "Research paper sections", text: "Match the introduction's question and roadmap to the method, results, discussion, and conclusion." },
      ],
    },
  },
  "literature-review": {
    eyebrow: "Academic phrase library · Literature Review",
    title: "Academic phrases for literature reviews and source synthesis",
    description: "Use literature review phrases to synthesize studies by theme, compare findings, signal a cautious research gap, and maintain your own academic voice.",
    canonical: "/phrases/literature-review/",
    keywords: "literature review phrases, synthesis phrases academic writing, research gap phrases, compare studies phrases",
    intro: "Adapt these sentence starters to connect verified sources around a theme or question. Replace every bracketed item with an accurate, cited detail from your own reading and assignment.",
    phrases: [
      { label: "Shared pattern", text: "Across the reviewed studies, [theme or pattern] emerges as a recurring concern.", note: "Name the sources or citations that support the pattern; do not imply consensus from a small or unrelated set." },
      { label: "Comparison", text: "While [Author, year] emphasizes [point], [Author, year] focuses on [different point or condition].", note: "Compare a specific aspect of the studies rather than only listing their topics." },
      { label: "Qualified agreement", text: "These findings broadly align in suggesting [careful pattern], although they differ in [method, setting, sample, or outcome].", note: "Explain the meaningful difference so readers can judge how far the comparison goes." },
      { label: "Methodological distinction", text: "The differing conclusions may reflect variation in [design, measurement, population, or context].", note: "Use may when the methodological explanation is plausible but not directly tested." },
      { label: "Research limitation", text: "However, the reviewed evidence offers limited insight into [defined population, setting, mechanism, or outcome].", note: "Base this on the sources you reviewed; avoid saying no research exists without a transparent search process." },
      { label: "Next question", text: "Further research could examine [focused question] in [defined context] using [appropriate approach].", note: "Make the next step follow from the synthesis rather than from a general interest in the topic." },
    ],
    checks: ["Organize paragraphs around a theme, question, method, or debate rather than author order.", "Place citations close to the particular source-based claim they support.", "Distinguish your synthesis from the individual findings you are reporting."],
    guideHref: "/literature-review-example",
    guideTitle: "Read the thematic Literature Review example",
    deepDive: {
      title: "Turn source notes into a cross-source claim",
      intro: "A literature review phrase should express a relationship you have established across sources, not make a row of separate summaries sound like synthesis. Organize source notes around a question, theme, method, variable, or debate before choosing comparison and gap language.",
      steps: [
        { title: "1. Record the source relationship", text: "For each source, note its relevant claim, method, setting, population, evidence, and limit rather than only saving a quotation or topic label." },
        { title: "2. Group by a meaningful lens", text: "Arrange sources by shared theme, variable, approach, disagreement, time period, or theoretical position that helps answer the review question." },
        { title: "3. Compare a specific feature", text: "Use comparison phrases to identify what aligns, differs, extends, or remains uncertain in the sources' evidence, design, context, or conclusion." },
        { title: "4. Explain the connection", text: "Show readers why the relationship matters to the review question; do not imply that sources agree simply because they discuss the same topic." },
        { title: "5. State a bounded next question", text: "Describe limited, uneven, or underexplored evidence only after reviewing an appropriate body of work, then frame a focused next step that follows from the synthesis." },
      ],
      fictionalTitle: "Fictional learning example: build synthesis before using a gap phrase",
      fictionalText: "This invented practice situation is not a research finding or paragraph to submit. A fictional writer places three invented study notes in a matrix, groups them by a shared variable, identifies a difference in setting and measurement, and uses a cautious phrase to describe limited insight into one defined context. The writer does not claim that no research exists or treat the fictional sources as real evidence.",
      authorityText: "Johns Hopkins Libraries explains that a synthesis matrix can record each source's main points and reveal how sources relate to one another when arranged by themes or variables. Use this relationship work before adapting a shared-pattern, contrast, or research-gap phrase.",
      authorityLinks: [
        { href: "https://guides.library.jhu.edu/lit-review/synthesize", label: "Read Johns Hopkins Libraries' synthesis guidance" },
      ],
      resources: [
        { href: "/literature-review-example", title: "Literature Review example", text: "Review a thematic structure and a clearly labelled fictional learning example before drafting." },
        { href: "/literature-review-synthesis-matrix", title: "Synthesis matrix guide", text: "Map sources, themes, methods, and relationships before writing cross-source paragraphs." },
        { href: "/research-gap-examples", title: "Research gap examples", text: "Describe underexplored evidence carefully and connect a gap to a feasible research question." },
        { href: "/research-question-examples", title: "Research question examples", text: "Turn a synthesis finding into a focused, researchable next question." },
      ],
    },
  },
  conclusion: {
    eyebrow: "Academic phrase library · Conclusion",
    title: "Academic phrases for research paper conclusions",
    description: "Use conclusion phrases to return to a research question, summarize a contribution, state a careful implication, and identify a focused next step without adding new evidence.",
    canonical: "/phrases/conclusion/",
    keywords: "conclusion phrases research paper, conclusion sentence starters academic writing, research paper conclusion phrases",
    intro: "Adapt these sentence starters after the paper is complete. Keep the final takeaway proportionate to your evidence and do not introduce a new result, citation, or claim that the paper has not developed.",
    phrases: [
      { label: "Return to the question", text: "This paper addressed [research question or central problem] by examining [focused approach].", note: "Use the wording your completed paper actually answers; do not expand the scope at the end." },
      { label: "Main answer", text: "Taken together, the analysis suggests that [careful central finding or claim].", note: "Use suggests or another reporting verb that matches the evidence rather than presenting a limited result as universal fact." },
      { label: "Contribution", text: "The paper contributes by clarifying [specific relationship, mechanism, interpretation, or context].", note: "Name the contribution within the assignment’s scale and the evidence you have developed." },
      { label: "Bounded implication", text: "Within [defined context], this finding may have implications for [practice, theory, policy, or future inquiry].", note: "Keep implications inside the population, setting, and design studied." },
      { label: "Limitation reminder", text: "This conclusion should be interpreted in light of [specific limitation].", note: "Use a limitation that genuinely affects scope, measurement, or inference." },
      { label: "Next step", text: "Future research could investigate [focused question] using [appropriate context or method].", note: "Offer a concrete next step that follows from the analysis instead of a generic request for more research." },
    ],
    checks: ["State what the paper established without repeating the abstract sentence by sentence.", "Remove new data, citations, and claims that have not been developed in the body.", "Use a careful implication that matches the limits of the evidence."],
    guideHref: "/conclusion-section-example-research-paper",
    guideTitle: "Read the Conclusion structure and example guide",
    deepDive: {
      title: "Leave readers with an evidence-led takeaway",
      intro: "A conclusion phrase should help readers see how the paper's claim, evidence, analysis, and limits fit together. It is a place to synthesize and clarify why the established argument matters, not a place to introduce a new thesis, unsupported evidence, or unrelated subtopic.",
      steps: [
        { title: "1. Return to the question or claim", text: "Reorient readers to the problem the paper actually addressed without copying the introduction or simply repeating the thesis word for word." },
        { title: "2. Synthesize the argument path", text: "Show how the major points and evidence work together to support a bounded answer or contribution rather than listing each section again." },
        { title: "3. State a proportionate contribution", text: "Explain what the analysis clarifies, changes, or makes newly visible within the paper's evidence, context, and limitations." },
        { title: "4. Answer the so-what question carefully", text: "Connect the established argument to a broader implication, application, or next question only when the body has prepared readers for that move." },
        { title: "5. Remove new material", text: "Before finalizing, move new evidence, quotations, citations, subtopics, and unargued claims into the body or omit them; do not unveil the thesis for the first time at the end." },
      ],
      fictionalTitle: "Fictional learning example: synthesize instead of restating",
      fictionalText: "This invented practice situation is not a conclusion to submit. A fictional writer connects an already established claim, two previously analyzed strands of evidence, and a stated limitation to explain a bounded contribution. The writer deletes a newly discovered quotation and a new policy recommendation because neither has been developed in the body of the fictional paper.",
      authorityText: "UNC Writing Center describes a conclusion as an opportunity to synthesize the paper's ideas, demonstrate their importance, and give readers a useful takeaway. Its guidance distinguishes synthesis from simple summary and cautions against first stating the thesis, adding new ideas, or inserting evidence that belongs in the body.",
      authorityLinks: [
        { href: "https://writingcenter.unc.edu/tips-and-tools/conclusions/", label: "Read UNC Writing Center's conclusion guidance" },
      ],
      resources: [
        { href: "/conclusion-section-example-research-paper", title: "Conclusion section example", text: "Review conclusion functions and a clearly labelled fictional learning example before drafting." },
        { href: "/how-to-write-discussion-section", title: "Discussion writing guide", text: "Decide whether implications, limitations, and future research belong in the Discussion or Conclusion for your assignment." },
        { href: "/academic-argument-evidence", title: "Academic argument and evidence", text: "Check that the final takeaway follows from the claim, support, reasoning, and limitations in the body." },
        { href: "/research-question-examples", title: "Research question examples", text: "Return to the focused problem the paper set out to address rather than widening the scope at the end." },
      ],
    },
  },
  methods: {
    eyebrow: "Academic phrase library · Methods",
    title: "Academic phrases for research methods sections",
    description:
      "Find academic sentence starters for methodology and methods sections, including research design, data collection, participants, and analysis.",
    canonical: "/phrases/methods/",
    keywords:
      "methods section phrases, methodology section sentence starters, academic phrases for research methods, data collection phrases",
    intro:
      "Use these sentence starters to explain a research design, data collection process, sample, instrument, and analysis method in clear academic English.",
    phrases: [
      {
        label: "Research design",
        text: "This study used a [qualitative/quantitative/mixed-methods] design to examine [X].",
        note: "Name the design you actually used and connect it to the question.",
      },
      {
        label: "Methodological rationale",
        text: "The research adopted a [design] approach because it allowed the study to [purpose].",
        note: "Explain why the approach suits the study rather than presenting a method label alone.",
      },
      {
        label: "Data collection",
        text: "Data were collected from [participants/data source] between [time period].",
        note: "Add enough context for a reader to understand what was collected and when.",
      },
      {
        label: "Sampling",
        text: "Participants were recruited using [sampling method] and met the following criteria: [criteria].",
        note: "State selection criteria accurately and avoid implying representativeness you cannot support.",
      },
      {
        label: "Analysis",
        text: "The data were analysed using [thematic analysis/regression/content analysis] to identify [pattern or relationship].",
        note: "Name the procedure and the purpose of the analysis.",
      },
      {
        label: "Ethics or consent",
        text: "Informed consent was obtained from all participants before data collection began.",
        note: "Use only when it accurately describes the approval or consent process required for your study.",
      },
    ],
    checks: [
      "Replace every bracketed item with a specific detail from your own study.",
      "Use the tense and level of detail required by your discipline or instructor.",
      "Distinguish the logic of your methodology from the practical methods you used.",
    ],
    guideHref: "/blog/how-to-write-a-methodology-section-for-a-research-paper",
    guideTitle: "Read the methodology structure and example guide",
    deepDive: {
      title: "Move from a method label to a traceable study account",
      intro: "A useful methods phrase names something the study actually did. Build the section around decisions a reader needs to understand the design and procedure, then adjust terminology, order, detail, and tense to your discipline and assignment.",
      steps: [
        { title: "1. Define the design", text: "State the research question, overall design, and why the approach can address that question. A design label alone does not explain the study logic." },
        { title: "2. Identify people, data, or materials", text: "Describe participants, datasets, documents, instruments, settings, and eligibility or selection criteria only as they actually apply to the study." },
        { title: "3. Describe the procedure in a usable order", text: "Walk readers through collection and preparation in the order events occurred, including instructions, conditions, and relevant controls where required." },
        { title: "4. Name the analysis and its purpose", text: "Specify what analytic procedure was used and what pattern, relationship, or theme it was used to examine; do not report findings here." },
        { title: "5. Check scope, ethics, and transparency", text: "Include approvals, consent, safeguards, exclusions, limitations, or access details when they are relevant and permitted by your discipline or instructor." },
      ],
      fictionalTitle: "Fictional learning example: adapt a methods phrase to real decisions",
      fictionalText: "This invented practice situation is not a completed study or text to submit. A fictional writer first records the study's actual design, recruitment criteria, survey materials, chronological procedure, and planned thematic analysis. The writer then changes the bracketed phrases only after checking each detail against the study record, rather than using a generic method sentence to fill an information gap.",
      authorityText: "Purdue OWL explains that a Method section should let readers follow how research was conducted, including relevant participants, materials, design, variables, and procedure. Use its guidance to decide what information a phrase must connect to, not as a substitute for reporting your own study accurately.",
      authorityLinks: [
        { href: "https://owl.purdue.edu/owl/subject_specific_writing/writing_in_the_social_sciences/writing_in_psychology_experimental_report_writing/experimental_reports_2.html", label: "Read Purdue OWL's Methods guidance" },
      ],
      resources: [
        { href: "/methodology-vs-methods-research-paper", title: "Methodology vs. methods", text: "Separate the rationale for an approach from the procedures that carried it out." },
        { href: "/methodology-section-example-research-paper", title: "Methodology section example", text: "Review section functions and a clearly labelled fictional learning example before drafting." },
        { href: "/research-paper-sections", title: "Research paper sections", text: "Connect methods language to the question, results, discussion, and paper structure." },
        { href: "/academic-integrity-and-source-use", title: "Academic integrity and source use", text: "Keep study materials, measures, quotations, citations, and disclosures traceable." },
      ],
    },
  },
  discussion: {
    eyebrow: "Academic phrase library · Discussion",
    title: "Academic phrases for discussion sections",
    description: "Use academic discussion phrases to interpret findings, compare them with prior research, explain limitations, and state cautious implications.",
    canonical: "/phrases/discussion/",
    keywords: "discussion section phrases, academic phrases for discussion, interpreting results phrases, limitations and implications phrases",
    intro: "Adapt these sentence starters after you have reported the results. Keep each interpretation proportionate to your research design, findings, and cited literature.",
    phrases: [
      { label: "Principal finding", text: "The main finding suggests that [interpretation of result].", note: "Use suggests when the evidence supports a cautious interpretation rather than proof." },
      { label: "Comparison", text: "This pattern is consistent with/contrasts with [Author, year], who found that [specific point].", note: "Compare a precise aspect of the finding and cite the relevant source." },
      { label: "Possible explanation", text: "One possible explanation is that [mechanism], although this interpretation requires further investigation.", note: "Do not present a possible explanation as an established fact." },
      { label: "Limitation", text: "This interpretation should be considered in light of [specific limitation].", note: "Name a limitation that genuinely affects scope, measurement, or inference." },
      { label: "Implication", text: "Within this context, the findings may have implications for [practice, theory, or policy].", note: "Keep the implication within the population and design studied." },
      { label: "Future research", text: "Future research could examine whether [focused next question] using [appropriate method or context].", note: "Offer a specific next step instead of a generic call for more research." },
    ],
    checks: ["Interpret principal findings instead of repeating all results.", "Do not turn a correlation or self-report pattern into a causal claim.", "Keep new data and new evidence out of the Discussion section."],
    guideHref: "/discussion-section-example-research-paper",
    guideTitle: "Read the Discussion structure and example guide",
    deepDive: {
      title: "Interpret a finding without writing a second Results section",
      intro: "A Discussion phrase should make an evidence-led interpretive move. Refer briefly to a result, explain what it may mean in relation to the research problem and prior work, examine limits or alternatives, and keep the final implication inside the study's scope.",
      steps: [
        { title: "1. Return to the relevant finding", text: "Use a bridge sentence that reminds readers of the particular result or theme being interpreted without repeating a full Results paragraph." },
        { title: "2. State a bounded interpretation", text: "Explain what the finding suggests for the research question, using language that matches the design, measurement, and evidence rather than treating a result as proof." },
        { title: "3. Compare with relevant studies", text: "Use cited literature to show whether the interpretation aligns, contrasts, or adds a condition to earlier findings; explain the specific basis of comparison." },
        { title: "4. Consider alternatives and limits", text: "Acknowledge plausible competing explanations, unexpected patterns, and limitations that affect the reach of the interpretation without using an apologetic tone." },
        { title: "5. End with a proportionate implication", text: "State what the result may contribute to theory, practice, policy, or future inquiry only within the population, context, method, and uncertainty of the study." },
      ],
      fictionalTitle: "Fictional learning example: build an interpretive bridge",
      fictionalText: "This invented practice situation is not a real finding or discussion paragraph to submit. A fictional writer briefly refers to a reported pattern, uses a cautious phrase to offer one possible interpretation, compares it with a fictional earlier study, identifies a fictional sampling limit, and frames a limited future question. The writer does not add a new statistic or present the possible mechanism as established fact.",
      authorityText: "USC Libraries explains that Discussion interprets the significance of findings in relation to the research problem and prior work rather than restating Results. Its guidance recommends considering alternative explanations and limitations, avoiding new results and unsupported speculation, and keeping implications proportionate to the evidence.",
      authorityLinks: [
        { href: "https://libguides.usc.edu/writingguide/discussion", label: "Read USC Libraries' Discussion guidance" },
      ],
      resources: [
        { href: "/how-to-write-discussion-section", title: "Discussion writing guide", text: "Follow a full findings-to-interpretation workflow with limitations, comparison, and implications." },
        { href: "/results-section-example-research-paper", title: "Results section example", text: "Keep factual reporting distinct from the analysis of what findings may mean." },
        { href: "/hedging-language-academic-writing", title: "Hedging language", text: "Calibrate explanation and implication to the strength and limits of the evidence." },
        { href: "/academic-argument-evidence", title: "Academic argument and evidence", text: "Connect findings, claims, reasons, and limitations in an argument readers can assess." },
      ],
    },
  },
  results: {
    eyebrow: "Academic phrase library · Results",
    title: "Academic phrases for reporting research results",
    description:
      "Use academic phrases for reporting quantitative and qualitative research results, tables, findings, themes, and statistical patterns.",
    canonical: "/phrases/results/",
    keywords:
      "results section phrases, phrases for reporting research results, academic phrases for findings, quantitative results writing",
    intro:
      "Use these sentence starters to report quantitative or qualitative findings clearly before you explain what the findings mean in a discussion section.",
    phrases: [
      {
        label: "General finding",
        text: "The results showed that [X] was associated with [Y].",
        note: "Use this only when your data supports an association; do not imply causation without evidence.",
      },
      {
        label: "Table reference",
        text: "As shown in Table [X], [group] reported a higher/lower [measure] than [comparison group].",
        note: "Name the measure and comparison clearly so readers can find the evidence.",
      },
      {
        label: "Qualitative themes",
        text: "Analysis of the data identified three recurring themes: [theme 1], [theme 2], and [theme 3].",
        note: "Introduce themes here; save extended interpretation for the discussion.",
      },
      {
        label: "Statistical result",
        text: "There was a statistically significant difference between [X] and [Y] (p = [value]).",
        note: "Report the statistics and format required by your field accurately.",
      },
      {
        label: "Participant account",
        text: "Participants frequently described [theme], particularly when [condition].",
        note: "Use a quotation or a clear reference to the evidence when your discipline expects it.",
      },
      {
        label: "Null result",
        text: "The findings did not show a clear relationship between [X] and [Y].",
        note: "A null or mixed finding still belongs in the results when it directly answers the research question.",
      },
    ],
    checks: [
      "Report what the data shows before explaining why it matters.",
      "Use a reporting verb that matches the evidence and the research design.",
      "Link each table, figure, theme, or statistic to a clear sentence in the text.",
    ],
    guideHref: "/blog/how-to-write-a-results-section-research-paper-esl",
    guideTitle: "Read the results-section guide and examples",
    deepDive: {
      title: "Report the finding before you explain what it means",
      intro: "A results phrase should guide readers from the research question and measurement to a precise, supported observation. Keep interpretation, causal explanation, and broad implication for the Discussion unless your field or assignment combines those functions.",
      steps: [
        { title: "1. Reopen the question", text: "Use a short transition to identify the relevant hypothesis, question, group, measure, or qualitative theme before choosing a results phrase." },
        { title: "2. Identify the reportable observation", text: "Decide whether the evidence is a pattern, difference, relationship, theme, quotation, null result, or mixed result. Do not select a phrase before checking the actual analysis." },
        { title: "3. State the result in plain language", text: "Report the most relevant observation directly before adding technical detail; make the group, measure, comparison, or theme specific enough for readers to follow." },
        { title: "4. Point readers to the evidence", text: "Refer to the applicable table, figure, theme, quotation, descriptive statistic, or analytic output and tell readers what relevant pattern to look for without reciting every value twice." },
        { title: "5. Check statistical or thematic precision", text: "Use only the value, effect, confidence interval, quotation, code, or theme that your verified record supports. A sentence starter cannot supply a p value, sample size, effect size, or participant account." },
        { title: "6. Preserve the Results boundary", text: "Report relevant unexpected, null, or mixed findings. Move causal explanation, comparison with earlier studies, implication, and recommendation to Discussion unless the assignment explicitly combines sections." },
      ],
      fictionalTitle: "Fictional learning example: separate reporting from interpretation and never fill in a statistic",
      fictionalText: "This invented practice situation is not a real dataset, statistical output, or result to submit. A fictional writer first checks a fictional analysis record, states a measured group difference in plain language, then points to a fictional table and a verified fictional statistic. The writer does not fill in a p value, effect size, sample size, quotation, or theme merely because a phrase has a bracket. The possible reason for the difference, comparison with past studies, and limitation remain for a separate Discussion paragraph.",
      authorityText: "USC Libraries describes Results as a logical, concise report of findings based on the methods, without bias or interpretation. Purdue OWL advises writers to use tables and figures to supplement text, mention every display in the text, and focus readers on the key point rather than repeat every value. APA Style emphasizes that visual displays should help readers understand the work, while Illinois State University provides discipline-specific examples of how statistical quantities are reported in text. Check the required style manual, course, journal, and verified analysis before using any reporting form.",
      authorityLinks: [
        { href: "https://libguides.usc.edu/writingguide/results", label: "Read USC Libraries' Results guidance" },
        { href: "https://owl.purdue.edu/owl/subject_specific_writing/writing_in_the_social_sciences/writing_in_psychology_experimental_report_writing/experimental_reports_2.html", label: "Read Purdue OWL's Results guidance" },
        { href: "https://apastyle.apa.org/style-grammar-guidelines/tables-figures", label: "Read APA Style's tables and figures guidance" },
        { href: "https://about.illinoisstate.edu/jhkahn/apastats/", label: "Read Illinois State University's statistics-reporting examples" },
      ],
      evidenceDecision: {
        title: "Choose a Results phrase only after you identify the evidence job",
        intro: "A phrase can signal a result, but it cannot turn a display, statistic, theme, or absence of a pattern into evidence. Match the phrase to the record readers need to inspect, then make the reporting choice fit your discipline and assignment.",
        cards: [
          { title: "Guide a reader to a table or figure", text: "Use a display phrase only after the table or figure is numbered, readable on its own, referenced in the text, and genuinely helps the reader see a pattern. Name the point to notice instead of narrating every cell or label." },
          { title: "Report a quantitative pattern", text: "Choose an association, difference, or null-result phrase only when your analysis supports that description. Verify measure, group, direction, uncertainty, statistical values, and required reporting format; do not imply causation from an association." },
          { title: "Report a qualitative theme", text: "Use a theme phrase after checking how the theme was identified and how any excerpt or illustration is attributed under your method and discipline. A theme label is not an explanation of why participants acted or felt that way." },
          { title: "Report a null, mixed, or unexpected result", text: "Keep a relevant non-result visible when it answers the question or complicates an expectation. Describe what the analysis did or did not show, then reserve explanations of why for a later interpretive section." },
        ],
      },
      resources: [
        { href: "/results-section-example-research-paper", title: "Results section example", text: "Review reporting order, fictional learning examples, and boundaries between reporting and interpretation." },
        { href: "/how-to-write-discussion-section", title: "Discussion writing guide", text: "Move from reported findings to careful interpretation, comparison, limitations, and implications." },
        { href: "/methodology-section-example-research-paper", title: "Methodology section example", text: "Check that every reported finding follows from the design, data source, procedure, and analysis actually described." },
        { href: "/hedging-language-academic-writing", title: "Hedging language", text: "Calibrate certainty so claims remain proportionate to the method and evidence." },
        { href: "/academic-argument-evidence", title: "Academic argument and evidence", text: "Connect reported evidence to a defensible claim without overstating what the evidence can show." },
        { href: "/citations", title: "Citation check", text: "Verify source records when a display, dataset, scale, quotation, or adapted material requires attribution." },
        { href: "/academic-integrity-and-source-use", title: "Source-use guide", text: "Keep analyses, data records, quotations, and borrowed material traceable while drafting Results." },
      ],
    },
  },
};

export default function PhraseSection() {
  const [location] = useLocation();
  const key: SectionKey = location.includes("/phrases/introduction")
    ? "introduction"
    : location.includes("/phrases/literature-review")
      ? "literature-review"
    : location.includes("/phrases/conclusion")
      ? "conclusion"
    : location.includes("/phrases/discussion")
      ? "discussion"
      : location.includes("/phrases/results")
        ? "results"
        : "methods";
  const content = SECTION_CONTENT[key];
  const [copied, setCopied] = useState<string | null>(null);

  const copyPhrase = (phrase: string) => {
    navigator.clipboard.writeText(phrase);
    setCopied(phrase);
    toast.success("Phrase copied. Adapt it to your evidence and assignment.");
    window.setTimeout(() => setCopied(null), 1800);
  };

  return (
    <>
      <SEOHead
        title={content.title}
        description={content.description}
        keywords={content.keywords}
        canonical={content.canonical}
      />
      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-sans font-medium mb-4">
              {content.eyebrow}
            </div>
            <h1 className="font-serif font-light text-4xl sm:text-5xl text-slate-purple mb-4 leading-tight">
              {content.title}
            </h1>
            <p className="text-muted-foreground font-sans leading-relaxed text-lg">
              {content.intro}
            </p>
          </div>

          <section
            className="max-w-4xl mx-auto"
            aria-label={`${key} phrase examples`}
          >
            <div className="grid md:grid-cols-2 gap-4">
              {content.phrases.map(phrase => (
                <button
                  type="button"
                  key={phrase.text}
                  onClick={() => copyPhrase(phrase.text)}
                  className="text-left p-6 bg-white border border-border rounded-2xl hover:border-primary/30 hover:shadow-card transition-all group"
                >
                  <div className="flex justify-between gap-3 items-start">
                    <span className="text-xs font-sans font-semibold uppercase tracking-wider text-primary">
                      {phrase.label}
                    </span>
                    {copied === phrase.text ? (
                      <CheckCircle2
                        size={17}
                        className="text-emerald-500 shrink-0"
                      />
                    ) : (
                      <Copy
                        size={17}
                        className="text-muted-foreground group-hover:text-primary shrink-0"
                      />
                    )}
                  </div>
                  <p className="font-sans text-sm text-foreground leading-relaxed mt-3">
                    {phrase.text}
                  </p>
                  <p className="text-xs text-muted-foreground font-sans leading-relaxed mt-3">
                    {phrase.note}
                  </p>
                </button>
              ))}
            </div>
          </section>

          {content.deepDive && (
            <>
              <section className="max-w-5xl mx-auto mt-12 p-8 bg-white border border-border rounded-2xl shadow-card">
                <p className="text-xs font-sans font-semibold tracking-widest uppercase text-primary mb-3">Use phrases inside a section-level writing decision</p>
                <h2 className="font-serif text-3xl text-slate-purple mb-4">{content.deepDive.title}</h2>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed mb-6">{content.deepDive.intro}</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {content.deepDive.steps.map(step => (
                    <article key={step.title} className="rounded-xl bg-muted/50 p-5">
                      <h3 className="font-serif text-xl text-slate-purple mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground font-sans leading-relaxed">{step.text}</p>
                    </article>
                  ))}
                </div>
              </section>

              <section className="max-w-5xl mx-auto mt-8 grid lg:grid-cols-[1.15fr_0.85fr] gap-5">
                <article className="p-7 bg-hero-gradient border border-border rounded-2xl">
                  <p className="text-xs font-sans font-semibold tracking-widest uppercase text-primary mb-3">Practice boundary</p>
                  <h2 className="font-serif text-2xl text-slate-purple mb-3">{content.deepDive.fictionalTitle}</h2>
                  <p className="text-sm text-muted-foreground font-sans leading-relaxed">{content.deepDive.fictionalText}</p>
                </article>
                <article className="p-7 bg-white border border-border rounded-2xl">
                  <p className="text-xs font-sans font-semibold tracking-widest uppercase text-primary mb-3">University guidance</p>
                  <p className="text-sm text-muted-foreground font-sans leading-relaxed">{content.deepDive.authorityText}</p>
                  <div className="mt-4 space-y-2">
                    {content.deepDive.authorityLinks.map(link => (
                      <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="block text-sm font-sans text-primary underline underline-offset-4">{link.label}</a>
                    ))}
                  </div>
                </article>
              </section>

              {content.deepDive.evidenceDecision && (
                <section className="max-w-5xl mx-auto mt-8 p-8 bg-white border border-border rounded-2xl" aria-labelledby={`${key}-evidence-decision-title`}>
                  <p className="text-xs font-sans font-semibold tracking-widest uppercase text-primary mb-3">Evidence-to-language check</p>
                  <h2 id={`${key}-evidence-decision-title`} className="font-serif text-3xl text-slate-purple mb-3">{content.deepDive.evidenceDecision.title}</h2>
                  <p className="text-sm text-muted-foreground font-sans leading-relaxed">{content.deepDive.evidenceDecision.intro}</p>
                  <div className="grid sm:grid-cols-2 gap-4 mt-6">
                    {content.deepDive.evidenceDecision.cards.map(card => (
                      <article key={card.title} className="rounded-xl bg-muted/50 p-5">
                        <h3 className="font-serif text-xl text-slate-purple mb-2">{card.title}</h3>
                        <p className="text-sm text-muted-foreground font-sans leading-relaxed">{card.text}</p>
                      </article>
                    ))}
                  </div>
                </section>
              )}

              <section className="max-w-5xl mx-auto mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {content.deepDive.resources.map(resource => (
                  <Link key={resource.href} href={resource.href} className="block">
                    <article className="h-full p-5 bg-white border border-border rounded-xl hover:border-primary/30 hover:shadow-card transition-all">
                      <h2 className="font-serif text-2xl text-slate-purple mb-2">{resource.title}</h2>
                      <p className="text-sm text-muted-foreground font-sans leading-relaxed">{resource.text}</p>
                    </article>
                  </Link>
                ))}
              </section>
            </>
          )}

          <section className="max-w-4xl mx-auto mt-12 p-8 bg-white border border-border rounded-2xl">
            <h2 className="font-serif text-3xl text-slate-purple mb-4">
              Before you use a phrase
            </h2>
            <ul className="space-y-3">
              {content.checks.map(item => (
                <li
                  key={item}
                  className="text-sm text-muted-foreground font-sans leading-relaxed flex gap-2"
                >
                  <CheckCircle2
                    size={16}
                    className="text-emerald-500 mt-0.5 shrink-0"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="max-w-4xl mx-auto mt-8 grid sm:grid-cols-2 gap-4">
            <Link href={content.guideHref} className="block">
              <div className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30 transition-all">
                <h2 className="font-serif text-2xl text-slate-purple mb-2">
                  {content.guideTitle}
                </h2>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                  See the section structure, common mistakes, and fuller
                  examples before drafting.
                </p>
              </div>
            </Link>
            <Link href="/polish" className="block">
              <div className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30 transition-all">
                <h2 className="font-serif text-2xl text-slate-purple mb-2">
                  Polish a completed paragraph
                </h2>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                  Check non-native phrasing and academic tone after you have
                  written the specific evidence.
                </p>
              </div>
            </Link>
          </section>

          <div className="max-w-4xl mx-auto mt-10 text-center">
            <Button
              asChild
              className="bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90"
            >
              <Link href="/polish">
                Try Essay Polish <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
