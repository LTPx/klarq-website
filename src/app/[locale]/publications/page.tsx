import { getWordPressCustomPage } from "@/app/_services/api";
import Cover from "@/app/components/cover-pages";
import GalleryProjects from "@/app/components/gallery";
import PublicationsPage from "@/app/components/publications-page";
import { useTranslations } from "next-intl";

async function Publications(nextParams: {
  params: { locale: "en" | "es" | "de" };
}) {
  const {
    params: { locale },
  } = nextParams;

  const data = await getWordPressCustomPage(locale, "publications");
  const { acf } = data;
  const { publications_information } = acf;

  return (
    <PublicationsPage publications_information={publications_information} />
  );
}

export default Publications;
