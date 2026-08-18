import { Link } from "wouter";
import { CheckCircle2, ArrowRight } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";

type Kind = "sources" | "questions" | "evidence" | "paragraphs" | "thesis";
const DATA: Record<
  Kind,
  {
    title: string;
    desc: string;
    eyebrow: string;
    h2: string;
    intro: string;
    checklist: string[];
    example: string;
    source: string;
    sourceLabel: string;
  }
> = {
  sources: {
    title: "How to evaluate academic sources: a student checklist",
    desc: "Evaluate academic sources by checking authorship, purpose, evidence, timeliness, references, and cross-checking before you cite.",
    eyebrow: "Research foundations",
    h2: "Evaluate a source before you build a paragraph around it",
    intro:
      "A credible source is not just a website with a professional design. Check who created it, why it exists, what evidence it presents, whether its details are current for your topic, and whether you can verify key claims elsewhere.",
    checklist: [
      "Can you identify the author, affiliation, and relevant expertise?",
      "What is the source trying to explain, sell, or persuade you to believe?",
      "Does it show evidence and references you can follow?",
      "Is its date appropriate for this discipline and claim?",
      "Can you cross-check important factual claims?",
    ],
    example:
      "Fictional learning example: A recent journal article with named authors, methods, references, and a scope relevant to your question may be useful evidence. A commercial blog can still help you locate terms, but it should not automatically carry the same weight.",
    source:
      "https://owl.purdue.edu/owl/research_and_citation/conducting_research/evaluating_sources_of_information/general_guidelines.html",
    sourceLabel: "Read Purdue OWL source-evaluation guidance",
  },
  questions: {
    title:
      "Research question examples: make a topic clear, focused, and arguable",
    desc: "Turn a broad academic topic into a clear, focused, complex, and arguable research question with fictional examples and a revision checklist.",
    eyebrow: "Research foundations",
    h2: "A useful question gives your research a direction",
    intro:
      "A research question is not a title or a fact you can look up quickly. It sets a focused path for finding and analysing evidence, while leaving room for an answer that needs explanation and argument.",
    checklist: [
      "Is the wording clear to a reader outside your own notes?",
      "Is the scope narrow enough for the assignment length?",
      "Does it require research and analysis rather than a yes/no answer?",
      "Could reasonable evidence lead writers to different answers?",
      "Does it fit the methods and expectations of your discipline?",
    ],
    example:
      "Fictional learning example: Instead of asking “What is social media?”, a student might ask how a defined platform’s privacy settings affect a specified group’s willingness to share personal information. The revised question names a context and invites evidence-based analysis.",
    source:
      "https://writingcenter.gmu.edu/writing-resources/research-based-writing/how-to-write-a-research-question",
    sourceLabel: "Read George Mason University Writing Center guidance",
  },
  thesis: {
    title: "Thesis statement examples: make an academic claim specific and arguable",
    desc: "Build a clearer thesis statement by turning a broad topic into a specific, arguable, evidence-led claim with a fictional learning example and checklist.",
    eyebrow: "Research foundations",
    h2: "A thesis gives readers the paper’s controlling claim",
    intro: "A thesis statement is not merely a topic announcement. It makes a claim that a paper can explain and support with evidence. Its exact form differs by discipline and assignment, so use this as a revision framework rather than a fixed formula.",
    checklist: ["Does the statement make a claim rather than only name a topic?", "Is the claim specific enough for the assignment length and available evidence?", "Could a reasonable reader ask for evidence or offer a different interpretation?", "Does the rest of the paper’s structure help demonstrate the claim?"],
    example: "Fictional learning example: A broad topic such as student planning can become an arguable claim: ‘In first-year seminar courses, regular weekly planning may support assignment completion by helping students make deadlines visible.’ The claim is scoped, cautious, and opens a path for evidence rather than presenting a universal fact.",
    source: "https://writingcenter.unc.edu/tips-and-tools/thesis-statements/",
    sourceLabel: "Read University of North Carolina Writing Center guidance",
  },
  paragraphs: {
    title: "Academic paragraph structure: topic sentence, evidence, and explanation",
    desc: "Build clearer academic paragraphs with a topic sentence, relevant evidence, explanation, and a purposeful link to the next idea.",
    eyebrow: "Research foundations",
    h2: "A paragraph should develop one controllable idea",
    intro: "Academic paragraphs help readers process an argument in meaningful units. Start with a clear controlling point, introduce relevant evidence, explain its significance, and connect the paragraph to the larger line of reasoning.",
    checklist: ["Does the opening sentence make a specific point?", "Does the evidence directly support that point?", "Have you explained why the evidence matters?", "Does the final sentence create a logical link or finish the point?"],
    example: "Fictional learning example: A paragraph may begin by stating that a privacy setting changes what users can share, then cite relevant evidence, explain the relationship, and note that the conclusion is limited to the platform and group studied.",
    source: "https://writingcenter.unc.edu/tips-and-tools/paragraphs/",
    sourceLabel: "Read University of North Carolina Writing Center guidance",
  },
  evidence: {
    title: "Academic argument and evidence: build a claim readers can follow",
    desc: "Learn a practical claim–evidence–explanation–limitation framework for academic paragraphs, with a fictional learning example and source checklist.",
    eyebrow: "Research foundations",
    h2: "Evidence needs explanation, not just a citation",
    intro:
      "Academic arguments make a claim, support it with relevant evidence, explain why that evidence matters, and acknowledge limits where they affect the conclusion. Your course or discipline may require a different structure, so treat this as a learning framework rather than a substitute for instructions.",
    checklist: [
      "Can a reader identify your paragraph’s main claim?",
      "Is the evidence specific and properly cited?",
      "Have you explained the connection rather than leaving a quotation to speak for itself?",
      "Have you avoided claiming more than the evidence can support?",
      "Have you considered a relevant limitation or counter-example?",
    ],
    example:
      "Fictional learning example: If two studies report a similar association, you may explain that they support a cautious pattern. You should not claim that they prove causation if the studies are observational or their designs do not support that conclusion.",
    source:
      "https://owl.purdue.edu/owl/general_writing/academic_writing/establishing_arguments/research_and_evidence.html",
    sourceLabel: "Read Purdue OWL guidance on research and evidence",
  },
};
export default function ResearchFoundations({ kind }: { kind: Kind }) {
  const d = DATA[kind];
  const canonical = `/${kind === "sources" ? "evaluate-academic-sources" : kind === "questions" ? "research-question-examples" : kind === "paragraphs" ? "academic-paragraph-structure" : kind === "thesis" ? "thesis-statement-examples" : "academic-argument-evidence"}/`;
  return (
    <>
      <SEOHead
        title={`${d.title} | CorePapers`}
        description={d.desc}
        keywords={
          kind === "sources"
            ? "evaluate academic sources checklist, credible sources research paper"
            : kind === "questions"
              ? "research question examples, how to write a research question"
              : kind === "paragraphs" ? "academic paragraph structure, topic sentence evidence explanation" : kind === "thesis" ? "thesis statement examples, academic thesis statement, arguable claim" : "academic argument evidence example, claim evidence explanation"
        }
        canonical={canonical}
      />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container max-w-5xl">
          <header className="text-center max-w-3xl mx-auto mb-10">
            <p className="text-primary text-xs uppercase tracking-widest font-sans mb-3">
              {d.eyebrow}
            </p>
            <h1 className="font-serif font-light text-4xl sm:text-5xl text-slate-purple mb-4">
              {d.title}
            </h1>
            <p className="text-muted-foreground font-sans leading-relaxed">
              {d.desc}
            </p>
          </header>
          <section className="p-7 bg-white border border-border rounded-2xl mb-6">
            <h2 className="font-serif text-3xl text-slate-purple mb-3">
              {d.h2}
            </h2>
            <p className="font-sans text-muted-foreground leading-relaxed">
              {d.intro}
            </p>
          </section>
          <section className="grid lg:grid-cols-2 gap-6">
            <div className="p-7 bg-hero-gradient border border-border rounded-2xl">
              <h2 className="font-serif text-2xl text-slate-purple mb-4">
                Use this self-check
              </h2>
              <ul className="space-y-3">
                {d.checklist.map(x => (
                  <li
                    key={x}
                    className="flex gap-2 text-sm font-sans text-muted-foreground"
                  >
                    <CheckCircle2
                      size={16}
                      className="text-emerald-500 shrink-0 mt-0.5"
                    />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-7 bg-white border border-border rounded-2xl">
              <p className="text-xs font-sans uppercase tracking-widest text-primary mb-3">
                Fictional learning example
              </p>
              <p className="font-sans text-sm leading-relaxed text-foreground/80">
                {d.example}
              </p>
              <a
                className="inline-flex mt-5 text-sm font-sans text-primary hover:underline"
                href={d.source}
                target="_blank"
                rel="noreferrer"
              >
                {d.sourceLabel} <ArrowRight size={15} className="ml-1" />
              </a>
            </div>
          </section>
          <section className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/literature-review-synthesis-matrix"
              className="p-5 bg-white border border-border rounded-xl"
            >
              <h2 className="font-serif text-xl text-slate-purple">
                Synthesize sources
              </h2>
              <p className="text-sm mt-2 text-muted-foreground font-sans">
                Build a matrix before drafting.
              </p>
            </Link>
            {kind === "questions" && (
              <Link
                href="/research-gap-examples"
                className="p-5 bg-white border border-border rounded-xl"
              >
                <h2 className="font-serif text-xl text-slate-purple">
                  Locate a supportable gap
                </h2>
                <p className="text-sm mt-2 text-muted-foreground font-sans">
                  Use a literature-based limit to guide the next question.
                </p>
              </Link>
            )}
            <Link
              href="/academic-integrity-and-source-use"
              className="p-5 bg-white border border-border rounded-xl"
            >
              <h2 className="font-serif text-xl text-slate-purple">
                Use sources responsibly
              </h2>
              <p className="text-sm mt-2 text-muted-foreground font-sans">
                Check attribution and paraphrasing.
              </p>
            </Link>
            <Link
              href="/citations"
              className="p-5 bg-white border border-border rounded-xl"
            >
              <h2 className="font-serif text-xl text-slate-purple">
                Check your citations
              </h2>
              <p className="text-sm mt-2 text-muted-foreground font-sans">
                Format after verifying source details.
              </p>
            </Link>
          </section>
          <div className="text-center mt-8">
            <Button asChild className="bg-cta-gradient text-white border-0">
              <Link href="/polish">
                Polish an academic paragraph{" "}
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
