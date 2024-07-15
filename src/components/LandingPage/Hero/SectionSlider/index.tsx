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

const sliderData = [
  {
    tagline: "New video series 🍿",
    title: "NNS Explained",
    description: "Watch now",
    image: "/img/home/slider/nns_explained.webp",
    link: "https://www.youtube.com/watch?v=1uX-fRgvXjU&list=PLuhDt1vhGcrclxfmztDd6OKE80dnrFmG6",
  },
  {
    tagline: "Milestone achieved 🚀",
    title: "TRITIUM",
    description: "Chain Fusion supports EVM Chains",
    image: "/img/home/slider/update_evm_tritium_milestone.webp",
    link: "https://internetcomputer.org/roadmap#Chain%20Fusion-Tritium",
  },
  {
    tagline: "July 26, 2024 – Nashville, US",
    title: "ICP @ Bitcoin Nashville",
    description: "Register now!",
    image: "/img/home/slider/update_chain_fusion_bitcoin_nashville.webp",
    link: "https://lu.ma/cfdnashville",
  },
  {
    tagline: "New initiative",
    title: "Universal Trusted Credentials",
    description: "Read the press release",
    image: "/img/home/slider/update_undp_initiative.webp",
    link: "https://www.undp.org/policy-centre/singapore/press-releases/undp-partners-dfinity-foundation-enhance-financial-inclusion-msmes",
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

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, ...buttonStyle }}
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <path
          fill="#fff"
          d="m16.38 12-4.75-8.97-1.76.94L14.12 12l-4.25 8.03 1.76.94L16.38 12Z"
        />
      </svg>
    </div>
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, ...buttonStyle }}
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <path
          fill="#fff"
          d="m16.38 12-4.75-8.97-1.76.94L14.12 12l-4.25 8.03 1.76.94L16.38 12Z"
        />
      </svg>
    </div>
  );
}

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
      <div className="md:group-hover:-translate-y-2 transition-transform">
        {children}
      </div>
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
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
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
          <article key={index} className="border-box px-3">
            <CardWithImage href={data.link} image={data.image}>
              <div className="py-5 mr-40">
                <strong className="tw-paragraph-sm md:tw-heading-7 mb-2 !truncate">
                  {data.tagline}
                </strong>
                <h4 className="tw-heading-7 md:tw-heading-5 mb-0 truncate">
                  {data.title}
                </h4>
                <p className="text-white/60 tw-paragraph-sm md:tw-paragraph mb-0 truncate">
                  {data.description}
                </p>
              </div>
            </CardWithImage>
          </article>
        ))}
      </Slider>
    </div>
  );
};
export default SectionSlider;
