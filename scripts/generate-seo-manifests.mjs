import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const BASE_URL = "https://corepapers.space";
const TODAY = new Date().toISOString().slice(0, 10);

const ROOT = resolve(process.cwd());
const BLOG_SOURCE = resolve(ROOT, "client/src/content/blogArticles.ts");
const PUBLIC_DIR = resolve(ROOT, "client/public");
const INDEX_HTML = resolve(ROOT, "client/index.html");
const BLOG_INDEX_HTML = resolve(PUBLIC_DIR, "blog", "index.html");

const BLOG_INDEX_SEO = {
  title:
    "Academic Writing Blog With ESL Essay Help, Citation Guides, and Research Writing Tips | CorePapers",
  description:
    "Read academic writing guides, ESL essay help, sentence starter examples, plagiarism advice, citation tutorials, and research paper tips for international students.",
  keywords:
    "academic writing blog, ESL essay help, academic writing tips for international students, research paper writing guide for ESL students, APA 7th edition citation format, how to avoid plagiarism in academic writing, improve academic writing skills",
  canonical: `${BASE_URL}/blog`,
  ogTitle:
    "Academic Writing Blog With ESL Essay Help, Citation Guides, and Research Writing Tips | CorePapers",
  ogDescription:
    "Read academic writing guides, ESL essay help, sentence starter examples, plagiarism advice, citation tutorials, and research paper tips for international students.",
  twitterTitle:
    "Academic Writing Blog With ESL Essay Help, Citation Guides, and Research Writing Tips | CorePapers",
  twitterDescription:
    "Read academic writing guides, ESL essay help, sentence starter examples, plagiarism advice, citation tutorials, and research paper tips for international students.",
};

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
    /slug:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?excerpt:\s*"([^"]+)"[\s\S]*?publishedAt:\s*"([^"]+)"/g;
  const rows = [];
  let match = articleRegex.exec(source);

  while (match) {
    rows.push({
      loc: `${BASE_URL}/blog/${match[1]}`,
      slug: match[1],
      title: match[2],
      excerpt: match[3],
      changefreq: "monthly",
      priority: "0.7",
      lastmod: match[4],
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

function formatRssDate(value) {
  return new Date(`${value}T00:00:00Z`).toUTCString();
}

function createRssFeed(rows) {
  const sortedRows = [...rows].sort((a, b) => b.lastmod.localeCompare(a.lastmod));
  const latestDate = sortedRows[0]?.lastmod ?? TODAY;
  const items = sortedRows
    .map((row) => {
      return [
        "    <item>",
        `      <title>${escapeXml(row.title)}</title>`,
        `      <link>${escapeXml(row.loc)}</link>`,
        `      <guid>${escapeXml(row.loc)}</guid>`,
        `      <pubDate>${formatRssDate(row.lastmod)}</pubDate>`,
        `      <description>${escapeXml(row.excerpt)}</description>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    "<rss version=\"2.0\">",
    "  <channel>",
    "    <title>CorePapers Academic Writing Blog</title>",
    `    <link>${BASE_URL}/blog</link>`,
    "    <description>Academic writing guides, citation tutorials, and ESL-friendly resources for international students.</description>",
    "    <language>en-us</language>",
    `    <lastBuildDate>${formatRssDate(latestDate)}</lastBuildDate>`,
    "",
    items,
    "  </channel>",
    "</rss>",
    "",
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

function replaceTag(source, pattern, replacement) {
  if (!pattern.test(source)) {
    throw new Error(`Missing expected HTML pattern: ${pattern}`);
  }

  return source.replace(pattern, replacement);
}

function createBlogIndexHtml() {
  let html = readFileSync(INDEX_HTML, "utf8");

  html = replaceTag(html, /<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(BLOG_INDEX_SEO.title)}</title>`);
  html = replaceTag(
    html,
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${escapeHtml(BLOG_INDEX_SEO.description)}" />`
  );
  html = replaceTag(
    html,
    /<meta name="keywords" content="[^"]*" \/>/,
    `<meta name="keywords" content="${escapeHtml(BLOG_INDEX_SEO.keywords)}" />`
  );
  html = replaceTag(
    html,
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${BLOG_INDEX_SEO.canonical}" />`
  );
  html = replaceTag(
    html,
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${BLOG_INDEX_SEO.canonical}" />`
  );
  html = replaceTag(
    html,
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${escapeHtml(BLOG_INDEX_SEO.ogTitle)}" />`
  );
  html = replaceTag(
    html,
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${escapeHtml(BLOG_INDEX_SEO.ogDescription)}" />`
  );
  html = replaceTag(
    html,
    /<meta name="twitter:title" content="[^"]*" \/>/,
    `<meta name="twitter:title" content="${escapeHtml(BLOG_INDEX_SEO.twitterTitle)}" />`
  );
  html = replaceTag(
    html,
    /<meta name="twitter:description" content="[^"]*" \/>/,
    `<meta name="twitter:description" content="${escapeHtml(BLOG_INDEX_SEO.twitterDescription)}" />`
  );

  mkdirSync(resolve(PUBLIC_DIR, "blog"), { recursive: true });
  writeFileSync(BLOG_INDEX_HTML, html, "utf8");
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
writeFileSync(resolve(PUBLIC_DIR, "feed.xml"), createRssFeed(blogRows), "utf8");
updateIndexHtml(blogRows);
createBlogIndexHtml();

console.log(
  `[seo] generated manifests: pages=${pageRows.length}, blog=${blogRows.length}, date=${TODAY}`
);
