import Link from "@docusaurus/Link";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import LocationIcon from "@site/static/img/ethdenver/location.svg";
import TwitterIcon from "@site/static/img/ethdenver/twitter.svg";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";
import React, { useRef } from "react";
import AnimateSpawn from "../components/Common/AnimateSpawn";
import LinkArrowRight from "../components/Common/Icons/LinkArrowRight";
import LinkArrowUpRight from "../components/Common/Icons/LinkArrowUpRight";
import ShareMeta from "../components/Common/ShareMeta";
import BackgroundPanel from "../components/LandingPage/BackgroundPanel";
import { useDarkHeaderInHero } from "../utils/use-dark-header-in-hero";

import BiometricIcon from "@site/src/components/Basics/InternetIdentity/biometric.svg";
import NoTrackingIcon from "@site/src/components/Basics/InternetIdentity/privacy.svg";
import WebAuthnIcon from "@site/src/components/Basics/InternetIdentity/webauthn.svg";
import StartBuildingSection from "@site/src/components/LandingPage/StartBuilding";
import { OnChainBadge } from "../components/Common/OnChainBadge/OnChainBadge";
import IntraPageNav from "../components/Common/IntraPageNav";

const MotionLink = motion(Link);

const projects: {
  logo: string;
  name: string;
  description: string;
  agenda: string[];
}[] = [
  {
    name: "AstroX (me wallet)",
    logo: "/img/ethdenver/astrox.webp",
    description:
      "Multichain wallet securing your assets without seed phrase across any devices.",
    agenda: ["Mar 2 - 5, 2023"],
  },
  {
    name: "Hot or Not",
    logo: "/img/ethdenver/hotornot.webp",
    description: "Monetise Time on Social Media. Video platform in ICP.",
    agenda: ["Mar 2 - 5, 2023"],
  },
  {
    name: "Finterest",
    logo: "/img/ethdenver/finterest.webp",
    description: "The first truly decentralized price feed.",
    agenda: ["Mar 2 - 5, 2023"],
  },
  {
    name: "Toniq Labs",
    logo: "/img/ethdenver/toniq.webp",
    description: "We help you build, launch, and grow NFT-based businesses.",
    agenda: ["Mar 2 - 5, 2023"],
  },
  {
    name: "ORIGYN",
    logo: "/img/ethdenver/origyn.webp",
    description: "Digital verifications for physical objects through NFTs.",
    agenda: ["Mar 3 / 4, 2023"],
  },

  {
    name: "Demergent Labs",
    logo: "/img/ethdenver/demergent-labs.webp",
    description:
      "Accelerating the adoption of Web3 and the Internet Computer.",
    agenda: ["Mar 3 / 4, 2023"],
  },
  {
    name: "Itoka",
    logo: "/img/ethdenver/itoka-logo.webp",
    description: "Become a musician smooth and simple with AI and Web3 technology. Only on ICP.",
    agenda: ["Mar 3 / 4, 2023", "5:00pm - 6:00pm MST"],
    
  },

  {
    name: "ntagle",
    logo: "/img/ethdenver/ntagle-logo.webp",
    description: "Scalable and cost-effective way to trustlessly bind physical objects to canisters",
    agenda: ["Mar 4, 2023", "8:00am - 10:00am MST"],
  },
];

function EthDenverPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const isDark = useDarkHeaderInHero(heroRef);

  return (
    <Layout
      title="Internet Computer blockchain @ ETHDenver 2023"
      description={`Visit us @ ETHDenver 2023, February 24 - March 5, 2023. Lightning fast and fully on-chain Dapps running on the Internet Computer blockchain, the only true World Computer that enables a fully decentralized ecosystem.`}
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <ShareMeta image="/img/shareImages/share-ethdenver-2.jpg"></ShareMeta>

      <main
        className="text-black relative overflow-hidden"
        style={{
          marginTop: `calc(var(--ifm-navbar-height) * -1)`,
        }}
      >
        {isDark && <DarkHeroStyles bgColor="transparent"></DarkHeroStyles>}
        <section id="intro">
          <AnimateSpawn variants={transitions.container}>
            <div
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
                    className="tw-heading-60 md:tw-heading-1 mb-6 text-transparent bg-clip-text text-gradient-denver"
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
                    <Link
                      className="link-white link-with-icon"
                      href="https://twitter.com/dfinity"
                    >
                      <TwitterIcon className="w-6 h-6" />
                      Follow us on Twitter for updates
                    </Link>
                  </motion.p>

                  <Link
                    href="https://www.ethdenver.com/"
                    aria-label="Go to ETHDenver home page"
                  >
                    <motion.img
                      variants={transitions.item}
                      src="/img/ethdenver/logo.webp"
                      alt=""
                      className="md:w-80"
                    />
                  </Link>
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
                <motion.div
                  variants={transitions.fadeIn}
                  className="pt-10 flex justify-center md:absolute right-[50px] bottom-20"
                >
                  <OnChainBadge className=""></OnChainBadge>
                </motion.div>
              </div>
            </div>
          </AnimateSpawn>
        </section>
        <section className="container-10 py-20 md:py-40" id="bounties">
          <AnimateSpawn
            className="flex flex-col md:flex-row mb-20 md:mb-12"
            variants={transitions.container}
          >
            <div className="md:w-6/10">
              <motion.h2
                className="tw-heading-4 md:tw-heading-60 mb-6 md:mb-8"
                variants={transitions.item}
              >
                <span className="text-gradient-base text-gradient-denver">
                  ETHDenver Bounties
                </span>
                <br />
                Get Your Hack On
              </motion.h2>
              <motion.img
                src="/img/ethdenver/motoko-playground.webp"
                alt=""
                className="w-full md:hidden mb-6"
                variants={transitions.fadeIn}
              />
              <motion.p className="tw-lead-sm mb-8" variants={transitions.item}>
                Bring DeFi and SocFi to Bitcoin, go mad with NFTs, or
                decentralize an Ethereum DAO on the Internet Computer and get
                rewarded for it. This is your chance to #BUIDL the future
                internet!{" "}
              </motion.p>
              <motion.div
                className="flex flex-col md:flex-row gap-4 md:gap-8 items-start md:items-center"
                variants={transitions.item}
              >
                <Link
                  href="https://app.buidlbox.io/guidl/dfinity"
                  className="button-primary"
                >
                  Sign Up
                </Link>
                <Link
                  className="link-primary link-with-icon"
                  href="https://twitter.com/DFINITYDev"
                >
                  <TwitterIcon />
                  Follow for Developer related updates
                </Link>
              </motion.div>
            </div>
            <div className="md:w-4/10 hidden md:block">
              <img
                src="/img/ethdenver/motoko-playground.webp"
                alt=""
                className="w-full"
              />
            </div>
          </AnimateSpawn>

          <AnimateSpawn className="" variants={transitions.container}>
            <motion.h3
              className="tw-heading-5 md:tw-heading-4 mb-8"
              variants={transitions.item}
            >
              Participation Categories:
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <motion.div
                className="bg-white-60 border border-solid border-white rounded-xl px-6 py-8"
                variants={transitions.item}
              >
                <h4 className="tw-heading-5 mb-3">
                  Decentralized Frontend Hosting for DAOs
                </h4>
                <p className="tw-paragraph text-black-60 mb-6">
                  Challenge: host a frontend on the Internet Computer as well as
                  a 2nd canister smart contract that uses the HTTPS outcalls
                  feature to call an Ethereum RPC node to fetch the voting
                  result of a frontend upgrade proposal. The canister should
                  then perform the upgrade of the frontend.
                </p>
                <p className="tw-lead text-gradient-base text-gradient-denver inline-block mb-0">
                  $5,000 in ICP
                </p>
              </motion.div>
              <motion.div
                className="bg-white-60 border border-solid border-white rounded-xl px-6 py-8"
                variants={transitions.item}
              >
                <h4 className="tw-heading-5 mb-3">
                  Get crazy with dynamic NFTs hosted on the Internet Computer
                </h4>
                <p className="tw-paragraph text-black-60 mb-6">
                  Challenge: create a dynamic NFT collection on Ethereum (or
                  EVM-compatible chain) where linked assets are provided by
                  canister smart contract on the Internet Computer that can
                  serve HTTP requests directly to browsers.
                </p>
                <p className="tw-lead text-gradient-base text-gradient-denver inline-block mb-0">
                  $5,000 + Chance for $25,000 DFINITY Grant
                </p>
              </motion.div>
              <motion.div
                className="bg-white-60 border border-solid border-white rounded-xl px-6 py-8"
                variants={transitions.item}
              >
                <h4 className="tw-heading-5 mb-3">
                  Integrate with the Internet Computer
                </h4>
                <p className="tw-paragraph text-black-60 mb-6">
                  Open bounty: find a creative and impactful way to integrate
                  with an Ethereum (or EVM-compatible) project using some of the
                  unique capabilities of the Internet Computer.
                </p>
                <p className="tw-lead text-gradient-base text-gradient-denver inline-block mb-0">
                  $5,000 + Chance for $25,000 DFINITY Grant
                </p>
              </motion.div>
              <motion.div
                className="bg-white-60 border border-solid border-white rounded-xl px-6 py-8"
                variants={transitions.item}
              >
                <h4 className="tw-heading-5 mb-3">Build with Bitcoin</h4>
                <p className="tw-paragraph text-black-60 mb-6">
                  Challenge: leverage either the native Bitcoin integration or
                  ckBTC to build an innovative and impactful cross-chain
                  solution. 
                </p>
                <p className="tw-lead text-gradient-base text-gradient-denver inline-block mb-0">
                  $5,000 + Chance for $25,000 DFINITY Grant
                </p>
              </motion.div>
              <motion.div
                className="bg-white-60 border border-solid border-white rounded-xl px-6 py-8"
                variants={transitions.item}
              >
                <h4 className="tw-heading-5 mb-3">
                  On-chain Governance for EVM DAOs
                </h4>
                <p className="tw-paragraph text-black-60 mb-6">
                  Challenge: explore ways of using the Internet Computer as a
                  governance platform for DAOs on Ethereum or another
                  EVM-compatible chain as a powerful replacement for Snapshot.
                </p>
                <p className="tw-lead text-gradient-base text-gradient-denver inline-block mb-0">
                  $5,000 + Chance for $25,000 DFINITY Grant
                </p>
              </motion.div>
            </div>
          </AnimateSpawn>
        </section>
        <section
          className="bg-infinite text-white py-20 md:pt-30 md:pb-40"
          id="agenda"
        >
          <AnimateSpawn
            className="container-10 relative mb-16 md:mb-20"
            variants={transitions.container}
          >
            <motion.div
              className="blob blob-md blob-white blob-top-right"
              variants={transitions.fadeIn}
            ></motion.div>

            <div className="md:w-6/10">
              <motion.h2
                className="tw-heading-4 md:tw-heading-60 md:mb-8"
                variants={transitions.item}
              >
                Meet ICP Folks
                <br />@ ETHDenver 2023
              </motion.h2>
              <motion.p className="tw-lead-sm mb-8" variants={transitions.item}>
                Join us for an electrifying ETH Denver experience filled with
                hands-on workshops, inspiring keynote speeches, interactive Q&A
                sessions, and live demos of ICP Ecosystem dapps at our booth!
              </motion.p>

              <MotionLink
                className="link-white link-with-icon"
                href="https://twitter.com/dfinity"
                variants={transitions.item}
              >
                <TwitterIcon />
                Follow us on Twitter for updates
              </MotionLink>
            </div>
          </AnimateSpawn>

          <div className="container-10 text-black space-y-12 md:space-y-16">
            <AnimateSpawn
              className="rounded-xl overflow-hidden flex flex-col md:flex-row"
              variants={transitions.item}
            >
              <div className="flex-1 bg-white flex flex-col justify-center items-start p-6 md:px-12 md:py-8  order-2 md:order-1">
                <h3 className="md:tw-heading-4 mb-3">
                  Bounties explained by Dominic Wörner
                </h3>
                <ul className="tw-title-navigation mb-3 list-none p-0 flex flex-col md:flex-row md:flex-wrap gap-1 md:gap-x-4 md:gap-y-3">
                  <li>Feb 24 - Mar 5, 2023</li>
                  <li className="flex items-center gap-1">
                    <LocationIcon />
                    BUIDLathon
                  </li>
                </ul>

                <p className="tw-paragraph md:tw-lead-sm text-black-60 mb-6">
                  Join Dominic Wörner, Developer Relations Engineer at DFINITY,
                  jumps on Twitch to highlight the advantages of building on the
                  Internet Computer and to give you an overview of the 5 bounty
                  categories. BUIDLers, make sure to tune in for details.
                </p>

                <p className="mb-0">
                  <Link
                    href="https://youtu.be/awjhuGUdENI"
                    className="link-primary link-with-icon"
                  >
                    Watch bounty explainer video 
                    <LinkArrowUpRight />
                  </Link>
                </p>
              </div>
              <div className="aspect-square md:aspect-auto md:w-[400px] flex-shrink-0 flex order-1 md:order-2">
                <img
                  src="/img/ethdenver/card-0.webp"
                  alt=""
                  className="object-center object-cover"
                />
              </div>
            </AnimateSpawn>

            <AnimateSpawn
              className="rounded-xl overflow-hidden flex flex-col md:flex-row"
              variants={transitions.item}
            >
              <div className="aspect-square md:aspect-auto md:w-[400px] flex-shrink-0 flex">
                <img
                  src="/img/ethdenver/card-1.webp"
                  alt=""
                  className="object-center object-cover"
                />
              </div>
              <div className="flex-1 bg-white flex flex-col justify-center items-start p-6 md:px-12 md:py-8">
                <h3 className="md:tw-heading-4 mb-3">#BUIDLWeek Co-Working</h3>
                <ul className="tw-title-navigation mb-3 list-none p-0 flex flex-col md:flex-row md:flex-wrap gap-1 md:gap-x-4 md:gap-y-3">
                  <li>Feb 24 - Mar 1, 2023</li>
                  <li>9:00am - 11:45pm MST</li>
                  <li className="flex items-center gap-1">
                    <LocationIcon />
                    BUIDLHub
                  </li>
                </ul>

                <p className="tw-paragraph md:tw-lead-sm text-black-60 mb-3">
                  Looking for a place to work on your new blockchain project
                  during #BUIDLWeek? Stop by our Co-Working space! Our SDK reps
                  will be on-site (10:00am-4:00pm) to answer your questions
                  throughout the week.
                </p>
                <p className="tw-paragraph md:tw-lead-sm text-black-60 mb-6">
                  Sponsored by DFINTY, a contributor to the Internet Computer.
                </p>

                <p className="mb-0">
                  <Link
                    href="https://events.ethdenver.com/eden23/attendease/networking/experience/dc39b164-1896-405b-8ee1-3ea5343337cd/44e5155f-8ba2-4fa2-acb2-8515469a1073"
                    className="link-primary link-with-icon"
                  >
                    See full info
                    <LinkArrowUpRight />
                  </Link>
                </p>
              </div>
            </AnimateSpawn>

            <AnimateSpawn
              className="rounded-xl overflow-hidden flex flex-col md:flex-row"
              variants={transitions.item}
            >
              <div className="flex-1 bg-white flex flex-col justify-center items-start p-6 md:px-12 md:py-8 order-2 md:order-1">
                <h3 className="md:tw-heading-4 mb-3">
                  Deploying Dapps on the Internet Computer: A Hands-On Workshop
                </h3>
                <ul className="tw-title-navigation mb-3 list-none p-0 flex flex-col md:flex-row md:flex-wrap gap-1 md:gap-x-4 md:gap-y-3">
                  <li>Feb 27, 2023</li>
                  <li>9:00 - 10:30am MST</li>
                  <li className="flex items-center gap-1">
                    <LocationIcon />
                    Vib Hotel
                  </li>
                </ul>

                <p className="tw-paragraph md:tw-lead-sm text-black-60 mb-6">
                  Join Kyle Peacock for an exciting workshop on decentralized
                  hosting with HTTPS, smart contract backends with 2-second
                  writes and DID principals with 123123123 number of users.
                </p>

                <p className="mb-0">
                  <Link
                    href="https://events.ethdenver.com/eden23/attendease/networking/experience/fcea70a2-372f-41b7-962d-007ac212dbd9/93aa96fc-3c89-437a-8503-f62bf082d16e"
                    className="link-primary link-with-icon"
                  >
                    See full info
                    <LinkArrowUpRight />
                  </Link>
                </p>
              </div>
              <div className="aspect-square md:aspect-auto md:w-[400px] flex-shrink-0 flex order-1 md:order-2">
                <img
                  src="/img/ethdenver/card-2.webp"
                  alt=""
                  className="object-center object-cover"
                />
              </div>
            </AnimateSpawn>

            <AnimateSpawn
              className="rounded-xl overflow-hidden flex flex-col md:flex-row"
              variants={transitions.item}
            >
              <div className="aspect-square md:aspect-auto md:w-[400px] flex-shrink-0 flex">
                <img
                  src="/img/ethdenver/card-3.webp"
                  alt=""
                  className="object-center object-cover"
                />
              </div>
              <div className="flex-1 bg-white flex flex-col justify-center items-start p-6 md:px-12 md:py-8">
                <h3 className="md:tw-heading-4 mb-3">
                  World Computer: Ethereum + Internet Computer – Keynote with
                  Jan Camenisch
                </h3>
                <ul className="tw-title-navigation mb-3 list-none p-0 flex flex-col md:flex-row md:flex-wrap gap-1 md:gap-x-4 md:gap-y-3">
                  <li>Mar 4, 2023</li>
                  <li>9:00am MST</li>
                  <li className="flex items-center gap-1">
                    <LocationIcon />
                    DeFi Stage
                  </li>
                </ul>

                <p className="tw-paragraph md:tw-lead-sm text-black-60 mb-6">
                  Jan Camenisch, CTO of the DFINITY Foundation, and one of the
                  world’s most renowned cryptographers will take you on a
                  journey through the architecture of the Internet Computer
                  Protocol and its vision to become a World Computer.
                </p>

                <p className="mb-0">
                  <Link
                    href="https://events.ethdenver.com/eden23/attendease/networking/experience/e645c2d5-e178-471c-ab3a-f2ba6c296f20/66a0d48e-8617-463f-b454-a6ee5e6b39fd"
                    className="link-primary link-with-icon"
                  >
                    See full info
                    <LinkArrowUpRight />
                  </Link>
                </p>
              </div>
            </AnimateSpawn>

            <AnimateSpawn
              className="rounded-xl overflow-hidden flex flex-col md:flex-row"
              variants={transitions.item}
            >
              <div className="flex-1 bg-white flex flex-col justify-center items-start p-6 md:px-12 md:py-8 order-2 md:order-1">
                <h3 className="md:tw-heading-4 mb-3">
                  Come by for a Chat @ICP Booth
                </h3>
                <ul className="tw-title-navigation mb-3 list-none p-0 flex flex-col md:flex-row md:flex-wrap gap-1 md:gap-x-4 md:gap-y-3">
                  <li>Mar 2-5, 2023</li>
                  <li>9:00am - 6:30pm MST</li>
                  <li className="flex items-center gap-1">
                    <LocationIcon />
                    Find us at DAO Town
                  </li>
                  <li>Community demos by ecosystem</li>
                </ul>

                <p className="tw-paragraph md:tw-lead-sm text-black-60 mb-6">
                  The ICP Community would love to meet you! Hang with teams from
                  the ecosystem, see demos, learn how to create an Internet
                  Identity to try out some of our coolest dapps.
                </p>

                <p className="mb-0">
                  <Link
                    href="https://www.ethdenver.com/map"
                    className="link-primary link-with-icon"
                  >
                    See map
                    <LinkArrowUpRight />
                  </Link>
                </p>
              </div>
              <div className="aspect-square md:aspect-auto md:w-[400px] flex-shrink-0 flex order-1 md:order-2">
                <img
                  src="/img/ethdenver/card-4.webp"
                  alt=""
                  className="object-center object-cover"
                />
              </div>
            </AnimateSpawn>

            <AnimateSpawn
              className="rounded-xl overflow-hidden flex flex-col md:flex-row"
              variants={transitions.item}
            >
              <div className="aspect-square md:aspect-auto md:w-[400px] flex-shrink-0 flex">
                <img
                  src="/img/ethdenver/card-5.webp"
                  alt=""
                  className="object-center object-cover"
                />
              </div>
              <div className="flex-1 bg-white flex flex-col justify-center items-start p-6 md:px-12 md:py-8">
                <h3 className="md:tw-heading-4 mb-3">Hack for Bounties</h3>
                <ul className="tw-title-navigation mb-3 list-none p-0 flex flex-col md:flex-row md:flex-wrap gap-1 md:gap-x-4 md:gap-y-3">
                  <li>Feb 24 -Mar 5, 2023</li>
                  <li>Feb 24 @ 10am - Mar 5 @ 8am MST</li>
                  <li className="flex items-center gap-1">
                    <LocationIcon />
                    Co-Working @BUIDLHub
                  </li>
                </ul>

                <p className="tw-paragraph md:tw-lead-sm text-black-60 mb-6">
                  The DFINITY Foundation is giving out bounties in various
                  categories to hackers with talent during the BUIDLathon. For
                  questions and assistance, find our dev reps at the co-working
                  space. Don’t miss this chance to be a pioneer of Web3. You can 
                  also join {" "} 
                  <Link href="https://discord.gg/sporkdao"> 
                    Discord
                  </Link> {" "}
                  to ask questions and get support. 
                </p>

                <p className="mb-0">
                  <Link
                    href="https://medium.com/@dfinity/buidl-the-future-on-the-internet-computer-at-ethdenver-2023-f86fb62aba54"
                    className="link-primary link-with-icon"
                  >
                    See full info
                    <LinkArrowUpRight />
                  </Link>
                </p>
              </div>
            </AnimateSpawn>
          </div>
        </section>
        <section id="ecosystem" className="relative z-0 mb-20">
          <AnimateSpawn variants={transitions.item}>
            <div className="container-10 pt-20 md:pt-30">
              <div className="">
                <h2 className="tw-heading-3 md:tw-heading-2">
                  Try some Dapps
                  <br />
                  <span className="inline-block text-gradient-base text-gradient-denver">
                    @ ICP Booth
                  </span>
                </h2>
                <p className="tw-lead-sm md:tw-lead text-black-60 mb-6 md:w-6/10">
                  Step into the exciting world of ICP with us as your guide!
                  Take a look at the Web3 projects currently reinventing the
                  internet on the Internet Computer blockchain.
                </p>
              
              </div>
              <Link className="link-primary link-with-icon" href="https://docs.google.com/spreadsheets/d/1izcKFRYuZTM2yeDS3tj63Ph1rYFuXl-7WA9pB-4DVyk/edit?usp=sharing">
                  <LinkArrowRight />
                  See Community Agenda in detail
                </Link>
            </div>
            <AnimateSpawn
              className="container-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 mt-12"
              variants={transitions.container}
            >
              {projects.map((p, i) => (
                <motion.article
                  variants={transitions.item}
                  key={p.name + i}
                  className="rounded-xl border relative border-white border-solid backdrop-blur-2xl bg-white-60 p-6 md:p-8 no-underline text-black hover:no-underline hover:text-black flex flex-col"
                >
                  <img
                    src={p.logo}
                    alt={p.name}
                    className="w-16 sm:w-20 mb-3 h-16 sm:h-20 object-contain absolute left-6 top-6 sm:static"
                  />
                  <div className="ml-[86px] sm:ml-0 flex-1 flex flex-col">
                    <h3 className="tw-heading-6 sm:tw-heading-5 mb-1 sm:mb-2">
                      {p.name}
                    </h3>
                    <p className="tw-paragraph-sm sm:tw-lead-sm mb-3 sm:mb-4 text-black-60 flex-1">
                      {p.description}
                    </p>
                    <p className="mb-0 tw-title-navigation text-gradient-base text-gradient-denver">
                      {p.agenda.map((a) => (
                        <span key={a} className="inline-block">
                          {a}
                        </span>
                      ))}
                    </p>
                  </div>
                </motion.article>
              ))}
            </AnimateSpawn>

            <div className="relative -mt-96 mb-10 md:mb-40">
              {/* <AnimateSpawn
                el={motion.img}
                variants={transitions.fadeIn}
                src={BlobGradient}
                alt=""
                className="max-w-none w-[800px] md:w-[1200px] absolute top-[-200px] md:top-[-400px] left-1/2 -translate-x-1/2 z-[-1]"
              /> */}

              <motion.div
                variants={transitions.fadeIn}
                className="blob blob-purple blob-lg blob-center z-[-1]"
              />

              <AnimateSpawn
                className="mt-96 pt-20 md:pt-30 text-center flex flex-col items-center gap-6"
                variants={transitions.item}
              >
                <Link className="button-primary" href="/ecosystem">
                  Check out the Ecosystem
                </Link>
                <Link className="link-white link-with-icon" href="/developers">
                  <LinkArrowRight />
                  Build your own
                </Link>
              </AnimateSpawn>
            </div>
          </AnimateSpawn>
        </section>
        <BackgroundPanel
          panelClassName="bg-infinite"
          outerClassName="pt-10 md:pt-20 md:pb-30"
          threshold={0.25}
          id="internet-identity"
        >
          <div className="">
            <AnimateSpawn
              variants={transitions.container}
              className="container-10 text-white mb-12 md:mb-20 relative"
            >
              <motion.div
                className="blob blob-white blob-xl blob-top-right z-[-1]"
                variants={transitions.fadeIn}
              ></motion.div>
              <div className="md:w-6/10">
                <motion.h2
                  variants={transitions.item}
                  className="tw-heading-3 md:tw-heading-60 mb-6"
                >
                  <span className="inline-block text-gradient-base text-gradient-denver">
                    Join the movement!
                  </span>
                  <br />
                  Get Yourself an
                  <br /> Internet Identity
                </motion.h2>
                <motion.p
                  variants={transitions.item}
                  className="tw-paragraph md:tw-lead-sm mb-8 md:mb-6"
                >
                  Web2 login experience with blockchain security. Internet
                  Identity is a privacy-enhancing WebAuthn framework to
                  applications on the Internet Computer.
                </motion.p>
                <MotionLink
                  className="button-outline-white"
                  href="https://identity.ic0.app/"
                  variants={transitions.item}
                >
                  Set one up now!
                </MotionLink>
              </div>
            </AnimateSpawn>
            <AnimateSpawn
              variants={transitions.container}
              className="container-12 flex flex-col md:flex-row gap-5 text-white relative"
            >
              <motion.div
                variants={transitions.item}
                className="flex-1 p-6 md:px-8 md:py-12 grid grid-rows-[auto_1fr_auto] border border-solid border-white-20 rounded-xl"
              >
                <BiometricIcon className="w-16 h-16 mb-4 md:"></BiometricIcon>

                <h3 className="tw-heading-5 md:tw-heading-3 mb-3 self-end">
                  Biometric login
                </h3>
                <p className="tw-paragraph md:tw-lead-sm mb-0 text-white-60">
                  Authenticate via FaceID, fingerprint sensor or a YubiKey. This
                  provides the most security, as the cryptographic key never
                  leaves your device.
                </p>
              </motion.div>

              <motion.div
                variants={transitions.item}
                className="flex-1 p-6 md:px-8 md:py-12 grid grid-rows-[auto_1fr_auto] border border-solid border-white-20 rounded-xl"
              >
                <NoTrackingIcon className="w-16 h-16 mb-4 md:"></NoTrackingIcon>
                <h3 className="tw-heading-5 md:tw-heading-3 mb-3 self-end">
                  No tracking
                </h3>
                <p className="tw-paragraph md:tw-lead-sm mb-0 text-white-60">
                  Remain anonymous using the Internet Identity authentication
                  framework, which prevents user tracking across dapps and
                  services.
                </p>
              </motion.div>
              <motion.div
                variants={transitions.item}
                className="flex-1 p-6 md:px-8 md:py-12 grid grid-rows-[auto_1fr_auto] border border-solid border-white-20 rounded-xl"
              >
                <WebAuthnIcon className="w-16 h-16 mb-4 md:"></WebAuthnIcon>
                <h3 className="tw-heading-5 md:tw-heading-3 mb-3 self-end">
                  WebAuthn
                </h3>
                <p className="tw-paragraph md:tw-lead-sm mb-0 text-white-60">
                  Internet Identity integrates the widely used secure web2
                  authentication framework known as WebAuthn for maximum
                  compatibility.
                </p>
              </motion.div>
            </AnimateSpawn>
          </div>
        </BackgroundPanel>
        <section id="blockchain-singularity">
          <AnimateSpawn
            className="md:container-12 pt-20 md:py-30"
            variants={transitions.container}
          >
            <div className="md:rounded-[32px] backdrop-blur-2xl bg-white-60 px-1/12 pb-20 md:py-30 relative">
              <div className="-translate-y-24 sm:-translate-y-40 md:translate-y-0 md:absolute z-[-1] md:w-[500px] lg:w-[780px] md:top-[40px] lg:top-[-130px] right-0 overflow-hidden">
                <motion.img
                  src="/img/home/dao.svg"
                  alt=""
                  className="w-full relative md:right-[-50px] lg:right-[-100px]"
                  variants={transitions.item}
                />
              </div>
              <div className="md:w-5/10 -mt-16 md:mt-0">
                <motion.img
                  src="/img/ethdenver/logo-dfinity.svg"
                  className="inline-block mb-3 md:mb-6"
                  alt=""
                  variants={transitions.item}
                />
                <motion.h2
                  className="text-transparent bg-clip-text text-gradient-base text-gradient-denver tw-heading-3 md:tw-heading-2 mb-6"
                  variants={transitions.item}
                >
                  Blockchain Singularity
                </motion.h2>
                <motion.p
                  className="tw-lead-sm md:tw-lead-sm mb-12"
                  variants={transitions.item}
                >
                  Web3 still runs on Big Tech's cloud. Blockchains can host
                  tokens, but only tiny amounts of data and compute, and no web.
                  But not the Internet Computer blockchain. This platform runs
                  it all on-chain, fully decentralized — from simple dapps, to
                  high user-volume social networks and games, to oderbook
                  exchanges and enterprise systems, without the need for
                  traditional IT.
                </motion.p>
              </div>
              <div className="md:w-6/10">
                <motion.p
                  className="flex flex-col sm:flex-row items-start md:items-center gap-6 md:gap-8 mb-0"
                  variants={transitions.item}
                >
                  <Link className="button-primary" href="/capabilities">
                    ICP CAPabilities
                  </Link>
                  <Link className="link-primary link-with-icon" href="/">
                    <LinkArrowRight />
                    Learn more at internetcomputer.org
                  </Link>
                </motion.p>
              </div>
            </div>
          </AnimateSpawn>
        </section>
        <StartBuildingSection
          id="start-building"
          title="Be a pioneer of Web3"
          body="Start a DAO, create a token, build dapps and host assets with the full stack entirely on-chain."
          cta="BUILD REAL WEB3"
          ctaLink="/developers"
          cards={[
            {
              title: "Dev Forum",
              body: "Engage with the ICP community to shape future features, propose new ideas, and ask questions. ",
              link: "https://forum.dfinity.org",
            },
            {
              title: "Dev Docs",
              body: "Get to know the concepts,  architecture and technical breakthroughs that enable the ICP. Plus step-by-step guides on how to stake your tokens, and more.",
              link: "/docs/current/home",
            },
            {
              title: "Sample Code",
              body: "From a simple DEX, to on-chain encrypted storage, NFT minting, and a basic DAO, learn how to build on the Internet Computer.",
              link: "/samples",
            },
            {
              title: "Motoko Playground",
              body: "Play around with Motoko, the native language of the Internet Computer, right in the browser without having to download the SDK.",
              link: "https://m7sm4-2iaaa-aaaab-qabra-cai.raw.ic0.app/",
            },
          ]}
        />
        <IntraPageNav
          hasHome={false}
          links={[
            { text: "Intro", to: "#intro" },
            { text: "Bounties", to: "#bounties" },
            { text: "Agenda", to: "#agenda" },
            // { text: "Topics", to: "#topics" },
            { text: "Ecosystem", to: "#ecosystem" },
            { text: "Internet Identity", to: "#internet-identity" },
            { text: "Blockchain Singularity", to: "#blockchain-singularity" },
            { text: "Start building", to: "#start-building" },
          ]}
          label="Scroll to section"
        ></IntraPageNav>
      </main>
    </Layout>
  );
}

export default EthDenverPage;
