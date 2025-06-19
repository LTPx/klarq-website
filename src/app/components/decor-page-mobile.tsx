"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import MobileCover from "./mobile-cover";
import { DecorPageWp } from "../_interfaces/wordpress-components";
import CallToAction, { CategoryWithProjects } from "./call-to-action";
import { getProxyImageUrl } from "@/utils/image_proxy";
import { useScrollStore } from "../store/scroll-store";

interface Props {
  decor_information: DecorPageWp;
}

function DecorPageMobile({ decor_information }: Props) {
  const [phase, setPhase] = useState<0 | 1 | 2>(0);
  const [progress, setProgress] = useState(0);
  const [isCoverHidden, setIsCoverHidden] = useState(false);
  const setHasScrolled = useScrollStore((state) => state.setHasScrolled);

  const lastScrollTime = useRef(0);
  const COOLDOWN_MS = 300;

  const startY = useRef(0);
  const releaseTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      const now = Date.now();
      if (now - lastScrollTime.current < COOLDOWN_MS) return;

      const currentY = e.touches[0].clientY;
      const deltaY = startY.current - currentY;

      if (deltaY > 20 && phase < 2) {
        setPhase((prev) => (prev + 1) as 0 | 1 | 2);
        lastScrollTime.current = now;
        startY.current = currentY;
      } else if (deltaY < -20 && phase > 0) {
        setPhase((prev) => (prev - 1) as 0 | 1 | 2);
        lastScrollTime.current = now;
        startY.current = currentY;
      }
    },
    [phase]
  );

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastScrollTime.current < COOLDOWN_MS) return;

      if (e.deltaY > 20 && phase < 2) {
        setPhase((prev) => (prev + 1) as 0 | 1 | 2);
        lastScrollTime.current = now;
      } else if (e.deltaY < -20 && phase > 0) {
        setPhase((prev) => (prev - 1) as 0 | 1 | 2);
        lastScrollTime.current = now;
      }
    },
    [phase]
  );

  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: false });

    if (phase === 2) {
      if (releaseTimeout.current) clearTimeout(releaseTimeout.current);
      releaseTimeout.current = setTimeout(() => {
        document.body.style.overflow = "";
      }, 700);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("wheel", handleWheel);
      document.body.style.overflow = "";
      if (releaseTimeout.current) clearTimeout(releaseTimeout.current);
    };
  }, [handleWheel, phase]);

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
      setHasScrolled(false);
    }
    return () => clearTimeout(timeout);
  }, [phase, setHasScrolled]);

  const projectKeys = [
    "kitchen_projects",
    "rooms_projects",
    "furniture_projects",
    "textiles_projects",
    "materials_projects",
  ] as const;

  const categories: CategoryWithProjects[] = projectKeys
    .map((key) => {
      const projectData = decor_information.page_content[key];
      if (!projectData?.category?.name) return null;

      const allProjects = Array.isArray(projectData.category_project)
        ? projectData.category_project
            .map((categoryProject) => categoryProject.project_category || [])
            .flat()
        : [];

      const introduction = Array.isArray(projectData.category_introduction)
        ? projectData.category_introduction
        : [];

      return {
        name: projectData.category.name,
        projects: allProjects,
        introduction,
      } as CategoryWithProjects;
    })
    .filter((item): item is CategoryWithProjects => item !== null);

  useEffect(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, []);

  const marginTop = isCoverHidden ? "-39vh" : "calc(var(--vh, 1vh) * 10)";

  return (
    <div>
      <div
        className="DecorPageMobile"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        style={{ touchAction: "pan-y" }}
      >
        <MobileCover
          img={getProxyImageUrl(decor_information.cover.url)}
          information={decor_information.information}
          labelTitle="Decor"
          progress={progress}
        />
      </div>
      <div
        style={{
          marginTop,
          transition: "margin-top 0.5s ease",
        }}
      >
        <div className="pt-[60px] pb-[100px]">
          <CallToAction
            categories={categories}
            title={decor_information.page_content.title_banner}
            defaultProjects={decor_information.page_content.projects_decor}
          />
        </div>
      </div>
    </div>
  );
}

export default DecorPageMobile;
