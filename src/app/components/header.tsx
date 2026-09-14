"use client";

import { Link } from "@/navigation";
import { usePathname } from "@/navigation";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useHoverStore } from "../store/hover-store";
import { useScrollStore } from "../store/scroll-store";
import { useLocale } from "next-intl";

interface LinksHeader {
  title: string;
  url: string;
}

export function Header({
  links,
  params,
}: {
  links: LinksHeader[];
  params: { locale: "es" | "de" | "en" };
}) {
  const locale = params.locale;
  const activeLocale = useLocale();
  const currentPath = usePathname();
  const hasScrolled = useScrollStore((state) => state.hasScrolled);

  const allowedSegments = ["decor", "architecture", "development"];
  const pathSegments = currentPath.split("/").filter(Boolean);
  const isAllowedRoute =
    pathSegments.length === 1 && allowedSegments.includes(pathSegments[0]);
  // Home is scroll-gated on mobile too (not just architecture/decor/
  // development) — isAllowedRoute alone excludes it (pathSegments is empty
  // there), which was leaving the mobile home bar always visible instead
  // of waiting for a scroll like every other mobile route.
  const isMobileGatedRoute = currentPath === "/" || isAllowedRoute;

  const isHoveringCard = useHoverStore((state) => state.isHoveringCard);
  const setIsHoveringCard = useHoverStore((state) => state.setIsHoveringCard);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  // null = "don't know yet". Rendering the wrong branch even for one frame
  // while this defaults to a guess (e.g. false = desktop) was enough for
  // AnimatePresence to commit to showing the "always visible" header on
  // mobile before the real width was known — a later correct re-render
  // doesn't undo that, since as far as AnimatePresence is concerned that
  // element already mounted. Not rendering anything until we're sure
  // avoids the wrong branch ever being seen at all.
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useLayoutEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 1024);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    setIsHoveringCard(false);
  }, []);

  useEffect(() => {
    setIsHoveringCard(false);
    // Touch devices fire a synthetic mouseenter on tap with no matching
    // mouseleave (nothing to "leave" without a real pointer), so the
    // hover-black-dot could otherwise stay stuck on whatever was last
    // tapped. Clearing it on every navigation is the safety net for that.
    setHoveredIndex(null);
  }, [currentPath, setIsHoveringCard]);

  const setHasScrolled = useScrollStore((state) => state.setHasScrolled);

  // hasScrolled lives in a store that persists across client-side
  // navigations. Without this, scrolling on one gated route (say,
  // Architecture) left hasScrolled=true, so the NEXT gated route you
  // clicked to (including Home) rendered its bar immediately instead of
  // waiting for a fresh scroll on that page.
  const isGatedRoute =
    (!isMobile && currentPath === "/") || (isMobile && isMobileGatedRoute);
  // A route change doesn't reset window.scrollY by itself (the page
  // components force it back to 0 themselves, in up to 3 delayed steps).
  // Until that settles, the OLD scroll position briefly overhangs the NEW
  // (often shorter) page, and the browser clamping it to fit fires a real
  // native scroll event above the 24px threshold — undoing the reset below
  // a moment after it runs. Ignoring scroll events for a short window right
  // after a gated navigation filters out that clamp-triggered event without
  // touching a genuine scroll gesture, which never arrives this fast.
  const justNavigatedRef = useRef(true);
  useEffect(() => {
    if (!isGatedRoute) return;
    setHasScrolled(false);
    justNavigatedRef.current = true;
    const settle = setTimeout(() => {
      justNavigatedRef.current = false;
    }, 400);
    return () => clearTimeout(settle);
  }, [currentPath, isGatedRoute, setHasScrolled]);

  // The reset above only ever gets undone by home-animation.tsx's own scroll
  // listener, which isn't mounted outside the homepage — meaning the bottom
  // bar (and, until it went inline, the hamburger) could never reappear on
  // architecture/decor/development after that reset. A global listener here
  // (this component mounts on every page) makes "hidden until you scroll"
  // actually work everywhere instead of only on home.
  useEffect(() => {
    // A small threshold, not window.scrollY > 0 — on real phones, the
    // address bar collapsing and content reflowing during hydration can
    // fire a genuine native scroll event for a few px with no user gesture
    // at all, which made the bar appear immediately instead of after an
    // actual scroll.
    const handleScroll = () => {
      if (justNavigatedRef.current) return;
      if (window.scrollY > 24) setHasScrolled(true);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setHasScrolled]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const renderNavLink = (
    link: LinksHeader,
    index: number,
    textSize: string
  ) => {
    const isActive = currentPath === link.url;
    const isHovered = hoveredIndex === index;

    return (
      <Link
        key={index}
        href={link.url}
        className="flex items-center gap-[6px]"
        onMouseEnter={() => {
          // (hover: hover) excludes touch — a tap fires a synthetic
          // mouseenter with no real mouseleave to follow, which is what
          // left the dot stuck black after selecting a link on mobile.
          if (window.matchMedia?.("(hover: hover)").matches) {
            setHoveredIndex(index);
          }
        }}
        onMouseLeave={() => setHoveredIndex(null)}
        onClick={() => setHoveredIndex(null)}
      >
        <img
          src={
            isActive || isHovered
              ? "/images/circle-black.svg"
              : "/images/circle.svg"
          }
          className="h-[8px] w-[8px] lg:h-[10px] lg:w-[10px]"
          alt=""
        />
        <span className={`${textSize} leading-[1]`}>{link.title}</span>
      </Link>
    );
  };

  const renderLangSwitch = (textSize: string) => (
    <div className={`flex items-center gap-[6px] ${textSize} leading-[1]`}>
      <Link
        href={currentPath}
        locale="en"
        className={`transition-opacity ${
          activeLocale === "en" ? "opacity-100" : "opacity-40"
        }`}
      >
        EN
      </Link>
      <span className="opacity-40">/</span>
      <Link
        href={currentPath}
        locale="es"
        className={`transition-opacity ${
          activeLocale === "es" ? "opacity-100" : "opacity-40"
        }`}
      >
        ES
      </Link>
    </div>
  );

  const renderHeaderContent = () => (
    <div className="px-[15px] lg:px-[40px] transition-all duration-300">
      {/* Mobile: two rows, everything always visible — replaces the old
          hamburger -> full-screen menu (desktop already dropped it for the
          same reason: no dead-end tap needed to see Publications/Contact/
          language). */}
      <div className="lg:hidden py-[8px] flex flex-col gap-[6px]">
        {/* Both rows use the same 3-column grid so items line up between
            rows regardless of how long each label is (justify-between only
            evens out the gaps, not the columns). */}
        <div className="grid grid-cols-3 items-center">
          {links.slice(0, 3).map((link, index) => renderNavLink(link, index, "text-[14px]"))}
        </div>
        <div className="grid grid-cols-3 items-center opacity-70">
          {links.slice(3).map((link, index) => renderNavLink(link, index + 3, "text-[12px]"))}
          {renderLangSwitch("text-[12px]")}
        </div>
      </div>

      <div className="hidden lg:flex h-[50px] lg:gap-[32px] items-center justify-center">
        {links.map((link, index) => renderNavLink(link, index, "text-[18px]"))}
        {renderLangSwitch("text-[18px]")}
      </div>
    </div>
  );

  return (
    <>
      {isMobile === null
        ? null
        : isGatedRoute ? (
            hasScrolled &&
            !isHoveringCard && (
              // Plain conditional, no AnimatePresence: its exit animation was
              // getting stuck mid-transition on a route change (two stale
              // bar instances lingering at rest, neither ever finishing its
              // exit and unmounting) whenever hasScrolled flipped back to
              // false right after navigating between gated routes. An
              // instant hide is correct here anyway — the whole point is
              // that the bar shouldn't be visible until you scroll again.
              <motion.header
                className="bg-gray container fixed bottom-0 z-[1002]"
                initial={hasMounted && !isMobile ? { y: 100, opacity: 0 } : false}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.1 }}
              >
                {renderHeaderContent()}
              </motion.header>
            )
          ) : (
            !isHoveringCard && (
              <header className="bg-gray container fixed bottom-0 z-[1002]">
                {renderHeaderContent()}
              </header>
            )
          )}
    </>
  );
}

export default Header;
