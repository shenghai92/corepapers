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
        title="CorePapers Editorial Policy for Academic Writing Content"
        description="Read the CorePapers editorial policy, including how we review academic writing guides, update content, and separate educational resources from tool outputs."
        canonical="/editorial-policy"
        jsonLd={EDITORIAL_POLICY_SCHEMA}
      />

      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container max-w-4xl">
          <h1 className="font-serif font-light text-4xl text-slate-purple mb-6">Editorial Policy</h1>
          <div className="space-y-5 text-sm leading-7 font-sans text-foreground">
            <p>Last updated: June 24, 2026</p>
            <p>
              CorePapers publishes academic writing resources for international students and multilingual writers.
              Our goal is to produce practical pages that help users solve real writing problems, especially in
              areas such as academic phrasing, citation formatting, research structure, and source-based writing.
            </p>

            <section>
              <h2 className="font-serif text-2xl text-slate-purple mb-2">What our content is designed to do</h2>
              <p>
                We focus on educational content that explains writing tasks clearly, gives usable examples, and
                helps readers revise more effectively. We aim to publish pages that answer common academic writing
                questions with direct, specific guidance rather than thin summaries.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-slate-purple mb-2">How content is reviewed</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>pages are checked for clarity, structure, and usefulness before publication</li>
                <li>we revise pages when wording is too generic, repetitive, or low-value</li>
                <li>we update internal links so readers can move to closely related guides and tools</li>
                <li>we improve or replace content that no longer meets our quality threshold</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-slate-purple mb-2">What we avoid</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>pages created only to target keywords without real user value</li>
                <li>duplicate or overlapping articles that cause confusion or keyword cannibalization</li>
                <li>misleading academic guarantees about grades, admissions, or publication outcomes</li>
                <li>content that substitutes generic filler for specific instruction</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-slate-purple mb-2">Educational content vs. tool output</h2>
              <p>
                Our blog and static educational pages are written as editorial resources. Tool outputs are user
                initiated and depend on the text or citation information a visitor provides. Educational pages are
                intended to explain concepts; tool pages are intended to help users act on those concepts.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-slate-purple mb-2">Feedback and corrections</h2>
              <p>
                If you notice a factual issue, unclear explanation, or outdated example, email{" "}
                <a className="text-primary underline" href="mailto:support@corepapers.space">
                  support@corepapers.space
                </a>
                . We use reader feedback to improve pages over time.
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
