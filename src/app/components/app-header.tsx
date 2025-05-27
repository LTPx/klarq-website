"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Header from "./header";

function AppHeader(nextParams: { params: { locale: "en" | "es" | "de" } }) {
  const {
    params: { locale },
  } = nextParams;

  const pathname = usePathname();
  const t = useTranslations();

  const linksHeader = [
    // { title: `${t('header.projects')}`, url: "/projects" },
    { title: `${t("header.architecture")}`, url: "/architecture" },
    { title: `${t("header.decor")}`, url: "/decor" },
    { title: `${t("header.development")}`, url: `/development` },
    // { title: `${t("header.shop")}`, url: "/news" },
  ];

  const allLanguages = ["/es", "/en"];

  return (
    <>
      <Header
        links={linksHeader}
        params={{
          locale: "en",
        }}
      />
    </>
  );
}

export default AppHeader;
