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
  const [isExpanded, setIsExpanded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let releaseTimeout: NodeJS.Timeout;

    function handleMobileScroll(e: WheelEvent | TouchEvent) {
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
    }

    if (!isExpanded) {
      window.addEventListener("wheel", handleMobileScroll, {
        passive: false,
      });
      window.addEventListener("touchmove", handleMobileScroll, {
        passive: false,
      });
      document.body.style.overflow = "hidden";
    } else {
      releaseTimeout = setTimeout(() => {
        document.body.style.overflow = "";
      }, 700);
    }

    return () => {
      window.removeEventListener("wheel", handleMobileScroll);
      window.removeEventListener("touchmove", handleMobileScroll);
      clearTimeout(releaseTimeout);
      document.body.style.overflow = "";
    };
  }, [isExpanded]);

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

  return (
    <div>
      <div className="DecorPageMobile">
        <MobileCover
          img={getProxyImageUrl(decor_information.cover.url)}
          information={decor_information.information}
          labelTitle="Decor"
        />
      </div>
      {isExpanded && (
        <section className="pt-[60px] pb-[100px]">
          <CallToAction
            categories={categories}
            title={decor_information.page_content.title_banner}
            defaultProjects={decor_information.page_content.projects_decor}
          />
        </section>
      )}
    </div>
  );
}

export default DecorPageMobile;
