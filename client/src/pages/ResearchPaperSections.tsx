import { Link } from "wouter";
import {
  ArrowRight,
  BookOpenCheck,
  FileText,
  FlaskConical,
  MessageSquareText,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";

const sections = [
  {
    title: "Introduction",
    description:
      "Move from context to a focused problem, research gap, and purpose statement.",
    href: "/introduction-section-example-research-paper",
    icon: FileText,
  },
  {
    title: "How to write Methods and Methodology",
    description:
      "Plan design, participants or sources, procedures, analysis, rationale, and limitations with a practical example and checklist.",
    href: "/methodology-section-example-research-paper",
    icon: FlaskConical,
  },
  {
    title: "How to write a Results section",
    description:
      "Report quantitative or qualitative findings in a clear order with a fictional example and checklist before moving into interpretation.",
    href: "/results-section-example-research-paper",
    icon: BookOpenCheck,
  },
  {
    title: "Discussion",
    description:
      "Explain why findings matter, connect them to previous research, and acknowledge limits carefully.",
    href: "/discussion-section-example-research-paper",
    icon: MessageSquareText,
  },
  {
    title: "Abstract",
    description:
      "Summarize the completed paper’s purpose, approach, main finding, and implication in a concise overview.",
    href: "/how-to-write-an-abstract-research-paper",
    icon: FileText,
  },
  {
    title: "Conclusion",
    description:
      "Close the paper by restating its answer, contribution, and a carefully bounded takeaway.",
    href: "/conclusion-section-example-research-paper",
    icon: MessageSquareText,
  },
];

export default function ResearchPaperSections() {
  return (
    <>
      <SEOHead
        title="How to Write Research Paper Sections: Structure Guides and Examples"
        description="Plan and write research paper sections with a flexible structure workflow, guides for introduction through conclusion, examples, phrases, and revision checks for international students."
        keywords="research paper sections, research paper structure, how to write methods section, results section examples, discussion section guide, research paper introduction"
        canonical="/research-paper-sections/"
      />
      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-sans font-medium mb-4">
              Research writing hub
            </div>
            <h1 className="font-serif font-light text-4xl sm:text-5xl text-slate-purple mb-4 leading-tight">
              How to write each section{" "}
              <span className="italic">of a research paper</span>
            </h1>
            <p className="text-muted-foreground font-sans leading-relaxed text-lg">
              Build a clearer research paper one section at a time with
              structure guides, examples, sentence patterns, and revision
              support for international students.
            </p>
          </div>

          <section
            className="max-w-5xl mx-auto grid md:grid-cols-2 gap-5"
            aria-labelledby="section-guides-title"
          >
            <h2 id="section-guides-title" className="sr-only">
              Research paper section guides
            </h2>
            {sections.map(({ title, description, href, icon: Icon }) => (
              <Link key={title} href={href} className="block group">
                <article className="h-full p-7 bg-white border border-border rounded-2xl hover:border-primary/30 hover:shadow-card transition-all">
                  <Icon size={22} className="text-primary mb-4" />
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
            <p className="text-xs font-sans uppercase tracking-widest text-primary mb-3">Start with the assignment, not a universal template</p>
            <h2 className="font-serif text-3xl text-slate-purple mb-5">Choose a structure that fits the kind of research you are doing</h2>
            <div className="grid md:grid-cols-3 gap-5">
              <article className="rounded-xl bg-muted/50 p-6"><h3 className="font-serif text-2xl text-slate-purple mb-3">Empirical report</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">A common IMRaD-style route moves from a focused introduction through methods, results, and discussion. It is useful when you report an original study, but detail, order, tables, and headings depend on the discipline or publication.</p></article>
              <article className="rounded-xl bg-muted/50 p-6"><h3 className="font-serif text-2xl text-slate-purple mb-3">Literature-based paper</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">A review or argumentative paper may group scholarship by themes, debates, perspectives, evidence, or concepts rather than presenting a separate methods-and-results sequence.</p></article>
              <article className="rounded-xl bg-muted/50 p-6"><h3 className="font-serif text-2xl text-slate-purple mb-3">Proposal or in-progress study</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">A proposal can foreground a problem, question, literature, plan, feasibility, and ethical considerations without inventing results. An in-progress report needs clear status and limitations.</p></article>
            </div>
          </section>

          <section className="max-w-5xl mx-auto mt-6 grid lg:grid-cols-2 gap-6">
            <article className="p-8 bg-hero-gradient border border-border rounded-2xl">
              <p className="text-xs font-sans uppercase tracking-widest text-primary mb-3">Fictional learning example</p>
              <h2 className="font-serif text-3xl text-slate-purple mb-3">Let the research task determine the route</h2>
              <p className="text-sm text-muted-foreground font-sans leading-relaxed"><strong className="text-foreground">This is a fictional learning example only.</strong> A student&apos;s course asks for a review of research on an invented campus policy. The student does not create a Results section because they did not collect data. Instead, they group their sources by the policy&apos;s claimed benefits, implementation concerns, and evidence limits; the discussion then explains what the comparison suggests and where the reviewed evidence remains limited. A different empirical assignment could require Methods and Results instead.</p>
            </article>
            <article className="p-8 bg-white border border-border rounded-2xl">
              <h2 className="font-serif text-3xl text-slate-purple mb-4">Build the paper through linked decisions</h2>
              <ol className="space-y-3 text-sm text-muted-foreground font-sans leading-relaxed list-decimal list-inside">
                <li>Identify the problem, reader, task, and evidence expectations.</li>
                <li>Use initial reading to refine a question, purpose, and workable structure.</li>
                <li>Give each section one reader-facing job, then use headings and transitions to show the path.</li>
                <li>Make the claim, methods or source approach, reported evidence, and interpretation agree with one another.</li>
                <li>Revise recursively: test the whole argument, then sections, paragraphs, sentences, and citations.</li>
              </ol>
            </article>
          </section>

          <section className="max-w-5xl mx-auto mt-6 p-8 bg-white border border-border rounded-2xl">
            <h2 className="font-serif text-3xl text-slate-purple mb-3">Use common structures carefully</h2>
            <p className="text-sm text-muted-foreground font-sans leading-relaxed"><a className="text-primary underline underline-offset-4" href="https://psychology.ucsd.edu/undergraduate-program/undergraduate-resources/academic-writing-resources/writing-research-papers/research-paper-structure.html" target="_blank" rel="noreferrer">UC San Diego Psychology</a> outlines a common APA experimental-report structure while noting variations for literature reviews, multiple experiments, incomplete research, and course assignments. <a className="text-primary underline underline-offset-4" href="https://writing.wisc.edu/handbook/planresearchpaper/" target="_blank" rel="noreferrer">UW–Madison Writing Center</a> treats research writing as recursive and recommends organizing the body around the points you want to make rather than allowing sources to determine the order. <a className="text-primary underline underline-offset-4" href="https://knight.as.cornell.edu/writing-resource-organizing-papers" target="_blank" rel="noreferrer">Cornell Knight Institute</a> offers organization by perspectives, evidence, points, or sections. Follow your instructor, department, publisher, and disciplinary conventions whenever they differ.</p>
          </section>

          <section className="max-w-4xl mx-auto mt-12 p-8 bg-white border border-border rounded-2xl">
            <h2 className="font-serif text-3xl text-slate-purple mb-4">
              Use each section for its own job
            </h2>
            <div className="space-y-4 text-sm text-muted-foreground font-sans leading-relaxed">
              <p>
                An introduction establishes a problem and purpose. A methods
                section explains how the study was carried out. Results report
                what the data shows. Discussion interprets what those findings
                mean.
              </p>
              <p>
                Keeping these functions separate makes your argument easier to
                follow and makes revision more focused. If a sentence explains
                why a finding matters, it usually belongs in the discussion
                rather than the results section.
              </p>
            </div>
          </section>

          <section className="max-w-5xl mx-auto mt-8 grid sm:grid-cols-3 gap-4">
            <Link href="/research-paper-outline-template" className="block">
              <div className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30 transition-all">
                <h2 className="font-serif text-2xl text-slate-purple mb-2">Plan the full paper outline</h2>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">Map your thesis, section functions, claims, and evidence before drafting each part.</p>
              </div>
            </Link>
            <Link href="/research-proposal-template" className="block">
              <div className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30 transition-all">
                <h2 className="font-serif text-2xl text-slate-purple mb-2">Plan a research proposal</h2>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">Connect a research problem, rationale, question, methods, feasibility, and references before the project begins.</p>
              </div>
            </Link>
            <Link href="/phrases/introduction" className="block">
              <div className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30 transition-all">
                <h2 className="font-serif text-2xl text-slate-purple mb-2">Find Introduction phrases</h2>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">Build context, define a research gap, and state a focused purpose.</p>
              </div>
            </Link>
            <Link href="/phrases/results" className="block">
              <div className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30 transition-all">
                <h2 className="font-serif text-2xl text-slate-purple mb-2">
                  Find Results phrases
                </h2>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                  Use reporting verbs and sentence starters for tables, themes,
                  and patterns.
                </p>
              </div>
            </Link>
            <Link href="/phrases/discussion" className="block">
              <div className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30 transition-all">
                <h2 className="font-serif text-2xl text-slate-purple mb-2">Find Discussion phrases</h2>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">Interpret results and state limitations without overstating evidence.</p>
              </div>
            </Link>
            <Link href="/polish" className="block">
              <div className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30 transition-all">
                <h2 className="font-serif text-2xl text-slate-purple mb-2">
                  Polish a section draft
                </h2>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                  Review non-native phrasing and academic tone after you have
                  drafted the idea.
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
