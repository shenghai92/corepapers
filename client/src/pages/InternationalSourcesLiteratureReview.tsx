import { Link } from "wouter";
import { ArrowRight, BookOpenCheck, Globe2, Languages, SearchCheck } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";

const INTERNATIONAL_SOURCES_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "International and Non-English Sources in a Literature Review",
  description:
    "Learn how to scope, find, verify, synthesize, describe, and cite international and non-English sources in a literature review without treating translation or language as a substitute for source verification.",
  mainEntityOfPage:
    "https://corepapers.space/international-sources-literature-review/",
  author: { "@type": "Organization", name: "CorePapers" },
  publisher: { "@type": "Organization", name: "CorePapers" },
};

const STEPS = [
  ["01", "Clarify what “literature” means in this task", "In a research paper, literature normally means relevant published scholarship or materials on a topic—not only creative works, and not a fixed category called “foreign literature.” Check what your instructor, discipline, journal, or supervisor expects."],
  ["02", "Set a justified scope", "Record topic, population, setting, date range, disciplines, publication types, and language boundaries. A multilingual search can broaden evidence, but a paper does not become more rigorous merely because it lists more languages."],
  ["03", "Build language-aware search paths", "Try accepted topic terms in the research language and in English when you can evaluate them. Use library advanced search fields and language filters, then record database, search terms, date, language filter, and access limits."],
  ["04", "Confirm the actual work and version", "Do not rely only on an English title or abstract. Check the language of the full work, original publication details, available translation, edition, and whether a database language label is accurate."],
  ["05", "Create a source relationship record", "For each usable source, record the original title, author, date, publication details, language, version read, access path, relevant finding or argument, and exact location needed to revisit it."],
  ["06", "Compare themes, methods, and contexts", "Organize a matrix around a question, theme, method, finding, debate, or context—not around countries or languages as decorative headings. Explain when a setting or language changes the meaning, transferability, or limit of an observed pattern."],
  ["07", "Separate translation, paraphrase, and analysis", "A translated title, a translated quotation, a paraphrase of a non-English source, and your own interpretation are different actions. Preserve accurate attribution, identify a published translation where one was read, and do not claim more certainty than you can verify."],
  ["08", "Cite the version used and recheck responsibility", "Apply the required style to the version you actually consulted, verify in-text and reference-list matching, and re-read the review for source scope, language assumptions, and claims you can explain to a reader."],
] as const;

