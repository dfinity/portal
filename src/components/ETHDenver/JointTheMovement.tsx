import React, { FC } from "react";

import AnimateSpawn from "../Common/AnimateSpawn";
import { motion } from "framer-motion";
import transitions from "@site/static/transitions.json";
import Link from "@docusaurus/Link";
import BiometricIcon from "@site/src/components/Basics/EthDenver/biometric.svg";
import NoTrackingIcon from "@site/src/components/Basics/EthDenver/privacy.svg";
import WebAuthnIcon from "@site/src/components/Basics/EthDenver/webauthn.svg";


const MotionLink = motion(Link)
const JointTheMovement: FC<{
  id: string;
}> = ({ id }) => {
  return (
    <section 
      id={id}
    >
      <div className="">
        <AnimateSpawn
          variants={transitions.container}
          className="container-10 text-white mb-12 md:mb-20 relative"
        >
          <div className="md:w-6/10">
            <motion.h2
              variants={transitions.item}
              className="tw-heading-alt-2 mb-6"
            >
              Join the movement!
              <br />
              Get Yourself an
              <br />
              <span className="inline-block text-gradient-base text-gradient-denver">
                Internet Identity
              </span>
            </motion.h2>
            <motion.p
              variants={transitions.item}
              className="tw-lead mb-8"
            >
              <span className="text-white-60">
              Easy-to-use Web2 login experience with blockchain security. Internet Identity is a privacy-enhancing WebAuthn framework to applications on the Internet Computer.
              </span>
            </motion.p>
            <MotionLink
              className="button-outline-white"
              href="https://identity.internetcomputer.org/"
              variants={transitions.item}
            >
              Set up now!
            </MotionLink>
          </div>
        </AnimateSpawn>
        <AnimateSpawn
          variants={transitions.container}
          className="container-12 flex flex-col md:flex-row gap-5 text-white relative"
        >
          <motion.div
            variants={transitions.item}
            className="flex-1 p-6 md:p-8 pb-12grid grid-rows-[auto_1fr_auto] border border-solid border-white-20 rounded-xl"
          >
            <BiometricIcon className="w-12 h-14 mb-10"></BiometricIcon>

            <h3 className="tw-heading-5 mb-3 self-end">
              Biometric login
            </h3>
            <p className="tw-paragraph md:tw-lead-sm mb-0 text-white-60">
              Authenticate via FaceID, fingerprint sensor or a YubiKey. This
              provides the most security, as the cryptographic key never
              leaves your device.
            </p>
          </motion.div>

          <motion.div
            variants={transitions.item}
            className="flex-1 p-6 md:p-8 g pb-12rid grid-rows-[auto_1fr_auto] border border-solid border-white-20 rounded-xl"
          >
            <NoTrackingIcon className="w-12 h-14 mb-10"></NoTrackingIcon>
            <h3 className="tw-heading-5 mb-3 self-end">
              No tracking
            </h3>
            <p className="tw-paragraph md:tw-lead-sm mb-0 text-white-60">
              Remain anonymous using the Internet Identity authentication
              framework, which prevents user tracking across dapps and
              services.
            </p>
          </motion.div>
          <motion.div
            variants={transitions.item}
            className="flex-1 p-6 md:p-8 pb-12 grid grid-rows-[auto_1fr_auto] border border-solid border-white-20 rounded-xl"
          >
            <WebAuthnIcon className="w-12 h-14 mb-10"></WebAuthnIcon>
            <h3 className="tw-heading-5 mb-3 self-end">
              WebAuthn
            </h3>
            <p className="tw-paragraph md:tw-lead-sm mb-0 text-white-60">
            Internet Identity integrates the widely used secure Web2 authentication framework known as WebAuthn for maximum compatibility.
            </p>
          </motion.div>
        </AnimateSpawn>
      </div>
    </section>
  );
};

export default JointTheMovement;
