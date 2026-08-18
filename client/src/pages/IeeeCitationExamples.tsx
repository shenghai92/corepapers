import { Link } from "wouter";
import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  FileCheck2,
  ListOrdered,
  Quote,
  ShieldCheck,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";

const PRINCIPLES = [
  [ListOrdered, "Cite with bracketed numbers", "Place a number in square brackets at the point where you use a source. The number links to the full entry in the reference list. When you return to the same source, use its original number rather than creating a new entry."],
  [BookOpenCheck, "Order the reference list by first use", "IEEE reference entries are generally numbered in the order sources first appear in the text, beginning with [1]. They are not normally alphabetized by author or title."],
  [Quote, "Match the source and the claim", "Cite direct quotation, paraphrase, data, methods, and borrowed ideas. For direct quotations or a highly specific passage, check whether a page, section, figure, equation, or other locator is needed under your course or publication guidance."],
  [FileCheck2, "Preserve real source metadata", "Verify author names, title capitalization, journal or conference details, volume, issue, pages, DOI, URL, and access information against the original record. Do not invent missing bibliographic details."],
] as const;

export default function IeeeCitationExamples() {
  return (
    <>
      <SEOHead
        title="IEEE Citation Examples: In-Text and Reference List Guide"
        description="Learn IEEE citation with bracketed in-text numbers, reference-list order, fictional source examples, source verification checks, and official IEEE guidance."
        keywords="IEEE citation examples, IEEE in-text citation, IEEE reference list, IEEE citation style guide, IEEE referencing examples, how to cite IEEE"
        canonical="/ieee-citation-examples/"
      />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container max-w-5xl">
          <header className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-sans font-medium mb-4"><ListOrdered size={14} /> Engineering and technical source use</div>
            <h1 className="font-serif font-light text-4xl sm:text-5xl text-slate-purple mb-4 leading-tight">IEEE citation examples: <span className="italic">number sources as readers meet them</span></h1>
            <p className="text-muted-foreground font-sans leading-relaxed text-lg">IEEE style commonly uses bracketed numbers in the text and a numbered reference list ordered by first appearance. Use this guide to understand the system, then check your course, journal, conference, or publisher requirements.</p>
          </header>

          <section className="p-7 bg-white border border-border rounded-2xl">
            <h2 className="font-serif text-3xl text-slate-purple mb-3">IEEE is a source-tracing system, not only a punctuation pattern</h2>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed">The reader should be able to move from a claim to a bracketed number and then to the corresponding full reference. That means the order of citations matters: adding, deleting, or moving a first mention can require a careful check of every later in-text number and reference-list entry. A generator can draft a single entry, but it cannot determine whether a source supports your statement or keep a changing manuscript&apos;s whole numbering sequence correct without your review.</p>
          </section>

          <section className="mt-6 grid md:grid-cols-2 gap-5">
            {PRINCIPLES.map(([Icon, title, copy]) => {
              const CardIcon = Icon as typeof ListOrdered;
              return <article key={title as string} className="p-6 bg-white border border-border rounded-2xl"><CardIcon size={22} className="text-primary mb-4" /><h2 className="font-serif text-2xl text-slate-purple mb-2">{title as string}</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">{copy as string}</p></article>;
            })}
          </section>

          <section className="mt-8 p-7 bg-hero-gradient border border-border rounded-2xl">
            <p className="text-xs font-sans uppercase tracking-widest text-primary font-semibold mb-3">Fictional learning examples</p>
            <h2 className="font-serif text-3xl text-slate-purple mb-4">See the connection between a sentence and its numbered list</h2>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed mb-5">All names, titles, venues, dates, pages, identifiers, findings, and examples below are invented for learning. They are not real sources, do not validate a factual claim, and must not be copied into a submitted reference list.</p>
            <div className="grid lg:grid-cols-2 gap-5">
              <article className="rounded-xl bg-white/80 border border-white p-5"><h3 className="font-serif text-2xl text-slate-purple mb-3">Fictional in-text use</h3><p className="font-sans text-sm text-foreground/80 leading-relaxed">“A fictional test report describes a lower energy draw for the prototype under its stated laboratory conditions [1]. A later comparison refers to the same fictional report again [1] and adds a fictional conference paper [2].”</p><p className="mt-3 text-xs font-sans text-muted-foreground">The second mention of the same fictional report keeps <code>[1]</code>; the new fictional source receives <code>[2]</code>.</p></article>
              <article className="rounded-xl bg-white/80 border border-white p-5"><h3 className="font-serif text-2xl text-slate-purple mb-3">Fictional reference list</h3><ol className="space-y-3 text-sm font-mono text-foreground/80 leading-relaxed list-none"><li>[1] A. Rivera and M. Chen, <em>Prototype Power Audit</em>. Fictional City: Learning Press, 2025, pp. 18–24.</li><li>[2] L. Okafor, “A fictional comparison of sensor calibration routines,” in <em>Proc. Imaginary Conf. Applied Systems</em>, 2026, pp. 44–49.</li></ol><p className="mt-3 text-xs font-sans text-muted-foreground">Entries are numbered by first appearance in the fictional text, not by alphabetical author order.</p></article>
            </div>
          </section>

          <section className="mt-8 grid lg:grid-cols-3 gap-5">
            <article className="p-6 bg-white border border-border rounded-2xl"><h2 className="font-serif text-2xl text-slate-purple mb-3">Journal article pattern</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Record author initials and surnames, article title, journal title, volume, issue, page range or article number, date when required, and DOI or online information from the original record.</p></article>
            <article className="p-6 bg-white border border-border rounded-2xl"><h2 className="font-serif text-2xl text-slate-purple mb-3">Conference paper pattern</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Check the official proceedings title, event name, location or dates if supplied, publisher, page range, and persistent identifier. Conference materials vary; do not assume all fields exist.</p></article>
            <article className="p-6 bg-white border border-border rounded-2xl"><h2 className="font-serif text-2xl text-slate-purple mb-3">Website or online report pattern</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Identify the responsible author or organization, page title, publication or update date when available, full URL, and access date where your required guide calls for it. Archive a reliable source record when appropriate.</p></article>
          </section>

          <section className="mt-8 grid lg:grid-cols-2 gap-6">
            <article className="p-7 bg-white border border-border rounded-2xl"><h2 className="font-serif text-3xl text-slate-purple mb-4">A five-step IEEE check before submission</h2><ul className="space-y-3 text-sm font-sans text-muted-foreground leading-relaxed">{["Mark every sentence that draws on a source, including paraphrases, data, methods, images, tables, and exact wording.", "Confirm each in-text bracket points to the intended source and reuse an existing number for an already cited source.", "Read the reference list from [1] onward and confirm that its sequence follows first appearance in the final manuscript.", "Compare every reference field with the source record, DOI landing page, proceedings page, library catalogue, or publication itself.", "Apply the current instructions for the course, journal, conference, or publisher—especially where they prescribe a template or local variation."] .map(item => <li key={item} className="flex gap-3"><CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />{item}</li>)}</ul></article>
            <article className="p-7 bg-white border border-border rounded-2xl"><ShieldCheck size={22} className="text-primary mb-4" /><h2 className="font-serif text-3xl text-slate-purple mb-4">What a citation tool cannot verify for you</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed mb-4">Tools can turn details you enter into a proposed reference pattern. They cannot prove that you read the source, that it is credible, that an identifier belongs to the work, that your quotation is accurate, or that the source supports your conclusion.</p><p className="text-sm font-sans text-muted-foreground leading-relaxed">For a source you found only through another author, locate and read the original when possible rather than citing a work you have not checked. Maintain accurate notes so references remain connected to the actual evidence used in your paper.</p></article>
          </section>

          <section className="mt-8 p-7 bg-white border border-border rounded-2xl">
            <h2 className="font-serif text-3xl text-slate-purple mb-3">Use official guidance and your submission requirements</h2>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed"><a className="text-primary underline underline-offset-4" href="https://journals.ieeeauthorcenter.ieee.org/create-your-ieee-journal-article/create-the-text-of-your-article/ieee-editorial-style-manual/" target="_blank" rel="noreferrer">IEEE Author Center</a> directs authors to the IEEE Editorial Style Manual and IEEE Reference Guide for detailed source-type guidance. <a className="text-primary underline underline-offset-4" href="https://owl.purdue.edu/owl/research_and_citation/ieee_style/ieee_overview.html" target="_blank" rel="noreferrer">Purdue OWL</a> notes that a target organization&apos;s publication or event instructions should take priority when you are preparing a specific submission. <a className="text-primary underline underline-offset-4" href="https://researchguides.njit.edu/ieee-citation/ieeereferencing" target="_blank" rel="noreferrer">NJIT Library&apos;s IEEE guide</a> explains bracketed numbering and order-of-appearance references, and <a className="text-primary underline underline-offset-4" href="https://libraryguides.vu.edu.au/ieeereferencing/referencelist" target="_blank" rel="noreferrer">Victoria University&apos;s reference-list guide</a> emphasizes using only the publication details actually available in the source.</p>
          </section>

          <section className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/citations" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Generate a reference draft</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Create a proposed IEEE entry from metadata you have verified against the original source.</p></article></Link>
            <Link href="/academic-integrity-and-source-use" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Use sources ethically</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Keep quotation, paraphrase, attribution, and source verification visible in your process.</p></article></Link>
            <Link href="/academic-argument-evidence" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Build an evidence-led argument</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Connect source choices to the claim each paragraph needs to support.</p></article></Link>
            <Link href="/methodology-section-example-research-paper" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Write a method section</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Report design and sources transparently while retaining research responsibility.</p></article></Link>
          </section>
          <div className="text-center mt-10"><Button asChild className="bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90"><Link href="/citations">Open Citation Generator <ArrowRight size={16} className="ml-2" /></Link></Button></div>
        </div>
      </main>
    </>
  );
}
