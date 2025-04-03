import React, { FC, useState } from "react";
import AnimateSpawn from "../Common/AnimateSpawn";
import TwitterIcon from "@site/static/img/ethdenver/twitter.svg";
import { motion } from "framer-motion";
import transitions from "@site/static/transitions.json";
import Link from "@docusaurus/Link";

const Bounties: FC<{
  id: string;
}> = ({ id }) => {
  return (
    <section className="container-10 py-8 md:py-40" id={id}>
      <AnimateSpawn
        className="flex flex-col md:flex-row mb-20 md:mb-40 gap-4"
        variants={transitions.container}
      >
        <div className="md:w-7/12">
          <motion.h2
            className="tw-heading-alt-2 mb-6 md:mb-8"
            variants={transitions.item}
          >
            <span className="text-gradient-base text-gradient-denver">
              ETHDenver <br />Bounties
            </span>
            <br />
            Get Your Hack <br />
            On
          </motion.h2>
          
          {/* Mobile video */}
          <div className="md:hidden mb-6">
            <motion.a
              href="https://x.com/dfinity/status/1893028107734442492"
              target="_blank"
              className="block w-full overflow-hidden rounded-xl">
                <img src="/img/ethdenver/icp-bounties-poster.webp" alt="Video poster  ICP bounties for ETH Denver" />
            </motion.a>
          </div>

          <motion.p className="tw-lead-sm mb-8 text-black-60 md:w-9/10" variants={transitions.item}>
          Bring DeFi and SocFi to Bitcoin, go mad with NFTs, or decentralize an Ethereum DAO on the Internet Computer and get rewarded for it. This is your chance to #BUIDL the future Internet! 
          </motion.p>
          <motion.div
            className="flex flex-col md:flex-row gap-4 md:gap-8 items-start md:items-center"
            variants={transitions.item}
          >
            <Link
              href="https://ethdenver2025.devfolio.co/prizes?partner=Internet+Computer"
              target="_blank"
              rel="noopener noreferrer"
              className="button-primary"
            >
              Register now
            </Link>
            <Link
              className="link-primary link-with-icon"
              href="https://twitter.com/DFINITYDev"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterIcon />
              Follow for Developer related updates
            </Link>
          </motion.div>
        </div>
        
        {/* Desktop video */}
        <div className="md:w-5/12 hidden md:block">
          <motion.a
            href="https://x.com/dfinity/status/1893028107734442492"
            target="_blank"
            className="block w-full overflow-hidden rounded-xl">
              <img src="/img/ethdenver/icp-bounties-poster.webp" alt="Video poster  ICP bounties for ETH Denver" />
          </motion.a>
        </div>
      </AnimateSpawn>

      <AnimateSpawn className="" variants={transitions.container}>
        <motion.h3
          className="tw-heading-5 md:tw-heading-4 mb-8"
          variants={transitions.item}
        >
          Participation Categories
        </motion.h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <motion.div
            className="bg-white rounded-xl p-6 md:p-8 flex flex-col gap-4 justify-between"
            variants={transitions.item}
          >
            <div>
              <h4 className="tw-heading-5 mb-3">
                Build an onchain AI agent or agent framework plugin
              </h4>
              <p className="tw-paragraph text-black-60 mb-6">
                Challenge: Smart contracts running on ICP and connect to the <a href="https://forum.dfinity.org/t/introducing-the-llm-canister-deploy-ai-agents-with-a-few-lines-of-code/41424" target="_blank">LLM canister</a> to easily call LLMs, can run autonomously, sign transactions on more than 20 blockchains, and communicate using HTTPS API calls. Use these features to build an onchain (AI) agent or a plugin for existing agent frameworks like ElizaOS or LangChain.
              </p>
            </div>
            <div className="tw-lead">
              <p className="text-gradient-base text-gradient-denver inline-block mb-0 flex gap-4 align-baseline">
                <span className="w-5/12">1st place:</span><span>$7,000</span>
              </p>
              <p className="text-gradient-base text-gradient-denver inline-block mb-0 flex gap-4 align-baseline">
                <span className="w-5/12">2st place:</span><span>$4,000</span>
              </p>
              <p className="text-gradient-base text-gradient-denver inline-block mb-0 flex gap-4 align-baseline">
                <span className="w-5/12">3st place:</span><span>$2,000</span>
              </p>
            </div>
          </motion.div>
          <motion.div
            className="bg-white rounded-xl p-6 md:p-8 flex flex-col gap-4 justify-between"
            variants={transitions.item}
          >
            <div>
              <h4 className="tw-heading-5 mb-3">
                Only possible on ICP
              </h4>
              <p className="tw-paragraph text-black-60 mb-6">
                Challenge: Smart contracts running on ICP can run autonomously, sign transactions on more than 20 blockchains and communicate with the outside world using HTTPS API calls. Use these features to build a Web3 app that couldn't be built anywhere else.
              </p>
            </div>
            <div className="tw-lead">
              <p className="text-gradient-base text-gradient-denver inline-block mb-0 flex gap-4 align-baseline">
                <span className="w-5/12">1st place:</span><span>$7,000</span>
              </p>
              <p className="text-gradient-base text-gradient-denver inline-block mb-0 flex gap-4 align-baseline">
                <span className="w-5/12">2st place:</span><span>$4,000</span>
              </p>
              <p className="text-gradient-base text-gradient-denver inline-block mb-0 flex gap-4 align-baseline">
                <span className="w-5/12">3st place:</span><span>$2,000</span>
              </p>
            </div>
          </motion.div>
          <motion.div
            className="bg-white rounded-xl p-6 md:p-8 flex flex-col gap-4 justify-between"
            variants={transitions.item}
          >
            <div>
              <h4 className="tw-heading-5 mb-3">
                Use vetKeys to store secrets on the blockchain
              </h4>
              <p className="tw-paragraph text-black-60 mb-6">
                Challenge: Blockchains can keep secrets! vetKeys, a coming ICP feature, will let apps host encrypted data at scale. Build applications leveraging onchain encryption with vetKeys to enable private messaging, secret auctions, time-lock encryption, and more.
              </p>
            </div>
            <div className="tw-lead">
              <p className="text-gradient-base text-gradient-denver inline-block mb-0 flex gap-4 align-baseline">
                <span className="w-5/12">1st place:</span><span>$7,000</span>
              </p>
              <p className="text-gradient-base text-gradient-denver inline-block mb-0 flex gap-4 align-baseline">
                <span className="w-5/12">2st place:</span><span>$4,000</span>
              </p>
              <p className="text-gradient-base text-gradient-denver inline-block mb-0 flex gap-4 align-baseline">
                <span className="w-5/12">3st place:</span><span>$2,000</span>
              </p>
            </div>
          </motion.div>
        </div>
      </AnimateSpawn>
    </section>
  );
};

export default Bounties;
