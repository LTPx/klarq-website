"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import CategoryCard from "./category-card";

const CARDS = [
  {
    title: "Klarp",
    image:
      "https://plus.unsplash.com/premium_photo-1746731481770-08b2f71661d0?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Klarp",
    image: "https://plus.unsplash.com/premium_photo-1694540892449-5c3170caf81c",
  },
  {
    title: "Klarp",
    image:
      "https://images.unsplash.com/photo-1744132813623-5ce3c521eef4?q=80&w=3436&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

function HomeAnimation() {
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
        className="px-[40px] object-contain fixed top-[10px] left-0 z-[1000]"
        style={{ height, width }}
      />

      <div className="h-[40dvh]" />

      <div className="flex gap-[5px] mt-[30px] transition-all duration-300">
        {CARDS.map((card, index) => {
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
              <CategoryCard title={card.title} imageCategory={card.image} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomeAnimation;
