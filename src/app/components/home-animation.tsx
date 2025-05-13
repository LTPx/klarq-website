"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import CategoryCard from "./category-card";

function HomeAnimation() {
  const containerRef = useRef(null);
  const [windowHeight, setWindowHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

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

  const height = useTransform(scrollY, [0, 300], [windowHeight * 0.4, 58]);

  const width = useTransform(scrollY, [0, 300], [windowWidth, 322]);

  return (
    <div className="container">
      <motion.img
        src="/images/KLARQ.svg"
        alt="KLARQ"
        className="px-[40px] object-contain fixed top-[10px] left-0 z-[1000]"
        style={{
          height,
          width,
        }}
      />
      <div className="h-[40dvh]" />
      <div className="grid gap-[5px] grid-cols-3 mt-[30px]">
        <CategoryCard
          title="Klarp"
          imageCategory="https://plus.unsplash.com/premium_photo-1694540892449-5c3170caf81c"
        />
        <CategoryCard
          title="Klarp"
          imageCategory="https://plus.unsplash.com/premium_photo-1694540892449-5c3170caf81c"
        />
        <CategoryCard
          title="Klarp"
          imageCategory="https://plus.unsplash.com/premium_photo-1694540892449-5c3170caf81c"
        />
      </div>
    </div>
  );
}

export default HomeAnimation;
