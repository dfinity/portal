import clsx from "clsx";
import React, { useEffect } from "react";
import Lottie from "react-lottie-player";
import styles from "./index.module.css";

import animationData from "../../../animations/host-on-chain.json";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import transitions from "@site/static/transitions.json";
import Link from "@docusaurus/Link";
import LinkArrowUpRight from "../../Common/Icons/LinkArrowUpRight";

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
          className={clsx("tw-heading-3 md:tw-heading-2 m-0", styles.heading)}
        >
          What makes the Internet Computer Unique?
        </motion.h2>
        <div className={styles.content}>
          <motion.div variants={transitions.item} className={styles.copy}>
            <h3 className="tw-heading-5 md:tw-heading-3 m-0">
              Smart contracts serve webpages
            </h3>
            <p className="tw-paragraph md:tw-lead m-0">
              You can open canister smart contracts directly in your browser
              just like regular websites.
            </p>
            <Link
              href="https://internetcomputer.org/how-it-works#Web-access"
              className="link-primary link-with-icon mt-8"
            >
              How it works
              <LinkArrowUpRight />
            </Link>
          </motion.div>
          <motion.div
            variants={transitions.item}
            className={styles.illustration}
          >
            <Link
              className={styles.illustrationCTA}
              href={"https://hwvjt-wqaaa-aaaam-qadra-cai.ic0.app/"}
            >
              Content served directly from chain
            </Link>
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
