import { Link } from "wouter";
import {
  ArrowRight,
  BookMarked,
  CheckCircle2,
  FileText,
  Footprints,
  GitCompareArrows,
  ShieldCheck,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";

const SYSTEMS = [
  [Footprints, "Notes–Bibliography", "A superscript number in the text points to a footnote or endnote. A bibliography is commonly included. This system is often used in humanities fields and accommodates a wide range of sources, but your course or publisher determines the required version."],
  [FileText, "Author–Date", "A parenthetical citation usually gives the author’s surname and publication year, which connects to a reference list. This system is often used in sciences and social sciences, but an instructor, journal, or department may specify a different choice."],
] as const;

export default function ChicagoCitationExamples() {
  return (
    <>
      <SEOHead
        title="Chicago Citation Examples: Notes–Bibliography and Author–Date"
        description="Learn Chicago 18 citation with clear Notes–Bibliography and Author–Date comparisons, fictional learning examples, source checks, and official guidance."
        keywords="Chicago citation examples, Chicago 18 citation, Chicago notes bibliography examples, Chicago author date examples, Chicago footnote citation, Chicago reference list"
        canonical="/chicago-citation-examples/"
      />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container max-w-5xl">
          <header className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-sans font-medium mb-4"><BookMarked size={14} /> Chicago Manual of Style, 18th edition</div>
            <h1 className="font-serif font-light text-4xl sm:text-5xl text-slate-purple mb-4 leading-tight">Chicago citation examples: <span className="italic">choose the right system before you format</span></h1>
            <p className="text-muted-foreground font-sans leading-relaxed text-lg">Chicago has two citation systems: Notes–Bibliography and Author–Date. The correct choice depends on the requirements of your discipline, instructor, department, journal, or publisher—not on a universal rule.</p>
          </header>

          <section className="p-7 bg-white border border-border rounded-2xl">
            <h2 className="font-serif text-3xl text-slate-purple mb-3">First decide how your reader must find the source</h2>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed">Both Chicago systems connect source-based work to complete bibliographic information. They differ mainly in the in-text pathway and the organization of source details. Do not mix footnote-style notes with author–date parentheticals unless the actual assignment instructions explicitly call for a hybrid approach. Check a current course guide, sample paper, target journal, or publisher template before you set up a document.</p>
          </section>

          <section className="mt-6 grid md:grid-cols-2 gap-5">
            {SYSTEMS.map(([Icon, title, copy]) => {
              const CardIcon = Icon as typeof Footprints;
              return <article key={title as string} className="p-7 bg-white border border-border rounded-2xl"><CardIcon size={24} className="text-primary mb-4" /><h2 className="font-serif text-3xl text-slate-purple mb-3">{title as string}</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">{copy as string}</p></article>;
            })}
          </section>

          <section className="mt-8 p-7 bg-hero-gradient border border-border rounded-2xl">
            <p className="text-xs font-sans uppercase tracking-widest text-primary font-semibold mb-3">Fictional learning examples</p>
            <h2 className="font-serif text-3xl text-slate-purple mb-4">Compare the same fictional source in each system</h2>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed mb-5">The author, title, publisher, pages, date, and all citation forms in this section are invented for learning. They are not real publications, not evidence for a claim, and must not be copied into a submitted paper or bibliography.</p>
            <div className="grid lg:grid-cols-2 gap-5">
              <article className="rounded-xl bg-white/80 border border-white p-5"><h3 className="font-serif text-2xl text-slate-purple mb-3">Fictional Notes–Bibliography sequence</h3><p className="font-sans text-sm text-foreground/80 leading-relaxed mb-3">Fictional text: “The fictional archive changed the project&apos;s evidence base.<sup>1</sup>” A later fictional use of the same source uses a shortened note: “The revised catalogue addressed the same limitation.<sup>2</sup>”</p><ol className="space-y-2 text-sm font-mono text-foreground/80 leading-relaxed list-none"><li>1. Mina Iqbal, <em>Fictional Archive Methods</em> (Learning City: Sample Press, 2025), 42.</li><li>2. Iqbal, <em>Fictional Archive Methods</em>, 61.</li></ol><p className="mt-3 text-sm font-mono text-foreground/80 leading-relaxed">Fictional bibliography: Iqbal, Mina. <em>Fictional Archive Methods</em>. Learning City: Sample Press, 2025.</p></article>
              <article className="rounded-xl bg-white/80 border border-white p-5"><h3 className="font-serif text-2xl text-slate-purple mb-3">Fictional Author–Date sequence</h3><p className="font-sans text-sm text-foreground/80 leading-relaxed mb-3">Fictional text: “The fictional archive changed the project&apos;s evidence base (Iqbal 2025, 42).” A later use points to the same fictional reference-list entry: “The revised catalogue addressed the same limitation (Iqbal 2025, 61).”</p><p className="text-sm font-mono text-foreground/80 leading-relaxed">Fictional reference list: Iqbal, Mina. 2025. <em>Fictional Archive Methods</em>. Learning City: Sample Press.</p><p className="mt-3 text-xs font-sans text-muted-foreground">The example illustrates a system difference; actual capitalization, punctuation, page treatment, and additional fields depend on source type and the current instructions you must follow.</p></article>
            </div>
          </section>

          <section className="mt-8 grid lg:grid-cols-2 gap-6">
            <article className="p-7 bg-white border border-border rounded-2xl"><GitCompareArrows size={22} className="text-primary mb-4" /><h2 className="font-serif text-3xl text-slate-purple mb-4">How to choose without guessing</h2><ul className="space-y-3 text-sm font-sans text-muted-foreground leading-relaxed">{["Read the assignment brief, programme handbook, journal instructions, or publisher template for an explicit system name or model paper.", "Ask the instructor, supervisor, editor, or teaching assistant when the requirement is unclear; a familiar discipline label alone may not settle it.", "Use one system consistently throughout the same document unless official instructions state otherwise.", "Compare your work against a current Chicago source-type example before you submit, especially for unusual sources, translations, archival material, web content, images, or audiovisual work."] .map(item => <li key={item} className="flex gap-3"><CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />{item}</li>)}</ul></article>
            <article className="p-7 bg-white border border-border rounded-2xl"><ShieldCheck size={22} className="text-primary mb-4" /><h2 className="font-serif text-3xl text-slate-purple mb-4">Keep citation work connected to source use</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed mb-4">Citation formatting does not prove that a claim is accurate or that a source supports it. Retain the original source, record relevant page or section locations, distinguish quotation from paraphrase in your notes, and verify the author, title, publication details, and persistent link before submitting.</p><p className="text-sm font-sans text-muted-foreground leading-relaxed">A generated reference is a draft based on the details you provide. It cannot determine which Chicago system your assignment requires, locate unrecorded source data, or accept responsibility for citation accuracy.</p></article>
          </section>

          <section className="mt-8 p-7 bg-white border border-border rounded-2xl">
            <h2 className="font-serif text-3xl text-slate-purple mb-3">Use current official guidance and your local requirements</h2>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed"><a className="text-primary underline underline-offset-4" href="https://www.chicagomanualofstyle.org/tools_citationguide.html" target="_blank" rel="noreferrer">The Chicago Manual of Style Citation Quick Guide</a> describes both Notes–Bibliography and Author–Date and advises writers to use the system required by their field or publisher. <a className="text-primary underline underline-offset-4" href="https://writing.ku.edu/chicago-manual-style" target="_blank" rel="noreferrer">University of Kansas Writing Center</a> identifies the 18th edition as current and offers examples of both systems, including shortened notes. <a className="text-primary underline underline-offset-4" href="https://owl.purdue.edu/owl/research_and_citation/chicago_manual_17th_edition/cmos_formatting_and_style_guide/chicago_manual_of_style_17th_edition.html" target="_blank" rel="noreferrer">Purdue OWL&apos;s Chicago resource</a> remains useful for learning the Notes–Bibliography structure but is explicitly based on the 17th edition, so defer to current official guidance and the exact requirements of your submission.</p>
          </section>

          <section className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/citations" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Draft a Chicago reference</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">The generator&apos;s Chicago option produces a Notes–Bibliography style draft from verified metadata.</p></article></Link>
            <Link href="/mla-citation-examples" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Compare MLA 9 examples</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Review Works Cited and author-page citation structures for humanities assignments.</p></article></Link>
            <Link href="/ieee-citation-examples" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Compare IEEE examples</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Review bracketed numbers and a reference list ordered by first use for technical work.</p></article></Link>
            <Link href="/academic-integrity-and-source-use" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Use sources ethically</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Keep source verification, quotation, paraphrase, and attribution visible throughout drafting.</p></article></Link>
          </section>
          <div className="text-center mt-10"><Button asChild className="bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90"><Link href="/citations">Open Citation Generator <ArrowRight size={16} className="ml-2" /></Link></Button></div>
        </div>
      </main>
    </>
  );
}
