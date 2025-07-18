"use client";

// import { getProxyImageUrl } from "@/utils/image_proxy";
import {
  ProjectCategoryItem,
  ProjectDecorTag,
} from "../_interfaces/wordpress-components";
import { ImageAcf } from "../_interfaces/wordpress-page";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

interface Props {
  projectsOrientation?: ProjectDecorTag[];
}

function ProjectsDecorTag({ projectsOrientation }: Props) {
  return (
    <div className="mt-[60px] lg:mt-[200px]">
      <div className="space-y-[80px] lg:space-y-[150px] mb-[150px]">
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
                  src={image.url}
                  alt={image.alt || "Project image"}
                  className={`
                    object-cover lg:h-[670px]
                    ${
                      orientation_image === "horizontal"
                        ? "h-[240px] w-[948px] "
                        : "h-[422px] w-full lg:w-[535px]"
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
                        ? "lg:w-[948px]"
                        : "lg:w-[535px]"
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
                className="grid grid-cols-1 gap-[80px] lg:gap-[0px] lg:grid-cols-2 px-[20px] lg:px-0"
                data-aos="fade-up"
              >
                {[first_column, second_column].map((col, i) => (
                  <div key={i}>
                    <img
                      src={col.image.url}
                      alt={col.image.alt || "Column image"}
                      className={`object-cover ${
                        col.size_image === "small"
                          ? `w-[239px] lg:w-[397px] h-[360px] lg:h-[497px] ${
                              i % 2 === 0 ? "ml-auto" : "mr-auto"
                            } lg:mx-auto`
                          : "w-full h-[422px] lg:h-[949px]"
                      }`}
                    />
                    <div
                      className={`pt-[25px] flex ${
                        col.size_image === "small"
                          ? `${
                              i % 2 === 0 ? "ml-auto" : "mr-auto"
                            } w-[239px] lg:max-w-[397px] flex-col lg:mx-auto`
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
                            ? "lg:ml-[100px]"
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
