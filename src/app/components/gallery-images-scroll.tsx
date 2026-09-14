"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
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

  // Click-and-drag to scroll the gallery horizontally — page scroll (wheel)
  // is left untouched entirely so hovering this gallery never blocks
  // scrolling past it, which is what a previous wheel-hijack effect used to
  // do here (converted vertical wheel input into horizontal scroll).
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let startScrollLeft = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      startX = e.clientX;
      startScrollLeft = el.scrollLeft;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      el.scrollLeft = startScrollLeft - (e.clientX - startX);
    };

    const stopDragging = () => {
      isDown = false;
    };

    el.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopDragging);
    el.addEventListener("mouseleave", stopDragging);

    return () => {
      el.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopDragging);
      el.removeEventListener("mouseleave", stopDragging);
    };
  }, []);

  const scrollByAmount = (direction: "left" | "right") => {
    const el = containerRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  if (!images.length) return <p>No images found</p>;

  return (
    <div className="w-full relative">
      <button
        onClick={() => scrollByAmount("left")}
        aria-label="Previous"
        className="hidden lg:flex absolute left-[15px] top-1/2 -translate-y-1/2 z-10"
      >
        <img src="/images/left.svg" alt="Prev" />
      </button>
      <button
        onClick={() => scrollByAmount("right")}
        aria-label="Next"
        className="hidden lg:flex absolute right-[15px] top-1/2 -translate-y-1/2 z-10"
      >
        <img src="/images/right.svg" alt="Next" />
      </button>
      <div
        ref={containerRef}
        className="flex overflow-y-hidden overflow-x-auto gap-[3px] lg:gap-[5px] no-scrollbar"
        style={{ cursor: "grab" }}
      >
        {images.map((src, index) => (
          <Image
            key={index}
            src={src.url}
            alt={src.alt ?? `image-${index}`}
            width={src.width}
            height={src.height}
            quality={90}
            loading="lazy"
            // WP's width/height metadata on these items doesn't reliably
            // match the served file's real aspect ratio (measured render
            // widths up to 1905px at 1920px viewport didn't line up with a
            // per-image aspect-ratio calc off that metadata — off by ~4x).
            // Height is fixed (imageClassName) and width is auto/aspect-
            // driven and can get near-panoramic, so sizes=100vw is the only
            // reliably safe bound: never smaller than any image can render.
            sizes="100vw"
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
