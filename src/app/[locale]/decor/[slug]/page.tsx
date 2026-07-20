import { getChildDecorPage } from "@/app/_services/api";
import ArchitectureInformation from "@/app/components/architecture-information";
import CallToAction from "@/app/components/call-to-action";
import Cover from "@/app/components/cover-pages";
import DecorProjects from "@/app/components/decor-projects";
import GalleryProjects from "@/app/components/gallery";
import { DEFAULT_OG_IMAGE } from "@/app/constants";
import { Link } from "@/navigation";
// import { getProxyImageUrl } from "@/utils/image_proxy";
import { Metadata } from "next";

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
  const page = await getChildDecorPage(slug, locale, parentSlug);
  const origin = "https://klarq.eu";
  const ogImage = page?.acf?.decor_projects?.cover_project?.url || DEFAULT_OG_IMAGE;

  if (page?.yoast_seo) {
    const { seo_title, seo_desc, seo_keywords, seo_canonical } = page.yoast_seo;
    const metadata: Metadata = {
      title: seo_title,
      description: seo_desc,
      alternates: {
        canonical: seo_canonical || `${origin}/${locale}/decor/${slug}`,
        languages: {
          en: `${origin}/en/decor/${slug}`,
          es: `${origin}/es/decor/${slug}`,
        },
      },
      openGraph: {
        title: seo_title,
        description: seo_desc,
        type: "website",
        siteName: "KLARQ",
        locale: locale,
        images: [ogImage],
      },
      twitter: {
        card: "summary_large_image",
        title: seo_title,
        description: seo_desc,
        images: [ogImage],
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
  }

  return {
    title: "KLARQ decor",
    description:
      "Estudio de Arquitectura e Interiorismo en Ibiza y Mallorca, especializado en crear hogares que respiran elegancia y bienestar con esencia Mediterránea y sostenible.",
    openGraph: {
      title: "KLARQ decor",
      description:
        "Estudio de Arquitectura e Interiorismo en Ibiza y Mallorca, especializado en crear hogares que respiran elegancia y bienestar con esencia Mediterránea y sostenible.",
      type: "website",
      siteName: "KLARQ",
      locale: locale,
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: "KLARQ decor",
      description:
        "Estudio de Arquitectura e Interiorismo en Ibiza y Mallorca, especializado en crear hogares que respiran elegancia y bienestar con esencia Mediterránea y sostenible.",
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

async function DecorSlugPage(nextParams: {
  params: { locale: "es" | "de" | "en"; slug: string };
}) {
  const {
    params: { locale, slug },
  } = nextParams;

  const parentSlug =
    locale === "es"
      ? "spanish-pages"
      : locale === "de"
      ? "german-pages"
      : "english-pages";

  const data = await getChildDecorPage(slug, locale, parentSlug);
  const { acf } = data;
  const { decor_projects } = acf;

  return (
    <div className="architecture-slug-page">
      <div className="fixed top-[40px] left-[35px] mix-blend-difference text-white z-[1000]">
        <label className="text-[66px] leading-[46px] ">KLARQ</label>
      </div>
      <div className="fixed top-[40px] right-[40px] z-[1000] mix-blend-difference text-white">
        <label className="text-[66px] leading-[46px] tracking-[-0.03em]">
          DECOR
        </label>
      </div>
      <Cover
        img={decor_projects.cover_project.url}
        alt={decor_projects.cover_project.alt || "KLARQ decor"}
      />
      {/* <section className="py-[200px]">
        <CallToAction title={decor_projects.banner.title} />
      </section> */}
      <section className="px-[40px] flex flex-col gap-[180px] pb-[130px]">
        {decor_projects.projects &&
          decor_projects.projects.map((decor, index) => (
            <div key={index}>
              <DecorProjects
                title={decor.title}
                description={decor.description}
                images={decor.gallery}
                date={decor.date}
                // url="/"
              />
            </div>
          ))}
      </section>
    </div>
  );
}

export default DecorSlugPage;
