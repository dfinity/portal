import clsx from "clsx";
import React, { useEffect } from "react";
import Lottie from "react-lottie-player";
import styles from "./index.module.css";

import animationData from "../../../animations/host-on-chain.json";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import transitions from "@site/static/transitions.json";

const HostWeb = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0 });
  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [controls, inView]);
  return (
    <section className={styles.outerWrapper}>
      <motion.div
        ref={ref}
        animate={controls}
        initial="hidden"
        variants={transitions.container}
        className={styles.container}
      >
        <motion.h2
          variants={transitions.item}
          className={clsx("heading-2", styles.heading)}
        >
          What makes the Internet Computer Unique?
        </motion.h2>
        <div className={styles.content}>
          <motion.div variants={transitions.item} className={styles.copy}>
            <h3 className="heading-3">Smart contracts serve webpages</h3>
            <p className="paragraph-large">
              You can open canister smart contracts directly in your browser
              just like regular websites.
            </p>
          </motion.div>
          <motion.div
            variants={transitions.item}
            className={styles.illustration}
          >
            <Lottie
              loop
              animationData={animationData}
              play
              className={styles.animation}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HostWeb;
