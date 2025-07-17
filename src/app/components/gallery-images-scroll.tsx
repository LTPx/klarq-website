"use client";

import { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// import { getProxyImageUrl } from "@/utils/image_proxy";
import { ImageAcf } from "../_interfaces/wordpress-page";

interface Props {
  images: ImageAcf[];
  imageClassName?: string;
  animationType?: string;
  stagger?: boolean;
  baseDelay?: number;
  aosDuration?: number;
}

function GalleryImagesScroll({
  images = [],
  imageClassName = "h-[422px] lg:h-[630px]",
  animationType = "fade-up",
  stagger = true,
  baseDelay = 400,
  aosDuration = 800,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    AOS.init({ duration: aosDuration, once: true, easing: "ease-out-cubic" });
  }, [aosDuration]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const isDesktop = window.innerWidth >= 1024;
    if (!isDesktop) return;

    const onWheel = (e: WheelEvent) => {
      const isScrollable = el.scrollWidth > el.clientWidth;
      const isVerticalScroll = Math.abs(e.deltaY) > Math.abs(e.deltaX);

      if (!isScrollable || !isVerticalScroll) return;

      const atStart = el.scrollLeft === 0;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
      const scrollingUp = e.deltaY < 0;
      const scrollingDown = e.deltaY > 0;

      if ((atStart && scrollingUp) || (atEnd && scrollingDown)) return;

      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      el.removeEventListener("wheel", onWheel);
    };
  }, []);

  if (!images.length) return <p>No images found</p>;

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className="flex overflow-y-hidden overflow-x-auto gap-[3px] lg:gap-[5px] no-scrollbar"
        style={{ cursor: "grab" }}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src.url}
            alt={src.alt ?? `image-${index}`}
            loading="lazy"
            className={`object-cover shrink-0 ${imageClassName}`}
            data-aos={animationType}
            data-aos-delay={stagger ? index * baseDelay : 0}
          />
        ))}
      </div>
    </div>
  );
}

export default GalleryImagesScroll;
