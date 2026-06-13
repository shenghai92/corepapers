# CorePapers Project Context

## Primary Repository

This is the only primary repository for the project.

- Main repo path:
  - `C:\Users\赵海升\Documents\Codex\2026-05-26\codex-google\corepapers`
- Do all code changes, commits, pushes, and verification work in this repository only.
- Do not switch to other `corepapers` copies.

Old copies that should be ignored:

- `C:\Users\赵海升\Documents\Codex\2026-05-26\codex-google\corepapers-push`
- `C:\Users\赵海升\Documents\Codex\2026-05-26\codex-google\corepapers-clone`

## Collaboration Rules

- Default communication language with the owner is Chinese.
- Page copy, landing pages, and blog articles can be written in English.
- Priorities:
  - SEO
  - indexing
  - content growth
  - conversion improvements
- Do not affect production stability.
- Avoid introducing redirect issues.
- After meaningful SEO/content work, verify locally and prefer committing changes directly.

## Current SEO / Indexing State

Already completed:

- Sitemap split is live:
  - `/sitemap.xml`
  - `/sitemap-pages.xml`
  - `/sitemap-blog.xml`
- Blog route matching issue was fixed.
- Blog indexing signals and structured data were improved.
- Sitemap/feed indexing noise was reduced.
- `ads.txt` exists and is accessible online.
- Optional GA4 is integrated.
  - Current measurement ID: `G-599JBEELPZ`
- Multiple SEO blog articles were added.
- One round of on-site high-intent keyword optimization was completed.

Additional SEO work completed on 2026-06-13:

- Core page keyword targeting was strengthened on:
  - `/`
  - `/polish`
  - `/phrases`
  - `/citations`
  - `/pricing`
  - `/blog`
- New SEO articles added:
  - `/blog/how-to-improve-academic-writing-skills-for-international-students`
  - `/blog/apa-7th-edition-citation-format-guide-with-examples`
  - `/blog/how-to-avoid-plagiarism-in-academic-writing`
- Added sitemap aliases:
  - `/google-sitemap.xml`
  - `/bing-sitemap.xml`
- `robots.txt` includes all sitemap entries.

## Search Console / Bing Notes

- Google should primarily use:
  - `https://corepapers.space/sitemap.xml`
- `sitemap-pages.xml` and `sitemap-blog.xml` can remain submitted, but the main sitemap index is the canonical submission.
- `google-sitemap.xml` is not necessary for Google Search Console. If it shows fetch issues, it can be removed from Search Console without affecting indexing.
- Bing can use:
  - `https://corepapers.space/bing-sitemap.xml`
- In Bing, sitemap index files may show `2` discovered URLs because they contain two child sitemaps. This is normal.

## Canonical / Redirect Expectations

Canonical homepage should be:

- `https://corepapers.space/`

Known redirect behavior:

- `http://corepapers.space/` -> `https://corepapers.space/`
- `https://www.corepapers.space/` -> `https://corepapers.space/`
- `http://www.corepapers.space/` currently resolves through an extra hop before landing on the canonical homepage.

This redirect classification in Google Search Console is expected and is not, by itself, an indexing bug.

## Important Files

- SEO manifest generator:
  - `scripts/generate-seo-manifests.mjs`
- Robots:
  - `client/public/robots.txt`
- Headers:
  - `client/public/_headers`
- Blog content source:
  - `client/src/content/blogArticles.ts`

## Validation Checklist

After SEO, sitemap, metadata, or content changes, prefer to run:

- `corepack pnpm check`
- `node scripts/generate-seo-manifests.mjs`
- `corepack pnpm build`

When validating production, check:

- core pages return `200`
- new article URLs return `200`
- sitemap URLs return `200`
- canonical points to `https://corepapers.space/`
- no unintended redirects were introduced

## Handoff Notes For A New Codex Account

If a new Codex account opens this repo, it should:

1. Use this repository only.
2. Read this file first.
3. Preserve production stability.
4. Continue using Chinese for collaboration by default.
5. Focus first on SEO, indexing, content, and conversion work unless the owner changes direction.

