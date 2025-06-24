"use client";

import { useEffect, useState, useRef } from "react";
import { DecorPageWp } from "../_interfaces/wordpress-components";
import CallToAction, { CategoryWithProjects } from "./call-to-action";
import { getProxyImageUrl } from "@/utils/image_proxy";
import AOS from "aos";
import "aos/dist/aos.css";
import DesktopCover from "./cover-desktop";
import { usePathname } from "next/navigation";

interface Props {
  decor_information: DecorPageWp;
}

function DecorPage({ decor_information }: Props) {
  const [state, setState] = useState({ progress: 0, isExpanded: false });
  const ticking = useRef(false);

  const pathname = usePathname();

  useEffect(() => {
    const forceScrollTop = () => {
      window.scrollTo(0, 0);
      setTimeout(() => window.scrollTo(0, 0), 50);
      setTimeout(() => window.scrollTo(0, 0), 150);
    };

    forceScrollTop();
  }, [pathname]);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-out", offset: 80, once: false });
  }, []);

  useEffect(() => {
    let releaseTimeout: NodeJS.Timeout;

    function onWheel(e: WheelEvent) {
      e.preventDefault();

      if (ticking.current) return;

      ticking.current = true;

      requestAnimationFrame(() => {
        setState((prev) => {
          let progress = Math.max(
            0,
            Math.min(1, prev.progress + e.deltaY * 0.0005)
          );

          return {
            progress,
            isExpanded: progress >= 1,
          };
        });
        ticking.current = false;
      });
    }

    if (!state.isExpanded) {
      window.addEventListener("wheel", onWheel, { passive: false });
      document.body.style.overflow = "hidden";

      return () => {
        window.removeEventListener("wheel", onWheel);
        document.body.style.overflow = "";
      };
    } else {
      releaseTimeout = setTimeout(() => {
        document.body.style.overflow = "";
      }, 700);
    }

    return () => {
      clearTimeout(releaseTimeout);
      document.body.style.overflow = "";
    };
  }, [state.isExpanded]);

  useEffect(() => {
    if (!state.isExpanded) return;

    let lastScrollY = window.scrollY;

    function onScroll() {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 50 && currentScrollY < lastScrollY) {
        setState((prev) => ({
          progress: 1,
          isExpanded: false,
        }));

        document.body.style.overflow = "hidden";

        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      lastScrollY = currentScrollY;
    }

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [state.isExpanded]);

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
        <DesktopCover
          img={getProxyImageUrl(decor_information.cover.url)}
          information={decor_information.information}
          labelTitle="Decor"
          progress={state.progress}
        />
      </div>
      {state.isExpanded && (
        <section className="pt-[60px] pb-[100px] lg:py-[200px]">
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
