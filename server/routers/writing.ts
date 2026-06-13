import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { invokeLLM } from "../_core/llm";
import {
  writingSessions,
  citationHistory,
  subscriptions,
  usageEvents,
} from "../../drizzle/schema";
import { and, desc, eq, gte } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

type UsagePlan = "free" | "student" | "pro";
type UsageFeature = "polish" | "citation";

const PLAN_LIMITS: Record<
  UsagePlan,
  {
    polishMaxWordsPerRequest: number;
    polishDailyWords: number;
    polishDailyRequests: number;
    citationDailyRequests: number;
  }
> = {
  free: {
    polishMaxWordsPerRequest: 300,
    polishDailyWords: 1000,
    polishDailyRequests: 5,
    citationDailyRequests: 3,
  },
  student: {
    polishMaxWordsPerRequest: 2000,
    polishDailyWords: 20000,
    polishDailyRequests: 30,
    citationDailyRequests: 30,
  },
  pro: {
    polishMaxWordsPerRequest: 5000,
    polishDailyWords: 50000,
    polishDailyRequests: 80,
    citationDailyRequests: 80,
  },
};

function getWordCount(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function getStartOfUtcDay() {
  const now = new Date();
  return Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
}

function getClientIdentifier(headers: Headers | Record<string, string | string[] | undefined>) {
  const read = (key: string) => {
    if (headers instanceof Headers) {
      return headers.get(key) ?? undefined;
    }

    const value = headers[key.toLowerCase()];
    return Array.isArray(value) ? value[0] : value;
  };

  const forwardedFor = read("x-forwarded-for");
  const ip =
    read("cf-connecting-ip") ??
    read("true-client-ip") ??
    read("x-real-ip") ??
    forwardedFor?.split(",")[0]?.trim();
  const userAgent = read("user-agent") ?? "unknown-agent";

  return ip ? `ip:${ip}` : `ua:${userAgent.slice(0, 120)}`;
}

async function getUsagePlan(
  db: NonNullable<Awaited<ReturnType<typeof import("../db").getDb>>>,
  userId: number
): Promise<UsagePlan> {
  const result = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.userId, userId))
    .orderBy(desc(subscriptions.createdAt))
    .limit(1);

  const subscription = result[0];
  if (!subscription) return "free";

  const isActive = subscription.status === "active" || subscription.status === "trialing";
  return isActive ? subscription.plan : "free";
}

async function getTodayUsage(
  db: NonNullable<Awaited<ReturnType<typeof import("../db").getDb>>>,
  identifier: string,
  feature: UsageFeature,
  userId?: number
) {
  const startOfDay = new Date(getStartOfUtcDay());
  const filters = userId
    ? and(eq(usageEvents.feature, feature), eq(usageEvents.userId, userId), gte(usageEvents.createdAt, startOfDay))
    : and(eq(usageEvents.feature, feature), eq(usageEvents.identifier, identifier), gte(usageEvents.createdAt, startOfDay));

  return db.select().from(usageEvents).where(filters);
}

async function recordUsageEvent(
  db: NonNullable<Awaited<ReturnType<typeof import("../db").getDb>>>,
  identifier: string,
  feature: UsageFeature,
  units: number,
  userId?: number
) {
  await db.insert(usageEvents).values({
    userId,
    identifier,
    feature,
    units,
  });
}

function toFiniteNumber(value: unknown, fallback = 0) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
}

function normalizeSuggestionType(value: unknown) {
  const normalized = String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[ /-]+/g, "_");

  const allowed = new Set([
    "non_native_expression",
    "vocabulary",
    "sentence_structure",
    "hedging",
    "formality",
  ]);

  if (allowed.has(normalized)) return normalized;
  if (normalized.includes("grammar")) return "sentence_structure";
  if (normalized.includes("style")) return "formality";
  return "sentence_structure";
}

