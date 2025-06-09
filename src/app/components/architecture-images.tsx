"use client";

import { getProxyImageUrl } from "@/utils/image_proxy";
import { ImageAcf } from "../_interfaces/wordpress-page";

interface Props {
  images?: ImageAcf[];
}

function ArchitectureImages({ images = [] }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-[50px] lg:gap-y-[150px] architectureImages">
      {images.map((src, index) => {
        const mod = index % 6;

        let wrapperClass = "";
        let imageClass = "object-cover";

        if (mod === 0) {
          wrapperClass = "flex items-end justify-start";
          imageClass += " w-[240px] h-[360px] lg:w-[395px] lg:h-[500px]";
        } else if (mod === 1) {
          wrapperClass = "";
          imageClass += " w-full h-[422px] lg:h-[850px]";
        } else if (mod === 2 || mod === 5) {
          wrapperClass = "col-span-1 lg:col-span-2";
          imageClass += " w-full h-[240px] lg:h-[850px]";
        } else if (mod === 3) {
          wrapperClass = "";
          imageClass += " w-full h-[422px] lg:h-[850px]";
        } else if (mod === 4) {
          wrapperClass = "flex items-end justify-end";
          imageClass += " w-[240px] h-[360px] lg:w-[395px] lg:h-[500px]";
        }

        return (
          <div key={index} className={wrapperClass}>
            <img
              data-aos="fade-up"
              src={getProxyImageUrl(src.url)}
              alt={`Architecture ${index + 1}`}
              className={imageClass}
            />
          </div>
        );
      })}
    </div>
  );
}

export default ArchitectureImages;
