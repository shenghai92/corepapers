import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SEOHead from "@/components/SEOHead";
import { Copy, CheckCircle2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

type Discipline = "all" | "stem" | "social_science" | "humanities";
type Category = string;

interface Phrase {
  id: string;
  text: string;
  function: string;
  example?: string;
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
      icon: "🔬",
      phrases: [
        { id: "s1", text: "This study investigates the relationship between [X] and [Y].", function: "Stating research aim", tags: ["introduction", "aim"] },
        { id: "s2", text: "The primary objective of this research is to examine [X].", function: "Stating objective", tags: ["introduction", "objective"] },
        { id: "s3", text: "To date, little research has addressed [X].", function: "Identifying gap", tags: ["gap", "literature"] },
        { id: "s4", text: "This paper presents a novel approach to [X] by [method].", function: "Presenting novelty", tags: ["novelty", "method"] },
      ],
    },
    {
      category: "Describing Methods",
      icon: "⚙️",
      phrases: [
        { id: "s5", text: "Data were collected using [method] over a period of [time].", function: "Data collection", tags: ["method", "data"] },
        { id: "s6", text: "The experiment was conducted under controlled conditions to ensure [X].", function: "Experimental setup", tags: ["method", "control"] },
        { id: "s7", text: "Statistical analysis was performed using [software/test].", function: "Analysis method", tags: ["statistics", "analysis"] },
        { id: "s8", text: "Samples were prepared according to the protocol described by [Author, Year].", function: "Protocol reference", tags: ["method", "protocol"] },
      ],
    },
    {
      category: "Presenting Results",
      icon: "📊",
      phrases: [
        { id: "s9", text: "The results indicate that [X] significantly affects [Y] (p < 0.05).", function: "Reporting significance", tags: ["results", "statistics"] },
        { id: "s10", text: "As shown in Figure [X], there is a positive correlation between [A] and [B].", function: "Referring to figure", tags: ["results", "figure"] },
        { id: "s11", text: "The data suggest that [X], which is consistent with [Author's] findings.", function: "Comparing results", tags: ["results", "comparison"] },
        { id: "s12", text: "Notably, [X] was observed in [Y]% of cases.", function: "Highlighting finding", tags: ["results", "highlight"] },
      ],
    },
    {
      category: "Hedging (Caution)",
      icon: "🛡️",
      phrases: [
        { id: "s13", text: "These findings suggest that [X], although further research is needed to confirm this.", function: "Hedging conclusion", tags: ["hedging", "conclusion"] },
        { id: "s14", text: "It is possible that [X] may be attributed to [Y].", function: "Cautious explanation", tags: ["hedging", "explanation"] },
        { id: "s15", text: "The results appear to indicate [X], though this interpretation should be treated with caution.", function: "Cautious interpretation", tags: ["hedging", "interpretation"] },
        { id: "s16", text: "This could potentially be explained by [X].", function: "Tentative explanation", tags: ["hedging", "explanation"] },
      ],
    },
  ],
  social_science: [
    {
      category: "Literature Review",
      icon: "📖",
      phrases: [
        { id: "ss1", text: "A substantial body of research has demonstrated that [X].", function: "Summarizing literature", tags: ["literature", "summary"] },
        { id: "ss2", text: "Scholars have increasingly recognized the importance of [X] in [context].", function: "Establishing importance", tags: ["literature", "importance"] },
        { id: "ss3", text: "While [Author] argues that [X], others contend that [Y].", function: "Presenting debate", tags: ["debate", "contrast"] },
        { id: "ss4", text: "The concept of [X] was first introduced by [Author] ([Year]) to describe [Y].", function: "Introducing concept", tags: ["concept", "definition"] },
      ],
    },
    {
      category: "Argumentation",
      icon: "💬",
      phrases: [
        { id: "ss5", text: "This analysis argues that [X] plays a critical role in [Y].", function: "Stating argument", tags: ["argument", "claim"] },
        { id: "ss6", text: "The evidence strongly suggests that [X] is a key determinant of [Y].", function: "Evidence-based claim", tags: ["evidence", "claim"] },
        { id: "ss7", text: "It is worth noting that [X], which challenges the conventional assumption that [Y].", function: "Challenging assumption", tags: ["critique", "challenge"] },
        { id: "ss8", text: "This perspective is supported by [Author]'s ([Year]) finding that [X].", function: "Supporting with evidence", tags: ["evidence", "support"] },
      ],
    },
    {
      category: "Discussion & Implications",
      icon: "🔍",
      phrases: [
        { id: "ss9", text: "These findings have significant implications for [policy/practice/theory].", function: "Stating implications", tags: ["implications", "discussion"] },
        { id: "ss10", text: "This study contributes to the growing body of literature on [X] by [contribution].", function: "Stating contribution", tags: ["contribution", "significance"] },
        { id: "ss11", text: "The limitations of this study include [X], which may affect the generalizability of the findings.", function: "Acknowledging limitations", tags: ["limitations", "reflexivity"] },
        { id: "ss12", text: "Future research should explore [X] in order to [purpose].", function: "Future directions", tags: ["future", "recommendation"] },
      ],
    },
  ],
  humanities: [
    {
      category: "Textual Analysis",
      icon: "✍️",
      phrases: [
        { id: "h1", text: "This passage reveals [X], which can be interpreted as [Y].", function: "Textual interpretation", tags: ["analysis", "interpretation"] },
        { id: "h2", text: "The author employs [literary device] to convey [theme/idea].", function: "Identifying technique", tags: ["technique", "analysis"] },
        { id: "h3", text: "A close reading of [text] suggests that [X].", function: "Close reading", tags: ["close reading", "analysis"] },
        { id: "h4", text: "This can be understood in the context of [historical/cultural framework].", function: "Contextualizing", tags: ["context", "framework"] },
      ],
    },
    {
      category: "Critical Engagement",
      icon: "🎭",
      phrases: [
        { id: "h5", text: "Drawing on [theoretical framework], this essay argues that [X].", function: "Theoretical framing", tags: ["theory", "argument"] },
        { id: "h6", text: "While [Scholar]'s reading of [X] is compelling, it overlooks [Y].", function: "Critical engagement", tags: ["critique", "engagement"] },
        { id: "h7", text: "This interpretation challenges the dominant reading of [X] by foregrounding [Y].", function: "Challenging interpretation", tags: ["challenge", "interpretation"] },
        { id: "h8", text: "The tension between [X] and [Y] is central to understanding [work/period].", function: "Identifying tension", tags: ["tension", "analysis"] },
      ],
    },
  ],
};

