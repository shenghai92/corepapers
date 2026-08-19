import { existsSync, readFileSync, readdirSync } from "node:fs";
import { relative, resolve } from "node:path";

const ROOT = resolve(process.cwd());
const DIST = resolve(ROOT, "dist/public");
const BASE_URL = "https://corepapers.space";
const errors = [];
const checks = [];

function read(path) {
  const file = resolve(DIST, path);
  if (!existsSync(file)) {
    errors.push(`Missing generated file: ${path}`);
    return "";
  }
  return readFileSync(file, "utf8");
}

function expect(condition, message) {
  if (!condition) errors.push(message);
  else checks.push(message);
}

function checkPage(route, expectedH1) {
  const relative =
    route === "/"
      ? "index.html"
      : `${route.replace(/^\//, "").replace(/\/$/, "")}/index.html`;
  const html = read(relative);
  if (!html) return;
  const canonical = route === "/" ? `${BASE_URL}/` : `${BASE_URL}${route}`;
  expect(
    html.includes('data-static-seo-fallback="true"'),
    `${route}: crawler-visible static root`
  );
  expect(
    html.includes(`<link rel="canonical" href="${canonical}" />`),
    `${route}: expected canonical`
  );
  expect(
    (html.match(/<link rel="canonical"/g) ?? []).length === 1,
    `${route}: exactly one canonical`
  );
  expect(
    /<meta name="description" content="[^"].*" \/>/.test(html),
    `${route}: non-empty description`
  );
  expect(
    html.includes(`<h1>${expectedH1}</h1>`),
    `${route}: expected H1 in raw HTML`
  );
}

const homeHtml = read("index.html");
expect(homeHtml.includes('/ieee-citation-examples/'), "home: IEEE citation examples resource link");
expect(homeHtml.includes('/chicago-citation-examples/'), "home: Chicago citation examples resource link");

const citationGeneratorHtml = read("citations/index.html");
expect(citationGeneratorHtml.includes("Chicago 18"), "citation generator: current Chicago 18 label");
expect(!citationGeneratorHtml.includes("Chicago 17"), "citation generator: no stale Chicago 17 label");
expect(citationGeneratorHtml.includes('/ieee-citation-examples/'), "citation generator: IEEE examples return link");
expect(citationGeneratorHtml.includes('/chicago-citation-examples/'), "citation generator: Chicago examples return link");
expect(citationGeneratorHtml.includes("1. Confirm the rule"), "citation generator: six-step source-record workflow");
expect(citationGeneratorHtml.includes("Fictional learning format patterns"), "citation generator: fictional-format disclosure");
expect(citationGeneratorHtml.includes("Use the output as a reviewable draft"), "citation generator: generator-responsibility boundary");
expect(citationGeneratorHtml.includes("owl.purdue.edu/owl/research_and_citation/using_citation_machines_responsibly.html"), "citation generator: Purdue citation-machine guidance link");
expect(citationGeneratorHtml.includes("purdueglobalwriting.center"), "citation generator: Purdue Global integrity guidance link");
expect(citationGeneratorHtml.includes('/mla-citation-examples/'), "citation generator: MLA examples return link");
expect(citationGeneratorHtml.includes('/apa-7-non-english-sources/'), "citation generator: multilingual APA return link");
expect(citationGeneratorHtml.includes('/evaluate-academic-sources/'), "citation generator: source-evaluation return link");
expect(citationGeneratorHtml.includes('/academic-integrity-and-source-use/'), "citation generator: source-use return link");
expect(citationGeneratorHtml.includes('/how-to-paraphrase-without-plagiarizing/'), "citation generator: paraphrasing return link");

const conclusionPhrasesHtml = read("phrases/conclusion/index.html");
expect(conclusionPhrasesHtml.includes("Academic phrases for research paper conclusions"), "conclusion phrases: expected H1");
expect(conclusionPhrasesHtml.includes("Leave readers with an evidence-led takeaway"), "conclusion phrases: evidence-led-takeaway workflow");
expect(conclusionPhrasesHtml.includes("Check the conclusion responsibility"), "conclusion phrases: conclusion-responsibility workflow step");
expect(conclusionPhrasesHtml.includes("Return to the completed question or claim"), "conclusion phrases: completed-question workflow step");
expect(conclusionPhrasesHtml.includes("Synthesize the established argument path"), "conclusion phrases: synthesis workflow step");
expect(conclusionPhrasesHtml.includes("State a contribution within its reach"), "conclusion phrases: contribution-scope workflow step");
expect(conclusionPhrasesHtml.includes("Locate limits, negative detail, and remaining questions"), "conclusion phrases: limits-future-research workflow step");
expect(conclusionPhrasesHtml.includes("Answer the so-what question proportionately"), "conclusion phrases: implication workflow step");
expect(conclusionPhrasesHtml.includes("Remove new material and empty closing language"), "conclusion phrases: new-material boundary");
expect(conclusionPhrasesHtml.includes("Fictional learning example: synthesize a completed argument without adding a new paper at the end"), "conclusion phrases: fictional-learning disclosure");
expect(conclusionPhrasesHtml.includes("This fictional learning example is invented for practice"), "conclusion phrases: fictional-example boundary");
expect(conclusionPhrasesHtml.includes("Choose a Conclusion phrase only after you identify its final-paper responsibility"), "conclusion phrases: final-paper-responsibility decision guide");
expect(conclusionPhrasesHtml.includes("Return to the question"), "conclusion phrases: question-return decision card");
expect(conclusionPhrasesHtml.includes("Synthesize rather than list"), "conclusion phrases: synthesis decision card");
expect(conclusionPhrasesHtml.includes("Frame contribution and significance"), "conclusion phrases: contribution decision card");
expect(conclusionPhrasesHtml.includes("Handle limits and next research"), "conclusion phrases: limits-research decision card");
expect(conclusionPhrasesHtml.includes("writingcenter.unc.edu/tips-and-tools/conclusions"), "conclusion phrases: UNC conclusion guidance link");
expect(conclusionPhrasesHtml.includes("libguides.usc.edu/writingguide/conclusion"), "conclusion phrases: USC conclusion guidance link");
expect(conclusionPhrasesHtml.includes("library.sacredheart.edu/c.php?g=29803"), "conclusion phrases: Sacred Heart conclusion guidance link");
expect(conclusionPhrasesHtml.includes('/conclusion-section-example-research-paper/'), "conclusion phrases: conclusion-example link");
expect(conclusionPhrasesHtml.includes('/how-to-write-discussion-section/'), "conclusion phrases: discussion-guide link");
expect(conclusionPhrasesHtml.includes('/results-section-example-research-paper/'), "conclusion phrases: results-example link");
expect(conclusionPhrasesHtml.includes('/research-question-examples/'), "conclusion phrases: research-question link");
expect(conclusionPhrasesHtml.includes('/academic-argument-evidence/'), "conclusion phrases: argument-evidence link");
expect(conclusionPhrasesHtml.includes('/research-gap-examples/'), "conclusion phrases: research-gap link");
expect(conclusionPhrasesHtml.includes('/literature-review-synthesis-matrix/'), "conclusion phrases: synthesis-matrix link");
expect(conclusionPhrasesHtml.includes('/methodology-section-example-research-paper/'), "conclusion phrases: methodology-example link");
expect(conclusionPhrasesHtml.includes('/academic-integrity-and-source-use/'), "conclusion phrases: source-use link");
expect(conclusionPhrasesHtml.includes('/citations/'), "conclusion phrases: citations link");

const literatureReviewPhrasesHtml = read("phrases/literature-review/index.html");
expect(literatureReviewPhrasesHtml.includes("Academic phrases for literature reviews and source synthesis"), "literature review phrases: expected H1");
expect(literatureReviewPhrasesHtml.includes("Turn source notes into a cross-source claim"), "literature review phrases: cross-source workflow");
expect(literatureReviewPhrasesHtml.includes("Confirm the review task and scope"), "literature review phrases: task-scope workflow step");
expect(literatureReviewPhrasesHtml.includes("Build a source relationship card"), "literature review phrases: source-card workflow step");
expect(literatureReviewPhrasesHtml.includes("Choose an organizing lens"), "literature review phrases: organizing-lens workflow step");
expect(literatureReviewPhrasesHtml.includes("Compare a specific basis"), "literature review phrases: comparison-basis workflow step");
expect(literatureReviewPhrasesHtml.includes("Write a cross-source theme claim"), "literature review phrases: theme-claim workflow step");
expect(literatureReviewPhrasesHtml.includes("Preserve disagreement, exceptions, and limits"), "literature review phrases: disagreement workflow step");
expect(literatureReviewPhrasesHtml.includes("State a bounded research limitation or next question"), "literature review phrases: bounded-next-question workflow step");
expect(literatureReviewPhrasesHtml.includes("Verify attribution and review boundaries"), "literature review phrases: attribution workflow step");
expect(literatureReviewPhrasesHtml.includes("Fictional learning example: build a cross-source claim without inventing consensus, conflict, or a research gap"), "literature review phrases: fictional-learning disclosure");
expect(literatureReviewPhrasesHtml.includes("This fictional learning example is invented for practice"), "literature review phrases: fictional-example boundary");
expect(literatureReviewPhrasesHtml.includes("Choose a Literature Review phrase only after you identify the source relationship"), "literature review phrases: source-relationship decision guide");
expect(literatureReviewPhrasesHtml.includes("Organize a thematic synthesis"), "literature review phrases: thematic-synthesis decision card");
expect(literatureReviewPhrasesHtml.includes("Compare with a stated basis"), "literature review phrases: comparison decision card");
expect(literatureReviewPhrasesHtml.includes("Keep disagreement and evidence scope visible"), "literature review phrases: disagreement decision card");
expect(literatureReviewPhrasesHtml.includes("Frame a careful research limitation"), "literature review phrases: limitation decision card");
expect(literatureReviewPhrasesHtml.includes("writingcenter.unc.edu/tips-and-tools/literature-reviews"), "literature review phrases: UNC literature-review guidance link");
expect(literatureReviewPhrasesHtml.includes("researchguides.uoregon.edu/litreview/synthesize"), "literature review phrases: Oregon synthesis guidance link");
expect(literatureReviewPhrasesHtml.includes("guides.library.jhu.edu/lit-review/synthesize"), "literature review phrases: Johns Hopkins synthesis guidance link");
expect(literatureReviewPhrasesHtml.includes('/literature-review-example/'), "literature review phrases: literature-review-example link");
expect(literatureReviewPhrasesHtml.includes('/literature-review-synthesis-matrix/'), "literature review phrases: synthesis-matrix link");
expect(literatureReviewPhrasesHtml.includes('/research-question-examples/'), "literature review phrases: research-question link");
expect(literatureReviewPhrasesHtml.includes('/research-gap-examples/'), "literature review phrases: research-gap link");
expect(literatureReviewPhrasesHtml.includes('/introduction-section-example-research-paper/'), "literature review phrases: introduction-example link");
expect(literatureReviewPhrasesHtml.includes('/academic-argument-evidence/'), "literature review phrases: argument-evidence link");
expect(literatureReviewPhrasesHtml.includes('/academic-paragraph-structure/'), "literature review phrases: paragraph-structure link");
expect(literatureReviewPhrasesHtml.includes('/evaluate-academic-sources/'), "literature review phrases: source-evaluation link");
expect(literatureReviewPhrasesHtml.includes('/academic-integrity-and-source-use/'), "literature review phrases: source-use link");
expect(literatureReviewPhrasesHtml.includes('/citations/'), "literature review phrases: citations link");

const introductionPhrasesHtml = read("phrases/introduction/index.html");
expect(introductionPhrasesHtml.includes("Academic phrases for research paper introductions"), "introduction phrases: expected H1");
expect(introductionPhrasesHtml.includes("Guide readers from a bounded context to a research question"), "introduction phrases: context-question workflow");
expect(introductionPhrasesHtml.includes("Identify task, reader, and paper type"), "introduction phrases: task-reader workflow step");
expect(introductionPhrasesHtml.includes("Choose the shortest usable context"), "introduction phrases: context-selection workflow step");
expect(introductionPhrasesHtml.includes("Establish what is known with a source job"), "introduction phrases: known-source workflow step");
expect(introductionPhrasesHtml.includes("Turn a literature relationship into a bounded problem"), "introduction phrases: bounded-problem workflow step");
expect(introductionPhrasesHtml.includes("State purpose, question, and scope"), "introduction phrases: purpose-scope workflow step");
expect(introductionPhrasesHtml.includes("Make a conditional roadmap"), "introduction phrases: roadmap workflow step");
expect(introductionPhrasesHtml.includes("Reconcile the opening with the finished paper"), "introduction phrases: final-scope workflow step");
expect(introductionPhrasesHtml.includes("Fictional learning example: build a focused entry point without inventing a trend, gap, or study"), "introduction phrases: fictional-learning disclosure");
expect(introductionPhrasesHtml.includes("This fictional learning example is invented for practice"), "introduction phrases: fictional-example boundary");
expect(introductionPhrasesHtml.includes("Choose an Introduction phrase only after you identify the research responsibility"), "introduction phrases: research-responsibility decision guide");
expect(introductionPhrasesHtml.includes("Establish context responsibly"), "introduction phrases: context decision card");
expect(introductionPhrasesHtml.includes("Describe what is known and limited"), "introduction phrases: known-gap decision card");
expect(introductionPhrasesHtml.includes("State purpose and scope"), "introduction phrases: purpose decision card");
expect(introductionPhrasesHtml.includes("Forecast and verify the paper"), "introduction phrases: roadmap decision card");
expect(introductionPhrasesHtml.includes("libguides.usc.edu/writingguide/introduction"), "introduction phrases: USC Introduction guidance link");
expect(introductionPhrasesHtml.includes("library.sacredheart.edu/c.php?g=29803"), "introduction phrases: Sacred Heart Introduction guidance link");
expect(introductionPhrasesHtml.includes("utep.edu/uwc/writing%20help%20online/researchpaper-intro"), "introduction phrases: UTEP Introduction guidance link");
expect(introductionPhrasesHtml.includes('/research-question-examples/'), "introduction phrases: research-question link");
expect(introductionPhrasesHtml.includes('/research-gap-examples/'), "introduction phrases: research-gap link");
expect(introductionPhrasesHtml.includes('/literature-review-example/'), "introduction phrases: literature-review link");
expect(introductionPhrasesHtml.includes('/literature-review-synthesis-matrix/'), "introduction phrases: synthesis-matrix link");
expect(introductionPhrasesHtml.includes('/methodology-section-example-research-paper/'), "introduction phrases: methodology-example link");
expect(introductionPhrasesHtml.includes('/introduction-section-example-research-paper/'), "introduction phrases: introduction-example link");
expect(introductionPhrasesHtml.includes('/research-paper-sections/'), "introduction phrases: research-sections link");
expect(introductionPhrasesHtml.includes('/academic-argument-evidence/'), "introduction phrases: argument-evidence link");
expect(introductionPhrasesHtml.includes('/academic-integrity-and-source-use/'), "introduction phrases: source-use link");
expect(introductionPhrasesHtml.includes('/citations/'), "introduction phrases: citations link");

