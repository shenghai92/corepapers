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
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g,
      '<a href="$2" rel="noreferrer">$1</a>'
    )
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
      <h2>Learn with examples, templates, and source-use guidance</h2>
      <div class="seo-grid"><article><h3><a href="/academic-integrity-and-source-use/">Academic integrity and source use</a></h3><p>Choose when to quote, paraphrase, or summarize and keep borrowed ideas clearly cited.</p></article><article><h3><a href="/academic-writing-examples/">Academic writing examples</a></h3><p>See labelled, fictional examples for source-based writing, methods, and results.</p></article><article><h3><a href="/research-paper-templates/">Research paper templates</a></h3><p>Plan Methods, Results, and Discussion with evidence-first section prompts.</p></article><article><h3><a href="/citation-examples/">APA citation examples</a></h3><p>Check common reference and in-text citation structures before submitting.</p></article></div>
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
    <section><h2>Check every reference before you submit</h2><p>A generator can format the details you provide, but it cannot confirm that a source is credible, that every author or DOI is correct, or that your institution requires a specific variation. Compare the output against your course or publisher guidance.</p><p><a href="/citation-examples/">Review APA citation examples</a> · <a href="/academic-integrity-and-source-use/">Read the source-use guide</a> · <a href="/blog/apa-7th-edition-citation-format-guide-with-examples/">Read the APA 7 format guide with examples</a>.</p></section>
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
    <section><h2>Common revision checks</h2><ul><li>Does the sentence still make the same claim as the source?</li><li>Have you changed both wording and structure rather than only swapping a few synonyms?</li><li>Have you kept the citation close to the paraphrased idea?</li><li>Does the final sentence sound natural in academic English?</li></ul><p><a href="/academic-integrity-and-source-use/">Use the source-use guide</a> · <a href="/blog/how-to-paraphrase-without-plagiarizing-in-academic-writing/">Read the detailed paraphrasing guide</a> · <a href="/polish/">revise a paragraph</a>.</p></section>
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

