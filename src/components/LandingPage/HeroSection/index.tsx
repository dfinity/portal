import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import Link from "@docusaurus/Link";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import transitions from "@site/static/transitions.json";
import ArrowRight from "@site/static/img/arrow-right.svg";
import ChevronRightIcon from "@site/static/img/chevron-right.svg";

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
        <motion.div
          variants={transitions.item}
          className="flex flex-col items-start md:flex-row md:items-center mb-8"
        >
          <Link
            className="
              tw-heading-7 md:tw-heading-6 text-white 
              px-6 py-3
              rounded-xl
              bg-[url(/img/btc-integration-bg-small.jpg)] bg-cover bg-left
              inline-flex items-center gap-6 
              transition-all
              mb-6

              md:mb-0 md:mr-10
              hover:gap-10 hover:text-white hover:no-underline
              md:hover:mr-6
            "
            href="/bitcoin-integration"
          >
            Build Bitcoin smart contracts <ChevronRightIcon />
          </Link>
          <span className="tw-heading-7 md:tw-heading-6 text-black-60 inline-flex items-center gap-2">
            <ArrowRight></ArrowRight> Extend Ethereum (coming)
          </span>
        </motion.div>
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
