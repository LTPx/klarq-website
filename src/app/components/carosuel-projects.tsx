"use client";

import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import AOS from "aos";
import "aos/dist/aos.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type CarouselProjectsProps = {
  className?: string;
  children: any;
  slidesToScroll?: number;
  slidesNumber: number;
  hideArrows?: boolean;
};

function SampleNextArrow(props: any) {
  const { className, style, onClick, disabled } = props;
  return (
    <div className="absolute top-[-55px] right-0">
      <img
        src="/images/right.svg"
        className={`${className} ${disabled ? "opacity-0" : ""}`}
        style={{
          ...style,
          // top: "-633.2px",
          right: "0px",
          position: "relative",
          width: "22px",
          zIndex: 500,
          cursor: disabled && "default",
        }}
        onClick={!disabled ? onClick : undefined}
      />
    </div>
  );
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick, disabled } = props;
  return (
    <div className="absolute top-[-54.5px] right-[5px]">
      <img
        src="/images/left.svg"
        className={`${className} ${disabled ? "opacity-0" : ""}`}
        style={{
          ...style,
          position: "relative",
          width: "22px",
          zIndex: 500,
          cursor: disabled && "default",
        }}
        onClick={!disabled ? onClick : undefined}
      />
    </div>
  );
}

export function CarouselProjects(props: CarouselProjectsProps) {
  const { children, slidesToScroll, slidesNumber, hideArrows } = props;
  const [isMobile, setIsMobile] = useState(false);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out",
      offset: 80,
      once: false,
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const shouldShowSlider =
    React.Children.count(children) > slidesNumber || isMobile;

  const handleAfterChange = (current: number) => {
    const totalSlides = React.Children.count(children);
    const slidesToShow = isMobile ? 1.2 : slidesNumber;
    const maxIndex = totalSlides - slidesToShow;
    setIsPrevDisabled(current === 0);
    setIsNextDisabled(current >= maxIndex);
  };

  const settings: any = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: slidesNumber ? slidesNumber || 3 : 4,
    slidesToScroll: shouldShowSlider ? slidesToScroll || 1 : 1,
    swipe: isMobile ? true : false,
    touchMove: isMobile ? true : false,
    afterChange: handleAfterChange,
    ...(hideArrows
      ? {}
      : {
          nextArrow: <SampleNextArrow disabled={isNextDisabled} />,
          prevArrow: <SamplePrevArrow disabled={isPrevDisabled} />,
        }),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false,
        },
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1,
          infinite: false,
        },
      },
    ],
  };

  return shouldShowSlider ? (
    <Slider {...settings}>
      {React.Children.map(children, (child, index) => (
        <div className="pr-[10px] lg:pr-[15px]" key={index}>
          {child}
        </div>
      ))}
    </Slider>
  ) : (
    <div className={`grid grid-cols-3 gap-[5px]`}>
      {React.Children.map(children, (child, index) => (
        <div key={index} className="col-span-1">
          {child}
        </div>
      ))}
    </div>
  );
}

export default CarouselProjects;
