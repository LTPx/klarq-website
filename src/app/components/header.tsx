"use client";

import { Link } from "@/navigation";
import { usePathname } from "@/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DesktopMenu from "./desktop-menu";
import { useHoverStore } from "../store/hover-store";

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

  const isHoveringCard = useHoverStore((state) => state.isHoveringCard);
  const setIsHoveringCard = useHoverStore((state) => state.setIsHoveringCard);

  useEffect(() => {
    setIsHoveringCard(false);
  }, []);

  useEffect(() => {
    setIsHoveringCard(false);
  }, [currentPath, setIsHoveringCard]);

  const handleContactClick = () => {
    setShowMenu((prev) => !prev);
  };

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <>
      <AnimatePresence>
        {!isHoveringCard && (
          <motion.header
            className="bg-gray container fixed bottom-0 z-[1002]"
            initial={hasMounted ? { y: 100, opacity: 0 } : false}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 1, transition: { duration: 0.5 } }}
            transition={{ duration: 0.1 }}
          >
            <div
              className={`h-[50px] px-[40px] flex justify-between items-center transition-all duration-300 ${
                showMenu ? "border-t-[0.8px] border-black" : ""
              }`}
            >
              <img
                className="cursor-pointer"
                onClick={handleContactClick}
                src={
                  showMenu ? "/images/close-menu.svg" : "/images/menu-logo.svg"
                }
                alt={showMenu ? "Cerrar menú" : "Abrir menú"}
              />
              <div className="flex gap-[150px]">
                {links.map((link, index) => {
                  const isActive = currentPath === link.url;
                  return (
                    <Link
                      key={index}
                      href={link.url}
                      className="flex items-center gap-[6px]"
                      onClick={() => setShowMenu(false)}
                    >
                      <img
                        src={
                          isActive
                            ? "/images/circle-black.svg"
                            : "/images/circle.svg"
                        }
                        className="h-[10px] w-[10px]"
                        alt=""
                      />
                      <span className="text-[18px] leading-[18px]">
                        {link.title}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      <DesktopMenu showContact={showMenu} setShowContact={setShowMenu} />
    </>
  );
}

export default Header;
