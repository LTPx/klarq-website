"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import MobileCover from "./mobile-cover";
import { InformationWp } from "../_interfaces/wordpress-components";
import { getProxyImageUrl } from "@/utils/image_proxy";
import { useScrollStore } from "../store/scroll-store";
import { WordPressFrontendPage } from "../_interfaces/wordpress-page";
import { Link, usePathname } from "@/navigation";

interface Props {
  projects: {
    project: WordPressFrontendPage;
    title: string;
    date: string;
  }[];
  information: InformationWp;
}

function ArchitecturePageMobile({ projects, information }: Props) {
  const setHasScrolled = useScrollStore((state) => state.setHasScrolled);
  const [firstProject, restProjects] = useMemo(() => {
    return [projects[0], projects.slice(1)];
  }, [projects]);
  const firstProjectRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    const forceScrollTop = () => {
      window.scrollTo(0, 0);
      setTimeout(() => window.scrollTo(0, 0), 50);
      setTimeout(() => window.scrollTo(0, 0), 150);
    };

    forceScrollTop();

    setHasScrolled(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setHasScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const halfScreen = window.innerHeight / 2;
      const scrolled = window.scrollY > halfScreen;
      setHasScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, []);

  return (
    <div>
      <div className="ArchitecturePageMobile">
        <div ref={firstProjectRef} data-index={0}>
          <MobileCover
            information={information}
            labelTitle="Architecture"
            linkSlug={`/architecture/${firstProject.project.slug}`}
            title={firstProject.project.acf.architecture_projects.title_project}
          >
            <div className="bg-white">
              <div className="pb-[3px]">
                <Link
                  key={"cover"}
                  href={`/architecture/${firstProject.project.slug}`}
                  className={`block relative transition-opacity duration-500`}
                  style={{ height: "calc(var(--vh, 1vh) * 50)" }}
                >
                  <img
                    src={getProxyImageUrl(
                      firstProject.project.acf.architecture_projects
                        .cover_project.url
                    )}
                    style={{
                      height: "calc(var(--vh, 1vh) * 50)",
                    }}
                    className="bg-[#00000026] object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black/20 z-10" />
                  <div className="absolute inset-0 flex justify-center items-center z-20 px-4">
                    <span className="uppercase text-white text-center text-[14px] leading-[22px] tracking-[-0.02em]">
                      {
                        firstProject.project.acf.architecture_projects
                          .title_project
                      }
                    </span>
                  </div>
                </Link>
              </div>
              <div
               className="flex flex-col gap-[3px]"
               style={{ marginBottom: "calc(var(--vh, 1vh) * -50)" }}
               >
                {restProjects.map((item, index) => (
                  <Link
                    key={item.project.id}
                    href={`/architecture/${item.project.slug}`}
                    className={`block relative transition-opacity duration-500`}
                    style={{ height: "calc(var(--vh, 1vh) * 50)" }}
                  >
                    <div
                      ref={(el) => {
                        sectionRefs.current[index + 1] = el;
                      }}
                      data-index={index + 1}
                      className="h-full w-full relative"
                    >
                      <img
                        className="bg-[#00000026] object-cover w-full h-full"
                        src={getProxyImageUrl(
                          item.project.acf.architecture_projects.cover_project
                            .url
                        )}
                        alt={item.title}
                      />
                      <div className="absolute inset-0 bg-black/20 z-10" />
                      <div className="absolute inset-0 flex justify-center items-center z-20 px-4">
                        <span className="uppercase text-white text-center text-[14px] leading-[22px] tracking-[-0.02em]">
                          {item.title}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </MobileCover>
        </div>
      </div>
    </div>
  );
}

export default ArchitecturePageMobile;
