import React, { FC } from "react";

import AnimateSpawn from "../Common/AnimateSpawn";
import TwitterIcon from "@site/static/img/ethdenver/twitter.svg";
import { motion } from "framer-motion";
import transitions from "@site/static/transitions.json";
import CtaCard from "./CtaCard";
import Link from "@docusaurus/Link";

const MotionLink = motion(Link);
const MeetUs: FC<{
  id: string;
}> = ({ id }) => {
  return (
    <section
      className="bg-black text-white py-20 md:pt-30 md:pb-40"
      id={id}
    >
      <AnimateSpawn
        className="container-10 relative mb-16 md:mb-20"
        variants={transitions.container}
      >
        <div className="md:w-8/10">
          <motion.h2
            className="tw-heading-alt-2 md:mb-8"
            variants={transitions.item}
          >
            Meet us at our Booth AT ETHDenver 2025
          </motion.h2>
          <motion.p className="tw-lead mb-8" variants={transitions.item}>
            <span className="text-white-60">
              Join us for an electrifying ETH Denver experience filled with hands-on workshops, inspiring keynote speeches, interactive Q&A sessions, and live demos of ICP Ecosystem dapps at our booth!
            </span>
          </motion.p>
          <MotionLink
            className="link-with-icon link-white text-[#AE9EFF]"
            href="https://x.com/dfinity"
            target="_blank"
            rel="noopener noreferrer"
            variants={transitions.item}
          >
            <TwitterIcon />
              Follow us for event updates
          </MotionLink>
        </div>
      </AnimateSpawn>

      <div className="container-10 flex flex-col md:flex-row gap-8 text-black">
        <AnimateSpawn
          className="md:w-1/3"
          variants={transitions.item}
        >
          <CtaCard
            title="Chain Fusion"
            description="Build and Scale Multichain dApps across ETH, BTC and more"
            backgroundColor={['#5015FF', '#D897B4']}
            backgroundSegments={[
              [1, 2]
            ]}
            href="#"
          />
        </AnimateSpawn>
        <AnimateSpawn
          className="md:w-1/3"
          variants={transitions.item}
        >
          <CtaCard
            title="ICP<br>Ninja"
            description="Enter the Dojo and Master the Art of Smart Contracts"
            backgroundColor={['#D897B4', '#F7016E']}
            backgroundSegments={[
              [2, 1],
              [1],
              [1, 2],
            ]}
            href="#"
          />
        </AnimateSpawn>
        <AnimateSpawn
          className="md:w-1/3"
          variants={transitions.item}
        >
          <CtaCard
            title="Onchain<br>AI"
            description="Leverage the power of Decentralized AI and the Self-Writing Internet"
            backgroundColor={['#F6D43C', '#D897B4']}
            backgroundSegments={[
              [5, 1],
              [1, 5],
              [5, 1],
            ]}
            href="#"
          />
        </AnimateSpawn>
      </div>
    </section>
  );
};

export default MeetUs;
