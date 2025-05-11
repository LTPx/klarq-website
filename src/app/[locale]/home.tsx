import React from "react";
import CategoryCard from "../components/category-card";
import HomeAnimation from "../components/home-animation";

interface Props {
  data: any;
}

function Home(props: Props) {
  const { data } = props;
  return (
    <div className="container">
      <HomeAnimation title={""} imageCategory={""}/>
    </div>
  );
}

export default Home;
