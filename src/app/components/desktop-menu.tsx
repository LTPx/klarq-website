"use client";

import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

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
      className={`fixed top-0 left-0 w-full h-screen bg-gray transform transition-transform duration-500 ease-in-out z-[999] ${
        showContact ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="container flex flex-col gap-[110px]">
        <div className="px-[50px] pt-[50px] pb-[30px]">
          <img src="/images/KLARQ.svg" className="h-[30dvh] w-full" />
        </div>
        <div className="flex flex-col items-center gap-[35px]">
            <div className="flex flex-col">
              <Link href={''} className="text-center text-[40px] leading-[60px]">{`${t("menu.publications")}`}</Link>
              <Link href={'/contact'} className="text-center text-[40px] leading-[60px]">{`${t("menu.contact")}`}</Link>
              <Link href={''} className="text-center text-[40px] leading-[60px]">{`${t("menu.spanish")}`}</Link>
            </div>
            <div className="flex flex-col items-center gap-[15px]">
              <span className="text-center text-[16px] leading-[22px]">{`${t("menu.follow")}`}</span>
              <div className="flex gap-[15px]">
              <span className="text-[16px] leading-[15px] rounded-[50px] border border-black border-[0.75px] py-[10px] px-[15px]">{`${t(
                "footer.architecture"
              )}`}</span>
              <span className="text-[16px] leading-[15px] rounded-[50px] border border-black border-[0.75px] py-[10px] px-[15px]">{`${t(
                "footer.decor"
              )}`}</span>
              <span className="text-[16px] leading-[15px] rounded-[50px] border border-black border-[0.75px] py-[10px] px-[15px]">{`${t(
                "footer.development"
              )}`}</span>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default DesktopMenu;
