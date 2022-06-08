import React, { useEffect } from "react";
import styles from "./index.module.css";
import Link from "@docusaurus/Link";
import { motion, useAnimation } from "framer-motion";
import transitions from "@site/static/transitions.json";
import { useInView } from "react-intersection-observer";
import clsx from "clsx";
import RightArrowSVG from "@site/static/img/svgIcons/rightArrowIcon.svg";

function Index() {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.2 });
  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [controls, inView]);

  return (
    <div className={styles.section}>
      <motion.div
        ref={ref}
        animate={controls}
        initial="hidden"
        variants={transitions.container}
        className={styles.container}
      >
        <motion.p variants={transitions.item} className={styles.title}>
          Get your dapp off the ground
        </motion.p>

        <div className={styles.cards}>
          <motion.a
            variants={transitions.item}
            href={"/"}
            className={clsx(
              styles.card,
              styles.cardContainer,
              styles.cardHover
            )}
          >
            <div className={styles.bodyContainer}>
              <p className={styles.informationTitle}>Developer grants</p>
              <p className={styles.informationBody}>
                Learn how to build on the IC by exploring samples ranging from a
                simple DEX, to on-chain encrypted storage, NFT minting, and a
                basic DAO.
              </p>
            </div>
            <RightArrowSVG className={styles.informationIcon} />
          </motion.a>
          <motion.a
            variants={transitions.item}
            href={"/"}
            className={clsx(
              styles.card,
              styles.cardContainer,
              styles.cardHover
            )}
          >
            <div className={styles.bodyContainer}>
              <p className={styles.informationTitle}>Beacon fund</p>
              <p className={styles.informationBody}>
                Explore concepts, the architecture and technical breakthroughs
                that enable the IC. Find step-by-step guides such as how to
                stake your tokens.
              </p>
            </div>
            <RightArrowSVG className={styles.informationIcon} />
          </motion.a>
          <motion.a
            variants={transitions.item}
            href={"/"}
            className={clsx(
              styles.card,
              styles.cyclesContainer,
              styles.cardHover
            )}
          >
            <div className={styles.bodyContainer}>
              <p className={styles.informationTitle}>Cycles faucet</p>
              <p className={styles.informationBody}>
                Learn how to build on the IC by exploring samples ranging from a
                simple DEX, to on-chain encrypted storage, NFT minting, and a
                basic DAO.
              </p>
            </div>
            <RightArrowSVG className={styles.informationIcon} />
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
}

export default Index;
