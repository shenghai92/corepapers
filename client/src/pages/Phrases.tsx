import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SEOHead from "@/components/SEOHead";
import { Copy, CheckCircle2, Search, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Link } from "wouter";

type Discipline = "all" | "stem" | "social_science" | "humanities";

interface Phrase {
  id: string;
  text: string;
  function: string;
  tags: string[];
}

interface PhraseGroup {
  category: string;
  icon: string;
  phrases: Phrase[];
}

const PHRASE_DATA: Record<string, PhraseGroup[]> = {
  stem: [
    {
      category: "Introducing Research",
      icon: "Lab",
      phrases: [
        { id: "s1", text: "This study investigates the relationship between [X] and [Y].", function: "Stating research aim", tags: ["introduction", "aim"] },
        { id: "s2", text: "The primary objective of this research is to examine [X].", function: "Stating objective", tags: ["introduction", "objective"] },
        { id: "s3", text: "To date, little research has addressed [X].", function: "Identifying gap", tags: ["gap", "literature"] },
      ],
    },
    {
      category: "Describing Methods",
      icon: "Method",
      phrases: [
        { id: "s4", text: "Data were collected using [method] over a period of [time].", function: "Data collection", tags: ["method", "data"] },
        { id: "s5", text: "The experiment was conducted under controlled conditions to ensure [X].", function: "Experimental setup", tags: ["method", "control"] },
        { id: "s6", text: "Statistical analysis was performed using [software/test].", function: "Analysis method", tags: ["statistics", "analysis"] },
      ],
    },
  ],
  social_science: [
    {
      category: "Literature Review",
      icon: "Review",
      phrases: [
        { id: "ss1", text: "A substantial body of research has demonstrated that [X].", function: "Summarizing literature", tags: ["literature", "summary"] },
        { id: "ss2", text: "While [Author] argues that [X], others contend that [Y].", function: "Presenting debate", tags: ["debate", "contrast"] },
      ],
    },
    {
      category: "Discussion and Implications",
      icon: "Discuss",
      phrases: [
        { id: "ss3", text: "These findings have significant implications for [policy/practice/theory].", function: "Stating implications", tags: ["implications", "discussion"] },
        { id: "ss4", text: "Future research should explore [X] in order to [purpose].", function: "Future directions", tags: ["future", "recommendation"] },
      ],
    },
  ],
  humanities: [
    {
      category: "Textual Analysis",
      icon: "Text",
      phrases: [
        { id: "h1", text: "This passage reveals [X], which can be interpreted as [Y].", function: "Textual interpretation", tags: ["analysis", "interpretation"] },
        { id: "h2", text: "A close reading of [text] suggests that [X].", function: "Close reading", tags: ["close reading", "analysis"] },
      ],
    },
    {
      category: "Critical Engagement",
      icon: "Critique",
      phrases: [
        { id: "h3", text: "While [Scholar]'s reading of [X] is compelling, it overlooks [Y].", function: "Critical engagement", tags: ["critique", "engagement"] },
        { id: "h4", text: "This interpretation challenges the dominant reading of [X] by foregrounding [Y].", function: "Challenging interpretation", tags: ["challenge", "interpretation"] },
      ],
    },
  ],
};

const ALL_PHRASES = Object.values(PHRASE_DATA).flat();

const HEDGING_BOOSTING = {
  hedging: [
    { word: "may", usage: "It may be argued that..." },
    { word: "might", usage: "This might suggest that..." },
    { word: "could", usage: "These results could indicate..." },
    { word: "appears to", usage: "The data appears to show..." },
  ],
  boosting: [
    { word: "clearly", usage: "This clearly demonstrates that..." },
    { word: "evidently", usage: "Evidently, the results show..." },
    { word: "strongly", usage: "The evidence strongly supports [carefully specified claim]." },
    { word: "consistent with", usage: "The pattern is consistent with [carefully specified explanation]." },
  ],
};

const PHRASES_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "CorePapers Academic Phrase Library",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  url: "https://corepapers.space/phrases",
  description:
    "Academic phrase library with discipline-specific sentence templates for STEM, social sciences, and humanities.",
};

