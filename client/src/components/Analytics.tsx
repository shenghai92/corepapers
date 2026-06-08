import { useEffect } from "react";
import { useLocation } from "wouter";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __gaInitialized?: boolean;
  }
}

const DEFAULT_GA_MEASUREMENT_ID = "G-599JBEELPZ";
const GA_MEASUREMENT_ID =
  import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() || DEFAULT_GA_MEASUREMENT_ID;

function sendPageView(path: string) {
  if (!GA_MEASUREMENT_ID || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: path,
    page_title: document.title,
    page_location: window.location.href,
  });
}

export default function Analytics() {
  const [location] = useLocation();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) {
      return;
    }

    const scriptId = "ga4-script";
    const inlineId = "ga4-inline";

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(script);
    }

    // Initialize the GA queue in application code so it exists even before the
    // remote gtag.js script finishes loading.
    window.dataLayer = window.dataLayer || [];
    window.gtag =
      window.gtag ||
      ((...args: unknown[]) => {
        window.dataLayer?.push(args);
      });

    if (!document.getElementById(inlineId)) {
      const marker = document.createElement("meta");
      marker.id = inlineId;
      marker.setAttribute("data-ga4-inline", "true");
      document.head.appendChild(marker);
    }

    if (!window.__gaInitialized) {
      window.gtag("js", new Date());
      window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });
      window.__gaInitialized = true;
    }

    sendPageView(location);
  }, [location]);

  return null;
}
