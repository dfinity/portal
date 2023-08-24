import React, { useEffect } from "react";
import styles from "./index.module.css";
import Link from "@docusaurus/Link";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import transitions from "@site/static/transitions.json";
import BGCircle from "@site/static/img/purpleBlurredCircle.webp";
import AnnouncementBar from "@site/src/components/DevelopersHome/AnnouncementBar";

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
        <AnnouncementBar
          text={"Direct integration with the Bitcoin network"}
          link={"/bitcoin-integration"}
        />
        <img className={styles.BGShape} src={BGCircle} alt="" />
        <motion.p variants={transitions.item} className={styles.Title}>
          Developer Resources
        </motion.p>
        <motion.p variants={transitions.item} className={styles.Text}>
          As the IC ecosystem grows so do our resources. This is the home of
          documentation, sample code, tooling, and support.
        </motion.p>
        <motion.div
          variants={transitions.item}
          className={styles.actionContainer}
        >
          <Link
            className={styles.actionButton}
            to="/docs/current/tutorials/developer-journey/"
          >
            READ DOCS
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Index;
