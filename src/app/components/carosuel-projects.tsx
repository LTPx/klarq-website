"use client";

import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import AOS from "aos";
import "aos/dist/aos.css";

type CarouselProjectsProps = {
  className?: string;
  children: any;
  slidesToScroll?: number;
  slidesNumber: number;
  hideArrows?: boolean;
  useDefaultArrows?: boolean;
};

function SampleDefaultNextArrow(props: any) {
  const { className, style, onClick, disabled } = props;
  return (
    <div
      className={className}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#B77F1E",
        height: "44px",
        zIndex: 500,
        width: "44px",
        cursor: disabled && "default",
        opacity: disabled ? 0.5 : 1,
      }}
      onClick={onClick}
    >
      <img
        src="/images/right-arrow-white.svg"
        style={{
          ...style,
          width: "24px",
          height: "24px",
        }}
      />
    </div>
  );
}

function SampleDefaultPrevArrow(props: any) {
  const { className, style, onClick, disabled } = props;
  return (
    <div
      className={`${className} ${disabled ? "opacity-100" : ""}`}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#B77F1E",
        height: "44px",
        zIndex: 500,
        width: "44px",
        cursor: disabled && "default",
        opacity: disabled ? 0.5 : 1,
      }}
      onClick={onClick}
    >
      <img
        src="/images/left-arrow-white.svg"
        style={{
          ...style,
          width: "24px",
          height: "24px",
        }}
      />
    </div>
  );
}

function SampleNextArrow(props: any) {
  const { className, style, onClick, disabled } = props;
  return (
    <div className="absolute bottom-[-35px] lg:bottom-[-40px] right-0">
      <img
        src="/images/icons/arrow-right.svg"
        className={`${className} ${disabled ? "opacity-0" : ""}`}
        style={{
          ...style,
          right: "10px",
          position: "relative",
          width: "45px",
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
    <div className="absolute bottom-[-35px] lg:bottom-[-40px] left-0">
      <img
        src="/images/icons/arrow-left.svg"
        className={`${className} ${disabled ? "opacity-0" : ""}`}
        style={{
          ...style,
          left: "0px",
          position: "relative",
          width: "45px",
          zIndex: 500,
          cursor: disabled && "default",
        }}
        onClick={!disabled ? onClick : undefined}
      />
    </div>
  );
}

export function CarouselProjects(props: CarouselProjectsProps) {
  const {
    children,
    slidesToScroll,
    slidesNumber,
    hideArrows,
    useDefaultArrows,
  } = props;
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
          nextArrow: useDefaultArrows ? (
            <SampleDefaultNextArrow disabled={isNextDisabled} />
          ) : (
            <SampleNextArrow disabled={isNextDisabled} />
          ),
          prevArrow: useDefaultArrows ? (
            <SampleDefaultPrevArrow disabled={isPrevDisabled} />
          ) : (
            <SamplePrevArrow disabled={isPrevDisabled} />
          ),
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
        <div  key={index} className="col-span-1">
          {child}
        </div>
      ))}
    </div>
  );
}

export default CarouselProjects;
