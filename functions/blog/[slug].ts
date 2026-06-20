type AssetsFetcher = {
  fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
};

type BlogContext = (context: {
  request: Request;
  params: { slug?: string };
  env: { ASSETS: AssetsFetcher };
  next: () => Promise<Response>;
}) => Promise<Response>;

export const onRequest: BlogContext = async (context) => {
  const slug = typeof context.params.slug === "string" ? context.params.slug.trim() : "";

  if (!slug) {
    return context.next();
  }

  const assetUrl = new URL(context.request.url);
  assetUrl.pathname = `/blog/${slug}.html`;

  const assetResponse = await context.env.ASSETS.fetch(new Request(assetUrl.toString(), context.request));

  if (assetResponse.status !== 404) {
    return assetResponse;
  }

  return context.next();
};