const discussionPhrasesHtml = read("phrases/discussion/index.html");
expect(discussionPhrasesHtml.includes("Academic phrases for discussion sections"), "discussion phrases: expected H1");
expect(discussionPhrasesHtml.includes("Interpret a finding without writing a second Results section"), "discussion phrases: interpretation workflow");
expect(discussionPhrasesHtml.includes("Reopen the research question and result"), "discussion phrases: research-question-result workflow step");
expect(discussionPhrasesHtml.includes("Name the interpretive task"), "discussion phrases: interpretive-task workflow step");
expect(discussionPhrasesHtml.includes("Compare on a specific basis"), "discussion phrases: comparison-basis workflow step");
expect(discussionPhrasesHtml.includes("Test alternatives and disconfirming detail"), "discussion phrases: alternatives workflow step");
expect(discussionPhrasesHtml.includes("Locate limits and scope"), "discussion phrases: limits-scope workflow step");
expect(discussionPhrasesHtml.includes("State a proportionate implication or next question"), "discussion phrases: bounded-implication workflow step");
expect(discussionPhrasesHtml.includes("Check the section boundary"), "discussion phrases: section-boundary workflow step");
expect(discussionPhrasesHtml.includes("Fictional learning example: build an evidence-led interpretive bridge without manufacturing support"), "discussion phrases: fictional-learning disclosure");
expect(discussionPhrasesHtml.includes("This fictional learning example is invented for practice"), "discussion phrases: fictional-example boundary");
expect(discussionPhrasesHtml.includes("Choose a Discussion phrase only after you identify the interpretive responsibility"), "discussion phrases: interpretation-responsibility decision guide");
expect(discussionPhrasesHtml.includes("Bridge from Results"), "discussion phrases: results-bridge decision card");
expect(discussionPhrasesHtml.includes("Compare with previous work"), "discussion phrases: literature-comparison decision card");
expect(discussionPhrasesHtml.includes("Address alternatives and limits"), "discussion phrases: alternatives-limits decision card");
expect(discussionPhrasesHtml.includes("State meaning and future research"), "discussion phrases: implication decision card");
expect(discussionPhrasesHtml.includes("libguides.usc.edu/writingguide/discussion"), "discussion phrases: USC Discussion guidance link");
expect(discussionPhrasesHtml.includes("library.sacredheart.edu/c.php?g=29803"), "discussion phrases: Sacred Heart Discussion guidance link");
expect(discussionPhrasesHtml.includes("guides.lib.uci.edu/scientificwriting/discussion"), "discussion phrases: UC Irvine Discussion guidance link");
expect(discussionPhrasesHtml.includes('/how-to-write-discussion-section/'), "discussion phrases: discussion-guide link");
expect(discussionPhrasesHtml.includes('/results-section-example-research-paper/'), "discussion phrases: results-example link");
expect(discussionPhrasesHtml.includes('/methodology-section-example-research-paper/'), "discussion phrases: methodology-example link");
expect(discussionPhrasesHtml.includes('/hedging-language-academic-writing/'), "discussion phrases: hedging link");
expect(discussionPhrasesHtml.includes('/academic-argument-evidence/'), "discussion phrases: argument-evidence link");
expect(discussionPhrasesHtml.includes('/conclusion-section-example-research-paper/'), "discussion phrases: conclusion-example link");
expect(discussionPhrasesHtml.includes('/research-question-examples/'), "discussion phrases: research-question link");
expect(discussionPhrasesHtml.includes('/literature-review-synthesis-matrix/'), "discussion phrases: synthesis link");
expect(discussionPhrasesHtml.includes('/academic-integrity-and-source-use/'), "discussion phrases: source-use link");

const methodsPhrasesHtml = read("phrases/methods/index.html");
expect(methodsPhrasesHtml.includes("Academic phrases for research methods sections"), "methods phrases: expected H1");
expect(methodsPhrasesHtml.includes("Move from a method label to a traceable study account"), "methods phrases: traceable-method workflow");
expect(methodsPhrasesHtml.includes("Reopen the research question and commitment"), "methods phrases: question-commitment workflow step");
expect(methodsPhrasesHtml.includes("State the design and rationale"), "methods phrases: design-rationale workflow step");
expect(methodsPhrasesHtml.includes("Describe what happened in usable order"), "methods phrases: procedure-order workflow step");
expect(methodsPhrasesHtml.includes("Name the analysis and its purpose"), "methods phrases: analysis-boundary workflow step");
expect(methodsPhrasesHtml.includes("Check quality, scope, and approvals"), "methods phrases: transparency workflow step");
expect(methodsPhrasesHtml.includes("Check the section boundary"), "methods phrases: methods-results-discussion workflow step");
expect(methodsPhrasesHtml.includes("Fictional learning example: adapt a methods phrase to verified decisions and never fill in missing details"), "methods phrases: fictional-learning disclosure");
expect(methodsPhrasesHtml.includes("Choose a Methods phrase only after you identify the reporting responsibility"), "methods phrases: reporting-responsibility decision guide");
expect(methodsPhrasesHtml.includes("Explain a design choice"), "methods phrases: design choice decision card");
expect(methodsPhrasesHtml.includes("Describe data, participants, or materials"), "methods phrases: materials decision card");
expect(methodsPhrasesHtml.includes("Describe a procedure or analysis"), "methods phrases: procedure-analysis decision card");
expect(methodsPhrasesHtml.includes("Report transparency information"), "methods phrases: transparency decision card");
expect(methodsPhrasesHtml.includes("libguides.usc.edu/writingguide/methodology"), "methods phrases: USC Methodology guidance link");
expect(methodsPhrasesHtml.includes("library.sacredheart.edu/c.php?g=29803"), "methods phrases: Sacred Heart Methodology guidance link");
expect(methodsPhrasesHtml.includes("owl.purdue.edu/owl/subject_specific_writing/writing_in_the_social_sciences/writing_in_psychology_experimental_report_writing/experimental_reports_2.html"), "methods phrases: Purdue Methods guidance link");
expect(methodsPhrasesHtml.includes('/research-question-examples/'), "methods phrases: research-question link");
expect(methodsPhrasesHtml.includes('/methodology-vs-methods-research-paper/'), "methods phrases: methodology-vs-methods link");
expect(methodsPhrasesHtml.includes('/methodology-section-example-research-paper/'), "methods phrases: methodology-example link");
expect(methodsPhrasesHtml.includes('/results-section-example-research-paper/'), "methods phrases: results-example link");
expect(methodsPhrasesHtml.includes('/how-to-write-discussion-section/'), "methods phrases: discussion guide link");
expect(methodsPhrasesHtml.includes('/evaluate-academic-sources/'), "methods phrases: source-evaluation link");
expect(methodsPhrasesHtml.includes('/citations/'), "methods phrases: citations link");
expect(methodsPhrasesHtml.includes('/research-paper-sections/'), "methods phrases: research-sections link");
expect(methodsPhrasesHtml.includes('/academic-integrity-and-source-use/'), "methods phrases: source-use link");

const resultsPhrasesHtml = read("phrases/results/index.html");
expect(resultsPhrasesHtml.includes("Academic phrases for reporting research results"), "results phrases: expected H1");
expect(resultsPhrasesHtml.includes("Report the finding before explaining what it means"), "results phrases: reporting-interpretation workflow");
expect(resultsPhrasesHtml.includes("Reopen the question"), "results phrases: question-led workflow step");
expect(resultsPhrasesHtml.includes("Identify the reportable observation"), "results phrases: reportable-observation workflow step");
expect(resultsPhrasesHtml.includes("Point readers to the evidence"), "results phrases: evidence-anchor workflow step");
expect(resultsPhrasesHtml.includes("Check statistical or thematic precision"), "results phrases: statistical-theme precision workflow step");
expect(resultsPhrasesHtml.includes("Preserve the Results boundary"), "results phrases: results-discussion boundary workflow step");
expect(resultsPhrasesHtml.includes("Fictional learning example: separate reporting from interpretation and never fill in a statistic"), "results phrases: fictional-statistics boundary disclosure");
expect(resultsPhrasesHtml.includes("Choose a Results phrase only after you identify the evidence job"), "results phrases: evidence-to-language decision guide");
expect(resultsPhrasesHtml.includes("Guide a reader to a table or figure"), "results phrases: table-figure decision card");
expect(resultsPhrasesHtml.includes("Report a quantitative pattern"), "results phrases: quantitative-report decision card");
expect(resultsPhrasesHtml.includes("Report a qualitative theme"), "results phrases: qualitative-theme decision card");
expect(resultsPhrasesHtml.includes("Report a null, mixed, or unexpected result"), "results phrases: null-mixed decision card");
expect(resultsPhrasesHtml.includes("libguides.usc.edu/writingguide/results"), "results phrases: USC Results guidance link");
expect(resultsPhrasesHtml.includes("owl.purdue.edu/owl/research_and_citation/apa_style/apa_formatting_and_style_guide/apa_tables_and_figures.html"), "results phrases: Purdue tables-figures guidance link");
expect(resultsPhrasesHtml.includes("apastyle.apa.org/style-grammar-guidelines/tables-figures"), "results phrases: APA tables-figures guidance link");
expect(resultsPhrasesHtml.includes("about.illinoisstate.edu/jhkahn/apastats"), "results phrases: Illinois State statistics guidance link");
expect(resultsPhrasesHtml.includes('/results-section-example-research-paper/'), "results phrases: results-example link");
expect(resultsPhrasesHtml.includes('/how-to-write-discussion-section/'), "results phrases: discussion-guide link");
expect(resultsPhrasesHtml.includes('/methodology-section-example-research-paper/'), "results phrases: methodology-path link");
expect(resultsPhrasesHtml.includes('/hedging-language-academic-writing/'), "results phrases: hedging link");
expect(resultsPhrasesHtml.includes('/academic-argument-evidence/'), "results phrases: argument-evidence link");
expect(resultsPhrasesHtml.includes('/citations/'), "results phrases: citations link");
expect(resultsPhrasesHtml.includes('/academic-integrity-and-source-use/'), "results phrases: source-use link");

const apaCitationLandingHtml = read("apa-citation-generator-for-international-students/index.html");
expect(
  apaCitationLandingHtml.includes("APA 7 citation generator for international students"),
  "APA citation landing: expected H1"
);
expect(apaCitationLandingHtml.includes("Generate a formatting draft, then verify it"), "APA citation landing: generator-responsibility boundary");
expect(apaCitationLandingHtml.includes("1. Identify the source type"), "APA citation landing: six-step workflow");
expect(apaCitationLandingHtml.includes("2. Record original details"), "APA citation landing: source-field preparation");
expect(apaCitationLandingHtml.includes("4. Match text and reference"), "APA citation landing: in-text-reference matching");
expect(apaCitationLandingHtml.includes("6. Check source-use responsibility"), "APA citation landing: source-use accountability");
expect(apaCitationLandingHtml.includes("apastyle.apa.org/style-grammar-guidelines/citations/basic-principles/author-date"), "APA citation landing: official APA author-date guidance link");
expect(apaCitationLandingHtml.includes('/citations/'), "APA citation landing: citation-generator link");
expect(apaCitationLandingHtml.includes('/citation-examples/'), "APA citation landing: citation-examples link");
expect(apaCitationLandingHtml.includes('/blog/complete-apa-7th-edition-guide-international-students/'), "APA citation landing: APA guide link");
expect(apaCitationLandingHtml.includes('/apa-7-non-english-sources/'), "APA citation landing: non-English APA guide link");
expect(apaCitationLandingHtml.includes('/academic-integrity-and-source-use/'), "APA citation landing: source-use link");
expect(apaCitationLandingHtml.includes('/evaluate-academic-sources/'), "APA citation landing: source-evaluation link");
expect(apaCitationLandingHtml.includes('/polish/'), "APA citation landing: essay-polish link");

const paraphrasingSupportLandingHtml = read("paraphrasing-alternative-for-academic-writing/index.html");
expect(
  paraphrasingSupportLandingHtml.includes("Academic paraphrasing support for source-based writing"),
  "paraphrasing support landing: expected H1"
);
expect(paraphrasingSupportLandingHtml.includes("Choose the source move before revising language"), "paraphrasing support landing: source-move framework");
expect(paraphrasingSupportLandingHtml.includes("Quote: use exact wording when it matters"), "paraphrasing support landing: quotation decision");
expect(paraphrasingSupportLandingHtml.includes("Paraphrase: rebuild a needed idea"), "paraphrasing support landing: paraphrase decision");
expect(paraphrasingSupportLandingHtml.includes("Summarize: condense a broad pattern"), "paraphrasing support landing: summary decision");
expect(paraphrasingSupportLandingHtml.includes("Analyze: explain your own point"), "paraphrasing support landing: analysis decision");
expect(paraphrasingSupportLandingHtml.includes("Fictional learning decision"), "paraphrasing support landing: fictional-decision disclosure");
expect(paraphrasingSupportLandingHtml.includes("owl.purdue.edu/owl/research_and_citation/using_research/quoting_paraphrasing_and_summarizing/paraphrasing.html"), "paraphrasing support landing: Purdue paraphrasing guidance link");
expect(paraphrasingSupportLandingHtml.includes("writing.wisc.edu/handbook/quotingsources"), "paraphrasing support landing: Wisconsin source-use guidance link");
expect(paraphrasingSupportLandingHtml.includes('/how-to-paraphrase-without-plagiarizing/'), "paraphrasing support landing: detailed-guide link");
expect(paraphrasingSupportLandingHtml.includes('/academic-paraphrasing-tool-for-esl-students/'), "paraphrasing support landing: paraphrasing-tool link");
expect(paraphrasingSupportLandingHtml.includes('/academic-integrity-and-source-use/'), "paraphrasing support landing: source-use link");
expect(paraphrasingSupportLandingHtml.includes('/evaluate-academic-sources/'), "paraphrasing support landing: source-evaluation link");
expect(paraphrasingSupportLandingHtml.includes('/academic-argument-evidence/'), "paraphrasing support landing: argument-evidence link");
expect(paraphrasingSupportLandingHtml.includes('/citations/'), "paraphrasing support landing: citation-generator link");
expect(paraphrasingSupportLandingHtml.includes('/polish/'), "paraphrasing support landing: essay-polish link");

const essayPolisherLandingHtml = read("ai-essay-polisher-for-non-native-english-writers/index.html");
expect(
  essayPolisherLandingHtml.includes("AI essay polisher for non-native English writers"),
  "essay polisher landing: expected H1"
);
expect(essayPolisherLandingHtml.includes("Prepare, polish, and check a paragraph responsibly"), "essay polisher landing: review workflow");
expect(essayPolisherLandingHtml.includes("Before: confirm the task"), "essay polisher landing: task-policy preparation");
expect(essayPolisherLandingHtml.includes("Before: protect the draft"), "essay polisher landing: draft-privacy boundary");
expect(essayPolisherLandingHtml.includes("During: review each change"), "essay polisher landing: suggestion-review step");
expect(essayPolisherLandingHtml.includes("After: verify source-based content"), "essay polisher landing: source-verification step");
expect(essayPolisherLandingHtml.includes("owl.purdue.edu/owl/general_writing/the_writing_process/proofreading/steps_for_revising.html"), "essay polisher landing: Purdue revision guidance link");
expect(essayPolisherLandingHtml.includes("writingcenter.unc.edu/tips-and-tools/generative-ai-in-academic-writing"), "essay polisher landing: UNC AI-policy guidance link");
expect(essayPolisherLandingHtml.includes('/academic-paragraph-structure/'), "essay polisher landing: paragraph-structure link");
expect(essayPolisherLandingHtml.includes('/academic-argument-evidence/'), "essay polisher landing: argument-evidence link");
expect(essayPolisherLandingHtml.includes('/academic-english-for-esl-students/'), "essay polisher landing: Academic English hub link");
expect(essayPolisherLandingHtml.includes('/hedging-language-academic-writing/'), "essay polisher landing: hedging link");
expect(essayPolisherLandingHtml.includes('/academic-writing-for-graduate-students/'), "essay polisher landing: graduate-writing link");
expect(essayPolisherLandingHtml.includes('/academic-paraphrasing-tool-for-esl-students/'), "essay polisher landing: paraphrasing link");
expect(essayPolisherLandingHtml.includes('/academic-integrity-and-source-use/'), "essay polisher landing: source-use link");
expect(essayPolisherLandingHtml.includes('/citations/'), "essay polisher landing: citation-generator link");
expect(essayPolisherLandingHtml.includes('/phrases/'), "essay polisher landing: phrase-library link");
expect(essayPolisherLandingHtml.includes('/polish/'), "essay polisher landing: revision-tool link");

