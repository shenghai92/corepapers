import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  renderBlogArticle,
  renderStaticPage,
  staticSeoStyles,
} from "./static-seo-content.mjs";

const BASE_URL = "https://corepapers.space";
const TODAY = new Date().toISOString().slice(0, 10);
const ROOT = resolve(process.cwd());
const BLOG_SOURCE = resolve(ROOT, "client/src/content/blogArticles.ts");
const DIST_PUBLIC_DIR = resolve(ROOT, "dist/public");
const INDEX_HTML = resolve(DIST_PUBLIC_DIR, "index.html");

const HOME_SEO = {
  title: "CorePapers: AI Academic Writing Tool for International Students",
  description:
    "Improve non-native academic English, find sentence templates for research papers, and create APA, MLA, Chicago, and IEEE citations with CorePapers.",
  keywords:
    "CorePapers, AI academic writing tool, academic English for international students, AI essay polisher, academic phrase bank, citation generator",
};

const BLOG_INDEX_SEO = {
  title:
    "Academic Writing Guides and ESL Essay Help for International Students | CorePapers",
  description:
    "Read practical academic writing guides, research-paper examples, ESL revision advice, phrase templates, and citation help for international students.",
  keywords:
    "academic writing guides, ESL essay help, research paper writing guide, academic writing tips for international students, citation guides",
};

