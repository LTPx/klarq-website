"use client";

import { useEffect, useState, forwardRef } from "react";
import { motion } from "framer-motion";
import { InformationWp } from "../_interfaces/wordpress-components";
import { Link } from "@/navigation";

interface Props {
  className?: string;
  information: InformationWp;
  img?: string;
  onExpandEnd?: () => void;
  slug?: string;
}

const CoverDynamic = forwardRef<HTMLDivElement, Props>(
  ({ className, img, information, slug, onExpandEnd }, ref) => {
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        setExpanded(true);
        if (onExpandEnd) onExpandEnd();
      }, 3000);

      return () => clearTimeout(timer);
    }, [onExpandEnd]);

    return (
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
          // animate={{ width: expanded ? "100%" : "50%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="relative h-full overflow-hidden"
        >
          <Link href={`/architecture/${slug}`}>
            <img
              src={img}
              alt="architecture-cover"
              className="cursor-pointer w-full h-[426px] lg:h-full object-cover transition-all duration-[1500ms] ease-in-out"
            />
            <div className="absolute inset-0 bg-black/20 z-10" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ x: 0 }}
          animate={{ x: expanded ? "100%" : "0%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-1/2 h-full pl-[40px] pr-[90px] flex flex-col gap-[115px] justify-center items-center bg-white"
        >
          <motion.img
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: expanded ? 0 : 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="h-[372px] w-[260px]"
            src={information.image.url}
            alt="team-image"
          />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: expanded ? 0 : 1 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="designer-description"
            dangerouslySetInnerHTML={{ __html: information.description }}
          />
        </motion.div>
      </div>
    );
  }
);

CoverDynamic.displayName = "CoverDynamic";
export default CoverDynamic;
