import React from "react";
import AnimateSpawn from "../../Common/AnimateSpawn";
import transitions from "@site/static/transitions.json";
import { motion } from "framer-motion";
import Link from "@docusaurus/Link";
import LinkArrowRight from "../../Common/Icons/LinkArrowRight";
import TranslatedLayout from "../../Common/TranslatedLayout/TranslatedLayout";
import {
  CkBTCLiveStats,
  CkBTCTotalSupply,
  EthEquivalentTxRate,
  LiveStats,
  SmartContractMemory,
  TotalBlocks,
  TransactionStats,
} from "../../LandingPage/Hero/Stats";
import { QueryClient, QueryClientProvider } from "react-query";

const projects = [
  {
    title: "Ordinals",
    subtitle: "Bioniq: Bitcoin Marketplace",
    description:
      "Sell, trade, and transfer Bitcoin Ordinals and inscriptions without gas fees and transaction speed of less than two seconds.",
    imgSrc: "/img/bitcoin-integration/a1.webp",
    altText: "Ordinals project image",
    link: "https://bioniq.io/",
  },
  {
    title: "Runes",
    subtitle: "Omnity",
    description:
      "Leveraging ICP’s Chain Fusion Technology, Omnity is an omnichain interoperability protocol offering cross-chain infrastructure for modular blockchains. It enables the transfer of Runes tokens and its roadmap lays cross-chain plans ahead for various L2s.",
    imgSrc: "/img/bitcoin-integration/a3.webp",
    altText: "Runes project image",
    link: "https://www.omnity.network/",
  },
  {
    title: "DeFi",
    subtitle: "Helix Markets",
    description:
      "Access zero-gas fees and lightning fast swaps between BTC, ETH, or any ERC20 assets. By harnessing the power of chain-key technology on ICP, Helix Markets allows cross-chain swaps in a non-custodial way.",
    imgSrc: "/img/bitcoin-integration/a4.webp",
    altText: "DeFi project image",
    link: "https://helixmarkets.io",
  },
  {
    title: "SocialFi",
    subtitle: "Open Chat",
    description:
      "Send chat messages to others containing tokens like ICP and ckBTC using OpenChat - a decentralized real-time messaging service. Running entirely onchain on ICP, it offers all the features of a chat app - from GIFs, to creating polls, to offering users rewards.",
    imgSrc: "/img/bitcoin-integration/a5.webp",
    altText: "SocialFi project image",
    link: "https://oc.app/",
  },
  {
    title: "Decentralized mining",
    subtitle: "Loka Mining",
    description:
      "Loka Mining is a trust-minimized, non-custodial Bitcoin mining pool. By facilitating co-investment with Bitcoin miners, it enables retail investors to acquire BTC at superior rates, surpassing market prices without the need for custodial services.",
    imgSrc: "/img/bitcoin-integration/a6.webp",
    altText: "Decentralized mining project image",
    link: "https://lokamining.com/",
  },
];

const queryClient = new QueryClient();

const ProjectCard: React.FC<{
  imgSrc: string;
  subtitle: string;
  title: string;
  description: string;
  link: string;
}> = ({ imgSrc, subtitle, title, description, link }) => {
  return (
    <div className="md:rounded-[32px] md:bg-white/60 md:backdrop-blur-2xl px-6 md:p-12">
      <img
        src={`${imgSrc}`}
        alt=""
        loading="lazy"
        className="rounded-2xl w-full"
      />
      <div className="md:pr-20">
        <h5 className="tw-paragraph md:tw-lead !font-bold text-gradient mt-6 md:mt-12 !mb-0">
          {title}
        </h5>
        <h3 className="tw-heading-5 md:tw-heading-4 text-gradient mb-4  md:mb-6">
          {subtitle}
        </h3>
        <p className="tw-paragraph md:tw-lead-sm mb-5">{description}</p>
        <Link
          className="link-primary link-with-icon"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkArrowRight /> Try It
        </Link>
      </div>
    </div>
  );
};