const STATIC_PAGE_SEO = {
  "/polish": {
    title:
      "AI Essay Polisher for ESL and Non-Native English Writing | CorePapers",
    description:
      "Use an AI essay polisher to improve non-native expressions, academic tone, and sentence clarity in essays, reports, and research papers.",
    keywords:
      "AI essay polisher, essay polisher for ESL students, academic English revision, non-native English writing help, academic writing tool",
  },
  "/phrases": {
    title:
      "Academic Phrase Bank and Sentence Starters for Research Papers | CorePapers",
    description:
      "Browse an academic phrase bank with sentence starters for essays, literature reviews, methods, results, discussion sections, and research papers.",
    keywords:
      "academic phrase bank, sentence starters for research papers, academic phrases for essays, methods section phrases, results section phrases",
  },
  "/phrases/introduction": {
    title: "Academic Phrases for Research Paper Introductions | CorePapers",
    description: "Use academic introduction phrases to establish context, identify a research gap, state a purpose, and introduce a focused research question.",
    keywords: "introduction section phrases, research paper introduction sentence starters, research gap phrases, academic introduction phrases",
  },
  "/phrases/discussion": {
    title: "Academic Phrases for Discussion Sections | CorePapers",
    description: "Use academic discussion phrases to interpret findings, compare them with prior research, explain limitations, and state cautious implications.",
    keywords: "discussion section phrases, academic phrases for discussion, interpreting results phrases, limitations and implications phrases",
  },
  "/phrases/conclusion": {
    title: "Academic Phrases for Research Paper Conclusions | CorePapers",
    description: "Use conclusion phrases to return to a research question, summarize a contribution, state a careful implication, and identify a focused next step without adding new evidence.",
    keywords: "conclusion phrases research paper, conclusion sentence starters academic writing, research paper conclusion phrases",
  },
  "/phrases/literature-review": {
    title: "Academic Phrases for Literature Reviews and Source Synthesis | CorePapers",
    description: "Use literature review phrases to synthesize studies by theme, compare findings, signal a cautious research gap, and maintain your own academic voice.",
    keywords: "literature review phrases, synthesis phrases academic writing, research gap phrases, compare studies phrases",
  },
  "/phrases/methods": {
    title: "Academic Phrases for Methods Sections | CorePapers",
    description:
      "Find academic sentence starters for methodology and methods sections, including research design, data collection, participants, and analysis.",
    keywords:
      "methods section phrases, methodology section sentence starters, academic phrases for research methods, data collection phrases",
  },
  "/phrases/results": {
    title: "Academic Phrases for Reporting Research Results | CorePapers",
    description:
      "Use academic phrases for reporting quantitative and qualitative research results, tables, findings, themes, and statistical patterns.",
    keywords:
      "results section phrases, phrases for reporting research results, academic phrases for findings, quantitative results writing",
  },
  "/citations": {
    title:
      "Free Citation Generator for APA 7, MLA, Chicago, and IEEE | CorePapers",
    description:
      "Generate APA 7, MLA 9, Chicago 18, and IEEE references and in-text citations for common student source types.",
    keywords:
      "free citation generator, APA 7 citation generator, MLA citation generator, Chicago citation generator, IEEE citation generator",
  },
  "/pricing": {
    title: "CorePapers Pricing: AI Academic Writing Support for Students",
    description:
      "Compare CorePapers plans for academic essay polishing, phrase support, and citation generation. Start free and upgrade when your writing load grows.",
    keywords:
      "academic writing tool pricing, AI essay polisher pricing, citation generator pricing, student writing tool pricing",
  },
  "/research-paper-outline-template": {
    title: "Research Paper Outline Template: Structure and Evidence Plan | CorePapers",
    description: "Use a flexible research paper outline template to organize a thesis, claims, evidence, section functions, and revision checks without treating one outline as universal.",
    keywords: "research paper outline template, research paper outline example, how to outline research paper, academic paper outline",
  },
  "/research-proposal-template": {
    title: "Research Proposal Template: Structure, Example, and Checklist | CorePapers",
    description: "Use a flexible research proposal template to plan a research problem, rationale, question, literature review, methods, feasibility, and references with a fictional learning example.",
    keywords: "research proposal template, research proposal outline, research proposal example, research proposal structure, how to write research proposal",
  },
  "/research-gap-examples": {
    title: "Research Gap Examples: Find and State a Focused Gap | CorePapers",
    description: "Learn how to identify and write a cautious research gap with conceptual, methodological, and empirical examples, a fictional learning example, and a feasibility checklist.",
    keywords: "research gap examples, how to identify research gap, research gap statement, research gap in literature review, how to write research gap",
  },
  "/research-paper-sections": {
    title:
      "How to Write Research Paper Sections: Guides and Examples | CorePapers",
    description:
      "Learn how to write research-paper introductions, methods, results, and discussion sections with structure guides, examples, and academic phrases.",
    keywords:
      "research paper sections, how to write methods section, results section examples, discussion section guide, research paper introduction",
  },
  "/research-paper-revision-checklist": {
    title: "Research Paper Revision Checklist: Eight Steps | CorePapers",
    description:
      "Use a research paper revision checklist to check assignment fit, thesis, organization, paragraphs, evidence, citations, limits, academic English, and submission responsibility.",
    keywords:
      "research paper revision checklist, research paper editing checklist, revise research paper, academic paper checklist, revise essay international students",
  },
  "/academic-writing-for-graduate-students": {
    title: "Academic Writing for Graduate Students: A Practical Guide | CorePapers",
    description: "Build stronger graduate-level academic writing with a practical guide to audience, genres, argument, evidence, source workflow, revision, and sustainable writing habits.",
    keywords: "academic writing for graduate students, graduate academic writing, graduate student writing guide, academic writing skills graduate students, writing research paper graduate school",
  },
  "/hedging-language-academic-writing": {
    title: "Hedging Language in Academic Writing: Examples and Guide | CorePapers",
    description: "Use hedging language in academic writing to match claims to evidence. Learn cautious academic phrases, fictional examples, revision checks, and when not to hedge.",
    keywords: "hedging language academic writing, hedging examples academic writing, cautious language academic writing, academic hedging phrases, how to hedge academic claims",
  },
  "/academic-english-for-esl-students": {
    title:
      "Academic English Support for ESL and International Students | CorePapers",
    description:
      "Improve academic English with practical help for ESL writing mistakes, literal translation, academic tone, hedging, and sentence clarity.",
    keywords:
      "academic English for ESL students, academic writing help for international students, ESL academic writing, non-native English writing",
  },
  "/academic-integrity-and-source-use": {
    title:
      "Academic Integrity and Source Use for International Students | CorePapers",
    description:
      "Learn when to quote, paraphrase, or summarize a source, how to keep citations clear, and how to review AI-assisted academic writing responsibly.",
    keywords:
      "academic integrity for international students, paraphrasing vs quoting vs summarizing, how to cite a paraphrase, source use in academic writing",
  },
  "/academic-writing-examples": {
    title:
      "Academic Writing Examples for Research Papers and Essays | CorePapers",
    description:
      "Study clear, labelled examples of source-based writing, methods descriptions, and results reporting, with explanations for international students.",
    keywords:
      "academic writing examples, research paper examples, paraphrasing example, methods section example, results section example",
  },
  "/research-paper-templates": {
    title:
      "Research Paper Templates for Methods, Results, and Discussion | CorePapers",
    description:
      "Use flexible research paper templates and checklists for methods, results, and discussion sections, designed for international students writing in academic English.",
    keywords:
      "research paper template, methods section template, results section template, discussion section template, research writing checklist",
  },
  "/annotated-bibliography-example": {
    title: "Annotated Bibliography Example: Citation, Summary, Evaluation, and Reflection | CorePapers",
    description: "Use a fictional annotated bibliography example and a practical checklist to distinguish citation, source summary, evaluation, and research relevance.",
    keywords: "annotated bibliography example, how to write annotated bibliography, annotated bibliography template, annotated bibliography summary evaluation",
  },
  "/evaluate-academic-sources": {
    title: "How to Evaluate Academic Sources: A Student Checklist | CorePapers",
    description:
      "Evaluate academic sources by checking authorship, purpose, evidence, timeliness, references, and cross-checking before you cite.",
    keywords:
      "evaluate academic sources checklist, credible sources research paper, source credibility checklist",
  },
  "/research-question-examples": {
    title:
      "Research Question Examples: Clear, Focused, and Arguable | CorePapers",
    description:
      "Turn a broad topic into a clear, focused, complex, and arguable research question with fictional examples and a revision checklist.",
    keywords:
      "research question examples, how to write a research question, focused research question",
  },
  "/thesis-statement-examples": {
    title: "Thesis Statement Examples: Make an Academic Claim Specific and Arguable | CorePapers",
    description: "Build a clearer thesis statement by turning a broad topic into a specific, arguable, evidence-led claim with a fictional learning example and checklist.",
    keywords: "thesis statement examples, academic thesis statement, how to write thesis statement, arguable thesis claim",
  },
  "/academic-paragraph-structure": {
    title: "Academic Paragraph Structure: Topic Sentence, Evidence, and Explanation | CorePapers",
    description: "Build clearer academic paragraphs with a topic sentence, relevant evidence, explanation, and a purposeful link to the next idea.",
    keywords: "academic paragraph structure, topic sentence evidence explanation, research paragraph structure",
  },
  "/academic-argument-evidence": {
    title: "Academic Argument and Evidence: A Paragraph Framework | CorePapers",
    description:
      "Use a claim–evidence–explanation–limitation framework to write academic paragraphs readers can follow.",
    keywords:
      "academic argument evidence example, claim evidence explanation, research paper argument",
  },
  "/literature-review-example": {
    title: "Literature Review Example: Thematic Synthesis and Research Gap | CorePapers",
    description: "Use a fictional literature review example to organize sources by theme, write synthesis paragraphs, and identify a cautious research gap without listing one study at a time.",
    keywords: "literature review example, literature review synthesis example, thematic literature review, research gap example, how to write literature review",
  },
  "/literature-review-synthesis-matrix": {
    title:
      "How to Synthesize Sources in a Literature Review: Matrix and Example | CorePapers",
    description:
      "Learn how to synthesize sources in a literature review with a simple synthesis matrix, a fictional paragraph example, and a source-based writing checklist.",
    keywords:
      "how to synthesize sources literature review, synthesis matrix example, literature review synthesis example, research gap literature review",
  },
  "/international-sources-literature-review": {
    title: "International and Non-English Sources in a Literature Review | CorePapers",
    description:
      "Learn how to use international and non-English sources in a literature review: scope language-aware searches, verify actual versions, synthesize by theme, translate carefully, and cite responsibly.",
    keywords:
      "foreign literature in research paper, international sources literature review, non-English sources research paper, multilingual literature review, foreign language academic sources",
  },
  "/how-to-write-an-abstract-research-paper": {
    title: "How to Write an Abstract for a Research Paper: Example and Checklist | CorePapers",
    description: "Learn how to write a research paper abstract with a fictional learning example, IMRaD structure, revision checklist, and academic phrase guidance for international students.",
    keywords: "how to write an abstract research paper, abstract example research paper, research abstract template, IMRaD abstract structure",
  },
  "/introduction-section-example-research-paper": {
    title: "Introduction Section Example for a Research Paper: Structure and Template | CorePapers",
    description: "Use a fictional research-paper introduction example, a practical structure, and a checklist for moving from context to a focused research purpose.",
    keywords: "introduction section example research paper, research paper introduction template, how to write introduction research paper",
  },
  "/conclusion-section-example-research-paper": {
    title: "Conclusion Section Example for a Research Paper: Template and Checklist | CorePapers",
    description: "Use a fictional conclusion section example, a research-paper conclusion template, and a checklist for summarizing contributions without repeating the abstract.",
    keywords: "conclusion section example research paper, research paper conclusion template, how to write conclusion section research paper",
  },
  "/discussion-section-example-research-paper": {
    title: "Discussion Section Example for a Research Paper: Template and Checklist | CorePapers",
    description: "Use a fictional discussion section example, a research-paper discussion template, and a checklist for interpreting findings without overstating evidence.",
    keywords: "discussion section example research paper, discussion section template, how to write discussion section research paper",
  },
  "/how-to-write-discussion-section": {
    title: "How to Write a Discussion Section: Structure and Checklist | CorePapers",
    description: "Learn how to write a discussion section for a research paper: interpret findings, compare prior research, address limitations, state careful implications, and avoid repeating Results.",
    keywords: "how to write discussion section, discussion section research paper, discussion section structure, how to discuss research findings, results vs discussion section",
  },
  "/results-section-example-research-paper": {
    title:
      "How to Write a Results Section for a Research Paper: Example and Checklist | CorePapers",
    description:
      "Learn how to write a results section for a research paper with a fictional example, practical template, and checklist for reporting findings without turning them into discussion.",
    keywords:
      "how to write results section research paper, how to write a results section for a research paper, results section example research paper, results section sample, research paper results section example, results section template",
  },
  "/methodology-vs-methods-research-paper": {
    title: "Methodology vs. Methods in a Research Paper: Definition and Example | CorePapers",
    description: "Learn the difference between methodology and methods in a research paper, what belongs in a methods section, and how to explain a rationale without reporting results too early.",
    keywords: "methodology vs methods research paper, what is methodology section, methods section research paper example, research paper methodology format",
  },
  "/methodology-section-example-research-paper": {
    title:
      "How to Write a Methodology or Methods Section: Example and Checklist | CorePapers",
    description:
      "Learn how to write a methodology or methods section for a research paper with a fictional example, eight-step checklist, and guidance on design, selection, procedures, analysis, rationale, limitations, and ethics.",
    keywords:
      "how to write methodology section research paper, how to write a methodology section of a research paper, methodology section example research paper, sample methodology section, methodology section template, methods section research paper, method section research paper",
  },
  "/how-to-paraphrase-without-plagiarizing": {
    title: "How to Paraphrase Without Plagiarizing: Source-Use Process | CorePapers",
    description: "Learn how to paraphrase without plagiarizing through understanding, purpose, restructuring, accuracy checks, and clear source attribution. Includes fictional learning examples and university guidance.",
    keywords: "how to paraphrase without plagiarizing, academic paraphrasing, insufficient paraphrase citation, paraphrasing and citation, avoid patchwriting, paraphrase source use",
  },
  "/chicago-citation-examples": {
    title: "Chicago Citation Examples: Notes–Bibliography and Author–Date | CorePapers",
    description: "Learn Chicago 18 citation with clear Notes–Bibliography and Author–Date comparisons, fictional learning examples, source checks, and official guidance.",
    keywords: "Chicago citation examples, Chicago 18 citation, Chicago notes bibliography examples, Chicago author date examples, Chicago footnote citation, Chicago reference list",
  },
  "/ieee-citation-examples": {
    title: "IEEE Citation Examples: In-Text and Reference List Guide | CorePapers",
    description: "Learn IEEE citation with bracketed in-text numbers, reference-list order, fictional source examples, source verification checks, and official IEEE guidance.",
    keywords: "IEEE citation examples, IEEE in-text citation, IEEE reference list, IEEE citation style guide, IEEE referencing examples, how to cite IEEE",
  },
  "/mla-citation-examples": {
    title: "MLA 9 Citation Examples: Works Cited and In-Text Citations | CorePapers",
    description: "Use clear, labelled MLA 9 Works Cited and in-text citation examples for books, journal articles, and web pages, with a source-detail review checklist.",
    keywords: "MLA citation examples, MLA 9 Works Cited examples, MLA in-text citation examples, how to cite MLA",
  },
  "/apa-7-non-english-sources": {
    title: "APA 7: How to Cite Foreign-Language and Translated Sources | CorePapers",
    description: "Learn how APA 7 handles original non-English works, non-Roman scripts, title translations, transliteration, and published translations with fictional learning examples.",
    keywords: "APA 7 cite foreign language sources, APA non English sources, APA transliteration title, APA translated work citation, how to cite Chinese source APA 7",
  },
  "/citation-examples": {
    title: "APA 7 Citation Examples and In-Text Citation Examples | CorePapers",
    description:
      "Use clear, labelled APA 7 citation examples for common source types and learn what to check before using a citation generator.",
    keywords:
      "APA citation examples, APA 7 reference examples, APA in-text citation examples, citation generator examples, how to cite sources",
  },
  "/apa-citation-generator-for-international-students": {
    title: "APA 7 Citation Generator for International Students | CorePapers",
    description:
      "Create APA 7 references and in-text citations for common academic sources, then check your work with practical APA examples.",
    keywords:
      "APA 7 citation generator, APA citation for international students, APA reference generator, APA in-text citation",
  },
  "/ai-essay-polisher-for-non-native-english-writers": {
    title: "AI Essay Polisher for Non-Native English Writers | CorePapers",
    description:
      "Improve academic tone, sentence clarity, and non-native expressions with an AI essay polisher designed for international students.",
    keywords:
      "AI essay polisher for non-native English writers, academic writing revision, ESL essay polisher, academic English tool",
  },
  "/academic-paraphrasing-tool-for-esl-students": {
    title: "Academic Paraphrasing Tool for ESL Students | CorePapers",
    description:
      "Improve academic paraphrasing for essays and literature reviews while preserving meaning, reducing literal translation, and keeping citations accurate.",
    keywords:
      "academic paraphrasing tool, paraphrasing tool for ESL students, academic paraphrase help, source-based writing support",
  },
  "/academic-writing-alternative-for-international-students": {
    title: "Academic Writing Support for International Students | CorePapers",
    description:
      "Get academic writing support for non-native phrasing, research-paper sentence templates, citation workflow, and explainable revision feedback.",
    keywords:
      "academic writing support for international students, non-native English writing help, academic revision tool",
  },
  "/paraphrasing-alternative-for-academic-writing": {
    title:
      "Academic Paraphrasing Support for Clearer Source-Based Writing | CorePapers",
    description:
      "Improve the clarity and academic tone of source-based writing while preserving meaning and keeping original sources accurately cited.",
    keywords:
      "academic paraphrasing support, paraphrasing for academic writing, source-based writing, academic revision tool",
  },
  "/about": {
    title:
      "About CorePapers and Our Academic Writing Tools for International Students | CorePapers",
    description:
      "Learn about CorePapers, our academic writing tools for international students, and how to contact support for essay polishing, phrase help, and citations.",
    keywords:
      "about CorePapers, academic writing tools for international students, essay polish support, citation help, academic phrase library",
  },
  "/contact": {
    title: "Contact CorePapers Support and Editorial Team | CorePapers",
    description:
      "Contact CorePapers for support questions, account help, billing issues, editorial feedback, and academic writing tool inquiries.",
    keywords:
      "contact CorePapers, CorePapers support, billing help, editorial feedback, academic writing support contact",
  },
  "/editorial-policy": {
    title:
      "CorePapers Editorial Policy for Academic Writing Content | CorePapers",
    description:
      "Read the CorePapers editorial policy, including how academic writing guides are reviewed, updated, and separated from tool outputs.",
    keywords:
      "CorePapers editorial policy, academic writing content standards, educational content policy, content review process",
  },
  "/how-corepapers-content-is-created": {
    title: "How CorePapers Content Is Created and Updated | CorePapers",
    description:
      "Learn how CorePapers plans, writes, revises, and updates academic writing content for international students and multilingual writers.",
    keywords:
      "how CorePapers content is created, academic writing content workflow, multilingual student resources",
  },
  "/ai-use-disclosure-academic-writing": {
    title: "AI Use Disclosure in Academic Writing: Responsible Guide | CorePapers",
    description:
      "Learn how to disclose permitted AI use in academic writing with a practical workflow for policy, privacy, source checks, human review, and responsible submission.",
    keywords:
      "AI use disclosure academic writing, disclose AI use assignment, responsible AI academic writing, AI policy international students, academic integrity AI writing",
  },
  "/privacy": {
    title: "Privacy Policy | CorePapers",
    description:
      "Read the CorePapers privacy policy, including how we handle account details, usage data, and support requests.",
    keywords:
      "CorePapers privacy policy, data handling, account privacy, support request privacy",
  },
  "/terms": {
    title: "Terms of Service | CorePapers",
    description:
      "Read the CorePapers terms of service for account usage, billing, acceptable use, and support.",
    keywords:
      "CorePapers terms of service, billing terms, acceptable use, support terms",
  },
};