// Flatten all phrases for "all" view
const ALL_PHRASES = Object.values(PHRASE_DATA).flat();

const HEDGING_BOOSTING = {
  hedging: [
    { word: "may", usage: "It may be argued that..." },
    { word: "might", usage: "This might suggest that..." },
    { word: "could", usage: "These results could indicate..." },
    { word: "appears to", usage: "The data appears to show..." },
    { word: "suggests", usage: "The evidence suggests that..." },
    { word: "indicates", usage: "This indicates a possible link..." },
    { word: "seems", usage: "It seems likely that..." },
    { word: "arguably", usage: "Arguably, this demonstrates..." },
  ],
  boosting: [
    { word: "clearly", usage: "This clearly demonstrates that..." },
    { word: "evidently", usage: "Evidently, the results show..." },
    { word: "undoubtedly", usage: "Undoubtedly, [X] plays a key role..." },
    { word: "certainly", usage: "It is certainly the case that..." },
    { word: "strongly", usage: "The data strongly supports..." },
    { word: "crucial", usage: "It is crucial to note that..." },
    { word: "significant", usage: "A significant finding is that..." },
    { word: "demonstrates", usage: "This study demonstrates that..." },
  ],
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

  const currentGroups = discipline === "all" ? ALL_PHRASES : (PHRASE_DATA[discipline] ?? []);

  const filteredGroups = (discipline === "all" ? currentGroups as PhraseGroup[] : currentGroups as PhraseGroup[]).map((group) => ({
    ...group,
    phrases: group.phrases.filter(
      (p) =>
        !search ||
        p.text.toLowerCase().includes(search.toLowerCase()) ||
        p.function.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    ),
  })).filter((g) => g.phrases.length > 0);

  return (
    <>
      <SEOHead
        title="Academic Phrase Library – Sentence Templates for ESL Students"
        description="Browse 200+ academic sentence templates organized by discipline (STEM, Social Sciences, Humanities). Master hedging, boosting, and academic stance. One-click copy."
        keywords="academic phrase library, sentence templates ESL, hedging expressions academic writing, academic English phrases, STEM writing templates, social science writing phrases"
        canonical="/phrases"
      />

      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-sans font-medium mb-4">
              📚 Academic Phrase Library
            </div>
            <h1 className="font-serif font-light text-4xl sm:text-5xl text-slate-purple mb-4">
              Write Like an Academic
              <br />
              <span className="italic">Native Speaker</span>
            </h1>
            <p className="text-muted-foreground font-sans max-w-xl mx-auto leading-relaxed">
              Discipline-specific sentence templates used by native academic writers. Click any phrase to copy it instantly.
            </p>
          </div>

          {/* Filters */}
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

          {/* Phrase Groups */}
          <div className="max-w-4xl mx-auto space-y-8">
            {filteredGroups.map((group) => (
              <div key={group.category}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">{group.icon}</span>
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

          {/* Hedging & Boosting Reference */}
          <div className="max-w-4xl mx-auto mt-16">
            <div className="text-center mb-8">
              <h2 className="font-serif font-light text-3xl text-slate-purple mb-3">
                Hedging & Boosting Reference
              </h2>
              <p className="text-sm text-muted-foreground font-sans">
                Control the certainty level of your academic claims with these essential words.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Hedging */}
              <div className="bg-white border border-border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <span className="text-sm">🛡️</span>
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-foreground">Hedging Language</h3>
                    <p className="text-xs text-muted-foreground">Express caution & uncertainty</p>
                  </div>
                </div>
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

              {/* Boosting */}
              <div className="bg-white border border-border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                    <span className="text-sm">⚡</span>
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-foreground">Boosting Language</h3>
                    <p className="text-xs text-muted-foreground">Express confidence & emphasis</p>
                  </div>
                </div>
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
        </div>
      </main>
    </>
  );
}
