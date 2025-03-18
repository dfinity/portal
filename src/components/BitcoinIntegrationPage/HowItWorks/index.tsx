import AnimateSpawn from "@site/src/components/Common/AnimateSpawn";
import HeroImg from "@site/static/img/bitcoin-integration/btc_integration_hero.svg";
import transitions from "@site/static/transitions.json";
import { motion } from "framer-motion";
import React from "react";
import VideoCard from "../../Common/VideoCard";
import Link from "@docusaurus/Link";
import LinkArrowRight from "../../Common/Icons/LinkArrowRight";
import VideoSlider from "../VideoSlider";

function Index() {
  return (
    <>
      <AnimateSpawn
        el={motion.section}
        variants={transitions.container}
        className="container-10 mt-48 mb-20 md:mb-40 "
      >
        <motion.h2
          variants={transitions.item}
          className="tw-heading-5 md:tw-heading-3 text-gradient mb-0 md:w-9/12"
        >
          Become a part of the Bitcoin economy with the programming capabilities
          of ICP. Build DEXs offering BTC or BRC20 trading pairs, lending
          markets using Ordinals as collateral, or Web3 SocialFi services
          allowing satoshis to be sent via chat messages.
        </motion.h2>
        <div className="mt-12 md:mt-20">
          <VideoSlider />
        </div>
      </AnimateSpawn>

      <AnimateSpawn
        el={motion.section}
        variants={transitions.container}
        className="container-10 "
      >
        <div>
          <AnimateSpawn
            variants={transitions.container}
            className="bg-white flex flex-col md:flex-row mb-6 mt-12 md:mt-40 md:mb-12 rounded-xl overflow-hidden"
          >
            <motion.div>
              <aside className="container-10 md:flex md:items-center mt-6 md:mt-0 !pl-0	!pr-0">
                <div className="lg:w-[65%] md:w-[58%] md:px-12 px-10 pt-6 pb-1 md:pb-12 md:pt-12 gap-8 md:pr-12 ">
                  <motion.h5
                    className="tw-heading-5 md:tw-heading-4 mb-3 sm:mb-6 "
                    variants={transitions.item}
                  >
                    Deuterium Milestone Live
                  </motion.h5>
                  <motion.p className="tw-paragraph-sm md:tw-paragraph text-black/60">
                    ICP's Chain Fusion now supports threshold Schnorr signing.
                    ICP smart contracts can now generate Schnorr signatures in a
                    distributed way. This allows one to sign taproot
                    transactions or manage BRC-20 tokens directly from an ICP
                    smart contract.
                  </motion.p>
                  <motion.p className="tw-paragraph-sm md:tw-paragraph text-black/60">
                    The milestone also expands ICP's Bitcoin integration by
                    providing access to all block headers, which makes it
                    possible to verify full Bitcoin blocks onchain in a secure
                    manner.
                  </motion.p>
                  <p className="mt-8 mb-8 md:mb-0">
                    <Link
                      className="link-primary link-with-icon"
                      href="/roadmap#Chain%20Fusion-Deuterium"
                    >
                      <LinkArrowRight></LinkArrowRight>
                      READ MORE
                    </Link>
                  </p>
                </div>
                <div className="lg:w-[35%] md:w-[42%] relative ">
                  <div className="pointer-events-none">
                    <img
                      className="w-full h-auto object-cover"
                      src="/img/bitcoin-integration/deuterium-milestone-2.webp"
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
              image="https://internetcomputer.org/img/bitcoin-integration/video_thumb.webp"
              title="BTC <> ICP"
              label=""
              link={`https://www.youtube.com/watch?v=eTe6IXQJNUs`}
              description="ICP has protocol-level integration with the Bitcoin network, enabling dapps to seamlessly interact with Bitcoin and granting users access to the Bitcoin economy like never before with ckBTC."
            />{" "}
          </motion.div>
        </div>
      </AnimateSpawn>
    </>
  );
}

export default Index;
