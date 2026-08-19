import SEOHead from "@/components/SEOHead";

const CONTACT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact CorePapers",
  url: "https://corepapers.space/contact",
  mainEntity: {
    "@type": "Organization",
    name: "CorePapers",
    email: "support@corepapers.space",
    url: "https://corepapers.space",
  },
};

export default function Contact() {
  return (
    <>
      <SEOHead
        title="Contact CorePapers Support and Editorial Team"
        description="Contact CorePapers for account support, content corrections, source or link feedback, privacy questions, and responsible academic writing tool inquiries."
        canonical="/contact"
        jsonLd={CONTACT_SCHEMA}
      />

      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container max-w-4xl">
          <h1 className="font-serif font-light text-4xl text-slate-purple mb-6">Contact CorePapers</h1>
          <div className="space-y-5 text-sm leading-7 font-sans text-foreground">
            <p>Last updated: June 24, 2026</p>
            <p>
              CorePapers provides academic writing support tools for international students and multilingual
              writers. If you need help with an account issue, billing question, support request, or want to
              report a content problem, you can reach us by email.
            </p>

            <section>
              <h2 className="font-serif text-2xl text-slate-purple mb-2">Primary contact</h2>
              <p>
                Email:{" "}
                <a className="text-primary underline" href="mailto:support@corepapers.space">
                  support@corepapers.space
                </a>
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-slate-purple mb-2">What to include in your message</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>the page or tool you were using, including its URL when possible</li>
                <li>the issue you ran into or the specific wording, source, link, or citation detail you want reviewed</li>
                <li>the email linked to your account, if relevant</li>
                <li>screenshots or short, non-sensitive examples when they help explain the problem</li>
                <li>the assignment, journal, or institutional rule that controls your question when you are asking about a local requirement</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-slate-purple mb-2">Types of requests we handle</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>account access and login issues</li>
                <li>billing and subscription questions</li>
                <li>support requests for writing tools</li>
                <li>feedback about blog content or factual clarity</li>
                <li>privacy or policy-related questions</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-slate-purple mb-2">Content corrections and source feedback</h2>
              <p>
                We welcome reports of factual errors, outdated guidance, broken links, unclear explanations, or misleading fictional examples. Include the page URL, the specific issue, and—when relevant—a link to the original institutional or style guidance. We review actionable feedback as part of our update process; the <a className="text-primary underline" href="/editorial-policy">Editorial Policy</a> explains our source and correction standards.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-slate-purple mb-2">Protect private academic material</h2>
              <p>
                Do not send confidential research data, identifiable participant information, unpublished peer-review material, passwords, payment details, or a full manuscript unless you have confirmed that doing so is appropriate. For questions about permitted AI assistance, first check your local instruction and then use the <a className="text-primary underline" href="/ai-use-disclosure-academic-writing">AI Use &amp; Disclosure Guide</a>.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-slate-purple mb-2">Related pages</h2>
              <p>
                For policy details, see the <a className="text-primary underline" href="/privacy">Privacy Policy</a>{" "}
                and <a className="text-primary underline" href="/terms">Terms of Service</a>. For information about
                how our content is written and reviewed, see{" "}
                <a className="text-primary underline" href="/how-corepapers-content-is-created">
                  How CorePapers Content Is Created
                </a>{" "}
                and the{" "}
                <a className="text-primary underline" href="/editorial-policy">
                  Editorial Policy
                </a>. Before submitting a research paper, you can also use the{" "}
                <a className="text-primary underline" href="/research-paper-revision-checklist">
                  Research Paper Revision Checklist
                </a>.
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
