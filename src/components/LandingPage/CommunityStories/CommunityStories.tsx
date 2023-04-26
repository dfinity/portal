import React from "react";
import OpenChatCard from "../../Common/OpenChatCard/OpenChatCard";

const CommunityStories: React.FC = ({}) => {
  return (
    <>
      <div className="container-10 pt-20 md:pt-30" id="community">
        <h2 className="tw-heading-3 md:tw-heading-60 text-gradient mb-0">
          Community Stories
        </h2>
      </div>

      <OpenChatCard className="-mt-20" />

      <section className="md:container-12 md:mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 bg-white/60 backdrop-blur-2xl md:bg-transparent md:backdrop-blur-none pb-24 md:pb-0">
          <div className="md:rounded-[32px] md:bg-white/60 md:backdrop-blur-2xl p-6 pb-16 md:p-12">
            <img
              src="/img/home/relation.webp"
              alt=""
              loading="lazy"
              className="rounded-2xl w-full"
            />
            <div className="md:pr-20">
              <h3 className="tw-heading-5 md:tw-heading-4 text-gradient mb-4 mt-6 md:mb-6 md:mt-12">
                RELATION grows organically to 67’000 canisters
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-0">
                The fast-growing dapp Relation is reconfiguring social relations
                of individuals across Web3 through social graphs. Extend your
                social media reach with SBTs and membership certificates.
              </p>
              <Link className="link-primary link-with-icon" href="https://relationlabs.ai/">
                <LinkArrowRight />
                Try Relation
              </Link>
            </div>
          </div>
          <div className="md:rounded-[32px] md:bg-white/60 md:backdrop-blur-2xl p-6 md:p-12">
            <img
              src="/img/home/icdex.webp"
              alt=""
              loading="lazy"
              className="rounded-2xl w-full"
            />
            <div className="md:pr-20">
              <h3 className="tw-heading-5 md:tw-heading-4 text-gradient mb-4 mt-6 md:mb-6 md:mt-12">
                Pioneering fully decentralized order book exchanges
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-0">
                ICDex, an orderbook-based DEX that runs 100% on-chain, was the
                first to list SNS-1 tokens. It now also lists CHAT and ckBTC
                (soon ckETH). Bypass CEXs and get ICP or CHAT for your BTC.
              </p>
              <Link className="link-primary link-with-icon" href="http://icdex.io/">
                <LinkArrowRight />
                Try ICDex
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CommunityStories;
