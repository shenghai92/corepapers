import { ArrowRight, CheckCircle2, FileText } from "lucide-react";
import { Link, useLocation } from "wouter";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";

const ABSTRACT_MOVES = [
  ["Purpose and context", "State the specific problem or research purpose without turning the abstract into a broad introduction."],
  ["Method or approach", "Name the design, material, data, or analytical approach only as precisely as your paper supports."],
  ["Principal finding or argument", "Report the central result or claim with concrete detail rather than a vague promise to explore a topic."],
  ["Implication", "State what the result means within the limits of the paper; do not introduce new evidence or overclaim."],
] as const;

const ABSTRACT_CHECKPOINTS = [
  ["1. Identify the required abstract type", "Check the assignment, journal, conference, or department instructions for word limit, headings, tense, keywords, and whether the abstract is structured or unstructured. Do not force an IMRaD sequence onto a paper that uses a different genre."],
  ["2. Draft from the completed paper", "Mark the exact problem or claim, approach, principal result or answer, and scope-limited implication in the final draft before condensing them. An abstract should report completed work, not promise a future investigation."],
  ["3. Make the result informative", "Replace broad category language such as 'the study draws conclusions' with the specific result, relationship, theme, or central argument that readers need to evaluate relevance."],
  ["4. Keep the takeaway proportionate", "Match implications to the design, data, population, context, and uncertainty. A self-report association, for example, does not establish a general causal effect."],
  ["5. Reverse-check against the paper", "Read every abstract sentence alongside the final paper. Remove a detail, citation, claim, keyword, or recommendation that the body does not support or that exceeds the required length."],
] as const;

