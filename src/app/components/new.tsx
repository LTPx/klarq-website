"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { PublicationsWp } from "../_interfaces/wordpress-components";

interface GalleryProps {
  publication: PublicationsWp[];
}

const GalleryProjects: React.FC<GalleryProps> = ({ publication }) => {
  const copies = 10;
  const baseLength = publication.length;
  const totalLength = baseLength * copies;

  const extendedPublications = Array(copies).fill(publication).flat();

  const [selectedIndex, setSelectedIndex] = useState(baseLength * 2 + 3);
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<ResizeObserver | null>(null);

  const scrollToSelected = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const images = container.querySelectorAll("img");
    const selectedImage = images[selectedIndex] as HTMLImageElement;
    if (!selectedImage) return;

    const imageOffsetLeft = selectedImage.offsetLeft;
    const imageWidth = selectedImage.offsetWidth;
    const containerWidth = container.clientWidth;

    const scrollTo = imageOffsetLeft - containerWidth / 2 + imageWidth / 2;

    container.scrollTo({
      left: scrollTo,
      behavior: "smooth",
    });
  }, [selectedIndex]);

  useEffect(() => {
    scrollToSelected();
  }, [scrollToSelected]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const images = container.querySelectorAll("img");
    const selectedImage = images[selectedIndex] as HTMLImageElement;
    if (!selectedImage) return;

    observerRef.current?.disconnect();

    const observer = new ResizeObserver(() => {
      scrollToSelected();
    });

    observer.observe(selectedImage);
    observerRef.current = observer;

    return () => observer.disconnect();
  }, [selectedIndex, scrollToSelected]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => {
      let next = prev + 1;
      if (next >= totalLength - baseLength) {
        next = next - baseLength;
      }
      return next;
    });
  }, [baseLength, totalLength]);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => {
      let next = prev - 1;
      if (next < baseLength) {
        next = next + baseLength;
      }
      return next;
    });
  }, [baseLength]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let lastScrollTime = 0;
    const scrollCooldown = 600;

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      const delta = e.deltaY;

      if (now - lastScrollTime < scrollCooldown) {
        e.preventDefault();
        return;
      }

      if (Math.abs(delta) > 20) {
        lastScrollTime = now;

        if (delta > 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }

      e.preventDefault();
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [handleNext, handlePrev]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        handleNext();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  if (baseLength === 0) return null;

  return (
    <div className="relative w-[100vw]">
      <div style={{ height: 370 }}>
        <button
          onClick={handlePrev}
          className="absolute left-[40px] top-[380px] -translate-y-1/2 z-10"
        >
          <img src="/images/left.svg" alt="Prev" />
        </button>
        <div
          ref={containerRef}
          className="flex gap-[4px]"
          style={{
            overflowX: "hidden",
            scrollBehavior: "smooth",
          }}
        >
          {extendedPublications.map((pub, index) => {
            const isSelected = index === selectedIndex;
            return (
              <img
                key={index}
                src={pub.image.url}
                alt={pub.title}
                onClick={() => setSelectedIndex(index)}
                className={`cursor-pointer shrink-0 transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                  isSelected
                    ? "h-[365px] opacity-100 w-[280px]"
                    : "h-[290px] opacity-30 w-auto"
                }`}
              />
            );
          })}
        </div>

        <button
          onClick={handleNext}
          className="absolute right-[40px] top-[380px] -translate-y-1/2 z-10"
        >
          <img src="/images/right.svg" alt="Next" />
        </button>
      </div>

      <div className="pt-[16px] text-center" style={{ minHeight: "54px" }}>
        <h2 className="uppercase text-[16px] leading-[22px]">
          {publication[selectedIndex % baseLength]?.title}
        </h2>
        <p className="uppercase text-[16px] leading-[22px]">
          {publication[selectedIndex % baseLength]?.sub_title}
        </p>
      </div>
    </div>
  );
};

export default GalleryProjects;
