import {
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
  boolean,
  json,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  preferredDiscipline: mysqlEnum("preferredDiscipline", [
    "stem",
    "social_science",
    "humanities",
    "general",
  ]).default("general"),
  preferredLanguage: varchar("preferredLanguage", { length: 10 }).default("en"),
  isEduVerified: boolean("isEduVerified").default(false),
  stripeCustomerId: varchar("stripeCustomerId", { length: 128 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const subscriptions = mysqlTable("subscriptions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  stripeSubscriptionId: varchar("stripeSubscriptionId", { length: 128 }),
  plan: mysqlEnum("plan", ["free", "student", "pro"]).default("free").notNull(),
  billingCycle: mysqlEnum("billingCycle", ["monthly", "annual"]),
  status: mysqlEnum("status", [
    "active",
    "canceled",
    "past_due",
    "trialing",
    "incomplete",
  ])
    .default("active")
    .notNull(),
  currentPeriodStart: timestamp("currentPeriodStart"),
  currentPeriodEnd: timestamp("currentPeriodEnd"),
  cancelAtPeriodEnd: boolean("cancelAtPeriodEnd").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const writingSessions = mysqlTable("writing_sessions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 255 }).default("Untitled"),
  originalText: text("originalText"),
  polishedText: text("polishedText"),
  discipline: mysqlEnum("discipline", [
    "stem",
    "social_science",
    "humanities",
    "general",
  ]).default("general"),
  wordCount: int("wordCount").default(0),
  suggestions: json("suggestions"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const blogPosts = mysqlTable("blog_posts", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 512 }).notNull(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  category: varchar("category", { length: 64 }),
  tags: json("tags"),
  metaTitle: varchar("metaTitle", { length: 512 }),
  metaDescription: text("metaDescription"),
  featuredImage: varchar("featuredImage", { length: 512 }),
  readingTime: int("readingTime").default(5),
  published: boolean("published").default(false),
  publishedAt: timestamp("publishedAt"),
  authorId: int("authorId"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const citationHistory = mysqlTable("citation_history", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId"),
  format: mysqlEnum("format", ["apa", "mla", "chicago", "ieee"]).notNull(),
  sourceType: varchar("sourceType", { length: 64 }),
  inputData: json("inputData"),
  outputCitation: text("outputCitation"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Subscription = typeof subscriptions.$inferSelect;
export type WritingSession = typeof writingSessions.$inferSelect;
export type BlogPost = typeof blogPosts.$inferSelect;
export type CitationHistory = typeof citationHistory.$inferSelect;
