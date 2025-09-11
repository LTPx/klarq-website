import { getChildPages, getProjectChildBySlug } from "@/app/_services/api";
import ArchitectureInformation from "@/app/components/architecture-information";
import CarouselProjects from "@/app/components/carosuel-projects";
import Cover from "@/app/components/cover-pages";
import ProjectCard from "@/app/components/project-card";
import { Link } from "@/navigation";
// import { getProxyImageUrl } from "@/utils/image_proxy";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: "es" | "en" | "de"; slug: string };
}): Promise<Metadata> {
  const page = await getProjectChildBySlug(slug, locale);
  const origin = "https://klarq.eu";
  console.log(page);
  if (page) {
    const { yoast_seo } = page;
    const { seo_title, seo_desc, seo_keywords, seo_canonical } = yoast_seo;
    const metadata: Metadata = {
      title: seo_title,
      description: seo_desc,
      alternates: {
        canonical: seo_canonical
          ? seo_canonical
          : `${origin}/${locale}/architecture/${slug}`,
        languages: {
          en: `${origin}/en/${slug}`,
          es: `${origin}/es/${slug}`,
        },
      },
      openGraph: {
        title: seo_title,
        description: seo_desc,
        type: "website",
        siteName: "KLARQ",
        locale: locale,
      },
      twitter: {
        card: "summary",
        title: seo_title,
        description: seo_desc,
      },
      robots: "index, follow",
    };

    if (seo_keywords) {
      if (typeof seo_keywords === "string") {
        metadata.keywords = seo_keywords;
      } else if (Array.isArray(seo_keywords) && seo_keywords.length > 0) {
        metadata.keywords = seo_keywords.join(", ");
      }
    }
    return metadata;
  } else {
    return {
      title: "KLARQ",
      description:
        "Estudio de Arquitectura en Ibiza y Mallorca, especializado en crear hogares que respiran elegancia y bienestar con esencia Mediterránea y sostenible.",
      openGraph: {
        title: "KLARQ",
        description:
          "Estudio de Arquitectura en Ibiza y Mallorca, especializado en crear hogares que respiran elegancia y bienestar con esencia Mediterránea y sostenible.",
        type: "website",
        siteName: "KLARQ",
        locale: locale,
      },
      twitter: {
        card: "summary",
        title: "KLARQ",
        description:
          "Estudio de Arquitectura en Ibiza y Mallorca, especializado en crear hogares que respiran elegancia y bienestar con esencia Mediterránea y sostenible.",
      },
    };
  }
}

async function ArchitectureSlugPage(nextParams: {
  params: { locale: "es" | "de" | "en"; slug: string };
}) {
  const {
    params: { locale, slug },
  } = nextParams;

  const t = await getTranslations();

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
      <Link className="lg:hidden cursor-pointer" href={"/"}>
        <div className="cursor-pointer fixed top-[10px] left-[15px] mix-blend-difference text-white z-[1000]">
          <label className="uppercase tracking-[-0.02em] font-zoom cursor-pointer text-[38px] leading-[38px]">
            KLARQ <br /> ARCHITECTURE
          </label>
        </div>
      </Link>
      <Link className="hidden lg:block cursor-pointer" href={"/"}>
        <div className="cursor-pointer fixed top-[30px] left-[35px] mix-blend-difference text-white z-[1000]">
          <label className="font-zoom cursor-pointer ipad-mini:text-[50px] text-[66px] leading-[46px] ">
            KLARQ
          </label>
        </div>
      </Link>
      <div className="hidden lg:block fixed top-[30px] right-[40px] z-[1000] mix-blend-difference text-white">
        <label className="font-zoom ipad-mini:text-[50px] text-[66px] leading-[46px] tracking-[-0.03em]">
          ARCHITECTURE
        </label>
      </div>
      <Cover img={architecture_projects.cover_project.url} />
      <section className="pt-[15px] lg:pt-[60px]">
        <ArchitectureInformation
          title={architecture_projects.title_project}
          date={architecture_projects.date}
          images_project={architecture_projects.images_project}
          description={architecture_projects.description_project}
        />
      </section>
      <section className="flex flex-col gap-[40px] pt-[150px] px-[15px] lg:px-[40px] pb-[40px]">
        <div data-aos="fade-up" className="flex flex-col gap-[8px]">
          <div className="border-[1px] border-t-black "></div>
          <span className="text-[18px] leading-[28px]">{t("home.more")}</span>
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
