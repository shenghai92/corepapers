import { Link } from "wouter";
import {
  ArrowRight,
  CheckCircle2,
  Equal,
  Scale,
  SearchCheck,
  ShieldCheck,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";

const HEDGE_TYPES = [
  ["Probability and possibility", "Use modals and probability language when evidence supports a possible pattern rather than a guaranteed outcome: may, might, could, likely, or possibly."],
  ["Scope and frequency", "Name who, when, where, or how often a claim applies. Quantifiers and frequency words such as some, many, often, generally, or in this sample reduce an unsupported universal statement."],
  ["Interpretive distance", "Use reporting and interpretive language to show what evidence or authors support: suggests, appears to indicate, is consistent with, or may reflect."],
  ["Limits and conditions", "State the boundary that affects interpretation: based on the available data, within the studies reviewed, under these conditions, or for this defined population."],
] as const;

export default function HedgingLanguageGuide() {
  return (
    <>
      <SEOHead
        title="Hedging Language in Academic Writing: Examples and Guide"
        description="Use hedging language in academic writing to match claims to evidence. Learn cautious academic phrases, fictional examples, revision checks, and when not to hedge."
        keywords="hedging language academic writing, hedging examples academic writing, cautious language academic writing, academic hedging phrases, how to hedge academic claims"
        canonical="/hedging-language-academic-writing/"
      />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container max-w-5xl">
          <header className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-sans font-medium mb-4"><Scale size={14} /> Academic English and evidence</div>
            <h1 className="font-serif font-light text-4xl sm:text-5xl text-slate-purple mb-4 leading-tight">Hedging language in academic writing: <span className="italic">match your claim to your evidence</span></h1>
            <p className="text-muted-foreground font-sans leading-relaxed text-lg">Hedging is cautious language that helps readers see the degree of certainty your evidence supports. It is not decoration, an apology for having an argument, or a substitute for stronger evidence.</p>
          </header>

          <section className="p-7 bg-white border border-border rounded-2xl">
            <h2 className="font-serif text-3xl text-slate-purple mb-3">Good hedging makes an argument more precise, not less confident</h2>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed">Academic claims are usually open to review, qualification, and revision. A carefully chosen hedge can prevent a writer from treating a tendency as a rule, an association as causation, a finding in one setting as a result for every setting, or an interpretation as a fact. The right level of caution depends on the evidence, research design, source quality, disciplinary convention, and exact claim—not on a rule that every sentence must sound uncertain.</p>
          </section>

          <section className="mt-6 grid md:grid-cols-2 gap-5">
            {HEDGE_TYPES.map(([title, copy]) => <article key={title} className="p-6 bg-white border border-border rounded-2xl"><ShieldCheck size={22} className="text-primary mb-4" /><h2 className="font-serif text-2xl text-slate-purple mb-2">{title}</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">{copy}</p></article>)}
          </section>

          <section className="mt-8 grid lg:grid-cols-2 gap-6">
            <article className="p-7 bg-hero-gradient border border-border rounded-2xl">
              <p className="text-xs font-sans uppercase tracking-widest text-primary font-semibold mb-3">Diagnose before you replace words</p>
              <h2 className="font-serif text-3xl text-slate-purple mb-4">Four questions for a claim</h2>
              <ul className="space-y-3 text-sm font-sans text-muted-foreground leading-relaxed">
                {["What exactly does the evidence show: a description, association, difference, mechanism, evaluation, or causal effect?", "What population, period, setting, method, source base, or condition bounds the claim?", "Could a reasonable reader point to exceptions, alternative explanations, missing data, or a conflicting source?", "Would a narrower noun, verb, quantity, comparison, or source attribution make the claim more accurate before you add a hedge?"] .map(item => <li key={item} className="flex gap-3"><CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />{item}</li>)}
              </ul>
            </article>
            <article className="p-7 bg-white border border-border rounded-2xl">
              <p className="text-xs font-sans uppercase tracking-widest text-primary font-semibold mb-3">Useful language resources</p>
              <h2 className="font-serif text-3xl text-slate-purple mb-4">Choose the function before the phrase</h2>
              <div className="space-y-3 text-sm font-sans text-muted-foreground leading-relaxed"><p><strong>Possible explanation:</strong> may reflect, could be associated with, might be explained by.</p><p><strong>Evidence-led interpretation:</strong> suggests, appears to indicate, is consistent with, points to.</p><p><strong>Frequency or scope:</strong> often, generally, in some cases, among the participants surveyed, within the studies reviewed.</p><p><strong>Careful comparison:</strong> differs from, may extend, partly aligns with, offers one account of.</p><p><strong>Bounded implication:</strong> may inform, warrants further examination, provides a basis for, should be interpreted in light of.</p></div>
            </article>
          </section>

          <section className="mt-8 p-7 bg-hero-gradient border border-border rounded-2xl">
            <p className="text-xs font-sans uppercase tracking-widest text-primary font-semibold mb-3">Fictional learning example</p>
            <h2 className="font-serif text-3xl text-slate-purple mb-4">Revise the logic as well as the wording</h2>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed mb-5">This fictional learning example is invented for practice. The study, sample, evidence, finding, citation, and revision below are not real research and must not be used as a source or submitted as evidence.</p>
            <div className="grid lg:grid-cols-3 gap-4"><article className="rounded-xl bg-white/80 border border-white p-5"><p className="font-sans text-xs font-semibold text-primary mb-2">Overstated fictional claim</p><p className="font-sans text-sm text-foreground/80 leading-relaxed">“Weekly planning causes all first-year students to complete more assignments.”</p></article><article className="rounded-xl bg-white/80 border border-white p-5"><p className="font-sans text-xs font-semibold text-primary mb-2">What needs checking</p><p className="font-sans text-sm text-foreground/80 leading-relaxed">A fictional cross-sectional self-report study cannot establish causation, may not include every student, and may be affected by workload, course design, or prior habits.</p></article><article className="rounded-xl bg-white/80 border border-white p-5"><p className="font-sans text-xs font-semibold text-primary mb-2">Better matched claim</p><p className="font-sans text-sm text-foreground/80 leading-relaxed">“In this fictional sample, frequent weekly planning was associated with higher self-reported assignment completion and may warrant further investigation.”</p></article></div>
            <p className="mt-5 text-sm font-sans text-muted-foreground leading-relaxed">The revision narrows the population, describes an association rather than a cause, and keeps the implication proportionate. It does not merely swap “causes” for “may cause”; it changes the claim to fit the fictional design.</p>
          </section>

          <section className="mt-8 grid lg:grid-cols-2 gap-6">
            <article className="p-7 bg-white border border-border rounded-2xl"><Equal size={22} className="text-primary mb-4" /><h2 className="font-serif text-3xl text-slate-purple mb-4">Do not hedge every sentence</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Understating a well-supported, carefully defined point can make a paragraph vague and difficult to evaluate. You do not need a hedge for a direct description of your own method, a clearly reported result, a definition you have accurately sourced, or a statement whose strength the evidence fully supports. Decide what the sentence is doing, then choose the level of certainty that lets a reader assess it fairly.</p></article>
            <article className="p-7 bg-white border border-border rounded-2xl"><SearchCheck size={22} className="text-primary mb-4" /><h2 className="font-serif text-3xl text-slate-purple mb-4">Common revision mistakes</h2><ul className="space-y-3 text-sm font-sans text-muted-foreground leading-relaxed"><li><strong>Adding “may” without fixing scope:</strong> name the sample, context, or source base when it matters.</li><li><strong>Hedging an uncited claim:</strong> caution does not replace evidence or attribution.</li><li><strong>Using several hedges together:</strong> “may possibly seem to suggest” often hides the point instead of qualifying it.</li><li><strong>Using vague boosters:</strong> words such as “clearly” or “undeniably” cannot substitute for an explanation of the evidence.</li><li><strong>Copying phrase patterns:</strong> adapt any phrase to the evidence, voice, tense, and terminology of your discipline.</li></ul></article>
          </section>

          <section className="mt-8 p-7 bg-white border border-border rounded-2xl">
            <h2 className="font-serif text-3xl text-slate-purple mb-3">Use university guidance and your discipline&apos;s conventions</h2>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed"><a className="text-primary underline underline-offset-4" href="https://writingcenter.gmu.edu/writing-resources/research-based-writing/hedges-softening-claims-in-academic-writing" target="_blank" rel="noreferrer">George Mason University Writing Center</a> explains how verbs, modals, adjectives, adverbs, quantities, and source-distance expressions can soften a claim that would otherwise be overconfident. <a className="text-primary underline underline-offset-4" href="https://owl.purdue.edu/owl/multilingual/multilingual_students/tips_for_writing_in_north_american_colleges/reasonability.html" target="_blank" rel="noreferrer">Purdue OWL</a> frames hedging as a way to express an appropriate, often medium level of certainty rather than a fixed formula. <a className="text-primary underline underline-offset-4" href="https://students.unimelb.edu.au/academic-skills/reading-writing-and-referencing/writing-effectively/academic-style" target="_blank" rel="noreferrer">University of Melbourne</a> connects hedging with precise academic style, while <a className="text-primary underline underline-offset-4" href="https://www.bristol.ac.uk/academic-language/media/BEAP/5.4/index.html" target="_blank" rel="noreferrer">University of Bristol&apos;s BEAP resource</a> illustrates grammar patterns for expressing uncertainty. Follow the conventions of your course, discipline, or target journal where they differ.</p>
          </section>

          <section className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/academic-english-for-esl-students" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Academic English hub</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Review clarity, literal translation, and sentence-level academic style.</p></article></Link>
            <Link href="/academic-argument-evidence" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Match claim and evidence</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Use an evidence-led paragraph framework before polishing the language.</p></article></Link>
            <Link href="/how-to-write-discussion-section" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Write a discussion</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Interpret findings and limitations without overreaching.</p></article></Link>
            <Link href="/phrases/discussion" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Use discussion phrases</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Adapt language for interpretations, comparisons, and implications.</p></article></Link>
          </section>
          <div className="text-center mt-10"><Button asChild className="bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90"><Link href="/polish">Polish a cautious claim <ArrowRight size={16} className="ml-2" /></Link></Button></div>
        </div>
      </main>
    </>
  );
}
