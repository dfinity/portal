import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import snsDataJson from "@site/.docusaurus/sns-data/default/sns-data.json";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";
import React, { useRef } from "react";
import AnimateSpawn from "../components/Common/AnimateSpawn";
import { CardWithDescription } from "../components/Common/Card/index";
import LinkArrowRight from "../components/Common/Icons/LinkArrowRight";
import OpenChatCard from "../components/Common/OpenChatCard/OpenChatCard";
import ShareMeta from "../components/Common/ShareMeta/index";
import { Stat, StatsPanel } from "../components/Common/Stats/index";
import TranslatedLayout from "../components/Common/TranslatedLayout/TranslatedLayout";
import VideoCard from "../components/Common/VideoCard";
import { SpringCounter } from "../components/LandingPage/PreHero/Counters";
import DaoCard, { DaoCardProps } from "../components/SnsPage/DaoCard";
import { useDarkHeaderInHero } from "../utils/use-dark-header-in-hero";

const snsData = snsDataJson as any as {
  name: string;
  description: string;
  url: string;
  logo: string;
  rootCanisterId: string;
  proposalCount: number;
  icpRaised: number;
  participants: number;
}[];

// these are displayed as large cards above the small card grid
const excludedFromSmallCards = [
  "tw2vt-hqaaa-aaaaq-aab6a-cai", // Gold DAO
  "qtooy-2yaaa-aaaaq-aabvq-cai", // Sonic
  "3e3x2-xyaaa-aaaaq-aaalq-cai", // OpenChat
];

const smallSnsCards = snsData.filter(
  (dao) => !excludedFromSmallCards.includes(dao.rootCanisterId)
);

const extraMetadata: Record<string, Partial<DaoCardProps>> = {
  "tw2vt-hqaaa-aaaaq-aab6a-cai": {
    // Gold DAO
    twitter: "",
  },

  "qtooy-2yaaa-aaaaq-aabvq-cai": {
    // Sonic
    twitter: "",
  },

  "3e3x2-xyaaa-aaaaq-aaalq-cai": {
    // OpenChat
    twitter: "",
  },

  "zxeu2-7aaaa-aaaaq-aaafa-cai": {
    // Dragginz
    twitter: "https://twitter.com/dragginzgame",
  },

  "7jkta-eyaaa-aaaaq-aaarq-cai": {
    // Kinic
    twitter: "https://twitter.com/kinic_app",
  },

  "67bll-riaaa-aaaaq-aaauq-cai": {
    // Hot or Not
    twitter: "https://twitter.com/hotornot_dapp",
  },

  "4m6il-zqaaa-aaaaq-aaa2a-cai": {
    // IC Ghost
    twitter: "https://twitter.com/ghost_icp",
  },

  "x4kx5-ziaaa-aaaaq-aabeq-cai": {
    // Modclub
    twitter: "https://twitter.com/ModclubApp",
  },

  "xjngq-yaaaa-aaaaq-aabha-cai": {
    // BOOM DAO
    twitter: "https://twitter.com/boomdaosns",
  },

  "uly3p-iqaaa-aaaaq-aabma-cai": {
    // Catalyze
    twitter: "https://twitter.com/catalyze_one",
  },

  "u67kc-jyaaa-aaaaq-aabpq-cai": {
    // ICX
    twitter: "https://twitter.com/icxdao",
  },

  "rzbmc-yiaaa-aaaaq-aabsq-cai": {
    // Nuance
    twitter: "https://twitter.com/nuancedapp",
  },

  "extk7-gaaaa-aaaaq-aacda-cai": {
    // Neutrinite
    // twitter: ""
  },

  "ecu3s-hiaaa-aaaaq-aacaq-cai": {
    // Trax
    twitter: "https://twitter.com/onlyontrax",
  },
};

