import { getChildPages, getWordPressCustomPage } from "@/app/_services/api";
import ArchitectureDesktop from "@/app/components/architecture-desktop";
import ArchitecturePage from "@/app/components/architecture-information-page";
import ArchitectureWrapper from "@/app/components/architecture-wrapper";
import { DEFAULT_OG_IMAGE } from "@/app/constants";
import { Metadata } from "next";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: "es" | "en" | "de" };
}): Promise<Metadata> {
  const page = await getWordPressCustomPage(locale, "architecture");
  const origin = "https://klarq.eu";
  console.log(page);
  if (page) {
    const { yoast_seo } = page;
    const { seo_title, seo_desc, seo_keywords, seo_canonical } = yoast_seo;
    const metadata: Metadata = {
      title: seo_title,
      description: seo_desc,
      alternates: {
        canonical: seo_canonical || `${origin}/${locale}/architecture`,
        languages: {
          en: `${origin}/en/architecture`,
          es: `${origin}/es/architecture`,
        },
      },
      openGraph: {
        title: seo_title,
        description: seo_desc,
        type: "website",
        siteName: "KLARQ",
        locale: locale,
        images: [DEFAULT_OG_IMAGE],
      },
      twitter: {
        card: "summary_large_image",
        title: seo_title,
        description: seo_desc,
        images: [DEFAULT_OG_IMAGE],
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
        images: [DEFAULT_OG_IMAGE],
      },
      twitter: {
        card: "summary_large_image",
        title: "KLARQ",
        description:
          "Estudio de Arquitectura en Ibiza y Mallorca, especializado en crear hogares que respiran elegancia y bienestar con esencia Mediterránea y sostenible.",
        images: [DEFAULT_OG_IMAGE],
      },
    };
  }
}

async function Architecture(nextParams: {
  params: { locale: "en" | "es" | "de" };
}) {
  const {
    params: { locale },
  } = nextParams;
  const page = "architecture";
  const parentSlug =
    locale === "es"
      ? "spanish-pages"
      : locale === "de"
      ? "german-pages"
      : "english-pages";

  const data = await getWordPressCustomPage(locale, page);
  const allProjects = await getChildPages(page, locale, parentSlug);

  const { acf } = data;
  const { architecture_information } = acf;

  const selectedProjects = architecture_information.projects
    .map((item) => {
      const matched = allProjects.find((p) => p.id === item.project.ID);
      if (!matched) return undefined;

      return {
        project: matched,
        title: item.project.post_title,
        date: matched.acf.architecture_projects.date,
      };
    })
    .filter(isDefined);

  return (
    <div className="architecture">
      <h1 className="sr-only">
        {locale === "es"
          ? "Innovación y sostenibilidad: Proyectos de Arquitectura Passivhaus"
          : "Innovation and sustainability: Passivhaus architecture projects"}
      </h1>
      {selectedProjects.map((project, index) => (
        <h2 key={index} className="sr-only">
          {project.title}
        </h2>
      ))}
      <ArchitectureWrapper
        information={architecture_information.information}
        projects={selectedProjects}
      />
    </div>
  );
}

export default Architecture;

function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}
