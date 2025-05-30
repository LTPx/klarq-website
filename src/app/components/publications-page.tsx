"use client";

import { useEffect } from "react";
import { PublicationsPageWp } from "../_interfaces/wordpress-components";
import AOS from "aos";
import "aos/dist/aos.css";
import GalleryProjects from "./gallery";

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

  return (
    <div className="h-[calc(100dvh-50px)] flex justify-center items-center">
      <div className="fixed top-[35px] left-[35px]">
        <label className="font-zoom dark:mix-blend-difference text-black text-[66px] leading-[46px] mix-blend-difference">
          KLARQ
        </label>
      </div>
      <div className="fixed top-[35px] right-[35px]">
        <label className="font-zoom text-[66px] leading-[46px] tracking-[-0.03em] mix-blend-difference">
          PUBLICACIONES
        </label>
      </div>
      <section>
        <GalleryProjects publication={publications_information.publications} />
      </section>
    </div>
  );
}

export default PublicationsPage;
