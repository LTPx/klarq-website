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

  const images = [
    "https://images.unsplash.com/photo-1746990263194-0e2826fed608?q=80&w=3544&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1674217930032-825b6e1d8511?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1746730251085-34132b6dcec5?q=80&w=3544&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1746822132410-0aa489a964f2?q=80&w=3607&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1746990263194-0e2826fed608?q=80&w=3544&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1674217930032-825b6e1d8511?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1746730251085-34132b6dcec5?q=80&w=3544&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1746822132410-0aa489a964f2?q=80&w=3607&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const data = await getWordPressCustomPage(locale, "publications");
  const { acf } = data;
  const { publications_information } = acf;

  return (
    <PublicationsPage publications_information={publications_information} />
  );
}

export default Publications;
