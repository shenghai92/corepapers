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
    { word: "strongly", usage: "The data strongly supports..." },
    { word: "significant", usage: "A significant finding is that..." },
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
        title="Academic Phrase Bank With Sentence Starters for Essays and Research Papers"
        description="Search an academic phrase bank with sentence starters for essays, literature review phrases, discussion section phrases, and academic English expressions for research papers."
        keywords="academic phrase bank, sentence starters for essays, academic sentence starters, discussion section sentence starters, literature review phrases, academic English expressions, phrase bank for research papers"
        canonical="/phrases"
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
              <span className="italic">with sentence starters for essays</span>
            </h1>
            <p className="text-muted-foreground font-sans max-w-xl mx-auto leading-relaxed">
              Search academic sentence starters and discipline-specific academic English expressions for essays, reports, literature reviews, discussion sections, and research papers.
            </p>
          </div>

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
                <h3 className="font-sans font-semibold text-foreground mb-4">Hedging language</h3>
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
                <h3 className="font-sans font-semibold text-foreground mb-4">Boosting language</h3>
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
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  href: "/blog/how-to-write-a-literature-review-for-international-students",
                  title: "Literature review guide",
                  desc: "See how to group studies and write stronger synthesis paragraphs.",
                },
                {
                  href: "/blog/how-to-use-hedging-language-in-academic-writing",
                  title: "Hedging language guide",
                  desc: "Use phrase choices that sound more careful and credible.",
                },
                {
                  href: "/blog/how-to-write-a-discussion-section-in-an-academic-paper",
                  title: "Discussion section guide",
                  desc: "Turn phrase patterns into analytical writing that interprets findings.",
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
