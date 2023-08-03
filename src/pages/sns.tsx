import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import BlobGradient from "@site/static/img/gradientBlurredCircle.webp";
import BlobBlue from "@site/static/img/purpleBlurredCircle.webp";
import BlobWhite from "@site/static/img/whiteBlurredCircle.webp";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";
import React from "react";
import IconAutonomous from "../../static/img/sns/autonomous.svg";
import IconCommunityOwned from "../../static/img/sns/community-owned.svg";
import IconScalable from "../../static/img/sns/scalable.svg";
import IconTokenized from "../../static/img/sns/tokenized.svg";
import AnimateSpawn from "../components/Common/AnimateSpawn";
import ExternalLinkIcon from "@site/static/img/external-link.svg";
import PlaySVG from "@site/static/img/svgIcons/play.svg";
import LinkArrowRight from "../components/Common/Icons/LinkArrowRight";
import OpenChatCard from "../components/Common/OpenChatCard/OpenChatCard";

const MotionLink = motion(Link);

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
      title="DAO crypto evolved"
      description="An SNS is an advanced form of a DAO. A digital democracy that can run any dapp such as a social network in a fully decentralized way, fully on chain. No corporation, no board of directors, no CEO required."
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <Head>
        <meta
          property="og:image"
          content={"https://internetcomputer.org/img/shareImages/share-sns.jpg"}
        />
        <meta
          name="twitter:image"
          content={"https://internetcomputer.org/img/shareImages/share-sns.jpg"}
        />
      </Head>
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
                  DAO crypto evolved
                </motion.h1>
                <motion.p
                  className="tw-lead-sm md:tw-lead mb-8"
                  variants={transitions.item}
                >
                  A Service Nervous Systems (SNS) is an advanced form of a DAO.
                  A digital democracy that can run any dapp such as a social
                  network in a fully decentralized way, fully on chain. No
                  corporation, no board of directors, no CEO required.
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
                src="/img/sns/hero.png"
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
              className="tw-heading-5 sm:tw-heading-4 md:tw-heading-3 mb-8 md:mb-12 md:w-8/10"
              variants={transitions.item}
            >
              Developers can now hand over their Web3 service to an SNS. The
              community can buy governance tokens to take ownership and control
              through the SNS DAO and shape the dapp’s future.
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
                How to participate (FAQ)
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
            <Card title="Easy to get started">
              <motion.p
                className="mb-6 tw-paragraph"
                variants={transitions.item}
              >
                When you, as a dapp developer, decide to hand over your Web3
                dapp to an SNS, you decide on the SNS parameters and submit a
                proposal to the NNS, the Internet Computer’s DAO. When the
                proposal is accepted, the NNS launches the new SNS and assigns
                it full control over the app.
              </motion.p>
              <motion.p
                className="mb-6 tw-paragraph"
                variants={transitions.item}
              >
                The newly-created SNS tokenizes the dapp through an initial
                decentralization swap: Part of the dapp’s governance tokens
                (utility tokens) are bought by the community, providing funding
                the DAO. Part of the dapp’s utility tokens are allocated to the
                original developer(s) as a reward for their initial efforts. The
                rest remains in a treasury the SNS DAO controls, and is used to
                fund the future development of the dapp.
              </motion.p>
              <motion.p
                className="mb-0 tw-paragraph"
                variants={transitions.item}
              >
                Your dapp is now fully decentralized!
              </motion.p>
            </Card>
            <Card
              title="Community owned"
              icon={<IconCommunityOwned aria-hidden="true" />}
            >
              <motion.p
                className="mb-6 tw-paragraph"
                variants={transitions.item}
              >
                The dapps that people love and engage with on a daily basis,
                like social media platforms, games, or online news media
                outlets, can now be owned and governed by the people themselves
                — the users and developers of those dapps. This comes with
                substantial benefits: The users own the service, instead of the
                service monetizing the users. The users can shape how “their”
                service should evolve in the future. No centralized entity, like
                a corporation, can unilaterally make decisions negatively
                affecting the users and their personal data. This greatly
                reduces the platform risk for entrepreneurs who build services
                on top of decentralized apps.
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
                After an SNS DAO has taken control of a dapp, it is governed by
                the token holders in a completely decentralized way through its
                SNS DAO. In contrast to existing DAOs, in which governance
                applies only to smart contract logic, i.e., just a small part of
                a Web3 application, an SNS DAO controls every aspect of a dapp.
              </motion.p>
              <motion.p
                className="mb-0 tw-paragraph"
                variants={transitions.item}
              >
                Token holders submit and vote on proposals to govern how the
                dapp should evolve, e.g., to decide on code updates. When a
                proposal is approved by the community, the SNS executes it
                autonomously, e.g., to update the code of the dapp. No single
                entity can stop the process.
              </motion.p>
            </Card>
            <Card title="Tokenized" icon={<IconTokenized aria-hidden="true" />}>
              <motion.p
                className="mb-6 tw-paragraph"
                variants={transitions.item}
              >
                People participating in the dapp’s governance earn voting
                rewards, much like in the Internet Computer’s NNS DAO. Liquid
                democracy allows token holders to delegate certain decisions to
                those they deem more appropriate to make them, resulting in
                better overall decisions on the progress of the DAO.
              </motion.p>
              <motion.p
                className="mb-0 tw-paragraph"
                variants={transitions.item}
              >
                The dapp’s utility token not only enables this advanced form of
                governance, but the tokenization of the dapp can help drive
                adoption and user engagement, e.g., through airdrops or tokens
                earned by contributing users.
              </motion.p>
            </Card>
            <Card
              title="Truly decentralized"
              icon={<IconScalable aria-hidden="true" />}
            >
              <motion.p
                className="mb-0 tw-paragraph"
                variants={transitions.item}
              >
                Decentralizing dapps through SNSs is the third level of
                decentralization on the Internet Computer. The first level is
                the ICP blockchain that runs on decentralized node machines
                distributed throughout the world, operated by independent
                entities, and hosted in independent data centers. The second
                level is the Network Nervous System (NNS) that governs the
                decentralized ICP blockchain. The third level is the SNS-based
                decentralization of dapps running on the decentrally-governed
                decentralized platform. Only such decentralization on every
                level — the platform itself, the platform's governance, and the
                governance of the individual dapps running on this platform —
                enables truly decentralized apps. Only possible on the Internet
                Computer.
              </motion.p>
            </Card>
          </div>
        </section>
        <OpenChatCard className="mt-40" />
        <section className="text-white relative pt-52 pb-20 md:pb-40 md:pt-80 container-12">
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
              Have an SNS transform your Web3 app into a true dapp
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
              className="button-outline-white"
              href="/docs/current/developer-docs/integrations/sns/launching/launch-summary"
            >
              Launch an SNS DAO
            </MotionLink>
            <MotionLink
              className="link-white link-with-icon"
              href="/sns/faq"
              variants={transitions.fadeIn}
            >
              <LinkArrowRight></LinkArrowRight>
              How to participate (FAQ)
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
                through a community-driven decentralization swap.
              </p>
            </motion.div>
          </AnimateSpawn>
        </section>
        <AnimateSpawn
          el={motion.section}
          variants={transitions.item}
          className="container-10 mt-24 md:mt-30"
        >
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
          className="container-10 py-24 md:py-40 relative"
          variants={transitions.container}
        >
          <div className="">
            <AnimateSpawn
              el={motion.img}
              variants={transitions.item}
              src={BlobBlue}
              className="absolute pointer-events-none
              max-w-none
              w-[1000px]
              bottom-[-400px]
              right-[-600px]
              sm:bottom-[-600px]
              sm:w-[1200px]
              sm:right-[-500px]
            "
              alt=""
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-1/10">
            <motion.div variants={transitions.item} className="flex-1">
              <motion.h2
                className="tw-heading-5 md:tw-heading-3 mb-10 md:mb-16"
                variants={transitions.item}
              >
                What an SNS DAO is <span className="text-razzmatazz">NOT</span>
              </motion.h2>
              <div className="md:w-8/10">
                <h3 className="tw-heading-6 md:tw-heading-5 mb-4">
                  Not an ICO
                </h3>
                <p className="tw-paragraph mb-10">
                  No funds are directly handed over to developers. The creation
                  of an SNS is initiated by a decentralized entity (
                  <Link
                    className="text-infinite underline hover:no-underline hover:text-black"
                    href="https://nns.ic0.app/"
                  >
                    the NNS
                  </Link>
                  ), and ICP raised by the decentralization swap is allocated to
                  the treasury of the newly born SNS DAO. The founders receive a
                  portion of the NNS DAO tokens in the form of locked neurons.
                </p>
                <h3 className="tw-heading-6 md:tw-heading-5 mb-4">
                  Not an IPO
                </h3>
                <p className="tw-paragraph">
                  This is not a liquidity exit or a public listing. It’s the
                  start of a new journey where you as the initial creator and
                  your users have the opportunity to form a digital community,{" "}
                  <strong>100% on-chain</strong>, to co-evolve and grow the
                  platform or application.
                </p>
              </div>
            </motion.div>
            <motion.div variants={transitions.item} className="flex-1">
              <motion.h2
                className="tw-heading-5 md:tw-heading-3 mb-10 md:mb-16"
                variants={transitions.item}
              >
                What an SNS DAO <span className="text-blue">IS</span>
              </motion.h2>
              <div
                className="
                  md:w-8/10
                  prose
                  prose-h3:tw-heading-6 prose-h3:md:tw-heading-5 prose-h3:mb-4
                  prose-p:tw-paragraph prose-p:mb-3
                  prose-ul:mb-4 prose-ul:list-none prose-ul:pl-0 prose-ul:tw-paragraph
                  prose-li:bg-[url('/img/checkmark.svg')] prose-li:bg-no-repeat prose-li:bg-left-top prose-li:pl-8 prose-li:my-3 prose-li:leading-6
                  "
              >
                <h3>Decentralization Swap</h3>
                <p>Launching an SNS DAO requires the following:</p>
                <ul>
                  <li>An existing Web3 dapp to be decentralized.</li>
                  <li>
                    Submission of an NNS proposal requesting a decentralization
                    swap.
                  </li>
                  <li>NNS approval of the decentralization swap.</li>
                  <li>ICP investments to meet minimum funding requirements.</li>
                </ul>
                <p>
                  Once these steps are completed, newly minted SNS governance
                  tokens are distributed among participants of the swap and the
                  developers who now control the SNS DAO. What remains from the
                  decentralization swap is put in a treasury that is used for
                  funding the future development of the dapp.
                </p>
              </div>
            </motion.div>
          </div>
        </AnimateSpawn>
      </main>
    </Layout>
  );
}

export default SnsPage;
