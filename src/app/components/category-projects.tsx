"use client";

import { getProxyImageUrl } from "@/utils/image_proxy";
import { ProjectCategoryItem } from "../_interfaces/wordpress-components";
import { ImageAcf } from "../_interfaces/wordpress-page";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

interface IntroductionItem {
  image: ImageAcf;
  description: string;
}

interface Props {
  projects: ProjectCategoryItem[];
  introduction?: IntroductionItem[];
}

function useIsMobile(breakpoint = 1024) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function checkMobile() {
      setIsMobile(window.innerWidth < breakpoint);
    }
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]);

  return isMobile;
}

function ProjectsCategoryDesktop({ projects, introduction }: Props) {
  return (
    <div className="mt-[200px]">
      {Array.isArray(introduction) && introduction.length > 0 && (
        <div className="mb-[150px] space-y-[100px] lg:space-y-[200px]">
          {introduction.map((intro, index) => {
            const isCentered = index % 2 === 0;
            const mobileHeight = index % 2 === 0 ? "h-[422px]" : "h-[240px]";

            return (
              <div
                key={index}
                className={`flex flex-col ${
                  isCentered ? "items-center" : "items-start lg:pl-[40px]"
                } px-[20px] lg:px-0`}
                data-aos="fade-up"
              >
                <img
                  src={getProxyImageUrl(intro.image.url)}
                  alt={intro.image.alt || "Intro image"}
                  className={`
                    object-cover
                    w-full
                    ${mobileHeight}
                    lg:h-[670px]
                    ${isCentered ? "max-w-[535px]" : "lg:max-w-[948px]"}
                  `}
                />
                <div
                  data-aos="fade-up"
                  className={`pt-[25px] w-full ${
                    isCentered ? "max-w-[535px]" : "lg:max-w-[948px]"
                  }`}
                  dangerouslySetInnerHTML={{ __html: intro.description }}
                />
              </div>
            );
          })}
        </div>
      )}

      <div className="space-y-[150px] mb-[150px]">
        {projects.map((project, index) => {
          const isEven = index % 2 === 0;

          if (index === 2) {
            return (
              <div key={index} className="px-[40px]" data-aos="fade-up">
                <div className="flex justify-end">
                  <div className="w-3/4 h-[670px] relative">
                    <img
                      src={getProxyImageUrl(
                        project.image_with_description.image.url
                      )}
                      alt={
                        project.image_with_description.image.alt ||
                        "Description image"
                      }
                      className="object-cover w-full h-full"
                    />
                    <div className="pt-[25px] text-[18px] leading-[22px]">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: project.image_with_description.description,
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-[150px]">
                  <div className="w-[672px] mr-auto text-start">
                    <img
                      src={getProxyImageUrl(project.image_with_title.image.url)}
                      alt={project.image_with_title.image.alt || "Title image"}
                      className="object-cover w-full h-[949px]"
                    />
                    <div className="flex items-start pt-[20px]">
                      <label className="uppercase text-[18px] leading-[22px] font-medium mb-2 flex-shrink-0">
                        {project.image_with_title.title}
                      </label>
                      {project.image_with_title.description_optional && (
                        <div
                          className="introduction-title ml-[100px] text-left"
                          dangerouslySetInnerHTML={{
                            __html:
                              project.image_with_title.description_optional,
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div
              key={index}
              className="grid grid-cols-2 px-[40px]"
              data-aos="fade-up"
            >
              <div
                className={`${isEven ? "order-1" : "order-2"} relative mx-auto`}
              >
                <img
                  src={getProxyImageUrl(
                    project.image_with_description.image.url
                  )}
                  alt={
                    project.image_with_description.image.alt ||
                    "Description image"
                  }
                  className="object-cover w-[397px] h-[497px]"
                />
                <div className="pt-[25px]" style={{ maxWidth: "397px" }}>
                  <div
                    className="text-[18px]"
                    dangerouslySetInnerHTML={{
                      __html: project.image_with_description.description,
                    }}
                  />
                </div>
              </div>

              <div className={`${isEven ? "order-2" : "order-1"}`}>
                <img
                  src={getProxyImageUrl(project.image_with_title.image.url)}
                  alt={project.image_with_title.image.alt || "Title image"}
                  className="object-cover w-full h-[949px]"
                />
                <div className="flex items-start pt-[20px]">
                  <label className="uppercase text-[18px] leading-[22px] font-medium mb-2 flex-shrink-0">
                    {project.image_with_title.title}
                  </label>
                  {project.image_with_title.description_optional && (
                    <div
                      className="introduction-title ml-[100px]"
                      dangerouslySetInnerHTML={{
                        __html: project.image_with_title.description_optional,
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ProjectsCategoryMobile({ projects, introduction }: Props) {
  return (
    <div className="mt-[65px] px-[15px] space-y-[80px]">
      {Array.isArray(introduction) && introduction.length > 0 && (
        <div className="space-y-[80px]">
          {introduction.map((intro, index) => {
            const isCentered = index % 2 === 0;
            const mobileHeight = index % 2 === 0 ? "h-[422px]" : "h-[240px]";

            return (
              <div
                key={index}
                className={`flex flex-col ${
                  isCentered ? "items-center" : "items-start"
                }`}
                data-aos="fade-up"
              >
                <img
                  src={getProxyImageUrl(intro.image.url)}
                  alt={intro.image.alt || "Intro image"}
                  className={`object-cover w-full ${mobileHeight}`}
                />
                <div
                  data-aos="fade-up"
                  className="pt-[25px] w-full text-left"
                  dangerouslySetInnerHTML={{ __html: intro.description }}
                />
              </div>
            );
          })}
        </div>
      )}

      <div className="space-y-[80px]">
        {projects.map((project, index) => {
          const isEven = index % 2 === 0;

          if (index === 2) {
            return (
              <div className={""} key={index} data-aos="fade-up">
                <div className="w-full h-[240px] relative mb-4">
                  <img
                    src={getProxyImageUrl(
                      project.image_with_description.image.url
                    )}
                    alt={
                      project.image_with_description.image.alt ||
                      "Description image"
                    }
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="pt-2 text-[16px] leading-[20px] mb-8">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: project.image_with_description.description,
                    }}
                  />
                </div>
                <div className="flex justify-end">
                  <div className="w-[75%] h-[360px] relative">
                    <img
                      src={getProxyImageUrl(project.image_with_title.image.url)}
                      alt={project.image_with_title.image.alt || "Title image"}
                      className="object-cover w-full h-full"
                    />
                    <div className="flex items-start pt-4">
                      <label className="uppercase text-[16px] leading-[20px] font-medium mb-2 flex-shrink-0">
                        {project.image_with_title.title}
                      </label>
                      {project.image_with_title.description_optional && (
                        <div
                          className="introduction-title ml-4 text-left"
                          dangerouslySetInnerHTML={{
                            __html:
                              project.image_with_title.description_optional,
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div
              key={index}
              className="flex flex-col items-center gap-[40px]"
              data-aos="fade-up"
            >
              <div className={`w-[75%] ${isEven ? "self-end" : "self-start"}`}>
                <img
                  src={getProxyImageUrl(
                    project.image_with_description.image.url
                  )}
                  alt={
                    project.image_with_description.image.alt ||
                    "Description image"
                  }
                  className="object-cover w-full h-[360px]"
                />
                <div className="pt-[15px] text-[16px] leading-[20px]">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: project.image_with_description.description,
                    }}
                  />
                </div>
              </div>

              <div className="w-full relative">
                <img
                  src={getProxyImageUrl(project.image_with_title.image.url)}
                  alt={project.image_with_title.image.alt || "Title image"}
                  className="object-cover w-full h-[422px]"
                />
                <div className="flex flex-col pt-4 px-2">
                  <label className="uppercase text-[16px] leading-[20px] font-medium mb-2">
                    {project.image_with_title.title}
                  </label>
                  {project.image_with_title.description_optional && (
                    <div
                      className="introduction-title text-left"
                      dangerouslySetInnerHTML={{
                        __html: project.image_with_title.description_optional,
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ProjectsCategory({ projects, introduction }: Props) {
  const isMobile = useIsMobile();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out",
      offset: 80,
      once: false,
    });
  }, []);

  return isMobile ? (
    <ProjectsCategoryMobile projects={projects} introduction={introduction} />
  ) : (
    <ProjectsCategoryDesktop projects={projects} introduction={introduction} />
  );
}

export default ProjectsCategory;
