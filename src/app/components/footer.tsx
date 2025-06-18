"use client";

import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import HoverFillButton from "./hover-btn";
import { useExpandStore } from "../store/expand-store";

export function Footer() {
  const t = useTranslations();
  const pathname = usePathname();
  const { isExpandedReady } = useExpandStore();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function checkMobile() {
      setIsMobile(window.innerWidth < 768);
    }
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const noShowFooter =
    pathname?.includes("/publications") ||
    pathname?.includes("/contact") ||
    (pathname === "/es/architecture" && !isMobile) ||
    (pathname === "/es/development" && !isMobile) ||
    pathname === "/en/architecture";

  if (noShowFooter) {
    return null;
  }

  return (
    <div className="bg-gray">
      <footer
        className={`flex flex-col lg:gap-[35px] bg-gray pt-[20px] lg:pt-[50px] px-[15px] lg:px-[40px] pb-[50px]`}
      >
        <label className="lg:hidden text-[26px] leading-[24px] lg:leading-[45px]">
          Contacta <br />
          con nosotros:
        </label>
        <div className="pt-[24px] lg:pt-[0px] grid grid-rows gap-[7px] lg:gap-[0px] lg:grid-cols-10">
          <div className="col-span-3">
            <div className="flex flex-col">
              <label className="hidden lg:block pb-[35px] text-[26px] leading-[24px] lg:leading-[45px]">
                {`${t("footer.title")}`}
              </label>
              <p className="text-[12px] leading-[16px] lg:text-[16px] lg:leading-[22px]">
                C/ Vicent Serra i Orvay, 49
                <br className="hidden lg:block" />
                07800 Ibiza
              </p>
              <Link
                href={`mailto:info@klarq.eu`}
                className="text-[12px] leading-[16px] lg:text-[16px] lg:leading-[22px]"
              >
                info@klarq.eu{" "}
                <span className="lg:hidden">| +34 656 362 863</span>
              </Link>
              <Link
                className="hidden lg:block text-[12px] leading-[16px] lg:text-[16px] lg:leading-[22px] "
                href={`tel:+34656362863`}
              >
                <p className="text-[12px] leading-[16px] lg:text-[16px] lg:leading-[22px] ">
                  +34 656 362 863
                </p>
              </Link>
            </div>
          </div>
          <div className="lg:hidden col-span-1 flex flex-col justify-end gap-[7px]">
            <span className="text-[12px] leading-[16px] lg:text-[16px] lg:leading-[22px]">
              {`${t("footer.follow")}`}
            </span>
            <div className="flex gap-[6px]">
              <HoverFillButton
                className="h-[25px] text-[12px] leading-[12px]"
                href="https://instagram.com"
              >
                Instagram
              </HoverFillButton>
              <HoverFillButton
                className="h-[25px] text-[12px] leading-[12px]"
                href="https://instagram.com"
              >
                Facebook
              </HoverFillButton>
              <HoverFillButton
                className="h-[25px] text-[12px] leading-[12px]"
                href="https://instagram.com"
              >
                YouTube
              </HoverFillButton>
            </div>
          </div>
          <div className="hidden lg:flex col-span-4  flex-col justify-end gap-[40px]">
            <span className="text-[16px] leading-[22px]">
              {`${t("footer.follow")}`}
            </span>
            <div className="flex gap-[15px]">
              <HoverFillButton href="https://instagram.com">
                {t("footer.social_architecture")}
              </HoverFillButton>
              <HoverFillButton href="https://instagram.com">
                {t("footer.social_decor")}
              </HoverFillButton>
              <HoverFillButton href="https://instagram.com">
                {t("footer.social_development")}
              </HoverFillButton>
            </div>
          </div>
          <div className="pt-[50px] lg:pt-[0px] col-span-3 flex flex-col gap-[15px]">
            <img className="h-full w-full" src="/images/logo-footer.svg" />
            <div className="flex flex-col">
              <div className="flex gap-[5px]">
                <Link className="text-[16px] leading-[22px]" href={"/"}>
                  {`${t("footer.privacy-policy")}`}
                </Link>
                <span> | </span>
                <Link className="text-[16px] leading-[22px]" href={"/"}>
                  {`${t("footer.legal-notice")}`}
                </Link>
              </div>
              <Link className="text-[16px] leading-[22px]" href={"/"}>
                {`${t("footer.cookies-policy")}`}
              </Link>
            </div>
          </div>
        </div>
      </footer>
      <div className="h-[51px] border-t border-t-black border-t-[0.75px]"></div>
    </div>
  );
}

export default Footer;
