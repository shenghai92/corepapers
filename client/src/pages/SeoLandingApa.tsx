import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle2, Quote, GraduationCap } from "lucide-react";
import { getLoginUrl } from "@/const";

const FAQ = [
  {
    q: "Who is this APA citation generator for?",
    a: "It is designed for international students and non-native English writers who need fast APA 7th edition references and in-text citations without formatting guesswork.",
  },
  {
    q: "Can I generate citations for more than journal articles?",
    a: "Yes. The citation tool supports common academic source types including books, websites, theses, conference papers, and chapters.",
  },
  {
    q: "Is there a free option?",
    a: "Yes. You can start free and use the citation tool before deciding whether you need a paid plan.",
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
        description="Generate APA 7th edition citations and in-text references for essays, reports, and research papers. Built for international students writing in English."
        keywords="APA citation generator for international students, APA 7 citation generator, APA reference generator, in-text citation generator"
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
            <h1 className="font-serif font-light text-4xl sm:text-5xl text-slate-purple mb-4">
              APA citation generator
              <span className="italic"> for international students</span>
            </h1>
            <p className="text-muted-foreground font-sans max-w-2xl mx-auto leading-relaxed mb-8">
              Build accurate APA 7th edition references and in-text citations without losing time on punctuation, capitalization, or formatting details.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90">
                <Link href="/citations">
                  Use APA Citation Tool
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

          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-5 mb-10">
            {[
              "Generate APA references for journal articles, books, websites, theses, and conference papers.",
              "Create cleaner in-text citations that fit naturally into academic paragraphs.",
              "Move from citation building to revision with the rest of the CorePapers writing workflow.",
            ].map((item) => (
              <div key={item} className="p-6 bg-white border border-border rounded-2xl">
                <CheckCircle2 size={18} className="text-emerald-500 mb-3" />
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          <div className="max-w-5xl mx-auto grid lg:grid-cols-[1.3fr_0.9fr] gap-6 mb-10">
            <section className="p-8 bg-white border border-border rounded-2xl">
              <h2 className="font-serif text-3xl text-slate-purple mb-4">Why this page converts better than a generic citation tool</h2>
              <div className="space-y-4 text-sm text-muted-foreground font-sans leading-relaxed">
                <p>
                  Many students searching for an APA citation generator are not only looking for raw formatting. They are also trying to avoid small mistakes that cost marks, especially when English is not their first language.
                </p>
                <p>
                  CorePapers is a better fit for that use case because the citation workflow sits next to essay polishing and academic phrase support. Instead of stopping at one citation, students can keep moving through the rest of the writing process.
                </p>
                <p>
                  If you want a walkthrough before using the tool, read the <Link href="/blog/complete-apa-7th-edition-guide-international-students" className="text-primary underline">APA guide for international students</Link>.
                </p>
              </div>
            </section>

            <aside className="p-8 bg-hero-gradient border border-border rounded-2xl">
              <div className="inline-flex items-center gap-2 mb-4 text-xs font-sans font-semibold tracking-widest uppercase text-primary">
                <GraduationCap size={13} />
                Student workflow
              </div>
              <div className="space-y-4">
                {[
                  "Choose the source type",
                  "Paste the source details",
                  "Copy the APA citation",
                  "Polish the paragraph where the source appears",
                ].map((step, index) => (
                  <div key={step} className="flex items-start gap-3">
                    <Badge variant="secondary" className="font-sans text-xs mt-0.5">{`0${index + 1}`}</Badge>
                    <p className="text-sm text-muted-foreground font-sans leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
              <Button asChild className="w-full mt-6 bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90">
                <Link href="/citations">
                  Generate APA Citation
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
                  Move straight from references to clearer academic sentences in the same workflow.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
