import Link from "@docusaurus/Link";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";
import React, { useRef } from "react";
import AnimateSpawn from "../components/Common/AnimateSpawn";
import LinkArrowRight from "../components/Common/Icons/LinkArrowRight";
import ShareMeta from "../components/Common/ShareMeta";
import { useFontsLoaded } from "@site/src/utils/use-fonts-loaded";
import { useDarkHeaderInHero } from "../utils/use-dark-header-in-hero";
import TranslatedLayout from "../components/Common/TranslatedLayout/TranslatedLayout";

function UseCasesPage() {
  const fontLoaded = useFontsLoaded();
  const heroRef = useRef<HTMLDivElement>(null);
  const isDark = useDarkHeaderInHero(heroRef);

  return (
    <Layout
      title="Unlock endless possibilities with Internet Computer use cases"
      description="Experience full stack decentralization: from DAOs and crypto cloud services to games, NFTs, and social media, the Internet Computer has something for everyone."
    >
      <ShareMeta image="/img/shareImages/share-use-cases.webp"></ShareMeta>

      <main
        className="text-black relative overflow-hidden bg-infinite"
        style={{
          marginTop: `calc(var(--ifm-navbar-height) * -1)`,
        }}
      >
        {isDark && <DarkHeroStyles bgColor="transparent"></DarkHeroStyles>}
        <section
          className=" text-white pt-20 pb-20 lg:mb-3 relative"
          ref={heroRef}
        >
          <div className="container-8 pt-20 md:pt-36 relative z-10 text-center">
            <motion.h1
              className="tw-heading-3 md:tw-heading-2 mb-2 md:mb-6 "
              variants={transitions.item}
            >
              Unlock endless possibilities with Internet Computer use cases.
            </motion.h1>
            <div className="relative">
              <motion.p
                className="tw-lead-sm md:tw-lead mb-8"
                variants={transitions.item}
              >
                Experience full stack decentralization: from DAOs and crypto
                cloud services to games, NFTs, and social media, the Internet
                Computer has something for everyone.
              </motion.p>
            </div>
            <div className="flex justify-center items-center">
              <Link
                className="link-primary link-with-icon !text-white  hover:text-white hover:opacity-80 duration-200 ease-in-out"
                href="/what-is-the-ic"
              >
                <LinkArrowRight /> <span>What is ICP</span>
              </Link>
            </div>
          </div>
        </section>
        <section className="pt-12 md:pt-30 pb-12 md:pb-48 text-white bg-infinite">
          <AnimateSpawn
            className="container-12"
            variants={transitions.container}
          >
            <div className="flex flex-col gap-16 md:gap-40 relative">
              <TranslatedLayout
                imageUrl="/img/use-cases/1a.webp"
                reverse={false}
              >
                <div className="blob blob-md md:blob-lg blob-white md:blob-white-dense -translate-x-[70%] -translate-y-[10%] z-0 md:opacity-30 " />
                <h5 className="tw-heading-6 md:tw-heading-5 mb-2">DeAI</h5>
                <h3 className="tw-heading-4 md:tw-heading-3 mb-6">
                  Run your AI models on the blockchain
                </h3>
                <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-8">
                  Run AI models entirely onchain to benefit from the security,
                  resilience, and power of the ICP blockchain.
                </p>

                <Link
                  className="button-outline-white-30 text-center mb-6 md:mb-8 whitespace-nowrap"
                  href="/ai"
                >
                  AI Models on ICP
                </Link>
              </TranslatedLayout>
              <TranslatedLayout imageUrl="/img/use-cases/6.webp" reverse={true}>
                <div className="blob blob-md md:blob-lg blob-white md:blob-white-dense -translate-x-[0%] -translate-y-[25%] z-0 md:opacity-30 " />
                <h5 className="tw-heading-6 md:tw-heading-5 mb-2">DeFi </h5>
                <h3 className="tw-heading-4 md:tw-heading-3 mb-6">
                  Onchain swaps
                </h3>
                <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-8">
                  Imagine a decentralized order-book exchange built exclusively
                  using smart contracts that directly serve a web experience
                  like those of centralized exchanges, and incorporates the
                  world's digital assets without need for insecure bridges.
                </p>

                <Link
                  className="button-outline-white-30 text-center mb-6 md:mb-8 whitespace-nowrap"
                  href="/defi"
                >
                  Check out ICP Dex’s{" "}
                </Link>
              </TranslatedLayout>{" "}
              <TranslatedLayout
                imageUrl="/img/use-cases/1.webp"
                reverse={false}
              >
                <h5 className="tw-heading-6 md:tw-heading-5 mb-2">
                  DAOs on ICP
                </h5>
                <h3 className="tw-heading-4 md:tw-heading-3 mb-6">
                  Community-owned Web3
                </h3>
                <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-8">
                  An open internet service (OIS) keeps all its code, user
                  experience, compute and data onchain, and must be
                  transparently configured, updated and instructed by an
                  advanced DAO. The Internet Computer enables this via a public
                  governance DAO framework called a service nervous system
                  (SNS).
                </p>

                <Link
                  className="button-outline-white-30 text-center mb-6 md:mb-8 whitespace-nowrap"
                  href="/sns"
                >
                  DAOs on ICP
                </Link>
              </TranslatedLayout>
              <TranslatedLayout imageUrl="/img/use-cases/2.webp" reverse={true}>
                <h5 className="tw-heading-6 md:tw-heading-5 mb-2">
                  Enterprise Cloud 3.0{" "}
                </h5>
                <h3 className="tw-heading-4 md:tw-heading-3 mb-6">
                  Extend Web2 software with blockchain{" "}
                </h3>
                <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-8">
                  The Internet Computer is an efficient cloud that allows
                  enterprise to save on intractable R&D, security and legacy
                  software costs by building more simply using an advanced
                  evolution of smart contract technology hosted on an all-new
                  form of blockchain.
                </p>

                <Link
                  className="button-outline-white-30 text-center mb-6 md:mb-8 whitespace-nowrap"
                  href="/enterprise"
                >
                  Kickstart a pilot project
                </Link>
              </TranslatedLayout>
              <TranslatedLayout
                imageUrl="/img/use-cases/3.webp"
                reverse={false}
              >
                <div className="blob blob-md md:blob-lg blob-white md:blob-white-dense -translate-x-[75%] -translate-y-[10%] z-0 md:opacity-30 " />

                <h5 className="tw-heading-6 md:tw-heading-5 mb-2">Gaming </h5>
                <h3 className="tw-heading-4 md:tw-heading-3 mb-6">
                  Paradigm shift in Web3 gaming{" "}
                </h3>
                <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-8">
                  Enabled by smart contracts, Autonomous Worlds are a paradigm
                  shift in gaming, enabling developers, modders and players to
                  build composable, and permissionless game worlds that live on
                  the blockchain forever. Now possible on the Internet Computer
                  — 100% onchain.
                </p>

                <Link
                  className="button-outline-white-30 text-center mb-6 md:mb-8 whitespace-nowrap"
                  href="/gaming"
                >
                  Let’s play
                </Link>
              </TranslatedLayout>
              <TranslatedLayout imageUrl="/img/use-cases/4.webp" reverse={true}>
                <div className="blob blob-md md:blob-lg blob-white md:blob-white-dense translate-x-[10%] -translate-y-[33%] z-0 md:opacity-30 " />

                <h5 className="tw-heading-6 md:tw-heading-5 mb-2">NFTs </h5>
                <h3 className="tw-heading-4 md:tw-heading-3 mb-6">
                  NFT’s live fully onchain{" "}
                </h3>
                <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-8">
                  The Internet Computer is the only blockchain storing all
                  components of an NFT on chain, including assets. This opens up
                  capabilities for NFTs that go way beyond “overpriced links to
                  JPGs”.
                </p>

                <Link
                  className="button-outline-white-30 text-center mb-6 md:mb-8 whitespace-nowrap"
                  href="/nft"
                >
                  Start an NFT collection
                </Link>
              </TranslatedLayout>
              <TranslatedLayout
                imageUrl="/img/use-cases/5.webp"
                reverse={false}
              >
                <div className="blob blob-md md:blob-lg blob-white md:blob-white-dense -translate-x-[75%] -translate-y-[65%] z-0 md:opacity-30 " />
                <h5 className="tw-heading-6 md:tw-heading-5 mb-2">SoFi </h5>
                <h3 className="tw-heading-4 md:tw-heading-3 mb-6">
                  Reclaim social media
                </h3>
                <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-8">
                  Internet Computer blockchain flips the script by enabling
                  dapps to turn into DAOs that put the control in the hands of
                  the community. Take full ownership and control over
                  decentralized social media platforms.
                </p>

                <Link
                  className="button-outline-white-30 text-center mb-6 md:mb-8 whitespace-nowrap"
                  href="/social-media-dapps"
                >
                  Get Active on web3 Socials
                </Link>
              </TranslatedLayout>
            </div>
          </AnimateSpawn>
        </section>
      </main>
    </Layout>
  );
}

export default UseCasesPage;