const STATIC_PAGES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/polish/", changefreq: "monthly", priority: "0.9" },
  { path: "/phrases/", changefreq: "monthly", priority: "0.9" },
  { path: "/phrases/introduction/", changefreq: "monthly", priority: "0.7" },
  { path: "/phrases/discussion/", changefreq: "monthly", priority: "0.7" },
    {
    path: "/phrases/conclusion/",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/phrases/literature-review/",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/phrases/methods/", changefreq: "monthly", priority: "0.7" },
  { path: "/phrases/results/", changefreq: "monthly", priority: "0.7" },
  { path: "/citations/", changefreq: "monthly", priority: "0.9" },
  { path: "/pricing/", changefreq: "monthly", priority: "0.8" },
    {
    path: "/research-paper-outline-template/",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/research-proposal-template/",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/research-gap-examples/",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/research-paper-sections/", changefreq: "weekly", priority: "0.8" },
  {
    path: "/research-paper-revision-checklist/", changefreq: "monthly", priority: "0.8" },
  {
    path: "/academic-writing-for-graduate-students/",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/hedging-language-academic-writing/",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/academic-english-for-esl-students/",
    changefreq: "weekly",
    priority: "0.8",
  },
  {
    path: "/academic-integrity-and-source-use/",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/academic-writing-examples/",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/research-paper-templates/",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/annotated-bibliography-example/",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/evaluate-academic-sources/",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/research-question-examples/",
    changefreq: "monthly",
    priority: "0.8",
  },
  { path: "/thesis-statement-examples/", changefreq: "monthly", priority: "0.8" },
  { path: "/academic-paragraph-structure/", changefreq: "monthly", priority: "0.8" },
  { path: "/academic-argument-evidence/", changefreq: "monthly", priority: "0.8" },
  {
    path: "/literature-review-example/",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/literature-review-synthesis-matrix/",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/international-sources-literature-review/",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/how-to-write-an-abstract-research-paper/",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/introduction-section-example-research-paper/",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/conclusion-section-example-research-paper/",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/discussion-section-example-research-paper/",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/how-to-write-discussion-section/",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/results-section-example-research-paper/",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/methodology-vs-methods-research-paper/",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/methodology-section-example-research-paper/",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/how-to-paraphrase-without-plagiarizing/",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/chicago-citation-examples/",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/ieee-citation-examples/",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/mla-citation-examples/",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/apa-7-non-english-sources/",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/citation-examples/",
    changefreq: "monthly",
    priority: "0.8",
  },
  { path: "/about/", changefreq: "monthly", priority: "0.5" },
  { path: "/contact/", changefreq: "monthly", priority: "0.5" },
  { path: "/editorial-policy/", changefreq: "monthly", priority: "0.5" },
  {
    path: "/how-corepapers-content-is-created/",
    changefreq: "monthly",
    priority: "0.5",
  },
  {
    path: "/ai-use-disclosure-academic-writing/",
    changefreq: "monthly",
    priority: "0.8",
  },
  { path: "/privacy/", changefreq: "yearly", priority: "0.4" },
  { path: "/terms/", changefreq: "yearly", priority: "0.4" },
  { path: "/blog/", changefreq: "weekly", priority: "0.8" },
  {
    path: "/apa-citation-generator-for-international-students/",
    changefreq: "monthly",
    priority: "0.9",
  },
  {
    path: "/ai-essay-polisher-for-non-native-english-writers/",
    changefreq: "monthly",
    priority: "0.9",
  },
  {
    path: "/academic-paraphrasing-tool-for-esl-students/",
    changefreq: "monthly",
    priority: "0.9",
  },
  {
    path: "/academic-writing-alternative-for-international-students/",
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    path: "/paraphrasing-alternative-for-academic-writing/",
    changefreq: "monthly",
    priority: "0.7",
  },
];

