import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

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
    "Results section example for a research paper",
  ],
  [
    "/methodology-vs-methods-research-paper/",
    "Methodology vs. methods in a research paper",
  ],
  [
    "/methodology-section-example-research-paper/",
    "Methodology section example for a research paper",
  ],
  [
    "/apa-7-non-english-sources/",
    "APA 7: cite foreign-language and translated sources",
  ],
  [
    "/citation-examples/",
    "APA 7 citation examples and in-text citation examples",
  ],
  ["/blog/", "Academic writing guides, sentence starters, and ESL essay help"],
];
pages.forEach(([route, h1]) => checkPage(route, h1));

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
const academicEnglishHubHtml = read("academic-english-for-esl-students/index.html");
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
  citationExamplesHtml.includes(
    "fictional. They demonstrate reference structure only"
  ),
  "citation-examples resource: fictional-example disclosure"
);
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

if (errors.length) {
  console.error("Static SEO verification failed:");
  errors.forEach(item => console.error(`- ${item}`));
  process.exit(1);
}
console.log(`Static SEO verification passed (${checks.length} assertions).`);
