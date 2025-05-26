"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import CategoryCard from "./category-card";
import { servicesHome } from "../_interfaces/wordpress-components";

interface Props {
  services: servicesHome[];
}

function HomeAnimation(props: Props) {
  const { services } = props;
  const [windowHeight, setWindowHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  const { scrollY } = useScroll();

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
    }
  }, [isScrolling]);

  const height = useTransform(scrollY, [0, 300], [windowHeight * 0.4, 58]);
  const width = useTransform(scrollY, [0, 300], [windowWidth, 322]);

  return (
    <div className="container">
      <motion.img
        src="/images/KLARQ.svg"
        alt="KLARQ"
        className="px-[40px] object-contain fixed top-[0px] left-0 z-[1000]"
        style={{ height, width }}
      />
      <div className="h-[40dvh]" />
      <div className="flex gap-[5px] mt-[20px] transition-all duration-300">
        {services.map((card, index) => {
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
            <div
              key={index}
              className={`${grow} transition-all duration-500 ease-in-out`}
              onMouseEnter={() => {
                if (!isScrolling) setHoveredIndex(index);
              }}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <CategoryCard
                description={card.description_service}
                title={card.title}
                imageCategory={card.image.url}
                showDescription={hoveredIndex === index}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomeAnimation;
