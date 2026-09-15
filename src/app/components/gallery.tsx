"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useLayoutEffect,
} from "react";
import { PublicationsWp } from "../_interfaces/wordpress-components";
// import { getProxyImageUrl } from "@/utils/image_proxy";
import Link from "next/link";

function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

interface GalleryProps {
  publication: PublicationsWp[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  shuffle?: boolean;
}

const GalleryProjects: React.FC<GalleryProps> = ({
  publication,
  autoPlay = false,
  autoPlayInterval = 3200,
  shuffle = false,
}) => {
  const copies = 3;
  const baseLength = publication.length;
  const middleIndexStart = baseLength;

  // Display order — starts as the given order (so server and first client
  // render match, avoiding a hydration mismatch) and gets shuffled once on
  // mount when `shuffle` is on. Keyed lookups below use the original index
  // of each item (stable across the shuffle) instead of its position, so
  // React moves the already-loaded <img> nodes to their new spot instead of
  // swapping their src and reloading them.
  const [items, setItems] = useState<PublicationsWp[]>(publication);
  const originalIndexRef = useRef(new Map(publication.map((pub, i) => [pub, i])));

  useEffect(() => {
    if (shuffle) setItems(shuffleArray(publication));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shuffle]);

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

  const extendedPublications = Array(copies).fill(items).flat();

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

  // Paused while the visitor's mouse is over the gallery or a touch drag is
  // in progress, so autoplay never fights a manual swipe/drag.
  const isPausedRef = useRef(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!autoPlay || baseLength <= 1) return;
    const timer = setInterval(() => {
      if (!isPausedRef.current) handleNext();
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [autoPlay, autoPlayInterval, baseLength, handleNext]);

  useEffect(() => {
    return () => clearTimeout(resumeTimeoutRef.current);
  }, []);

  // Mouse drag to navigate — page scroll (wheel) is left alone entirely so
  // hovering the gallery never blocks scrolling past it. Click-drag past a
  // 50px threshold advances/goes back one slide, mirroring the existing
  // touch swipe behavior below.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let dragStartX: number | null = null;
    let isDragging = false;

    const handleMouseDown = (e: MouseEvent) => {
      dragStartX = e.clientX;
      isDragging = true;
      container.style.cursor = "grabbing";
      container.style.userSelect = "none";
    };

    const endDrag = () => {
      isDragging = false;
      dragStartX = null;
      container.style.cursor = "grab";
      container.style.userSelect = "";
    };

    const handleMouseMove = (e: MouseEvent) => {
      // No live tracking of the images themselves (they're index-driven,
      // not scrollLeft-driven) — this just stops the browser from starting
      // a text-selection drag once the gesture is underway.
      if (isDragging) e.preventDefault();
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (!isDragging || dragStartX === null) {
        endDrag();
        return;
      }
      const deltaX = dragStartX - e.clientX;
      if (Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
      endDrag();
    };

    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mouseleave", endDrag);
    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("mouseleave", endDrag);
    };
  }, [handleNext, handlePrev]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartXRef.current = e.touches[0].clientX;
      isPausedRef.current = true;
      clearTimeout(resumeTimeoutRef.current);
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
      // No hover concept on touch — resume autoplay after a short grace
      // period instead of leaving it paused forever after the first swipe.
      resumeTimeoutRef.current = setTimeout(() => {
        isPausedRef.current = false;
      }, 2500);
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
            cursor: "grab",
          }}
          onMouseEnter={() => {
            // (hover: hover) excludes touch — a tap fires a synthetic
            // mouseenter with no real mouseleave to follow, which would
            // otherwise leave autoplay stuck paused after the first tap.
            // Touch already gets its own pause/resume via touchstart/end.
            if (window.matchMedia?.("(hover: hover)").matches) {
              clearTimeout(resumeTimeoutRef.current);
              isPausedRef.current = true;
            }
          }}
          onMouseLeave={() => {
            isPausedRef.current = false;
          }}
        >
          {extendedPublications.map((pub, index) => {
            const isSelected = index === selectedIndex;
            const originalIndex =
              originalIndexRef.current.get(pub) ?? index % baseLength;
            const copyIndex = Math.floor(index / baseLength);
            return (
              <img
                key={`${originalIndex}-${copyIndex}`}
                src={pub.image.url}
                alt={pub.title}
                onClick={() => {
                  if (isSelected && pub.url) {
                    window.open(pub.url, "_blank", "noopener,noreferrer");
                  } else {
                    setSelectedIndex(index);
                  }
                }}
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
          {items[selectedIndex % baseLength]?.url ? (
            <Link
              target="_blank"
              href={items[selectedIndex % baseLength]?.url}
            >
              <span className=" uppercase text-[16px] leading-[22px]">
                {items[selectedIndex % baseLength]?.title}
              </span>
            </Link>
          ) : (
            <h2 className=" uppercase text-[16px] leading-[22px]">
              {items[selectedIndex % baseLength]?.title}
            </h2>
          )}
          <p className="uppercase text-[16px] leading-[22px]">
            {items[selectedIndex % baseLength]?.sub_title}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GalleryProjects;
