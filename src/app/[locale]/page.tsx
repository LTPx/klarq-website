import { Suspense } from "react";
import Home from "./home";
import { getWordPressCustomPage, getWordPressPage } from "../_services/api";

export default async function Page(nextParams: {
  params: { locale: "en" | "es" | "de" };
}) {
  const {
    params: { locale },
  } = nextParams;

  const data = await getWordPressCustomPage(locale, "home");
  const { acf } = data;
  const { home_information } = acf;

  return <Home homeInformation={home_information} />;
}
