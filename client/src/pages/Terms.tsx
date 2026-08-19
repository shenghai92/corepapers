import SEOHead from "@/components/SEOHead";

export default function Terms() {
  return (
    <>
      <SEOHead
        title="Terms of Service"
        description="Read the CorePapers terms of service for account use, billing, acceptable use, academic-writing support boundaries, and author responsibility."
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
              <h2 className="font-serif text-2xl text-slate-purple mb-2">Academic writing support and author responsibility</h2>
              <p>CorePapers provides educational writing support. It does not replace your instructor, supervisor, institution, subject librarian, ethics review process, editor, peer reviewer, or the requirements that apply to your assignment, thesis, manuscript, or research project. You remain responsible for the accuracy of your claims, original-source checks, citations, data, privacy choices, permitted AI use, and every work submitted under your name.</p>
            </section>
            <section>
              <h2 className="font-serif text-2xl text-slate-purple mb-2">Academic integrity and acceptable use</h2>
              <p>You may not use the service to fabricate sources, evidence, data, quotations, citations, research findings, or academic credentials; bypass an instructor&apos;s or institution&apos;s rules; disguise prohibited generated work as your own; submit work you cannot explain; or interfere with another person&apos;s academic work. For a policy-first workflow when AI assistance may be permitted, read the <a className="text-primary underline" href="/ai-use-disclosure-academic-writing">AI Use &amp; Disclosure Guide</a> and follow the most local requirement that applies.</p>
            </section>
            <section>
              <h2 className="font-serif text-2xl text-slate-purple mb-2">Billing and subscriptions</h2>
              <p>Paid subscriptions renew according to the plan you purchase unless cancelled. Pricing, billing intervals, and refund policies are shown at checkout or on the pricing page when applicable.</p>
            </section>
            <section>
              <h2 className="font-serif text-2xl text-slate-purple mb-2">No academic guarantee</h2>
              <p>CorePapers is a writing support tool. We do not guarantee grades, publication outcomes, institutional acceptance, originality-screening outcomes, or that a particular use is allowed by a course, program, journal, funder, or institution.</p>
            </section>
            <section>
              <h2 className="font-serif text-2xl text-slate-purple mb-2">Useful standards and resources</h2>
              <p>Read the <a className="text-primary underline" href="/academic-integrity-and-source-use">Academic Integrity and Source Use Guide</a>, the <a className="text-primary underline" href="/research-paper-revision-checklist">Research Paper Revision Checklist</a>, the <a className="text-primary underline" href="/editorial-policy">Editorial Policy</a>, and the <a className="text-primary underline" href="/privacy">Privacy Policy</a> for more detail about responsible use and site content standards.</p>
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
