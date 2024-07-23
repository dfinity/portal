import AnimateSpawn from "@site/src/components/Common/AnimateSpawn";
import HeroImg from "@site/static/img/bitcoin-integration/btc_integration_hero.svg";
import transitions from "@site/static/transitions.json";
import { motion } from "framer-motion";
import React from "react";
import VideoCard from "../../Common/VideoCard";
import Link from "@docusaurus/Link";
import LinkArrowRight from "../../Common/Icons/LinkArrowRight";

function Index() {
  return (
    <AnimateSpawn
      el={motion.section}
      variants={transitions.container}
      className="container-10 mt-48 flex gap-8 md:gap-1/10 items-center flex-col md:flex-row mb-20 md:mb-40"
    >
      <div>
        <motion.h2
          variants={transitions.item}
          className="tw-heading-5 md:tw-heading-3 text-gradient mb-0 md:w-9/12"
        >
          Become a part of the Bitcoin economy with the programming capabilities
          of ICP. Build DEXs offering BTC or BRC20 trading pairs, lending
          markets using Ordinals as collateral, or Web3 SocialFi services
          allowing satoshis to be sent via chat messages.
        </motion.h2>
        <AnimateSpawn
          variants={transitions.container}
          className="bg-white px-10 md:px-16 pt-6 pb-1 md:pb-12 md:pt-12 gap-8 t-12 mb-6 mt-12 md:mt-40 md:mb-12 rounded-xl overflow-hidden"
        >
          <motion.div>
            <aside className="container-10 md:flex md:items-center mt-6 md:mt-0 !pl-0	!pr-0">
              <div className="md:w-[75%] md:pr-12">
                <motion.h5
                  className="tw-heading-5 md:tw-heading-4 mb-3 sm:mb-6 "
                  variants={transitions.item}
                >
                  Deuterium Test Phase Live{" "}
                </motion.h5>
                <motion.p className="tw-paragraph-sm md:tw-paragraph text-black/60">
                  ICP's Chain Fusion now supports threshold Schnorr signing. ICP
                  smart contracts can generate Schnorr signatures in a
                  distributed way, which, together with the bitcoin integration,
                  can be used for signing taproot transactions and more.{" "}
                </motion.p>
                <motion.ul
                  className="mb-0 mt-4 md:mt-6 tw-paragraph md:tw-lead-sm text-bold text-black"
                  variants={transitions.item}
                >
                  <li className="mb-2">
                    Beta release now available for testing
                  </li>
                  <li className="mb-2">
                    Sign taproot transactions or manage BRC-20 tokens directly
                    from an ICP smart contract.
                  </li>
                </motion.ul>
                <p className="mb-0 mt-8">
                  <Link className="link-primary link-with-icon" href="/roadmap">
                    <LinkArrowRight></LinkArrowRight>
                    READ MORE
                  </Link>
                </p>
              </div>
              <div className="md:w-[25%] relative md:mt-6 md:mb-3 ">
                <div className="pointer-events-none md:absolute md:-right-20 md:top-1/2 translate-y-1/12 md:-translate-y-1/2 w-[150%] md:w-auto -translate-x-[18.5%] md:-translate-x-[5%] ">
                  <motion.img
                    className="w-[91%] md:w-full h-full object-cover"
                    src="/img/bitcoin-integration/deuterium-milestone.webp"
                    alt="roadmap"
                  />
                </div>
              </div>
            </aside>
          </motion.div>
        </AnimateSpawn>
        <motion.div
          variants={transitions.item}
          className="mt-12 mb-6 md:mt-40 md:mb-12"
        >
          <VideoCard
            image="img/bitcoin-integration/video_thumb.webp"
            title="BTC <> ICP"
            label=""
            link={`https://www.youtube.com/watch?v=eTe6IXQJNUs`}
            description="ICP has protocol-level integration with the Bitcoin network, enabling dapps to seamlessly interact with Bitcoin and granting users access to the Bitcoin economy like never before with ckBTC."
          />{" "}
        </motion.div>
      </div>
    </AnimateSpawn>
  );
}

export default Index;
