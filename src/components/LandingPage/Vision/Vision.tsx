import Link from "@docusaurus/Link";
import clsx from "clsx";
import { motion } from "framer-motion";
import React from "react";
import { css } from "../../../utils/dummy-css";
import AnimateSpawn from "../../Common/AnimateSpawn";
import LinkArrowUpRight from "../../Common/Icons/LinkArrowUpRight";
import styles from "./Vision.module.css";
import transitions from "@site/static/transitions.json";

const MotionLink = motion(Link);

const Vision: React.FC = () => {
  return (
    <AnimateSpawn
      className="container-10 pt-20 md:pt-40"
      el={motion.section}
      variants={transitions.container}
      id="vision"
    >
      <div className="relative">
        <p
          className={clsx(
            "tw-lead md:tw-title-sm md:w-7/10 mb-16",
            styles.vision
          )}
        >
          Today, blockchains only process tokens and clips of data.
          <br />
          <br />
          Tomorrow, blockchain will become a decentralized <em>crypto cloud</em>
          .
          <br />
          <br />
          Blockchain will eat the centralized cloud, and become the{" "}
          <em>everything stack</em>, which hosts unstoppable systems and
          services, and rich fully-decentralized Web3 experiences.
          <br />
          <br />
          It's already happening at scale on the Internet Computer, which is
          powering a <em>blockchain singularity</em>.
          <br />
          <br />
          Join the movement.
        </p>

        <p className="mb-8">
          <Link href="/capabilities" className="button-primary text-center">
            Internet Computer capabilities
          </Link>
        </p>
        <p className="mb-0">
          <Link href="https://wiki.internetcomputer.org/wiki/History" className="link-primary link-with-icon">
            Wiki history of the Internet Computer
            <LinkArrowUpRight />
          </Link>
        </p>

        <MotionLink
          className="hidden md:block absolute right-[-170px] bottom-[400px] bg-[linear-gradient(250.6deg,#6A85F1_-7.42%,#C572EF_92.38%)] tw-lead-lg px-8 py-3 rounded-full text-white"
          variants={transitions.item}
          href="https://twitter.com/search?q=%23InternetComputer"
        >
          #InternetComputer
        </MotionLink>
        <MotionLink
          className="hidden md:block absolute right-[180px] bottom-[270px] bg-[linear-gradient(250.6deg,#6A85F1_-7.42%,#C572EF_92.38%)] tw-title-sm px-8 py-3 rounded-full text-white"
          variants={transitions.item}
          href="https://twitter.com/search?q=%23ICP"
        >
          #ICP
        </MotionLink>
        <MotionLink
          className="hidden md:block absolute right-[-40px] bottom-[150px] bg-[linear-gradient(250.6deg,#6A85F1_-7.42%,#C572EF_92.38%)] tw-lead px-8 py-3 rounded-full text-white"
          variants={transitions.item}
          href="https://twitter.com/search?q=%23WorldComputer"
        >
          #WorldComputer
        </MotionLink>
      </div>
    </AnimateSpawn>
  );
};

export default Vision;
