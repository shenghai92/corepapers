import { z } from "zod";
import { publicProcedure, router } from "./trpc";
import { getDbDiagnostics } from "../db";

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
});
