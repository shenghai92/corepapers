import { Link } from "wouter";

const FOOTER_LINKS = {
  Tools: [
    { label: "Essay Polish", href: "/polish" },
    { label: "Phrase Library", href: "/phrases" },
    { label: "Citation Generator", href: "/citations" },
  ],
  Resources: [
    { label: "Blog", href: "/blog" },
    { label: "APA Guide", href: "/blog/complete-apa-7th-edition-guide-international-students" },
    { label: "ESL Writing Tips", href: "/blog/how-to-avoid-common-esl-writing-mistakes" },
    { label: "Academic Phrases", href: "/phrases" },
  ],
  Company: [
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
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
                <span className="text-white font-serif font-semibold text-sm">C</span>
              </div>
              <span className="font-serif font-medium text-xl text-slate-purple">CorePapers</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              The academic writing assistant built for non-native English speakers. Write with confidence, cite with precision.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Support: <a className="text-primary underline" href="mailto:support@corepapers.space">support@corepapers.space</a>
            </p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-xs font-sans font-semibold tracking-widest uppercase text-muted-foreground mb-4">
                {section}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
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
            <span className="deco-bracket">Built for international students worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
