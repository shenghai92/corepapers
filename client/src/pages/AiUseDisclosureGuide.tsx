import { Link } from "wouter";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  FileCheck2,
  LockKeyhole,
  Scale,
  SearchCheck,
  ShieldCheck,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";

const DISCLOSURE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "AI Use Disclosure in Academic Writing: A Responsible Workflow",
  description:
    "A practical guide for international students and researchers on checking local AI rules, protecting private material, verifying sources, and documenting permitted AI-assisted writing.",
  mainEntityOfPage: "https://corepapers.space/ai-use-disclosure-academic-writing/",
  author: { "@type": "Organization", name: "CorePapers" },
  publisher: { "@type": "Organization", name: "CorePapers" },
};

const WORKFLOW = [
  {
    step: "01",
    title: "Read the local rule first",
    text: "Check the assignment brief, syllabus, department guidance, supervisor instructions, journal policy, and disclosure requirement. A permitted use in one course or venue may be prohibited in another.",
  },
  {
    step: "02",
    title: "Classify the task",
    text: "Separate limited editing, brainstorming, outlining, translation support, source discovery, data analysis, and text generation. Do not treat every tool interaction as the same kind of assistance.",
  },
  {
    step: "03",
    title: "Protect private material",
    text: "Do not upload confidential research data, identifiable participant information, unpublished manuscripts, grant material, peer-review content, or proprietary work unless the relevant policy and tool terms permit it.",
  },
  {
    step: "04",
    title: "Keep source work human-led",
    text: "Find and read original sources yourself. Treat an AI-suggested citation, quotation, claim, or statistic as unverified until you locate the actual source and check it in context.",
  },
  {
    step: "05",
    title: "Draft your accountable argument",
    text: "Write the reasoning, evidence selection, interpretation, and conclusion you can explain. A fluent sentence is not evidence that an argument, method, result, or reference is accurate.",
  },
  {
    step: "06",
    title: "Review every changed claim",
    text: "Compare suggestions with your draft, source record, data, and assignment. Check meaning, discipline-specific terminology, citations, quotations, numbers, causal language, and any new implication.",
  },
  {
    step: "07",
    title: "Document permitted material use",
    text: "When a course, institution, publisher, or funder requires it, record the tool, purpose, scope, date or version when relevant, and the human review you performed. Follow its required location and format.",
  },
  {
    step: "08",
    title: "Submit only work you can defend",
    text: "Re-read the final submission with the policy beside you. You remain responsible for accuracy, source use, disclosure, privacy, and the work submitted under your name.",
  },
] as const;

