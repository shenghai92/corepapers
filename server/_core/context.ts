import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { User } from "../../drizzle/schema";
import { buildRuntimeEnv, type RuntimeEnv } from "./env";
import { getDb, getUserById } from "../db";
import { parseCookies, verifySessionToken } from "./auth";

export type ContextRequest = {
  headers: Headers | Record<string, string | string[] | undefined>;
  url?: string;
  protocol?: string;
};

export type TrpcContext = {
  req: ContextRequest;
  res?: CreateExpressContextOptions["res"];
  resHeaders: Headers;
  env: RuntimeEnv;
  db: Awaited<ReturnType<typeof getDb>> | null;
  user: User | null;
};

type ContextInput =
  | CreateExpressContextOptions
  | {
      req: Request;
      env?: RuntimeEnv;
      resHeaders?: Headers;
    };

function getHeaderValue(
  headers: ContextRequest["headers"],
  key: string
): string | undefined {
  if (headers instanceof Headers) {
    return headers.get(key) ?? undefined;
  }

  const value = headers[key.toLowerCase()];
  if (Array.isArray(value)) {
    return value[0];
  }

  return typeof value === "string" ? value : undefined;
}

function isFetchContext(
  input: ContextInput
): input is { req: Request; env?: RuntimeEnv; resHeaders?: Headers } {
  return input.req instanceof Request;
}

function isSecureRequest(input: ContextRequest) {
  if (input.protocol === "https") return true;

  const forwardedProto = getHeaderValue(input.headers, "x-forwarded-proto");
  return forwardedProto?.split(",").some((proto) => proto.trim().toLowerCase() === "https") ?? false;
}

export function getCookieOptions(input: ContextRequest) {
  return {
    httpOnly: true,
    path: "/",
    sameSite: "lax" as const,
    secure: isSecureRequest(input),
  };
}

export async function createContext(input: ContextInput): Promise<TrpcContext> {
  const env = buildRuntimeEnv(
    isFetchContext(input)
      ? {
          ...input.env,
          NODE_ENV: input.env?.NODE_ENV ?? process.env.NODE_ENV,
        }
      : process.env
  );

  const req: ContextRequest = isFetchContext(input)
    ? input.req
    : {
        headers: input.req.headers as Record<string, string | string[] | undefined>,
        url: `${input.req.protocol ?? "http"}://${input.req.headers.host ?? "localhost"}`,
        protocol: input.req.protocol,
      };

  const resHeaders = isFetchContext(input)
    ? input.resHeaders ?? new Headers()
    : new Headers();

  const db = await getDb(env);
  let user: User | null = null;

  try {
    const cookies = parseCookies(getHeaderValue(req.headers, "cookie"));
    const token = cookies.app_session_id;
    if (token && env.JWT_SECRET) {
      const payload = await verifySessionToken(token, env.JWT_SECRET);
      if (payload) {
        user = (await getUserById(payload.userId, env)) ?? null;
      }
    }
  } catch (error) {
    console.warn("[Auth] Failed to resolve session", error);
    user = null;
  }

  return {
    req,
    res: isFetchContext(input) ? undefined : input.res,
    resHeaders,
    env,
    db,
    user,
  };
}

