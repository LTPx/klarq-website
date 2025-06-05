"use client";

import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import HoverFillButton from "./hover-btn";

interface Props {
  showContact: boolean;
  setShowContact: (value: boolean) => void;
}

export function DesktopMenu(props: Props) {
  const { showContact, setShowContact } = props;

  const t = useTranslations();
  const pathname = usePathname();

  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen bg-gray transform transition-transform duration-500 ease-in-out z-[1001] ${
        showContact ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="container flex flex-col gap-[110px]">
        <div className="h-[35dvh]">
          <Link href={"/"} onClick={() => setShowContact(false)}>
            <div className=" px-[40px] pt-[40px] pb-[30px]">
              <img src="/images/KLARQ.svg" className="h-full w-full" />
            </div>
          </Link>
        </div>
        {/* <div className="px-[50px] pt-[50px] pb-[30px]">
          <img src="/images/KLARQ.svg" className="h-[30dvh] w-full" />
        </div> */}
        <div className="flex flex-col items-center gap-[35px]">
          <div className="flex flex-col">
            <Link
              href={"/publications"}
              className="text-center text-[40px] leading-[60px]"
              onClick={() => setShowContact(false)}
            >{`${t("menu.publications")}`}</Link>
            <Link
              href={"/contact"}
              className="text-center text-[40px] leading-[60px]"
              onClick={() => setShowContact(false)}
            >{`${t("menu.contact")}`}</Link>
            <Link
              href={""}
              className="text-center text-[40px] leading-[60px]"
            >{`${t("menu.spanish")}`}</Link>
          </div>
          <div className="flex flex-col items-center gap-[15px]">
            <span className="text-center text-[16px] leading-[22px]">{`${t(
              "menu.follow"
            )}`}</span>
            <div className="flex gap-[15px]">
              <HoverFillButton href="https://instagram.com">
                {t("footer.architecture")}
              </HoverFillButton>
              <HoverFillButton href="https://instagram.com">
                {t("footer.decor")}
              </HoverFillButton>
              <HoverFillButton href="https://instagram.com">
                {t("footer.development")}
              </HoverFillButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesktopMenu;
