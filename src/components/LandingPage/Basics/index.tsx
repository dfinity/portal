import Link from "@docusaurus/Link";
import transitions from "@site/static/transitions.json";
import ArrowRight from "@site/static/img/arrow-right.svg";
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
              Web3 is about democracy
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
            <AnimateSpawn className="md:w-8/10" variants={transitions.item}>
              <p className="mb-6 tw-lead-sm md:tw-lead text-black-60">
                The{" "}
                <span className="tw-heading-6 md:tw-heading-5 text-infinite">
                  Internet Computer
                </span>{" "}
                can run open internet services,
                such as social networks, that run fully 
                on-chain under the control of community DAOs. End-users can acquire governance 
                tokens and become owners, and become part of industrious virtual teams that 
                drive success. Each open internet service is
                configured and updated by its own advanced DAO, called a "Service Nervous System,"
                providing full ownership to a community. This can also fundraise from the 
                decentralized ecosystem, enabling communities of developers and users to be 
                successful from anywhere, democratizing access to the tech economy.
              </p>            
            </AnimateSpawn>
            <AnimateSpawn className="mb-6" variants={transitions.item}>
              <Link className="button-primary" href="/sns">
                Service Nervous System Basics
              </Link>   
            </AnimateSpawn>

            <AnimateSpawn variants={transitions.item}>
              <Link className="link-external"
                    href="https://medium.com/dfinity/announcing-internet-computer-mainnet-and-a-20-year-roadmap-790e56cbe04a"
              >
                Learn about open internet services from the "20 Year Roadmap" post
              </Link>
            </AnimateSpawn>
          </div>
        </div>
      </AnimateSpawn>
    </section>
  );
}
