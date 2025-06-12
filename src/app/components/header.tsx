"use client";

import { Link } from "@/navigation";
import { usePathname } from "@/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DesktopMenu from "./desktop-menu";
import { useHoverStore } from "../store/hover-store";
import { useScrollStore } from "../store/scroll-store";

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
  const currentPath = usePathname();
  const [showMenu, setShowMenu] = useState(false);
  const hasScrolled = useScrollStore((state) => state.hasScrolled);

  const isHoveringCard = useHoverStore((state) => state.isHoveringCard);
  const setIsHoveringCard = useHoverStore((state) => state.setIsHoveringCard);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
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

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleContactClick = () => {
    setShowMenu((prev) => !prev);
  };

  const renderHeaderContent = () => (
    <div
      className={`h-[50px] px-[15px] lg:px-[40px] grid grid-cols-2 items-center transition-all duration-300 ${
        showMenu ? "border-t-[0.8px] border-black" : ""
      }`}
    >
      <img
        className="cursor-pointer"
        onClick={handleContactClick}
        src={showMenu ? "/images/close-menu.svg" : "/images/logo-menu.svg"}
        alt={showMenu ? "Cerrar menú" : "Abrir menú"}
      />

      <div className="hidden lg:flex pl-[30px] justify-between">
        {links.map((link, index) => {
          const isActive = currentPath === link.url;
          const isHovered = hoveredIndex === index;

          return (
            <Link
              key={index}
              href={link.url}
              className="flex items-center gap-[6px]"
              onClick={() => setShowMenu(false)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={
                  isActive || isHovered
                    ? "/images/circle-black.svg"
                    : "/images/circle.svg"
                }
                className="h-[10px] w-[10px]"
                alt=""
              />
              <span className="text-[18px] leading-[18px]">{link.title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      <AnimatePresence>
        {currentPath === "/" ? (
          isMobile || (hasScrolled && !isHoveringCard) ? (
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

      <DesktopMenu showContact={showMenu} setShowContact={setShowMenu} />
    </>
  );
}

export default Header;
