import { Link } from "wouter";

const FOOTER_LINKS = {
  Tools: [
    { label: "Essay Polish", href: "/polish" },
    { label: "Phrase Library", href: "/phrases" },
    { label: "Citation Generator", href: "/citations" },
  ],
  "Research guides": [
    { label: "Research Paper Sections", href: "/research-paper-sections" },
    { label: "Research Paper Revision Checklist", href: "/research-paper-revision-checklist" },
    { label: "Academic English for ESL", href: "/academic-english-for-esl-students" },
    { label: "Literature Review Example", href: "/literature-review-example" },
    { label: "International & Non-English Sources", href: "/international-sources-literature-review" },
    { label: "Research Proposal Template", href: "/research-proposal-template" },
    { label: "Academic Integrity & Sources", href: "/academic-integrity-and-source-use" },
    { label: "Writing Guides & Blog", href: "/blog" },
  ],
  Popular: [
    {
      label: "APA Citation Generator",
      href: "/apa-citation-generator-for-international-students",
    },
    {
      label: "AI Essay Polisher",
      href: "/ai-essay-polisher-for-non-native-english-writers",
    },
    {
      label: "Academic Paraphrasing Tool",
      href: "/academic-paraphrasing-tool-for-esl-students",
    },
    {
      label: "Academic Writing Alternative",
      href: "/academic-writing-alternative-for-international-students",
    },
  ],
  "Standards & support": [
    { label: "AI Use & Disclosure", href: "/ai-use-disclosure-academic-writing" },
    { label: "Editorial Policy", href: "/editorial-policy" },
    { label: "How Content Is Created", href: "/how-corepapers-content-is-created" },
    { label: "About CorePapers", href: "/about" },
    { label: "Contact & Support", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border mt-24">
      <div className="h-1 bg-hero-gradient" />

      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-cta-gradient flex items-center justify-center">
                <span className="text-white font-serif font-semibold text-sm">
                  C
                </span>
              </div>
              <span className="font-serif font-medium text-xl text-slate-purple">
                CorePapers
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Researcher-first academic writing support for multilingual and international students. Build your own argument, verify original sources, and write with precision.
            </p>
            <p className="text-xs text-muted-foreground mt-4 leading-relaxed max-w-sm">
              CorePapers is educational support, not a substitute for your instructor, supervisor, institutional policy, editorial review, or your own authorship and source responsibility.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Support:{" "}
              <a
                className="text-primary underline"
                href="mailto:support@corepapers.space"
              >
                support@corepapers.space
              </a>
            </p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-xs font-sans font-semibold tracking-widest uppercase text-muted-foreground mb-4">
                {section}
              </h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/70 hover:text-primary transition-colors link-underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-sans">
            (c) {new Date().getFullYear()} CorePapers. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span className="deco-bracket">
              Built for international students worldwide · Source-aware · Author-led
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
