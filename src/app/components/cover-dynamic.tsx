"use client";

import { useEffect, useState, forwardRef } from "react";
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
      }, 2000);

      return () => clearTimeout(timer);
    }, [onExpandEnd]);

    return (
      <div
        ref={ref}
        data-index={0}
        className={`snap-start transition-all duration-[1500ms] ease-in-out lg:h-[calc(100dvh-50px)] ${
          expanded ? "lg:flex-col" : "lg:flex"
        }`}
      >
        <div
          className={`relative transition-all duration-[1500ms] ease-in-out h-full overflow-hidden ${
            expanded ? "w-full" : "lg:w-1/2"
          }`}
        >
          <Link href={`/architecture/${slug}`}>
            <img
              src={img}
              alt="architecture-cover"
              className={`cursor-pointer w-full h-[426px] lg:h-full object-cover transition-all duration-[1500ms] ease-in-out transform ${
                expanded ? "scale-105 opacity-100" : "scale-100 opacity-90"
              }`}
            />
            <div className="absolute inset-0 bg-black/20 z-10" />
          </Link>
        </div>

        {!expanded && (
          <div className="lg:w-1/2 pl-[40px] pr-[90px] h-full flex flex-col gap-[115px] justify-center items-center transition-opacity duration-700 ease-in-out">
            <img
              className="h-[372px] w-[260px]"
              src={information.image.url}
              alt="team-image"
            />
            <div
              data-aos="fade-up"
              className="designer-description"
              dangerouslySetInnerHTML={{ __html: information.description }}
            />
          </div>
        )}
      </div>
    );
  }
);

CoverDynamic.displayName = "CoverDynamic";
export default CoverDynamic;
