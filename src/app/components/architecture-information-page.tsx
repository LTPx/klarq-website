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

function ArchitecturePage({ projects, information }: Props) {
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [allowScroll, setAllowScroll] = useState(false);
  const ignoreNextScroll = useRef(false);

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
      if (isExpanded) {
        if (!allowScroll) {
          if (ignoreNextScroll.current) {
            ignoreNextScroll.current = false;
            e.preventDefault();
            return;
          }
          return;
        }
        return;
      }

      e.preventDefault();

      setProgress((prev) => {
        let next = prev + e.deltaY * 0.001;

        if (next >= 1) {
          setIsExpanded(true);
          ignoreNextScroll.current = true;
          return 1;
        }

        return Math.min(1, Math.max(0, next));
      });
    }

    window.addEventListener("wheel", onWheel, { passive: false });

    if (!isExpanded) {
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
      window.removeEventListener("wheel", onWheel);
      document.body.style.overflow = "";
      clearTimeout(releaseTimeout);
      ignoreNextScroll.current = false;
    };
  }, [isExpanded]);

  return (
    <>
      <div
        ref={scrollContainerRef}
        className={`ArchitecturePage relative h-[calc(100dvh-50px)] ${
          isExpanded
            ? "overflow-y-scroll snap-y snap-mandatory"
            : "overflow-y-hidden"
        }`}
      >
        <div className="pointer-events-none fixed top-0 left-0 w-full h-full flex justify-center items-center z-20">
          <div
            className={`text-white transition-opacity duration-700 ease-in-out ${
              isExpanded ? "opacity-100" : "opacity-0"
            }`}
          >
            <h1 className="text-[18px] leading-[22px] tracking-[-0.02em]">
              {currentTitle || firstProject.title}, {currentDate}
            </h1>
          </div>
        </div>
        <CoverDynamic
          img={getProxyImageUrl(
            firstProject.project.acf.architecture_projects.cover_project.url
          )}
          information={information}
          labelTitle="Architecture"
          linkSlug={`/architecture/${firstProject.project.slug}`}
          progress={progress}
        />
        {restProjects.map((item, index) => (
          <Link
            key={item.project.id}
            href={`/architecture/${item.project.slug}`}
            className={`block h-[calc(100dvh-50px)] relative transition-opacity duration-500 ${
              isExpanded
                ? "snap-start opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
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
                  item.project.acf.architecture_projects.cover_project.url
                )}
                alt={item.title}
              />
              <div className="absolute inset-0 bg-black/20 z-10" />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default ArchitecturePage;
