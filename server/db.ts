import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import type { InsertUser, User } from "../drizzle/schema";
import { users } from "../drizzle/schema";
import type { RuntimeEnv } from "./_core/env";

type DbClient = ReturnType<typeof drizzle>;

const dbCache = new WeakMap<object, DbClient>();
const schemaReady = new WeakMap<object, Promise<void>>();
let lastDbInitError: string | null = null;

const bootstrapStatements = [
  `CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, openId TEXT NOT NULL, name TEXT, email TEXT, loginMethod TEXT, passwordHash TEXT, passwordSalt TEXT, role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')), preferredDiscipline TEXT DEFAULT 'general' CHECK (preferredDiscipline IN ('stem', 'social_science', 'humanities', 'general')), preferredLanguage TEXT DEFAULT 'en', isEduVerified INTEGER DEFAULT 0, stripeCustomerId TEXT, createdAt INTEGER NOT NULL DEFAULT (unixepoch() * 1000), updatedAt INTEGER NOT NULL DEFAULT (unixepoch() * 1000), lastSignedIn INTEGER NOT NULL DEFAULT (unixepoch() * 1000));`,
  `CREATE UNIQUE INDEX IF NOT EXISTS users_openId_unique ON users(openId);`,
  `CREATE TABLE IF NOT EXISTS subscriptions (id INTEGER PRIMARY KEY AUTOINCREMENT, userId INTEGER NOT NULL, stripeSubscriptionId TEXT, plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'student', 'pro')), billingCycle TEXT CHECK (billingCycle IN ('monthly', 'annual')), status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'canceled', 'past_due', 'trialing', 'incomplete')), currentPeriodStart INTEGER, currentPeriodEnd INTEGER, cancelAtPeriodEnd INTEGER DEFAULT 0, createdAt INTEGER NOT NULL DEFAULT (unixepoch() * 1000), updatedAt INTEGER NOT NULL DEFAULT (unixepoch() * 1000));`,
  `CREATE TABLE IF NOT EXISTS writing_sessions (id INTEGER PRIMARY KEY AUTOINCREMENT, userId INTEGER NOT NULL, title TEXT DEFAULT 'Untitled', originalText TEXT, polishedText TEXT, discipline TEXT DEFAULT 'general' CHECK (discipline IN ('stem', 'social_science', 'humanities', 'general')), wordCount INTEGER DEFAULT 0, suggestions TEXT, createdAt INTEGER NOT NULL DEFAULT (unixepoch() * 1000), updatedAt INTEGER NOT NULL DEFAULT (unixepoch() * 1000));`,
  `CREATE TABLE IF NOT EXISTS blog_posts (id INTEGER PRIMARY KEY AUTOINCREMENT, slug TEXT NOT NULL, title TEXT NOT NULL, excerpt TEXT, content TEXT NOT NULL, category TEXT, tags TEXT, metaTitle TEXT, metaDescription TEXT, featuredImage TEXT, readingTime INTEGER DEFAULT 5, published INTEGER DEFAULT 0, publishedAt INTEGER, authorId INTEGER, createdAt INTEGER NOT NULL DEFAULT (unixepoch() * 1000), updatedAt INTEGER NOT NULL DEFAULT (unixepoch() * 1000));`,
  `CREATE UNIQUE INDEX IF NOT EXISTS blog_posts_slug_unique ON blog_posts(slug);`,
  `CREATE TABLE IF NOT EXISTS citation_history (id INTEGER PRIMARY KEY AUTOINCREMENT, userId INTEGER, format TEXT NOT NULL CHECK (format IN ('apa', 'mla', 'chicago', 'ieee')), sourceType TEXT, inputData TEXT, outputCitation TEXT, createdAt INTEGER NOT NULL DEFAULT (unixepoch() * 1000));`,
  `CREATE TABLE IF NOT EXISTS usage_events (id INTEGER PRIMARY KEY AUTOINCREMENT, userId INTEGER, identifier TEXT NOT NULL, feature TEXT NOT NULL CHECK (feature IN ('polish', 'citation')), units INTEGER NOT NULL DEFAULT 0, createdAt INTEGER NOT NULL DEFAULT (unixepoch() * 1000));`,
] as const;

async function ensureSchema(dbBinding: NonNullable<RuntimeEnv["DB"]>) {
  const key = dbBinding as object;

  if (!schemaReady.has(key)) {
    schemaReady.set(
      key,
      (async () => {
        for (const statement of bootstrapStatements) {
          await dbBinding.exec(statement);
        }
      })()
    );
  }

  await schemaReady.get(key);
}

export async function getDb(env?: RuntimeEnv): Promise<DbClient | null> {
  const dbBinding = env?.DB;
  if (!dbBinding) {
    lastDbInitError = "DB binding is missing";
    return null;
  }

  try {
    await ensureSchema(dbBinding);
    lastDbInitError = null;

    const key = dbBinding as object;
    let db = dbCache.get(key);
    if (!db) {
      db = drizzle(dbBinding as never);
      dbCache.set(key, db);
    }

    return db;
  } catch (error) {
    lastDbInitError = error instanceof Error ? error.message : String(error);
    console.warn("[Database] Failed to initialize D1:", error);
    return null;
  }
}

export function getDbDiagnostics() {
  return {
    lastDbInitError,
  };
}

export async function upsertUser(user: InsertUser, env?: RuntimeEnv): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb(env);
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = [
      "name",
      "email",
      "loginMethod",
      "passwordHash",
      "passwordSalt",
      "stripeCustomerId",
    ] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    }
    if (user.preferredDiscipline !== undefined) {
      values.preferredDiscipline = user.preferredDiscipline;
      updateSet.preferredDiscipline = user.preferredDiscipline;
    }
    if (user.preferredLanguage !== undefined) {
      values.preferredLanguage = user.preferredLanguage;
      updateSet.preferredLanguage = user.preferredLanguage;
    }
    if (user.isEduVerified !== undefined) {
      values.isEduVerified = user.isEduVerified;
      updateSet.isEduVerified = user.isEduVerified;
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db
      .insert(users)
      .values(values)
      .onConflictDoUpdate({
        target: users.openId,
        set: updateSet,
      });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string, env?: RuntimeEnv) {
  const db = await getDb(env);
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getUserByEmail(email: string, env?: RuntimeEnv) {
  const db = await getDb(env);
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return result[0] ?? undefined;
}

export async function getUserById(id: number, env?: RuntimeEnv): Promise<User | undefined> {
  const db = await getDb(env);
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result[0] ?? undefined;
}
