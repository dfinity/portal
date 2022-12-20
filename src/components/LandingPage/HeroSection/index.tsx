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
          World Computer: No limits
        </AnimateSpawn>
        <div className="md:ml-3/10">
          <AnimateSpawn
            el={motion.p}
            className="tw-lead-sm md:tw-lead mb-8"
            variants={transitions.item}
          >
            The Internet Computer (or "ICP") <b>is the first World Computer</b>,
            and is unlike anything else in existence today. The network can host
            tamperproof and unstoppable smart contract code that runs with
            efficiency comparable to traditional software hosted by centralized
            IT platforms, such as cloud services. Smart contract technology has
            also gained essential missing capabilities, and can now securely
            serve web experiences into the web browsers of end users, interact
            with Web 2.0 infrastructure, and create signed transactions that run
            on other blockchains, enabling trustless multi-chain. The end-to-end
            decentralization of almost all online systems and services is now
            possible. The fully decentralized on-chain future of all compute has
            begun, and Web3 is already booming, on limitless and climate-friendly
            World Computer blockchain. Join the movement.
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
