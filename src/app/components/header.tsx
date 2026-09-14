"use client";

import { Link } from "@/navigation";
import { usePathname } from "@/navigation";
import { useState, useEffect, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  const isHoveringCard = useHoverStore((state) => state.isHoveringCard);
  const setIsHoveringCard = useHoverStore((state) => state.setIsHoveringCard);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // useLayoutEffect (not useEffect) so isMobile is corrected before the
  // browser paints anything — with useEffect there was a one-frame window,
  // right after mount, where isMobile was still its default false and this
  // component briefly took the "always visible" branch below instead of
  // the "hidden until scrolled" one meant for mobile architecture/decor/
  // development, which read as the bar showing immediately.
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
  }, [currentPath, setIsHoveringCard]);

  const setHasScrolled = useScrollStore((state) => state.setHasScrolled);

  useEffect(() => {
    if (
      isMobile &&
      ["decor", "architecture", "development"].some((segment) =>
        currentPath.includes(segment)
      )
    ) {
      setHasScrolled(false);
    }
  }, [currentPath, isMobile, setHasScrolled]);

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
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
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

  const allowedSegments = ["decor", "architecture", "development"];
  const pathSegments = currentPath.split("/").filter(Boolean);
  const isAllowedRoute =
    pathSegments.length === 1 && allowedSegments.includes(pathSegments[0]);

  return (
    <>
      <AnimatePresence>
        {(!isMobile && currentPath === "/") || (isMobile && isAllowedRoute) ? (
          hasScrolled && !isHoveringCard ? (
            <motion.header
              className="bg-gray container fixed bottom-0 z-[1002]"
              initial={hasMounted && !isMobile ? { y: 100, opacity: 0 } : false}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 1, transition: { duration: 0.5 } }}
              transition={{ duration: 0.1 }}
            >
              {renderHeaderContent()}
            </motion.header>
          ) : null
        ) : (
          !isHoveringCard && (
            <header className="bg-gray container fixed bottom-0 z-[1002]">
              {renderHeaderContent()}
            </header>
          )
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
