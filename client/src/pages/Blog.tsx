import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import SEOHead from "@/components/SEOHead";
import { Clock, ArrowRight, BookOpen, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { STATIC_ARTICLES } from "@/content/blogArticles";

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
    ...STATIC_ARTICLES.filter((a) => !dbSlugs.has(a.slug)),
  ].sort((a, b) => {
    if (!a.publishedAt && !b.publishedAt) return 0;
    if (!a.publishedAt) return 1;
    if (!b.publishedAt) return -1;
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

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
        title="Academic Writing Blog With ESL Essay Help, Citation Guides, and Research Writing Tips"
        description="Read academic writing guides, ESL essay help, sentence starter examples, plagiarism advice, citation tutorials, and research paper tips for international students."
        keywords="academic writing blog, ESL essay help, academic writing tips for international students, research paper writing guide for ESL students, APA 7th edition citation format, how to avoid plagiarism in academic writing, improve academic writing skills"
        canonical="/blog"
        jsonLd={[
          {
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
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "CorePapers blog articles",
            itemListElement: allArticles.slice(0, 12).map((article, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `https://corepapers.space/blog/${article.slug}`,
              name: article.title,
            })),
          },
        ]}
      />

      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-sans font-medium mb-4">
              <BookOpen size={13} />
              Academic Writing Resources
            </div>
            <h1 className="font-serif font-light text-4xl sm:text-5xl text-slate-purple mb-4">
              Academic writing guides,
              <span className="italic"> sentence starters, and ESL essay help</span>
            </h1>
            <p className="text-muted-foreground font-sans max-w-xl mx-auto leading-relaxed">
              Free guides, tutorials, and practical examples for international students working on academic English, essay structure, citations, discussion sections, and research writing.
            </p>
          </div>

          <div className="max-w-5xl mx-auto mb-10 rounded-3xl border border-primary/10 bg-hero-gradient p-8">
            <div className="max-w-3xl">
              <p className="text-xs font-sans font-semibold tracking-widest uppercase text-primary mb-3">Trending Topic</p>
              <h2 className="font-serif font-light text-3xl sm:text-4xl text-slate-purple mb-3">
                Research paper abstract help
              </h2>
              <p className="text-sm text-muted-foreground font-sans leading-relaxed mb-5">
                If you are writing a paper abstract right now, start with structure, then compare examples, then check how the abstract differs from the introduction.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    href: "/blog/how-to-write-a-research-paper-introduction",
                    title: "Research paper introduction",
                  },
                  {
                    href: "/blog/how-to-write-an-abstract-for-a-research-paper",
                    title: "How to write an abstract",
                  },
                  {
                    href: "/blog/research-paper-abstract-examples",
                    title: "Abstract examples",
                  },
                  {
                    href: "/blog/abstract-vs-introduction-difference",
                    title: "Abstract vs introduction",
                  },
                ].map((item) => (
                  <Link key={item.href} href={item.href} className="block">
                    <div className="rounded-2xl border border-white/70 bg-white/80 p-4 hover:border-primary/30 hover:shadow-soft transition-all">
                      <h3 className="font-serif text-xl text-slate-purple">{item.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto mb-12 grid md:grid-cols-3 gap-5">
            {[
              {
                href: "/polish",
                title: "Revise a draft now",
                desc: "Use the essay polisher when you already have text and need faster academic revision.",
              },
              {
                href: "/phrases",
                title: "Find better phrases",
                desc: "Browse academic sentence starters for introductions, analysis, and discussion sections.",
              },
              {
                href: "/citations",
                title: "Format references",
                desc: "Generate APA, MLA, Chicago, and IEEE citations after finishing your draft.",
              },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="block">
                <div className="h-full rounded-2xl border border-border bg-white p-6 hover:border-primary/30 hover:shadow-soft transition-all">
                  <h2 className="font-serif text-2xl text-slate-purple mb-3">{item.title}</h2>
                  <p className="text-sm text-muted-foreground font-sans leading-relaxed">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="max-w-5xl mx-auto mb-12 grid md:grid-cols-3 gap-5">
            {[
              {
                href: "/blog/how-to-improve-academic-writing-skills-for-international-students",
                title: "Improve academic writing skills",
                desc: "Actionable revision habits for international students who want stronger structure and tone.",
              },
              {
                href: "/blog/apa-7th-edition-citation-format-guide-with-examples",
                title: "APA 7 citation format guide",
                desc: "See how references and in-text citations should look before you submit.",
              },
              {
                href: "/blog/how-to-avoid-plagiarism-in-academic-writing",
                title: "Avoid plagiarism in academic writing",
                desc: "Learn when to quote, paraphrase, summarize, and cite sources safely.",
              },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="block">
                <div className="h-full rounded-2xl border border-border bg-white p-6 hover:border-primary/30 hover:shadow-soft transition-all">
                  <h2 className="font-serif text-2xl text-slate-purple mb-3">{item.title}</h2>
                  <p className="text-sm text-muted-foreground font-sans leading-relaxed">{item.desc}</p>
                </div>
              </Link>
            ))}
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
            <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
              <p className="text-xs font-sans font-semibold tracking-widest uppercase text-muted-foreground">All Articles</p>
              <p className="text-xs text-muted-foreground font-sans">{allArticles.length} guides available</p>
            </div>
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
