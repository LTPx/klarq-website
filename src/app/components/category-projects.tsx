import { getProxyImageUrl } from "@/utils/image_proxy";
import { ProjectCategoryItem } from "../_interfaces/wordpress-components";
import { ImageAcf } from "../_interfaces/wordpress-page";
import { useEffect } from "react";
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

function ProjectsCategory({ projects, introduction }: Props) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out",
      offset: 80,
      once: false,
    });
  }, []);

  return (
    <div className="mt-[200px]">
      {Array.isArray(introduction) && introduction.length > 0 && (
        <div className="mb-[150px] space-y-[200px]">
          {introduction.map((intro, index) => {
            const isCentered = index % 2 === 0;

            return isCentered ? (
              <div
                key={index}
                className="flex flex-col items-center"
                data-aos="fade-up"
              >
                <img
                  src={getProxyImageUrl(intro.image.url)}
                  alt={intro.image.alt || "Intro image"}
                  className="object-cover w-[535px] h-[670px]"
                />
                <div
                  data-aos="fade-up"
                  className="w-[535px] introduction-title pt-[25px]"
                  dangerouslySetInnerHTML={{ __html: intro.description }}
                />
              </div>
            ) : (
              <div
                key={index}
                className="pl-[40px] flex flex-col items-start"
                data-aos="fade-up"
              >
                <img
                  src={getProxyImageUrl(intro.image.url)}
                  alt={intro.image.alt || "Intro image"}
                  className="object-cover w-[948px] h-[670px]"
                />
                <div
                  data-aos="fade-up"
                  className="introduction-title pt-[25px]"
                  dangerouslySetInnerHTML={{ __html: intro.description }}
                />
              </div>
            );
          })}
        </div>
      )}
      <div className="space-y-[150px]">
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

export default ProjectsCategory;