function normalizePolishResult(raw: unknown) {
  const data = raw && typeof raw === "object" ? raw as Record<string, unknown> : {};
  const rawSuggestions = Array.isArray(data.suggestions) ? data.suggestions : [];
  const rawScoreBreakdown =
    data.scoreBreakdown && typeof data.scoreBreakdown === "object"
      ? (data.scoreBreakdown as Record<string, unknown>)
      : {};

  return {
    polishedText: String(data.polishedText ?? ""),
    suggestions: rawSuggestions.map((item, index) => {
      const suggestion =
        item && typeof item === "object" ? (item as Record<string, unknown>) : {};

      return {
        id: String(suggestion.id ?? `${index + 1}`),
        original: String(suggestion.original ?? ""),
        improved: String(
          suggestion.improved ??
          suggestion.corrected ??
          suggestion.rewrite ??
          ""
        ),
        type: normalizeSuggestionType(suggestion.type),
        explanation: String(suggestion.explanation ?? ""),
      };
    }),
    overallScore: Math.round(toFiniteNumber(data.overallScore, 0)),
    scoreBreakdown: {
      vocabulary: Math.round(
        toFiniteNumber(
          rawScoreBreakdown.vocabulary && typeof rawScoreBreakdown.vocabulary === "object"
            ? (rawScoreBreakdown.vocabulary as Record<string, unknown>).score
            : rawScoreBreakdown.vocabulary,
          0
        )
      ),
      grammar: Math.round(
        toFiniteNumber(
          rawScoreBreakdown.grammar && typeof rawScoreBreakdown.grammar === "object"
            ? (rawScoreBreakdown.grammar as Record<string, unknown>).score
            : rawScoreBreakdown.grammar,
          0
        )
      ),
      academicTone: Math.round(
        toFiniteNumber(
          rawScoreBreakdown.academicTone && typeof rawScoreBreakdown.academicTone === "object"
            ? (rawScoreBreakdown.academicTone as Record<string, unknown>).score
            : rawScoreBreakdown.academicTone,
          0
        )
      ),
      coherence: Math.round(
        toFiniteNumber(
          rawScoreBreakdown.coherence && typeof rawScoreBreakdown.coherence === "object"
            ? (rawScoreBreakdown.coherence as Record<string, unknown>).score
            : rawScoreBreakdown.coherence,
          0
        )
      ),
    },
  };
}

function normalizeCitationResult(raw: unknown) {
  const data = raw && typeof raw === "object" ? raw as Record<string, unknown> : {};
  const inTextCitation = data.inTextCitation;

  return {
    citation: String(data.citation ?? ""),
    inTextCitation:
      typeof inTextCitation === "string"
        ? inTextCitation
        : inTextCitation && typeof inTextCitation === "object"
          ? String(
              (inTextCitation as Record<string, unknown>).parenthetical ??
              (inTextCitation as Record<string, unknown>).narrative ??
              ""
            )
          : "",
    notes: String(data.notes ?? ""),
  };
}

const extractJsonPayload = (rawContent: unknown) => {
  const content = typeof rawContent === "string"
    ? rawContent
    : Array.isArray(rawContent)
      ? rawContent
          .map(part => {
            if (
              part &&
              typeof part === "object" &&
              "type" in part &&
              part.type === "text" &&
              "text" in part
            ) {
              return String(part.text);
            }
            return "";
          })
          .join("\n")
      : "";

  const trimmed = content.trim();
  if (!trimmed) {
    throw new Error("AI response was empty");
  }

  const fencedMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  const candidate = fencedMatch?.[1]?.trim() ?? trimmed;

  try {
    return JSON.parse(candidate);
  } catch {
    const objectMatch = candidate.match(/\{[\s\S]*\}/);
    if (!objectMatch) {
      throw new Error(`AI returned non-JSON content: ${candidate.slice(0, 200)}`);
    }
    return JSON.parse(objectMatch[0]);
  }
};

