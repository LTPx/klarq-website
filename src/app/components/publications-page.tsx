"use client";

import { useEffect } from "react";
import { PublicationsPageWp } from "../_interfaces/wordpress-components";
import AOS from "aos";
import "aos/dist/aos.css";
import GalleryProjects from "./gallery";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

interface Props {
  publications_information: PublicationsPageWp;
}

function PublicationsPage({ publications_information }: Props) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out",
      offset: 80,
      once: false,
    });
  }, []);
  const t = useTranslations();

  return (
    <div className="h-[calc(100dvh-50px)] flex justify-center items-center">
      <Link className="lg:hidden cursor-pointer" href={"/"}>
        <div className="cursor-pointer fixed top-[10px] left-[15px] mix-blend-difference text-white z-[1000]">
          <label className="uppercase tracking-[-0.02em] font-zoom cursor-pointer text-[38px] leading-[38px]">
            KLARQ <br /> {`${t("menu.publications")}`}
          </label>
        </div>
      </Link>
      <Link className="hidden lg:block cursor-pointer" href={"/"}>
        <div className="cursor-pointer fixed top-[35px] left-[35px] z-[1000]">
          <label className="font-zoom cursor-pointer ipad-mini:text-[50px] text-[66px] leading-[46px] ">
            KLARQ
          </label>
        </div>
      </Link>
      <div className="hidden lg:block fixed top-[35px] right-[35px]">
        <label className="font-zoom ipad-mini:text-[50px] text-[66px] leading-[46px] tracking-[-0.03em] mix-blend-difference">
          {t("home.publications")}
        </label>
      </div>
      <section className="pt-[80px]">
        <GalleryProjects publication={publications_information.publications} />
      </section>
    </div>
  );
}

export default PublicationsPage;
