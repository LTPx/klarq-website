"use client";

import {
  InformationHome,
  sliderHome,
  teamHome,
} from "../_interfaces/wordpress-components";
import { ImageAcf } from "../_interfaces/wordpress-page";
import DesignersSection from "./designers-section";
import GalleryImagesScroll from "./gallery-images-scroll";
import { SliderBrand } from "./slider";

interface Props {
  description?: string;
  team_section?: teamHome;
  information_home: InformationHome;
  slider: sliderHome[];
  carousel_images: ImageAcf[];
}

export function HomeInformation(props: Props) {
  const {
    description,
    team_section,
    information_home,
    slider,
    carousel_images,
  } = props;
  return (
    <section className="container">
      <div className="px-[40px] bg-green pt-[45px]">
        {description && (
          <div
            data-aos="fade-up"
            className="description-home"
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />
        )}
        {team_section && (
          <section className="pt-[140px]">
            <DesignersSection team={team_section} />
          </section>
        )}
        {information_home && (
          <section className="pt-[240px] pb-[190px]">
            <div className="grid grid-cols-3">
              <div
                data-aos="fade-up"
                className="information-home-title font-pp_light"
                dangerouslySetInnerHTML={{
                  __html: information_home.title,
                }}
              />
              <div
                data-aos="fade-up"
                className="col-span-2 information-home-description font-pp_light"
                dangerouslySetInnerHTML={{
                  __html: information_home.description,
                }}
              />
            </div>
          </section>
        )}
      </div>
      {slider && <SliderBrand brands={slider} />}
      {carousel_images && (
        <GalleryImagesScroll
          imageClassName="lg:h-[575px]"
          images={carousel_images}
        />
      )}
    </section>
  );
}

export default HomeInformation;
