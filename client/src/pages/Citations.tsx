import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc";
import SEOHead from "@/components/SEOHead";
import { Quote, Copy, CheckCircle2, Loader2, BookOpen, Globe, FileText, GraduationCap, Mic } from "lucide-react";
import { toast } from "sonner";
import { Link } from "wouter";

type CitationFormat = "apa" | "mla" | "chicago" | "ieee";
type SourceType = "journal" | "book" | "website" | "chapter" | "thesis" | "conference";

const FORMAT_INFO: Record<CitationFormat, { name: string; edition: string; color: string }> = {
  apa: { name: "APA", edition: "7th Edition", color: "bg-blue-50 border-blue-200 text-blue-700" },
  mla: { name: "MLA", edition: "9th Edition", color: "bg-emerald-50 border-emerald-200 text-emerald-700" },
  chicago: { name: "Chicago", edition: "17th Edition", color: "bg-amber-50 border-amber-200 text-amber-700" },
  ieee: { name: "IEEE", edition: "Current", color: "bg-purple-50 border-purple-200 text-purple-700" },
};

const SOURCE_ICONS: Record<SourceType, React.ElementType> = {
  journal: FileText,
  book: BookOpen,
  website: Globe,
  chapter: BookOpen,
  thesis: GraduationCap,
  conference: Mic,
};

const FIELD_CONFIGS: Record<SourceType, Array<{ key: string; label: string; placeholder: string; required?: boolean; span?: boolean }>> = {
  journal: [
    { key: "authors", label: "Author(s)", placeholder: "Smith, J. A., & Jones, B. C.", required: true, span: true },
    { key: "year", label: "Year", placeholder: "2023", required: true },
    { key: "title", label: "Article Title", placeholder: "The impact of...", required: true, span: true },
    { key: "journal", label: "Journal Name", placeholder: "Nature", required: true },
    { key: "volume", label: "Volume", placeholder: "12" },
    { key: "issue", label: "Issue", placeholder: "3" },
    { key: "pages", label: "Pages", placeholder: "45-67" },
    { key: "doi", label: "DOI", placeholder: "10.1000/xyz123", span: true },
  ],
  book: [
    { key: "authors", label: "Author(s)", placeholder: "Smith, J. A.", required: true, span: true },
    { key: "year", label: "Year", placeholder: "2023", required: true },
    { key: "title", label: "Book Title", placeholder: "Academic Writing for...", required: true, span: true },
    { key: "edition", label: "Edition", placeholder: "3rd ed." },
    { key: "publisher", label: "Publisher", placeholder: "Oxford University Press", required: true },
    { key: "city", label: "City", placeholder: "New York" },
  ],
  website: [
    { key: "authors", label: "Author(s)", placeholder: "Smith, J. A.", span: true },
    { key: "year", label: "Year", placeholder: "2023", required: true },
    { key: "title", label: "Page Title", placeholder: "How to write...", required: true, span: true },
    { key: "journal", label: "Website Name", placeholder: "University of Oxford" },
    { key: "url", label: "URL", placeholder: "https://...", required: true, span: true },
    { key: "accessDate", label: "Access Date", placeholder: "January 15, 2024" },
  ],
  chapter: [
    { key: "authors", label: "Chapter Author(s)", placeholder: "Smith, J. A.", required: true, span: true },
    { key: "year", label: "Year", placeholder: "2023", required: true },
    { key: "title", label: "Chapter Title", placeholder: "Introduction to...", required: true, span: true },
    { key: "editors", label: "Book Editor(s)", placeholder: "Jones, B. (Ed.)", span: true },
    { key: "booktitle", label: "Book Title", placeholder: "Handbook of...", required: true, span: true },
    { key: "pages", label: "Pages", placeholder: "45-67" },
    { key: "publisher", label: "Publisher", placeholder: "Springer" },
  ],
  thesis: [
    { key: "authors", label: "Author", placeholder: "Smith, J. A.", required: true, span: true },
    { key: "year", label: "Year", placeholder: "2023", required: true },
    { key: "title", label: "Thesis Title", placeholder: "An investigation of...", required: true, span: true },
    { key: "journal", label: "Degree Type", placeholder: "Doctoral dissertation / Master's thesis" },
    { key: "institution", label: "Institution", placeholder: "University of Cambridge", required: true },
    { key: "url", label: "URL / Database", placeholder: "ProQuest Dissertations" },
  ],
  conference: [
    { key: "authors", label: "Author(s)", placeholder: "Smith, J. A.", required: true, span: true },
    { key: "year", label: "Year", placeholder: "2023", required: true },
    { key: "title", label: "Paper Title", placeholder: "A study of...", required: true, span: true },
    { key: "booktitle", label: "Conference Name", placeholder: "Proceedings of the 2023 ACL...", required: true, span: true },
    { key: "pages", label: "Pages", placeholder: "123-130" },
    { key: "publisher", label: "Publisher / Location", placeholder: "ACL Anthology" },
  ],
};

const CITATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "CorePapers Citation Generator",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  url: "https://corepapers.space/citations",
  description: "Generate academic citations online in APA, MLA, Chicago, and IEEE styles.",
  featureList: [
    "APA 7 citation generator",
    "MLA 9 citation generator",
    "Chicago citation generator",
    "IEEE citation generator",
  ],
};

export default function Citations() {
  const [format, setFormat] = useState<CitationFormat>("apa");
  const [sourceType, setSourceType] = useState<SourceType>("journal");
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState<"citation" | "intext" | null>(null);

  const generateMutation = trpc.citation.generate.useMutation({
    onError: (err) => toast.error(err.message),
  });

  const result = generateMutation.data;
  const fields = FIELD_CONFIGS[sourceType];

  const handleGenerate = () => {
    if (!formData.title?.trim()) {
      toast.error("Please enter the title.");
      return;
    }
    generateMutation.mutate({
      format,
      sourceType,
      data: formData as Parameters<typeof generateMutation.mutate>[0]["data"],
    });
  };

  const handleCopy = (text: string, type: "citation" | "intext") => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <>
      <SEOHead
        title="Free Citation Generator for APA 7, MLA, Chicago, and IEEE"
        description="Use a free citation generator for APA 7th edition, MLA, Chicago, and IEEE references and in-text citations. Built for international students writing essays, reports, and research papers."
        keywords="free citation generator, APA 7 citation generator, APA 7th edition citation format, MLA citation generator, Chicago citation generator, IEEE citation generator, bibliography generator for students"
        canonical="/citations/"
        jsonLd={CITATION_SCHEMA}
      />

      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-sans font-medium mb-4">
              <Quote size={13} />
              Citation Generator
            </div>
            <h1 className="font-serif font-light text-4xl sm:text-5xl text-slate-purple mb-4">
              Free citation generator for
              <span className="italic"> APA, MLA, Chicago, and IEEE</span>
            </h1>
            <p className="text-muted-foreground font-sans max-w-xl mx-auto leading-relaxed">
              Build references and in-text citations for the source types students use most in essays, reports, dissertations, and research papers. Always compare the final citation with your course or publisher guidance.
            </p>
            <p className="text-xs text-muted-foreground font-sans mt-3">
              Free usage includes up to 3 citation generations per day. Paid plans raise daily limits for regular coursework and research use.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <p className="text-xs font-sans font-semibold tracking-widest uppercase text-muted-foreground mb-3">Citation Format</p>
              <div className="grid grid-cols-4 gap-2">
                {(Object.entries(FORMAT_INFO) as [CitationFormat, typeof FORMAT_INFO[CitationFormat]][]).map(([key, info]) => (
                  <button
                    key={key}
                    onClick={() => setFormat(key)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      format === key
                        ? "border-primary bg-primary/5 shadow-soft"
                        : "border-border bg-white hover:border-primary/30"
                    }`}
                  >
                    <div className="font-sans font-bold text-lg text-slate-purple">{info.name}</div>
                    <div className="text-xs text-muted-foreground font-sans">{info.edition}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-xs font-sans font-semibold tracking-widest uppercase text-muted-foreground mb-3">Source Type</p>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {(Object.keys(FIELD_CONFIGS) as SourceType[]).map((type) => {
                  const Icon = SOURCE_ICONS[type];
                  return (
                    <button
                      key={type}
                      onClick={() => {
                        setSourceType(type);
                        setFormData({});
                      }}
                      className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                        sourceType === type
                          ? "border-primary bg-primary/5"
                          : "border-border bg-white hover:border-primary/30"
                      }`}
                    >
                      <Icon size={16} className={sourceType === type ? "text-primary" : "text-muted-foreground"} />
                      <span className="text-xs font-sans capitalize">{type}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-white border border-border rounded-2xl p-6 mb-6">
              <div className="grid grid-cols-2 gap-4">
                {fields.map((field) => (
                  <div key={field.key} className={field.span ? "col-span-2" : ""}>
                    <Label className="text-xs font-sans font-medium text-muted-foreground mb-1.5 block">
                      {field.label}
                      {field.required && <span className="text-red-400 ml-1">*</span>}
                    </Label>
                    <Input
                      value={formData[field.key] ?? ""}
                      onChange={(e) => setFormData((prev) => ({ ...prev, [field.key]: e.target.value }))}
                      placeholder={field.placeholder}
                      className="bg-background border-border font-sans text-sm"
                    />
                  </div>
                ))}
              </div>

              <Button
                onClick={handleGenerate}
                disabled={generateMutation.isPending}
                className="mt-6 w-full bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90 py-5 text-base font-sans"
              >
                {generateMutation.isPending ? (
                  <>
                    <Loader2 size={18} className="mr-2 animate-spin" />
                    Generating Citation...
                  </>
                ) : (
                  <>
                    <Quote size={18} className="mr-2" />
                    Generate Citation
                  </>
                )}
              </Button>
            </div>

            {result && (
              <div className="space-y-4">
                <div className={`p-5 rounded-2xl border ${FORMAT_INFO[format].color}`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-sans font-bold uppercase tracking-widest">{FORMAT_INFO[format].name} Reference</span>
                    <button
                      onClick={() => handleCopy(result.citation, "citation")}
                      className="flex items-center gap-1.5 text-xs font-sans font-medium hover:underline"
                    >
                      {copied === "citation" ? <CheckCircle2 size={13} /> : <Copy size={13} />}
                      {copied === "citation" ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  <p className="font-sans text-sm leading-relaxed">{result.citation}</p>
                </div>

                <div className="p-5 rounded-2xl bg-secondary border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-sans font-bold uppercase tracking-widest text-muted-foreground">In-Text Citation</span>
                    <button
                      onClick={() => handleCopy(result.inTextCitation, "intext")}
                      className="flex items-center gap-1.5 text-xs font-sans font-medium text-muted-foreground hover:text-foreground"
                    >
                      {copied === "intext" ? <CheckCircle2 size={13} /> : <Copy size={13} />}
                      {copied === "intext" ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  <code className="font-mono text-sm text-foreground">{result.inTextCitation}</code>
                </div>

                {result.notes && (
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-700 font-sans">
                    <span className="font-semibold">Note: </span>{result.notes}
                  </div>
                )}
              </div>
            )}

            <div className="mt-12 grid sm:grid-cols-2 gap-4">
              {[
                { format: "APA 7th", use: "Psychology, Education, Social Sciences", example: 'Smith, J. A. (2023). Title. Journal, 12(3), 45-67.' },
                { format: "MLA 9th", use: "Literature, Arts, Humanities", example: 'Smith, John A. "Title." Journal, vol. 12, no. 3, 2023, pp. 45-67.' },
                { format: "Chicago 17th", use: "History, Fine Arts, Business", example: 'Smith, John A. "Title." Journal 12, no. 3 (2023): 45-67.' },
                { format: "IEEE", use: "Engineering, Computer Science", example: 'J. A. Smith, "Title," Journal, vol. 12, no. 3, pp. 45-67, 2023.' },
              ].map((item) => (
                <div key={item.format} className="p-4 bg-white border border-border rounded-xl">
                  <div className="font-sans font-semibold text-sm text-foreground mb-1">{item.format}</div>
                  <div className="text-xs text-muted-foreground font-sans mb-2">Used in: {item.use}</div>
                  <code className="text-xs font-mono text-foreground/70 leading-relaxed block">{item.example}</code>
                </div>
              ))}
            </div>

            <div className="mt-10 grid sm:grid-cols-2 gap-4">
              <Link href="/blog/complete-apa-7th-edition-guide-international-students" className="block">
                <div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30 hover:shadow-card transition-all">
                  <h2 className="font-serif text-2xl text-slate-purple mb-2">Need an APA walkthrough?</h2>
                  <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                    Read the step-by-step APA guide for international students and common formatting mistakes to avoid.
                  </p>
                </div>
              </Link>
              <Link href="/polish" className="block">
                <div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30 hover:shadow-card transition-all">
                  <h2 className="font-serif text-2xl text-slate-purple mb-2">Polish the draft after citing</h2>
                  <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                    Improve academic tone, fix non-native phrasing, and strengthen your writing after building references.
                  </p>
                </div>
              </Link>
            </div>

            <div className="mt-10">
              <p className="text-xs font-sans font-semibold tracking-widest uppercase text-muted-foreground mb-4">
                Related guides
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  {
                    href: "/blog/complete-apa-7th-edition-guide-international-students",
                    title: "APA guide for international students",
                    desc: "Review the citation rules students get wrong most often.",
                  },
                  {
                    href: "/blog/how-to-paraphrase-without-plagiarizing-in-academic-writing",
                    title: "Paraphrasing and citation",
                    desc: "Keep citations accurate when rephrasing source ideas.",
                  },
                  {
                    href: "/blog/how-to-write-a-literature-review-for-international-students",
                    title: "Literature review workflow",
                    desc: "Connect your sources more clearly after building references.",
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
        </div>
      </main>
    </>
  );
}
