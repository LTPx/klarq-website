"use client";

import { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { getProxyImageUrl } from "@/utils/image_proxy";
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
  const scrollContainer = useRef<HTMLDivElement | null>(null);
  const scrollTarget = useRef<number>(0);
  const isScrolling = useRef(false);

  const isMobile = typeof window !== "undefined" && /Mobi|Android/i.test(navigator.userAgent);

  useEffect(() => {
    AOS.init({ duration: aosDuration, once: true, easing: "ease-out-cubic" });

    const container = scrollContainer.current;
    if (!container) return;

    scrollTarget.current = container.scrollLeft;

    const smoothScroll = () => {
      if (!container) return;

      const current = container.scrollLeft;
      const diff = scrollTarget.current - current;

      if (Math.abs(diff) > 0.5) {
        container.scrollLeft = current + diff * 0.2;
        isScrolling.current = true;
        requestAnimationFrame(smoothScroll);
      } else {
        isScrolling.current = false;
      }
    };

    const onWheel = (e: WheelEvent) => {
      // Solo en desktop: scroll horizontal con la rueda vertical
      if (isMobile) return;

      e.preventDefault();

      const SCROLL_SPEED = 0.3;

      scrollTarget.current += e.deltaY * SCROLL_SPEED;

      scrollTarget.current = Math.max(
        0,
        Math.min(
          scrollTarget.current,
          container.scrollWidth - container.clientWidth
        )
      );

      if (!isScrolling.current) {
        requestAnimationFrame(smoothScroll);
      }
    };

    if (!isMobile) {
      container.addEventListener("wheel", onWheel, { passive: false });
    }

    return () => {
      if (!isMobile) {
        container.removeEventListener("wheel", onWheel);
      }
    };
  }, [aosDuration, isMobile]);

  useEffect(() => {
    const container = scrollContainer.current;
    if (!container) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const mouseDown = (e: MouseEvent) => {
      isDown = true;
      container.style.cursor = "grabbing";

      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    };

    const mouseMove = (e: MouseEvent) => {
      if (!isDown) return;

      e.preventDefault();

      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2;
      container.scrollLeft = scrollLeft - walk;

      scrollTarget.current = container.scrollLeft;
    };

    const mouseUp = () => {
      isDown = false;
      container.style.cursor = "grab";
    };

    container.addEventListener("mousedown", mouseDown);
    container.addEventListener("mousemove", mouseMove);
    container.addEventListener("mouseleave", mouseUp);
    container.addEventListener("mouseup", mouseUp);

    return () => {
      container.removeEventListener("mousedown", mouseDown);
      container.removeEventListener("mousemove", mouseMove);
      container.removeEventListener("mouseleave", mouseUp);
      container.removeEventListener("mouseup", mouseUp);
    };
  }, []);

  if (!images.length) return <p>No hay imágenes para mostrar</p>;

  return (
    <div className="w-full">
      <div
        ref={scrollContainer}
        className="flex overflow-x-auto gap-[3px] scrollbar-hide lg:gap-[5px] no-scrollbar"
        style={{ cursor: "grab" }}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={getProxyImageUrl(src.url)}
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
