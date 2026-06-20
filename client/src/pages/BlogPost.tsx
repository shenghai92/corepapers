import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import SEOHead from "@/components/SEOHead";
import { Clock, ArrowLeft, Tag, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { STATIC_ARTICLE_MAP, STATIC_ARTICLE_ORDER } from "@/content/blogArticles";

const FAQ_SCHEMA_BY_SLUG: Record<string, Array<{ question: string; answer: string }>> = {
  "how-to-write-a-methodology-section-for-a-research-paper": [
    {
      question: "What is the difference between methodology and methods?",
      answer:
        "Methodology explains the overall research approach and why it fits the question, while methods are the specific tools or procedures used to collect and analyze data.",
    },
    {
      question: "How long should a methodology section be?",
      answer:
        "The length depends on the assignment and field, but it should be long enough to explain the design, data collection, and analysis clearly. For many student papers, one to three focused pages is common.",
    },
    {
      question: "What tense should I use in the methodology section?",
      answer:
        "Most methodology sections use past tense because they describe what the study did. Present tense may still appear when explaining general research conventions or definitions.",
    },
    {
      question: "Can I use first person in a methodology section?",
      answer:
        "That depends on the style guide and instructor. Some fields accept first person for clarity, while others prefer an impersonal style.",
    },
    {
      question: "What should I include in a qualitative methodology section?",
      answer:
        "A qualitative methodology section usually explains the research context, participant selection, data collection method, and coding or interpretive process used to analyze the material.",
    },
  ],
  "methodology-section-faq-for-research-papers": [
    {
      question: "How do you write a methodology section for a research paper?",
      answer:
        "A simple approach is to explain the research design, the participants or data source, the data collection method, the analysis method, and any ethics or limitations that matter.",
    },
    {
      question: "What should be included in a methods section?",
      answer:
        "Most methods sections include the research design, participants or dataset, sampling or selection criteria, tools or instruments, procedure, and analysis method.",
    },
    {
      question: "What is an example of a methodology section?",
      answer:
        "A methodology example usually states the design, identifies the participants or data, explains how the data was collected, and names the analysis approach such as thematic coding or statistical comparison.",
    },
    {
      question: "What is the difference between a methodology section and a methods section?",
      answer:
        "In many assignments the terms overlap, but methodology can refer more broadly to the logic behind the methods, while methods often refers to the practical steps taken in the study.",
    },
  ],
};

export default function BlogPost() {
  const [location] = useLocation();
  const slug = decodeURIComponent((location.match(/^\/blog\/([^/?#]+)/)?.[1] ?? "").trim());

  const { data: dbPost } = trpc.blog.getBySlug.useQuery({ slug }, { enabled: !!slug });
  const matchedDbPost = dbPost?.slug === slug ? dbPost : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [slug]);

  const staticArticle = STATIC_ARTICLE_MAP[slug];
  const relatedArticles = STATIC_ARTICLE_ORDER
    .filter((itemSlug) => itemSlug !== slug)
    .map((itemSlug) => ({
      slug: itemSlug,
      title: STATIC_ARTICLE_MAP[itemSlug]?.title,
      excerpt: STATIC_ARTICLE_MAP[itemSlug]?.excerpt,
    }))
    .filter((item) => item.title && item.excerpt);

  const article = matchedDbPost
    ? {
        title: matchedDbPost.title,
        content: matchedDbPost.content,
        excerpt: matchedDbPost.excerpt ?? "",
        category: matchedDbPost.category ?? "General",
        tags: (matchedDbPost.tags as string[]) ?? [],
        readingTime: matchedDbPost.readingTime ?? 5,
        metaDescription: matchedDbPost.metaDescription ?? matchedDbPost.excerpt ?? "",
        publishedAt: matchedDbPost.publishedAt
          ? new Date(matchedDbPost.publishedAt).toISOString().split("T")[0]
          : "",
      }
    : staticArticle
      ? staticArticle
      : null;

  if (!article) {
    return (
      <div className="pt-32 pb-16 text-center">
        <h1 className="font-serif text-3xl text-slate-purple mb-4">Article Not Found</h1>
        <Link href="/blog" className="text-primary underline font-sans">Back to Blog</Link>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const renderContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      if (line.startsWith("## ")) {
        return (
          <h2 key={i} className="font-serif font-medium text-2xl text-slate-purple mt-8 mb-4">
            {line.slice(3)}
          </h2>
        );
      }

      if (line.startsWith("### ")) {
        return (
          <h3 key={i} className="font-serif font-medium text-xl text-slate-purple mt-6 mb-3">
            {line.slice(4)}
          </h3>
        );
      }

      if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <p key={i} className="font-sans font-semibold text-foreground mb-2">
            {line.slice(2, -2)}
          </p>
        );
      }

      if (line.startsWith("- ")) {
        return (
          <li key={i} className="font-sans text-foreground ml-4 mb-1 list-disc">
            {line.slice(2)}
          </li>
        );
      }

      if (line.startsWith("Incorrect:")) {
        return <p key={i} className="font-sans text-sm text-red-600 mb-1 pl-4">{line}</p>;
      }

      if (line.startsWith("Correct:")) {
        return <p key={i} className="font-sans text-sm text-emerald-700 mb-1 pl-4">{line}</p>;
      }

      if (line.trim() === "") {
        return <div key={i} className="mb-3" />;
      }

      const linkMatch = line.match(/\[([^\]]+)\]\((\/[^)]+)\)/);
      if (linkMatch) {
        const [fullMatch, label, href] = linkMatch;
        const before = line.slice(0, line.indexOf(fullMatch));
        const after = line.slice(line.indexOf(fullMatch) + fullMatch.length);
        return (
          <p key={i} className="font-sans text-foreground leading-relaxed mb-3">
            {before}
            <Link href={href} className="text-primary underline">
              {label}
            </Link>
            {after}
          </p>
        );
      }

      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      return (
        <p key={i} className="font-sans text-foreground leading-relaxed mb-3">
          {parts.map((part, j) =>
            part.startsWith("**") && part.endsWith("**") ? (
              <strong key={j}>{part.slice(2, -2)}</strong>
            ) : (
              part
            )
          )}
        </p>
      );
    });
  };

  const publishedDisplay = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";
  const articleUrl = `https://corepapers.space/blog/${slug}`;
  const wordCount = article.content
    .split(/\s+/)
    .filter(Boolean).length;
  const faqSchema = FAQ_SCHEMA_BY_SLUG[slug];
  const jsonLdGraph: Record<string, unknown>[] = [
    {
      "@type": "Article",
      headline: article.title,
      description: article.excerpt,
      keywords: article.tags.join(", "),
      articleSection: article.category,
      mainEntityOfPage: articleUrl,
      url: articleUrl,
      wordCount,
      datePublished: article.publishedAt,
      dateModified: article.publishedAt,
      inLanguage: "en",
      isAccessibleForFree: true,
      author: { "@type": "Organization", name: "CorePapers" },
      publisher: {
        "@type": "Organization",
        name: "CorePapers",
        url: "https://corepapers.space",
      },
      about: article.tags,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://corepapers.space/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: "https://corepapers.space/blog",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: article.title,
          item: articleUrl,
        },
      ],
    },
  ];

  if (faqSchema) {
    jsonLdGraph.push({
      "@type": "FAQPage",
      mainEntity: faqSchema.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });
  }

  return (
    <>
      <SEOHead
        title={article.title}
        description={article.metaDescription}
        keywords={article.tags.join(", ")}
        canonical={`/blog/${slug}`}
        ogType="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": jsonLdGraph,
        }}
      />

      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-sans mb-8">
              <ArrowLeft size={14} /> Back to Blog
            </Link>

            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="secondary" className="font-sans text-xs">{article.category}</Badge>
                <span className="text-xs text-muted-foreground font-sans flex items-center gap-1">
                  <Clock size={11} /> {article.readingTime} min read
                </span>
                {publishedDisplay && (
                  <span className="text-xs text-muted-foreground font-sans">{publishedDisplay}</span>
                )}
              </div>
              <h1 className="font-serif font-medium text-3xl sm:text-4xl text-slate-purple leading-tight mb-4">
                {article.title}
              </h1>
              <p className="text-muted-foreground font-sans leading-relaxed text-lg">
                {article.excerpt}
              </p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

            <article className="prose-academic">
              {renderContent(article.content)}
            </article>

            <div className="mt-10 flex items-center gap-2 flex-wrap">
              <Tag size={14} className="text-muted-foreground" />
              {article.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="font-sans text-xs">{tag}</Badge>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={handleShare} className="font-sans text-xs">
                <Share2 size={13} className="mr-1.5" /> Share Article
              </Button>
            </div>

            <div className="mt-12 p-6 bg-hero-gradient rounded-2xl text-center border border-border">
              <h3 className="font-serif font-light text-2xl text-slate-purple mb-2">
                Ready to improve your academic writing?
              </h3>
              <p className="text-sm text-muted-foreground font-sans mb-4">
                Try CorePapers free for AI-powered essay polishing built for international students.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/polish">
                  <Button className="bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90 font-sans">
                    Try Essay Polish Free
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button variant="outline" className="font-sans">
                    Compare Plans
                  </Button>
                </Link>
              </div>
              <div className="grid sm:grid-cols-3 gap-3 mt-5 text-left">
                {[
                  {
                    href: "/polish",
                    title: "Fix non-native phrasing",
                    desc: "Paste a paragraph and get sentence-level revision suggestions.",
                  },
                  {
                    href: "/phrases",
                    title: "Find academic sentence starters",
                    desc: "Use ready-made phrase patterns for analysis, discussion, and stance.",
                  },
                  {
                    href: "/citations",
                    title: "Generate citations",
                    desc: "Create references and in-text citations after revising your draft.",
                  },
                ].map((item) => (
                  <Link key={item.href} href={item.href} className="block">
                    <div className="rounded-xl border border-border bg-white/80 p-4 hover:border-primary/30 transition-all">
                      <h4 className="font-sans font-semibold text-sm text-foreground mb-1">{item.title}</h4>
                      <p className="text-xs text-muted-foreground font-sans leading-relaxed">{item.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {relatedArticles.length > 0 && (
              <div className="mt-8">
                <h2 className="font-serif font-medium text-2xl text-slate-purple mb-4">Related guides</h2>
                <div className="grid gap-4">
                  {relatedArticles.map((item) => (
                    <Link key={item.slug} href={`/blog/${item.slug}`} className="block">
                      <div className="p-5 bg-white border border-border rounded-xl hover:border-primary/30 hover:shadow-card transition-all">
                        <h3 className="font-serif text-xl text-slate-purple mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground font-sans leading-relaxed">{item.excerpt}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
