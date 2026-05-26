import { and, desc, eq } from "drizzle-orm";
import { z } from "zod";
import { blogPosts } from "../../drizzle/schema";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";

export const blogRouter = router({
  list: publicProcedure
    .input(z.object({ limit: z.number().default(10), offset: z.number().default(0) }).optional())
    .query(async ({ ctx, input }) => {
      const db = ctx.db;
      if (!db) return [];
      return db
        .select({
          id: blogPosts.id,
          slug: blogPosts.slug,
          title: blogPosts.title,
          excerpt: blogPosts.excerpt,
          category: blogPosts.category,
          tags: blogPosts.tags,
          readingTime: blogPosts.readingTime,
          publishedAt: blogPosts.publishedAt,
          featuredImage: blogPosts.featuredImage,
        })
        .from(blogPosts)
        .where(eq(blogPosts.published, true))
        .orderBy(desc(blogPosts.publishedAt))
        .limit(input?.limit ?? 10)
        .offset(input?.offset ?? 0);
    }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const db = ctx.db;
      if (!db) return null;
      const result = await db
        .select()
        .from(blogPosts)
        .where(and(eq(blogPosts.slug, input.slug), eq(blogPosts.published, true)))
        .limit(1);
      return result[0] ?? null;
    }),

  create: protectedProcedure
    .input(
      z.object({
        slug: z.string(),
        title: z.string(),
        excerpt: z.string().optional(),
        content: z.string(),
        category: z.string().optional(),
        tags: z.array(z.string()).optional(),
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional(),
        readingTime: z.number().default(5),
        published: z.boolean().default(false),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new Error("Forbidden");
      const db = ctx.db;
      if (!db) throw new Error("Database unavailable");
      await db.insert(blogPosts).values({
        ...input,
        authorId: ctx.user.id,
        publishedAt: input.published ? new Date() : undefined,
      });
      return { success: true };
    }),
});

