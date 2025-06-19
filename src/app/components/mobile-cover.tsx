"use client";

import { animate, motion, useMotionValue } from "framer-motion";
import { Link } from "@/navigation";
import { getProxyImageUrl } from "@/utils/image_proxy";
import { InformationWp } from "../_interfaces/wordpress-components";
import React, { useEffect, useRef, useState } from "react";

interface Props {
  information: InformationWp;
  labelTitle: string;
  title?: string;
  progress: number;
  img: string;
  linkSlug?: string;
}

export default function MobileCover({
  img,
  information,
  labelTitle,
  title,
  progress,
  linkSlug,
}: Props) {
  const [locked, setLocked] = useState(false);
  const titleMobileRef = useRef<HTMLLabelElement>(null);

  useEffect(() => {
    if (progress >= 1 && !locked) {
      setLocked(true);
    }
  }, [progress, locked]);

  useEffect(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, []);

  return (
    <div className="relative w-full">
      <motion.div
        animate={{
          y: progress === 0 ? "0%" : progress === 0.5 ? "-50%" : "-100%",
        }}
        transition={{ ease: "easeInOut", duration: 0.6 }}
        className="relative flex flex-col justify-between items-center px-[15px] py-[10px] top-0 left-0 w-full z-20 bg-white"
        style={{ height: "calc(var(--vh, 1vh) * 90)" }}
      >
        <div className="w-full" style={{ minHeight: 87 }} />
        {information.image?.url && (
          <img
            src={getProxyImageUrl(information.image.url)}
            alt="team"
            className="max-h-[23vh] w-auto max-w-full"
          />
        )}
        <div
          className="text-base leading-relaxed text-black"
          dangerouslySetInnerHTML={{ __html: information.description }}
        />
      </motion.div>
      {title && (
        <motion.div
          animate={{ y: locked ? "-100%" : "0%" }}
          transition={{ ease: "easeInOut", duration: 0.6 }}
          className="absolute left-0 w-full flex justify-center items-center z-10 px-4"
          style={{
            top: "calc(var(--vh, 1vh) * 50)",
            height: "calc(var(--vh, 1vh) * 50)",
          }}
        >
          {linkSlug ? (
            <Link
              className="flex items-center justify-center h-full w-full"
              href={linkSlug}
            >
              <h2 className="uppercase text-white text-center text-[14px] leading-[22px] tracking-[-0.02em]">
                {title}
              </h2>
            </Link>
          ) : (
            <div className="flex items-center justify-center h-full w-full">
              <h2 className="uppercase text-white text-center text-[14px] leading-[22px] tracking-[-0.02em]">
                {title}
              </h2>
            </div>
          )}
        </motion.div>
      )}
      <Link href={"/"}>
        <div className="cursor-pointer fixed top-[10px] left-[12px] mix-blend-difference text-white z-[1000]">
          <label className="uppercase tracking-[-0.02em] font-zoom cursor-pointer text-[38px] leading-[38px]">
            KLARQ <br /> {labelTitle}
          </label>
        </div>
      </Link>
      <motion.img
        animate={{ y: locked ? "-100%" : "0%" }}
        transition={{ ease: "easeInOut", duration: 0.6 }}
        src={img}
        alt="architecture-cover"
        className="absolute bottom-0 left-0 w-full object-cover z-0"
        style={{
          top: "calc(var(--vh, 1vh) * 50)",
          height: "calc(var(--vh, 1vh) * 50)",
          filter: "brightness(0.8)",
        }}
      />
    </div>
  );
}
