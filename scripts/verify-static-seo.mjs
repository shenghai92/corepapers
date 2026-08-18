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
  ["/phrases/methods/", "Academic phrases for research methods sections"],
  ["/phrases/results/", "Academic phrases for reporting research results"],
  ["/citations/", "Free citation generator for APA 7, MLA, Chicago and IEEE"],
  ["/pricing/", "AI academic writing support pricing for students"],
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

const sitemap = read("sitemap-pages.xml");
expect(
  sitemap.includes(`${BASE_URL}/phrases/methods/`),
  "sitemap: methods phrase route"
);
expect(
  sitemap.includes(`${BASE_URL}/phrases/results/`),
  "sitemap: results phrase route"
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
  !sitemap.includes(`${BASE_URL}/phrases</loc>`),
  "sitemap: page routes use canonical trailing slash"
);

if (errors.length) {
  console.error("Static SEO verification failed:");
  errors.forEach(item => console.error(`- ${item}`));
  process.exit(1);
}
console.log(`Static SEO verification passed (${checks.length} assertions).`);
