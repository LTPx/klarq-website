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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out",
      offset: 80,
      once: false,
    });
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let releaseTimeout: NodeJS.Timeout;

    function onWheel(e: WheelEvent) {
      if (isMobile) return;

      e.preventDefault();

      setProgress((prev) => {
        let next = prev + e.deltaY * 0.001;

        if (next >= 1) {
          setIsExpanded(true);
          return 1;
        }
        return Math.min(1, Math.max(0, next));
      });
    }

    const handleMobileScroll = (e: WheelEvent | TouchEvent) => {
      if (!isMobile) return;

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
    };

    if (!isExpanded) {
      if (isMobile) {
        window.addEventListener("wheel", handleMobileScroll, {
          passive: false,
        });
        window.addEventListener("touchmove", handleMobileScroll, {
          passive: false,
        });
      } else {
        window.addEventListener("wheel", onWheel, { passive: false });
      }
      document.body.style.overflow = "hidden";
    } else {
      releaseTimeout = setTimeout(() => {
        document.body.style.overflow = "";
      }, 700);
    }

    return () => {
      if (isMobile) {
        window.removeEventListener("wheel", handleMobileScroll);
        window.removeEventListener("touchmove", handleMobileScroll);
      } else {
        window.removeEventListener("wheel", onWheel);
      }
      clearTimeout(releaseTimeout);
      document.body.style.overflow = "";
    };
  }, [isExpanded, isMobile]);

  useEffect(() => {
    if (!isExpanded || isMobile) return;

    let lastScrollY = window.scrollY;

    function onScroll() {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 50 && currentScrollY < lastScrollY) {
        setIsExpanded(false);
        setProgress(1);
        document.body.style.overflow = "hidden";
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      lastScrollY = currentScrollY;
    }

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [isExpanded, isMobile]);

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

  const restProjectsMarginTop = isExpanded ? "-50vh" : "0";

  return (
    <div>
      <div className="DecorPage">
        <CoverDynamic
          img={getProxyImageUrl(decor_information.cover.url)}
          information={decor_information.information}
          labelTitle="Decor"
          progress={progress}
          isMobile={isMobile}
        />
      </div>
      {isExpanded && (
        <section
          className="pt-[60px] pb-[100px] lg:py-[200px]"
          style={
            isMobile
              ? {
                  marginTop: restProjectsMarginTop,
                  transition: "margin-top 0.5s ease",
                }
              : {}
          }
        >
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
