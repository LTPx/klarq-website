"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    let releaseTimeout: NodeJS.Timeout;
    let scrollCooldown = false;
    let startY = 0;
    let phaseTriggered = false;

    const startCooldown = () => {
      scrollCooldown = true;
      setTimeout(() => {
        scrollCooldown = false;
      }, 1000); // cooldown más largo para evitar múltiples saltos
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
        // umbral más alto para scroll hacia arriba
        handleScrollStep();
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (scrollCooldown || phase >= 2) return;
      if (e.deltaY > 30) {
        // umbral más alto para scroll hacia abajo
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

  const marginTop = isCoverHidden ? "-39vh" : "0";

  return (
    <div>
      <div className="DecorPageMobile">
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
