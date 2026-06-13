import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const BASE_URL = "https://corepapers.space";
const TODAY = new Date().toISOString().slice(0, 10);

const ROOT = resolve(process.cwd());
const BLOG_SOURCE = resolve(ROOT, "client/src/content/blogArticles.ts");
const PUBLIC_DIR = resolve(ROOT, "client/public");
const INDEX_HTML = resolve(ROOT, "client/index.html");

const STATIC_PAGES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/polish", changefreq: "monthly", priority: "0.9" },
  { path: "/phrases", changefreq: "monthly", priority: "0.9" },
  { path: "/citations", changefreq: "monthly", priority: "0.9" },
  { path: "/pricing", changefreq: "monthly", priority: "0.8" },
  { path: "/about", changefreq: "monthly", priority: "0.5" },
  { path: "/privacy", changefreq: "yearly", priority: "0.4" },
  { path: "/terms", changefreq: "yearly", priority: "0.4" },
  { path: "/blog", changefreq: "weekly", priority: "0.8" },
  { path: "/apa-citation-generator-for-international-students", changefreq: "monthly", priority: "0.9" },
  { path: "/ai-essay-polisher-for-non-native-english-writers", changefreq: "monthly", priority: "0.9" },
  { path: "/academic-paraphrasing-tool-for-esl-students", changefreq: "monthly", priority: "0.9" },
  { path: "/academic-writing-alternative-for-international-students", changefreq: "monthly", priority: "0.8" },
  { path: "/paraphrasing-alternative-for-academic-writing", changefreq: "monthly", priority: "0.8" },
];

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function createUrlSet(rows) {
  const urls = rows
    .map((row) => {
      return [
        "  <url>",
        `    <loc>${escapeXml(row.loc)}</loc>`,
        `    <changefreq>${row.changefreq}</changefreq>`,
        `    <priority>${row.priority}</priority>`,
        `    <lastmod>${row.lastmod}</lastmod>`,
        "  </url>",
      ].join("\n");
    })
    .join("\n\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    "",
    urls,
    "",
    "</urlset>",
    "",
  ].join("\n");
}

function createSitemapIndex(entries) {
  const body = entries
    .map((entry) => {
      return [
        "  <sitemap>",
        `    <loc>${escapeXml(entry.loc)}</loc>`,
        `    <lastmod>${entry.lastmod}</lastmod>`,
        "  </sitemap>",
      ].join("\n");
    })
    .join("\n\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    "",
    body,
    "",
    "</sitemapindex>",
    "",
  ].join("\n");
}

function extractBlogEntries(source) {
  const articleRegex =
    /slug:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?publishedAt:\s*"([^"]+)"/g;
  const rows = [];
  let match = articleRegex.exec(source);

  while (match) {
    rows.push({
      loc: `${BASE_URL}/blog/${match[1]}`,
      slug: match[1],
      title: match[2],
      changefreq: "monthly",
      priority: "0.7",
      lastmod: match[3],
    });
    match = articleRegex.exec(source);
  }

  return rows;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function createDiscoveryLinks(rows) {
  const items = rows
    .map(
      (row) =>
        `        <li><a href="/blog/${escapeHtml(row.slug)}">${escapeHtml(row.title)}</a></li>`
    )
    .join("\n");

  return [
    "    <!-- BLOG_DISCOVERY_LINKS_START -->",
    "    <noscript>",
    '      <nav aria-label="Blog article discovery links">',
    "        <p>CorePapers academic writing guides:</p>",
    "        <ul>",
    items,
    "        </ul>",
    "      </nav>",
    "    </noscript>",
    "    <!-- BLOG_DISCOVERY_LINKS_END -->",
  ].join("\n");
}

function updateIndexHtml(blogRows) {
  const indexHtml = readFileSync(INDEX_HTML, "utf8");
  const discoveryBlock = createDiscoveryLinks(blogRows);
  const pattern =
    /[ \t]*<!-- BLOG_DISCOVERY_LINKS_START -->[\s\S]*?<!-- BLOG_DISCOVERY_LINKS_END -->/;

  if (!pattern.test(indexHtml)) {
    throw new Error("Missing blog discovery markers in client/index.html");
  }

  writeFileSync(INDEX_HTML, indexHtml.replace(pattern, discoveryBlock), "utf8");
}

const blogSource = readFileSync(BLOG_SOURCE, "utf8");
const blogRows = extractBlogEntries(blogSource);
const pageRows = STATIC_PAGES.map((page) => ({
  loc: `${BASE_URL}${page.path}`,
  changefreq: page.changefreq,
  priority: page.priority,
  lastmod: TODAY,
}));

writeFileSync(
  resolve(PUBLIC_DIR, "sitemap-pages.xml"),
  createUrlSet(pageRows),
  "utf8"
);
writeFileSync(
  resolve(PUBLIC_DIR, "sitemap-blog.xml"),
  createUrlSet(blogRows),
  "utf8"
);
writeFileSync(
  resolve(PUBLIC_DIR, "sitemap.xml"),
  createSitemapIndex([
    { loc: `${BASE_URL}/sitemap-pages.xml`, lastmod: TODAY },
    { loc: `${BASE_URL}/sitemap-blog.xml`, lastmod: TODAY },
  ]),
  "utf8"
);
writeFileSync(
  resolve(PUBLIC_DIR, "google-sitemap.xml"),
  createSitemapIndex([
    { loc: `${BASE_URL}/sitemap-pages.xml`, lastmod: TODAY },
    { loc: `${BASE_URL}/sitemap-blog.xml`, lastmod: TODAY },
  ]),
  "utf8"
);
writeFileSync(
  resolve(PUBLIC_DIR, "bing-sitemap.xml"),
  createSitemapIndex([
    { loc: `${BASE_URL}/sitemap-pages.xml`, lastmod: TODAY },
    { loc: `${BASE_URL}/sitemap-blog.xml`, lastmod: TODAY },
  ]),
  "utf8"
);
updateIndexHtml(blogRows);

console.log(
  `[seo] generated sitemaps: pages=${pageRows.length}, blog=${blogRows.length}, date=${TODAY}`
);
