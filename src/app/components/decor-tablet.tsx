"use client";

import { useEffect, useState, useRef } from "react";
import { DecorPageWp } from "../_interfaces/wordpress-components";
import CallToAction, { CategoryWithProjects } from "./call-to-action";
import AOS from "aos";
import "aos/dist/aos.css";
import DesktopCover from "./cover-desktop";
import { usePathname } from "next/navigation";

interface Props {
  decor_information: DecorPageWp;
}

function DecorTablet({ decor_information }: Props) {
  const [state, setState] = useState({ progress: 0, isExpanded: false });
  const ticking = useRef(false);
  const startY = useRef(0);
  const isTracking = useRef(false);
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

    function onTouchStart(e: TouchEvent) {
      if (state.isExpanded) return;
      startY.current = e.touches[0].clientY;
      isTracking.current = true;
    }

    function onTouchMove(e: TouchEvent) {
      if (!isTracking.current || state.isExpanded) return;

      e.preventDefault();

      if (ticking.current) return;

      ticking.current = true;

      requestAnimationFrame(() => {
        if (!isTracking.current) {
          ticking.current = false;
          return;
        }

        const currentY = e.touches[0].clientY;
        const deltaY = startY.current - currentY;

        setState((prev) => {
          let progress = Math.max(
            0,
            Math.min(1, prev.progress + deltaY * 0.002)
          );
          return {
            progress,
            isExpanded: progress >= 1,
          };
        });

        startY.current = currentY;
        ticking.current = false;
      });
    }

    function onTouchEnd() {
      isTracking.current = false;
    }

    if (!state.isExpanded) {
      document.addEventListener("touchstart", onTouchStart, { passive: true });
      document.addEventListener("touchmove", onTouchMove, { passive: false });
      document.addEventListener("touchend", onTouchEnd, { passive: true });
      document.body.style.overflow = "hidden";

      return () => {
        document.removeEventListener("touchstart", onTouchStart);
        document.removeEventListener("touchmove", onTouchMove);
        document.removeEventListener("touchend", onTouchEnd);
        document.body.style.overflow = "";
      };
    } else {
      releaseTimeout = setTimeout(() => {
        document.body.style.overflow = "";
      }, 100);
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
        projectsDecor: projectData.projects_category,
      } as CategoryWithProjects;
    })
    .filter((item): item is CategoryWithProjects => item !== null);

  return (
    <div>
      <div className="DecorPage">
        <DesktopCover
          media={decor_information.cover}
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

export default DecorTablet;
