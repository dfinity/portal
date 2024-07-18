import Link from "@docusaurus/Link";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import TelegramLogo from "@site/static/img/community/telegram.svg";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";
import React, { useRef } from "react";
import AnimateSpawn from "../components/Common/AnimateSpawn";
import { CardWithDescription } from "../components/Common/Card";
import LinkArrowRight from "../components/Common/Icons/LinkArrowRight";
import Newsletter from "../components/Common/Newsletter/Newsletter";
import ShareMeta from "../components/Common/ShareMeta";
import TranslatedLayout from "../components/Common/TranslatedLayout/TranslatedLayout";
import Gallery from "../components/Community/Gallery";
import { communityGallery } from "../components/Community/gallery-images";
import Decks from "../components/LandingPage/Decks/Decks";
import { useDarkHeaderInHero } from "../utils/use-dark-header-in-hero";

function IcpEventPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const isDark = useDarkHeaderInHero(heroRef);

  return (
    <Layout
      title="Intro to ICP"
      description={`The Internet Computer adds autonomous serverless cloud functionality to the public internet – making it possible to build almost any system or service entirely on a decentralized network using “canister software,” an evolution of smart contracts.`}
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <ShareMeta image="/img/shareImages/share-icp-event.jpg"></ShareMeta>

      <main
        className="text-black relative overflow-hidden"
        style={{
          marginTop: `calc(var(--ifm-navbar-height) * -1)`,
        }}
      >
        {isDark && <DarkHeroStyles bgColor="transparent"></DarkHeroStyles>}

        <section className=" bg-infinite text-white pt-20" ref={heroRef}>
          <AnimateSpawn
            className="container-10 pt-20 pb-14 md:pb-24 md:pt-36 relative"
            variants={transitions.container}
          >
            <div className="blob blob-white blob-md blob-x-4 blob-y-8 md:blob-xl md:blob-x-8 md:blob-y-10 opacity-100"></div>
            <div
              className="
              -mt-30 md:-mt-24
              w-[700px] sm:w-[900px] md:w-[1600px]
              absolute
              -left-16 sm:left-auto
              bottom-0
              translate-y-2/3 md:translate-y-[55%]

              sm:right-0
              sm:translate-x-3/10
            "
            >
              <img
                src="/img/what-is-the-ic/hero.svg"
                alt=""
                className="w-full max-w-none"
              />
            </div>
            <div className="sm:w-8/10 md:w-6/10 relative">
              <motion.h1
                className="tw-heading-3 md:tw-heading-2 mb-8 md:mb-6"
                variants={transitions.item}
              >
                Intro to the Internet Computer
              </motion.h1>
              <motion.p
                className="pb-[15%] sm:pb-0 tw-lead-sm md:tw-lead mb-0"
                variants={transitions.item}
              >
                The Internet Computer adds autonomous serverless cloud
                functionality to the public internet – making it possible to
                build almost any system or service entirely on a decentralized
                network using “canister software,” an evolution of smart
                contracts.
              </motion.p>
            </div>
          </AnimateSpawn>
        </section>

        <AnimateSpawn
          className="container-8 mt-80 md:mt-[540px] relative"
          el={motion.section}
          variants={transitions.container}
        >
          <div className="">
            <motion.h2
              className="tw-heading-5 sm:tw-heading-4 md:tw-heading-3 mb-6 md:mb-8 text-gradient"
              variants={transitions.item}
            >
              Web3 services and enterprise systems can be built directly on the
              Internet Computer — a public decentralized network that scales.
              Host social networks, media streaming and more, that support Web3
              functionality, are tamperproof, and can trustlessly interact with
              the outside world.
            </motion.h2>
            <motion.p variants={transitions.item} className="mb-0">

            </motion.p>
          </div>
        </AnimateSpawn>

        <AnimateSpawn
          variants={transitions.container}
          className="container-12 flex flex-col gap-2 items-stretch py-20 md:pt-30 md:pb-40"
        >
          <Decks />
          <AnimateSpawn
            variants={transitions.container}
            className="bg-white/50 rounded-xl px-6 md:px-12.5 pb-30 pt-8 md:py-0 md:h-60 flex items-center relative overflow-hidden"
          >
            <div className="md:mx-1/10 flex flex-col justify-center gap-8 items-start">
              <Link
                className="button-outline text-center sm:text-left"
                href="https://dashboard.internetcomputer.org"
              >
                INTERNET COMPUTER DASHBOARD
              </Link>
              <Link
                href="https://wiki.internetcomputer.org/wiki/L1_comparison"
                className="link-primary link-with-icon"
              >
                <LinkArrowRight />
                Compare L1 blockchains
              </Link>
            </div>
            <img
              src="/img/home/dashboard.svg"
              className="absolute right-0 bottom-0 pointer-events-none"
              loading="lazy"
              alt=""
            ></img>
          </AnimateSpawn>
        </AnimateSpawn>

        <Newsletter
          fields={[
            {
              name: "EMAIL",
              placeholder: "Email",
              type: "email",
              required: true,
            },
            {
              name: "tags",
              type: "hidden",
              value: "1405",
            },
          ]}
          ctaLabel="Get updates!"
          postUrl="https://dfinity.us16.list-manage.com/subscribe/post?u=33c727489e01ff5b6e1fb6cc6&amp;id=7e9469a315&amp;f_id=00bac2e1f0"
          decoration={
            <img
              src="/img/newsletter/email-image-2.webp"
              alt=""
              loading="lazy"
            />
          }
          className="mb-20 relative"
        >
          <h2 className="text-white tw-heading-5 md:tw-heading-4 mb-6 md:mb-8 md:pr-10">
            Sign up for email updates{" "}
            <span className="text-white-60">
              to keep up to date with the Internet Computer
            </span>
          </h2>
        </Newsletter>

        <section className="container-12 pt-10 md:pt-16 pb-30 md:pb-20 relative">
          <div className="text-center mb-16 md:mb-20">
            <AnimateSpawn
              className="container-12"
              variants={transitions.container}
            >
              <motion.h2
                className="tw-heading-3 md:tw-heading-60 text-gradient text-center inline-block mb-0"
                variants={transitions.item}
              >
                Cool things on ICP
              </motion.h2>
            </AnimateSpawn>
          </div>

          <div className="flex flex-col gap-16 md:gap-40">
            <TranslatedLayout imageUrl="/img/what-is-the-ic/internet-identity.webp">
              <h3 className="tw-heading-4 md:tw-heading-60 mb-6">
                Internet Identity
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-10">
                Internet Identity enables users to quickly and securely
                authenticate to online systems and services using their devices,
                for example using their laptop fingerprint sensor, or FaceID on
                their phone. Under the skin, the framework relies on TPM chips
                inside modern hardware, which keep keys and signing secure, the
                WebAuthn protocol, which connects code inside the web browser to
                those TPMs, and advanced chain-key cryptography running on the
                Internet Computer network.
              </p>
              <Link
                className="link-primary link-with-icon"
                href="/internet-identity"
              >
                <LinkArrowRight /> Identity on ICP
              </Link>
            </TranslatedLayout>
            <TranslatedLayout
              imageUrl="/img/what-is-the-ic/open-internet-services.webp"
              reverse={true}
            >
              <h3 className="tw-heading-4 md:tw-heading-60 mb-6">
                Open Internet Services
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-10">
                Open Internet services are services that run autonomously under
                the exclusive control of a decentralized governance system
                called a Service Nervous System (SNS), an evolution of DAO
                technology. This can enable a Web3 service to be transparently
                run by a community of thousands, allowing services to founderize
                users that contribute by granting them governance tokens, for
                example for creating viral content, inverting the traditional
                Big Tech model. Enterprise can use the same technology to
                distribute control over system updates and configuration,
                greatly increasing security.
              </p>
              <p className="mb-3">
                <Link className="link-primary link-with-icon" href="/sns">
                  <LinkArrowRight /> Overview of ICP DAOs
                </Link>
              </p>
              <p className="mb-0">
                <Link
                  className="link-primary link-with-icon"
                  href="https://internetcomputer.org/ecosystem?tag=DAO"
                >
                  <LinkArrowRight /> DAOs in the Ecosystem
                </Link>
              </p>
            </TranslatedLayout>

            <TranslatedLayout imageUrl="/img/what-is-the-ic/multi-chain.webp">
              <h3 className="tw-heading-4 md:tw-heading-60 mb-6">
                Native multi-chain
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-10">
                Canister smart contracts on the Internet Computer are the glue
                between the world’s most important blockchains. ICP already
                integrates with the Bitcoin Network, and native ETH integration
                is underway. Inter-chain communication and innovations such as
                chain-key ECDSA allow canister smart contracts to directly hold,
                receive and send BTC and ETH seamlessly across chains, creating
                a trustless multi-chain environment that allows end users to
                transfer crypto assets at the speed of a chat message without
                bridges or third-party intermediaries.
              </p>
              <p className="mb-3">
                <Link
                  className="link-primary link-with-icon"
                  href="/bitcoin-integration"
                >
                  <LinkArrowRight /> Bitcoin
                </Link>
              </p>
              <p className="mb-0">
                <Link
                  className="link-primary link-with-icon"
                  href="/ethereum-integration"
                >
                  <LinkArrowRight /> Ethereum
                </Link>
              </p>
            </TranslatedLayout>
          </div>
        </section>

        <section className="max-w-page relative mx-auto mb-20 px-6 md:mb-40 md:px-15 mt-30">
          <AnimateSpawn
            className=" relative text-white"
            variants={transitions.container}
          >
            <motion.div
              className="blob blob-purple blob-sm blob-x-5 blob-y-7 z-[-1] md:blob-lg"
              variants={transitions.fadeIn}
            ></motion.div>
            <motion.h2
              className="tw-heading-3 text-center mb-2 w-full mx-auto md:tw-heading-60 md:mb-6 lg:w-6/12"
              variants={transitions.item}
            >
              How to get involved?
            </motion.h2>
          </AnimateSpawn>

          <AnimateSpawn
            className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-8 md:mt-16"
            variants={transitions.container}
          >
            <CardWithDescription
              title="Community Grants"
              description=""
              href="https://dfinity.org/community-grants/"
            />

            <CardWithDescription
              title="Developer Grants"
              description=""
              href="https://dfinity.org/grants/"
            />
            <CardWithDescription
              title="Become a Node Provider"
              description=""
              href="https://wiki.internetcomputer.org/wiki/Node_Provider_Documentation"
            />
            <CardWithDescription
              title="Start building on ICP"
              description=""
              href="/docs/current/home"
            />
          </AnimateSpawn>
        </section>
        <section className="bg-infinite text-white mt-20 md:mt-40 py-20 md:py-40">
          <Gallery gallery={communityGallery}>
            <div className="blob blob-white blob-md blob-x-10 blob-y-0"></div>
            <div className="md:w-7/10">
              <motion.h2
                className="tw-heading-3 sm:tw-heading-4 md:tw-heading-60 mb-8 md:mb-6"
                variants={transitions.item}
              >
                Join, collaborate and connect
              </motion.h2>
              <motion.p
                className="tw-paragraph md:tw-lead mb-6"
                variants={transitions.item}
              >
                The ICP community is currently active in around 30 countries and
                collaborates with up to 50 well-known crypto organizations and
                32 universities. Haven't joined yet? What are you waiting for?
              </motion.p>
              <motion.p
                className="mb-0 flex gap-8 flex-col items-start md:flex-row md:items-center"
                variants={transitions.item}
              >
                <Link className="button-white" href="/community">
                  Explore ICP Community
                </Link>
                <Link className="link-white" href="https://t.me/Official_ICP">
                  <TelegramLogo className="inline-block align-text-bottom mr-2" />
                  Join the official ICP Telegram Space
                </Link>
              </motion.p>
            </div>
          </Gallery>
        </section>
      </main>
    </Layout>
  );
}

export default IcpEventPage;
