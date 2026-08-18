import { Link } from "wouter";
import {
  ArrowRight,
  BookOpenCheck,
  Languages,
  ScanText,
  Scale,
  TextCursorInput,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";

const guides = [
  {
    title: "Common ESL writing mistakes",
    description:
      "Review practical examples of article use, verb agreement, prepositions, literal translation, and academic tone.",
    href: "/blog/how-to-avoid-common-esl-writing-mistakes",
    icon: ScanText,
  },
  {
    title: "Hedging language",
    description:
      "Match the strength of your claim to the limits of your evidence with more careful academic phrasing.",
    href: "/hedging-language-academic-writing",
    icon: Scale,
  },
  {
    title: "Active and passive voice",
    description:
      "Choose clearer sentence structures for methods, arguments, and research writing in your discipline.",
    href: "/blog/active-vs-passive-voice-in-academic-writing",
    icon: TextCursorInput,
  },
  {
    title: "Graduate academic writing",
    description:
      "Plan a research-writing workflow for graduate genres, source use, revision, and feedback without treating one style as universal.",
    href: "/academic-writing-for-graduate-students",
    icon: BookOpenCheck,
  },
];

export default function AcademicEnglishHub() {
  return (
    <>
      <SEOHead
        title="Academic English Support for ESL and International Students"
        description="Build academic English for international and multilingual students through task awareness, argument and source work, sentence-level revision, feedback, and responsible writing support."
        keywords="academic English for international students, multilingual academic writing, ESL academic writing support, academic writing help for international students, non-native English writing"
        canonical="/academic-english-for-esl-students/"
      />
      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-sans font-medium mb-4">
              <Languages size={13} /> Academic English for multilingual writers
            </div>
            <h1 className="font-serif font-light text-4xl sm:text-5xl text-slate-purple mb-4 leading-tight">
              Academic English support for{" "}
              <span className="italic">ESL and international students</span>
            </h1>
            <p className="text-muted-foreground font-sans leading-relaxed text-lg">
              Learn to spot literal translation, improve sentence clarity, use
              careful academic claims, and revise a draft without losing the
              meaning of your ideas.
            </p>
          </div>

          <section
            className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-5"
            aria-labelledby="academic-english-guides"
          >
            <h2 id="academic-english-guides" className="sr-only">
              Academic English guides
            </h2>
            {guides.map(({ title, description, href, icon: Icon }) => (
              <Link key={title} href={href} className="block group">
                <article className="h-full p-6 bg-white border border-border rounded-2xl hover:border-primary/30 hover:shadow-card transition-all">
                  <Icon size={20} className="text-primary mb-4" />
                  <h3 className="font-serif text-2xl text-slate-purple mb-2">
                    {title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                    {description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-sans font-medium text-primary mt-5">
                    Read the guide <ArrowRight size={15} />
                  </span>
                </article>
              </Link>
            ))}
          </section>

          <section className="max-w-5xl mx-auto mt-10 p-8 bg-white border border-border rounded-2xl">
            <p className="text-xs font-sans uppercase tracking-widest text-primary mb-3">A learning workflow, not a checklist for sounding native</p>
            <h2 className="font-serif text-3xl text-slate-purple mb-5">Build academic English around the work your paper needs to do</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">1. TASK</p><h3 className="font-serif text-xl text-slate-purple mb-2">Read the situation</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">Identify the prompt, reader, discipline, genre, and section purpose before changing individual sentences.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">2. IDEAS</p><h3 className="font-serif text-xl text-slate-purple mb-2">Plan the argument</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">Make the question, claim, evidence, and paragraph sequence visible so language choices have a clear job.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">3. SOURCES</p><h3 className="font-serif text-xl text-slate-purple mb-2">Use support accurately</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">Keep your own contribution distinct from a source, check evidence, and cite the original work you actually consulted.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">4. LANGUAGE</p><h3 className="font-serif text-xl text-slate-purple mb-2">Revise in layers</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">Work from meaning and organization to clarity, terminology, grammar, and sentence rhythm rather than correcting at random.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">5. FEEDBACK</p><h3 className="font-serif text-xl text-slate-purple mb-2">Learn repeated patterns</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">Use comments to notice recurring choices, then decide what to retain, revise, or ask your instructor or writing center about.</p></article>
            </div>
          </section>

          <section className="max-w-5xl mx-auto mt-6 grid lg:grid-cols-2 gap-6">
            <article className="p-8 bg-hero-gradient border border-border rounded-2xl">
              <p className="text-xs font-sans uppercase tracking-widest text-primary mb-3">Fictional learning example</p>
              <h2 className="font-serif text-3xl text-slate-purple mb-3">Revise the meaning before the wording</h2>
              <p className="text-sm text-muted-foreground font-sans leading-relaxed"><strong className="text-foreground">This fictional learning example is invented for practice.</strong> A multilingual writer drafts: “The survey proves students are stress.” Before searching for a more formal synonym, the writer checks the result, revises the meaning to “The survey responses suggest that some participants reported stress,” and then decides whether the evidence, participant group, and study design support that sentence. The next revision can address grammar and wording without turning a limited finding into a stronger claim.</p>
            </article>
            <article className="p-8 bg-white border border-border rounded-2xl">
              <h2 className="font-serif text-3xl text-slate-purple mb-4">Keep authorship and academic responsibility visible</h2>
              <div className="space-y-3 text-sm text-muted-foreground font-sans leading-relaxed">
                <p>Language support can help you notice patterns, compare alternatives, and revise a draft that you have written. It cannot verify a research design, prove a source is credible, decide whether a quotation is accurate, or approve work under your course policy.</p>
                <p><a className="text-primary underline underline-offset-4" href="https://owl.purdue.edu/owl/multilingual/multilingual_students/index.html" target="_blank" rel="noreferrer">Purdue OWL</a> provides multilingual writing resources across curriculum and disciplines. <a className="text-primary underline underline-offset-4" href="https://drexel.edu/coas/academics/university-writing-program/multilingual-writers/" target="_blank" rel="noreferrer">Drexel&apos;s Writing Program</a> describes multilingual support as collaborative, ownership-preserving work across brainstorming, organization, source use, and grammar. <a className="text-primary underline underline-offset-4" href="https://www.dickinson.edu/info/20158/writing_program/870/writing_program_curriculum/5" target="_blank" rel="noreferrer">Dickinson College</a> distinguishes global feedback on thesis and organization from specific grammar feedback.</p>
              </div>
            </article>
          </section>

          <section className="max-w-4xl mx-auto mt-12 p-8 bg-white border border-border rounded-2xl">
            <h2 className="font-serif text-3xl text-slate-purple mb-4">
              Revise rather than replace your voice
            </h2>
            <div className="space-y-4 text-sm text-muted-foreground font-sans leading-relaxed">
              <p>
                Academic English does not require every sentence to sound
                complicated. Start with a clear claim, use evidence accurately,
                and make revisions that preserve what you mean.
              </p>
              <p>
                Use feedback to learn repeat patterns in your own writing. Check
                whether an expression is too literal, whether a verb matches its
                subject, and whether the level of certainty matches your
                evidence before deciding to change it.
              </p>
            </div>
          </section>

          <section className="max-w-5xl mx-auto mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/phrases" className="block">
              <div className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30 transition-all">
                <h2 className="font-serif text-2xl text-slate-purple mb-2">
                  Browse academic phrases
                </h2>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                  Find sentence patterns for research aims, methods, results,
                  and discussion sections.
                </p>
              </div>
            </Link>
            <Link href="/polish" className="block">
              <div className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30 transition-all">
                <h2 className="font-serif text-2xl text-slate-purple mb-2">
                  Revise a paragraph
                </h2>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                  Review non-native phrasing and academic tone in a draft you
                  have already written.
                </p>
              </div>
            </Link>
            <Link href="/how-to-paraphrase-without-plagiarizing" className="block">
              <div className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30 transition-all">
                <h2 className="font-serif text-2xl text-slate-purple mb-2">
                  Paraphrase with attribution
                </h2>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                  Reshape source ideas accurately, keep the evidence traceable, and retain clear citation.
                </p>
              </div>
            </Link>
            <Link href="/research-paper-sections" className="block">
              <div className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30 transition-all">
                <h2 className="font-serif text-2xl text-slate-purple mb-2">
                  Plan paper sections
                </h2>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                  Match language to the purpose of your introduction, methods, results, discussion, and conclusion.
                </p>
              </div>
            </Link>
          </section>

          <div className="max-w-4xl mx-auto mt-10 text-center">
            <Button
              asChild
              className="bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90"
            >
              <Link href="/polish">
                Try Essay Polish <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
