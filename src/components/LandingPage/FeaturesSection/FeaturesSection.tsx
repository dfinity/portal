import React from "react";
import AnimateSpawn from "../../Common/AnimateSpawn";
import transitions from "@site/static/transitions.json";

import { motion } from "framer-motion";
import Link from "@docusaurus/Link";
import LinkArrowDown from "../../Common/Icons/LinkArrowDown";
import LinkArrowUpRight from "../../Common/Icons/LinkArrowUpRight";
import LinkArrowRight from "../../Common/Icons/LinkArrowRight";

const FeaturesSection = () => {
  return (
    <section className="bg-[#1B025A] text-white pt-30 md:pt-56" id="technology">
      <div className="mb-12 md:mb-30 container-10">
        <h2 className="tw-heading-3 md:tw-title-lg mb-0 md:w-8/10">
          Amazing, you made it this far. Discover more{" "}
          <span className="text-gradient-purple md:tw-heading-60">
            ICP key features:
          </span>
        </h2>
      </div>

      <AnimateSpawn
        className="container-12 mt-6 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-5"
        el={motion.section}
        variants={transitions.container}
      >
        <motion.div
          className="flex-1 bg-white rounded-xl text-black p-12 flex flex-col gap-3 md:gap-4 text-center items-center justify-between"
          variants={transitions.item}
        >
          <img
            src="/img/what-is-the-ic/icon-sovereign.svg"
            alt=""
            loading="lazy"
            className="w-30"
          />
          <h3 className="tw-lead md:tw-title-sm mb-0">Sovereign network</h3>
          <p className="mb-0 tw-paragraph-sm text-black/60">
            If your enterprise, government or Web3 service builds on centralized
            traditional IT, there are kill switches and backdoors, which deny
            you true sovereignty. Build on the network instead.
          </p>
          <p className="mb-0 -mx-3">
            <Link className="link-primary " href="/node-providers">
              <LinkArrowRight />
              Become a Node Provider
            </Link>
          </p>
        </motion.div>
        <motion.div
          className="flex-1 bg-white rounded-xl text-black p-12 flex flex-col gap-3 md:gap-4 text-center items-center justify-between"
          variants={transitions.item}
        >
          <img
            src="/img/what-is-the-ic/icon-web3-ois.svg"
            alt=""
            loading="lazy"
            className="w-30"
          />
          <h3 className="tw-lead md:tw-title-sm mb-0">Web2 compatible</h3>
          <p className="mb-0 tw-paragraph-sm text-black/60">
            Googleable Web experiences served by Smart contracts. True World
            Computer capabilities with Web2 APIs validated by consensus.
          </p>
          <p className="mb-0  -mx-3">
            <Link className="link-primary" href="/capabilities">
              <LinkArrowRight />
              ICP Capabilities Overview
            </Link>
          </p>
        </motion.div>
        <motion.div
          className="flex-1 bg-white rounded-xl text-black p-12 flex flex-col gap-3 md:gap-4 text-center items-center justify-between"
          variants={transitions.item}
        >
          <img
            src="/img/what-is-the-ic/icon-next-gen-ai.svg"
            alt=""
            loading="lazy"
            className="w-30"
          />
          <h3 className="tw-lead md:tw-title-sm mb-0">Multi-Chain</h3>
          <p className="mb-0 tw-paragraph-sm text-black/60">
            The Internet Computer is currently adding support for Web3 “AI
            compute units.” AI will also run on the network, supporting native
            web3 integrations, and trustlessness combinations of models and
            data.
          </p>
          <p className="mb-0 -mx-3 flex flex-col gap-3 items-center">
            <Link className="link-primary" href="/bitcoin">
              <LinkArrowRight />
              Bitcoin on ICP
            </Link>
            <Link className="link-primary" href="/ethereum-integration">
              <LinkArrowRight />
              Ethereum on ICP
            </Link>
          </p>
        </motion.div>
        <motion.div
          className="flex-1 bg-white rounded-xl text-black p-12 flex flex-col gap-3 md:gap-4 text-center items-center justify-between"
          variants={transitions.item}
        >
          <img
            src="/img/what-is-the-ic/icon-tamperproof.svg"
            alt=""
            loading="lazy"
            className="w-30"
          />
          <h3 className="tw-lead md:tw-title-sm mb-0">Tamperproof</h3>
          <p className="mb-0 tw-paragraph-sm text-black/60">
            Canister software is tamperproof through Chain-Key Cryptography. It
            doesn’t need to be protected by a firewall, and can’t be infected
            with ransomware. Because the Internet Computer is created by
            advanced math, there are no backdoors.
          </p>
          <p className="mb-0 -mx-3">
            <Link
              className="link-primary"
              href="/how-it-works#Chain-key-technology"
            >
              <LinkArrowRight />
              What's Chain-Key Cryptography
            </Link>
          </p>
        </motion.div>
        <motion.div
          className="flex-1 bg-white rounded-xl text-black p-12 flex flex-col gap-3 md:gap-4 text-center items-center justify-between"
          variants={transitions.item}
        >
          <img
            src="/img/what-is-the-ic/icon-autonomous.svg"
            alt=""
            loading="lazy"
            className="w-30"
          />
          <h3 className="tw-lead md:tw-title-sm mb-0">Autonomous</h3>
          <p className="mb-0 tw-paragraph-sm text-black/60">
            Canisters can be made unmodifiable, creating permanent logic on the
            network, or placed under the control of autonomous governance –
            empowering communities to run Web3, or securing an enterprise
          </p>
          <p className="mb-0">
            <Link className="link-primary" href="/nns">
              <LinkArrowRight />
              Staking & Governance
            </Link>
          </p>
        </motion.div>
        <motion.div
          className="flex-1 bg-white rounded-xl text-black p-12 flex flex-col gap-3 md:gap-4 text-center items-center justify-between"
          variants={transitions.item}
        >
          <img
            src="/img/what-is-the-ic/icon-simple.svg"
            alt=""
            loading="lazy"
            className="w-30"
          />
          <h3 className="tw-lead md:tw-title-sm mb-0">Cost effective</h3>
          <p className="mb-0 tw-paragraph-sm text-black/60">
            The global spend on IT personnel is now $1.8 trillion. Canister
            software greatly simplifies the development and maintenance of
            online systems and services, driving cost savings, and making you
            faster to market
          </p>
          <p className="mb-0">
            <span className="tw-heading-5">$5 / GB / year</span>
          </p>
        </motion.div>
      </AnimateSpawn>
    </section>
  );
};

export default FeaturesSection;
