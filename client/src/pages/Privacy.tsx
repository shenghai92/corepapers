import SEOHead from "@/components/SEOHead";

export default function Privacy() {
  return (
    <>
      <SEOHead
        title="Privacy Policy"
        description="Read the CorePapers privacy policy, including account details, submitted writing content, support requests, third-party service processing, and privacy questions."
        canonical="/privacy"
      />

      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container max-w-3xl">
          <h1 className="font-serif font-light text-4xl text-slate-purple mb-6">Privacy Policy</h1>
          <div className="space-y-5 text-sm leading-7 font-sans text-foreground">
            <p>Last updated: May 27, 2026</p>
            <p>
              CorePapers provides web-based academic writing tools including essay polishing, citation generation, and phrase support.
              This policy explains what information we collect, how we use it, and how to contact us.
            </p>
            <section>
              <h2 className="font-serif text-2xl text-slate-purple mb-2">Information we collect</h2>
              <p>We may collect account details, payment-related identifiers from payment providers, support messages, technical or usage information, and the writing content you choose to submit for processing. The information collected depends on the feature you use and the details you choose to provide.</p>
            </section>
            <section>
              <h2 className="font-serif text-2xl text-slate-purple mb-2">Use data minimization for academic material</h2>
              <p>Before submitting material to a writing tool or support channel, consider whether it contains confidential research data, identifiable participant information, unpublished manuscripts, peer-review content, grant or proprietary material, credentials, or payment details. Do not submit information you are not permitted to share, and follow the privacy, ethics, data-management, and course requirements that apply to your work.</p>
            </section>
            <section>
              <h2 className="font-serif text-2xl text-slate-purple mb-2">How we use information</h2>
              <p>We use information to provide the service, improve product quality, maintain account security, respond to support requests, and comply with legal obligations.</p>
            </section>
            <section>
              <h2 className="font-serif text-2xl text-slate-purple mb-2">Third-party services</h2>
              <p>Payments may be processed by third-party providers. Authentication, hosting, analytics, infrastructure, and feature providers may process information needed to provide their relevant services. Their handling of information is governed by their applicable terms and privacy notices as well as the arrangements that apply to the service.</p>
            </section>
            <section>
              <h2 className="font-serif text-2xl text-slate-purple mb-2">Data retention</h2>
              <p>We retain data for as long as needed to operate the service, resolve disputes, meet legal requirements, and support legitimate business operations.</p>
            </section>
            <section>
              <h2 className="font-serif text-2xl text-slate-purple mb-2">Academic writing and permitted AI use</h2>
              <p>Privacy is only one part of responsible use. Before using AI-assisted writing features, follow the most local instruction that applies to your assignment, research, thesis, manuscript, or institution. The <a className="text-primary underline" href="/ai-use-disclosure-academic-writing">AI Use &amp; Disclosure Guide</a> explains a policy-first approach to privacy, source verification, human review, and disclosure.</p>
            </section>
            <section>
              <h2 className="font-serif text-2xl text-slate-purple mb-2">Contact</h2>
              <p>For privacy questions or requests, contact us at <a className="text-primary underline" href="mailto:support@corepapers.space">support@corepapers.space</a>. For site content standards and updates, see the <a className="text-primary underline" href="/editorial-policy">Editorial Policy</a> and <a className="text-primary underline" href="/how-corepapers-content-is-created">How CorePapers Content Is Created</a>.</p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
