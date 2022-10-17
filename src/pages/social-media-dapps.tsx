import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import { resetNavBarStyle } from "@site/src/utils/reset-navbar-style";
import BlobGradient from "@site/static/img/gradientBlurredCircle.png";
import BlobBlue from "@site/static/img/purpleBlurredCircle.png";
import BlobWhite from "@site/static/img/whiteBlurredCircle.png";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import { motion, useElementScroll } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import IconAutonomous from "../../static/img/social-media-dapps/autonomous.svg";
import IconTokenized from "../../static/img/social-media-dapps/tokenized.svg";
import AnimateSpawn from "../components/Common/AnimateSpawn";
import ExternalLinkIcon from "@site/static/img/external-link.svg";
import { useElementSize } from "../utils/use-element-height";
import clsx from "clsx";

const MotionLink = motion(Link);

const Card: React.FC<{
  title: React.ReactNode;
  children: React.ReactNode;
  icon: React.ReactNode;
}> = ({ title, children, icon }) => {
  return (
    <AnimateSpawn
      className="sm:w-6/10 md:w-4/10 md:even:self-end md:-mt-30 lg:-mt-20 md:first:mt-0 "
      variants={transitions.container}
    >
      <motion.div className="w-30 mb-4" variants={transitions.item}>
        {icon}
      </motion.div>
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

const Collapse: React.FC<{
  title: React.ReactNode;
  children: React.ReactNode;
  open: boolean;
  onClick: () => void;
}> = ({ title, children, open, onClick }) => {
  const ref = useRef<HTMLDivElement>();
  const size = useElementSize(ref);

  return (
    <div className="w-[calc(100vw-100px)] flex flex-col sm:block sm:w-auto snap-center">
      <button
        onClick={onClick}
        className={clsx(
          `tw-heading-4  border-none appearance-none whitespace-normal font-circular p-0 transition-colors hover:text-black text-black text-left`,
          open ? "sm:text-black" : "sm:text-black-30"
        )}
      >
        {title}
      </button>
      <div
        className="hidden sm:block sm:overflow-hidden transition-[height]"
        style={{
          height: open && size ? size.height : 0,
        }}
        ref={ref}
      >
        <div className="pt-4">{children}</div>
      </div>
      <div className="sm:hidden pt-4 flex flex-1 flex-col">{children}</div>
    </div>
  );
};

const projects: {
  imageUrl: string;
  title: string;
  body: React.ReactNode;
}[] = [
  {
    title: "OpenChat",
    body: "OpenChat is the first instant messaging application that runs 100% on the blockchain. It functions like a traditional messaging app, while taking advantage of the security and unique features that the Internet Computer provides. You can easily send ICP tokens to friends via messages, or vote on NNS proposals without having to leave the dapp. ",
    imageUrl: "/img/social-media-dapps/OpenChat.webp",
  },
  {
    title: "Distrikt",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque id, aspernatur odio ex laudantium ratione, atque sapiente nobis voluptas et delectus ut consequuntur molestias illum nulla soluta corporis doloribus illo.",
    imageUrl: "/img/social-media-dapps/Distrikt.webp",
  },
  {
    title: "DSCVR",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque id, aspernatur odio ex laudantium ratione, atque sapiente nobis voluptas et delectus ut consequuntur molestias illum nulla soluta corporis doloribus illo.",
    imageUrl: "/img/social-media-dapps/DSCVR.webp",
  },
];

function SocialMediaDappsPage() {
  resetNavBarStyle();

  const [openProjectIndex, setOpenProjectIndex] = useState(0);

  return (
    <Layout
      title="Decentralize Social Media"
      // fill in meta description
      description="Social media dapps owned and controlled by users - running 100% on the blockchain."
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
                  Decentralize Social Media
                </motion.h1>
                <motion.p
                  className="tw-lead-sm md:tw-lead mb-8"
                  variants={transitions.item}
                >
                  Social media dapps owned and controlled by users - running
                  100% on the blockchain.
                </motion.p>
                <motion.p className="" variants={transitions.item}>
                  <Link href="" className="button button-white">
                    Build your own
                  </Link>
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
                src="/img/social-media-dapps/hero.webp"
                className="w-80 sm:w-[480px] md:w-auto max-w-full"
              />
            </div>
          </motion.section>
        </AnimateSpawn>
        <section className="container-10 sm:pt-56">
          <AnimateSpawn
            className="mb-20 md:mb-40"
            variants={transitions.container}
          >
            <motion.p
              className="tw-heading-5 sm:tw-heading-4 md:tw-heading-3 mb-8 md:mb-10 md:w-6/10"
              variants={transitions.item}
            >
              The success of the new wave of web3 social media applications lies
              in decentralization.
            </motion.p>
            <motion.p
              className="tw-lead-sm md:tw-lead mb-8 md:mb-12 md:w-6/10"
              variants={transitions.item}
            >
              Today, it is the Boards of large for-profit corporations that
              steer the direction of social media apps, often to extract more
              monetary value from users to please shareholders. Centralized apps
              have also been known to selectively suppress opinions. With the
              release of the{" "}
              <Link
                href="/sns"
                className="text-infinite underline hover:no-underline hover:text-black"
              >
                Service Nervous System (SNS)
              </Link>
              , dapps running on the Internet Computer blockchain will flip the
              script by forming DAOs that put the control in the hands of the
              community.
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
              sm:top-[-800px]
              sm:left-[-900px]
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
            <Card
              title="Incentivized Social Media"
              icon={<IconTokenized aria-hidden="true" />}
            >
              <motion.p
                className="mb-6 tw-paragraph"
                variants={transitions.item}
              >
                Another advantage of forming a DAO and tokenizing a social media
                dapp is that users are incentivized to contribute to the success
                of a dapp. User engagement can organically increase marketing,
                while user contributions can significantly reduce costs of
                content moderation or even development and design.
              </motion.p>
              {/* <MotionLink
                className="link-external"
                href=""
                variants={transitions.item}
              >
                Learn more
              </MotionLink> */}
            </Card>
            <Card
              title="Why the Internet Computer?"
              icon={<IconAutonomous aria-hidden="true" />}
            >
              <motion.p
                className="mb-6 tw-paragraph"
                variants={transitions.item}
              >
                The Internet Computer enables true decentralization. As canister
                smart contracts can store data cost-effectively and be accessed
                directly via standard web browsers, the Internet Computer
                provides the first complete platform to build a new wave of
                DAO-governed social media applications.
              </motion.p>
              <MotionLink
                className="link-external"
                href=""
                variants={transitions.item}
              >
                See all benefits
              </MotionLink>
            </Card>
          </div>
        </section>
        <section className="container-10 mt-30 mb-20 md:mt-40 md:mb-40">
          <AnimateSpawn
            className="md:w-6/10 mb-20 md:mb-40"
            variants={transitions.container}
          >
            <motion.h2
              className="tw-heading-3 md:tw-heading-60 mb-8"
              variants={transitions.item}
            >
              Social Dapps Built on the Internet Computer
            </motion.h2>
            <motion.p className="tw-lead-sm mb-0" variants={transitions.item}>
              Decentralized social media applications like OpenChat, DSCVR and
              distrikt have been running on the Internet Computer for over a
              year with increasing numbers of daily active users.
            </motion.p>
          </AnimateSpawn>
          <AnimateSpawn
            variants={transitions.item}
            className="flex overflow-auto sm:overflow-visible -mx-6 sm:mx-0 sm:gap-2/10 snap-x snap-mandatory xl:relative sm:min-h-[40vw] xl:min-h-[450px]"
          >
            <div className="flex items-stretch gap-6 sm:flex-col sm:gap-10 mx-6 sm:mx-0 mb-6 sm:w-5/10 md:w-4/10">
              {projects.map((p, i) => (
                <Collapse
                  title={p.title}
                  open={openProjectIndex === i}
                  onClick={() => setOpenProjectIndex(i)}
                >
                  <div className="flex-1 tw-paragraph">{p.body}</div>

                  <img
                    src={projects[i].imageUrl}
                    alt={p.title}
                    className="sm:hidden mt-8"
                  />
                </Collapse>
              ))}
            </div>
            {projects.map((p, i) => (
              <div
                className="hidden sm:block absolute -right-6 w-4/10 max-w-[600px] transition-opacity"
                style={{ opacity: i === openProjectIndex ? 1 : 0 }}
              >
                <img src={p.imageUrl} alt={p.title} />
              </div>
            ))}
          </AnimateSpawn>
        </section>
        <section className="container-10 mx-auto">
          <div className="flex flex-col md:flex-row mb-12">
            <h2 className="md:w-4/10 tw-heading-3 md:tw-heading-60 mb-3">
              Why Internet Computer
            </h2>
            <div className="md:w-4/10 mt-3">
              <p className="tw-paragraph md:tw-lead-sm mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat
                nunc quis tellus mi dapibus sapien leo vitae. At lectus
                condimentum risus sed lacus leo.{" "}
              </p>
              <p className="mb-0">
                <Link className="link-external" href="">
                  Explore more features
                </Link>
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2 md:gap-6 md:grid-cols-2">
            <div className="p-6 md:p-12 bg-gradient-to-r from-infinite to-[#835ED3] text-white rounded-xl md:flex md:col-span-2">
              <h3 className="tw-heading-5 mb-4 flex-1 md:tw-heading-4 md:mb-0">
                100% on-chain
              </h3>
              <ul className="list-none p-0 space-y-3 tw-paragraph mb-0 flex-1 md:tw-lead-sm">
                <li>Censorship resistance</li>
                <li>DAOs are completely governed by users</li>
                <li>No need to rely on centralized cloud providers</li>
              </ul>
            </div>

            <div className="p-6 md:p-12 bg-white text-black rounded-xl backdrop-blur-xl">
              <h3 className="tw-heading-5 mb-4 md:mb-5 text-infinite">
                No gas fees
              </h3>
              <ul className="list-none p-0 space-y-3 tw-paragraph mb-0">
                <li>
                  Computation and storage costs are pre-paid by developers
                </li>
                <li>Users pay zero gas fees when interacting with dapps</li>
                <li>No need to hold tokens to use social media dapps</li>
              </ul>
            </div>

            <div className="p-6 md:p-12 bg-white text-black rounded-xl backdrop-blur-xl">
              <h3 className="tw-heading-5 mb-4 md:mb-5 text-infinite">
                Speed and cost efficiency
              </h3>
              <ul className="list-none p-0 space-y-3 mb-0">
                <li className="flex flex-col md:flex-row-reverse justify-between">
                  <span className="font-bold tw-paragraph">$5 / GB / year</span>
                  <span className="tw-paragraph-sm md:tw-paragraph">
                    On-chain data storage costs{" "}
                  </span>
                </li>
                <li className="flex flex-col md:flex-row-reverse justify-between">
                  <span className="font-bold tw-paragraph">
                    ~200ms (web speed)
                  </span>
                  <span className="tw-paragraph-sm md:tw-paragraph">
                    GET Query calls
                  </span>
                </li>
                <li className="flex flex-col md:flex-row-reverse justify-between">
                  <span className="font-bold tw-paragraph">
                    ~1-2s to reach finality
                  </span>
                  <span className="tw-paragraph-sm md:tw-paragraph">
                    POST Update calls
                  </span>
                </li>
                <li className="flex flex-col md:flex-row-reverse justify-between">
                  <span className="font-bold tw-paragraph">~2,400 txs/s</span>
                  <span className="tw-paragraph-sm md:tw-paragraph">
                    Internet Computer speed
                    <span className="tw-paragraph-sm text-black-60 block">
                      Not maximum network capacity
                    </span>
                  </span>
                </li>
              </ul>
            </div>

            <div className="p-6 md:p-12 bg-white text-black rounded-xl backdrop-blur-xl">
              <h3 className="tw-heading-5 mb-4 md:mb-5 text-infinite">
                Simple and secure Web3 Authentication
              </h3>
              <ul className="list-none p-0 space-y-3 tw-paragraph mb-0">
                <li>
                  Internet Identity, an easy-to-use anonymous authentication
                  system
                </li>
                <li>
                  Internet Identity uses WebAuthn, no wallets or seed phrases
                  needed
                </li>
              </ul>
            </div>
            <div className="p-6 md:p-12 bg-white text-black rounded-xl backdrop-blur-xl">
              <h3 className="tw-heading-5 mb-4 md:mb-5 text-infinite">
                HTTPS Outcalls
              </h3>
              <ul className="list-none p-0 space-y-3 tw-paragraph mb-0">
                <li>
                  Smart contracts can directly integrate existing web2 services
                </li>
                <li>Smart contracts can send emails and push notifications</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default SocialMediaDappsPage;
