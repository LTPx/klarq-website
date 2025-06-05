"use client";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import HoverFillButton from "./hover-btn";
import {
  ProjectCategoryItem,
  ProjectCategoryWp,
} from "../_interfaces/wordpress-components";
import ProjectsCategory from "./category-projects";
import { ImageAcf } from "../_interfaces/wordpress-page";

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
}

function CallToAction(props: Props) {
  const { title, categories } = props;

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryWithProjects | null>(null);

  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-out", offset: 80 });
  }, []);

  function decodeHtml(html: string): string {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  return (
    <div>
      <div className="flex flex-col gap-[45px] justify-center items-center ">
        <div
          data-aos="fade-up"
          className="call-title"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div className="flex gap-[15px]" data-aos="fade-up">
          {categories.map((category, i) => (
            <button
              key={i}
              onClick={() => setSelectedCategory(category)}
              className="uppercase flex items-center text-[16px] leading-[15px] rounded-[50px] border border-black border-[0.75px] h-[33px] px-[25px]"
            >
              {decodeHtml(category.name)}
            </button>
          ))}
        </div>
      </div>

      <section>
        {selectedCategory && (
          <ProjectsCategory
            introduction={selectedCategory.introduction}
            projects={selectedCategory.projects}
          />
        )}
      </section>
    </div>
  );
}

export default CallToAction;