const aggregateSnsData = [
  {
    label: "SNS DAOs",
    value: snsData.length,
  },
  {
    label: "Proposals executed",
    value: snsData.reduce((acc, sns) => acc + sns.proposalCount, 0),
    format: (value) =>
      value > 1000 ? Math.floor(value / 100) + "00+" : value.toFixed(0),
  },
  {
    label: "Swap participants",
    value: snsData.reduce((acc, sns) => acc + sns.participants, 0),
    format: (value) =>
      value > 1000 ? (value / 1000).toFixed(1) + "k+" : value.toFixed(0),
  },
  {
    label: "ICP raised",
    value: snsData.reduce((acc, sns) => acc + sns.icpRaised, 0),

    format: (value) =>
      value > 1000000 ? (value / 1000000).toFixed(1) + "m+" : value.toFixed(0),
  },
];
const benefits = [
  {
    icon: "/img/sns/icon-decentralization.svg",
    title: "Decentralization",
    description: (
      <>
        Services run on a fully decentralized network governed by their
        communities.
      </>
    ),
  },
  {
    icon: "/img/sns/icon-rewards.svg",
    title: "Rewards & incentives",
    description: (
      <>
        Members can get rewards for participating in governance and incentives
        for tasks.
      </>
    ),
  },
  {
    icon: "/img/sns/icon-autonomous.svg",
    title: "Autonomous updates",
    description: (
      <>
        Community-approved proposals initiate autonomous execution of updates.
        No single entity can stop the process.
      </>
    ),
  },
  {
    icon: "/img/sns/icon-user-centric.svg",
    title: "User-centricity",
    description: (
      <>
        Open internet services allow communities to align incentives and shape
        services.
      </>
    ),
  },
  {
    icon: "/img/sns/icon-transparency.svg",
    title: "Transparency",
    description: (
      <>
        Governance proposals and service updates are publicly displayed on SNS
        dashboards.
      </>
    ),
  },
  {
    icon: "/img/sns/icon-security.svg",
    title: "Security",
    description: (
      <>
        The SNS DAO framework has undergone security audits by Trail of Bits,
        with no severe issues found.
      </>
    ),
  },
];

