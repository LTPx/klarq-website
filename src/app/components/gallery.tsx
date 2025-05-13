"use client";

import React, { useRef, useState, useEffect } from "react";

interface GalleryProps {
  gallery: string[];
}

const VISIBLE_COUNT = 7;

const GalleryProjects: React.FC<GalleryProps> = ({ gallery }) => {
  const [selectedIndex, setSelectedIndex] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && selectedIndex > 0) {
        setSelectedIndex((prev) => prev - 1);
      } else if (e.key === "ArrowRight" && selectedIndex < gallery.length - 1) {
        setSelectedIndex((prev) => prev + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, gallery.length]);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const imageWidth = container.scrollWidth / gallery.length;
    const scrollTo =
      imageWidth * selectedIndex - container.clientWidth / 2 + imageWidth / 2;
    container.scrollTo({ left: scrollTo, behavior: "smooth" });
  }, [selectedIndex, gallery.length]);

  const handlePrev = () => {
    if (selectedIndex > 0) setSelectedIndex(selectedIndex - 1);
  };

  const handleNext = () => {
    if (selectedIndex < gallery.length - 1) setSelectedIndex(selectedIndex + 1);
  };

  return (
    <div className="relative w-full">
      {selectedIndex > 0 && (
        <button
          onClick={handlePrev}
          className="absolute left-[40px] top-[380px] -translate-y-1/2"
        >
          <img src="/images/left.svg" />
        </button>
      )}
      <div
        ref={containerRef}
        className="flex overflow-x-hidden no-scrollbar gap-[4px] mx-[40px] scroll-smooth"
      >
        {gallery.map((project, index) => (
          <img
            key={index}
            //  ref={(el) => (imageRefs.current[index] = el)}
            src={project}
            alt=""
            onClick={() => setSelectedIndex(index)}
            className={`object-cover cursor-pointer  shrink-0
           ${
             index === selectedIndex
               ? "h-[365px] opacity-100"
               : "h-[290px] opacity-30"
           }`}
            style={{ width: "calc((100% - 6 * 4px) / 7)" }}
          />
        ))}
      </div>
      {selectedIndex < gallery.length - 1 && (
        <button
          onClick={handleNext}
          className="absolute right-[40px] top-[380px]"
        >
          <img src="/images/right.svg" />
        </button>
      )}
    </div>
  );
};

export default GalleryProjects;
