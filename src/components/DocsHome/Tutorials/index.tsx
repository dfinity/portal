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
    <AnimateSpawn variants={transitions.container} className="relative">
      <div className="blob blob-infinite blob-md blob-center-right"></div>
      <motion.div variants={transitions.item} className={styles.header}>
        <p>Tutorials</p>
        <Link
          className={styles.callToAction}
          to={"/docs/current/tutorials/deploy_sample_app"}
        >
          See all tutorials
        </Link>
      </motion.div>
      <div className={styles.cards}>
        <motion.a
          variants={transitions.item}
          href={"/docs/current/tutorials/deploy_sample_app"}
          className={clsx(styles.card, styles.cardHover)}
        >
          <div className={styles.bodyContainer}>
            <p className={styles.informationTitle}>Deploy your first dapp</p>
            <p className={styles.informationBody}>
              Install SDK, create a sample app, and deploy it to the production
              with three simple steps.
            </p>
          </div>
          <RightArrowSVG className={styles.informationIcon} />
        </motion.a>
        <motion.a
          variants={transitions.item}
          href={"/docs/current/tutorials/create_your_first_app/"}
          className={clsx(styles.card, styles.cardHover)}
        >
          <div className={styles.bodyContainer}>
            <p className={styles.informationTitle}>Create your first app</p>
            <p className={styles.informationBody}>
              Create your the first app with Motoko programming language and
              build the app frontend with Vue.js
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
