"use client";

import { useEffect, useRef, useState } from "react";
import CoverDynamic from "./cover-dynamic";
import { DecorPageWp } from "../_interfaces/wordpress-components";
import CallToAction, { CategoryWithProjects } from "./call-to-action";
import { getProxyImageUrl } from "@/utils/image_proxy";
import AOS from "aos";
import "aos/dist/aos.css";

interface Props {
  decor_information: DecorPageWp;
}

function DecorPage({ decor_information }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [allowScroll, setAllowScroll] = useState(false);
  const ignoreNextScroll = useRef(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out",
      offset: 80,
      once: false,
    });
  }, []);

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
      <div className="DecorPage">
        <CoverDynamic
          img={getProxyImageUrl(decor_information.cover.url)}
          information={decor_information.information}
          labelTitle="Decor"
          progress={progress}
        />
      </div>
      {isExpanded && (
        <section className="py-[200px]">
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

export default DecorPage;
