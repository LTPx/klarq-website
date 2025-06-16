"use client";
import { useState } from "react";

type Props = {
  children: React.ReactNode;
  href?: string;
  className?: string;
};

export default function HoverFillButton({
  children,
  href = "#",
  className,
}: Props) {
  const [hovered, setHovered] = useState(false);
  const [hoverOrigin, setHoverOrigin] = useState<"left" | "right">("left");

  const handleMouseEnter = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    setHoverOrigin(x < rect.width / 2 ? "left" : "right");
    setHovered(true);
  };

  return (
    <a
      target="_blank"
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setHovered(false)}
      className={`relative group overflow-hidden inline-flex items-center lg:text-[16px] lg:leading-[15px] rounded-[50px] border border-black border-[0.75px] lg:h-[33px] px-[20px] text-black ${className}`}
    >
      <span
        className={`absolute inset-0 rounded-[50px] bg-black z-0 transition-transform duration-700 ease-in-out ${
          hovered ? "scale-x-100" : "scale-x-0"
        }`}
        style={{
          transformOrigin: hovered ? hoverOrigin : "left",
        }}
      />
      <span
        className={`relative z-10 transition-colors duration-700 ${
          hovered ? "text-white" : "text-black"
        }`}
      >
        {children}
      </span>
    </a>
  );
}
