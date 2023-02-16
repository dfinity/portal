import Link from "@docusaurus/Link";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import TwitterIcon from "@site/static/img/ethdenver/twitter.svg";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";
import React, { useRef } from "react";
import InternetIdentity from "../components/Basics/InternetIdentity";
import AnimateSpawn from "../components/Common/AnimateSpawn";
import LinkArrowRight from "../components/Common/Icons/LinkArrowRight";
import LinkArrowUpRight from "../components/Common/Icons/LinkArrowUpRight";
import ShareMeta from "../components/Common/ShareMeta";
import BackgroundPanel from "../components/LandingPage/BackgroundPanel";
import NewsletterSection from "../components/LandingPage/NewsletterSection/NewsletterSection";
import ShowcaseSection from "../components/LandingPage/Showcase";
import { useDarkHeaderInHero } from "../utils/use-dark-header-in-hero";

function EthDenverPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const isDark = useDarkHeaderInHero(heroRef);

  return (
    <Layout
      title="Internet Computer blockchain @ ETHDenver 2023"
      description={`Visit us @ ETHDenver 2023, February 24 - March 5, 2023. Lightning fast and fully on-chain Dapps running on the Internet Computer blockchain, the only true World Computer that enables a fully decentralized ecosystem.`}
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <ShareMeta image="/img/shareImages/share-ethdenver.jpg"></ShareMeta>

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
            style={{
              background: "linear-gradient(90deg, #0E031F 0%, #281447 100%)",
            }}
            ref={heroRef}
          >
            <div className="container-12 pt-20 mb-20 md:mb-20 md:pt-36 relative flex flex-col md:flex-row">
              <div className="absolute -top-3/10 -right-2/10 w-[768px] aspect-square rounded-full opacity-40 bg-[#CB7EF1] mix-blend-color-dodge blur-[346px]"></div>

              <div className="md:w-5/12 md:ml-1/12 relative">
                <motion.h1
                  className="tw-heading-60 md:tw-heading-1 mb-6 text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #6A85F1 22.19%, #C572EF 79.9%)",
                  }}
                  variants={transitions.item}
                >
                  Build the Future
                </motion.h1>
                <motion.p
                  className="tw-lead md:tw-title-sm mb-12 md:mb-8"
                  variants={transitions.item}
                >
                  Visit us @ ETHDenver 2023
                  <br />
                  February 24 - March 5, 2023
                </motion.p>
                <motion.img
                  src="/img/ethdenver/astronaut.webp"
                  alt=""
                  className="ethdenver-astronaut md:hidden"
                  variants={{
                    hidden: {
                      opacity: 0,
                      animationPlayState: "paused",
                    },
                    show: {
                      opacity: 1,
                      animationPlayState: "running",
                      transition: {
                        duration: 0.5,
                      },
                    },
                  }}
                ></motion.img>
                <motion.p
                  className="tw-lead-sm md:tw-lead mb-8 mt-10 md:mt-0"
                  variants={transitions.item}
                >
                  Lightning fast and fully on-chain Dapps running on the
                  Internet Computer blockchain, the only true World Computer
                  that enables a fully decentralized ecosystem.
                </motion.p>

                <motion.p
                  className="tw-lead-sm md:tw-lead mb-10 md:mb-16"
                  variants={transitions.item}
                >
                  <Link className="link-white link-with-icon" href="">
                    <TwitterIcon />
                    Follow us on Twitter for updates
                  </Link>
                </motion.p>

                <motion.img
                  variants={transitions.item}
                  src="/img/ethdenver/logo.webp"
                  alt=""
                  className="md:w-80"
                />
              </div>
              <div className="flex-1 relative z-10 hidden md:block">
                <motion.img
                  src="/img/ethdenver/astronaut.webp"
                  alt=""
                  className="ethdenver-astronaut md:absolute top-0 left-0"
                  variants={{
                    hidden: {
                      opacity: 0,
                      animationPlayState: "paused",
                    },
                    show: {
                      opacity: 1,
                      animationPlayState: "running",
                      transition: {
                        duration: 0.5,
                      },
                    },
                  }}
                ></motion.img>
              </div>
            </div>
          </section>
        </AnimateSpawn>

        <section className="container-12 mt-20 md:mt-40">
          <AnimateSpawn
            className="md:w-8/12 md:mx-auto text-center"
            variants={transitions.container}
          >
            <motion.h2
              className="tw-heading-3 md:tw-heading-2 mb-3 md:mb-8"
              variants={transitions.item}
            >
              Meet the team
              <br />
              <span
                className="text-gradient-base"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #6A85F1 22.19%, #C572EF 79.9%)",
                }}
              >
                @ ICP Booth
              </span>
            </motion.h2>
            <motion.p
              className="tw-paragraph md:tw-lead mb-8 md:mb-8"
              variants={transitions.item}
            >
              Step into the exciting world of ICP Blockchain with us as your
              guide! We're here to answer all your questions and give you an
              insider's look into this cutting-edge technology.
            </motion.p>
          </AnimateSpawn>
          <div className="mt-12 md:mt-0 mb-20 md:mb-30">
            <AnimateSpawn
              className="flex gap-5 items-start flex-col md:flex-row"
              variants={transitions.container}
            >
              <motion.div
                className="flex-1 bg-white-50 rounded-xl border text-center border-white border-solid px-7 py-12"
                variants={transitions.item}
              >
                <img
                  src="/img/ethdenver/dfinity-logo.webp"
                  alt=""
                  className="h-32 mb-3"
                />
                <h3 className="tw-lead-lg md:tw-title-sm mb-3">
                  DFINITY Foundation
                </h3>
                <p className="tw-paragraph-sm text-black-60">
                  The DFINITY Foundation is a major contributor to the Internet
                  Computer blockchain.
                </p>
                <p className="mb-0">
                  <Link
                    href="https://dfinity.org"
                    className="link-primary link-with-icon"
                  >
                    Visit DFINITY Website
                    <LinkArrowUpRight />
                  </Link>
                </p>
              </motion.div>
              <motion.div
                className="flex-1 bg-white-50 rounded-xl border text-center border-white border-solid px-8 py-12 md:mt-30"
                variants={transitions.item}
              >
                <img
                  src="/img/ethdenver/astronaut-small.webp"
                  alt=""
                  className="h-32 mb-3"
                />
                <h3 className="tw-lead-lg md:tw-title-sm mb-3">
                  Internet Identity: decentralized auth using fingerprint, fob,
                  sso
                </h3>
                <p className="tw-paragraph-sm text-black-60">
                  Cras mattis consectetur purus sit amet fermentum. Cum sociis
                  natoque penatibus et magnis dis parturient montes, nascetur
                  ridiculus mus. Nullam quis risus eget urna mollis ornare vel
                  eu leo.
                </p>
                <p className="mb-0">
                  <Link
                    href="https://identity.ic0.app/"
                    className="link-primary link-with-icon"
                  >
                    Create your Internet Identity
                    <LinkArrowUpRight />
                  </Link>
                </p>
              </motion.div>
              <motion.div
                className="flex-1 bg-white-50 rounded-xl border text-center border-white border-solid px-8 py-12"
                variants={transitions.item}
              >
                <img
                  src="/img/ethdenver/ckBTC-token-1.webp"
                  alt=""
                  className="h-30 mb-3"
                />
                <h3 className="tw-lead-lg md:tw-title-sm mb-3">
                  All about ckBTC
                </h3>
                <p className="tw-paragraph-sm text-black-60">
                  Chain-Key Bitcoin (ckBTC) acts as a bitcoin ‘twin’ on ICP. It
                  is issued and redeemed via canister smart contracts and
                  verifiably backed 1:1 with real bitcoin. It’s fast, low-tx-fee
                  bitcoin on ICP with no intermediary.
                </p>
                <p className=" mb-0">
                  <Link
                    href="/bitcoin-integration"
                    className="link-primary link-with-icon"
                  >
                    Check out BTC Integration
                    <LinkArrowUpRight />
                  </Link>
                </p>
              </motion.div>
            </AnimateSpawn>
          </div>
        </section>

        <section className="bg-infinite text-white py-20 md:pt-30 md:pb-40">
          <div className="container-10 relative mb-16 md:mb-20">
            <div className="blob blob-md blob-white blob-top-right"></div>

            <div className="md:w-5/10">
              <h2 className="md:tw-heading-60 md:mb-8">
                #ICP Events
                <br />@ ETHDenver 2023
              </h2>
              <p className="tw-lead-sm mb-3">
                Join us for an electrifying ETH Denver experience filled with
                hands-on workshops, inspiring keynote speeches, interactive Q&A
                sessions, and a chance to score some awesome merch at our booth!
              </p>

              <Link
                className="link-white link-with-icon"
                href="https://twitter.com/dfinity"
              >
                <TwitterIcon />
                Follow us on Twitter for updates
              </Link>
            </div>
          </div>

          <div className="container-10 text-black space-y-12 md:space-y-16">
            <article className="rounded-xl overflow-hidden flex flex-col md:flex-row">
              <div className="aspect-square md:aspect-auto md:w-[400px] flex-shrink-0 h-full flex">
                <img
                  src="/img/ethdenver/card-1.webp"
                  alt=""
                  className="object-center object-cover"
                />
              </div>
              <div className="flex-1 bg-white flex flex-col justify-center items-start p-8 md:px-12 md:py-8">
                <h3 className="md:tw-heading-4 mb-3">#BUIDLWeek Co-Working</h3>
                <div className="tw-title-navigation mb-3">
                  Feb 24 - Mar 1, 2023 / 9:00am - 11:45pm MST each day
                </div>

                <p className="tw-lead-sm text-black-60 mb-6">
                  Cum sociis natoque penatibus et magnis dis parturient montes,
                  nascetur ridiculus mus. Vestibulum id ligula porta felis
                  euismod semper.
                </p>

                <p className="mb-0">
                  <Link className="link-primary link-with-icon">
                    See full info
                    <LinkArrowUpRight />
                  </Link>
                </p>
              </div>
            </article>

            <article className="rounded-xl overflow-hidden flex flex-col md:flex-row">
              <div className="flex-1 bg-white flex flex-col justify-center items-start p-8 md:px-12 md:py-8 order-2 md:order-1">
                <h3 className="md:tw-heading-4 mb-3">
                  Deploying Dapps on the Internet Computer: A Hands-On Workshop
                </h3>
                <div className="tw-title-navigation mb-3">
                  Feb 27, 2023 / 09:00 - 10:30am MST
                </div>

                <p className="tw-lead-sm text-black-60 mb-6">
                  Our expert instructor, Kyle Peacock, will guide you through
                  the process of setting up a development environment, selecting
                  a dapp template, and deploying it to production.
                </p>

                <p className="mb-0">
                  <Link className="link-primary link-with-icon">
                    See full info
                    <LinkArrowUpRight />
                  </Link>
                </p>
              </div>
              <div className="aspect-square md:aspect-auto md:w-[400px] flex-shrink-0 h-full flex">
                <img
                  src="/img/ethdenver/card-2.webp"
                  alt=""
                  className="object-center object-cover"
                />
              </div>
            </article>

            <article className="rounded-xl overflow-hidden flex flex-col md:flex-row">
              <div className="aspect-square md:aspect-auto md:w-[400px] flex-shrink-0 h-full flex">
                <img
                  src="/img/ethdenver/card-3.webp"
                  alt=""
                  className="object-center object-cover"
                />
              </div>
              <div className="flex-1 bg-white flex flex-col justify-center items-start p-8 md:px-12 md:py-8">
                <h3 className="md:tw-heading-4 mb-3">
                  Internet Computer blockchain for Builders – Keynote with Jan
                  Camenisch
                </h3>
                <div className="tw-title-navigation mb-3">
                  Mar 3, 2023 / 2:30pm MST
                </div>

                <p className="tw-lead-sm text-black-60 mb-6">
                  Cum sociis natoque penatibus et magnis dis parturient montes,
                  nascetur ridiculus mus. Vestibulum id ligula porta felis
                  euismod semper.
                </p>

                <p className="mb-0">
                  <Link className="link-primary link-with-icon">
                    See full info
                    <LinkArrowUpRight />
                  </Link>
                </p>
              </div>
            </article>

            <article className="rounded-xl overflow-hidden flex flex-col md:flex-row">
              <div className="flex-1 bg-white flex flex-col justify-center items-start p-8 md:px-12 md:py-8 order-2 md:order-1">
                <h3 className="md:tw-heading-4 mb-3">
                  Get in conversation with us – Booth A26
                </h3>
                <div className="tw-title-navigation mb-3">
                  Mar 2-5, 2023 / 09:00am - 6:30pm MST
                </div>

                <p className="tw-lead-sm text-black-60 mb-6">
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur et. Donec id elit non mi porta gravida at eget
                  metus. Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit.
                </p>

                <p className="mb-0">
                  <Link className="link-primary link-with-icon">
                    See floor plan
                    <LinkArrowUpRight />
                  </Link>
                </p>
              </div>
              <div className="aspect-square md:aspect-auto md:w-[400px] flex-shrink-0 h-full flex">
                <img
                  src="/img/ethdenver/card-4.webp"
                  alt=""
                  className="object-center object-cover"
                />
              </div>
            </article>
          </div>
        </section>

        <ShowcaseSection
          lines={[
            "Defi",
            "Metaverse",
            "Social media",
            "Social networking",
            "Multi-chain dapps",
            "Enterprise services",
            "R&D infrastructure",
            "Fundraising",
            "Publishing",
            "Messaging ",
            "Gaming",
            "NFTs",
          ]}
          linePostfix={
            <>
              featured at
              <br />
              the ICP booth
            </>
          }
          subheading="Featuring a few web3 project teams already reinventing the internet on the ICP blockchain."
          projectIds={[
            "icdex",
            "distrikt",
            "openchat",
            "dscvr",
            "yumi",
            "plethora",
            "funded",
            "kinic",
          ]}
          className="md:mb-40"
        ></ShowcaseSection>

        <BackgroundPanel
          panelClassName="bg-infinite"
          outerClassName="pt-10 md:pt-20 md:pb-30"
          threshold={0.25}
        >
          <InternetIdentity></InternetIdentity>
        </BackgroundPanel>
        <NewsletterSection />
      </main>
    </Layout>
  );
}

export default EthDenverPage;