const FAQ_SCHEMA_BY_SLUG = {
  "methodology-section-faq-for-research-papers": [
    {
      question: "How do you write a methodology section for a research paper?",
      answer:
        "Use a planning sequence that explains the research design, participants, sample or data source, data collection, analysis, and relevant ethics or limitations. Follow the headings, length, terminology, and ethics guidance in the assignment because no single structure is universal.",
    },
    {
      question: "What exactly should be included in a methods section?",
      answer:
        "A methods section may explain the design framework, participants or dataset, selection criteria, tools or instruments, procedure, and analysis method. Include the information readers need to understand and evaluate the specific study at the level of detail expected by the discipline.",
    },
    {
      question: "What is the difference between methodology and methods?",
      answer:
        "Methods are the practical procedures and tools used to collect and analyze information. Methodology is the broader reasoning, theory, and justification behind choosing those procedures. Follow the wording of the assignment because use of the terms varies.",
    },
    {
      question: "What tense should I use in the methodology section?",
      answer:
        "Many completed-study reports use past tense for actions already taken. Present tense may appear for general conventions, current-paper references, or a journal style. Match tense to the timeline and follow the requirements of the department or target journal.",
    },
    {
      question: "Can I include results in the methodology section?",
      answer:
        "Usually, a methods or methodology section explains the design, selection, materials, procedure, and analysis, while Results reports what the analysis found. Follow the required format if the discipline uses a combined Methods and Results section.",
    },
    {
      question: "How do I write about ethics without inventing approval?",
      answer:
        "Describe consent, confidentiality, permissions, data handling, or formal review only when the details are accurate for the project. Do not claim institutional approval, anonymous participation, or informed consent unless it occurred, and follow institutional requirements before collecting human-participant data.",
    },
  ],
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

function canonicalPath(path) {
  if (path === "/") return "/";
  return `${path.replace(/\/+$/, "")}/`;
}

function canonicalUrl(path) {
  return `${BASE_URL}${canonicalPath(path)}`;
}

function pageSeo(path) {
  const normalizedPath = canonicalPath(path);
  const base =
    normalizedPath === "/"
      ? HOME_SEO
      : STATIC_PAGE_SEO[normalizedPath.replace(/\/$/, "")];
  if (!base) throw new Error(`Missing SEO metadata for static route: ${path}`);
  const canonical = canonicalUrl(path);
  return {
    ...base,
    canonical,
    ogTitle: base.title,
    ogDescription: base.description,
    twitterTitle: base.title,
    twitterDescription: base.description,
  };
}

function createUrlSet(rows) {
  const urls = rows
    .map(row =>
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
    .map(entry =>
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
  const detailsBySlug = new Map();
  const detailsRegex =
    /slug:\s*"([^"]+)"[\s\S]*?readingTime:\s*(\d+),[\s\S]*?content:\s*`([\s\S]*?)`\s*,?\n\s*},/g;
  let detailsMatch = detailsRegex.exec(source);
  while (detailsMatch) {
    detailsBySlug.set(detailsMatch[1], {
      readingTime: Number(detailsMatch[2]),
      content: detailsMatch[3],
    });
    detailsMatch = detailsRegex.exec(source);
  }

  const articleRegex =
    /slug:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?excerpt:\s*"([^"]+)"[\s\S]*?category:\s*"([^"]+)"[\s\S]*?tags:\s*\[([\s\S]*?)\][\s\S]*?metaDescription:\s*"([^"]+)"[\s\S]*?publishedAt:\s*"([^"]+)"/g;
  const rows = [];
  let match = articleRegex.exec(source);
  while (match) {
    const tags = match[5]
      .split(",")
      .map(tag => tag.trim().replace(/^"|"$/g, ""))
      .filter(Boolean);
    const details = detailsBySlug.get(match[1]);
    if (!details)
      throw new Error(
        `Could not parse static content for blog article: ${match[1]}`
      );
    rows.push({
      loc: `${BASE_URL}/blog/${match[1]}/`,
      slug: match[1],
      title: match[2],
      excerpt: match[3],
      category: match[4],
      tags,
      metaDescription: match[6],
      changefreq: "monthly",
      priority: "0.7",
      lastmod: match[7],
      readingTime: details.readingTime,
      content: details.content,
    });
    match = articleRegex.exec(source);
  }
  return rows;
}

function createRssFeed(rows) {
  const sortedRows = [...rows].sort((a, b) =>
    b.lastmod.localeCompare(a.lastmod)
  );
  const latestDate = sortedRows[0]?.lastmod ?? TODAY;
  const items = sortedRows
    .map(row =>
      [
        "    <item>",
        `      <title>${escapeXml(row.title)}</title>`,
        `      <link>${escapeXml(row.loc)}</link>`,
        `      <guid>${escapeXml(row.loc)}</guid>`,
        `      <pubDate>${new Date(`${row.lastmod}T00:00:00Z`).toUTCString()}</pubDate>`,
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
    `    <link>${BASE_URL}/blog/</link>`,
    "    <description>Academic writing guides, citation tutorials, and ESL-friendly resources for international students.</description>",
    "    <language>en-us</language>",
    `    <lastBuildDate>${new Date(`${latestDate}T00:00:00Z`).toUTCString()}</lastBuildDate>`,
    "",
    items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");
}

function replaceTag(source, pattern, replacement) {
  if (!pattern.test(source))
    throw new Error(`Missing expected HTML pattern: ${pattern}`);
  return source.replace(pattern, replacement);
}

function buildJsonLdScripts(items) {
  return items
    .map(
      item =>
        `    <script type="application/ld+json" data-static-jsonld="true">\n${JSON.stringify(item)}\n    </script>`
    )
    .join("\n");
}

function applySeoToHtml(source, seo, jsonLdScripts = "") {
  let html = source;
  html = replaceTag(
    html,
    /<title>[\s\S]*?<\/title>/,
    `<title>${escapeHtml(seo.title)}</title>`
  );
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
  html = html.replace(
    /\n\s*<script type="application\/ld\+json" data-static-jsonld="true">[\s\S]*?<\/script>/g,
    ""
  );
  if (jsonLdScripts)
    html = html.replace("</head>", `${jsonLdScripts}\n  </head>`);
  return html;
}

function injectStaticRoot(source, staticBody) {
  const root = `<div id="root" data-static-seo-fallback="true">${staticSeoStyles}\n${staticBody}</div>`;
  return replaceTag(source, /<div id="root">[\s\S]*?<\/div>/, root);
}

function htmlWithStaticBody(template, seo, body, jsonLdScripts = "") {
  return injectStaticRoot(applySeoToHtml(template, seo, jsonLdScripts), body);
}

function createHomeIndexHtml(template, blogRows) {
  const seo = pageSeo("/");
  writeFileSync(
    INDEX_HTML,
    htmlWithStaticBody(
      template,
      seo,
      renderStaticPage({ path: "/", seo, blogRows })
    ),
    "utf8"
  );
}

function createBlogIndexHtml(template, blogRows) {
  const seo = {
    ...BLOG_INDEX_SEO,
    canonical: canonicalUrl("/blog/"),
    ogTitle: BLOG_INDEX_SEO.title,
    ogDescription: BLOG_INDEX_SEO.description,
    twitterTitle: BLOG_INDEX_SEO.title,
    twitterDescription: BLOG_INDEX_SEO.description,
  };
  const pageDir = resolve(DIST_PUBLIC_DIR, "blog");
  mkdirSync(pageDir, { recursive: true });
  writeFileSync(
    resolve(pageDir, "index.html"),
    htmlWithStaticBody(
      template,
      seo,
      renderStaticPage({ path: "/blog/", seo, blogRows })
    ),
    "utf8"
  );
}

function staticPageJsonLd(page, seo) {
  const path = canonicalPath(page.path);
  const pageName = seo.title.replace(/ \| CorePapers$/, "");
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: pageName,
      description: seo.description,
      url: seo.canonical,
      inLanguage: "en",
      isAccessibleForFree: true,
      publisher: { "@type": "Organization", name: "CorePapers", url: BASE_URL },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${BASE_URL}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: pageName,
          item: `${BASE_URL}${path}`,
        },
      ],
    },
  ];
}