export const polishRouter = router({
  polish: publicProcedure
    .input(
      z.object({
        text: z.string().min(10).max(5000),
        discipline: z
          .enum(["stem", "social_science", "humanities", "general"])
          .default("general"),
        nativeLanguage: z.string().default("Chinese"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = ctx.db;
      const identifier = getClientIdentifier(ctx.req.headers);
      const wordCount = getWordCount(input.text);
      const plan = ctx.user && db ? await getUsagePlan(db, ctx.user.id) : "free";
      const limits = PLAN_LIMITS[plan];

      if (wordCount > limits.polishMaxWordsPerRequest) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
          plan === "free"
            ? `Free usage supports up to ${limits.polishMaxWordsPerRequest} words per polish. Upgrade to Student for longer passages.`
            : `${plan === "student" ? "Student" : "Pro"} plan supports up to ${limits.polishMaxWordsPerRequest} words per polish.`,
        });
      }

      if (db) {
        const usage = await getTodayUsage(db, identifier, "polish", ctx.user?.id);
        const requestsToday = usage.length;
        const wordsToday = usage.reduce((sum, event) => sum + (event.units ?? 0), 0);

        if (requestsToday >= limits.polishDailyRequests) {
          throw new TRPCError({
            code: "TOO_MANY_REQUESTS",
            message:
            plan === "free"
              ? "You have reached today's free polish limit. Sign in or upgrade for more usage."
              : "You have reached today's polish limit for your plan. Please try again tomorrow or contact support if you need a higher cap.",
          });
        }

        if (wordsToday + wordCount > limits.polishDailyWords) {
          throw new TRPCError({
            code: "TOO_MANY_REQUESTS",
            message:
            plan === "free"
              ? `Free usage includes up to ${limits.polishDailyWords.toLocaleString()} AI polish words per day. Upgrade to continue with longer drafts.`
              : `You have reached today's ${plan} plan polish word limit. Please try again tomorrow or shorten this draft.`,
          });
        }
      }

      const systemPrompt = `You are CorePapers, an expert academic writing assistant specializing in helping non-native English speakers write like native academic writers.

Your task is to analyze the provided text and:
1. Identify non-native expressions (Chinglish, direct translations, informal phrasing)
2. Suggest academic vocabulary upgrades
3. Improve sentence variety and complexity
4. Maintain the author's original meaning

Respond with a JSON object in this exact format:
{
  "polishedText": "the fully polished version of the text",
  "suggestions": [
    {
      "id": "1",
      "original": "exact original phrase",
      "improved": "improved version",
      "type": "non_native_expression | vocabulary | sentence_structure | hedging | formality",
      "explanation": "brief explanation of why this change improves academic quality"
    }
  ],
  "overallScore": 75,
  "scoreBreakdown": {
    "vocabulary": 70,
    "grammar": 80,
    "academicTone": 65,
    "coherence": 75
  }
}`;

      const response = await invokeLLM(
        {
          messages: [
            { role: "system", content: systemPrompt },
            {
              role: "user",
              content: `Discipline: ${input.discipline}\nNative language background: ${input.nativeLanguage}\n\nText to polish:\n${input.text}`,
            },
          ],
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "polish_result",
              strict: true,
              schema: {
                type: "object",
                properties: {
                  polishedText: { type: "string" },
                  suggestions: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "string" },
                        original: { type: "string" },
                        improved: { type: "string" },
                        type: { type: "string" },
                        explanation: { type: "string" },
                      },
                      required: [
                        "id",
                        "original",
                        "improved",
                        "type",
                        "explanation",
                      ],
                      additionalProperties: false,
                    },
                  },
                  overallScore: { type: "number" },
                  scoreBreakdown: {
                    type: "object",
                    properties: {
                      vocabulary: { type: "number" },
                      grammar: { type: "number" },
                      academicTone: { type: "number" },
                      coherence: { type: "number" },
                    },
                    required: [
                      "vocabulary",
                      "grammar",
                      "academicTone",
                      "coherence",
                    ],
                    additionalProperties: false,
                  },
                },
                required: [
                  "polishedText",
                  "suggestions",
                  "overallScore",
                  "scoreBreakdown",
                ],
                additionalProperties: false,
              },
            },
          },
        },
        ctx.env
      );

      if (db) {
        await recordUsageEvent(db, identifier, "polish", wordCount, ctx.user?.id);
      }

      return normalizePolishResult(
        extractJsonPayload(response.choices[0]?.message?.content)
      );
    }),

  saveSession: protectedProcedure
    .input(
      z.object({
        title: z.string().optional(),
        originalText: z.string(),
        polishedText: z.string(),
        discipline: z
          .enum(["stem", "social_science", "humanities", "general"])
          .default("general"),
        wordCount: z.number().default(0),
        suggestions: z.any().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = ctx.db;
      if (!db) {
        throw new Error("Database unavailable");
      }
      await db.insert(writingSessions).values({
        userId: ctx.user.id,
        title: input.title ?? "Untitled",
        originalText: input.originalText,
        polishedText: input.polishedText,
        discipline: input.discipline,
        wordCount: input.wordCount,
        suggestions: input.suggestions,
      });
      return { success: true };
    }),

  getSessions: protectedProcedure.query(async ({ ctx }) => {
    const db = ctx.db;
    if (!db) {
      return [];
    }
    return db
      .select()
      .from(writingSessions)
      .where(eq(writingSessions.userId, ctx.user.id))
      .orderBy(desc(writingSessions.createdAt))
      .limit(20);
  }),
});

