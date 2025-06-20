"use client";

import { ImageAcf } from "../_interfaces/wordpress-page";
import GalleryImagesScroll from "./gallery-images-scroll";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  title: string;
  date?: string;
  description: string;
  images: ImageAcf[];
}

function DecorProjects(props: Props) {
  const { title, description, images, date } = props;

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out",
      offset: 80,
      once: false,
    });
  }, []);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <div className="DecorProjects w-full">
      <GalleryImagesScroll
        animationType="fade-left"
        stagger={false}
        images={images}
      />
      <div className="grid gap-[22px] lg:gap-[0px] grid-cols-1 lg:grid-cols-2 pt-[10px] lg:pt-[25px]">
        <div className="flex pr-[15px] lg:pr-[0px] flex-col lg:justify-start justify-between flex-row">
          <div className="flex items-center justify-between w-full">
            <h2 className="text-[16px] lg:text-[18px] leading-[22px]">
              {title} <br className="lg:hidden" />{" "}
              <span className="lg:hidden">{date}</span>
            </h2>
            <button
              onClick={toggleExpanded}
              className="lg:hidden text-[24px] font-bold"
              aria-label="Toggle Description"
            >
              <img
                src="/images/more.svg"
                className={`transition-transform duration-300 ${
                  isExpanded
                    ? "rotate-45 h-[15px] w-[15px]"
                    : "rotate-0 h-[15px] w-[15px]"
                }`}
              />
            </button>
          </div>
          <span className="hidden lg:block text-[16px] lg:text-[18px] leading-[22px]">
            {date}
          </span>
        </div>
        <div
          className="hidden lg:block designer-description pr-[15px] lg:pr-[50px]"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <div className="lg:hidden col-span-1">
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                key="mobile-description"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="designer-description pr-[15px] pt-2"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default DecorProjects;
