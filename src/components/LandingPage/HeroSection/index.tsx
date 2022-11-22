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
          className="tw-heading-3 md:tw-heading-2 mb-6 md:mb-16 text-transparent bg-clip-text gradient-text"
          variants={transitions.item}
        >
          World Computer Blockchain:
          <br className="hidden md:inline" /> A New Paradigm
        </AnimateSpawn>
        <div className="md:ml-3/10">
          <AnimateSpawn
            el={motion.p}
            className="tw-lead-sm md:tw-lead mb-8"
            variants={transitions.item}
          >
            The Internet Computer (ICP) is the first World Computer blockchain,
            powered by innovations in cryptography and computer science derived
            from{" "}
            <Link
              href="https://wiki.internetcomputer.org/wiki/History"
              className="link-subtle"
            >
              deep crypto research begun in 2015
            </Link>
            . It is a limitless blockchain that runs with 20,000X more efficiently
            than the next best, and hosts smart contract code that directly serves
            web experiences to end users, interacts with Web2, and creates signed
            transactions that run on other blockchains. It supports end-to-end
            decentralization of online systems and services, which can now be built
            using just smart contracts, for the first time, without need for
            centralized traditional IT and Big Tech's cloud services.
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
