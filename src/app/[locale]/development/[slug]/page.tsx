import { getChildDevelopmentPage, getChildPages } from "@/app/_services/api";
import ArchitectureInformation from "@/app/components/architecture-information";
import CarouselProjects from "@/app/components/carosuel-projects";
import Cover from "@/app/components/cover-pages";
import ProjectCard from "@/app/components/project-card";
import { Link } from "@/navigation";
// import { getProxyImageUrl } from "@/utils/image_proxy";
import { Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: "es" | "en" | "de"; slug: string };
}): Promise<Metadata> {
  const parentSlug =
    locale === "es"
      ? "spanish-pages"
      : locale === "de"
      ? "german-pages"
      : "english-pages";
  const page = await getChildDevelopmentPage(slug, locale, parentSlug);
  const origin = "https://klarq.eu";
  if (page) {
    const { yoast_seo } = page;
    const { seo_title, seo_desc, seo_keywords, seo_canonical } = yoast_seo;
    const metadata: Metadata = {
      title: seo_title,
      description: seo_desc,
      alternates: {
        canonical: seo_canonical
          ? seo_canonical
          : `${origin}/${locale}/development/${slug}`,
        languages: {
          en: `${origin}/en/development/${slug}`,
          es: `${origin}/es/development/${slug}`,
        },
      },
      openGraph: {
        title: seo_title,
        description: seo_desc,
        type: "website",
        siteName: "KLARQ",
        locale: locale,
        images: page.acf?.development_projects?.cover_project?.url
          ? [page.acf.development_projects.cover_project.url]
          : undefined,
      },
      twitter: {
        card: page.acf?.development_projects?.cover_project?.url
          ? "summary_large_image"
          : "summary",
        title: seo_title,
        description: seo_desc,
        images: page.acf?.development_projects?.cover_project?.url
          ? [page.acf.development_projects.cover_project.url]
          : undefined,
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

async function DevelopmentSlugPage(nextParams: {
  params: { locale: "es" | "de" | "en"; slug: string };
}) {
  const {
    params: { locale, slug },
  } = nextParams;
  unstable_setRequestLocale(locale);
  const parentSlug =
    locale === "es"
      ? "spanish-pages"
      : locale === "de"
      ? "german-pages"
      : "english-pages";
  const page = "development";
  const data = await getChildDevelopmentPage(slug, locale, parentSlug);
  const t = await getTranslations();
  const allProjects = await getChildPages(page, locale, parentSlug);

  const { acf } = data;
  const { development_projects } = acf;

  const pageUrl = `https://klarq.eu/${locale}/development/${slug}`;
  const plainDescription = (development_projects.description_project || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 300);

  return (
    <div className="architecture-slug-page relative bg-white overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "CreativeWork",
                "@id": `${pageUrl}#creativework`,
                name: development_projects.title_project,
                description: plainDescription,
                image: development_projects.cover_project?.url,
                url: pageUrl,
                creator: {
                  "@type": "Organization",
                  name: "KLARQ",
                  url: "https://klarq.eu",
                },
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: `https://klarq.eu/${locale}`,
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Development",
                    item: `https://klarq.eu/${locale}/development`,
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: development_projects.title_project,
                    item: pageUrl,
                  },
                ],
              },
            ],
          }),
        }}
      />
      <Link className="lg:hidden cursor-pointer" href={"/"}>
        <div className="cursor-pointer fixed top-[10px] left-[15px] mix-blend-difference text-white z-[1000]">
          <label className="uppercase tracking-[-0.02em] font-zoom cursor-pointer text-[38px] leading-[38px]">
            KLARQ <br /> DEVELOPMENT
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
          DEVELOPMENT
        </label>
      </div>
      <Cover
        img={development_projects.cover_project.url}
        alt={
          development_projects.cover_project.alt ||
          development_projects.title_project
        }
      />
      <section className="pt-[60px]">
        <ArchitectureInformation
          title={development_projects.title_project}
          date={development_projects.date}
          images_project={development_projects.images_project}
          description={development_projects.description_project}
        />
      </section>
      <section className="flex flex-col gap-[40px] pt-[150px] px-[15px] lg:px-[40px] pb-[40px]">
        <div className="flex flex-col gap-[8px]">
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
                href={`/development/${project.slug}`}
              >
                <ProjectCard
                  title={project.acf.development_projects.title_project}
                  image={project.acf.development_projects.cover_project.url}
                />
              </Link>
            ))}
        </CarouselProjects>
      </section>
    </div>
  );
}

export default DevelopmentSlugPage;