const academicWritingSupportHtml = read("academic-writing-alternative-for-international-students/index.html");
expect(
  academicWritingSupportHtml.includes("Academic writing support for international students"),
  "academic writing support: expected H1"
);
expect(academicWritingSupportHtml.includes("1. Interpret the task"), "academic writing support: six-step workflow");
expect(academicWritingSupportHtml.includes("Keep the writer in control"), "academic writing support: support-responsibility boundary");
expect(academicWritingSupportHtml.includes("drexel.edu/coas/academics/university-writing-program/multilingual-writers"), "academic writing support: Drexel multilingual guidance link");
expect(academicWritingSupportHtml.includes("owl.purdue.edu/owl/multilingual/multilingual_students"), "academic writing support: Purdue multilingual guidance link");
expect(academicWritingSupportHtml.includes("owl.purdue.edu/owl/general_writing/the_writing_process/proofreading/steps_for_revising.html"), "academic writing support: Purdue revision guidance link");
expect(academicWritingSupportHtml.includes('/academic-english-for-esl-students/'), "academic writing support: Academic English hub link");
expect(academicWritingSupportHtml.includes('/research-paper-sections/'), "academic writing support: paper-sections link");
expect(academicWritingSupportHtml.includes('/academic-paragraph-structure/'), "academic writing support: paragraph-structure link");
expect(academicWritingSupportHtml.includes('/academic-argument-evidence/'), "academic writing support: argument-evidence link");
expect(academicWritingSupportHtml.includes('/polish/'), "academic writing support: essay-polish link");
expect(academicWritingSupportHtml.includes('/phrases/'), "academic writing support: phrase-library link");
expect(academicWritingSupportHtml.includes('/academic-paraphrasing-tool-for-esl-students/'), "academic writing support: paraphrasing-tool link");
expect(academicWritingSupportHtml.includes('/evaluate-academic-sources/'), "academic writing support: source-evaluation link");
expect(academicWritingSupportHtml.includes('/academic-integrity-and-source-use/'), "academic writing support: source-use link");
expect(academicWritingSupportHtml.includes('/citations/'), "academic writing support: citation-generator link");

const academicParaphrasingToolHtml = read("academic-paraphrasing-tool-for-esl-students/index.html");
expect(
  academicParaphrasingToolHtml.includes("Academic paraphrasing tool for ESL students"),
  "academic paraphrasing tool: expected H1"
);
expect(academicParaphrasingToolHtml.includes("An eight-step academic paraphrasing workflow"), "academic paraphrasing tool: eight-step workflow");
expect(academicParaphrasingToolHtml.includes("Keep source and version details"), "academic paraphrasing tool: source-record workflow step");
expect(academicParaphrasingToolHtml.includes("Read for full idea"), "academic paraphrasing tool: understanding workflow step");
expect(academicParaphrasingToolHtml.includes("Choose what point needs"), "academic paraphrasing tool: purpose workflow step");
expect(academicParaphrasingToolHtml.includes("Set source aside"), "academic paraphrasing tool: rebuild workflow step");
expect(academicParaphrasingToolHtml.includes("Check accuracy and distance"), "academic paraphrasing tool: accuracy workflow step");
expect(academicParaphrasingToolHtml.includes("Handle exact language honestly"), "academic paraphrasing tool: quotation workflow step");
expect(academicParaphrasingToolHtml.includes("Credit borrowed ideas near use"), "academic paraphrasing tool: attribution workflow step");
expect(academicParaphrasingToolHtml.includes("Confirm before submission"), "academic paraphrasing tool: final-check workflow step");
expect(academicParaphrasingToolHtml.includes("Fictional learning example"), "academic paraphrasing tool: fictional-example disclosure");
expect(academicParaphrasingToolHtml.includes("This fictional learning example is invented for practice"), "academic paraphrasing tool: fictional-example boundary");
expect(academicParaphrasingToolHtml.includes("Understand, rebuild, then attribute"), "academic paraphrasing tool: tool-responsibility boundary");
expect(academicParaphrasingToolHtml.includes("owl.purdue.edu/owl/research_and_citation/using_research/quoting_paraphrasing_and_summarizing/paraphrasing.html"), "academic paraphrasing tool: Purdue guidance link");
expect(academicParaphrasingToolHtml.includes("writingcenter.gmu.edu/writing-resources/citing-sources/paraphrasing"), "academic paraphrasing tool: George Mason guidance link");
expect(academicParaphrasingToolHtml.includes("writing.wisc.edu/handbook/quotingsources"), "academic paraphrasing tool: Wisconsin guidance link");
expect(academicParaphrasingToolHtml.includes('/how-to-paraphrase-without-plagiarizing/'), "academic paraphrasing tool: paraphrasing-guide link");
expect(academicParaphrasingToolHtml.includes('/academic-integrity-and-source-use/'), "academic paraphrasing tool: source-use link");
expect(academicParaphrasingToolHtml.includes('/evaluate-academic-sources/'), "academic paraphrasing tool: source-evaluation link");
expect(academicParaphrasingToolHtml.includes('/citations/'), "academic paraphrasing tool: citation-generator link");
expect(academicParaphrasingToolHtml.includes('/academic-argument-evidence/'), "academic paraphrasing tool: argument-evidence link");
expect(academicParaphrasingToolHtml.includes('/academic-writing-examples/'), "academic paraphrasing tool: writing-examples link");
expect(academicParaphrasingToolHtml.includes('/polish/'), "academic paraphrasing tool: essay-polish link");

const paraphrasingGuideHtml = read("how-to-paraphrase-without-plagiarizing/index.html");
expect(paraphrasingGuideHtml.includes("An eight-step academic paraphrasing process"), "paraphrasing guide: eight-step workflow");
expect(paraphrasingGuideHtml.includes("Record original source"), "paraphrasing guide: source-record workflow step");
expect(paraphrasingGuideHtml.includes("Understand source first"), "paraphrasing guide: understanding workflow step");
expect(paraphrasingGuideHtml.includes("Decide why paragraph needs it"), "paraphrasing guide: purpose workflow step");
expect(paraphrasingGuideHtml.includes("Set source aside and rebuild"), "paraphrasing guide: rebuild workflow step");
expect(paraphrasingGuideHtml.includes("Compare for accuracy and distance"), "paraphrasing guide: accuracy workflow step");
expect(paraphrasingGuideHtml.includes("Mark exact or distinctive wording"), "paraphrasing guide: quotation workflow step");
expect(paraphrasingGuideHtml.includes("Attribute where borrowed idea appears"), "paraphrasing guide: attribution workflow step");
expect(paraphrasingGuideHtml.includes("Reverse-check before submission"), "paraphrasing guide: final-check workflow step");
expect(paraphrasingGuideHtml.includes("Fictional learning example"), "paraphrasing guide: fictional-example disclosure");
expect(paraphrasingGuideHtml.includes("This fictional learning example is invented for practice"), "paraphrasing guide: fictional-example boundary");
expect(paraphrasingGuideHtml.includes("writingcenter.unc.edu"), "paraphrasing guide: UNC guidance link");
expect(paraphrasingGuideHtml.includes("writingcenter.gmu.edu"), "paraphrasing guide: George Mason guidance link");
expect(paraphrasingGuideHtml.includes("niu.edu/academic-integrity"), "paraphrasing guide: NIU integrity guidance link");
expect(paraphrasingGuideHtml.includes("owl.purdue.edu/owl/research_and_citation/using_research/quoting_paraphrasing_and_summarizing/paraphrasing.html"), "paraphrasing guide: Purdue guidance link");
expect(paraphrasingGuideHtml.includes("What a paraphrasing tool cannot decide"), "paraphrasing guide: tool-responsibility boundary");
expect(paraphrasingGuideHtml.includes('/academic-integrity-and-source-use/'), "paraphrasing guide: source-use cluster link");
expect(paraphrasingGuideHtml.includes('/academic-paraphrasing-tool-for-esl-students/'), "paraphrasing guide: paraphrasing-tool cluster link");
expect(paraphrasingGuideHtml.includes('/evaluate-academic-sources/'), "paraphrasing guide: source-evaluation cluster link");
expect(paraphrasingGuideHtml.includes('/academic-argument-evidence/'), "paraphrasing guide: argument-evidence cluster link");
expect(paraphrasingGuideHtml.includes('/academic-paragraph-structure/'), "paraphrasing guide: paragraph-structure cluster link");

const academicIntegrityHtml = read("academic-integrity-and-source-use/index.html");
expect(academicIntegrityHtml.includes("Academic integrity starts with clear source use"), "academic integrity: expected H1");
expect(academicIntegrityHtml.includes("Move from a source to a traceable academic sentence"), "academic integrity: source-responsibility workflow");
expect(academicIntegrityHtml.includes("Check task and course policy"), "academic integrity: policy workflow step");
expect(academicIntegrityHtml.includes("Create a traceable source record"), "academic integrity: source-record workflow step");
expect(academicIntegrityHtml.includes("Choose quote, paraphrase, or summary"), "academic integrity: source-choice workflow step");
expect(academicIntegrityHtml.includes("Read until idea is understood"), "academic integrity: source-understanding workflow step");
expect(academicIntegrityHtml.includes("Draft in your own analytical voice"), "academic integrity: writer-voice workflow step");
expect(academicIntegrityHtml.includes("Mark exact language and attribution"), "academic integrity: attribution workflow step");
expect(academicIntegrityHtml.includes("Check accuracy, scope, and reference details"), "academic integrity: accuracy workflow step");
expect(academicIntegrityHtml.includes("Complete human submission check"), "academic integrity: submission-check workflow step");
expect(academicIntegrityHtml.includes("Fictional learning example: preserve a source trail before drafting"), "academic integrity: fictional-source-record disclosure");
expect(academicIntegrityHtml.includes("This fictional learning example is invented for practice"), "academic integrity: fictional-example boundary");
expect(academicIntegrityHtml.includes("Use AI as a revision step, not a source authority"), "academic integrity: AI-responsibility boundary");
expect(academicIntegrityHtml.includes("apastyle.apa.org/style-grammar-guidelines/citations/paraphrasing"), "academic integrity: APA paraphrase guidance link");
expect(academicIntegrityHtml.includes("owl.purdue.edu/owl/research_and_citation/using_research/quoting_paraphrasing_and_summarizing"), "academic integrity: Purdue source-use guidance link");
expect(academicIntegrityHtml.includes("pitt.libguides.com/academicintegrity/academicwriting"), "academic integrity: Pittsburgh source-integration guidance link");
expect(academicIntegrityHtml.includes('/how-to-paraphrase-without-plagiarizing/'), "academic integrity: paraphrasing-guide return link");
expect(academicIntegrityHtml.includes('/academic-paraphrasing-tool-for-esl-students/'), "academic integrity: paraphrasing-tool link");
expect(academicIntegrityHtml.includes('/annotated-bibliography-example/'), "academic integrity: annotated-bibliography link");
expect(academicIntegrityHtml.includes('/evaluate-academic-sources/'), "academic integrity: source-evaluation link");
expect(academicIntegrityHtml.includes('/literature-review-synthesis-matrix/'), "academic integrity: synthesis-matrix link");
expect(academicIntegrityHtml.includes('/academic-argument-evidence/'), "academic integrity: argument-evidence link");
expect(academicIntegrityHtml.includes('/research-question-examples/'), "academic integrity: research-question link");
expect(academicIntegrityHtml.includes('/citations/'), "academic integrity: citation-generator link");
expect(academicIntegrityHtml.includes('/apa-citation-generator-for-international-students/'), "academic integrity: APA citation guide link");

const chicagoCitationHtml = read("chicago-citation-examples/index.html");
expect(chicagoCitationHtml.includes("Fictional learning examples"), "Chicago citations: fictional-example disclosure");
expect(chicagoCitationHtml.includes("Notes–Bibliography"), "Chicago citations: Notes-Bibliography system");
expect(chicagoCitationHtml.includes("Author–Date"), "Chicago citations: Author-Date system");
expect(chicagoCitationHtml.includes("chicagomanualofstyle.org"), "Chicago citations: official Chicago guidance link");
expect(chicagoCitationHtml.includes("writing.ku.edu"), "Chicago citations: University of Kansas guidance link");
expect(chicagoCitationHtml.includes("18th edition"), "Chicago citations: current edition disclosure");
expect(chicagoCitationHtml.includes('/citations/'), "Chicago citations: citation-generator link");
expect(chicagoCitationHtml.includes('/ieee-citation-examples/'), "Chicago citations: IEEE cluster link");

const ieeeCitationHtml = read("ieee-citation-examples/index.html");
expect(ieeeCitationHtml.includes("Fictional learning examples"), "IEEE citations: fictional-example disclosure");
expect(ieeeCitationHtml.includes("ieeeauthorcenter.ieee.org"), "IEEE citations: official IEEE guidance link");
expect(ieeeCitationHtml.includes("owl.purdue.edu"), "IEEE citations: Purdue OWL guidance link");
expect(ieeeCitationHtml.includes("researchguides.njit.edu"), "IEEE citations: NJIT guidance link");
expect(ieeeCitationHtml.includes("libraryguides.vu.edu.au"), "IEEE citations: Victoria University guidance link");
expect(ieeeCitationHtml.includes('/citations/'), "IEEE citations: citation-generator link");
expect(ieeeCitationHtml.includes('/academic-integrity-and-source-use/'), "IEEE citations: source-use cluster link");

const polishHtml = read("polish/index.html");
expect(polishHtml.includes("fictional learning sample"), "Essay Polish: fictional learning-sample disclosure");
expect(polishHtml.includes("What an essay polisher cannot decide"), "Essay Polish: tool-responsibility boundary");
expect(polishHtml.includes('/academic-paragraph-structure/'), "Essay Polish: paragraph-structure learning link");
expect(polishHtml.includes('/academic-integrity-and-source-use/'), "Essay Polish: source-use learning link");
expect(polishHtml.includes("1. Check what is permitted"), "Essay Polish: six-step revision workflow");
expect(polishHtml.includes("Revise in layers; review every suggestion"), "Essay Polish: layered-revision boundary");
expect(polishHtml.includes("owl.purdue.edu/owl/general_writing/the_writing_process/proofreading/steps_for_revising.html"), "Essay Polish: Purdue revision guidance link");
expect(polishHtml.includes("writingcenter.unc.edu/tips-and-tools/generative-ai-in-academic-writing"), "Essay Polish: UNC AI-policy guidance link");
expect(polishHtml.includes('/academic-argument-evidence/'), "Essay Polish: argument-evidence learning link");
expect(polishHtml.includes('/academic-writing-examples/'), "Essay Polish: writing-examples learning link");
expect(polishHtml.includes('/evaluate-academic-sources/'), "Essay Polish: source-evaluation learning link");
expect(polishHtml.includes('/how-to-paraphrase-without-plagiarizing/'), "Essay Polish: paraphrasing learning link");
expect(polishHtml.includes('/citations/'), "Essay Polish: citation-generator learning link");

const pages = [
  ["/", "Improve academic English without losing your meaning"],
  ["/polish/", "AI essay polisher for clearer academic English"],
  [
    "/phrases/",
    "Academic phrase bank with sentence starters for essays and research papers",
  ],
  ["/phrases/introduction/", "Academic phrases for research paper introductions"],
  ["/phrases/discussion/", "Academic phrases for discussion sections"],
  ["/phrases/conclusion/", "Academic phrases for research paper conclusions"],
  ["/phrases/literature-review/", "Academic phrases for literature reviews and source synthesis"],
  ["/phrases/methods/", "Academic phrases for research methods sections"],
  ["/phrases/results/", "Academic phrases for reporting research results"],
  ["/citations/", "Free citation generator for APA 7, MLA, Chicago and IEEE"],
  ["/pricing/", "AI academic writing support pricing for students"],
  [
    "/research-paper-outline-template/",
    "Research paper outline template for a logical evidence path",
  ],
  [
    "/research-proposal-template/",
    "Research proposal template: structure, example, and checklist",
  ],
  [
    "/research-gap-examples/",
    "Research gap examples: find and state a focused gap",
  ],
  [
    "/research-paper-sections/",
    "How to write each section of a research paper",
  ],
  [
    "/academic-writing-for-graduate-students/",
    "Academic writing for graduate students: build a repeatable research-writing practice",
  ],
  [
    "/hedging-language-academic-writing/",
    "Hedging language in academic writing: match your claim to your evidence",
  ],
  [
    "/academic-english-for-esl-students/",
    "Academic English support for ESL and international students",
  ],
  [
    "/academic-paraphrasing-tool-for-esl-students/",
    "Academic paraphrasing tool for ESL students",
  ],
  [
    "/annotated-bibliography-example/",
    "Annotated bibliography example: citation, summary, and evaluation",
  ],
  [
    "/academic-integrity-and-source-use/",
    "Academic integrity starts with clear source use",
  ],
  [
    "/academic-writing-examples/",
    "Academic writing examples for research papers and essays",
  ],
  [
    "/research-paper-templates/",
    "Research paper templates for methods, results, and discussion",
  ],
  [
    "/thesis-statement-examples/",
    "Thesis statement examples: make an academic claim specific and arguable",
  ],
  [
    "/how-to-write-an-abstract-research-paper/",
    "How to write an abstract for a research paper",
  ],
  [
    "/introduction-section-example-research-paper/",
    "Introduction section example for a research paper",
  ],
  [
    "/discussion-section-example-research-paper/",
    "Discussion section example for a research paper",
  ],
  [
    "/how-to-write-discussion-section/",
    "How to write a discussion section: move from findings to meaning",
  ],
  [
    "/conclusion-section-example-research-paper/",
    "Conclusion section example for a research paper",
  ],
  [
    "/how-to-paraphrase-without-plagiarizing/",
    "How to paraphrase without plagiarizing: understand, reshape, attribute",
  ],
  [
    "/chicago-citation-examples/",
    "Chicago citation examples: choose the right system before you format",
  ],
  [
    "/ieee-citation-examples/",
    "IEEE citation examples: number sources as readers meet them",
  ],
  [
    "/mla-citation-examples/",
    "MLA 9 citation examples: Works Cited and in-text citations",
  ],
  [
    "/literature-review-example/",
    "Literature review example: synthesize by theme",
  ],
  [
    "/literature-review-synthesis-matrix/",
    "How to synthesize sources in a literature review",
  ],
  [
    "/results-section-example-research-paper/",
    "How to write a Results section for a research paper",
  ],
  [
    "/methodology-vs-methods-research-paper/",
    "Methodology vs. methods in a research paper",
  ],
  [
    "/methodology-section-example-research-paper/",
    "How to write a Methodology section for a research paper",
  ],
  [
    "/apa-7-non-english-sources/",
    "APA 7: cite foreign-language and translated sources",
  ],
  [
    "/citation-examples/",
    "Citation examples: choose APA 7, MLA 9, Chicago 18, or IEEE",
  ],
  ["/blog/", "Academic writing guides, sentence starters, and ESL essay help"],
];
pages.forEach(([route, h1]) => checkPage(route, h1));

