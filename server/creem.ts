import type { RuntimeEnv } from "./_core/env";

type CreemCheckout = {
  checkout_url?: string;
  checkoutUrl?: string;
};

export type CreemWebhookEvent = {
  id?: string;
  eventType?: string;
  type?: string;
  object?: Record<string, unknown>;
  data?: { object?: Record<string, unknown> };
};

function getApiKey(env: RuntimeEnv) {
  const key = env.CREEM_API_KEY?.trim();
  if (!key) throw new Error("Creem not configured");
  return key;
}

function getApiBase(apiKey: string) {
  return apiKey.startsWith("creem_test_")
    ? "https://test-api.creem.io/v1"
    : "https://api.creem.io/v1";
}

async function creemRequest<T>(
  env: RuntimeEnv,
  path: string,
  init: RequestInit = {}
) {
  const apiKey = getApiKey(env);
  const baseUrl = getApiBase(apiKey);
  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      ...init.headers,
    },
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : {};

  if (!response.ok) {
    const message =
      typeof data?.message === "string" ? data.message : response.statusText;
    throw new Error(`Creem API error: ${message}`);
  }

  return data as T;
}

export async function createCreemCheckout(
  env: RuntimeEnv,
  input: {
    productId: string;
    planId: string;
    origin: string;
    user: { id: number; email?: string | null; name?: string | null };
  }
) {
  const checkout = await creemRequest<CreemCheckout>(env, "/checkouts", {
    method: "POST",
    body: JSON.stringify({
      product_id: input.productId,
      request_id: `user_${input.user.id}_${input.planId}_${Date.now()}`,
      units: 1,
      success_url: `${input.origin}/dashboard?payment=success&plan=${input.planId}`,
      customer: {
        email: input.user.email ?? undefined,
      },
      metadata: {
        user_id: input.user.id.toString(),
        plan_id: input.planId,
        customer_email: input.user.email ?? "",
        customer_name: input.user.name ?? "",
      },
    }),
  });

  const url = checkout.checkout_url ?? checkout.checkoutUrl;
  if (!url) throw new Error("Creem did not return a checkout URL");
  return url;
}

export async function cancelCreemSubscription(
  env: RuntimeEnv,
  subscriptionId: string
) {
  await creemRequest(env, `/subscriptions/${subscriptionId}/cancel`, {
    method: "POST",
    body: JSON.stringify({}),
  });
}

export async function verifyCreemSignature(
  body: string,
  signature: string | null,
  secret: string | undefined
) {
  if (!signature || !secret?.trim()) return false;

  const normalizedSignature = signature.trim().toLowerCase();
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret.trim()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const digest = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(body)
  );
  const bytes = new Uint8Array(digest);
  let computed = "";
  for (let index = 0; index < bytes.length; index += 1) {
    computed += bytes[index]!.toString(16).padStart(2, "0");
  }

  if (computed.length !== normalizedSignature.length) return false;

  let diff = 0;
  for (let index = 0; index < computed.length; index += 1) {
    diff |= computed.charCodeAt(index) ^ normalizedSignature.charCodeAt(index);
  }
  return diff === 0;
}

export function getCreemEventObject(event: CreemWebhookEvent) {
  return event.object ?? event.data?.object ?? {};
}

export function getCreemEventType(event: CreemWebhookEvent) {
  return event.eventType ?? event.type ?? "";
}