export default function Phrases() {
  const [discipline, setDiscipline] = useState<Discipline>("stem");
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("Phrase copied!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const currentGroups = discipline === "all" ? (ALL_PHRASES as PhraseGroup[]) : (PHRASE_DATA[discipline] ?? []);

  const filteredGroups = currentGroups
    .map((group) => ({
      ...group,
      phrases: group.phrases.filter(
        (p) =>
          !search ||
          p.text.toLowerCase().includes(search.toLowerCase()) ||
          p.function.toLowerCase().includes(search.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
      ),
    }))
    .filter((g) => g.phrases.length > 0);

  return (
    <>
      <SEOHead
        title="Academic Phrase Bank With Sentence Starters for Essays, Literature Reviews, and Research Papers"
        description="Search an academic phrase bank with sentence starters for essays, literature review phrases, discussion section phrases, and academic English expressions for research papers."
        keywords="academic phrase bank, sentence starters for essays, literature review phrases, discussion section phrases, academic sentence starters, academic English expressions, phrase bank for research papers"
        canonical="/phrases/"
        jsonLd={PHRASES_SCHEMA}
      />

      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-sans font-medium mb-4">
              Academic Phrase Library
            </div>
            <h1 className="font-serif font-light text-4xl sm:text-5xl text-slate-purple mb-4">
              Academic phrase bank
              <br />
              <span className="italic">with sentence starters for essays and research papers</span>
            </h1>
            <p className="text-muted-foreground font-sans max-w-xl mx-auto leading-relaxed">
              Search academic sentence starters and discipline-specific academic English expressions for essays, reports, literature reviews, discussion sections, and research papers.
            </p>
          </div>

          <section className="max-w-5xl mx-auto mb-8 p-7 bg-white border border-border rounded-2xl shadow-card">
            <p className="text-xs font-sans font-semibold tracking-widest uppercase text-primary mb-3">Choose language by function, not by decoration</p>
            <h2 className="font-serif text-3xl text-slate-purple mb-5">An eight-step check before you use a sentence starter</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">STEP 1 · TASK</p><h3 className="font-serif text-xl text-slate-purple mb-2">Name the writing job</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Decide whether you are framing a topic, comparing studies, describing a method, reporting a result, qualifying a claim, or closing a discussion.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">STEP 2 · RELATION</p><h3 className="font-serif text-xl text-slate-purple mb-2">Identify the real connection</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Ask whether the next idea adds support, contrasts, gives an example, explains a cause, marks a limit, or draws a cautious conclusion.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">STEP 3 · EVIDENCE</p><h3 className="font-serif text-xl text-slate-purple mb-2">Check source and support</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Make sure source, data, observation, or analysis allows the statement before choosing a confident or cautious phrase; keep borrowed ideas traceable.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">STEP 4 · CERTAINTY</p><h3 className="font-serif text-xl text-slate-purple mb-2">Calibrate the claim</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Use hedging when evidence is limited, context-specific, preliminary, or associative; use stronger language only when evidence and task justify it.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">STEP 5 · READER</p><h3 className="font-serif text-xl text-slate-purple mb-2">Match discipline and reader</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Choose terminology, level of formality, and section convention that suit your discipline, method, reader, and assignment rather than a generic “academic” sound.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">STEP 6 · ADAPT</p><h3 className="font-serif text-xl text-slate-purple mb-2">Rewrite for your context</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Replace every placeholder, vary syntax when needed, and make the phrase fit your own verified idea rather than copying a sentence starter unchanged.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">STEP 7 · READ BACK</p><h3 className="font-serif text-xl text-slate-purple mb-2">Test logic in context</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Read the surrounding sentences. Remove wording that repeats the obvious, over-signals structure, or points to the wrong relationship.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">STEP 8 · VERIFY</p><h3 className="font-serif text-xl text-slate-purple mb-2">Recheck attribution and policy</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Check citations for borrowed material, reopen course rules, and use only language and claims you can support and take responsibility for.</p></article>
            </div>
            <p className="text-sm font-sans text-primary font-medium mt-5">All sentence starters and mini-sentences in this library are <strong>fictional learning prompts</strong>. They are patterns to adapt with your own verified ideas, evidence, data, and citations—not text to submit unchanged.</p>
          </section>

          <div className="max-w-4xl mx-auto mb-8 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search phrases, functions, or tags..."
                className="pl-9 bg-white border-border font-sans text-sm"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {(["all", "stem", "social_science", "humanities"] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setDiscipline(d)}
                  className={`px-4 py-2 rounded-lg text-sm font-sans font-medium transition-all ${
                    discipline === d
                      ? "bg-primary text-white shadow-soft"
                      : "bg-white border border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
                  }`}
                >
                  {d === "all" ? "All" : d === "stem" ? "STEM" : d === "social_science" ? "Social Sciences" : "Humanities"}
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {filteredGroups.map((group) => (
              <div key={group.category}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm font-sans font-semibold text-primary">{group.icon}</span>
                  <h2 className="font-serif font-medium text-xl text-slate-purple">{group.category}</h2>
                  <span className="text-xs text-muted-foreground font-sans ml-1">({group.phrases.length})</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {group.phrases.map((phrase) => (
                    <div
                      key={phrase.id}
                      className="group p-4 bg-white border border-border rounded-xl hover:border-primary/30 hover:shadow-card transition-all cursor-pointer"
                      onClick={() => handleCopy(phrase.text, phrase.id)}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-sans text-foreground leading-relaxed flex-1">{phrase.text}</p>
                        <button className="flex-shrink-0 mt-0.5 text-muted-foreground group-hover:text-primary transition-colors">
                          {copiedId === phrase.id ? (
                            <CheckCircle2 size={16} className="text-emerald-500" />
                          ) : (
                            <Copy size={16} />
                          )}
                        </button>
                      </div>
                      <div className="mt-2 flex items-center gap-2 flex-wrap">
                        <span className="text-xs text-muted-foreground font-sans italic">{phrase.function}</span>
                        {phrase.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs font-sans px-1.5 py-0">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <section className="max-w-5xl mx-auto mt-10 grid lg:grid-cols-2 gap-6">
            <article className="p-7 bg-hero-gradient border border-border rounded-2xl">
              <p className="text-xs font-sans font-semibold tracking-widest uppercase text-primary mb-3">Fictional learning example</p>
              <h2 className="font-serif text-3xl text-slate-purple mb-4">Let the relationship choose the phrase</h2>
              <p className="text-sm text-muted-foreground font-sans leading-relaxed"><strong className="text-foreground">This fictional learning example is invented for practice; it is not student work, research evidence, or text to submit.</strong> A fictional writer first reports that two small studies describe similar revision patterns, then adds a third study with a different participant group and measure. “Furthermore” would wrongly imply additional support for the same point. “However, this pattern may differ when…” better signals the contrast and keeps the claim appropriately limited. The phrase follows the logic; it does not create it.</p>
            </article>
            <article className="p-7 bg-white border border-border rounded-2xl">
              <h2 className="font-serif text-3xl text-slate-purple mb-4">Use short phrases responsibly</h2>
              <p className="text-sm text-muted-foreground font-sans leading-relaxed"><a className="text-primary underline underline-offset-4" href="https://writingcenter.unc.edu/tips-and-tools/transitions/" target="_blank" rel="noreferrer">UNC Writing Center</a> explains that transitions signal particular logical relationships and cannot replace good organization. <a className="text-primary underline underline-offset-4" href="https://writingcenter.gmu.edu/writing-resources/general-writing-practices/signposting-language-for-improving-cohesion" target="_blank" rel="noreferrer">George Mason University Writing Center</a> cautions that excessive or inaccurate signposting can make prose wordy or confusing. Its <a className="text-primary underline underline-offset-4" href="https://writingcenter.gmu.edu/writing-resources/research-based-writing/hedges-softening-claims-in-academic-writing" target="_blank" rel="noreferrer">hedging guide</a> shows how cautious wording should reflect the evidence&apos;s scope rather than hide an unsupported claim.</p>
            </article>
          </section>

          <div className="max-w-4xl mx-auto mt-16">
            <div className="text-center mb-8">
              <h2 className="font-serif font-light text-3xl text-slate-purple mb-3">
                Hedging and boosting reference
              </h2>
              <p className="text-sm text-muted-foreground font-sans">
                Adjust the certainty of your academic claims with these common expressions.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-border rounded-2xl p-6">
                <h3 className="font-sans font-semibold text-foreground mb-2">Hedging language</h3>
                <p className="text-xs text-muted-foreground font-sans leading-relaxed mb-4">Use only when your evidence genuinely calls for a limited, probable, or context-bound claim.</p>
                <div className="space-y-2">
                  {HEDGING_BOOSTING.hedging.map((item) => (
                    <div
                      key={item.word}
                      className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-secondary cursor-pointer group"
                      onClick={() => handleCopy(item.usage, `h-${item.word}`)}
                    >
                      <code className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-mono font-medium w-20 text-center">
                        {item.word}
                      </code>
                      <span className="text-xs text-muted-foreground font-sans flex-1 italic">{item.usage}</span>
                      <Copy size={12} className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-border rounded-2xl p-6">
                <h3 className="font-sans font-semibold text-foreground mb-2">Boosting language</h3>
                <p className="text-xs text-muted-foreground font-sans leading-relaxed mb-4">Reserve stronger wording for claims your evidence, method, and disciplinary convention can support.</p>
                <div className="space-y-2">
                  {HEDGING_BOOSTING.boosting.map((item) => (
                    <div
                      key={item.word}
                      className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-secondary cursor-pointer group"
                      onClick={() => handleCopy(item.usage, `b-${item.word}`)}
                    >
                      <code className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded font-mono font-medium w-20 text-center">
                        {item.word}
                      </code>
                      <span className="text-xs text-muted-foreground font-sans flex-1 italic">{item.usage}</span>
                      <Copy size={12} className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-border bg-white p-6">
            <div>
              <h2 className="font-serif text-2xl text-slate-purple">Need help applying these phrases?</h2>
              <p className="text-sm text-muted-foreground font-sans mt-2">
                Use the essay polish tool to revise full paragraphs and learn how to sound more academic.
              </p>
            </div>
            <Button asChild className="bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90">
              <Link href="/polish">
                Try Essay Polish
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </div>

          <div className="max-w-4xl mx-auto mt-10">
            <p className="text-xs font-sans font-semibold tracking-widest uppercase text-muted-foreground mb-4">
              Related guides
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  href: "/phrases/introduction",
                  title: "Introduction phrases",
                  desc: "Move from context to a research gap, purpose, and focused question.",
                },
                {
                  href: "/phrases/literature-review",
                  title: "Literature Review phrases",
                  desc: "Synthesize studies by theme, compare findings, and state research limits carefully.",
                },
                {
                  href: "/phrases/methods",
                  title: "Methods section phrases",
                  desc: "Find sentence starters for research design, data collection, and analysis.",
                },
                {
                  href: "/phrases/results",
                  title: "Results section phrases",
                  desc: "Report quantitative or qualitative findings without moving into discussion too early.",
                },
                {
                  href: "/phrases/discussion",
                  title: "Discussion phrases",
                  desc: "Interpret findings, identify limits, and frame implications carefully.",
                },
                {
                  href: "/phrases/conclusion",
                  title: "Conclusion phrases",
                  desc: "Summarize the contribution and state a bounded takeaway without new evidence.",
                },
                {
                  href: "/hedging-language-academic-writing",
                  title: "Hedging language guide",
                  desc: "Calibrate certainty to the evidence instead of using cautious words as decoration.",
                },
                {
                  href: "/academic-paragraph-structure",
                  title: "Academic paragraph structure",
                  desc: "Use transitions to clarify an already coherent sequence of point, evidence, explanation, and limit.",
                },
                {
                  href: "/academic-argument-evidence",
                  title: "Argument and evidence guide",
                  desc: "Check whether the claim, source, reasoning, and cautious language work together.",
                },
                {
                  href: "/research-paper-sections",
                  title: "Research paper sections",
                  desc: "Choose phrases after identifying what each section must accomplish for the reader.",
                },
                {
                  href: "/academic-integrity-and-source-use",
                  title: "Source-use guide",
                  desc: "Keep quotations, paraphrases, summaries, and citations clear while you adapt academic language.",
                },
              ].map((item) => (
                <Link key={item.href} href={item.href} className="block">
                  <div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30 hover:shadow-card transition-all">
                    <h3 className="font-serif text-xl text-slate-purple mb-2 leading-snug">{item.title}</h3>
                    <p className="text-sm text-muted-foreground font-sans leading-relaxed">{item.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
