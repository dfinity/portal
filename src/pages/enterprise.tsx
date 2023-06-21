import Link from "@docusaurus/Link";
import useGlobalData from "@docusaurus/useGlobalData";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import clsx from "clsx";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import AnimateSpawn from "../components/Common/AnimateSpawn";
import { CardWithDescription } from "../components/Common/Card";
import LinkArrowRight from "../components/Common/Icons/LinkArrowRight";
import ShareMeta from "../components/Common/ShareMeta";
import TranslatedLayout from "../components/Common/TranslatedLayout/TranslatedLayout";
import { useDarkHeaderInHero } from "../utils/use-dark-header-in-hero";

function EnterprisePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const isDark = useDarkHeaderInHero(heroRef);

  return (
    <Layout
      title="Enterprise"
      description={`Build next generation enterprise systems on autonomous cloud, powered by chain-key cryptography and secure multiparty computation — no bloated security departments needed`}
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <ShareMeta image="/img/shareImages/share-defi.jpg"></ShareMeta>

      <main
        className="text-black relative overflow-hidden"
        style={{
          marginTop: `calc(var(--ifm-navbar-height) * -1)`,
        }}
      >
        {isDark && <DarkHeroStyles bgColor="transparent"></DarkHeroStyles>}

        <section
          className="overflow-hidden bg-infinite text-white pt-20"
          ref={heroRef}
        >
          <AnimateSpawn
            className="container-10 pt-20 pb-40 md:pb-52 md:pt-36 relative"
            variants={transitions.container}
          >
            <div className="blob blob-white blob-xl md:blob-xl md:blob-x-8 md:blob-y-10 opacity-100"></div>
            <div className="md:w-7/10 relative">
              <motion.h1
                className="tw-heading-3 md:tw-heading-2 mb-2 md:mb-6"
                variants={transitions.item}
              >
                Enterprise built on autonomous cloud
              </motion.h1>
              <motion.p
                className="tw-lead-sm md:tw-lead mb-8"
                variants={transitions.item}
              >
                Build next generation enterprise systems on autonomous cloud,
                powered by chain-key cryptography and secure multiparty
                computation — no bloated security departments needed
              </motion.p>
            </div>
          </AnimateSpawn>
        </section>

        <AnimateSpawn
          className="container-12 relative"
          el={motion.section}
          variants={transitions.fadeIn}
        >
          <div className="md:w-4/12 md:absolute top-10 md:-translate-y-1/2 right-0 -mt-30 md:-mt-24">
            <img
              src="/img/enterprise/enterprise-hero-image.webp"
              alt=""
              className="w-full"
            />
          </div>
        </AnimateSpawn>
        <AnimateSpawn
          className="container-10 md:mt-30 relative"
          el={motion.section}
          variants={transitions.container}
        >
          <div className="md:w-6/10">
            <motion.h2
              className="tw-heading-4 md:tw-heading-3 mb-3 md:mb-6 text-gradient"
              variants={transitions.item}
            >
              Relying on traditional cloud infrastructure introduces elevated
              costs due to bloated software
            </motion.h2>
          </div>
        </AnimateSpawn>

        <section className="mt-20 md:mt-48">
          <div className="container-10">
            <h2 className="tw-heading-60 text-gradient md:w-6/10 md:mx-auto text-center mb-16">
              Autonomous cloud for enterprises
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 md:gap-20">
              <div className="flex flex-col">
                <img
                  src="/img/enterprise/development-costs-2.svg"
                  alt=""
                  className="w-30"
                />
                <h3 className="mt-6 mb-2 tw-heading-5">
                  Lower development costs
                </h3>
                <p className="tw-paragraph mb-0">
                  Businesses can operate with leaner teams, as the security is
                  built into the protocol itself
                </p>
              </div>
              <div className="flex flex-col">
                <img
                  src="/img/enterprise/digital-identity.svg"
                  alt=""
                  className="w-30"
                />
                <h3 className="mt-6 mb-2 tw-heading-5">
                  Digital identity layer
                </h3>
                <p className="tw-paragraph mb-0">
                  No need to build proprietary identity solutions or rely on
                  for-profit companies to keep user’s data safe and private{" "}
                </p>
              </div>
              <div className="flex flex-col">
                <img
                  src="/img/enterprise/loyalty-programs.svg"
                  alt=""
                  className="w-30"
                />
                <h3 className="mt-6 mb-2 tw-heading-5">
                  Tokenized reward programs
                </h3>
                <p className="tw-paragraph mb-0">
                  Customer loyalty & employee reward programs simplified using
                  tokens
                </p>
              </div>
              <div className="flex flex-col">
                <img
                  src="/img/enterprise/secure-sharing.svg"
                  alt=""
                  className="w-30"
                />
                <h3 className="mt-6 mb-2 tw-heading-5">Secure data sharing</h3>
                <p className="tw-paragraph mb-0">
                  Zero knowledge proofs enable secure and private sharing of
                  sensitive data
                </p>
              </div>
              <div className="flex flex-col">
                <img
                  src="/img/enterprise/ownership.svg"
                  alt=""
                  className="w-30"
                />
                <h3 className="mt-6 mb-2 tw-heading-5">Simple self-custody</h3>
                <p className="tw-paragraph mb-0">
                  Users can take real ownership of their own data, and digital
                  assets
                </p>
              </div>
              <div className="flex flex-col">
                <img
                  src="/img/enterprise/supply-chain.svg"
                  alt=""
                  className="w-30"
                />
                <h3 className="mt-6 mb-2 tw-heading-5">Supply chain</h3>
                <p className="tw-paragraph mb-0">
                  Blockchain’s transparency & immutability allow for easy
                  authenticity verification
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="container-10 py-30 md:pt-60 md:pb-[600px] relative">
          <div className="md:w-6/10">
            <motion.h2
              className="tw-heading-4 md:tw-heading-3 mb-3 md:mb-6 text-gradient"
              variants={transitions.item}
            >
              Innovations in cryptography, and distributed cloud computing
              enable the Internet Computer blockchain to simplify software while
              enhancing security.
            </motion.h2>
            <motion.p>
              <Link className="button-primary">REACH OUT</Link>
            </motion.p>
          </div>
          <img
            src="/img/enterprise/big-visual.svg"
            alt=""
            className="absolute top-3/12 -right-3/10"
          />
        </section>
        <section className="bg-infinite relative overflow-hidden text-white">
          <div className="blob blob-white blob-xl blob-x-7 blob-y-0"></div>
          <div className="container-10 mt-40 md:w-6/10 md:mx-auto">
            <motion.h2
              className="tw-heading-3 md:tw-heading-60 text-center"
              variants={transitions.item}
            >
              Advantages of secure, autonomous cloud
            </motion.h2>
          </div>
          <div className="mb-20 md:mb-40 container-12 flex flex-col gap-16 md:gap-40 relative pt-30">
            <TranslatedLayout reverse={true} imageUrl="/img/defi/image-1.webp">
              <h2 className="tw-heading-3 md:tw-heading-60 md:mb-6">
                Build without bloated security departments
              </h2>
              <p className="tw-lead-sm">
                Most large software companies have dedicated security
                departments responsible for maintaining firewalls, and handling
                sensitive user data and credentials.
              </p>
              <p className="tw-lead-sm mb-6 md:mb-10">
                The Internet Computer moves all the security to the protocol
                itself, providing an unstoppable, tamperproof cloud environment.
                Building on autonomous cloud enables organizations to focus on
                the business logic of their software, lowering costs and
                speeding up development.
              </p>
              <p className="mb-0">
                <Link
                  href="/bitcoin-integration"
                  className="link-primary link-with-icon"
                >
                  <LinkArrowRight />
                  More on BTC Integration
                </Link>
              </p>
            </TranslatedLayout>
            <TranslatedLayout imageUrl="/img/defi/image-2.webp">
              <h2 className="md:tw-heading-60 md:mb-6">
                Frictionless self-custody
              </h2>
              <p className="tw-lead-sm mb-6 md:mb-10">
                Users of enterprise solutions often resort to giving up self
                custody of their data or digital assets, having to trust the
                service provider to appropriately and securely handle their
                data. Using canister smart contracts on the Internet Computer,
                organizations can simply deploy an architecture, in which all
                users have complete ownership and control of both their data and
                digital assets. This separation is enabled by chain-key
                cryptography, and most importantly doesn’t require users to go
                through complicated configuring of their accounts.
              </p>
              <p className="mb-0">
                <Link
                  href="/how-it-works#Chain-key-cryptography"
                  className="link-primary link-with-icon"
                >
                  <LinkArrowRight />
                  More on Chain-key signatures
                </Link>
              </p>
            </TranslatedLayout>
            <TranslatedLayout reverse={true} imageUrl="/img/defi/image-3.webp">
              <h2 className="tw-heading-3 md:tw-heading-60 md:mb-6">
                Managing platform risk
              </h2>
              <p className="tw-lead-sm">
                Businesses that provide crucial software infrastructure cannot
                rely on a single, often US controlled, centralized cloud
                provider. Large scale software systems that rely on centralized
                cloud providers can suffer vendor lock-in, having to deal with
                increasing server costs or refactor portions of their codebase
                because important features no longer supported.
              </p>
              <p className="tw-lead-sm">
                The Internet Computer is an open, decentralized, autonomous
                cloud, using cryptographic distributed computing. ICP connects
                independent node machine providers together, to create a self
                sovereign autonomous cloud that anyone can build on. ICP’s
                canister smart contracts are compiled to WASM (WebAssembly) the
                new W3 industry standard for cross platform, language agnostic,
                portable server executable code.
              </p>
              <p className="tw-lead-sm">
                ICP provides an alternative technology stack that can completely
                replace traditional cloud — no for-profit company is in control
                of autonomous cloud.
              </p>

              <p className="mb-0">
                <Link
                  href="/how-it-works#Chain-key-technology"
                  className="link-primary link-with-icon"
                >
                  <LinkArrowRight />
                  More on Chain-key Tokens
                </Link>
              </p>
            </TranslatedLayout>

            <TranslatedLayout imageUrl="/img/defi/image-4.webp">
              <h2 className="md:tw-heading-60 md:mb-6">
                New tokenized business model opportunities
              </h2>
              <p className="tw-lead-sm mb-6 md:mb-10">
                From loyalty programs to memberships to ticketing. Businesses
                need to manage their relationships with their customers via
                digital identities and handling of digital assets. The Internet
                Computer provides a common digital wallet that makes this
                collaboration much easier to build.
              </p>
              <p className="mb-0">
                <Link href="/sns" className="link-primary link-with-icon">
                  <LinkArrowRight />
                  More on SNS DAOs
                </Link>
              </p>
            </TranslatedLayout>
            <TranslatedLayout imageUrl="/img/defi/bitfinity.png" reverse={true}>
              <h3 className="tw-heading-4 md:tw-heading-60 mb-6">
                EVM on the Internet Computer
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-10">
                The Bitfinity EVM allows developers to run Solidity
                smart-contracts at web-speed, directly on the Internet Computer.
              </p>
              <Link
                className="link-primary link-with-icon"
                href="https://bitfinity.network"
              >
                <LinkArrowRight />
                Check out Bitfinity EVM
              </Link>
            </TranslatedLayout>
          </div>
        </section>
        <section className="container-12 py-30 md:py-48">
          <div className="text-center mb-16 md:mb-30">
            <AnimateSpawn
              className="container-12"
              variants={transitions.container}
            >
              <motion.h2
                className="tw-heading-3 md:tw-heading-2 text-gradient text-center md:w-6/12 md:mx-auto mb-8"
                variants={transitions.item}
              >
                What’s already being built
              </motion.h2>

              <motion.div variants={transitions.container}>
                <Link
                  className="button-outline text-center"
                  href="/ecosystem?tag=DeFi"
                >
                  See more DeFi Dapps
                </Link>
              </motion.div>
            </AnimateSpawn>
          </div>

          <div className="flex flex-col gap-16 md:gap-40">
            <TranslatedLayout imageUrl="/img/defi/icdex.webp" reverse={true}>
              <div className="tw-heading-6 md:tw-heading-5 mb-2 md:mb-6">
                ICDex
              </div>
              <h3 className="tw-heading-4 md:tw-heading-60 mb-6">
                Fully on-chain order book DEX
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-10">
                ICDex provides the world’s first fully on-chain order book DEX.
                Create limit orders or swap tokens instantly with complete
                transparency and decentralization - 100% on-chain.
              </p>
              <Link
                className="link-primary link-with-icon"
                href="https://icdex.io/"
              >
                <LinkArrowRight /> Check out ICDex
              </Link>
            </TranslatedLayout>
            <TranslatedLayout
              imageUrl="/img/defi/finterest.webp"
              reverse={false}
            >
              <div className="tw-heading-6 md:tw-heading-5 mb-2 md:mb-6">
                Finterest
              </div>
              <h3 className="tw-heading-4 md:tw-heading-60 mb-6">
                First-ever bridgeless lending protocol
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-10">
                Finterest is a truly decentralized borrowing protocol running on
                the Internet Computer built to support native Bitcoin borrowing
                and lending.
              </p>
              <Link
                className="link-primary link-with-icon"
                href="https://finterest.ooo/"
              >
                <LinkArrowRight /> Check out Finterest
              </Link>
            </TranslatedLayout>
            <TranslatedLayout imageUrl="/img/defi/icpswap.webp" reverse={true}>
              <div className="tw-heading-6 md:tw-heading-5 mb-2 md:mb-6">
                ICP.Swap
              </div>
              <h3 className="tw-heading-4 md:tw-heading-60 mb-6">
                Swap any ICP based token
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-10">
                ICP.Swap offers the largest number of tokens on the Internet
                Computer. Trade the latest meme coins or the most successful SNS
                DAO governance tokens.
              </p>
              <Link
                className="link-primary link-with-icon"
                href="https://icpswap.com"
              >
                <LinkArrowRight />
                Check out ICP.Swap
              </Link>
            </TranslatedLayout>
          </div>
        </section>

        <section className="max-w-page relative mx-auto mb-20 px-6 md:mb-40 md:px-15">
          <AnimateSpawn
            className=" relative text-white"
            variants={transitions.container}
          >
            <motion.div
              className="blob blob-purple blob-md blob-center z-[-1] md:blob-xl"
              variants={transitions.fadeIn}
            ></motion.div>
            <motion.h2
              className="tw-heading-5 text-center mb-2 w-full mx-auto md:tw-heading-60 md:mb-6 lg:w-8/12"
              variants={transitions.item}
            >
              Build the future of DeFi
            </motion.h2>
            <motion.p
              className="tw-lead-sm mb-0 text-center mx-auto md:w-6/12"
              variants={transitions.item}
            >
              The Internet Computer offers a plethora of out-of-the-box features
              you can use in your DeFi application.
            </motion.p>
          </AnimateSpawn>
          <AnimateSpawn
            className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-8 md:mt-16"
            variants={transitions.container}
          >
            <CardWithDescription
              title="About HTTPS outcalls"
              description=""
              href="/https-outcalls"
            />

            <CardWithDescription
              title="Sample code"
              description=""
              href="/samples?selectedDomains=Asynchronous+DeFi"
            />
            <CardWithDescription
              title="Dev docs"
              description=""
              href="/docs/current/home"
            />
            <CardWithDescription
              title="Code Bitcoin"
              description=""
              href="/bitcoin-integration"
            />
          </AnimateSpawn>
        </section>
      </main>
    </Layout>
  );
}

export default EnterprisePage;