const academicPhraseLibraryHtml = read("phrases/index.html");
expect(
  academicPhraseLibraryHtml.includes("Academic phrase bank with sentence starters for essays and research papers"),
  "academic phrase library: expected H1"
);
expect(academicPhraseLibraryHtml.includes("1. Name the writing job"), "academic phrase library: six-step workflow");
expect(
  academicPhraseLibraryHtml.includes("Fictional learning example: let the relationship choose the phrase"),
  "academic phrase library: fictional-example disclosure"
);
expect(academicPhraseLibraryHtml.includes("All sentence starters and mini-sentences in this library are fictional learning prompts"), "academic phrase library: template boundary");
expect(academicPhraseLibraryHtml.includes("writingcenter.unc.edu"), "academic phrase library: UNC transitions guidance link");
expect(academicPhraseLibraryHtml.includes("writingcenter.gmu.edu"), "academic phrase library: George Mason guidance link");
expect(academicPhraseLibraryHtml.includes('/hedging-language-academic-writing/'), "academic phrase library: hedging cluster link");
expect(academicPhraseLibraryHtml.includes('/academic-paragraph-structure/'), "academic phrase library: paragraph cluster link");
expect(academicPhraseLibraryHtml.includes('/academic-argument-evidence/'), "academic phrase library: argument cluster link");
expect(academicPhraseLibraryHtml.includes('/research-paper-sections/'), "academic phrase library: sections cluster link");
expect(academicPhraseLibraryHtml.includes('/academic-integrity-and-source-use/'), "academic phrase library: source-use cluster link");

const academicWritingExamplesHtml = read("academic-writing-examples/index.html");
expect(
  academicWritingExamplesHtml.includes("Academic writing examples for research papers and essays"),
  "academic writing examples: expected H1"
);
expect(academicWritingExamplesHtml.includes("1. Check the writing situation"), "academic writing examples: six-step workflow");
expect(
  academicWritingExamplesHtml.includes("Fictional learning example 1"),
  "academic writing examples: first fictional-example disclosure"
);
expect(
  academicWritingExamplesHtml.includes("Fictional learning example 2"),
  "academic writing examples: methods fictional-example disclosure"
);
expect(
  academicWritingExamplesHtml.includes("Fictional learning example 3"),
  "academic writing examples: results fictional-example disclosure"
);
expect(academicWritingExamplesHtml.includes("Transfer the move, not the sentence"), "academic writing examples: transfer boundary");
expect(academicWritingExamplesHtml.includes("Move from what the example says to why the move works here"), "academic writing examples: rhetorical-decision workflow");
expect(academicWritingExamplesHtml.includes("Describe the visible move"), "academic writing examples: description-analysis workflow");
expect(academicWritingExamplesHtml.includes("Quick claim map"), "academic writing examples: claim-support-warrant check");
expect(academicWritingExamplesHtml.includes("You can transfer"), "academic writing examples: transferable-move boundary");
expect(academicWritingExamplesHtml.includes("You must rebuild"), "academic writing examples: rebuild-from-own-record boundary");
expect(academicWritingExamplesHtml.includes("writersworkshop.illinois.edu"), "academic writing examples: Illinois guidance link");
expect(academicWritingExamplesHtml.includes("miamioh.edu"), "academic writing examples: Miami guidance link");
expect(academicWritingExamplesHtml.includes("usingsources.fas.harvard.edu"), "academic writing examples: Harvard source-responsibility link");
expect(academicWritingExamplesHtml.includes("purdueglobalwriting.center"), "academic writing examples: Purdue Global integrity link");
expect(academicWritingExamplesHtml.includes('/thesis-statement-examples/'), "academic writing examples: thesis cluster link");
expect(academicWritingExamplesHtml.includes('/academic-paragraph-structure/'), "academic writing examples: paragraph cluster link");
expect(academicWritingExamplesHtml.includes('/research-question-examples/'), "academic writing examples: research-question cluster link");
expect(academicWritingExamplesHtml.includes('/research-gap-examples/'), "academic writing examples: research-gap cluster link");
expect(academicWritingExamplesHtml.includes('/literature-review-synthesis-matrix/'), "academic writing examples: synthesis cluster link");
expect(academicWritingExamplesHtml.includes('/citations/'), "academic writing examples: citations cluster link");
expect(academicWritingExamplesHtml.includes('/academic-integrity-and-source-use/'), "academic writing examples: source-use cluster link");

const researchPaperTemplatesHtml = read("research-paper-templates/index.html");
expect(
  researchPaperTemplatesHtml.includes("Research paper templates for methods, results, and discussion"),
  "research paper templates: expected H1"
);
expect(researchPaperTemplatesHtml.includes("1. Confirm the deliverable"), "research paper templates: five-step workflow");
expect(
  researchPaperTemplatesHtml.includes("This fictional learning example is invented for practice and is not a submission template"),
  "research paper templates: fictional-example disclosure"
);
expect(researchPaperTemplatesHtml.includes("Literature review:"), "research paper templates: structure-selection boundary");
expect(researchPaperTemplatesHtml.includes("owl.purdue.edu"), "research paper templates: Purdue guidance link");
expect(researchPaperTemplatesHtml.includes("libguides.usc.edu"), "research paper templates: USC guidance link");
expect(researchPaperTemplatesHtml.includes("psychology.ucsd.edu"), "research paper templates: UCSD guidance link");
expect(researchPaperTemplatesHtml.includes('/research-paper-outline-template/'), "research paper templates: outline cluster link");
expect(researchPaperTemplatesHtml.includes('/research-paper-sections/'), "research paper templates: sections cluster link");
expect(researchPaperTemplatesHtml.includes('/literature-review-synthesis-matrix/'), "research paper templates: synthesis cluster link");
expect(researchPaperTemplatesHtml.includes('/academic-integrity-and-source-use/'), "research paper templates: source-use cluster link");

const resultsHtml = read(
  "blog/how-to-write-a-results-section-research-paper-esl/index.html"
);
expect(
  resultsHtml.includes(
    "How to Write a Results Section: Examples for ESL Students"
  ),
  "results article: updated title in raw HTML"
);
expect(
  resultsHtml.includes("Fictional Learning Example: Quantitative Results"),
  "results article: quantitative example in raw HTML"
);
expect(
  resultsHtml.includes("Fictional Learning Example: Qualitative Results"),
  "results article: qualitative example in raw HTML"
);
expect(
  resultsHtml.includes('"@type":"Article"'),
  "results article: Article JSON-LD"
);
expect(
  (resultsHtml.match(/<link rel="canonical"/g) ?? []).length === 1,
  "results article: exactly one canonical"
);

const abstractVsIntroductionHtml = read(
  "blog/abstract-vs-introduction-difference/index.html"
);
expect(
  abstractVsIntroductionHtml.includes("Fictional Learning Example: One Topic, Two Different Jobs"),
  "abstract-vs-introduction article: fictional-example disclosure"
);
expect(
  abstractVsIntroductionHtml.includes("writingcenter.gmu.edu"),
  "abstract-vs-introduction article: George Mason guidance link"
);
expect(
  abstractVsIntroductionHtml.includes("undergradresearch.washu.edu"),
  "abstract-vs-introduction article: WashU guidance link"
);
expect(
  abstractVsIntroductionHtml.includes("guides.lib.uci.edu"),
  "abstract-vs-introduction article: UC Irvine guidance link"
);
expect(
  abstractVsIntroductionHtml.includes('/research-gap-examples/'),
  "abstract-vs-introduction article: research-gap cluster link"
);
expect(
  abstractVsIntroductionHtml.includes('/how-to-write-an-abstract-research-paper/'),
  "abstract-vs-introduction article: abstract-guide cluster link"
);
expect(
  abstractVsIntroductionHtml.includes('"@type":"Article"'),
  "abstract-vs-introduction article: Article JSON-LD"
);

const academicParagraphHtml = read("academic-paragraph-structure/index.html");
expect(
  academicParagraphHtml.includes("Academic paragraph structure: topic sentence, evidence, and explanation"),
  "academic paragraphs: expected H1"
);
expect(academicParagraphHtml.includes("Build a paragraph readers can follow and evaluate"), "academic paragraphs: eight-step workflow");
expect(academicParagraphHtml.includes("Name paragraph’s job"), "academic paragraphs: function workflow step");
expect(academicParagraphHtml.includes("Give it one focus"), "academic paragraphs: focus workflow step");
expect(academicParagraphHtml.includes("Choose support with a job"), "academic paragraphs: evidence workflow step");
expect(academicParagraphHtml.includes("Make attribution visible"), "academic paragraphs: attribution workflow step");
expect(academicParagraphHtml.includes("Show reasoning connection"), "academic paragraphs: explanation workflow step");
expect(academicParagraphHtml.includes("Keep claims proportionate"), "academic paragraphs: limit workflow step");
expect(academicParagraphHtml.includes("Guide readers through real relationship"), "academic paragraphs: connection workflow step");
expect(academicParagraphHtml.includes("Test unity, development, and sequence"), "academic paragraphs: reverse-check workflow step");
expect(academicParagraphHtml.includes("This fictional learning example is invented for practice"), "academic paragraphs: fictional learning boundary");
expect(academicParagraphHtml.includes("owl.purdue.edu"), "academic paragraphs: Purdue guidance link");
expect(academicParagraphHtml.includes("writingcenter.unc.edu"), "academic paragraphs: UNC guidance link");
expect(academicParagraphHtml.includes("writingcenter.fas.harvard.edu"), "academic paragraphs: Harvard guidance link");
expect(academicParagraphHtml.includes('/academic-integrity-and-source-use/'), "academic paragraphs: source-use cluster link");
expect(academicParagraphHtml.includes('/citations/'), "academic paragraphs: citations cluster link");
expect(academicParagraphHtml.includes('/research-paper-outline-template/'), "academic paragraphs: outline cluster link");
expect(academicParagraphHtml.includes("Build a paragraph readers can follow and evaluate"), "academic paragraphs: eight-step workflow regression guard");
expect(
  academicParagraphHtml.includes("This fictional learning example is invented for practice"),
  "academic paragraphs: fictional-example disclosure"
);
expect(academicParagraphHtml.includes("PEEL, TEEL, and TTEB"), "academic paragraphs: framework boundary");
expect(academicParagraphHtml.includes("owl.purdue.edu"), "academic paragraphs: Purdue guidance link");
expect(academicParagraphHtml.includes("writingcenter.unc.edu"), "academic paragraphs: UNC guidance link");
expect(academicParagraphHtml.includes("writingcenter.fas.harvard.edu"), "academic paragraphs: Harvard guidance link");
expect(academicParagraphHtml.includes('/thesis-statement-examples/'), "academic paragraphs: thesis cluster link");
expect(academicParagraphHtml.includes('/academic-argument-evidence/'), "academic paragraphs: argument cluster link");
expect(academicParagraphHtml.includes('/phrases/introduction/'), "academic paragraphs: phrases cluster link");
expect(academicParagraphHtml.includes('/hedging-language-academic-writing/'), "academic paragraphs: hedging cluster link");

const thesisStatementHtml = read("thesis-statement-examples/index.html");
expect(
  thesisStatementHtml.includes("Thesis statement examples: make an academic claim specific and arguable"),
  "thesis statements: expected H1"
);
expect(thesisStatementHtml.includes("Move from task and evidence to a supportable working thesis"), "thesis statements: eight-step drafting workflow");
expect(
  thesisStatementHtml.includes("This fictional learning example is invented for practice"),
  "thesis statements: fictional-example disclosure"
);
expect(thesisStatementHtml.includes("writingcenter.fas.harvard.edu"), "thesis statements: Harvard guidance link");
expect(thesisStatementHtml.includes("writingcenter.unc.edu"), "thesis statements: UNC guidance link");
expect(thesisStatementHtml.includes("owl.purdue.edu"), "thesis statements: Purdue guidance link");
expect(thesisStatementHtml.includes("normative or policy thesis"), "thesis statements: claim-type boundary");
expect(thesisStatementHtml.includes('/research-question-examples/'), "thesis statements: research-question cluster link");
expect(thesisStatementHtml.includes('/academic-paragraph-structure/'), "thesis statements: paragraph cluster link");
expect(thesisStatementHtml.includes('/research-paper-outline-template/'), "thesis statements: outline cluster link");
expect(thesisStatementHtml.includes('/hedging-language-academic-writing/'), "thesis statements: hedging cluster link");
expect(thesisStatementHtml.includes('/academic-integrity-and-source-use/'), "thesis statements: source-use cluster link");
expect(thesisStatementHtml.includes('/citations/'), "thesis statements: citations cluster link");

const researchPaperSectionsHtml = read("research-paper-sections/index.html");
expect(
  researchPaperSectionsHtml.includes("How to write each section of a research paper"),
  "research paper sections: expected H1"
);
expect(
  researchPaperSectionsHtml.includes("Choose a structure that fits the kind of research you are doing"),
  "research paper sections: structure-choice guidance"
);
expect(
  researchPaperSectionsHtml.includes("This is a fictional learning example only"),
  "research paper sections: fictional-example disclosure"
);
expect(researchPaperSectionsHtml.includes("Revise recursively"), "research paper sections: recursive-revision workflow");
expect(researchPaperSectionsHtml.includes("Give each section a contract"), "research paper sections: section-contract workflow");
expect(researchPaperSectionsHtml.includes("Trace the evidence path"), "research paper sections: evidence-path workflow");
expect(researchPaperSectionsHtml.includes("writingcenter.gmu.edu"), "research paper sections: GMU IMRaD guidance link");
expect(researchPaperSectionsHtml.includes("psychology.ucsd.edu"), "research paper sections: UCSD guidance link");
expect(researchPaperSectionsHtml.includes("writing.wisc.edu"), "research paper sections: UW Madison guidance link");
expect(researchPaperSectionsHtml.includes('/research-paper-outline-template/'), "research paper sections: outline cluster link");
expect(researchPaperSectionsHtml.includes('/research-proposal-template/'), "research paper sections: proposal cluster link");
expect(researchPaperSectionsHtml.includes('/literature-review-example/'), "research paper sections: literature-review cluster link");
expect(researchPaperSectionsHtml.includes('/how-to-write-an-abstract-research-paper/'), "research paper sections: abstract cluster link");
expect(researchPaperSectionsHtml.includes('/academic-integrity-and-source-use/'), "research paper sections: source-use cluster link");
expect(researchPaperSectionsHtml.includes('/citations/'), "research paper sections: citations cluster link");

