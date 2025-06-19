"use client";

import { useEffect } from "react";
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
  aosDuration = 800 
}: Props) {
  useEffect(() => {
    AOS.init({ duration: aosDuration, once: true, easing: "ease-out-cubic" });
  }, [aosDuration]);

  if (!images.length) return <p>No hay imágenes para mostrar</p>;

  return (
    <div className="w-full">
      <div
        className="flex overflow-y-hidden overflow-x-auto scrollbar-hide gap-[3px] lg:gap-[5px] no-scrollbar"
        style={{ cursor: "grab" }}>
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
