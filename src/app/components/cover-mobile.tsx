"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  className?: string;
  img?: string;
  labelTitle: string;
  title?: string;
  progress: number;
  children?: React.ReactNode;
}

const CoverDynamicMobile = ({
  img,
  labelTitle,
  title,
  progress,
  children,
}: Props) => {
  const titleMobileRef = useRef<HTMLLabelElement>(null);
  const [titleMobileHeight, setTitleMobileHeight] = useState(0);

  useEffect(() => {
    const waitForFonts = async () => {
      await document.fonts.ready;
      requestAnimationFrame(() => {
        if (titleMobileRef.current) {
          setTitleMobileHeight(titleMobileRef.current.offsetHeight);
        }
      });
    };
    waitForFonts();
  }, [labelTitle]);

  useEffect(() => {
    if (!titleMobileRef.current) return;
    const observer = new ResizeObserver(() => {
      if (titleMobileRef.current) {
        setTitleMobileHeight(titleMobileRef.current.offsetHeight);
      }
    });
    observer.observe(titleMobileRef.current);
    return () => observer.disconnect();
  }, [labelTitle]);

  return (
    <div className="relative w-full h-[100vh] bg-white overflow-hidden">
      <motion.img
        animate={{
          y: `-${progress * 85}vh`,
        }}
        transition={{ ease: "easeInOut", duration: 0.6 }}
        src={img}
        alt="architecture-cover"
        className="absolute top-[85vh] left-0 w-full h-[100vh] object-cover z-0"
        style={{ filter: "brightness(0.8)" }}
      />
      <motion.div
        animate={{
          y: `-${progress * 100}%`,
        }}
        transition={{ ease: "easeInOut", duration: 0.6 }}
        className="absolute top-0 left-0 w-full h-[85vh] z-20 bg-white flex flex-col justify-between items-center"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default CoverDynamicMobile;
