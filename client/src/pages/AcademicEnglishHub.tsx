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
        title="Academic Writing Skills for International Students | CorePapers"
        description="Build academic writing skills for international and multilingual students through task interpretation, academic conventions, research and source work, paragraph structure, revision, feedback, language clarity, and responsible authorship."
        keywords="academic writing skills for international students, academic writing skills international students, academic writing help for international students, academic English for international students, multilingual academic writing, ESL academic writing support, non-native English writing"
        canonical="/academic-english-for-esl-students/"
      />
      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-sans font-medium mb-4">
              <Languages size={13} /> Academic English for multilingual writers
            </div>
            <h1 className="font-serif font-light text-4xl sm:text-5xl text-slate-purple mb-4 leading-tight">
              Academic writing skills for{" "}
              <span className="italic">international students</span>
            </h1>
            <p className="text-muted-foreground font-sans leading-relaxed text-lg">
              Build transferable academic writing skills through task interpretation,
              disciplinary conventions, evidence and source use, paragraph design,
              revision, feedback, and language clarity—without losing the meaning,
              voice, or responsibility for your own ideas.
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
            <h2 className="font-serif text-3xl text-slate-purple mb-5">An eight-step Academic English learning path</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">STEP 1 · TASK</p><h3 className="font-serif text-xl text-slate-purple mb-2">Read task and policy</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">Identify prompt, genre, section purpose, assessment criteria, language or AI policy, and required disclosure before changing individual sentences.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">STEP 2 · CONVENTIONS</p><h3 className="font-serif text-xl text-slate-purple mb-2">Map reader and academic conventions</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">Decide what this reader, discipline, genre, and assignment expect; identify whether you are arguing, analyzing, evaluating, explaining, or reporting before choosing a more formal phrase.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">STEP 3 · IDEAS</p><h3 className="font-serif text-xl text-slate-purple mb-2">Frame question, claim, and evidence</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">Make the question, provisional claim, evidence, explanation, and paragraph sequence visible so language choices have a clear job.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">STEP 4 · SOURCES</p><h3 className="font-serif text-xl text-slate-purple mb-2">Keep support traceable</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">Keep your contribution distinct from source material, check evidence and scope, and cite the original work you actually consulted.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">STEP 5 · STRUCTURE</p><h3 className="font-serif text-xl text-slate-purple mb-2">Revise global writing first</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">Check meaning, organization, paragraph function, transitions, and relevance before spending time on sentence-level grammar.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">STEP 6 · LANGUAGE</p><h3 className="font-serif text-xl text-slate-purple mb-2">Revise in layers</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">Then work from clarity and terminology to grammar, hedging, and sentence rhythm rather than correcting at random or sounding artificially complex.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">STEP 7 · FEEDBACK</p><h3 className="font-serif text-xl text-slate-purple mb-2">Learn repeated patterns</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">Use comments to notice recurring choices, then decide what to retain, revise, or ask an instructor, librarian, or writing center about.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">STEP 8 · RE-READ</p><h3 className="font-serif text-xl text-slate-purple mb-2">Check reader and responsibility</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">Read the revised work in context, reopen the task rule, and submit only sentences you can explain, support, cite, and take responsibility for.</p></article>
            </div>
          </section>

          <section className="max-w-5xl mx-auto mt-6 grid lg:grid-cols-2 gap-6">
            <article className="p-8 bg-hero-gradient border border-border rounded-2xl">
              <p className="text-xs font-sans uppercase tracking-widest text-primary mb-3">Fictional learning example</p>
              <h2 className="font-serif text-3xl text-slate-purple mb-3">Revise the meaning before the wording</h2>
              <p className="text-sm text-muted-foreground font-sans leading-relaxed"><strong className="text-foreground">This fictional learning example is invented for practice; it is not real student work, research evidence, instructor feedback, or text to submit.</strong> A fictional multilingual writer drafts: “The survey proves students are stress.” Before searching for a more formal synonym, the writer checks the fictional result, revises the meaning to “The survey responses suggest that some participants reported stress,” and then decides whether the evidence, participant group, and study design support that sentence. The next revision can address grammar and wording without turning a limited finding into a stronger claim.</p>
            </article>
            <article className="p-8 bg-white border border-border rounded-2xl">
              <h2 className="font-serif text-3xl text-slate-purple mb-4">Keep authorship and academic responsibility visible</h2>
              <div className="space-y-3 text-sm text-muted-foreground font-sans leading-relaxed">
                <p>Language support can help you notice patterns, compare alternatives, and revise a draft that you have written. It cannot verify a research design, prove a source is credible, decide whether a quotation is accurate, or approve work under your course policy.</p>
                <p><a className="text-primary underline underline-offset-4" href="https://writingcenter.unc.edu/esl/" target="_blank" rel="noreferrer">UNC Writing Center&apos;s English Language Services</a> supports research communication through writing groups, mini-courses, workshops, and academic communication resources for writers whose first language is not English. <a className="text-primary underline underline-offset-4" href="https://www.american.edu/provost/eagle-learning-center/writing-center/about.cfm" target="_blank" rel="noreferrer">American University&apos;s Writing Center</a> frames support for international students as collaborative work on prompts, thesis and argument, research synthesis, methods, citations, revision, language, and U.S. academic expectations—not a paper-checking service. <a className="text-primary underline underline-offset-4" href="https://www.usf.edu/arts-sciences/departments/world-languages/resources/multilingual-writing-center.aspx" target="_blank" rel="noreferrer">USF&apos;s Multilingual Writing Center</a> similarly connects structure, cohesion, grammatical clarity, and expectations for academic writing across brainstorming, drafting, revision, and editing. Use local university support and course guidance where available.</p>
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
            <Link href="/research-question-examples" className="block">
              <div className="h-full p-6 bg-white border border-border rounded-2xl hover:border-primary/30 transition-all">
                <h2 className="font-serif text-2xl text-slate-purple mb-2">Frame a research question</h2>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">Turn a broad topic into a focused question with a realistic evidence route before drafting polished sentences.</p>
              </div>
            </Link>
            <Link href="/thesis-statement-examples" className="block">
              <div className="h-full p-6 bg-white border border-border rounded-2xl hover:border-primary/30 transition-all">
                <h2 className="font-serif text-2xl text-slate-purple mb-2">Build a supportable thesis</h2>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">Match a central claim, its placement, scope, and reader path to the evidence your paper can actually support.</p>
              </div>
            </Link>
            <Link href="/literature-review-example" className="block">
              <div className="h-full p-6 bg-white border border-border rounded-2xl hover:border-primary/30 transition-all">
                <h2 className="font-serif text-2xl text-slate-purple mb-2">Synthesize a literature review</h2>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">Organize source relationships around themes, methods, agreements, differences, and limits rather than author-by-author summary.</p>
              </div>
            </Link>
            <Link href="/research-paper-revision-checklist" className="block">
              <div className="h-full p-6 bg-white border border-border rounded-2xl hover:border-primary/30 transition-all">
                <h2 className="font-serif text-2xl text-slate-purple mb-2">Run a revision checklist</h2>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">Reverse-check task fit, structure, evidence, source use, language clarity, policy and final submission responsibility.</p>
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
