import { eq } from "drizzle-orm";
import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { createAuthCookie, clearAuthCookie, hashPassword, setCookieHeader, signSessionToken, verifyPassword } from "./_core/auth";
import { getCookieOptions, type TrpcContext } from "./_core/context";
import { publicProcedure, router } from "./_core/trpc";
import { blogRouter } from "./routers/blog";
import { paymentRouter } from "./routers/payment";
import { polishRouter, citationRouter } from "./routers/writing";
import { systemRouter } from "./_core/systemRouter";
import { users } from "../drizzle/schema";

async function setLoginCookie(ctx: TrpcContext, userId: number) {
  if (!ctx.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  const token = await signSessionToken({ userId }, ctx.env.JWT_SECRET);
  const cookie = createAuthCookie(token, getCookieOptions(ctx.req).secure);
  setCookieHeader(ctx.resHeaders, cookie);

  if (ctx.res?.cookie) {
    ctx.res.cookie(COOKIE_NAME, token, {
      ...getCookieOptions(ctx.req),
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });
  }
}

async function clearLoginCookie(ctx: TrpcContext) {
  const cookie = clearAuthCookie(getCookieOptions(ctx.req).secure);
  setCookieHeader(ctx.resHeaders, cookie);

  if (ctx.res?.clearCookie) {
    ctx.res.clearCookie(COOKIE_NAME, {
      ...getCookieOptions(ctx.req),
      maxAge: -1,
    });
  }
}

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    register: publicProcedure
      .input(z.object({
        email: z.string().email(),
        password: z.string().min(8).max(128),
        name: z.string().min(1).max(120).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = ctx.db;
        if (!db) throw new Error("Database unavailable");

        const existing = await db
          .select()
          .from(users)
          .where(eq(users.email, input.email))
          .limit(1);

        const { salt, hash } = await hashPassword(input.password);

        if (existing[0]) {
          const user = existing[0];
          if (user.passwordHash) {
            throw new Error("An account with this email already exists");
          }

          await db
            .update(users)
            .set({
              name: input.name ?? user.name,
              loginMethod: "local",
              passwordHash: hash,
              passwordSalt: salt,
              lastSignedIn: new Date(),
            })
            .where(eq(users.id, user.id));

          await setLoginCookie(ctx, user.id);
          return { success: true as const };
        }

        await db.insert(users).values({
          openId: `local_${crypto.randomUUID()}`,
          name: input.name ?? null,
          email: input.email,
          loginMethod: "local",
          passwordHash: hash,
          passwordSalt: salt,
          role: ctx.env.OWNER_EMAIL && input.email === ctx.env.OWNER_EMAIL ? "admin" : "user",
          lastSignedIn: new Date(),
        });

        const userId = (await db
          .select({ id: users.id })
          .from(users)
          .where(eq(users.email, input.email))
          .limit(1))[0]?.id;

        if (!userId) throw new Error("Failed to create user");

        await setLoginCookie(ctx, userId);
        return { success: true as const };
      }),
    login: publicProcedure
      .input(z.object({
        email: z.string().email(),
        password: z.string().min(1),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = ctx.db;
        if (!db) throw new Error("Database unavailable");

        const result = await db
          .select()
          .from(users)
          .where(eq(users.email, input.email))
          .limit(1);

        const user = result[0];
        if (!user || !user.passwordHash || !user.passwordSalt) {
          throw new Error("Invalid email or password");
        }

        const ok = await verifyPassword(input.password, user.passwordSalt, user.passwordHash);
        if (!ok) {
          throw new Error("Invalid email or password");
        }

        await db
          .update(users)
          .set({
            lastSignedIn: new Date(),
            loginMethod: "local",
          })
          .where(eq(users.id, user.id));

        await setLoginCookie(ctx, user.id);
        return { success: true as const };
      }),
    logout: publicProcedure.mutation(async ({ ctx }) => {
      await clearLoginCookie(ctx);
      return { success: true } as const;
    }),
  }),
  polish: polishRouter,
  citation: citationRouter,
  blog: blogRouter,
  payment: paymentRouter,
});

export type AppRouter = typeof appRouter;
