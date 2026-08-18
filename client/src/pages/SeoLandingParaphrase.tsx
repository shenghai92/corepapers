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
    a: "Yes. It is useful when a paraphrase sounds too close to the source, too literal, or not academic enough in tone.",
  },
  {
    q: "What should I use alongside paraphrasing?",
    a: "Students often pair paragraph revision with citation generation so paraphrased ideas stay both clear and properly attributed.",
  },
];

const PARAPHRASE_LANDING_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Academic Paraphrasing Tool for ESL Students",
    url: "https://corepapers.space/academic-paraphrasing-tool-for-esl-students",
    description: "Academic paraphrasing support for ESL students and international writers.",
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
              Improve paraphrased sentences that sound too literal, too close to the source, or not quite academic enough for essays and literature reviews.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90">
                <Link
                  href="/polish"
                  onClick={() => trackEvent("cta_click", { location: "landing_paraphrase_hero", target: "revise_paraphrase" })}
                >
                  Revise a Paraphrase
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-white border-border">
                <Link
                  href="/citations"
                  onClick={() => trackEvent("cta_click", { location: "landing_paraphrase_hero", target: "generate_citation" })}
                >
                  Generate Citation
                </Link>
              </Button>
            </div>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-5 mb-10">
            {[
              "Make source-based writing sound more like your own academic voice.",
              "Reduce literal translation patterns that often appear in ESL paraphrasing.",
              "Keep revision and citation support close together in one workflow.",
            ].map((item) => (
              <div key={item} className="p-6 bg-white border border-border rounded-2xl">
                <CheckCircle2 size={18} className="text-emerald-500 mb-3" />
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          <div className="max-w-5xl mx-auto grid lg:grid-cols-[1.3fr_0.9fr] gap-6 mb-10">
            <section className="p-8 bg-white border border-border rounded-2xl">
              <h2 className="font-serif text-3xl text-slate-purple mb-4">How to paraphrase an academic source responsibly</h2>
              <ol className="space-y-4 text-sm text-muted-foreground font-sans leading-relaxed list-decimal list-inside">
                <li><strong className="text-foreground">Understand the source first.</strong> Identify the claim, evidence, and qualification before you try to change the wording.</li>
                <li><strong className="text-foreground">Write the idea in a new structure.</strong> Do more than exchange individual synonyms; organise the sentence in the way that best fits your own argument.</li>
                <li><strong className="text-foreground">Compare for accuracy.</strong> Make sure your version does not overstate, omit, or distort the original meaning.</li>
                <li><strong className="text-foreground">Cite the source.</strong> A paraphrase still needs a citation because the underlying idea or evidence came from another author.</li>
              </ol>
              <p className="mt-5 text-sm text-muted-foreground font-sans leading-relaxed">
                For fuller examples, read <Link href="/blog/how-to-paraphrase-without-plagiarizing-in-academic-writing" className="text-primary underline">how to paraphrase without plagiarizing</Link>.
              </p>
            </section>

            <aside className="p-8 bg-hero-gradient border border-border rounded-2xl">
              <div className="inline-flex items-center gap-2 mb-4 text-xs font-sans font-semibold tracking-widest uppercase text-primary">
                <GraduationCap size={13} />
                Best next step
              </div>
              <div className="space-y-4 text-sm text-muted-foreground font-sans leading-relaxed">
                <p>Paste the paragraph you paraphrased, review the revised wording, then build the citation for the original source.</p>
              </div>
              <div className="space-y-3 mt-6">
                <Button asChild className="w-full bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90">
                  <Link
                    href="/polish"
                    onClick={() => trackEvent("cta_click", { location: "landing_paraphrase_sidebar", target: "try_revision" })}
                  >
                    Try Paragraph Revision
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full bg-white border-border">
                  <Link
                    href="/login"
                    onClick={() => trackEvent("cta_click", { location: "landing_paraphrase_sidebar", target: "start_free" })}
                  >
                    Start Free
                  </Link>
                </Button>
              </div>
            </aside>
          </div>

          <section className="max-w-4xl mx-auto mt-10 p-7 bg-white border border-border rounded-2xl">
            <h2 className="font-serif text-3xl text-slate-purple mb-4">A quick self-check before you submit</h2>
            <ul className="space-y-3 text-sm text-muted-foreground font-sans leading-relaxed">
              <li>Does the paraphrase preserve the source's actual claim and level of certainty?</li>
              <li>Have you changed the sentence structure as well as the individual words?</li>
              <li>Is the citation placed close enough for a reader to see which idea it supports?</li>
              <li>Have you followed your instructor's or institution's academic-integrity policy?</li>
            </ul>
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

          <div className="max-w-4xl mx-auto mt-10 grid sm:grid-cols-2 gap-4">
            <Link href="/pricing" className="block">
              <div className="p-6 bg-white border border-border rounded-2xl hover:border-primary/30 hover:shadow-card transition-all">
                <h2 className="font-serif text-2xl text-slate-purple mb-2">See plans for regular revision</h2>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                  Compare free and paid options if you revise source-based writing often during the semester.
                </p>
              </div>
            </Link>
            <Link href="/blog/how-to-paraphrase-without-plagiarizing-in-academic-writing" className="block">
              <div className="p-6 bg-white border border-border rounded-2xl hover:border-primary/30 hover:shadow-card transition-all">
                <h2 className="font-serif text-2xl text-slate-purple mb-2">Read the paraphrasing guide</h2>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                  Review the practical workflow for safer paraphrasing, then return to the tool for revision.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
