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
    title: "Methods and methodology",
    description:
      "Explain design, data collection, participants, and analysis with enough detail for readers to follow the study.",
    href: "/methodology-section-example-research-paper",
    icon: FlaskConical,
  },
  {
    title: "Results",
    description:
      "Report quantitative or qualitative findings clearly before moving into interpretation.",
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
];

export default function ResearchPaperSections() {
  return (
    <>
      <SEOHead
        title="How to Write Research Paper Sections: Guides and Examples"
        description="Learn how to write research-paper introductions, methods, results, and discussion sections with structure guides, examples, and academic phrases."
        keywords="research paper sections, how to write methods section, results section examples, discussion section guide, research paper introduction"
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
