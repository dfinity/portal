import React from "react";
import { motion } from "framer-motion";
import Layout from "@theme/Layout";
import ChevronRight from "../../static/img/token-holders/chevron-right.svg";
import ExternalLinkIcon from "../../static/img/external-link.svg";
import { VotingRewardsChart } from "../components/LandingPage/ICPToken";
import useGlobalData from "@docusaurus/useGlobalData";
import DfinityLogo from "../../static/img/dfinity_logo.svg";
import CustodyGraphic from "../../static/img/token-holders/custody.svg";
import BlobBlue from "@site/static/img/purpleBlurredCircle.png";
import BlobWhite from "@site/static/img/whiteBlurredCircle.png";

import transitions from "@site/static/transitions.json";

import YoutubeIcon from "../../static/img/token-holders/social/youtube.svg";
import ForumIcon from "../../static/img/token-holders/social/forum.svg";
import MediumIcon from "../../static/img/token-holders/social/medium.svg";
import DiscordIcon from "../../static/img/token-holders/social/discord.svg";
import TwitterIcon from "../../static/img/token-holders/social/twitter.svg";
import RedditIcon from "../../static/img/token-holders/social/reddit.svg";
import GithubIcon from "../../static/img/token-holders/social/github.svg";
import AnimateSpawn from "../components/Common/AnimateSpawn";
import { resetNavBarStyle } from "@site/src/utils/reset-navbar-style";

const images = [
  {
    url: require("../../static/img/token-holders/logos/Img-01.png").default,
    class:
      "w-9 right-[-1%] bottom-[100px] md:w-15 md:right-[12px] md:top-[657px]",
  },
  {
    url: require("../../static/img/token-holders/logos/Img-02.png").default,
    class: "w-9 left-[35%] top-0 md:w-15 md:left-[234px] md:top-[43px]",
  },
  {
    url: require("../../static/img/token-holders/logos/Img-03.png").default,
    class: "hidden md:block w-9 md:w-15 md:left-[133px] md:top-[567px]",
  },
  {
    url: require("../../static/img/token-holders/logos/Img-04.png").default,
    class: "hidden md:block w-9 md:w-15 md:left-[58px] md:top-[190px]",
  },
  {
    url: require("../../static/img/token-holders/logos/Img-05.png").default,
    class: "hidden md:block w-9 md:w-15 md:right-[-10px] md:top-[250px]",
  },
  {
    url: require("../../static/img/token-holders/logos/Img-06.png").default,
    class:
      "w-12 right-[40%] top-[239px] md:w-20 md:right-[550px] md:top-[290px]",
  },
  {
    url: require("../../static/img/token-holders/logos/Img-06-1.png").default,
    class:
      "w-12 right-[30%] bottom-[40px] md:w-20 md:right-[370px] md:top-[1060px]",
  },
  {
    url: require("../../static/img/token-holders/logos/Img-07.png").default,
    class: "w-12 left-[30%] top-[155px] md:w-20 md:left-[610px] md:top-[80px]",
  },
  {
    url: require("../../static/img/token-holders/logos/Img-08.png").default,
    class: "w-12 left-[-1%] top-[241px] md:w-20 md:left-[194px] md:top-[371px]",
  },
  {
    url: require("../../static/img/token-holders/logos/Img-09.png").default,
    class:
      "w-12 left-[-5%] bottom-[10px] md:w-20 md:left-[161px] md:top-[1033px]",
  },
  {
    url: require("../../static/img/token-holders/logos/Img-10.png").default,
    class: "w-12 right-[-3%] top-[67px] md:w-20 md:right-[490px] md:top-[33px]",
  },
  {
    url: require("../../static/img/token-holders/logos/Img-11.png").default,
    class:
      "w-12 right-[5%] top-[280px] md:w-20 md:right-[110px] md:top-[442px]",
  },
  {
    url: require("../../static/img/token-holders/logos/Img-12.png").default,
    class:
      "w-16 left-[30%] bottom-[90px] md:w-30 md:left-auto md:right-[110px] md:top-[1078px]",
  },
  {
    url: require("../../static/img/token-holders/logos/Img-13.png").default,
    class: "hidden md:block w-16 md:w-30 md:right-[30px] md:top-[0px]",
  },
  {
    url: require("../../static/img/token-holders/logos/Img-14.png").default,
    class:
      "w-16 right-[10%] top-[152px] md:w-30 md:right-[320px] md:top-[160px]",
  },
  {
    url: require("../../static/img/token-holders/logos/Img-15.png").default,
    class: "w-16 left-[10%] top-[80px] md:w-30 md:left-[450px] md:top-[211px]",
  },
  {
    url: require("../../static/img/token-holders/logos/Img-16.png").default,
    class: "hidden md:block w-16 md:w-30 md:left-[-27px] md:top-[838px]",
  },
];

