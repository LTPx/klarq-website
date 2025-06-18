"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { getProxyImageUrl } from "@/utils/image_proxy";
import DesktopCover from "./cover-desktop";
import { InformationWp } from "../_interfaces/wordpress-components";
import { WordPressFrontendPage } from "../_interfaces/wordpress-page";
import { Link } from "@/navigation";

interface Props {
  projects: {
    project: WordPressFrontendPage;
    title: string;
    date: string;
  }[];
  information: InformationWp;
}

function DevelopmentDesktop({ projects, information }: Props) {
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const firstProjectRef = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState({ progress: 0, isExpanded: false });
  const ticking = useRef(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

    function onWheel(e: WheelEvent) {
      e.preventDefault();

      if (ticking.current) return;

      ticking.current = true;

      requestAnimationFrame(() => {
        setState((prev) => {
          let progress = Math.max(
            0,
            Math.min(1, prev.progress + e.deltaY * 0.0005)
          );

          return {
            progress,
            isExpanded: progress >= 1,
          };
        });
        ticking.current = false;
      });
    }

    if (!state.isExpanded) {
      window.addEventListener("wheel", onWheel, { passive: false });
      document.body.style.overflow = "hidden";

      return () => {
        window.removeEventListener("wheel", onWheel);
        document.body.style.overflow = "";
      };
    } else {
      releaseTimeout = setTimeout(() => {
        document.body.style.overflow = "";
      }, 700);
    }

    return () => {
      clearTimeout(releaseTimeout);
      document.body.style.overflow = "";
    };
  }, [state.isExpanded]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !state.isExpanded) return;

    const onScroll = () => {
      if (container.scrollTop <= 0) {
        setState({
          progress: 1,
          isExpanded: false,
        });

        document.body.style.overflow = "hidden";
      }
    };

    container.addEventListener("scroll", onScroll);

    return () => {
      container.removeEventListener("scroll", onScroll);
    };
  }, [state.isExpanded]);

  return (
    <div
      ref={scrollContainerRef}
      className={`relative h-[calc(100dvh-50px)] flex flex-col gap-[3px] ${
        state.isExpanded
          ? "overflow-y-scroll snap-y snap-mandatory"
          : "overflow-y-hidden"
      }`}
    >
      <div ref={firstProjectRef} data-index={0}>
        <DesktopCover
          img={getProxyImageUrl(
            firstProject.project.acf.development_projects.cover_project.url
          )}
          information={information}
          labelTitle="Development"
          linkSlug={`/development/${firstProject.project.slug}`}
          progress={state.progress}
        />
      </div>
      <div className="pointer-events-none fixed top-0 left-0 w-full h-full flex justify-center items-center z-20">
        <div
          className={`text-white transition-opacity duration-700 ease-in-out ${
            state.isExpanded ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="text-[18px] leading-[22px] tracking-[-0.02em]">
            {currentTitle || firstProject.title}, {currentDate}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-[3px]">
        {restProjects.map((item, index) => (
          <Link
            key={item.project.id}
            href={`/architecture/${item.project.slug}`}
            className={`block relative transition-opacity duration-500 ${
              state.isExpanded
                ? "snap-start opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            } h-[calc(100dvh-50px)]`}
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
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default DevelopmentDesktop;
