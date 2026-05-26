import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { createConnection, createPool, type Connection, type Pool } from "mysql2/promise";
import type { InsertUser, User } from "../drizzle/schema";
import { users } from "../drizzle/schema";
import { buildRuntimeEnv, type RuntimeEnv } from "./_core/env";

type DbClient = ReturnType<typeof drizzle>;
type DbConnection = Connection | Pool;
type DbConfig = NonNullable<ReturnType<typeof resolveConnectionConfig>>;

let cachedPool: Pool | null = null;
let cachedConnection: Connection | null = null;
let cachedDb: DbClient | null = null;
let cachedConnectionKey: string | null = null;

function resolveConnectionConfig(env?: RuntimeEnv) {
  const hyperdrive = env?.HYPERDRIVE;
  if (hyperdrive?.host && hyperdrive?.user && hyperdrive?.database) {
    return {
      kind: "hyperdrive" as const,
      key: JSON.stringify({
        host: hyperdrive.host,
        user: hyperdrive.user,
        database: hyperdrive.database,
        port: hyperdrive.port ?? 3306,
      }),
      config: {
        host: hyperdrive.host,
        user: hyperdrive.user,
        password: hyperdrive.password ?? "",
        database: hyperdrive.database,
        port: hyperdrive.port ?? 3306,
        ssl: "preferred" as const,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0,
        connectTimeout: 10_000,
        disableEval: true,
      },
    };
  }

  const connectionString =
    hyperdrive?.connectionString?.trim() ||
    env?.DATABASE_URL?.trim() ||
    buildRuntimeEnv().DATABASE_URL?.trim() ||
    "";

  return connectionString
    ? {
        kind: "url" as const,
        key: connectionString,
        connectionString,
      }
    : null;
}

async function createDb(config: DbConfig): Promise<DbClient> {
  if (cachedDb && cachedConnectionKey === config.key) {
    return cachedDb;
  }

  if (cachedConnectionKey && cachedConnectionKey !== config.key) {
    if (cachedPool) {
      await cachedPool.end().catch(() => {});
    }
    cachedPool = null;
    if (cachedConnection) {
      await cachedConnection.end().catch(() => {});
    }
    cachedConnection = null;
    cachedDb = null;
  }

  cachedConnectionKey = config.key;

  if (config.kind === "hyperdrive") {
    cachedConnection = await createConnection(config.config as any);
    cachedDb = drizzle(cachedConnection as DbConnection as any) as DbClient;
    return cachedDb;
  }

  cachedPool = createPool(config.connectionString);
  cachedDb = drizzle(cachedPool as any) as DbClient;
  return cachedDb;
}

export async function getDb(env?: RuntimeEnv): Promise<DbClient | null> {
  const config = resolveConnectionConfig(env);
  if (!config) {
    return null;
  }

  try {
    return await createDb(config);
  } catch (error) {
    console.warn("[Database] Failed to connect:", error);
    return null;
  }
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

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
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
