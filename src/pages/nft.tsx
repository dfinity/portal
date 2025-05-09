import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import AnimateSpawn from "../components/Common/AnimateSpawn";
import LinkArrowRight from "../components/Common/Icons/LinkArrowRight";
import TranslatedLayout from "../components/Common/TranslatedLayout/TranslatedLayout";
import { useDarkHeaderInHero } from "../utils/use-dark-header-in-hero";

const largeNfts: { url: string; title: string; imageUrl: string }[] = [
  { imageUrl: "/img/nft/btcflower.webp", title: "", url: "" },
  { imageUrl: "/img/nft/cosmic-birth.webp", title: "", url: "" },
  { imageUrl: "/img/nft/boxydude.webp", title: "", url: "" },
  { imageUrl: "/img/nft/icbucks.webp", title: "", url: "" },
  { imageUrl: "/img/nft/cubetopia-2.webp", title: "", url: "" },
  { imageUrl: "/img/nft/colorful-abstracts.webp", title: "", url: "" },
  { imageUrl: "/img/nft/icflowers.webp", title: "", url: "" },
  { imageUrl: "/img/nft/creator-gloves.webp", title: "", url: "" },
  { imageUrl: "/img/nft/ickitties.webp", title: "", url: "" },
];

const smallNfts: { url: string; title: string; imageUrl: string }[] = [
  { imageUrl: "/img/nft/ickitties.webp", title: "", url: "" },
  { imageUrl: "/img/nft/icpuppies.webp", title: "", url: "" },
  { imageUrl: "/img/nft/moonwalker.webp", title: "", url: "" },
  { imageUrl: "/img/nft/eimolad.webp", title: "", url: "" },
  { imageUrl: "/img/nft/motoko.webp", title: "", url: "" },
  { imageUrl: "/img/nft/motomoji.webp", title: "", url: "" },
  { imageUrl: "/img/nft/nautscc.webp", title: "", url: "" },
  { imageUrl: "/img/nft/pineapplepunks.webp", title: "", url: "" },
  { imageUrl: "/img/nft/pockedbot.webp", title: "", url: "" },
  { imageUrl: "/img/nft/pod.webp", title: "", url: "" },
  { imageUrl: "/img/nft/spaceapes.webp", title: "", url: "" },
  { imageUrl: "/img/nft/boxydude.webp", title: "", url: "" },
  { imageUrl: "/img/nft/btcflower.webp", title: "", url: "" },
];

const NftShowcase = React.memo(() => {
  return (
    <section className="-mt-24 overflow-hidden relative h-[280px] md:h-[560px]">
      <div className="flex gap-1 md:gap-3 absolute left-1/2 min-w-max nft-marquee-right">
        {largeNfts.map((nft) => (
          // <a href={nft.url} title={nft.title} className="flex">
          <img
            key={nft.imageUrl}
            src={nft.imageUrl}
            alt=""
            className="w-40 md:w-80 rounded-xl"
          />
          // </a>
        ))}
        {largeNfts.map((nft) => (
          // <a href={nft.url} title={nft.title} className="flex">
          <img
            key={nft.imageUrl}
            src={nft.imageUrl}
            alt=""
            className="w-40 md:w-80 rounded-xl"
          />
          // </a>
        ))}
      </div>

      <div className="flex gap-1 md:gap-3 absolute top-40 md:top-80 mt-6 md:mt-8 left-1/2 min-w-max nft-marquee-left">
        {smallNfts.map((nft) => (
          // <a href={nft.url} title={nft.title} className="flex">
          <img
            key={nft.imageUrl}
            src={nft.imageUrl}
            alt=""
            className="w-24 md:w-52 rounded-xl"
          />
          // </a>
        ))}
        {smallNfts.map((nft) => (
          // <a href={nft.url} title={nft.title} className="flex">
          <img
            key={nft.imageUrl}
            src={nft.imageUrl}
            alt=""
            className="w-24 md:w-52 rounded-xl"
          />
          // </a>
        ))}
      </div>
    </section>
  );
});

function NftPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const isDark = useDarkHeaderInHero(heroRef);

  return (
    <Layout
      title="NFTs"
      description={`The Internet Computer is the only blockchain that can store
                  100% of NFT media on the
                  blockchain itself. Say hello to fully decentralized NFTs and
                  forget about linking to fragile media on cloud.`}
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <Head>
        <meta
          property="og:image"
          content={
            "https://internetcomputer.org/img/shareImages/share-nfts.jpg"
          }
        />
        <meta
          name="twitter:image"
          content={
            "https://internetcomputer.org/img/shareImages/share-nfts.jpg"
          }
        />
      </Head>
      <main
        className="text-black relative overflow-hidden"
        style={{
          marginTop: `calc(var(--ifm-navbar-height) * -1)`,
        }}
      >
        {isDark && <DarkHeroStyles bgColor="transparent"></DarkHeroStyles>}
        <AnimateSpawn variants={transitions.container}>
          <section
            className="overflow-hidden bg-infinite text-white pt-20"
            ref={heroRef}
          >
            <div className="container-10 pt-20 mb-40 md:mb-52 md:pt-36 relative">
              <div className="blob blob-purple blob-md md:blob-xl top-[-150px] left-full -translate-x-1/2 opacity-50"></div>
              <div className="md:w-7/10 relative">
                <motion.h1
                  className="tw-heading-3 md:tw-heading-2 mb-2 md:mb-6"
                  variants={transitions.item}
                >
                  Own your <abbr title="non-fungible tokens">NFT</abbr>
                </motion.h1>
                <motion.p
                  className="tw-lead-sm md:tw-lead mb-8"
                  variants={transitions.item}
                >
                  The Internet Computer is the only blockchain that can store
                  100% of NFT media on the blockchain itself. Say hello to fully
                  decentralized NFTs and forget about linking to fragile media
                  on cloud.
                </motion.p>
              </div>
            </div>
          </section>
          <NftShowcase></NftShowcase>
        </AnimateSpawn>

        <AnimateSpawn
          className="container-8 mt-10 md:mt-40 relative"
          el={motion.section}
          variants={transitions.container}
        >
          <div className="">
            <motion.h2
              className="tw-heading-5 sm:tw-heading-4 md:tw-heading-3 mb-3 md:mb-6 text-gradient"
              variants={transitions.item}
            >
              Buying an <abbr title="non-fungible token">NFT</abbr> on other
              chains is often a link that points to an untraceable source. The
              Internet Computer ensures true ownership — no intermediaries or
              central entities.
            </motion.h2>
          </div>
        </AnimateSpawn>

        <section className="container-12 mt-16 mb-20 md:mt-40 md:mb-48">
          <div className="border border-solid border-white bg-white-80 px-8 py-12 rounded-xl flex flex-col md:flex-row gap-12 md:gap-8 text-center">
            <div className="flex flex-col flex-1 gap-2">
              <span className="tw-heading-3 md:tw-heading-60 text-gradient">
                $33,000,000
              </span>
              <span className="tw-paragraph md:tw-lead-sm">
                Total trading volume in 2022
              </span>
            </div>
            <div className="flex flex-col flex-1 gap-2">
              <span className="tw-heading-3 md:tw-heading-60 text-gradient">
                2.6M+
              </span>
              <span className="tw-paragraph md:tw-lead-sm">
                Total <abbr title="non-fungible tokens">NFT</abbr>s
              </span>
            </div>
            <div className="flex flex-col flex-1 gap-2">
              <span className="tw-heading-3 md:tw-heading-60 text-gradient">
                415
              </span>
              <span className="tw-paragraph md:tw-lead-sm">
                Total <abbr title="non-fungible tokens">NFT</abbr> projects
              </span>
            </div>
          </div>
        </section>

        <section className="mb-30 md:mb-60">
          <div className="container-10 mb-12 md:mb-20">
            <div className="md:w-8/10">
              <h2 className="tw-heading-3 md:tw-heading-2 mb-3">
                <abbr title="non-fungible tokens">NFT</abbr> marketplaces
                <br />
                <span className="text-gradient">Trade with zero gas fees</span>
              </h2>
              <p className="mb-0 text-black-60 tw-lead-sm md:tw-lead">
                Embark on a journey of authentic digital asset ownership.{" "}
                <abbr title="non-fungible tokens">NFT</abbr> marketplaces on the
                Internet Computer guarantee full decentralization, where
                collectors hold 100% of their digital art. Explore and trade
                with zero gas fees. Collect, own and invest in the future with
                confidence.
              </p>
            </div>
          </div>
          <div className="container-12 relative">
            <div className="hidden md:block blob blob-purple blob-center blob-lg z-[-1]"></div>
            <div className="flex flex-col md:flex-row gap-3">
              <Link
                href="https://entrepot.app"
                className="flex-1 hover:-translate-y-3 hover:no-underline text-black hover:text-black transition-transform border border-solid border-white bg-white-80 p-6 md:p-8 rounded-xl flex flex-row items-start gap-6 md:flex-col md:gap-9"
              >
                <img
                  src="/img/nft/entrepot.webp"
                  alt=""
                  className="w-16 md:w-20"
                />
                <div className="flex-1">
                  <h4 className="tw-heading-6 md:tw-heading-5 mb-1 md:mb-2">
                    Entrepot
                  </h4>
                  <p className="tw-paragraph-sm md:tw-lead-sm mb-3 md:mb-8 text-black-60">
                    The first <abbr title="non-fungible tokens">NFT</abbr>{" "}
                    marketplace on the Internet Computer. This marketplace has
                    launched 100s of collections with their no-code minting
                    tool, and have over 1TB of assets stored fully onchain.
                  </p>
                  <span className="tw-paragraph-sm md:tw-lead-sm px-4 py-2 md:px-5 md:py-[10px] bg-[#F1EEF5] rounded-full">
                    $36M+ in trading
                  </span>
                </div>
              </Link>
              <Link
                href="https://tppkg-ziaaa-aaaal-qatrq-cai.raw.ic0.app/"
                className="flex-1 hover:-translate-y-3 hover:no-underline text-black hover:text-black transition-transform border border-solid border-white bg-white-80 p-6 md:p-8 rounded-xl flex flex-row items-start gap-6 md:flex-col md:gap-9"
              >
                <img src="/img/nft/yumi.webp" alt="" className="w-16 md:w-20" />
                <div className="flex-1">
                  <h4 className="tw-heading-6 md:tw-heading-5 mb-1 md:mb-2">
                    Yumi
                  </h4>
                  <p className="tw-paragraph-sm md:tw-lead-sm mb-3 md:mb-8 text-black-60">
                    Yumi is the first fully-decentralized{" "}
                    <abbr title="non-fungible tokens">NFT</abbr> and digital
                    goods marketplace where users can create and trade{" "}
                    <abbr title="non-fungible tokens">NFT</abbr>s. Users are
                    rewarded Yumi credits, which can be seamlessly integrated
                    with Shiku Metaverse.
                  </p>
                  <span className="tw-paragraph-sm md:tw-lead-sm px-4 py-2 md:px-5 md:py-[10px] bg-[#F1EEF5] rounded-full">
                    110,000+ users
                  </span>
                </div>
              </Link>
            </div>

            <div className="pt-20 text-center flex flex-col items-center gap-8 relative">
              <div className="md:hidden blob blob-purple blob-center blob-md z-[-1]"></div>

              <Link
                className="button-primary"
                href="/icp-tokens#anchor-wallets"
              >
                Set up your wallet
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-20 md:mb-40 container-12 flex flex-col gap-16 md:gap-40">
          <TranslatedLayout
            reverse={true}
            imageUrl="/img/nft/creator.webp"
            imageWithBlob="blob blob-infinite blob-center blob-md md:blob-lg"
            imageClassName="relative"
          >
            <h2 className="tw-heading-3 md:tw-heading-60 md:mb-6">
              Make the most out of <abbr title="non-fungible tokens">NFT</abbr>s
            </h2>
            <p className="tw-lead-sm md:mb-6">
              The Internet Computer enables a wide variety of unique{" "}
              <abbr title="non-fungible tokens">NFT</abbr>s. Since canister
              smart contracts can store over 100GB of data, every part of an ICP{" "}
              <abbr title="non-fungible tokens">NFT</abbr> can be hosted on the
              blockchain giving complete ownership to collectors. All data and
              code being onchain allows developers to make any digital object,
              even full websites, or chat groups into{" "}
              <abbr title="non-fungible tokens">NFT</abbr>s.
            </p>
            <p className="mb-0">
              <Link
                href="https://internetcomputer.org/ecosystem#nfts-on-the-internet-computer"
                className="button-outline"
              >
                Create your own
              </Link>
            </p>
          </TranslatedLayout>
          <TranslatedLayout imageUrl="/img/nft/btc-flower.webp">
            <h2 className="md:tw-heading-60 md:mb-6">Dynamic NFTs</h2>
            <p className="md:tw-lead-sm mb-0">
              Making use of a unique feature of the Internet Computer,{" "}
              <abbr title="non-fungible tokens">NFT</abbr>s can efficiently
              communicate with the Web2 world without using oracles. HTTPS
              outcalls allow NFTs on ICP to query Web2 APIs and change
              appearance or behave differently depending on the response. For
              example, <abbr title="Bitcoin">BTC</abbr> Flowers change the color
              of their paddles based on the last 24 hours of the Bitcoin’s price
              action.
            </p>
            <a
              className="link-primary link-with-icon mt-10"
              href="https://entrepot.app/marketplace/btcflower"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                width="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.172 11L10.808 5.63605L12.222 4.22205L20 12L12.222 19.778L10.808 18.364L16.172 13H4V11H16.172Z"
                  fill="currentColor"
                ></path>
              </svg>
              See the BTC Flower collection
            </a>
          </TranslatedLayout>
          <TranslatedLayout
            video={{
              videoUrl: "/img/nft/nft.mp4",
              videoContentType: "video/mp4",
            }}
            reverse={true}
          >
            <h2 className="md:tw-heading-60 md:mb-6">
              Turning TXs into generative NFT art
            </h2>
            <p className="md:tw-lead-sm mb-0">
              Anything can be an NFT on the Internet Computer, even
              transactions. The Genesis II NFT shows off how diverse and complex
              NFTs can be on the Internet Computer. It consists of different
              dynamic elements each of which fetches realtime data using HTTPS
              outcalls every 15 mins, showing ICP whale purchases, price change
              over the last 24 hours, current block rate, number of nodes and
              more. The most impressive element is an HTML canvas displaying
              dynamically animating ICP transaction flows. All this is part of
              the NFT and not something stored and accessed off-chain.
            </p>
            <a
              className="link-primary link-with-icon mt-10"
              href="https://entrepot.app/marketplace/genesis-ii"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                width="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.172 11L10.808 5.63605L12.222 4.22205L20 12L12.222 19.778L10.808 18.364L16.172 13H4V11H16.172Z"
                  fill="currentColor"
                ></path>
              </svg>
              Add a Genesis II NFT to your collection
            </a>
          </TranslatedLayout>
        </section>
        {/* <BackgroundPanel> */}
        <section className="bg-gradient-to-bl from-[#e07934] via-[#964680] to-[#4421a0] py-20 md:py-48 text-white">
          <div className="container-12">
            <h2 className="tw-heading-4 md:tw-heading-60  text-white-60 md:w-8/12 md:mx-auto mb-10 md:mb-20">
              Cost of storing <span className="text-white">1GB</span> of NFT
              collections onchain
            </h2>

            <div className="flex flex-col md:flex-row gap-4 mb-16 md:mb-24">
              <div className="flex-1 border border-solid border-white-30 rounded-xl flex flex-col gap-4 py-10 items-center panel-gradient">
                <h3 className="tw-heading-7-caps mb-0">Internet Computer</h3>
                <img src="/img/nft/ic-logo.webp" alt="" className="w-20" />
                <div>
                  <span className="tw-heading-3">$5</span>{" "}
                  <span className="tw-heading-5">/ year</span>
                </div>
              </div>

              <div className="flex-1 border border-solid border-white-30 rounded-xl flex flex-col gap-4 py-10 items-center">
                <h3 className="tw-heading-7-caps mb-0">Solana</h3>
                <img src="/img/nft/solana-logo.webp" alt="" className="w-20" />
                <div>
                  <span className="tw-heading-3">$110,000</span>{" "}
                  <span className="tw-heading-5">/ year</span>
                </div>
              </div>
              <div className="flex-1 border border-solid border-white-30 rounded-xl flex flex-col gap-4 py-10 items-center">
                <h3 className="tw-heading-7-caps mb-0">Ethereum</h3>
                <img
                  src="/img/nft/ethereum-logo.webp"
                  alt=""
                  className="w-20"
                />
                <div>
                  <span className="tw-heading-3">$79,000,000</span>{" "}
                  <span className="tw-heading-5">/ year</span>
                </div>
              </div>
            </div>

            <p className="tw-lead-sm md:tw-lead md:w-8/12 md:mx-auto mb-16 md:mb-20">
              The Internet Computer offers unparalleled efficiency that leaves
              other blockchains orders of magnitudes behind with regards to many
              metrics, making it the ideal chain to launch complex NFT
              collections and games. ICP uses the reverse gas model, which means
              end users can mint and trade NFTs with 0 gas fees.
              <a
                href="https://internetcomputer.org/ecosystem#nfts-on-the-internet-computer"
                className="button-outline-white mt-6"
              >
                Build your own
              </a>
            </p>

            <div className="panel-gradient border border-solid border-white-30 rounded-xl py-12 px-8 flex flex-col gap-6 text-center md:flex-row">
              <div className="flex flex-col items-center gap-2 md:flex-1">
                <div>
                  <span className="tw-heading-3 md:tw-heading-60">$32.5</span>{" "}
                  <span className="tw-heading-6">/ week</span>
                </div>
                <p className="tw-paragraph md:tw-lead-sm mb-0">
                  Total cost of storing all NFTs
                </p>
              </div>
              <hr className="w-20 bg-white-20 self-center m-0 md:w-px md:h-20" />
              <div className="flex flex-col items-center gap-2  md:flex-1">
                <span className="tw-heading-3 md:tw-heading-60">306,000+</span>
                <p className="tw-paragraph md:tw-lead-sm mb-0">
                  Total transactions
                </p>
              </div>
              <hr className="w-20 bg-white-20 self-center m-0 md:w-px md:h-20" />
              <div className="flex flex-col items-center gap-2  md:flex-1">
                <span className="tw-heading-3 md:tw-heading-60">&lt; $500</span>{" "}
                <p className="tw-paragraph md:tw-lead-sm mb-0">
                  Total transaction costs for all
                  <br />
                  transactions
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="container-12 py-30 md:py-48">
          <h2 className="tw-heading-3 md:tw-heading-2 text-gradient text-center md:w-6/12 md:mx-auto mb-16 md:mb-30 rounded-xl">
            Your NFT could be anything
          </h2>

          <article className="flex md:gap-16 bg-white-80 p-6 md:p-14 rounded-xl flex md:flex-row items-start gap-6 flex-col gap-9">
            <div>
              <h3 className="tw-heading-3 md:tw-heading-2 text-gradient">
                Own physical gold linked to an NFT
              </h3>
              <p>
                With GLD NFTs, customers of all income levels can now own
                physical gold through NFTs in a secure and simple way. GLD NFTs
                empower you to take control of your financial future and allows
                you to join the global movement towards the transparency and
                accessibility of trading gold.
              </p>
              <Link
                className="link-primary link-with-icon"
                href="https://tppkg-ziaaa-aaaal-qatrq-cai.raw.ic0.app/gold/nfts"
              >
                <LinkArrowRight /> Get gold NFTs on Yumi
              </Link>
            </div>
            <img
              src="/img/nft/gold.webp"
              alt="nft gold"
              className="object-contain object-center w-1/1 md:w-1/2"
            />
          </article>

          <div className="flex flex-wrap md:flex-nowrap gap-6 my-8">
            <article className="rounded-xl bg-white-80 p-8 md:grow basis-1/1 md:basis-1/2 w-1/1 md:w-1/2">
              <img
                src="/img/nft/julian-opie.webp"
                alt="Art by Julian Opie"
                className="object-contain object-center w-1/1 rounded-lg"
              />
              <h3 className="mt-4 tw-heading-3 text-gradient">
                Co-own fine art
              </h3>
              <p>
                Yumi Marketplace uncovers the potential of fractional shares and
                NFTs with its first release of Julian Opie’s Suzanne Walking in
                Leather Skirt. This innovative approach democratizes the art
                market, enabling ownership of artworks accessible to a broader
                range of art lovers.
              </p>
              <Link
                className="link-primary link-with-icon"
                href="https://tppkg-ziaaa-aaaal-qatrq-cai.raw.ic0.app/origyn/art/2oqzn-paaaa-aaaaj-azrla-cai"
              >
                <LinkArrowRight /> Become a co-owner
              </Link>
            </article>

            <article className="rounded-xl bg-white-80 p-8 md:grow basis-1/1 md:basis-1/2 w-1/1 md:w-1/2 mt-6 md:mt-0">
              <img
                src="/img/nft/pets.webp"
                alt="digital pets"
                className="object-contain object-center w-1/1 rounded-lg"
              />
              <h3 className="mt-4 tw-heading-3 text-gradient">
                Collect digital pets
              </h3>
              <p>
                There’s no doubt that people love to foster and collect
                endearing creatures to inhabit their favorite digital universes.
                Think of Pokémon, Digimon and Axie Infinity. ToyoWorld is
                creating an onchain digi monster universe, so you own and
                collect fun digital pets.
              </p>
              <Link
                className="link-primary link-with-icon"
                href="https://gi72u-lqaaa-aaaal-ac3ga-cai.raw.icp0.io/"
              >
                <LinkArrowRight /> Try the demo
              </Link>
            </article>
          </div>

          <div className="flex flex-col gap-16 md:gap-40 mt-20">
            <TranslatedLayout imageUrl="/img/nft/cubetopia.webp" reverse={true}>
              <div className="tw-heading-6 md:tw-heading-5 mb-2 md:mb-6">
                Cubetopia
              </div>
              <h3 className="tw-heading-4 md:tw-heading-60 mb-6">
                Each island (world) is a mutable NFT
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-10">
                Cubetopia is a Minecraft-like Web3 game where players can build
                anything on unique voxel islands also called “worlds”. Each
                world is a mutable NFT stored on the Internet Computer
                blockchain. Anyone can visit these islands on chain, while the
                owner of the NFT can update it by building. Try it yourself!
              </p>
              <Link
                className="link-primary link-with-icon"
                href="https://e5owu-aaaaa-aaaah-abs5a-cai.raw.ic0.app/"
              >
                <LinkArrowRight /> Create your own island
              </Link>
            </TranslatedLayout>
            <TranslatedLayout imageUrl="/img/nft/bioniq.webp" reverse={false}>
              <div className="tw-heading-6 md:tw-heading-5 mb-2 md:mb-6">
                Bioniq
              </div>
              <h3 className="tw-heading-4 md:tw-heading-60 mb-6">
                Bitcoin Ordinals marketplace
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-10">
                The first Ordinals marketplace built on the Internet Computer
                functioning as a Bitcoin L2. A platform for artists, collectors,
                and enthusiasts to buy, sell, and trade unique digital assets
                with ease and security using bitcoin. Whether you're looking to
                invest in digital art, expand your collection, or showcase your
                creations, Bioniq.io connects you to the pulse of the digital
                art revolution. Get ready — this marketplace will be open for
                business soon!
              </p>
              <Link
                className="link-primary link-with-icon"
                href="https://bioniq.io/collections"
              >
                <LinkArrowRight /> Browse the Bioniq collections
              </Link>
            </TranslatedLayout>
            <TranslatedLayout imageUrl="/img/nft/social.webp" reverse={true}>
              <div className="tw-heading-6 md:tw-heading-5 mb-2 md:mb-6">
                DSCVR
              </div>
              <h3 className="tw-heading-4 md:tw-heading-60 mb-6">
                NFT gated communities
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-10">
                DSCVR is one of the largest decentralized Web3 social media
                platforms in the world. It allows users to form communities
                called Portals around different interests. These communities can
                be NFT gated, making certain features like voting only available
                to people who hold a specific NFT. Besides this gating
                functionality, Portals themselves are NFTs owned by those who
                created them.
              </p>
              <Link
                className="link-primary link-with-icon"
                href="https://dscvr.one/p/internet-computer"
              >
                <LinkArrowRight /> Check out the Internet Computer Portal
              </Link>
            </TranslatedLayout>

            <TranslatedLayout imageUrl="/img/nft/origyn.webp" reverse={false}>
              <div className="tw-heading-6 md:tw-heading-5 mb-2 md:mb-6">
                ORIGYN
              </div>
              <h3 className="tw-heading-4 md:tw-heading-60 mb-6">
                NFTs to protect valuable assets
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-10">
                Step into the future with the ORIGYN NFT Certificates. Keep your
                most important assets — images, PDFs, biometric data, videos,
                NDAs, intellectual property and more — safe and secure
                permanently on the blockchain with decentralized certificates of
                authenticity.
              </p>
              <Link
                className="link-primary link-with-icon"
                href="https://www.origyn.com/"
              >
                <LinkArrowRight /> Learn about ORIGYN Certificates
              </Link>
            </TranslatedLayout>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default NftPage;
