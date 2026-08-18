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

type PracticeKind = "introduction" | "results" | "methodology" | "discussion" | "conclusion";

const authority = {
  introduction: "https://writingcenter.unc.edu/tips-and-tools/introductions/",
  results: "https://library.sacredheart.edu/c.php?g=29803&p=185931",
  methodology: "https://libguides.usc.edu/writingguide/methodology",
  discussion: "https://explore.plos.org/author-resources/how-to-write-effective-discussions-and-conclusions",
  conclusion: "https://explore.plos.org/author-resources/how-to-write-effective-discussions-and-conclusions",
};

const data = {
  introduction: {
    canonical: "/introduction-section-example-research-paper/",
    title: "Introduction Section Example for a Research Paper: Structure and Template",
    description: "Use a fictional research-paper introduction example, a practical structure, and a checklist for moving from context to a focused research purpose.",
    keywords: "introduction section example research paper, research paper introduction template, how to write introduction research paper",
    eyebrow: "Research paper introduction practice",
    h1: "Introduction section example for a research paper",
    intro: "Use this fictional learning example to see how an Introduction can move from a defined context to a research problem, evidence-based gap, and focused purpose. It is a writing model, not real research or a substitute for your assignment brief.",
    question: "What problem does this study address, and why does that question matter?",
    checklist: [
      "I gave readers only the context they need to understand the specific problem.",
      "I used and cited relevant sources when I described what previous research has shown.",
      "I stated a focused gap, purpose, or research question rather than a broad topic.",
      "I did not report results or make claims that belong in the Discussion section.",
    ],
    sampleTitle: "Fictional introduction example",
    sample: "Students often use digital planning tools to manage coursework, yet there is limited evidence about how particular planning routines relate to assignment completion in first-year programmes. This fictional study therefore examines the association between weekly planning frequency and self-reported assignment completion among undergraduate students.",
    explanation: "The paragraph narrows from a recognisable context to a specific knowledge need and research purpose. In a real paper, any statement about previous evidence would require accurate, relevant citations.",
    next: "/research-question-examples",
    nextLabel: "Refine a research question",
  },
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
  conclusion: {
    canonical: "/conclusion-section-example-research-paper/",
    title: "Conclusion Section Example for a Research Paper: Template and Checklist",
    description: "Use a fictional conclusion section example, a research-paper conclusion template, and a checklist for summarizing contributions without repeating the abstract.",
    keywords: "conclusion section example research paper, research paper conclusion template, how to write conclusion section research paper",
    eyebrow: "Research paper conclusion practice",
    h1: "Conclusion section example for a research paper",
    intro: "Use this fictional learning example to bring a research paper to a clear close. A conclusion should restate the central answer and contribution in fresh, concise language without adding new evidence or making claims beyond the study’s limits.",
    question: "What should readers take away from the completed paper?",
    checklist: [
      "I returned to the research question or central argument in concise language.",
      "I summarized the paper’s contribution without copying the abstract sentence by sentence.",
      "I stated implications that match the scope and limits of the evidence.",
      "I removed new data, new citations, and broad claims that the paper cannot support.",
    ],
    sampleTitle: "Fictional conclusion example",
    sample: "This fictional study found an association between weekly planning frequency and self-reported assignment completion among first-year undergraduates. The pattern suggests that planning routines may be a useful focus for student-support research, but the cross-sectional self-report design cannot establish causation. Future longitudinal work could examine how routines change across a semester.",
    explanation: "The conclusion returns to the central finding, states a limited contribution, and ends with a focused next step. It does not introduce a new result or repeat every detail from the abstract.",
    next: "/how-to-write-an-abstract-research-paper",
    nextLabel: "Review the abstract guide",
  },
  discussion: {
    canonical: "/discussion-section-example-research-paper/",
    title: "Discussion Section Example for a Research Paper: Template and Checklist",
    description: "Use a fictional discussion section example, a research-paper discussion template, and a checklist for interpreting findings without overstating evidence.",
    keywords: "discussion section example research paper, discussion section template, how to write discussion section research paper",
    eyebrow: "Research paper discussion practice",
    h1: "Discussion section example for a research paper",
    intro: "Use this fictional learning example to practise explaining what a finding may mean, connecting it to relevant research, and stating limits. It is a writing model, not real research evidence or a conclusion you can submit unchanged.",
    question: "What do the findings mean in light of the research question, prior work, and study limits?",
    checklist: [
      "I began by interpreting a principal finding rather than repeating every result.",
      "I compared the finding with relevant prior research and cited those sources accurately.",
      "I explained implications cautiously and did not claim causation from correlational evidence.",
      "I acknowledged a relevant limitation and kept new evidence out of this section.",
    ],
    sampleTitle: "Fictional discussion example",
    sample: "The positive association between weekly planning and assignment completion may suggest that regular planning is useful for this group of students. However, because the fictional study used self-reported, cross-sectional data, the finding cannot show that planning caused higher completion. Future research could test this relationship with a longitudinal or experimental design.",
    explanation: "The paragraph interprets the reported pattern, limits what can be claimed from the design, and identifies a specific next research step. It does not introduce a new result or turn an association into proof.",
    next: "/academic-argument-evidence",
    nextLabel: "Build a cautious argument",
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
    next: "/methodology-vs-methods-research-paper",
    nextLabel: "Compare methodology and methods",
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
