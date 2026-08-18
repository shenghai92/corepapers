const BASE_URL = "https://corepapers.space";

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatInline(value = "") {
  return escapeHtml(value)
    .replace(/\[([^\]]+)\]\((\/[^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
}

function markdownToHtml(markdown = "") {
  const lines = markdown.split("\n");
  const html = [];
  let listOpen = false;

  const closeList = () => {
    if (listOpen) {
      html.push("</ul>");
      listOpen = false;
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      closeList();
      continue;
    }
    if (line.startsWith("## ")) {
      closeList();
      html.push(`<h2>${formatInline(line.slice(3))}</h2>`);
      continue;
    }
    if (line.startsWith("### ")) {
      closeList();
      html.push(`<h3>${formatInline(line.slice(4))}</h3>`);
      continue;
    }
    if (line.startsWith("- ")) {
      if (!listOpen) {
        html.push("<ul>");
        listOpen = true;
      }
      html.push(`<li>${formatInline(line.slice(2))}</li>`);
      continue;
    }
    closeList();
    html.push(`<p>${formatInline(line)}</p>`);
  }
  closeList();
  return html.join("\n");
}

function pageShell(content) {
  return `
    <a class="skip-link" href="#main-content">Skip to content</a>
    <header class="seo-header">
      <nav aria-label="Primary navigation">
        <a class="brand" href="/">CorePapers</a>
        <a href="/polish/">Essay Polish</a>
        <a href="/phrases/">Phrase Library</a>
        <a href="/citations/">Citation Generator</a>
        <a href="/pricing/">Pricing</a>
        <a href="/blog/">Blog</a>
      </nav>
    </header>
    <main id="main-content" class="seo-main">${content}</main>
    <footer class="seo-footer">
      <p>CorePapers is an academic writing assistant for international students and non-native English writers.</p>
      <p><a href="/about/">About</a> · <a href="/editorial-policy/">Editorial policy</a> · <a href="/contact/">Contact</a> · <a href="/privacy/">Privacy</a></p>
    </footer>`;
}

const tools = `
  <section class="seo-callout" aria-label="CorePapers tools">
    <h2>Choose the next step for your draft</h2>
    <ul>
      <li><a href="/polish/">Polish an academic paragraph</a> when your English sounds literal, unclear, or too informal.</li>
      <li><a href="/phrases/">Browse academic phrase templates</a> for introductions, methods, results, discussion, and literature reviews.</li>
      <li><a href="/citations/">Generate a citation</a> after you have checked the details of your original source.</li>
    </ul>
  </section>`;

const PAGE_CONTENT = {
  "/": `
    <p class="eyebrow">Academic writing support for international students</p>
    <h1>Improve academic English without losing your meaning</h1>
    <p class="lead">CorePapers helps non-native English writers revise translated phrasing, use clearer academic language, and format citations while keeping control of the ideas in their own essays, reports, and research papers.</p>
    <p><a class="button" href="/polish/">Try Essay Polish</a> <a class="button secondary" href="/phrases/">Find academic phrases</a></p>
    <section>
      <h2>Built for real academic writing tasks</h2>
      <div class="seo-grid">
        <article><h3>Revise a draft</h3><p>Find non-native phrasing, make vocabulary more precise, and understand why a suggested revision is stronger.</p><p><a href="/polish/">Use Essay Polish</a></p></article>
        <article><h3>Write a research-paper section</h3><p>Use examples and sentence patterns for introductions, methods, results, discussion, and literature reviews.</p><p><a href="/research-paper-sections/">Explore research paper sections</a></p></article>
        <article><h3>Use sources responsibly</h3><p>Build references in APA, MLA, Chicago, and IEEE, then review the source details before submitting.</p><p><a href="/citations/">Open Citation Generator</a></p></article>
      </div>
    </section>
    <section>
      <h2>Academic support, not a substitute for your work</h2>
      <p>CorePapers is designed to support revision and learning. You remain responsible for the accuracy of your content, your citations, and compliance with your university's academic-integrity policy.</p>
    </section>
    ${tools}`,
  "/polish/": `
    <p class="eyebrow">AI-powered academic revision</p>
    <h1>AI essay polisher for clearer academic English</h1>
    <p class="lead">Paste an essay, report, or research paragraph to identify non-native expressions, improve academic tone, and review sentence-level explanations before you submit.</p>
    <p><a class="button" href="/login/">Start free</a></p>
    <section><h2>What Essay Polish helps you review</h2><ul><li><strong>Mother-tongue interference:</strong> expressions that sound translated rather than natural in academic English.</li><li><strong>Academic vocabulary:</strong> wording that is more precise without making your writing sound artificial.</li><li><strong>Revision explanations:</strong> feedback that helps you decide whether to accept a change and learn from it.</li></ul></section>
    <section><h2>Use it after you have written the idea</h2><p>Start with your own draft. Review suggestions carefully, preserve the meaning you intend, and check that any source-based claims still have accurate citations.</p></section>
    ${tools}`,
  "/phrases/": `
    <p class="eyebrow">Academic phrase library</p>
    <h1>Academic phrase bank with sentence starters for essays and research papers</h1>
    <p class="lead">Find discipline-aware sentence templates for research aims, methods, results, literature reviews, discussion sections, and careful academic claims.</p>
    <section><h2>Browse phrase collections by research-paper task</h2><div class="seo-grid"><article><h3><a href="/phrases/methods/">Methods phrases</a></h3><p>Describe a design, data collection, participants, and analysis with appropriately precise language.</p></article><article><h3><a href="/phrases/results/">Results phrases</a></h3><p>Report findings, tables, and statistical patterns without moving too early into discussion.</p></article><article><h3><a href="/blog/how-to-use-hedging-language-in-academic-writing/">Hedging language</a></h3><p>Choose measured language when the evidence suggests rather than proves a claim.</p></article></div></section>
    <section><h2>Use phrase templates responsibly</h2><p>Adapt every template to your evidence, discipline, and assignment. A useful phrase cannot replace your analysis or the source citations that support a claim.</p></section>
    ${tools}`,
  "/phrases/methods/": `
    <p class="eyebrow">Academic phrase library · Methods</p>
    <h1>Academic phrases for research methods sections</h1>
    <p class="lead">Use these sentence starters to explain a research design, data collection process, sample, instrument, and analysis method in clear academic English.</p>
    <section><h2>Describe your research design</h2><ul><li>This study used a [qualitative/quantitative/mixed-methods] design to examine [X].</li><li>The research adopted a [design] approach because it allowed the study to [purpose].</li><li>Data were collected from [participants/data source] between [time period].</li></ul></section>
    <section><h2>Explain data collection and analysis</h2><ul><li>Participants were recruited using [sampling method] and met the following criteria: [criteria].</li><li>Data were collected through [interviews/surveys/observations/document analysis].</li><li>The data were analysed using [thematic analysis/regression/content analysis] to identify [pattern or relationship].</li></ul></section>
    <section><h2>Before you use a phrase</h2><p>Name the method you actually used, use the tense required by your discipline, and include enough detail for a reader to understand how the study was carried out.</p><p><a href="/blog/how-to-write-a-methodology-section-for-a-research-paper/">Read the methodology structure and example guide</a>.</p></section>
    ${tools}`,
  "/phrases/results/": `
    <p class="eyebrow">Academic phrase library · Results</p>
    <h1>Academic phrases for reporting research results</h1>
    <p class="lead">Use these sentence starters to report quantitative or qualitative findings clearly before you explain what the findings mean in a discussion section.</p>
    <section><h2>Report a finding</h2><ul><li>The results showed that [X] was associated with [Y].</li><li>As shown in Table [X], [group] reported a higher/lower [measure] than [comparison group].</li><li>Analysis of the data identified three recurring themes: [theme 1], [theme 2], and [theme 3].</li></ul></section>
    <section><h2>Describe a pattern carefully</h2><ul><li>There was a statistically significant difference between [X] and [Y] (p = [value]).</li><li>Participants frequently described [theme], particularly when [condition].</li><li>The findings did not show a clear relationship between [X] and [Y].</li></ul></section>
    <section><h2>Keep results separate from discussion</h2><p>Use the results section to report what the data shows. Save explanations of why a finding matters, how it relates to previous studies, or what should happen next for the discussion section.</p><p><a href="/blog/how-to-write-a-results-section-research-paper-esl/">Read the results-section guide and examples</a>.</p></section>
    ${tools}`,
  "/citations/": `
    <p class="eyebrow">Citation generator</p>
    <h1>Free citation generator for APA 7, MLA, Chicago and IEEE</h1>
    <p class="lead">Create references and in-text citations for common student source types, including journal articles, books, websites, chapters, theses, and conference papers.</p>
    <section><h2>Supported citation formats</h2><ul><li><strong>APA 7:</strong> commonly used in psychology, education, and social sciences.</li><li><strong>MLA 9:</strong> commonly used in humanities and literature.</li><li><strong>Chicago 17:</strong> commonly used in history, arts, and business.</li><li><strong>IEEE:</strong> commonly used in engineering and computer science.</li></ul></section>
    <section><h2>Check every reference before you submit</h2><p>A generator can format the details you provide, but it cannot confirm that a source is credible, that every author or DOI is correct, or that your institution requires a specific variation. Compare the output against your course or publisher guidance.</p><p><a href="/blog/apa-7th-edition-citation-format-guide-with-examples/">Read the APA 7 format guide with examples</a>.</p></section>
    ${tools}`,
  "/pricing/": `
    <p class="eyebrow">Transparent student pricing</p>
    <h1>AI academic writing support pricing for students</h1>
    <p class="lead">Start with a free plan for short revision and citation tasks. Upgrade only if your coursework or research needs higher limits for regular use.</p>
    <section><h2>Choose a plan that fits your writing load</h2><div class="seo-grid"><article><h3>Free</h3><p>Try short academic revision tasks, browse the phrase library, and generate a limited number of citations.</p></article><article><h3>Student</h3><p>For weekly coursework, essay revision, and regular citation use.</p></article><article><h3>Pro</h3><p>For longer research projects, dissertation sections, and heavier writing volume.</p></article></div></section>
    <section><h2>Before you choose a plan</h2><p>Review the current plan limits and pricing in the application. If you are unsure, start with a short real paragraph on the free plan and decide whether the workflow helps your revision process.</p></section>
    ${tools}`,
  "/research-paper-sections/": `
    <p class="eyebrow">Research writing hub</p>
    <h1>How to write each section of a research paper</h1>
    <p class="lead">Build a clearer research paper one section at a time with structure guides, examples, sentence patterns, and revision support for international students.</p>
    <section><h2>Start with the section you are writing now</h2><div class="seo-grid"><article><h3><a href="/blog/how-to-write-a-research-paper-introduction/">Introduction</a></h3><p>Move from context to a focused problem, research gap, and purpose statement.</p></article><article><h3><a href="/blog/how-to-write-a-methodology-section-for-a-research-paper/">Methods and methodology</a></h3><p>Explain design, data collection, participants, and analysis clearly.</p></article><article><h3><a href="/blog/how-to-write-a-results-section-research-paper-esl/">Results</a></h3><p>Report findings, use evidence-led wording, and keep interpretation for the discussion.</p></article><article><h3><a href="/blog/how-to-write-a-discussion-section-in-an-academic-paper/">Discussion</a></h3><p>Explain why findings matter and connect them to previous research.</p></article></div></section>
    <section><h2>Use each section for its own job</h2><p>Strong papers keep their functions distinct: an introduction establishes purpose, methods explain how a study was carried out, results report findings, and discussion interprets them. This structure helps readers follow your argument and helps you revise more efficiently.</p></section>
    ${tools}`,
  "/academic-english-for-esl-students/": `
    <p class="eyebrow">Academic English for multilingual writers</p>
    <h1>Academic English support for ESL and international students</h1>
    <p class="lead">Learn to spot literal translation, improve sentence clarity, use careful academic claims, and revise a draft without losing the meaning of your ideas.</p>
    <section><h2>Improve the part of writing that is slowing you down</h2><div class="seo-grid"><article><h3><a href="/blog/how-to-avoid-common-esl-writing-mistakes/">Common ESL writing mistakes</a></h3><p>Review common problems with articles, verb agreement, prepositions, literal translation, and more.</p></article><article><h3><a href="/blog/how-to-use-hedging-language-in-academic-writing/">Hedging language</a></h3><p>Make claims that match the strength and limits of your evidence.</p></article><article><h3><a href="/blog/active-vs-passive-voice-in-academic-writing/">Active and passive voice</a></h3><p>Choose clearer sentence structures for academic contexts.</p></article></div></section>
    <section><h2>Revise rather than replace your voice</h2><p>Academic English does not require every sentence to sound complicated. Start with a clear claim, use evidence accurately, and make revisions that preserve what you mean. Use feedback as a way to learn patterns, not as a substitute for thinking through the argument.</p></section>
    ${tools}`,
  "/academic-paraphrasing-tool-for-esl-students/": `
    <p class="eyebrow">Source-based writing support</p>
    <h1>Academic paraphrasing tool for ESL students</h1>
    <p class="lead">Improve paraphrased sentences that sound too literal, too close to the source, or not academic enough for essays and literature reviews.</p>
    <section><h2>Paraphrase without changing the original idea</h2><ol><li>Read the source until you understand the claim and evidence.</li><li>Set the source aside and write the idea in your own sentence structure.</li><li>Check that the new wording preserves the meaning and does not copy distinctive phrasing.</li><li>Cite the original source, even when you have used your own words.</li></ol></section>
    <section><h2>Common revision checks</h2><ul><li>Does the sentence still make the same claim as the source?</li><li>Have you changed both wording and structure rather than only swapping a few synonyms?</li><li>Have you kept the citation close to the paraphrased idea?</li><li>Does the final sentence sound natural in academic English?</li></ul><p><a href="/blog/how-to-paraphrase-without-plagiarizing-in-academic-writing/">Read the detailed paraphrasing guide</a> or <a href="/polish/">revise a paragraph</a>.</p></section>
    ${tools}`,
  "/ai-essay-polisher-for-non-native-english-writers/": `
    <p class="eyebrow">Academic revision for non-native writers</p>
    <h1>AI essay polisher for non-native English writers</h1>
    <p class="lead">Review academic tone, clarity, and non-native expressions in essays, reports, literature reviews, and research-paper sections with explanations for every suggested revision.</p>
    <section><h2>Use revision feedback to make informed choices</h2><p>Start with your own draft, compare each suggestion to your intended meaning, and keep the language that is accurate for your discipline and evidence. Use citations whenever a sentence depends on a source.</p></section>
    ${tools}`,
  "/apa-citation-generator-for-international-students/": `
    <p class="eyebrow">APA citation support</p>
    <h1>APA 7 citation generator for international students</h1>
    <p class="lead">Create APA 7 references and in-text citations for common academic sources, then check your work against current course or university guidance.</p>
    <section><h2>Build a complete APA reference</h2><p>Collect the author, year, title, source, volume or issue, page range, and DOI or URL before generating your reference. Missing source details lead to incomplete citations no matter which tool you use.</p><p><a href="/citations/">Generate an APA citation</a> · <a href="/blog/apa-7th-edition-citation-format-guide-with-examples/">Read APA 7 examples</a></p></section>
    ${tools}`,
  "/academic-writing-alternative-for-international-students/": `
    <p class="eyebrow">Academic writing support comparison</p>
    <h1>Academic writing support for international students</h1>
    <p class="lead">CorePapers focuses on non-native phrasing, academic sentence patterns, citation workflow, and explanations that help you learn from a revision.</p>
    <section><h2>Choose support that matches the writing task</h2><p>If you are revising a paragraph, use an essay polisher. If you need wording for a research-paper section, use a phrase library. If you are working with sources, create and verify the citation before submitting.</p></section>
    ${tools}`,
  "/paraphrasing-alternative-for-academic-writing/": `
    <p class="eyebrow">Academic paraphrasing support</p>
    <h1>Academic paraphrasing support for clearer source-based writing</h1>
    <p class="lead">Improve the clarity and academic tone of a paraphrase while keeping the original source accurately cited and the meaning intact.</p>
    <section><h2>Use a responsible paraphrasing workflow</h2><p>Understand the source first, write the idea in your own structure, compare it for accuracy, and cite the original source. A stronger paraphrase is not simply a sentence with different synonyms.</p></section>
    ${tools}`,
};

function genericPage(seo) {
  return `<h1>${escapeHtml(seo.title.replace(/ \| CorePapers$/, ""))}</h1><p class="lead">${escapeHtml(seo.description)}</p>${tools}`;
}

function formatDate(value) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(`${value}T00:00:00Z`));
}

export function renderStaticPage({ path, seo, blogRows }) {
  if (path === "/blog/") {
    const cards = blogRows
      .map(
        row =>
          `<article><p class="eyebrow">${escapeHtml(row.category)} · ${escapeHtml(row.lastmod)}</p><h2><a href="/blog/${escapeHtml(row.slug)}/">${escapeHtml(row.title)}</a></h2><p>${escapeHtml(row.excerpt)}</p><p><a href="/blog/${escapeHtml(row.slug)}/">Read guide</a></p></article>`
      )
      .join("");
    return pageShell(
      `<p class="eyebrow">CorePapers learning centre</p><h1>Academic writing guides, sentence starters, and ESL essay help</h1><p class="lead">Practical research-writing guides and examples for international students working in academic English.</p><section class="seo-grid">${cards}</section>${tools}`
    );
  }
  return pageShell(PAGE_CONTENT[path] ?? genericPage(seo));
}

export function renderBlogArticle({ row, relatedRows }) {
  const related = relatedRows
    .filter(item => item.slug !== row.slug)
    .slice(0, 3)
    .map(
      item =>
        `<li><a href="/blog/${escapeHtml(item.slug)}/">${escapeHtml(item.title)}</a></li>`
    )
    .join("");
  return pageShell(`
    <article class="seo-article">
      <p class="eyebrow">${escapeHtml(row.category)} · ${escapeHtml(row.readingTime ?? 8)} min read · ${escapeHtml(formatDate(row.lastmod))}</p>
      <h1>${escapeHtml(row.title)}</h1>
      <p class="lead">${escapeHtml(row.excerpt)}</p>
      <div class="seo-divider"></div>
      ${markdownToHtml(row.content ?? row.excerpt)}
      <section class="seo-callout"><h2>Revise this section with confidence</h2><p>Use CorePapers to review non-native phrasing and academic tone after you have drafted the idea in your own words.</p><p><a class="button" href="/polish/">Try Essay Polish</a></p></section>
      <section><h2>Related guides</h2><ul>${related}</ul></section>
    </article>`);
}

export const staticSeoStyles = `
<style data-static-seo="true">
  :root { color-scheme: light; }
  body { margin: 0; color: #302f3b; background: #fcfbff; font-family: Arial, Helvetica, sans-serif; line-height: 1.65; }
  .skip-link { position: absolute; left: -999px; top: auto; }
  .skip-link:focus { left: 1rem; top: 1rem; z-index: 10; background: white; padding: .5rem .75rem; }
  .seo-header { border-bottom: 1px solid #e6e2ee; background: rgba(255,255,255,.96); }
  .seo-header nav, .seo-main, .seo-footer { width: min(100% - 2rem, 960px); margin: 0 auto; }
  .seo-header nav { display: flex; gap: 1rem; flex-wrap: wrap; align-items: center; padding: 1rem 0; font-size: .95rem; }
  .brand { color: #51407d; font-family: Georgia, serif; font-size: 1.35rem; font-weight: 700; margin-right: .5rem; }
  .seo-main { padding: 3.5rem 0 2.5rem; }
  .seo-footer { border-top: 1px solid #e6e2ee; padding: 2rem 0 3rem; color: #655f72; font-size: .9rem; }
  h1, h2, h3 { color: #3f3563; font-family: Georgia, 'Times New Roman', serif; line-height: 1.22; }
  h1 { font-size: clamp(2.25rem, 6vw, 4rem); margin: 0 0 1rem; font-weight: 500; }
  h2 { font-size: 1.7rem; margin: 2.5rem 0 .8rem; font-weight: 500; }
  h3 { font-size: 1.2rem; margin: 0 0 .5rem; }
  p { margin: .75rem 0; }
  .lead { color: #625d70; font-size: 1.15rem; max-width: 760px; }
  .eyebrow { color: #7561ac; font-size: .78rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
  .seo-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin: 1.2rem 0; }
  .seo-grid article, .seo-callout { background: white; border: 1px solid #e6e2ee; border-radius: .9rem; padding: 1.25rem; }
  .seo-callout { margin: 2rem 0; background: linear-gradient(130deg, #f4efff, #f6fff8); }
  .seo-divider { height: 1px; background: #e6e2ee; margin: 2rem 0; }
  .seo-article { max-width: 760px; margin: 0 auto; }
  .seo-article li, .seo-main li { margin: .35rem 0; }
  a { color: #5d49a4; text-decoration-thickness: 1px; text-underline-offset: 2px; }
  .button { display: inline-block; background: #6a57b3; border-radius: .5rem; color: white; font-weight: 700; padding: .7rem 1rem; text-decoration: none; margin: .3rem .4rem .3rem 0; }
  .button.secondary { background: white; border: 1px solid #cfc7e4; color: #51407d; }
  @media (max-width: 600px) { .seo-main { padding-top: 2.5rem; } }
</style>`;

export { escapeHtml };
