import Link from "@docusaurus/Link";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import BlobGradient from "@site/static/img/gradientBlurredCircle.webp";
import PlaySVG from "@site/static/img/svgIcons/play.svg";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";
import React, { useRef } from "react";
import AnimateSpawn from "../components/Common/AnimateSpawn";
import LinkArrowRight from "../components/Common/Icons/LinkArrowRight";
import LinkArrowUpRight from "../components/Common/Icons/LinkArrowUpRight";
import ShareMeta from "../components/Common/ShareMeta";
import TranslatedLayout from "../components/Common/TranslatedLayout/TranslatedLayout";
import { useDarkHeaderInHero } from "../utils/use-dark-header-in-hero";

const MotionLink = motion(Link);

const Card: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <AnimateSpawn
      className="sm:w-6/10 md:w-4/10 md:even:self-end md:-mt-30 lg:-mt-20 md:first:mt-0"
      variants={transitions.item}
    >
      <div
        className="
        prose 
        prose-p:tw-paragraph 
        prose-a:no-underline
        prose-h3:tw-heading-4 md:prose-h3:tw-heading-3 prose-h3:mb-4 prose-h3:mt-0
        prose-img:mb-4 prose-img:w-30
        "
      >
        {children}
      </div>
    </AnimateSpawn>
  );
};

function OpenChatPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const isDark = useDarkHeaderInHero(heroRef);
  return (
    <Layout
      title="OpenChat"
      description="Join the Future of Social Media - Decentralized, Secure, and
      Community-Driven. See how OpenChat got DAO-swapped in less
      than 6 hours."
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <ShareMeta image="/img/shareImages/share-openchat.jpg"></ShareMeta>

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
              <div className="blob blob-white blob-xl md:blob-xl top-[-150px] left-full -translate-x-2/3 opacity-100"></div>

              <div className="md:w-7/10">
                <motion.h1
                  className="tw-heading-3 md:tw-heading-2 mb-6"
                  variants={transitions.item}
                >
                  Web 3.0
                </motion.h1>
                <motion.p
                  className="tw-lead-sm md:tw-lead mb-8"
                  variants={transitions.item}
                >
                  <b>
                  Web 3.0 builds on Web3 &mdash; now internet communities take full and exclusive control and ownership of
                  entire internet services, from social media, networks and games, to open enterprise tech infrastructures. 
                  </b>
                  <span style={{display: "block", height: "0.6em"}}></span>
                  An "open internet service" (OIS) keeps all its code, user experience, compute and data on-chain, 
                  and must be transparently configured, updated and instructed by an advanced DAO: a public
                  governance framework called a "service nervous system" (SNS).
                  <span style={{display: "block", height: "0.6em"}}></span>
                  There are no backdoors for devs, corporations or CEOs. The community is secure and sovereign,
                  and its members become owners and part of a vast industrious virtual team. 
                </motion.p>
              </div>
            </div>
          </section>
          <motion.section
            className="container-12 relative h-40 sm:h-0"
            variants={transitions.fadeIn}
          >
            <div className="max-w-[660px] sm:absolute pointer-events-none right-5 -translate-y-[187px] sm:-translate-y-[279px] md:-translate-y-[382px] text-center">
              <img
                src="/img/openchat/oc-img.webp"
                className="w-80 sm:w-[480px] md:w-auto max-w-full"
                alt="OpenChat dapp screenshot"
              />
            </div>
          </motion.section>
        </AnimateSpawn>
        <AnimateSpawn
          className="container-8 sm:pt-80"
          el={motion.section}
          variants={transitions.container}
        >
          <motion.p
            className="tw-heading-5 sm:tw-heading-4 md:tw-heading-60 mb-8 md:mb-12"
            variants={transitions.item}
          >
            OpenChat was the first OIS &mdash; imagine a messaging service 
            were bitcoin can be instantly transferred in chat messages, with 
            functionality allowing it to provide an alternative to Slack.
          </motion.p>
          <motion.p
            className="mb-0 flex flex-col items-start sm:flex-row gap-6 md:gap-8"
            variants={transitions.item}
          >
            <Link className="button-primary" href="https://oc.app/">
              Try OpenChat
            </Link>
            {/* <Link className="button-outline" href="/sns/faq">
                How to participate (FAQ)
              </Link> */}
          </motion.p>
        </AnimateSpawn>

        {/* Hiding this section for now */}
        <AnimateSpawn
          el={motion.section}
          variants={transitions.item}
          className="container-10 mt-24 md:mt-30 "
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

        <section className="container-10 mt-24 md:mt-40">
          <div className="flex flex-col gap-16 md:gap-0">
            <Card>
              <img src="/img/sns/autonomous.svg" aria-hidden="true"></img>
              {/* <img src="/img/sns/scalable.svg" aria-hidden="true"></img> */}
              <h3>Open internet services</h3>

              <p>
                An "open internet service" is an internet service with a
                difference: it runs entirely on World Computer blockchain,
                without centralization. OpenChat is built from canister smart
                contracts installed on the Internet Computer |{" "}
                <a
                  className="link-subtle"
                  href="https://twitter.com/search?q=%23ICP"
                  target="_blank"
                >
                  #ICP
                </a>
                , which store and process all its data, and serve the user
                experience into web browsers. Because it runs fully on-chain,
                without centralization, an advanced community DAO has taken over
                responsibility for pushing updates to its software logic.
              </p>

              <p>
                OpenChat is fully controlled by its "SNS" DAO, which takes over
                the traditional role of a company. Now, there is no CEO, board
                of directors or developers in control, just thousands of
                community members, whose wishes are mediated through digital
                democracy algorithms.
              </p>

              <p>
                <Link href="/sns" className="link-primary link-with-icon">
                  Learn about SNS DAOs <LinkArrowRight />
                </Link>
              </p>
              <p>
                <Link
                  href="https://oc.app"
                  className="link-primary link-with-icon"
                >
                  Try OpenChat <LinkArrowUpRight />
                </Link>
              </p>
            </Card>

            <Card>
              <img src="/img/sns/community-owned.svg" aria-hidden="true"></img>
              <h3>Community ownership</h3>
              <p>
                Web1 was about users <b>reading</b> content from the internet,
                Web2 was about users <b>writing</b> content that other users
                could read, and Web3 is about <b>ownership</b>. The future of
                Web3 includes users owning tokens and NFTs, but also being part
                of communities that administer mass market internet services –
                in fields as diverse as social media, gaming, the metaverse,
                DeFi and the sharing economy. This becomes possible when an
                internet service runs entirely on a blockchain, and can be
                controlled and updated by an advanced DAO, which has distributed
                voting power in the form of governance tokens to community
                members.
              </p>
            </Card>

            <Card>
              <img src="/img/sns/tokenized.svg" aria-hidden="true"></img>
              <h3>Founderizing users</h3>
              <p>
                During the creation of an open internet service, an initial
                "decentralization swap" exchanges the new SNS DAO's governance
                tokens for ICP, which is then held in its treasury under the
                decentralized control of its governance community. But they
                aren't the only ones who can hold governance tokens: Open
                internet services will often founderize their users, by granting
                tokens to those who help with tasks such as advocacy, creating
                viral content, and content moderation. This unlocks a key Web3
                strategy, which is to create a giant industrious virtual team of
                millions, and generate huge network effects that can overcome
                any Web2 incumbent.
              </p>
            </Card>
          </div>
        </section>

        <section className="container-12 flex flex-col gap-16 md:gap-40 mt-30 md:mt-60">
          <TranslatedLayout
            reverse={true}
            imageUrl="/img/openchat/image-1.webp"
          >
            <h2 className="tw-heading-3 md:tw-heading-60 md:mb-6">
              Join OpenChat's governance community
            </h2>
            <p className="tw-lead-sm mb-6 md:mb-6">
              The governance of open internet services is transparent, and using
              the link below you can view the proposals that update the service.
              Decision making is also open and completely automated, and anyone
              holding governance tokens can participate.
            </p>
            <p className="mb-0">
              <Link
                href="https://dashboard.internetcomputer.org/sns/3e3x2-xyaaa-aaaaq-aaalq-cai "
                className="link-primary link-with-icon"
              >
                View OpenChat dashboard <LinkArrowUpRight />
              </Link>
            </p>
          </TranslatedLayout>
          <TranslatedLayout imageUrl="/img/openchat/image-2.webp">
            <h2 className="md:tw-heading-60 md:mb-6">Community funding</h2>
            <p className="tw-lead-sm mb-6 md:mb-10">
              The "decentralization swap" process exchanges governance tokens
              for ICP tokens, held in the SNS DAO by a community of governance
              token holders. These tokens can be used to create bounties,
              incentivizing contributions to the service's development. This
              allows fully decentralized internet services to be created from
              anywhere, democratizing access to the tech economy and enabling
              anyone to build-out Web3.
            </p>
            <p className="mb-0">
              <Link
                href="/docs/current/developer-docs/integrations/sns/"
                className="link-primary link-with-icon"
              >
                SNS Technical Documentation <LinkArrowRight />
              </Link>
            </p>
          </TranslatedLayout>
        </section>

        <section className="text-white relative pt-52 pb-20 md:pb-40 md:pt-60 container-12">
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
              href="/docs/current/developer-docs/integrations/sns/launching/launch-steps"
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
      </main>
    </Layout>
  );
}

export default OpenChatPage;
