import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@/navigation";
// import { getProxyImageUrl, getProxyVideoUrl } from "@/utils/image_proxy";
import {
  InformationWp,
  MediaFileWp,
} from "../_interfaces/wordpress-components";

interface Props {
  className?: string;
  information: InformationWp;
  img?: string;
  linkSlug?: string;
  labelTitle: string;
  progress: number;
  media?: MediaFileWp;
}

export default function DesktopCover({
  className,
  img,
  information,
  linkSlug,
  labelTitle,
  progress,
  media,
}: Props) {
  const labelRef = useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = useState(0);
  const [labelHeight, setLabelHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

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

  const startLeftPx = windowWidth * 0.5 + 40;
  const endLeftPx = windowWidth - labelWidth - 40;
  const interpolatedLeftPx = startLeftPx + (endLeftPx - startLeftPx) * progress;
  const left = `${interpolatedLeftPx}px`;

  const translateX = -50 * (1 - progress);
  const transform = `translateX(${translateX}%)`;
  const widthPercent = 50 + 50 * progress;
  const textTranslateX = 100 * progress;

  return (
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
          className="inline-block ipad-mini:leading-[50px] leading-[66px] align-top font-zoom uppercase ipad-mini:text-[50px] text-[66px] tracking-[-0.03em]"
          // style={{ lineHeight: "66px" }}
        >
          {labelTitle}
        </label>
      </motion.div>

      <div
        className={`bg-white snap-start relative flex lg:h-[calc(100dvh-50px)] overflow-hidden ${
          className || ""
        }`}
      >
        {img && (
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
        )}
        {media?.type === "image" && (
          <motion.div
            style={{ width: `${widthPercent}%` }}
            className="relative h-full overflow-hidden"
          >
            {linkSlug ? (
              <Link href={linkSlug}>
                <img
                  src={media.url}
                  alt="architecture-cover"
                  className="cursor-pointer w-full h-[426px] lg:h-full object-cover transition-all duration-[1500ms] ease-in-out"
                />
                <div className="absolute inset-0 bg-black/20 z-10" />
              </Link>
            ) : (
              <>
                <img
                  src={media.url}
                  alt="architecture-cover"
                  className="cursor-default w-full h-[426px] lg:h-full object-cover transition-all duration-[1500ms] ease-in-out"
                />
                <div className="absolute inset-0 bg-black/20 z-10" />
              </>
            )}
          </motion.div>
        )}
        {media?.type === "video" && (
          <motion.div
            style={{ width: `${widthPercent}%` }}
            className="relative h-full overflow-hidden"
          >
            <video
              autoPlay={true}
              loop={true}
              muted
              playsInline
              preload="auto"
              className="cursor-default w-full h-[426px] lg:h-full object-cover transition-all duration-[1500ms] ease-in-out"
            >
              <source src={media.url} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/20 z-10" />
          </motion.div>
        )}
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
              className="lg:h-[330px] lg:w-[240px] xl:h-[372px] xl:w-[260px]"
              src={information.image.url}
              alt="team-image"
            />
          )}
          <motion.div
            style={{ opacity: 1 - progress }}
            className={`ipad-mini:line-clamp-5 designer-description ${
              !information?.image?.url ? "pt-[400px]" : ""
            }`}
            dangerouslySetInnerHTML={{ __html: information.description }}
          />
        </motion.div>
      </div>
    </>
  );
}
