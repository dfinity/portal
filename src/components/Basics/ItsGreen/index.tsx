import React, { useEffect } from "react";
import styles from "./index.module.css";

import Icon1 from "../../../../static/img/basics/icon-plant.svg";
import Icon2 from "../../../../static/img/basics/icon-iot.svg";
import Icon3 from "../../../../static/img/basics/icon-db.svg";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import transitions from "@site/static/transitions.json";
import GreenBlur from "@site/static/img/basics/greenBlur.png";

const ItsGreen = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0 });
  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [controls, inView]);
  return (
    <section className={styles.outerContainer}>
      <img src={GreenBlur} className={styles.BGGradient} alt="" />

      <motion.div
        ref={ref}
        animate={controls}
        initial="hidden"
        variants={transitions.container}
        className={styles.container}
      >
        <motion.h2 variants={transitions.item} className={styles.heading}>
          Efficient &amp; low carbon emissions
        </motion.h2>
        <motion.p variants={transitions.item} className="paragraph-large">
          The Internet Computer's advanced architecture and cryptography runs
          smart contract software with breakthrough levels of efficiency.
          Systems built 100% on the Internet Computer run with efficiency
          comparable to the traditional IT stack, providing massive savings in
          costs and protecting the environment
        </motion.p>
        <Icon1></Icon1>
        <Icon2></Icon2>
        <Icon3></Icon3>
      </motion.div>
    </section>
  );
};

export default ItsGreen;
