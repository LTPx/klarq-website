"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import { useState, useEffect } from "react";
import CategoryCard from "./category-card";
import { servicesHome } from "../_interfaces/wordpress-components";
import { Link } from "@/navigation";
import { useHoverStore } from "../store/hover-store";
// import { getProxyImageUrl } from "@/utils/image_proxy";
import CustomCursor from "./custom-cursor";
import { useScrollStore } from "../store/scroll-store";
import { usePathname } from "next/navigation";

interface Props {
  services: servicesHome[];
}

function HomeAnimation(props: Props) {
  const { services } = props;
  const [windowHeight, setWindowHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isCursorVisible, setIsCursorVisible] = useState(false);
  const [rotationDegree, setRotationDegree] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedIndexMobile, setExpandedIndexMobile] = useState<number | null>(
    null
  );

  const setHasScrolled = useScrollStore((state) => state.setHasScrolled);
  const hasScrolled = useScrollStore((state) => state.hasScrolled);
  const locale = useLocale();
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const setIsHoveringCard = useHoverStore((state) => state.setIsHoveringCard);

  useEffect(() => {
    const updateWindowDimensions = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
      setIsMobile(window.innerWidth < 1024);
    };

    updateWindowDimensions();
    window.addEventListener("resize", updateWindowDimensions);
    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);

  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      setIsScrolling(true);
      setHasScrolled(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isScrolling) {
      setHoveredIndex(null);
      setIsHoveringCard(false);
      setIsCursorVisible(false);
    }
  }, [isScrolling, setIsHoveringCard]);

  useEffect(() => {
    if (hoveredIndex !== null) {
      setRotationDegree((prev) => prev + 180);
    }
  }, [hoveredIndex]);

  useEffect(() => {
    if (isCursorVisible) {
      document.body.classList.add("cursor-hidden");
    } else {
      document.body.classList.remove("cursor-hidden");
    }

    return () => {
      document.body.classList.remove("cursor-hidden");
    };
  }, [isCursorVisible]);

  const height = useTransform(scrollY, [0, 300], [windowHeight * 0.4, 58]);
  const width = useTransform(scrollY, [0, 300], [windowWidth, 322]);
  const links = ["/architecture", "/decor", "/development"];

  useEffect(() => {
    const rootPaths = ["/es", "/de", "/en", "/"];

    const normalizedPath = pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

    if (rootPaths.includes(normalizedPath)) {
      setHasScrolled(false);
    }
  }, [pathname, setHasScrolled]);

  return (
    <div className="container bg-white">
      <motion.img
        src="/images/KLARQ.svg"
        alt="KLARQ"
        className="hidden lg:block lg:fixed px-[40px] object-contain top-[20px] left-0 z-[1000] mix-blend-difference filter invert"
        style={{ height, width }}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      <div className="flex justify-center items-center h-[12dvh] lg:hidden px-[15px]">
        <img className="h-full w-full" src="/images/KLARQ.svg" alt="KLARQ" />
      </div>
      <div className="lg:h-[40dvh]" />
      <motion.div
        className={`flex ${
          isMobile ? "flex-col" : "lg:flex-row"
        } gap-[3px] lg:gap-[5px] lg:mt-[20px] transition-all duration-300`}
        initial={{ y: 1, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
        {services.map((card, index) => {
          const link = links[index];
          let grow = "flex-[1]";

          if (!isMobile && hoveredIndex !== null) {
            if (hoveredIndex === index) {
              grow = "flex-[6]";
            } else if (hoveredIndex === 0) {
              if (index === 1) grow = "flex-[4]";
              if (index === 2) grow = "flex-[2]";
            } else if (hoveredIndex === 1) {
              if (index === 0) grow = "flex-[3]";
              if (index === 2) grow = "flex-[3]";
            } else if (hoveredIndex === 2) {
              if (index === 0) grow = "flex-[2]";
              if (index === 1) grow = "flex-[4]";
            }
          }

          return (
            <motion.div
              key={index}
              animate={
                !isMobile
                  ? {
                      flex: parseFloat(grow.match(/\d+(\.\d+)?/)?.[0] || "1"),
                    }
                  : {}
              }
              initial={{ flex: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              onMouseEnter={() => {
                if (!isScrolling && !isMobile) {
                  setHoveredIndex(index);
                  setIsHoveringCard(true);
                  setIsCursorVisible(true);
                }
              }}
              onMouseLeave={() => {
                if (!isMobile) {
                  setHoveredIndex(null);
                  setIsHoveringCard(false);
                  setIsCursorVisible(false);
                }
              }}
              className="flex"
            >
              <Link href={link} className="w-full">
                <CategoryCard
                  description={card.description_service}
                  title={card.title}
                  imageCategory={card.image.url}
                  showDescription={hoveredIndex === index}
                  anyCardHovering={hoveredIndex !== null}
                  hasScrolled={useScrollStore.getState().hasScrolled}
                  isMobile={isMobile}
                  expandedIndexMobile={expandedIndexMobile}
                  index={index}
                  onExpandClick={() =>
                    setExpandedIndexMobile(
                      expandedIndexMobile === index ? null : index
                    )
                  }
                />
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Scroll hint: the tiles used to read as the end of the page (a
          Round 3 audit finding — "scroll-jacking blank-space bug"). Fades
          out on first scroll via the same hasScrolled store the tiles
          already subscribe to, so it never lingers over real content. */}
      <AnimatePresence>
        {!hasScrolled && (
          <motion.div
            className="fixed bottom-[18px] left-1/2 -translate-x-1/2 z-[900] flex flex-col items-center gap-1 pointer-events-none mix-blend-difference"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="text-white text-[10px] tracking-[0.15em] uppercase">
              {locale === "es" ? "Descubre más" : "Discover more"}
            </span>
            <motion.span
              className="block w-px h-[16px] bg-white"
              animate={{ scaleY: [1, 0.4, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <CustomCursor isVisible={isCursorVisible} rotation={rotationDegree} />
    </div>
  );
}

export default HomeAnimation;
