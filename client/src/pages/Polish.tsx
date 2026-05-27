import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import SEOHead from "@/components/SEOHead";
import { Sparkles, Copy, RotateCcw, BookOpen, Loader2, CheckCircle2, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

const SUGGESTION_COLORS: Record<string, string> = {
  non_native_expression: "bg-red-50 border-red-200 text-red-700",
  vocabulary: "bg-amber-50 border-amber-200 text-amber-700",
  sentence_structure: "bg-blue-50 border-blue-200 text-blue-700",
  hedging: "bg-purple-50 border-purple-200 text-purple-700",
  formality: "bg-emerald-50 border-emerald-200 text-emerald-700",
};

const SUGGESTION_LABELS: Record<string, string> = {
  non_native_expression: "Non-native Expression",
  vocabulary: "Vocabulary Upgrade",
  sentence_structure: "Sentence Structure",
  hedging: "Hedging / Stance",
  formality: "Formality",
};

const SAMPLE_TEXT = `The research show that many student have difficulty in writing academic paper. In my opinion, I think the main reason is because they don't have enough vocabulary. Also, the grammar is very important for writing good essay. This study will discuss about the factors that affect student performance and give some suggestion to improve the situation.`;

export default function Polish() {
  const [text, setText] = useState("");
  const [discipline, setDiscipline] = useState<"stem" | "social_science" | "humanities" | "general">("general");
  const [nativeLanguage, setNativeLanguage] = useState("Chinese");
  const [expandedSuggestion, setExpandedSuggestion] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  const polishMutation = trpc.polish.polish.useMutation({
    onError: (err) => toast.error(err.message),
  });

  const result = polishMutation.data;
  const isLoading = polishMutation.isPending;

  const handlePolish = () => {
    if (!text.trim()) {
      toast.error("Please enter some text to polish.");
      return;
    }
    polishMutation.mutate({ text, discipline, nativeLanguage });
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard!");
  };

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const FREE_LIMIT = 300;

  return (
    <>
      <SEOHead
        title="AI Essay Polishing Tool – Fix Non-Native English Writing"
        description="Paste your academic text and our AI instantly detects Chinglish, non-native expressions, and informal language. Get academic vocabulary upgrades with explanations."
        keywords="essay polishing tool, fix Chinglish, non-native English writing, academic writing AI, ESL essay correction, academic vocabulary improvement"
        canonical="/polish"
      />

      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-sans font-medium mb-4">
              <Sparkles size={13} />
              AI-Powered Academic Polish
            </div>
            <h1 className="font-serif font-light text-4xl sm:text-5xl text-slate-purple mb-4">
              Polish Your Academic English
            </h1>
            <p className="text-muted-foreground font-sans max-w-xl mx-auto leading-relaxed">
              Paste your text below. Our AI identifies non-native expressions, upgrades your vocabulary, and explains every change — so you learn while you improve.
            </p>
          </div>

          {/* Controls */}
          <div className="max-w-4xl mx-auto mb-4 flex flex-wrap gap-3 items-center">
            <Select value={discipline} onValueChange={(v) => setDiscipline(v as typeof discipline)}>
              <SelectTrigger className="w-48 bg-white border-border font-sans text-sm">
                <BookOpen size={14} className="mr-2 text-muted-foreground" />
                <SelectValue placeholder="Discipline" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Academic</SelectItem>
                <SelectItem value="stem">STEM</SelectItem>
                <SelectItem value="social_science">Social Sciences</SelectItem>
                <SelectItem value="humanities">Humanities</SelectItem>
              </SelectContent>
            </Select>

            <Select value={nativeLanguage} onValueChange={setNativeLanguage}>
              <SelectTrigger className="w-44 bg-white border-border font-sans text-sm">
                <SelectValue placeholder="Native language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Chinese">Chinese</SelectItem>
                <SelectItem value="Spanish">Spanish</SelectItem>
                <SelectItem value="French">French</SelectItem>
                <SelectItem value="Arabic">Arabic</SelectItem>
                <SelectItem value="Japanese">Japanese</SelectItem>
                <SelectItem value="Korean">Korean</SelectItem>
                <SelectItem value="Portuguese">Portuguese</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>

            <div className="ml-auto text-xs text-muted-foreground font-sans">
              {wordCount} words
              {!isAuthenticated && wordCount > FREE_LIMIT && (
                <span className="ml-2 text-amber-600">· Free limit: {FREE_LIMIT} words</span>
              )}
            </div>
          </div>

          {/* Main Editor Area */}
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4">
            {/* Input */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-sans font-semibold tracking-widest uppercase text-muted-foreground">Your Text</span>
                <button
                  onClick={() => setText(SAMPLE_TEXT)}
                  className="text-xs text-primary hover:underline font-sans"
                >
                  Try sample text
                </button>
              </div>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your academic text here... (essays, reports, dissertations, research papers)"
                className="min-h-[320px] resize-none bg-white border-border font-sans text-sm leading-relaxed focus:ring-primary/30"
              />
              <Button
                onClick={handlePolish}
                disabled={isLoading || !text.trim()}
                className="bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90 transition-opacity w-full py-5 text-base font-sans"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="mr-2 animate-spin" />
                    Analyzing your text...
                  </>
                ) : (
                  <>
                    <Sparkles size={18} className="mr-2" />
                    Polish My Writing
                  </>
                )}
              </Button>
              {!isAuthenticated && (
                <p className="text-xs text-center text-muted-foreground font-sans">
                  <a href={getLoginUrl()} className="text-primary underline">Sign in free</a> to save sessions & unlock 1,000 words/day
                </p>
              )}
            </div>

            {/* Output */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-sans font-semibold tracking-widest uppercase text-muted-foreground">Polished Version</span>
                {result && (
                  <button
                    onClick={() => handleCopy(result.polishedText)}
                    className="flex items-center gap-1 text-xs text-primary hover:underline font-sans"
                  >
                    <Copy size={12} /> Copy
                  </button>
                )}
              </div>
              <div className="min-h-[320px] bg-white border border-border rounded-xl p-4 font-sans text-sm leading-relaxed text-foreground overflow-y-auto">
                {isLoading ? (
                  <div className="h-full flex flex-col items-center justify-center gap-3 text-muted-foreground">
                    <Loader2 size={28} className="animate-spin text-primary" />
                    <p className="text-sm">Analyzing non-native patterns...</p>
                  </div>
                ) : result ? (
                  <p className="whitespace-pre-wrap">{result.polishedText}</p>
                ) : (
                  <p className="text-muted-foreground italic">Your polished text will appear here...</p>
                )}
              </div>

              {/* Score Display */}
              {result && (
                <div className="bg-white border border-border rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-sans font-semibold tracking-widest uppercase text-muted-foreground">Academic Score</span>
                    <span className="font-serif text-2xl font-light text-primary">{result.overallScore}<span className="text-sm text-muted-foreground font-sans">/100</span></span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(result.scoreBreakdown).map(([key, val]) => (
                      <div key={key} className="flex items-center justify-between text-xs font-sans">
                        <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: `${val}%` }} />
                          </div>
                          <span className="text-foreground font-medium w-6 text-right">{val}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Suggestions Panel */}
          {result && result.suggestions.length > 0 && (
            <div className="max-w-4xl mx-auto mt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif font-medium text-xl text-slate-purple">
                  {result.suggestions.length} Improvements Found
                </h2>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(result.suggestions.map(s => s.type))).map(type => (
                    <Badge key={type} variant="secondary" className="text-xs font-sans">
                      {SUGGESTION_LABELS[type] ?? type}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                {result.suggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className={`border rounded-xl overflow-hidden transition-all ${SUGGESTION_COLORS[suggestion.type] ?? "bg-gray-50 border-gray-200"}`}
                  >
                    <button
                      className="w-full p-4 text-left flex items-start gap-3"
                      onClick={() => setExpandedSuggestion(expandedSuggestion === suggestion.id ? null : suggestion.id)}
                    >
                      <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-sans font-semibold uppercase tracking-wide">
                            {SUGGESTION_LABELS[suggestion.type] ?? suggestion.type}
                          </span>
                        </div>
                        <div className="text-sm font-sans">
                          <span className="line-through opacity-70">{suggestion.original}</span>
                          <span className="mx-2 opacity-50">→</span>
                          <span className="font-medium">{suggestion.improved}</span>
                        </div>
                      </div>
                      {expandedSuggestion === suggestion.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    {expandedSuggestion === suggestion.id && (
                      <div className="px-4 pb-4 pt-0">
                        <div className="bg-white/60 rounded-lg p-3 text-sm font-sans leading-relaxed">
                          <span className="font-semibold">Why this improves your writing: </span>
                          {suggestion.explanation}
                        </div>
                        <button
                          onClick={() => handleCopy(suggestion.improved)}
                          className="mt-2 flex items-center gap-1 text-xs hover:underline"
                        >
                          <Copy size={11} /> Copy improved phrase
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Feature callouts */}
          {!result && (
            <div className="max-w-4xl mx-auto mt-12 grid sm:grid-cols-3 gap-4">
              {[
                { icon: "🎯", title: "Detects Mother-Tongue Interference", desc: "Identifies Chinglish, Spanglish, and other non-native patterns specific to your language background." },
                { icon: "📚", title: "Academic Vocabulary Upgrade", desc: "Replaces informal or basic words with precise academic vocabulary from the Academic Word List." },
                { icon: "💡", title: "Learn From Every Change", desc: "Every suggestion includes a clear explanation so you improve your writing skills over time." },
              ].map((item) => (
                <div key={item.title} className="p-5 bg-white border border-border rounded-xl">
                  <div className="text-2xl mb-3">{item.icon}</div>
                  <h3 className="font-sans font-semibold text-sm text-foreground mb-2">{item.title}</h3>
                  <p className="text-xs text-muted-foreground font-sans leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
