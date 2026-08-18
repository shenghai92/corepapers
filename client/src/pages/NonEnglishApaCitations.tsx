import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Languages, ListChecks, TextQuote } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";

const APA = {
  original: "https://apastyle.apa.org/blog/citing-works-written-another-language",
  transliteration: "https://apastyle.apa.org/blog/transliterated-titles-references",
  translation: "https://apastyle.apa.org/blog/citing-translated-works",
  university: "https://library.unimelb.edu.au/recite/referencing-styles/apa7/referencing-non-english-sources",
};

export default function NonEnglishApaCitations() {
  return (
    <>
      <SEOHead
        title="APA 7: How to Cite Foreign-Language and Translated Sources"
        description="Learn how APA 7 handles original non-English works, non-Roman scripts, title translations, transliteration, and published translations with fictional learning examples."
        keywords="APA 7 cite foreign language sources, APA non English sources, APA transliteration title, APA translated work citation, how to cite Chinese source APA 7"
        canonical="/apa-7-non-english-sources/"
      />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container max-w-5xl">
          <header className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-sans font-medium mb-4"><Languages size={14} /> APA 7 source-use guide</div>
            <h1 className="font-serif font-light text-4xl sm:text-5xl text-slate-purple mb-4 leading-tight">APA 7: cite foreign-language and <span className="italic">translated sources</span></h1>
            <p className="text-muted-foreground font-sans leading-relaxed text-lg">Choose the citation path that matches the version you actually read. Do not replace original source details with an invented translation or romanization.</p>
          </header>

          <section className="p-7 bg-white border border-border rounded-2xl">
            <h2 className="font-serif text-3xl text-slate-purple mb-3">Start with the version you used</h2>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed">APA guidance begins with the work you consulted. If you read an original non-English work, record its reference information in the original language and add a title translation in square brackets in the language of your paper. If you read a published translation, cite that published translation and credit the translator where the format requires it.</p>
          </section>

          <section className="mt-6 grid md:grid-cols-3 gap-5">
            {[
              [ListChecks, "Original non-English work", "Keep author, date, title, and source information in the work’s original language; add only a bracketed translation of the title for readers of your paper."],
              [TextQuote, "Non-Roman script", "When the source title uses a non-Roman alphabet, use a recognized romanization or transliteration appropriate to your writing language, then add the translated title in square brackets."],
              [Languages, "Published translation", "Cite the translated version you read. APA Style explains that a translated work credits the translator and can include the original publication year in the reference and in-text citation."],
            ].map(([Icon, title, copy]) => {
              const CardIcon = Icon as typeof ListChecks;
              return <article key={title as string} className="p-6 bg-white border border-border rounded-2xl"><CardIcon size={22} className="text-primary mb-4" /><h2 className="font-serif text-2xl text-slate-purple mb-2">{title as string}</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">{copy as string}</p></article>;
            })}
          </section>

          <section className="mt-8 p-7 bg-hero-gradient border border-border rounded-2xl">
            <p className="text-xs font-sans uppercase tracking-widest text-primary font-semibold mb-3">Fictional learning examples</p>
            <h2 className="font-serif text-3xl text-slate-purple mb-4">See the parts, then verify the exact format</h2>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed mb-5">The names, titles, journals, publishers, dates, and links below are invented for learning. They are not real references and must not be submitted, copied, or used to infer the correct romanization of an actual source.</p>
            <div className="grid lg:grid-cols-3 gap-4">
              <article className="rounded-xl bg-white/85 border border-white p-5"><h3 className="font-serif text-xl text-slate-purple mb-3">Original-language title</h3><p className="text-sm font-sans text-foreground/80 leading-relaxed">Fictional Author. (2025). Título original del estudio <em>[English translation of title]</em>. <em>Fictional Journal</em>, 8(1), 10–24.</p><p className="mt-3 text-xs font-sans text-muted-foreground">Keep source details in the original language; translate only the title in square brackets.</p></article>
              <article className="rounded-xl bg-white/85 border border-white p-5"><h3 className="font-serif text-xl text-slate-purple mb-3">Non-Roman script</h3><p className="text-sm font-sans text-foreground/80 leading-relaxed">Fictional Author. (2025). Romanized source title <em>[English translation of title]</em>. Publisher.</p><p className="mt-3 text-xs font-sans text-muted-foreground">Use a recognized transliteration; do not guess spelling from a machine translation or browser preview.</p></article>
              <article className="rounded-xl bg-white/85 border border-white p-5"><h3 className="font-serif text-xl text-slate-purple mb-3">Published translation</h3><p className="text-sm font-sans text-foreground/80 leading-relaxed">Fictional Author. (2025). <em>English title</em> (A. Translator, Trans.). Fictional Press. (Original work published 2018)</p><p className="mt-3 text-xs font-sans text-muted-foreground">Use the language of the translation you read and credit the translator according to the source type.</p></article>
            </div>
          </section>

          <section className="mt-8 grid lg:grid-cols-2 gap-6">
            <article className="p-7 bg-white border border-border rounded-2xl"><h2 className="font-serif text-3xl text-slate-purple mb-4">Check before you generate a citation</h2><ul className="space-y-3 text-sm font-sans text-muted-foreground leading-relaxed">{["Which version did you actually read: original work, English translation, later edition, or a quotation of a translation?", "Does the source use a Roman alphabet or a script that needs recognized transliteration?", "Have you separated the title translation in square brackets from the original or romanized title?", "Does your course, journal, or supervisor require a particular transliteration standard or local variation?", "Have you verified author names, dates, translator credits, container details, pages, DOI, and URLs from the original source record?"].map(item => <li key={item} className="flex gap-3"><CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />{item}</li>)}</ul></article>
            <article className="p-7 bg-white border border-border rounded-2xl"><h2 className="font-serif text-3xl text-slate-purple mb-4">Avoid these common errors</h2><ul className="space-y-3 text-sm font-sans text-muted-foreground leading-relaxed">{["Do not cite a translation you did not read as though it were your source.", "Do not translate every publisher, journal, or container element unless the style guidance for the item calls for it.", "Do not make up a romanization, translator, DOI, page number, or publication date.", "Do not assume an automatic citation tool has correctly identified a non-English title or translated edition; compare the output with the item record and your instructor’s instructions."].map(item => <li key={item} className="flex gap-3"><CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />{item}</li>)}</ul></article>
          </section>

          <section className="mt-8 p-7 bg-white border border-border rounded-2xl"><h2 className="font-serif text-3xl text-slate-purple mb-3">Use APA guidance first</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">APA Style explains that a reference to a work in another language keeps the work’s original reference information and places a translation of the title in square brackets. For non-Roman writing systems, APA guidance calls for title transliteration followed by the bracketed translation. When you cite a published translation, create the reference in the language of the translation you used and credit the translator as required. The University of Melbourne&apos;s APA 7 guide provides worked explanations for original-language sources, transliteration, and translated works. Always follow the assignment or publisher if it sets a more specific rule.</p><p className="mt-4 text-sm font-sans"><a className="text-primary underline underline-offset-4" href={APA.original} target="_blank" rel="noreferrer">APA Style: works written in another language</a> · <a className="text-primary underline underline-offset-4" href={APA.transliteration} target="_blank" rel="noreferrer">APA Style: transliterated titles</a> · <a className="text-primary underline underline-offset-4" href={APA.translation} target="_blank" rel="noreferrer">APA Style: translated works</a> · <a className="text-primary underline underline-offset-4" href={APA.university} target="_blank" rel="noreferrer">University of Melbourne APA 7 guide</a></p></section>

          <section className="mt-8 grid sm:grid-cols-3 gap-4"><Link href="/citation-examples" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Check APA examples</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Review common APA reference and in-text citation structures before applying language-specific details.</p></article></Link><Link href="/citations" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Generate, then verify</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Use the Citation Generator only with checked source metadata and compare its output to APA guidance.</p></article></Link><Link href="/evaluate-academic-sources" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Evaluate a source</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Confirm authorship, publisher, purpose, evidence, and source record before you cite.</p></article></Link></section>
          <div className="text-center mt-10"><Button asChild className="bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90"><Link href="/citations">Open Citation Generator <ArrowRight size={16} className="ml-2" /></Link></Button></div>
        </div>
      </main>
    </>
  );
}
