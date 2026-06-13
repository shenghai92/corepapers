import { z } from "zod";
import { publicProcedure, router } from "./trpc";
import { getDbDiagnostics } from "../db";
import { getAiRuntimeDebug, invokeLLM } from "./llm";
import { usageEvents } from "../../drizzle/schema";

export const systemRouter = router({
  health: publicProcedure
    .input(
      z.object({
        timestamp: z.number().min(0, "timestamp cannot be negative"),
      })
    )
    .query(() => ({
      ok: true,
    })),
  runtime: publicProcedure.query(({ ctx }) => ({
    ok: true,
    hasDbBinding: Boolean(ctx.env.DB),
    hasDbClient: Boolean(ctx.db),
    db: getDbDiagnostics(),
  })),
  aiRuntime: publicProcedure.query(({ ctx }) => ({
    ok: true,
    ...getAiRuntimeDebug(ctx.env),
  })),
  aiProbe: publicProcedure.query(async ({ ctx }) => {
    const runtime = getAiRuntimeDebug(ctx.env);

    const runProbe = async (
      mode: "text" | "json_schema",
      requestFactory: Parameters<typeof invokeLLM>[0]
    ) => {
      try {
        const response = await invokeLLM(requestFactory, ctx.env);
        const rawContent = response.choices[0]?.message?.content;
        const content =
          typeof rawContent === "string"
            ? rawContent
            : Array.isArray(rawContent)
              ? rawContent
                  .map((part) =>
                    part.type === "text" ? part.text : JSON.stringify(part)
                  )
                  .join("\n")
              : "";

        return {
          ok: true,
          mode,
          model: response.model,
          contentPreview: content.slice(0, 300),
        };
      } catch (error) {
        return {
          ok: false,
          mode,
          error: error instanceof Error ? error.message : String(error),
        };
      }
    };

    const textProbe = await runProbe("text", {
      messages: [
        {
          role: "system",
          content: "Reply with exactly one short sentence.",
        },
        {
          role: "user",
          content: "Say hello to CorePapers users.",
        },
      ],
    });

    const jsonSchemaProbe = await runProbe("json_schema", {
      messages: [
        {
          role: "system",
          content: "Return valid JSON that matches the requested schema.",
        },
        {
          role: "user",
          content: "Return a short status object for diagnostics.",
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "diagnostic_status",
          strict: true,
          schema: {
            type: "object",
            properties: {
              status: { type: "string" },
              detail: { type: "string" },
            },
            required: ["status", "detail"],
            additionalProperties: false,
          },
        },
      },
    });

    return {
      ok: true,
      runtime,
      textProbe,
      jsonSchemaProbe,
    };
  }),
  aiBusinessProbe: publicProcedure.query(async ({ ctx }) => {
    const run = async (name: string, fn: () => Promise<unknown>) => {
      try {
        const result = await fn();
        return {
          ok: true,
          name,
          result,
        };
      } catch (error) {
        return {
          ok: false,
          name,
          error: error instanceof Error ? error.message : String(error),
        };
      }
    };

    const extractJsonPayload = (rawContent: unknown) => {
      const content = typeof rawContent === "string"
        ? rawContent
        : Array.isArray(rawContent)
          ? rawContent
              .map((part) =>
                part && typeof part === "object" && "type" in part && part.type === "text" && "text" in part
                  ? String(part.text)
                  : ""
              )
              .join("\n")
          : "";

      const trimmed = content.trim();
      if (!trimmed) {
        throw new Error("AI response was empty");
      }

      const fencedMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
      const candidate = fencedMatch?.[1]?.trim() ?? trimmed;
      const objectMatch = candidate.match(/\{[\s\S]*\}/);
      return JSON.parse(objectMatch?.[0] ?? candidate);
    };

    const polishInvoke = await run("polishInvoke", async () => {
      const response = await invokeLLM(
        {
          messages: [
            {
              role: "system",
              content:
                "You are CorePapers, an expert academic writing assistant. Return a JSON object with polishedText, suggestions, overallScore, scoreBreakdown.",
            },
            {
              role: "user",
              content:
                "Discipline: general\nNative language background: Chinese\n\nText to polish:\nThe research show that many student have difficulty in writing academic paper.",
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
                      required: ["id", "original", "improved", "type", "explanation"],
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
                    required: ["vocabulary", "grammar", "academicTone", "coherence"],
                    additionalProperties: false,
                  },
                },
                required: ["polishedText", "suggestions", "overallScore", "scoreBreakdown"],
                additionalProperties: false,
              },
            },
          },
        },
        ctx.env
      );

      return extractJsonPayload(response.choices[0]?.message?.content);
    });

    const citationInvoke = await run("citationInvoke", async () => {
      const response = await invokeLLM(
        {
          messages: [
            {
              role: "system",
              content:
                "You are a citation formatting expert. Return a JSON object with citation, inTextCitation, notes.",
            },
            {
              role: "user",
              content:
                "Format: APA\nSource type: journal\nData: {\"authors\":\"Smith, John; Lee, Anna\",\"title\":\"AI feedback in second language writing\",\"year\":\"2024\",\"journal\":\"Journal of Academic Writing\",\"volume\":\"12\",\"issue\":\"3\",\"pages\":\"45-62\",\"doi\":\"10.1234/jaw.2024.003\"}",
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

      return extractJsonPayload(response.choices[0]?.message?.content);
    });

    const usageWrite = await run("usageWrite", async () => {
      if (!ctx.db) {
        throw new Error("Database unavailable");
      }

      await ctx.db.insert(usageEvents).values({
        identifier: "system-probe",
        feature: "polish",
        units: 10,
      });

      return { inserted: true };
    });

    return {
      ok: true,
      polishInvoke,
      citationInvoke,
      usageWrite,
    };
  }),
});
