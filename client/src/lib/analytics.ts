type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: AnalyticsPayload }) => void;
    va?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, props?: AnalyticsPayload) {
  if (typeof window === "undefined") return;

  try {
    document.documentElement.setAttribute("data-ga4-last-custom-event", name);

    if (typeof window.gtag === "function") {
      window.gtag("event", name, props ?? {});
    }

    if (typeof window.plausible === "function") {
      window.plausible(name, props ? { props } : undefined);
    }

    if (typeof window.va === "function") {
      window.va("event", {
        name,
        ...(props ?? {}),
      });
    }
  } catch (error) {
    console.warn("[analytics]", error);
  }
}
