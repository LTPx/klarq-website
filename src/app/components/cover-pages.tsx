"use client";

import { getProxyImageUrl } from "@/utils/image_proxy";
import { MediaFileWp } from "../_interfaces/wordpress-components";
import { useEffect, useState } from "react";

interface Props {
  children?: React.ReactElement;
  className?: string;
  media?: MediaFileWp;
  img?: string;
}

export function Cover(props: Props) {
  const { children, className, media, img } = props;

  const [height, setHeight] = useState("100vh");

  useEffect(() => {
    const updateHeight = () => {
      setHeight(`${window.innerHeight - 50}px`);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    window.addEventListener("scroll", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
      window.removeEventListener("scroll", updateHeight);
    };
  }, []);

  return (
    <div className={`cover-video-container`}>
      {img && (
        <img
          src={img}
          className={`${className} w-full object-cover`}
          style={{ height }}
        />
      )}
      {media?.type === "video" && (
        <video
          className={`${className} w-full object-cover`}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          style={{ height }}
        >
          <source src={media.url} type="video/mp4" />
        </video>
      )}
      {media?.type === "image" && (
        <img
          src={getProxyImageUrl(media.url)}
          className={`${className} w-full object-cover`}
          style={{ height }}
        />
      )}
    </div>
  );
}

export default Cover;
