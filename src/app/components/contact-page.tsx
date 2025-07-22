"use client";

import { useEffect, useState } from "react";
import { ContactPageWp } from "../_interfaces/wordpress-components";
// import { getProxyImageUrl } from "@/utils/image_proxy";
import AOS from "aos";
import "aos/dist/aos.css";
import CoverDynamicMobile from "./cover-mobile";
import HoverButton from "./hover-fill-btn";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";

interface Props {
  contact_information: ContactPageWp;
}

function ContactPage({ contact_information }: Props) {
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const t = useTranslations();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out",
      offset: 80,
      once: false,
    });
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let touchStartY = 0;
  
    const onTouchStart = (e: TouchEvent) => {
      if (!isMobile) return;
      touchStartY = e.touches[0].clientY;
    };
  
    const onTouchMove = (e: TouchEvent) => {
      if (!isMobile) return;
  
      e.preventDefault();
  
      const touchCurrentY = e.touches[0].clientY;
      const deltaY = touchStartY - touchCurrentY; // positivo si se desliza hacia arriba
  
      setProgress((prev) => {
        let next = prev + deltaY * 0.005;
        if (next > 1) next = 1;
        if (next < 0) next = 0;
        return next;
      });
  
      touchStartY = touchCurrentY; // actualizar para el próximo movimiento
    };
  
    if (isMobile) {
      window.addEventListener("touchstart", onTouchStart, { passive: false });
      window.addEventListener("touchmove", onTouchMove, { passive: false });
    }
  
    return () => {
      if (isMobile) {
        window.removeEventListener("touchstart", onTouchStart);
        window.removeEventListener("touchmove", onTouchMove);
      }
    };
  }, [isMobile]);
  

  return (
    <>
      <Link className="cursor-pointer" href="/">
        <div className="cursor-pointer fixed top-[10px] left-[15px] z-[1000]">
          <label className="uppercase tracking-[-0.02em] font-zoom cursor-pointer text-[38px] leading-[38px]">
            KLARQ <br /> Contact
          </label>
        </div>
      </Link>
      <CoverDynamicMobile
        img={contact_information.cover.url}
        labelTitle={"CONTACTO"}
        progress={progress}
      >
        <div className="w-full relative bg-green lg:w-1/2 h-full flex flex-col gap-[16px] justify-center items-center">
          {/* <div className="bg-green w-full" style={{ minHeight: 87 }} /> */}
          <div
            className="contact-information"
            dangerouslySetInnerHTML={{
              __html: contact_information.description,
            }}
          />
          <div className="flex flex-col">
            <br />
            <p className="text-center text-[16px] leading-[22px] ">
              {`${t("footer.follow")}`}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-[15px]">
            <div className="flex gap-[10px]">
              <HoverButton href="https://www.instagram.com/klarq.architecture/">
                {t("footer.social_architecture")}
              </HoverButton>
              <HoverButton href="https://www.instagram.com/klarq.decor/">
                {t("footer.social_decor")}
              </HoverButton>
            </div>
            <div>
              <HoverButton href="https://www.instagram.com/klarq.development/">
                {t("footer.social_development")}
              </HoverButton>
            </div>
          </div>
        </div>
      </CoverDynamicMobile>
    </>
  );
}

export default ContactPage;