function createStaticPageHtml(template, blogRows) {
  for (const page of STATIC_PAGES) {
    if (page.path === "/" || page.path === "/blog/") continue;
    const seo = pageSeo(page.path);
    const pageDir = resolve(
      DIST_PUBLIC_DIR,
      page.path.replace(/^\//, "").replace(/\/$/, "")
    );
    mkdirSync(pageDir, { recursive: true });
    writeFileSync(
      resolve(pageDir, "index.html"),
      htmlWithStaticBody(
        template,
        seo,
        renderStaticPage({ path: page.path, seo, blogRows }),
        buildJsonLdScripts(staticPageJsonLd(page, seo))
      ),
      "utf8"
    );
  }
}

function createBlogArticleHtml(template, rows) {
  for (const row of rows) {
    const articleUrl = row.loc;
    const wordCount = row.content.split(/\s+/).filter(Boolean).length;
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
        wordCount,
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
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${BASE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: `${BASE_URL}/blog/`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: row.title,
            item: articleUrl,
          },
        ],
      },
    ];
    const faqItems = FAQ_SCHEMA_BY_SLUG[row.slug] ?? [];
    if (faqItems.length) {
      jsonLdItems.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map(item => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
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
    const articleDir = resolve(DIST_PUBLIC_DIR, "blog", row.slug);
    mkdirSync(articleDir, { recursive: true });
    writeFileSync(
      resolve(articleDir, "index.html"),
      htmlWithStaticBody(
        template,
        seo,
        renderBlogArticle({ row, relatedRows: rows }),
        buildJsonLdScripts(jsonLdItems)
      ),
      "utf8"
    );
  }
}

