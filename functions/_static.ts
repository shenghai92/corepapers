type StaticPagesContext = {
  request: Request;
  env: {
    ASSETS: {
      fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
    };
  };
};

export async function serveStaticPage(
  context: StaticPagesContext,
  assetPath: string
) {
  const assetUrl = new URL(assetPath, context.request.url);
  const assetRequest = new Request(assetUrl.toString(), context.request);
  return context.env.ASSETS.fetch(assetRequest);
}
