import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import styles from "./index.module.css";
import { motion, useAnimation } from "framer-motion";
import transitions from "@site/static/transitions.json";

const InternetIdentity = () => {
  const [ref, inView, x] = useInView({ threshold: 0.5 });
  const controls = useAnimation();
  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [controls, inView]);
  return (
    <>
      <div
        className={styles.backdrop}
        style={{
          opacity: inView ? 1 : 0,
          pointerEvents: inView ? "all" : "none",
        }}
      ></div>
      <motion.section
        className={styles.outerContainer}
        animate={controls}
        initial="hidden"
        ref={ref}
        style={{
          opacity: inView ? 1 : 0,
          pointerEvents: inView ? "all" : "none",
        }}
      >
        <motion.div
          variants={transitions.container}
          className={styles.container}
        >
          <motion.h2 variants={transitions.item} className="heading-2">
            Internet Identity
          </motion.h2>
          <motion.p variants={transitions.item} className="paragraph">
            The main innovation behind the Internet Computer, which includes
            numerous scientific breakthroughs and countless advances in
            cryptoengineering.
          </motion.p>
          <motion.a
            className="button"
            target={"_blank"}
            variants={transitions.item}
            href="https://identity.ic0.app/"
          >
            Create Your Internet Identity
          </motion.a>
        </motion.div>
        <motion.div variants={transitions.container} className={styles.cards}>
          <motion.div variants={transitions.item} className={styles.card}>
            <svg
              width="72"
              height="72"
              viewBox="0 0 72 72"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.997 9.39697H26.996V11.597H17.997C14.4624 11.597 11.597 14.4624 11.597 17.997V26.9958H9.39697V17.997C9.39697 13.2473 13.2473 9.39697 17.997 9.39697ZM9.39697 44.9958V53.997C9.39697 58.7466 13.2473 62.597 17.997 62.597H26.996V60.397H17.997C14.4624 60.397 11.597 57.5316 11.597 53.997V44.9958H9.39697ZM60.397 44.9958V53.997C60.397 57.5316 57.5316 60.397 53.997 60.397H44.996V62.597H53.997C58.7466 62.597 62.597 58.7466 62.597 53.997V44.9958H60.397ZM62.597 26.9958V17.997C62.597 13.2473 58.7466 9.39697 53.997 9.39697H44.996V11.597H53.997C57.5316 11.597 60.397 14.4624 60.397 17.997V26.9958H62.597Z"
                fill="white"
              />
              <path d="M24.75 27V34.5" stroke="white" strokeWidth="2.2" />
              <path d="M47.25 27V34.5" stroke="white" strokeWidth="2.2" />
              <path d="M34.9 27V39H37.1V27H34.9Z" fill="white" />
              <path
                d="M46.5499 43.7454C43.7626 46.4252 39.9788 47.9425 36.0248 47.9659C32.0708 47.9893 28.2676 46.5169 25.4458 43.8703"
                stroke="white"
                strokeWidth="2.2"
              />
            </svg>

            <h3 className="heading-3">No usernames &amp; passwords</h3>
            <p className="paragraph">
              Fingerprint or FaceID systems on mobile or portable HSM devices as
              YubiKey or Ledger wallet, to keep the anonymity without being
              tracked across.
            </p>
          </motion.div>
          <motion.div variants={transitions.item} className={styles.card}>
            <svg
              width="73"
              height="72"
              viewBox="0 0 73 72"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.3335 36L2.45714 36.6648L1.95279 36L2.45714 35.3352L3.3335 36ZM69.3335 36L70.2099 35.3352L70.7142 36L70.2099 36.6648L69.3335 36ZM31.3788 14.25V13.15V14.25ZM13.7321 24.1128L4.20985 36.6648L2.45714 35.3352L11.9793 22.7832L13.7321 24.1128ZM4.20985 35.3352L13.7321 47.8872L11.9793 49.2168L2.45714 36.6648L4.20985 35.3352ZM31.3788 56.65H41.2882V58.85H31.3788V56.65ZM58.9349 47.8872L68.4571 35.3352L70.2099 36.6648L60.6877 49.2168L58.9349 47.8872ZM68.4571 36.6648L58.9349 24.1128L60.6877 22.7832L70.2099 35.3352L68.4571 36.6648ZM41.2882 15.35L31.3788 15.35V13.15L41.2882 13.15V15.35ZM41.2882 56.65C48.2173 56.65 54.7471 53.4075 58.9349 47.8872L60.6877 49.2168C56.0839 55.2854 48.9055 58.85 41.2882 58.85V56.65ZM13.7321 47.8872C17.9199 53.4075 24.4497 56.65 31.3788 56.65V58.85C23.7615 58.85 16.5831 55.2854 11.9793 49.2168L13.7321 47.8872ZM58.9349 24.1128C54.7471 18.5925 48.2173 15.35 41.2882 15.35V13.15C48.9055 13.15 56.0839 16.7146 60.6877 22.7832L58.9349 24.1128ZM11.9793 22.7832C16.5831 16.7146 23.7615 13.15 31.3788 13.15V15.35C24.4497 15.35 17.9199 18.5925 13.7321 24.1128L11.9793 22.7832Z"
                fill="white"
              />
              <path
                d="M44.8188 44.4853C47.0692 42.2348 48.3335 39.1826 48.3335 36C48.3335 32.8174 47.0692 29.7652 44.8188 27.5147C42.5683 25.2643 39.5161 24 36.3335 24C33.1509 24 30.0987 25.2643 27.8482 27.5147L36.3335 36L44.8188 44.4853Z"
                stroke="white"
                strokeWidth="2.2"
              />
              <path
                d="M10.0835 9.75L62.5835 62.25"
                stroke="white"
                strokeWidth="2.2"
              />
            </svg>

            <h3 className="heading-3">No tracking</h3>
            <p className="paragraph">
              Using Internet Identity authentication system, users will not able
              being tracked across dapps and services.
            </p>
          </motion.div>
          <motion.div variants={transitions.item} className={styles.card}>
            <svg
              width="73"
              height="72"
              viewBox="0 0 73 72"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.4165 13.2908L13.1834 12.2158L12.3165 12.4037V13.2908H13.4165ZM59.9165 13.2908H61.0165V12.4037L60.1496 12.2158L59.9165 13.2908ZM36.6665 66L36.066 66.9216L36.6665 67.3129L37.267 66.9216L36.6665 66ZM36.6665 8.25L36.8996 7.17498L36.6665 7.12444L36.4334 7.17498L36.6665 8.25ZM58.8165 13.2908V41.0962H61.0165V13.2908H58.8165ZM14.5165 41.0962V13.2908H12.3165V41.0962H14.5165ZM51.142 55.256L36.066 65.0784L37.267 66.9216L52.3429 57.0993L51.142 55.256ZM37.267 65.0784L22.191 55.256L20.9901 57.0993L36.066 66.9216L37.267 65.0784ZM13.6496 14.3658L36.8996 9.32502L36.4334 7.17498L13.1834 12.2158L13.6496 14.3658ZM36.4334 9.32502L59.6834 14.3658L60.1496 12.2158L36.8996 7.17498L36.4334 9.32502ZM12.3165 41.0962C12.3165 47.5538 15.5795 53.5742 20.9901 57.0993L22.191 55.256C17.4037 52.1369 14.5165 46.81 14.5165 41.0962H12.3165ZM58.8165 41.0962C58.8165 46.81 55.9294 52.1369 51.142 55.256L52.3429 57.0993C57.7535 53.5742 61.0165 47.5538 61.0165 41.0962H58.8165Z"
                fill="white"
              />
              <path
                d="M36.6665 32.25L36.6665 42"
                stroke="white"
                strokeWidth="2.2"
              />
              <rect
                x="36.6665"
                y="25.6665"
                width="6.91097"
                height="6.91097"
                rx="3.45549"
                transform="rotate(45 36.6665 25.6665)"
                fill="white"
              />
            </svg>

            <h3 className="heading-3">Cryptographi&shy;cally secure</h3>
            <p className="paragraph">
              Giving access to open, decentralized network without compromising
              on speed, security, sovereignty.
            </p>
          </motion.div>
        </motion.div>
      </motion.section>
    </>
  );
};

export default InternetIdentity;
