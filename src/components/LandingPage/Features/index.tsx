import React, { useEffect } from "react";
import styles from "./index.module.css";
import Link from "@docusaurus/Link";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import transitions from "@site/static/transitions.json";

const cardsContent = [
  {
    title: "100% on-chain",
    body: "Dapps fully hosted on chain, serving content directly to your browser",
    link: "https://wiki.internetcomputer.org/wiki/Internet_Computer_vision#Dapp_code_hosted_and_executed_on-chain",
  },
  {
    title: "web speed",
    body: "Update TX finalized in 2 secs, query TXs in milliseconds",
    link: "https://wiki.internetcomputer.org/wiki/Internet_Computer_vision#Web_speed",
  },
  {
    title: "reverse gas",
    body: "smart contracts pay for computation, not their users",
    link: "https://wiki.internetcomputer.org/wiki/Internet_Computer_vision#Reverse_Gas_Model_.28AKA_.22canister_pays.22.29",
  },
  {
    title: "less CO₂",
    body: "A blockchain platform that can be more efficient than traditional IT",
    link: "https://wiki.internetcomputer.org/wiki/Internet_Computer_vision#Environment_and_cost",
  },
  {
    title: "scalable dapps",
    body: "Build mass market social media using smart contracts (and nothing else)",
    link: "https://wiki.internetcomputer.org/wiki/Internet_Computer_vision#Network_scales_without_limit",
  },
  {
    title: "Internet Identity",
    body: "Anonymizing crypto authentication using WebAuthn (e.g. fingerprint sensor)",
    link: "https://wiki.internetcomputer.org/wiki/What_is_Internet_Identity",
  },
];

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
        <Link
          className={styles.actionButton}
          to="https://forum.dfinity.org/c/roadmap/29"
        >
          LEARN MORE
        </Link>
      </motion.div>
      <div className={styles.cards}>
        {cardsContent.map((card) => (
          <motion.a
            variants={transitions.item}
            href={card.link}
            className={styles.card}
            key={card.link}
          >
            <Card key={card.title} title={card.title} body={card.body} />
          </motion.a>
        ))}
      </div>
      <motion.div
        className={styles.actionButtonContainer}
        variants={transitions.item}
      >
        <Link
          className={styles.actionButton}
          to="https://forum.dfinity.org/c/roadmap/29"
        >
          LEARN MORE
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default Features;
