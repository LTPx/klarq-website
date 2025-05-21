'use client';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type CarouselProjectsProps = {
  images: string[];
  title?: string;
  autoplay?: boolean;
};

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        right: '5px',
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        left: '5px',
        zIndex: '10',
      }}
      onClick={onClick}
    />
  );
}

export function CarouselProjects(props: CarouselProjectsProps) {
  const { images, title, autoplay } = props;

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: autoplay,
    arrows: true,
    autoplaySpeed: 3000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return images.length === 1 ? (
    <div className="relative w-full">
      <img className={''} loading="lazy" src={images[0]} />
      {title && (
        <div className="absolute top-[100px] left-[100px] flex flex-col gap-2">
          <label className="text-white font-bold text-5xl">{title}</label>
        </div>
      )}
    </div>
  ) : (
    <div className="relative w-full">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img className={''} loading="lazy" src={image} />
          </div>
        ))}
      </Slider>
      {title && (
        <div className="absolute top-[100px] left-[100px] flex flex-col gap-2">
          <label className="text-white font-bold text-5xl">{title}</label>
        </div>
      )}
    </div>
  );
}

export default CarouselProjects;
