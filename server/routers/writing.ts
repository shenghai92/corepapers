import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { invokeLLM } from "../_core/llm";
import { getDb } from "../db";
import { writingSessions, citationHistory } from "../../drizzle/schema";
import { eq, desc } from "drizzle-orm";

// ── AI Essay Polish ──────────────────────────────────────────────────────────

export const polishRouter = router({
  polish: publicProcedure
    .input(
      z.object({
        text: z.string().min(10).max(5000),
        discipline: z.enum(["stem", "social_science", "humanities", "general"]).default("general"),
        nativeLanguage: z.string().default("Chinese"),
      })
    )
    .mutation(async ({ input }) => {
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

      const response = await invokeLLM({
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
      });

      const content = response.choices[0]?.message?.content;
      if (!content) throw new Error("AI response was empty");

      return JSON.parse(content) as {
        polishedText: string;
        suggestions: Array<{
          id: string;
          original: string;
          improved: string;
          type: string;
          explanation: string;
        }>;
        overallScore: number;
        scoreBreakdown: {
          vocabulary: number;
          grammar: number;
          academicTone: number;
          coherence: number;
        };
      };
    }),

  saveSession: protectedProcedure
    .input(
      z.object({
        title: z.string().optional(),
        originalText: z.string(),
        polishedText: z.string(),
        discipline: z.enum(["stem", "social_science", "humanities", "general"]).default("general"),
        wordCount: z.number().default(0),
        suggestions: z.any().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
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
    const db = await getDb();
    if (!db) return [];
    return db
      .select()
      .from(writingSessions)
      .where(eq(writingSessions.userId, ctx.user.id))
      .orderBy(desc(writingSessions.createdAt))
      .limit(20);
  }),
});

// ── Citation Generator ───────────────────────────────────────────────────────

export const citationRouter = router({
  generate: publicProcedure
    .input(
      z.object({
        format: z.enum(["apa", "mla", "chicago", "ieee"]),
        sourceType: z.enum(["journal", "book", "website", "chapter", "thesis", "conference"]),
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
    .mutation(async ({ input }) => {
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

      const response = await invokeLLM({
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
      });

      const content = response.choices[0]?.message?.content;
      if (!content) throw new Error("AI response was empty");

      const result = JSON.parse(content) as {
        citation: string;
        inTextCitation: string;
        notes: string;
      };

      return result;
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
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) return { success: false };
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
