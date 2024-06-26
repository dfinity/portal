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

function News() {
  return (
    <AnimateSpawn
      className="container-12 pt-20 md:pt-40 pb-16 md:pb-40"
      el={motion.section}
      variants={transitions.container}
    >
      <div className="flex flex-col gap-1  md:gap-5 mb-8 md:flex-row">
        <motion.h2
          className="tw-heading-4 mb-0 md:tw-heading-60"
          variants={transitions.item}
        >
          News & Events
        </motion.h2>
        <div className="md:flex-1 md:pt-1 ">
          <motion.p
            className="mb-0 mt-2 tw-paragraph md:tw-lead-sm md:w-1/2"
            variants={transitions.item}
          >
            Get all the news from the Internet Computer ecosystem
          </motion.p>
          <MotionLink
            variants={transitions.item}
            href="/news"
            className="link-primary link-with-icon"
          >
            Explore more news <LinkArrowUpRight />
          </MotionLink>
        </div>
      </div>
      <div className="mt-6 md:mt-20">
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
              src="https://assets-global.website-files.com/6488b0b0fcd2d95f6b83c9d4/655cf98523549a8b17f9a6e5_B24-OG%20e.jpg"
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
      </div>
      <div className="mt-4 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-5">
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
        <Link
          href="https://medium.com/dfinity/a-data-driven-exploration-of-cketh-the-digital-twin-of-ether-on-the-internet-computer-36b762be72e7"
          className="link-primary link-with-icon no-underline cursor-pointer hover:-translate-y-2 transition-transform text-black"
        >
          <NewsCard
            news={{
              title: "Exploring data on ckETH, the digital twin of ETH on ICP",
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
      </div>
    </AnimateSpawn>
  );
}

export default News;
