import { Link } from "wouter";
import { ArrowRight, CheckCircle2, FileSearch, GitCompareArrows, Waypoints } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";

export default function MethodologyVsMethods() {
  return (
    <>
      <SEOHead
        title="Methodology vs. Methods in a Research Paper: Definition and Example"
        description="Learn the difference between methodology and methods in a research paper, what belongs in a methods section, and how to explain a rationale without reporting results too early."
        keywords="methodology vs methods research paper, what is methodology section, methods section research paper example, research paper methodology format"
        canonical="/methodology-vs-methods-research-paper/"
      />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container max-w-5xl">
          <header className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-sans font-medium mb-4"><GitCompareArrows size={14} /> Research methods guide</div>
            <h1 className="font-serif font-light text-4xl sm:text-5xl text-slate-purple mb-4 leading-tight">Methodology vs. methods in a <span className="italic">research paper</span></h1>
            <p className="text-muted-foreground font-sans leading-relaxed text-lg">Learn what each term means, what readers need to know about your design, and how to keep procedures, rationale, and results in their proper places.</p>
          </header>

          <section className="grid md:grid-cols-2 gap-6">
            <article className="p-7 bg-white border border-border rounded-2xl">
              <Waypoints size={24} className="text-primary mb-4" />
              <h2 className="font-serif text-3xl text-slate-purple mb-3">Methods: what you did</h2>
              <p className="text-sm font-sans text-muted-foreground leading-relaxed">Methods are the concrete procedures used to investigate a question. Depending on the study, this may include participants or data sources, materials, sampling, data collection, measures, analytical steps, and any relevant ethical procedure.</p>
            </article>
            <article className="p-7 bg-white border border-border rounded-2xl">
              <FileSearch size={24} className="text-primary mb-4" />
              <h2 className="font-serif text-3xl text-slate-purple mb-3">Methodology: why this approach fits</h2>
              <p className="text-sm font-sans text-muted-foreground leading-relaxed">Methodology explains the reasoning for a research approach and the relationship between a research problem, design, assumptions, and chosen methods. In some assignments, the term “methodology section” includes both rationale and procedures; follow the required convention in your course or field.</p>
            </article>
          </section>

          <section className="mt-8 p-7 bg-white border border-border rounded-2xl" aria-labelledby="methodology-methods-process-title"><p className="text-xs font-sans font-semibold tracking-widest uppercase text-primary mb-3">Methods planning workflow</p><h2 id="methodology-methods-process-title" className="font-serif text-3xl text-slate-purple mb-5">Make the design, procedure, and rationale traceable</h2><div className="grid sm:grid-cols-2 gap-4">{[["1. Confirm the section task and convention","Check the prompt, field, journal, supervisor, and project stage. Some disciplines use “methodology” for the whole section, while others separate methodological rationale from concrete methods."],["2. Re-state the question and design boundary","Write the precise question, objective, analytical focus, and study design. The design must be capable of addressing the question; do not label a study qualitative, quantitative, mixed, experimental, archival, or interpretive simply because the term sounds appropriate."],["3. Identify materials, data, participants, or cases","State what was or will be examined, relevant setting and eligibility, where materials came from, how they were selected, and what record makes the scope verifiable."],["4. Describe the procedure chronologically","Explain collection, generation, extraction, observation, recruitment, measurement, coding, or document-handling steps in the order readers need to understand the evidence path."],["5. Explain the analysis path","Name how information was prepared and analyzed, what patterns, comparisons, relationships, interpretations, or uncertainties the approach can address, and what it cannot establish."],["6. Give a proportionate rationale","Show why design, materials, procedure, and analysis fit the problem. Cite methodological sources when they actually informed a choice; a task list or bibliography is not a rationale."],["7. State limitations and ethics honestly","Address access, sampling, missing material, researcher role, privacy, consent, risk, permissions, approval requirements, and limits on transferability, representation, or causal claims as relevant."],["8. Separate method from results and reverse-check","Confirm the section does not report findings or interpretations reserved for Results or Discussion, and check that every procedure, data source, analysis claim, citation, and ethics statement is accurate for the actual project."]].map(([title, copy], index) => <article key={title} className="rounded-xl bg-muted/50 p-5"><p className="text-xs font-sans font-semibold text-primary mb-2">STEP {index + 1}</p><h3 className="font-serif text-xl text-slate-purple mb-2">{title}</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">{copy}</p></article>)}</div><p className="mt-5 text-sm font-sans text-muted-foreground leading-relaxed">A fictional method model helps you see relationships among choices, but it cannot provide a real design, participant pool, data record, permission, ethics approval, analysis, or research finding for your project.</p></section>

          <section className="mt-8 p-7 bg-hero-gradient border border-border rounded-2xl">
            <h2 className="font-serif text-3xl text-slate-purple mb-5">What a reader usually needs from a methods or methodology section</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                ["Research design", "State the qualitative, quantitative, mixed-methods, archival, experimental, or other approach only as it accurately describes the study."],
                ["Data or participants", "Explain what was studied, how it was selected, and any relevant setting, inclusion criteria, or source characteristics."],
                ["Collection or generation", "Describe surveys, interviews, observations, documents, measurements, datasets, or other procedures clearly enough for readers to understand the evidence base."],
                ["Analysis", "Name how information was processed or analyzed and why that process addresses the research question."],
                ["Rationale", "Explain why the approach is appropriate when readers may not see the connection directly or when a method is not conventional for the topic."],
                ["Limitations and ethics", "Acknowledge practical limits, relevant safeguards, and the scope of claims the design can support when the assignment expects them."],
              ].map(([title, copy]) => <article key={title} className="rounded-xl bg-white/80 border border-white p-5"><h3 className="font-serif text-xl text-slate-purple mb-2">{title}</h3><p className="text-sm font-sans text-muted-foreground leading-relaxed">{copy}</p></article>)}
            </div>
          </section>

          <section className="mt-8 grid lg:grid-cols-2 gap-6">
            <article className="p-7 bg-white border border-border rounded-2xl">
              <p className="text-xs font-sans uppercase tracking-widest text-primary font-semibold mb-3">Fictional learning example</p>
              <h2 className="font-serif text-3xl text-slate-purple mb-4">Methods description and rationale</h2>
              <p className="text-sm font-sans text-muted-foreground leading-relaxed"><strong className="text-foreground">This fictional learning example is invented for practice; it is not real research, a participant pool, source record, permission, ethics approval, analysis, finding, or template to submit.</strong> A fictional study used semi-structured interviews with first-year students to explore how they described adapting weekly planning routines around paid work. Fictional interviews were transcribed and analyzed thematically. The qualitative design was selected because the fictional question concerned participants&apos; accounts of routine adjustment rather than measuring association size. The example describes procedure and limited rationale; it does not report themes or interpret findings.</p>
            </article>
            <article className="p-7 bg-white border border-border rounded-2xl">
              <h2 className="font-serif text-3xl text-slate-purple mb-4">Keep these distinctions clear</h2>
              <ul className="space-y-3 text-sm font-sans text-muted-foreground leading-relaxed">
                {["Do not turn the Methods section into a literature review unless a methodological source is needed to justify the choice.", "Do not report findings, themes, or interpretations before the Results or Discussion section when your discipline separates these functions.", "Do not describe a procedure as replicable unless you provide the detail and transparency your field expects.", "Do not claim that a design establishes causation, representation, or generalisability unless the evidence and sampling justify that claim."].map(item => <li key={item} className="flex gap-3"><CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />{item}</li>)}
              </ul>
            </article>
          </section>

          <section className="mt-8 p-7 bg-white border border-border rounded-2xl">
            <h2 className="font-serif text-3xl text-slate-purple mb-3">Use a discipline-aware definition</h2>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed">USC Libraries explains that a methods section describes actions taken to investigate a problem and the rationale for procedures used to obtain and analyze information. Its guide distinguishes methods as technical research steps from methodology as the underlying reasoning for why particular methods were chosen. Requirements differ across empirical, qualitative, humanities, proposal, and thesis writing, so the course guide, journal, or supervisor remains the controlling source.</p>
            <p className="mt-4 text-sm font-sans"><a className="text-primary underline underline-offset-4" href="https://libguides.usc.edu/writingguide/methodology" target="_blank" rel="noreferrer">Read USC Libraries methodology guidance</a></p>
          </section>

          <section className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/methodology-section-example-research-paper" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Use a Methods example</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Plan design, participants, collection, analysis, and limitations with a fictional section example.</p></article></Link>
            <Link href="/phrases/methods" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Find Methods phrases</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Adapt sentence starters for design, sampling, data collection, and analysis.</p></article></Link>
            <Link href="/results-section-example-research-paper" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Separate Results</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Report what the data shows before interpreting what it means.</p></article></Link><Link href="/research-question-examples" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Check the research question</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Make sure the proposed design, data, and analysis can answer a focused and feasible question.</p></article></Link><Link href="/research-proposal-template" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Plan a feasible proposal</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Test access, timeline, skills, permissions, ethics, and a proportionate anticipated contribution.</p></article></Link><Link href="/academic-integrity-and-source-use" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Keep method sources traceable</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Distinguish methodological support, study materials, procedures, your analysis, and source attribution.</p></article></Link><Link href="/citations" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Verify method citations</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Generate a formatting draft only after checking the original method source and required citation system.</p></article></Link></section>
          <div className="text-center mt-10"><Button asChild className="bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90"><Link href="/polish">Polish a Methods draft <ArrowRight size={16} className="ml-2" /></Link></Button></div>
        </div>
      </main>
    </>
  );
}
