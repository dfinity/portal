import Link from "@docusaurus/Link";
import ArrowRight from "@site/static/img/arrow-right.svg";
import { motion } from "framer-motion";
import React from "react";
import AnimateSpawn from "../../Common/AnimateSpawn";
import transitions from "@site/static/transitions.json";

export default function Hero(): JSX.Element {
  return (
    <section className="overflow-hidden relative z-10" id="home">
      <div className="container-10 mt-20 mb-20 md:my-40">
        <AnimateSpawn
          el={motion.h2}
          className="tw-heading-60 md:tw-heading-1 mb-6 md:mb-16 text-transparent bg-clip-text gradient-text"
          variants={transitions.item}
        >
          A World Computer blockchain running
          <br className="hidden md:inline" /> at webspeed
        </AnimateSpawn>
        <div className="md:ml-3/10">
          <AnimateSpawn
            el={motion.p}
            className="tw-lead-sm md:tw-lead mb-8"
            variants={transitions.item}
          >
            The Internet Computer (ICP) is a World Computer that provides a
            complete IT stack on which any online system or Web3 service can be
            built in a fully decentralized form, 100% on-chain. ICP is the only
            blockchain with smart contracts that serve web experiences, create
            transactions on other chains, directly integrate with web2 APIs
            without oracles, and run 20,000x more efficiently. No centralized
            cloud. Simply powered by breakthrough Chain-key Cryptography.
          </AnimateSpawn>
          <AnimateSpawn
            el={motion.p}
            className="mb-6"
            variants={transitions.item}
          >
            <Link href="/showcase" className="button-primary">
              Try Web3 apps on ICP
            </Link>
          </AnimateSpawn>
          <AnimateSpawn el={motion.p} variants={transitions.item}>
            <Link
              className="link-primary inline-flex items-center gap-2"
              href="/developers"
            >
              <ArrowRight></ArrowRight>
              Build your own Web3 app
            </Link>
          </AnimateSpawn>
        </div>
      </div>
    </section>
  );
}
