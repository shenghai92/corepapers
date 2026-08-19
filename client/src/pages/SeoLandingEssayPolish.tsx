import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Sparkles, GraduationCap } from "lucide-react";
import { getLoginUrl } from "@/const";
import { trackEvent } from "@/lib/analytics";

const FAQ = [
  {
    q: "What kind of writing is this essay polisher best for?",
    a: "It works best for essays, reports, research papers, and dissertation sections written by non-native English speakers who want clearer academic phrasing.",
  },
  {
    q: "Does it only check grammar?",
    a: "No. It can surface wording, academic tone, vocabulary, sentence clarity, hedging, and formality choices for you to review. It cannot confirm that evidence supports a claim, verify a source, or decide what your course permits.",
  },
  {
    q: "How should I use AI polishing responsibly?",
    a: "Draft the idea yourself, check assignment and AI-use rules, review every suggestion against your intended meaning and sources, and complete a final citation and accuracy check. You remain responsible for the submitted work.",
  },
];

const POLISH_LANDING_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CorePapers AI Essay Polisher",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    url: "https://corepapers.space/ai-essay-polisher-for-non-native-english-writers",
    description: "AI essay polisher for non-native English writers and international students.",
    featureList: [
      "Non-native expression detection",
      "Academic vocabulary improvements",
      "Clear sentence-level explanations",
      "Discipline-aware revision support",
    ],
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

