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
        { title: "1. Identify task, reader, and paper type", text: "Check whether the assignment asks for a research report, proposal, literature review, argument, case analysis, or another form. Decide what an informed reader must understand before the paper's specific purpose becomes meaningful." },
        { title: "2. Choose the shortest usable context", text: "Begin with only the historical, theoretical, disciplinary, practical, or textual context readers need to locate the precise problem. Avoid dictionary openings, unsupported trends, dramatic claims, and background that does not lead to the inquiry." },
        { title: "3. Establish what is known with a source job", text: "Use selected, cited background to show the relevant conversation, finding, debate, method, or condition. Keep each source claim close to its evidence and leave comprehensive cross-source comparison for the literature review when the paper includes one." },
        { title: "4. Turn a literature relationship into a bounded problem", text: "Identify a specific unanswered question, underexamined context, limited evidence base, conflict, method difference, outcome, or population. State what reviewed evidence can support; do not claim that no research exists without a transparent and appropriate search basis." },
        { title: "5. State purpose, question, and scope", text: "Tell readers what the paper examines, asks, or argues, then delimit the context, population, source set, time, variables, method, text, or other boundary where needed. Do not promise a causal conclusion, universal answer, or method the paper cannot deliver." },
        { title: "6. Make a conditional roadmap", text: "Forecast the upcoming structure only when the discipline or assignment expects a road map. Describe the paper's actual sections or argumentative moves without predicting results, concealing uncertainty, or promising a conclusion the body may not support." },
        { title: "7. Reconcile the opening with the finished paper", text: "After drafting the body, trace every context claim, cited “known” statement, gap, purpose, question, scope phrase, and road-map promise to the final literature review, methods, evidence, results, discussion, and conclusion. Revise claims that no longer match." },
      ],
      fictionalTitle: "Fictional learning example: build a focused entry point without inventing a trend, gap, or study",
      fictionalText: "This fictional learning example is invented for practice; it is not a real research claim, trend, gap, source, method, finding, or paragraph to submit. A fictional writer starts with an invented but bounded problem context, records which fictional source claim would need verification, and narrows an invented evidence relationship to one defined setting and question. The writer uses a cautious fictional gap phrase rather than saying no research exists, states an invented purpose that matches the planned fictional evidence, and removes a road-map promise after the fictional draft no longer contains that section. The writer does not invent consensus, a citation, a dataset, a method, or a result to make the opening sound more important.",
      authorityText: "USC Libraries explains that an Introduction leads readers from a general subject area to a particular inquiry, establishing scope, context, significance, purpose or problem, relevant method, and often a structural road map. Sacred Heart University likewise describes the broad-to-specific path, the role of selected background, purpose and rationale, and the value of reviewing the Introduction after the paper is complete. UTEP University Writing Center presents a research-introduction path that includes the problem, relevant literature, a specific literature deficiency, audience and significance, and a focused purpose; it recommends clear, neutral, scoped purpose language. Follow your discipline, instructor, journal, and assignment requirements for terminology, evidence, method disclosure, and section order.",
      authorityLinks: [
        { href: "https://libguides.usc.edu/writingguide/introduction", label: "Read USC Libraries' Introduction guidance" },
        { href: "https://library.sacredheart.edu/c.php?g=29803&p=185916", label: "Read Sacred Heart University's Introduction guidance" },
        { href: "https://www.utep.edu/uwc/writing%20help%20online/researchpaper-intro.html", label: "Read UTEP University Writing Center's introduction guidance" },
      ],
      evidenceDecision: {
        title: "Choose an Introduction phrase only after you identify the research responsibility",
        intro: "A phrase should make an actual research path easier to see. It cannot create a verified trend, turn a small reading set into consensus, manufacture a research gap, supply an unperformed method, predict results, or widen the paper beyond the evidence and assignment.",
        cards: [
          { title: "Establish context responsibly", text: "Use a context phrase only after checking whether the claim is a source-based fact, a defined disciplinary concept, or your own framing. Cite factual context and use subject-specific definitions when a term needs formal clarification." },
          { title: "Describe what is known and limited", text: "Use a known or gap phrase only after mapping what relevant sources actually study, compare, omit, or disagree about. Name a population, setting, method, outcome, relationship, or condition instead of announcing that a broad topic is unexplored." },
          { title: "State purpose and scope", text: "Use a purpose or research-question phrase only when the paper can answer it with available evidence, method, length, and assignment expectations. Delimit what the paper will not cover when that protects readers from an overbroad promise." },
          { title: "Forecast and verify the paper", text: "Use a road-map phrase only after checking the final structure. Revisit every promise after drafting so section order, methods, evidence, results, and conclusion match the opening rather than an abandoned early plan." },
        ],
      },
      resources: [
        { href: "/research-question-examples", title: "Research question examples", text: "Test whether a topic has become a clear, focused, complex, answerable question with a feasible evidence path." },
        { href: "/research-gap-examples", title: "Research gap examples", text: "Frame limited or underexplored evidence carefully without claiming that nothing exists." },
        { href: "/literature-review-example", title: "Literature Review example", text: "Move beyond opening background to a thematic synthesis of sources, agreements, differences, and limits." },
        { href: "/literature-review-synthesis-matrix", title: "Literature review synthesis matrix", text: "Map sources, themes, methods, and relationships before claiming a focused evidence gap." },
        { href: "/methodology-section-example-research-paper", title: "Methodology section example", text: "Check whether stated question, scope, and intended method genuinely match the evidence path in the paper." },
        { href: "/introduction-section-example-research-paper", title: "Introduction section example", text: "Review section functions and a clearly labelled fictional learning example before drafting." },
        { href: "/research-paper-sections", title: "Research paper sections", text: "Match the introduction's question and roadmap to the method, results, discussion, and conclusion." },
        { href: "/academic-argument-evidence", title: "Academic argument and evidence", text: "Check that the opening problem, eventual claim, evidence, reasoning, counterarguments, and scope can form one traceable argument." },
        { href: "/academic-integrity-and-source-use", title: "Academic integrity and source use", text: "Keep context, source claims, paraphrases, quotations, notes, research gaps, and citations accurately distinguishable." },
        { href: "/citations", title: "Citation check", text: "Verify attribution for background facts, prior findings, definitions, existing debates, and methods references in the opening." },
      ],
    },
  },
  "literature-review": {
    eyebrow: "Academic phrase library · Literature Review",
    title: "Literature Review Sentence Starters and Synthesis Phrases | CorePapers",
    description: "Use literature review sentence starters to open a theme, synthesize sources, compare evidence, signal scope, and frame a cautious research question without copying a template or losing citation responsibility.",
    canonical: "/phrases/literature-review/",
    keywords: "sentence starters for literature review, literature review sentence starters, literature review phrases, synthesis phrases academic writing, research gap phrases, compare studies phrases",
    intro: "Choose a literature review sentence starter only after you identify the paragraph job and a verified relationship among sources. Adapt every bracketed item to accurate, cited details from your own reading; a phrase cannot turn separate summaries into synthesis.",
    phrases: [
      { label: "Theme-led paragraph opener", text: "A recurring theme in the reviewed literature is [specific theme, relationship, debate, or condition].", note: "Use as an umbrella sentence only when multiple relevant sources genuinely support the named organizing point; do not begin with an author list." },
      { label: "Evidence relationship", text: "Studies examining [shared question or outcome] have approached [specific issue] through [named approaches, settings, or evidence].", note: "Name the real shared basis before grouping sources; a common topic label alone does not establish a synthesis relationship." },
      { label: "Shared pattern", text: "Across the reviewed studies, [theme or pattern] emerges as a recurring concern.", note: "Name the sources or citations that support the pattern; do not imply consensus from a small, uneven, or unrelated set." },
      { label: "Comparison", text: "While [Author, year] emphasizes [point], [Author, year] focuses on [different point or condition].", note: "Compare a specific question, measure, setting, method, population, or conclusion rather than only listing study topics." },
      { label: "Qualified agreement", text: "Taken together, these sources suggest [careful pattern], although they differ in [method, setting, sample, or outcome].", note: "Explain the meaningful difference so readers can judge how far the comparison goes; do not make a universal claim from partial alignment." },
      { label: "Method or context boundary", text: "This difference should be read in relation to [design, measurement, population, period, or context], which limits direct comparison.", note: "State a boundary you can verify from the sources. Do not claim that a methodological difference caused the result unless evidence supports that explanation." },
      { label: "Research limitation", text: "Within the reviewed evidence, [defined population, setting, mechanism, or outcome] remains limited, uneven, or unresolved.", note: "Base this on an appropriate, transparent source set; avoid saying no research exists without a supportable search process." },
      { label: "Next question", text: "A focused next question is whether [relationship] holds in [defined context] under [condition or approach].", note: "Make the next step follow from the synthesis rather than from a general interest in the topic." },
    ],
    checks: ["Launch paragraphs with a source-based theme, point, or question rather than author order.", "Name the specific basis on which sources align, differ, qualify, or leave uncertainty before choosing comparison language.", "Place citations close to the particular source-based claim they support and distinguish your synthesis from individual findings.", "Recheck the paragraph’s scope before using consensus, causal, gap, or significance language."],
    guideHref: "/literature-review-example",
    guideTitle: "Read the thematic Literature Review example",
    deepDive: {
      title: "Choose literature review sentence starters from a real source relationship",
      intro: "A sentence starter should launch a paragraph job you can support—not make a row of separate summaries sound like synthesis. Organize source notes around a question, theme, method, variable, or debate; verify the comparison basis; then choose or adapt wording that keeps your analytical voice and citations visible.",
      steps: [
        { title: "1. Confirm the review task and scope", text: "Check whether the assignment asks you to summarize, synthesize, evaluate, critique, map a field, support a new argument, or identify a research direction. Set the topic, discipline, period, source types, and question before choosing a polished synthesis phrase." },
        { title: "2. Build a source relationship card", text: "For each source, record the specific claim, question, theory, method, setting, population, material, evidence, conclusion, limitation, and citation details relevant to the review. Do not save only a quotation, topic label, or author name." },
        { title: "3. Choose an organizing lens", text: "Sort sources by a meaningful theme, variable, method, debate, period, theory, population, setting, outcome, or relationship that helps answer the review question. Use chronology only when it demonstrates an actual intellectual or methodological change." },
        { title: "4. Compare a specific basis", text: "Identify whether sources align, differ, qualify, extend, or leave uncertainty about the same question, evidence, design, context, measure, population, or conclusion. A source title or common topic alone is not a comparison." },
        { title: "5. Choose the paragraph job", text: "Decide whether the paragraph should orient a theme, report a source relationship, compare a defined basis, qualify a pattern, establish a boundary, or frame a supported next question. Do not choose a polished starter before knowing what the paragraph can truthfully do." },
        { title: "6. Adapt a cross-source sentence starter", text: "Use a starter to state the relationship you have established across sources, then anchor it in traceable citations and explain why that relationship matters to the organizing question. Keep your own analytical voice visible; a phrase is not evidence." },
        { title: "7. Preserve disagreement, exceptions, and limits", text: "Include a relevant conflicting result, methodological difference, boundary condition, narrow source base, or unresolved issue instead of turning a partial pattern into consensus. Do not explain a disagreement with a method difference unless the evidence supports that inference." },
        { title: "8. Verify attribution, scope, and review boundaries", text: "Check each source-based statement against the actual source, place citations near the supported claim, distinguish source findings from your synthesis, and follow assignment rules for review section, annotated bibliography, argument paper, or proposal." },
      ],
      fictionalTitle: "Fictional learning example: build a cross-source claim without inventing consensus, conflict, or a research gap",
      fictionalText: "This fictional learning example is invented for practice; it is not a real finding, source, quotation, study, research gap, citation, or paragraph to submit. A fictional writer places three invented source cards in a fictional matrix, groups them around one invented variable, and compares one stated difference in fictional setting and measurement. The writer then uses a cautious fictional synthesis phrase, names a fictional boundary condition, and frames a narrowly defined fictional next question. The writer does not turn three invented notes into field-wide consensus, pretend a method difference explains a result, claim that no research exists, or treat the fictional sources as evidence.",
      authorityText: "UNC Writing Center distinguishes a literature review's source summary from synthesis: synthesis reorganizes information, may trace intellectual progression or debate, and is generally organized around ideas rather than authors. George Mason University Writing Center explains that a literature review is not a sequence of summaries; writers identify connections among sources and launch body paragraphs with the source-based point they want to make before discussing supporting studies. Johns Hopkins Libraries explains that a synthesis matrix records source main points and relationships so writers can arrange materials by themes or variables before weaving a narrative. Follow the assignment, discipline, instructor, journal, and style requirements for review scope, source selection, evaluation, critique, citation, and section organization.",
      authorityLinks: [
        { href: "https://writingcenter.unc.edu/tips-and-tools/literature-reviews/", label: "Read UNC Writing Center's Literature Review guidance" },
        { href: "https://writingcenter.gmu.edu/writing-resources/research-based-writing/writing-a-literature-review", label: "Read George Mason University's Literature Review guidance" },
        { href: "https://guides.library.jhu.edu/lit-review/synthesize", label: "Read Johns Hopkins Libraries' synthesis guidance" },
      ],
      evidenceDecision: {
        title: "Choose a Literature Review sentence starter only after you identify the source relationship",
        intro: "A sentence starter can help readers follow a relationship you have established among sources. It cannot transform separate summaries into synthesis, make a small source set represent a field, manufacture a disagreement or gap, transfer a finding between contexts, or replace precise citation and accurate paraphrase.",
        cards: [
          { title: "Launch a theme-led paragraph", text: "Use an umbrella sentence after arranging sources by a question, theme, method, variable, debate, or other lens. State the actual source-based point before discussing evidence instead of placing several author names in the first sentence." },
          { title: "Compare with a stated basis", text: "Use alignment or contrast wording only after identifying the shared question or object and the feature that differs: evidence, setting, design, population, measure, time period, theory, or conclusion." },
          { title: "Keep disagreement and evidence scope visible", text: "Use qualification language for conflict, exception, or uncertainty that materially affects the cross-source claim. Do not erase relevant negative detail to produce an easier narrative or infer a cause of disagreement without support." },
          { title: "Frame a careful research limitation", text: "Use a gap or next-question phrase only after the review can show what evidence is limited, uneven, absent from the selected material, or unresolved. Define the specific context or relationship rather than saying an entire broad topic has never been studied." },
        ],
      },
      resources: [
        { href: "/literature-review-example", title: "Literature Review example", text: "Review thematic review structure and a clearly labelled fictional learning example before drafting cross-source paragraphs." },
        { href: "/literature-review-synthesis-matrix", title: "Synthesis matrix guide", text: "Map claims, sources, methods, settings, evidence, limits, and relationships before writing a cross-source theme claim." },
        { href: "/research-question-examples", title: "Research question examples", text: "Turn a synthesis finding into a focused, researchable question with a feasible evidence path." },
        { href: "/research-gap-examples", title: "Research gap examples", text: "Describe limited or underexplored evidence cautiously without claiming that nothing exists." },
        { href: "/introduction-section-example-research-paper", title: "Introduction section example", text: "Use only the necessary review context in an opening before narrowing to a research problem and purpose." },
        { href: "/academic-argument-evidence", title: "Academic argument and evidence", text: "Check how a literature synthesis supports a traceable claim, reasoning, counterargument, and limited conclusion." },
        { href: "/academic-paragraph-structure", title: "Academic paragraph structure", text: "Build a paragraph around a cross-source point, evidence, explanation, connection, and limit rather than author order." },
        { href: "/evaluate-academic-sources", title: "Evaluate academic sources", text: "Assess authority, purpose, evidence, context, and relevance before treating a source as support for a synthesis claim." },
        { href: "/academic-integrity-and-source-use", title: "Academic integrity and source use", text: "Keep source claims, paraphrases, summaries, quotations, synthesis, and citations accurately distinguishable." },
        { href: "/citations", title: "Citation check", text: "Verify attribution and citation formatting for every source-based claim in a cross-source paragraph." },
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
        { title: "1. Check the conclusion responsibility", text: "Confirm whether the assignment uses a distinct Conclusion or expects final implications, limitations, recommendations, or future research in Discussion. Follow the required section order rather than moving content simply to make the ending longer." },
        { title: "2. Return to the completed question or claim", text: "Reorient readers to the problem, objective, or claim the finished paper actually addressed. Match the conclusion to the final introduction and body, especially if the scope changed during research." },
        { title: "3. Synthesize the established argument path", text: "Show how key evidence, analysis, and reasoning work together to support a bounded answer. Do not list sections, copy the abstract, or repeat the thesis word for word without showing how the paper developed it." },
        { title: "4. State a contribution within its reach", text: "Explain what the analysis clarifies, changes, connects, or makes newly visible in the studied context. Distinguish a contribution to understanding from a universal solution, causal claim, or claim about populations the evidence did not examine." },
        { title: "5. Locate limits, negative detail, and remaining questions", text: "Use already reported limits, unexpected findings, or negative results to qualify the final takeaway and, where appropriate, form a focused next research question. Do not hide a relevant exception or invent uncertainty for effect." },
        { title: "6. Answer the so-what question proportionately", text: "Connect the established argument to a broader implication, application, or future inquiry only when the body prepared readers for that move. Make recommendations conditional when the study cannot establish an outcome beyond its evidence." },
        { title: "7. Remove new material and empty closing language", text: "Move new evidence, quotations, citations, subtopics, policies, and unargued claims into the body or omit them. Replace a generic ending with a concise synthesis; do not unveil the thesis for the first time at the end." },
      ],
      fictionalTitle: "Fictional learning example: synthesize a completed argument without adding a new paper at the end",
      fictionalText: "This fictional learning example is invented for practice; it is not a real conclusion, study, finding, citation, policy recommendation, or text to submit. A fictional writer returns to the fictional paper's completed question, connects two already analyzed fictional evidence strands, and states a bounded fictional contribution in the studied context. The writer uses an already reported fictional limitation to narrow a possible implication and frames one focused fictional next question. The writer deletes a newly discovered quotation, an invented national policy recommendation, and a strong causal statement because none has been developed or supported in the fictional paper.",
      authorityText: "UNC Writing Center describes a conclusion as a place to synthesize the paper's ideas, demonstrate their importance, and leave readers with a useful takeaway; it distinguishes synthesis from simple summary and cautions against first stating the thesis, adding ideas, or inserting body evidence. USC Libraries explains that a research conclusion should synthesize analysis-derived key points, show why the research matters, identify a contribution or future research need where appropriate, and avoid new information. Sacred Heart University likewise recommends concise synthesis, a clear larger significance, alignment with actual objectives, and no idle speculation. Follow the structure, section responsibilities, terminology, evidence conventions, and degree of recommendation required by your assignment, discipline, instructor, or journal.",
      authorityLinks: [
        { href: "https://writingcenter.unc.edu/tips-and-tools/conclusions/", label: "Read UNC Writing Center's conclusion guidance" },
        { href: "https://libguides.usc.edu/writingguide/conclusion", label: "Read USC Libraries' Conclusion guidance" },
        { href: "https://library.sacredheart.edu/c.php?g=29803&p=185935", label: "Read Sacred Heart University's Conclusion guidance" },
      ],
      evidenceDecision: {
        title: "Choose a Conclusion phrase only after you identify its final-paper responsibility",
        intro: "A phrase can help readers see the paper's established contribution and significance. It cannot turn a limited result into a universal fact, create a new evidence base, promote a recommendation the paper did not develop, or conceal a limitation that changes the reach of the conclusion.",
        cards: [
          { title: "Return to the question", text: "Use a return phrase after checking the final research question, purpose, and thesis against the completed body. Do not widen the population, time period, setting, text, or claim at the last moment." },
          { title: "Synthesize rather than list", text: "Use synthesis language when you can show how findings, sources, analysis, and reasoning converge. A conclusion should not become a sequence of earlier headings or a copy of the abstract." },
          { title: "Frame contribution and significance", text: "Use contribution or implication wording only for an insight supported by the paper's path of reasoning. State the setting and limits when they matter, and make recommendations conditional where evidence cannot establish impact." },
          { title: "Handle limits and next research", text: "Use a limitation or future-research phrase only when it follows from a reported constraint, unexpected finding, gap, or unresolved question. Keep the next step focused instead of simply saying “more research is needed.”" },
        ],
      },
      resources: [
        { href: "/conclusion-section-example-research-paper", title: "Conclusion section example", text: "Review conclusion functions and a clearly labelled fictional learning example before drafting the final synthesis." },
        { href: "/how-to-write-discussion-section", title: "Discussion writing guide", text: "Decide whether interpretation, implications, limitations, and future research belong in Discussion or Conclusion for your assignment." },
        { href: "/results-section-example-research-paper", title: "Results section example", text: "Check that all factual findings, statistics, themes, and exceptions were reported before they are synthesized at the end." },
        { href: "/research-question-examples", title: "Research question examples", text: "Return to the focused problem the paper set out to address instead of widening the scope at the end." },
        { href: "/academic-argument-evidence", title: "Academic argument and evidence", text: "Check that the final takeaway follows from claim, support, reasoning, counterarguments, and limits in the body." },
        { href: "/research-gap-examples", title: "Research gap examples", text: "Describe an unresolved limit or future direction cautiously without claiming that no research exists." },
        { href: "/literature-review-synthesis-matrix", title: "Literature review synthesis matrix", text: "Map agreements, differences, methods, and limitations before stating how the paper advances a scholarly conversation." },
        { href: "/methodology-section-example-research-paper", title: "Methodology section example", text: "Check how design, evidence generation, and analytic limits bound the final contribution and implication." },
        { href: "/academic-integrity-and-source-use", title: "Academic integrity and source use", text: "Keep completed findings, source claims, synthesis, citations, limitations, and recommendations accurately distinguishable." },
        { href: "/citations", title: "Citation check", text: "Verify that any source or evidence mentioned in the final synthesis was accurately integrated and cited where needed in the paper body." },
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
        { title: "1. Reopen the research question and commitment", text: "Identify the question, objective, hypothesis, or research problem the Methods section must make possible. Use a phrase only when the design and procedure can genuinely address that commitment." },
        { title: "2. State the design and its rationale", text: "Name the qualitative, quantitative, mixed, experimental, observational, archival, or other approach actually used, then explain why it fits the research problem when readers need that rationale." },
        { title: "3. Identify people, data, or materials", text: "Describe participants, datasets, documents, instruments, settings, selection criteria, inclusion or exclusion rules, and source origins only as they actually apply. Do not imply a representative sample that the selection process cannot support." },
        { title: "4. Describe what happened in usable order", text: "Walk readers through collection, preparation, instructions, conditions, and relevant controls in the sequence actions occurred. Include enough detail to understand this study's application, not a generic how-to manual." },
        { title: "5. Name the analysis and its purpose", text: "Specify the procedure used to examine a pattern, relationship, distribution, comparison, or theme. Report the method and its aim here; save numerical findings, participant accounts, and interpretation for their proper later sections." },
        { title: "6. Check quality, scope, and approvals", text: "Disclose relevant data limits, access restrictions, safeguards, exclusions, practical problems, or approvals only when accurate and required. Never use a phrase to invent a sample size, consent, ethics approval, measure, date, procedure, or analytic output." },
        { title: "7. Check the section boundary", text: "Confirm that methods language explains how evidence was generated or selected and analyzed. Move reported results to Results and causal explanation, comparison, implication, or recommendation to Discussion unless your assignment explicitly combines these functions." },
      ],
      fictionalTitle: "Fictional learning example: adapt a methods phrase to verified decisions and never fill in missing details",
      fictionalText: "This invented practice situation is not a completed study, dataset, approval record, or text to submit. A fictional writer checks an invented secondary-document project record before adapting a design phrase: the fictional project asks about a bounded document set, records why those invented documents were selected, lists an invented coding procedure in chronological order, and names the intended fictional analysis. The writer does not add a participant count, consent statement, institutional approval, collection date, instrument, or result merely because a sentence starter has a bracket. Any fictional limitation stays explicit, and interpretation is reserved for a later fictional Discussion section.",
      authorityText: "USC Libraries explains that Methods should show how data were collected or generated and analyzed, connecting the chosen approach to the research problem while keeping interpretation for Discussion. Sacred Heart University likewise emphasizes direct, precise explanation of selection, collection, analysis, and relevant limitations. Purdue OWL advises writers to walk readers through what happened, including relevant participants, materials, design, variables, and procedure. Follow the terminology, ethical requirements, tense, level of detail, and section order required by your discipline, instructor, journal, or project.",
      authorityLinks: [
        { href: "https://libguides.usc.edu/writingguide/methodology", label: "Read USC Libraries' Methodology guidance" },
        { href: "https://library.sacredheart.edu/c.php?g=29803&p=185928", label: "Read Sacred Heart University's Methodology guidance" },
        { href: "https://owl.purdue.edu/owl/subject_specific_writing/writing_in_the_social_sciences/writing_in_psychology_experimental_report_writing/experimental_reports_2.html", label: "Read Purdue OWL's Methods guidance" },
      ],
      evidenceDecision: {
        title: "Choose a Methods phrase only after you identify the reporting responsibility",
        intro: "A phrase should make an actual study decision easier for readers to trace. It cannot manufacture a procedure, turn an intention into an action, supply an approval record, or replace the level of methodological detail your course, discipline, or journal requires.",
        cards: [
          { title: "Explain a design choice", text: "Use a design-rationale phrase when you can name both the approach and how it addresses the question. Do not present a design label as a reason by itself, or call an approach mixed methods without describing the real components." },
          { title: "Describe data, participants, or materials", text: "Use a selection phrase only after checking the actual source, sample, setting, eligibility criteria, acquisition path, and relevant context. Identify secondary data or documents as such rather than implying you collected them yourself." },
          { title: "Describe a procedure or analysis", text: "Use past-tense action language for actions completed, and distinguish a proposed plan from a completed process. Name the analytic procedure and its purpose without reporting what the analysis found." },
          { title: "Report transparency information", text: "Use an ethics, consent, limitation, or access phrase only if it is true, relevant, and permitted to disclose. Record the real approval or consent process; never invent compliance language to make a project look more formal." },
        ],
      },
      resources: [
        { href: "/research-question-examples", title: "Research question examples", text: "Check whether the question is focused enough for a feasible evidence and design path." },
        { href: "/methodology-vs-methods-research-paper", title: "Methodology vs. methods", text: "Separate the rationale for an approach from the procedures that carried it out." },
        { href: "/methodology-section-example-research-paper", title: "Methodology section example", text: "Review transparent structure and a clearly labelled fictional learning example before drafting." },
        { href: "/results-section-example-research-paper", title: "Results section example", text: "Move findings, statistics, themes, and display narration out of the Methods section and into factual reporting." },
        { href: "/how-to-write-discussion-section", title: "Discussion writing guide", text: "Reserve interpretation, comparison, implication, and recommendations for the section where your assignment expects them." },
        { href: "/evaluate-academic-sources", title: "Academic source evaluation", text: "Check the provenance, fit, and limits of existing datasets, documents, instruments, and prior methods guidance." },
        { href: "/citations", title: "Citation check", text: "Verify attribution for instruments, adapted materials, datasets, protocols, quotations, and prior methodological work." },
        { href: "/academic-integrity-and-source-use", title: "Academic integrity and source use", text: "Keep research records, source descriptions, measures, approvals, and disclosures accurate and traceable." },
        { href: "/research-paper-sections", title: "Research paper sections", text: "Match the question, methods, results, discussion, and conclusion as one coherent evidence path." },
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
        { title: "1. Reopen the research question and result", text: "Identify the particular research question, hypothesis, or problem and the already reported finding or theme that this paragraph must address. Use a short bridge, not a second Results paragraph." },
        { title: "2. Name the interpretive task", text: "Decide whether the sentence explains an expected pattern, an unexpected finding, a relationship, an exception, an unresolved question, or a cautiously bounded implication. Do not use a strong conclusion phrase before identifying what the evidence can support." },
        { title: "3. Compare on a specific basis", text: "Bring in prior work only after naming the result or interpretation being compared. Explain whether the studies align, differ, or operate under different designs, settings, measures, populations, or conditions rather than using a citation as a substitute for comparison." },
        { title: "4. Test alternatives and disconfirming detail", text: "Consider a plausible competing explanation, unexpected result, exception, no clear relationship, or evidence that narrows the interpretation. Do not ignore material that fails to support the preferred claim." },
        { title: "5. Locate limits and scope", text: "State how sampling, data source, measurement, context, design, missing information, or practical constraints affect the reach of an interpretation. Be direct and self-critical without using an apologetic tone or inventing a limitation." },
        { title: "6. State a proportionate implication or next question", text: "Connect the interpretation to theory, practice, policy, or future research only within the population, evidence, design, uncertainty, and assignment purpose. Frame future research around a genuine remaining question or limit." },
        { title: "7. Check the section boundary", text: "Keep new statistics, data, quotations, and factual findings in Results; keep procedure details in Methods; and reserve final paper-level takeaway or recommendations for Conclusion when the assignment separates that function." },
      ],
      fictionalTitle: "Fictional learning example: build an evidence-led interpretive bridge without manufacturing support",
      fictionalText: "This fictional learning example is invented for practice; it is not a real finding, dataset, prior study, mechanism, limitation, or paragraph to submit. A fictional writer starts with one already reported fictional pattern, explains one possible meaning using cautious language, and compares it with an invented earlier study only on a stated shared condition. The writer then acknowledges an invented sampling limit and a fictional alternative explanation, narrows the implied scope, and proposes a specific fictional next question. The writer does not add a new statistic, hide an invented exception, turn a fictional association into causation, or present the possible mechanism as an established fact.",
      authorityText: "USC Libraries explains that Discussion interprets the significance of findings in relation to the research problem and prior work rather than repeating Results, and recommends considering alternatives, limits, unexpected findings, and proportionate implications. Sacred Heart University likewise directs writers to compare with prior studies, consider explanations beyond prior assumptions, identify limits and generalizability, and link future research to real unanswered questions. UC Irvine Libraries advises writers to explain relationships and exceptions, address shortcomings and alternative explanations, and make only the broadest claims the evidence supports. Follow the structure, terminology, source conventions, and section order required by your discipline, instructor, journal, or assignment.",
      authorityLinks: [
        { href: "https://libguides.usc.edu/writingguide/discussion", label: "Read USC Libraries' Discussion guidance" },
        { href: "https://library.sacredheart.edu/c.php?g=29803&p=185933", label: "Read Sacred Heart University's Discussion guidance" },
        { href: "https://guides.lib.uci.edu/scientificwriting/discussion", label: "Read UC Irvine Libraries' Discussion guidance" },
      ],
      evidenceDecision: {
        title: "Choose a Discussion phrase only after you identify the interpretive responsibility",
        intro: "A phrase can help readers follow an evidence-led interpretive move. It cannot turn an association into a causal finding, make a different study directly comparable, erase an exception, supply a new result, or extend an implication beyond the design and evidence.",
        cards: [
          { title: "Bridge from Results", text: "Use a brief reminder of the relevant reported finding, then move immediately to its possible meaning. Do not copy a table, list new statistics, or repeat the full sequence of factual reporting." },
          { title: "Compare with previous work", text: "Use alignment or contrast language only after checking the exact outcome, context, design, measure, population, and inference in each source. Explain the relationship instead of treating author names as the comparison." },
          { title: "Address alternatives and limits", text: "Use one specific limitation or alternative explanation that genuinely affects reach, validity, or interpretation. Acknowledge a conflicting or null pattern when it matters; do not invent uncertainty just to sound cautious." },
          { title: "State meaning and future research", text: "Use implication or future-research language only when it follows from the result and its limits. Keep recommendations conditional where evidence is limited, and make the next question more focused than “more research is needed.”" },
        ],
      },
      resources: [
        { href: "/how-to-write-discussion-section", title: "Discussion writing guide", text: "Follow a full findings-to-interpretation workflow with comparison, alternatives, limitations, implications, and source responsibility." },
        { href: "/results-section-example-research-paper", title: "Results section example", text: "Keep factual reporting, statistics, themes, and figure or table narration distinct from the analysis of meaning." },
        { href: "/methodology-section-example-research-paper", title: "Methodology section example", text: "Check how design, sample, materials, procedure, and analysis set the boundaries of a later interpretation." },
        { href: "/hedging-language-academic-writing", title: "Hedging language", text: "Calibrate explanation, comparison, implication, and recommendation to the strength and limits of evidence." },
        { href: "/academic-argument-evidence", title: "Academic argument and evidence", text: "Connect findings, claims, reasons, counterarguments, and limitations in an argument readers can assess." },
        { href: "/conclusion-section-example-research-paper", title: "Conclusion section example", text: "Move the paper-level takeaway to its proper final section when your assignment separates Discussion and Conclusion." },
        { href: "/research-question-examples", title: "Research question examples", text: "Return to the focused problem the study set out to investigate before widening an implication or proposing a next question." },
        { href: "/literature-review-synthesis-matrix", title: "Literature review synthesis matrix", text: "Compare methods, findings, agreements, differences, and limits across sources before claiming a pattern in prior work." },
        { href: "/academic-integrity-and-source-use", title: "Academic integrity and source use", text: "Keep your findings, source claims, interpretations, limitations, and citations accurately distinguished and traceable." },
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
