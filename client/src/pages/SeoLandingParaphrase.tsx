import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, GraduationCap, PenTool } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const FAQ = [
  {
    q: "Is this a paraphrasing tool for academic writing?",
    a: "CorePapers is positioned as an academic writing revision tool that helps improve clarity, tone, and source-based writing for students working in English.",
  },
  {
    q: "Can it help paraphrased text sound more natural?",
    a: "It can help you review a paraphrase that sounds too literal or too close to the source. You should first understand the source, rebuild its relevant idea for your own point, compare meanings, and keep the citation; a tool cannot turn synonym swapping into an acceptable paraphrase.",
  },
  {
    q: "What should I use alongside paraphrasing?",
    a: "Keep a record of the original source and page or location, then check the in-text citation and complete reference entry. Use a source-evaluation checklist and citation guide when you need to verify the source record or format.",
  },
];

const PARAPHRASE_LANDING_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Academic Paraphrasing Tool for ESL Students",
    url: "https://corepapers.space/academic-paraphrasing-tool-for-esl-students",
    description:
      "Academic paraphrasing support for ESL students and international writers.",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map(item => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  },
];

export default function SeoLandingParaphrase() {
  return (
    <>
      <SEOHead
        title="Academic Paraphrasing Tool for ESL Students"
        description="Improve paraphrased academic writing so it sounds clearer, more natural, and more appropriate for essays, reports, and literature reviews."
        keywords="academic paraphrasing tool, paraphrasing tool for ESL students, improve paraphrasing academic writing, paraphrase academic English"
        canonical="/academic-paraphrasing-tool-for-esl-students/"
        jsonLd={PARAPHRASE_LANDING_SCHEMA}
      />

      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-sans font-medium mb-4">
              <PenTool size={13} />
              Source-Based Writing Support
            </div>
            <h1 className="font-serif font-light text-3xl sm:text-5xl text-slate-purple mb-4 leading-tight">
              Academic paraphrasing tool
              <span className="italic"> for ESL students</span>
            </h1>
            <p className="text-muted-foreground font-sans max-w-2xl mx-auto leading-relaxed mb-8">
              Improve paraphrased sentences that sound too literal, too close to
              the source, or not quite academic enough for essays and literature
              reviews.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90"
              >
                <Link
                  href="/polish"
                  onClick={() =>
                    trackEvent("cta_click", {
                      location: "landing_paraphrase_hero",
                      target: "revise_paraphrase",
                    })
                  }
                >
                  Revise a Paraphrase
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-white border-border"
              >
                <Link
                  href="/citations"
                  onClick={() =>
                    trackEvent("cta_click", {
                      location: "landing_paraphrase_hero",
                      target: "generate_citation",
                    })
                  }
                >
                  Generate Citation
                </Link>
              </Button>
            </div>
          </div>

          <section className="max-w-5xl mx-auto mb-10 p-7 bg-white border border-border rounded-2xl shadow-card">
            <p className="text-xs font-sans font-semibold tracking-widest uppercase text-primary mb-3">Understand, rebuild, then attribute</p>
            <h2 className="font-serif text-3xl text-slate-purple mb-5">A six-step academic paraphrasing workflow</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">1. RECORD</p><h3 className="font-serif text-xl text-slate-purple mb-2">Keep the source details</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Note author, title, publication details, page or location, and required citation system before you begin so the source remains traceable.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">2. UNDERSTAND</p><h3 className="font-serif text-xl text-slate-purple mb-2">Read for the full idea</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Read the passage and surrounding context until you can explain its claim, evidence, qualification, and purpose without relying on the original wording.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">3. SELECT</p><h3 className="font-serif text-xl text-slate-purple mb-2">Choose what your point needs</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Identify the limited idea, result, definition, or contrast that genuinely advances your paragraph—not every detail from the source.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">4. REBUILD</p><h3 className="font-serif text-xl text-slate-purple mb-2">Set the source aside</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Explain the relevant idea in a structure, sequence, and emphasis that fit your own claim. Do not replace source words one by one while retaining its sentence pattern.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">5. COMPARE</p><h3 className="font-serif text-xl text-slate-purple mb-2">Check accuracy and distance</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Return to the source and correct any shift in scope, certainty, evidence, or meaning. Quote and mark any distinctive wording you must retain.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">6. ATTRIBUTE</p><h3 className="font-serif text-xl text-slate-purple mb-2">Credit the borrowed idea</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Place the required in-text citation or note where readers can see what it supports, and make sure a matching full reference is present.</p></article>
            </div>
            <p className="text-sm font-sans text-primary font-medium mt-5">A revision tool can help you inspect your own draft, but it cannot verify the original source, determine shared versus distinctive language, or decide whether a paraphrase accurately represents the author&apos;s idea.</p>
          </section>

          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-5 mb-10">
            {[
              "Make source-based writing sound more like your own academic voice.",
              "Reduce literal translation patterns that often appear in ESL paraphrasing.",
              "Keep revision and citation support close together in one workflow.",
            ].map(item => (
              <div
                key={item}
                className="p-6 bg-white border border-border rounded-2xl"
              >
                <CheckCircle2 size={18} className="text-emerald-500 mb-3" />
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>

          <div className="max-w-5xl mx-auto grid lg:grid-cols-[1.3fr_0.9fr] gap-6 mb-10">
            <section className="p-8 bg-white border border-border rounded-2xl">
              <h2 className="font-serif text-3xl text-slate-purple mb-4">
                How to paraphrase an academic source responsibly
              </h2>
              <div className="space-y-4 text-sm text-muted-foreground font-sans leading-relaxed">
                <p><strong className="text-foreground">Fictional learning example.</strong> This invented practice scenario is not a source, result, or sentence to submit. A fictional writer reads a study, identifies only the limitation relevant to a paragraph, closes the source, explains that limit in a new sentence sequence, then reopens the study to check that its scope and cautious wording remain accurate before adding a citation.</p>
                <p>That approach is different from replacing individual words while retaining the source&apos;s structure. A new vocabulary item does not create a new paraphrase; the writer must understand, select, organize, and explain the idea for a real purpose in the draft.</p>
              </div>
              <p className="mt-5 text-sm text-muted-foreground font-sans leading-relaxed">
                <a className="text-primary underline underline-offset-4" href="https://owl.purdue.edu/owl/research_and_citation/using_research/quoting_paraphrasing_and_summarizing/paraphrasing.html" target="_blank" rel="noreferrer">Purdue OWL</a> recommends understanding the passage, putting it aside, creating a new rendition, checking against the original, marking unique borrowed wording, and recording the source. <a className="text-primary underline underline-offset-4" href="https://writingcenter.gmu.edu/writing-resources/citing-sources/paraphrasing" target="_blank" rel="noreferrer">George Mason University Writing Center</a> warns that synonym-by-synonym patchwriting remains unacceptable because it keeps the source&apos;s structure rather than serving the writer&apos;s own purpose.
              </p>
              <p className="mt-5 text-sm text-muted-foreground font-sans leading-relaxed">
                For a source-use decision guide and a labelled example, read{" "}
                <Link
                  href="/academic-integrity-and-source-use"
                  className="text-primary underline"
                >
                  academic integrity and source use
                </Link>
                . You can also review{" "}
                <Link
                  href="/how-to-paraphrase-without-plagiarizing"
                  className="text-primary underline"
                >
                  how to paraphrase without plagiarizing
                </Link>
                .
              </p>
            </section>

            <aside className="p-8 bg-hero-gradient border border-border rounded-2xl">
              <div className="inline-flex items-center gap-2 mb-4 text-xs font-sans font-semibold tracking-widest uppercase text-primary">
                <GraduationCap size={13} />
                Best next step
              </div>
              <div className="space-y-4 text-sm text-muted-foreground font-sans leading-relaxed">
                <p>
                  Paste the paragraph you paraphrased, review the revised
                  wording, then build the citation for the original source.
                </p>
              </div>
              <div className="space-y-3 mt-6">
                <Button
                  asChild
                  className="w-full bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90"
                >
                  <Link
                    href="/polish"
                    onClick={() =>
                      trackEvent("cta_click", {
                        location: "landing_paraphrase_sidebar",
                        target: "try_revision",
                      })
                    }
                  >
                    Try Paragraph Revision
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full bg-white border-border"
                >
                  <Link
                    href="/login"
                    onClick={() =>
                      trackEvent("cta_click", {
                        location: "landing_paraphrase_sidebar",
                        target: "start_free",
                      })
                    }
                  >
                    Start Free
                  </Link>
                </Button>
              </div>
            </aside>
          </div>

          <section className="max-w-4xl mx-auto mt-10 p-7 bg-white border border-border rounded-2xl">
            <h2 className="font-serif text-3xl text-slate-purple mb-4">
              A quick self-check before you submit
            </h2>
            <ul className="space-y-3 text-sm text-muted-foreground font-sans leading-relaxed">
              <li>
                Does the paraphrase preserve the source's actual claim and level
                of certainty?
              </li>
              <li>
                Have you changed the sentence structure as well as the
                individual words?
              </li>
              <li>
                Is the citation placed close enough for a reader to see which
                idea it supports?
              </li>
              <li>
                Have you followed your instructor's or institution's
                academic-integrity policy?
              </li>
            </ul>
          </section>

          <div className="max-w-4xl mx-auto mt-10">
            <h2 className="font-serif font-light text-3xl text-slate-purple text-center mb-6">
              Frequently asked questions
            </h2>
            <div className="space-y-3">
              {FAQ.map(item => (
                <div
                  key={item.q}
                  className="p-5 bg-white border border-border rounded-xl"
                >
                  <h3 className="font-sans font-medium text-foreground mb-2">
                    {item.q}
                  </h3>
                  <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/pricing" className="block">
              <div className="p-6 bg-white border border-border rounded-2xl hover:border-primary/30 hover:shadow-card transition-all">
                <h2 className="font-serif text-2xl text-slate-purple mb-2">
                  See plans for regular revision
                </h2>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                  Compare free and paid options if you revise source-based
                  writing often during the semester.
                </p>
              </div>
            </Link>
            <Link href="/academic-integrity-and-source-use" className="block">
              <div className="p-6 bg-white border border-border rounded-2xl hover:border-primary/30 hover:shadow-card transition-all">
                <h2 className="font-serif text-2xl text-slate-purple mb-2">Use sources with confidence</h2>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">Decide whether an idea needs a quotation, paraphrase, summary, and citation before returning to the tool for revision.</p>
              </div>
            </Link>
            <Link href="/evaluate-academic-sources" className="block">
              <div className="p-6 bg-white border border-border rounded-2xl hover:border-primary/30 hover:shadow-card transition-all">
                <h2 className="font-serif text-2xl text-slate-purple mb-2">Evaluate the source first</h2>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">Check author, purpose, evidence, currency, and record quality before a clean paraphrase gives weak material undeserved authority.</p>
              </div>
            </Link>
            <Link href="/citations" className="block">
              <div className="p-6 bg-white border border-border rounded-2xl hover:border-primary/30 hover:shadow-card transition-all">
                <h2 className="font-serif text-2xl text-slate-purple mb-2">Generate, then verify a citation</h2>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">Create a reference only from source details checked against the item you actually read and use.</p>
              </div>
            </Link>
            <Link href="/academic-argument-evidence" className="block">
              <div className="p-6 bg-white border border-border rounded-2xl hover:border-primary/30 hover:shadow-card transition-all">
                <h2 className="font-serif text-2xl text-slate-purple mb-2">Connect evidence to an argument</h2>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">Use a paraphrase to advance a claim with explanation, not to replace your own reasoning.</p>
              </div>
            </Link>
            <Link href="/academic-writing-examples" className="block">
              <div className="p-6 bg-white border border-border rounded-2xl hover:border-primary/30 hover:shadow-card transition-all">
                <h2 className="font-serif text-2xl text-slate-purple mb-2">Analyse academic writing examples</h2>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">Transfer a rhetorical move into your own verified content rather than copying a polished source-based model.</p>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
