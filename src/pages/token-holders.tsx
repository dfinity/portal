import React, { useEffect } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import ChevronRight from "../../static/img/token-holders/chevron-right.svg";
import BlobBlue from "../../static/img/token-holders/blob-blue.svg";
import BlobWhite from "../../static/img/token-holders/blob-white.svg";
import ExternalLinkIcon from "../../static/img/external-link.svg";
import { VotingRewardsChart } from "../components/ICPToken";
import useGlobalData from "@docusaurus/useGlobalData";
import DfinityLogo from "../../static/img/dfinity_logo.svg";
import KeyIcon from "../../static/img/token-holders/key.svg";
import CustodyGraphic from "../../static/img/token-holders/custody.svg";

import YoutubeIcon from "../../static/img/token-holders/social/youtube.svg";
import ForumIcon from "../../static/img/token-holders/social/forum.svg";
import MediumIcon from "../../static/img/token-holders/social/medium.svg";
import DiscordIcon from "../../static/img/token-holders/social/discord.svg";
import TwitterIcon from "../../static/img/token-holders/social/twitter.svg";
import RedditIcon from "../../static/img/token-holders/social/reddit.svg";
import GithubIcon from "../../static/img/token-holders/social/github.svg";

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
    url: "",
  },
  {
    tooltip: "Join our subreddit",
    img: RedditIcon,
    url: "",
  },
  {
    tooltip: "Join Discord",
    img: DiscordIcon,
    url: "",
  },
  {
    tooltip: "Got to GitHub",
    img: GithubIcon,
    url: "",
  },
  {
    tooltip: "Tweet quotes",
    img: TwitterIcon,
    url: "",
  },
  {
    tooltip: "Join our forum",
    img: ForumIcon,
    url: "",
  },
];

