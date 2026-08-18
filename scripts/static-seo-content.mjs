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
      <div class="seo-grid"><article><h3><a href="/academic-integrity-and-source-use/">Academic integrity and source use</a></h3><p>Choose when to quote, paraphrase, or summarize and keep borrowed ideas clearly cited.</p></article><article><h3><a href="/academic-writing-examples/">Academic writing examples</a></h3><p>See labelled, fictional examples for source-based writing, methods, and results.</p></article><article><h3><a href="/research-paper-templates/">Research paper templates</a></h3><p>Plan Methods, Results, and Discussion with evidence-first section prompts.</p></article><article><h3><a href="/citation-examples/">APA citation examples</a></h3><p>Check common reference and in-text citation structures before submitting.</p></article><article><h3><a href="/apa-7-non-english-sources/">APA 7 non-English sources</a></h3><p>Cite original-language sources, published translations, and transliterated titles carefully.</p></article><article><h3><a href="/evaluate-academic-sources/">Research foundations</a></h3><p>Evaluate sources, focus a research question, shape a thesis, and build an evidence-based argument.</p></article></div>
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
    <section><h2>Browse phrase collections by research-paper task</h2><div class="seo-grid"><article><h3><a href="/phrases/introduction/">Introduction phrases</a></h3><p>Move from context to a research gap, purpose, and focused question.</p></article><article><h3><a href="/phrases/literature-review/">Literature Review phrases</a></h3><p>Synthesize studies by theme, compare findings, and signal research limits cautiously.</p></article><article><h3><a href="/phrases/methods/">Methods phrases</a></h3><p>Describe a design, data collection, participants, and analysis with appropriately precise language.</p></article><article><h3><a href="/phrases/results/">Results phrases</a></h3><p>Report findings, tables, and statistical patterns without moving too early into discussion.</p></article><article><h3><a href="/phrases/discussion/">Discussion phrases</a></h3><p>Interpret results, state limits, and frame implications cautiously.</p></article><article><h3><a href="/phrases/conclusion/">Conclusion phrases</a></h3><p>Summarize a contribution and state a bounded takeaway without new evidence.</p></article><article><h3><a href="/blog/how-to-use-hedging-language-in-academic-writing/">Hedging language</a></h3><p>Choose measured language when the evidence suggests rather than proves a claim.</p></article></div></section>
    <section><h2>Use phrase templates responsibly</h2><p>Adapt every template to your evidence, discipline, and assignment. A useful phrase cannot replace your analysis or the source citations that support a claim.</p></section>
    ${tools}`,
  "/phrases/conclusion/": `
    <p class="eyebrow">Academic phrase library · Conclusion</p>
    <h1>Academic phrases for research paper conclusions</h1>
    <p class="lead">Adapt sentence starters that return to a research question, summarize a contribution, state a careful implication, and identify a focused next step without new evidence.</p>
    <section><h2>Use conclusion phrases after the paper is complete</h2><p>Keep the final takeaway proportionate to your evidence. Do not introduce a new result, citation, or claim that the body of the paper has not developed.</p></section>
    <section><h2>Conclusion phrase patterns</h2><ul><li><strong>Return to the question:</strong> This paper addressed [research question or central problem] by examining [focused approach].</li><li><strong>Main answer:</strong> Taken together, the analysis suggests that [careful central finding or claim].</li><li><strong>Contribution:</strong> The paper contributes by clarifying [specific relationship, mechanism, interpretation, or context].</li><li><strong>Bounded implication:</strong> Within [defined context], this finding may have implications for [practice, theory, policy, or future inquiry].</li><li><strong>Limitation reminder:</strong> This conclusion should be interpreted in light of [specific limitation].</li><li><strong>Next step:</strong> Future research could investigate [focused question] using [appropriate context or method].</li></ul></section>
    <section><h2>Before you use a phrase</h2><ul><li>State what the paper established without repeating the abstract sentence by sentence.</li><li>Remove new data, citations, and claims that have not been developed in the body.</li><li>Use a careful implication that matches the limits of the evidence.</li></ul></section>
    <section class="seo-grid"><article><h2>See a Conclusion example</h2><p>Use a fictional section example and checklist to bring a research paper to a clear, bounded close.</p><p><a href="/conclusion-section-example-research-paper/">Read the Conclusion guide</a></p></article><article><h2>Review the Abstract</h2><p>Make sure the completed paper summary accurately reports the study or argument.</p><p><a href="/how-to-write-an-abstract-research-paper/">Use the Abstract guide</a></p></article><article><h2>Polish the completed paragraph</h2><p>Review language after checking that the final claim matches your evidence.</p><p><a href="/polish/">Open Essay Polish</a></p></article></section>
    ${tools}`,
  "/phrases/literature-review/": `
    <p class="eyebrow">Academic phrase library · Literature Review</p>
    <h1>Academic phrases for literature reviews and source synthesis</h1>
    <p class="lead">Adapt sentence starters that synthesize sources by theme, compare findings, signal a cautious research gap, and preserve your own academic voice.</p>
    <section><h2>Use phrases to connect evidence, not replace it</h2><p>Replace every bracketed element with an accurate, cited detail from your own reading. A useful phrase does not establish that studies agree, prove that a gap exists, or substitute for explaining the relationship among sources.</p></section>
    <section><h2>Literature review phrase patterns</h2><ul><li><strong>Shared pattern:</strong> Across the reviewed studies, [theme or pattern] emerges as a recurring concern.</li><li><strong>Comparison:</strong> While [Author, year] emphasizes [point], [Author, year] focuses on [different point or condition].</li><li><strong>Qualified agreement:</strong> These findings broadly align in suggesting [careful pattern], although they differ in [method, setting, sample, or outcome].</li><li><strong>Methodological distinction:</strong> The differing conclusions may reflect variation in [design, measurement, population, or context].</li><li><strong>Research limitation:</strong> However, the reviewed evidence offers limited insight into [defined population, setting, mechanism, or outcome].</li><li><strong>Next question:</strong> Further research could examine [focused question] in [defined context] using [appropriate approach].</li></ul></section>
    <section><h2>Before you use a phrase</h2><ul><li>Organize each paragraph around a theme, question, method, or debate rather than author order.</li><li>Place citations close to the specific source-based claim they support.</li><li>Distinguish your synthesis from individual study findings.</li><li>Avoid saying “no research exists” unless a transparent search process supports that strong claim.</li></ul></section>
    <section class="seo-grid"><article><h2>See a thematic synthesis example</h2><p>Compare fictional source notes and turn them into a careful literature-review paragraph.</p><p><a href="/literature-review-example/">Read the Literature Review example</a></p></article><article><h2>Build a synthesis matrix</h2><p>Map sources and themes before drafting an author-to-author comparison.</p><p><a href="/literature-review-synthesis-matrix/">Use the synthesis matrix guide</a></p></article><article><h2>Refine the research question</h2><p>Turn a specific source limit into a focused, researchable next question.</p><p><a href="/research-question-examples/">Use the question checklist</a></p></article></section>
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
    <section><h2>Check every reference before you submit</h2><p>A generator can format the details you provide, but it cannot confirm that a source is credible, that every author or DOI is correct, or that your institution requires a specific variation. Compare the output against your course or publisher guidance.</p><p><a href="/citation-examples/">Review APA citation examples</a> · <a href="/apa-7-non-english-sources/">Cite non-English and translated sources in APA 7</a> · <a href="/academic-integrity-and-source-use/">Read the source-use guide</a> · <a href="/blog/apa-7th-edition-citation-format-guide-with-examples/">Read the APA 7 format guide with examples</a>.</p></section>
    ${tools}`,
  "/pricing/": `
    <p class="eyebrow">Transparent student pricing</p>
    <h1>AI academic writing support pricing for students</h1>
    <p class="lead">Start with a free plan for short revision and citation tasks. Upgrade only if your coursework or research needs higher limits for regular use.</p>
    <section><h2>Choose a plan that fits your writing load</h2><div class="seo-grid"><article><h3>Free</h3><p>Try short academic revision tasks, browse the phrase library, and generate a limited number of citations.</p></article><article><h3>Student</h3><p>For weekly coursework, essay revision, and regular citation use.</p></article><article><h3>Pro</h3><p>For longer research projects, dissertation sections, and heavier writing volume.</p></article></div></section>
    <section><h2>Before you choose a plan</h2><p>Review the current plan limits and pricing in the application. If you are unsure, start with a short real paragraph on the free plan and decide whether the workflow helps your revision process.</p></section>
    ${tools}`,
  "/research-paper-outline-template/": `
    <p class="eyebrow">Research writing planner</p>
    <h1>Research paper outline template for a logical evidence path</h1>
    <p class="lead">Use this adaptable outline to plan what each section needs to do, then revise it as your argument, evidence, and assignment requirements become clearer.</p>
    <section><h2>An outline is a decision tool, not a paper to fill in</h2><p>A useful outline makes relationships among ideas visible. It helps you group related evidence, decide the order of claims, locate missing support, and prevent a draft from becoming a list of disconnected points. Its format may use headings, Roman numerals, bullets, complete sentences, or fragments depending on your discipline and working style.</p></section>
    <section><h2>Flexible research paper outline template</h2><ol><li><strong>Introduction:</strong> context, focused problem, thesis or research question, and—when appropriate—a concise paper map.</li><li><strong>Theme or claim one:</strong> a topic sentence or subclaim, relevant evidence, explanation, and a link to the next point.</li><li><strong>Theme or claim two:</strong> a second stage of reasoning, comparison, alternative explanation, or counterargument as the assignment requires.</li><li><strong>Methods or evidence approach:</strong> state design, data, and analysis for empirical work, or source selection and analytical approach only when expected.</li><li><strong>Findings, analysis, or developed body sections:</strong> arrange evidence in the order that best helps readers follow the argument.</li><li><strong>Conclusion:</strong> return to the central answer, summarize the contribution, and state a proportionate implication without new evidence.</li></ol><p>This is a planning template, not a universal sequence. A qualitative report, humanities essay, laboratory paper, literature review, or proposal may need different sections.</p></section>
    <section><h2>Fictional learning example</h2><p>This fictional learning example is not a student paper, research result, or source to cite. A writer investigating planning routines might outline: (I) why deadline visibility matters for first-year students; (II) evidence on calendar reminders; (III) evidence on adaptable planning routines; (IV) a comparison of what fictional studies can and cannot show; and (V) a cautious conclusion about a focused next research question. Each point is a job for the paper, not a claim to copy unchanged.</p></section>
    <section><h2>Outline self-check</h2><ul><li>Does every major heading help answer the thesis or research question?</li><li>Can you name the evidence, example, or analysis each body section will use?</li><li>Does the order make a reader’s next question easier to answer?</li><li>Have you separated reporting, interpretation, and conclusion when your discipline expects that distinction?</li><li>Could you remove or combine a heading that does not advance the central purpose?</li></ul></section>
    <section><h2>Use writing-center guidance, then adapt it</h2><p>[Purdue OWL](https://owl.purdue.edu/owl/general_writing/the_writing_process/developing_an_outline/how_to_outline.html) explains that outlines can show hierarchy and logical ordering, helping writers group and bound ideas. The [George Mason University Writing Center](https://writingcenter.gmu.edu/writing-resources/writing-as-process/outlining) describes outlines as planning maps that may use different formats and can change as a draft develops. Follow the structure required by your assignment and discipline.</p></section>
    <section class="seo-grid"><article><h2>Refine the thesis</h2><p>Give the outline a controlling claim that the paper can develop with evidence.</p><p><a href="/thesis-statement-examples/">Use the thesis statement guide</a></p></article><article><h2>Build each paragraph</h2><p>Turn an outline point into a focused paragraph with evidence and explanation.</p><p><a href="/academic-paragraph-structure/">Read the paragraph structure guide</a></p></article><article><h2>Plan section functions</h2><p>Use the research-paper hub for section purpose, examples, and checks.</p><p><a href="/research-paper-sections/">Explore research paper sections</a></p></article></section>
    ${tools}`,
  "/research-paper-sections/": `
    <p class="eyebrow">Research writing hub</p>
    <h1>How to write each section of a research paper</h1>
    <p class="lead">Build a clearer research paper one section at a time with structure guides, examples, sentence patterns, and revision support for international students.</p>
    <section><h2>Start with the section you are writing now</h2><div class="seo-grid"><article><h3><a href="/introduction-section-example-research-paper/">Introduction</a></h3><p>Move from context to a focused problem, research gap, and purpose statement.</p></article><article><h3><a href="/methodology-section-example-research-paper/">Methods and methodology</a></h3><p>Explain design, data collection, participants, and analysis clearly.</p></article><article><h3><a href="/results-section-example-research-paper/">Results</a></h3><p>Report findings, use evidence-led wording, and keep interpretation for the discussion.</p></article><article><h3><a href="/discussion-section-example-research-paper/">Discussion</a></h3><p>Explain why findings matter and connect them to previous research.</p></article><article><h3><a href="/how-to-write-an-abstract-research-paper/">Abstract</a></h3><p>Summarize the completed paper’s purpose, approach, main finding, and implication.</p></article><article><h3><a href="/conclusion-section-example-research-paper/">Conclusion</a></h3><p>Close the paper by restating its answer, contribution, and a carefully bounded takeaway.</p></article></div></section>
    <section><h2>Use each section for its own job</h2><p>Strong papers keep their functions distinct: an introduction establishes purpose, methods explain how a study was carried out, results report findings, discussion interprets them, and an abstract concisely summarizes the completed paper. This structure helps readers follow your argument and helps you revise more efficiently.</p><p><a href="/research-paper-outline-template/">Plan the full paper outline</a> · <a href="/phrases/introduction/">Introduction phrases</a> · <a href="/phrases/results/">Results phrases</a> · <a href="/phrases/discussion/">Discussion phrases</a></p></section>
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
  "/how-to-write-an-abstract-research-paper/": `
    <p class="eyebrow">Research paper abstract guide</p>
    <h1>How to write an abstract for a research paper</h1>
    <p class="lead">Build a concise, self-contained summary of your completed paper by stating its purpose, approach, principal finding or argument, and careful implication.</p>
    <section><h2>Write the abstract after the paper</h2><p>Although an abstract appears first, it is usually drafted after the full paper is stable. This lets you report what the paper actually did and found instead of promising what it will examine. Follow the word limit, headings, and format set by your instructor, department, or journal.</p></section>
    <section><h2>A four-move abstract structure</h2><ul><li><strong>Purpose and context:</strong> state the specific problem or purpose.</li><li><strong>Method or approach:</strong> name the design, material, data, or analytic approach.</li><li><strong>Principal finding or argument:</strong> report the central result or claim with meaningful detail.</li><li><strong>Implication:</strong> explain what the result means within the limits of the paper.</li></ul></section>
    <section><h2>Fictional learning example</h2><p>This is a fictional learning example, not real student work or research evidence. A fictional study examined the association between weekly planning routines and self-reported assignment completion among first-year undergraduates using an anonymous cross-sectional survey. More frequent planning was associated with higher completion scores. Because the data were self-reported and cross-sectional, the finding cannot establish causation; it identifies a focused question for future longitudinal research.</p></section>
    <section><h2>Before you submit</h2><ul><li>Can the abstract stand alone for someone who has not read the full paper?</li><li>Does it describe what the paper actually did and found rather than what it planned to do?</li><li>Are the method, result, and implication specific but concise?</li><li>Have you removed detailed background, citations, and claims the paper does not support?</li><li>Does it meet your required format and word count?</li></ul></section>
    <section><h2>Use writing-center guidance</h2><p>The [University of Wisconsin–Madison Writing Center](https://writing.wisc.edu/handbook/assignments/writing-an-abstract-for-your-research-paper/) describes abstracts as concise summaries that help readers decide whether to read the full paper. The [George Mason University Writing Center](https://writingcenter.gmu.edu/writing-resources/different-genres/writing-an-abstract) advises describing what the paper found rather than announcing what it will examine. Use your course or journal guidance where it differs.</p></section>
    <section class="seo-grid"><article><h2>Plan the Introduction</h2><p>Define the research problem before summarizing it in an abstract.</p><p><a href="/introduction-section-example-research-paper/">Read the Introduction example</a></p></article><article><h2>Check the takeaway</h2><p>Keep the implications of a finding proportionate to the evidence.</p><p><a href="/discussion-section-example-research-paper/">Read the Discussion example</a></p></article></section>
    ${tools}`,
  "/introduction-section-example-research-paper/": `
    <p class="eyebrow">Research paper introduction practice</p>
    <h1>Introduction section example for a research paper</h1>
    <p class="lead">Use this fictional learning example to move from a defined context to a focused research problem, evidence-based gap, and clear research purpose.</p>
    <section><h2>What an Introduction needs to do</h2><p>An Introduction gives readers the context needed to understand your specific research problem. It narrows from a relevant setting or issue to what is already known, what remains uncertain, and the precise purpose or question your paper will address. Its job is not to report results or interpret findings.</p></section>
    <section><h2>A useful sequence</h2><ul><li><strong>Context:</strong> introduce only the background needed for the reader to understand the topic.</li><li><strong>Research conversation:</strong> explain what relevant, accurately cited sources have established.</li><li><strong>Need:</strong> identify a focused problem, gap, tension, or question.</li><li><strong>Purpose:</strong> state what your study or paper investigates and, where appropriate, the research question.</li></ul></section>
    <section><h2>Fictional learning example</h2><p>This is a fictional learning example, not real research or a source to cite. Students may use digital planning tools to manage coursework, yet there may be limited evidence about how particular routines relate to completion in a defined first-year programme. A study could therefore examine the association between weekly planning frequency and self-reported assignment completion among undergraduate students. In a real paper, any statement about previous research requires relevant and accurate citations.</p></section>
    <section><h2>Introduction self-check</h2><ul><li>Does the opening establish context without becoming a general history of the topic?</li><li>Does each source-based claim have an accurate citation?</li><li>Is the research problem narrow enough for the project?</li><li>Can a reader identify your purpose or question by the end?</li></ul></section>
    <section><h2>Use the next research-writing step</h2><p>The [University of North Carolina Writing Center introduction guide](https://writingcenter.unc.edu/tips-and-tools/introductions/) recommends making the reader understand what the paper will address and why it matters. Requirements differ across disciplines, so follow your assignment or journal guidance when it differs.</p></section>
    <section class="seo-grid"><article><h2>Refine the research question</h2><p>Turn a broad topic into a focused, researchable question before drafting the full paper.</p><p><a href="/research-question-examples/">Use the question checklist</a></p></article><article><h2>Draft the next section</h2><p>Plan a methods description once the question and design are clear.</p><p><a href="/methodology-section-example-research-paper/">Use the methodology planner</a></p></article></section>
    ${tools}`,
  "/conclusion-section-example-research-paper/": `
    <p class="eyebrow">Research paper conclusion practice</p>
    <h1>Conclusion section example for a research paper</h1>
    <p class="lead">Use this fictional learning example to bring a research paper to a concise close by restating the central answer, contribution, and a carefully bounded implication.</p>
    <section><h2>What a Conclusion should do</h2><p>A Conclusion returns readers to the completed paper’s central answer or argument. It summarizes the contribution in fresh language, states a proportionate implication, and may identify a focused next step. It should not add new data, citations, or broad claims that the evidence cannot support.</p></section>
    <section><h2>A practical conclusion sequence</h2><ul><li><strong>Return:</strong> restate the research question or central argument concisely.</li><li><strong>Answer:</strong> summarize the principal finding or argument.</li><li><strong>Contribution:</strong> explain what the completed paper adds within its scope.</li><li><strong>Bounded takeaway:</strong> state an implication or next research step that matches the limits of the evidence.</li></ul></section>
    <section><h2>Fictional learning example</h2><p>This is a fictional learning example, not real research evidence or a model to submit unchanged. A fictional study found an association between weekly planning frequency and self-reported assignment completion among first-year undergraduates. The pattern suggests that planning routines may be a useful focus for student-support research, but the cross-sectional self-report design cannot establish causation. Future longitudinal work could examine how routines change across a semester.</p></section>
    <section><h2>Conclusion self-check</h2><ul><li>Have you returned to the research question or central argument?</li><li>Have you summarized the contribution without copying the abstract sentence by sentence?</li><li>Does the implication remain within the evidence and design?</li><li>Have you removed new data, citations, and unsupported generalisations?</li></ul></section>
    <section><h2>Use publisher guidance</h2><p>[PLOS guidance on discussions and conclusions](https://explore.plos.org/author-resources/how-to-write-effective-discussions-and-conclusions) recommends a clear account of principal findings and realistic implications while avoiding new evidence and overstatement. Use course or journal rules where they differ.</p></section>
    <section class="seo-grid"><article><h2>Differentiate from Discussion</h2><p>Interpret findings and name limitations before you create the final paper-level takeaway.</p><p><a href="/discussion-section-example-research-paper/">Read the Discussion example</a></p></article><article><h2>Check the Abstract</h2><p>Make sure your paper summary reports the completed work accurately and concisely.</p><p><a href="/how-to-write-an-abstract-research-paper/">Use the Abstract guide</a></p></article></section>
    ${tools}`,
  "/discussion-section-example-research-paper/": `
    <p class="eyebrow">Research paper discussion practice</p>
    <h1>Discussion section example for a research paper</h1>
    <p class="lead">Use this fictional learning example to interpret a finding, relate it to relevant research, and state limits without overstating what the evidence can show.</p>
    <section><h2>Interpret results rather than repeat them</h2><p>A Discussion explains what the principal findings mean for the research question. It can compare the pattern with relevant earlier research, explain a cautious implication, and identify limitations that affect interpretation. New evidence and unsupported claims do not belong here.</p></section>
    <section><h2>A practical discussion sequence</h2><ul><li><strong>Principal finding:</strong> begin with the result most important to the research question.</li><li><strong>Interpretation:</strong> explain what the finding may mean, using wording that matches the study design.</li><li><strong>Research context:</strong> compare the interpretation with relevant, accurately cited work.</li><li><strong>Limits and next steps:</strong> state meaningful limitations and a realistic direction for future research.</li></ul></section>
    <section><h2>Fictional learning example</h2><p>This is a fictional learning example, not real research evidence or a conclusion to submit unchanged. A positive association between weekly planning and assignment completion may suggest that regular planning is useful for a defined student group. However, self-reported cross-sectional data cannot show that planning caused higher completion. A future study could test the relationship using a longitudinal or experimental design.</p></section>
    <section><h2>Discussion self-check</h2><ul><li>Have you interpreted a principal finding rather than repeated every result?</li><li>Have you kept causal language out of a correlational design?</li><li>Are comparisons with previous research accurately cited?</li><li>Have you named a limitation without undermining the whole study?</li><li>Have you avoided adding new results or evidence?</li></ul></section>
    <section><h2>Use publishing guidance</h2><p>[PLOS guidance on discussions and conclusions](https://explore.plos.org/author-resources/how-to-write-effective-discussions-and-conclusions) recommends beginning with principal findings, addressing implications realistically, and acknowledging limitations without overstating evidence. Use your course or journal instructions where they differ.</p></section>
    <section class="seo-grid"><article><h2>Report findings first</h2><p>Keep factual reporting separate from interpretation where your discipline uses separate sections.</p><p><a href="/results-section-example-research-paper/">Read the Results example</a></p></article><article><h2>Write cautiously</h2><p>Build an argument in which the claim remains proportionate to its evidence.</p><p><a href="/academic-argument-evidence/">Use the evidence framework</a></p></article></section>
    ${tools}`,
  "/phrases/introduction/": `
    <p class="eyebrow">Academic phrase library · Introduction</p>
    <h1>Academic phrases for research paper introductions</h1>
    <p class="lead">Adapt these sentence starters to establish context, identify a focused research gap, state a purpose, and introduce a research question.</p>
    <section><h2>Move from context to purpose</h2><ul><li><strong>Context:</strong> [Topic] has received increasing attention because [specific reason].</li><li><strong>What is known:</strong> Previous research has shown that [specific finding] (Author, year).</li><li><strong>Gap:</strong> However, less is known about [specific relationship, group, setting, or mechanism].</li><li><strong>Purpose:</strong> This study examines [focused topic] among/in [defined context or group].</li><li><strong>Question:</strong> Accordingly, this study asks: How does [X] relate to [Y] in [context]?</li></ul></section>
    <section><h2>Use phrases responsibly</h2><p>These are adaptable language patterns, not evidence. Replace every bracketed item with details that are accurate for your own project, cite source-based claims, and follow your field’s conventions for introductions. Do not claim a broad research gap simply because you have not yet found relevant studies.</p></section>
    <section class="seo-grid"><article><h2>See a full Introduction example</h2><p>Learn how context, a gap, and a purpose fit together in a labelled fictional learning example.</p><p><a href="/introduction-section-example-research-paper/">Read the Introduction guide</a></p></article><article><h2>Refine the question</h2><p>Test whether your research question is focused, researchable, and suitable for the assignment.</p><p><a href="/research-question-examples/">Use the question checklist</a></p></article></section>
    ${tools}`,
  "/phrases/discussion/": `
    <p class="eyebrow">Academic phrase library · Discussion</p>
    <h1>Academic phrases for discussion sections</h1>
    <p class="lead">Adapt these sentence starters to interpret findings, compare them with prior research, state limitations, and make cautious implications.</p>
    <section><h2>Interpret without overstating</h2><ul><li><strong>Principal finding:</strong> The main finding suggests that [interpretation of result].</li><li><strong>Comparison:</strong> This pattern is consistent with/contrasts with [Author, year], who found that [specific point].</li><li><strong>Possible explanation:</strong> One possible explanation is that [mechanism], although this interpretation requires further investigation.</li><li><strong>Limitation:</strong> This interpretation should be considered in light of [specific limitation].</li><li><strong>Implication:</strong> Within this context, the findings may have implications for [practice, theory, or policy].</li></ul></section>
    <section><h2>Use phrases responsibly</h2><p>Phrase templates cannot establish causation, verify a source, or determine the limits of your study. Keep interpretations proportionate to the evidence and design, cite comparisons with earlier research, and leave new data out of the Discussion section.</p></section>
    <section class="seo-grid"><article><h2>See a full Discussion example</h2><p>Practise interpreting a fictional finding, naming limits, and proposing a focused next step.</p><p><a href="/discussion-section-example-research-paper/">Read the Discussion guide</a></p></article><article><h2>Report findings first</h2><p>Keep factual reporting distinct from interpretation when your discipline separates Results and Discussion.</p><p><a href="/phrases/results/">Browse Results phrases</a></p></article></section>
    ${tools}`,
  "/thesis-statement-examples/": `
    <p class="eyebrow">Research foundations</p>
    <h1>Thesis statement examples: make an academic claim specific and arguable</h1>
    <p class="lead">Build a clearer thesis statement by turning a broad topic into a specific, arguable claim that your paper can develop with evidence.</p>
    <section><h2>A thesis is more than a topic announcement</h2><p>A thesis statement tells readers the paper’s controlling claim or central answer. It should be specific enough for the assignment length, open to explanation and evidence, and reflected in the paper’s structure. Different disciplines use different forms, so treat this guide as a revision framework rather than a rigid formula.</p></section>
    <section><h2>Check an academic thesis statement</h2><ul><li>Does it make a claim rather than only name a topic?</li><li>Is the claim specific enough for the evidence and assignment length?</li><li>Could a reasonable reader ask for support or offer another interpretation?</li><li>Does the paper’s structure help demonstrate the claim?</li></ul></section>
    <section><h2>Fictional learning example</h2><p>This is a fictional learning example, not a real student submission or research finding. A broad topic such as student planning can become an arguable claim: “In first-year seminar courses, regular weekly planning may support assignment completion by helping students make deadlines visible.” The claim is scoped, cautious, and opens a path for evidence rather than presenting a universal fact.</p></section>
    <section><h2>Use writing-center guidance</h2><p>The [University of North Carolina Writing Center thesis-statement guide](https://writingcenter.unc.edu/tips-and-tools/thesis-statements/) explains that a thesis should guide a paper’s development. Follow your course and discipline requirements where they differ.</p></section>
    <section class="seo-grid"><article><h2>Refine the research question</h2><p>Start by making the underlying research question focused and researchable.</p><p><a href="/research-question-examples/">Use the research question checklist</a></p></article><article><h2>Build an evidence-led paragraph</h2><p>Develop a claim with relevant evidence, explanation, and appropriate limits.</p><p><a href="/academic-argument-evidence/">Read the argument and evidence guide</a></p></article></section>
    ${tools}`,
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
  "/mla-citation-examples/": `
    <p class="eyebrow">MLA citation example guide</p>
    <h1>MLA 9 citation examples: Works Cited and in-text citations</h1>
    <p class="lead">Use labelled MLA Works Cited and in-text citation examples to understand how source details, signal phrases, and parenthetical citations work together.</p>
    <section><h2>Connect every source-based claim to a Works Cited entry</h2><p>MLA in-text citations help readers find the matching source in Works Cited. The exact form depends on the information available in the source, but the in-text signal should point to the first meaningful element in the matching entry. Use your course or instructor’s rules where they differ.</p></section>
    <section><h2>Fictional learning examples</h2><p>The names, titles, publishers, journals, pages, DOI values, and URLs below are fictional learning examples. They demonstrate citation structure only and must never be submitted as real sources.</p><ul><li><strong>Book:</strong> Okafor, Mara. <em>Writing with Evidence</em>. Academic Press, 2024. In-text: (Okafor 42).</li><li><strong>Journal article:</strong> Rivera, Elena, and Daniel Kim. “Revision Feedback and Undergraduate Writers.” <em>Journal of Academic Learning</em>, vol. 8, no. 2, 2025, pp. 44–61. https://doi.org/10.xxxx/example. In-text: (Rivera and Kim 51).</li><li><strong>Web page:</strong> Global Learning Centre. “Planning a Literature Review.” <em>Global Learning Centre</em>, 8 May 2025, https://example.edu/literature-review. Accessed 18 Aug. 2026.</li></ul></section>
    <section><h2>Before you submit</h2><ul><li>Check the creator, title, container, contributors, version or number, publisher, date, and location available for the source.</li><li>Make sure an in-text citation helps a reader locate the matching Works Cited entry.</li><li>Use page numbers only when the source provides them; do not invent page or paragraph numbers for a web page.</li><li>Compare the completed reference with current course or MLA guidance.</li></ul></section>
    <section><h2>Use authoritative MLA guidance</h2><p>Consult the [MLA Style Center](https://style.mla.org/), the [George Mason University MLA quick guide](https://writingcenter.gmu.edu/writing-resources/citing-sources/mla-citation-style-quick-guide), and [Purdue OWL’s MLA in-text citation guide](https://owl.purdue.edu/owl/research_and_citation/mla_style/mla_formatting_and_style_guide/mla_in_text_citations_the_basics.html). A citation generator formats details you enter; it cannot confirm that a source exists or that you credited every borrowed idea.</p></section>
    <section class="seo-grid"><article><h2>Create a citation</h2><p>Enter source details you have verified, then review every item in the finished Works Cited entry.</p><p><a href="/citations/">Open Citation Generator</a></p></article><article><h2>Use sources responsibly</h2><p>Decide whether to quote, paraphrase, or summarize and keep the borrowed idea visible to the reader.</p><p><a href="/academic-integrity-and-source-use/">Read the source-use guide</a></p></article></section>
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
    <section class="seo-grid"><article><h2>Build an annotated bibliography</h2><p>Summarize, evaluate, and connect a verified source to a focused research question.</p><p><a href="/annotated-bibliography-example/">Read the annotation guide</a></p></article><article><h2>Check a paraphrase</h2><p>Review non-native phrasing after you have written and cited the idea yourself.</p><p><a href="/academic-paraphrasing-tool-for-esl-students/">Open paraphrasing support</a></p></article><article><h2>Build the reference</h2><p>Generate a citation after checking the original source information.</p><p><a href="/citations/">Open Citation Generator</a></p></article></section>
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
  "/annotated-bibliography-example/": `
    <p class="eyebrow">Source-based writing practice</p>
    <h1>Annotated bibliography example: citation, summary, and evaluation</h1>
    <p class="lead">Use a clear workflow to show what a source says, assess its usefulness, and explain how it informs a focused research project.</p>
    <section><h2>An annotation adds analysis beyond a reference entry</h2><p>An annotated bibliography lists sources and adds a brief note for each one. Depending on the assignment, an annotation may summarize the source, evaluate its authority or limits, and reflect on how it fits the research question. Citation style, length, headings, and required annotation type must follow the assignment instructions.</p></section>
    <section><h2>A practical annotation workflow</h2><ol><li><strong>Cite:</strong> record the source in the required style after checking author, title, container, date, pages, DOI, or URL.</li><li><strong>Summarize:</strong> state the author’s purpose, approach, main claim or finding, and conclusion in accurate wording.</li><li><strong>Evaluate and reflect:</strong> explain relevant strengths, limits, audience, or usefulness for your particular project when your assignment requires it.</li></ol></section>
    <section><h2>Fictional learning example</h2><p>The source details, author, journal, findings, and annotation below are fictional learning material. They are not a real source, research result, or completed student submission, and must not be cited or copied into coursework.</p><p><strong>Fictional APA-style reference:</strong> Nguyen, T. (2025). Planning routines and assignment completion in first-year courses. <em>Journal of Student Learning</em>, 9(2), 41–58. https://doi.org/10.xxxx/example</p><p>Nguyen’s fictional study examines the relationship between weekly planning routines and self-reported assignment completion in first-year courses. The article uses a cross-sectional survey and reports an association between more frequent planning and higher completion scores. Although the fictional design cannot establish causation and depends on self-reported data, it is useful for a project asking how planning practices may relate to students’ deadline management. A further source with observational or longitudinal evidence would be needed to evaluate change over time.</p><p>The annotation identifies a purpose, method, main finding, limit, and specific relevance. It does not say merely that the source is “good” or repeat unrelated background.</p></section>
    <section><h2>Choose the annotation your assignment asks for</h2><ul><li><strong>Summary:</strong> explain the source’s purpose, method or approach, and main conclusion.</li><li><strong>Evaluation:</strong> assess authority, evidence, perspective, limitations, or suitability for a defined audience.</li><li><strong>Reflection:</strong> explain how the source informed, complicated, or did not inform your own research path.</li><li><strong>Combination:</strong> integrate summary and evaluation when the assignment asks for both.</li></ul></section>
    <section><h2>Use authoritative guidance, then follow the assignment</h2><p>The [UNC Writing Center](https://writingcenter.unc.edu/tips-and-tools/annotated-bibliographies/) explains that annotated bibliographies can include citation information, main points, authority assessment, usefulness, perspective, and links to related work. The [George Mason University Writing Center](https://writingcenter.gmu.edu/writing-resources/research-based-writing/a-guide-to-annotated-bibliographies) distinguishes summary, evaluation, and reflection, while [Purdue OWL](https://owl.purdue.edu/owl/general_writing/common_writing_assignments/annotated_bibliographies/index.html) frames annotations as summaries and/or evaluations. Your instructor determines required elements, length, and citation style.</p></section>
    <section class="seo-grid"><article><h2>Evaluate the source</h2><p>Check author, purpose, evidence, currency, and cross-checking before writing the annotation.</p><p><a href="/evaluate-academic-sources/">Use the source-evaluation checklist</a></p></article><article><h2>Check the citation</h2><p>Generate and review a reference only after verifying source details.</p><p><a href="/citations/">Open Citation Generator</a></p></article><article><h2>Synthesize across sources</h2><p>Use source notes to identify relationships before drafting a literature review.</p><p><a href="/literature-review-synthesis-matrix/">Use the synthesis matrix guide</a></p></article></section>
    ${tools}`,
  "/evaluate-academic-sources/": `<p class="eyebrow">Research foundations</p><h1>How to evaluate academic sources</h1><p class="lead">Use this student checklist to examine authorship, purpose, evidence, timeliness, references, and cross-checking before you cite.</p><section><h2>Check more than the website design</h2><p>Identify the author and relevant expertise, ask why the source was created, inspect its evidence and references, and decide whether the date suits your discipline. Cross-check important factual claims with other reliable sources.</p><p><a href="https://owl.purdue.edu/owl/research_and_citation/conducting_research/evaluating_sources_of_information/general_guidelines.html" target="_blank" rel="noreferrer">Read Purdue OWL source-evaluation guidance</a>.</p></section><section><h2>Source evaluation self-check</h2><ul><li>Can you identify the author, affiliation, and relevant expertise?</li><li>What is the source trying to explain, sell, or persuade?</li><li>Does it show evidence and references you can follow?</li><li>Can you cross-check important claims?</li></ul></section><p><a href="/research-question-examples/">Develop a research question</a> · <a href="/academic-integrity-and-source-use/">Use sources responsibly</a>.</p>${tools}`,
  "/research-question-examples/": `<p class="eyebrow">Research foundations</p><h1>Research question examples</h1><p class="lead">Turn a broad topic into a clear, focused, complex, and arguable research question with a practical self-check.</p><section><h2>What makes a research question useful?</h2><p>A useful question is clear, narrow enough for the assignment, and difficult to answer with a quick fact lookup. It directs research and analysis rather than merely naming a topic.</p><p><a href="https://writingcenter.gmu.edu/writing-resources/research-based-writing/how-to-write-a-research-question" target="_blank" rel="noreferrer">Read George Mason University Writing Center guidance</a>.</p></section><section><h2>Fictional learning example</h2><p>Rather than asking “What is social media?”, a student might ask how a defined platform’s privacy settings affect a specified group’s willingness to share personal information. The revised question names a context and invites evidence-based analysis.</p></section><p><a href="/evaluate-academic-sources/">Evaluate sources</a> · <a href="/academic-argument-evidence/">Build an evidence-based argument</a>.</p>${tools}`,
  "/academic-argument-evidence/": `<p class="eyebrow">Research foundations</p><h1>Academic argument and evidence</h1><p class="lead">Use a claim–evidence–explanation–limitation framework to write academic paragraphs readers can follow.</p><section><h2>Evidence needs explanation</h2><p>Make a claim, introduce relevant evidence, explain why it matters to the claim, and acknowledge limits where they affect the conclusion. Do not let a citation or quotation stand in place of analysis.</p><p><a href="https://owl.purdue.edu/owl/general_writing/academic_writing/establishing_arguments/research_and_evidence.html" target="_blank" rel="noreferrer">Read Purdue OWL guidance on research and evidence</a>.</p></section><section><h2>Paragraph self-check</h2><ul><li>Can a reader identify the main claim?</li><li>Is the evidence specific and cited?</li><li>Have you explained the connection?</li><li>Have you avoided claiming more than the evidence supports?</li></ul></section><p><a href="/literature-review-synthesis-matrix/">Synthesize sources</a> · <a href="/polish/">Polish a paragraph</a>.</p>${tools}`,
  "/literature-review-example/": `
    <p class="eyebrow">Literature review practice</p>
    <h1>Literature review example: synthesize by theme</h1>
    <p class="lead">Move from isolated source notes to thematic synthesis, then describe a cautious research gap without claiming that no research exists.</p>
    <section><h2>A review maps a scholarly conversation</h2><p>A literature review explains what relevant scholarship says, how studies connect or differ, and what the pattern means for a focused research problem. It usually needs both summary and synthesis. A sequence of one-source summaries rarely shows readers how the evidence relates.</p></section>
    <section><h2>Organize sources around a meaningful pattern</h2><ul><li>Group sources by a theme, debate, approach, population, or time period only when that structure helps readers understand the question.</li><li>Compare what each source studies, how it studies it, what it finds, and where scope or design differs.</li><li>Describe a gap as a specific limit, unresolved difference, context, outcome, or method that follows from the sources you reviewed.</li></ul></section>
    <section><h2>Fictional learning example: thematic synthesis paragraph</h2><p>This is a fictional learning example. The studies, authors, findings, and citation below are invented for practice, not real research evidence or sources to submit. Across the fictional studies, planning tools appear most useful when they make upcoming deadlines visible and fit into students’ existing routines. Study A links frequent planning with self-reported completion, while Study B narrows the possible mechanism to noticing deadlines rather than demonstrating completed work. Study C further suggests that routine flexibility may shape whether students use planning consistently. Together, these findings point to a need for research that examines completion outcomes alongside students’ work schedules rather than treating planning as a uniform practice (Fictional Author, year).</p><p>The paragraph begins with a theme, compares sources, identifies a limit, and ends with a cautious next question. It does not announce one source after another or claim that the fictional evidence proves causation.</p></section>
    <section><h2>Check research-gap wording</h2><ul><li>Does the proposed limit describe the sources you actually reviewed?</li><li>Have you named a population, setting, method, outcome, or disagreement that makes the next question focused?</li><li>Have you avoided saying “no studies exist” unless a transparent search process supports that strong claim?</li><li>Does the next question follow from the synthesis rather than a topic you simply prefer?</li></ul></section>
    <section><h2>Use university guidance</h2><p>The [George Mason University Writing Center literature-review guide](https://writingcenter.gmu.edu/writing-resources/research-based-writing/writing-a-literature-review) explains that a review requires synthesis and should be organized by shared topics or themes rather than source sequence. The [UNC Writing Center](https://writingcenter.unc.edu/tips-and-tools/literature-reviews/) describes thematic, chronological, and methodological options, while [Johns Hopkins Libraries](https://guides.library.jhu.edu/lit-review/synthesize) explains how a synthesis matrix helps writers see source relationships.</p></section>
    <section class="seo-grid"><article><h2>Build a synthesis matrix</h2><p>Sort source notes by theme before drafting a literature-review paragraph.</p><p><a href="/literature-review-synthesis-matrix/">Use the synthesis matrix guide</a></p></article><article><h2>Refine the next question</h2><p>Turn a cautiously identified limitation into a focused research question.</p><p><a href="/research-question-examples/">Use the research question checklist</a></p></article><article><h2>Use careful phrases</h2><p>Adapt language for research gaps, comparisons, and synthesis to your own verified details.</p><p><a href="/phrases/introduction/">Browse Introduction phrases</a></p></article></section>
    ${tools}`,
  "/literature-review-synthesis-matrix/": `
    <p class="eyebrow">Literature review practice</p><h1>How to synthesize sources in a literature review</h1><p class="lead">Use a synthesis matrix, a fictional paragraph example, and a source-based checklist to move beyond author-by-author summaries.</p>
    <section><h2>What synthesis means</h2><p>Synthesis puts multiple sources in conversation around a theme, question, or method. It identifies agreement, difference, limits, and relevant unanswered questions. It is not a sequence of summaries or a reason to force a relationship between unrelated sources.</p><p><a href="https://owl.purdue.edu/owl/research_and_citation/conducting_research/research_overview/synthesizing_sources.html" target="_blank" rel="noreferrer">Read Purdue OWL guidance on synthesizing sources</a>.</p></section>
    <section><h2>Build a simple synthesis matrix</h2><p>Put sources across the top and themes or variables down the side. For each cell, note the claim or limitation that matters for that theme. Review the matrix to find patterns, disagreement, evidence limits, and focused questions for further research.</p></section>
    <section><h2>Fictional learning example</h2><p>Studies in this fictional example suggest that regular planning may be associated with assignment completion, but they do not support the same conclusion equally. Source A reports a positive association across its sample, whereas Source B observes the pattern only among first-year students. Taken together, the studies point to a possible relationship while also showing that self-reported measures and small local samples limit generalisation.</p><p>This paragraph groups sources by theme and makes a cautious conclusion; it does not invent a research gap or claim causation.</p></section><section><h2>Synthesis self-check</h2><ul><li>Is each paragraph organised by a theme or question rather than author order?</li><li>Have you shown agreement, difference, or different conditions?</li><li>Are citations close to the ideas they support?</li><li>Is any claimed research gap specific and supported by your reviewed sources?</li></ul><p><a href="/blog/how-to-write-a-literature-review-for-international-students/">Read the literature review guide</a> · <a href="/academic-integrity-and-source-use/">Use sources responsibly</a>.</p></section>${tools}`,
  "/results-section-example-research-paper/": `
    <p class="eyebrow">Research paper results practice</p><h1>Results section example for a research paper</h1><p class="lead">Use this fictional learning example, structure template, and self-check to report research findings clearly without turning Results into Discussion.</p>
    <section><h2>What belongs in a Results section?</h2><p>Organise relevant findings around a research question, hypothesis, or named theme. Report findings in a logical order, use past tense, and refer to tables or figures in numerical order. Explain what the findings mean in the Discussion, not here.</p><p><a href="https://library.sacredheart.edu/c.php?g=29803&p=185931" target="_blank" rel="noreferrer">Read university guidance on reporting results</a>.</p></section>
    <section><h2>Fictional quantitative example</h2><p>To examine whether weekly planning was associated with assignment completion, a linear regression was conducted. Planning frequency was positively associated with completion score, b = 0.31, p = .02. As shown in Table 1, participants who reported planning at least four days per week had a higher mean completion score than participants who reported planning one day or fewer.</p><p>This learning example reports analysis, finding, and table reference. It does not explain why the association occurred.</p></section><section><h2>Results self-check</h2><ul><li>Does each paragraph answer a research question or report a named theme?</li><li>Have you removed speculation and interpretation?</li><li>Have you reported negative or unexpected findings when relevant?</li><li>Does every table or figure appear in the text?</li></ul><p><a href="/phrases/results/">Open Results phrases</a> · <a href="/research-paper-templates/">Use the section planner</a>.</p></section>${tools}`,
  "/methodology-vs-methods-research-paper/": `
    <p class="eyebrow">Research methods guide</p>
    <h1>Methodology vs. methods in a research paper</h1>
    <p class="lead">Learn what each term means, what readers need to know about a design, and how to keep procedures, rationale, and results in their proper places.</p>
    <section class="seo-grid"><article><h2>Methods: what you did</h2><p>Methods are concrete procedures used to investigate a question. Depending on the study, this may include participants or data sources, materials, sampling, data collection, measures, analytical steps, and relevant ethical procedures.</p></article><article><h2>Methodology: why the approach fits</h2><p>Methodology explains the reasoning for a research approach and the relationship among a problem, design, assumptions, and chosen methods. In some assignments, “methodology section” includes both rationale and procedures; follow the required convention in your field.</p></article></section>
    <section><h2>What a reader usually needs from a methods or methodology section</h2><ul><li><strong>Research design:</strong> state the qualitative, quantitative, mixed-methods, archival, experimental, or other approach accurately.</li><li><strong>Data or participants:</strong> explain what was studied, how it was selected, and relevant setting or criteria.</li><li><strong>Collection or generation:</strong> describe interviews, surveys, observations, documents, measurements, datasets, or other procedures.</li><li><strong>Analysis:</strong> name how information was processed and why that process addresses the question.</li><li><strong>Rationale:</strong> explain why the approach fits when readers may not see the connection directly.</li><li><strong>Limitations and ethics:</strong> acknowledge relevant limits and safeguards when the assignment expects them.</li></ul></section>
    <section><h2>Fictional learning example</h2><p>This is a fictional learning example, not real research or a template to submit unchanged. A fictional study used semi-structured interviews with first-year students to explore how they described adapting weekly planning routines around paid work. Interviews were transcribed and analyzed thematically. The qualitative design was chosen because the question focused on participants’ accounts of routine adjustment rather than measuring the size of an association. The example describes what was done and gives a limited rationale; it does not report themes or interpret findings.</p></section>
    <section><h2>Keep the section boundaries clear</h2><ul><li>Do not turn Methods into a literature review unless a methodological source is necessary to justify the choice.</li><li>Do not report findings, themes, or interpretations before Results or Discussion when your discipline separates those functions.</li><li>Do not describe a procedure as replicable unless you provide the transparency and detail your field expects.</li><li>Do not claim causation, representation, or generalisability unless the design and sampling support that claim.</li></ul></section>
    <section><h2>Use a discipline-aware definition</h2><p>[USC Libraries](https://libguides.usc.edu/writingguide/methodology) explains that a methods section describes research actions and the rationale for procedures used to obtain and analyze information. Its guide distinguishes methods as technical steps from methodology as underlying reasoning for why particular methods were chosen. Requirements differ across empirical, qualitative, humanities, proposal, and thesis writing, so the course guide, journal, or supervisor remains controlling.</p></section>
    <section class="seo-grid"><article><h2>Use a Methods example</h2><p>Plan design, participants, collection, analysis, and limitations with a fictional section example.</p><p><a href="/methodology-section-example-research-paper/">Read the Methodology guide</a></p></article><article><h2>Find Methods phrases</h2><p>Adapt sentence starters for design, sampling, data collection, and analysis.</p><p><a href="/phrases/methods/">Open Methods phrases</a></p></article><article><h2>Separate Results</h2><p>Report what data shows before interpreting what it means.</p><p><a href="/results-section-example-research-paper/">Read the Results guide</a></p></article></section>
    ${tools}`,
  "/methodology-section-example-research-paper/": `
    <p class="eyebrow">Research methodology planner</p><h1>Methodology section example for a research paper</h1><p class="lead">Use this fictional learning example and planner to describe research design, participants or sources, procedures, analysis, and limitations with precise academic English.</p>
    <section><h2>What should a Methodology section answer?</h2><p>A reader should be able to see how information was collected or generated and how it was analysed. Explain your design, selection route, procedures, analysis, rationale, and relevant limitations; report findings in Results instead.</p><p><a href="https://libguides.usc.edu/writingguide/methodology" target="_blank" rel="noreferrer">Read USC Library methodology guidance</a>.</p></section>
    <section><h2>Fictional methodology example</h2><p>This study used a cross-sectional survey design to examine the association between weekly planning and assignment completion among undergraduate students. Participants were recruited through [approved course channel] and completed an anonymous online questionnaire. Responses were screened using predefined inclusion criteria. Descriptive statistics and linear regression were used to examine the relationship between planning frequency and completion score.</p><p>This learning example provides a design, selection route, procedure, and analysis. Replace every bracketed placeholder with verified details from your own study.</p></section><section><h2>Methodology self-check</h2><ul><li>Have you stated and justified the design?</li><li>Can a reader understand how data, participants, or sources were selected?</li><li>Have you described collection and analysis procedures?</li><li>Have you separated methods from results and interpretation?</li></ul><p><a href="/methodology-vs-methods-research-paper/">Compare methodology and methods</a> · <a href="/phrases/methods/">Open Methods phrases</a> · <a href="/research-paper-templates/">Use the section planner</a>.</p></section>${tools}`,
  "/apa-7-non-english-sources/": `
    <p class="eyebrow">APA 7 source-use guide</p>
    <h1>APA 7: cite foreign-language and translated sources</h1>
    <p class="lead">Choose the citation path that matches the version you actually read. Do not replace original source details with an invented translation or romanization.</p>
    <section><h2>Start with the version you used</h2><p>APA guidance begins with the work you consulted. If you read an original non-English work, record its reference information in the original language and add a title translation in square brackets in the language of your paper. If you read a published translation, cite that published translation and credit the translator where the format requires it.</p></section>
    <section class="seo-grid"><article><h2>Original non-English work</h2><p>Keep author, date, title, and source information in the work’s original language; add only a bracketed translation of the title for readers of your paper.</p></article><article><h2>Non-Roman script</h2><p>When a source title uses a non-Roman alphabet, use a recognized romanization or transliteration appropriate to the writing language, then add the translated title in square brackets.</p></article><article><h2>Published translation</h2><p>Cite the translated version you read. APA Style explains that a translated work credits the translator and can include the original publication year in the reference and in-text citation.</p></article></section>
    <section><h2>Fictional learning examples</h2><p>The names, titles, journals, publishers, dates, and links below are invented for learning. They are not real references and must not be submitted, copied, or used to infer correct romanization of an actual source.</p><ul><li><strong>Original-language title:</strong> Fictional Author. (2025). Título original del estudio <em>[English translation of title]</em>. <em>Fictional Journal</em>, 8(1), 10–24. Keep source details in the original language and translate only the title in square brackets.</li><li><strong>Non-Roman script:</strong> Fictional Author. (2025). Romanized source title <em>[English translation of title]</em>. Publisher. Use recognized transliteration; do not guess spelling from a machine translation or browser preview.</li><li><strong>Published translation:</strong> Fictional Author. (2025). <em>English title</em> (A. Translator, Trans.). Fictional Press. (Original work published 2018). Use the language of the translation you read and credit the translator according to source type.</li></ul></section>
    <section><h2>Check before you generate a citation</h2><ul><li>Which version did you actually read: original work, translated edition, later edition, or a quotation of a translation?</li><li>Does the source use a Roman alphabet or a script needing recognized transliteration?</li><li>Have you separated the title translation in square brackets from the original or romanized title?</li><li>Does the course, journal, or supervisor require a particular transliteration standard?</li><li>Have you verified author names, dates, translator credits, container details, pages, DOI, and URLs from the source record?</li></ul></section>
    <section><h2>Use APA guidance first</h2><p>[APA Style](https://apastyle.apa.org/blog/citing-works-written-another-language) explains that a reference to a work in another language keeps the work’s original reference information and places a title translation in square brackets. Its [transliterated-title guidance](https://apastyle.apa.org/blog/transliterated-titles-references) calls for transliteration followed by the bracketed translation for non-Roman writing systems. When you cite a [published translation](https://apastyle.apa.org/blog/citing-translated-works), create the reference in the language of the translation you used and credit the translator as required. The [University of Melbourne APA 7 guide](https://library.unimelb.edu.au/recite/referencing-styles/apa7/referencing-non-english-sources) offers worked explanations for original-language sources, transliteration, and translated works. Follow an assignment or publisher if it specifies otherwise.</p></section>
    <section class="seo-grid"><article><h2>Check APA examples</h2><p>Review common APA reference and in-text citation structures before applying language-specific details.</p><p><a href="/citation-examples/">Read APA citation examples</a></p></article><article><h2>Generate, then verify</h2><p>Use the Citation Generator only with checked source metadata and compare output to APA guidance.</p><p><a href="/citations/">Open Citation Generator</a></p></article><article><h2>Evaluate a source</h2><p>Confirm authorship, publisher, purpose, evidence, and the source record before you cite.</p><p><a href="/evaluate-academic-sources/">Use the source checklist</a></p></article></section>
    ${tools}`,
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
