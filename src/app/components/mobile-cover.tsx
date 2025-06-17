"use client";

import { motion } from "framer-motion";
import { Link } from "@/navigation";
import { getProxyImageUrl } from "@/utils/image_proxy";
import { InformationWp } from "../_interfaces/wordpress-components";
import React from "react";

interface Props {
  img?: string;
  information: InformationWp;
  labelTitle: string;
  title?: string;
  progress: number;
}

export default function MobileCover({
  img,
  information,
  labelTitle,
  title,
  progress,
}: Props) {
  
  return (
    <div className="relative w-full h-[100vh] bg-white overflow-hidden">
      <motion.div
        animate={{
          y: `-${progress * 100}%`,
        }}
        transition={{ ease: "easeInOut", duration: 0.6 }}
        className="absolute flex flex-col justify-between items-center px-[15px] py-[10px] top-0 left-0 w-full h-[calc(100dvh-150px)] z-20 bg-white"
      >
        <div className="w-full" style={{ minHeight: 87 }} />
        {information.image?.url && (
          <img
            src={getProxyImageUrl(information.image.url)}
            alt="team"
            className="w-[180px] h-auto rounded"
          />
        )}
        <div
          className="text-base leading-relaxed text-black"
          dangerouslySetInnerHTML={{ __html: information.description }}
        />
      </motion.div>
    </div>
  );
}
