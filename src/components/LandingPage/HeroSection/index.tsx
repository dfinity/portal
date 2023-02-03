import Link from "@docusaurus/Link";
import ArrowRight from "@site/static/img/arrow-right.svg";
import { motion } from "framer-motion";
import React from "react";
import AnimateSpawn from "../../Common/AnimateSpawn";
import transitions from "@site/static/transitions.json";

export default function Hero(): JSX.Element {
  return (
    <section className="overflow-hidden relative z-10" id="introduction">
      <div className="container-10 mt-20 mb-20 md:my-40">
        <AnimateSpawn
          el={motion.h2}
          className="tw-heading-3 md:tw-heading-2 mb-6 md:mb-16 text-transparent bg-clip-text gradient-text"
          variants={transitions.item}
        >
          Blockchain Singularity
        </AnimateSpawn>
        <div className="md:ml-3/10">
          <AnimateSpawn
            el={motion.p}
            className="tw-lead-sm md:tw-lead mb-8"
            variants={transitions.item}
          >
            Today, Web3 really runs on Big Tech's cloud. Blockchains can host tokens, but only
            tiny amounts of data and compute.
            <br/><br/>
            Tomorrow, blockchains will host that too, and fully decentralize everything from simple dApps, to billion-user social networks,
            games, video streaming, orderbook DEXs, and enterprise systems.
            <br/><br/>
            It's already happening at scale on the first true World Computer:<br/>
            <span className="tw-heading-6 md:tw-heading-5 text-infinite">Internet Computer #ICP</span>
            <br/><br/>
            <b>Join the movement.</b>
          </AnimateSpawn>
          <AnimateSpawn el={motion.p} variants={transitions.item}>
            
          <Link
              className="link-primary inline-flex items-center gap-2"
              href="/basics"
            >
              <ArrowRight></ArrowRight>
              Internet Computer basics
            </Link>
            <br/>
            <Link
              className="link-primary inline-flex items-center gap-2"
              href="/features"
            >
              <ArrowRight></ArrowRight>
              Internet Computer capabilities
            </Link>
          </AnimateSpawn>
          <Link
              className="link-external"
              href="https://wiki.internetcomputer.org/wiki/History">
              Wiki history of the Internet Computer
            </Link>
        </div>
      </div>     
      <div className="container-10 mt-20 mb-20 md:my-40">
        <AnimateSpawn
          el={motion.h2}
          className="tw-heading-3 md:tw-heading-2 mb-6 md:mb-16 text-transparent bg-clip-text gradient-text"
          variants={transitions.item}
        >
          Proof of Useful Work
        </AnimateSpawn>
        <div className="md:ml-3/10">
          <AnimateSpawn
            el={motion.p}
            className="tw-lead-sm md:tw-lead mb-8"
            variants={transitions.item}
          >
            The <span className="tw-heading-6 md:tw-heading-5 text-infinite">Internet Computer</span> is <i>not</i> a
            Proof of Stake (PoS) blockchain created by "validator nodes" running on Big Tech's cloud.
            It is formed by a <i>sovereign network</i> of standardized "node machines," which hardware is operated by independent parties.
            To participate, nodes must produce the same number of blocks as others in their cohort,
            without deviation. In a scheme of Proof-of-Useful-Work (PoUW), replicated smart contract computation
            is their work, driving optimal efficiency. Nodes form into subnet blockchains, and then into a unified limitless 
            blockchain, using game-changing Chain Key Crypto.
          </AnimateSpawn>
          <AnimateSpawn el={motion.p} className="mb-6" variants={transitions.item}>
            <Link href="/how-it-works" className="button-primary">
              Review ICP Technology
            </Link>            
          </AnimateSpawn>
          <AnimateSpawn el={motion.p} variants={transitions.item}>
            <Link
              className="link-external"
              href="https://wiki.internetcomputer.org/wiki/Proof_of_Useful_Work">
              Learn more about Proof-of-Useful-Work
            </Link>
          </AnimateSpawn>         
        </div>
      </div>    
      <div className="container-10 mt-20 mb-20 md:my-40">
        <AnimateSpawn
          el={motion.h2}
          className="tw-heading-3 md:tw-heading-2 mb-6 md:mb-16 text-transparent bg-clip-text gradient-text"
          variants={transitions.item}
        >
          Intelligent Blockchain
        </AnimateSpawn>
        <div className="md:ml-3/10">
          <AnimateSpawn
            el={motion.p}
            className="tw-lead-sm md:tw-lead mb-8"
            variants={transitions.item}
          >
            Traditional blockchains evolve and adapt through a painful and cumbersome process. A protocol
            "hard fork" is developed, and a central group of insiders, working at a foundation, or a
            corporation, then coordinates those running nodes, or validators, in upgrading their network software.
            The <span className="tw-heading-6 md:tw-heading-5 text-infinite">Internet Computer</span> network,
            by contrast, runs under the control of an advanced DAO, called the Network Nervous System (or NNS), which 
            acts as the brain of the blockchain, and completely automates and decentralizes processes such as
            protocol upgrades &mdash; removing the need for backroom machinations by insiders, and powering
            fast and seamless evolution.
          </AnimateSpawn>
          <AnimateSpawn
            el={motion.p}
            className="mb-6"
            variants={transitions.item}
          >
            <Link href="/nns" className="button-primary">
              Review the NNS
            </Link> 
          </AnimateSpawn>
          <AnimateSpawn el={motion.p} variants={transitions.item}>
            <Link
              className="link-external"
              href="https://nns.ic0.app"
            >
              Try the Network Nervous System
            </Link>
          </AnimateSpawn>
        </div>
      </div>         
    </section>
  );
}
