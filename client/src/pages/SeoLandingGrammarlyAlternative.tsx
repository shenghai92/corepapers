import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, GraduationCap, Scale } from "lucide-react";
import { getLoginUrl } from "@/const";

const FAQ = [
  {
    q: "Who might need academic writing support?",
    a: "International students and multilingual writers who want to work deliberately on academic English, research-paper structure, source use, citations, and revision may benefit from a workflow that connects those tasks rather than treating grammar as the whole assignment.",
  },
  {
    q: "What can this workflow help me do in practice?",
    a: "It can help you plan a writing task, draft your own content, review argument and paragraph logic, inspect language suggestions, preserve source attribution, and verify citation details. You decide whether each suggestion fits your assignment and intended meaning.",
  },
  {
    q: "Does this replace my instructor or writing center?",
    a: "No. It does not determine assignment requirements, verify research, approve a draft, or replace feedback from your instructor, supervisor, librarian, or writing center. You remain responsible for everything you submit.",
  },
];

const GRAMMARLY_ALT_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Academic Writing Alternative for International Students",
    url: "https://corepapers.space/academic-writing-alternative-for-international-students",
    description: "A more academic-writing-focused alternative page for international students and non-native English writers.",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  },
];

export default function SeoLandingGrammarlyAlternative() {
  return (
    <>
      <SEOHead
        title="Academic Writing Alternative for International Students"
        description="Explore an academic-writing-focused alternative for international students who want help with non-native phrasing, academic tone, and citation workflows."
        keywords="academic writing alternative for international students, academic writing tool for non-native English writers, alternative for academic writing"
        canonical="/academic-writing-alternative-for-international-students"
        jsonLd={GRAMMARLY_ALT_SCHEMA}
      />

      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-sans font-medium mb-4">
              <Scale size={13} />
              Academic Writing Workflow
            </div>
            <h1 className="font-serif font-light text-3xl sm:text-5xl text-slate-purple mb-4 leading-tight">
              Academic writing support
              <span className="italic"> for international students</span>
            </h1>
            <p className="text-muted-foreground font-sans max-w-2xl mx-auto leading-relaxed mb-8">
              Build an author-led academic writing workflow that connects task planning, research-paper structure, multilingual revision, source use, citations, and a final policy-aware check.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90">
                <Link href="/polish">
                  Try Academic Revision
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-white border-border">
                <a href={getLoginUrl()}>
                  Start Free
                </a>
              </Button>
            </div>
          </div>

          <section className="max-w-5xl mx-auto mb-10 p-7 bg-white border border-border rounded-2xl shadow-card">
            <p className="text-xs font-sans font-semibold tracking-widest uppercase text-primary mb-3">Keep the writer in control</p>
            <h2 className="font-serif text-3xl text-slate-purple mb-5">An eight-step author-led academic writing path</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">STEP 1 · INTERPRET</p><h3 className="font-serif text-xl text-slate-purple mb-2">Read task and policy</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Identify question, genre, audience, required sections, evidence, citation system, AI or language policy, disclosure, and assessment criteria before drafting.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">STEP 2 · ORIENT</p><h3 className="font-serif text-xl text-slate-purple mb-2">Name reader and purpose</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">State what your reader needs to understand and whether the task asks you to argue, analyze, evaluate, explain, or report before choosing wording.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">STEP 3 · PLAN</p><h3 className="font-serif text-xl text-slate-purple mb-2">Build an evidence path</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Turn task into a focused claim or question, section plan, and source record that you can evaluate, explain, and cite accurately.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">STEP 4 · DRAFT</p><h3 className="font-serif text-xl text-slate-purple mb-2">Write ideas yourself</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Develop your own explanation, analysis, and argument; use sources as traceable support rather than text to rearrange or submit as your own.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">STEP 5 · REVISE</p><h3 className="font-serif text-xl text-slate-purple mb-2">Fix global issues first</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Check main point, evidence, organization, paragraph flow, section function, and relevance before spending time on individual sentences or grammar.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">STEP 6 · REVIEW</p><h3 className="font-serif text-xl text-slate-purple mb-2">Inspect language and voice</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Compare phrase, tone, grammar, and clarity suggestions against discipline, intended meaning, and your own voice; keep, reject, or rewrite deliberately.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">STEP 7 · VERIFY</p><h3 className="font-serif text-xl text-slate-purple mb-2">Recheck facts and sources</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Check quotations, paraphrases, evidence claims, in-text citations, reference entries, required disclosure, and any statement a reader could verify.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">STEP 8 · RE-READ</p><h3 className="font-serif text-xl text-slate-purple mb-2">Submit only what you own</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Read from your reader&apos;s perspective, reopen the assignment rule, and submit only work you can explain, support, cite, and take responsibility for.</p></article>
            </div>
            <p className="text-sm font-sans text-primary font-medium mt-5">CorePapers can support practice and review. It cannot decide what your instructor permits, verify sources or facts, approve an argument, or replace feedback from a writing center, librarian, supervisor, or instructor.</p>
          </section>

          <section className="max-w-5xl mx-auto mb-10 p-7 bg-hero-gradient border border-border rounded-2xl">
            <p className="text-xs font-sans font-semibold tracking-widest uppercase text-primary mb-3">Fictional learning example</p>
            <h2 className="font-serif text-3xl text-slate-purple mb-4">Separate writing decisions from language choices</h2>
            <p className="text-sm text-muted-foreground font-sans leading-relaxed"><strong>This fictional learning example is invented for practice; it is not student work, research evidence, or text to submit.</strong> A fictional multilingual writer receives a short analysis assignment. The writer identifies an evaluate—not merely summarize—task, records a bounded claim and two checked sources, drafts the explanation in their own words, then notices during global revision that one paragraph lists evidence without explaining it. After adding the reasoning, the writer considers a phrase suggestion, rejects wording that overstates the source, checks citation placement, and rereads the response against the rubric before submitting a version they can explain.</p>
          </section>

          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-5 mb-10">
            {[
              "Start with task, evidence, and structure before changing surface grammar.",
              "Use language and phrase support as choices to review, not text to accept without judgment.",
              "Keep paraphrases, quotations, in-text citations, and reference entries visible and traceable.",
            ].map((item) => (
              <div key={item} className="p-6 bg-white border border-border rounded-2xl">
                <CheckCircle2 size={18} className="text-emerald-500 mb-3" />
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          <div className="max-w-5xl mx-auto grid lg:grid-cols-[1.3fr_0.9fr] gap-6 mb-10">
            <section className="p-8 bg-white border border-border rounded-2xl">
              <h2 className="font-serif text-3xl text-slate-purple mb-4">Support multilingual writing without losing authorship</h2>
              <div className="space-y-4 text-sm text-muted-foreground font-sans leading-relaxed">
                <p><a className="text-primary underline underline-offset-4" href="https://drexel.edu/coas/academics/university-writing-program/multilingual-writers/" target="_blank" rel="noreferrer">Drexel University&apos;s Writing Program</a> describes multilingual writing support as collaborative work that helps writers make informed choices reflecting their individual voice. Its support spans brainstorming, organizing, interpreting prompts, using sources, avoiding plagiarism, and revising grammar.</p>
                <p><a className="text-primary underline underline-offset-4" href="https://owl.purdue.edu/owl/multilingual/multilingual_students/index.html" target="_blank" rel="noreferrer">Purdue OWL</a> brings together multilingual resources for writing across the curriculum and disciplines. Its <a className="text-primary underline underline-offset-4" href="https://owl.purdue.edu/owl/general_writing/the_writing_process/proofreading/steps_for_revising.html" target="_blank" rel="noreferrer">revision guide</a> begins with main point, reader, purpose, evidence, and relevance before clarity and grammar.</p>
                <p>Use that sequence in CorePapers: start with <Link href="/academic-english-for-esl-students" className="text-primary underline">Academic English support</Link> or <Link href="/research-paper-sections" className="text-primary underline">paper sections</Link>, review argument and paragraph logic, then use <Link href="/polish" className="text-primary underline">Essay Polish</Link>, the <Link href="/phrases" className="text-primary underline">phrase library</Link>, or <Link href="/citations" className="text-primary underline">citation support</Link> for the relevant task.</p>
              </div>
            </section>

            <aside className="p-8 bg-hero-gradient border border-border rounded-2xl">
              <div className="inline-flex items-center gap-2 mb-4 text-xs font-sans font-semibold tracking-widest uppercase text-primary">
                <GraduationCap size={13} />
                Quick fit check
              </div>
              <div className="space-y-4 text-sm text-muted-foreground font-sans leading-relaxed">
                <p>If your assignment includes essays, reports, literature reviews, research-paper sections, or citation-heavy work, a staged workflow may help you separate planning, drafting, revision, language review, and source checks.</p>
              </div>
              <div className="space-y-3 mt-6">
                <Button asChild className="w-full bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90">
                  <Link href="/pricing">
                    See Pricing
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full bg-white border-border">
                  <Link href="/polish">
                    Try Essay Polish
                  </Link>
                </Button>
              </div>
            </aside>
          </div>

          <section className="max-w-5xl mx-auto mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: "/academic-english-for-esl-students", title: "Academic English for ESL students", desc: "Build a multilingual writing routine that moves from understanding the task to revising your own draft." },
              { href: "/research-paper-sections", title: "Research paper sections", desc: "Choose a structure and section function before looking for sentence-level wording." },
              { href: "/academic-paragraph-structure", title: "Academic paragraph structure", desc: "Make each paragraph connect point, evidence, explanation, and transition before polishing sentences." },
              { href: "/academic-argument-evidence", title: "Argument and evidence", desc: "Check claim, support, reasoning, limitation, and evidence language together." },
              { href: "/academic-paraphrasing-tool-for-esl-students", title: "Academic paraphrasing", desc: "Understand a source, rebuild the idea for your own purpose, and keep attribution visible." },
              { href: "/evaluate-academic-sources", title: "Academic source evaluation", desc: "Verify a source&apos;s author, purpose, evidence, currency, and record before relying on it." },
              { href: "/academic-integrity-and-source-use", title: "Academic integrity and source use", desc: "Decide when quotation, paraphrase, summary, and citation are required." },
              { href: "/citations", title: "Citation Generator", desc: "Generate a formatting draft only after checking the original source details and required style." },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="block"><article className="h-full p-5 bg-white border border-border rounded-xl hover:border-primary/30 hover:shadow-card transition-all"><h2 className="font-serif text-2xl text-slate-purple mb-2">{item.title}</h2><p className="text-sm text-muted-foreground font-sans leading-relaxed">{item.desc}</p></article></Link>
            ))}
          </section>

          <div className="max-w-4xl mx-auto mt-10">
            <h2 className="font-serif font-light text-3xl text-slate-purple text-center mb-6">Frequently asked questions</h2>
            <div className="space-y-3">
              {FAQ.map((item) => (
                <div key={item.q} className="p-5 bg-white border border-border rounded-xl">
                  <h3 className="font-sans font-medium text-foreground mb-2">{item.q}</h3>
                  <p className="text-sm text-muted-foreground font-sans leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
