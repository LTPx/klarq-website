import React from "react";
import HomeAnimation from "../components/home-animation";
import HomeInformation from "../components/home-information";
import { HomePageWp } from "../_interfaces/wordpress-components";

interface Props {
  homeInformation: HomePageWp;
}

function Home(props: Props) {
  const { homeInformation } = props;
  return (
    <div className="container">
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
