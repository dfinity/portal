import React, { useEffect } from "react";
import styles from "@site/src/components/DevelopersHome/SampleCode/index.module.css";
import Link from "@docusaurus/Link";
import Card from "@site/src/components/SamplesPage/Card";
import { motion, useAnimation } from "framer-motion";
import transitions from "@site/static/transitions.json";
import { useInView } from "react-intersection-observer";
import clsx from "clsx";
import motokoBG from "@site/static/img/motokoPlayground.png";
import RightArrowSVG from "@site/static/img/svgIcons/rightArrowIcon.svg";
import { sampleItems } from "@site/src/components/Common/sampleItems";

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
        <motion.div variants={transitions.item} className={styles.header}>
          <p>Developer Guides</p>
          <Link className={styles.callToAction} to={"/docs/current/developer-docs/setup/"}>
            See all developer guides
          </Link>
        </motion.div>
        <div className={styles.cards}>
          <motion.a
            variants={transitions.item}
            href={"/docs/current/developer-docs/setup/"}
            className={clsx(styles.card, styles.cardHover)}
          >
            <div className={styles.bodyContainer}>
              <p className={styles.informationTitle}>Set up development environment</p>
              <p className={styles.informationBody}>
                Install SDK, understand the project structure, acquire cycles, and deploy to production.
              </p>
            </div>
            <RightArrowSVG className={styles.informationIcon} />
          </motion.a>
          <motion.a
            variants={transitions.item}
            href={"/docs/current/developer-docs/build/backend/"}
            className={clsx(styles.card, styles.cardHover)}
          >
            <div className={styles.bodyContainer}>
              <p className={styles.informationTitle}>Build dapp backend</p>
              <p className={styles.informationBody}>
                Learn how to create Internet Computer Canisters using Motoko and Rust programming languages
              </p>
            </div>
            {/* <img className={styles.motokoBackground} src={motokoBG} alt="" /> */}
            <RightArrowSVG className={styles.informationIcon} />
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
}

export default Index;
