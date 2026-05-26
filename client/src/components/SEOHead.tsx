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
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} – AI Academic Writing Assistant for International Students`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Helper to set meta tag
    const setMeta = (selector: string, content: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        const attr = selector.startsWith('meta[name')
          ? "name"
          : selector.startsWith('meta[property')
          ? "property"
          : "name";
        const val = selector.match(/["']([^"']+)["']/)?.[1] ?? "";
        el.setAttribute(attr, val);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    if (description) {
      setMeta('meta[name="description"]', description);
      setMeta('meta[property="og:description"]', description);
      setMeta('meta[name="twitter:description"]', description);
    }
    if (keywords) setMeta('meta[name="keywords"]', keywords);
    if (noIndex) setMeta('meta[name="robots"]', "noindex, nofollow");

    setMeta('meta[property="og:title"]', fullTitle);
    setMeta('meta[property="og:type"]', ogType);
    setMeta('meta[property="og:image"]', ogImage);
    setMeta('meta[name="twitter:title"]', fullTitle);
    setMeta('meta[name="twitter:image"]', ogImage);

    // Canonical
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = `${BASE_URL}${canonical}`;
      setMeta('meta[property="og:url"]', `${BASE_URL}${canonical}`);
    }

    // JSON-LD
    if (jsonLd) {
      const existing = document.querySelector('script[data-page-jsonld]');
      if (existing) existing.remove();
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-page-jsonld", "true");
      script.textContent = JSON.stringify(Array.isArray(jsonLd) ? jsonLd : jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      // Cleanup page-specific JSON-LD on unmount
      if (jsonLd) {
        document.querySelector('script[data-page-jsonld]')?.remove();
      }
    };
  }, [fullTitle, description, keywords, canonical, ogType, ogImage, noIndex, jsonLd]);

  return null;
}
