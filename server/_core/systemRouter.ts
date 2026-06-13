import { z } from "zod";
import { publicProcedure, router } from "./trpc";
import { getDbDiagnostics } from "../db";
import { getAiRuntimeDebug, invokeLLM } from "./llm";

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
});
