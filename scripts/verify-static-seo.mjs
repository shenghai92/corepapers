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
    "/research-paper-sections/",
    "How to write each section of a research paper",
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
    "/conclusion-section-example-research-paper/",
    "Conclusion section example for a research paper",
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
  resultsHtml.includes("Results Section Example: Quantitative Study"),
  "results article: quantitative example in raw HTML"
);
expect(
  resultsHtml.includes("Results Section Example: Qualitative Study"),
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
const discussionPracticeHtml = read("discussion-section-example-research-paper/index.html");
expect(discussionPracticeHtml.includes("Fictional learning example"), "discussion practice: fictional example in raw HTML");
expect(discussionPracticeHtml.includes("explore.plos.org"), "discussion practice: publisher guidance link");
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
  sitemap.includes(`${BASE_URL}/research-paper-sections/`),
  "sitemap: research-paper hub"
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
  sitemap.includes(`${BASE_URL}/mla-citation-examples/`),
  "sitemap: MLA citation examples"
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
