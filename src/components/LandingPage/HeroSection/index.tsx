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
            The <span className="tw-heading-6 md:tw-heading-5 text-infinite">Internet Computer</span> is the first <b>World Computer</b>, and is unlike 
            anything else in existence today. The network hosts tamperproof and 
            unstoppable code at unlimited scale that runs with efficiency 
            comparable to traditional software hosted on centralized IT platforms, 
            such as cloud services. This "blockchain code" has gained essential new 
            capabilities, and can securely serve web experiences directly into web 
            browsers, process and store vast amounts of data, interact with Web 2.0 
            infrastructure, and run transactions on other blockchains, enabling 
            trustless multi-chain. Almost all online systems and services can now be 
            built fully on-chain. The end-to-end decentralized future of <i>all</i> compute 
            has begun, and Web3 is booming, on limitless and climate-friendly World Computer blockchain. Join the movement.
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
              Try building on World Computer
            </Link>
          </AnimateSpawn>
        </div>
      </div>
    </section>
  );
}
