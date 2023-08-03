import Link from "@docusaurus/Link";
import {
  getNodeCount,
  getNodeProvidersCount,
  getSubnetCount,
} from "@site/src/utils/network-stats";
import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import transitions from "@site/static/transitions.json";
import LinkArrowRight from "../../Common/Icons/LinkArrowRight";
import AnimateSpawn from "../../Common/AnimateSpawn";
// import graphic from "!../../../../static/img/basics/true-scaling.svg";
// import graphicMobile from "../../../../static/img/basics/true-scaling.svg";

const TrueScaling = () => {
  const [stats, setStats] = useState<{
    nodeMachines: { total_nodes: number; up_nodes: number };
    subnets: number;
    nodeProviders: number;
  } | null>(null);

  useEffect(() => {
    (async () => {
      const [nodeMachines, subnets, nodeProviders] = await Promise.all([
        getNodeCount(),
        getSubnetCount(),
        getNodeProvidersCount(),
      ]);
      setStats({
        nodeMachines,
        nodeProviders,
        subnets,
      });
    })();
  }, []);

  return (
    <AnimateSpawn variants={transitions.container} className={styles.container}>
      <motion.div variants={transitions.item} className={styles.content}>
        <h3 className="tw-heading-5 md:tw-heading-3 m-0">True scaling</h3>
        <p className="tw-paragraph md:tw-lead m-0">
          By adding new subnets regularly, the Internet Computer scales to an
          unbounded number of dapps and allows storage of unlimited data.
        </p>
        <Link
          href="https://wiki.internetcomputer.org/wiki/Node_Provider_Documentation"
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
            srcSet="/img/basics/true-scaling-mobile.svg"
          />

          <img src="/img/basics/true-scaling.svg" alt="" loading="lazy" />
        </picture>
        <motion.h4 variants={transitions.item}>Current status</motion.h4>
        <motion.div variants={transitions.item} className={styles.statusCard}>
          <ul>
            <li>
              <h5 className="tw-heading-6 m-0">
                {stats ? (
                  `${stats.nodeMachines.total_nodes} Node machines`
                ) : (
                  <span className={styles.skeleton}>&nbsp;</span>
                )}
              </h5>
              <p className="tw-paragraph-sm mb-0">
                with hundreds more waiting to form new subnets
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
              <p className="tw-paragraph-sm mb-0">independent node operators</p>
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
    </AnimateSpawn>
  );
};

export default TrueScaling;
