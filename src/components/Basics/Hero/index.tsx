import React, { useEffect } from "react";
import styles from "./index.module.css";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import transitions from "@site/static/transitions.json";
import DarkHeroStyles from "../../Common/DarkHeroStyles";

const Hero = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0 });
  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [controls, inView]);
  return (
    <div className={styles.heroContainer}>
      <DarkHeroStyles />
      <motion.div
        ref={ref}
        animate={controls}
        initial="hidden"
        variants={transitions.container}
        className={styles.hero}
      >
        {/* <Breadcrumbs></Breadcrumbs> */}
        <motion.h1
          variants={transitions.item}
          className="tw-heading-3 md:tw-heading-2 m-0"
        >
          Internet Computer Basics
        </motion.h1>
        <motion.p
          variants={transitions.item}
          className="tw-paragraph md:tw-lead m-0"
        >
          Take a dive down the rabbit hole and see how to engage with the
          ecosystem, how you can share the success of the apps that you use, and
          how to own your data.
        </motion.p>

        <motion.a
          variants={transitions.item}
          className="button-white"
          href="/docs/current/developer-docs/ic-overview"
          target="_blank"
        >
          Build real Web3
        </motion.a>
        <svg
          viewBox="0 0 917 830"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.decoration}
        >
          <g filter="url(#filter0_f_1827_35599)">
            <path
              d="M200 350.731C200 231.99 382.911 200 501.776 200C620.641 200 717 296.259 717 415C717 533.741 620.641 630 501.776 630C382.911 630 200 469.472 200 350.731Z"
              fill="white"
              fillOpacity="0.5"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_1827_35599"
              x="0"
              y="0"
              width="917"
              height="830"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="100"
                result="effect1_foregroundBlur_1827_35599"
              />
            </filter>
          </defs>
        </svg>
      </motion.div>
    </div>
  );
};

export default Hero;
