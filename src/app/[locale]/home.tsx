import React from "react";
import HomeAnimation from "../components/home-animation";
import HomeInformation from "../components/home-information";
import { HomePageWp } from "../_interfaces/wordpress-components";

interface Props {
  homeInformation: HomePageWp;
  locale: "es" | "en";
}

function Home(props: Props) {
  const { homeInformation, locale } = props;
  const titles = {
    en: "ARCHITECTURE AND INTERIOR DESIGN STUDIO IN IBIZA AND MALLORCA",
    es: "ESTUDIO DE ARQUITECTURA E INTERIORISMO EN IBIZA Y MALLORCA",
  };

  return (
    <div className="container bg-white">
      <h1 className="sr-only">{titles[locale]}</h1>
      <h2 className="sr-only">
        {locale === "es"
          ? "Proyectos de Arquitectura"
          : "Architecture Projects"}
      </h2>
      <h2 className="sr-only">
        {locale === "es" ? "Decoración de Interiores" : "Interior Design"}
      </h2>
      <h2 className="sr-only">
        {locale === "es"
          ? "Desarrollo Inmobiliario"
          : "Real Estate Development"}
      </h2>
      <HomeAnimation services={homeInformation?.services} />
      <HomeInformation
        team_section={homeInformation.team}
        description={homeInformation.description_home}
        information_home={homeInformation.information_home}
        slider={homeInformation.slider}
        carousel_images={homeInformation.carousel_images}
      />
    </div>
  );
}

export default Home;
