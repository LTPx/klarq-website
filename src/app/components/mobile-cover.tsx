"use client";

import { motion } from "framer-motion";
import { Link } from "@/navigation";
import { getProxyImageUrl } from "@/utils/image_proxy";
import { InformationWp } from "../_interfaces/wordpress-components";
import React, { useEffect, useState } from "react";

interface Props {
  information: InformationWp;
  labelTitle: string;
  title?: string;
  progress: number;
  img: string;
}

export default function MobileCover({
  img,
  information,
  labelTitle,
  title,
  progress,
}: Props) {
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    if (progress >= 1 && !locked) {
      setLocked(true);
    }
  }, [progress, locked]);

  return (
    <div className="relative w-full">
      <motion.div
        animate={{
          y: `-${progress * 100}%`,
        }}
        transition={{ ease: "easeInOut", duration: 0.6 }}
        className="relative flex flex-col justify-between items-center px-[15px] py-[10px] top-0 left-0 w-full h-[85dvh] z-20 bg-white"
      >
        <div className="w-full" style={{ minHeight: 87 }} />
        {information.image?.url && (
          <img
            src={getProxyImageUrl(information.image.url)}
            alt="team"
            className="max-h-[30vh] w-auto max-w-full"
          />
        )}
        <div
          className="text-base leading-relaxed text-black"
          dangerouslySetInnerHTML={{ __html: information.description }}
        />
      </motion.div>
      <Link href={"/"}>
        <div className="cursor-pointer fixed top-[10px] left-[15px] mix-blend-difference text-white z-[1000]">
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
        className="absolute bottom-0 left-0 w-full top-[50dvh] h-[50vh] object-cover z-0"
        style={{
          filter: "brightness(0.8)",
        }}
      />
    </div>
  );
}