export const citationRouter = router({
  generate: publicProcedure
    .input(
      z.object({
        format: z.enum(["apa", "mla", "chicago", "ieee"]),
        sourceType: z.enum([
          "journal",
          "book",
          "website",
          "chapter",
          "thesis",
          "conference",
        ]),
        data: z.object({
          authors: z.string().optional(),
          title: z.string(),
          year: z.string().optional(),
          journal: z.string().optional(),
          volume: z.string().optional(),
          issue: z.string().optional(),
          pages: z.string().optional(),
          publisher: z.string().optional(),
          city: z.string().optional(),
          url: z.string().optional(),
          doi: z.string().optional(),
          accessDate: z.string().optional(),
          edition: z.string().optional(),
          institution: z.string().optional(),
          booktitle: z.string().optional(),
          editors: z.string().optional(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = ctx.db;
      const identifier = getClientIdentifier(ctx.req.headers);
      const plan = ctx.user && db ? await getUsagePlan(db, ctx.user.id) : "free";
      const limits = PLAN_LIMITS[plan];

      if (db) {
        const usage = await getTodayUsage(db, identifier, "citation", ctx.user?.id);
        if (usage.length >= limits.citationDailyRequests) {
          throw new TRPCError({
            code: "TOO_MANY_REQUESTS",
            message:
            plan === "free"
              ? "You have reached today's free citation limit. Upgrade for higher daily usage."
              : "You have reached today's citation limit for your plan. Please try again tomorrow.",
          });
        }
      }

      const systemPrompt = `You are a citation formatting expert. Generate a perfectly formatted citation in the requested style.

Return ONLY a JSON object with this structure:
{
  "citation": "the formatted citation string",
  "inTextCitation": "the in-text citation format",
  "notes": "any important formatting notes"
}

Follow the latest edition guidelines strictly:
- APA: 7th edition
- MLA: 9th edition
- Chicago: 17th edition (Notes-Bibliography style)
- IEEE: current standards`;

      const response = await invokeLLM(
        {
          messages: [
            { role: "system", content: systemPrompt },
            {
              role: "user",
              content: `Format: ${input.format.toUpperCase()}\nSource type: ${input.sourceType}\nData: ${JSON.stringify(input.data, null, 2)}`,
            },
          ],
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "citation_result",
              strict: true,
              schema: {
                type: "object",
                properties: {
                  citation: { type: "string" },
                  inTextCitation: { type: "string" },
                  notes: { type: "string" },
                },
                required: ["citation", "inTextCitation", "notes"],
                additionalProperties: false,
              },
            },
          },
        },
        ctx.env
      );

      if (db) {
        await recordUsageEvent(db, identifier, "citation", 1, ctx.user?.id);
      }

      return normalizeCitationResult(
        extractJsonPayload(response.choices[0]?.message?.content)
      );
    }),

  saveCitation: publicProcedure
    .input(
      z.object({
        userId: z.number().optional(),
        format: z.enum(["apa", "mla", "chicago", "ieee"]),
        sourceType: z.string(),
        inputData: z.any(),
        outputCitation: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = ctx.db;
      if (!db) {
        return { success: false };
      }
      await db.insert(citationHistory).values({
        userId: input.userId,
        format: input.format,
        sourceType: input.sourceType,
        inputData: input.inputData,
        outputCitation: input.outputCitation,
      });
      return { success: true };
    }),
});