export default function SeoLandingEssayPolish() {
  return (
    <>
      <SEOHead
        title="AI Essay Polisher for ESL and Non-Native English Writers"
        description="Improve academic essays, reports, and research papers with an AI essay polisher for ESL and non-native English writers. Fix awkward phrasing and strengthen academic tone."
        keywords="AI essay polisher, essay polisher for non-native English writers, essay polisher for ESL students, ESL essay correction, academic writing polish tool, improve academic tone"
        canonical="/ai-essay-polisher-for-non-native-english-writers"
        jsonLd={POLISH_LANDING_SCHEMA}
      />

      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-sans font-medium mb-4">
              <Sparkles size={13} />
              Academic Writing Revision
            </div>
            <h1 className="font-serif font-light text-3xl sm:text-5xl text-slate-purple mb-4 leading-tight">
              AI essay polisher
              <span className="italic"> for non-native English writers</span>
            </h1>
            <p className="text-muted-foreground font-sans max-w-2xl mx-auto leading-relaxed mb-8">
              Improve academic tone, fix non-native expressions, and strengthen clarity with a revision workflow built for ESL students and international students writing in English.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90">
                <Link
                  href="/polish"
                  onClick={() => trackEvent("cta_click", { location: "landing_polish_hero", target: "try_polish" })}
                >
                  Try Essay Polish
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-white border-border">
                <a
                  href={getLoginUrl()}
                  onClick={() => trackEvent("cta_click", { location: "landing_polish_hero", target: "start_free" })}
                >
                  Start Free
                </a>
              </Button>
            </div>
          </div>

          <section className="max-w-5xl mx-auto mb-10 p-7 bg-white border border-border rounded-2xl shadow-card">
            <p className="text-xs font-sans font-semibold tracking-widest uppercase text-primary mb-3">Use suggestions as review prompts</p>
            <h2 className="font-serif text-3xl text-slate-purple mb-5">An eight-step responsible revision workflow</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">STEP 1 · BEFORE</p><h3 className="font-serif text-xl text-slate-purple mb-2">Confirm the task and policy</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Check assignment requirements, permitted AI use, disclosure expectations, intended reader, discipline, and the revision goal for this paragraph.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">STEP 2 · BEFORE</p><h3 className="font-serif text-xl text-slate-purple mb-2">Protect the draft</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Use a paragraph you wrote. Do not enter confidential, unpublished, personal, or sensitive material unless its handling is permitted and understood.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">STEP 3 · BEFORE</p><h3 className="font-serif text-xl text-slate-purple mb-2">Name one revision goal</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Decide whether you are checking clarity, cohesion, academic tone, concision, hedging, or grammar. Do not ask a language tool to invent an argument.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">STEP 4 · BEFORE</p><h3 className="font-serif text-xl text-slate-purple mb-2">Review global writing first</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Check the paragraph&apos;s point, evidence, explanation, order, and relevance before spending time on individual sentences or grammar.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">STEP 5 · DURING</p><h3 className="font-serif text-xl text-slate-purple mb-2">Compare every change</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Read original and suggestion side by side. Keep, reject, or rewrite only after checking meaning, scope, certainty, discipline, and your own voice.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">STEP 6 · DURING</p><h3 className="font-serif text-xl text-slate-purple mb-2">Verify facts and sources</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Make sure changes have not altered facts, removed qualification, overclaimed a conclusion, or separated borrowed ideas from citations.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">STEP 7 · AFTER</p><h3 className="font-serif text-xl text-slate-purple mb-2">Edit language deliberately</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Then check terminology, grammar, sentence clarity, cohesion, and formality. Retain wording you can explain and that still sounds like you.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">STEP 8 · AFTER</p><h3 className="font-serif text-xl text-slate-purple mb-2">Read as your reader</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Read the revised paragraph in the paper, reopen the assignment rule, and confirm that you can support, cite, and take responsibility for every sentence you submit.</p></article>
            </div>
            <p className="text-sm font-sans text-primary font-medium mt-5">An AI essay polisher can help you notice and evaluate language choices. It does not write your argument, validate research, make a source credible, decide what your course permits, or approve a paper for submission.</p>
          </section>

          <section className="max-w-5xl mx-auto mb-10 p-7 bg-hero-gradient border border-border rounded-2xl">
            <p className="text-xs font-sans font-semibold tracking-widest uppercase text-primary mb-3">Fictional learning example</p>
            <h2 className="font-serif text-3xl text-slate-purple mb-4">Practise a transparent revision decision</h2>
            <p className="text-sm text-muted-foreground font-sans leading-relaxed"><strong>This fictional learning example is invented for practice; it is not student work, research evidence, or text to submit.</strong> A fictional writer has drafted a paragraph with a cited, cautious finding. The writer first confirms that sentence-level language support is allowed, removes an unpublished interview detail, and asks only for clarity options. The writer rejects one smoother sentence because it turns an association into a cause, keeps another after checking it against the source, restores the citation after moving the sentence, and reads the paragraph alongside its claim and evidence before deciding whether the remaining grammar edit preserves the writer&apos;s voice.</p>
          </section>

          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-5 mb-10">
            {[
              "Catch sentence patterns that sound translated instead of naturally academic.",
              "Upgrade weak or repetitive vocabulary without making the text sound artificial.",
              "Learn from explanations instead of only getting a black-box rewrite.",
            ].map((item) => (
              <div key={item} className="p-6 bg-white border border-border rounded-2xl">
                <CheckCircle2 size={18} className="text-emerald-500 mb-3" />
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          <div className="max-w-5xl mx-auto grid lg:grid-cols-[1.3fr_0.9fr] gap-6 mb-10">
            <section className="p-8 bg-white border border-border rounded-2xl">
              <h2 className="font-serif text-3xl text-slate-purple mb-4">Use an essay polisher after the writing decision</h2>
              <div className="space-y-4 text-sm text-muted-foreground font-sans leading-relaxed">
                <p>Use a polisher after you have decided what the paragraph needs to say and how evidence supports that point. Begin with argument, organization, and source checks; use language review to make those decisions easier for readers to follow.</p>
                <p><a className="text-primary underline underline-offset-4" href="https://owl.purdue.edu/owl/general_writing/the_writing_process/proofreading/steps_for_revising.html" target="_blank" rel="noreferrer">Purdue OWL</a> recommends beginning revision with main point, reader, purpose, evidence, and relevance before clarity and grammar. <a className="text-primary underline underline-offset-4" href="https://writingcenter.unc.edu/tips-and-tools/generative-ai-in-academic-writing/" target="_blank" rel="noreferrer">UNC Writing Center</a> advises writers to follow course policies, compare original and AI-edited text, and remain responsible for submitted work.</p>
                <p>For focused support, use <Link href="/academic-paragraph-structure" className="text-primary underline">paragraph structure</Link> to check logic, <Link href="/hedging-language-academic-writing" className="text-primary underline">hedging guidance</Link> to match certainty to evidence, or <Link href="/academic-writing-for-graduate-students" className="text-primary underline">graduate academic writing</Link> for longer research projects.</p>
              </div>
            </section>

            <aside className="p-8 bg-hero-gradient border border-border rounded-2xl">
              <div className="inline-flex items-center gap-2 mb-4 text-xs font-sans font-semibold tracking-widest uppercase text-primary">
                <GraduationCap size={13} />
                Fastest path
              </div>
              <div className="space-y-4 text-sm text-muted-foreground font-sans leading-relaxed">
                <p>Paste a paragraph you have drafted, choose your discipline, and assess sentence-level improvements in the context of your intended meaning.</p>
                <p>Then check paragraph logic, source attribution, and required citation details before you use any revision in coursework.</p>
              </div>
              <Button asChild className="w-full mt-6 bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90">
                <Link
                  href="/polish"
                  onClick={() => trackEvent("cta_click", { location: "landing_polish_sidebar", target: "polish_now" })}
                >
                  Polish My Writing
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </aside>
          </div>

          <div className="max-w-4xl mx-auto">
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

          <section className="max-w-5xl mx-auto mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: "/academic-paragraph-structure", title: "Check paragraph structure", desc: "Confirm a focused point, relevant evidence, explanation, and transition before polishing language." },
              { href: "/academic-argument-evidence", title: "Review argument and evidence", desc: "Make sure a clearer sentence still represents a defensible claim and its support." },
              { href: "/academic-english-for-esl-students", title: "Academic English for ESL students", desc: "Build a multilingual revision routine that protects your authorial voice." },
              { href: "/academic-paraphrasing-tool-for-esl-students", title: "Paraphrase with attribution", desc: "Understand and rebuild a source idea before using language support and citation checks." },
              { href: "/academic-integrity-and-source-use", title: "Academic integrity and source use", desc: "Check quotation, paraphrase, summary, citation, and course-policy responsibilities." },
              { href: "/citations", title: "Generate, then verify citations", desc: "Create a reference draft from original source details and check it against required style guidance." },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="block"><article className="h-full p-5 bg-white border border-border rounded-xl hover:border-primary/30 hover:shadow-card transition-all"><h2 className="font-serif text-2xl text-slate-purple mb-2">{item.title}</h2><p className="text-sm text-muted-foreground font-sans leading-relaxed">{item.desc}</p></article></Link>
            ))}
          </section>

          <div className="max-w-4xl mx-auto mt-10 grid sm:grid-cols-2 gap-4">
            <Link href="/pricing" className="block">
              <div className="p-6 bg-white border border-border rounded-2xl hover:border-primary/30 hover:shadow-card transition-all">
                <h2 className="font-serif text-2xl text-slate-purple mb-2">Compare free and paid polish limits</h2>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                  Check whether the free tier is enough for occasional revisions or whether you need a higher word limit.
                </p>
              </div>
            </Link>
            <Link href="/phrases" className="block">
              <div className="p-6 bg-white border border-border rounded-2xl hover:border-primary/30 hover:shadow-card transition-all">
                <h2 className="font-serif text-2xl text-slate-purple mb-2">Browse phrase support too</h2>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                  Adapt academic phrases to your own evidence, discipline, reader, and citation needs after you have checked the paragraph&apos;s purpose.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
