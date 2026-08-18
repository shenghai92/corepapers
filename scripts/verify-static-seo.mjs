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
expect(academicParaphrasingToolHtml.includes("1. Keep the source details"), "academic paraphrasing tool: six-step workflow");
expect(academicParaphrasingToolHtml.includes("Fictional learning example"), "academic paraphrasing tool: fictional-example disclosure");
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
expect(paraphrasingGuideHtml.includes("Fictional learning example"), "paraphrasing guide: fictional-example disclosure");
expect(paraphrasingGuideHtml.includes("writingcenter.unc.edu"), "paraphrasing guide: UNC guidance link");
expect(paraphrasingGuideHtml.includes("writingcenter.gmu.edu"), "paraphrasing guide: George Mason guidance link");
expect(paraphrasingGuideHtml.includes("niu.edu/academic-integrity"), "paraphrasing guide: NIU integrity guidance link");
expect(paraphrasingGuideHtml.includes("What a paraphrasing tool cannot decide"), "paraphrasing guide: tool-responsibility boundary");
expect(paraphrasingGuideHtml.includes('/academic-integrity-and-source-use/'), "paraphrasing guide: source-use cluster link");
expect(paraphrasingGuideHtml.includes('/academic-paraphrasing-tool-for-esl-students/'), "paraphrasing guide: paraphrasing-tool cluster link");

const academicIntegrityHtml = read("academic-integrity-and-source-use/index.html");
expect(academicIntegrityHtml.includes('/how-to-paraphrase-without-plagiarizing/'), "academic integrity: paraphrasing-guide return link");

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
expect(academicWritingExamplesHtml.includes("writersworkshop.illinois.edu"), "academic writing examples: Illinois guidance link");
expect(academicWritingExamplesHtml.includes("miamioh.edu"), "academic writing examples: Miami guidance link");
expect(academicWritingExamplesHtml.includes("purdueglobalwriting.center"), "academic writing examples: Purdue Global integrity link");
expect(academicWritingExamplesHtml.includes('/thesis-statement-examples/'), "academic writing examples: thesis cluster link");
expect(academicWritingExamplesHtml.includes('/academic-paragraph-structure/'), "academic writing examples: paragraph cluster link");
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
expect(academicParagraphHtml.includes("1. Name the function"), "academic paragraphs: six-step workflow");
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
expect(thesisStatementHtml.includes("1. Read the task"), "thesis statements: five-step drafting workflow");
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
expect(researchPaperSectionsHtml.includes("psychology.ucsd.edu"), "research paper sections: UCSD guidance link");
expect(researchPaperSectionsHtml.includes("writing.wisc.edu"), "research paper sections: UW Madison guidance link");
expect(researchPaperSectionsHtml.includes("knight.as.cornell.edu"), "research paper sections: Cornell guidance link");
expect(researchPaperSectionsHtml.includes('/research-paper-outline-template/'), "research paper sections: outline cluster link");
expect(researchPaperSectionsHtml.includes('/research-proposal-template/'), "research paper sections: proposal cluster link");
expect(researchPaperSectionsHtml.includes('/literature-review-synthesis-matrix/'), "research paper sections: synthesis cluster link");

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
  sourceEvaluationHtml.includes("1. Start with task fit"),
  "source evaluation: five-step critical-reading workflow"
);
expect(
  sourceEvaluationHtml.includes("This fictional learning example contains no real sources or findings"),
  "source evaluation: fictional-example disclosure"
);
expect(sourceEvaluationHtml.includes("writingcenter.unc.edu"), "source evaluation: UNC guidance link");
expect(sourceEvaluationHtml.includes("libguides.usc.edu"), "source evaluation: USC guidance link");
expect(sourceEvaluationHtml.includes("knight.as.cornell.edu"), "source evaluation: Cornell guidance link");
expect(sourceEvaluationHtml.includes("usingsources.fas.harvard.edu"), "source evaluation: Harvard guidance link");
expect(sourceEvaluationHtml.includes('/research-question-examples/'), "source evaluation: research-question cluster link");
expect(sourceEvaluationHtml.includes('/academic-argument-evidence/'), "source evaluation: argument-evidence cluster link");
expect(sourceEvaluationHtml.includes('/annotated-bibliography-example/'), "source evaluation: annotated-bibliography cluster link");

