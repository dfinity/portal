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
import LinkArrowRight from "../../Common/Icons/LinkArrowRight";
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
        <h3 className="tw-heading-5 md:tw-heading-3 m-0">True Scaling</h3>
        <p className="tw-paragraph md:tw-lead m-0">
          By adding new subnets regularly, the IC scales to an unbounded number
          of dapps and allows storage of unlimited data.
        </p>
        <Link
          href="https://internet-computer.typeform.com/to/IWl3iClx"
          className="link-primary link-with-icon"
        >
          <LinkArrowRight />
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
              <h5 className="tw-heading-6 m-0">
                {stats ? (
                  `${stats.nodeMachines} Node machines`
                ) : (
                  <span className={styles.skeleton}>&nbsp;</span>
                )}
              </h5>
              <p className="tw-paragraph-sm mb-0">
                with hundreds more waiting config in DCs
              </p>
            </li>
            <li>
              <h5 className="tw-heading-6 m-0">
                {stats ? (
                  `${stats.nodeProviders} Node providers`
                ) : (
                  <span className={styles.skeleton}>&nbsp;</span>
                )}
              </h5>
              <p className="tw-paragraph-sm mb-0">indie node operators</p>
            </li>
            <li>
              <h5 className="tw-heading-6 m-0">
                {stats ? (
                  `${stats.subnets} Subnet blockchain`
                ) : (
                  <span className={styles.skeleton}>&nbsp;</span>
                )}
              </h5>
              <p className="tw-paragraph-sm mb-0">combined into 1 platform</p>
            </li>
          </ul>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TrueScaling;
