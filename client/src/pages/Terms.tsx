import SEOHead from "@/components/SEOHead";

export default function Terms() {
  return (
    <>
      <SEOHead
        title="Terms of Service"
        description="Read the CorePapers terms of service for account usage, billing, acceptable use, and support."
        canonical="/terms"
      />

      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container max-w-3xl">
          <h1 className="font-serif font-light text-4xl text-slate-purple mb-6">Terms of Service</h1>
          <div className="space-y-5 text-sm leading-7 font-sans text-foreground">
            <p>Last updated: May 27, 2026</p>
            <p>By using CorePapers, you agree to these terms. If you do not agree, please do not use the service.</p>
            <section>
              <h2 className="font-serif text-2xl text-slate-purple mb-2">Service overview</h2>
              <p>CorePapers provides online academic writing tools, including essay polishing, citation generation, and phrase support. Features may change over time.</p>
            </section>
            <section>
              <h2 className="font-serif text-2xl text-slate-purple mb-2">Accounts and acceptable use</h2>
              <p>You are responsible for the accuracy of the information you provide, maintaining account security, and using the service lawfully. You may not misuse the service, interfere with platform operations, or attempt unauthorized access.</p>
            </section>
            <section>
              <h2 className="font-serif text-2xl text-slate-purple mb-2">Billing and subscriptions</h2>
              <p>Paid subscriptions renew according to the plan you purchase unless cancelled. Pricing, billing intervals, and refund policies are shown at checkout or on the pricing page when applicable.</p>
            </section>
            <section>
              <h2 className="font-serif text-2xl text-slate-purple mb-2">No academic guarantee</h2>
              <p>CorePapers is a writing support tool. We do not guarantee grades, publication outcomes, or institutional acceptance.</p>
            </section>
            <section>
              <h2 className="font-serif text-2xl text-slate-purple mb-2">Contact</h2>
              <p>Questions about these terms can be sent to <a className="text-primary underline" href="mailto:support@corepapers.space">support@corepapers.space</a>.</p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
