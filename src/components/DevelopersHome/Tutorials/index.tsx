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
          <p>Tutorials</p>
          <Link className={styles.callToAction} to={"/docs/current/tutorials/deploy_sample_app"}>
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
                Install SDK, create a sample app, and deploy it to the production with three simple steps.
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
                Create your the first app with Motoko programming language and build the app frontend with Vue.js
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
