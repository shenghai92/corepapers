import { Link } from "wouter";
import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  FileSearch,
  Quote,
  ShieldCheck,
  Waypoints,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";

const STEPS = [
  [FileSearch, "1. Understand the source first", "Read enough to explain the source’s point accurately. If you cannot explain the idea, you are not ready to paraphrase it."],
  [Waypoints, "2. Decide why your paragraph needs it", "Choose the aspect of the source that supports your own claim, context, comparison, or analysis. A paraphrase should serve the paragraph’s purpose, not reproduce every detail."],
  [Quote, "3. Set the source aside and rebuild", "Without looking at the source sentence, explain the idea in a new structure and emphasis that fit your point. Do not swap words one by one or preserve the original sequence."],
  [BookOpenCheck, "4. Check accuracy and source distance", "Compare your draft with the original. Correct any shift in scope, qualification, evidence, or meaning, and quote distinctive wording when exact language is necessary."],
  [ShieldCheck, "5. Attribute where the borrowed idea appears", "Add the required in-text, note, or other citation at the point where readers need to identify the source. Then retain a complete reference entry in the required style."],
] as const;

export default function ParaphraseWithoutPlagiarizing() {
  return (
    <>
      <SEOHead
        title="How to Paraphrase Without Plagiarizing: Source-Use Process"
        description="Learn how to paraphrase without plagiarizing through understanding, purpose, restructuring, accuracy checks, and clear source attribution. Includes fictional learning examples and university guidance."
        keywords="how to paraphrase without plagiarizing, academic paraphrasing, insufficient paraphrase citation, paraphrasing and citation, avoid patchwriting, paraphrase source use"
        canonical="/how-to-paraphrase-without-plagiarizing/"
      />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container max-w-5xl">
          <header className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-sans font-medium mb-4"><ShieldCheck size={14} /> Academic paraphrasing and source use</div>
            <h1 className="font-serif font-light text-4xl sm:text-5xl text-slate-purple mb-4 leading-tight">How to paraphrase without plagiarizing: <span className="italic">understand, reshape, attribute</span></h1>
            <p className="text-muted-foreground font-sans leading-relaxed text-lg">Academic paraphrasing is not a synonym-replacement exercise. It shows how you understand a source while making the source of its ideas visible to your reader.</p>
          </header>

          <section className="p-7 bg-white border border-border rounded-2xl">
            <h2 className="font-serif text-3xl text-slate-purple mb-3">Paraphrase changes the expression, not the source relationship</h2>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed">A paraphrase puts someone else’s information or idea into language that serves your own paragraph. It still needs accurate attribution. Changing a few words, preserving the original sentence structure, or moving clauses around can remain too close to the source; writers often call that patchwriting. A citation is not an optional final decoration—it helps readers distinguish your contribution from ideas you are using as evidence.</p>
          </section>

          <section className="mt-8 space-y-4">
            {STEPS.map(([Icon, title, copy]) => {
              const StepIcon = Icon as typeof FileSearch;
              return <article key={title as string} className="flex gap-5 p-6 bg-white border border-border rounded-2xl"><div className="w-11 h-11 rounded-xl bg-primary/10 shrink-0 flex items-center justify-center text-primary"><StepIcon size={21} /></div><div><h2 className="font-serif text-2xl text-slate-purple mb-2">{title as string}</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">{copy as string}</p></div></article>;
            })}
          </section>

          <section className="mt-8 p-7 bg-hero-gradient border border-border rounded-2xl">
            <p className="text-xs font-sans uppercase tracking-widest text-primary font-semibold mb-3">Fictional learning example</p>
            <h2 className="font-serif text-3xl text-slate-purple mb-4">Move from source wording to a purpose-led paraphrase</h2>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed mb-5"><strong className="text-foreground">Everything in this example is invented for learning:</strong> the source text, author, study, result, and citation do not exist and must not be cited, copied, or treated as research evidence.</p>
            <div className="grid lg:grid-cols-2 gap-5">
              <article className="rounded-xl bg-white/80 border border-white p-5"><h3 className="font-serif text-2xl text-slate-purple mb-3">Fictional source wording</h3><p className="text-sm font-sans text-foreground/80 leading-relaxed">“Students who could see each upcoming deadline in one shared schedule were more likely to describe their weekly planning as manageable, especially when work shifts changed.” (Fictional Author, 2025, p. 14)</p><p className="mt-3 text-xs font-sans text-muted-foreground">A direct quotation would require quotation marks, the source’s exact details, and the required citation treatment.</p></article>
              <article className="rounded-xl bg-white/80 border border-white p-5"><h3 className="font-serif text-2xl text-slate-purple mb-3">Fictional purpose-led paraphrase</h3><p className="text-sm font-sans text-foreground/80 leading-relaxed">A shared view of upcoming deadlines may help students adapt weekly plans when their employment schedules change (Fictional Author, 2025).</p><p className="mt-3 text-xs font-sans text-muted-foreground">The fictional paraphrase selects the idea relevant to a paragraph about flexible planning, changes the structure and emphasis, and still attributes the underlying idea.</p></article>
            </div>
          </section>

          <section className="mt-8 grid lg:grid-cols-2 gap-6">
            <article className="p-7 bg-white border border-border rounded-2xl"><h2 className="font-serif text-3xl text-slate-purple mb-4">Why a changed sentence can still be too close</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed mb-4">Replacing words with synonyms while preserving the source’s wording, syntax, sequence, and emphasis does not demonstrate independent understanding. Start from your own paragraph’s point, decide what portion of the source matters, and rebuild that meaning in a form that fits the claim you are making.</p><p className="text-sm font-sans text-muted-foreground leading-relaxed">Some key technical terms or names may need to stay the same. That is different from reproducing an author’s distinctive phrasing or an entire sentence pattern. When exact wording matters, quote it accurately and follow the required quotation and citation rules.</p></article>
            <article className="p-7 bg-white border border-border rounded-2xl"><h2 className="font-serif text-3xl text-slate-purple mb-4">Why an adequate rewrite can still need a better citation</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed mb-4">A paraphrase can be linguistically different but still rely heavily on someone else’s ideas. Readers need a citation close enough to identify which statement, sentence, or paragraph comes from that source. A reference list alone may not make the attribution clear in context.</p><p className="text-sm font-sans text-muted-foreground leading-relaxed">Use the documentation system your course, discipline, journal, or publisher requires. If you are unsure how frequently to cite a sequence of source-based sentences, ask your instructor, supervisor, writing center, or library before submission.</p></article>
          </section>

          <section className="mt-8 p-7 bg-white border border-border rounded-2xl">
            <h2 className="font-serif text-3xl text-slate-purple mb-3">What a paraphrasing tool cannot decide</h2>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed">A language tool can help you compare wording or identify places to revise, but it cannot verify that you read and understood the original source, decide which ideas require attribution, confirm that a citation is sufficient in your context, prove originality, or determine what your instructor permits. Keep the original source open during review, verify the meaning and bibliographic details yourself, and seek course-specific guidance for any uncertainty.</p>
          </section>

          <section className="mt-8 p-7 bg-white border border-border rounded-2xl">
            <h2 className="font-serif text-3xl text-slate-purple mb-3">Learn from academic writing and integrity guidance</h2>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed"><a className="text-primary underline underline-offset-4" href="https://writingcenter.unc.edu/tips-and-tools/plagiarism/" target="_blank" rel="noreferrer">UNC Writing Center</a> explains that changing a word or two, rearranging a source sentence, or using synonyms is not sufficient paraphrasing and that paraphrased ideas need citation. <a className="text-primary underline underline-offset-4" href="https://writingcenter.gmu.edu/writing-resources/citing-sources/paraphrasing" target="_blank" rel="noreferrer">George Mason University Writing Center</a> recommends understanding the source, considering your purpose, setting the source aside, and checking the final representation for accuracy. <a className="text-primary underline underline-offset-4" href="https://www.niu.edu/academic-integrity/faculty/committing/examples/insufficient-citation-of-paraphrase.shtml" target="_blank" rel="noreferrer">Northern Illinois University&apos;s academic-integrity example</a> illustrates that rewritten wording can still have insufficient source attribution.</p>
          </section>

          <section className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/academic-integrity-and-source-use" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Use sources ethically</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Compare quotation, paraphrase, summary, attribution, and source verification.</p></article></Link>
            <Link href="/academic-paraphrasing-tool-for-esl-students" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Review a paraphrase</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Use language support after you have checked the source, meaning, and citation responsibility.</p></article></Link>
            <Link href="/citations" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Verify citation details</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Draft a reference only from metadata verified against the original source.</p></article></Link>
            <Link href="/polish" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Polish after source checks</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Revise clarity and tone without removing the attribution your reader needs.</p></article></Link>
          </section>
          <div className="text-center mt-10"><Button asChild className="bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90"><Link href="/academic-paraphrasing-tool-for-esl-students">Open Academic Paraphrasing <ArrowRight size={16} className="ml-2" /></Link></Button></div>
        </div>
      </main>
    </>
  );
}
