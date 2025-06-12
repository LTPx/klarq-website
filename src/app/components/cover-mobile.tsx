"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@/navigation";

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
  const [locked, setLocked] = useState(false);

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

  useEffect(() => {
    if (progress >= 0.5 && !locked) {
      setLocked(true);
    }
  }, [progress, locked]);

  return (
    <div className="relative w-full h-[100vh] bg-white overflow-hidden">
      <motion.img
        animate={{ y: locked ? "-100%" : "0%" }}
        transition={{ ease: "easeInOut", duration: 0.6 }}
        src={img}
        alt="architecture-cover"
        className="absolute bottom-0 left-0 w-full h-[50vh] object-cover z-0"
        style={{ filter: "brightness(0.8)" }}
      />

      <motion.div
        animate={{
          y: locked ? "-100%" : progress < 0.5 ? `-${progress * 100}%` : "-50%",
        }}
        transition={{ ease: "easeInOut", duration: 0.6 }}
        className="bg-green absolute flex flex-col justify-between items-center top-0 left-0 w-full h-[calc(100dvh-150px)] z-20 bg-white"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default CoverDynamicMobile;
