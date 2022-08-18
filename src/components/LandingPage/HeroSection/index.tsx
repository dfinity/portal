import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import Link from "@docusaurus/Link";
import { AnimatePresence, motion, useAnimation, useCycle } from "framer-motion";
import { useInView } from "react-intersection-observer";
import transitions from "@site/static/transitions.json";

const RotatedHeadline: React.FC<{ lines: string[]; interval: number }> = ({
  lines,
  interval,
}) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const handle = setInterval(() => {
      setIndex((index + 1) % lines.length);
    }, interval);

    return () => clearInterval(handle);
  }, [index, interval]);

  return (
    <>
      {lines.map((line, i) => (
        <h1
          className="transition-all col-start-1 row-start-1 duration-500"
          key={line + "_" + i}
          style={{
            opacity: i === index ? 1 : 0,
            transform: `translateY(${i === index ? 0 : 100}px)`,
          }}
        >
          {line}
        </h1>
      ))}
    </>
  );
};

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
      <a className={styles.anchor} id="home" />
      <motion.div
        ref={ref}
        animate={controls}
        initial="hidden"
        variants={transitions.container}
        className={styles.container}
      >
        <motion.div variants={transitions.item} className={styles.Title}>
          <RotatedHeadline
            interval={3000}
            lines={[
              "Everything on-chain",
              "Build in Cypherspace",
              "(The new internet)",
              "Alien tech blockchain",
            ]}
          />
        </motion.div>
        <motion.p variants={transitions.item} className={styles.Text}>
          Web3 smart contracts process HTTP requests, control other chains, and
          scale infinitely
        </motion.p>
        <motion.div
          variants={transitions.item}
          className={styles.actionContainer}
        >
          <Link className={styles.actionButton} to="/developers">
            BUILD REAL WEB3
          </Link>
          <Link className={styles.callToAction} to={"/showcase"}>
            Explore the Internet Computer ecosystem
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Index;