function TokenHolders(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--ifm-color-primary",
      "#3b00b9"
    );
  }, []);

  const globalData = useGlobalData();
  const icpPrice = globalData["icp-price"]["default"] as number;

  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <BlobBlue className="absolute w-[800px] -right-[270px] top-[-350px] md:w-auto  md:right-[-600px] 2xl:left-1/2 translate-x-[200px] md:top-[-100px] z-[2000]"></BlobBlue>
      <main className="text-black relative overflow-hidden">
        <section className="max-w-page relative px-6 pt-12 mb-12 md:mb-36 md:px-12.5 md:mx-auto  md:pt-48 overflow-hidden">
          <div className=" md:w-7/10 lg:w-6/10 md:ml-1/12">
            <h1 className="tw-heading-3 md:tw-heading-2 mb-2 md:mb-8">
              The ICP Token
            </h1>
            <p className="tw-lead-sm md:tw-lead mb-0">
              Learn about the ICP token, how to stake and get involved in the
              governance of the Internet Computer. See how ICP can be converted
              to the cycles which are used for computation.
            </p>
          </div>
        </section>

        <section className="max-w-page pt-[354px] md:pt-[467px] px-6 relative md:mx-auto">
          {images.map((img) => (
            <img
              src={img.url}
              className={`absolute z-0 ${img.class}`}
              alt=""
              key={img.url}
            />
          ))}
          <div className="md:w-6/12 mx-auto text-center mb-12 md:mb-20 relative z-10">
            <h2 className="tw-heading-4 md:tw-title-lg mb-2 md:mb-8">
              Get &amp; Store tokens
            </h2>
            <p className="tw-lead-sm md:tw-lead mb-0">
              Maecenas faucibus mollis interdum. Fusce dapibus, tellus ac cursus
              commodo, tortor mauris condimentum nibh, ut fermentum massa justo
              sit amet risus. Vivamus sagittis lacus vel augue laoreet auctor.
            </p>
          </div>
          <div className="md:w-10/12 mx-auto grid grid-cols-1 sm:grid-cols-2 gap-2 pb-44 md:pb-80 relative z-10">
            <a className="flex pl-8 py-6 md:py-0 md:pl-12 pr-8 gap-2 cursor-pointer relative bg-white md:h-48 items-center rounded-xl border-0 border-b-[5px] border-green border-solid hover:bg-infinite hover:border-infinite transition-all group">
              <div className="flex-1 group-hover:-translate-y-3 transition-transform">
                <h3 className="tw-heading-5 text-infinite group-hover:text-white">
                  Centralized exchanges
                </h3>
                <p className="tw-paragraph-sm text-black mb-0 group-hover:text-white">
                  Exchanges are businesses that let you buy crypto using
                  traditional currencies. They have custody over any ETH you buy
                  until you send it to a wallet you control.
                </p>
              </div>
              <ChevronRight className="text-infinite group-hover:text-white transition-colors"></ChevronRight>
            </a>
            <a className="flex pl-8 py-6 md:py-0 md:pl-12 pr-8 gap-2 cursor-pointer relative bg-white md:h-48 items-center rounded-xl border-0 border-b-[5px] border-infinite border-solid hover:bg-infinite hover:border-infinite transition-all group">
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
            </a>
          </div>
        </section>
        <section className="max-w-page md:mx-auto px-6  md:px-12.5 pt-12 relative">
          <div className="md:mx-auto md:w-8/12 text-center mb-24 md:mb-40">
            <h2
              className="tw-heading-3 md:tw-heading-2 mb-2 md:mb-8 text-transparent bg-clip-text px-3 "
              style={{
                backgroundImage:
                  "linear-gradient(108.55deg, #3B00B9 0%, #18D0B5 149.76%)",
              }}
            >
              What can you do with the ICP token?
            </h2>
            <p className="tw-lead-sm md:tw-lead mb-0 max-w-2xl mx-auto">
              Internet Computer (ICP) is a utility token that allows users to
              participate in and govern the Internet Computer blockchain
              network.
            </p>
          </div>
          <div className="md:mx-auto md:w-10/12 md:mt-40 flex gap-1/10 flex-col md:flex-row">
            <div className="md:w-4/10 md:pr-5">
              <h3 className="tw-heading-4 md:tw-heading-3 mb-2">
                Convert ICP into cycles to pay for computation
              </h3>
              <div className="tw-paragraph md:mb-0">
                <p>
                  Canister smart contracts burn Cycles as they operate.
                  Maintainers need to regularly top up their Cycle balance in
                  order to keep dapps running.
                </p>
                <p>
                  You can buy Cycles for ICP, but the price is stable - it
                  doesn't depend on ICP price.
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
                    Check out NNS dApp&nbsp;
                    <ExternalLinkIcon className="inline-block align-bottom ml-2"></ExternalLinkIcon>
                  </a>
                </p>
              </div>
            </div>
            <div className="flex-1 self-center mt-15 md:mt-0">
              <h4 className="tw-lead text-black-60 sm:text-center mb-12">
                What 10$ worth of cycles can cover?
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
            </div>
          </div>
        </section>
        <section className="max-w-page md:mx-auto px-6 md:px-12.5 relative">
          <BlobBlue className="absolute w-[800px] -left-[570px] top-[-300px] md:w-auto  md:left-[-1000px] translate-x-[200px] md:top-[-400px]"></BlobBlue>
          {/* 
          ---
          */}
          <div className="md:mx-auto md:w-10/12 mt-24 md:mt-40 relative z-10">
            <h3 className="md:w-4/10 ml-auto tw-heading-4 md:tw-heading-3 mb-2">
              Earn staking rewards
            </h3>
            <div className="flex gap-1/10 flex-col md:flex-row">
              <div className="h-60 md:h-auto md:w-1/2 bg-white-50 rounded-lg p-8 order-2 md:order-1 mt-12 md:mt-0">
                <VotingRewardsChart />
              </div>
              <div className="md:flex-1 order-1 md:order-2">
                <div className="tw-paragraph md:mb-0">
                  <p className="mb-8">
                    Using the official NNS dapp you can stake your ICP and
                    participate in network governance. Staking rewards start
                    from 11.2% APY and get as high as 21.0% APY if you stake for
                    8 years.
                  </p>
                  <p className="mb-3 mt-8 tw-heading-6">
                    <a
                      href="https://faucet.dfinity.org"
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
              </div>
            </div>
          </div>

          {/* 
          ---
           */}
          <div className="md:mx-auto md:w-10/12 md:mt-40 mt-24 md:mb-40 mb-24">
            <h3 className="tw-heading-4 md:tw-heading-3 mb-2 md:w-4/10 md:pr-10">
              Efficient and cheap ICP transfers
            </h3>
            <div className=" flex gap-2/10 flex-col md:flex-row">
              <div className="flex-[4] md:pr-10">
                <div className="tw-paragraph md:mb-0">
                  <p className="mb-0">
                    The fee of an ICP ledger transaction is fixed at 0.0001 ICP.
                    It allows efficient transfers and dapp payments. Use the NNS
                    dapp or the available wallets to send transactions.
                  </p>
                </div>
              </div>
              <div className="md:w-4/10 self-center p-8 bg-white rounded-xl mt-12 md:mt-0">
                <h4 className="text-center tw-title-navigation mb-3">
                  Fixed transaction fee
                </h4>
                <div className="flex gap-2 items-center  mb-3">
                  <DfinityLogo className="w-10 h-10"></DfinityLogo>
                  <span className="tw-title-sm md:tw-title-lg">0.0001 ICP</span>
                </div>
                <p className="text-center tw-title-navigation">
                  ~${(0.0001 * icpPrice).toFixed(5)}
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className=" bg-infinite text-white overflow-hidden">
          <div className="max-w-page md:mx-auto px-6 md:px-12.5 md:min-h-[600px] pb-20 pt-[391px] md:py-24 relative">
            <CustodyGraphic className="absolute w-[520px] md:w-auto right-[-100px] top-[-160px] md:right-[-200px] md:top-[-120px]"></CustodyGraphic>
            <div className="md:mx-auto md:w-10/12 ">
              <KeyIcon></KeyIcon>
              <h2 className="tw-heading-4 md:tw-heading-3 md:w-5/10 my-6 md:my-8">
                Secure self custody options. Support for holding your private
                key in an airgapped machine or ledger device.
              </h2>
              <p className="tw-heading-6">
                <a
                  href="https://faucet.dfinity.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-white-50 hover:no-underline"
                >
                  Introducing the Ledger ICP
                  <ExternalLinkIcon className="inline-block align-bottom ml-2"></ExternalLinkIcon>
                </a>
              </p>
              <p className="mb-0 tw-heading-6">
                <a
                  href="https://nns.ic0.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-white-50 hover:no-underline"
                >
                  Learn more about self custody
                  <ExternalLinkIcon className="inline-block align-bottom ml-2"></ExternalLinkIcon>
                </a>
              </p>
            </div>
            <BlobWhite className="absolute w-[800px] right-[-300px] top-[-450px] md:w-auto  md:right-[-550px] translate-x-[200px] md:top-[-400px]"></BlobWhite>
          </div>
        </section>
        <section className="max-w-page md:mx-auto px-6 md:px-12.5 mt-20 md:mt-40">
          <div className="md:w-8/12 md:mx-auto text-center">
            <h2 className="tw-heading-3 md:tw-heading-2 mb-3 md:mb-12">
              Strong team &amp; community
            </h2>
            <p className="tw-paragraph md:tw-lead mb-8 md:mb-16">
              We have many famous cryptographers, great econ researchers, so the
              tokens/system will be secure..8 year gang..Lorem ipsum dolor donec
              ullamcorper nulla non metus auctor fringilla. Donec sed odio dui.
            </p>
            <div className="flex justify-center flex-wrap gap-3 md:gap-3">
              {icons.map((icon) => {
                const Icon = icon.img;

                return (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={icon.url}
                    className="w-[70px] h-[70px] relative group flex items-center justify-center bg-white-50 rounded-xl border border-white border-solid hover:text-white hover:bg-infinite hover:border-infinite"
                  >
                    <span className="absolute -top-11 left-1/2 -translate-x-1/2 bg-black-60 py-1 px-4 rounded-full tw-paragraph-sm whitespace-nowrap opacity-0 text-white transition-opacity pointer-events-none group-hover:opacity-100">
                      {icon.tooltip}
                    </span>
                    <Icon></Icon>
                  </a>
                );
              })}
            </div>
          </div>
          <div className="mt-12 md:mt-20 mb-20 md:mb-40">
            <div className="flex gap-5 items-start flex-col md:flex-row">
              <div className="flex-1 bg-white-50 rounded-xl border text-center border-white border-solid px-8 py-12">
                <h1 className="tw-title-sm mb-3">
                  Blockchain’s largest R&amp;D operation
                </h1>
                <p className="tw-paragraph-sm text-black-60">
                  Our team of world-class researchers, cryptographers and
                  engineers propose, design and develop improvements to the
                  Internet Computer blockchain.
                </p>
                <p className="mb-3">
                  <a
                    href=""
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tw-heading-6 text-infinite hover:text-black hover:no-underline"
                  >
                    Learn more
                    <ExternalLinkIcon className="inline-block align-bottom ml-2"></ExternalLinkIcon>
                  </a>
                </p>
              </div>
              <div className="flex-1 bg-white-50 rounded-xl border text-center border-white border-solid px-8 py-12 md:mt-30">
                <TwitterIcon className="text-[#1D9BF0] w-12 h-12 mb-3"></TwitterIcon>
                <h1 className="tw-title-sm">#8YearGang</h1>
                <p className="tw-paragraph-sm text-black-60">
                  Internet Computer community commits to long term future of the
                  project. 50% of tokens staked, nearly 25% of all tokens are
                  staked for over 8 years.
                </p>
              </div>
              <div className="flex-1 bg-white-50 rounded-xl border text-center border-white border-solid px-8 py-12 md:mt-10">
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
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default TokenHolders;
