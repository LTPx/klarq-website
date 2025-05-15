"use client";

import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

export function Footer() {
  const t = useTranslations();
  const pathname = usePathname();

  const noShowFooter =
    pathname?.includes("/publications") || pathname?.includes("/contact");

  if (noShowFooter) {
    return null;
  }

  return (
    <div className="bg-gray">
      <footer className={`bg-gray pt-[30px] px-[40px] pb-[60px]`}>
        <div className="grid grid-cols-3">
          <div className="flex flex-col gap-[35px]">
            <label className="text-[26px] leading-[45px]">
              {`${t("footer.title")}`}
            </label>
            <div className="flex flex-col">
              <p className="text-[16px] leading-[22px] ">
                C/ Vicent Serra i Orvay, 49
                <br />
                07800 Ibiza
              </p>
              <Link
                href={`mailto:info@klarq.eu`}
                className="text-[16px] leading-[22px]"
              >
                info@klarq.eu
              </Link>
              <Link
                className="text-[16px] leading-[22px] "
                href={`tel:+34656362863`}
              >
                <p className="text-[16px] leading-[22px] ">+34 656 362 863</p>
              </Link>
            </div>
          </div>
          <div className="flex flex-col justify-end gap-[40px]">
            <span className="text-[16px] leading-[22px]">
              {`${t("footer.follow")}`}
            </span>
            <div className="flex gap-[15px]">
              <span className="flex items-center capitalize text-[16px] leading-[15px] rounded-[50px] border border-black border-[0.75px] h-[33px] px-[20px]">{`${t(
                "footer.architecture"
              )}`}</span>
              <span className="flex items-center capitalize text-[16px] leading-[15px] rounded-[50px] border border-black border-[0.75px] h-[33px] px-[20px]">{`${t(
                "footer.decor"
              )}`}</span>
              <span className="flex items-center capitalize text-[16px] leading-[15px] rounded-[50px] border border-black border-[0.75px] h-[33px] px-[20px]">{`${t(
                "footer.development"
              )}`}</span>
            </div>
          </div>
          <div className="flex flex-col justify-end gap-[15px]">
            <img
              className="h-[30px] w-[166.18px]"
              src="/images/logo-footer.svg"
            />
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
      <div className="h-[51px] border-t border-t-black border-t-[1px]"></div>
    </div>
  );
}

export default Footer;
