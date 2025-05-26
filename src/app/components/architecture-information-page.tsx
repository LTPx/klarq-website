"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "@/navigation";
import { WordPressFrontendPage } from "../_interfaces/wordpress-page";

interface Props {
  projects: {
    project: WordPressFrontendPage;
    title: string;
  }[];
}

function ArchitecturePage({ projects }: Props) {
  const [currentTitle, setCurrentTitle] = useState("");
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  return (
    <div className="ArchitecturePage relative h-[calc(100dvh-50px)] overflow-y-scroll snap-y snap-mandatory">
      <div className="pointer-events-none fixed top-0 left-0 w-full h-full flex justify-center items-center z-20">
        <div className="text-white">
          <h1 className="text-[18px] leading-[22px] tracking-[-0.02em]">
            {currentTitle}
          </h1>
        </div>
      </div>

      {projects.map((item, index) => (
        <Link
          key={item.project.id}
          href={`/architecture/${item.project.slug}`}
          className="snap-start block h-[calc(100dvh-50px)] relative"
        >
          <div
            ref={(el) => {
              sectionRefs.current[index] = el;
            }}
            data-index={index}
            className="h-full w-full relative"
          >
            <img
              className="bg-[#00000026] object-cover w-full h-full"
              src={item.project.acf.architecture_projects.cover_project.url}
              alt={item.title}
            />
            <div className="absolute inset-0 bg-black/20 z-10" />
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ArchitecturePage;
