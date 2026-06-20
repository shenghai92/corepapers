import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const BASE_URL = "https://corepapers.space";
const TODAY = new Date().toISOString().slice(0, 10);

const ROOT = resolve(process.cwd());
const BLOG_SOURCE = resolve(ROOT, "client/src/content/blogArticles.ts");
const PUBLIC_DIR = resolve(ROOT, "client/public");
const INDEX_HTML = resolve(ROOT, "client/index.html");
const BLOG_INDEX_HTML = resolve(PUBLIC_DIR, "blog", "index.html");

const HOME_SEO = {
  title:
    "CorePapers: Academic Writing Tool for International Students | Essay Polish, Phrases & Citations",
  description:
    "CorePapers helps international students fix non-native phrasing, find academic sentence templates, and generate APA, MLA, Chicago, and IEEE citations in seconds. Free to start.",
  keywords:
    "CorePapers, core papers, AI academic writing assistant, academic phrase bank, writing tools for international students, AI essay polisher, APA 7 citation generator",
  canonical: `${BASE_URL}/`,
  ogTitle:
    "CorePapers: Academic Writing Tool for International Students | Essay Polish, Phrases & Citations | CorePapers",
  ogDescription:
    "CorePapers helps international students fix non-native phrasing, find academic sentence templates, and generate APA, MLA, Chicago, and IEEE citations in seconds. Free to start.",
  twitterTitle:
    "CorePapers: Academic Writing Tool for International Students | Essay Polish, Phrases & Citations | CorePapers",
  twitterDescription:
    "CorePapers helps international students fix non-native phrasing, find academic sentence templates, and generate APA, MLA, Chicago, and IEEE citations in seconds. Free to start.",
};

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

const FAQ_SCHEMA_BY_SLUG = {
  "how-to-write-a-methodology-section-for-a-research-paper": [
    {
      question: "What is the difference between methodology and methods?",
      answer:
        "Methodology explains the overall research approach and why it fits the question, while methods are the specific tools or procedures used to collect and analyze data.",
    },
    {
      question: "How long should a methodology section be?",
      answer:
        "The length depends on the assignment and field, but it should be long enough to explain the design, data collection, and analysis clearly. For many student papers, one to three focused pages is common.",
    },
    {
      question: "What tense should I use in the methodology section?",
      answer:
        "Most methodology sections use past tense because they describe what the study did. Present tense may still appear when explaining general research conventions or definitions.",
    },
    {
      question: "Can I use first person in a methodology section?",
      answer:
        "That depends on the style guide and instructor. Some fields accept first person for clarity, while others prefer an impersonal style.",
    },
    {
      question: "What should I include in a qualitative methodology section?",
      answer:
        "A qualitative methodology section usually explains the research context, participant selection, data collection method, and coding or interpretive process used to analyze the material.",
    },
  ],
  "methodology-section-faq-for-research-papers": [
    {
      question: "How do you write a methodology section for a research paper?",
      answer:
        "A simple approach is to explain the research design, the participants or data source, the data collection method, the analysis method, and any ethics or limitations that matter.",
    },
    {
      question: "What should be included in a methods section?",
      answer:
        "Most methods sections include the research design, participants or dataset, sampling or selection criteria, tools or instruments, procedure, and analysis method.",
    },
    {
      question: "What is an example of a methodology section?",
      answer:
        "A methodology example usually states the design, identifies the participants or data, explains how the data was collected, and names the analysis approach such as thematic coding or statistical comparison.",
    },
    {
      question: "What is the difference between a methodology section and a methods section?",
      answer:
        "In many assignments the terms overlap, but methodology can refer more broadly to the logic behind the methods, while methods often refers to the practical steps taken in the study.",
    },
  ],
};

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function createUrlSet(rows) {
  const urls = rows
    .map((row) =>
      [
        "  <url>",
        `    <loc>${escapeXml(row.loc)}</loc>`,
        `    <changefreq>${row.changefreq}</changefreq>`,
        `    <priority>${row.priority}</priority>`,
        `    <lastmod>${row.lastmod}</lastmod>`,
        "  </url>",
      ].join("\n")
    )
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
    .map((entry) =>
      [
        "  <sitemap>",
        `    <loc>${escapeXml(entry.loc)}</loc>`,
        `    <lastmod>${entry.lastmod}</lastmod>`,
        "  </sitemap>",
      ].join("\n")
    )
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
    /slug:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?excerpt:\s*"([^"]+)"[\s\S]*?category:\s*"([^"]+)"[\s\S]*?tags:\s*\[([\s\S]*?)\][\s\S]*?metaDescription:\s*"([^"]+)"[\s\S]*?publishedAt:\s*"([^"]+)"/g;
  const rows = [];
  let match = articleRegex.exec(source);

  while (match) {
    const tags = match[5]
      .split(",")
      .map((tag) => tag.trim().replace(/^"|"$/g, ""))
      .filter(Boolean);

    rows.push({
      loc: `${BASE_URL}/blog/${match[1]}`,
      slug: match[1],
      title: match[2],
      excerpt: match[3],
      category: match[4],
      tags,
      metaDescription: match[6],
      changefreq: "monthly",
      priority: "0.7",
      lastmod: match[7],
    });
    match = articleRegex.exec(source);
  }

  return rows;
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
    .map((row) =>
      [
        "    <item>",
        `      <title>${escapeXml(row.title)}</title>`,
        `      <link>${escapeXml(row.loc)}</link>`,
        `      <guid>${escapeXml(row.loc)}</guid>`,
        `      <pubDate>${formatRssDate(row.lastmod)}</pubDate>`,
        `      <description>${escapeXml(row.excerpt)}</description>`,
        "    </item>",
      ].join("\n")
    )
    .join("\n\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
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

function buildJsonLdScripts(items) {
  return items
    .map(
      (item) =>
        `    <script type="application/ld+json" data-static-jsonld="true">\n${JSON.stringify(item)}\n    </script>`
    )
    .join("\n");
}

function applySeoToHtml(source, seo, jsonLdScripts = "") {
  let html = source;

  html = replaceTag(html, /<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(seo.title)}</title>`);
  html = replaceTag(
    html,
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${escapeHtml(seo.description)}" />`
  );
  html = replaceTag(
    html,
    /<meta name="keywords" content="[^"]*" \/>/,
    `<meta name="keywords" content="${escapeHtml(seo.keywords)}" />`
  );
  html = replaceTag(
    html,
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${seo.canonical}" />`
  );
  html = replaceTag(
    html,
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${seo.canonical}" />`
  );
  html = replaceTag(
    html,
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${escapeHtml(seo.ogTitle)}" />`
  );
  html = replaceTag(
    html,
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${escapeHtml(seo.ogDescription)}" />`
  );
  html = replaceTag(
    html,
    /<meta name="twitter:title" content="[^"]*" \/>/,
    `<meta name="twitter:title" content="${escapeHtml(seo.twitterTitle)}" />`
  );
  html = replaceTag(
    html,
    /<meta name="twitter:description" content="[^"]*" \/>/,
    `<meta name="twitter:description" content="${escapeHtml(seo.twitterDescription)}" />`
  );

  html = html.replace(/\n\s*<script type="application\/ld\+json" data-static-jsonld="true">[\s\S]*?<\/script>/g, "");
  if (jsonLdScripts) {
    html = html.replace("</head>", `${jsonLdScripts}\n  </head>`);
  }

  return html;
}