export default function InternationalSourcesLiteratureReview() {
  return (
    <>
      <SEOHead
        title="International and Non-English Sources in a Literature Review | CorePapers"
        description="Learn how to use international and non-English sources in a literature review: scope language-aware searches, verify actual versions, synthesize by theme, translate carefully, and cite responsibly."
        keywords="foreign literature in research paper, international sources literature review, non-English sources research paper, multilingual literature review, foreign language academic sources"
        canonical="/international-sources-literature-review/"
        jsonLd={INTERNATIONAL_SOURCES_SCHEMA}
      />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container max-w-5xl">
          <header className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-sans font-medium mb-4"><Globe2 size={14} /> Literature review and source responsibility</div>
            <h1 className="font-serif font-light text-4xl sm:text-5xl text-slate-purple mb-4 leading-tight">International and non-English sources in a <span className="italic">literature review</span></h1>
            <p className="text-muted-foreground font-sans leading-relaxed text-lg">Use a language-aware research process to find, verify, synthesize, describe, and cite relevant scholarship without treating translation, nationality, or a database label as proof of what a source says.</p>
          </header>

          <section className="p-7 bg-white border border-border rounded-2xl">
            <h2 className="font-serif text-3xl text-slate-purple mb-3">“Foreign literature” is not a universal academic category</h2>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed">In academic writing, <em>literature</em> generally refers to published scholarship or materials relevant to a question. The phrase “foreign literature” can mean different things in different educational settings: work published outside one country, work about another context, or work written in a language other than English. Do not assume which meaning applies. Turn the local requirement into a transparent inclusion decision instead.</p>
          </section>

          <section className="mt-8 p-7 bg-hero-gradient border border-border rounded-2xl">
            <p className="text-xs font-sans uppercase tracking-widest text-primary font-semibold mb-3">Researcher-first workflow</p>
            <h2 className="font-serif text-3xl text-slate-purple mb-5">An eight-step process for international source use</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {STEPS.map(([number, title, body]) => <article key={number} className="rounded-xl bg-white/80 border border-white p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">STEP {number}</p><h3 className="font-serif text-xl text-slate-purple mb-2">{title}</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">{body}</p></article>)}
            </div>
          </section>

          <section className="mt-8 grid lg:grid-cols-3 gap-5">
            <article className="p-6 bg-white border border-border rounded-2xl"><Languages size={22} className="text-primary mb-4" /><h2 className="font-serif text-2xl text-slate-purple mb-2">Language is a source attribute</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">A language filter, translated title, English abstract, or database label can help you search. It does not prove that you read the full work or that the work is in the language you assume.</p></article>
            <article className="p-6 bg-white border border-border rounded-2xl"><BookOpenCheck size={22} className="text-primary mb-4" /><h2 className="font-serif text-2xl text-slate-purple mb-2">Context changes interpretation</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">A study from another setting can be relevant without being automatically transferable. Identify the population, setting, design, and purpose before using it to support a broader claim.</p></article>
            <article className="p-6 bg-white border border-border rounded-2xl"><SearchCheck size={22} className="text-primary mb-4" /><h2 className="font-serif text-2xl text-slate-purple mb-2">A diverse list is not synthesis</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">A literature review earns its value by comparing arguments, methods, findings, and limits. Organize around a question or relationship, not a sequence of countries, languages, or source summaries.</p></article>
          </section>

          <section className="mt-8 p-7 bg-hero-gradient border border-border rounded-2xl">
            <p className="text-xs font-sans uppercase tracking-widest text-primary font-semibold mb-3">Fictional learning example</p>
            <h2 className="font-serif text-3xl text-slate-purple mb-4">Make an inclusion decision traceable</h2>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed mb-5"><strong>This fictional learning example is invented for practice; it is not a real source, study, database record, translation, citation, or literature-review paragraph to submit.</strong> A fictional writer researching peer feedback first searches in English, then adds a verified topic term in another relevant language. A fictional database displays an English title but the full article is in the other language. The writer records the actual language, version read, setting, method, and relevant theme in a fictional matrix. Rather than writing that “international literature proves” a single conclusion, the writer groups the fictional source with others by feedback timing, explains the setting boundary, and cites the version actually used. This example does not validate a real translation or research claim.</p>
            <div className="grid md:grid-cols-3 gap-4"><article className="rounded-xl bg-white/80 border border-white p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">Weak shortcut</p><p className="text-sm font-sans text-foreground/80 leading-relaxed">Treat an English title or abstract as evidence that the full source was read and understood.</p></article><article className="rounded-xl bg-white/80 border border-white p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">Traceable process</p><p className="text-sm font-sans text-foreground/80 leading-relaxed">Record the actual version, language, access path, relevant evidence, and context before deciding a source belongs in the review.</p></article><article className="rounded-xl bg-white/80 border border-white p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">Responsible claim</p><p className="text-sm font-sans text-foreground/80 leading-relaxed">Explain how setting and method shape the relevance of a pattern instead of treating an international source as a decorative citation.</p></article></div>
          </section>

          <section className="mt-8 p-7 bg-white border border-border rounded-2xl">
            <h2 className="font-serif text-3xl text-slate-purple mb-3">Use university guidance, then follow the requirement that governs your work</h2>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed">The UNC Writing Center explains that a literature review discusses published information in a subject area and typically combines summary with synthesis; it recommends clarifying scope and organizing sources around ideas, themes, trends, or methods. UC Davis describes literature reviews as searching, evaluating, analyzing, and synthesizing prior scholarship and recommends concept or synthesis matrices to track themes. UWM Libraries recommends using search terms and language fields carefully, then confirming the actual language of a work because English titles, abstracts, and database language fields can be misleading.</p>
            <p className="text-sm font-sans mt-4"><a className="text-primary underline underline-offset-4" href="https://writingcenter.unc.edu/tips-and-tools/literature-reviews/" target="_blank" rel="noreferrer">UNC Writing Center</a> · <a className="text-primary underline underline-offset-4" href="https://guides.library.ucdavis.edu/urc/literature-review" target="_blank" rel="noreferrer">UC Davis Undergraduate Research Center</a> · <a className="text-primary underline underline-offset-4" href="https://guides.library.uwm.edu/languages/search" target="_blank" rel="noreferrer">UWM Libraries</a></p>
          </section>

          <section className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/literature-review-synthesis-matrix" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Build a synthesis matrix</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Track source-to-theme relationships before drafting a literature review.</p></article></Link>
            <Link href="/apa-7-non-english-sources" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Cite non-English sources</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Check original-language titles, transliteration, brackets, and published translation details in APA 7.</p></article></Link>
            <Link href="/evaluate-academic-sources" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Evaluate the source</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Check author, publication, evidence, version, context, relevance, and research use before writing.</p></article></Link>
            <Link href="/academic-integrity-and-source-use" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Keep use traceable</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Separate quotation, paraphrase, summary, translation, and your own analysis with accurate attribution.</p></article></Link>
          </section>
          <div className="text-center mt-10"><Button asChild className="bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90"><Link href="/phrases/literature-review">Explore literature review phrases <ArrowRight size={16} className="ml-2" /></Link></Button></div>
        </div>
      </main>
    </>
  );
}
