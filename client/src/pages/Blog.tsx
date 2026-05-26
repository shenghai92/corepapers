import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import SEOHead from "@/components/SEOHead";
import { Clock, ArrowRight, BookOpen, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Static seed articles for SEO and AdSense readiness
const SEED_ARTICLES = [
  {
    slug: "how-to-avoid-common-esl-writing-mistakes",
    title: "How to Avoid the 10 Most Common ESL Writing Mistakes in Academic Papers",
    excerpt: "Non-native English speakers often repeat the same writing patterns that signal to professors they're not native speakers. Learn how to identify and fix these patterns to dramatically improve your academic writing.",
    category: "Writing Tips",
    tags: ["ESL", "Academic Writing", "Common Mistakes"],
    readingTime: 8,
    publishedAt: "2024-01-15",
    featured: true,
  },
  {
    slug: "complete-apa-7th-edition-guide-international-students",
    title: "Complete APA 7th Edition Guide for International Students (2024)",
    excerpt: "A comprehensive, step-by-step guide to APA 7th edition formatting for non-native English speakers. Covers in-text citations, reference lists, and common mistakes to avoid.",
    category: "Citation Guides",
    tags: ["APA", "Citation", "Formatting"],
    readingTime: 12,
    publishedAt: "2024-01-20",
    featured: true,
  },
  {
    slug: "chinglish-to-academic-english-transformation-guide",
    title: "From Chinglish to Academic English: A Transformation Guide",
    excerpt: "Chinese students face unique challenges when writing academic English due to structural differences between Chinese and English. This guide identifies the most common Chinglish patterns and how to fix them.",
    category: "Writing Tips",
    tags: ["Chinglish", "Chinese Students", "Academic English"],
    readingTime: 10,
    publishedAt: "2024-01-25",
    featured: false,
  },
  {
    slug: "hedging-language-academic-writing-guide",
    title: "Mastering Hedging Language: How to Express Uncertainty in Academic Writing",
    excerpt: "Hedging is one of the most important — and most misunderstood — features of academic writing. Learn when and how to use hedging language to sound like a native academic writer.",
    category: "Academic Skills",
    tags: ["Hedging", "Academic Tone", "Grammar"],
    readingTime: 7,
    publishedAt: "2024-02-01",
    featured: false,
  },
  {
    slug: "mla-vs-apa-vs-chicago-which-citation-style",
    title: "MLA vs APA vs Chicago: Which Citation Style Should You Use?",
    excerpt: "Confused about which citation format your professor wants? This guide explains when to use APA, MLA, Chicago, and IEEE formats, with examples for each discipline.",
    category: "Citation Guides",
    tags: ["MLA", "APA", "Chicago", "IEEE"],
    readingTime: 6,
    publishedAt: "2024-02-08",
    featured: false,
  },
  {
    slug: "academic-vocabulary-upgrade-guide-international-students",
    title: "Academic Vocabulary Upgrade: 100 Words Every International Student Should Know",
    excerpt: "Expand your academic vocabulary with these 100 essential words from the Academic Word List. Includes usage examples and common non-native substitutions to avoid.",
    category: "Vocabulary",
    tags: ["Vocabulary", "Academic Word List", "ESL"],
    readingTime: 15,
    publishedAt: "2024-02-15",
    featured: false,
  },
];

const CATEGORIES = ["All", "Writing Tips", "Citation Guides", "Academic Skills", "Vocabulary"];

export default function Blog() {
  const { data: dbPosts } = trpc.blog.list.useQuery({ limit: 20, offset: 0 });

  // Merge DB posts with seed articles (DB takes priority)
  const dbSlugs = new Set((dbPosts ?? []).map((p) => p.slug));
  const allArticles = [
    ...(dbPosts ?? []).map((p) => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt ?? "",
      category: p.category ?? "General",
      tags: (p.tags as string[]) ?? [],
      readingTime: p.readingTime ?? 5,
      publishedAt: p.publishedAt ? new Date(p.publishedAt).toISOString().split("T")[0] : "",
      featured: false,
    })),
    ...SEED_ARTICLES.filter((a) => !dbSlugs.has(a.slug)),
  ];

  const featured = allArticles.filter((a) => a.featured);
  const regular = allArticles.filter((a) => !a.featured);

  return (
    <>
      <SEOHead
        title="Academic Writing Blog – Tips for International Students"
        description="Free academic writing guides, citation tutorials, and ESL writing tips for international students. Learn APA, MLA, Chicago formatting and how to write like a native academic."
        keywords="academic writing tips international students, ESL writing guide, APA format guide, how to write academic English, citation style guide, avoid Chinglish"
        canonical="/blog"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "CorePapers Academic Writing Blog",
          description: "Academic writing guides for international students",
          url: "https://corepapers.space/blog",
        }}
      />

      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-sans font-medium mb-4">
              <BookOpen size={13} />
              Academic Writing Resources
            </div>
            <h1 className="font-serif font-light text-4xl sm:text-5xl text-slate-purple mb-4">
              Write Better,
              <span className="italic"> Score Higher</span>
            </h1>
            <p className="text-muted-foreground font-sans max-w-xl mx-auto leading-relaxed">
              Free guides, tutorials, and tips for international students navigating English academic writing.
            </p>
          </div>

          {/* Featured Articles */}
          {featured.length > 0 && (
            <div className="mb-12">
              <p className="text-xs font-sans font-semibold tracking-widest uppercase text-muted-foreground mb-4">Featured Guides</p>
              <div className="grid md:grid-cols-2 gap-6">
                {featured.map((article) => (
                  <Link key={article.slug} href={`/blog/${article.slug}`} className="group block">
                    <div className="h-full p-8 bg-white border border-border rounded-2xl hover:border-primary/30 hover:shadow-soft transition-all">
                      <div className="flex items-center gap-2 mb-4">
                        <Badge variant="secondary" className="text-xs font-sans">{article.category}</Badge>
                        <span className="text-xs text-muted-foreground font-sans flex items-center gap-1">
                          <Clock size={11} /> {article.readingTime} min read
                        </span>
                      </div>
                      <h2 className="font-serif font-medium text-xl text-slate-purple mb-3 group-hover:text-primary transition-colors leading-snug">
                        {article.title}
                      </h2>
                      <p className="text-sm text-muted-foreground font-sans leading-relaxed mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center gap-2 flex-wrap">
                        {article.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-xs text-muted-foreground font-sans flex items-center gap-1">
                            <Tag size={10} /> {tag}
                          </span>
                        ))}
                      </div>
                      <div className="mt-4 text-xs font-sans font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read guide <ArrowRight size={12} />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* All Articles */}
          <div>
            <p className="text-xs font-sans font-semibold tracking-widest uppercase text-muted-foreground mb-4">All Articles</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {regular.map((article) => (
                <Link key={article.slug} href={`/blog/${article.slug}`} className="group block">
                  <div className="h-full p-6 bg-white border border-border rounded-xl hover:border-primary/30 hover:shadow-card transition-all">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary" className="text-xs font-sans">{article.category}</Badge>
                      <span className="text-xs text-muted-foreground font-sans flex items-center gap-1">
                        <Clock size={11} /> {article.readingTime} min
                      </span>
                    </div>
                    <h3 className="font-serif font-medium text-lg text-slate-purple mb-2 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-muted-foreground font-sans leading-relaxed line-clamp-3 mb-3">
                      {article.excerpt}
                    </p>
                    <span className="text-xs font-sans font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read more <ArrowRight size={11} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter CTA */}
          <div className="mt-16 p-8 bg-hero-gradient rounded-2xl text-center">
            <h3 className="font-serif font-light text-2xl text-slate-purple mb-3">
              Get Weekly Writing Tips
            </h3>
            <p className="text-sm text-muted-foreground font-sans mb-6">
              Join 10,000+ international students who receive our weekly academic writing tips.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@university.edu"
                className="flex-1 px-4 py-3 rounded-xl border border-border bg-white font-sans text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button className="px-6 py-3 bg-cta-gradient text-white rounded-xl font-sans text-sm font-medium hover:opacity-90 transition-opacity">
                Subscribe Free
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
