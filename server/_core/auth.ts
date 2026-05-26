import { SignJWT, jwtVerify } from "jose";
import { parse } from "cookie";

const PBKDF2_ITERATIONS = 210_000;
const PBKDF2_HASH = "SHA-256";
const SESSION_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

export type AuthTokenPayload = {
  userId: number;
};

export function getJwtSecret(secret: string): Uint8Array {
  const value = secret.trim();
  if (!value) {
    throw new Error("JWT_SECRET is not configured");
  }
  return new TextEncoder().encode(value);
}

export async function signSessionToken(
  payload: AuthTokenPayload,
  secret: string,
): Promise<string> {
  return new SignJWT({ userId: payload.userId })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_COOKIE_MAX_AGE}s`)
    .sign(getJwtSecret(secret));
}

export async function verifySessionToken(
  token: string,
  secret: string,
): Promise<AuthTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecret(secret));
    const userId = typeof payload.userId === "number"
      ? payload.userId
      : typeof payload.userId === "string"
        ? Number(payload.userId)
        : NaN;

    if (!Number.isFinite(userId) || userId <= 0) {
      return null;
    }

    return { userId };
  } catch {
    return null;
  }
}

export async function hashPassword(password: string, saltBase64?: string) {
  const salt = saltBase64
    ? base64ToBytes(saltBase64)
    : crypto.getRandomValues(new Uint8Array(16));

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );

  const derived = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt,
      iterations: PBKDF2_ITERATIONS,
      hash: PBKDF2_HASH,
    },
    keyMaterial,
    256
  );

  return {
    salt: bytesToBase64(salt),
    hash: bytesToBase64(new Uint8Array(derived)),
  };
}

export async function verifyPassword(
  password: string,
  saltBase64: string,
  expectedHashBase64: string
) {
  const { hash } = await hashPassword(password, saltBase64);
  return hash === expectedHashBase64;
}

export function getAuthCookieOptions(isSecure: boolean) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: isSecure,
    path: "/",
  };
}

export function createAuthCookie(value: string, isSecure: boolean) {
  return serializeCookie("app_session_id", value, {
    ...getAuthCookieOptions(isSecure),
    maxAge: SESSION_COOKIE_MAX_AGE,
  });
}

export function clearAuthCookie(isSecure: boolean) {
  return serializeCookie("app_session_id", "", {
    ...getAuthCookieOptions(isSecure),
    maxAge: 0,
  });
}

export function setCookieHeader(headers: Headers | undefined, cookie: string) {
  headers?.append("Set-Cookie", cookie);
}

export function parseCookies(cookieHeader: string | null | undefined) {
  return parse(cookieHeader ?? "");
}

function bytesToBase64(bytes: Uint8Array) {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function base64ToBytes(base64: string) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function serializeCookie(
  name: string,
  value: string,
  options: {
    httpOnly?: boolean;
    path?: string;
    sameSite?: "strict" | "lax" | "none";
    secure?: boolean;
    maxAge?: number;
  }
) {
  const parts = [`${encodeURIComponent(name)}=${encodeURIComponent(value)}`];

  if (typeof options.maxAge === "number") {
    parts.push(`Max-Age=${Math.trunc(options.maxAge)}`);
  }
  if (options.path) {
    parts.push(`Path=${options.path}`);
  }
  if (options.httpOnly) {
    parts.push("HttpOnly");
  }
  if (options.secure) {
    parts.push("Secure");
  }
  if (options.sameSite) {
    const valueMap: Record<string, string> = {
      strict: "Strict",
      lax: "Lax",
      none: "None",
    };
    parts.push(`SameSite=${valueMap[options.sameSite]}`);
  }

  return parts.join("; ");
}
