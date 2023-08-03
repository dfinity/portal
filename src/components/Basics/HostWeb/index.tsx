import clsx from "clsx";
import React from "react";
import Lottie from "react-lottie-player";
import styles from "./index.module.css";

import Link from "@docusaurus/Link";
import transitions from "@site/static/transitions.json";
import { motion } from "framer-motion";
import animationData from "../../../animations/host-on-chain.json";
import AnimateSpawn from "../../Common/AnimateSpawn";
import LinkArrowUpRight from "../../Common/Icons/LinkArrowUpRight";

const HostWeb = () => {
  return (
    <section className={styles.outerWrapper}>
      <AnimateSpawn
        variants={transitions.container}
        className={styles.container}
      >
        <motion.h2
          variants={transitions.item}
          className={clsx("tw-heading-3 md:tw-heading-2 m-0", styles.heading)}
        >
          What makes the Internet Computer unique?
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
              aria-hidden
              loop
              animationData={animationData}
              play
              className={styles.animation}
            />
          </motion.div>
        </div>
      </AnimateSpawn>
    </section>
  );
};

export default HostWeb;
