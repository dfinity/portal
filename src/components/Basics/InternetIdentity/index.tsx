import Link from "@docusaurus/Link";
import transitions from "@site/static/transitions.json";
import { motion } from "framer-motion";
import React from "react";
import BiometricIcon from "./biometric.svg";
import styles from "./index.module.css";
import NoTrackingIcon from "./privacy.svg";
import WebAuthnIcon from "./webauthn.svg";

const MotionLink = motion(Link);

export const Card: React.FC<{
  icon: React.ReactNode;
  title: React.ReactNode;
  children: React.ReactNode;
}> = ({ children, icon, title }) => {
  return (
    <motion.div variants={transitions.item} className={styles.card}>
      {icon}
      <h3 className="heading-3">{title}</h3>
      <div className="paragraph">{children}</div>
    </motion.div>
  );
};

const InternetIdentity = () => {
  return (
    <div>
      <motion.div
        variants={transitions.container}
        className="container-10 text-white mb-12 md:mb-20"
      >
        <div className="md:w-6/10">
          <motion.h2
            variants={transitions.item}
            className="tw-heading-3 md:tw-heading-2 mb-6"
          >
            Internet Identity
          </motion.h2>
          <motion.p
            variants={transitions.item}
            className="tw-paragraph md:tw-lead-sm mb-8 md:mb-4"
          >
            The easy-to-use authentication framework that allows anyone with a
            WebAuthn enabled device to anonymously authenticate with Web3
            services running on the Internet Computer using the WebAuthn
            standard.
          </motion.p>
          <MotionLink
            className="button-outline-white"
            href="https://identity.ic0.app/"
          >
            Create Your Internet Identity
          </MotionLink>
        </div>
      </motion.div>
      <motion.div
        variants={transitions.container}
        className="container-12 flex flex-col md:flex-row gap-5 text-white"
      >
        <motion.div variants={transitions.item} className={styles.card}>
          <BiometricIcon></BiometricIcon>
          <h3 className="tw-heading-5 md:tw-heading-3 m-0">
            Biometric authorization
          </h3>
          <p className="tw-paragraph md:tw-lead-sm mb-0">
            Unlock authentication with your device via FaceID, fingerprint
            sensor or use a YubiKey. This provides strong security, as the
            cryptographic key never leaves your device. No passwords are used to
            authenticate on ICP.
          </p>
        </motion.div>

        <motion.div variants={transitions.item} className={styles.card}>
          <NoTrackingIcon></NoTrackingIcon>
          <h3 className="tw-heading-5 md:tw-heading-3 m-0">No tracking</h3>
          <p className="tw-paragraph md:tw-lead-sm mb-0">
            Remain pseudonymous using the Internet Identity authentication
            framework, which prevents user tracking across dapps and services.
          </p>
        </motion.div>
        <motion.div variants={transitions.item} className={styles.card}>
          <WebAuthnIcon></WebAuthnIcon>
          <h3 className="tw-heading-5 md:tw-heading-3 m-0">WebAuthn</h3>
          <p className="tw-paragraph md:tw-lead-sm mb-0">
            Internet Identity integrates the widely used secure web2
            authentication framework known as WebAuthn for maximum
            compatibility.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default InternetIdentity;
