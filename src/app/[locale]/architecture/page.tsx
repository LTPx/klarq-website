import { getChildPages, getWordPressCustomPage } from "@/app/_services/api";
import ArchitecturePage from "@/app/components/architecture-information-page";
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
        canonical: seo_canonical || `${origin}/${locale}`,
        languages: {
          en: `${origin}/en`,
          es: `${origin}/es`,
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
      <ArchitecturePage
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