const blogSource = readFileSync(BLOG_SOURCE, "utf8");
const blogRows = extractBlogEntries(blogSource);
if (blogRows.length === 0)
  throw new Error("No blog rows extracted from blogArticles.ts");
const pageRows = STATIC_PAGES.map(page => ({
  loc: canonicalUrl(page.path),
  changefreq: page.changefreq,
  priority: page.priority,
  lastmod: TODAY,
}));
const template = readFileSync(INDEX_HTML, "utf8");

writeFileSync(
  resolve(DIST_PUBLIC_DIR, "sitemap-pages.xml"),
  createUrlSet(pageRows),
  "utf8"
);
writeFileSync(
  resolve(DIST_PUBLIC_DIR, "sitemap-blog.xml"),
  createUrlSet(blogRows),
  "utf8"
);
const sitemapIndex = createSitemapIndex([
  { loc: `${BASE_URL}/sitemap-pages.xml`, lastmod: TODAY },
  { loc: `${BASE_URL}/sitemap-blog.xml`, lastmod: TODAY },
]);
writeFileSync(resolve(DIST_PUBLIC_DIR, "sitemap.xml"), sitemapIndex, "utf8");
writeFileSync(
  resolve(DIST_PUBLIC_DIR, "google-sitemap.xml"),
  sitemapIndex,
  "utf8"
);
writeFileSync(
  resolve(DIST_PUBLIC_DIR, "bing-sitemap.xml"),
  sitemapIndex,
  "utf8"
);
writeFileSync(
  resolve(DIST_PUBLIC_DIR, "feed.xml"),
  createRssFeed(blogRows),
  "utf8"
);

createHomeIndexHtml(template, blogRows);
createBlogIndexHtml(template, blogRows);
createStaticPageHtml(template, blogRows);
createBlogArticleHtml(template, blogRows);

console.log(
  `[seo] generated static crawler-visible pages: pages=${pageRows.length}, blog=${blogRows.length}, date=${TODAY}`
);
