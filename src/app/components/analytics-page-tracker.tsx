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

  useEffect(() => {
    // Contact intent: email, phone and WhatsApp clicks are reported as GA4's
    // recommended "generate_lead" event (mark it as a key event in GA4).
    // Instagram, map and press clicks get their own events.
    const onClick = (e: MouseEvent) => {
      if (typeof window.gtag !== "function") return;
      const a = (e.target as Element | null)?.closest?.("a");
      const href = a?.getAttribute("href");
      if (!a || !href) return;
      const base = {
        link_url: href,
        link_text: (a.textContent || "").trim().slice(0, 80),
        page_path: window.location.pathname,
      };
      if (href.startsWith("mailto:")) {
        window.gtag("event", "generate_lead", { ...base, method: "email" });
      } else if (href.startsWith("tel:")) {
        window.gtag("event", "generate_lead", { ...base, method: "phone" });
      } else if (/^https?:\/\/(wa\.me|api\.whatsapp\.com|(www\.)?whatsapp\.com)\//.test(href)) {
        window.gtag("event", "generate_lead", { ...base, method: "whatsapp" });
      } else if (/^https?:\/\/(www\.)?instagram\.com\//.test(href)) {
        const account = href.split("instagram.com/")[1]?.split(/[/?]/)[0] || "";
        window.gtag("event", "social_click", { ...base, network: "instagram", account });
      } else if (/google\.[a-z.]+\/maps/.test(href)) {
        window.gtag("event", "maps_click", base);
      } else if (a.getAttribute("data-press")) {
        window.gtag("event", "press_click", { ...base, outlet: a.getAttribute("data-press") });
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}

export default AnalyticsPageTracker;
