import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { trpc } from "@/lib/trpc";

const NAV_LINKS = [
  { label: "Essay Polish", href: "/polish" },
  { label: "Phrase Library", href: "/phrases" },
  { label: "Citation Generator", href: "/citations" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
];

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "zh", label: "中文" },
  { code: "ar", label: "العربية" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState("en");
  const [location] = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-card border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-cta-gradient flex items-center justify-center shadow-soft">
              <span className="text-white font-serif font-semibold text-sm">C</span>
            </div>
            <span className="font-serif font-medium text-xl text-slate-purple tracking-wide">
              CorePapers
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm font-sans font-medium rounded-md transition-colors duration-200 link-underline ${
                  location === link.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1.5 rounded-md hover:bg-secondary">
                  <Globe size={14} />
                  <span>{LANGUAGES.find((l) => l.code === lang)?.label}</span>
                  <ChevronDown size={12} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-36">
                {LANGUAGES.map((l) => (
                  <DropdownMenuItem
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className={lang === l.code ? "text-primary font-medium" : ""}
                  >
                    {l.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors">
                    <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-xs font-medium text-primary">
                      {user?.name?.[0]?.toUpperCase() ?? "U"}
                    </div>
                    <ChevronDown size={12} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">My Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => logout()} className="text-destructive">
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <a
                  href={getLoginUrl()}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sign In
                </a>
                <Button
                  asChild
                  size="sm"
                  className="bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90 transition-opacity"
                >
                  <a href={getLoginUrl()}>Start Free</a>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-border">
          <div className="container py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2.5 text-sm font-medium text-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-border mt-2 pt-3 flex flex-col gap-2">
              {isAuthenticated ? (
                <>
                  <Link href="/dashboard" className="px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary rounded-md">
                    My Dashboard
                  </Link>
                  <button onClick={() => logout()} className="px-3 py-2.5 text-sm font-medium text-destructive text-left hover:bg-secondary rounded-md">
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <a href={getLoginUrl()} className="px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary rounded-md">
                    Sign In
                  </a>
                  <Button asChild className="bg-cta-gradient text-white border-0">
                    <a href={getLoginUrl()}>Start Free</a>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
