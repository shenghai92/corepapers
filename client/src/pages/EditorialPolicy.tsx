import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";

const EDITORIAL_POLICY_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "CorePapers Editorial Policy",
  url: "https://corepapers.space/editorial-policy",
  about: {
    "@type": "Thing",
    name: "Editorial standards for academic writing resources",
  },
};

export default function EditorialPolicy() {
  return (
    <>
      <SEOHead
        title="CorePapers Editorial Policy and Content Standards"
        description="Read the CorePapers editorial policy: source standards, fictional learning examples, AI boundaries, updates, corrections, and educational content practices."
        canonical="/editorial-policy"
        jsonLd={EDITORIAL_POLICY_SCHEMA}
      />

      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container max-w-4xl">
          <header className="mb-8">
            <p className="text-xs font-sans uppercase tracking-widest text-primary font-semibold mb-3">Transparency and standards</p>
            <h1 className="font-serif font-light text-4xl text-slate-purple mb-4">Editorial Policy</h1>
            <p className="text-lg text-muted-foreground font-sans leading-relaxed max-w-3xl">CorePapers publishes educational academic-writing resources for multilingual and international students. This policy explains what those resources are designed to do, how they are checked, and where their limits begin.</p>
          </header>
          <div className="space-y-7 text-sm leading-7 font-sans text-foreground">
            <p>Last updated: August 19, 2026</p>

            <section>
              <h2 className="font-serif text-2xl text-slate-purple mb-2">Purpose and scope</h2>
              <p>Our pages help readers plan, draft, revise, attribute, and format academic work more carefully. They are educational support, not a substitute for an instructor, supervisor, institutional policy, subject librarian, ethics board, editor, peer reviewer, or professional legal, medical, statistical, or disciplinary advice. We do not guarantee a grade, admission result, publication decision, or plagiarism-screening outcome.</p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-slate-purple mb-2">How we select and develop topics</h2>
              <p>We prioritize recurring academic-writing problems, search demand, task relevance, and gaps where a focused page can help a reader make a more responsible decision. We aim for pages with a specific user question, a usable process, clear limitations, related resource paths, and language that fits how students and researchers search in English. We do not publish pages solely to target a keyword.</p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-slate-purple mb-2">Source and evidence standards</h2>
              <p>For factual academic-writing guidance, we prioritize primary style authorities, university writing centers, university libraries, research-integrity offices, and official publisher or institution guidance. We link readers to those sources when a page relies on a specific convention or policy. A source link does not mean every institution uses identical rules: readers should follow the most local applicable instruction from their course, department, supervisor, journal, or publisher.</p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-slate-purple mb-2">Learning examples and research claims</h2>
              <p>Any invented case, sample, study, author, finding, citation, matrix, or paragraph used to teach a writing move is labelled as a <strong>fictional learning example</strong>. It is not real student work, research evidence, a source to cite, or text to submit unchanged. We avoid claiming that no research exists unless a page can support that level of certainty; where appropriate, we use bounded wording such as “limited in the studies reviewed” or “under-explored in this context.”</p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-slate-purple mb-2">Educational pages, tools, and user responsibility</h2>
              <p>Editorial pages explain concepts and processes. Tool pages respond to information supplied by a user and should be treated as assistance to inspect, not as an authority that approves a claim, source, method, or final submission. Users remain responsible for original source details, citations, paraphrases, factual accuracy, course requirements, privacy choices, and the work submitted under their name.</p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-slate-purple mb-2">AI-assisted writing boundaries</h2>
              <p>We do not present AI output as a replacement for authorship, source reading, research judgment, or academic policy. CorePapers does not help users bypass institutional AI rules, disguise generated text as student work, fabricate sources, or submit work they cannot explain. Where AI assistance is permitted, users should check local rules, protect private material, verify original sources, review every changed claim, and disclose material use in the required format. Read our <Link className="text-primary underline" href="/ai-use-disclosure-academic-writing">AI use and disclosure guide</Link> for a practical workflow.</p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-slate-purple mb-2">Review, updates, and corrections</h2>
              <p>We review pages for task fit, clarity, examples, limitations, internal linking, and source relevance. We update content when guidance changes, a page becomes thin or repetitive, a link fails, a user identifies an error, or a better primary source becomes available. If you identify a factual issue, unclear explanation, broken link, or outdated resource, email <a className="text-primary underline" href="mailto:support@corepapers.space">support@corepapers.space</a> with the page URL and a short explanation. We review actionable correction requests and update the page when a change is warranted.</p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-slate-purple mb-2">Commercial and relationship transparency</h2>
              <p>CorePapers may link to its own tools and related educational pages when they help a reader continue a task. Those links are part of the resource pathway, not a claim that a tool can replace human review. We keep educational guidance distinct from pricing and product pages, and we do not sell academic papers or promise outcomes in exchange for payment.</p>
            </section>

            <section className="p-6 bg-hero-gradient border border-border rounded-2xl">
              <h2 className="font-serif text-2xl text-slate-purple mb-2">Related transparency pages</h2>
              <div className="grid sm:grid-cols-3 gap-3 text-sm"><Link className="text-primary underline" href="/how-corepapers-content-is-created">How content is created</Link><Link className="text-primary underline" href="/academic-integrity-and-source-use">Academic integrity and source use</Link><Link className="text-primary underline" href="/privacy">Privacy Policy</Link></div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
