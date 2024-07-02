import React, { useRef } from "react";
import Slider from "react-slick";
import Link from "@docusaurus/Link";
import AnimateSpawn from "../../../Common/AnimateSpawn";
import transitions from "@site/static/transitions.json";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import { arrow } from "@floating-ui/react";

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
      className="bg-black/60 hover:bg-black/20 backdrop-blur-2xl rounded-xl pl-8 p-5 text-white hover:no-underline transition-all hover:text-white flex flex-col justify-center gap-8 group"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "contain",
        backgroundPosition: "bottom right",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="group-hover:-translate-y-2 transition-transform">
        {children}
      </div>
    </MotionLink>
  );
};

export const SectionSlider = () => {
  let sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    centerMode: true,
    padding: 20,
    responsive: [
      {
        breakpoint: 768, // Adjust this value based on your needs
        settings: {
          slidesToShow: 1, // Show 1 slide for screens smaller than 768px
          arrows: false,
        },
      },
    ],
  };
  return (
    <div className="slider-container">
      <Slider ref={(slider) => (sliderRef = slider)} {...settings}>
        <div>
          <CardWithImage href="/docs" image="/img/home/carousel-3.webp">
            <div className="tw-paragraph-sm md:tw-heading-7 mb-2 whitespace-nowrap">
              New Video
            </div>
            <div className="tw-heading-7 md:tw-heading-5 mb-0">
              ICP Developer Journey
            </div>
            <div className="text-white/60 tw-paragraph-sm md:tw-paragraph mb-0">
              Watch now!
            </div>
          </CardWithImage>
        </div>
        <div>
          <CardWithImage href="/events" image="/img/home/carousel-1.webp">
            <div className="tw-paragraph-sm md:tw-heading-7 mb-2 whitespace-nowrap">
              July 9, 6pm – Brussels
            </div>
            <div className="tw-heading-7 md:tw-heading-5 mb-0">
              Chain Fusion NIGHT
            </div>
            <div className="text-white/60 tw-paragraph-sm md:tw-paragraph mb-0">
              Join us in Belgium!
            </div>
          </CardWithImage>
        </div>
        <div>
          <CardWithImage href="/chainfusion" image="/img/home/carousel-2.webp">
            <div className="tw-paragraph-sm md:tw-heading-7 mb-2 whitespace-nowrap">
              Milestone achieved 🚀
            </div>
            <div className="tw-heading-7 md:tw-heading-5 mb-0">TRITIUM</div>
            <div className="text-white/60 tw-paragraph-sm md:tw-paragraph mb-0">
              Chain Fusion supports EVM Chains
            </div>
          </CardWithImage>
        </div>
        <div>
          <CardWithImage href="/chainfusion" image="/img/home/carousel-4.webp">
            <div className="tw-paragraph-sm md:tw-heading-7 mb-2 whitespace-nowrap">
              New Video
            </div>
            AI running fully on-chain Demo #4{" "}
            <div className="text-white/60 tw-paragraph-sm md:tw-paragraph mb-0">
              Watch now
            </div>
          </CardWithImage>
        </div>
      </Slider>
    </div>
  );
};
export default SectionSlider;