const academicEnglishHubHtml = read("academic-english-for-esl-students/index.html");
expect(
  academicEnglishHubHtml.includes("Academic English support for ESL and international students"),
  "academic English hub: expected H1"
);
expect(
  academicEnglishHubHtml.includes("Build academic English around the work your paper needs to do"),
  "academic English hub: five-step learning workflow"
);
expect(
  academicEnglishHubHtml.includes("This fictional learning example is invented for practice"),
  "academic English hub: fictional-example disclosure"
);
expect(academicEnglishHubHtml.includes("owl.purdue.edu"), "academic English hub: Purdue OWL guidance link");
expect(academicEnglishHubHtml.includes("drexel.edu"), "academic English hub: Drexel guidance link");
expect(academicEnglishHubHtml.includes("dickinson.edu"), "academic English hub: Dickinson guidance link");
expect(academicEnglishHubHtml.includes("cannot verify a research design"), "academic English hub: responsibility boundary");
expect(academicEnglishHubHtml.includes('/how-to-paraphrase-without-plagiarizing/'), "academic English hub: paraphrasing cluster link");
expect(academicEnglishHubHtml.includes('/research-paper-sections/'), "academic English hub: paper-sections cluster link");

const sourceEvaluationHtml = read("evaluate-academic-sources/index.html");
expect(
  sourceEvaluationHtml.includes("How to evaluate academic sources: a student checklist"),
  "source evaluation: strengthened H1"
);
expect(
  sourceEvaluationHtml.includes("Evaluate how a source can serve this project"),
  "source evaluation: eight-step critical-reading workflow"
);
expect(sourceEvaluationHtml.includes("Start with project need"), "source evaluation: task-role workflow step");
expect(sourceEvaluationHtml.includes("Identify creator, venue, and record"), "source evaluation: identity-version workflow step");
expect(sourceEvaluationHtml.includes("Read claim and evidence"), "source evaluation: claim-evidence workflow step");
expect(sourceEvaluationHtml.includes("Locate viewpoint and reach"), "source evaluation: perspective workflow step");
expect(sourceEvaluationHtml.includes("Test key material laterally"), "source evaluation: cross-check workflow step");
expect(sourceEvaluationHtml.includes("Decide project use"), "source evaluation: project-use workflow step");
expect(sourceEvaluationHtml.includes("Keep source use traceable"), "source evaluation: source-boundary workflow step");
expect(sourceEvaluationHtml.includes("Reopen decision before drafting"), "source evaluation: reverse-check workflow step");
expect(
  sourceEvaluationHtml.includes("This fictional learning example is invented for practice"),
  "source evaluation: fictional-example disclosure"
);
expect(sourceEvaluationHtml.includes("writingcenter.unc.edu"), "source evaluation: UNC guidance link");
expect(sourceEvaluationHtml.includes("libguides.usc.edu"), "source evaluation: USC guidance link");
expect(sourceEvaluationHtml.includes("knight.as.cornell.edu"), "source evaluation: Cornell guidance link");
expect(sourceEvaluationHtml.includes("usingsources.fas.harvard.edu"), "source evaluation: Harvard guidance link");
expect(sourceEvaluationHtml.includes('/research-question-examples/'), "source evaluation: research-question cluster link");
expect(sourceEvaluationHtml.includes('/academic-argument-evidence/'), "source evaluation: argument-evidence cluster link");
expect(sourceEvaluationHtml.includes('/annotated-bibliography-example/'), "source evaluation: annotated-bibliography cluster link");
expect(sourceEvaluationHtml.includes('/academic-integrity-and-source-use/'), "source evaluation: source-use cluster link");
expect(sourceEvaluationHtml.includes('/citations/'), "source evaluation: citations cluster link");

const researchQuestionHtml = read("research-question-examples/index.html");
expect(
  researchQuestionHtml.includes("Research question examples: make a topic clear, focused, and arguable"),
  "research questions: strengthened H1"
);
expect(
  researchQuestionHtml.includes("Move from a topic to a workable research question"),
  "research questions: eight-step planning workflow"
);
expect(researchQuestionHtml.includes("Confirm assignment and reader"), "research questions: task workflow step");
expect(researchQuestionHtml.includes("Name broad area to understand"), "research questions: topic workflow step");
expect(researchQuestionHtml.includes("Scan terms, evidence, and conversations"), "research questions: reading workflow step");
expect(researchQuestionHtml.includes("Draft a genuinely open inquiry"), "research questions: open-question workflow step");
expect(researchQuestionHtml.includes("Set useful scope"), "research questions: boundary workflow step");
expect(researchQuestionHtml.includes("Check reasoning demand"), "research questions: complexity workflow step");
expect(researchQuestionHtml.includes("Test access, methods, and ethics"), "research questions: feasibility workflow step");
expect(researchQuestionHtml.includes("Rebuild and reverse-check"), "research questions: iteration workflow step");
expect(
  researchQuestionHtml.includes("This fictional learning example is invented for practice"),
  "research questions: fictional-example disclosure"
);
expect(researchQuestionHtml.includes("writingcenter.gmu.edu"), "research questions: George Mason guidance link");
expect(researchQuestionHtml.includes("hub.williams.edu"), "research questions: Williams guidance link");
expect(researchQuestionHtml.includes("writingcenter.uci.edu"), "research questions: UC Irvine guidance link");
expect(researchQuestionHtml.includes('/research-gap-examples/'), "research questions: research-gap cluster link");
expect(researchQuestionHtml.includes('/academic-argument-evidence/'), "research questions: argument-evidence cluster link");
expect(researchQuestionHtml.includes('/research-proposal-template/'), "research questions: research-proposal cluster link");
expect(researchQuestionHtml.includes('/methodology-vs-methods-research-paper/'), "research questions: methodology cluster link");
expect(researchQuestionHtml.includes('/thesis-statement-examples/'), "research questions: thesis cluster link");
expect(researchQuestionHtml.includes('/research-paper-outline-template/'), "research questions: outline cluster link");
expect(researchQuestionHtml.includes('/academic-integrity-and-source-use/'), "research questions: source-use cluster link");

const argumentEvidenceHtml = read("academic-argument-evidence/index.html");
expect(
  argumentEvidenceHtml.includes("Academic argument and evidence: build a claim readers can follow"),
  "argument evidence: strengthened H1"
);
expect(argumentEvidenceHtml.includes("Build an argument readers can test rather than an information list"), "argument evidence: eight-step workflow heading");
expect(argumentEvidenceHtml.includes("Task and reader"), "argument evidence: task-reader workflow step");
expect(argumentEvidenceHtml.includes("Question"), "argument evidence: question workflow step");
expect(argumentEvidenceHtml.includes("Claim"), "argument evidence: claim workflow step");
expect(argumentEvidenceHtml.includes("Evidence role"), "argument evidence: evidence-role workflow step");
expect(argumentEvidenceHtml.includes("Source boundary"), "argument evidence: source-boundary workflow step");
expect(argumentEvidenceHtml.includes("Reasoning"), "argument evidence: reasoning-bridge workflow step");
expect(argumentEvidenceHtml.includes("Counterargument and limit"), "argument evidence: counterargument-limit workflow step");
expect(argumentEvidenceHtml.includes("Reverse check"), "argument evidence: reverse-check workflow step");
expect(argumentEvidenceHtml.includes("Fictional learning example: map the reasoning, not just the citation"), "argument evidence: fictional-learning-map disclosure");
expect(argumentEvidenceHtml.includes("This fictional learning example is invented for practice"), "argument evidence: fictional-example boundary");
expect(argumentEvidenceHtml.includes("Evidence says"), "argument evidence: evidence-reasoning distinction");
expect(argumentEvidenceHtml.includes("Your reasoning adds"), "argument evidence: writer-reasoning distinction");
expect(argumentEvidenceHtml.includes("writingcenter.unc.edu/tips-and-tools/argument"), "argument evidence: UNC guidance link");
expect(argumentEvidenceHtml.includes("wts.indiana.edu/writing-guides/using-evidence"), "argument evidence: Indiana evidence guidance link");
expect(argumentEvidenceHtml.includes("writingcenter.fas.harvard.edu/counterargument"), "argument evidence: Harvard counterargument guidance link");
expect(argumentEvidenceHtml.includes("writingcenter.tamu.edu/guides/resources/arguments"), "argument evidence: Texas A&M guidance link");
expect(argumentEvidenceHtml.includes('/research-question-examples/'), "argument evidence: research-question cluster link");
expect(argumentEvidenceHtml.includes('/thesis-statement-examples/'), "argument evidence: thesis cluster link");
expect(argumentEvidenceHtml.includes('/academic-paragraph-structure/'), "argument evidence: paragraphs cluster link");
expect(argumentEvidenceHtml.includes('/hedging-language-academic-writing/'), "argument evidence: hedging cluster link");
expect(argumentEvidenceHtml.includes('/evaluate-academic-sources/'), "argument evidence: source-evaluation cluster link");
expect(argumentEvidenceHtml.includes('/literature-review-synthesis-matrix/'), "argument evidence: synthesis cluster link");
expect(argumentEvidenceHtml.includes('/academic-paraphrasing-tool-for-esl-students/'), "argument evidence: paraphrasing cluster link");
expect(argumentEvidenceHtml.includes('/citations/'), "argument evidence: citations cluster link");
expect(argumentEvidenceHtml.includes('/academic-integrity-and-source-use/'), "argument evidence: source-use cluster link");
expect(argumentEvidenceHtml.includes('/how-to-write-discussion-section/'), "argument evidence: discussion cluster link");

const hedgingLanguageHtml = read("hedging-language-academic-writing/index.html");
expect(hedgingLanguageHtml.includes("Fictional learning example"), "hedging language: fictional-example disclosure");
expect(hedgingLanguageHtml.includes("writingcenter.gmu.edu"), "hedging language: George Mason guidance link");
expect(hedgingLanguageHtml.includes("owl.purdue.edu"), "hedging language: Purdue OWL guidance link");
expect(hedgingLanguageHtml.includes("students.unimelb.edu.au"), "hedging language: University of Melbourne guidance link");
expect(hedgingLanguageHtml.includes("bristol.ac.uk"), "hedging language: University of Bristol guidance link");
expect(hedgingLanguageHtml.includes('/academic-argument-evidence/'), "hedging language: argument-evidence cluster link");
expect(hedgingLanguageHtml.includes('/how-to-write-discussion-section/'), "hedging language: discussion cluster link");

const graduateAcademicWritingHtml = read("academic-writing-for-graduate-students/index.html");
expect(graduateAcademicWritingHtml.includes("Fictional learning example"), "graduate academic writing: fictional-example disclosure");
expect(graduateAcademicWritingHtml.includes("Turn a large graduate project into a sequence of testable decisions"), "graduate academic writing: project-architecture workflow");
expect(graduateAcademicWritingHtml.includes("Ask a staged feedback question"), "graduate academic writing: staged-feedback workflow");
expect(graduateAcademicWritingHtml.includes("ask for feedback a reader can actually give"), "graduate academic writing: fictional-feedback-brief disclosure");
expect(graduateAcademicWritingHtml.includes("Keep responsibility with the right person"), "graduate academic writing: support-responsibility boundary");
expect(graduateAcademicWritingHtml.includes("writingcenter.unc.edu/tips-and-tools/dissertation-strategies"), "graduate academic writing: UNC dissertation guidance link");
expect(graduateAcademicWritingHtml.includes("writingcenter.utk.edu/dissertation-writing-guide"), "graduate academic writing: UTK dissertation guidance link");
expect(graduateAcademicWritingHtml.includes("gsc.upenn.edu"), "graduate academic writing: UPenn guidance link");
expect(graduateAcademicWritingHtml.includes("poorvucenter.yale.edu"), "graduate academic writing: Yale guidance link");
expect(graduateAcademicWritingHtml.includes('/academic-english-for-esl-students/'), "graduate academic writing: academic-English cluster link");
expect(graduateAcademicWritingHtml.includes('/research-proposal-template/'), "graduate academic writing: proposal cluster link");
expect(graduateAcademicWritingHtml.includes('/research-question-examples/'), "graduate academic writing: research-question cluster link");
expect(graduateAcademicWritingHtml.includes('/research-gap-examples/'), "graduate academic writing: research-gap cluster link");
expect(graduateAcademicWritingHtml.includes('/research-paper-sections/'), "graduate academic writing: paper-sections cluster link");
expect(graduateAcademicWritingHtml.includes('/academic-integrity-and-source-use/'), "graduate academic writing: source-use cluster link");
expect(graduateAcademicWritingHtml.includes('/citations/'), "graduate academic writing: citations cluster link");
expect(academicEnglishHubHtml.includes('/academic-writing-for-graduate-students/'), "academic-English hub: graduate-writing return link");
expect(academicEnglishHubHtml.includes('/hedging-language-academic-writing/'), "academic-English hub: hedging return link");

const synthesisHtml = read("literature-review-synthesis-matrix/index.html");
expect(
  synthesisHtml.includes("Fictional learning example"),
  "literature synthesis: fictional example in raw HTML"
);
expect(
  synthesisHtml.includes(
    "owl.purdue.edu/owl/research_and_citation/conducting_research/research_overview/synthesizing_sources.html"
  ),
  "literature synthesis: Purdue OWL guidance link"
);
expect(synthesisHtml.includes("1. Start with scope"), "literature synthesis: five-step workflow");
expect(
  synthesisHtml.includes("This entire fictional learning example, including its matrix, is invented for practice"),
  "literature synthesis: fictional-matrix disclosure"
);
expect(synthesisHtml.includes("Let the matrix reveal questions, not prove absences"), "literature synthesis: research-gap boundary");
expect(synthesisHtml.includes("guides.library.jhu.edu"), "literature synthesis: Johns Hopkins guidance link");
expect(synthesisHtml.includes("writingcenter.unc.edu"), "literature synthesis: UNC guidance link");
expect(synthesisHtml.includes("writingcenter.gmu.edu"), "literature synthesis: George Mason guidance link");
expect(synthesisHtml.includes('/literature-review-example/'), "literature synthesis: example cluster link");
expect(synthesisHtml.includes('/academic-integrity-and-source-use/'), "literature synthesis: source-use cluster link");
expect(synthesisHtml.includes('/research-gap-examples/'), "literature synthesis: research-gap cluster link");

const proposalTemplateHtml = read("research-proposal-template/index.html");
expect(proposalTemplateHtml.includes("Fictional learning example"), "research proposal template: fictional-example disclosure");
expect(proposalTemplateHtml.includes("This fictional learning example is invented for practice"), "research proposal template: fictional learning boundary");
expect(proposalTemplateHtml.includes("Build a proposal readers can assess before the study exists"), "research proposal template: assessable-proposal workflow");
expect(proposalTemplateHtml.includes("Confirm the proposal task and reader"), "research proposal template: task-reader workflow step");
expect(proposalTemplateHtml.includes("Define a bounded problem and purpose"), "research proposal template: bounded-problem workflow step");
expect(proposalTemplateHtml.includes("Build a traceable evidence base"), "research proposal template: evidence-base workflow step");
expect(proposalTemplateHtml.includes("Make the rationale proportionate"), "research proposal template: rationale workflow step");
expect(proposalTemplateHtml.includes("Match design and methods to the question"), "research proposal template: methods workflow step");
expect(proposalTemplateHtml.includes("Test access, feasibility, and ethics"), "research proposal template: feasibility-ethics workflow step");
expect(proposalTemplateHtml.includes("State bounded anticipated contribution"), "research proposal template: contribution workflow step");
expect(proposalTemplateHtml.includes("Reverse-check coherence and revise"), "research proposal template: coherence workflow step");
expect(proposalTemplateHtml.includes("Use a proposal decision record before drafting"), "research proposal template: decision-record checklist");
expect(proposalTemplateHtml.includes("ugradresearch.uconn.edu"), "research proposal template: UConn guidance link");
expect(proposalTemplateHtml.includes("libguides.usc.edu"), "research proposal template: USC guidance link");
expect(proposalTemplateHtml.includes("writersworkshop.illinois.edu"), "research proposal template: Illinois guidance link");
expect(proposalTemplateHtml.includes('/research-question-examples/'), "research proposal template: research-question link");
expect(proposalTemplateHtml.includes('/literature-review-synthesis-matrix/'), "research proposal template: synthesis-matrix link");
expect(proposalTemplateHtml.includes('/literature-review-example/'), "research proposal template: literature-review-example link");
expect(proposalTemplateHtml.includes('/research-gap-examples/'), "research proposal template: research-gap link");
expect(proposalTemplateHtml.includes('/methodology-vs-methods-research-paper/'), "research proposal template: methodology-vs-methods link");
expect(proposalTemplateHtml.includes('/methodology-section-example-research-paper/'), "research proposal template: methodology-example link");
expect(proposalTemplateHtml.includes('/academic-integrity-and-source-use/'), "research proposal template: source-use link");
expect(proposalTemplateHtml.includes('/citations/'), "research proposal template: citations link");

