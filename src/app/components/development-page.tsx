"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@/navigation";
import { WordPressFrontendPage } from "../_interfaces/wordpress-page";
import CoverDynamic from "./cover-dynamic";
import { InformationWp } from "../_interfaces/wordpress-components";
import { getProxyImageUrl } from "@/utils/image_proxy";

interface Props {
  projects: {
    project: WordPressFrontendPage;
    title: string;
    date: string;
  }[];
  information: InformationWp;
}

function DevelopmentPage({ projects, information }: Props) {
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [allowScroll, setAllowScroll] = useState(false);
  const ignoreNextScroll = useRef(false);
  const [isMobile, setIsMobile] = useState(false);
  const firstProjectRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [firstProject, restProjects] = useMemo(() => {
    return [projects[0], projects.slice(1)];
  }, [projects]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            const title = projects[index]?.title;
            const date = projects[index]?.date;
            setCurrentTitle(title);
            setCurrentDate(date);
          }
        });
      },
      { threshold: 0.6 }
    );

    if (firstProjectRef.current) {
      observer.observe(firstProjectRef.current);
    }

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
      observer.disconnect();
    };
  }, [projects]);

  useEffect(() => {
    let releaseTimeout: NodeJS.Timeout;

    const onWheel = (e: WheelEvent) => {
      if (isMobile) return;
      if (isExpanded && !allowScroll) {
        if (ignoreNextScroll.current) {
          ignoreNextScroll.current = false;
          e.preventDefault();
          return;
        }
        return;
      }
      if (!isExpanded) e.preventDefault();

      setProgress((prev) => {
        let next = prev + e.deltaY * 0.001;
        if (next >= 1) {
          setIsExpanded(true);
          ignoreNextScroll.current = true;
          return 1;
        }
        return Math.min(1, Math.max(0, next));
      });
    };

    const handleMobileScroll = (e: WheelEvent | TouchEvent) => {
      if (!isMobile || isExpanded) return;
      e.preventDefault();
      const deltaY = (e as WheelEvent).deltaY || 5;

      setProgress((prev) => {
        let next = prev + deltaY * 0.005;
        if (next >= 1) {
          setIsExpanded(true);
          return 1;
        }
        return Math.min(1, Math.max(0, next));
      });
    };

    if (!isExpanded) {
      if (isMobile) {
        window.addEventListener("wheel", handleMobileScroll, {
          passive: false,
        });
        window.addEventListener("touchmove", handleMobileScroll, {
          passive: false,
        });
      } else {
        window.addEventListener("wheel", onWheel, { passive: false });
      }
      document.body.style.overflow = "hidden";
      setAllowScroll(false);
    } else {
      releaseTimeout = setTimeout(() => {
        document.body.style.overflow = "";
        setAllowScroll(true);
        ignoreNextScroll.current = true;
      }, 700);
    }

    return () => {
      if (isMobile) {
        window.removeEventListener("wheel", handleMobileScroll);
        window.removeEventListener("touchmove", handleMobileScroll);
      } else {
        window.removeEventListener("wheel", onWheel);
      }
      document.body.style.overflow = "";
      clearTimeout(releaseTimeout);
      ignoreNextScroll.current = false;
    };
  }, [isExpanded, isMobile]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !isExpanded || isMobile) return;

    const handleScrollUpToTop = () => {
      if (container.scrollTop <= 0) {
        setIsExpanded(false);
        setProgress(1);
        setAllowScroll(false);
        document.body.style.overflow = "hidden";
      }
    };
    container.addEventListener("scroll", handleScrollUpToTop);
    return () => {
      container.removeEventListener("scroll", handleScrollUpToTop);
    };
  }, [isExpanded, isMobile]);

  const restProjectsMarginTop = isExpanded ? "-50vh" : "0";

  return (
    <>
      <div
        ref={scrollContainerRef}
        className={`ArchitecturePage relative lg:block flex flex-col gap-[3px] ${
          isMobile ? "" : "h-[calc(100dvh-50px)]"
        } ${
          isExpanded
            ? "overflow-y-scroll snap-y snap-mandatory"
            : "overflow-y-hidden"
        }`}
      >
        {!isMobile && (
          <div className="pointer-events-none fixed top-0 left-0 w-full h-full flex justify-center items-center z-20">
            <div
              className={`text-white transition-opacity duration-700 ease-in-out ${
                isExpanded ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="uppercase text-[18px] leading-[22px] tracking-[-0.02em]">
                {currentTitle || firstProject.title}, {currentDate}
              </span>
            </div>
          </div>
        )}
        <div ref={firstProjectRef} data-index={0}>
          <CoverDynamic
            img={getProxyImageUrl(
              firstProject.project.acf.development_projects.cover_project.url
            )}
            information={information}
            labelTitle="Development"
            linkSlug={`/development/${firstProject.project.slug}`}
            progress={progress}
            isMobile={isMobile}
            title={firstProject.project.acf.development_projects.title_project}
          />
        </div>
        <div
          className="lg:block flex flex-col gap-[3px]"
          style={
            isMobile
              ? {
                  marginTop: restProjectsMarginTop,
                  transition: "margin-top 0.5s ease",
                }
              : {}
          }
        >
          {restProjects.map((item, index) => (
            <Link
              key={item.project.id}
              href={`/development/${item.project.slug}`}
              className={`block relative transition-opacity duration-500 ${
                isExpanded
                  ? "snap-start opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              } ${isMobile ? "h-[50dvh]" : "h-[calc(100dvh-50px)]"}`}
            >
              <div
                ref={(el) => {
                  sectionRefs.current[index + 1] = el;
                }}
                data-index={index + 1}
                className="h-full w-full relative"
              >
                <img
                  className="bg-[#00000026] object-cover w-full h-full"
                  src={getProxyImageUrl(
                    item.project.acf.development_projects.cover_project.url
                  )}
                  alt={item.title}
                />
                <div className="absolute inset-0 bg-black/20 z-10" />
                {isMobile && (
                  <div className="absolute inset-0 flex justify-center items-center z-20 px-4">
                    <span className="uppercase text-white text-center text-[14px] leading-[22px] tracking-[-0.02em]">
                      {item.title}
                    </span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default DevelopmentPage;
