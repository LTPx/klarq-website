"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import CategoryCard from "./category-card";
import { servicesHome } from "../_interfaces/wordpress-components";
import { Link } from "@/navigation";
import { useHoverStore } from "../store/hover-store";
import { getProxyImageUrl } from "@/utils/image_proxy";
import CustomCursor from "./custom-cursor";

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
  const [hasRotatedOnce, setHasRotatedOnce] = useState(false);

  const { scrollY } = useScroll();
  const setIsHoveringCard = useHoverStore((state) => state.setIsHoveringCard);

  useEffect(() => {
    const updateWindowDimensions = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };

    updateWindowDimensions();
    window.addEventListener("resize", updateWindowDimensions);
    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);

  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      setIsScrolling(true);
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
    if (hoveredIndex !== null && hoveredIndex !== 0) {
      setRotationDegree((prev) => prev + 180);
    }
  }, [hoveredIndex]);

  useEffect(() => {
    if (isCursorVisible) {
      document.body.classList.add("cursor-hidden");
    } else {
      document.body.classList.remove("cursor-hidden");
    }
  }, [isCursorVisible]);

  const height = useTransform(scrollY, [0, 300], [windowHeight * 0.4, 58]);
  const width = useTransform(scrollY, [0, 300], [windowWidth, 322]);
  const links = ["/architecture", "/decor", "/development"];

  return (
    <div className="container">
      <motion.img
        src="/images/KLARQ.svg"
        alt="KLARQ"
        className="px-[40px] object-contain fixed top-[20px] left-0 z-[1000] mix-blend-difference filter invert"
        style={{ height, width }}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      <div className="h-[40dvh]" />
      <motion.div
        className="flex gap-[5px] mt-[20px] transition-all duration-300"
        initial={{ y: 1, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
        {services.map((card, index) => {
          const link = links[index];
          let grow = "flex-[1]";

          if (hoveredIndex !== null) {
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
              animate={{
                flex: parseFloat(grow.match(/\d+(\.\d+)?/)?.[0] || "1"),
              }}
              initial={{ flex: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              onMouseEnter={() => {
                if (!isScrolling) {
                  setHoveredIndex(index);
                  setIsHoveringCard(true);
                  setIsCursorVisible(true);
                }
              }}
              onMouseLeave={() => {
                setHoveredIndex(null);
                setIsHoveringCard(false);
                setIsCursorVisible(false);
              }}
              style={{ display: "flex" }}
            >
              <Link href={link} className="w-full">
                <CategoryCard
                  description={card.description_service}
                  title={card.title}
                  imageCategory={getProxyImageUrl(card.image.url)}
                  showDescription={hoveredIndex === index}
                  anyCardHovering={hoveredIndex !== null}
                />
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      <CustomCursor isVisible={isCursorVisible} rotation={rotationDegree} />
    </div>
  );
}

export default HomeAnimation;
