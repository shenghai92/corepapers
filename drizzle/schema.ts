import { sql } from "drizzle-orm";
import { integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

const now = sql`(unixepoch() * 1000)`;

export const users = sqliteTable(
  "users",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    openId: text("openId").notNull(),
    name: text("name"),
    email: text("email"),
    loginMethod: text("loginMethod"),
    passwordHash: text("passwordHash"),
    passwordSalt: text("passwordSalt"),
    role: text("role", { enum: ["user", "admin"] }).default("user").notNull(),
    preferredDiscipline: text("preferredDiscipline", {
      enum: ["stem", "social_science", "humanities", "general"],
    }).default("general"),
    preferredLanguage: text("preferredLanguage").default("en"),
    isEduVerified: integer("isEduVerified", { mode: "boolean" }).default(false),
    stripeCustomerId: text("stripeCustomerId"),
    createdAt: integer("createdAt", { mode: "timestamp_ms" }).default(now).notNull(),
    updatedAt: integer("updatedAt", { mode: "timestamp_ms" }).default(now).notNull(),
    lastSignedIn: integer("lastSignedIn", { mode: "timestamp_ms" }).default(now).notNull(),
  },
  (table) => ({
    openIdUnique: uniqueIndex("users_openId_unique").on(table.openId),
  })
);

export const subscriptions = sqliteTable("subscriptions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("userId").notNull(),
  stripeSubscriptionId: text("stripeSubscriptionId"),
  plan: text("plan", { enum: ["free", "student", "pro"] }).default("free").notNull(),
  billingCycle: text("billingCycle", { enum: ["monthly", "annual"] }),
  status: text("status", {
    enum: ["active", "canceled", "past_due", "trialing", "incomplete"],
  })
    .default("active")
    .notNull(),
  currentPeriodStart: integer("currentPeriodStart", { mode: "timestamp_ms" }),
  currentPeriodEnd: integer("currentPeriodEnd", { mode: "timestamp_ms" }),
  cancelAtPeriodEnd: integer("cancelAtPeriodEnd", { mode: "boolean" }).default(false),
  createdAt: integer("createdAt", { mode: "timestamp_ms" }).default(now).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp_ms" }).default(now).notNull(),
});

export const writingSessions = sqliteTable("writing_sessions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("userId").notNull(),
  title: text("title").default("Untitled"),
  originalText: text("originalText"),
  polishedText: text("polishedText"),
  discipline: text("discipline", {
    enum: ["stem", "social_science", "humanities", "general"],
  }).default("general"),
  wordCount: integer("wordCount").default(0),
  suggestions: text("suggestions", { mode: "json" }).$type<unknown>(),
  createdAt: integer("createdAt", { mode: "timestamp_ms" }).default(now).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp_ms" }).default(now).notNull(),
});

export const blogPosts = sqliteTable(
  "blog_posts",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    excerpt: text("excerpt"),
    content: text("content").notNull(),
    category: text("category"),
    tags: text("tags", { mode: "json" }).$type<string[] | null>(),
    metaTitle: text("metaTitle"),
    metaDescription: text("metaDescription"),
    featuredImage: text("featuredImage"),
    readingTime: integer("readingTime").default(5),
    published: integer("published", { mode: "boolean" }).default(false),
    publishedAt: integer("publishedAt", { mode: "timestamp_ms" }),
    authorId: integer("authorId"),
    createdAt: integer("createdAt", { mode: "timestamp_ms" }).default(now).notNull(),
    updatedAt: integer("updatedAt", { mode: "timestamp_ms" }).default(now).notNull(),
  },
  (table) => ({
    slugUnique: uniqueIndex("blog_posts_slug_unique").on(table.slug),
  })
);

export const citationHistory = sqliteTable("citation_history", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("userId"),
  format: text("format", { enum: ["apa", "mla", "chicago", "ieee"] }).notNull(),
  sourceType: text("sourceType"),
  inputData: text("inputData", { mode: "json" }).$type<unknown>(),
  outputCitation: text("outputCitation"),
  createdAt: integer("createdAt", { mode: "timestamp_ms" }).default(now).notNull(),
});

export const usageEvents = sqliteTable("usage_events", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("userId"),
  identifier: text("identifier").notNull(),
  feature: text("feature", { enum: ["polish", "citation"] }).notNull(),
  units: integer("units").default(0).notNull(),
  createdAt: integer("createdAt", { mode: "timestamp_ms" }).default(now).notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Subscription = typeof subscriptions.$inferSelect;
export type WritingSession = typeof writingSessions.$inferSelect;
export type BlogPost = typeof blogPosts.$inferSelect;
export type CitationHistory = typeof citationHistory.$inferSelect;
export type UsageEvent = typeof usageEvents.$inferSelect;
