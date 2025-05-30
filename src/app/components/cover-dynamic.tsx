"use client";

import { useEffect, useState, useRef, forwardRef } from "react";
import { motion } from "framer-motion";
import { InformationWp } from "../_interfaces/wordpress-components";
import { Link } from "@/navigation";
import { getProxyImageUrl } from "@/utils/image_proxy";

interface Props {
  className?: string;
  information: InformationWp;
  img?: string;
  onExpandEnd?: () => void;
  linkSlug?: string;
  labelTitle: string;
}

const CoverDynamic = forwardRef<HTMLDivElement, Props>(
  ({ className, img, information, linkSlug, onExpandEnd, labelTitle }, ref) => {
    const [expanded, setExpanded] = useState(false);
    const [labelWidth, setLabelWidth] = useState(0);
    const labelRef = useRef<HTMLLabelElement>(null);

    useEffect(() => {
      const waitForFonts = async () => {
        await document.fonts.ready;
        if (labelRef.current) {
          setLabelWidth(labelRef.current.offsetWidth);
        }
      };
      waitForFonts();
    }, [labelTitle]);

    useEffect(() => {
      if (!labelRef.current) return;

      const observer = new ResizeObserver(() => {
        if (labelRef.current) {
          setLabelWidth(labelRef.current.offsetWidth);
        }
      });

      observer.observe(labelRef.current);
      return () => observer.disconnect();
    }, [labelTitle]);

    useEffect(() => {
      const timer = setTimeout(() => {
        setExpanded(true);
        if (onExpandEnd) onExpandEnd();
      }, 3000);

      return () => clearTimeout(timer);
    }, [onExpandEnd]);

    return (
      <>
        <motion.div
          className="fixed z-[1000] mix-blend-difference text-white"
          style={{
            top: 20,
            left: expanded
              ? `calc(100% - ${labelWidth + 40}px)`
              : `calc(50% + 40px)`,
            transform: expanded ? "none" : "translateX(-50%)",
            transition: "left 1.5s ease-in-out, transform 1.5s ease-in-out",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
        >
          <label
            ref={labelRef}
            className="font-zoom uppercase text-[66px] tracking-[-0.03em]"
          >
            {labelTitle}
          </label>
        </motion.div>

        <div
          ref={ref}
          data-index={0}
          className={`bg-white snap-start transition-all duration-[1500ms] ease-in-out relative flex lg:h-[calc(100dvh-50px)] overflow-hidden`}
        >
          <motion.div
            initial={{ width: "50%", x: -500, opacity: 0 }}
            animate={{
              width: expanded ? "100%" : "50%",
              x: 0,
              opacity: 1,
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="relative h-full overflow-hidden"
          >
            {linkSlug ? (
              <Link href={linkSlug}>
                <img
                  src={img}
                  alt="architecture-cover"
                  className="cursor-pointer w-full h-[426px] lg:h-full object-cover transition-all duration-[1500ms] ease-in-out"
                />
                <div className="absolute inset-0 bg-black/20 z-10" />
              </Link>
            ) : (
              <>
                <img
                  src={img}
                  alt="architecture-cover"
                  className="cursor-default w-full h-[426px] lg:h-full object-cover transition-all duration-[1500ms] ease-in-out"
                />
                <div className="absolute inset-0 bg-black/20 z-10" />
              </>
            )}
          </motion.div>

          <motion.div
            initial={{ x: 0 }}
            animate={{ x: expanded ? "100%" : "0%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-1/2 h-full pl-[40px] pr-[90px] flex flex-col gap-[115px] justify-center items-center bg-white"
          >
            {information.image.url && (
              <motion.img
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: expanded ? 0 : 1 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="h-[372px] w-[260px]"
                src={getProxyImageUrl(information.image.url)}
                alt="team-image"
              />
            )}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: expanded ? 0 : 1 }}
              transition={{ duration: 1.2, delay: 0.6 }}
              className={`designer-description ${
                !information?.image?.url ? "pt-[400px]" : ""
              }`}
              dangerouslySetInnerHTML={{ __html: information.description }}
            />
          </motion.div>
        </div>
      </>
    );
  }
);

CoverDynamic.displayName = "CoverDynamic";
export default CoverDynamic;
