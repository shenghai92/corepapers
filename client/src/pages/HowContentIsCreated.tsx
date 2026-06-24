import SEOHead from "@/components/SEOHead";

const CONTENT_PROCESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "How CorePapers Content Is Created",
  url: "https://corepapers.space/how-corepapers-content-is-created",
};

export default function HowContentIsCreated() {
  return (
    <>
      <SEOHead
        title="How CorePapers Content Is Created and Updated"
        description="Learn how CorePapers plans, writes, revises, and updates academic writing content for international students and multilingual writers."
        canonical="/how-corepapers-content-is-created"
        jsonLd={CONTENT_PROCESS_SCHEMA}
      />

      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container max-w-4xl">
          <h1 className="font-serif font-light text-4xl text-slate-purple mb-6">
            How CorePapers Content Is Created
          </h1>
          <div className="space-y-5 text-sm leading-7 font-sans text-foreground">
            <p>Last updated: June 24, 2026</p>
            <p>
              CorePapers creates academic writing resources for users who need practical help with essays,
              research papers, citation formatting, and writing in English as an additional language.
            </p>

            <section>
              <h2 className="font-serif text-2xl text-slate-purple mb-2">How topics are selected</h2>
              <p>
                We prioritize topics based on recurring academic writing problems, search demand, tool relevance,
                and whether a page can genuinely help a student complete a real task more clearly or efficiently.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-slate-purple mb-2">How pages are developed</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>identify a specific user problem or question</li>
                <li>build a page around clear examples, structure, and next actions</li>
                <li>connect the page to relevant guides, phrase resources, or tools</li>
                <li>revise for clarity, usefulness, and stronger academic wording</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-slate-purple mb-2">How pages are improved over time</h2>
              <p>
                We update content when a page feels too thin, too generic, too repetitive, or less useful than it
                should be. Updates may include stronger examples, clearer explanations, improved internal linking,
                tighter headings, or better alignment with real user search intent.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-slate-purple mb-2">How tool pages differ from blog pages</h2>
              <p>
                Blog pages are educational resources meant to explain writing concepts and solve informational
                problems. Tool pages are task-oriented experiences that respond to user input. We try to keep those
                roles clear so visitors understand what they are reading and what action they can take next.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-slate-purple mb-2">Trust and user expectations</h2>
              <p>
                We do not position CorePapers as a replacement for instructors, institutional guidelines, or formal
                editorial review. Our aim is to provide practical support, transparent policies, and helpful writing
                resources that are easier for students to use.
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
