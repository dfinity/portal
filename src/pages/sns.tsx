import Link from "@docusaurus/Link";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import ExternalLinkIcon from "@site/static/img/external-link.svg";
import BlobGradient from "@site/static/img/gradientBlurredCircle.png";
import PlaySVG from "@site/static/img/svgIcons/play.svg";
import BlobWhite from "@site/static/img/whiteBlurredCircle.png";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";
import React from "react";
import IconAutonomous from "../../static/img/sns/autonomous.svg";
import IconCommunityOwned from "../../static/img/sns/community-owned.svg";
import IconScalable from "../../static/img/sns/scalable.svg";
import IconTokenized from "../../static/img/sns/tokenized.svg";
import AnimateSpawn from "../components/Common/AnimateSpawn";
import { CardWithDescription } from "../components/Common/Card";
import LinkArrowUpRight from "../components/Common/Icons/LinkArrowUpRight";
import ShareMeta from "../components/Common/ShareMeta";

const MotionLink = motion(Link);

const RoadmapLabel: React.FC<{
  variant: "white" | "blue";
  children: React.ReactNode;
}> = ({ variant, children }) => {
  return (
    <span
      className={`absolute top-0 -translate-y-1/2 tw-lead-sm inline-block rounded-full px-3 py-1 ${
        variant === "white" ? "bg-white text-black" : "bg-infinite text-white"
      }`}
    >
      {children}
    </span>
  );
};

const Card: React.FC<{
  title: React.ReactNode;
  children: React.ReactNode;
  icon?: React.ReactNode;
}> = ({ title, children, icon }) => {
  return (
    <AnimateSpawn
      className="sm:w-6/10 md:w-4/10 md:even:self-end md:-mt-30 lg:-mt-20 md:first:mt-0"
      variants={transitions.container}
    >
      {icon && (
        <motion.div className="w-30 mb-4" variants={transitions.item}>
          {icon}
        </motion.div>
      )}
      <motion.h3
        className="tw-heading-4 mb-4 md:tw-heading-3"
        variants={transitions.item}
      >
        {title}
      </motion.h3>
      {children}
    </AnimateSpawn>
  );
};