const researchGapHtml = read("research-gap-examples/index.html");
expect(researchGapHtml.includes("Fictional learning example"), "research gap examples: fictional-example disclosure");
expect(researchGapHtml.includes("guides.lib.uchicago.edu"), "research gap examples: University of Chicago guidance link");
expect(researchGapHtml.includes("owl.purdue.edu"), "research gap examples: Purdue OWL guidance link");
expect(researchGapHtml.includes("sites.middlebury.edu"), "research gap examples: Middlebury guidance link");
expect(researchGapHtml.includes('/literature-review-example/'), "research gap examples: literature-review cluster link");
expect(researchGapHtml.includes('/research-question-examples/'), "research gap examples: research-question cluster link");
expect(researchGapHtml.includes('/research-proposal-template/'), "research gap examples: research-proposal cluster link");

const outlineTemplateHtml = read("research-paper-outline-template/index.html");
expect(outlineTemplateHtml.includes("Fictional learning example"), "research-paper outline: fictional-example disclosure");
expect(outlineTemplateHtml.includes("This fictional learning example is invented for practice"), "research-paper outline: fictional learning boundary");
expect(outlineTemplateHtml.includes("Build an outline from a task, evidence path, and reader&apos;s next question"), "research-paper outline: evidence-path workflow");
expect(outlineTemplateHtml.includes("Confirm the task and reader"), "research-paper outline: task-reader workflow step");
expect(outlineTemplateHtml.includes("State a working purpose or claim"), "research-paper outline: purpose-claim workflow step");
expect(outlineTemplateHtml.includes("Inventory usable material"), "research-paper outline: material-inventory workflow step");
expect(outlineTemplateHtml.includes("Group related work"), "research-paper outline: grouping workflow step");
expect(outlineTemplateHtml.includes("Choose a reader-facing order"), "research-paper outline: ordering workflow step");
expect(outlineTemplateHtml.includes("Label hierarchy and evidence jobs"), "research-paper outline: hierarchy workflow step");
expect(outlineTemplateHtml.includes("Check the full paper contract"), "research-paper outline: paper-contract workflow step");
expect(outlineTemplateHtml.includes("Revise as research develops"), "research-paper outline: revision workflow step");
expect(outlineTemplateHtml.includes("Use an evidence-path record before drafting"), "research-paper outline: evidence-path checklist");
expect(outlineTemplateHtml.includes("owl.purdue.edu"), "research-paper outline: Purdue OWL guidance link");
expect(outlineTemplateHtml.includes("writingcenter.gmu.edu"), "research-paper outline: university writing-center guidance link");
expect(outlineTemplateHtml.includes('/research-question-examples/'), "research-paper outline: research-question link");
expect(outlineTemplateHtml.includes('/thesis-statement-examples/'), "research-paper outline: thesis link");
expect(outlineTemplateHtml.includes('/academic-paragraph-structure/'), "research-paper outline: paragraph link");
expect(outlineTemplateHtml.includes('/research-paper-sections/'), "research-paper outline: sections hub link");
expect(outlineTemplateHtml.includes('/literature-review-synthesis-matrix/'), "research-paper outline: synthesis-matrix link");
expect(outlineTemplateHtml.includes('/academic-argument-evidence/'), "research-paper outline: argument link");
expect(outlineTemplateHtml.includes('/academic-integrity-and-source-use/'), "research-paper outline: source-use link");
expect(outlineTemplateHtml.includes('/citations/'), "research-paper outline: citations link");

const abstractGuideHtml = read("how-to-write-an-abstract-research-paper/index.html");
expect(abstractGuideHtml.includes("How to write an abstract for a research paper"), "abstract guide: expected H1");
expect(abstractGuideHtml.includes("Build the abstract from the completed paper"), "abstract guide: verification workflow");
expect(abstractGuideHtml.includes("Identify required abstract type"), "abstract guide: abstract-type checkpoint");
expect(abstractGuideHtml.includes("Make result informative"), "abstract guide: informative-result checkpoint");
expect(abstractGuideHtml.includes("Reverse-check against paper"), "abstract guide: reverse-check checkpoint");
expect(abstractGuideHtml.includes("Fictional learning example"), "abstract guide: fictional-example disclosure");
expect(abstractGuideHtml.includes("writingcenter.gmu.edu/writing-resources/different-genres/writing-an-abstract"), "abstract guide: GMU guidance link");
expect(abstractGuideHtml.includes("writing.wisc.edu"), "abstract guide: Wisconsin guidance link");
expect(abstractGuideHtml.includes('/introduction-section-example-research-paper/'), "abstract guide: introduction-example link");
expect(abstractGuideHtml.includes('/methodology-section-example-research-paper/'), "abstract guide: methodology-example link");
expect(abstractGuideHtml.includes('/results-section-example-research-paper/'), "abstract guide: results-example link");
expect(abstractGuideHtml.includes('/discussion-section-example-research-paper/'), "abstract guide: discussion-example link");
expect(abstractGuideHtml.includes('/conclusion-section-example-research-paper/'), "abstract guide: conclusion-example link");
expect(abstractGuideHtml.includes('/academic-integrity-and-source-use/'), "abstract guide: source-use link");
expect(abstractGuideHtml.includes('/polish/'), "abstract guide: polish link");
const introductionPracticeHtml = read("introduction-section-example-research-paper/index.html");
expect(introductionPracticeHtml.includes("Fictional learning example"), "introduction practice: fictional example in raw HTML");
expect(introductionPracticeHtml.includes("This fictional learning example is invented for practice"), "introduction practice: fictional learning disclosure");
expect(introductionPracticeHtml.includes("How to build an Introduction section step by step"), "introduction practice: drafting workflow");
expect(introductionPracticeHtml.includes("Confirm the Introduction task"), "introduction practice: task workflow step");
expect(introductionPracticeHtml.includes("Identify the reader and task"), "introduction practice: reader workflow step");
expect(introductionPracticeHtml.includes("Establish only necessary context"), "introduction practice: context workflow step");
expect(introductionPracticeHtml.includes("Show what is known and verifiably limited"), "introduction practice: known-and-limited workflow step");
expect(introductionPracticeHtml.includes("State a cautious gap or tension"), "introduction practice: gap workflow step");
expect(introductionPracticeHtml.includes("Declare a focused purpose and scope"), "introduction practice: purpose workflow step");
expect(introductionPracticeHtml.includes("Provide a conditional roadmap"), "introduction practice: roadmap workflow step");
expect(introductionPracticeHtml.includes("Align with the final completed paper"), "introduction practice: final-alignment workflow step");
expect(introductionPracticeHtml.includes("Use an Introduction record before you draft the opening"), "introduction practice: introduction record");
expect(introductionPracticeHtml.includes("libguides.usc.edu/writingguide/introduction"), "introduction practice: USC guidance link");
expect(introductionPracticeHtml.includes("library.sacredheart.edu/c.php?g=29803"), "introduction practice: Sacred Heart guidance link");
expect(introductionPracticeHtml.includes("www.utep.edu/uwc/writing%20help%20online/researchpaper-intro.html"), "introduction practice: UTEP guidance link");
expect(introductionPracticeHtml.includes('/research-question-examples/'), "introduction practice: research-question link");
expect(introductionPracticeHtml.includes('/research-gap-examples/'), "introduction practice: research-gap return link");
expect(introductionPracticeHtml.includes('/literature-review-example/'), "introduction practice: literature-review link");
expect(introductionPracticeHtml.includes('/phrases/introduction/'), "introduction practice: introduction-phrases link");
expect(introductionPracticeHtml.includes('/methodology-section-example-research-paper/'), "introduction practice: methodology-example link");
expect(introductionPracticeHtml.includes('/hedging-language-academic-writing/'), "introduction practice: hedging link");
expect(introductionPracticeHtml.includes('/academic-argument-evidence/'), "introduction practice: argument link");
expect(introductionPracticeHtml.includes('/academic-integrity-and-source-use/'), "introduction practice: source-use link");
expect(introductionPracticeHtml.includes('/citations/'), "introduction practice: citations link");
const discussionPracticeHtml = read("discussion-section-example-research-paper/index.html");
expect(discussionPracticeHtml.includes("Discussion section example for a research paper"), "discussion practice: expected H1");
expect(discussionPracticeHtml.includes("How to build a Discussion section step by step"), "discussion practice: drafting workflow");
expect(discussionPracticeHtml.includes("Check the Discussion contract"), "discussion practice: section-contract workflow step");
expect(discussionPracticeHtml.includes("Reopen the reported finding"), "discussion practice: finding-bridge workflow step");
expect(discussionPracticeHtml.includes("Explain a bounded meaning"), "discussion practice: bounded-meaning workflow step");
expect(discussionPracticeHtml.includes("Compare with a specific research relationship"), "discussion practice: comparison workflow step");
expect(discussionPracticeHtml.includes("Consider alternatives and unexpected detail"), "discussion practice: alternatives workflow step");
expect(discussionPracticeHtml.includes("Name limitations that change reach"), "discussion practice: limitations workflow step");
expect(discussionPracticeHtml.includes("State a proportionate implication or next question"), "discussion practice: implication workflow step");
expect(discussionPracticeHtml.includes("Reconcile section boundaries"), "discussion practice: section-boundaries workflow step");
expect(discussionPracticeHtml.includes("Fictional learning example: interpret a reported pattern without making it a causal or universal claim"), "discussion practice: fictional-learning disclosure");
expect(discussionPracticeHtml.includes("This fictional learning example is invented for practice"), "discussion practice: fictional-example boundary");
expect(discussionPracticeHtml.includes("Use an interpretation record before choosing a confident sentence"), "discussion practice: interpretation-record guide");
expect(discussionPracticeHtml.includes("Finding bridge:"), "discussion practice: finding-bridge record");
expect(discussionPracticeHtml.includes("Meaning path:"), "discussion practice: meaning-path record");
expect(discussionPracticeHtml.includes("Comparison basis:"), "discussion practice: comparison-basis record");
expect(discussionPracticeHtml.includes("Reach check:"), "discussion practice: reach-check record");
expect(discussionPracticeHtml.includes("libguides.usc.edu/writingguide/discussion"), "discussion practice: USC guidance link");
expect(discussionPracticeHtml.includes("library.sacredheart.edu/c.php?g=29803"), "discussion practice: Sacred Heart guidance link");
expect(discussionPracticeHtml.includes("explore.plos.org/author-resources/how-to-write-effective-discussions-and-conclusions"), "discussion practice: PLOS guidance link");
expect(discussionPracticeHtml.includes('/how-to-write-discussion-section/'), "discussion practice: deep-guide return link");
expect(discussionPracticeHtml.includes('/results-section-example-research-paper/'), "discussion practice: results-example link");
expect(discussionPracticeHtml.includes('/methodology-section-example-research-paper/'), "discussion practice: methodology-example link");
expect(discussionPracticeHtml.includes('/phrases/discussion/'), "discussion practice: discussion-phrases link");
expect(discussionPracticeHtml.includes('/hedging-language-academic-writing/'), "discussion practice: hedging link");
expect(discussionPracticeHtml.includes('/conclusion-section-example-research-paper/'), "discussion practice: conclusion-example link");
expect(discussionPracticeHtml.includes('/academic-argument-evidence/'), "discussion practice: argument-evidence link");
expect(discussionPracticeHtml.includes('/literature-review-synthesis-matrix/'), "discussion practice: synthesis-matrix link");
expect(discussionPracticeHtml.includes('/research-question-examples/'), "discussion practice: research-question link");
expect(discussionPracticeHtml.includes('/research-gap-examples/'), "discussion practice: research-gap link");
expect(discussionPracticeHtml.includes('/academic-integrity-and-source-use/'), "discussion practice: source-use link");
expect(discussionPracticeHtml.includes('/citations/'), "discussion practice: citations link");
const discussionGuideHtml = read("how-to-write-discussion-section/index.html");
expect(discussionGuideHtml.includes("Fictional learning example"), "discussion guide: fictional-example disclosure");
expect(discussionGuideHtml.includes("libguides.usc.edu/writingguide/discussion"), "discussion guide: USC guidance link");
expect(discussionGuideHtml.includes("explore.plos.org"), "discussion guide: PLOS guidance link");
expect(discussionGuideHtml.includes("guides.lib.uci.edu"), "discussion guide: UC Irvine guidance link");
expect(discussionGuideHtml.includes('/results-section-example-research-paper/'), "discussion guide: results cluster link");
expect(discussionGuideHtml.includes('/discussion-section-example-research-paper/'), "discussion guide: example cluster link");
expect(discussionGuideHtml.includes('/phrases/discussion/'), "discussion guide: phrase cluster link");
const conclusionPracticeHtml = read("conclusion-section-example-research-paper/index.html");
expect(conclusionPracticeHtml.includes("Conclusion section example for a research paper"), "conclusion practice: expected H1");
expect(conclusionPracticeHtml.includes("How to build a Conclusion section step by step"), "conclusion practice: drafting workflow");
expect(conclusionPracticeHtml.includes("Confirm the ending task"), "conclusion practice: ending-task workflow step");
expect(conclusionPracticeHtml.includes("Return to completed question"), "conclusion practice: completed-question workflow step");
expect(conclusionPracticeHtml.includes("Synthesize evidence path"), "conclusion practice: synthesis workflow step");
expect(conclusionPracticeHtml.includes("Name bounded contribution"), "conclusion practice: contribution workflow step");
expect(conclusionPracticeHtml.includes("Keep limitations and negative detail visible"), "conclusion practice: limitations workflow step");
expect(conclusionPracticeHtml.includes("Explain why answer matters"), "conclusion practice: significance workflow step");
expect(conclusionPracticeHtml.includes("Place future research once"), "conclusion practice: future-research workflow step");
expect(conclusionPracticeHtml.includes("Run no-new-material check"), "conclusion practice: new-material workflow step");
expect(conclusionPracticeHtml.includes("Fictional learning example: close a completed paper without inflating contribution"), "conclusion practice: fictional-learning disclosure");
expect(conclusionPracticeHtml.includes("This fictional learning example is invented for practice"), "conclusion practice: fictional-example boundary");
expect(conclusionPracticeHtml.includes("Use a final synthesis record before you end the draft"), "conclusion practice: final-synthesis record");
expect(conclusionPracticeHtml.includes("Question-to-answer check:"), "conclusion practice: question-to-answer record");
expect(conclusionPracticeHtml.includes("Contribution check:"), "conclusion practice: contribution record");
expect(conclusionPracticeHtml.includes("Reach check:"), "conclusion practice: reach record");
expect(conclusionPracticeHtml.includes("New-material check:"), "conclusion practice: new-material record");
expect(conclusionPracticeHtml.includes("libguides.usc.edu/writingguide/conclusion"), "conclusion practice: USC guidance link");
expect(conclusionPracticeHtml.includes("library.sacredheart.edu/c.php?g=29803"), "conclusion practice: Sacred Heart guidance link");
expect(conclusionPracticeHtml.includes("writingcenter.fas.harvard.edu/conclusions"), "conclusion practice: Harvard guidance link");
expect(conclusionPracticeHtml.includes('/how-to-write-discussion-section/'), "conclusion practice: discussion-guide link");
expect(conclusionPracticeHtml.includes('/discussion-section-example-research-paper/'), "conclusion practice: discussion-example link");
expect(conclusionPracticeHtml.includes('/results-section-example-research-paper/'), "conclusion practice: results-example link");
expect(conclusionPracticeHtml.includes('/research-question-examples/'), "conclusion practice: research-question link");
expect(conclusionPracticeHtml.includes('/research-gap-examples/'), "conclusion practice: research-gap link");
expect(conclusionPracticeHtml.includes('/literature-review-synthesis-matrix/'), "conclusion practice: synthesis-matrix link");
expect(conclusionPracticeHtml.includes('/phrases/conclusion/'), "conclusion practice: conclusion-phrases link");
expect(conclusionPracticeHtml.includes('/hedging-language-academic-writing/'), "conclusion practice: hedging link");
expect(conclusionPracticeHtml.includes('/academic-argument-evidence/'), "conclusion practice: argument-evidence link");
expect(conclusionPracticeHtml.includes('/academic-integrity-and-source-use/'), "conclusion practice: source-use link");
expect(conclusionPracticeHtml.includes('/citations/'), "conclusion practice: citations link");
expect(conclusionPracticeHtml.includes('/how-to-write-an-abstract-research-paper/'), "conclusion practice: abstract-guide link");
const thesisGuideHtml = read("thesis-statement-examples/index.html");
expect(thesisGuideHtml.includes("Fictional learning example"), "thesis guide: fictional-example disclosure");
expect(thesisGuideHtml.includes("This fictional learning example is invented for practice"), "thesis guide: fictional learning boundary");
expect(thesisGuideHtml.includes("Move from task and evidence to a supportable working thesis"), "thesis guide: working-thesis workflow");
expect(thesisGuideHtml.includes("Confirm assignment and reader"), "thesis guide: assignment workflow step");
expect(thesisGuideHtml.includes("Frame problem worth answering"), "thesis guide: problem workflow step");
expect(thesisGuideHtml.includes("Study available material"), "thesis guide: evidence workflow step");
expect(thesisGuideHtml.includes("Choose kind of claim"), "thesis guide: claim-type workflow step");
expect(thesisGuideHtml.includes("State provisional answer"), "thesis guide: working-claim workflow step");
expect(thesisGuideHtml.includes("Set scope and certainty"), "thesis guide: scope workflow step");
expect(thesisGuideHtml.includes("Map reasons and challenges"), "thesis guide: support workflow step");
expect(thesisGuideHtml.includes("Revise against completed paper"), "thesis guide: revision workflow step");
expect(thesisGuideHtml.includes("writingcenter.fas.harvard.edu"), "thesis guide: Harvard guidance link");
expect(thesisGuideHtml.includes("writingcenter.unc.edu"), "thesis guide: UNC guidance link");
expect(thesisGuideHtml.includes("owl.purdue.edu"), "thesis guide: Purdue guidance link");
expect(thesisGuideHtml.includes('/hedging-language-academic-writing/'), "thesis guide: hedging link");
expect(thesisGuideHtml.includes('/academic-integrity-and-source-use/'), "thesis guide: source-use link");
expect(thesisGuideHtml.includes('/citations/'), "thesis guide: citations link");

