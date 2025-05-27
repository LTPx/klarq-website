import { getChildPages, getProjectChildBySlug } from "@/app/_services/api";
import ArchitectureInformation from "@/app/components/architecture-information";
import CarouselProjects from "@/app/components/carosuel-projects";
import CoverDynamic from "@/app/components/cover-dynamic";
import Cover from "@/app/components/cover-pages";
import ProjectCard from "@/app/components/project-card";
import { Link } from "@/navigation";

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
    <div className="architecture-slug-page relative bg-white overflow-hidden">
      <div className="fixed top-[35px] left-[35px]">
        <label className="dark:mix-blend-difference text-white text-[66px] leading-[46px] mix-blend-difference">
          KLARQ
        </label>
      </div>
      <div className="fixed top-[35px] right-[35px]">
        <label className="text-[66px] leading-[46px] tracking-[-0.03em] mix-blend-difference">
          ARCHITECTURE
        </label>
      </div>
      <Cover img={architecture_projects.cover_project.url} />
      <section className="pt-[60px]">
        <ArchitectureInformation
          title={architecture_projects.title_project}
          date={architecture_projects.date}
          images_project={architecture_projects.images_project}
          description={architecture_projects.description_project}
        />
      </section>
      <section className="flex flex-col gap-[40px] pt-[150px] px-[40px] pb-[40px]">
        <div className="flex flex-col gap-[8px]">
          <div className="border-[1px] border-t-black "></div>
          <span className="text-[18px] leading-[28px]">More projects</span>
        </div>
        <CarouselProjects slidesNumber={3}>
          {allProjects
            .filter((project) => project.slug !== slug)
            .map((project, index) => (
              <Link
                className="cursor-pointer"
                href={`/architecture/${project.slug}`}
              >
                <ProjectCard
                  title={project.acf.architecture_projects.title_project}
                  image={project.acf.architecture_projects.cover_project.url}
                />
              </Link>
            ))}
        </CarouselProjects>
      </section>
    </div>
  );
}

export default ArchitectureSlugPage;
