"use client";

import { useEffect, useState } from "react";
import MobileCover from "./mobile-cover";
import { DecorPageWp } from "../_interfaces/wordpress-components";
import CallToAction, { CategoryWithProjects } from "./call-to-action";
import { getProxyImageUrl } from "@/utils/image_proxy";

interface Props {
  decor_information: DecorPageWp;
}

function DecorPageMobile({ decor_information }: Props) {
  const [progress, setProgress] = useState(0); // progress de 0 a 1
  const [isCoverHidden, setIsCoverHidden] = useState(false);

  useEffect(() => {
    let releaseTimeout: NodeJS.Timeout;
    let startY = 0; 

    const clamp = (value: number, min: number, max: number) =>
      Math.min(max, Math.max(min, value));

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };

    const updateProgress = (deltaY: number) => {
      setProgress((prev) => {
        const next = prev + deltaY * 0.005;

        if (prev < 0.5) {
          return clamp(next, 0, 0.5);
        } else {
          if (next >= 1) return 1;
          return clamp(next, 0.5, 1);
        }
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (progress >= 1) return;

      const currentY = e.touches[0].clientY;
      const deltaY = startY - currentY;
      const clampedDeltaY = clamp(deltaY, -50, 50);
      updateProgress(clampedDeltaY);
    };

    const handleWheel = (e: WheelEvent) => {
      if (progress >= 1) return;

      const clampedDeltaY = clamp(e.deltaY, -50, 50);
      updateProgress(clampedDeltaY);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    document.body.style.overflow = "hidden";

    if (progress >= 1) {
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
  }, [progress]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (progress >= 1) {
      timeout = setTimeout(() => {
        setIsCoverHidden(true);
      }, 600);
    } else {
      setIsCoverHidden(false);
    }
    return () => clearTimeout(timeout);
  }, [progress]);

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

  const marginTop = isCoverHidden ? "-38vh" : "0";

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
