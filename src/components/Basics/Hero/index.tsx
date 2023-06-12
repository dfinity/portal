import React, { useEffect } from "react";
import styles from "./index.module.css";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import transitions from "@site/static/transitions.json";
import DarkHeroStyles from "../../Common/DarkHeroStyles";
import AnimateSpawn from "../../Common/AnimateSpawn";

const Hero = () => {
  return (
    <div className={styles.heroContainer}>
      <DarkHeroStyles />
      <AnimateSpawn variants={transitions.container} className={styles.hero}>
        <motion.div
          className="blob blob-white blob-md md:blob-lg blob-x-6 md:blob-x-8 blob-y-9"
          variants={transitions.fadeIn}
        ></motion.div>
        <motion.h1
          variants={transitions.item}
          className="tw-heading-3 md:tw-heading-2 m-0"
        >
          Internet Computer basics
        </motion.h1>
        <motion.p
          variants={transitions.item}
          className="tw-paragraph md:tw-lead m-0"
        >
          The Internet Computer (ICP) allows Web3 services to run 100% on-chain,
          providing the only platform where developers can build and users can
          enjoy fully decentralized applications. ICP ditches corporate cloud,
          insecure bridges and expensive oracles.
        </motion.p>
      </AnimateSpawn>
    </div>
  );
};

export default Hero;
