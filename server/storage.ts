import { ENV, type RuntimeEnv } from "./_core/env";

function normalizeKey(relKey: string): string {
  return relKey.replace(/^\/+/, "");
}

function appendHashSuffix(relKey: string): string {
  const hash = crypto.randomUUID().replace(/-/g, "").slice(0, 8);
  const lastDot = relKey.lastIndexOf(".");
  if (lastDot === -1) return `${relKey}_${hash}`;
  return `${relKey.slice(0, lastDot)}_${hash}${relKey.slice(lastDot)}`;
}

function getR2Bucket(env: RuntimeEnv) {
  if (!env.R2) {
    throw new Error("Cloudflare R2 is not configured. Bind an R2 bucket as R2.");
  }
  return env.R2;
}

function encodeStoragePath(key: string) {
  return key.split("/").map(encodeURIComponent).join("/");
}

function publicUrlForKey(key: string, env: RuntimeEnv) {
  const baseUrl = env.R2_PUBLIC_URL?.trim().replace(/\/+$/, "");
  if (baseUrl) {
    return `${baseUrl}/${encodeStoragePath(key)}`;
  }

  return `/r2/${encodeStoragePath(key)}`;
}

export async function storagePut(
  relKey: string,
  data: Buffer | Uint8Array | string,
  contentType = "application/octet-stream",
  env: RuntimeEnv = ENV
): Promise<{ key: string; url: string }> {
  const bucket = getR2Bucket(env);
  const key = appendHashSuffix(normalizeKey(relKey));

  await bucket.put(key, data, {
    httpMetadata: {
      contentType,
    },
  });

  return { key, url: publicUrlForKey(key, env) };
}

export async function storageGet(
  relKey: string,
  env: RuntimeEnv = ENV
): Promise<{ key: string; url: string }> {
  const key = normalizeKey(relKey);
  return { key, url: publicUrlForKey(key, env) };
}

export async function storageGetSignedUrl(
  relKey: string,
  env: RuntimeEnv = ENV
): Promise<string> {
  const key = normalizeKey(relKey);
  return publicUrlForKey(key, env);
}
