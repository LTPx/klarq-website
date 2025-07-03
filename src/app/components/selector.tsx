"use client";

import { Link } from "@/navigation";
import { usePathname } from "next/navigation";
import React from "react";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";

export function LanguageSelector() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations();
  const strippedPath = pathname.replace(/^\/(en|es)/, "") || "/";

  return (
    <div className="flex gap-[10px] items-center">
      <Link
        href={strippedPath}
        locale="es"
        className={`text-center text-[30px] leading-[37px] lg:text-[40px] lg:leading-[60px] transition-opacity ${
          locale === "es" ? "opacity-100" : "opacity-30"
        }`}
      >
        {t("menu.spanish")}
      </Link>
      <span className="text-[30px] leading-[37px] lg:text-[40px] lg:leading-[60px]">
        |
      </span>
      <Link
        href={strippedPath}
        locale="en"
        className={`text-center text-[30px] leading-[37px] lg:text-[40px] lg:leading-[60px] transition-opacity ${
          locale === "en" ? "opacity-100" : "opacity-30"
        }`}
      >
        {t("menu.english")}
      </Link>
    </div>
  );
}

export default LanguageSelector;
