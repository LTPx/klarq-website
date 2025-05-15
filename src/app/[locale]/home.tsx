import React from "react";
import HomeAnimation from "../components/home-animation";
import HomeInformation from "../components/home-information";
import { HomePageWp } from "../_interfaces/wordpress-components";

interface Props {
  homeInformation?: HomePageWp;
}

function Home(props: Props) {
  const { homeInformation } = props;
  return (
    <div className="container">
      <HomeAnimation/>
      <HomeInformation/>
    </div>
  );
}

export default Home;