const resultsPracticeHtml = read(
  "results-section-example-research-paper/index.html"
);
expect(
  resultsPracticeHtml.includes("Fictional quantitative example"),
  "results practice: fictional example in raw HTML"
);
expect(
  resultsPracticeHtml.includes("library.sacredheart.edu"),
  "results practice: university guidance link"
);
expect(
  resultsPracticeHtml.includes("How to write a Results section for a research paper"),
  "results practice: GSC-aligned how-to intent"
);
expect(
  resultsPracticeHtml.includes("results section sample"),
  "results practice: sample-query keyword metadata"
);
expect(
  resultsPracticeHtml.includes("How to build a Results section step by step"),
  "results practice: drafting workflow"
);
expect(resultsPracticeHtml.includes("Reopen the research question"), "results practice: question-led reporting workflow");
expect(resultsPracticeHtml.includes("Include meaningful exceptions"), "results practice: negative-results workflow");
expect(resultsPracticeHtml.includes("Preserve the Discussion boundary"), "results practice: reporting-interpretation boundary");
expect(resultsPracticeHtml.includes("Fictional qualitative learning example"), "results practice: qualitative fictional-example disclosure");
expect(resultsPracticeHtml.includes("Make displays do work, not repeat the paragraph"), "results practice: display-use workflow");
expect(resultsPracticeHtml.includes("guides.lib.uci.edu/scientificwriting/results"), "results practice: UCI Results guidance link");
expect(resultsPracticeHtml.includes("library.sacredheart.edu"), "results practice: Sacred Heart Results guidance link");
expect(
  resultsPracticeHtml.includes('/how-to-write-discussion-section/'),
  "results practice: discussion-transition link"
);
expect(resultsPracticeHtml.includes('/methodology-section-example-research-paper/'), "results practice: methodology-path link");
expect(resultsPracticeHtml.includes('/research-question-examples/'), "results practice: research-question link");
expect(resultsPracticeHtml.includes('/hedging-language-academic-writing/'), "results practice: hedging link");
expect(resultsPracticeHtml.includes('/academic-argument-evidence/'), "results practice: argument-evidence link");
const methodologyPracticeHtml = read(
  "methodology-section-example-research-paper/index.html"
);
expect(
  methodologyPracticeHtml.includes("Fictional methodology example"),
  "methodology practice: fictional example in raw HTML"
);
expect(
  methodologyPracticeHtml.includes(
    "libguides.usc.edu/writingguide/methodology"
  ),
  "methodology practice: USC guidance link"
);
expect(
  methodologyPracticeHtml.includes("How to write a Methodology section for a research paper"),
  "methodology practice: GSC-aligned how-to intent"
);
expect(
  methodologyPracticeHtml.includes("sample methodology section"),
  "methodology practice: sample-query keyword metadata"
);
expect(
  methodologyPracticeHtml.includes("How to build a Methodology section step by step"),
  "methodology practice: drafting workflow"
);
expect(methodologyPracticeHtml.includes("Reopen the research question"), "methodology practice: question-led workflow");
expect(methodologyPracticeHtml.includes("Match design to the task"), "methodology practice: design-fit workflow");
expect(methodologyPracticeHtml.includes("Make the selection path visible"), "methodology practice: selection-transparency workflow");
expect(methodologyPracticeHtml.includes("Record what actually happened"), "methodology practice: completed-actions workflow");
expect(methodologyPracticeHtml.includes("Trace the analysis route"), "methodology practice: analysis-transparency workflow");
expect(methodologyPracticeHtml.includes("Name limits and safeguards"), "methodology practice: limitations-safeguards workflow");
expect(methodologyPracticeHtml.includes("Fictional learning example: secondary-data route"), "methodology practice: secondary-data fictional-example disclosure");
expect(methodologyPracticeHtml.includes("Use a transparency record before drafting"), "methodology practice: transparency-record check");
expect(
  methodologyPracticeHtml.includes("never invent approval"),
  "methodology practice: research-responsibility boundary"
);
expect(methodologyPracticeHtml.includes("library.sacredheart.edu"), "methodology practice: Sacred Heart guidance link");
expect(methodologyPracticeHtml.includes('/research-question-examples/'), "methodology practice: research-question link");
expect(methodologyPracticeHtml.includes('/results-section-example-research-paper/'), "methodology practice: results-path link");
expect(methodologyPracticeHtml.includes('/academic-integrity-and-source-use/'), "methodology practice: source-use link");
expect(methodologyPracticeHtml.includes('/research-paper-sections/'), "methodology practice: sections-contract link");
expect(
  researchPaperSectionsHtml.includes("How to write Methods and Methodology"),
  "research-paper sections: methodology how-to entry"
);
expect(
  researchPaperSectionsHtml.includes("How to write a Results section"),
  "research-paper sections: results how-to entry"
);

const nonEnglishApaHtml = read("apa-7-non-english-sources/index.html");
expect(nonEnglishApaHtml.includes("Fictional learning examples"), "APA non-English sources: fictional-example disclosure");
expect(nonEnglishApaHtml.includes("This fictional learning example is invented for practice"), "APA non-English sources: fictional learning boundary");
expect(nonEnglishApaHtml.includes("Build the APA reference from the version you actually used"), "APA non-English sources: version workflow");
expect(nonEnglishApaHtml.includes("Confirm the writing and citation requirement"), "APA non-English sources: requirement workflow step");
expect(nonEnglishApaHtml.includes("Identify the exact version consulted"), "APA non-English sources: version workflow step");
expect(nonEnglishApaHtml.includes("Verify the original source record"), "APA non-English sources: source-record workflow step");
expect(nonEnglishApaHtml.includes("Choose the correct language path"), "APA non-English sources: language-path workflow step");
expect(nonEnglishApaHtml.includes("Transliterate non-Roman titles carefully"), "APA non-English sources: transliteration workflow step");
expect(nonEnglishApaHtml.includes("Add only required title translation"), "APA non-English sources: title-translation workflow step");
expect(nonEnglishApaHtml.includes("Match in-text citation and reference"), "APA non-English sources: in-text-match workflow step");
expect(nonEnglishApaHtml.includes("Reverse-check against official guidance"), "APA non-English sources: official-check workflow step");
expect(nonEnglishApaHtml.includes("Use a version-and-language record before formatting"), "APA non-English sources: version-record checklist");
expect(nonEnglishApaHtml.includes("apastyle.apa.org"), "APA non-English sources: official APA guidance link");
expect(nonEnglishApaHtml.includes("library.unimelb.edu.au"), "APA non-English sources: university guide link");
expect(nonEnglishApaHtml.includes('/citation-examples/'), "APA non-English sources: APA examples link");
expect(nonEnglishApaHtml.includes('/citations/'), "APA non-English sources: citations link");
expect(nonEnglishApaHtml.includes('/evaluate-academic-sources/'), "APA non-English sources: source-evaluation link");
expect(nonEnglishApaHtml.includes('/how-to-paraphrase-without-plagiarizing/'), "APA non-English sources: paraphrasing link");
expect(nonEnglishApaHtml.includes('/academic-integrity-and-source-use/'), "APA non-English sources: source-use link");
expect(nonEnglishApaHtml.includes('/annotated-bibliography-example/'), "APA non-English sources: annotated-bibliography link");

const methodologyFaqHtml = read("blog/methodology-section-faq-for-research-papers/index.html");
expect(methodologyFaqHtml.includes('"@type":"FAQPage"'), "methodology FAQ: FAQPage JSON-LD");
expect(methodologyFaqHtml.includes("How do you write a methodology section for a research paper?"), "methodology FAQ: visible question in JSON-LD");
expect(methodologyFaqHtml.includes("How do I write about ethics without inventing approval?"), "methodology FAQ: ethics question in JSON-LD");

const methodologyVsMethodsHtml = read("methodology-vs-methods-research-paper/index.html");
expect(methodologyVsMethodsHtml.includes("Fictional learning example"), "methodology vs methods: fictional-example disclosure");
expect(methodologyVsMethodsHtml.includes("This fictional learning example is invented for practice"), "methodology vs methods: fictional learning boundary");
expect(methodologyVsMethodsHtml.includes("Make design, procedure, and rationale traceable"), "methodology vs methods: traceability workflow");
expect(methodologyVsMethodsHtml.includes("Confirm section task and convention"), "methodology vs methods: section-task workflow step");
expect(methodologyVsMethodsHtml.includes("Re-state question and design boundary"), "methodology vs methods: question-design workflow step");
expect(methodologyVsMethodsHtml.includes("Identify materials, data, participants, or cases"), "methodology vs methods: selection workflow step");
expect(methodologyVsMethodsHtml.includes("Describe procedure chronologically"), "methodology vs methods: procedure workflow step");
expect(methodologyVsMethodsHtml.includes("Explain analysis path"), "methodology vs methods: analysis workflow step");
expect(methodologyVsMethodsHtml.includes("Give proportionate rationale"), "methodology vs methods: rationale workflow step");
expect(methodologyVsMethodsHtml.includes("State limitations and ethics honestly"), "methodology vs methods: limitation-ethics workflow step");
expect(methodologyVsMethodsHtml.includes("Separate method from results and reverse-check"), "methodology vs methods: boundary workflow step");
expect(methodologyVsMethodsHtml.includes("libguides.usc.edu"), "methodology vs methods: USC guidance link");
expect(methodologyVsMethodsHtml.includes('/research-question-examples/'), "methodology vs methods: research-question link");
expect(methodologyVsMethodsHtml.includes('/research-proposal-template/'), "methodology vs methods: proposal link");
expect(methodologyVsMethodsHtml.includes('/academic-integrity-and-source-use/'), "methodology vs methods: source-use link");
expect(methodologyVsMethodsHtml.includes('/citations/'), "methodology vs methods: citations link");

const annotatedBibliographyHtml = read("annotated-bibliography-example/index.html");
expect(annotatedBibliographyHtml.includes("Fictional learning example"), "annotated bibliography: fictional-example disclosure");
expect(annotatedBibliographyHtml.includes("This fictional learning example is invented for practice"), "annotated bibliography: fictional learning boundary");
expect(annotatedBibliographyHtml.includes("Build an annotation from a verified source record"), "annotated bibliography: source-record workflow");
expect(annotatedBibliographyHtml.includes("Confirm the annotation task"), "annotated bibliography: task workflow step");
expect(annotatedBibliographyHtml.includes("Verify the original source record"), "annotated bibliography: original-source workflow step");
expect(annotatedBibliographyHtml.includes("Identify the source&apos;s specific job"), "annotated bibliography: source-job workflow step");
expect(annotatedBibliographyHtml.includes("Write an accurate, bounded summary"), "annotated bibliography: summary workflow step");
expect(annotatedBibliographyHtml.includes("Evaluate on a named criterion"), "annotated bibliography: evaluation workflow step");
expect(annotatedBibliographyHtml.includes("Reflect on a specific research use"), "annotated bibliography: reflection workflow step");
expect(annotatedBibliographyHtml.includes("Compare only when assignment calls for it"), "annotated bibliography: comparison workflow step");
expect(annotatedBibliographyHtml.includes("Verify format, attribution, and boundaries"), "annotated bibliography: attribution-boundary workflow step");
expect(annotatedBibliographyHtml.includes("Use a source record before drafting"), "annotated bibliography: source-record checklist");
expect(annotatedBibliographyHtml.includes("writingcenter.unc.edu"), "annotated bibliography: UNC guidance link");
expect(annotatedBibliographyHtml.includes("writingcenter.gmu.edu"), "annotated bibliography: university writing-center guidance link");
expect(annotatedBibliographyHtml.includes("owl.purdue.edu"), "annotated bibliography: Purdue OWL guidance link");
expect(annotatedBibliographyHtml.includes('/evaluate-academic-sources/'), "annotated bibliography: source-evaluation link");
expect(annotatedBibliographyHtml.includes('/how-to-paraphrase-without-plagiarizing/'), "annotated bibliography: paraphrasing link");
expect(annotatedBibliographyHtml.includes('/citations/'), "annotated bibliography: citations link");
expect(annotatedBibliographyHtml.includes('/literature-review-synthesis-matrix/'), "annotated bibliography: synthesis-matrix link");
expect(annotatedBibliographyHtml.includes('/literature-review-example/'), "annotated bibliography: literature-review-example link");
expect(annotatedBibliographyHtml.includes('/research-question-examples/'), "annotated bibliography: research-question link");
expect(annotatedBibliographyHtml.includes('/academic-integrity-and-source-use/'), "annotated bibliography: source-use link");
expect(annotatedBibliographyHtml.includes('/academic-argument-evidence/'), "annotated bibliography: argument link");

