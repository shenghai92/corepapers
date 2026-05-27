import SEOHead from "@/components/SEOHead";

export default function Privacy() {
  return (
    <>
      <SEOHead
        title="Privacy Policy"
        description="Read the CorePapers privacy policy, including how we handle account details, usage data, and support requests."
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
              <p>We may collect account details, payment-related identifiers from our payment providers, support messages, and the writing content you choose to submit for processing.</p>
            </section>
            <section>
              <h2 className="font-serif text-2xl text-slate-purple mb-2">How we use information</h2>
              <p>We use information to provide the service, improve product quality, maintain account security, respond to support requests, and comply with legal obligations.</p>
            </section>
            <section>
              <h2 className="font-serif text-2xl text-slate-purple mb-2">Third-party services</h2>
              <p>Payments may be processed by third-party providers. Authentication, hosting, analytics, or infrastructure services may also process limited data on our behalf.</p>
            </section>
            <section>
              <h2 className="font-serif text-2xl text-slate-purple mb-2">Data retention</h2>
              <p>We retain data for as long as needed to operate the service, resolve disputes, meet legal requirements, and support legitimate business operations.</p>
            </section>
            <section>
              <h2 className="font-serif text-2xl text-slate-purple mb-2">Contact</h2>
              <p>For privacy questions or requests, contact us at <a className="text-primary underline" href="mailto:support@corepapers.space">support@corepapers.space</a>.</p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
