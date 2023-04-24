import React from "react";
import styles from "@site/src/components/DocsHome/Languages/index.module.css";
import Link from "@docusaurus/Link";
import { motion } from "framer-motion";
import transitions from "@site/static/transitions.json";
import clsx from "clsx";
import motokoBG from "@site/static/img/motoko.webp";
import rustBG from "@site/static/img/rust.webp";
import azleBG from "@site/static/img/azle.webp";
import kybraBG from "@site/static/img/kybra.webp";
import RightArrowSVG from "@site/static/img/svgIcons/rightArrowIcon.svg";
import AnimateSpawn from "../../Common/AnimateSpawn";

function Index() {
  return (
    <AnimateSpawn variants={transitions.container} className="mt-12 md:mt-20">
      <motion.div variants={transitions.item} className={styles.header}>
        <p>Programming languages</p>
        <Link
          className={styles.callToAction}
          to={"/docs/current/developer-docs/backend/choosing-language"}
        >
          See all languages
        </Link>
      </motion.div>
      <div className={styles.cards}>
        <motion.a
          variants={transitions.item}
          href={"/docs/current/motoko/main/motoko"}
          className={clsx(styles.card, styles.cardHover)}
        >
          <div className={styles.bodyContainer}>
            <p className={styles.informationTitle}>Motoko</p>
            <p className={styles.informationBody}>
              Get started with high level programming language designed
              specifically for Internet Computer
            </p>
          </div>
          <img className={styles.motokoBackground} src={motokoBG} alt=""/>
          <RightArrowSVG className={styles.informationIcon}/>
        </motion.a>
        <motion.a
          variants={transitions.item}
          href={"/docs/current/developer-docs/backend/rust/"}
          className={clsx(styles.card, styles.cardHover)}
        >
          <div className={styles.bodyContainer}>
            <p className={styles.informationTitle}>Rust</p>
            <p className={styles.informationBody}>
              Use Rust - a high perfomance and safe programming language to
              build high efficiency apps on Internet Computer
            </p>
          </div>
          <img className={styles.rustBackground} src={rustBG} alt=""/>

          <RightArrowSVG className={styles.informationIcon}/>
        </motion.a>
        <motion.a
          variants={transitions.item}
          href={"https://demergent-labs.github.io/azle/"}
          target={"_blank"}
          className={clsx(styles.card, styles.cardHover)}
        >
          <div className={styles.bodyContainer}>
            <p className={styles.informationTitle}>TypeScript</p>
            <p className={styles.informationBody}>
              Azle allows you to build Internet Computer apps using TypeScript and JavaScript, the languages of the web
            </p>
          </div>
          <img className={styles.motokoBackground} src={azleBG} alt=""/>
          <RightArrowSVG className={styles.informationIcon}/>
        </motion.a>
        <motion.a
          variants={transitions.item}
          href={"https://demergent-labs.github.io/kybra/"}
          target={"_blank"}
          className={clsx(styles.card, styles.cardHover)}
        >
          <div className={styles.bodyContainer}>
            <p className={styles.informationTitle}>Python</p>
            <p className={styles.informationBody}>
              Kybra allows you to build Internet Computer apps using Python, one of the most popular languages in the world
            </p>
          </div>
          <img className={styles.motokoBackground} src={kybraBG} alt=""/>
          <RightArrowSVG className={styles.informationIcon}/>
        </motion.a>
      </div>
    </AnimateSpawn>
  );
}

export default Index;
