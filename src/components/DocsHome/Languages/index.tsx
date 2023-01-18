import React, { useEffect } from "react";
import styles from "@site/src/components/DocsHome/Languages/index.module.css";
import Link from "@docusaurus/Link";
import Card from "@site/src/components/SamplesPage/Card";
import { motion, useAnimation } from "framer-motion";
import transitions from "@site/static/transitions.json";
import { useInView } from "react-intersection-observer";
import clsx from "clsx";
import motokoBG from "@site/static/img/motoko.webp";
import rustBG from "@site/static/img/rust.webp";
import RightArrowSVG from "@site/static/img/svgIcons/rightArrowIcon.svg";
import { sampleItems } from "@site/src/components/Common/sampleItems";
import AnimateSpawn from "../../Common/AnimateSpawn";

function Index() {
  return (
    <AnimateSpawn variants={transitions.container} className="mt-12 md:mt-20">
      <motion.div variants={transitions.item} className={styles.header}>
        <p>Programming languages</p>
        <Link
          className={styles.callToAction}
          to={"/docs/current/developer-docs/build/cdks/"}
        >
          See all languages
        </Link>
      </motion.div>
      <div className={styles.cards}>
        <motion.a
          variants={transitions.item}
          href={"/docs/current/motoko/intro/Language%20Tour"}
          className={clsx(styles.card, styles.cardHover)}
        >
          <div className={styles.bodyContainer}>
            <p className={styles.informationTitle}>Motoko</p>
            <p className={styles.informationBody}>
              Get started with high level programming language designed
              specifically for Internet Computer
            </p>
          </div>
          <img className={styles.motokoBackground} src={motokoBG} alt="" />
          <RightArrowSVG className={styles.informationIcon} />
        </motion.a>
        <motion.a
          variants={transitions.item}
          href={"/docs/current/developer-docs/build/cdks/cdk-rs-dfinity/"}
          className={clsx(styles.card, styles.cardHover)}
        >
          <div className={styles.bodyContainer}>
            <p className={styles.informationTitle}>Rust</p>
            <p className={styles.informationBody}>
              Use Rust - a high perfomance and safe programming language to
              build high efficiency apps on Internet Computer
            </p>
          </div>
          <img className={styles.rustBackground} src={rustBG} alt="" />

          <RightArrowSVG className={styles.informationIcon} />
        </motion.a>
      </div>
    </AnimateSpawn>
  );
}

export default Index;
