"use client";

import Marquee from "react-fast-marquee";

type Props = {
  brands: string[];
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
          <p className="text-[26px] leading-[52px]">
            {brands[0]}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative h-[90px] flex justify-center items-center ${className}`}>
      <Marquee gradient={false} speed={speed} pauseOnHover={true}>
        {brands.map((brand, index) => (
          <span key={index} className="text-[26px] leading-[52px] whitespace-nowrap">
            {brand}<span className="px-4">|</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
