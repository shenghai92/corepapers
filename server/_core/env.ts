export type R2ObjectBody = {
  body: ReadableStream;
  httpMetadata?: {
    contentType?: string;
  };
  size?: number;
};

export type R2Bucket = {
  put(
    key: string,
    value: string | ArrayBuffer | ArrayBufferView | Blob | ReadableStream,
    options?: { httpMetadata?: { contentType?: string } }
  ): Promise<unknown>;
  get?(key: string): Promise<R2ObjectBody | null>;
};

export type D1PreparedStatement = {
  bind(...values: unknown[]): D1PreparedStatement;
};

export type D1DatabaseBinding = {
  prepare(query: string): D1PreparedStatement;
  batch<T = unknown>(statements: D1PreparedStatement[]): Promise<T[]>;
  exec(query: string): Promise<unknown>;
};

export type RuntimeEnv = {
  DATABASE_URL?: string;
  JWT_SECRET?: string;
  OWNER_EMAIL?: string;
  CREEM_API_KEY?: string;
  CREEM_WEBHOOK_SECRET?: string;
  CREEM_STUDENT_MONTHLY_PRODUCT_ID?: string;
  CREEM_STUDENT_ANNUAL_PRODUCT_ID?: string;
  CREEM_PRO_MONTHLY_PRODUCT_ID?: string;
  CREEM_PRO_ANNUAL_PRODUCT_ID?: string;
  CUSTOM_AI_API_KEY?: string;
  CUSTOM_AI_BASE_URL?: string;
  CUSTOM_AI_MODEL?: string;
  customAiApiKey?: string;
  customAiBaseUrl?: string;
  customAiModel?: string;
  DB?: D1DatabaseBinding;
  R2?: R2Bucket;
  R2_PUBLIC_URL?: string;
  // Legacy compatibility fields kept for older local tooling only.
  VITE_APP_ID?: string;
  appId?: string;
  OAUTH_SERVER_URL?: string;
  oAuthServerUrl?: string;
  OWNER_OPEN_ID?: string;
  ownerOpenId?: string;
  cookieSecret?: string;
  BUILT_IN_FORGE_API_URL?: string;
  BUILT_IN_FORGE_API_KEY?: string;
  forgeApiUrl?: string;
  forgeApiKey?: string;
  VITE_FRONTEND_FORGE_API_KEY?: string;
  VITE_FRONTEND_FORGE_API_URL?: string;
  NODE_ENV?: string;
};

function readValue(source: Record<string, unknown>, key: string) {
  const value = source[key];
  return typeof value === "string" ? value : "";
}

const defaultSource =
  typeof process !== "undefined" && process.env
    ? (process.env as Record<string, unknown>)
    : {};

export function buildRuntimeEnv(
  source: Record<string, unknown> = defaultSource
): RuntimeEnv {
  const builtInForgeUrl =
    readValue(source, "BUILT_IN_FORGE_API_URL") ||
    readValue(source, "VITE_FRONTEND_FORGE_API_URL");
  const builtInForgeKey =
    readValue(source, "BUILT_IN_FORGE_API_KEY") ||
    readValue(source, "VITE_FRONTEND_FORGE_API_KEY");
  const customAiBaseUrl = readValue(source, "CUSTOM_AI_BASE_URL");
  const customAiApiKey = readValue(source, "CUSTOM_AI_API_KEY");
  const customAiModel = readValue(source, "CUSTOM_AI_MODEL");
  const appId = readValue(source, "VITE_APP_ID");
  const oAuthServerUrl = readValue(source, "OAUTH_SERVER_URL");
  const ownerOpenId = readValue(source, "OWNER_OPEN_ID");
  const cookieSecret = readValue(source, "JWT_SECRET");

  return {
    DATABASE_URL: readValue(source, "DATABASE_URL"),
    JWT_SECRET: readValue(source, "JWT_SECRET"),
    OWNER_EMAIL: readValue(source, "OWNER_EMAIL"),
    CREEM_API_KEY: readValue(source, "CREEM_API_KEY"),
    CREEM_WEBHOOK_SECRET: readValue(source, "CREEM_WEBHOOK_SECRET"),
    CREEM_STUDENT_MONTHLY_PRODUCT_ID: readValue(
      source,
      "CREEM_STUDENT_MONTHLY_PRODUCT_ID"
    ),
    CREEM_STUDENT_ANNUAL_PRODUCT_ID: readValue(
      source,
      "CREEM_STUDENT_ANNUAL_PRODUCT_ID"
    ),
    CREEM_PRO_MONTHLY_PRODUCT_ID: readValue(source, "CREEM_PRO_MONTHLY_PRODUCT_ID"),
    CREEM_PRO_ANNUAL_PRODUCT_ID: readValue(source, "CREEM_PRO_ANNUAL_PRODUCT_ID"),
    CUSTOM_AI_API_KEY: customAiApiKey,
    CUSTOM_AI_BASE_URL: customAiBaseUrl,
    CUSTOM_AI_MODEL: customAiModel,
    customAiApiKey,
    customAiBaseUrl,
    customAiModel,
    DB: source.DB as RuntimeEnv["DB"],
    R2: source.R2 as RuntimeEnv["R2"],
    R2_PUBLIC_URL: readValue(source, "R2_PUBLIC_URL"),
    VITE_APP_ID: appId,
    appId,
    OAUTH_SERVER_URL: oAuthServerUrl,
    oAuthServerUrl,
    OWNER_OPEN_ID: ownerOpenId,
    ownerOpenId,
    cookieSecret,
    forgeApiUrl: builtInForgeUrl,
    forgeApiKey: builtInForgeKey,
    BUILT_IN_FORGE_API_URL: builtInForgeUrl,
    BUILT_IN_FORGE_API_KEY: builtInForgeKey,
    VITE_FRONTEND_FORGE_API_KEY: readValue(source, "VITE_FRONTEND_FORGE_API_KEY"),
    VITE_FRONTEND_FORGE_API_URL: readValue(source, "VITE_FRONTEND_FORGE_API_URL"),
    NODE_ENV: readValue(source, "NODE_ENV"),
  };
}

export const ENV = buildRuntimeEnv(defaultSource);
