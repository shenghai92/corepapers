import { Link } from "wouter";
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  Lightbulb,
  Scale,
  SearchCheck,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";

const GAP_TYPES = [
  {
    title: "Conceptual gap",
    copy: "A key concept, relationship, definition, or theoretical explanation has not been explored enough for the focused question. This does not mean the entire topic is new.",
  },
  {
    title: "Methodological gap",
    copy: "Existing work has used particular designs, measures, data, or analytical approaches, leaving a reasoned case to examine what another suitable approach could clarify.",
  },
  {
    title: "Empirical or contextual gap",
    copy: "Evidence is limited for a defined population, setting, time period, case, outcome, or condition. Name the boundary rather than making a universal claim about all research.",
  },
] as const;

const SIGNALS = [
  "Map the main themes, methods, populations, contexts, and findings across the sources you actually reviewed.",
  "Mark supported limits, disagreements, exclusions, and scope conditions instead of searching only for a dramatic “gap.”",
  "Notice phrases such as “under-explored,” “requires further research,” “not well reported,” “limitations,” and “future research.” Treat them as leads to verify, not proof by themselves.",
  "Search again with related terms, recent dates, and key authors before you describe a limitation as a research gap.",
] as const;

export default function ResearchGapExamples() {
  return (
    <>
      <SEOHead
        title="Research Gap Examples: Find and State a Focused Gap"
        description="Learn how to identify and write a cautious research gap with conceptual, methodological, and empirical examples, a fictional learning example, and a feasibility checklist."
        keywords="research gap examples, how to identify research gap, research gap statement, research gap in literature review, how to write research gap"
        canonical="/research-gap-examples/"
      />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container max-w-5xl">
          <header className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-sans font-medium mb-4">
              <SearchCheck size={14} /> Literature review and proposal practice
            </div>
            <h1 className="font-serif font-light text-4xl sm:text-5xl text-slate-purple mb-4 leading-tight">
              Research gap examples: <span className="italic">find a focused, supportable next question</span>
            </h1>
            <p className="text-muted-foreground font-sans leading-relaxed text-lg">
              A research gap is a limited or unresolved place in a scholarly conversation. Learn how to identify one from the evidence you review, state it carefully, and test whether it can lead to a feasible project.
            </p>
          </header>

          <section className="p-7 bg-white border border-border rounded-2xl">
            <h2 className="font-serif text-3xl text-slate-purple mb-3">A gap is not a claim that “no research exists”</h2>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed">
              A responsible gap statement describes the limits of a defined body of literature. You may find that a question is under-explored, a method has limits, evidence is outdated, a setting is missing from the studies reviewed, or findings remain inconsistent. These are narrower and more useful claims than saying a whole topic has never been studied. Your wording should remain proportionate to your search, source base, discipline, and assignment.
            </p>
          </section>

          <section className="mt-6 grid md:grid-cols-3 gap-5">
            {GAP_TYPES.map(({ title, copy }) => (
              <article key={title} className="p-6 bg-white border border-border rounded-2xl">
                <Compass size={22} className="text-primary mb-4" />
                <h2 className="font-serif text-2xl text-slate-purple mb-2">{title}</h2>
                <p className="text-sm font-sans text-muted-foreground leading-relaxed">{copy}</p>
              </article>
            ))}
          </section>

          <section className="mt-8 grid lg:grid-cols-2 gap-6">
            <article className="p-7 bg-hero-gradient border border-border rounded-2xl">
              <p className="text-xs font-sans uppercase tracking-widest text-primary font-semibold mb-3">Find the pattern before naming the gap</p>
              <h2 className="font-serif text-3xl text-slate-purple mb-4">A four-step search-and-synthesis routine</h2>
              <ol className="space-y-4 text-sm font-sans text-muted-foreground leading-relaxed list-decimal pl-5">
                {SIGNALS.map(item => <li key={item}>{item}</li>)}
              </ol>
            </article>
            <article className="p-7 bg-white border border-border rounded-2xl">
              <p className="text-xs font-sans uppercase tracking-widest text-primary font-semibold mb-3">Gap-statement structure</p>
              <h2 className="font-serif text-3xl text-slate-purple mb-4">Connect evidence, limit, and purpose</h2>
              <p className="text-sm font-sans text-muted-foreground leading-relaxed mb-4">
                Try a three-part move rather than a standalone claim: describe the pattern in the literature, identify its specific boundary, then state what your project will examine. The final sentence should respond to the particular limit you named.
              </p>
              <div className="space-y-3">
                <p className="rounded-xl bg-hero-gradient p-4 text-sm font-sans text-foreground/80"><strong>Pattern:</strong> Existing studies have mainly examined [topic] in [defined context].</p>
                <p className="rounded-xl bg-hero-gradient p-4 text-sm font-sans text-foreground/80"><strong>Limit:</strong> Evidence about [specified population, condition, method, or outcome] remains limited or mixed.</p>
                <p className="rounded-xl bg-hero-gradient p-4 text-sm font-sans text-foreground/80"><strong>Purpose:</strong> This study therefore investigates [focused question] using [appropriate scope or approach].</p>
              </div>
            </article>
          </section>

          <section className="mt-8 p-7 bg-hero-gradient border border-border rounded-2xl">
            <p className="text-xs font-sans uppercase tracking-widest text-primary font-semibold mb-3">Fictional learning example</p>
            <h2 className="font-serif text-3xl text-slate-purple mb-4">Turn a source pattern into a cautious gap statement</h2>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed mb-5">
              This fictional learning example is invented for practice. Its studies, authors, findings, and citations are not real evidence and must not be submitted as research sources.
            </p>
            <div className="grid lg:grid-cols-3 gap-4 mb-5">
              <div className="rounded-xl bg-white/80 border border-white p-5"><p className="font-sans text-xs font-semibold text-primary mb-2">Fictional source pattern</p><p className="font-sans text-sm text-foreground/80 leading-relaxed">Three invented studies examine deadline reminders for first-year students, but all use short self-report surveys during one term.</p></div>
              <div className="rounded-xl bg-white/80 border border-white p-5"><p className="font-sans text-xs font-semibold text-primary mb-2">Cautious gap</p><p className="font-sans text-sm text-foreground/80 leading-relaxed">Within this fictional set, evidence remains limited about how students with paid work use reminders over a longer period and how reminder routines relate to completed work.</p></div>
              <div className="rounded-xl bg-white/80 border border-white p-5"><p className="font-sans text-xs font-semibold text-primary mb-2">Focused next question</p><p className="font-sans text-sm text-foreground/80 leading-relaxed">A small project could ask how a defined group of working students describes using deadline reminders across one semester, subject to realistic access and ethics requirements.</p></div>
            </div>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed">The example does not conclude that no studies exist, that reminders cause completion, or that one small project will settle the topic. It limits the claim to the evidence reviewed and makes the proposed contribution proportionate.</p>
          </section>

          <section className="mt-8 grid lg:grid-cols-2 gap-6">
            <article className="p-7 bg-white border border-border rounded-2xl">
              <Scale size={22} className="text-primary mb-4" />
              <h2 className="font-serif text-3xl text-slate-purple mb-4">Check whether the gap is worth pursuing</h2>
              <ul className="space-y-3 text-sm font-sans text-muted-foreground leading-relaxed">
                {[
                  "Does the proposed question matter to a current scholarly, practical, or policy conversation?",
                  "Could answering it clarify a disagreement, improve understanding, or test a reasonable extension of existing work?",
                  "Can you access appropriate sources, participants, data, materials, or permissions within the available time?",
                  "Does the planned scope, method, and handling of people or data meet ethical and disciplinary expectations?",
                  "Can you describe a modest contribution without predicting results or claiming a universal solution?",
                ].map(item => <li key={item} className="flex gap-3"><CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />{item}</li>)}
              </ul>
            </article>
            <article className="p-7 bg-white border border-border rounded-2xl">
              <Lightbulb size={22} className="text-primary mb-4" />
              <h2 className="font-serif text-3xl text-slate-purple mb-4">Use careful verbs and evidence-led limits</h2>
              <p className="text-sm font-sans text-muted-foreground leading-relaxed mb-4">Prefer language that matches what your source base can show:</p>
              <ul className="space-y-3 text-sm font-sans text-muted-foreground leading-relaxed">
                <li><strong>Use:</strong> “the studies reviewed focus on…,” “evidence remains limited for…,” “findings are mixed regarding…,” or “this review identified few recent studies addressing…”.</li>
                <li><strong>Avoid unless demonstrably justified:</strong> “no research exists,” “this is the first study,” or “the literature proves.”</li>
                <li><strong>Verify:</strong> whether the field uses a particular review method, database, date range, or search-reporting convention before making a broad availability claim.</li>
              </ul>
            </article>
          </section>

          <section className="mt-8 p-7 bg-white border border-border rounded-2xl">
            <h2 className="font-serif text-3xl text-slate-purple mb-3">Ground the statement in your discipline&apos;s evidence standards</h2>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed">
              The <a className="text-primary underline underline-offset-4" href="https://guides.lib.uchicago.edu/litreviews/researchgap" target="_blank" rel="noreferrer">University of Chicago Library</a> describes conceptual, methodological, and empirical places where research may be unexamined, under-explored, or outdated, and recommends checking relevance, value, feasibility, ethics, and method. <a className="text-primary underline underline-offset-4" href="https://owl.purdue.edu/owl/research_and_citation/conducting_research/writing_a_literature_review.html" target="_blank" rel="noreferrer">Purdue OWL</a> explains that literature reviews synthesize and evaluate a conversation, where writers can establish how their work relates to a particular gap. <a className="text-primary underline underline-offset-4" href="https://sites.middlebury.edu/middsciwriting/overview/organization/gap-statements/" target="_blank" rel="noreferrer">Middlebury&apos;s writing resource</a> notes that a gap statement should be paired with a clear account of how the project will address it. Follow the terminology, evidence threshold, and proposal format set by your instructor, supervisor, or field.
            </p>
          </section>

          <section className="mt-8 grid sm:grid-cols-3 gap-4">
            <Link href="/literature-review-example" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Synthesize the literature</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Compare sources by theme before deciding what evidence remains limited.</p></article></Link>
            <Link href="/research-question-examples" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Focus the research question</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Turn a supportable limit into a clear, manageable question.</p></article></Link>
            <Link href="/research-proposal-template" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Plan a feasible proposal</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Connect the problem, rationale, literature, approach, and realistic contribution.</p></article></Link>
          </section>

          <div className="text-center mt-10">
            <Button asChild className="bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90"><Link href="/polish">Polish a research-gap paragraph <ArrowRight size={16} className="ml-2" /></Link></Button>
          </div>
        </div>
      </main>
    </>
  );
}
