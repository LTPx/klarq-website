import { getChildPages, getWordPressCustomPage } from "@/app/_services/api";
import DecorWrapper from "@/app/components/decor-wrapper";
import { DEFAULT_OG_IMAGE } from "@/app/constants";
import { Metadata } from "next";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: "es" | "en" | "de" };
}): Promise<Metadata> {
  const page = await getWordPressCustomPage(locale, "decor");
  const origin = "https://klarq.eu";
  console.log(page);
  if (page) {
    const { yoast_seo } = page;
    const { seo_title, seo_desc, seo_keywords, seo_canonical } = yoast_seo;
    const metadata: Metadata = {
      title: seo_title,
      description: seo_desc,
      alternates: {
        canonical: seo_canonical || `${origin}/${locale}/decor`,
        languages: {
          en: `${origin}/en/decor`,
          es: `${origin}/es/decor`,
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

async function Decor(nextParams: { params: { locale: "en" | "es" | "de" } }) {
  const {
    params: { locale },
  } = nextParams;

  const page = "decor";
  const data = await getWordPressCustomPage(locale, page);

  const { acf } = data;
  const { decor_information } = acf;

  return (
    <div className="decor">
      <h1 className="sr-only">
        {locale === "es"
          ? "Decoración de Interiores: Creando espacios cálidos y funcionales"
          : "Interior Design: Creating Warm and Functional Spaces"}
      </h1>
      <DecorWrapper decor_information={decor_information} />
    </div>
  );
}

export default Decor;
