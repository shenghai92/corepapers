import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Layers3, Network, SearchCheck } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";

const SOURCE = {
  gmu: "https://writingcenter.gmu.edu/writing-resources/research-based-writing/writing-a-literature-review",
  unc: "https://writingcenter.unc.edu/tips-and-tools/literature-reviews/",
  jhu: "https://guides.library.jhu.edu/lit-review/synthesize",
};

export default function LiteratureReviewExample() {
  return (
    <>
      <SEOHead
        title="Literature Review Example: Thematic Synthesis and Research Gap"
        description="Use a fictional literature review example to organize sources by theme, write synthesis paragraphs, and identify a cautious research gap without listing one study at a time."
        keywords="literature review example, literature review synthesis example, thematic literature review, research gap example, how to write literature review"
        canonical="/literature-review-example/"
      />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container max-w-5xl">
          <header className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-sans font-medium mb-4">
              <Layers3 size={14} /> Literature review practice
            </div>
            <h1 className="font-serif font-light text-4xl sm:text-5xl text-slate-purple mb-4 leading-tight">
              Literature review example: <span className="italic">synthesize by theme</span>
            </h1>
            <p className="text-muted-foreground font-sans leading-relaxed text-lg">
              See how to move from isolated source notes to a thematic paragraph, then describe a limited research gap without claiming that no research exists.
            </p>
          </header>

          <section className="p-7 bg-white border border-border rounded-2xl">
            <h2 className="font-serif text-3xl text-slate-purple mb-3">A review maps a conversation, not a reading list</h2>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed">
              A literature review explains what relevant scholarship says, how studies connect or differ, and what the pattern means for a focused research problem. It usually needs summary and synthesis. Organizing one source per paragraph often leaves readers with a sequence of reports rather than a reasoned account of the field.
            </p>
          </section>

          <section className="mt-6 grid md:grid-cols-3 gap-5">
            {[
              [Network, "Group by a meaningful pattern", "Sort evidence around themes, approaches, debates, populations, or time periods only when that order helps readers understand the question."],
              [SearchCheck, "Compare before you draft", "Record what each source studies, how it studies it, what it finds, and where its scope or design differs from related sources."],
              [CheckCircle2, "State the gap carefully", "A gap can be a limited population, context, method, outcome, or unresolved inconsistency. It is not automatically proof that no research exists."],
            ].map(([Icon, title, copy]) => {
              const CardIcon = Icon as typeof Network;
              return (
                <article key={title as string} className="p-6 bg-white border border-border rounded-2xl">
                  <CardIcon size={22} className="text-primary mb-4" />
                  <h2 className="font-serif text-2xl text-slate-purple mb-2">{title as string}</h2>
                  <p className="text-sm font-sans text-muted-foreground leading-relaxed">{copy as string}</p>
                </article>
              );
            })}
          </section>

          <section className="mt-8 p-7 bg-hero-gradient border border-border rounded-2xl">
            <p className="text-xs font-sans uppercase tracking-widest text-primary font-semibold mb-3">Fictional learning example</p>
            <h2 className="font-serif text-3xl text-slate-purple mb-4">From notes to a thematic synthesis paragraph</h2>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed mb-5">
              This is a fictional learning example. The studies, authors, findings, and citations below are invented for practice; they are not real evidence and must not be submitted as research sources.
            </p>
            <div className="grid lg:grid-cols-3 gap-4 mb-5">
              {[
                ["Study A", "Weekly planning was associated with self-reported assignment completion among first-year students."],
                ["Study B", "Calendar reminders helped students notice deadlines, but the study did not measure completed work."],
                ["Study C", "Interview participants described planning as useful when they could adapt routines around paid work."],
              ].map(([label, note]) => (
                <div key={label} className="rounded-xl bg-white/80 border border-white p-4">
                  <p className="font-sans text-xs font-semibold text-primary mb-2">{label} — fictional note</p>
                  <p className="font-sans text-sm text-foreground/80 leading-relaxed">{note}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl bg-white border border-primary/15 p-5">
              <p className="font-sans text-xs font-semibold uppercase tracking-wider text-primary mb-3">Thematic synthesis paragraph</p>
              <p className="font-sans text-sm text-foreground/80 leading-relaxed">
                Across the fictional studies, planning tools appear most useful when they make upcoming deadlines visible and fit into students&apos; existing routines. Study A links frequent planning with self-reported completion, while Study B narrows the possible mechanism to noticing deadlines rather than demonstrating completed work. Study C further suggests that routine flexibility may shape whether students use planning consistently. Together, these findings point to a need for research that examines completion outcomes alongside students&apos; work schedules rather than treating planning as a uniform practice (Fictional Author, year).
              </p>
            </div>
            <p className="mt-4 text-sm font-sans text-muted-foreground leading-relaxed">
              The paragraph begins with a theme, compares sources, identifies a limit in the pattern, and ends with a cautious next question. It does not announce one source after another or claim that the fictional evidence proves causation.
            </p>
          </section>

          <section className="mt-8 grid lg:grid-cols-2 gap-6">
            <article className="p-7 bg-white border border-border rounded-2xl">
              <h2 className="font-serif text-3xl text-slate-purple mb-4">A simple thematic outline</h2>
              <ol className="space-y-4 text-sm text-muted-foreground font-sans leading-relaxed list-decimal pl-5">
                <li>Define the review&apos;s topic, scope, and organizing principle.</li>
                <li>Introduce the first theme with your own point, then compare relevant sources.</li>
                <li>Move to the next theme or methodological difference, reusing a source when it belongs in more than one conversation.</li>
                <li>Conclude with what the pattern establishes, where evidence remains limited, and how that matters for the next question.</li>
              </ol>
            </article>
            <article className="p-7 bg-white border border-border rounded-2xl">
              <h2 className="font-serif text-3xl text-slate-purple mb-4">Check your research-gap wording</h2>
              <ul className="space-y-3 text-sm text-muted-foreground font-sans leading-relaxed">
                {[
                  "Does the gap describe the limits of the sources you actually reviewed?",
                  "Have you named a population, setting, method, outcome, or disagreement that makes the next question focused?",
                  "Have you avoided saying ‘no studies exist’ unless your search process can support that very strong claim?",
                  "Does your next question follow logically from the synthesis rather than from a topic you simply prefer?",
                ].map(item => <li key={item} className="flex gap-3"><CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />{item}</li>)}
              </ul>
            </article>
          </section>

          <section className="mt-8 p-7 bg-white border border-border rounded-2xl">
            <h2 className="font-serif text-3xl text-slate-purple mb-3">Use writing-center guidance, then follow your assignment</h2>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed">
              The <a className="text-primary underline underline-offset-4" href={SOURCE.gmu} target="_blank" rel="noreferrer">George Mason University Writing Center</a> explains that a literature review should synthesize rather than sequence summaries, and recommends organizing by shared themes or approaches. The <a className="text-primary underline underline-offset-4" href={SOURCE.unc} target="_blank" rel="noreferrer">UNC Writing Center</a> likewise distinguishes summary from synthesis and describes thematic, chronological, and methodological structures. Johns Hopkins Libraries notes that a synthesis matrix can help writers see relationships among sources and themes. Your instructor or discipline may use a different review type or evidence standard.
            </p>
          </section>

          <section className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/literature-review-synthesis-matrix" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Build a synthesis matrix</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Sort source notes by theme before drafting the paragraph.</p></article></Link>
            <Link href="/research-gap-examples" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">State a research gap</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Check whether a limit is supportable, meaningful, and feasible before writing the rationale.</p></article></Link>
            <Link href="/research-question-examples" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Refine the next question</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Turn a cautiously identified limit into a focused research question.</p></article></Link>
            <Link href="/phrases/introduction" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Use literature review phrases</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Adapt careful language for contrasts, patterns, and research gaps.</p></article></Link>
          </section>

          <div className="text-center mt-10">
            <Button asChild className="bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90"><Link href="/polish">Polish a literature review draft <ArrowRight size={16} className="ml-2" /></Link></Button>
          </div>
        </div>
      </main>
    </>
  );
}
