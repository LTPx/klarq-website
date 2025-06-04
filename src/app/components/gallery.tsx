"use client";

import React, { useState, useEffect } from "react";
import { PublicationsWp } from "../_interfaces/wordpress-components";
import { getProxyImageUrl } from "@/utils/image_proxy";

interface GalleryProps {
  publication: PublicationsWp[];
}

const GalleryProjects: React.FC<GalleryProps> = ({ publication }) => {
  const VISIBLE_ITEMS = 7;
  const CENTER_INDEX = Math.floor(VISIBLE_ITEMS / 2);
  const [virtualIndex, setVirtualIndex] = useState(100000);

  const getRealItem = (index: number) =>
    publication[
      ((index % publication.length) + publication.length) % publication.length
    ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setVirtualIndex((prev) => prev - 1);
      } else if (e.key === "ArrowRight") {
        setVirtualIndex((prev) => prev + 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handlePrev = () => setVirtualIndex((prev) => prev - 1);
  const handleNext = () => setVirtualIndex((prev) => prev + 1);

  if (publication.length === 0) return null;

  return (
    <div className="relative w-full">
      <button
        onClick={handlePrev}
        className="absolute left-[40px] top-[380px] -translate-y-1/2"
      >
        <img src="/images/left.svg" alt="Previous" />
      </button>

      <div className="flex overflow-hidden gap-[4px] transition-all duration-300 ease-in-out">
        {Array.from({ length: VISIBLE_ITEMS }).map((_, i) => {
          const relativeIndex = i - CENTER_INDEX;
          const itemIndex = virtualIndex + relativeIndex;
          const item = getRealItem(itemIndex);
          const isSelected = i === CENTER_INDEX;

          return (
            <img
              key={i}
              src={getProxyImageUrl(item.image.url)}
              alt={item.title}
              onClick={() => setVirtualIndex(itemIndex)}
              className={`cursor-pointer shrink-0 transition-all duration-300 ease-in-out ${
                isSelected ? "h-[365px] opacity-100" : "h-[290px] opacity-30"
              }`}
              style={{ width: "calc((100% - 6 * 4px) / 7)" }}
            />
          );
        })}
      </div>

      <div className="mt-[16px] text-center">
        <h2 className="uppercase text-[16px] leading-[22px]">
          {getRealItem(virtualIndex)?.title}
        </h2>
        <p className="uppercase text-[16px] leading-[22px]">
          {getRealItem(virtualIndex)?.sub_title}
        </p>
      </div>

      <button
        onClick={handleNext}
        className="absolute right-[40px] top-[380px]"
      >
        <img src="/images/right.svg" alt="Next" />
      </button>
    </div>
  );
};

export default GalleryProjects;
