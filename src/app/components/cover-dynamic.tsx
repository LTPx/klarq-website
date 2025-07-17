"use client";

import { useEffect, useRef, forwardRef, useState } from "react";
import { motion } from "framer-motion";
import { InformationWp } from "../_interfaces/wordpress-components";
import { Link } from "@/navigation";
// import { getProxyImageUrl } from "@/utils/image_proxy";

interface Props {
  className?: string;
  information: InformationWp;
  img?: string;
  linkSlug?: string;
  labelTitle: string;
  progress: number;
  isMobile: boolean;
  title?: string;
}

const CoverDynamic = forwardRef<HTMLDivElement, Props>(
  (
    {
      className,
      img,
      information,
      linkSlug,
      labelTitle,
      progress,
      isMobile,
      title,
    },
    ref
  ) => {
    const labelRef = useRef<HTMLLabelElement>(null);
    const titleMobileRef = useRef<HTMLLabelElement>(null);

    const [labelWidth, setLabelWidth] = useState(0);
    const [labelHeight, setLabelHeight] = useState(0);
    const [windowWidth, setWindowWidth] = useState(0);
    const [titleMobileHeight, setTitleMobileHeight] = useState(0);

    useEffect(() => {
      setWindowWidth(window.innerWidth);
    }, []);

    useEffect(() => {
      const waitForFonts = async () => {
        await document.fonts.ready;
        requestAnimationFrame(() => {
          if (labelRef.current) {
            setLabelWidth(labelRef.current.offsetWidth);
            setLabelHeight(labelRef.current.offsetHeight);
          }
        });
      };
      waitForFonts();
    }, [labelTitle]);

    useEffect(() => {
      const waitForFonts = async () => {
        await document.fonts.ready;
        requestAnimationFrame(() => {
          if (titleMobileRef.current) {
            setTitleMobileHeight(titleMobileRef.current.offsetHeight);
          }
        });
      };
      waitForFonts();
    }, [labelTitle]);

    useEffect(() => {
      if (!labelRef.current) return;
      const observer = new ResizeObserver(() => {
        if (labelRef.current) {
          setLabelWidth(labelRef.current.offsetWidth);
          setLabelHeight(labelRef.current.offsetHeight);
        }
      });
      observer.observe(labelRef.current);
      return () => observer.disconnect();
    }, [labelTitle]);

    useEffect(() => {
      if (!titleMobileRef.current) return;
      const observer = new ResizeObserver(() => {
        if (titleMobileRef.current) {
          setTitleMobileHeight(titleMobileRef.current.offsetHeight);
        }
      });
      observer.observe(titleMobileRef.current);
      return () => observer.disconnect();
    }, [labelTitle]);

    const startLeftPx = windowWidth * 0.5 + 40;
    const endLeftPx = windowWidth - labelWidth - 40;
    const interpolatedLeftPx =
      startLeftPx + (endLeftPx - startLeftPx) * progress;
    const left = `${interpolatedLeftPx}px`;

    const translateX = -50 * (1 - progress);
    const transform = `translateX(${translateX}%)`;
    const widthPercent = 50 + 50 * progress;
    const textTranslateX = 100 * progress;
    const [locked, setLocked] = useState(false);

    useEffect(() => {
      if (progress >= 0.5 && !locked) {
        setLocked(true);
      }
    }, [progress, locked]);

    return (
      <>
        {isMobile ? (
          <div className="relative w-full h-[100vh] bg-white overflow-hidden">
            <motion.img
              animate={{ y: locked ? "-100%" : "0%" }}
              transition={{ ease: "easeInOut", duration: 0.6 }}
              src={img}
              alt="architecture-cover"
              className="absolute bottom-0 left-0 w-full h-[50vh] object-cover z-0"
              style={{
                filter: "brightness(0.8)",
              }}
            />
            <motion.div
              animate={{ y: locked ? "-100%" : "0%" }}
              transition={{ ease: "easeInOut", duration: 0.6 }}
              className="absolute bottom-0 left-0 w-full h-[50vh] flex justify-center items-center z-20 px-4"
            >
              <h2 className="uppercase text-white text-center text-[14px] leading-[22px] tracking-[-0.02em]">
                {title}
              </h2>
            </motion.div>
            <Link className="cursor-pointer" href={"/"}>
              <div className="cursor-pointer fixed top-[10px] left-[15px] mix-blend-difference text-white z-[1000]">
                <label
                  ref={titleMobileRef}
                  className="uppercase tracking-[-0.02em] font-zoom cursor-pointer text-[38px] leading-[38px]"
                >
                  KLARQ <br /> {labelTitle}
                </label>
              </div>
            </Link>
            <motion.div
              animate={{
                y: locked
                  ? "-100%"
                  : progress < 0.5
                  ? `-${progress * 100}%`
                  : "-50%",
              }}
              transition={{ ease: "easeInOut", duration: 0.6 }}
              className="absolute flex flex-col justify-between items-center px-[15px] py-[10px] top-0 left-0 w-full h-[calc(100dvh-150px)] z-20 bg-white"
            >
              <div className="w-full" style={{ minHeight: 87 }} />
              {information.image?.url && (
                <img
                  src={information.image.url}
                  alt="team"
                  className="max-h-[30vh] w-auto max-w-full"
                />
              )}
              <div
                className="text-base leading-relaxed text-black"
                dangerouslySetInnerHTML={{ __html: information.description }}
              />
            </motion.div>
          </div>
        ) : (
          <>
            <motion.div
              className="fixed z-[1000] mix-blend-difference text-white"
              style={{
                top: 15,
                left,
                transform,
                transition: "left 0.15s ease-out, transform 0.15s ease-out",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
            >
              <label
                ref={labelRef}
                className="inline-block align-top font-zoom uppercase text-[66px] tracking-[-0.03em]"
                style={{ lineHeight: "66px" }}
              >
                {labelTitle}
              </label>
            </motion.div>

            <div
              ref={ref}
              data-index={0}
              className={`bg-white snap-start relative flex lg:h-[calc(100dvh-50px)] overflow-hidden`}
            >
              <motion.div
                style={{ width: `${widthPercent}%` }}
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
                style={{
                  transform: `translateX(${textTranslateX}%)`,
                  width: "50%",
                  paddingTop: "15px",
                  paddingBottom: "40px",
                  position: "absolute",
                  top: 0,
                  right: 0,
                  height: "100%",
                  paddingLeft: "40px",
                  paddingRight: "90px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "white",
                }}
                animate={{ opacity: 1 - progress }}
                transition={{ ease: "easeInOut" }}
              >
                <div style={{ minHeight: labelHeight, width: labelWidth }} />
                {information.image?.url && (
                  <motion.img
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1 - progress }}
                    transition={{ duration: 0.3 }}
                    className="h-[372px] w-[260px]"
                    src={information.image.url}
                    alt="team-image"
                  />
                )}
                <motion.div
                  style={{ opacity: 1 - progress }}
                  className={`designer-description ${
                    !information?.image?.url ? "pt-[400px]" : ""
                  }`}
                  dangerouslySetInnerHTML={{ __html: information.description }}
                />
              </motion.div>
            </div>
          </>
        )}
      </>
    );
  }
);

CoverDynamic.displayName = "CoverDynamic";
export default CoverDynamic;
