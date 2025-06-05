"use client";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import {
  ProjectCategoryItem,
  ProjectDecorWp,
} from "../_interfaces/wordpress-components";
import ProjectsCategory from "./category-projects";
import { ImageAcf } from "../_interfaces/wordpress-page";
import DecorProjects from "./decor-projects";

export interface CategoryWithProjects {
  name: string;
  projects: ProjectCategoryItem[];
  introduction?: {
    image: ImageAcf;
    description: string;
  }[];
}

interface Props {
  title: string;
  categories: CategoryWithProjects[];
  defaultProjects: ProjectDecorWp[];
}

function CallToAction(props: Props) {
  const { title, categories, defaultProjects } = props;

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryWithProjects | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoverOrigin, setHoverOrigin] = useState<"left" | "right">("left");

  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-out", offset: 80 });
  }, []);

  function decodeHtml(html: string): string {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  const handleMouseEnter = (e: React.MouseEvent, index: number) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const origin = x < rect.width / 2 ? "left" : "right";
    setHoverOrigin(origin);
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div>
      <div className="flex flex-col gap-[45px] justify-center items-center">
        <div
          data-aos="fade-up"
          className="call-title"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div className="flex gap-[15px]" data-aos="fade-up">
          {categories.map((category, i) => {
            const isSelected = selectedCategory?.name === category.name;
            const isHovered = hoveredIndex === i;

            return (
              <button
                key={i}
                onClick={() => setSelectedCategory(category)}
                onMouseEnter={(e) => handleMouseEnter(e, i)}
                onMouseLeave={handleMouseLeave}
                className={`relative uppercase flex items-center text-[16px] leading-[15px] rounded-[50px] border border-black border-[0.75px] h-[33px] px-[25px] overflow-hidden ${
                  isSelected ? "bg-[#E5E5E5]" : "bg-transparent"
                }`}
              >
                {!isSelected && (
                  <span
                    className={`absolute inset-0 rounded-[50px] bg-[#E5E5E5] z-0 transition-transform duration-700 ease-in-out ${
                      isHovered ? "scale-x-100" : "scale-x-0"
                    }`}
                    style={{
                      transformOrigin: isHovered ? hoverOrigin : "left",
                    }}
                  />
                )}

                {/* Text */}
                <span
                  className={`relative z-10 transition-colors duration-300 ${
                    isSelected ? "text-black" : "text-black"
                  }`}
                >
                  {decodeHtml(category.name)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {selectedCategory ? (
        <section>
          <ProjectsCategory
            introduction={selectedCategory.introduction}
            projects={selectedCategory.projects}
          />
        </section>
      ) : (
        <section className="pt-[200px] pl-[40px] flex flex-col gap-[180px] pb-[130px]">
          {defaultProjects?.map((decor, index) => (
            <div key={index}>
              <DecorProjects
                title={decor.title}
                description={decor.description}
                images={decor.gallery}
                date={decor.date}
              />
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

export default CallToAction;
