import Link from "@docusaurus/Link";
import styles from "@site/src/components/DevelopersHome/SampleCode/index.module.css";
import RightArrowSVG from "@site/static/img/svgIcons/rightArrowIcon.svg";
import transitions from "@site/static/transitions.json";
import clsx from "clsx";
import { motion } from "framer-motion";
import React from "react";
import AnimateSpawn from "../../Common/AnimateSpawn";

function Index() {
  return (
    <AnimateSpawn variants={transitions.container} className="mt-12 md:mt-20">
      <motion.div variants={transitions.item} className={styles.header}>
        <p>Developer Guides</p>
        <Link
          className={styles.callToAction}
          to={"/docs/current/developer-docs/setup/"}
        >
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
            <p className={styles.informationTitle}>
              Set up development environment
            </p>
            <p className={styles.informationBody}>
              Install SDK, understand the project structure, acquire cycles, and
              deploy to production.
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
              Learn how to create Internet Computer Canisters using Motoko and
              Rust programming languages
            </p>
          </div>
          {/* <img className={styles.motokoBackground} src={motokoBG} alt="" /> */}
          <RightArrowSVG className={styles.informationIcon} />
        </motion.a>
      </div>
    </AnimateSpawn>
  );
}

export default Index;
