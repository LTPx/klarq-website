"use client";

import Marquee from "react-fast-marquee";
import { sliderHome } from "../_interfaces/wordpress-components";

type Props = {
  brands: sliderHome[];
  className?: string;
  speed?: number;
};

export function SliderBrand(props: Props) {
  const { brands, className = "", speed = 50 } = props;

  if (brands.length === 0) return null;
  if (brands.length === 1) {
    return (
      <div className="relative h-[90px] flex justify-center items-center">
        <div className="flex flex-col gap-[10px] justify-center items-center h-full">
          <p className="text-[26px] leading-[52px]">{brands[0].title}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative h-[90px] flex justify-center items-center ${className}`}
    >
      <Marquee gradient={false} speed={speed} pauseOnHover={true}>
        {[...Array(3)]
          .flatMap(() => brands)
          .map((brand, index) => (
            <span
              key={`${brand.title}-${index}`}
              className="text-[26px] leading-[52px] whitespace-nowrap"
            >
              {brand.title}
              <span className="px-4">|</span>
            </span>
          ))}
      </Marquee>
    </div>
  );
}
