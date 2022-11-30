import Link from "@docusaurus/Link";
import {
  getNodeCount,
  getNodeProviders,
  getSubnetCount,
} from "@site/src/utils/network-stats";
import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import transitions from "@site/static/transitions.json";
// import graphic from "!../../../../static/img/basics/true-scaling.svg";
// import graphicMobile from "../../../../static/img/basics/true-scaling.svg";

const TrueScaling = () => {
  const [stats, setStats] = useState<{
    nodeMachines: number;
    subnets: number;
    nodeProviders: number;
  } | null>(null);
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0 });
  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [controls, inView]);
  useEffect(() => {
    (async () => {
      const [nodeMachines, subnets, nodeProviders] = await Promise.all([
        getNodeCount(),
        getSubnetCount(),
        getNodeProviders(),
      ]);
      setStats({
        nodeMachines,
        nodeProviders,
        subnets,
      });
    })();
  }, []);

  return (
    <motion.section
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={transitions.container}
      className={styles.container}
    >
      <motion.div variants={transitions.item} className={styles.content}>
        <h3 className="heading-3">True Scaling</h3>
        <p className="paragraph-large">
          By adding new subnets regularly, the IC scales to an unbounded number
          of dapps and allows storage of unlimited data.
        </p>
        <Link
          href="https://internet-computer.typeform.com/to/IWl3iClx"
          className="cta-link"
        >
          <svg
            width="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.172 11L10.808 5.63605L12.222 4.22205L20 12L12.222 19.778L10.808 18.364L16.172 13H4V11H16.172Z"
              fill="currentColor"
            />
          </svg>
          Become a node provider
        </Link>
      </motion.div>
      <div className={styles.status}>
        <picture>
          <source
            media="(max-width: 996px)"
            srcSet={
              require("!!file-loader!../../../../static/img/basics/true-scaling-mobile.svg")
                .default
            }
          />

          <img
            src={
              require("!!file-loader!../../../../static/img/basics/true-scaling.svg")
                .default
            }
            alt=""
          />
        </picture>
        <motion.h4 variants={transitions.item}>Current status</motion.h4>
        <motion.div variants={transitions.item} className={styles.statusCard}>
          <ul>
            <li>
              <h5 className="heading-5">
                {stats ? (
                  `${stats.nodeMachines} Node machines`
                ) : (
                  <span className={styles.skeleton}>&nbsp;</span>
                )}
              </h5>
              <p className="paragraph-small">
                with hundreds more waiting config in DCs
              </p>
            </li>
            <li>
              <h5 className="heading-5">
                {stats ? (
                  `${stats.nodeProviders} Node providers`
                ) : (
                  <span className={styles.skeleton}>&nbsp;</span>
                )}
              </h5>
              <p className="paragraph-small">indie node operators</p>
            </li>
            <li>
              <h5 className="heading-5">
                {stats ? (
                  `${stats.subnets} Subnet blockchain`
                ) : (
                  <span className={styles.skeleton}>&nbsp;</span>
                )}
              </h5>
              <p className="paragraph-small">combined into 1 platform</p>
            </li>
          </ul>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TrueScaling;
