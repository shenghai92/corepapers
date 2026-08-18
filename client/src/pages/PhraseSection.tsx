import { useLocation, Link } from "wouter";
import { ArrowRight, CheckCircle2, Copy } from "lucide-react";
import { useState } from "react";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type SectionKey = "introduction" | "methods" | "results" | "discussion" | "literature-review";

type Phrase = {
  text: string;
  label: string;
  note: string;
};

const SECTION_CONTENT: Record<
  SectionKey,
  {
    eyebrow: string;
    title: string;
    description: string;
    canonical: string;
    keywords: string;
    intro: string;
    phrases: Phrase[];
    checks: string[];
    guideHref: string;
    guideTitle: string;
  }
> = {
  introduction: {
    eyebrow: "Academic phrase library · Introduction",
    title: "Academic phrases for research paper introductions",
    description: "Use academic introduction phrases to establish context, identify a research gap, state a purpose, and introduce a focused research question.",
    canonical: "/phrases/introduction/",
    keywords: "introduction section phrases, research paper introduction sentence starters, research gap phrases, academic introduction phrases",
    intro: "Adapt these sentence starters to introduce a focused research problem. Replace each bracketed item with accurate, cited details from your own field and assignment.",
    phrases: [
      { label: "Context", text: "[Topic] has received increasing attention because [specific reason].", note: "Use a source when the context or trend comes from published evidence." },
      { label: "What is known", text: "Previous research has shown that [specific finding] (Author, year).", note: "Cite the original, relevant source and avoid claiming more than it reports." },
      { label: "Research gap", text: "However, less is known about [specific relationship, group, setting, or mechanism].", note: "Name a real and manageable gap rather than saying nothing is known." },
      { label: "Purpose", text: "This study examines [focused topic] among/in [defined context or group].", note: "Make the scope match the evidence and methods you will actually use." },
      { label: "Research question", text: "Accordingly, this study asks: How does [X] relate to [Y] in [context]?", note: "Use a question that is answerable within the assignment length and design." },
      { label: "Road map", text: "The paper first [step], then [step], and finally [step].", note: "Use a road map only when your discipline or instructor expects one." },
    ],
    checks: ["Cite all factual claims about prior research or the research context.", "Move from broad context to a defined problem without adding unrelated background.", "State a purpose or question that your paper can genuinely answer."],
    guideHref: "/introduction-section-example-research-paper",
    guideTitle: "Read the Introduction structure and example guide",
  },
  "literature-review": {
    eyebrow: "Academic phrase library · Literature Review",
    title: "Academic phrases for literature reviews and source synthesis",
    description: "Use literature review phrases to synthesize studies by theme, compare findings, signal a cautious research gap, and maintain your own academic voice.",
    canonical: "/phrases/literature-review/",
    keywords: "literature review phrases, synthesis phrases academic writing, research gap phrases, compare studies phrases",
    intro: "Adapt these sentence starters to connect verified sources around a theme or question. Replace every bracketed item with an accurate, cited detail from your own reading and assignment.",
    phrases: [
      { label: "Shared pattern", text: "Across the reviewed studies, [theme or pattern] emerges as a recurring concern.", note: "Name the sources or citations that support the pattern; do not imply consensus from a small or unrelated set." },
      { label: "Comparison", text: "While [Author, year] emphasizes [point], [Author, year] focuses on [different point or condition].", note: "Compare a specific aspect of the studies rather than only listing their topics." },
      { label: "Qualified agreement", text: "These findings broadly align in suggesting [careful pattern], although they differ in [method, setting, sample, or outcome].", note: "Explain the meaningful difference so readers can judge how far the comparison goes." },
      { label: "Methodological distinction", text: "The differing conclusions may reflect variation in [design, measurement, population, or context].", note: "Use may when the methodological explanation is plausible but not directly tested." },
      { label: "Research limitation", text: "However, the reviewed evidence offers limited insight into [defined population, setting, mechanism, or outcome].", note: "Base this on the sources you reviewed; avoid saying no research exists without a transparent search process." },
      { label: "Next question", text: "Further research could examine [focused question] in [defined context] using [appropriate approach].", note: "Make the next step follow from the synthesis rather than from a general interest in the topic." },
    ],
    checks: ["Organize paragraphs around a theme, question, method, or debate rather than author order.", "Place citations close to the particular source-based claim they support.", "Distinguish your synthesis from the individual findings you are reporting."],
    guideHref: "/literature-review-example",
    guideTitle: "Read the thematic Literature Review example",
  },
  methods: {
    eyebrow: "Academic phrase library · Methods",
    title: "Academic phrases for research methods sections",
    description:
      "Find academic sentence starters for methodology and methods sections, including research design, data collection, participants, and analysis.",
    canonical: "/phrases/methods/",
    keywords:
      "methods section phrases, methodology section sentence starters, academic phrases for research methods, data collection phrases",
    intro:
      "Use these sentence starters to explain a research design, data collection process, sample, instrument, and analysis method in clear academic English.",
    phrases: [
      {
        label: "Research design",
        text: "This study used a [qualitative/quantitative/mixed-methods] design to examine [X].",
        note: "Name the design you actually used and connect it to the question.",
      },
      {
        label: "Methodological rationale",
        text: "The research adopted a [design] approach because it allowed the study to [purpose].",
        note: "Explain why the approach suits the study rather than presenting a method label alone.",
      },
      {
        label: "Data collection",
        text: "Data were collected from [participants/data source] between [time period].",
        note: "Add enough context for a reader to understand what was collected and when.",
      },
      {
        label: "Sampling",
        text: "Participants were recruited using [sampling method] and met the following criteria: [criteria].",
        note: "State selection criteria accurately and avoid implying representativeness you cannot support.",
      },
      {
        label: "Analysis",
        text: "The data were analysed using [thematic analysis/regression/content analysis] to identify [pattern or relationship].",
        note: "Name the procedure and the purpose of the analysis.",
      },
      {
        label: "Ethics or consent",
        text: "Informed consent was obtained from all participants before data collection began.",
        note: "Use only when it accurately describes the approval or consent process required for your study.",
      },
    ],
    checks: [
      "Replace every bracketed item with a specific detail from your own study.",
      "Use the tense and level of detail required by your discipline or instructor.",
      "Distinguish the logic of your methodology from the practical methods you used.",
    ],
    guideHref: "/blog/how-to-write-a-methodology-section-for-a-research-paper",
    guideTitle: "Read the methodology structure and example guide",
  },
  discussion: {
    eyebrow: "Academic phrase library · Discussion",
    title: "Academic phrases for discussion sections",
    description: "Use academic discussion phrases to interpret findings, compare them with prior research, explain limitations, and state cautious implications.",
    canonical: "/phrases/discussion/",
    keywords: "discussion section phrases, academic phrases for discussion, interpreting results phrases, limitations and implications phrases",
    intro: "Adapt these sentence starters after you have reported the results. Keep each interpretation proportionate to your research design, findings, and cited literature.",
    phrases: [
      { label: "Principal finding", text: "The main finding suggests that [interpretation of result].", note: "Use suggests when the evidence supports a cautious interpretation rather than proof." },
      { label: "Comparison", text: "This pattern is consistent with/contrasts with [Author, year], who found that [specific point].", note: "Compare a precise aspect of the finding and cite the relevant source." },
      { label: "Possible explanation", text: "One possible explanation is that [mechanism], although this interpretation requires further investigation.", note: "Do not present a possible explanation as an established fact." },
      { label: "Limitation", text: "This interpretation should be considered in light of [specific limitation].", note: "Name a limitation that genuinely affects scope, measurement, or inference." },
      { label: "Implication", text: "Within this context, the findings may have implications for [practice, theory, or policy].", note: "Keep the implication within the population and design studied." },
      { label: "Future research", text: "Future research could examine whether [focused next question] using [appropriate method or context].", note: "Offer a specific next step instead of a generic call for more research." },
    ],
    checks: ["Interpret principal findings instead of repeating all results.", "Do not turn a correlation or self-report pattern into a causal claim.", "Keep new data and new evidence out of the Discussion section."],
    guideHref: "/discussion-section-example-research-paper",
    guideTitle: "Read the Discussion structure and example guide",
  },
  results: {
    eyebrow: "Academic phrase library · Results",
    title: "Academic phrases for reporting research results",
    description:
      "Use academic phrases for reporting quantitative and qualitative research results, tables, findings, themes, and statistical patterns.",
    canonical: "/phrases/results/",
    keywords:
      "results section phrases, phrases for reporting research results, academic phrases for findings, quantitative results writing",
    intro:
      "Use these sentence starters to report quantitative or qualitative findings clearly before you explain what the findings mean in a discussion section.",
    phrases: [
      {
        label: "General finding",
        text: "The results showed that [X] was associated with [Y].",
        note: "Use this only when your data supports an association; do not imply causation without evidence.",
      },
      {
        label: "Table reference",
        text: "As shown in Table [X], [group] reported a higher/lower [measure] than [comparison group].",
        note: "Name the measure and comparison clearly so readers can find the evidence.",
      },
      {
        label: "Qualitative themes",
        text: "Analysis of the data identified three recurring themes: [theme 1], [theme 2], and [theme 3].",
        note: "Introduce themes here; save extended interpretation for the discussion.",
      },
      {
        label: "Statistical result",
        text: "There was a statistically significant difference between [X] and [Y] (p = [value]).",
        note: "Report the statistics and format required by your field accurately.",
      },
      {
        label: "Participant account",
        text: "Participants frequently described [theme], particularly when [condition].",
        note: "Use a quotation or a clear reference to the evidence when your discipline expects it.",
      },
      {
        label: "Null result",
        text: "The findings did not show a clear relationship between [X] and [Y].",
        note: "A null or mixed finding still belongs in the results when it directly answers the research question.",
      },
    ],
    checks: [
      "Report what the data shows before explaining why it matters.",
      "Use a reporting verb that matches the evidence and the research design.",
      "Link each table, figure, theme, or statistic to a clear sentence in the text.",
    ],
    guideHref: "/blog/how-to-write-a-results-section-research-paper-esl",
    guideTitle: "Read the results-section guide and examples",
  },
};

