"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Link } from "@/navigation";

function LogoAnimate() {
  const pathname = usePathname();

  const [windowHeight, setWindowHeight] = useState<number | null>(null);
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  useEffect(() => {
    const updateWindowDimensions = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };

    updateWindowDimensions();
    window.addEventListener("resize", updateWindowDimensions);
    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);

  if (pathname === "/es") return null;

  const isAllowedRoute =
    pathname === "/es/architecture" ||
    pathname === "/es/decor" ||
    pathname === "/es/development";

  if (!isAllowedRoute || windowHeight === null || windowWidth === null)
    return null;

  const initialHeight = windowHeight * 0.4;
  const finalHeight = 66;
  const initialWidth = windowWidth;
  const finalWidth = 322;

  return (
    <div className="container" key={pathname}>
      <Link className="cursor-pointer" href="/">
        <motion.img
          src="/images/KLARQ.svg"
          alt="KLARQ"
          className="hidden lg:block px-[40px] object-contain fixed top-[20px] left-0 z-[1000] mix-blend-difference filter invert"
          initial={{
            y: 0,
            opacity: 1,
            height: initialHeight,
            width: initialWidth,
          }}
          animate={{
            y: 0,
            opacity: 1,
            height: finalHeight,
            width: finalWidth,
          }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </Link>
    </div>
  );
}

export default LogoAnimate;
