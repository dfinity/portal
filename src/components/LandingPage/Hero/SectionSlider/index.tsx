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
      className="bg-[#0C0025] rounded-xl pl-8 p-5 text-white hover:no-underline transition-all hover:text-white flex flex-col justify-center gap-8 group"
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
    padding: "20px",
    centerPadding: "20px",
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  };
  return (
    <div className="slider-container">
      <Slider ref={(slider) => (sliderRef = slider)} {...settings}>
        <article className="border-box px-3">
          <CardWithImage href="/docs" image="/img/home/carousel-3.webp">
            <div className="py-5 mr-40">
              <strong className="tw-paragraph-sm md:tw-heading-7 mb-2 truncate">
                New Video
              </strong>
              <h4 className="tw-heading-7 md:tw-heading-5 mb-0 truncate">
                ICP Developer Journey
              </h4>
              <p className="text-white/60 tw-paragraph-sm md:tw-paragraph mb-0 truncate">
                Watch now!
              </p>
            </div>
          </CardWithImage>
        </article>

        <article className="border-box px-3">
          <CardWithImage href="/events" image="/img/home/carousel-1.webp">
            <div className="py-5 mr-40">
              <strong className="tw-paragraph-sm md:tw-heading-7 mb-2 truncate">
                July 9, 6pm – Brussels
              </strong>
              <h4 className="tw-heading-7 md:tw-heading-5 mb-0 truncate">
                Chain Fusion NIGHT
              </h4>
              <p className="text-white/60 tw-paragraph-sm md:tw-paragraph mb-0 truncate">
                Join us in Belgium!
              </p>
            </div>
          </CardWithImage>
        </article>

        <article className="border-box px-3">
          <CardWithImage href="/chainfusion" image="/img/home/carousel-2.webp">
            <div className="py-5 mr-40">
              <strong className="tw-paragraph-sm md:tw-heading-7 mb-2 truncate">
                Milestone achieved 🚀
              </strong>
              <h4 className="tw-heading-7 md:tw-heading-5 mb-0 truncate">
                TRITIUM
              </h4>
              <p className="text-white/60 tw-paragraph-sm md:tw-paragraph mb-0 truncate">
                Chain Fusion supports EVM Chains
              </p>
            </div>
          </CardWithImage>
        </article>

        <article className="border-box px-3">
          <CardWithImage href="/chainfusion" image="/img/home/carousel-4.webp">
            <div className="py-5 mr-40">
              <strong className="tw-paragraph-sm md:tw-heading-7 mb-2 whitespace-nowrap">
                New Video
              </strong>
              <h4 className="tw-heading-7 md:tw-heading-5 mb-0 truncate">
                AI running fully on-chain Demo #4
              </h4>
              <p className="text-white/60 tw-paragraph-sm md:tw-paragraph mb-0">
                Watch now
              </p>
            </div>
          </CardWithImage>
        </article>
      </Slider>
    </div>
  );
};
export default SectionSlider;
