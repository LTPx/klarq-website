import { Suspense } from "react";
import Home from "./home";
import { getWordPressPage } from "../_services/api";

export default async function Page(nextParams: {
  params: { locale: "en" | "es" | "de" };
}) {
  const {
    params: { locale },
  } = nextParams;

  return (
    <div>pending</div>
  );
}
