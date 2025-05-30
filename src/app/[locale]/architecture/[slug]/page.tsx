import { getChildPages, getProjectChildBySlug } from "@/app/_services/api";
import ArchitectureInformation from "@/app/components/architecture-information";
import CarouselProjects from "@/app/components/carosuel-projects";
import Cover from "@/app/components/cover-pages";
import ProjectCard from "@/app/components/project-card";
import { Link } from "@/navigation";
import { getProxyImageUrl } from "@/utils/image_proxy";

async function ArchitectureSlugPage(nextParams: {
  params: { locale: "es" | "de" | "en"; slug: string };
}) {
  const {
    params: { locale, slug },
  } = nextParams;

  const data = await getProjectChildBySlug(slug, locale);
  const page = "architecture";
  const parentSlug =
    locale === "es"
      ? "spanish-pages"
      : locale === "de"
      ? "german-pages"
      : "english-pages";
  const allProjects = await getChildPages(page, locale, parentSlug);

  const { acf } = data;
  const { architecture_projects } = acf;

  return (
    <div className="architecture-slug-page bg-white relative overflow-hidden">
      <Link className="cursor-pointer" href={"/"}>
        <div className="cursor-pointer fixed top-[40px] left-[35px] mix-blend-difference text-white z-[1000]">
          <label className="font-zoom cursor-pointer text-[66px] leading-[46px] ">
            KLARQ
          </label>
        </div>
      </Link>
      <div className="fixed top-[40px] right-[40px] z-[1000] mix-blend-difference text-white">
        <label className="font-zoom text-[66px] leading-[46px] tracking-[-0.03em]">
          ARCHITECTURE
        </label>
      </div>
      <Cover img={getProxyImageUrl(architecture_projects.cover_project.url)} />
      <section className="pt-[60px]">
        <ArchitectureInformation
          title={architecture_projects.title_project}
          date={architecture_projects.date}
          images_project={architecture_projects.images_project}
          description={architecture_projects.description_project}
        />
      </section>
      <section className="flex flex-col gap-[40px] pt-[150px] px-[40px] pb-[40px]">
        <div           data-aos="fade-up"
 className="flex flex-col gap-[8px]">
          <div  className="border-[1px] border-t-black "></div>
          <span className="text-[18px] leading-[28px]">More projects</span>
        </div>
        <CarouselProjects slidesNumber={3}>
          {allProjects
            .filter((project) => project.slug !== slug)
            .map((project, index) => (
              <Link
                key={index}
                className="cursor-pointer"
                href={`/architecture/${project.slug}`}
              >
                <ProjectCard
                  title={project.acf.architecture_projects.title_project}
                  image={getProxyImageUrl(project.acf.architecture_projects.cover_project.url)}
                />
              </Link>
            ))}
        </CarouselProjects>
      </section>
    </div>
  );
}

export default ArchitectureSlugPage;
