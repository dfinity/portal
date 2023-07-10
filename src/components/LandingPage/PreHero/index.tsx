import Link from "@docusaurus/Link";
import { useDarkHeaderInHero } from "@site/src/utils/use-dark-header-in-hero";
import transitions from "@site/static/transitions.json";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import AnimateSpawn from "../../Common/AnimateSpawn";
import DarkHeroStyles from "../../Common/DarkHeroStyles";
import LinkArrowRight from "../../Common/Icons/LinkArrowRight";
import LinkArrowUpRight from "../../Common/Icons/LinkArrowUpRight";
import { OnChainBadge } from "../../Common/OnChainBadge/OnChainBadge";
import { Facts } from "./Facts";
import ParticleAnimation from "./ParticleAnimation";
import RotatedHeadline from "./RotatedHeadline";

const PreHero: React.FC<{
  headline: ReactNode;
  straps: string[];
}> = ({ headline, straps }) => {
  const [start, setStart] = useState(false);
  const [animate, setAnimate] = useState(true);

  const darkRef = useRef<HTMLDivElement>(null);
  const isDark = useDarkHeaderInHero(darkRef);

  useEffect(() => {
    setStart(true);
  }, []);

  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: headlineRef,
    offset: ["end end", "end start"],
  });

  // const blurSize = useTransform(scrollYProgress, [0.3, 0.66], [0, 50]);
  const blobOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // const blur = useMotionTemplate`blur(${blurSize}px)`;

  return (
    <section className=" bg-[#1B025A]" id="home" ref={darkRef}>
      {isDark && <DarkHeroStyles bgColor="transparent" />}
      <ParticleAnimation animate={animate}></ParticleAnimation>

      <div
        className="overflow-hidden relative"
        style={{
          top: `calc(var(--ifm-navbar-height) * -1)`,
        }}
      >
        <div
          className="relative w-screen md:h-screen pt-48 md:pt-0 flex items-center"
          ref={headlineRef}
        >
          <motion.img
            src="data:image/svg+xml,%3Csvg viewBox='0 0 2098 1533' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg filter='url(%23filter0_f_212_28000)'%3E%3Cpath d='M400 656.944C400 454.532 859.224 400 1157.65 400C1456.08 400 1698 564.088 1698 766.5C1698 968.912 1456.08 1133 1157.65 1133C859.224 1133 400 859.356 400 656.944Z' fill='%233B00B9' /%3E%3C/g%3E%3Cdefs%3E%3Cfilter id='filter0_f_212_28000' x='0' y='0.00012207' width='2098' height='1533' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix' /%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' /%3E%3CfeGaussianBlur stdDeviation='200' result='effect1_foregroundBlur_212_28000' /%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E"
            alt=""
            className="absolute bottom-0 translate-y-6/10 md:translate-y-7/10 left-1/2 -translate-x-1/2 max-w-none w-[800px] md:w-full h-auto pointer-events-none"
            style={{
              opacity: blobOpacity,
            }}
          ></motion.img>
          <div className="container-12 text-center w-full">
            <motion.div
              className="animate-scale-in mb-20 md:mb-24"
              style={{
                animationPlayState: start ? "running" : "paused",
              }}
            >
              <img
                src="/img/IC_logo_horizontal_white.svg"
                alt=""
                className="w-[177px] md:w-[330px] lg:w-[440px] mb-3"
              />
              <h1 className="tw-heading-3 md:tw-heading-2 lg:tw-heading-1 text-white mb-6 md:mb-8 grid">
                {/* {headline} */}
                <RotatedHeadline lines={straps} interval={2000} />
              </h1>

              <div>
                <Link
                  className="button-outline-white"
                  href="/docs/current/home"
                >
                  Start building
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="animate-fade-in -mx-6 md:mx-0 md:rounded-[32px] px-6 py-10 md:p-10 text-white flex flex-col md:flex-row justify-between self-stretch"
              style={{
                animationDelay: "1500ms",
                animationPlayState: start ? "running" : "paused",
                backdropFilter: "blur(50px)",
              }}
            >
              <div className="flex-1 text-white text-left md:text-center flex flex-row items-center">
                <div className="flex-1">
                  <div className="text-white/60 tw-button-sm md:tw-heading-7-caps mb-1">
                    Internet Identity
                  </div>
                  <h2 className="tw-lead-lg lg:tw-title-sm mb-0 md:mb-8">
                    Web3 world ID
                  </h2>
                </div>
                <Link
                  href="/internet-identity"
                  className="rounded-full border-white/30 border-solid border-2 inline-flex items-center justify-center w-7 h-7 md:w-10 md:h-10 text-white hover:text-white hover:bg-infinite hover:no-underline hover:border-infinite transition-all duration-200"
                >
                  <LinkArrowRight className="w-4 md:w-auto" />
                </Link>
              </div>
              <div className="w-full h-px bg-white/20 md:w-px md:h-auto my-6 md:my-0 md:mx-8"></div>
              <div className="flex-1 text-white text-left md:text-center flex flex-row items-center">
                <div className="flex-1">
                  <div className="text-white/60 tw-button-sm md:tw-heading-7-caps mb-1">
                    Open Internet Services
                  </div>
                  <h2 className="tw-lead-lg lg:tw-title-sm mb-0 md:mb-8">
                    User-run Web3
                  </h2>
                </div>
                <Link
                  href="/openchat"
                  className="rounded-full border-white/30 border-solid border-2 inline-flex items-center justify-center w-7 h-7 md:w-10 md:h-10 text-white hover:text-white hover:bg-infinite hover:no-underline hover:border-infinite transition-all duration-200"
                >
                  <LinkArrowRight className="w-4 md:w-auto" />
                </Link>
              </div>
              <div className="w-full h-px bg-white/20 md:w-px md:h-auto my-6 md:my-0 md:mx-8"></div>

              <div className="flex-1 text-white text-left md:text-center flex flex-row items-center">
                <div className="flex-1">
                  <div className="text-white/60 tw-button-sm md:tw-heading-7-caps mb-1">
                    Internet Identity
                  </div>
                  <h2 className="tw-lead-lg lg:tw-title-sm mb-0 md:mb-8">
                    Web3 world ID
                  </h2>
                </div>
                <Link
                  href="/enterprise"
                  className="rounded-full border-white/30 border-solid border-2 inline-flex items-center justify-center w-7 h-7 md:w-10 md:h-10 text-white hover:text-white hover:bg-infinite hover:no-underline hover:border-infinite transition-all duration-200"
                >
                  <LinkArrowRight className="w-4 md:w-auto" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* <div className="absolute bottom-6 right-6 md:bottom-20 md:right-20">
            <motion.div
              className="animate-fade-in"
              style={{
                animationDelay: "2000ms",
                animationPlayState: start ? "running" : "paused",
                opacity: blobOpacity,
              }}
            >
              <OnChainBadge sizeClasses="w-20 h-20 md:w-32 md:h-32"></OnChainBadge>
            </motion.div>
          </div> */}

          {/* <motion.button
            className="bg-transparent appearance-none border-none p-0 m-0 animate-fade-in left-1/2 -translate-x-1/2 bottom-[10vh] md:bottom-[5vh] absolute w-12 h-12 md:w-[70px] md:h-[70px] rounded-xl backdrop-blur-xl flex items-center justify-center"
            onClick={() => {
              document.getElementById("stats").scrollIntoView();
            }}
            style={{
              animationDelay: "2500ms",
              animationPlayState: start ? "running" : "paused",
              opacity: blobOpacity,
            }}
            aria-label="Scroll down"
          >
            <svg
              width="24"
              height="38"
              viewBox="0 0 24 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23 25.4247L12 36L1 25.4247M12 0L12 35.8937"
                stroke="url(#paint0_linear_127_29571)"
                strokeWidth="1.77"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_127_29571"
                  x1="11.5784"
                  y1="35.8937"
                  x2="11.5784"
                  y2="6.09638e-09"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" />
                  <stop offset="1" stopColor="white" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </motion.button> */}
        </div>
        <div
          className="tw-heading-5 text-white relative md:pt-40 pb-56 md:pb-80 container-12"
          ref={heroRef}
          id="stats"
        >
          <div
            className="-mx-6 md:mx-0 px-6 md:rounded-[32px] pt-20 md:pt-30"
            style={{
              backdropFilter: "blur(50px)",
            }}
          >
            <Facts />
            <AnimateSpawn
              variants={transitions.container}
              className="container-10 bg-black-30 rounded-b-xl pb-30 pt-8 md:py-0 md:h-60 flex items-center relative overflow-hidden"
            >
              <div className="md:mx-1/10 flex flex-col justify-center gap-8 items-start">
                <Link
                  className="button-outline-white text-center sm:text-left"
                  href="https://dashboard.internetcomputer.org"
                >
                  INTERNET COMPUTER DASHBOARD
                </Link>
                <Link
                  href="https://wiki.internetcomputer.org/wiki/L1_comparison"
                  className="link-primary-light link-with-icon"
                >
                  Comparison of Layer-1 blockchains
                  <LinkArrowUpRight />
                </Link>
              </div>
              <img
                src="/img/home/dashboard.svg"
                className="absolute right-0 bottom-0 pointer-events-none"
                loading="lazy"
                alt=""
              ></img>
            </AnimateSpawn>
          </div>
        </div>
      </div>
    </section>
  );
};
export default PreHero;
