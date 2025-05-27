"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "@/navigation";
import { WordPressFrontendPage } from "../_interfaces/wordpress-page";
import CoverDynamic from "./cover-dynamic";
import { InformationWp } from "../_interfaces/wordpress-components";

interface Props {
  projects: {
    project: WordPressFrontendPage;
    title: string;
  }[];
  information: InformationWp;
}

function DevelopmentPage({ projects, information }: Props) {
  const [currentTitle, setCurrentTitle] = useState("");
  const [hasExpanded, setHasExpanded] = useState(false);

  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [firstProject, ...restProjects] = projects;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            const title = projects[index]?.title;
            setCurrentTitle(title);
          }
        });
      },
      { threshold: 0.6 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [projects]);

  const handleExpandEnd = () => {
    setTimeout(() => {
      setHasExpanded(true);
    }, 1100);
  };

  return (
    <>
      <div className="DevelopmentPage relative h-[calc(100dvh-50px)] overflow-y-scroll snap-y snap-mandatory">
        <div className="pointer-events-none fixed top-0 left-0 w-full h-full flex justify-center items-center z-20">
          <div
            className={`text-white transition-opacity duration-700 ease-in-out ${
              hasExpanded ? "opacity-100" : "opacity-0"
            }`}
          >
            <h1 className="text-[18px] leading-[22px] tracking-[-0.02em]">
              {currentTitle || firstProject.title}
            </h1>
          </div>
        </div>

        <CoverDynamic
          ref={(el) => {
            sectionRefs.current[0] = el;
          }}
          img={firstProject.project.acf.development_projects.cover_project.url}
          information={information}
          onExpandEnd={handleExpandEnd}
          linkSlug={`/development/${firstProject.project.slug}`}
          labelTitle="Architecture"
        />

        {restProjects.map((item, index) => (
          <Link
            key={item.project.id}
            href={`/development/${item.project.slug}`}
            className="snap-start block h-[calc(100dvh-50px)] relative"
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
                src={item.project.acf.development_projects.cover_project.url}
                alt={item.title}
              />
              <div className="absolute inset-0 bg-black/20 z-10" />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default DevelopmentPage;
