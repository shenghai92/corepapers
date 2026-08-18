import { Link } from "wouter";
import {
  ArrowRight,
  Languages,
  ScanText,
  Scale,
  TextCursorInput,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";

const guides = [
  {
    title: "Common ESL writing mistakes",
    description:
      "Review practical examples of article use, verb agreement, prepositions, literal translation, and academic tone.",
    href: "/blog/how-to-avoid-common-esl-writing-mistakes",
    icon: ScanText,
  },
  {
    title: "Hedging language",
    description:
      "Match the strength of your claim to the limits of your evidence with more careful academic phrasing.",
    href: "/blog/how-to-use-hedging-language-in-academic-writing",
    icon: Scale,
  },
  {
    title: "Active and passive voice",
    description:
      "Choose clearer sentence structures for methods, arguments, and research writing in your discipline.",
    href: "/blog/active-vs-passive-voice-in-academic-writing",
    icon: TextCursorInput,
  },
];

export default function AcademicEnglishHub() {
  return (
    <>
      <SEOHead
        title="Academic English Support for ESL and International Students"
        description="Improve academic English with practical help for ESL writing mistakes, literal translation, academic tone, hedging, and sentence clarity."
        keywords="academic English for ESL students, academic writing help for international students, ESL academic writing, non-native English writing"
        canonical="/academic-english-for-esl-students/"
      />
      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-sans font-medium mb-4">
              <Languages size={13} /> Academic English for multilingual writers
            </div>
            <h1 className="font-serif font-light text-4xl sm:text-5xl text-slate-purple mb-4 leading-tight">
              Academic English support for{" "}
              <span className="italic">ESL and international students</span>
            </h1>
            <p className="text-muted-foreground font-sans leading-relaxed text-lg">
              Learn to spot literal translation, improve sentence clarity, use
              careful academic claims, and revise a draft without losing the
              meaning of your ideas.
            </p>
          </div>

          <section
            className="max-w-5xl mx-auto grid md:grid-cols-3 gap-5"
            aria-labelledby="academic-english-guides"
          >
            <h2 id="academic-english-guides" className="sr-only">
              Academic English guides
            </h2>
            {guides.map(({ title, description, href, icon: Icon }) => (
              <Link key={title} href={href} className="block group">
                <article className="h-full p-6 bg-white border border-border rounded-2xl hover:border-primary/30 hover:shadow-card transition-all">
                  <Icon size={20} className="text-primary mb-4" />
                  <h3 className="font-serif text-2xl text-slate-purple mb-2">
                    {title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                    {description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-sans font-medium text-primary mt-5">
                    Read the guide <ArrowRight size={15} />
                  </span>
                </article>
              </Link>
            ))}
          </section>

          <section className="max-w-4xl mx-auto mt-12 p-8 bg-white border border-border rounded-2xl">
            <h2 className="font-serif text-3xl text-slate-purple mb-4">
              Revise rather than replace your voice
            </h2>
            <div className="space-y-4 text-sm text-muted-foreground font-sans leading-relaxed">
              <p>
                Academic English does not require every sentence to sound
                complicated. Start with a clear claim, use evidence accurately,
                and make revisions that preserve what you mean.
              </p>
              <p>
                Use feedback to learn repeat patterns in your own writing. Check
                whether an expression is too literal, whether a verb matches its
                subject, and whether the level of certainty matches your
                evidence before deciding to change it.
              </p>
            </div>
          </section>

          <section className="max-w-4xl mx-auto mt-8 grid sm:grid-cols-2 gap-4">
            <Link href="/phrases" className="block">
              <div className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30 transition-all">
                <h2 className="font-serif text-2xl text-slate-purple mb-2">
                  Browse academic phrases
                </h2>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                  Find sentence patterns for research aims, methods, results,
                  and discussion sections.
                </p>
              </div>
            </Link>
            <Link href="/polish" className="block">
              <div className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30 transition-all">
                <h2 className="font-serif text-2xl text-slate-purple mb-2">
                  Revise a paragraph
                </h2>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                  Review non-native phrasing and academic tone in a draft you
                  have already written.
                </p>
              </div>
            </Link>
          </section>

          <div className="max-w-4xl mx-auto mt-10 text-center">
            <Button
              asChild
              className="bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90"
            >
              <Link href="/polish">
                Try Essay Polish <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
