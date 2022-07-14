import React, { useEffect } from "react";
import styles from "./index.module.css";
import Link from "@docusaurus/Link";
import canisters from "@site/static/img/developers/canisters.png";
import whiteBlur from "@site/static/img/developers/whiteBlur.png";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import transitions from "@site/static/transitions.json";

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
        <div className={styles.leftContainer}>
          <motion.p variants={transitions.item} className={styles.Title}>
            Canisters & cycles
          </motion.p>
          <motion.p variants={transitions.item} className={styles.Text}>
            The IC is composed of canisters that require cycles to perform
            computation. Explore Concepts to see how this and other foundational
            aspects power the IC.
          </motion.p>
          <motion.div
            variants={transitions.item}
            className={styles.actionContainer}
          >
            <Link
              className={styles.actionButton}
              to="/docs/current/concepts/canisters-code"
            >
              CONCEPTS
            </Link>
          </motion.div>
        </div>
        <motion.div
          variants={transitions.item}
          className={styles.rightContainer}
        >
          <img className={styles.canisterGraphic} src={canisters} alt="" />
          <img className={styles.whiteBlur} src={whiteBlur} alt="" />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Index;
