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
          Build anything, better
        </AnimateSpawn>
        <div className="md:ml-3/10">
          <AnimateSpawn
            el={motion.p}
            className="tw-lead-sm md:tw-lead mb-8"
            variants={transitions.item}
          >
            The <span className="tw-heading-6 md:tw-heading-5 text-infinite">Internet Computer</span> is the first <b>World Computer</b>, and
            is unlike anything else in existence today. Just like other blockchains,
            it hosts tamperproof and unstoppable code. However, the hosted code scales,
            and runs with efficiency that is tens of thousands of times greater, as
            though it were on a centralized platform like the cloud. Moreover, the
            code can securely serve web experiences to users, interact with Web2.0,
            and trustlessly create transactions on other chains. Even a social network,
            or large-scale enterprise system, can now run end-to-end on blockchain.
            The decentralized future of all compute has begun. Join the movement.
          </AnimateSpawn>
          <AnimateSpawn
            el={motion.p}
            className="mb-6"
            variants={transitions.item}
          >
            <Link href="/showcase" className="button-primary">
              Explore Open Internet Services and Dapps
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
