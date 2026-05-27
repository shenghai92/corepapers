import SEOHead from "@/components/SEOHead";

const ABOUT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CorePapers",
  url: "https://corepapers.space",
  email: "support@corepapers.space",
  description: "Academic writing tools for students and researchers writing in English.",
};

export default function About() {
  return (
    <>
      <SEOHead
        title="About CorePapers"
        description="Learn about CorePapers and how to contact support for academic writing tool questions."
        canonical="/about"
        jsonLd={ABOUT_SCHEMA}
      />

      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container max-w-3xl">
          <h1 className="font-serif font-light text-4xl text-slate-purple mb-6">About CorePapers</h1>
          <div className="space-y-5 text-sm leading-7 font-sans text-foreground">
            <p>CorePapers builds academic writing tools for students and researchers who want clearer English, better structure, and faster citation formatting.</p>
            <p>Our current product includes essay polishing, an academic phrase library, citation generation, and practical writing resources.</p>
            <p>For product questions, account help, or support requests, contact <a className="text-primary underline" href="mailto:support@corepapers.space">support@corepapers.space</a>.</p>
          </div>
        </div>
      </main>
    </>
  );
}
