import React, { FC } from "react";

import AnimateSpawn from "../Common/AnimateSpawn";
import Link from "@docusaurus/Link";
import TwitterIcon from "@site/static/img/ethdenver/twitter.svg";
import { motion } from "framer-motion";
import transitions from "@site/static/transitions.json";
import GradientBackground from "./GradientBackground";

const Hero: FC<{
  id: string;
  heroRef: React.RefObject<HTMLDivElement>;
}> = ({ id, heroRef }) => {
  return (
    <section id={id} className="relative">
      <div className="absolute top-0 right-0 bottom-0 left-0 -z-1">
        <GradientBackground
          color1="#5015FF"
          color2="#D897B4"
          segments={[
            [1, 2, 4]
          ]}
          isFullWidth={true}
        />
      </div>
      <AnimateSpawn variants={transitions.container}>
        <div
          className="overflow-hidden text-black pt-20"
          ref={heroRef}
        >
          <div className="container-12 pt-12 mb-8 md:mb-20 md:pt-36">

            <div className="@container uppercase mb-16 md:mb-0">
              <motion.h1
                className="tw-heading-alt-1 md:text-right text-[18vw] md:text-[14cqi]"
                variants={transitions.slideInFromRight}
              >
                <span className="block">UNIFYING WEB3</span>
                <span className="block">AND AI</span>
              </motion.h1>
            </div>

            <div className="flex justify-between md:items-end flex-col md:flex-row gap-12 md:gap-8">
              <div className="md:w-5/10">
                <motion.h2
                  className="tw-heading-5 md:tw-heading-3 mb-6 md:mb-8"
                  variants={transitions.item}
                >
                  ETHDenver 2025<br />
                  Booth No. 509<br />
                  <time dateTime="2025-02-23">February 23</time> – <time dateTime="2025-03-02">March 2</time>
                </motion.h2>
                <motion.p
                  className="tw-lead-sm md:tw-lead text-black-60 mb-8"
                  variants={transitions.item}
                >
                  Augment your EVM-based applications with ICP superpowers. Smart contracts gain access to Bitcoin DeFi, threshold signing services, governance frameworks, passkey authentication, multi-approver wallets, reverse gas fees, and much more.
                </motion.p>

                <motion.p
                  className="flex flex-col items-center flex-wrap md:flex-row gap-8"
                  variants={transitions.item}
                >
                  <Link
                    href="https://lu.ma/v7p01asi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button-primary"
                  >
                    Register now
                  </Link>
                  <Link
                    href="https://www.ethdenver.com/buidl/buidlathon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-primary"
                  >
                    Join the Hackathon
                  </Link>
                  <Link
                    className="link-primary link-with-icon"
                    href="https://x.com/dfinity"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <TwitterIcon className="w-6 h-6" />
                    Follow us for event updates
                  </Link>
                </motion.p>

              </div>

                <motion.div
                className="w-full md:w-3/12 max-w-[16rem] "
                variants={transitions.item}
                >
                <Link
                  href="https://www.ethdenver.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img 
                  src="/img/ethdenver/logo-ethdenver.png"
                  alt="Logo ETHDenver"
                  className="w-full pb-2" 
                  />
                </Link>
                </motion.div>
            </div>

          </div>
        </div>
      </AnimateSpawn>
    </section>
  );
};

export default Hero;
