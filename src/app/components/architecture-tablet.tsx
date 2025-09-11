"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { WordPressFrontendPage } from "../_interfaces/wordpress-page";
import { InformationWp } from "../_interfaces/wordpress-components";
import { Link, usePathname } from "@/navigation";
import DesktopCover from "./cover-desktop";

interface Props {
  projects: {
    project: WordPressFrontendPage;
    title: string;
    date: string;
  }[];
  information: InformationWp;
}

function ArchitectureTablet({ projects, information }: Props) {
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [scrollEffect, setScrollEffect] = useState(false);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const firstProjectRef = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState({ progress: 0, isExpanded: false });
  const startY = useRef(0);
  const pathname = usePathname();

  const [firstProject, restProjects] = useMemo(() => {
    return [projects[0], projects.slice(1)];
  }, [projects]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => window.scrollTo(0, 0), 50);
  }, [pathname]);

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

    if (firstProjectRef.current) observer.observe(firstProjectRef.current);
    sectionRefs.current.forEach((ref) => ref && observer.observe(ref));

    return () => {
      sectionRefs.current.forEach((ref) => ref && observer.unobserve(ref));
      observer.disconnect();
    };
  }, [projects]);

  useEffect(() => {
    const container = document.body;

    const onTouchStart = (e: TouchEvent) => {
      startY.current = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (state.isExpanded) return;

      const deltaY = startY.current - e.touches[0].clientY;
      let progress = Math.max(0, Math.min(1, state.progress + deltaY * 0.002));
      setState((prev) => ({ ...prev, progress }));

      if (progress >= 1) {
        setState((prev) => ({ ...prev, isExpanded: true }));
        setScrollEffect(true);
        container.style.overflowY = "scroll";
      }
    };

    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: false });
    container.style.overflowY = "hidden";

    return () => {
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.style.overflowY = "";
    };
  }, [state.isExpanded, state.progress]);

  return (
    <div
      className={`ArchitecturePage relative h-[calc(100dvh-50px)] flex flex-col gap-[3px] ${
        scrollEffect
          ? "overflow-y-scroll snap-y snap-mandatory"
          : "overflow-y-hidden"
      }`}
    >
      <div ref={firstProjectRef} data-index={0}>
        <DesktopCover
          img={firstProject.project.acf.architecture_projects.cover_project.url}
          information={information}
          labelTitle="Architecture"
          linkSlug={`/architecture/${firstProject.project.slug}`}
          progress={state.progress}
        />
      </div>

      <div className="pointer-events-none fixed top-0 left-0 w-full h-full flex justify-center items-center z-20">
        <div
          className={`text-white transition-opacity duration-700 ease-in-out ${
            state.progress > 0.5 ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="uppercase text-[18px] leading-[22px] tracking-[-0.02em]">
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
                src={item.project.acf.architecture_projects.cover_project.url}
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

export default ArchitectureTablet;
