import { useEffect } from "react";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  noIndex?: boolean;
  jsonLd?: object | object[];
}

const SITE_NAME = "CorePapers";
const BASE_URL = "https://corepapers.space";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-default.png`;
const DEFAULT_TITLE = `${SITE_NAME} - AI Academic Writing Assistant for International Students`;

function normalizeCanonicalPath(path: string) {
  const pathname = path.split("?")[0].split("#")[0] || "/";
  if (pathname === "/") return "/";
  return `${pathname.replace(/\/+$/, "")}/`;
}

export default function SEOHead({
  title,
  description,
  keywords,
  canonical,
  ogType = "website",
  ogImage = DEFAULT_OG_IMAGE,
  noIndex = false,
  jsonLd,
}: SEOHeadProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (selector: string, content: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        const attr = selector.startsWith('meta[name')
          ? "name"
          : selector.startsWith('meta[property')
            ? "property"
            : "name";
        const value = selector.match(/["']([^"']+)["']/)?.[1] ?? "";
        el.setAttribute(attr, value);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    if (description) {
      setMeta('meta[name="description"]', description);
      setMeta('meta[property="og:description"]', description);
      setMeta('meta[name="twitter:description"]', description);
    }

    if (keywords) {
      setMeta('meta[name="keywords"]', keywords);
    }

    setMeta(
      'meta[name="robots"]',
      noIndex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    );
    setMeta('meta[property="og:title"]', fullTitle);
    setMeta('meta[property="og:type"]', ogType);
    setMeta('meta[property="og:image"]', ogImage);
    setMeta('meta[name="twitter:title"]', fullTitle);
    setMeta('meta[name="twitter:image"]', ogImage);
    setMeta('meta[name="twitter:card"]', "summary_large_image");

    const resolvedCanonical = `${BASE_URL}${normalizeCanonicalPath(canonical ?? window.location.pathname)}`;

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = resolvedCanonical;
    setMeta('meta[property="og:url"]', resolvedCanonical);

    document.querySelectorAll('script[data-page-jsonld]').forEach((node) => node.remove());
    if (jsonLd) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-page-jsonld", "true");
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      document.querySelectorAll('script[data-page-jsonld]').forEach((node) => node.remove());
    };
  }, [canonical, description, fullTitle, jsonLd, keywords, noIndex, ogImage, ogType]);

  return null;
}