export default function AbstractWritingGuide() {
  const [, setLocation] = useLocation();
  return (
    <>
      <SEOHead
        title="How to Write an Abstract for a Research Paper: Example and Checklist | CorePapers"
        description="Learn how to write a research paper abstract with a fictional learning example, IMRaD structure, revision checklist, and academic phrase guidance for international students."
        keywords="how to write an abstract research paper, abstract example research paper, research abstract template, IMRaD abstract structure"
        canonical="/how-to-write-an-abstract-research-paper/"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "How to Write an Abstract for a Research Paper: Example and Checklist",
            url: "https://corepapers.space/how-to-write-an-abstract-research-paper/",
            description: "A structured guide to planning, drafting, and revising a research paper abstract.",
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://corepapers.space/" },
              { "@type": "ListItem", position: 2, name: "Research paper sections", item: "https://corepapers.space/research-paper-sections/" },
              { "@type": "ListItem", position: 3, name: "Research paper abstract", item: "https://corepapers.space/how-to-write-an-abstract-research-paper/" },
            ],
          },
        ]}
      />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container max-w-5xl">
          <header className="max-w-3xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-sans font-medium mb-4">
              <FileText size={14} /> Research paper abstract guide
            </div>
            <h1 className="font-serif font-light text-4xl sm:text-5xl text-slate-purple mb-4">
              How to write an abstract for a research paper
            </h1>
            <p className="text-muted-foreground font-sans leading-relaxed text-lg">
              Build a concise, self-contained overview of your completed paper. This guide helps international students decide what to include, what to leave out, and how to avoid promising results the paper does not show.
            </p>
          </header>

          <section className="p-7 bg-white border border-border rounded-2xl mb-6">
            <h2 className="font-serif text-3xl text-slate-purple mb-3">Draft the abstract after the paper</h2>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Although an abstract appears first, it usually works best after your full draft is stable. You can then summarize the actual purpose, approach, findings, and implications instead of describing what you intended to investigate. Follow your instructor, department, or journal requirements for word limits and structure.
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-5">
            {ABSTRACT_MOVES.map(([title, detail], index) => (
              <article key={title} className="p-6 bg-white border border-border rounded-2xl">
                <span className="text-xs font-sans font-semibold tracking-widest uppercase text-primary">Move {index + 1}</span>
                <h2 className="font-serif text-2xl text-slate-purple mt-2 mb-3">{title}</h2>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">{detail}</p>
              </article>
            ))}
          </section>

          <section className="mt-6 p-7 bg-white border border-border rounded-2xl">
            <p className="text-xs font-sans font-semibold tracking-widest uppercase text-primary mb-3">Verification workflow</p>
            <h2 className="font-serif text-3xl text-slate-purple mb-4">Build the abstract from the completed paper</h2>
            <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6">Use these checkpoints after the paper is stable. They help you make the abstract searchable and informative without turning it into an introduction, a proposal, a mini literature review, or a list of promises.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ABSTRACT_CHECKPOINTS.map(([title, detail]) => (
                <article key={title} className="p-5 rounded-xl bg-muted/50">
                  <h3 className="font-serif text-xl text-slate-purple mb-2">{title}</h3>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed">{detail}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-6 grid lg:grid-cols-[1.15fr_0.85fr] gap-6">
            <article className="p-7 bg-hero-gradient border border-border rounded-2xl">
              <p className="text-xs font-sans font-semibold tracking-widest uppercase text-primary mb-3">Fictional learning example</p>
              <h2 className="font-serif text-3xl text-slate-purple mb-4">A compact IMRaD-style abstract</h2>
              <p className="font-sans text-sm text-foreground/80 leading-relaxed">
                This fictional learning example is not real student work, research evidence, or a model to submit unchanged. This study examined the association between weekly planning routines and self-reported assignment completion among first-year undergraduates. An anonymous cross-sectional survey was completed by students recruited through an approved course channel. More frequent planning was associated with higher completion scores. Because the data were self-reported and cross-sectional, the findings cannot establish causation; however, they identify a focused question for future longitudinal research.
              </p>
              <p className="mt-4 font-sans text-sm text-muted-foreground leading-relaxed">
                The example states purpose, method, principal finding, and a cautious implication. It does not add citations, tables, or a detailed literature review.
              </p>
            </article>
            <aside className="p-7 bg-white border border-border rounded-2xl">
              <h2 className="font-serif text-2xl text-slate-purple mb-4">Final abstract check</h2>
              <ul className="space-y-3">
                {[
                  "Can the abstract stand alone for a reader who has not read the paper?",
                  "Does it report what the paper actually did and found, rather than what it planned to do?",
                  "Are method, result, and implication specific enough to be informative?",
                  "Have you removed citations, detailed background, and claims not supported by the paper?",
                  "Does it meet your required word count and section format?",
                ].map(item => (
                  <li key={item} className="flex gap-2 text-sm font-sans text-muted-foreground leading-relaxed">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />{item}
                  </li>
                ))}
              </ul>
            </aside>
          </section>

          <section className="mt-6 p-7 bg-white border border-border rounded-2xl">
            <h2 className="font-serif text-3xl text-slate-purple mb-3">Use authority guidance, then adapt to your field</h2>
            <p className="font-sans text-muted-foreground leading-relaxed">
              The <a className="text-primary hover:underline" href="https://writing.wisc.edu/handbook/assignments/writing-an-abstract-for-your-research-paper/" target="_blank" rel="noreferrer">University of Wisconsin–Madison Writing Center</a> explains that an abstract gives readers a concise account of the paper’s purpose, methods, findings, and significance. The <a className="text-primary hover:underline" href="https://writingcenter.gmu.edu/writing-resources/different-genres/writing-an-abstract" target="_blank" rel="noreferrer">George Mason University Writing Center</a> likewise advises writers to describe what the paper found rather than announce what it will examine. Use your discipline’s requirements where they differ.
            </p>
          </section>

          <section className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/introduction-section-example-research-paper" className="p-5 bg-white border border-border rounded-xl hover:border-primary/30">
              <h2 className="font-serif text-xl text-slate-purple">Plan the Introduction</h2><p className="text-sm mt-2 text-muted-foreground font-sans">Define the research problem before you summarize it.</p>
            </Link>
            <Link href="/methodology-section-example-research-paper" className="p-5 bg-white border border-border rounded-xl hover:border-primary/30">
              <h2 className="font-serif text-xl text-slate-purple">Verify the method</h2><p className="text-sm mt-2 text-muted-foreground font-sans">Name only the design, materials, and analysis the completed paper actually used.</p>
            </Link>
            <Link href="/results-section-example-research-paper" className="p-5 bg-white border border-border rounded-xl hover:border-primary/30">
              <h2 className="font-serif text-xl text-slate-purple">Check the result</h2><p className="text-sm mt-2 text-muted-foreground font-sans">Make the central finding concrete without importing extra values or a new claim.</p>
            </Link>
            <Link href="/discussion-section-example-research-paper" className="p-5 bg-white border border-border rounded-xl hover:border-primary/30">
              <h2 className="font-serif text-xl text-slate-purple">Check implications</h2><p className="text-sm mt-2 text-muted-foreground font-sans">Keep the final takeaway proportionate to the evidence.</p>
            </Link>
            <Link href="/conclusion-section-example-research-paper" className="p-5 bg-white border border-border rounded-xl hover:border-primary/30">
              <h2 className="font-serif text-xl text-slate-purple">Align the close</h2><p className="text-sm mt-2 text-muted-foreground font-sans">Keep the abstract contribution and paper conclusion consistent without copying either one.</p>
            </Link>
            <Link href="/phrases/introduction" className="p-5 bg-white border border-border rounded-xl hover:border-primary/30">
              <h2 className="font-serif text-xl text-slate-purple">Use section phrases</h2><p className="text-sm mt-2 text-muted-foreground font-sans">Adapt academic wording to your own verified details.</p>
            </Link>
            <Link href="/academic-integrity-and-source-use" className="p-5 bg-white border border-border rounded-xl hover:border-primary/30">
              <h2 className="font-serif text-xl text-slate-purple">Protect source accuracy</h2><p className="text-sm mt-2 text-muted-foreground font-sans">Do not add citations, borrowed claims, or details that the paper has not verified.</p>
            </Link>
            <Link href="/polish" className="p-5 bg-white border border-border rounded-xl hover:border-primary/30">
              <h2 className="font-serif text-xl text-slate-purple">Polish after checking</h2><p className="text-sm mt-2 text-muted-foreground font-sans">Use language support only after the content, source responsibility, and required format are settled.</p>
            </Link>
          </section>

          <div className="text-center mt-8">
            <Button onClick={() => setLocation("/polish")} className="bg-cta-gradient text-white border-0">
              Polish a completed abstract <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
