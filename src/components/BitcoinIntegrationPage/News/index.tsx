import React from "react";
import transitions from "@site/static/transitions.json";
import AnimateSpawn from "@site/src/components/Common/AnimateSpawn";
import ExternalLinkIcon from "@site/static/img/external-link.svg";
import PlaySVG from "@site/static/img/svgIcons/play.svg";
import { ArrowIconRight } from "../../RoadmapPage/Overlay";
import Link from "@docusaurus/Link";
import LinkArrowRight from "../../Common/Icons/LinkArrowRight";
import { motion } from "framer-motion";
import VideoCard from "../../Common/VideoCard";
import { NewsCard } from "../../NewsPage/Cards";
import LinkArrowUpRight from "../../Common/Icons/LinkArrowUpRight";

const MotionLink = motion(Link);

function News({ content = "btc" }) {
  return (
    <AnimateSpawn
      className="container-12 pt-20 md:pt-40 pb-16 md:pb-40"
      el={motion.section}
      variants={transitions.container}
    >
      <AnimateSpawn className="container-10 " variants={transitions.container}>
        <div className="flex flex-col gap-6 md:gap-5 mb-8 md:mb-10 md:flex-row md:w-9/10">
          <motion.h2
            className="tw-heading-4 mb-0 md:tw-heading-60 md:flex-1"
            variants={transitions.item}
          >
            News & Events
          </motion.h2>
          <div className="md:flex-1 md:pt-3">
            <motion.p
              className="mb-4 tw-paragraph md:tw-lead-sm"
              variants={transitions.item}
            >
              {content === "chainfusion"
                ? "Get all the news and event infos about Chain Fusion Technology on ICP."
                : "Get all the news from the Internet Computer ecosystem"}
            </motion.p>
            <MotionLink
              variants={transitions.item}
              href="/news"
              className="link-primary link-with-icon"
            >
              <LinkArrowRight />
              Explore more news
            </MotionLink>
          </div>
        </div>
      </AnimateSpawn>
      <div className="container-10">
        {content === "chainfusion" ? (
          <VideoCard
            image="https://img.youtube.com/vi/cdR40rhi8Wk/maxresdefault.jpg"
            title="Chain Fusion Day at Bitcoin Nashville - Teaser"
            label=""
            link={`https://www.youtube.com/watch?v=cdR40rhi8Wk`}
            description="Chain Fusion Day - Bitcoin Edition was a half-day side event at Bitcoin Nashville 2024 that brought together researchers, founders, builders, and investors committed to developing a scalable Bitcoin economy."
          />
        ) : (
          <div
            className={
              "md:h-[450px] flex flex-col md:flex-row rounded-xl overflow-hidden"
            }
          >
            <Link
              className="aspect-video md:w-7/10 flex relative group"
              href="https://b.tc/conference/2024"
            >
              <img
                src="img/bitcoin-integration/btc-nashville.webp"
                alt="Bitcoin 2024 Conference"
                className="w-full h-full object-cover"
              />
            </Link>
            <div className="md:w-3/10 flex bg-white-80 border border-solid border-white md:rounded-tr-xl rounded-br-xl p-8 md:p-12 backdrop-blur-2xl">
              <div className="self-end">
                <h4 className="text-black tw-paragraph mb-0">
                  Jul 25 - 27 <span className="mx-1 md:mx-2">|</span>Nashville,
                  Tennessee
                </h4>

                <p className="mb-0 tw-heading-5 md:tw-heading-4 !font-[450] mt-2 md:mt-3">
                  Bitcoin Nashville
                </p>

                <p className="text-black-60 tw-paragraph md:tw-prag mb-0 mt-3 line-clamp-4">
                  With the upcoming Halvening, 2024 is shaping up to be the
                  biggest year for bitcoin yet. We are building out core
                  neighborhoods & content tracks to accelerate
                  hyperbitcoinizatioin across multiple vectors.
                </p>
                <Link
                  className="link-primary link-with-icon mt-4"
                  href="https://b.tc/conference/2024"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Register now <LinkArrowUpRight />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mt-4 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-5">
        {content === "chainfusion" && (
          <>
            <Link
              href="https://medium.com/dfinity/icp-further-advances-chain-fusion-with-latest-bitcoin-milestone-deuterium-2fa347ef50b8"
              className="link-primary link-with-icon no-underline cursor-pointer hover:-translate-y-2 transition-transform text-black"
            >
              <NewsCard
                news={{
                  title:
                    "ICP Further Advances Chain Fusion With Latest Bitcoin Milestone: Deuterium",
                  dateHuman: "Aug 14, 2024",
                  press: "Medium",
                  details: `Over the past year, Chain Fusion technology has made impressive progress following the ambitious goals set forth in its roadmap. The Tritium milestone, achieved in May, enabled full support for Ethereum and other EVM chains, enabling secure transactions, token transfers, and enhanced functionality for developers to build multichain applications.`,
                  url: "https://medium.com/dfinity/icp-further-advances-chain-fusion-with-latest-bitcoin-milestone-deuterium-2fa347ef50b8",
                  imageUrl:
                    "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*bh0ic9dSDW5cONKihdoECg.jpeg",
                }}
                linkLabel="Read Now"
                clampText
              />
            </Link>
            <Link
              href="https://medium.com/@dfinity/chain-fusion-technology-the-key-to-a-multichain-ecosystem-b0308375bb09"
              className="link-primary link-with-icon no-underline cursor-pointer hover:-translate-y-2 transition-transform text-black"
            >
              <NewsCard
                news={{
                  title:
                    "Chain Fusion Technology: The Key to a Multichain Ecosystem",
                  dateHuman: "July 31, 2024",
                  press: "Medium",
                  details: `As a developer, how often do you find yourself struggling to integrate multiple blockchain networks for a single decentralized application? Perhaps you’re managing assets on Ethereum, serving frontends from IPFS, and handling smart contract computations on Arbitrum or Optimism. Each network demands you to adapt to different programming models, transaction costs, and settlement times. The process is cumbersome, inefficient, and complex.`,
                  url: "https://medium.com/@dfinity/chain-fusion-technology-the-key-to-a-multichain-ecosystem-b0308375bb09",
                  imageUrl:
                    "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*90bRZDA1g4Dq1pL1M2hCPw.jpeg",
                }}
                linkLabel="Read Now"
                clampText
              />
            </Link>
            <Link
              href="https://medium.com/dfinity/everything-bitcoin-on-icp-dive-into-projects-building-with-native-btc-integration-f9557476a209"
              className="link-primary link-with-icon no-underline cursor-pointer hover:-translate-y-2 transition-transform text-black"
            >
              <NewsCard
                news={{
                  title:
                    "Everything Bitcoin on ICP: Dive into Projects Building with native BTC Integration",
                  dateHuman: "July 19, 2024",
                  press: "Medium",
                  details: `Native Bitcoin integration on ICP allowed developers all across the globe to unleash new possibilities. From using ordinals as collateral to enabling satoshis to be sent via chat messages — the BTC<>ICP integration helped activate Bitcoin economy.`,
                  url: "https://medium.com/dfinity/everything-bitcoin-on-icp-dive-into-projects-building-with-native-btc-integration-f9557476a209",
                  imageUrl:
                    "https://miro.medium.com/v2/resize:fit:1400/format:webp/0*tGEIQD9N9vuk4bEW",
                }}
                linkLabel="Read Now"
                clampText
              />
            </Link>
          </>
        )}
        <Link
          href="https://www.theblock.co/post/288634/internet-computer-protocol-bitcoin-layer-zero-threshold-schnorr-implementation"
          className="link-primary link-with-icon no-underline cursor-pointer hover:-translate-y-2 transition-transform text-black"
        >
          <NewsCard
            news={{
              title:
                "Internet Computer Protocol aims to become a Bitcoin 'layer zero' with threshold-Schnorr implementation",
              dateHuman: "Apr 16, 2024",
              press: "James Hunt",
              details: `Internet Computer Protocol aims to be leveraged as a Bitcoin “layer zero” following the planned implementation of threshold-Schnorr signatures, announced today.`,
              url: "https://www.theblock.co/post/288634/internet-computer-protocol-bitcoin-layer-zero-threshold-schnorr-implementation",
              imageUrl: "/img/bitcoin-integration/n1.webp",
            }}
            linkLabel="Read Now"
            clampText
          />
        </Link>
        <Link
          href="https://decrypt.co/226630/bitcoin-runes-arrive-halving-internet-computer-support"
          className="link-primary link-with-icon no-underline cursor-pointer hover:-translate-y-2 transition-transform text-black"
        >
          <NewsCard
            news={{
              title:
                "Bitcoin Runes Arrive at the Halving—And Internet Computer Will Support Them",
              dateHuman: "Apr 16, 2024",
              press: " Jason Nelson",
              details: `With the Bitcoin halving and Runes protocol launch taking place this weekend, Dfinity is continuing Internet Computer's embrace of the Bitcoin ecosystem by adding support for etching Runes tokens and other BTC-centric functionality, the company said on Tuesday.`,
              url: "https://decrypt.co/226630/bitcoin-runes-arrive-halving-internet-computer-support",
              imageUrl: "/img/bitcoin-integration/n2.webp",
            }}
            linkLabel="Read Now"
            clampText
          />
        </Link>

        <Link
          href="https://medium.com/dfinity/ckbtc-a-decentralized-mechanism-for-efficient-bitcoin-transfers-42b128bc44d9"
          className="link-primary link-with-icon no-underline cursor-pointer hover:-translate-y-2 transition-transform text-black"
        >
          <NewsCard
            news={{
              title:
                "ckBTC: A Decentralized Mechanism for Efficient Bitcoin Transfers",
              dateHuman: "Apr 18, 2024",
              press: "Dfinity",
              details: `On September 7, 2021, Bitcoin obtained the status of legal tender within El Salvador. Shortly after the adoption of the so-called ‘Bitcoin law’, many Salvadorans had already opened Bitcoin wallets. However, as per a recent study done by the José Simeón Cañas Central American University, in 2023 just 12% of the local population engaged in cryptocurrency transactions in 2023.`,
              url: "https://medium.com/dfinity/ckbtc-a-decentralized-mechanism-for-efficient-bitcoin-transfers-42b128bc44d9",
              imageUrl: "/img/bitcoin-integration/n3.webp",
            }}
            linkLabel="Read Now"
            clampText
          />
        </Link>
        {content === "chainfusion" ? (
          <></>
        ) : (
          <>
            <Link
              href="https://medium.com/dfinity/a-data-driven-exploration-of-cketh-the-digital-twin-of-ether-on-the-internet-computer-36b762be72e7"
              className="link-primary link-with-icon no-underline cursor-pointer hover:-translate-y-2 transition-transform text-black"
            >
              <NewsCard
                news={{
                  title:
                    "Exploring data on ckETH, the digital twin of ETH on ICP",
                  dateHuman: "Dec 21, 2023",
                  press: "Jennifer Tran",
                  details: `This article explores data on ckETH, the digital twin of Ether (ETH) on the Internet Computer (ICP). It outlines how ckETH works and how to query data on ckETH using SQL.`,
                  url: "https://medium.com/dfinity/a-data-driven-exploration-of-cketh-the-digital-twin-of-ether-on-the-internet-computer-36b762be72e7",
                  imageUrl: "/img/bitcoin-integration/n4.webp",
                }}
                linkLabel="Read Now"
                clampText
              />{" "}
            </Link>
            <Link
              href="https://medium.com/dfinity/how-ckbtc-solves-the-dilemma-of-blockchain-bridges-ee8e0b72ee59"
              className="link-primary link-with-icon no-underline cursor-pointer hover:-translate-y-2 transition-transform text-black"
            >
              <NewsCard
                news={{
                  title: "How ckBTC Solves the Dilemma of Blockchain Bridges",
                  dateHuman: "Nov 30, 2023 ",
                  press: "By Dfinity",
                  details: `DFINITY, the foundation behind the innovative Internet Computer Protocol (ICP), has just unveiled a remarkable opportunity for decentralized application (dApp) developers. This new feature involves the ability to integrate OpenAI’s...`,
                  url: "https://medium.com/dfinity/how-ckbtc-solves-the-dilemma-of-blockchain-bridges-ee8e0b72ee59",
                  imageUrl: "/img/bitcoin-integration/n5.webp",
                }}
                linkLabel="Read Now"
                clampText
              />{" "}
            </Link>
          </>
        )}
      </div>
    </AnimateSpawn>
  );
}

export default News;
