"use client";

import { Link } from "@/navigation";
import { usePathname } from "@/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface LinksHeader {
  title: string;
  url: string;
}

export function Header({
  links,
  params,
}: {
  links: LinksHeader[];
  params: { locale: "es" | "de" | "en" };
}) {
  const locale = params.locale;
  const currentPath = usePathname();

  return (
    <>
      <header className="bg-gray container fixed bottom-0 z-[1000]">
        <div className="h-[50px] px-[40px] flex justify-between items-center">
          <img src="/images/menu-logo.svg" />
          <div className="flex gap-[150px]">
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.url}
                className="flex items-center gap-[6px]"
              >
                <img src="/images/circle.svg" className="h-[10px] w-[10px]" />
                <span className="text-[18px] leading-[18px]">{link.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
