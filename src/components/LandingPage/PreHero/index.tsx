import Link from "@docusaurus/Link";
import { useDarkHeaderInHero } from "@site/src/utils/use-dark-header-in-hero";
import { useFontsLoaded } from "@site/src/utils/use-fonts-loaded";
import transitions from "@site/static/transitions.json";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import React, { Fragment, ReactNode, useRef } from "react";
import AnimateSpawn from "../../Common/AnimateSpawn";
import DarkHeroStyles from "../../Common/DarkHeroStyles";
import LinkArrowRight from "../../Common/Icons/LinkArrowRight";
import LinkArrowUpRight from "../../Common/Icons/LinkArrowUpRight";
import { Facts } from "./Facts";
import ParticleAnimation from "./ParticleAnimation";

const PreHero: React.FC<{
  headline: ReactNode;
  subheadline: ReactNode;
  cta?: ReactNode;
  ctaLink?: string;
  cards: {
    caption: string;
    title: string;
    link: string;
  }[];
}> = ({ headline, subheadline, cta, ctaLink, cards }) => {
  const fontLoaded = useFontsLoaded();

  const darkRef = useRef<HTMLDivElement>(null);
  const isDark = useDarkHeaderInHero(darkRef);

  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: headlineRef,
    offset: ["start start", "end start"],
  });

  const blurSize = useTransform(scrollYProgress, [0.3, 0.66], [0, 50]);
  const boxBlurSize = useTransform(scrollYProgress, [0.3, 0.4], [50, 0]);

  const blur = useMotionTemplate`blur(${blurSize}px)`;
  const boxBlur = useMotionTemplate`blur(${boxBlurSize}px)`;

  return (
    <section className=" bg-[#1B025A]" id="home" ref={darkRef}>
      {isDark && <DarkHeroStyles bgColor="transparent" />}
      <ParticleAnimation
        animate={true}
        blur={blur}
        debugForces={false}
      ></ParticleAnimation>

      <div className="overflow-hidden relative">
        <div className="md:pt-0 flex items-center" ref={headlineRef}>
          <div className="container-10 text-left w-full pt-24 md:pt-[10vh]">
            <motion.div
              className="mb-20 md:mb-0"
              style={{
                // animationPlayState: start ? "running" : "paused",
                animationPlayState: "paused",
                // opacity: blobOpacity,
              }}
            >
              <h1
                className="animate-fade-up tw-heading-50 md:tw-heading-22 lg:tw-heading-1 text-white mb-5 md:mb-6 lg:mb-8"
                style={{
                  animationPlayState: fontLoaded ? "running" : "paused",
                }}
              >
                {headline}
              </h1>
              <p
                className="animate-fade-up tw-heading-44 md:tw-heading-3 text-white mb-6 [animation-delay:100ms]"
                style={{
                  animationPlayState: fontLoaded ? "running" : "paused",
                }}
              >
                {subheadline}
              </p>
              <div
                className="animate-fade-up [animation-delay:150ms]"
                style={{
                  animationPlayState: fontLoaded ? "running" : "paused",
                }}
              >
                <Link className="button-outline-white" href={ctaLink}>
                  {cta}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
        <div
          className="container-12 text-white relative pb-56 md:pb-80 md:pt-[8.4vh]"
          ref={heroRef}
          id="stats"
        >
          <div className="">
            <motion.div
              className="-mx-6 md:mx-0 px-6 md:rounded-[32px] pt-10 pb-30 md:p-10 text-white flex flex-col md:flex-row justify-between self-stretch md:mb-[calc(33vh-188px)] animate-fade-in"
              style={{
                backdropFilter: boxBlur,
                WebkitBackdropFilter: boxBlur,
                animationDelay: "500ms",
                animationPlayState: fontLoaded ? "running" : "paused",
              }}
            >
              {cards.map((item, index, arr) => (
                <Fragment key={item.title}>
                  <Link
                    className="flex-1 text-white text-left md:text-center flex flex-row md:flex-col items-center group hover:no-underline hover:text-white animate-fade-up"
                    style={{
                      animationDelay: `${index * 100 + 600}ms`,
                      animationPlayState: fontLoaded ? "running" : "paused",
                    }}
                    href={item.link}
                  >
                    <div className="flex-1">
                      <div className="text-white/60 tw-button-sm md:tw-heading-7-caps mb-1">
                        {item.caption}
                      </div>
                      <h2 className="tw-lead-lg lg:tw-title-sm mb-0 md:mb-8">
                        {item.title}
                      </h2>
                    </div>
                    <div className="rounded-full border-white/30 border-solid border-2 inline-flex items-center justify-center w-7 h-7 md:w-10 md:h-10 text-white group-hover:text-infinite group-hover:bg-white group-hover:border-white transition-all duration-200">
                      <LinkArrowRight className="w-4 md:w-auto" />
                    </div>
                  </Link>
                  {index < arr.length - 1 && (
                    <div className="w-full h-px bg-white/20 md:w-px md:h-auto my-6 md:my-0 md:mx-8"></div>
                  )}
                </Fragment>
              ))}
            </motion.div>
            <div className="md:pt-30 -mx-6 md:mx-0 px-6 md:rounded-[32px] ">
              <Facts />
              <AnimateSpawn
                variants={transitions.container}
                className="container-10 bg-black-30 rounded-xl pb-30 pt-8 md:py-0 md:h-60 flex items-center relative overflow-hidden"
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
      </div>
    </section>
  );
};
export default PreHero;