const Content: React.FC = () => {
  return (
    <>
      <section className="bg-infinite relative overflow-hidden">
        <AnimateSpawn
          className="container-10 pt-20 md:pt-40 pb-12 md:pb-24 text-white"
          variants={transitions.container}
          el={motion.section}
        >
          <motion.div className="md:container-8" variants={transitions.item}>
            <h2 className="tw-heading-4 md:tw-heading-60 text-white  mb-12 md:mb-30  md:text-center">
              ICP is the best choice to build on Bitcoin
            </h2>
          </motion.div>
          <div className="flex flex-col gap-16 md:gap-40 relative">
            <TranslatedLayout
              imageUrl="/img/bitcoin-integration/1.webp"
              reverse={false}
            >
              <h3 className="tw-heading-5 md:tw-heading-60 mb-6">
                Network integration
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-8">
                By running{" "}
                <Link
                  className="link-primary !text-white hover:text-white/60"
                  to="/docs/references/bitcoin-how-it-works"
                >
                  Bitcoin adapters
                </Link>
                , ICP nodes provide canister smart contracts with real time
                access to the latest state of the Bitcoin blockchain. The
                availability of the Bitcoin UTXO set on ICP enables canister
                smart contracts to read the balance of any BTC address.
              </p>
            </TranslatedLayout>
            <TranslatedLayout
              imageUrl="/img/bitcoin-integration/2.webp"
              reverse={true}
            >
              <h3 className="tw-heading-5 md:tw-heading-60 mb-6">
                Chain-key signatures{" "}
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-8">
                ICP nodes collaborate to produce{" "}
                <Link
                  className="link-primary !text-white hover:text-white/60"
                  to="/docs/references/t-sigs-how-it-works//"
                >
                  threshold-ECDSA signatures
                </Link>
                , enabling canister smart contracts to sign BTC transactions.
                Leveraging network integration, these BTC transactions are
                directly written to the Bitcoin blockchain - no need for any
                cross-chain bridges. Chain-key signatures also derive BTC
                addresses, enabling ICP smart contracts to read, write and own
                BTC.
              </p>
            </TranslatedLayout>
            <TranslatedLayout
              imageUrl="/img/bitcoin-integration/3.webp"
              reverse={false}
            >
              <h3 className="tw-heading-5 md:tw-heading-60 mb-6">
                ICP advanced capabilities
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-8">
                Developers can harness the security of Bitcoin as a native asset
                while also leveraging the unique core features of the
                <Link
                  className="link-primary !text-white hover:text-white/60"
                  to="/docs/building-apps/essentials/canisters"
                >
                  {" "}
                  ICP tech stack
                </Link>
                . These include the reverse gas model, unparalleled performance,
                and HTTPs outcalls, all within the framework of full-stack
                decentralization—a hallmark of the industry’s only
                third-generation blockchain.
              </p>
            </TranslatedLayout>
            <TranslatedLayout
              imageUrl="/img/bitcoin-integration/4.webp"
              reverse={true}
            >
              <h3 className="tw-heading-5 md:tw-heading-60 mb-6">
                Chain Fusion & interoperability
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-8">
                Beyond Bitcoin adapters, ICP smart contracts can read and write
                to other blockchains providing an unrivaled interconnected Web3
                experience. A single smart contract can read, write, and own
                assets on multiple blockchains via features such as network
                integration,{" "}
                <Link
                  className="link-primary !text-white hover:text-white/60"
                  to="/docs/building-apps/network-features/using-http/https-outcalls/overview"
                >
                  RPC integration
                </Link>{" "}
                and
                <Link
                  className="link-primary !text-white hover:text-white/60"
                  to="/docs/building-apps/network-features/using-http/https-outcalls/overview"
                >
                  {" "}
                  HTTPs outcalls
                </Link>
                .
              </p>
            </TranslatedLayout>
            <TranslatedLayout
              imageUrl="/img/bitcoin-integration/5.webp"
              reverse={false}
            >
              <h3 className="tw-heading-5 md:tw-heading-60 mb-6">
                Chain-key bitcoin
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-8">
                Native Bitcoin transactions entail paying high fees and enduring
                lengthy wait times for block confirmations. Enter{" "}
                <Link
                  className="link-primary !text-white hover:text-white/60"
                  to="/docs/defi/chain-key-tokens/ckbtc/overview"
                >
                  ckBTC
                </Link>
                , a 1:1 bitcoin twin introduced to leverage the 1-2 second
                finality and negligible fees within the ICP ecosystem. ckBTC is
                one of the first Chain Fusion applications, and powers several
                dapps across different use-cases.
              </p>
            </TranslatedLayout>
            <TranslatedLayout
              customContent={
                <>
                  <AnimateSpawn
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative z-[2] mt-6 "
                    variants={transitions.container}
                  >
                    <QueryClientProvider client={queryClient}>
                      <CkBTCTotalSupply />
                      <TransactionStats />
                      <CkBTCLiveStats />
                    </QueryClientProvider>
                  </AnimateSpawn>
                </>
              }
              reverse={false}
              reverseMobile={true}
            >
              <h3 className="tw-heading-5 md:tw-heading-60 mb-6">
                Live ckBTC dashboard
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-8">
                Chain-key bitcoin (ckBTC), a multi-chain bitcoin twin on the
                Internet Computer, is an 
                <Link
                  className="link-primary !text-white hover:text-white/60"
                  to="/docs/building-apps/network-features/using-http/https-outcalls/overview"
                >
                  ICRC-1
                </Link>
                -compliant token that is backed 1:1 by bitcoin (BTC) such that 1
                ckBTC can always be redeemed for 1 BTC and vice versa.
              </p>
            </TranslatedLayout>
          </div>
          <div className="hidden md:block blob blob-md md:blob-lg blob-azure translate-x-[33%] -translate-y-[50%]" />
        </AnimateSpawn>{" "}
      </section>
      <AnimateSpawn
        className="pt-20 md:pt-40"
        variants={transitions.container}
        el={motion.section}
      >
        <div className="md:container-8 container-10 md:w-7/10 md:mx-auto md:text-center">
          <h2 className="tw-heading-4 md:tw-heading-2 text-gradient mb-3 md:mb-6">
            BUILD on Bitcoin at the speed of ICP
          </h2>
          <p className="tw-lead-sm md:tw-lead mb-0">
            Bitcoin on ICP is not just a future promise. Developers are already
            building incredible use cases with Bitcoin on ICP.
          </p>
        </div>
        <AnimateSpawn
          className="container-12 !px-0  mt-12 md:mt-20 grid md:grid-cols-2 gap-16 md:gap-10 py-16 md:py-0 bg-white md:bg-transparent rounded-xl"
          el={motion.section}
          variants={transitions.container}
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </AnimateSpawn>
        <div className="container-10 mt-10 md:mt-16 text-center ">
          <Link className="button-primary" href="https://internetcomputer.org/ecosystem?tag=Bitcoin">
            More projects building on Bitcoin
          </Link>
        </div>
      </AnimateSpawn>
    </>
  );
};

export default Content;