const mlaCitationHtml = read("mla-citation-examples/index.html");
expect(mlaCitationHtml.includes("MLA 9 citation examples"), "MLA citations: expected H1");
expect(mlaCitationHtml.includes("Build an MLA citation from verified source information"), "MLA citations: verification workflow");
expect(mlaCitationHtml.includes("Open original source"), "MLA citations: original-source workflow step");
expect(mlaCitationHtml.includes("Map relevant core elements"), "MLA citations: core-elements workflow step");
expect(mlaCitationHtml.includes("Check container relationship"), "MLA citations: container workflow step");
expect(mlaCitationHtml.includes("Match prose, parentheses, and location"), "MLA citations: in-text matching workflow step");
expect(mlaCitationHtml.includes("Review final pair"), "MLA citations: final-pair workflow step");
expect(mlaCitationHtml.includes("fictional learning examples"), "MLA citations: fictional-example disclosure");
expect(mlaCitationHtml.includes("style.mla.org/works-cited/works-cited-a-quick-guide"), "MLA citations: official Works Cited guidance link");
expect(mlaCitationHtml.includes("style.mla.org/in-text-citations-overview"), "MLA citations: official in-text guidance link");
expect(mlaCitationHtml.includes("writingcenter.gmu.edu"), "MLA citations: university writing-center guidance link");
expect(mlaCitationHtml.includes("owl.purdue.edu"), "MLA citations: Purdue OWL guidance link");
expect(mlaCitationHtml.includes('/citations/'), "MLA citations: generator link");
expect(mlaCitationHtml.includes('/citation-examples/'), "MLA citations: citation-examples hub link");
expect(mlaCitationHtml.includes('/annotated-bibliography-example/'), "MLA citations: annotated-bibliography link");
expect(mlaCitationHtml.includes('/academic-integrity-and-source-use/'), "MLA citations: source-use link");
const literatureReviewExampleHtml = read("literature-review-example/index.html");
expect(literatureReviewExampleHtml.includes("Fictional learning example"), "literature-review example: fictional-example disclosure");
expect(literatureReviewExampleHtml.includes("This fictional learning example is invented for practice"), "literature-review example: fictional learning boundary");
expect(literatureReviewExampleHtml.includes("Build a Literature Review from source relationships, not source order"), "literature-review example: synthesis workflow");
expect(literatureReviewExampleHtml.includes("Confirm the review task and reader"), "literature-review example: task-reader workflow step");
expect(literatureReviewExampleHtml.includes("Build a source relationship record"), "literature-review example: source-record workflow step");
expect(literatureReviewExampleHtml.includes("Choose an organizing lens"), "literature-review example: organizing-lens workflow step");
expect(literatureReviewExampleHtml.includes("Check evidence scope before grouping"), "literature-review example: evidence-scope workflow step");
expect(literatureReviewExampleHtml.includes("Draft a theme-led claim"), "literature-review example: theme-claim workflow step");
expect(literatureReviewExampleHtml.includes("Compare on a specific basis"), "literature-review example: comparison workflow step");
expect(literatureReviewExampleHtml.includes("Frame a bounded research limitation or next question"), "literature-review example: limitation workflow step");
expect(literatureReviewExampleHtml.includes("Verify attribution and review boundaries"), "literature-review example: attribution-boundary workflow step");
expect(literatureReviewExampleHtml.includes("Use a source relationship record before drafting"), "literature-review example: source-record checklist");
expect(literatureReviewExampleHtml.includes("writingcenter.gmu.edu"), "literature-review example: university synthesis guidance link");
expect(literatureReviewExampleHtml.includes("writingcenter.unc.edu/tips-and-tools/literature-reviews"), "literature-review example: UNC guidance link");
expect(literatureReviewExampleHtml.includes("guides.library.jhu.edu"), "literature-review example: library synthesis guidance link");
expect(literatureReviewExampleHtml.includes('/literature-review-synthesis-matrix/'), "literature-review example: synthesis-matrix link");
expect(literatureReviewExampleHtml.includes('/research-gap-examples/'), "literature-review example: research-gap return link");
expect(literatureReviewExampleHtml.includes('/research-question-examples/'), "literature-review example: research-question link");
expect(literatureReviewExampleHtml.includes('/phrases/literature-review/'), "literature-review example: phrases link");
expect(literatureReviewExampleHtml.includes('/introduction-section-example-research-paper/'), "literature-review example: introduction-example link");
expect(literatureReviewExampleHtml.includes('/academic-argument-evidence/'), "literature-review example: argument link");
expect(literatureReviewExampleHtml.includes('/hedging-language-academic-writing/'), "literature-review example: hedging link");
expect(literatureReviewExampleHtml.includes('/academic-integrity-and-source-use/'), "literature-review example: source-use link");
expect(literatureReviewExampleHtml.includes('/citations/'), "literature-review example: citations link");

const integrityHtml = read("academic-integrity-and-source-use/index.html");
expect(
  integrityHtml.includes(
    "apastyle.apa.org/style-grammar-guidelines/citations/paraphrasing"
  ),
  "academic-integrity resource: APA primary guidance link"
);
expect(
  integrityHtml.includes(
    "owl.purdue.edu/owl/research_and_citation/using_research"
  ),
  "academic-integrity resource: Purdue OWL primary guidance link"
);
expect(
  integrityHtml.includes('"@type":"WebPage"'),
  "academic-integrity resource: WebPage JSON-LD"
);

const citationExamplesHtml = read("citation-examples/index.html");
expect(
  citationExamplesHtml.includes("Fictional APA 7 learning examples"),
  "citation-examples resource: fictional-example disclosure"
);
expect(citationExamplesHtml.includes("1. Confirm what is required"), "citation-examples resource: six-step workflow");
expect(citationExamplesHtml.includes("Chicago 18:"), "citation-examples resource: multi-system selection");
expect(citationExamplesHtml.includes("What a citation generator cannot decide"), "citation-examples resource: generator-responsibility boundary");
expect(citationExamplesHtml.includes("apastyle.apa.org"), "citation-examples resource: APA guidance link");
expect(citationExamplesHtml.includes("style.mla.org"), "citation-examples resource: MLA guidance link");
expect(citationExamplesHtml.includes("chicagomanualofstyle.org"), "citation-examples resource: Chicago guidance link");
expect(citationExamplesHtml.includes('/mla-citation-examples/'), "citation-examples resource: MLA cluster link");
expect(citationExamplesHtml.includes('/chicago-citation-examples/'), "citation-examples resource: Chicago cluster link");
expect(citationExamplesHtml.includes('/ieee-citation-examples/'), "citation-examples resource: IEEE cluster link");
expect(citationExamplesHtml.includes('/apa-7-non-english-sources/'), "citation-examples resource: multilingual APA cluster link");
expect(citationExamplesHtml.includes('/academic-integrity-and-source-use/'), "citation-examples resource: source-use cluster link");
expect(
  citationExamplesHtml.includes('"@type":"BreadcrumbList"'),
  "citation-examples resource: BreadcrumbList JSON-LD"
);

const sitemap = read("sitemap-pages.xml");
expect(
  sitemap.includes(`${BASE_URL}/phrases/introduction/`),
  "sitemap: introduction phrase route"
);
expect(
  sitemap.includes(`${BASE_URL}/phrases/conclusion/`),
  "sitemap: conclusion phrase route"
);
expect(
  sitemap.includes(`${BASE_URL}/phrases/literature-review/`),
  "sitemap: literature-review phrase route"
);
expect(
  sitemap.includes(`${BASE_URL}/phrases/discussion/`),
  "sitemap: discussion phrase route"
);
expect(
  sitemap.includes(`${BASE_URL}/phrases/methods/`),
  "sitemap: methods phrase route"
);
expect(
  sitemap.includes(`${BASE_URL}/phrases/results/`),
  "sitemap: results phrase route"
);
expect(
  sitemap.includes(`${BASE_URL}/research-paper-outline-template/`),
  "sitemap: research-paper outline template"
);
expect(
  sitemap.includes(`${BASE_URL}/research-proposal-template/`),
  "sitemap: research proposal template"
);
expect(
  sitemap.includes(`${BASE_URL}/research-gap-examples/`),
  "sitemap: research gap examples"
);
expect(
  sitemap.includes(`${BASE_URL}/research-paper-sections/`),
  "sitemap: research-paper hub"
);
expect(
  sitemap.includes(`${BASE_URL}/academic-writing-for-graduate-students/`),
  "sitemap: graduate academic writing guide"
);
expect(
  sitemap.includes(`${BASE_URL}/hedging-language-academic-writing/`),
  "sitemap: hedging language guide"
);
expect(
  sitemap.includes(`${BASE_URL}/academic-english-for-esl-students/`),
  "sitemap: academic-English hub"
);
expect(
  sitemap.includes(`${BASE_URL}/annotated-bibliography-example/`),
  "sitemap: annotated bibliography example"
);
expect(
  sitemap.includes(`${BASE_URL}/academic-integrity-and-source-use/`),
  "sitemap: academic-integrity resource"
);
expect(
  sitemap.includes(`${BASE_URL}/academic-writing-examples/`),
  "sitemap: writing-examples resource"
);
expect(
  sitemap.includes(`${BASE_URL}/research-paper-templates/`),
  "sitemap: paper-templates resource"
);
expect(
  sitemap.includes(`${BASE_URL}/how-to-paraphrase-without-plagiarizing/`),
  "sitemap: paraphrasing guide"
);
expect(
  sitemap.includes(`${BASE_URL}/chicago-citation-examples/`),
  "sitemap: Chicago citation examples"
);
expect(
  sitemap.includes(`${BASE_URL}/ieee-citation-examples/`),
  "sitemap: IEEE citation examples"
);
expect(
  sitemap.includes(`${BASE_URL}/mla-citation-examples/`),
  "sitemap: MLA examples"
);
expect(
  sitemap.includes(`${BASE_URL}/literature-review-example/`),
  "sitemap: literature-review example"
);
expect(
  sitemap.includes(`${BASE_URL}/thesis-statement-examples/`),
  "sitemap: thesis statement guide"
);
expect(
  sitemap.includes(`${BASE_URL}/how-to-write-an-abstract-research-paper/`),
  "sitemap: abstract guide"
);
expect(
  sitemap.includes(`${BASE_URL}/introduction-section-example-research-paper/`),
  "sitemap: introduction practice resource"
);
expect(
  sitemap.includes(`${BASE_URL}/discussion-section-example-research-paper/`),
  "sitemap: discussion practice resource"
);
expect(
  sitemap.includes(`${BASE_URL}/how-to-write-discussion-section/`),
  "sitemap: discussion structure guide"
);
expect(
  sitemap.includes(`${BASE_URL}/conclusion-section-example-research-paper/`),
  "sitemap: conclusion practice resource"
);
expect(
  sitemap.includes(`${BASE_URL}/literature-review-synthesis-matrix/`),
  "sitemap: literature synthesis resource"
);
expect(
  sitemap.includes(`${BASE_URL}/results-section-example-research-paper/`),
  "sitemap: results practice resource"
);
expect(
  sitemap.includes(`${BASE_URL}/methodology-vs-methods-research-paper/`),
  "sitemap: methodology-vs-methods guide"
);
expect(
  sitemap.includes(`${BASE_URL}/methodology-section-example-research-paper/`),
  "sitemap: methodology practice resource"
);
expect(
  sitemap.includes(`${BASE_URL}/apa-7-non-english-sources/`),
  "sitemap: APA non-English sources guide"
);
expect(
  sitemap.includes(`${BASE_URL}/citation-examples/`),
  "sitemap: citation-examples resource"
);
expect(
  !sitemap.includes(`${BASE_URL}/phrases</loc>`),
  "sitemap: page routes use canonical trailing slash"
);

function collectCrawlerVisibleHtml(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const target = resolve(dir, entry.name);
    if (entry.isDirectory()) return collectCrawlerVisibleHtml(target);
    if (entry.name !== "index.html") return [];
    const html = readFileSync(target, "utf8");
    return html.includes('data-static-seo-fallback="true"') ? [target] : [];
  });
}

const crawlerVisibleFiles = collectCrawlerVisibleHtml(DIST);
const crawlerVisibleRoutes = new Set(
  crawlerVisibleFiles.map(file => {
    const filePath = relative(DIST, file).replace(/\\/g, "/");
    return filePath === "index.html"
      ? "/"
      : `/${filePath.replace(/\/index\.html$/, "")}/`;
  })
);
const sitemapRouteSet = new Set(
  ["sitemap-pages.xml", "sitemap-blog.xml"].flatMap(sitemapFile => {
    const sitemapXml = read(sitemapFile);
    return [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => {
      const url = match[1];
      const path = url.startsWith(BASE_URL) ? url.slice(BASE_URL.length) : url;
      return path === "/" ? "/" : `${path.replace(/\/+$/, "")}/`;
    });
  })
);
const sitemapOnlyRoutes = [...sitemapRouteSet].filter(route => !crawlerVisibleRoutes.has(route));
const staticOnlyRoutes = [...crawlerVisibleRoutes].filter(route => !sitemapRouteSet.has(route));
expect(
  sitemapOnlyRoutes.length === 0,
  `static pages: every sitemap route has crawler-visible HTML${sitemapOnlyRoutes.length ? ` (${sitemapOnlyRoutes.join(", ")})` : ""}`
);
expect(
  staticOnlyRoutes.length === 0,
  `static pages: every crawler-visible route is represented in a child sitemap${staticOnlyRoutes.length ? ` (${staticOnlyRoutes.join(", ")})` : ""}`
);

const titleRoutes = new Map();
const descriptionRoutes = new Map();
for (const file of crawlerVisibleFiles) {
  const html = readFileSync(file, "utf8");
  const filePath = relative(DIST, file).replace(/\\/g, "/");
  const route = filePath === "index.html" ? "/" : `/${filePath.replace(/\/index\.html$/, "")}/`;
  const expectedCanonical = `${BASE_URL}${route}`;
  const canonicalMatches = html.match(/<link rel="canonical" href="[^"]+" \/>/g) ?? [];
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1] ?? "";
  const description = html.match(/<meta name="description" content="([^"]+)" \/>/)?.[1] ?? "";

  expect(canonicalMatches.length === 1, `${route}: global canonical is unique`);
  expect(canonicalMatches[0] === `<link rel="canonical" href="${expectedCanonical}" />`, `${route}: global canonical matches route`);
  expect((html.match(/<h1[\s>]/g) ?? []).length === 1, `${route}: global single H1`);
  expect(Boolean(title), `${route}: global non-empty title`);
  expect(Boolean(description), `${route}: global non-empty description`);
  expect(html.includes('type="application/ld+json"'), `${route}: global JSON-LD is present`);
  expect(!html.includes("http://"), `${route}: global links avoid insecure HTTP`);

  if (title) titleRoutes.set(title, [...(titleRoutes.get(title) ?? []), route]);
  if (description) descriptionRoutes.set(description, [...(descriptionRoutes.get(description) ?? []), route]);
}
const duplicateTitles = [...titleRoutes.entries()].filter(([, routes]) => routes.length > 1);
const duplicateDescriptions = [...descriptionRoutes.entries()].filter(([, routes]) => routes.length > 1);
expect(
  duplicateTitles.length === 0,
  `static pages: titles are unique${duplicateTitles.length ? ` (${duplicateTitles.map(([title, routes]) => `${title}: ${routes.join(", ")}`).join("; ")})` : ""}`
);
expect(
  duplicateDescriptions.length === 0,
  `static pages: descriptions are unique${duplicateDescriptions.length ? ` (${duplicateDescriptions.map(([description, routes]) => `${description}: ${routes.join(", ")}`).join("; ")})` : ""}`
);

const unresolvedInternalTargets = new Set();
for (const file of crawlerVisibleFiles) {
  const html = readFileSync(file, "utf8");
  for (const match of html.matchAll(/href=["']([^"'#?]+)["']/g)) {
    const href = match[1];
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    const pathOnly = href.split(/[?#]/, 1)[0];
    if (
      pathOnly.startsWith("/assets/") ||
      pathOnly === "/favicon.svg" ||
      pathOnly === "/robots.txt" ||
      pathOnly === "/sitemap.xml" ||
      pathOnly === "/login" ||
      pathOnly === "/login/" ||
      /\\.[a-z0-9]+$/i.test(pathOnly)
    ) {
      continue;
    }
    const route = pathOnly === "/" ? "/" : `${pathOnly.replace(/\/+$/, "")}/`;
    if (!crawlerVisibleRoutes.has(route)) unresolvedInternalTargets.add(route);
  }
}
expect(
  unresolvedInternalTargets.size === 0,
  `static pages: all internal content links resolve to generated routes${unresolvedInternalTargets.size ? ` (${[...unresolvedInternalTargets].join(", ")})` : ""}`
);

if (errors.length) {
  console.error("Static SEO verification failed:");
  errors.forEach(item => console.error(`- ${item}`));
  process.exit(1);
}
console.log(`Static SEO verification passed (${checks.length} assertions).`);
