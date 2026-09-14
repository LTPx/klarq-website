"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import MobileCover from "./mobile-cover";
import { InformationWp } from "../_interfaces/wordpress-components";
// import { getProxyImageUrl } from "@/utils/image_proxy";
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

function DevelopmentMobile({ projects, information }: Props) {
  const [firstProject, restProjects] = useMemo(() => {
    return [projects[0], projects.slice(1)];
  }, [projects]);
  const firstProjectRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pathname = usePathname();

  // header.tsx now owns hasScrolled globally (one listener, one 24px
  // threshold, reset on route change) for every page including this one.
  // This component used to run its own competing scroll→hasScrolled logic
  // (a halfScreen-based threshold, plus a scrollY===0 reset) — two
  // listeners fighting over the same store is what caused the bottom bar
  // to misbehave on development even after that global fix.
  useEffect(() => {
    window.scrollTo(0, 0);
    const t1 = setTimeout(() => window.scrollTo(0, 0), 50);
    const t2 = setTimeout(() => window.scrollTo(0, 0), 150);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname]);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, []);

  return (
    <div>
      <div className="DevelopmentMobile">
        <div ref={firstProjectRef} data-index={0}>
          <MobileCover
            disableClamp={true}
            information={information}
            labelTitle="Development"
          >
            <div className="bg-white">
              <div className="pb-[3px]">
                <Link
                  key={"cover"}
                  href={`/development/${firstProject.project.slug}`}
                  className={`block relative transition-opacity duration-500`}
                  style={{ height: "calc(var(--vh, 1vh) * 50)" }}
                >
                  <img
                    src={
                      firstProject.project.acf.development_projects
                        .cover_project.url
                    }
                    style={{
                      height: "calc(var(--vh, 1vh) * 50)",
                    }}
                    className="bg-[#00000026] object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black/20 z-10" />
                  <div className="absolute inset-0 flex justify-center items-center z-20 px-4">
                    <span className="uppercase text-white text-center text-[14px] leading-[22px] tracking-[-0.02em]">
                      {
                        firstProject.project.acf.development_projects
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
                    href={`/development/${item.project.slug}`}
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
                        src={
                          item.project.acf.development_projects.cover_project
                            .url
                        }
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

export default DevelopmentMobile;
