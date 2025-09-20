"use client";
import { useEffect, useState, useRef } from "react";
import { DecorPageWp } from "../_interfaces/wordpress-components";
import CallToAction, { CategoryWithProjects } from "./call-to-action";
import DesktopCover from "./cover-desktop";
import { usePathname } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";

interface Props {
  decor_information: DecorPageWp;
}

function DecorUnified({ decor_information }: Props) {
  const [state, setState] = useState({ progress: 0, isExpanded: false });
  const ticking = useRef(false);
  const startY = useRef(0);
  const isTracking = useRef(false);
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, [pathname]);

  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-out", offset: 80, once: false });
  }, []);

  const handleProgress = (delta: number) => {
    if (ticking.current) return;
    ticking.current = true;
    requestAnimationFrame(() => {
      setState((prev) => {
        const progress = Math.max(0, Math.min(1, prev.progress + delta));
        return { progress, isExpanded: progress >= 1 };
      });
      ticking.current = false;
    });
  };

  useEffect(() => {
    let releaseTimeout: NodeJS.Timeout;
    const onTouchStart = (e: TouchEvent) => {
      if (state.isExpanded) return;
      startY.current = e.touches[0].clientY;
      isTracking.current = true;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isTracking.current || state.isExpanded) return;
      e.preventDefault();
      const currentY = e.touches[0].clientY;
      handleProgress((startY.current - currentY) * 0.002);
      startY.current = currentY;
    };
    const onTouchEnd = () => {
      isTracking.current = false;
    };

    const onWheel = (e: WheelEvent) => {
      if (state.isExpanded) return;
      e.preventDefault();
      handleProgress(e.deltaY * 0.0005);
    };

    if (!state.isExpanded) {
      document.body.style.overflow = "hidden";
      window.addEventListener("wheel", onWheel, { passive: false });
      window.addEventListener("touchstart", onTouchStart, { passive: true });
      window.addEventListener("touchmove", onTouchMove, { passive: false });
      window.addEventListener("touchend", onTouchEnd, { passive: true });
    } else {
      releaseTimeout = setTimeout(() => {
        document.body.style.overflow = "";
      }, 400);
    }

    return () => {
      clearTimeout(releaseTimeout);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      document.body.style.overflow = "";
    };
  }, [state.isExpanded]);

  useEffect(() => {
    if (!state.isExpanded) return;
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY <= 50 && currentScrollY < lastScrollY) {
        setState({ progress: 1, isExpanded: false });
        document.body.style.overflow = "hidden";
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
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
            .map((p) => p.project_category || [])
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

export default DecorUnified;
