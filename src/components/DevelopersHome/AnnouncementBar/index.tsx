import React, { useEffect } from "react";
import styles from "./index.module.css";
import RightArrow from "@site/static/img/svgIcons/rightArrowIcon.svg";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import transitions from "@site/static/transitions.json";

function Index({ text, link }) {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.2 });
  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [controls, inView]);
  return (
    <motion.a
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={transitions.item}
      className={styles.container}
      href={link}
      target={"_blank"}
    >
      <span className={styles.text}>{text}</span>
      <RightArrow className={styles.arrow} />
    </motion.a>
  );
}

export default Index;
