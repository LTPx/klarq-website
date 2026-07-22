"use client";

import Image from "next/image";
// import { getProxyImageUrl } from "@/utils/image_proxy";
import { ImageAcf } from "../_interfaces/wordpress-page";

interface Props {
  images?: ImageAcf[];
}

function ArchitectureImages({ images = [] }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-[50px] lg:gap-y-[150px] architectureImages">
      {images.map((src, index) => {
        const mod = index % 6;

        let wrapperClass = "relative";
        let sizes = "100vw";

        if (mod === 0) {
          wrapperClass +=
            " flex items-end justify-start w-[240px] h-[360px] lg:w-[395px] lg:h-[500px]";
          sizes = "(min-width: 1024px) 395px, 240px";
        } else if (mod === 1) {
          wrapperClass += " w-full h-[422px] md:h-[550px] lg:h-[850px]";
          sizes = "100vw";
        } else if (mod === 2 || mod === 5) {
          wrapperClass +=
            " col-span-1 lg:col-span-2 w-full h-[240px] md:h-[450px] lg:h-[850px]";
          sizes = "100vw";
        } else if (mod === 3) {
          wrapperClass += " w-full h-[422px] md:h-[550px] lg:h-[850px]";
          sizes = "100vw";
        } else if (mod === 4) {
          wrapperClass +=
            " flex items-end justify-end w-[240px] h-[360px] lg:w-[395px] lg:h-[500px]";
          sizes = "(min-width: 1024px) 395px, 240px";
        }

        return (
          <div key={index} className={wrapperClass} data-aos="fade-up">
            <Image
              src={src.url}
              alt={src.alt || `Architecture ${index + 1}`}
              fill
              sizes={sizes}
              quality={90}
              className="object-cover"
              loading={index < 2 ? undefined : "lazy"}
              priority={index < 2}
            />
          </div>
        );
      })}
    </div>
  );
}

export default ArchitectureImages;