function SnsPage() {
  return (
    <Layout
      title="SNS: Next Gen DAOs"
      description="The Service Nervous System (SNS), an advanced Web3 DAO
      framework, promotes true digital democracy. Run any dapp, such
      as a social network, in a fully decentralized way, 100% on
      chain — no corporations, no board of directors, no CEO
      required."
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <ShareMeta image="/img/shareImages/share-sns.jpg"></ShareMeta>
      <main className="text-black relative overflow-hidden">
        <DarkHeroStyles></DarkHeroStyles>
        <AnimateSpawn variants={transitions.container}>
          <section className="overflow-hidden bg-infinite text-white">
            <div className="container-10 pt-12 mb-60 md:mb-52 md:pt-36 relative">
              <div className="md:w-7/10">
                <motion.h1
                  className="tw-heading-3 md:tw-heading-2 mb-6"
                  variants={transitions.item}
                >
                  SNS: Next Gen DAOs
                </motion.h1>
                <motion.p
                  className="tw-lead-sm md:tw-lead mb-8"
                  variants={transitions.item}
                >
                  The Service Nervous System (SNS), an advanced Web3 DAO
                  framework, promotes true digital democracy. Run any dapp, such
                  as a social network, in a fully decentralized way, 100% on
                  chain — no corporations, no board of directors, no CEO
                  required.
                </motion.p>
              </div>
            </div>
            <div className="container-10 relative">
              <motion.img
                src="/img/whiteBlurredCircle.png"
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
                src="/img/sns/hero.png"
                className="w-80 sm:w-[480px] md:w-auto max-w-full"
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
              className="tw-heading-5 sm:tw-heading-4 md:tw-heading-3 mb-8 md:mb-12 md:w-8/10"
              variants={transitions.item}
            >
              Developers can hand over their Web3 app to an SNS DAO, while the
              community can buy governance tokens to take ownership through this
              SNS DAO to shape the dapp’s future.
            </motion.p>
            <motion.p
              className="mb-0 flex flex-col items-start sm:flex-row gap-6 md:gap-8"
              variants={transitions.item}
            >
              <Link
                className="button-primary"
                href="/docs/current/developer-docs/integrations/sns"
              >
                Launch an SNS DAO
              </Link>
              <Link className="button-outline" href="/sns/faq">
                What you need to know (FAQ)
              </Link>
            </motion.p>
          </AnimateSpawn>
          <div className="relative z-[-1]">
            <AnimateSpawn
              el={motion.img}
              variants={transitions.item}
              src={BlobGradient}
              className="absolute pointer-events-none z-[-1]
              max-w-none
              w-[1200px]
              top-[-800px]
              left-[-800px]
              sm:w-[1200px]
              sm:top-[-700px]
              sm:left-[-800px]

              
            "
            />
          </div>
          <div
            className="
          flex
          flex-col
          gap-16 md:gap-0
          "
          >
            <Card title="Easy to Get Started">
              <motion.p
                className="mb-6 tw-paragraph"
                variants={transitions.item}
              >
                When a developer decides to hand over a Web3 app to an SNS, they
                initiate the process by making a proposal to the NNS — the
                Internet Computer’s DAO. When the proposal is accepted via
                community votes, the NNS creates a new SNS and assigns it full
                control over the dapp.
              </motion.p>
              <motion.p
                className="mb-6 tw-paragraph"
                variants={transitions.item}
              >
                The dapp is tokenized through an initial decentralization sale.
                Part of the dapp’s governance tokens (utility tokens) are bought
                by the community, providing funds to the DAO; another part of
                the dapp’s governance tokens are allocated to the original
                developer(s) as a reward for their initial efforts; the rest
                remains in a treasury the SNS DAO controls. The proceeds of the
                token sale are kept in the treasury as well. The treasury is
                used to fund the future development of the dapp.
              </motion.p>
              <motion.p
                className="mb-0 tw-paragraph"
                variants={transitions.item}
              >
                The dapp is now fully decentralized!
              </motion.p>
            </Card>
            <Card
              title="Community Owned"
              icon={<IconCommunityOwned aria-hidden="true" />}
            >
              <motion.p
                className="mb-6 tw-paragraph"
                variants={transitions.item}
              >
                The dapps that people love and engage with on a daily basis —
                social media platforms, games, or online news media outlets —
                can now be owned and governed by the users and developers of
                those dapps. This comes with many crucial benefits: Users own
                the service, instead of the service monetizing the users’ data.
                Users can shape how a service should evolve in the future, based
                on their requirements. No centralized entity, like a
                corporation, can unilaterally make decisions negatively
                affecting the users and their personal data. This greatly
                reduces the platform risk for entrepreneurs who build services
                on top of decentralized apps.
              </motion.p>
              <motion.p
                className="mb-0 tw-paragraph"
                variants={transitions.item}
              >
                Applications are co-owned by their users.
              </motion.p>
            </Card>
            <Card
              title="Autonomous"
              icon={<IconAutonomous aria-hidden="true" />}
            >
              <motion.p
                className="mb-6 tw-paragraph"
                variants={transitions.item}
              >
                A dapp is governed by the token holders in a completely
                decentralized way after an SNS DAO has taken control of it. In
                traditional DAOs, only smart contract logic can be governed
                natively on chain by the DAO, but not the frontend. An SNS DAO
                controls every aspect of a dapp natively on chain, particularly
                also the on-chain frontend and assets.
              </motion.p>
              <motion.p
                className="mb-6 tw-paragraph"
                variants={transitions.item}
              >
                Token holders submit and vote on proposals, for example, code
                updates, to govern how the dapp should evolve. When a proposal
                is approved by the community, the SNS DAO executes these updates
                autonomously and fully on chain.
              </motion.p>
              <motion.p
                className="mb-0 tw-paragraph"
                variants={transitions.item}
              >
                No single entity can interfere with the process.
              </motion.p>
            </Card>
            <Card title="Tokenized" icon={<IconTokenized aria-hidden="true" />}>
              <motion.p
                className="mb-6 tw-paragraph"
                variants={transitions.item}
              >
                People participating in the dapp’s governance can, depending on
                the SNS’s configuration, earn voting rewards like in the IC’s
                NNS DAO. Liquid democracy allows token holders to delegate
                certain decisions to those they deem most appropriate to take
                them, resulting in better decisions of the DAO overall.
              </motion.p>
              <motion.p
                className="mb-0 tw-paragraph"
                variants={transitions.item}
              >
                The dapp’s utility token not only enables this advanced form of
                fully-on-chain governance, but the tokenization of the dapp can
                help drive adoption and user engagement: think of airdrops to or
                tokens earned by contributing users, such as content moderators
                in a social media platform.
              </motion.p>
              <motion.p
                className="mb-0 tw-paragraph"
                variants={transitions.item}
              >
                Tokenization enables fully-on-chain dapp governance.
              </motion.p>
            </Card>
            <Card
              title="Truly Decentralized"
              icon={<IconScalable aria-hidden="true" />}
            >
              <motion.p
                className="mb-6 tw-paragraph"
                variants={transitions.item}
              >
                Decentralizing dapps through SNSs brings decentralization to the
                application layer. This makes the Internet Computer (ICP) and
                dapps running on it decentralized from ground up, with multiple
                layers of decentralization. First layer: Platform. The ICP
                blockchain runs on decentralized node machines distributed
                throughout the world, operated by independent entities, and
                hosted in independent data centers. Second layer: Platform
                governance. The Network Nervous System (NNS) is a decentralized
                governance system for the ICP blockchain. Third layer:
                Applications. Dapps assigned to SNS DAOs are decentrally
                governed and running on the decentralized ICP platform.
              </motion.p>
              <motion.p
                className="mb-6 tw-paragraph"
                variants={transitions.item}
              >
                Full-stack decentralization — the ICP blockchain itself, the
                blockchain platform governance, and the governance of the
                individual dapps running on the SNS platform — enables truly
                decentralized apps.
              </motion.p>
              <motion.p
                className="mb-0 tw-paragraph"
                variants={transitions.item}
              >
                This is only possible on the Internet Computer.
              </motion.p>
            </Card>
          </div>
        </section>
        <section className="text-white relative pt-52 md:pt-80 container-12">
          <AnimateSpawn
            el={motion.img}
            variants={transitions.fadeIn}
            src={BlobGradient}
            alt=""
            className="max-w-none w-[1200px] md:w-[1600px] absolute top-[-200px] md:top-[-200px] left-1/2 -translate-x-1/2 z-[-1]"
          />
          <AnimateSpawn
            className="mx-auto text-center sm:w-6/12 "
            variants={transitions.container}
          >
            <motion.h2
              className="tw-heading-4 md:tw-heading-60 mb-3 md:mb-8"
              variants={transitions.item}
            >
              Decentralize Your Web3 App with SNS
            </motion.h2>
            <motion.p
              className="tw-lead-sm md:tw-lead mb-8"
              variants={transitions.item}
            ></motion.p>
          </AnimateSpawn>
          <AnimateSpawn
            className="flex flex-col items-center md:flex-row gap-6 md:gap-8 justify-center mb-16 md:mb-8"
            variants={transitions.container}
          >
            <MotionLink
              variants={transitions.fadeIn}
              className="button-white"
              href="/docs/current/developer-docs/integrations/sns/get-sns/get-sns-intro/"
            >
              Launch an SNS DAO
            </MotionLink>
            <MotionLink
              className="button-outline-white text-center md:text-left"
              href="/sns/faq"
              variants={transitions.fadeIn}
            >
              WHat you need to know (FAQ)
            </MotionLink>
          </AnimateSpawn>
          <AnimateSpawn
            className=" text-black flex flex-col gap-2 md:flex-row md:items-start md:gap-5"
            variants={transitions.container}
          >
            <motion.div
              variants={transitions.item}
              className="px-8 py-12 backdrop-blur-2xl bg-white-50 rounded-xl border-white border-solid border text-center flex-1"
            >
              <h3 className="tw-lead-lg md:tw-title-sm">
                Engage your community
              </h3>
              <p className="tw-paragraph-sm mb-3 text-black-60">
                Users become your biggest contributors. Co-create a dapp your
                community wants.
              </p>
            </motion.div>
            <motion.div
              variants={transitions.item}
              className="px-8 py-12 backdrop-blur-2xl bg-white-50 rounded-xl border-white border-solid border text-center flex-1 md:mt-30"
            >
              <h3 className="tw-lead-lg md:tw-title-sm">
                Speed up user adoption
              </h3>
              <p className="tw-paragraph-sm mb-3 text-black-60">
                Users become your biggest advocates. The success of your dapp is
                the success of its community.
              </p>
            </motion.div>
            <motion.div
              variants={transitions.item}
              className="px-8 py-12 backdrop-blur-2xl bg-white-50 rounded-xl border-white border-solid border text-center flex-1"
            >
              <h3 className="tw-lead-lg md:tw-title-sm">
                Fund the future of your dapp
              </h3>
              <p className="tw-paragraph-sm mb-3 text-black-60">
                Users become your biggests supporters. Get your dapp funded
                through a community-driven decentralization sale.
              </p>
            </motion.div>
          </AnimateSpawn>
        </section>

        <section className="relative pt-20 pb-20 md:pb-40 md:pt-40 container-12">
          <AnimateSpawn
            className="mx-auto text-center sm:w-6/12 "
            variants={transitions.container}
          >
            <motion.h2
              className="tw-heading-3 md:tw-heading-60 mb-3 md:mb-8"
              variants={transitions.item}
            >
              <span className="text-gradient">Roadmap</span>
            </motion.h2>
            <motion.p className="tw-lead-sm mb-8" variants={transitions.item}>
              Based on the findings of a first test run, the following roadmap
              was created to resolve blockers, make tech improvements, and
              introduce new features to each stage of an SNS DAO, so that your
              dapps can successfully thrive.
            </motion.p>
            <motion.p className="mb-0">
              <Link href="" className="button-outline">
                Get more details on the roadmap
              </Link>
            </motion.p>
          </AnimateSpawn>

          <div className="flex flex-col md:flex-row gap-12 mt-24 md:gap-5">
            <div className="flex-1 bg-white rounded-xl p-12 relative py-12 px-8">
              <RoadmapLabel variant="blue">Q1 - 2023</RoadmapLabel>

              <h3 className="tw-heading-4 mb-8">P0</h3>
              <h4 className="tw-heading-7-caps text-black-60 mb-1">
                SNS Pre-launch Prep
              </h4>
              <ul className="list-none p-0 tw-lead-sm mb-0">
                <li>Tokenomics Configuration</li>
                <li>Developer Tooling (on-chain SNS testflight)</li>
              </ul>

              <h4 className="tw-heading-7-caps text-black-60 mb-1 mt-8">
                SNS Launch
              </h4>
              <ul className="list-none p-0 tw-lead-sm mb-0">
                <li>Scalability of Decentralization Sale</li>
                <li>Sale Payment Flow (ticketing)</li>
                <li>Sale Payment Flow (retries)</li>
                <li>Community Fund</li>
                <li>
                  Time Gap between NNS proposal adoption & start of
                  decentralization sale
                </li>
              </ul>
              <h4 className="tw-heading-7-caps text-black-60 mb-1 mt-8">
                SNS Post-launch
              </h4>
              <ul className="list-none p-0 tw-lead-sm mb-0">
                <li>SNS-1 Bug Fixes</li>
              </ul>
            </div>
            <div className="flex-1 bg-infinite text-white rounded-xl p-12 relative py-12 px-8">
              <RoadmapLabel variant="white">Current</RoadmapLabel>

              <h3 className="tw-heading-4 mb-8">P1</h3>
              <h3 className="tw-heading-4 mb-8">Improvements</h3>
              <h4 className="tw-heading-7-caps text-white-60 mb-1">
                SNS Pre-launch prep
              </h4>
              <ul className="list-none p-0 tw-lead-sm mb-0">
                <li>Reduction of off-chain dependencies</li>
              </ul>
              <h4 className="tw-heading-7-caps text-white-60 mb-1 mt-8">
                SNS Launch
              </h4>
              <ul className="list-none p-0 tw-lead-sm mb-0">
                <li>Bot mitigation </li>
                <li>User Participation Documentation</li>
              </ul>
              <h4 className="tw-heading-7-caps text-white-60 mb-1 mt-8">
                SNS Post-launch
              </h4>
              <ul className="list-none p-0 tw-lead-sm mb-0">
                <li>
                  SNS neuron commands and token wallet on the NNS Frontend
                </li>
                <li>SNS Dashboard</li>
              </ul>
            </div>
            <div className="flex-1 bg-white rounded-xl p-12 relative py-12 px-8">
              <RoadmapLabel variant="blue">Q3 - 2023</RoadmapLabel>

              <h3 className="tw-heading-4 mb-8">P2</h3>
              <h4 className="tw-heading-7-caps text-black-60 mb-1">
                SNS Pre-launch Prep
              </h4>
              <ul className="list-none p-0 tw-lead-sm mb-0">
                <li>Developer Tooling (local SNS testing)</li>
              </ul>

              <h4 className="tw-heading-7-caps text-black-60 mb-1 mt-8">
                SNS Launch
              </h4>
              <ul className="list-none p-0 tw-lead-sm mb-0">
                <li>Sale Payment Flow with ICRC-2</li>
                <li>One Proposal SNS Initiation</li>
                <li>User-friendly Airdrop Flow </li>
              </ul>
              <h4 className="tw-heading-7-caps text-black-60 mb-1 mt-8">
                SNS Post-launch
              </h4>
              <ul className="list-none p-0 tw-lead-sm mb-0">
                <li>Automated Cycle Support</li>
                <li>SNS Voting on NNS Frontend </li>
              </ul>
            </div>
          </div>
        </section>

        <section className=" bg-infinite text-white overflow-hidden">
          <AnimateSpawn
            className="max-w-page md:mx-auto px-6 md:px-12.5 md:min-h-[600px] pb-20  md:py-24 relative  flex flex-col justify-center"
            variants={transitions.container}
          >
            {/* <CustodyGraphic className="absolute w-[520px] md:w-auto right-[-100px] top-[-160px] md:right-[-200px] md:top-[-120px]"></CustodyGraphic> */}
            <img
              className="
                w-full max-w-[500px] py-20
                md:absolute 
                md:w-[640px] md:max-w-none md:left-auto md:translate-x-0 md:right-[-50px] md:top-[-30px]"
              src="/img/sns/sns.webp"
            ></img>
            <div className="md:mx-auto md:w-10/12 relative">
              <motion.h2
                className="tw-heading-4 md:tw-heading-3 md:w-5/10 mb-6 md:my-8"
                variants={transitions.item}
              >
                SNS-1: The First of its Kind
              </motion.h2>

              <motion.p
                variants={transitions.item}
                className="tw-lead-sm mb-3 md:w-1/2"
              >
                SNS-1 was a dress rehearsal that DFINITY ran together with the
                ICP community to test an SNS decentralization sale on mainnet.
                After a successful SNS launch, SNS-1 is now controlled by the
                community.
              </motion.p>
              <motion.p variants={transitions.item}>
                <Link
                  className="link-primary-light"
                  href="https://dscvr.one/p/internet-computer"
                >
                  Follow SNS-1 on DSCVR
                  <ExternalLinkIcon className="inline-block align-bottom ml-2"></ExternalLinkIcon>
                </Link>
              </motion.p>
            </div>
            <motion.img
              src={BlobWhite}
              className="absolute pointer-events-none max-w-none w-[800px] right-[-250px] top-[-150px] md:w-[1500px]  md:right-[-550px] translate-x-[200px] md:top-[-400px]"
              alt=""
            />
          </AnimateSpawn>
        </section>
        <AnimateSpawn
          el={motion.section}
          variants={transitions.item}
          className="container-10 mt-24 md:mt-40"
        >
          <div className="flex flex-col md:flex-row gap-6 md:gap-5 mb-16">
            <h2 className="tw-heading-3 md:tw-heading-60 text-gradient md:w-4/10 mb-0">
              Get to Know
              <br />
              SNS DAOs
            </h2>
            <div className="md:w-4/10 flex flex-col justify-center">
              <p className="mb-4 tw-lead-sm">
                Lorem ipsum dolor sit amet consectetur. Porttitor dapibus mattis
                ullamcorper ut nunc venenatis eros.
              </p>
              <p className="mb-0">
                <Link className="link-primary link-with-icon">
                  Explore more videos
                  <LinkArrowUpRight />
                </Link>
              </p>
            </div>
          </div>

          <div className="md:h-[450px] flex flex-col md:flex-row rounded-xl overflow-hidden">
            <Link
              className="md:w-7/10 h-full flex relative group"
              href="https://youtu.be/nZBWx6y070Y"
            >
              <img
                src={`https://i.ytimg.com/vi/WxRgm6JAGpQ/maxresdefault.jpg`}
                alt=""
                className="w-full h-full object-cover"
              />

              <div className="bg-white-30 backdrop-blur-xl group-hover:bg-infinite transition-colors h-12 w-12 md:h-16 md:w-16 rounded-full z-10 absolute inset-0 m-auto flex">
                <PlaySVG className="m-auto h-5 w-5 text-white transition-colors" />
              </div>
            </Link>
            <div className="md:w-3/10 flex bg-white-80 border border-solid border-white md:rounded-tr-xl rounded-br-xl p-8 md:p-12">
              <div className="self-end">
                <h4 className="text-razzmatazz tw-heading-7 mb-3">
                  Fully On-chain with DFINITY
                </h4>
                <p className="mb-3 tw-heading-6 md:tw-heading-5">
                  Next Generation DAOs
                </p>
                <p className="text-black-60 tw-paragraph md:tw-lead-sm mb-0">
                  Episode #2 | SNS
                </p>
              </div>
            </div>
          </div>
        </AnimateSpawn>

        <AnimateSpawn
          el={motion.section}
          variants={transitions.container}
          className="container-12 mb-20 px-6 md:mb-40 mt-20 md:mt-40"
        >
          <motion.p
            variants={transitions.item}
            className="tw-heading-4 md:tw-heading-60 text-center mb-2 w-full mx-auto md:mb-6 md:w-8/12"
          >
            Explore Further
          </motion.p>
          <motion.p
            variants={transitions.item}
            className="tw-lead-sm md:tw-lead mb-2 text-center w-5/6 mx-auto md:mb-6 md:w-6/12"
          >
            Lorem ipsum dolor sit amet consectetur. At morbi augue sem vel vitae
            imperdiet vitae eleifend sit. Vel ac leo in augue in penatibus. In
            aliquet tincidunt massa leo bibendum. In.
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-8 md:mt-20">
            <CardWithDescription
              title="SNS FAQ"
              description=""
              href="/sns/faq"
            />
            <CardWithDescription
              title="SNS Docs"
              description=""
              href="/docs/current/developer-docs/integrations/sns"
            />
            <CardWithDescription
              title="SNS Blog"
              description=""
              href="https://medium.com/dfinity/how-the-service-nervous-system-sns-will-bring-tokenized-governance-to-on-chain-dapps-b74fb8364a5c"
            />
            <CardWithDescription
              title="SNS Wiki"
              description=""
              href="https://wiki.internetcomputer.org/wiki/Service_Nervous_System_(SNS)"
            />
          </div>
        </AnimateSpawn>
      </main>
    </Layout>
  );
}

export default SnsPage;
