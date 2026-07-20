import { Suspense } from "react";
import Home from "./home";
import { getWordPressCustomPage, getWordPressPage } from "../_services/api";
import { DEFAULT_OG_IMAGE } from "../constants";
import { Metadata } from "next";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: "es" | "en" | "de" };
}): Promise<Metadata> {
  const page = await getWordPressCustomPage(locale, "home");
  const origin = "https://klarq.eu";

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

export default async function Page(nextParams: {
  params: { locale: "en" | "es" };
}) {
  const {
    params: { locale },
  } = nextParams;

  const data = await getWordPressCustomPage(locale, "home");
  console.log(data);
  const { acf } = data;
  const { home_information } = acf;

  return <Home locale={locale} homeInformation={home_information} />;
}
