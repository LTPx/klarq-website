"use client";

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard } from "swiper/modules";
import "swiper/css";

import { PublicationsWp } from "../_interfaces/wordpress-components";

interface GalleryProps {
  publication: PublicationsWp[];
}

const GalleryProjects: React.FC<GalleryProps> = ({ publication }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const swiperRef = useRef<any>(null);

  return (
    <div className="relative w-screen h-auto">
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute left-[40px] top-[380px] -translate-y-1/2 z-10"
      >
        <img src="/images/left.svg" alt="Previous" />
      </button>
      <Swiper
        modules={[Keyboard]}
        slidesPerView={6.1}
        centeredSlides={true}
        spaceBetween={5}
        loop={true}
        keyboard={{ enabled: true }}
        onSlideChange={(swiper) => setSelectedIndex(swiper.realIndex)}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        initialSlide={selectedIndex}
        style={{
          width: "100vw",
          boxSizing: "border-box",
        }}
      >
        {publication.map((project, index) => (
          <SwiperSlide key={index}>
            <img
              src={project.image.url}
              alt={project.image.alt || `Image ${index + 1}`}
              onClick={() => {
                swiperRef.current?.slideToLoop(index);
                setSelectedIndex(index);
              }}
              className={`cursor-pointer transition-transform duration-300 mx-auto
    ${
      index === selectedIndex ? "h-[370px] opacity-100" : "h-[290px] opacity-30"
    }
  `}
              style={{ width: "100%" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute right-[40px] top-[380px] -translate-y-1/2 z-10"
      >
        <img src="/images/right.svg" alt="Next" />
      </button>
    </div>
  );
};

export default GalleryProjects;
