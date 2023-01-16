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
            The <span className="tw-heading-6 md:tw-heading-5 text-infinite">Internet Computer</span> is
            a <b>World Computer blockchain</b> that can host a social network, or large enterprise
            system &#8212; removing the need for centralized IT. At last, advanced blockchain code
            that is tamperproof and unstoppable 
             can truly scale, and runs with incredible efficiency, as though on
            a centralized platform, while serving web experiences to end-users,
            interacting with Web2, and trustlessly creating transactions on other chains. The
              decentralized future of all compute has begun. <br/><b>Join the movement.</b>
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
              Internet Computer capabilties
            </Link> 

          </AnimateSpawn>
          <AnimateSpawn el={motion.p} variants={transitions.item}>
          <Link className="button-primary" href="/developers">
                Build Something
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
          Proof of Useful Work
        </AnimateSpawn>
        <div className="md:ml-3/10">
          <AnimateSpawn
            el={motion.p}
            className="tw-lead-sm md:tw-lead mb-8"
            variants={transitions.item}
          >
            The <span className="tw-heading-6 md:tw-heading-5 text-infinite">Internet Computer</span> scales
            efficiently, but is not Proof-of-Stake, and has no validator nodes running on the centralized 
            cloud. It is hosted by a sovereign network of dedicated "node machines." To participate 
            successfully, nodes must produce the same number of blocks as other machines in their cohort,
            without deviation. In a scheme of Proof-of-Useful-Work (PoUW), useful smart contract computation
            is their work. Nodes form into subnet blockchains, and then into a unified limitless 
            blockchain, using game-changing Chain Key Crypto.
          </AnimateSpawn>
          <AnimateSpawn el={motion.p} className="mb-6" variants={transitions.item}>
            <Link href="/how-it-works" className="button-primary">
              How the Internet Computer works
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
          Network Nervous System
        </AnimateSpawn>
        <div className="md:ml-3/10">
          <AnimateSpawn
            el={motion.p}
            className="tw-lead-sm md:tw-lead mb-8"
            variants={transitions.item}
          >
            Traditional blockchains get updated, and evolve, through a painful and cumbersome process. A protocol
            "hard fork" is developed, and a central group of insiders, working at a foundation, or a
            corporation, then helps coordinate those running nodes upgrade their network software.
            The <span className="tw-heading-6 md:tw-heading-5 text-infinite">Internet Computer</span>,
            by contrast, is controlled by an advanced DAO, which is integrated into its protocols, and 
            completely automates and decentralizes node machine protocol upgrades. The network protocol
            constantly evolves and adapts, without backroom machinations.
          </AnimateSpawn>
          <AnimateSpawn
            el={motion.p}
            className="mb-6"
            variants={transitions.item}
          >
          </AnimateSpawn>
          <AnimateSpawn el={motion.p} variants={transitions.item}>
            <Link
              className="link-external"
              href="https://nns.ic0.app"
            >
              Visit the Network Nervous System
            </Link>
          </AnimateSpawn>
        </div>
      </div>         
    </section>
  );
}
