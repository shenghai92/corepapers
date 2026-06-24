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
        description="Contact CorePapers for support questions, account help, billing issues, editorial feedback, and general academic writing tool inquiries."
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
                <li>the page or tool you were using</li>
                <li>the issue you ran into</li>
                <li>the email linked to your account, if relevant</li>
                <li>screenshots or short examples when they help explain the problem</li>
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
                </a>.
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