function SnsPage() {
  const [startCountup, setStartCountup] = React.useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const isDark = useDarkHeaderInHero(heroRef);

  return (
    <Layout
      title="Community-owned Web3"
      description="Open Internet Services (OIS) on the Internet Computer blockchain allow communities to take full control and ownership of entire internet services — from social media networks and games, to open enterprise tech infrastructures — via participation in decentralized autonomous organizations (DAOs)."
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <ShareMeta image="/img/shareImages/share-sns.jpg" />

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
            <div className="container-10 pt-12 mb-60 md:mb-52 md:pt-36 relative">
              <div className="md:w-7/10">
                <motion.h1
                  className="tw-heading-3 md:tw-heading-2 mb-6"
                  variants={transitions.item}
                >
                  Community-owned Web3
                </motion.h1>
                <motion.p
                  className="tw-lead-sm md:tw-lead mb-8"
                  variants={transitions.item}
                >
                  Open Internet Services (OIS) on the Internet Computer
                  blockchain allow communities to take full control and
                  ownership of entire internet services — from social media
                  networks and games, to open enterprise tech infrastructures —
                  via participation in decentralized autonomous organizations
                  (DAOs).
                </motion.p>
              </div>
            </div>
            <div className="container-10 relative">
              <motion.img
                src="/img/whiteBlurredCircle.webp"
                alt=""
                className="absolute pointer-events-none max-w-none w-[800px] aspect-square -right-[200px] bottom-[-300px] md:w-[1500px] md:bottom-[-680px] md:right-[-550px] object-contain object-center"
                variants={transitions.item}
              />
            </div>
          </section>
          <motion.section
            className="container-12 relative h-40 sm:h-0"
            variants={transitions.fadeIn}
          >
            <div className="max-w-[660px] sm:absolute pointer-events-none right-5 -translate-y-[187px] sm:-translate-y-[279px] md:-translate-y-[382px] text-center">
              <img
                src="/img/sns/hero.webp"
                className="w-80 sm:w-[480px] md:w-auto max-w-full"
                alt=""
              />
            </div>
          </motion.section>
        </AnimateSpawn>

        <section className="container-10 sm:pt-56">
          <AnimateSpawn
            className="mb-20 md:mb-30"
            variants={transitions.container}
          >
            <motion.p
              className="tw-heading-5 sm:tw-heading-4 md:tw-heading-60 mb-8 md:mb-12 md:w-8/10"
              variants={transitions.item}
            >
              In Web3, you govern, own and shape your favorite internet
              services.
            </motion.p>
            <motion.p
              className="mb-0 flex flex-col items-start sm:flex-row gap-6 md:gap-8"
              variants={transitions.item}
            >
              <Link className="button-primary" href="#sns-dapps">
                Join an SNS DAO community
              </Link>
              <Link className="button-outline" href="/sns/faq">
                How to participate (FAQ)
              </Link>
            </motion.p>
          </AnimateSpawn>
          <AnimateSpawn variants={transitions.item} className="mt-10 md:mt-20">
            <VideoCard
              label=""
              title="What is an SNS DAO?"
              description={
                <>
                  Founder & Chief Scientist of DFNITY, Dominic Williams explains
                  how the SNS DAO framework creates fully decentralized online
                  services that are owned and governed by the community.{" "}
                </>
              }
              image={`https://i.ytimg.com/vi/WxRgm6JAGpQ/maxresdefault.jpg`}
              link="https://youtu.be/nZBWx6y070Y"
            />
          </AnimateSpawn>
        </section>

        <section className="container-12 pt-20 md:pt-30">
          <AnimateSpawn className="text-center" variants={transitions.item}>
            <h2 className="tw-heading-4 md:tw-heading-60 mb-0">
              Benefits of SNS DAOs
            </h2>
          </AnimateSpawn>

          <div className="flex flex-col gap-16 md:gap-40 mt-10 md:mt-15">
            <TranslatedLayout imageUrl="/img/sns/image-1.webp" reverse={true}>
              <h3 className="tw-heading-4 md:tw-heading-60 mb-6">
                Web3: user-centric ownership
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-0">
                While Web1 was all about users reading content on the internet,
                and Web2 writing and sharing content on the internet, Web3
                embraces ownership of the internet. Not only do users own
                digital assets such as tokens and NFTs, they can also be a part
                of communities that administer the mass market internet services
                they love, from social media and gaming, to metaverse, DeFi and
                beyond. This becomes possible when an internet service runs
                entirely on the blockchain, and is controlled and updated by an
                advanced decentralized autonomous organization (DAO), which
                distributes voting power to community members in the form of
                governance tokens.
              </p>
            </TranslatedLayout>
            <TranslatedLayout imageUrl="/img/sns/image-2.webp">
              <h3 className="tw-heading-4 md:tw-heading-60 mb-6">
                Open Internet Services via community DAOs
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-0">
                An Open Internet Service or OIS runs entirely on the Internet
                Computer blockchain, and is governed by a Service Nervous System
                (SNS) - an advanced community DAO responsible for controlling
                and updating the code of an online service. SNS DAOs take over
                the traditional role of a company, so there’s no CEO, board of
                directors or developers in control, just thousands of community
                members whose wishes are mediated through digital democracy
                algorithms.
              </p>
            </TranslatedLayout>
            <TranslatedLayout imageUrl="/img/sns/image-3.webp" reverse={true}>
              <h3 className="tw-heading-4 md:tw-heading-60 mb-6">
                From user to co-owner
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-0">
                Creating an open internet service involves a decentralization
                swap where participants exchange ICP tokens for SNS DAO
                governance tokens. The proceeds of the swap are then held in the
                treasury of the SNS DAO under the decentralized control of its
                governing community members. Governance tokens of open internet
                services or SNS DAOs can also be granted to those who help with
                tasks such as advocacy, creating viral content, and content
                moderation. This form of co-ownership has the potential to
                unlock a giant industrious virtual team of millions, all with
                align incentives and a collective goal to shape internet
                services into something they love.
              </p>
            </TranslatedLayout>
          </div>
        </section>
        <section className="container-10 pt-20 md:pt-30">
          <AnimateSpawn className="text-center" variants={transitions.item}>
            <h2 className="tw-heading-4 md:tw-heading-60 mb-0 max-w-[660px] md:mx-auto">
              Why join an SNS DAO community?
            </h2>
          </AnimateSpawn>

          <AnimateSpawn
            className="grid sm:grid-cols-2 md:grid-cols-3 gap-y-12 md:gap-x-16 md:gap-y-20 mt-20 md:mt-30"
            variants={transitions.container}
          >
            {benefits.map((benefit) => (
              <motion.div className="flex flex-col">
                <img
                  src={benefit.icon}
                  alt={benefit.title}
                  className="w-30 h-30"
                />
                <h3 className="tw-heading-5 mt-6 mb-2">{benefit.title}</h3>
                <p className="tw-paragraph mb-0">{benefit.description}</p>
              </motion.div>
            ))}
          </AnimateSpawn>
        </section>
        <AnimateSpawn
          el={motion.section}
          className="container-12 pt-20 md:pt-30"
          variants={transitions.container}
          onShow={() => setStartCountup(true)}
          threshold={1}
        >
          <StatsPanel className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:justify-between gap-10">
            {aggregateSnsData.map((stat, index) => (
              <Stat
                key={stat.label}
                title={stat.label}
                className="stat-fade-in"
                titleClassName="whitespace-nowrap"
                style={{
                  animationDelay: `${150 + index * 100}ms`,
                  animationPlayState: startCountup ? "running" : "paused",
                }}
                value={
                  <SpringCounter
                    delay={150 + index * 100}
                    enabled={startCountup}
                    initialValue={0}
                    initialTarget={stat.value}
                    target={stat.value}
                    format={stat.format || ((value) => value.toFixed(0))}
                    springConfig={[3, 2, 10]}
                  />
                }
              />
            ))}
          </StatsPanel>
        </AnimateSpawn>
        <section className="" id="sns-dapps">
          <OpenChatCard className="" />
        </section>

        <AnimateSpawn
          el={motion.section}
          className="md:container-12 md:mt-5"
          variants={transitions.container}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 bg-white/60 backdrop-blur-2xl md:bg-transparent md:backdrop-blur-none pb-24 md:pb-0">
            <motion.div
              variants={transitions.item}
              className="md:rounded-[32px] md:bg-white/60 md:backdrop-blur-2xl p-6 pb-16 md:p-12"
            >
              <video
                loop
                autoPlay
                muted
                playsInline
                className="rounded-2xl w-full md:h-[300px] object-cover object-center"
                aria-label="Gold DAO SNS"
              >
                <source src="/img/sns/gold-dao.mp4" type="video/mp4" />
              </video>
              <div className="md:pr-20">
                <h3 className="tw-heading-5 md:tw-heading-4 text-gradient mb-4 mt-6 md:mb-6 md:mt-12">
                  Gold DAO
                </h3>
                <p className="tw-paragraph md:tw-lead-sm mb-5">
                  The Gold DAO represents a groundbreaking fusion of traditional
                  gold and modern blockchain technology, allowing anyone in the
                  world to access physical gold instantaneously, without
                  depending on banks.
                </p>
                <Link
                  className="link-primary link-with-icon"
                  href="https://nns.ic0.app/project/?project=tw2vt-hqaaa-aaaaq-aab6a-cai"
                >
                  <LinkArrowRight />
                  Learn more about decentralized gold
                </Link>
              </div>
            </motion.div>
            <motion.div
              variants={transitions.item}
              className="md:rounded-[32px] md:bg-white/60 md:backdrop-blur-2xl p-6 md:p-12"
            >
              <img
                src="/img/sns/sonic.webp"
                alt="Sonic SNS DAO"
                loading="lazy"
                className="rounded-2xl w-full md:h-[300px] object-cover object-center"
              />
              <div className="md:pr-20">
                <h3 className="tw-heading-5 md:tw-heading-4 text-gradient mb-4 mt-6 md:mb-6 md:mt-12">
                  Sonic
                </h3>
                <p className="tw-paragraph md:tw-lead-sm mb-5">
                  The open DeFi suite on Internet Computer blockchain governed
                  by the people for the people. Sonic unleashes the potential of
                  crypto trading through innovative DeFi products.
                </p>
                <Link
                  className="link-primary link-with-icon"
                  href="https://nns.ic0.app/project/?project=qtooy-2yaaa-aaaaq-aabvq-cai"
                >
                  <LinkArrowRight />
                  Get the details on this trustless DEX
                </Link>
              </div>
            </motion.div>
          </div>
        </AnimateSpawn>

        <AnimateSpawn
          variants={transitions.container}
          className="container-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mt-5"
          el={motion.section}
        >
          {smallSnsCards.map((sns) => (
            <DaoCard
              dashboardUrl={`https://dashboard.internetcomputer.org/sns/${sns.rootCanisterId}`}
              description={sns.description}
              key={sns.name}
              logo={sns.logo}
              name={sns.name}
              url={sns.url}
              {...(extraMetadata[sns.rootCanisterId] ?? {})}
            />
          ))}

          <motion.div
            className="rounded-2xl  text-white flex px-6 py-8 backdrop-blur-2xl bg-gradient-100 from-[#3B00B9] to-[#2586B6]"
            variants={transitions.item}
          >
            <div className="flex flex-col gap-2">
              <h3 className="tw-title-sm mb-0">SNS DAO launchpad</h3>
              <p className="tw-paragraph text-white/60 flex-1 mb-12">
                Join an SNS DAO launch, participate in decentralized swaps and
                dapp governance.
              </p>
              <Link
                className="button-white text-center"
                href="https://nns.ic0.app/launchpad/"
              >
                Go to Launchpad
              </Link>
            </div>
          </motion.div>
        </AnimateSpawn>

        <section className="max-w-page relative mx-auto mb-20 px-6 md:mb-40 md:px-15 mt-20 md:mt-30">
          <AnimateSpawn
            className=" relative text-white"
            variants={transitions.container}
          >
            <motion.div
              className="blob blob-purple blob-md blob-x-5 blob-y-10 z-[-1] md:blob-lg opacity-80"
              variants={transitions.fadeIn}
            ></motion.div>
            <motion.h2
              className="tw-heading-3 text-center mb-0 w-full mx-auto md:tw-heading-60 lg:w-8/12"
              variants={transitions.item}
            >
              Guides & resources
            </motion.h2>
          </AnimateSpawn>
          <AnimateSpawn
            className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-8 md:mt-16"
            variants={transitions.container}
          >
            <CardWithDescription
              title="SNS DAO dashboard"
              description=""
              href="https://dashboard.internetcomputer.org/sns"
            />

            <CardWithDescription
              title="Launch an SNS DAO"
              description=""
              href="/docs/current/developer-docs/integrations/sns"
            />
            <CardWithDescription
              title="FAQ: How to join and participate in an SNS DAO"
              description=""
              href="/sns/faq"
            />
            <CardWithDescription
              title="Get SNS governance 
              tokens on ICP DEXs"
              description=""
              href="/ecosystem?tag=DeFi"
            />
          </AnimateSpawn>
        </section>
      </main>
    </Layout>
  );
}

export default SnsPage;
