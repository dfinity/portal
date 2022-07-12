import Link from "@docusaurus/Link";
import clsx from "clsx";
import React, { useEffect } from "react";
import styles from "./index.module.css";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import transitions from "@site/static/transitions.json";

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
    stats: "30,000+ users",
  },

  {
    logo: require("../../../../static/img/basics/openchat-logo.png").default,
    title: "OpenChat",
    oneLiner: "Decentralized alternative to WhatsApp",
    stats: "50,000+ users",
  },
  {
    logo: require("../../../../static/img/basics/distrikt-logo.png").default,
    title: "Distrikt",
    oneLiner: "Professional social media platform",
    stats: "70,000+ users",
  },

  {
    logo: require("../../../../static/img/basics/dscvr-logo.png").default,
    title: "DSCVR",
    oneLiner: "Decentralized social news aggregator",
    stats: "40,000+ users",
  },
];

const mobileProjects = [...cards].reverse();

const Ecosystem = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0 });
  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [controls, inView]);
  return (
    <section className={styles.outerContainer}>
      <motion.div
        ref={ref}
        animate={controls}
        initial="hidden"
        variants={transitions.container}
        className={styles.container}
      >
        <motion.div variants={transitions.item} className={styles.content}>
          <h3 className="heading-3">Users don’t need tokens and wallets</h3>
          <p className="paragraph-large">
            The reverse gas model enables free-to-use, truly user-friendly
            dapps, ready for mass adoption.
          </p>
          <Link href="/showcase" className="cta-link">
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
        </motion.div>
        <div className={clsx(styles.cards, styles.cardsDesktop)}>
          {cards.map((card) => (
            <div className={styles.card} key={card.title}>
              <img src={card.logo} alt="" />
              <h3 className="">{card.title}</h3>
              <p className="">{card.oneLiner}</p>
              <span className={styles.stats}>{card.stats}</span>
            </div>
          ))}
        </div>
        <div className={clsx(styles.cards, styles.cardsMobile)}>
          {mobileProjects.map((card) => (
            <div className={styles.card} key={card.title}>
              <img src={card.logo} alt="" />
              <h3 className="">{card.title}</h3>
              <p className="">{card.oneLiner}</p>
              <span className={styles.stats}>{card.stats}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Ecosystem;
