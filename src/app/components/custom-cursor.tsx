"use client";

import { useEffect, useRef } from "react";

interface Props {
  isVisible: boolean;
  rotation?: number;
}

export default function CustomCursor({ isVisible, rotation = 0 }: Props) {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    document.addEventListener("mousemove", moveCursor);
    return () => {
      document.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor fixed w-[25px] h-[25px] -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-500 z-[9999] ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        willChange: "transform",
        pointerEvents: "none",
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <img
        src="/images/cursor-arrow.svg"
        alt="cursor"
        className="w-full h-full"
      />
    </div>
  );
}
