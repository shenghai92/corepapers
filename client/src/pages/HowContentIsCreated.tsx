import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";

const CONTENT_PROCESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "How CorePapers Content Is Created",
  url: "https://corepapers.space/how-corepapers-content-is-created",
};

const PROCESS = [
  ["01", "Identify a bounded task", "We start with a specific writing problem, search question, recurring source-use difficulty, or revision decision—not a vague topic label."],
  ["02", "Check search and reader intent", "We compare the wording readers use with the task they are trying to complete, then decide whether a new page, a clearer section, or a better internal route is more useful."],
  ["03", "Consult primary guidance", "We prioritize official style guidance, university writing centers, university libraries, research-integrity offices, and publisher or institution rules when a page explains a convention or policy."],
  ["04", "Build an author-led workflow", "We organize guidance around decisions a student or researcher can verify: scope, evidence, source record, interpretation, format, and final responsibility."],
  ["05", "Label invented teaching material", "Any invented study, source, paragraph, citation, matrix, or sample is labelled as a fictional learning example and is never presented as evidence or student work."],
  ["06", "Connect the resource cluster", "We link a page to the next relevant guide, example, phrase resource, template, citation tool, or integrity reminder so readers can continue a real task."],
  ["07", "Review static and live visibility", "We check the reader-facing page and the crawler-visible static version for consistent headings, canonical URL, structured data, internal links, and authority references."],
  ["08", "Update when evidence or use changes", "We revise content when an official rule changes, a link fails, a page is thin or unclear, a stronger primary source is available, or reader feedback identifies a problem."],
] as const;

export default function HowContentIsCreated() {
  return (
    <>
      <SEOHead
        title="How CorePapers Content Is Created, Checked, and Updated"
        description="Learn how CorePapers selects academic writing topics, uses primary guidance, labels fictional learning examples, checks SEO visibility, and updates educational content."
        canonical="/how-corepapers-content-is-created"
        jsonLd={CONTENT_PROCESS_SCHEMA}
      />

      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container max-w-5xl">
          <header className="max-w-3xl mb-10">
            <p className="text-xs font-sans uppercase tracking-widest text-primary font-semibold mb-3">Method and transparency</p>
            <h1 className="font-serif font-light text-4xl text-slate-purple mb-4">How CorePapers Content Is Created</h1>
            <p className="text-lg text-muted-foreground font-sans leading-relaxed">Our academic-writing resources are designed as reader-facing research support: focused on a bounded task, grounded in traceable guidance, explicit about limitations, and linked to the next responsible step.</p>
          </header>
          <div className="space-y-8 text-sm leading-7 font-sans text-foreground">
            <p>Last updated: August 19, 2026</p>

            <section className="p-7 bg-white border border-border rounded-2xl">
              <h2 className="font-serif text-3xl text-slate-purple mb-3">What this process is—and is not</h2>
              <p>CorePapers creates educational writing resources for people who write in English as an additional language and need practical support with research structure, source use, citations, revision, and academic style. Our process is not peer review, institutional approval, or a substitute for the local instructions that govern your course, thesis, manuscript, or research project.</p>
            </section>

            <section className="p-7 bg-hero-gradient border border-border rounded-2xl">
              <p className="text-xs font-sans uppercase tracking-widest text-primary font-semibold mb-3">From question to accountable resource</p>
              <h2 className="font-serif text-3xl text-slate-purple mb-5">An eight-step content development process</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {PROCESS.map(([step, title, text]) => <article key={step} className="rounded-xl bg-white/80 border border-white p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">STEP {step}</p><h3 className="font-serif text-xl text-slate-purple mb-2">{title}</h3><p className="text-sm text-muted-foreground leading-relaxed">{text}</p></article>)}
              </div>
            </section>

            <section className="grid lg:grid-cols-2 gap-6">
              <article className="p-7 bg-white border border-border rounded-2xl"><h2 className="font-serif text-3xl text-slate-purple mb-3">How we use examples</h2><p>Examples make an academic move visible, but they can also mislead if readers mistake an invented model for published research or a ready-to-submit answer. We mark fictional learning examples prominently, use cautious claims that fit the invented design, and tell readers not to cite or submit those materials unchanged.</p></article>
              <article className="p-7 bg-white border border-border rounded-2xl"><h2 className="font-serif text-3xl text-slate-purple mb-3">How we treat evolving rules</h2><p>Citation, AI, privacy, research-integrity, and submission rules can differ by course, discipline, institution, funder, and publisher. We point to primary institutional or style guidance where possible, but readers should always use the most local applicable rule when it differs.</p></article>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-slate-purple mb-2">How we decide a page needs revision</h2>
              <p>We revisit a resource when it no longer answers its core task clearly, has thin or repetitive explanation, lacks traceable authority links, uses a misleading example, overlaps confusingly with another page, misses a useful internal route, or no longer matches observable search and reader intent. Improvements may include a stronger workflow, clearer headings, a fictional-learning disclosure, updated primary references, or new links to related resources.</p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-slate-purple mb-2">Feedback and corrections</h2>
              <p>If you find a factual issue, policy change, broken source link, unclear explanation, or misleading example, email <a className="text-primary underline" href="mailto:support@corepapers.space">support@corepapers.space</a> with the relevant page URL and a brief explanation. We review actionable feedback and revise pages when a correction or clarification is warranted.</p>
            </section>

            <section className="p-6 bg-hero-gradient border border-border rounded-2xl">
              <h2 className="font-serif text-2xl text-slate-purple mb-3">Related standards</h2>
              <div className="grid sm:grid-cols-3 gap-3 text-sm"><Link className="text-primary underline" href="/editorial-policy">Editorial Policy</Link><Link className="text-primary underline" href="/ai-use-disclosure-academic-writing">AI Use & Disclosure</Link><Link className="text-primary underline" href="/academic-integrity-and-source-use">Academic Integrity & Sources</Link></div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
