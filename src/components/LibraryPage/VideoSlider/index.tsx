import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";

import React, { useRef } from "react";

import AnimateSpawn from "../../../Common/AnimateSpawn";
import Link from "@docusaurus/Link";
import Slider from "react-slick";
import { arrow } from "@floating-ui/react";
import { motion } from "framer-motion";
import transitions from "@site/static/transitions.json";

const sliderData = [
  {
    title: "World Computer Day - Davos 2025 - Event Highlights",
    image: "/img/home/slider/nns_explained.webp",
    link: "https://www.youtube.com/watch?v=1uX-fRgvXjU&list=PLuhDt1vhGcrclxfmztDd6OKE80dnrFmG6",
  },
  {
    title: "AI onchain: Daniel Naeff Interview at AI+X Summit",
    image: "/img/home/slider/update_undp_initiative.webp",
    link: "https://www.undp.org/policy-centre/singapore/press-releases/undp-partners-dfinity-foundation-enhance-financial-inclusion-msmes",
  },
  {
    title: "Where AI Builds: Unlocking the Power of Imagination through Chat - with Dominic",
    image: "/img/home/slider/icp_deck_highlight.webp",
    link: "https://deck.internetcomputer.org/",
  },
  {
    title: "Fireside Chat | Does AI Need Crypto? at Crypto AI:Con",
    image: "/img/home/slider/milestones_highlight_1.webp",
    link: "https://medium.com/dfinity",
  },
  {
    title: "AI onchain: Daniel Naeff Interview at AI+X Summit",
    image: "/img/home/slider/milestones_highlight_1.webp",
    link: "https://medium.com/dfinity",
  },
];

const MotionLink = motion(Link);

const buttonStyle = {
  background: "rgba(255 255 255 / 10%)",
  color: "white",
  backdropFilter: "blur(20px)",
  width: "3rem",
  height: "3rem",
};

export const CardWithImage: React.FC<{
  children?: React.ReactNode;
  image: string;
  href: string;
}> = ({ children, image, href }) => {
  return (
    <MotionLink
      variants={transitions.item}
      to={href}
      className="text-black hover:no-underline"
    >
      <article className="bg-white rounded-xl flex flex-col justify-start gap-5 group relative overflow-hidden">
        <div
          className="w-100 aspect-[16/9] bg-gray-200 bg-cover bg-no-repeat bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="p-5 pt-0">
          {children}
        </div>
      </article>
      
    </MotionLink>
  );
};

const css = `
  .slick-prev:before,
  .slick-next:before {
    display: none;
  }

  .slick-prev svg,
  .slick-next svg {
    transform: scale(.5);
    transition: transform .2s cubic-bezier(0.3, 0.7, 0, 1);
  }

  .slick-prev svg {
    transform: rotate(180deg) scale(.5);
  }

  .slick-prev:hover svg,
  .slick-next:hover svg {
    transform: scale(.7);
  }

  .slick-prev:hover svg {
    transform: rotate(180deg) scale(.7);
  }

  .slick-dots {
    bottom: -4rem;
  }

  .slick-dots li button:before {
    display: none;
  }

  .slick-dots li button {
    background: rgba(255 255 255 / 20%);
    border: none;
  }

  .slick-dots li.slick-active button {
    background: #fff;
  }
`;

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
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    centerMode: false,
    padding: "20px",
    centerPadding: "20px",
    swipeToSlide: true,
    // nextArrow: <NextArrow />,
    // prevArrow: <PrevArrow />,
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
      <style>{css}</style>
      <Slider ref={(slider) => (sliderRef = slider)} {...settings}>
        {sliderData.map((data, index) => (
          <div key={index} className="border-box px-3">
            <CardWithImage href={data.link} image={data.image}>
              <div className="h-16">
                <h1 className="tw-heading-7 md:tw-heading-5 mb-0 line-clamp-2">
                  {data.title}
                </h1>
              </div>
            </CardWithImage>
          </div>
        ))}
      </Slider>
      <aside className="flex gap-4 justify-end mt-4">
        <button className="bg-transparent w-12 h-12 p-0 inline-flex justify-center items-center rounded-full border border-black-20 outline-none" onClick={previous} aria-label="Previous">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.82843 6.9999H16V8.9999H3.82843L9.1924 14.3638L7.7782 15.778L0 7.9999L7.7782 0.22168L9.1924 1.63589L3.82843 6.9999Z" fill="#3B00B9"/>
          </svg>
        </button>
        <button className="bg-transparent w-12 h-12 p-0 inline-flex justify-center items-center rounded-full border border-black-20 outline-none" onClick={next} aria-label="Next">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.1716 6.9999L6.8076 1.63589L8.2218 0.22168L16 7.9999L8.2218 15.778L6.8076 14.3638L12.1716 8.9999H0V6.9999H12.1716Z" fill="#3B00B9"/>
          </svg>
        </button>
      </aside>
    </div>
  );
};
export default VideoSlider;
