import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import SEOHead from "@/components/SEOHead";
import { Sparkles, Copy, BookOpen, Loader2, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Link } from "wouter";

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

const SAMPLE_TEXT = `The research show that many student have difficulty in writing academic paper. In my opinion, I think the main reason is because they don't have enough vocabulary. Also, the grammar is very important for writing good essay. This study will discuss about the factors that affect student performance and give some suggestion to improve the situation.`; // Fictional learning sample only; do not submit unchanged.

const POLISH_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "CorePapers Essay Polish",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  url: "https://corepapers.space/polish",
  description:
    "AI essay polishing tool for international students and non-native English writers.",
  featureList: [
    "Non-native expression detection",
    "Academic vocabulary upgrades",
    "Sentence-level explanations",
    "Discipline-aware writing suggestions",
  ],
};

function getPolishErrorMessage(message: string) {
  if (
    message.includes("AI API key is not configured") ||
    message.includes("CUSTOM_AI_BASE_URL is not configured")
  ) {
    return "The essay polishing service is temporarily unavailable. Please try again later.";
  }

  return message;
}

export default function Polish() {
  const [text, setText] = useState("");
  const [discipline, setDiscipline] = useState<"stem" | "social_science" | "humanities" | "general">("general");
  const [nativeLanguage, setNativeLanguage] = useState("Chinese");
  const [expandedSuggestion, setExpandedSuggestion] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  const polishMutation = trpc.polish.polish.useMutation({
    onError: (err) => toast.error(getPolishErrorMessage(err.message)),
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
        title="AI Essay Polisher for ESL and Non-Native English Writing"
        description="Use an AI essay polisher to fix non-native expressions, improve academic tone, and revise essays, reports, and research papers with clearer academic English for ESL and international students."
        keywords="AI essay polisher, essay polisher for ESL students, academic writing for non-native English speakers, essay revision for international students, Chinglish correction tool, academic writing AI tool, improve academic tone"
        canonical="/polish"
        jsonLd={POLISH_SCHEMA}
      />

      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-sans font-medium mb-4">
              <Sparkles size={13} />
              AI-Powered Academic Polish
            </div>
            <h1 className="font-serif font-light text-4xl sm:text-5xl text-slate-purple mb-4">
              AI essay polisher for clearer academic English
            </h1>
            <p className="text-muted-foreground font-sans max-w-xl mx-auto leading-relaxed">
              Paste your essay, report, or research paragraph below. CorePapers highlights wording, sentence, stance, and formality choices for you to review, then explains each suggestion so you can keep control of your meaning and learn from the draft.
            </p>
          </div>

          <section className="max-w-5xl mx-auto mb-8 p-7 bg-white border border-border rounded-2xl shadow-card">
            <p className="text-xs font-sans font-semibold tracking-widest uppercase text-primary mb-3">Revise in layers; review every suggestion</p>
            <h2 className="font-serif text-3xl text-slate-purple mb-5">An eight-step workflow for AI-assisted academic polishing</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">1. POLICY</p><h3 className="font-serif text-xl text-slate-purple mb-2">Check what is permitted</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Read the assignment, syllabus, and programme rules before entering a draft. AI permissions and disclosure expectations can differ by class and instructor.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">2. PRIVACY</p><h3 className="font-serif text-xl text-slate-purple mb-2">Decide what you can share</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Do not enter confidential, unpublished, sensitive, or restricted material unless the tool&apos;s data terms and institutional rules clearly permit it.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">3. PURPOSE</p><h3 className="font-serif text-xl text-slate-purple mb-2">Set one revision goal</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Name the highest-priority problem: a focused thesis, evidence, paragraph flow, clarity, disciplinary tone, grammar, or formatting. Do not treat every revision as a word swap.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">4. GLOBAL</p><h3 className="font-serif text-xl text-slate-purple mb-2">Fix the argument first</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Before polishing sentences, check whether the main point, purpose, evidence, organization, and paragraph sequence give readers a defensible path through the draft.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">5. REVIEW</p><h3 className="font-serif text-xl text-slate-purple mb-2">Inspect every suggestion</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Keep, reject, or rewrite a proposed change only after comparing it with your original sentence, intended meaning, discipline, reader, and own voice.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">6. VERIFY</p><h3 className="font-serif text-xl text-slate-purple mb-2">Protect facts and sources</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Confirm that revisions have not changed a result, overclaimed a conclusion, removed a qualification, invented a detail, or weakened the link between borrowed material and its citation.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">7. EDIT</p><h3 className="font-serif text-xl text-slate-purple mb-2">Finish at sentence level</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Then check clarity, word choice, formality, grammar, punctuation, spelling, and required formatting. Read the changed passage aloud and in its paragraph.</p></article>
              <article className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">8. REVERSE-CHECK</p><h3 className="font-serif text-xl text-slate-purple mb-2">Read as your next reader</h3><p className="text-sm text-muted-foreground font-sans leading-relaxed">Recheck policy, privacy, thesis, evidence, source links, factual accuracy, voice, required disclosure, and final submission responsibility.</p></article>
            </div>
            <p className="text-sm font-sans text-primary font-medium mt-5">CorePapers offers review prompts, not final academic judgments. You remain responsible for the ideas, evidence, factual accuracy, source use, citations, privacy choices, and policy compliance in anything you submit.</p>
          </section>

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
                <SelectValue placeholder="My native language" />
              </SelectTrigger>
              <SelectContent>
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
                <span className="ml-2 text-amber-600">Free limit: {FREE_LIMIT} words</span>
              )}
            </div>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-sans font-semibold tracking-widest uppercase text-muted-foreground">Your Text</span>
                <button
                  onClick={() => setText(SAMPLE_TEXT)}
                  className="text-xs text-primary hover:underline font-sans"
                >
                  Try fictional learning sample
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
              <p className="text-xs text-center text-muted-foreground font-sans">
                Free usage includes up to 300 words per polish, 1,000 AI polish words per day, and 5 polish runs per day.
              </p>
              <p className="text-xs text-center text-muted-foreground font-sans leading-relaxed">
                The fictional learning sample is only for practice. Review every suggestion against your intended meaning, evidence, citations, privacy choices, and course policy before using it in a draft. Do not paste confidential, unpublished, or sensitive material unless you are comfortable with the tool&apos;s data handling terms and institutional policy.
              </p>
              {!isAuthenticated && (
                <p className="text-xs text-center text-muted-foreground font-sans">
                  <a href={getLoginUrl()} className="text-primary underline">Sign in free</a> to save sessions and keep your revisions in one place.
                </p>
              )}
            </div>

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

              {result && (
                <div className="bg-white border border-border rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-sans font-semibold tracking-widest uppercase text-muted-foreground">Academic Score</span>
                    <span className="font-serif text-2xl font-light text-primary">{result.overallScore}<span className="text-sm text-muted-foreground font-sans">/100</span></span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(result.scoreBreakdown).map(([key, val]) => (
                      <div key={key} className="flex items-center justify-between text-xs font-sans">
                        <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
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

          {result && (
            <section className="max-w-4xl mx-auto mt-8 p-6 bg-hero-gradient border border-border rounded-2xl">
              <h2 className="font-serif text-3xl text-slate-purple mb-4">Before you use a revised sentence</h2>
              <div className="grid sm:grid-cols-2 gap-4 text-sm text-muted-foreground font-sans leading-relaxed">
                <p><strong className="text-foreground">Compare meaning:</strong> Does the change preserve what you actually found, argue, observe, or mean? Reject a smoother sentence if it alters scope, certainty, causation, or your disciplinary terminology.</p>
                <p><strong className="text-foreground">Compare source use:</strong> Keep quotations, paraphrases, summaries, numbers, and images tied to accurate citations. A language suggestion cannot verify a source or make an unsupported statement acceptable.</p>
              </div>
              <p className="text-sm text-muted-foreground font-sans leading-relaxed mt-4"><a className="text-primary underline underline-offset-4" href="https://owl.purdue.edu/owl/general_writing/the_writing_process/proofreading/steps_for_revising.html" target="_blank" rel="noreferrer">Purdue OWL</a> places main point, reader, purpose, evidence, relevance, clarity, and grammar in a revision sequence. <a className="text-primary underline underline-offset-4" href="https://writingcenter.unc.edu/tips-and-tools/generative-ai-in-academic-writing/" target="_blank" rel="noreferrer">UNC Writing Center</a> advises writers to follow course policies, compare original and AI-edited text, and remain responsible for submitted work.</p>
            </section>
          )}

          {result && result.suggestions.length > 0 && (
            <div className="max-w-4xl mx-auto mt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif font-medium text-xl text-slate-purple">
                  {result.suggestions.length} Improvements Found
                </h2>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(result.suggestions.map((s) => s.type))).map((type) => (
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
                          <span className="mx-2 opacity-50">-&gt;</span>
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

          {!result && (
            <>
              <div className="max-w-4xl mx-auto mt-12 grid sm:grid-cols-3 gap-4">
                {[
                  { icon: "01", title: "Review Language-Influenced Phrasing", desc: "Highlights wording or sentence patterns that may be unclear, literal, or less suitable for the academic context you choose." },
                  { icon: "02", title: "Consider More Precise Wording", desc: "Offers revision options for you to compare with your intended meaning, evidence, discipline, and assignment requirements." },
                  { icon: "03", title: "Learn From Every Change", desc: "Every suggestion includes an explanation so you can decide whether to accept, adapt, or reject it and build your own revision habits." },
                ].map((item) => (
                  <div key={item.title} className="p-5 bg-white border border-border rounded-xl">
                    <div className="text-sm font-sans font-semibold text-primary mb-3">{item.icon}</div>
                    <h3 className="font-sans font-semibold text-sm text-foreground mb-2">{item.title}</h3>
                    <p className="text-xs text-muted-foreground font-sans leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="max-w-4xl mx-auto mt-10 grid sm:grid-cols-3 gap-4">
                <Link href="/phrases" className="block">
                  <div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30 hover:shadow-card transition-all">
                    <h2 className="font-serif text-2xl text-slate-purple mb-2">Need better academic phrases?</h2>
                    <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                      Browse discipline-specific sentence templates for introductions, methods, discussion, and hedging.
                    </p>
                  </div>
                </Link>
                <Link href="/citations" className="block">
                  <div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30 hover:shadow-card transition-all">
                    <h2 className="font-serif text-2xl text-slate-purple mb-2">Need citations too?</h2>
                    <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                      Generate APA, MLA, Chicago, and IEEE references after checking the original source details.
                    </p>
                  </div>
                </Link>
                <Link href="/academic-paragraph-structure" className="block">
                  <div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30 hover:shadow-card transition-all">
                    <h2 className="font-serif text-2xl text-slate-purple mb-2">Check paragraph logic first</h2>
                    <p className="text-sm text-muted-foreground font-sans leading-relaxed">Make sure clearer sentences still support a focused point, relevant evidence, explanation, and a purposeful transition.</p>
                  </div>
                </Link>
                <Link href="/academic-argument-evidence" className="block">
                  <div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30 hover:shadow-card transition-all">
                    <h2 className="font-serif text-2xl text-slate-purple mb-2">Review argument and evidence</h2>
                    <p className="text-sm text-muted-foreground font-sans leading-relaxed">Check the claim, evidence, reasoning, limitation, and language choices before you polish the surface.</p>
                  </div>
                </Link>
              </div>

              <div className="max-w-4xl mx-auto mt-10">
                <p className="text-xs font-sans font-semibold tracking-widest uppercase text-muted-foreground mb-4">
                  Related guides
                </p>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    {
                      href: "/blog/abstract-vs-introduction-difference",
                      title: "Abstract vs introduction",
                      desc: "Learn what each section should do in a research paper.",
                    },
                    {
                      href: "/blog/how-to-avoid-common-esl-writing-mistakes",
                      title: "Common ESL writing mistakes",
                      desc: "Learn which sentence patterns professors notice most often.",
                    },
                    {
                      href: "/how-to-paraphrase-without-plagiarizing",
                      title: "Paraphrasing without plagiarism",
                      desc: "Revise source-based writing after checking the original meaning, your wording, and attribution.",
                    },
                    {
                      href: "/academic-writing-examples",
                      title: "Academic writing examples",
                      desc: "Analyse a rhetorical move and rebuild it with your own verified content instead of copying a polished model.",
                    },
                    {
                      href: "/evaluate-academic-sources",
                      title: "Evaluate academic sources",
                      desc: "Verify author, evidence, purpose, currency, and source records before a revised sentence presents them confidently.",
                    },
                    {
                      href: "/academic-paragraph-structure",
                      title: "Academic paragraph structure",
                      desc: "Check that clearer sentences still support a focused claim, evidence, and explanation.",
                    },
                    {
                      href: "/academic-integrity-and-source-use",
                      title: "Academic integrity and source use",
                      desc: "Keep citations and attribution accurate after revising source-based language.",
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
            </>
          )}
        </div>
      </main>
    </>
  );
}
