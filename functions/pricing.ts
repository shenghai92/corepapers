import { serveStaticPage } from "./_static";

export function onRequest(context: Parameters<typeof serveStaticPage>[0]) {
  return serveStaticPage(context, "/pricing/index.html");
}
