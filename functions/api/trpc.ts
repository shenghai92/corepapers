import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "../../server/routers";
import { createContext } from "../../server/_core/context";
import { buildRuntimeEnv } from "../../server/_core/env";

type PagesContext = {
  request: Request;
  env: Record<string, unknown>;
};

export async function onRequest(context: PagesContext) {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: context.request,
    router: appRouter,
    createContext: () =>
      createContext({
        req: context.request,
        env: buildRuntimeEnv(context.env),
      }),
  });
}
