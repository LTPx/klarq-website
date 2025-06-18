"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import MobileCover from "./mobile-cover";
import { InformationWp } from "../_interfaces/wordpress-components";
import { getProxyImageUrl } from "@/utils/image_proxy";
import { useScrollStore } from "../store/scroll-store";
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

function DevelopmentMobile({ projects, information }: Props) {
  const [phase, setPhase] = useState<0 | 1 | 2>(0);
  const [progress, setProgress] = useState(0);
  const [isCoverHidden, setIsCoverHidden] = useState(false);
  const setHasScrolled = useScrollStore((state) => state.setHasScrolled);
  const [firstProject, restProjects] = useMemo(() => {
    return [projects[0], projects.slice(1)];
  }, [projects]);
  const firstProjectRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let releaseTimeout: NodeJS.Timeout;
    let scrollCooldown = false;
    let startY = 0;
    let phaseTriggered = false;

    const startCooldown = () => {
      scrollCooldown = true;
      setTimeout(() => {
        scrollCooldown = false;
      }, 1000);
    };

    const handleScrollStep = () => {
      if (phaseTriggered || phase >= 2) return;
      setPhase((prev) => (prev < 2 ? ((prev + 1) as 0 | 1 | 2) : prev));
      phaseTriggered = true;
      startCooldown();
      setTimeout(() => {
        phaseTriggered = false;
      }, 1000);
    };

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (scrollCooldown || phase >= 2) return;
      const currentY = e.touches[0].clientY;
      const deltaY = startY - currentY;
      if (deltaY > 30) {
        handleScrollStep();
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (scrollCooldown || phase >= 2) return;
      if (e.deltaY > 30) {
        handleScrollStep();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    document.body.style.overflow = "hidden";

    if (phase === 2) {
      releaseTimeout = setTimeout(() => {
        document.body.style.overflow = "";
      }, 700);
    }

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      document.body.style.overflow = "";
      clearTimeout(releaseTimeout);
    };
  }, [phase]);

  useEffect(() => {
    if (phase === 0) setProgress(0);
    else if (phase === 1) setProgress(0.5);
    else if (phase === 2) setProgress(1);
  }, [phase]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (phase === 2) {
      timeout = setTimeout(() => {
        setIsCoverHidden(true);
        setHasScrolled(true);
      }, 600);
    } else {
      setIsCoverHidden(false);
    }
    return () => clearTimeout(timeout);
  }, [phase]);

  useEffect(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, []);

  const marginTop = isCoverHidden ? "-39.6vh" : "0";

  return (
    <div>
      <div className="DevelopmentMobile">
        <div ref={firstProjectRef} data-index={0}>
          <MobileCover
            img={getProxyImageUrl(
              firstProject.project.acf.development_projects.cover_project.url
            )}
            information={information}
            labelTitle="Development"
            linkSlug={`/development/${firstProject.project.slug}`}
            progress={progress}
            title={firstProject.project.acf.development_projects.title_project}
          />
        </div>
      </div>
      <div
        className="flex flex-col gap-[3px]"
        style={{
          marginTop,
          transition: "margin-top 0.5s ease",
        }}
      >
        {restProjects.map((item, index) => (
          <Link
            key={item.project.id}
            href={`/architecture/${item.project.slug}`}
            className={`block relative transition-opacity duration-500 h-[50dvh]`}
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
              <div className="absolute inset-0 flex justify-center items-center z-20 px-4">
                <span className="uppercase text-white text-center text-[14px] leading-[22px] tracking-[-0.02em]">
                  {item.title}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default DevelopmentMobile;
