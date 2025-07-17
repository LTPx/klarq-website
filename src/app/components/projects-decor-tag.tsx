"use client";

import { getProxyImageUrl } from "@/utils/image_proxy";
import {
  ProjectCategoryItem,
  ProjectDecorTag,
} from "../_interfaces/wordpress-components";
import { ImageAcf } from "../_interfaces/wordpress-page";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

interface IntroductionItem {
  image: ImageAcf;
  description: string;
}

interface Props {
  introduction?: IntroductionItem[];
  projectsOrientation?: ProjectDecorTag[];
}

function ProjectsDecorTag({ projectsOrientation, introduction }: Props) {
  return (
    <div className="mt-[200px]">
      <div className="space-y-[150px] mb-[150px]">
        {projectsOrientation?.map((project, index) => {
          if (project.columns === "one_column") {
            const {
              title,
              image,
              description,
              orientation_image,
              align_image,
            } = project.project_grid_1;

            return (
              <div key={index} className="px-[20px] lg:px-0" data-aos="fade-up">
                <img
                  src={getProxyImageUrl(image.url)}
                  alt={image.alt || "Project image"}
                  className={`
                    object-cover h-[300px] lg:h-[670px]
                    ${
                      orientation_image === "horizontal"
                        ? "w-[948px] "
                        : "w-[535px]"
                    }
                    ${
                      align_image === "Center"
                        ? "mx-auto"
                        : align_image === "Right"
                        ? "ml-auto"
                        : "mr-auto"
                    }
                    `}
                />
                <div
                  className={`
                    pt-[25px]
                    ${
                      orientation_image === "horizontal"
                        ? "w-[948px]"
                        : "w-[535px]"
                    }
                    ${
                      align_image === "Center"
                        ? "mx-auto"
                        : align_image === "Right"
                        ? "ml-auto"
                        : "mr-auto"
                    }
                `}
                >
                  {title && (
                    <label className="uppercase text-[18px] leading-[22px] font-medium mb-[20px] block">
                      {title}
                    </label>
                  )}
                  <div dangerouslySetInnerHTML={{ __html: description }} />
                </div>
              </div>
            );
          }

          if (project.columns === "Two_columns" && project.project_grid_2) {
            const { first_column, second_column } = project.project_grid_2;

            return (
              <div
                key={index}
                className="grid grid-cols-1 lg:grid-cols-2 px-[20px] lg:px-0"
                data-aos="fade-up"
              >
                {[first_column, second_column].map((col, i) => (
                  <div key={i}>
                    <img
                      src={getProxyImageUrl(col.image.url)}
                      alt={col.image.alt || "Column image"}
                      className={`object-cover ${
                        col.size_image === "small"
                          ? "w-[397px] h-[497px] mx-auto"
                          : "w-full h-[949px]"
                      }`}
                    />
                    <div
                      className={`pt-[25px] flex ${
                        col.size_image === "small"
                          ? "max-w-[397px] flex-col mx-auto"
                          : "justify-between"
                      }`}
                    >
                      {col.title && (
                        <label className="uppercase text-[18px] leading-[22px] mb-[20px] font-medium flex-shrink-0">
                          {col.title}
                        </label>
                      )}
                      <div
                        className={`${
                          col.size_image === "big" && col.title
                            ? "ml-[100px]"
                            : ""
                        }`}
                        dangerouslySetInnerHTML={{ __html: col.description }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default ProjectsDecorTag;
