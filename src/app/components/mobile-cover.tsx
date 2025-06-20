"use client";

import React, { ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "@/navigation";
import { getProxyImageUrl } from "@/utils/image_proxy";

interface Props {
  information: {
    image?: { url: string };
    description: string;
  };
  labelTitle: string;
  title?: string;
  progress: number;
  linkSlug?: string;
  children?: ReactNode;
}

export default function MobileCover({
  information,
  labelTitle,
  title,
  progress,
  linkSlug,
  children,
}: Props) {
  const { scrollY } = useScroll();

  const translateY = useTransform(
    scrollY,
    [0, 300],
    [0, -window.innerHeight * 0.5]
  );

  return (
    <div className="relative w-full">
      <Link href={"/"}>
        <div className="cursor-pointer fixed top-[10px] left-[12px] mix-blend-difference text-white z-[1000]">
          <label className="uppercase tracking-[-0.02em] font-zoom cursor-pointer text-[38px] leading-[38px]">
            KLARQ <br /> {labelTitle}
          </label>
        </div>
      </Link>
      <div
        className="relative flex flex-col justify-between items-center px-[15px] py-[10px]  w-full bg-white z-10"
        style={{ height: "calc(var(--vh, 1vh) * 90)" }}
      >
        <div className="w-full" style={{ minHeight: 87 }} />
        {information.image?.url && (
          <img
            src={getProxyImageUrl(information.image.url)}
            alt="team"
            className="mobile-cover-image w-auto max-w-full"
          />
        )}
        <div
          className="custom-line-clamp-4 text-cover text-base leading-relaxed text-black"
          dangerouslySetInnerHTML={{ __html: information.description }}
        />
      </div>

      <motion.div
        className="relative w-full z-20"
        style={{
          bottom: 0,
          translateY,
          filter: "brightness(0.8)",
          // backgroundColor: "transparent",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
