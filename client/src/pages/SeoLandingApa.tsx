import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle2, Quote, GraduationCap } from "lucide-react";
import { getLoginUrl } from "@/const";
import { trackEvent } from "@/lib/analytics";

const FAQ = [
  {
    q: "Who is this APA citation generator for?",
    a: "It is for international students and multilingual writers who need to turn checked source details into an APA 7 reference draft, connect it to an in-text citation, and review both against assignment requirements.",
  },
  {
    q: "What should I prepare before using an APA citation generator?",
    a: "Open the original source and record the contributor names, date, title, source or container, volume or issue, page range, DOI or stable URL, and any source-type details. A generator cannot recover information that is absent or incorrectly copied.",
  },
  {
    q: "Does a generated reference guarantee APA compliance?",
    a: "No. Check the output against the source you actually used, your instructor&apos;s requirements, and current APA guidance. You are responsible for the author order, date, title, source details, DOI or URL, in-text citation, and matching reference entry.",
  },
];

const APA_LANDING_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CorePapers APA Citation Generator",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    url: "https://corepapers.space/apa-citation-generator-for-international-students",
    description: "APA citation generator for international students and non-native English writers.",
    featureList: [
      "APA 7th edition references",
      "APA in-text citations",
      "Journal, book, website, thesis, and conference source support",
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

export default function SeoLandingApa() {
  return (
    <>
      <SEOHead
        title="APA Citation Generator for International Students"
        description="Generate APA 7th edition citations and in-text references for essays, reports, and research papers. Built for international students who need a fast APA citation generator."
        keywords="APA citation generator for international students, APA 7 citation generator, APA reference generator, APA in-text citation generator, free APA citation tool"
        canonical="/apa-citation-generator-for-international-students"
        jsonLd={APA_LANDING_SCHEMA}
      />

      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-sans font-medium mb-4">
              <Quote size={13} />
              APA 7th Edition Help
            </div>
            <h1 className="font-serif font-light text-3xl sm:text-5xl text-slate-purple mb-4 leading-tight">
              APA citation generator
              <span className="italic"> for international students</span>
            </h1>
            <p className="text-muted-foreground font-sans max-w-2xl mx-auto leading-relaxed mb-8">
              Turn checked source details into an APA 7 reference draft, connect it to a matching in-text citation, and review both against the original source, current style guidance, and your assignment requirements.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90">
                <Link
                  href="/citations"
                  onClick={() => trackEvent("cta_click", { location: "landing_apa_hero", target: "use_tool" })}
                >
                  Use APA Citation Tool
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-white border-border">
                <a
                  href={getLoginUrl()}
                  onClick={() => trackEvent("cta_click", { location: "landing_apa_hero", target: "start_free" })}
                >
                  Start Free
                </a>
              </Button>
            </div>
          </div>

          <section className="max-w-5xl mx-auto mb-10 p-7 bg-white border border-border rounded-2xl shadow-card">
            <p className="text-xs font-sans font-semibold tracking-widest uppercase text-primary mb-3">Generate a formatting draft, then verify it</p>
            <h2 className="font-serif text-3xl text-slate-purple mb-5">An eight-step APA 7 citation workflow</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">1. REQUIREMENT</p><h3 className="font-serif text-xl text-slate-purple mb-2">Confirm APA and course rule</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Check whether APA 7, a required edition, an instructor exception, a source type, and author–date placement apply before formatting.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">2. ORIGINAL</p><h3 className="font-serif text-xl text-slate-purple mb-2">Open the work you used</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Work from the actual article, book, chapter, report, thesis, conference paper, dataset, or webpage—not a search preview or copied bibliography.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">3. IDENTITY</p><h3 className="font-serif text-xl text-slate-purple mb-2">Confirm type, version, and container</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Distinguish article, chapter, report, webpage, dataset, translation, edition, and medium before applying a template to the item you used.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">4. RECORD</p><h3 className="font-serif text-xl text-slate-purple mb-2">Collect original details</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Use the source itself to record contributors, date, title, container, volume or issue, pages, DOI or stable URL, and source-specific details.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">5. GENERATE</p><h3 className="font-serif text-xl text-slate-purple mb-2">Create a transparent draft</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Use the matching source type to create a reference and in-text citation draft; do not treat output as a substitute for source verification.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">6. REVIEW</p><h3 className="font-serif text-xl text-slate-purple mb-2">Compare with official examples</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Check ordering, capitalization, punctuation, missing-field handling, DOI or URL treatment, and category choice against current APA guidance.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">7. MATCH</p><h3 className="font-serif text-xl text-slate-purple mb-2">Link text and reference</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Make sure each borrowed idea has the required in-text citation and every in-text citation leads to the correct reference entry.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">8. REVERSE-CHECK</p><h3 className="font-serif text-xl text-slate-purple mb-2">Reopen record before submission</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Recheck APA rule, original item, type, version, fields, official example, in-text match, complete reference list, and any required disclosure.</p></article>
            </div>
            <p className="text-sm font-sans text-primary font-medium mt-5">A citation generator cannot decide whether a source is credible, whether a claim accurately represents it, whether you should quote or paraphrase, or whether an assignment permits a particular use of AI or a translated source.</p>
          </section>

          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-5 mb-10">
            {[
              "Begin with information from the original work rather than search-result snippets or a copied reference list.",
              "Treat in-text citation and reference entry as a matched pair linked to the source you actually read.",
              "Use source evaluation, paraphrasing, and revision guidance alongside formatting rather than treating citation as punctuation alone.",
            ].map((item) => (
              <div key={item} className="p-6 bg-white border border-border rounded-2xl">
                <CheckCircle2 size={18} className="text-emerald-500 mb-3" />
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          <div className="max-w-5xl mx-auto grid lg:grid-cols-[1.3fr_0.9fr] gap-6 mb-10">
            <section className="p-8 bg-white border border-border rounded-2xl">
              <h2 className="font-serif text-3xl text-slate-purple mb-4">Prepare source data before you format APA 7</h2>
              <div className="space-y-4 text-sm text-muted-foreground font-sans leading-relaxed">
                <p>APA formatting depends on reliable source data. A journal article, a book chapter, a report, a webpage, and a translated or non-English source may each require different information. Start with the version and source record you actually consulted.</p>
                <p><a className="text-primary underline underline-offset-4" href="https://apastyle.apa.org/style-grammar-guidelines/citations/basic-principles/author-date" target="_blank" rel="noreferrer">APA Style&apos;s author–date guidance</a> explains the relationship between in-text citations and the reference list. Use it to check that author and date in the text point readers to a complete reference for the same work.</p>
                <p>For format walkthroughs, read the <Link href="/blog/complete-apa-7th-edition-guide-international-students" className="text-primary underline">APA guide for international students</Link>. If you cite sources with non-English titles or publication details, use the dedicated <Link href="/apa-7-non-english-sources" className="text-primary underline">APA 7 non-English sources guide</Link> rather than guessing how to translate or romanize a field.</p>
              </div>
            </section>

            <aside className="p-8 bg-hero-gradient border border-border rounded-2xl">
              <div className="inline-flex items-center gap-2 mb-4 text-xs font-sans font-semibold tracking-widest uppercase text-primary">
                <GraduationCap size={13} />
                Student workflow
              </div>
              <div className="space-y-4">
                {[
                  "Open and identify the source you actually used",
                  "Record its APA-relevant details from the original",
                  "Generate a reference and matching in-text draft",
                  "Compare the output with source, APA guidance, and course rules",
                ].map((step, index) => (
                  <div key={step} className="flex items-start gap-3">
                    <Badge variant="secondary" className="font-sans text-xs mt-0.5">{`0${index + 1}`}</Badge>
                    <p className="text-sm text-muted-foreground font-sans leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
              <Button asChild className="w-full mt-6 bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90">
                <Link
                  href="/citations"
                  onClick={() => trackEvent("cta_click", { location: "landing_apa_sidebar", target: "generate_citation" })}
                >
                  Generate APA Citation
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </aside>
          </div>

          <section className="max-w-5xl mx-auto mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: "/citations", title: "Citation Generator", desc: "Create a formatting draft only after checking the source details and required citation system." },
              { href: "/citation-examples", title: "Citation Examples", desc: "Choose APA, MLA, Chicago, or IEEE only after identifying what your course and source require." },
              { href: "/blog/complete-apa-7th-edition-guide-international-students", title: "APA 7 guide", desc: "Review common APA 7 reference and in-text citation patterns before final formatting." },
              { href: "/apa-7-non-english-sources", title: "APA 7 non-English sources", desc: "Handle original-language details, translations, and romanization with a dedicated workflow." },
              { href: "/academic-integrity-and-source-use", title: "Academic integrity and source use", desc: "Check quotation, paraphrase, summary, attribution, and course-policy responsibilities." },
              { href: "/evaluate-academic-sources", title: "Evaluate the source first", desc: "Confirm authorship, purpose, evidence, currency, and records before a clean citation gives weak material false authority." },
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

          <div className="max-w-4xl mx-auto mt-10 grid sm:grid-cols-2 gap-4">
            <Link href="/pricing" className="block">
              <div className="p-6 bg-white border border-border rounded-2xl hover:border-primary/30 hover:shadow-card transition-all">
                <h2 className="font-serif text-2xl text-slate-purple mb-2">See plan limits and pricing</h2>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                  Compare the free plan with paid usage if you need citations regularly for coursework or research writing.
                </p>
              </div>
            </Link>
            <Link href="/polish" className="block">
              <div className="p-6 bg-white border border-border rounded-2xl hover:border-primary/30 hover:shadow-card transition-all">
                <h2 className="font-serif text-2xl text-slate-purple mb-2">Polish the paragraph after citing</h2>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                  Review wording only after preserving the relationship among source, in-text citation, reference entry, and meaning.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
