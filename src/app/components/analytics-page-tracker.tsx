"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// gtag('config', ...) in the root layout only fires GA4's automatic
// page_view once, on the initial hard load. Client-side navigation between
// pages (every internal <Link>) never told GA4 the URL changed — GA4's own
// auto-collected events (session_start, user_engagement, scroll) after that
// first pageview end up with no page attached, showing as "(not set)" for
// nearly every session. This sends an explicit page_view on every route
// change so subsequent pages are actually recorded.
export function AnalyticsPageTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.gtag !== "function") {
      return;
    }
    const query = searchParams.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    window.gtag("event", "page_view", {
      page_path: url,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, searchParams]);

  return null;
}

export default AnalyticsPageTracker;
