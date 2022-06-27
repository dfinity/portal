import Link from "@docusaurus/Link";
import useMediaQuery from "@site/src/utils/use-media-query";
import React from "react";
import styles from "./index.module.css";

const cards = [
  {
    logo: require("../../../../static/img/basics/ii-logo.png").default,
    title: "Internet Identity",
    oneLiner: "Blockchain authentication system",
    stats: "1,000,000+ users",
  },

  {
    logo: require("../../../../static/img/basics/sonic-logo.png").default,
    title: "Sonic",
    oneLiner: "Swap built end-to-end DeFi platform",
    stats: "30,000+ users</s",
  },

  {
    logo: require("../../../../static/img/basics/openchat-logo.png").default,
    title: "OpenChat",
    oneLiner: "Decentralized alternative to WhatsApp",
    stats: "50,000+ users</s",
  },
  {
    logo: require("../../../../static/img/basics/distrikt-logo.png").default,
    title: "Distrikt",
    oneLiner: "Professional social media platform",
    stats: "70,000+ users</s",
  },

  {
    logo: require("../../../../static/img/basics/dscvr-logo.png").default,
    title: "DSCVR",
    oneLiner: "Decentralized social news aggregator",
    stats: "40,000+ users</s",
  },
];

const Ecosystem = () => {
  const isMobile = useMediaQuery("(max-width: 996px)");

  const projects = isMobile ? [...cards].reverse() : cards;

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
          {projects.map((card) => (
            <div className={styles.card} key={card.title}>
              <img src={card.logo} alt="" />
              <h3 className="">{card.title}</h3>
              <p className="">{card.oneLiner}</p>
              <span className={styles.stats}>{card.stats}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ecosystem;
