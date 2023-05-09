import React, { useEffect } from "react";
import styles from "./index.module.css";
import { motion, useAnimation } from "framer-motion";
import transitions from "@site/static/transitions.json";
import { useInView } from "react-intersection-observer";
import clsx from "clsx";
import RightArrowSVG from "@site/static/img/svgIcons/rightArrowIcon.svg";
import BGCircle from "@site/static/img/purpleBlurredCircle.webp";

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
        <img src={BGCircle} className={styles.BGShape} alt="" />
        <div className={styles.cards}>
          <motion.a
            variants={transitions.item}
            href={"https://dfinity.org/grants/"}
            className={clsx(
              styles.card,
              styles.cardContainer,
              styles.cardHover
            )}
          >
            <div className={styles.bodyContainer}>
              <p className={styles.informationTitle}>Developer grants</p>
              <p className={styles.informationBody}>
                The DFINITY Developer Grant Program aims to catalyze the growth
                of the Internet Computer ecosystem.
              </p>
            </div>
            <RightArrowSVG className={styles.informationIcon} />
          </motion.a>
          <motion.a
            variants={transitions.item}
            href={"https://dfn.typeform.com/to/Px1Mout9"}
            target="_blank"
            className={clsx(
              styles.card,
              styles.cardContainer,
              styles.cardHover
            )}
          >
            <div className={styles.bodyContainer}>
              <p className={styles.informationTitle}>Beacon fund</p>
              <p className={styles.informationBody}>
                Beacon invests early in strong teams who can launch and grow the
                open internet services and decentralized financial systems of
                the future.
              </p>
            </div>
            <RightArrowSVG className={styles.informationIcon} />
          </motion.a>
          <motion.a
            variants={transitions.item}
            href={"https://faucet.dfinity.org/"}
            className={clsx(
              styles.card,
              styles.cyclesContainer,
              styles.cardHover
            )}
          >
            <div className={styles.bodyContainer}>
              <p className={styles.informationTitle}>Cycles faucet</p>
              <p className={styles.informationBody}>
                Get free cycles to use for testing and deployment of your
                project on the Internet Computer
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
