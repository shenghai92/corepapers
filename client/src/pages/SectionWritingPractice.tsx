import { Link, useLocation } from "wouter";
import {
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  Lightbulb,
  TableProperties,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";

type PracticeKind = "results" | "methodology";

const authority = {
  results: "https://library.sacredheart.edu/c.php?g=29803&p=185931",
  methodology: "https://libguides.usc.edu/writingguide/methodology",
};

const data = {
  results: {
    canonical: "/results-section-example-research-paper/",
    title:
      "Results Section Example for a Research Paper: Template and Checklist",
    description:
      "Use a fictional results section example, a research-paper results template, and a checklist for reporting findings without turning them into discussion.",
    keywords:
      "results section example research paper, results section sample, how to write results section research paper, results section template",
    eyebrow: "Research paper results practice",
    h1: "Results section example for a research paper",
    intro:
      "Use this fictional learning example to see how a Results section can report findings in a logical order. It is a writing model, not real research data, and it should never replace your own analysis or course requirements.",
    question: "What did the study find?",
    checklist: [
      "I organised findings around a research question, hypothesis, or clearly named theme.",
      "I reported only information that helps answer the research question.",
      "I used past tense and referred to every table or figure in numerical order.",
      "I removed explanations of why a result occurred; those belong in the Discussion section.",
    ],
    sampleTitle: "Fictional quantitative example",
    sample:
      "To examine whether weekly planning was associated with assignment completion, a linear regression was conducted. Planning frequency was positively associated with completion score, b = 0.31, p = .02. As shown in Table 1, participants who reported planning at least four days per week had a higher mean completion score than participants who reported planning one day or fewer.",
    explanation:
      "This paragraph names the analysis, reports the association, and directs the reader to the table. It does not claim why planning helped or recommend an intervention.",
    next: "/phrases/results",
    nextLabel: "Open Results phrases",
  },
  methodology: {
    canonical: "/methodology-section-example-research-paper/",
    title:
      "Methodology Section Example for a Research Paper: Template and Planner",
    description:
      "Use a methodology section example, a research-paper methods template, and a practical planner for design, participants, data collection, analysis, and limitations.",
    keywords:
      "methodology section example research paper, sample methodology section, methodology section template, how to write methodology section",
    eyebrow: "Research methodology planner",
    h1: "Methodology section example for a research paper",
    intro:
      "Use this fictional learning example to plan how you will describe your own research design. Replace every bracketed placeholder with verified details from your study and follow any method, ethics, or format requirements from your instructor.",
    question:
      "How was information collected or generated, and how was it analysed?",
    checklist: [
      "I stated the research design and explained why it fits the research question.",
      "I described the participants, data, setting, or sources and how they were selected.",
      "I explained collection procedures and the steps used to analyse the information.",
      "I identified relevant limitations and separated what I did from the interpretation of results.",
    ],
    sampleTitle: "Fictional methodology example",
    sample:
      "This study used a cross-sectional survey design to examine the association between weekly planning and assignment completion among undergraduate students. Participants were recruited through [approved course channel] and completed an anonymous online questionnaire. Responses were screened using the predefined inclusion criteria. Descriptive statistics and linear regression were used to examine the relationship between planning frequency and completion score.",
    explanation:
      "This paragraph gives a reader enough information to understand the design, sample route, procedure, and analysis. It does not report findings or argue that planning is effective.",
    next: "/phrases/methods",
    nextLabel: "Open Methods phrases",
  },
} satisfies Record<PracticeKind, Record<string, string | string[]>>;

export default function SectionWritingPractice({
  kind,
}: {
  kind: PracticeKind;
}) {
  const item = data[kind];
  const [, setLocation] = useLocation();
  const isResults = kind === "results";

  return (
    <>
      <SEOHead
        title={item.title as string}
        description={item.description as string}
        keywords={item.keywords as string}
        canonical={item.canonical as string}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: item.title,
            url: `https://corepapers.space${item.canonical}`,
            description: item.description,
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://corepapers.space/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Research paper sections",
                item: "https://corepapers.space/research-paper-sections/",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: item.h1,
                item: `https://corepapers.space${item.canonical}`,
              },
            ],
          },
        ]}
      />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container">
          <header className="max-w-4xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-sans font-medium mb-4">
              <FileCheck2 size={14} />
              {item.eyebrow as string}
            </div>
            <h1 className="font-serif font-light text-4xl sm:text-5xl text-slate-purple mb-4">
              {item.h1 as string}
            </h1>
            <p className="text-muted-foreground font-sans max-w-2xl mx-auto leading-relaxed">
              {item.intro as string}
            </p>
          </header>
          <section className="max-w-5xl mx-auto grid lg:grid-cols-[1.15fr_0.85fr] gap-6">
            <article className="p-7 bg-white border border-border rounded-2xl">
              <p className="text-xs font-sans font-semibold tracking-widest uppercase text-primary mb-3">
                Guiding question
              </p>
              <h2 className="font-serif text-3xl text-slate-purple mb-4">
                {item.question as string}
              </h2>
              <div className="rounded-xl bg-muted/50 p-5">
                <p className="text-xs font-sans font-semibold tracking-widest uppercase text-muted-foreground mb-3">
                  {item.sampleTitle as string}
                </p>
                <p className="text-sm text-foreground/80 leading-relaxed font-sans">
                  {item.sample as string}
                </p>
              </div>
              <p className="mt-5 text-sm text-muted-foreground leading-relaxed font-sans">
                <strong className="text-foreground">Why this works:</strong>{" "}
                {item.explanation as string}
              </p>
            </article>
            <aside className="p-7 bg-hero-gradient border border-border rounded-2xl">
              <div className="flex gap-2 text-primary mb-4">
                <Lightbulb size={18} />
                <span className="text-xs font-sans font-semibold tracking-widest uppercase">
                  Before you submit
                </span>
              </div>
              <h2 className="font-serif text-2xl text-slate-purple mb-4">
                Section self-check
              </h2>
              <ul className="space-y-3">
                {(item.checklist as string[]).map(line => (
                  <li
                    key={line}
                    className="flex gap-2 text-sm text-muted-foreground font-sans leading-relaxed"
                  >
                    <CheckCircle2
                      size={16}
                      className="text-emerald-500 shrink-0 mt-0.5"
                    />
                    {line}
                  </li>
                ))}
              </ul>
            </aside>
          </section>
          <section className="max-w-5xl mx-auto mt-7 grid sm:grid-cols-3 gap-4">
            <Link href={item.next as string} className="block">
              <div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30">
                <TableProperties size={18} className="text-primary mb-3" />
                <h2 className="font-serif text-xl text-slate-purple mb-2">
                  {item.nextLabel as string}
                </h2>
                <p className="text-sm text-muted-foreground font-sans">
                  Use sentence patterns after you have checked the structure.
                </p>
              </div>
            </Link>
            <Link href="/research-paper-templates" className="block">
              <div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30">
                <h2 className="font-serif text-xl text-slate-purple mb-2">
                  Use the section planner
                </h2>
                <p className="text-sm text-muted-foreground font-sans">
                  Turn the checklist into a draft plan with your own verified
                  details.
                </p>
              </div>
            </Link>
            <a
              href={authority[kind]}
              target="_blank"
              rel="noreferrer"
              className="block"
            >
              <div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30">
                <h2 className="font-serif text-xl text-slate-purple mb-2">
                  Read university guidance
                </h2>
                <p className="text-sm text-muted-foreground font-sans">
                  Compare with detailed university writing guidance for your
                  discipline.
                </p>
              </div>
            </a>
          </section>
          <div className="max-w-5xl mx-auto mt-8 text-center">
            <Button
              onClick={() => setLocation("/polish")}
              className="bg-cta-gradient text-white border-0"
            >
              Revise your own draft <ArrowRight size={16} className="ml-2" />
            </Button>
            <p className="mt-3 text-xs text-muted-foreground font-sans">
              CorePapers supports revision. You remain responsible for your
              research design, evidence, citations, and course requirements.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