const icons = [
  {
    tooltip: "Join our channel",
    img: YoutubeIcon,
    url: "https://youtube.com/dfinity",
  },
  {
    tooltip: "Read our blog",
    img: MediumIcon,
    url: "https://medium.com/dfinity-network-blog",
  },
  {
    tooltip: "Join our subreddit",
    img: RedditIcon,
    url: "https://www.reddit.com/r/dfinity/",
  },
  {
    tooltip: "Join Discord",
    img: DiscordIcon,
    url: "https://discord.com/invite/cA7y6ezyE2",
  },
  {
    tooltip: "Got to GitHub",
    img: GithubIcon,
    url: "https://github.com/dfinity",
  },
  {
    tooltip: "Tweet quotes",
    img: TwitterIcon,
    url: "https://twitter.com/dfinity",
  },
  {
    tooltip: "Join our forum",
    img: ForumIcon,
    url: "https://forum.dfinity.org/",
  },
];

function TokenHolders(): JSX.Element {
  resetNavBarStyle();

  const globalData = useGlobalData();
  const icpPrice = globalData["icp-price"]["default"] as number;

  return (
    <Layout
      title="ICP Tokens"
      description="Learn about the ICP tokens, how to stake and get involved in the governance of the Internet Computer and see how ICP can be converted to the cycles which are used for computation."
    >
      <main className="text-black relative overflow-hidden">
        <AnimateSpawn
          el={motion.img}
          src={BlobBlue}
          alt=""
          className="absolute pointer-events-none max-w-none w-[800px] -right-[370px] top-[-100px] md:w-[1500px]  md:right-[-700px] 2xl:left-1/2 translate-x-[200px] md:top-[-200px] z-[1000]"
          variants={transitions.item}
        />
        <section className="max-w-page relative px-6 pt-20 mb-12 md:mb-36 md:px-12.5 md:mx-auto  md:pt-40 overflow-hidden">
          <AnimateSpawn
            className="md:w-7/10 lg:w-6/10 md:ml-1/12"
            variants={transitions.container}
          >
            <motion.h1
              className="tw-heading-3 md:tw-heading-2 mb-2 md:mb-8"
              variants={transitions.item}
            >
              ICP Tokens
            </motion.h1>
            <motion.p
              className="tw-lead-sm md:tw-lead mb-0"
              variants={transitions.item}
            >
              Learn about the ICP tokens, how to stake and get involved in the
              governance of the Internet Computer and see how ICP can be
              converted to the cycles which are used for computation.
            </motion.p>
          </AnimateSpawn>
        </section>

        <AnimateSpawn
          el={motion.section}
          variants={transitions.container}
          className="max-w-page pt-[354px] md:pt-[467px] px-6 relative md:mx-auto"
        >
          <AnimateSpawn variants={transitions.container}>
            {images.map((img) => (
              <motion.img
                src={img.url}
                className={`absolute z-0 ${img.class}`}
                alt=""
                key={img.url}
                variants={transitions.item}
              />
            ))}
          </AnimateSpawn>
          <div className="md:w-6/12 mx-auto text-center mb-12 md:mb-20 relative z-10">
            <motion.h2
              className="tw-heading-4 md:tw-title-lg mb-2 md:mb-8"
              variants={transitions.item}
            >
              Get &amp; Store tokens
            </motion.h2>
            <motion.p
              className="tw-lead-sm md:tw-lead mb-0"
              variants={transitions.item}
            >
              One of the best ways to engage with the ecosystem is to explore
              the world of tokens. Tokens allow users, investors and developers
              to particpate in the network by allowing computation, staking,
              voting, governance, and ownership.
            </motion.p>
          </div>
          <div className="md:w-10/12 mx-auto grid grid-cols-1 sm:grid-cols-2 gap-2 pb-44 md:pb-80 relative z-10">
            <motion.a
              className="flex pl-8 py-6 md:py-0 md:pl-12 pr-8 gap-2 cursor-pointer relative bg-white md:h-48 items-center rounded-xl border-0 border-b-[5px] border-green border-solid hover:bg-infinite hover:border-infinite transition-all group"
              variants={transitions.item}
              href="https://www.dfinitycommunity.com/best-exchanges-to-buy-icp/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex-1 group-hover:-translate-y-3 transition-transform">
                <h3 className="tw-heading-5 text-infinite group-hover:text-white">
                  Centralized exchanges
                </h3>
                <p className="tw-paragraph-sm text-black mb-0 group-hover:text-white">
                  Exchanges allow you buy ICP tokens using traditional
                  currencies. Note that they will have custody over any ICP you
                  buy until you send it to a wallet you control.
                </p>
              </div>
              <ChevronRight className="text-infinite group-hover:text-white transition-colors"></ChevronRight>
            </motion.a>
            <motion.a
              className="flex pl-8 py-6 md:py-0 md:pl-12 pr-8 gap-2 cursor-pointer relative bg-white md:h-48 items-center rounded-xl border-0 border-b-[5px] border-infinite border-solid hover:bg-infinite hover:border-infinite transition-all group"
              variants={transitions.item}
              href="https://www.dfinitycommunity.com/best-internet-computer-wallets-where-to-safely-store-your-icps/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex-1 group-hover:-translate-y-3 transition-transform">
                <h3 className="tw-heading-5 text-infinite group-hover:text-white">
                  Wallets
                </h3>
                <p className="tw-paragraph-sm text-black group-hover:text-white">
                  If you want to store tokens, nfts, or connect to dapps on the
                  IC, there are a number of wallets and self-custody options.
                </p>
              </div>
              <ChevronRight className="text-infinite group-hover:text-white transition-colors"></ChevronRight>
            </motion.a>
          </div>
        </AnimateSpawn>
        <section className="max-w-page md:mx-auto px-6  md:px-12.5 pt-12 relative">
          <AnimateSpawn
            className="md:mx-auto md:w-8/12 text-center mb-24 md:mb-40"
            variants={transitions.container}
          >
            <motion.h2
              variants={transitions.item}
              className="tw-heading-3 md:tw-heading-2 mb-2 md:mb-8 text-transparent bg-clip-text px-3 "
              style={{
                backgroundImage:
                  "linear-gradient(108.55deg, #3B00B9 0%, #18D0B5 149.76%)",
              }}
            >
              What can you do with the ICP token?
            </motion.h2>
            <motion.p
              className="tw-lead-sm md:tw-lead mb-0 max-w-2xl mx-auto"
              variants={transitions.item}
            >
              ICP is a utility token that allows developers to pay for
              computation and allows users to participate in and govern the
              Internet Computer blockchain network.
            </motion.p>
          </AnimateSpawn>
          <AnimateSpawn
            className="md:mx-auto md:w-10/12 md:mt-40 flex gap-1/10 flex-col md:flex-row"
            variants={transitions.container}
          >
            <motion.div
              className="md:w-4/10 md:pr-5"
              variants={transitions.item}
            >
              <h3 className="tw-heading-4 md:tw-heading-3 mb-2">
                Convert ICP into cycles to pay for computation
              </h3>
              <div className="tw-paragraph md:mb-0">
                <p>
                  Canister smart contracts burn cycles as they operate.
                  Developers need to regularly top up their cycle balance in
                  order to keep dapps running.
                </p>
                <p>
                  The easiest way to obtain cycles is to exchange ICP tokens.
                  The price of cycles is fixed to ensure your computational cost
                  is always predictable.
                </p>
                <p className="mb-3 mt-8 tw-heading-6">
                  <a
                    href="https://faucet.dfinity.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black hover:no-underline tw-heading-6"
                  >
                    Get free cycles
                    <ExternalLinkIcon className="inline-block align-bottom ml-2"></ExternalLinkIcon>
                  </a>
                </p>
                <p className="mb-0 text-paragraph">
                  <a
                    href="https://nns.ic0.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black hover:no-underline tw-heading-6"
                  >
                    Check out NNS dApp
                    <ExternalLinkIcon className="inline-block align-bottom ml-2"></ExternalLinkIcon>
                  </a>
                </p>
              </div>
            </motion.div>
            <motion.div
              className="flex-1 self-center mt-15 md:mt-0"
              variants={transitions.item}
            >
              <h4 className="tw-lead text-black-60 sm:text-center mb-12">
                What is covered by $10 worth of cycles?
              </h4>
              <div className="flex gap-8 sm:gap-5 flex-col sm:flex-row">
                <div className="bg-infinite p-6 rounded-xl relative">
                  <span className="text-lead-sm absolute -top-4 left-6 bg-white py-1 px-3 rounded-full">
                    ~10 years
                  </span>
                  <p className="text-white tw-lead mb-0">
                    Hosting a 200MB static website bundle
                  </p>
                </div>
                <div className="bg-infinite p-6 rounded-xl relative">
                  <span className="text-lead-sm absolute -top-4 left-6 bg-white py-1 px-3 rounded-full">
                    1 year
                  </span>
                  <p className="text-white tw-lead mb-0">
                    Storing a full NFT collection of 10,000 NFTs
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimateSpawn>
        </section>
        <section className="max-w-page md:mx-auto px-6 md:px-12.5 relative">
          <AnimateSpawn
            el={motion.img}
            variants={transitions.item}
            src={BlobBlue}
            className="absolute pointer-events-none max-w-none w-[800px] -left-[570px] top-0 md:w-[1500px]  md:left-[-1000px] translate-x-[200px] md:top-[-400px]"
          />
          {/*
          ---
          */}
          <AnimateSpawn
            className="grid grid-cols-1 md:grid-cols-[1fr_40%] gap-x-1/10 md:mx-auto md:w-10/12 mt-24 md:mt-40 relative z-10"
            variants={transitions.container}
          >
            <motion.h3
              className="md:col-start-2 tw-heading-4 md:tw-heading-3 mb-2 text-left"
              variants={transitions.item}
            >
              Earn staking rewards
            </motion.h3>
            <motion.div
              className="max-w-[500px] bg-white-50 rounded-lg p-8 order-2 md:order-1 mt-12 md:mt-0"
              variants={transitions.item}
            >
              <VotingRewardsChart className="!block" />
            </motion.div>
            <motion.div
              className="md:flex-1 order-1 md:order-2"
              variants={transitions.item}
            >
              <div className="tw-paragraph md:mb-0">
                <p className="">
                  Tokens can be ‘locked’ in neurons allowing users to stake
                  tokens and vote on network proposals. Staking and voting are
                  easily to do in the official NNS dapp.
                </p>
                <p className="mb-8">
                  Staking rewards start from 11.2% APY and get as high as 21.0%
                  APY if you stake for 8 years.
                </p>
                <p className="mb-3 mt-8 tw-heading-6">
                  <a
                    href="https://internetcomputer.org/docs/current/concepts/governance/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black hover:no-underline"
                  >
                    Learn more about network governance
                    <ExternalLinkIcon className="inline-block align-bottom ml-2"></ExternalLinkIcon>
                  </a>
                </p>
                <p className="mb-0 tw-heading-6">
                  <a
                    href="https://nns.ic0.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black hover:no-underline"
                  >
                    Start Staking
                    <ExternalLinkIcon className="inline-block align-bottom ml-2"></ExternalLinkIcon>
                  </a>
                </p>
              </div>
            </motion.div>
          </AnimateSpawn>

          {/*
          ---
           */}
          <AnimateSpawn
            className="md:mx-auto md:w-10/12 md:mt-40 mt-24 md:mb-40 mb-24"
            variants={transitions.container}
          >
            <motion.h3
              className="tw-heading-4 md:tw-heading-3 mb-2 md:w-4/10 md:pr-10"
              variants={transitions.item}
            >
              Efficient and cheap ICP transfers
            </motion.h3>
            <div className=" flex gap-2/10 flex-col md:flex-row">
              <motion.div
                className="flex-[4] md:pr-10"
                variants={transitions.item}
              >
                <div className="tw-paragraph md:mb-0">
                  <p className="mb-0">
                    The fee of an ICP ledger transaction is fixed at 0.0001 ICP.
                    It allows efficient transfers and dapp payments. Use the NNS
                    dapp or the available wallets to send transactions.
                  </p>
                </div>
              </motion.div>
              <motion.div
                className="w-[364px] max-w-full mx-auto md:w-4/10 self-center p-8 bg-white rounded-xl mt-12 md:mt-0"
                variants={transitions.item}
              >
                <h4 className="text-center tw-title-navigation mb-3">
                  Fixed transaction fee
                </h4>
                <div className="flex gap-2 items-center mb-3 justify-center">
                  <DfinityLogo className="w-10 h-10"></DfinityLogo>
                  <span className="tw-title-sm md:tw-lead-lg  lg:tw-title-lg">
                    0.0001&nbsp;ICP
                  </span>
                </div>
                <p className="text-center tw-title-navigation">
                  ~${(0.0001 * icpPrice).toFixed(5)}
                </p>
              </motion.div>
            </div>
          </AnimateSpawn>
        </section>
        <section className=" bg-infinite text-white overflow-hidden">
          <AnimateSpawn
            className="max-w-page md:mx-auto px-6 md:px-12.5 md:min-h-[600px] pb-20 pt-[391px] md:py-24 relative"
            variants={transitions.container}
          >
            <CustodyGraphic className="absolute w-[520px] md:w-auto right-[-100px] top-[-160px] md:right-[-200px] md:top-[-120px]"></CustodyGraphic>
            <div className="md:mx-auto md:w-10/12 ">
              <motion.img src="/img/token-holders/key.svg" alt="" />
              <motion.h2
                className="tw-heading-4 md:tw-heading-3 md:w-5/10 my-6 md:my-8"
                variants={transitions.item}
              >
                A range of custody options are available, including support for
                holding private keys in an airgapped machine or ledger device.
              </motion.h2>
              <motion.p className="tw-heading-6" variants={transitions.item}>
                <a
                  href="https://wiki.internetcomputer.org/wiki/ICP_custody_with_Ledger_Nano"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-white-50 hover:no-underline"
                >
                  See Ledger instructions for Internet Computer (ICP)
                  <ExternalLinkIcon className="inline-block align-bottom ml-2"></ExternalLinkIcon>
                </a>
              </motion.p>
              <motion.p
                className="mb-0 tw-heading-6"
                variants={transitions.item}
              >
                <a
                  href="https://wiki.internetcomputer.org/wiki/ICP_custody_options"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-white-50 hover:no-underline"
                >
                  Learn more about custody options
                  <ExternalLinkIcon className="inline-block align-bottom ml-2"></ExternalLinkIcon>
                </a>
              </motion.p>
            </div>
            <motion.img
              src={BlobWhite}
              className="absolute pointer-events-none max-w-none w-[800px] right-[-250px] top-[-150px] md:w-[1500px]  md:right-[-550px] translate-x-[200px] md:top-[-400px]"
              alt=""
            />
          </AnimateSpawn>
        </section>
        <section className="max-w-page md:mx-auto px-6 md:px-12.5 mt-20 md:mt-40">
          <AnimateSpawn
            className="md:w-8/12 md:mx-auto text-center"
            variants={transitions.container}
          >
            <motion.h2
              className="tw-heading-3 md:tw-heading-2 mb-3 md:mb-12"
              variants={transitions.item}
            >
              Strong team &amp; community
            </motion.h2>
            <motion.p
              className="tw-paragraph md:tw-lead mb-8 md:mb-16"
              variants={transitions.item}
            >
              With 4 research centres, over 200 patents and over 100,000
              citations, our team and community consist of world-class
              cryptographers, programming language experts, formals methods
              researchers, economists, engineers, developers, and some of the
              best community folks you’ve seen.
            </motion.p>
            <div className="flex justify-center flex-wrap gap-3 md:gap-3">
              {icons.map((icon) => {
                const Icon = icon.img;

                return (
                  <motion.a
                    variants={transitions.item}
                    target="_blank"
                    rel="noopener noreferrer"
                    href={icon.url}
                    className="w-[70px] h-[70px] relative group flex items-center justify-center bg-white-50 rounded-xl border border-white border-solid hover:text-white hover:bg-infinite hover:border-infinite"
                  >
                    <span className="absolute -top-11 left-1/2 -translate-x-1/2 bg-black-60 py-1 px-4 rounded-full tw-paragraph-sm whitespace-nowrap opacity-0 text-white transition-opacity pointer-events-none group-hover:opacity-100">
                      {icon.tooltip}
                    </span>
                    <Icon></Icon>
                  </motion.a>
                );
              })}
            </div>
          </AnimateSpawn>
          <div className="mt-12 md:mt-20 mb-20 md:mb-40">
            <AnimateSpawn
              className="flex gap-5 items-start flex-col md:flex-row"
              variants={transitions.container}
            >
              <motion.div
                className="flex-1 bg-white-50 rounded-xl border text-center border-white border-solid px-8 py-12"
                variants={transitions.item}
              >
                <h1 className="tw-title-sm mb-3">
                  Blockchain's largest R&amp;D operation
                </h1>
                <p className="tw-paragraph-sm text-black-60">
                  As a core contributor, DFINITY’s team of world-class
                  researchers, cryptographers and engineers propose, design and
                  develop improvements to the Internet Computer blockchain.
                </p>
                <p className="mb-3">
                  <a
                    href="https://dfinity.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tw-heading-6 text-infinite hover:text-black hover:no-underline"
                  >
                    Meet the team
                    <ExternalLinkIcon className="inline-block align-bottom ml-2"></ExternalLinkIcon>
                  </a>
                </p>
              </motion.div>
              <motion.div
                className="flex-1 bg-white-50 rounded-xl border text-center border-white border-solid px-8 py-12 md:mt-30"
                variants={transitions.item}
              >
                <TwitterIcon className="text-[#1D9BF0] w-12 h-12 mb-3"></TwitterIcon>
                <h1 className="tw-title-sm">#8YearGang</h1>
                <p className="tw-paragraph-sm text-black-60">
                  Internet Computer community commits to long term future of the
                  project. 50% of tokens staked, nearly 25% of all tokens are
                  staked for over 8 years.
                </p>
              </motion.div>
              <motion.div
                className="flex-1 bg-white-50 rounded-xl border text-center border-white border-solid px-8 py-12 md:mt-10"
                variants={transitions.item}
              >
                <h1 className="tw-title-sm">Join The Conversation</h1>
                <p className="tw-paragraph-sm text-black-60">
                  Start discussing your ideas for what the DFINITY Foundation
                  should prioritize for the Internet Computer, and collaborate
                  on ecosystem topics with the Internet Computer community.
                </p>
                <p className=" mb-3">
                  <a
                    href="https://forum.dfinity.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tw-heading-6 text-infinite hover:text-black hover:no-underline"
                  >
                    Join on Forum
                    <ExternalLinkIcon className="inline-block align-bottom ml-2"></ExternalLinkIcon>
                  </a>
                </p>
              </motion.div>
            </AnimateSpawn>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default TokenHolders;
