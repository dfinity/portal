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

        <div className="md:h-[245px] flex flex-col md:flex-row rounded-xl overflow-hidden mb-6 mt-12 md:mt-40 md:mb-12">
          <div className="md:w-[150%] flex bg-white-80 border border-solid border-white p-8 pb-2 md:p-8 backdrop-blur-2xl">
            <div className="self-start">
              <motion.h5
                className="tw-heading-5 md:tw-heading-4 mb-1 sm:mb-3 "
                variants={transitions.item}
              >
                Deuterium milestone is now live!
              </motion.h5>
              <motion.p className="tw-paragraph-sm md:tw-paragraph text-black/60">
                ICP's Chain Fusion now supports threshold Schnorr signing. ICP
                smart contracts can generate Schnorr signatures in a distributed
                way, which, together with the bitcoin integration, can be used
                for signing taproot transactions and more.{" "}
              </motion.p>

              <p className="mt-4 md:mt-8">
                <Link
                  className="link-primary link-with-icon"
                  href="https://internetcomputer.org/roadmap#Chain%20Fusion-Deuterium"
                >
                  <LinkArrowRight></LinkArrowRight>
                  READ MORE
                </Link>
              </p>
            </div>
          </div>{" "}
          <img
            src="/img/bitcoin-integration/deuterium-v2.jpg"
            className="w-full h-full object-cover"
          />
        </div>
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
