import React, { useEffect } from "react";
import styles from "./index.module.css";
import Link from "@docusaurus/Link";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import transitions from "@site/static/transitions.json";

const cardsContent = [
  {
    title: "Web serving",
    body: "Smart contracts serve web (http) enabling end-to-end blockchain",
    link: "https://wiki.internetcomputer.org/wiki/Internet_Computer_vision#Dapp_code_hosted_and_executed_on-chain",
  },
  {
    title: "The fastest chain",
    body: "Update TX finalized in 1-2 secs & query TXs in milliseconds - true web speed",
    link: "https://wiki.internetcomputer.org/wiki/Internet_Computer_vision#Web_speed",
  },
  {
    title: "Tokens optional",
    body: 'Smart contracts pay for computation, not their users (aka "reverse gas")',
    link: "https://wiki.internetcomputer.org/wiki/Internet_Computer_vision#Reverse_Gas_Model_.28AKA_.22canister_pays.22.29",
  },
  {
    title: "Emit less CO₂",
    body: "Hosted smart contracts can be more efficient than traditional IT",
    link: "https://wiki.internetcomputer.org/wiki/Internet_Computer_vision#Environment_and_cost",
  },
  {
    title: "Scale on-chain",
    body: "Build mass-market web3 services 100% on-chain (no cloud or servers needed)",
    link: "https://wiki.internetcomputer.org/wiki/Internet_Computer_vision#Network_scales_without_limit",
  },
  {
    title: "Internet Identity",
    body: "Anonymous blockchain log-on using WebAuthn e.g. using fingerprint sensor",
    link: "https://wiki.internetcomputer.org/wiki/What_is_Internet_Identity",
  },
  {
    title: "Upgrades w/o forks",
    body: "NNS DAO directly upgrades network protocol, and governs blockchain",
    link: "https://wiki.internetcomputer.org/wiki/Network_Nervous_System#Neuron_following_and_liquid_democracy",
  },
  {
    title: "On-chain parallelism",
    body: 'WebAssembly "actor" smart contracts run in parallel w/o reentrancy risks',
    link: "https://wiki.internetcomputer.org/wiki/Canisters_(dapps/smart_contracts)#Canisters_as_actors",
  },
  {
    title: "Motoko, Rust...",
    body: "New languages and existing languages that compile to WebAssembly",
    link: "/docs/current/developer-docs/build/languages/motoko/",
  },
  {
    title: "Web3 orchestration",
    body: "Smart contracts sign TXs that run on other blockchains (chain key crypto)",
    link: "https://wiki.internetcomputer.org/wiki/Trustless_multi-chain_web3_using_the_IC",
  },
  {
    title: "Bitcoin liquidity",
    body: "Smart contracts process UTXOs like they are hosted on Bitcoin mainnet",
    link: "/bitcoin-integration",
  },
  {
    title: "HTTPS outcalls",
    body: "Nodes call URL for contract, contract pre-processes, consensus agrees result",
    link: "https://wiki.internetcomputer.org/wiki/HTTPS_outcalls",
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
