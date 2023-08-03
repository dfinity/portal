import React from "react";
import Link from "@docusaurus/Link";
import OpenChatCard from "../../Common/OpenChatCard/OpenChatCard";
import LinkArrowRight from "../../Common/Icons/LinkArrowRight";

const CommunityStories: React.FC = ({}) => {
  return (
    <>
      <div className="container-10 pt-20 md:pt-40" id="community">
        <h2 className="tw-heading-3 md:tw-heading-60 text-gradient mb-0">
          Community stories
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
                Relation has grown organically to utilize 67'000 canister smart
                contracts
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-5">
                Relation is making the social relations of individuals
                decentralized. Every Soul can mint readable, understandable,
                programmable SBTs to represent proofs of friendship,
                affiliations, membership certificate qualifications, and
                commitments.
              </p>
              <Link className="link-primary link-with-icon" href="https://relationlabs.ai/">
                <LinkArrowRight />
                Build your Web3 social graph on Relation
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
                ICDex is DeFi 3.0 in the form of a fully on-chain orderbook
                exchange
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-5">
                Imagine a fully on-chain Coinbase! CeFi-like functionality is
                now provided by a fully on-chain DEX &mdash; the UX, the
                orderbook, order-matching and AMM. It plans to list all assets
                using "chain key" crypto, and transition updates to fully
                decentralized DAO automation.
              </p>
              <Link className="link-primary link-with-icon" href="http://icdex.io/">
                <LinkArrowRight />
                Find your favorite tokens on ICDex
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CommunityStories;
