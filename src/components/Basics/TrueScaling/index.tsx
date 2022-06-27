import Link from "@docusaurus/Link";
import {
  getNodeCount,
  getNodeProviders,
  getSubnetCount,
} from "@site/src/utils/network-stats";
import React, { useEffect, useState } from "react";
import styles from "./index.module.css";

const TrueScaling = () => {
  const [stats, setStats] = useState<{
    nodeMachines: number;
    subnets: number;
    nodeProviders: number;
  } | null>(null);

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
  });

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h3 className="heading-3">True Scaling</h3>
        <p className="paragraph-large">
          By adding new subnets regularly, the IC scales to an unbounded number
          of dapps and allows storage of unlimited data.
        </p>
        <Link href="https://dfinity.org/showcase" className="cta-link">
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
      </div>
      <div className={styles.status}>
        <img src="/img/basics/true-scaling.svg" alt="" />
        <h4>Current status</h4>
        <div className={styles.statusCard}>
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
        </div>
      </div>
    </section>
  );
};

export default TrueScaling;
