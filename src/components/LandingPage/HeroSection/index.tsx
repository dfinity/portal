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
          className="tw-heading-3 md:tw-heading-1 mb-6 md:mb-16 text-transparent bg-clip-text gradient-text"
          variants={transitions.item}
        >
          World Computer Blockchain
        </AnimateSpawn>
        <div className="md:ml-3/10">
          <AnimateSpawn
            el={motion.p}
            className="tw-lead-sm md:tw-lead mb-8"
            variants={transitions.item}
          >
            The Internet Computer provides World Computer functionality. Any
            online system or web3 service can be built 100% on-chain, in fully
            decentralized form, using smart contracts that serve web
            experiences, create transactions on other blockchains, and have
            20,000x greater efficiency. Powered by breakthrough Chain Key
            Crypto.
          </AnimateSpawn>
          <AnimateSpawn
            el={motion.p}
            className="mb-6"
            variants={transitions.item}
          >
            <Link href="" className="button-primary">
              Create your Internet Identity
            </Link>
          </AnimateSpawn>
          <AnimateSpawn el={motion.p} variants={transitions.item}>
            <Link className="link-primary inline-flex items-center gap-2">
              <ArrowRight></ArrowRight>
              Start coding
            </Link>
          </AnimateSpawn>
        </div>
      </div>
    </section>
  );
}
