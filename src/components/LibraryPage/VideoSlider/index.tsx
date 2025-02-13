import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";

import React, { useRef } from "react";

import Link from "@docusaurus/Link";
import Slider from "react-slick";
import { motion } from "framer-motion";
import transitions from "@site/static/transitions.json";

const sliderData = [
  {
    title: "ICP World Computer Show 2024",
    image: "https://img.youtube.com/vi/2s2amSYj26U/maxresdefault.jpg",
    link: "https://www.youtube.com/watch?v=2s2amSYj26U",
  },
  {
    title: "Acumen Media | DAVOS Interviews | The Self-Writing & Sovereign Internet Paradigm",
    image: "https://img.youtube.com/vi/PlJxuRAsEOE/maxresdefault.jpg",
    link: "https://www.youtube.com/watch?v=PlJxuRAsEOE",
  },
  {
    title: "Where AI Builds: Unlocking the Power of Imagination through Chat - with Dominic Williams",
    image: "https://img.youtube.com/vi/9q13cFGxEb0/maxresdefault.jpg",
    link: "https://www.youtube.com/watch?v=9q13cFGxEb0",
  },
  {
    title: "B3YOND THE BLOCKCHAIN – ICP 3rd Anniversary Recap",
    image: "https://img.youtube.com/vi/4ZmgVD71SOw/maxresdefault.jpg",
    link: "https://www.youtube.com/watch?v=4ZmgVD71SOw",
  },
];

const MotionLink = motion(Link);

export const CardWithImage: React.FC<{
  children?: React.ReactNode;
  image: string;
  href: string;
}> = ({ children, image, href }) => {
  return (
    <MotionLink
      variants={transitions.item}
      to={href}
      className="text-black hover:no-underline hover:-translate-y-2 transition-transform"
    >
      <article className="flex flex-col justify-start gap-3 group relative overflow-hidden">
        
        <div
          className="rounded-xl w-100 aspect-[16/9] bg-gray-200 bg-cover bg-no-repeat bg-center flex items-center justify-center"
          style={{ backgroundImage: `url(${image})` }}>
            <svg className="backdrop-blur-lg rounded-full" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 32C0 14.3269 14.3269 0 32 0C49.6731 0 64 14.3269 64 32C64 49.6731 49.6731 64 32 64C14.3269 64 0 49.6731 0 32Z" fill="white" fill-opacity="0.3"/>
              <path d="M39.376 32.4161L28.7774 39.4818C28.5476 39.635 28.2372 39.5729 28.084 39.3432C28.0292 39.261 28 39.1645 28 39.0658V24.9343C28 24.6582 28.2239 24.4343 28.5 24.4343C28.5987 24.4343 28.6952 24.4635 28.7774 24.5183L39.376 31.584C39.6057 31.7372 39.6678 32.0477 39.5146 32.2774C39.478 32.3323 39.4309 32.3795 39.376 32.4161Z" fill="white"/>
            </svg>
        </div>

        <div className="p-2 pt-0">
          {children}
        </div>

      </article>
      
    </MotionLink>
  );
};

export const VideoSlider = () => {
  let sliderRef = useRef(null);
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };
  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 2.5,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    centerMode: false,
    padding: "20px",
    centerPadding: "20px",
    swipeToSlide: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2.25,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.5,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className="slider-container">

      <aside className="gap-4 justify-end mb-6 hidden md:flex">
        <button className="bg-transparent w-12 h-12 p-0 inline-flex justify-center items-center rounded-full border border-white-20 border-solid outline-none" onClick={previous} aria-label="Previous">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.82843 6.9999H16V8.9999H3.82843L9.1924 14.3638L7.7782 15.778L0 7.9999L7.7782 0.22168L9.1924 1.63589L3.82843 6.9999Z" fill="#AE9EFF"/>
          </svg>
        </button>
        <button className="bg-transparent w-12 h-12 p-0 inline-flex justify-center items-center rounded-full border border-white-20 border-solid outline-none" onClick={next} aria-label="Next">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.1716 6.9999L6.8076 1.63589L8.2218 0.22168L16 7.9999L8.2218 15.778L6.8076 14.3638L12.1716 8.9999H0V6.9999H12.1716Z" fill="#AE9EFF"/>
          </svg>
        </button>
      </aside>

      <Slider ref={(slider) => (sliderRef = slider)} {...settings}>
        {sliderData.map((data, index) => (
          <div key={index} className="border-box pr-6">
            <CardWithImage href={data.link} image={data.image}>
              <div className="h-8">
                <h1 className="tw-heading-7 md:tw-heading-7 mb-0 line-clamp-1 text-white">
                  {data.title}
                </h1>
              </div>
            </CardWithImage>
          </div>
        ))}
      </Slider>
      
    </div>
  );
};
export default VideoSlider;
