import { getWordPressCustomPage } from "@/app/_services/api";
import ContactPage from "@/app/components/contact-page";
import HoverButton from "@/app/components/hover-fill-btn";
import { Link } from "@/navigation";
// import { getProxyImageUrl } from "@/utils/image_proxy";
import { DEFAULT_OG_IMAGE } from "@/app/constants";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: "es" | "en" | "de" };
}): Promise<Metadata> {
  const page = await getWordPressCustomPage(locale, "contact");
  const origin = "https://klarq.eu";
  if (page) {
    const { yoast_seo } = page;
    const { seo_title, seo_desc, seo_keywords, seo_canonical } = yoast_seo;
    const metadata: Metadata = {
      title: seo_title,
      description: seo_desc,
      alternates: {
        canonical: seo_canonical || `${origin}/${locale}/contact`,
        languages: {
          en: `${origin}/en/contact`,
          es: `${origin}/es/contact`,
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

async function Contact(nextParams: { params: { locale: "en" | "es" | "de" } }) {
  const {
    params: { locale },
  } = nextParams;
  const t = await getTranslations();
  const data = await getWordPressCustomPage(locale, "contact");
  const { acf } = data;
  const { contact_information } = acf;

  return (
    <>
      <div className="lg:hidden">
        <ContactPage contact_information={contact_information} />
      </div>
      <h1 className="sr-only">
        {locale === "es"
          ? "Contáctanos: Arquitectos en Ibiza y Mallorca"
          : "Contact us: Architects in Ibiza and Mallorca"}
      </h1>
      <div className="hidden lg:flex lg:h-[calc(100dvh-50px)]">
        <Link className="cursor-pointer" href={"/"}>
          <div className="cursor-pointer fixed top-[40px] left-[35px] z-[1000]">
            <label className="font-zoom cursor-pointer ipad-mini:text-[50px] text-[66px] leading-[46px] ">
              KLARQ
            </label>
          </div>
        </Link>
        <div className="fixed top-[40px] right-[40px] z-[1000] mix-blend-difference text-white">
          <label className="font-zoom ipad-mini:text-[50px] text-[66px] leading-[46px] tracking-[-0.03em]">
            CONTACT
          </label>
        </div>
        <div className="bg-green lg:w-1/2 h-full flex flex-col gap-[16px] justify-center items-center">
          <div
            className="contact-information"
            dangerouslySetInnerHTML={{
              __html: contact_information.description,
            }}
          />
          <div className="flex flex-col">
            <br />
            <p className="text-center text-[16px] leading-[22px] ">
              {`${t("footer.follow")}`}
            </p>
          </div>
          <div className="flex gap-[15px]">
            <HoverButton href="https://www.instagram.com/klarq.architecture/">
              {t("footer.social_architecture")}
            </HoverButton>
            <HoverButton href="https://www.instagram.com/klarq.decor/">
              {t("footer.social_decor")}
            </HoverButton>
            <HoverButton href="https://www.instagram.com/klarq.development/">
              {t("footer.social_development")}
            </HoverButton>
          </div>
        </div>
        <div className="lg:w-1/2 h-full">
          <img
            src={contact_information.cover.url}
            alt="contact"
            className="w-full h-[426px] lg:h-full object-cover"
          />
        </div>
      </div>
    </>
  );
}

export default Contact;
