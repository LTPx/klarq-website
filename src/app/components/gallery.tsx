"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useLayoutEffect,
} from "react";
import { PublicationsWp } from "../_interfaces/wordpress-components";
import { getProxyImageUrl } from "@/utils/image_proxy";
import Link from "next/link";

interface GalleryProps {
  publication: PublicationsWp[];
}

const GalleryProjects: React.FC<GalleryProps> = ({ publication }) => {
  const copies = 3;
  const baseLength = publication.length;
  const middleIndexStart = baseLength;

  const [selectedIndex, setSelectedIndex] = useState(middleIndexStart);
  const containerRef = useRef<HTMLDivElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [hasScrolledInitially, setHasScrolledInitially] = useState(false);
  const isResettingRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const extendedPublications = Array(copies).fill(publication).flat();

  const scrollToIndex = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const container = containerRef.current;
      if (!container) return;

      const images = container.querySelectorAll("img");
      const targetImage = images[index] as HTMLImageElement;
      if (!targetImage) return;

      const imageOffsetLeft = targetImage.offsetLeft;
      const imageWidth = targetImage.offsetWidth;
      const containerWidth = container.clientWidth;

      const scrollTo = imageOffsetLeft - containerWidth / 2 + imageWidth / 2;

      container.scrollTo({
        left: scrollTo,
        behavior,
      });
    },
    []
  );

  useEffect(() => {
    if (!hasScrolledInitially && imagesLoaded >= extendedPublications.length) {
      requestAnimationFrame(() => {
        scrollToIndex(selectedIndex, "instant");
        setHasScrolledInitially(true);
      });
    }
  }, [
    imagesLoaded,
    hasScrolledInitially,
    extendedPublications.length,
    scrollToIndex,
    selectedIndex,
  ]);

  useEffect(() => {
    if (!isResettingRef.current) {
      scrollToIndex(selectedIndex, "smooth");
    }
  }, [selectedIndex, scrollToIndex]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    if (selectedIndex < baseLength) {
      isResettingRef.current = true;
      const newIndex = selectedIndex + baseLength;
      setSelectedIndex(newIndex);
      scrollToIndex(newIndex, "instant");
      requestAnimationFrame(() => {
        isResettingRef.current = false;
      });
    } else if (selectedIndex >= baseLength * 2) {
      isResettingRef.current = true;
      const newIndex = selectedIndex - baseLength;
      setSelectedIndex(newIndex);
      scrollToIndex(newIndex, "instant");
      requestAnimationFrame(() => {
        isResettingRef.current = false;
      });
    }
  }, [selectedIndex, baseLength, scrollToIndex]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => prev + 1);
  }, []);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => prev - 1);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let lastScrollTime = 0;
    const scrollCooldown = 900;

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      const delta = e.deltaY;

      if (now - lastScrollTime < scrollCooldown) {
        e.preventDefault();
        return;
      }

      if (Math.abs(delta) > 20) {
        lastScrollTime = now;
        if (delta > 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }

      e.preventDefault();
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [handleNext, handlePrev]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartXRef.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndXRef.current = e.changedTouches[0].clientX;
      const startX = touchStartXRef.current;
      const endX = touchEndXRef.current;

      if (startX !== null && endX !== null) {
        const deltaX = startX - endX;
        if (Math.abs(deltaX) > 50) {
          if (deltaX > 0) {
            handleNext();
          } else {
            handlePrev();
          }
        }
      }

      touchStartXRef.current = null;
      touchEndXRef.current = null;
    };

    container.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleNext, handlePrev]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        handleNext();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  if (baseLength === 0) return null;

  return (
    <div className="relative w-[100vw]">
      <div style={{ height: isMobile ? 320 : 370 }}>
        <button
          onClick={handlePrev}
          className="absolute left-[15px] lg:left-[40px] top-[340px] lg:top-[380px] -translate-y-1/2 z-10"
        >
          <img src="/images/left.svg" alt="Prev" />
        </button>
        <div
          ref={containerRef}
          className="flex gap-[4px]"
          style={{
            overflowX: "hidden",
            scrollBehavior: "smooth",
            touchAction: "pan-y",
          }}
        >
          {extendedPublications.map((pub, index) => {
            const isSelected = index === selectedIndex;
            return (
              <img
                key={index}
                src={getProxyImageUrl(pub.image.url)}
                alt={pub.title}
                onClick={() => setSelectedIndex(index)}
                onLoad={() => setImagesLoaded((prev) => prev + 1)}
                className={`cursor-pointer shrink-0 transition-[width,opacity,transform] duration-700 ease-[cubic-bezier(0.4, 0, 0.2, 1)] origin-top`}
                style={{
                  height: isMobile
                    ? isSelected
                      ? 310
                      : 280
                    : isSelected
                    ? 365
                    : 310,
                  width: isMobile
                    ? isSelected
                      ? 250
                      : 250
                    : isSelected
                    ? 280
                    : "auto",
                  opacity: isSelected ? 1 : 0.3,
                }}
              />
            );
          })}
        </div>
        <button
          onClick={handleNext}
          className="absolute right-[15px] lg:right-[40px] top-[340px] lg:top-[380px] -translate-y-1/2 z-10"
        >
          <img src="/images/right.svg" alt="Next" />
        </button>
      </div>
      <div
        className="pt-[16px] flex flex-col justify-center items-center text-center"
        style={{ minHeight: "54px" }}
      >
        <div className="w-[250px] lg:w-auto">
          {publication[selectedIndex % baseLength]?.url ? (
            <Link
              target="_blank"
              href={publication[selectedIndex % baseLength]?.url}
            >
              <h2 className=" uppercase text-[16px] leading-[22px]">
                {publication[selectedIndex % baseLength]?.title}
              </h2>
            </Link>
          ) : (
            <h2 className=" uppercase text-[16px] leading-[22px]">
              {publication[selectedIndex % baseLength]?.title}
            </h2>
          )}
          <p className="uppercase text-[16px] leading-[22px]">
            {publication[selectedIndex % baseLength]?.sub_title}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GalleryProjects;
