"use client";

import { useEffect } from "react";
import MobileCover from "./mobile-cover";
import { DecorPageWp } from "../_interfaces/wordpress-components";
import CallToAction, { CategoryWithProjects } from "./call-to-action";
// import { getProxyImageUrl } from "@/utils/image_proxy";
import { usePathname } from "next/navigation";

interface Props {
  decor_information: DecorPageWp;
}

function DecorPageMobile({ decor_information }: Props) {
  const pathname = usePathname();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // header.tsx now owns hasScrolled globally (one listener, one 24px
  // threshold, reset on route change) for every page including this one.
  // This component used to run its own competing scroll→hasScrolled logic
  // (a halfScreen-based threshold, plus a scrollY===0 reset) — two
  // listeners fighting over the same store is what caused the bottom bar
  // to misbehave on decor even after that global fix.
  useEffect(() => {
    window.scrollTo(0, 0);
    const t1 = setTimeout(() => window.scrollTo(0, 0), 50);
    const t2 = setTimeout(() => window.scrollTo(0, 0), 150);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname]);

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
        projectsDecor: projectData.projects_category,
      } as CategoryWithProjects;
    })
    .filter((item): item is CategoryWithProjects => item !== null);

  useEffect(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, []);

  return (
    <div>
      <div className="DecorPageMobile">
        <MobileCover
          information={decor_information.information}
          labelTitle="Decor"
        >
          <div className="bg-white">
            <img 
              src={decor_information.cover.url}
              style={{
                height: "calc(var(--vh, 1vh) * 50)",
              }}
              className="w-full object-cover"
            />
            <div className="pt-[60px] pb-[100px] mb-[-45vh]">
              <CallToAction
                categories={categories}
                title={decor_information.page_content.title_banner}
                defaultProjects={decor_information.page_content.projects_decor}
              />
            </div>
          </div>
        </MobileCover>
      </div>
    </div>
  );
}

export default DecorPageMobile;
