import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "../../server/routers";
import { createContext } from "../../server/_core/context";
import { buildRuntimeEnv } from "../../server/_core/env";

type PagesContext = {
  request: Request;
  env: Record<string, unknown>;
};

export async function onRequest(context: PagesContext) {
  const env = buildRuntimeEnv(context.env);
  const resHeaders = new Headers();

  try {
    return await fetchRequestHandler({
      endpoint: "/api/trpc",
      req: context.request,
      router: appRouter,
      createContext: () =>
        createContext({
          req: context.request,
          env,
          resHeaders,
        }),
      responseMeta(opts) {
        return {
          headers: opts.ctx?.resHeaders ?? resHeaders,
        };
      },
      onError({ error, path, type }) {
        console.error("[tRPC]", type, path ?? "(unknown)", error);
      },
    });
  } catch (error) {
    console.error("[tRPC] Unhandled error", error);
    return Response.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500, headers: resHeaders }
    );
  }
}
