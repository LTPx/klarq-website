"use client";

import { useEffect } from "react";
import { ImageAcf } from "../_interfaces/wordpress-page";
import ArchitectureImages from "./architecture-images";
import AOS from "aos";
import "aos/dist/aos.css";

interface Props {
  title: string;
  date?: string;
  description: string;
  images_project: ImageAcf[];
}

function ArchitectureInformation(props: Props) {
  const { title, description, images_project, date } = props;

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out",
      offset: 80,
      once: false,
    });
  }, []);

  return (
    <div className="architectureInformation">
      <div className="grid grid-cols-2 px-[40px]">
        <div data-aos="fade-up">
          <h2 className="text-[35px] leading-[46px]">{title}</h2>
          <span className="text-[18px] leading-[26px] tracking-[-0.03em]">
            {date}
          </span>
        </div>
        <div
          data-aos="fade-up"
          className="designer-description"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
      <section className="pt-[170px] px-[40px]">
        <ArchitectureImages images={images_project} />
      </section>
      {/* <section className="pt-[170px] px-[40px]">
        <CarouselProjects images={images}/>
      </section> */}
    </div>
  );
}

export default ArchitectureInformation;