function createHomeIndexHtml() {
  const html = readFileSync(INDEX_HTML, "utf8");
  writeFileSync(INDEX_HTML, applySeoToHtml(html, HOME_SEO), "utf8");
}

function createBlogIndexHtml() {
  const html = readFileSync(INDEX_HTML, "utf8");
  mkdirSync(resolve(PUBLIC_DIR, "blog"), { recursive: true });
  writeFileSync(BLOG_INDEX_HTML, applySeoToHtml(html, BLOG_INDEX_SEO), "utf8");
}

function createBlogArticleHtml(rows) {
  const template = readFileSync(INDEX_HTML, "utf8");

  for (const row of rows) {
    const articleUrl = `${BASE_URL}/blog/${row.slug}`;
    const jsonLdItems = [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: row.title,
        description: row.excerpt,
        keywords: row.tags.join(", "),
        articleSection: row.category,
        mainEntityOfPage: articleUrl,
        url: articleUrl,
        datePublished: row.lastmod,
        dateModified: row.lastmod,
        inLanguage: "en",
        isAccessibleForFree: true,
        author: { "@type": "Organization", name: "CorePapers" },
        publisher: {
          "@type": "Organization",
          name: "CorePapers",
          url: BASE_URL,
        },
        about: row.tags,
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: row.title, item: articleUrl },
        ],
      },
    ];

    const faqItems = FAQ_SCHEMA_BY_SLUG[row.slug] ?? [];
    if (faqItems.length > 0) {
      jsonLdItems.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      });
    }

    const seo = {
      title: `${row.title} | CorePapers`,
      description: row.metaDescription,
      keywords: row.tags.join(", "),
      canonical: articleUrl,
      ogTitle: `${row.title} | CorePapers`,
      ogDescription: row.metaDescription,
      twitterTitle: `${row.title} | CorePapers`,
      twitterDescription: row.metaDescription,
    };

    const articleDir = resolve(PUBLIC_DIR, "blog", row.slug);
    mkdirSync(articleDir, { recursive: true });
    writeFileSync(
      resolve(articleDir, "index.html"),
      applySeoToHtml(template, seo, buildJsonLdScripts(jsonLdItems)),
      "utf8"
    );
  }
}

const blogSource = readFileSync(BLOG_SOURCE, "utf8");
const blogRows = extractBlogEntries(blogSource);
const pageRows = STATIC_PAGES.map((page) => ({
  loc: `${BASE_URL}${page.path}`,
  changefreq: page.changefreq,
  priority: page.priority,
  lastmod: TODAY,
}));

writeFileSync(resolve(PUBLIC_DIR, "sitemap-pages.xml"), createUrlSet(pageRows), "utf8");
writeFileSync(resolve(PUBLIC_DIR, "sitemap-blog.xml"), createUrlSet(blogRows), "utf8");
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
createHomeIndexHtml();
createBlogIndexHtml();
createBlogArticleHtml(blogRows);

console.log(
  `[seo] generated manifests: pages=${pageRows.length}, blog=${blogRows.length}, date=${TODAY}`
);
