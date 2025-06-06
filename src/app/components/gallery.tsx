"use client";

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Mousewheel } from "swiper/modules";
import "swiper/swiper-bundle.css";

import { PublicationsWp } from "../_interfaces/wordpress-components";
import { getProxyImageUrl } from "@/utils/image_proxy";

interface GalleryProps {
  publication: PublicationsWp[];
}

const GalleryProjects: React.FC<GalleryProps> = ({ publication }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const swiperRef = useRef<any>(null);

  const handleMouseEnter = () => {
    if (swiperRef.current?.mousewheel) {
      swiperRef.current.mousewheel.enable();
    }
  };

  const handleMouseLeave = () => {
    if (swiperRef.current?.mousewheel) {
      swiperRef.current.mousewheel.disable();
    }
  };

  return (
    <div className="relative w-screen h-auto">
      <div style={{ height: 370 }}>
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute left-[40px] top-[380px] -translate-y-1/2 z-10"
        >
          <img src="/images/left.svg" alt="Previous" />
        </button>

        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <Swiper
            modules={[Keyboard, Mousewheel]}
            slidesPerView={6.1}
            centeredSlides={true}
            spaceBetween={5}
            speed={700}
            loop={true}
            keyboard={{ enabled: true }}
            mousewheel={{
              forceToAxis: false,
              sensitivity: 1,
            }}
            onSlideChange={(swiper) => setSelectedIndex(swiper.realIndex)}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
              swiper.mousewheel.disable();
            }}
            initialSlide={selectedIndex}
            style={{
              width: "100vw",
              boxSizing: "border-box",
              height: "100%",
            }}
          >
            {publication.map((project, index) => (
              <SwiperSlide key={index}>
                <img
                  src={getProxyImageUrl(project.image.url)}
                  alt={project.image.alt || `Image ${index + 1}`}
                  onClick={() => {
                    swiperRef.current?.slideToLoop(index);
                  }}
                  className={`cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] opacity-30`}
                  style={{
                    width: "100%",
                    height: index === selectedIndex ? 370 : 290,
                    opacity: index === selectedIndex ? 1 : 0.3,
                    transformOrigin: "top",
                    transitionProperty: "height, opacity",
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute right-[40px] top-[380px] -translate-y-1/2 z-10"
        >
          <img src="/images/right.svg" alt="Next" />
        </button>
      </div>

      <div className="pt-[16px] text-center" style={{ minHeight: "54px" }}>
        <h2 className="uppercase text-[16px] leading-[22px]">
          {publication[selectedIndex]?.title}
        </h2>
        <p className="uppercase text-[16px] leading-[22px]">
          {publication[selectedIndex]?.sub_title}
        </p>
      </div>
    </div>
  );
};

export default GalleryProjects;
