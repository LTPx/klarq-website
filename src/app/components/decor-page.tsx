"use client";

import { useEffect, useRef, useState } from "react";
import { WordPressFrontendPage } from "../_interfaces/wordpress-page";
import CoverDynamic from "./cover-dynamic";
import {
  DecorPageWp,
  InformationWp,
  ProjectCategoryItem,
  ProjectCategoryWp,
} from "../_interfaces/wordpress-components";
import CallToAction, { CategoryWithProjects } from "./call-to-action";
import DecorProjects from "./decor-projects";
import { getProxyImageUrl } from "@/utils/image_proxy";
import AOS from "aos";
import "aos/dist/aos.css";
import { useExpandStore } from "../store/expand-store";

interface Props {
  decor_information: DecorPageWp;
}

function DecorPage({ decor_information }: Props) {
  const [expanded, setExpanded] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { isExpandedReady, setIsExpandedReady } = useExpandStore();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out",
      offset: 80,
      once: false,
    });
  }, []);

  useEffect(() => {
    if (expanded) {
      AOS.refresh();
    }
  }, [expanded]);

  useEffect(() => {
    if (expanded) {
      const timer = setTimeout(() => {
        setIsExpandedReady(true);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setIsExpandedReady(false);
    }
  }, [expanded]);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (!expanded && e.deltaY > 30) {
        setExpanded(true);
      }
    };

    const container = scrollContainerRef.current;
    container?.addEventListener("wheel", onWheel);
    return () => container?.removeEventListener("wheel", onWheel);
  }, [expanded]);

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
    <div
      ref={scrollContainerRef}
      className={`bg-white ${expanded ? "" : "overflow-y-hidden"}`}
    >
      <div className="DecorPage relative">
        <CoverDynamic
          img={getProxyImageUrl(decor_information.cover.url)}
          information={decor_information.information}
          labelTitle="Decor"
          expanded={expanded}
        />
      </div>
      {isExpandedReady && (
        <>
          <section className="py-[200px]">
            <CallToAction
              categories={categories}
              title={decor_information.page_content.title_banner}
              defaultProjects={decor_information.page_content.projects_decor}
            />
          </section>
        </>
      )}
    </div>
  );
}

export default DecorPage;
