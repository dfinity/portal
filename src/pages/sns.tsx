import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import { resetNavBarStyle } from "@site/src/utils/reset-navbar-style";
import BlobGradient from "@site/static/img/gradientBlurredCircle.png";
import BlobBlue from "@site/static/img/purpleBlurredCircle.png";
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
import ExternalLinkIcon from "@site/static/img/external-link.svg";

const MotionLink = motion(Link);

const Card: React.FC<{
  title: React.ReactNode;
  children: React.ReactNode;
  icon: React.ReactNode;
}> = ({ title, children, icon }) => {
  return (
    <AnimateSpawn
      className="sm:w-6/10 md:w-4/10 md:even:self-end md:-mt-30 lg:-mt-20 md:first:mt-0"
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

function SnsPage() {
  resetNavBarStyle();
  return (
    <Layout
      title="Service Nervous Systems (SNS)"
      // fill in meta description
      description="Put the autonomy in DAO. No centralized power, no
      administrative overhead, no legal headache, only code and its
      community."
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
                  Service Nervous Systems (SNS)
                </motion.h1>
                <motion.p
                  className="tw-lead-sm md:tw-lead mb-8"
                  variants={transitions.item}
                >
                  Put the autonomy in DAO. No centralized power, no
                  administrative overhead, no legal headache, only code and its
                  community.
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
              className="tw-heading-5 sm:tw-heading-4 ms:tw-heading-3 mb-8 md:mb-12 md:w-8/10"
              variants={transitions.item}
            >
              Tired of being the product? Tired of being deplatformed by
              corporate terms of service? Be unstoppable with an SNS.
            </motion.p>
            <motion.p
              className="mb-0 flex flex-col items-start sm:flex-row gap-6 md:gap-8"
              variants={transitions.item}
            >
              <Link className="button-outline" href="">
                Launch an SNS DAO
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
            <Card
              title="Community Owned"
              icon={<IconCommunityOwned aria-hidden="true" />}
            >
              <motion.p
                className="mb-6 tw-paragraph"
                variants={transitions.item}
              >
                Community above all. Fueled by the unique cryptography of the
                Internet Computer, SNS DAOs empower developers and users to come
                together to form communities around the full spectrum of
                applications we use daily. Through an SNS, applications such as
                social media platforms, B2B enterprise services, play-to-earn
                games and online news media outlets can now truly become
                decentralized.
              </motion.p>
              <motion.p
                className="mb-6 tw-paragraph"
                variants={transitions.item}
              >
                All parts of such applications are owned and governed by an SNS
                DAO. This is in contrasts to existing DAOs whereby governance
                applies only to smart contract logic, which is just a small part
                of any web3 application. No single entity owns a dapp.
              </motion.p>
              <MotionLink
                className="link-external"
                href=""
                variants={transitions.item}
              >
                Learn more
              </MotionLink>
            </Card>
            <Card
              title="Autonomous"
              icon={<IconAutonomous aria-hidden="true" />}
            >
              <motion.p
                className="mb-6 tw-paragraph"
                variants={transitions.item}
              >
                Liquid democracy. When a proposal is approved by the community,
                the SNS implements changes to the code and upgrades itself
                autonomously. This ensures permisionless and decentralized
                governance of an SNS DAO. No single entity can stop the process.
              </motion.p>
              <MotionLink
                className="link-external"
                href=""
                variants={transitions.item}
              >
                Learn more
              </MotionLink>
            </Card>
            <Card title="Tokenized" icon={<IconTokenized aria-hidden="true" />}>
              <motion.p
                className="mb-6 tw-paragraph"
                variants={transitions.item}
              >
                Financially independent. Each SNS DAO has its own utility token
                that community members can stake to claim governance rights or
                use to purchase services. The same token can be used to reward
                community contributions to the SNS DAO. Such contributions can
                range from engaging with the dapp to writing code, designing,
                promoting or participating in governance. No fiat required.
              </motion.p>
              <MotionLink
                className="link-external"
                href=""
                variants={transitions.item}
              >
                Learn more
              </MotionLink>
            </Card>
            <Card title="Scalable" icon={<IconScalable aria-hidden="true" />}>
              <motion.p
                className="mb-6 tw-paragraph"
                variants={transitions.item}
              >
                Infnitely scalable. The Internet Computer is the only blockchain
                that can scale without bounds - it can truly serve the world.
                Infinite scaling is possible through advanced cryptography which
                joins many subnets together into a singular, secure blockchain.
                This means there’s no limit to the volume of users a dapp can
                service, and smart contracts are capable of much more than
                simple token ledgers or financial contracts. They can serve full
                stack web applications or dapps at web speed. The Internet
                Computer is a world computer.
              </motion.p>
              <MotionLink
                className="link-external"
                href=""
                variants={transitions.item}
              >
                Learn more
              </MotionLink>
            </Card>
          </div>
        </section>
        <section className="text-white relative py-52 md:pt-80 container-12">
          <AnimateSpawn
            el={motion.img}
            variants={transitions.fadeIn}
            src={BlobGradient}
            alt=""
            className="max-w-none w-[1200px] md:w-[1600px] absolute top-[-200px] md:top-[-200px] left-1/2 -translate-x-1/2 z-[-1]"
          />
          <AnimateSpawn
            className="mx-auto text-center sm:w-6/12 mb-16 md:mb-8"
            variants={transitions.container}
          >
            <motion.h2
              className="tw-heading-4 md:tw-heading-60 mb-3 md:mb-8"
              variants={transitions.item}
            >
              Turn your App into a dApp with an SNS
            </motion.h2>
            <motion.p
              className="tw-lead-sm md:tw-lead mb-8"
              variants={transitions.item}
            ></motion.p>
            <MotionLink
              variants={transitions.item}
              className="button-outline-white"
              href=""
            >
              Launch an SNS DAO
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
                the success its community.
              </p>
            </motion.div>
            <motion.div
              variants={transitions.item}
              className="px-8 py-12 backdrop-blur-2xl bg-white-50 rounded-xl border-white border-solid border text-center flex-1 md:mt-10"
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
                Own and shape the services and applications you love.
              </motion.h2>

              <motion.p variants={transitions.item} className="tw-lead-sm mb-3">
                Announcment soon on DSCVR.
              </motion.p>
              <motion.p variants={transitions.item}>
                <Link
                  className="link-primary text-white hover:text-white-60"
                  href="https://dscvr.one/p/internet-computer"
                >
                  Join the Internet Computer Portal
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
          className="container-10 py-24 md:py-40"
          variants={transitions.container}
        >
          <div className="relative">
            <AnimateSpawn
              el={motion.img}
              variants={transitions.item}
              src={BlobBlue}
              className="absolute pointer-events-none
              max-w-none
              w-[1000px]
              top-[200px]
              left-[-600px]
              sm:top-0
              sm:w-[1200px]
              sm:left-[-700px]
            "
            />
          </div>
          <motion.h2 className="tw-heading-3 mb-16" variants={transitions.item}>
            What an SNS DAO is <span className="text-razzmatazz">NOT</span>
          </motion.h2>
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-1/10">
            <motion.div variants={transitions.item}>
              <h3 className="tw-heading-5 mb-4">Not an ICO</h3>
              <p className="tw-paragraph">
                No funds are handed over to developers. The creation of an SNS
                is initiated by a decentralized entity (
                <Link
                  className="text-infinite underline hover:no-underline hover:text-black"
                  href="https://nns.ic0.app/"
                >
                  the NNS
                </Link>
                ), and ICP raised by the decentralization sale is allocated to
                the treasury of the newly born SNS DAO.
              </p>
            </motion.div>
            <motion.div variants={transitions.item}>
              <h3 className="tw-heading-5 mb-4">Not an IPO</h3>
              <p className="tw-paragraph">
                This is not a liquidity exit or a public listing. It’s the start
                of a new journey where you as the initial creator and your users
                have the opportunity to form a digital community, 100% on-chain,
                to co-evolve and grow the platform or application.
              </p>
            </motion.div>
          </div>
        </AnimateSpawn>
      </main>
    </Layout>
  );
}

export default SnsPage;
