"use client";

import CategoryCard from "./category-card";

interface HomeAnimationProps {
  title: string;
  description?: string;
  imageCategory: string;
  className?: string;
}

function HomeAnimation(props: HomeAnimationProps) {
  const { title, description, imageCategory, className } = props;

  return (
    <div className="container">
      <div className="">
        <div className="px-[50px] pt-[50px] pb-[30px]">
            <img src="/images/KLARQ.svg" className="h-[30dvh] w-full" />
        </div>
      </div>
      <div className="grid gap-[5px] grid-cols-3">
        <CategoryCard
          title={"Klarp"}
          imageCategory={
            "https://plus.unsplash.com/premium_photo-1694540892449-5c3170caf81c?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
        />
        <CategoryCard
          title={"Klarp"}
          imageCategory={
            "https://plus.unsplash.com/premium_photo-1694540892449-5c3170caf81c?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
        />
        <CategoryCard
          title={"Klarp"}
          imageCategory={
            "https://plus.unsplash.com/premium_photo-1694540892449-5c3170caf81c?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
        />
      </div>
    </div>
  );
}

export default HomeAnimation;
