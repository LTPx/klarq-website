"use client";

import Image from "next/image";
// import { getProxyImageUrl } from "@/utils/image_proxy";
import { MediaFileWp } from "../_interfaces/wordpress-components";
import { useEffect, useState } from "react";

interface Props {
  children?: React.ReactElement;
  className?: string;
  media?: MediaFileWp;
  img?: string;
  alt?: string;
}

export function Cover(props: Props) {
  const { children, className, media, img, alt } = props;

  useEffect(() => {
    const vh = window.visualViewport?.height || window.innerHeight;
    document.documentElement.style.setProperty("--vh", `${vh * 0.01}px`);
  }, []);

  return (
    <div className={`cover-video-container`}>
      {img && (
        <div
          className={`${className} relative w-full`}
          style={{ height: `calc(var(--vh, 1vh) * 100 - 50px)` }}
        >
          <Image
            src={img}
            alt={alt || ""}
            fill
            sizes="100vw"
            priority
            quality={90}
            className="object-cover"
          />
        </div>
      )}
      {media?.type === "video" && (
        <video
          className={`${className} w-full object-cover`}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          style={{ height: `calc(var(--vh, 1vh) * 100 - 50px)` }}
        >
          <source src={media.url} type="video/mp4" />
        </video>
      )}
      {media?.type === "image" && (
        <div
          className={`${className} relative w-full`}
          style={{ height: `calc(var(--vh, 1vh) * 100 - 50px)` }}
        >
          <Image
            src={media.url}
            alt={alt || ""}
            fill
            sizes="100vw"
            priority
            quality={90}
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
}

export default Cover;
