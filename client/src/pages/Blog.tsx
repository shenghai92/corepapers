import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import SEOHead from "@/components/SEOHead";
import { Clock, ArrowRight, BookOpen, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const SEED_ARTICLES = [
  {
    slug: "how-to-avoid-common-esl-writing-mistakes",
    title: "How to Avoid the 10 Most Common ESL Writing Mistakes in Academic Papers",
    excerpt: "Non-native English speakers often repeat the same writing patterns that signal to professors they are not native speakers. Learn how to identify and fix these patterns to improve your academic writing.",
    category: "Writing Tips",
    tags: ["ESL", "Academic Writing", "Common Mistakes"],
    readingTime: 8,
    publishedAt: "2024-01-15",
    featured: true,
  },
  {
    slug: "complete-apa-7th-edition-guide-international-students",
    title: "Complete APA 7th Edition Guide for International Students (2024)",
    excerpt: "A practical step-by-step guide to APA 7th edition formatting for non-native English speakers, with common mistakes and citation examples.",
    category: "Citation Guides",
    tags: ["APA", "Citation", "Formatting"],
    readingTime: 12,
    publishedAt: "2024-01-20",
    featured: true,
  },
];

export default function Blog() {
  const { data: dbPosts } = trpc.blog.list.useQuery({ limit: 20, offset: 0 });

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
  const formatDate = (value: string) =>
    value
      ? new Date(value).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "";

  return (
    <>
      <SEOHead
        title="Academic Writing Blog for International Students"
        description="Read academic writing guides, citation tutorials, and ESL-friendly resources for international students. Learn APA, MLA, Chicago formatting and improve academic English."
        keywords="academic writing blog, international student writing tips, ESL writing guide, APA format guide, academic English help, avoid common ESL writing mistakes"
        canonical="/blog"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "CorePapers Academic Writing Blog",
          description: "Academic writing guides for international students",
          url: "https://corepapers.space/blog",
          blogPost: allArticles.slice(0, 6).map((article) => ({
            "@type": "BlogPosting",
            headline: article.title,
            url: `https://corepapers.space/blog/${article.slug}`,
          })),
        }}
      />

      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-sans font-medium mb-4">
              <BookOpen size={13} />
              Academic Writing Resources
            </div>
            <h1 className="font-serif font-light text-4xl sm:text-5xl text-slate-purple mb-4">
              Write better,
              <span className="italic"> study smarter</span>
            </h1>
            <p className="text-muted-foreground font-sans max-w-xl mx-auto leading-relaxed">
              Free guides, tutorials, and practical advice for international students navigating English academic writing.
            </p>
          </div>

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
                        {article.publishedAt && (
                          <span className="text-xs text-muted-foreground font-sans">{formatDate(article.publishedAt)}</span>
                        )}
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
                      {article.publishedAt && (
                        <span className="text-xs text-muted-foreground font-sans">{formatDate(article.publishedAt)}</span>
                      )}
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
        </div>
      </main>
    </>
  );
}
