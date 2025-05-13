import React from "react";
import CategoryCard from "../components/category-card";
import HomeAnimation from "../components/home-animation";
import HomeInformation from "../components/home-information";

interface Props {
  data: any;
}

function Home(props: Props) {
  const { data } = props;
  return (
    <div className="container">
      <HomeAnimation/>
      <HomeInformation/>
    </div>
  );
}

export default Home;