Object.assign(PAGE_CONTENT, {
  "/academic-paragraph-structure/": `
    <p class="eyebrow">Research foundations</p>
    <h1>Academic paragraph structure: topic sentence, evidence, and explanation</h1>
    <p class="lead">Build clearer academic paragraphs by developing one focused point with relevant evidence, careful explanation, and a purposeful connection to the next idea.</p>
    <section><h2>Give every paragraph one job</h2><p>A paragraph is more than a group of related sentences. In academic writing, it should help a reader follow one controllable stage of your argument. Begin with a focused point, select evidence that supports that point, explain the connection, and use the final sentence to complete or extend the line of reasoning.</p></section>
    <section><h2>A practical paragraph sequence</h2><ul><li><strong>Topic sentence:</strong> state the specific point the paragraph will develop.</li><li><strong>Evidence:</strong> introduce data, an example, or a source-based finding that is relevant to that point.</li><li><strong>Explanation:</strong> show the reader why the evidence supports the point rather than letting a quotation stand alone.</li><li><strong>Link:</strong> close the idea or connect it logically to the next paragraph.</li></ul></section>
    <section><h2>Fictional learning example</h2><p>This is a fictional learning example, not a real student submission or a source to cite. A writer may first argue that a platform’s privacy setting affects how users share information. They can then introduce evidence from a relevant study, explain that the setting changes what users can control, and qualify the conclusion so it applies only to the group and platform studied. The paragraph becomes persuasive because the writer explains the evidence and respects its limits.</p></section>
    <section><h2>Check before you move on</h2><ul><li>Can a reader find your paragraph’s point in the opening sentence?</li><li>Does each piece of evidence support that same point?</li><li>Have you explained the significance of the evidence in your own words?</li><li>Have you kept the claim no stronger than the evidence allows?</li><li>Does the end of the paragraph create a logical next step?</li></ul></section>
    <section><h2>Learn from writing-center guidance</h2><p>The [University of North Carolina Writing Center paragraph guide](https://writingcenter.unc.edu/tips-and-tools/paragraphs/) explains paragraph development as a way to help readers follow a writer’s controlling point. Requirements vary by discipline and assignment, so use your instructor’s guidance where it differs.</p></section>
    <section class="seo-grid"><article><h2>Build an evidence-based argument</h2><p>Learn a cautious claim–evidence–explanation framework for research writing.</p><p><a href="/academic-argument-evidence/">Read the argument and evidence guide</a></p></article><article><h2>Revise a drafted paragraph</h2><p>Review clarity and academic tone after you have developed the idea and checked the evidence.</p><p><a href="/polish/">Open Essay Polish</a></p></article></section>
    ${tools}`,
  "/academic-integrity-and-source-use/": `
    <p class="eyebrow">Source-based writing guide</p>
    <h1>Academic integrity starts with clear source use</h1>
    <p class="lead">Use this practical guide to decide whether a source needs a quotation, paraphrase, or summary—and to keep your own analysis visible in the final draft.</p>
    <section><h2>Choose the right source-use move</h2><div class="seo-grid"><article><h3>Quote</h3><p>Use an author’s exact words only when the wording itself matters, then mark it clearly and provide the required citation.</p></article><article><h3>Paraphrase</h3><p>Restate a specific idea in a new sentence structure when the idea matters more than the original wording. The source still needs credit.</p></article><article><h3>Summarize</h3><p>Condense the main point of a broader source when readers need context, background, or a short account of an argument.</p></article></div></section>
    <section><h2>Illustrative paraphrasing case</h2><p>This fictional learning example is not a real student submission or a source to cite. It shows the difference between swapping a few words and rebuilding an idea in your own sentence.</p><p><strong>Illustrative source claim:</strong> “Students who receive specific feedback revise more effectively than students who only receive a score.”</p><p><strong>Responsible paraphrase:</strong> Specific comments can help students make more useful revisions than a grade alone, because they identify what to change (Author, year).</p><p>The revision changes both wording and sentence structure, but it still credits the original idea. A citation does not disappear just because the words have changed.</p></section>
    <section><h2>A four-step source check</h2><ul><li>Read until you can explain the source claim without looking at the sentence.</li><li>Write your version from memory, then compare it with the original for accuracy.</li><li>Use quotation marks for distinctive language you keep exactly.</li><li>Place a citation where a reader can see which source supports the idea.</li></ul></section>
    <section><h2>Use AI as a revision step</h2><p>An AI suggestion can help you notice literal translation or awkward wording, but it cannot decide whether a claim is accurate, whether a source supports it, or what your university permits. Compare every revision with your intended meaning and your course policy.</p></section>
    <section><h2>Read primary guidance</h2><p>APA Style explains that a paraphrase restates another author’s idea in your own words and still requires a citation. Purdue OWL similarly frames paraphrasing as a legitimate form of source use only when it is accurately documented. Read [APA Style on paraphrases](https://apastyle.apa.org/style-grammar-guidelines/citations/paraphrasing), [Purdue OWL on paraphrasing](https://owl.purdue.edu/owl/research_and_citation/using_research/quoting_paraphrasing_and_summarizing/paraphrasing.html), and [Purdue OWL on quoting, paraphrasing, and summarizing](https://owl.purdue.edu/owl/research_and_citation/using_research/quoting_paraphrasing_and_summarizing/index.html) before relying on a tool or a course handout.</p></section>
    <section class="seo-grid"><article><h2>Check a paraphrase</h2><p>Review non-native phrasing after you have written and cited the idea yourself.</p><p><a href="/academic-paraphrasing-tool-for-esl-students/">Open paraphrasing support</a></p></article><article><h2>Build the reference</h2><p>Generate a citation after checking the original source information.</p><p><a href="/citations/">Open Citation Generator</a></p></article></section>
    ${tools}`,
  "/academic-writing-examples/": `
    <p class="eyebrow">Illustrative writing examples</p>
    <h1>Academic writing examples for research papers and essays</h1>
    <p class="lead">See how a short sentence changes when you move from source notes to a paraphrase, a methods description, or a results statement.</p>
    <section><h2>Use these examples as learning models</h2><p>Every example below is fictional and simplified for learning. Replace bracketed details with your own evidence, data, discipline conventions, and required citations.</p></section>
    <section><h2>Example 1: move from a note to a cited claim</h2><p><strong>Research note:</strong> The fictional study reports that peer feedback helped first-year students identify unclear claims.</p><p><strong>Draft sentence:</strong> Peer feedback may help first-year writers notice claims that need clarification (Author, year).</p><p>The verb <strong>may help</strong> keeps the claim proportionate to the evidence. The citation identifies the source of the idea, while the sentence remains part of the writer’s argument.</p></section>
    <section><h2>Example 2: name what you actually did in Methods</h2><p><strong>Template:</strong> This study used semi-structured interviews to explore how [participant group] experienced [topic]. Participants were recruited through [method], and interview transcripts were analysed using [named approach].</p><p>This pattern tells readers the design, participants, collection method, and analysis method. It is a structure prompt, not a sentence to use unchanged.</p></section>
    <section><h2>Example 3: report the pattern before explaining it</h2><p><strong>Template:</strong> As shown in Table 1, the [intervention] group reported a higher mean [measure] than the comparison group. The difference was statistically significant, p = [value].</p><p>This example states what the analysis found and directs the reader to the table. Save a claim about why the difference occurred or what it means for the discussion. The [UC Irvine scientific-writing guide](https://guides.lib.uci.edu/scientificwriting/results) similarly advises writers to present results in logical order and keep evaluation of their meaning for the discussion.</p></section>
    <section class="seo-grid"><article><h2>Find section phrases</h2><p>Adapt sentence starters for your methods and results instead of copying a complete model.</p><p><a href="/phrases/">Browse Phrase Library</a></p></article><article><h2>Learn the full structure</h2><p>Use the research-paper hub when you need the purpose and sequence for each section.</p><p><a href="/research-paper-sections/">Explore paper sections</a></p></article></section>
    ${tools}`,
  "/research-paper-templates/": `
    <p class="eyebrow">Research writing templates</p>
    <h1>Research paper templates for methods, results, and discussion</h1>
    <p class="lead">Use these section-by-section prompts to organise your own evidence and draft a research paper with a clearer sequence.</p>
    <section><h2>Methods template</h2><p><strong>Prompt:</strong> What did you do, with whom or what data, and how did you analyse it?</p><p>This study used [design] to examine [question]. Data were collected from [source/participants] through [method] and analysed using [approach].</p></section>
    <section><h2>Results template</h2><p><strong>Prompt:</strong> What did the data show, in what logical order, and where should readers look?</p><p>[Finding] was observed for [group/condition] (see Table/Figure [X]). The analysis showed [pattern or statistic].</p></section>
    <section><h2>Discussion template</h2><p><strong>Prompt:</strong> What does the finding mean in relation to the question, literature, and study limits?</p><p>This finding suggests [interpretation]. It is consistent/inconsistent with [prior research] because [reason]. One limitation is [limit].</p></section>
    <section><h2>Use a template with an evidence check</h2><ul><li>Replace every bracket with details you can support from your own study, notes, or approved sources.</li><li>Use the terminology, tense, reporting standards, and formatting rules required by your course or discipline.</li><li>Move explanation and implications out of Results and into Discussion unless your discipline uses a combined section.</li></ul></section>
    <section><h2>A note on results reporting</h2><p>A useful template should reduce uncertainty about order, not invent evidence. The [UC Irvine guide to writing results](https://guides.lib.uci.edu/scientificwriting/results) recommends factual, evidence-supported reporting in a logical order, with tables and figures mentioned in the text. Use your institution’s requirements if they differ.</p></section>
    <section class="seo-grid"><article><h2>Methods phrase bank</h2><p>Choose sentence starters for design, participants, collection, and analysis.</p><p><a href="/phrases/methods/">Open Methods phrases</a></p></article><article><h2>Results phrase bank</h2><p>Report tables, themes, statistics, and non-significant findings carefully.</p><p><a href="/phrases/results/">Open Results phrases</a></p></article></section>
    ${tools}`,
  "/evaluate-academic-sources/": `<p class="eyebrow">Research foundations</p><h1>How to evaluate academic sources</h1><p class="lead">Use this student checklist to examine authorship, purpose, evidence, timeliness, references, and cross-checking before you cite.</p><section><h2>Check more than the website design</h2><p>Identify the author and relevant expertise, ask why the source was created, inspect its evidence and references, and decide whether the date suits your discipline. Cross-check important factual claims with other reliable sources.</p><p><a href="https://owl.purdue.edu/owl/research_and_citation/conducting_research/evaluating_sources_of_information/general_guidelines.html" target="_blank" rel="noreferrer">Read Purdue OWL source-evaluation guidance</a>.</p></section><section><h2>Source evaluation self-check</h2><ul><li>Can you identify the author, affiliation, and relevant expertise?</li><li>What is the source trying to explain, sell, or persuade?</li><li>Does it show evidence and references you can follow?</li><li>Can you cross-check important claims?</li></ul></section><p><a href="/research-question-examples/">Develop a research question</a> · <a href="/academic-integrity-and-source-use/">Use sources responsibly</a>.</p>${tools}`,
  "/research-question-examples/": `<p class="eyebrow">Research foundations</p><h1>Research question examples</h1><p class="lead">Turn a broad topic into a clear, focused, complex, and arguable research question with a practical self-check.</p><section><h2>What makes a research question useful?</h2><p>A useful question is clear, narrow enough for the assignment, and difficult to answer with a quick fact lookup. It directs research and analysis rather than merely naming a topic.</p><p><a href="https://writingcenter.gmu.edu/writing-resources/research-based-writing/how-to-write-a-research-question" target="_blank" rel="noreferrer">Read George Mason University Writing Center guidance</a>.</p></section><section><h2>Fictional learning example</h2><p>Rather than asking “What is social media?”, a student might ask how a defined platform’s privacy settings affect a specified group’s willingness to share personal information. The revised question names a context and invites evidence-based analysis.</p></section><p><a href="/evaluate-academic-sources/">Evaluate sources</a> · <a href="/academic-argument-evidence/">Build an evidence-based argument</a>.</p>${tools}`,
  "/academic-argument-evidence/": `<p class="eyebrow">Research foundations</p><h1>Academic argument and evidence</h1><p class="lead">Use a claim–evidence–explanation–limitation framework to write academic paragraphs readers can follow.</p><section><h2>Evidence needs explanation</h2><p>Make a claim, introduce relevant evidence, explain why it matters to the claim, and acknowledge limits where they affect the conclusion. Do not let a citation or quotation stand in place of analysis.</p><p><a href="https://owl.purdue.edu/owl/general_writing/academic_writing/establishing_arguments/research_and_evidence.html" target="_blank" rel="noreferrer">Read Purdue OWL guidance on research and evidence</a>.</p></section><section><h2>Paragraph self-check</h2><ul><li>Can a reader identify the main claim?</li><li>Is the evidence specific and cited?</li><li>Have you explained the connection?</li><li>Have you avoided claiming more than the evidence supports?</li></ul></section><p><a href="/literature-review-synthesis-matrix/">Synthesize sources</a> · <a href="/polish/">Polish a paragraph</a>.</p>${tools}`,
  "/literature-review-synthesis-matrix/": `
    <p class="eyebrow">Literature review practice</p><h1>How to synthesize sources in a literature review</h1><p class="lead">Use a synthesis matrix, a fictional paragraph example, and a source-based checklist to move beyond author-by-author summaries.</p>
    <section><h2>What synthesis means</h2><p>Synthesis puts multiple sources in conversation around a theme, question, or method. It identifies agreement, difference, limits, and relevant unanswered questions. It is not a sequence of summaries or a reason to force a relationship between unrelated sources.</p><p><a href="https://owl.purdue.edu/owl/research_and_citation/conducting_research/research_overview/synthesizing_sources.html" target="_blank" rel="noreferrer">Read Purdue OWL guidance on synthesizing sources</a>.</p></section>
    <section><h2>Build a simple synthesis matrix</h2><p>Put sources across the top and themes or variables down the side. For each cell, note the claim or limitation that matters for that theme. Review the matrix to find patterns, disagreement, evidence limits, and focused questions for further research.</p></section>
    <section><h2>Fictional learning example</h2><p>Studies in this fictional example suggest that regular planning may be associated with assignment completion, but they do not support the same conclusion equally. Source A reports a positive association across its sample, whereas Source B observes the pattern only among first-year students. Taken together, the studies point to a possible relationship while also showing that self-reported measures and small local samples limit generalisation.</p><p>This paragraph groups sources by theme and makes a cautious conclusion; it does not invent a research gap or claim causation.</p></section><section><h2>Synthesis self-check</h2><ul><li>Is each paragraph organised by a theme or question rather than author order?</li><li>Have you shown agreement, difference, or different conditions?</li><li>Are citations close to the ideas they support?</li><li>Is any claimed research gap specific and supported by your reviewed sources?</li></ul><p><a href="/blog/how-to-write-a-literature-review-for-international-students/">Read the literature review guide</a> · <a href="/academic-integrity-and-source-use/">Use sources responsibly</a>.</p></section>${tools}`,
  "/results-section-example-research-paper/": `
    <p class="eyebrow">Research paper results practice</p><h1>Results section example for a research paper</h1><p class="lead">Use this fictional learning example, structure template, and self-check to report research findings clearly without turning Results into Discussion.</p>
    <section><h2>What belongs in a Results section?</h2><p>Organise relevant findings around a research question, hypothesis, or named theme. Report findings in a logical order, use past tense, and refer to tables or figures in numerical order. Explain what the findings mean in the Discussion, not here.</p><p><a href="https://library.sacredheart.edu/c.php?g=29803&p=185931" target="_blank" rel="noreferrer">Read university guidance on reporting results</a>.</p></section>
    <section><h2>Fictional quantitative example</h2><p>To examine whether weekly planning was associated with assignment completion, a linear regression was conducted. Planning frequency was positively associated with completion score, b = 0.31, p = .02. As shown in Table 1, participants who reported planning at least four days per week had a higher mean completion score than participants who reported planning one day or fewer.</p><p>This learning example reports analysis, finding, and table reference. It does not explain why the association occurred.</p></section><section><h2>Results self-check</h2><ul><li>Does each paragraph answer a research question or report a named theme?</li><li>Have you removed speculation and interpretation?</li><li>Have you reported negative or unexpected findings when relevant?</li><li>Does every table or figure appear in the text?</li></ul><p><a href="/phrases/results/">Open Results phrases</a> · <a href="/research-paper-templates/">Use the section planner</a>.</p></section>${tools}`,
  "/methodology-section-example-research-paper/": `
    <p class="eyebrow">Research methodology planner</p><h1>Methodology section example for a research paper</h1><p class="lead">Use this fictional learning example and planner to describe research design, participants or sources, procedures, analysis, and limitations with precise academic English.</p>
    <section><h2>What should a Methodology section answer?</h2><p>A reader should be able to see how information was collected or generated and how it was analysed. Explain your design, selection route, procedures, analysis, rationale, and relevant limitations; report findings in Results instead.</p><p><a href="https://libguides.usc.edu/writingguide/methodology" target="_blank" rel="noreferrer">Read USC Library methodology guidance</a>.</p></section>
    <section><h2>Fictional methodology example</h2><p>This study used a cross-sectional survey design to examine the association between weekly planning and assignment completion among undergraduate students. Participants were recruited through [approved course channel] and completed an anonymous online questionnaire. Responses were screened using predefined inclusion criteria. Descriptive statistics and linear regression were used to examine the relationship between planning frequency and completion score.</p><p>This learning example provides a design, selection route, procedure, and analysis. Replace every bracketed placeholder with verified details from your own study.</p></section><section><h2>Methodology self-check</h2><ul><li>Have you stated and justified the design?</li><li>Can a reader understand how data, participants, or sources were selected?</li><li>Have you described collection and analysis procedures?</li><li>Have you separated methods from results and interpretation?</li></ul><p><a href="/phrases/methods/">Open Methods phrases</a> · <a href="/research-paper-templates/">Use the section planner</a>.</p></section>${tools}`,
  "/citation-examples/": `
    <p class="eyebrow">Citation example guide</p>
    <h1>APA 7 citation examples and in-text citation examples</h1>
    <p class="lead">Use clear, labelled APA 7 examples to understand the parts of a reference and in-text citation before you generate and review your own citation.</p>
    <section><h2>Use fictional examples only as structure models</h2><p>The names, titles, publishers, journals, and DOI values below are fictional. They demonstrate reference structure only and should never be submitted as real sources.</p></section>
    <section><h2>Journal article example</h2><p>Nguyen, T., &amp; Patel, R. (2025). Feedback timing and revision choices in undergraduate writing. <em>Journal of Learning Research, 12</em>(3), 44–61. https://doi.org/10.xxxx/example</p><p><strong>In-text citation:</strong> Parenthetical: (Nguyen &amp; Patel, 2025). Narrative: Nguyen and Patel (2025).</p></section>
    <section><h2>Web page example</h2><p>Global Learning Centre. (2025, May 8). <em>Planning a literature review</em>. https://example.edu/literature-review</p><p><strong>In-text citation:</strong> Parenthetical: (Global Learning Centre, 2025). Narrative: Global Learning Centre (2025).</p></section>
    <section><h2>Book example</h2><p>Okafor, M. (2024). <em>Writing with evidence</em>. Academic Press.</p><p><strong>In-text citation:</strong> Parenthetical: (Okafor, 2024). Narrative: Okafor (2024).</p></section>
    <section><h2>Before you trust generated output</h2><ul><li>Open the original source and check author names, publication date, title, container, pages, and DOI or stable URL.</li><li>Use the source type that actually matches the item you read; a web page and a journal article do not use the same fields.</li><li>Compare your final reference and in-text citation with the guidance required by your course, journal, or supervisor.</li></ul><p>For official APA guidance on citing paraphrased ideas, consult [APA Style’s paraphrasing guidance](https://apastyle.apa.org/style-grammar-guidelines/citations/paraphrasing). A generator formats the information you provide; it does not verify that a source exists, that metadata is complete, or that you have cited every borrowed idea.</p></section>
    <section class="seo-grid"><article><h2>Generate a citation</h2><p>Enter checked source details, then review the finished reference before submission.</p><p><a href="/citations/">Open Citation Generator</a></p></article><article><h2>Use sources responsibly</h2><p>Decide whether your source needs a quotation, paraphrase, or summary.</p><p><a href="/academic-integrity-and-source-use/">Read source-use guide</a></p></article></section>
    ${tools}`,
});

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