export default function AiUseDisclosureGuide() {
  return (
    <>
      <SEOHead
        title="AI Use Disclosure in Academic Writing: Responsible Guide"
        description="Learn how to disclose permitted AI use in academic writing. Follow an eight-step workflow for course policy, privacy, source checks, human review, and responsible submission."
        keywords="AI use disclosure academic writing, disclose AI use assignment, responsible AI academic writing, AI policy international students, AI writing academic integrity"
        canonical="/ai-use-disclosure-academic-writing/"
        jsonLd={DISCLOSURE_SCHEMA}
      />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container max-w-5xl">
          <header className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-sans font-medium mb-4">
              <ShieldCheck size={14} /> Academic integrity and transparent process
            </div>
            <h1 className="font-serif font-light text-4xl sm:text-5xl text-slate-purple mb-4 leading-tight">
              AI use disclosure in academic writing: <span className="italic">keep the author accountable</span>
            </h1>
            <p className="text-muted-foreground font-sans leading-relaxed text-lg">
              Use this guide to decide what your course, institution, journal, or supervisor permits; protect private material; verify every source; and document any permitted material assistance honestly.
            </p>
          </header>

          <section className="p-7 bg-white border border-border rounded-2xl">
            <h2 className="font-serif text-3xl text-slate-purple mb-3">Disclosure is not a universal template</h2>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed">
              Rules vary by discipline, assignment, institution, publisher, and the kind of assistance involved. A grammar suggestion, an outline idea, a translated phrase, an AI-generated paragraph, and an AI-suggested source raise different questions. Start with the most local rule that applies, then use this page to make your process traceable rather than assuming a general web rule will govern your work.
            </p>
          </section>

          <section className="mt-8 p-7 bg-hero-gradient border border-border rounded-2xl">
            <p className="text-xs font-sans uppercase tracking-widest text-primary font-semibold mb-3">Researcher-first workflow</p>
            <h2 className="font-serif text-3xl text-slate-purple mb-5">An eight-step AI use and disclosure workflow</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {WORKFLOW.map((item) => (
                <article key={item.step} className="rounded-xl bg-white/80 border border-white p-5">
                  <p className="text-xs font-sans font-semibold text-primary mb-2">STEP {item.step}</p>
                  <h3 className="font-serif text-xl text-slate-purple mb-2">{item.title}</h3>
                  <p className="text-sm font-sans text-muted-foreground leading-relaxed">{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-8 grid lg:grid-cols-3 gap-5">
            <article className="p-6 bg-white border border-border rounded-2xl">
              <LockKeyhole size={22} className="text-primary mb-4" />
              <h2 className="font-serif text-2xl text-slate-purple mb-2">Privacy is a research decision</h2>
              <p className="text-sm font-sans text-muted-foreground leading-relaxed">Do not paste identifiable data, confidential feedback, unpublished analysis, a colleague&apos;s manuscript, or a reviewer&apos;s material into a public tool merely because the text is easy to copy.</p>
            </article>
            <article className="p-6 bg-white border border-border rounded-2xl">
              <SearchCheck size={22} className="text-primary mb-4" />
              <h2 className="font-serif text-2xl text-slate-purple mb-2">A citation is not verified evidence</h2>
              <p className="text-sm font-sans text-muted-foreground leading-relaxed">Locate the original publication, author, date, title, page or section, and surrounding context before using a claim. Never cite an invented or unlocated source.</p>
            </article>
            <article className="p-6 bg-white border border-border rounded-2xl">
              <BadgeCheck size={22} className="text-primary mb-4" />
              <h2 className="font-serif text-2xl text-slate-purple mb-2">Editing does not transfer responsibility</h2>
              <p className="text-sm font-sans text-muted-foreground leading-relaxed">Language support may help you inspect clarity, but it cannot approve your method, interpret your data, select your evidence, or take responsibility for the submitted work.</p>
            </article>
          </section>

          <section className="mt-8 p-7 bg-hero-gradient border border-border rounded-2xl">
            <p className="text-xs font-sans uppercase tracking-widest text-primary font-semibold mb-3">Fictional learning example</p>
            <h2 className="font-serif text-3xl text-slate-purple mb-4">Make the record match the permitted use</h2>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed mb-5"><strong>This fictional learning example is invented for practice; it is not a course policy, student submission, research record, or wording to reuse unchanged.</strong> A fictional student checks an instructor&apos;s guidance, which permits language-level editing after the student has drafted the paragraph but requires a short process note. The student removes invented references from a tool suggestion, checks the two real articles in the library database, revises the paragraph independently, and records the permitted editing support in the format the instructor requested. The example does not assume that another course, school, journal, or supervisor permits the same process.</p>
            <div className="grid md:grid-cols-3 gap-4">
              <article className="rounded-xl bg-white/80 border border-white p-5"><p className="font-sans text-xs font-semibold text-primary mb-2">Not enough</p><p className="font-sans text-sm text-foreground/80 leading-relaxed">“The tool gave me two citations, so I added them.”</p></article>
              <article className="rounded-xl bg-white/80 border border-white p-5"><p className="font-sans text-xs font-semibold text-primary mb-2">What the student checks</p><p className="font-sans text-sm text-foreground/80 leading-relaxed">Local permission, privacy of the draft, original source details, claim accuracy, and required disclosure language.</p></article>
              <article className="rounded-xl bg-white/80 border border-white p-5"><p className="font-sans text-xs font-semibold text-primary mb-2">Responsible outcome</p><p className="font-sans text-sm text-foreground/80 leading-relaxed">Only verified sources and author-reviewed writing remain; any permitted material use is described where local rules require it.</p></article>
            </div>
          </section>

          <section className="mt-8 grid lg:grid-cols-2 gap-6">
            <article className="p-7 bg-white border border-border rounded-2xl"><FileCheck2 size={22} className="text-primary mb-4" /><h2 className="font-serif text-3xl text-slate-purple mb-4">A disclosure record can be plain and specific</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">If disclosure is required, describe only what your local rule asks for: the tool, the task it assisted, the scope of use, and your review. Do not invent a declaration format. An instructor may prefer a note in the assignment, while a journal may specify an acknowledgements, methods, cover-letter, or appendix location.</p></article>
            <article className="p-7 bg-white border border-border rounded-2xl"><Scale size={22} className="text-primary mb-4" /><h2 className="font-serif text-3xl text-slate-purple mb-4">What this guide does not do</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">CorePapers does not provide a way to bypass an institution&apos;s AI rule, disguise AI-generated work as student writing, fabricate sources, submit a tool output as research, or replace the judgment of an instructor, editor, advisor, ethics board, or publisher.</p></article>
          </section>

          <section className="mt-8 p-7 bg-white border border-border rounded-2xl">
            <h2 className="font-serif text-3xl text-slate-purple mb-3">Use primary institutional guidance, then follow your local requirement</h2>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed"><a className="text-primary underline underline-offset-4" href="https://libguides.princeton.edu/generativeAI/disclosure" target="_blank" rel="noreferrer">Princeton University Library</a> advises students to confirm that AI is permitted and to disclose use where required. <a className="text-primary underline underline-offset-4" href="https://ai.unc.edu/research-generative-ai-usage-guidance/" target="_blank" rel="noreferrer">University of North Carolina</a> emphasizes that AI output may be inaccurate or fabricated, that private research material requires special care, and that researchers remain accountable for their work. <a className="text-primary underline underline-offset-4" href="https://grad.uw.edu/advice/effective-and-responsible-use-of-ai-in-research/" target="_blank" rel="noreferrer">University of Washington Graduate School</a> explains why graduate researchers should follow program, instructor, and publisher expectations while independently verifying material. These sources are guidance, not a substitute for your own local rule.</p>
          </section>

          <section className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/academic-integrity-and-source-use" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><BookOpenCheck size={20} className="text-primary mb-3" /><h2 className="font-serif text-2xl text-slate-purple mb-2">Protect source use</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Review attribution, paraphrasing, and academic integrity before editing language.</p></article></Link>
            <Link href="/citations" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Verify citations</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Build references from original source details, then check the format.</p></article></Link>
            <Link href="/academic-paraphrasing-tool-for-esl-students" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Revise responsibly</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">Use language support after you understand and keep control of your source-based meaning.</p></article></Link>
            <Link href="/how-corepapers-content-is-created" className="block"><article className="h-full p-6 bg-hero-gradient border border-border rounded-2xl hover:border-primary/30"><h2 className="font-serif text-2xl text-slate-purple mb-2">Read our standards</h2><p className="text-sm font-sans text-muted-foreground leading-relaxed">See how CorePapers creates, checks, and updates educational content.</p></article></Link>
          </section>
          <div className="text-center mt-10"><Button asChild className="bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90"><Link href="/polish">Review your own draft after checking <ArrowRight size={16} className="ml-2" /></Link></Button></div>
        </div>
      </main>
    </>
  );
}
