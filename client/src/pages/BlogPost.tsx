import { useRoute, Link } from "wouter";
import { trpc } from "@/lib/trpc";
import SEOHead from "@/components/SEOHead";
import { Clock, ArrowLeft, Tag, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ARTICLE_CONTENT: Record<
  string,
  {
    title: string;
    content: string;
    excerpt: string;
    category: string;
    tags: string[];
    readingTime: number;
    metaDescription: string;
    publishedAt?: string;
  }
> = {
  "how-to-avoid-common-esl-writing-mistakes": {
    title: "How to Avoid the 10 Most Common ESL Writing Mistakes in Academic Papers",
    excerpt:
      "Non-native English speakers often repeat the same writing patterns that signal to professors they're not native speakers.",
    category: "Writing Tips",
    tags: ["ESL", "Academic Writing", "Common Mistakes"],
    readingTime: 8,
    metaDescription:
      "Discover the 10 most common ESL writing mistakes in academic papers and how to fix them. Essential guide for non-native English speaking international students.",
    publishedAt: "2024-01-15",
    content: `## Introduction

Writing academic papers in English as a second language is one of the most challenging aspects of studying abroad. Even students with strong English skills often make the same patterns of mistakes - patterns that immediately signal to professors that the writer is not a native English speaker.

The good news? These mistakes are highly predictable, which means they are also highly fixable. In this guide, we walk through the 10 most common ESL academic writing mistakes and show you exactly how to correct them.

## Mistake 1: Redundant Subject Pronouns

**What it looks like:** "The study, it shows that..." or "The results, they indicate..."

**Why it happens:** In many languages, repeating the subject with a pronoun is grammatically correct. In English academic writing, it creates redundancy.

**The fix:** Remove the pronoun. "The study shows that..."

## Mistake 2: Overusing "Very" and "Very Important"

**What it looks like:** "This is a very important factor" or "The results are very significant."

**Why it happens:** This often comes from direct translation of intensifiers from other languages.

**The fix:** Use more precise academic vocabulary. "This is a critical factor" or "The results are highly significant."

## Mistake 3: Informal Expressions in Formal Writing

**What it looks like:** "In my opinion, I think..." or "I believe that..."

**Why it happens:** Students transfer conversational English patterns into academic writing.

**The fix:** Use impersonal academic constructions. "This analysis suggests..." or "The evidence indicates..."

## Mistake 4: Incorrect Article Usage (a/an/the)

**What it looks like:** "The research shows that education is important factor."

**Why it happens:** Many languages do not have articles, making this one of the hardest aspects of English for ESL writers.

**The fix:** "The research shows that education is an important factor."
Remember: use "the" for specific, known items, "a/an" for general first mentions, and no article for uncountable nouns used generally.

## Mistake 5: Subject-Verb Agreement Errors

**What it looks like:** "The data shows..." versus "The data show..."

**Why it happens:** Collective nouns and academic style differences can be confusing.

**The fix:** Be consistent with your chosen variety of English and check whether your institution has a preference.

## Mistake 6: Passive Voice Overuse

**What it looks like:** "It was found by the researchers that the results were shown to be significant."

**Why it happens:** Students are often taught that academic writing uses passive voice, so they overuse it.

**The fix:** Use active voice when the agent matters. "The researchers found that the results were significant." Reserve passive voice for cases where the agent is unknown or unimportant.

## Mistake 7: Run-On Sentences

**What it looks like:** "The study examined 200 participants, the participants were divided into two groups, one group received the treatment, the other group was the control group."

**Why it happens:** In some languages, long comma-connected sentences are stylistically acceptable.

**The fix:** Break the sentence apart or use clearer connectors. "The study examined 200 participants, who were divided into two groups: an experimental group and a control group."

## Mistake 8: Incorrect Preposition Use

**What it looks like:** "The research is based in the theory of..."

**Why it happens:** Prepositions rarely translate directly between languages.

**The fix:** Learn common academic collocations such as "based on," "focused on," "related to," "consistent with," and "contrary to."

## Mistake 9: Tense Inconsistency

**What it looks like:** "The study found that X is true. The researchers showed that Y was important."

**Why it happens:** Students are often unsure which tense to use when discussing research findings.

**The fix:** Use past tense for specific study findings and present tense for established facts.

## Mistake 10: Literal Translation of Idiomatic Expressions

**What it looks like:** "The research has a big meaning for..."

**Why it happens:** Students translate idiomatic expressions from their native language too literally.

**The fix:** "The research has significant implications for..."

## How CorePapers Can Help

Identifying these patterns in your own writing is difficult - we are often blind to our own mistakes. CorePapers is designed to detect these non-native patterns and explain why each change improves your academic writing.

[Try CorePapers free ->](/polish)

## Conclusion

These 10 mistakes are among the most common patterns in ESL academic writing. By learning to spot and correct them, you can significantly improve the clarity and quality of your work. The goal is not to hide that you are a non-native speaker - it is to communicate your ideas clearly and professionally.`,
  },
  "complete-apa-7th-edition-guide-international-students": {
    title: "Complete APA 7th Edition Guide for International Students (2024)",
    excerpt:
      "A comprehensive, step-by-step guide to APA 7th edition formatting for non-native English speakers.",
    category: "Citation Guides",
    tags: ["APA", "Citation", "Formatting"],
    readingTime: 12,
    metaDescription:
      "Complete APA 7th edition guide for international students. Step-by-step instructions for in-text citations, reference lists, and common formatting mistakes to avoid.",
    publishedAt: "2024-01-20",
    content: `## What is APA Format?

APA (American Psychological Association) format is widely used in the social sciences, education, psychology, and nursing. The 7th edition, published in 2019, introduced several important changes students should know.

## In-Text Citations

### Basic Format
For a work by one author: (Smith, 2020)
For a work by two authors: (Smith & Jones, 2020)
For three or more authors: (Smith et al., 2020)

### Direct Quotations
Include a page number: (Smith, 2020, p. 45)
For a range of pages: (Smith, 2020, pp. 45-47)

### Paraphrasing
When paraphrasing, include the author and year: (Smith, 2020)
Page numbers are encouraged but not required for paraphrases.

## Reference List Format

### Journal Article
Smith, J. A., & Jones, B. C. (2020). The impact of digital tools on academic writing. *Journal of Educational Technology*, *12*(3), 45-47. https://doi.org/10.1000/xyz123

**Key rules:**
- Author's last name, then initials
- Year in parentheses
- Article title in sentence case
- Journal name in italics and title case
- Volume in italics, issue in parentheses
- DOI as a hyperlink when available

### Book
Smith, J. A. (2020). *Academic writing for international students* (3rd ed.). Oxford University Press.

### Website
Smith, J. A. (2020, January 15). *How to write academic English*. University of Oxford. https://www.ox.ac.uk/example

## Common APA Mistakes by International Students

**Mistake 1: Wrong capitalization in titles**
Incorrect: "The Impact Of Digital Tools On Academic Writing"
Correct: "The impact of digital tools on academic writing"

**Mistake 2: Missing DOI**
Always include the DOI if available. It is now formatted as a URL: https://doi.org/...

**Mistake 3: Wrong author format**
Incorrect: "John A. Smith"
Correct: "Smith, J. A."

**Mistake 4: Incorrect date format**
Incorrect: "15 January 2020"
Correct: "(2020, January 15)" for web sources

## Using CorePapers Citation Generator

Our [citation generator](/citations) automatically formats your references in APA 7th edition. Enter the source information and get a properly formatted citation instantly.

## Conclusion

APA 7th edition includes several important updates from the 6th edition. The most notable changes are that running heads are no longer required for student papers, DOIs are formatted as hyperlinks, and up to 20 authors can be listed before using "et al." in the reference list.`,
  },
};

const ARTICLE_ORDER = [
  "how-to-avoid-common-esl-writing-mistakes",
  "complete-apa-7th-edition-guide-international-students",
];

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug ?? "";

  const { data: dbPost } = trpc.blog.getBySlug.useQuery({ slug }, { enabled: !!slug });

  const staticArticle = ARTICLE_CONTENT[slug];
  const relatedArticles = ARTICLE_ORDER
    .filter((itemSlug) => itemSlug !== slug)
    .map((itemSlug) => ({
      slug: itemSlug,
      title: ARTICLE_CONTENT[itemSlug]?.title,
      excerpt: ARTICLE_CONTENT[itemSlug]?.excerpt,
    }))
    .filter((item) => item.title && item.excerpt);

  const article = dbPost
    ? {
        title: dbPost.title,
        content: dbPost.content,
        excerpt: dbPost.excerpt ?? "",
        category: dbPost.category ?? "General",
        tags: (dbPost.tags as string[]) ?? [],
        readingTime: dbPost.readingTime ?? 5,
        metaDescription: dbPost.metaDescription ?? dbPost.excerpt ?? "",
        publishedAt: dbPost.publishedAt ? new Date(dbPost.publishedAt).toISOString().split("T")[0] : "",
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
          "@graph": [
            {
              "@type": "Article",
              headline: article.title,
              description: article.excerpt,
              keywords: article.tags.join(", "),
              articleSection: article.category,
              mainEntityOfPage: `https://corepapers.space/blog/${slug}`,
              datePublished: article.publishedAt,
              author: { "@type": "Organization", name: "CorePapers" },
              publisher: {
                "@type": "Organization",
                name: "CorePapers",
                url: "https://corepapers.space",
              },
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
                  item: `https://corepapers.space/blog/${slug}`,
                },
              ],
            },
          ],
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
              <Link href="/polish">
                <Button className="bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90 font-sans">
                  Try Essay Polish Free
                </Button>
              </Link>
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
