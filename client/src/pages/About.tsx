import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, Quote, Sparkles } from "lucide-react";

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
        description="Learn about CorePapers, our focus on international students, and how to contact support for academic writing tool questions."
        canonical="/about"
        jsonLd={ABOUT_SCHEMA}
      />

      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-sans font-medium mb-4">
              <GraduationCap size={13} />
              About CorePapers
            </div>
            <h1 className="font-serif font-light text-3xl sm:text-5xl text-slate-purple mb-4 leading-tight">
              Academic writing support
              <span className="italic"> for students writing in English</span>
            </h1>
            <p className="text-muted-foreground font-sans max-w-2xl mx-auto leading-relaxed">
              CorePapers is built for international students and non-native English writers who want clearer academic phrasing, stronger revision support, and faster citation workflows.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-5 mb-10">
            {[
              {
                icon: Sparkles,
                title: "Revision support",
                desc: "Improve awkward phrasing, academic tone, and sentence clarity in essays, reports, and research writing.",
              },
              {
                icon: Quote,
                title: "Citation workflow",
                desc: "Generate references and in-text citations without losing time on formatting details.",
              },
              {
                icon: GraduationCap,
                title: "International student focus",
                desc: "Prioritize the writing pain points that appear when strong ideas have to be expressed in a second language.",
              },
            ].map((item) => (
              <div key={item.title} className="p-6 bg-white border border-border rounded-2xl">
                <item.icon size={18} className="text-primary mb-3" />
                <h2 className="font-serif text-2xl text-slate-purple mb-2">{item.title}</h2>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="max-w-5xl mx-auto grid lg:grid-cols-[1.2fr_0.8fr] gap-6 mb-10">
            <section className="p-8 bg-white border border-border rounded-2xl">
              <h2 className="font-serif text-3xl text-slate-purple mb-4">What CorePapers is trying to do</h2>
              <div className="space-y-4 text-sm text-muted-foreground font-sans leading-relaxed">
                <p>
                  Many academic writing tools are designed for very broad use cases. CorePapers is narrower by design. The goal is to support students who already have real writing tasks in front of them and want clearer academic English, not just generic grammar cleanup.
                </p>
                <p>
                  That means focusing on things like non-native phrasing, academic tone, source-based writing, literature review language, and citation-heavy workflows.
                </p>
                <p>
                  If you want to try the product directly, start with <Link href="/polish" className="text-primary underline">essay polish</Link>, <Link href="/citations" className="text-primary underline">citation generation</Link>, or the <Link href="/phrases" className="text-primary underline">academic phrase library</Link>.
                </p>
              </div>
            </section>

            <aside className="p-8 bg-hero-gradient border border-border rounded-2xl">
              <h2 className="font-serif text-2xl text-slate-purple mb-3">Need help?</h2>
              <p className="text-sm text-muted-foreground font-sans leading-relaxed mb-4">
                For support questions, account issues, or general feedback, contact:
              </p>
              <p className="text-sm font-sans mb-6">
                <a className="text-primary underline" href="mailto:support@corepapers.space">
                  support@corepapers.space
                </a>
              </p>
              <Button asChild className="w-full bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90">
                <Link href="/pricing">
                  See Pricing
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
