import React, { useEffect } from "react";
import styles from "./index.module.css";
import Link from "@docusaurus/Link";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import transitions from "@site/static/transitions.json";

const cardsContent = [
  {
    title: "Web serving",
    body: "Smart contracts process http requests & serve interactive web direct to users",
    link: "https://wiki.internetcomputer.org/wiki/Web_Serving",
  },
  {
    title: "Emit less CO₂",
    body: "100% on-chain systems and services can be more efficient than traditional IT",
    link: "https://wiki.internetcomputer.org/wiki/Internet_Computer_performance_%26_power_consumption",
  },
  {
    title: "Limitless scaling",
    body: "Scale mass-market web3 services 100% on-chain (no cloud or servers needed)",
    link: "https://wiki.internetcomputer.org/wiki/Limitless_Scaling",
  },  
  {
    title: "Internet Identity",
    body: "Web3 sign-on via WebAuthn: fingerprint sensor, Face ID, etc",
    link: "https://medium.com/dfinity/internet-identity-the-end-of-usernames-and-passwords-ff45e4861bf7",
  },

  {
    title: "Web3 orchestration",
    body: "Smart contracts sign TXs that run on other blockchains (chain key crypto)",
    link: "https://wiki.internetcomputer.org/wiki/Trustless_multi-chain_web3_using_the_IC",
  },  
  {
    title: "Reverse gas model",
    body: 'Smart contracts pay for their own compute so users can just interact',
    link: "https://wiki.internetcomputer.org/wiki/Users_interact_with_dapps_without_tokens",
  },
  {
    title: "HTTPS outcalls",
    body: "Smart contracts can connect to outside world through http via consensus",
    link: "https://wiki.internetcomputer.org/wiki/HTTPS_outcalls",
  },  
  {
    title: "Breakthrough speed",
    body: "Pre-finalized query TX <200ms, and update TX in <2s",
    link: "https://wiki.internetcomputer.org/wiki/Web_Speed",
  },
  {
    title: "WebAssembly",
    body: "Use any lang that compiles to the VM of the future: Motoko, Rust, C, etc",
    link: "https://wiki.internetcomputer.org/wiki/WebAssembly",
  },
  {
    title: "Rapid evolution",
    body: "A governance DAO upgrades and configures the blockchain's nodes daily",
    link: "https://wiki.internetcomputer.org/wiki/Network_Nervous_System",
  },
  {
    title: "100% sovereign",
    body: 'Internet Computer nodes are dedicated "node machines" (no cloud instances)',
    link: "https://wiki.internetcomputer.org/wiki/Sovereign_network",
  },
  {
    title: "Bitcoin liquidity",
    body: "Smart contracts process UTXOs as though hosted by Bitcoin mainnet",
    link: "/bitcoin-integration",
  },
  {
    title: "Multi-block TXs",
    body: "Smart contract calls (TXs) can be long-running and span multiple blocks",
    link: "https://wiki.internetcomputer.org/wiki/Multi-block_TXs",
  },
  {
    title: "Daemon contracts",
    body: "Smart contracts can be invoked by the network and run automatically",
    link: "https://wiki.internetcomputer.org/wiki/Daemon_canisters",
  },
  {
    title: "Parallelism",
    body: '"Actor" smart contracts run in parallel, unlocking scaling & solving reentrancy',
    link: "https://wiki.internetcomputer.org/wiki/Parallelism",
  },
];

export const MotionLink = motion(Link);

function Card({ title, body }) {
  return (
    <>
      <div className={styles.cardContainer}>
        <p className={styles.cardTitle}>{title}</p>
        <p className={styles.cardBody}>{body}</p>
      </div>
      <svg
        className={styles.informationIcon}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M13.5006 12L6.50031 4.99969L8.5 3L17.5 12L8.5 21L6.50031 19.0003L13.5006 12Z" />
      </svg>
    </>
  );
}

function Features() {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.2 });
  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [controls, inView]);
  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={transitions.container}
      className={styles.container}
    >
      <a className={styles.anchor} id="features" />
      <motion.p variants={transitions.item} className={styles.title}>
        What's cool about the <br /> Internet Computer
      </motion.p>
      <motion.div
        className={styles.scrollContainer}
        variants={transitions.item}
      >
        <div className={styles.mobileCardsContainer}>
          {cardsContent.map((card) => (
            <div className={styles.cardWrapper} key={card.title}>
              <Link to={card.link} className={styles.card}>
                <Card key={card.title} title={card.title} body={card.body} />
              </Link>
            </div>
          ))}
        </div>
      </motion.div>
      <motion.div
        className={styles.actionButtonContainerMobile}
        variants={transitions.item}
      >
        <Link className={styles.actionButton} to="/how-it-works">
          LEARN MORE
        </Link>
      </motion.div>
      <div className={styles.cards}>
        {cardsContent.map((card) => (
          <MotionLink
            variants={transitions.item}
            href={card.link}
            className={styles.card}
            key={card.link}
          >
            <Card key={card.title} title={card.title} body={card.body} />
          </MotionLink>
        ))}
      </div>
      <motion.div
        className={styles.actionButtonContainer}
        variants={transitions.item}
      >
        <Link className={styles.actionButton} to="/how-it-works">
          LEARN MORE
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default Features;