const researchQuestionHtml = read("research-question-examples/index.html");
expect(
  researchQuestionHtml.includes("Research question examples: make a topic clear, focused, and arguable"),
  "research questions: strengthened H1"
);
expect(
  researchQuestionHtml.includes("1. Start with a broad topic"),
  "research questions: five-step planning workflow"
);
expect(
  researchQuestionHtml.includes("This is a fictional learning example only"),
  "research questions: fictional-example disclosure"
);
expect(researchQuestionHtml.includes("writingcenter.gmu.edu"), "research questions: George Mason guidance link");
expect(researchQuestionHtml.includes("hub.williams.edu"), "research questions: Williams guidance link");
expect(researchQuestionHtml.includes("writingcenter.uci.edu"), "research questions: UC Irvine guidance link");
expect(researchQuestionHtml.includes('/research-gap-examples/'), "research questions: research-gap cluster link");
expect(researchQuestionHtml.includes('/academic-argument-evidence/'), "research questions: argument-evidence cluster link");
expect(researchQuestionHtml.includes('/research-proposal-template/'), "research questions: research-proposal cluster link");

const argumentEvidenceHtml = read("academic-argument-evidence/index.html");
expect(
  argumentEvidenceHtml.includes("Academic argument and evidence: build a claim readers can follow"),
  "argument evidence: strengthened H1"
);
expect(
  argumentEvidenceHtml.includes("1. Make a defensible claim"),
  "argument evidence: four-step argument workflow"
);
expect(
  argumentEvidenceHtml.includes("All studies, authors, results, and citations in this example are invented for learning"),
  "argument evidence: fictional-example disclosure"
);
expect(argumentEvidenceHtml.includes("writingcenter.unc.edu"), "argument evidence: UNC guidance link");
expect(argumentEvidenceHtml.includes("writingcenter.tamu.edu"), "argument evidence: Texas A&M guidance link");
expect(argumentEvidenceHtml.includes("brandeis.edu/writing-program"), "argument evidence: Brandeis guidance link");
expect(argumentEvidenceHtml.includes('/research-question-examples/'), "argument evidence: research-question cluster link");
expect(argumentEvidenceHtml.includes('/hedging-language-academic-writing/'), "argument evidence: hedging cluster link");
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
expect(graduateAcademicWritingHtml.includes("gsc.upenn.edu"), "graduate academic writing: UPenn guidance link");
expect(graduateAcademicWritingHtml.includes("poorvucenter.yale.edu"), "graduate academic writing: Yale guidance link");
expect(graduateAcademicWritingHtml.includes("grad.berkeley.edu"), "graduate academic writing: UC Berkeley guidance link");
expect(graduateAcademicWritingHtml.includes("asc.dasa.ncsu.edu"), "graduate academic writing: NC State guidance link");
expect(graduateAcademicWritingHtml.includes('/academic-english-for-esl-students/'), "graduate academic writing: academic-English cluster link");
expect(graduateAcademicWritingHtml.includes('/research-proposal-template/'), "graduate academic writing: proposal cluster link");
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
expect(proposalTemplateHtml.includes("ugradresearch.uconn.edu"), "research proposal template: UConn guidance link");
expect(proposalTemplateHtml.includes("libguides.usc.edu"), "research proposal template: USC guidance link");
expect(proposalTemplateHtml.includes('/research-question-examples/'), "research proposal template: research-question link");
expect(proposalTemplateHtml.includes('/research-gap-examples/'), "research proposal template: research-gap link");

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
expect(outlineTemplateHtml.includes("owl.purdue.edu"), "research-paper outline: Purdue OWL guidance link");
expect(outlineTemplateHtml.includes("writingcenter.gmu.edu"), "research-paper outline: university writing-center guidance link");

