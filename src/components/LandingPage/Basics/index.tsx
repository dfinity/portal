import Link from "@docusaurus/Link";
import transitions from "@site/static/transitions.json";
import { motion } from "framer-motion";
import React from "react";
import AnimateSpawn from "../../Common/AnimateSpawn";

export default function BasicsSection(): JSX.Element {
  return (
    <section className="relative " id="basics">
      <AnimateSpawn
        className="md:container-12"
        variants={transitions.container}
      >
        <div className="absolute h-[200px] md:h-[730px] left-0 right-0 bottom-0 from-[#A4497F] to-infinite bg-gradient-to-t z-[10]"></div>
        <div className="absolute h-[200px] md:h-[730px] left-0 right-0 bottom-0 from-[#F1EEF5] to-transparent bg-gradient-to-b z-[10]"></div>

        <div className="md:rounded-[32px] backdrop-blur-2xl bg-white-60 px-6 md:px-0 z-[11] relative">
          <div className="md:w-8/12 md:mx-auto text-black py-20 md:py-30">
            <AnimateSpawn
              el={motion.h2}
              className="tw-heading-3 md:tw-heading-60 mb-16 text-center md:text-left"
              variants={transitions.item}
            >
              Decentralization++
            </AnimateSpawn>
            <AnimateSpawn
              className="flex flex-col-reverse md:flex-row justify-between mb-16 gap-6 md:gep-0"
              variants={transitions.container}
            >
              <motion.div
                className="rounded-2xl bg-gradient-100 from-[#3B00B9] to-[#2586B6DE] flex flex-col items-center justify-center text-white py-8 md:py-0 md:h-[220px] px-12"
                variants={transitions.item}
              >
                <span className="tw-heading-7-caps md:text-[24px] md:leading-7 font-bold md:tracking-[1.39px] mb-2 md:mb-4">
                  WEB 3.0
                </span>
                <span className="tw-heading-60 md:text-[80px] md:leading-[85px] font-bold">
                  Own
                </span>
              </motion.div>
              <motion.div
                className="flex flex-col items-center justify-center text-black pt-8 pb-12 md:py-0 md:h-[220px] px-8"
                variants={transitions.item}
              >
                <span className="text-[12px] leading-4 font-bold tracking-[0.71px] md:tw-heading-7-caps mb-1 md:mb-3">
                  WEB 2.0
                </span>
                <span className="tw-heading-3 md:tw-heading-60">Write</span>
              </motion.div>
              <motion.div
                className="flex flex-col items-center justify-center text-black-60 py-6 md:py-0 md:h-[220px] px-8"
                variants={transitions.item}
              >
                <span className="text-[12px] leading-4 font-bold tracking-[0.71px] mb-1 md:mb-2">
                  WEB 1.0
                </span>
                <span className="tw-heading-3">Read</span>
              </motion.div>
            </AnimateSpawn>
            <AnimateSpawn className="md:w-7/10" variants={transitions.item}>
              <p className="mb-6 tw-lead-sm md:tw-lead text-black-60">
                The{" "}
                <span className="tw-heading-6 md:tw-heading-5 text-infinite">
                  Internet Computer
                </span>{" "}
                makes it possible to escape the web2 dilemma of users being monetized by the services they use.
                Instead, with IC dapps, users become the owners of the services and decide on how their services should evolve.
                This is made possible through a new form of on-chain governance for online services that are running 100% on chain, for the 
                very first time. There is no need for centralized traditional IT, such as cloud services, 
                which otherwise have to be used in Web3. Since all code and data is fully decentralized, 
                community DAOs can control services in a completely decentralized way. No companies, boards of directors, or CEOs required.
              </p>
              <p className="mb-8">
                <Link className="button-primary" href="/basics">
                  Learn the basics
                </Link>
              </p>
              <p className="mb-0">
                <Link
                  className="link-external"
                  href="https://internetcomputer.org/features"
                >
                  Cool ICP features
                </Link>
              </p>
            </AnimateSpawn>
          </div>
        </div>
      </AnimateSpawn>
    </section>
  );
}
