import clsx from "clsx";
import React, { useEffect } from "react";
import Lottie from "react-lottie-player";
import styles from "./index.module.css";

import animationData from "../../../animations/host-on-chain.json";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import transitions from "@site/static/transitions.json";
import Link from "@docusaurus/Link";

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
            <Link
              href="https://dfinity.org/howitworks/canister-lifecycle"
              className="cta-link"
              style={{ marginTop: "32px" }}
            >
              How it works
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_1926_30447)">
                  <path
                    d="M11.2429 8.34285L3.65709 8.34285L3.65709 6.34315H14.6568V17.3429L12.6571 17.3429L12.6571 9.75706L4.05024 18.364L2.63603 16.9498L11.2429 8.34285Z"
                    fill="currentColor"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1926_30447">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
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