export default function PhraseSection() {
  const [location] = useLocation();
  const key: SectionKey = location.includes("/phrases/introduction")
    ? "introduction"
    : location.includes("/phrases/literature-review")
      ? "literature-review"
    : location.includes("/phrases/discussion")
      ? "discussion"
      : location.includes("/phrases/results")
        ? "results"
        : "methods";
  const content = SECTION_CONTENT[key];
  const [copied, setCopied] = useState<string | null>(null);

  const copyPhrase = (phrase: string) => {
    navigator.clipboard.writeText(phrase);
    setCopied(phrase);
    toast.success("Phrase copied. Adapt it to your evidence and assignment.");
    window.setTimeout(() => setCopied(null), 1800);
  };

  return (
    <>
      <SEOHead
        title={content.title}
        description={content.description}
        keywords={content.keywords}
        canonical={content.canonical}
      />
      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-sans font-medium mb-4">
              {content.eyebrow}
            </div>
            <h1 className="font-serif font-light text-4xl sm:text-5xl text-slate-purple mb-4 leading-tight">
              {content.title}
            </h1>
            <p className="text-muted-foreground font-sans leading-relaxed text-lg">
              {content.intro}
            </p>
          </div>

          <section
            className="max-w-4xl mx-auto"
            aria-label={`${key} phrase examples`}
          >
            <div className="grid md:grid-cols-2 gap-4">
              {content.phrases.map(phrase => (
                <button
                  type="button"
                  key={phrase.text}
                  onClick={() => copyPhrase(phrase.text)}
                  className="text-left p-6 bg-white border border-border rounded-2xl hover:border-primary/30 hover:shadow-card transition-all group"
                >
                  <div className="flex justify-between gap-3 items-start">
                    <span className="text-xs font-sans font-semibold uppercase tracking-wider text-primary">
                      {phrase.label}
                    </span>
                    {copied === phrase.text ? (
                      <CheckCircle2
                        size={17}
                        className="text-emerald-500 shrink-0"
                      />
                    ) : (
                      <Copy
                        size={17}
                        className="text-muted-foreground group-hover:text-primary shrink-0"
                      />
                    )}
                  </div>
                  <p className="font-sans text-sm text-foreground leading-relaxed mt-3">
                    {phrase.text}
                  </p>
                  <p className="text-xs text-muted-foreground font-sans leading-relaxed mt-3">
                    {phrase.note}
                  </p>
                </button>
              ))}
            </div>
          </section>

          <section className="max-w-4xl mx-auto mt-12 p-8 bg-white border border-border rounded-2xl">
            <h2 className="font-serif text-3xl text-slate-purple mb-4">
              Before you use a phrase
            </h2>
            <ul className="space-y-3">
              {content.checks.map(item => (
                <li
                  key={item}
                  className="text-sm text-muted-foreground font-sans leading-relaxed flex gap-2"
                >
                  <CheckCircle2
                    size={16}
                    className="text-emerald-500 mt-0.5 shrink-0"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="max-w-4xl mx-auto mt-8 grid sm:grid-cols-2 gap-4">
            <Link href={content.guideHref} className="block">
              <div className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30 transition-all">
                <h2 className="font-serif text-2xl text-slate-purple mb-2">
                  {content.guideTitle}
                </h2>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                  See the section structure, common mistakes, and fuller
                  examples before drafting.
                </p>
              </div>
            </Link>
            <Link href="/polish" className="block">
              <div className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30 transition-all">
                <h2 className="font-serif text-2xl text-slate-purple mb-2">
                  Polish a completed paragraph
                </h2>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                  Check non-native phrasing and academic tone after you have
                  written the specific evidence.
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