const abstractGuideHtml = read("how-to-write-an-abstract-research-paper/index.html");
expect(abstractGuideHtml.includes("Fictional learning example"), "abstract guide: fictional-example disclosure");
expect(abstractGuideHtml.includes("writing.wisc.edu"), "abstract guide: university guidance link");
const introductionPracticeHtml = read("introduction-section-example-research-paper/index.html");
expect(introductionPracticeHtml.includes("Fictional learning example"), "introduction practice: fictional example in raw HTML");
expect(introductionPracticeHtml.includes("writingcenter.unc.edu"), "introduction practice: university guidance link");
expect(introductionPracticeHtml.includes('/research-gap-examples/'), "introduction practice: research-gap return link");
const discussionPracticeHtml = read("discussion-section-example-research-paper/index.html");
expect(discussionPracticeHtml.includes("Fictional learning example"), "discussion practice: fictional example in raw HTML");
expect(discussionPracticeHtml.includes("explore.plos.org"), "discussion practice: publisher guidance link");
expect(discussionPracticeHtml.includes('/how-to-write-discussion-section/'), "discussion practice: deep-guide return link");
const discussionGuideHtml = read("how-to-write-discussion-section/index.html");
expect(discussionGuideHtml.includes("Fictional learning example"), "discussion guide: fictional-example disclosure");
expect(discussionGuideHtml.includes("libguides.usc.edu/writingguide/discussion"), "discussion guide: USC guidance link");
expect(discussionGuideHtml.includes("explore.plos.org"), "discussion guide: PLOS guidance link");
expect(discussionGuideHtml.includes("guides.lib.uci.edu"), "discussion guide: UC Irvine guidance link");
expect(discussionGuideHtml.includes('/results-section-example-research-paper/'), "discussion guide: results cluster link");
expect(discussionGuideHtml.includes('/discussion-section-example-research-paper/'), "discussion guide: example cluster link");
expect(discussionGuideHtml.includes('/phrases/discussion/'), "discussion guide: phrase cluster link");
const conclusionPracticeHtml = read("conclusion-section-example-research-paper/index.html");
expect(conclusionPracticeHtml.includes("Fictional learning example"), "conclusion practice: fictional example in raw HTML");
expect(conclusionPracticeHtml.includes("explore.plos.org"), "conclusion practice: publisher guidance link");
const thesisGuideHtml = read("thesis-statement-examples/index.html");
expect(thesisGuideHtml.includes("Fictional learning example"), "thesis guide: fictional-example disclosure");
expect(thesisGuideHtml.includes("writingcenter.unc.edu"), "thesis guide: university guidance link");

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
expect(
  resultsPracticeHtml.includes('/how-to-write-discussion-section/'),
  "results practice: discussion-transition link"
);
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
expect(
  methodologyPracticeHtml.includes("never invent approval"),
  "methodology practice: research-responsibility boundary"
);
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
expect(nonEnglishApaHtml.includes("apastyle.apa.org"), "APA non-English sources: official APA guidance link");
expect(nonEnglishApaHtml.includes("library.unimelb.edu.au"), "APA non-English sources: university guide link");

const methodologyFaqHtml = read("blog/methodology-section-faq-for-research-papers/index.html");
expect(methodologyFaqHtml.includes('"@type":"FAQPage"'), "methodology FAQ: FAQPage JSON-LD");
expect(methodologyFaqHtml.includes("How do you write a methodology section for a research paper?"), "methodology FAQ: visible question in JSON-LD");
expect(methodologyFaqHtml.includes("How do I write about ethics without inventing approval?"), "methodology FAQ: ethics question in JSON-LD");

const methodologyVsMethodsHtml = read("methodology-vs-methods-research-paper/index.html");
expect(methodologyVsMethodsHtml.includes("Fictional learning example"), "methodology vs methods: fictional-example disclosure");
expect(methodologyVsMethodsHtml.includes("libguides.usc.edu"), "methodology vs methods: USC guidance link");

const annotatedBibliographyHtml = read("annotated-bibliography-example/index.html");
expect(annotatedBibliographyHtml.includes("Fictional learning example"), "annotated bibliography: fictional-example disclosure");
expect(annotatedBibliographyHtml.includes("writingcenter.unc.edu"), "annotated bibliography: UNC guidance link");
expect(annotatedBibliographyHtml.includes("writingcenter.gmu.edu"), "annotated bibliography: university writing-center guidance link");
expect(annotatedBibliographyHtml.includes("owl.purdue.edu"), "annotated bibliography: Purdue OWL guidance link");

const mlaCitationHtml = read("mla-citation-examples/index.html");
expect(mlaCitationHtml.includes("fictional learning examples"), "MLA citations: fictional-example disclosure");
expect(mlaCitationHtml.includes("style.mla.org"), "MLA citations: official MLA guidance link");
expect(mlaCitationHtml.includes("writingcenter.gmu.edu"), "MLA citations: university writing-center guidance link");
const literatureReviewExampleHtml = read("literature-review-example/index.html");
expect(literatureReviewExampleHtml.includes("Fictional learning example"), "literature-review example: fictional-example disclosure");
expect(literatureReviewExampleHtml.includes("writingcenter.gmu.edu"), "literature-review example: university synthesis guidance link");
expect(literatureReviewExampleHtml.includes("guides.library.jhu.edu"), "literature-review example: library synthesis guidance link");
expect(literatureReviewExampleHtml.includes('/research-gap-examples/'), "literature-review example: research-gap return link");

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
