import Link from "@docusaurus/Link";
import React from "react";
import styles from "./index.module.css";

const Ecosystem = () => {
  return (
    <section className={styles.outerContainer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h3 className="heading-3">Users don’t need tokens and wallets</h3>
          <p className="paragraph-large">
            The reverse gas model enables free-to-use, truly user-friendly
            dapps, ready for mass adoption.
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
            Explore Internet Computer Ecosystem
          </Link>
        </div>
        <div className={styles.cards}>
          <div className={styles.card}></div>
          <div className={styles.card}>
            <img
              src={
                require("../../../../static/img/basics/sonic-logo.png").default
              }
              alt=""
            />
            <h3 className="">OpenChat</h3>
            <p className="">Swap built end-to-end DeFi platform</p>
            <span className={styles.stats}>30,000+ users</span>
          </div>
          <div className={styles.card}>
            <img
              src={
                require("../../../../static/img/basics/openchat-logo.png")
                  .default
              }
              alt=""
            />
            <h3 className="">OpenChat</h3>
            <p className="">Decentralized alternative to WhatsApp</p>
            <span className={styles.stats}>50,000+ users</span>
          </div>
          <div className={styles.card}>
            <img
              src={
                require("../../../../static/img/basics/distrikt-logo.png")
                  .default
              }
              alt=""
            />
            <h3 className="">Distrikt</h3>
            <p className="">Professional social media platform</p>
            <span className={styles.stats}>70,000+ users</span>
          </div>
          <div className={styles.card}>
            <img
              src={
                require("../../../../static/img/basics/dscvr-logo.png").default
              }
              alt=""
            />
            <h3 className="">DSCVR</h3>
            <p className="">Decentralized social news aggregator</p>
            <span className={styles.stats}>40,000+ users</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ecosystem;
