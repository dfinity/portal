import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import BlobGradient from "@site/static/img/gradientBlurredCircle.png";
import PlaySVG from "@site/static/img/svgIcons/play.svg";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";
import React from "react";
import AnimateSpawn from "../components/Common/AnimateSpawn";
import LinkArrowRight from "../components/Common/Icons/LinkArrowRight";
import LinkArrowUpRight from "../components/Common/Icons/LinkArrowUpRight";
import ShareMeta from "../components/Common/ShareMeta";
import TranslatedLayout from "../components/Common/TranslatedLayout/TranslatedLayout";

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

function SnsPage() {
  return (
    <Layout
      title="OpenChat"
      description="Join the Future of Social Media - Decentralized, Secure, and
      Community-Driven. See how OpenChat got DAO-swapped in less
      than 6 hours."
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <ShareMeta image="/img/shareImages/share-openchat.jpg"></ShareMeta>

      <main className="text-black relative overflow-hidden">
        <DarkHeroStyles></DarkHeroStyles>
        <AnimateSpawn variants={transitions.container}>
          <section className="overflow-hidden bg-infinite text-white">
            <div className="container-10 pt-12 mb-60 md:mb-52 md:pt-36 relative">
              <div className="blob blob-white blob-xl md:blob-xl top-[-150px] left-full -translate-x-2/3 opacity-100"></div>

              <div className="md:w-7/10">
                <motion.h1
                  className="tw-heading-3 md:tw-heading-2 mb-6"
                  variants={transitions.item}
                >
                  OpenChat ipsum dolor sit amet
                </motion.h1>
                <motion.p
                  className="tw-lead-sm md:tw-lead mb-8"
                  variants={transitions.item}
                >
                  Join the Future of Social Media - Decentralized, Secure, and
                  Community-Driven. See how OpenChat got DAO-swapped in less
                  than 6 hours.
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
            Introduction how it came to the SNS DAO ipsum dolor. Etiam porta sem
            malesuada magna mollis euismod. Maecenas sed diam varius blandit.
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
              <img src="/img/sns/tokenized.svg" aria-hidden="true"></img>
              {/* <img src="/img/sns/scalable.svg" aria-hidden="true"></img> */}
              <h3>Easy to Get Started</h3>
              <p>
                Vivamus{" "}
                <Link href="/" className="link-subtle">
                  sagittis
                </Link>{" "}
                lacus vel augue laoreet rutrum faucibus dolor auctor. Morbi leo
                risus, porta ac consectetur ac, vestibulum at eros. Fusce
                dapibus, tellus ac cursus commodo, tortor mauris condimentum
                nibh, ut fermentum massa justo sit amet risus. Nulla vitae elit
                libero, a pharetra augue. Cras mattis consectetur purus sit amet
                fermentum.
              </p>
              <p>
                Maecenas sed diam eget risus varius blandit sit amet non magna.
                Curabitur blandit tempus porttitor. Nullam quis risus eget urna
                mollis ornare vel eu leo. Nullam id dolor id nibh ultricies
                vehicula ut id elit.
              </p>
              <p>
                <Link
                  href="https://oc.app"
                  className="link-primary link-with-icon"
                >
                  Try OpenChat <LinkArrowUpRight />
                </Link>
              </p>
              <p>
                <Link
                  href="https://oc.app"
                  className="link-primary link-with-icon"
                >
                  Another Link <LinkArrowUpRight />
                </Link>
              </p>
            </Card>

            <Card>
              <img src="/img/sns/community-owned.svg" aria-hidden="true"></img>
              <h3>Community Owned</h3>
              <p>
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
              </p>
            </Card>

            <Card>
              <img src="/img/sns/autonomous.svg" aria-hidden="true"></img>
              <h3>Autonomous</h3>
              <p>
                After an SNS DAO has taken control of a dapp, it is governed by
                the token holders in a completely decentralized way through its
                SNS DAO. In contrast to existing DAOs, in which governance
                applies only to smart contract logic, i.e., just a small part of
                a Web3 application, an SNS DAO controls every aspect of a dapp.
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
              Join the OpenChat community
            </h2>
            <p className="tw-lead-sm mb-6 md:mb-6">
              Maecenas faucibus mollis interdum. Praesent commodo cursus magna,
              vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel
              augue laoreet rutrum faucibus dolor auctor. Donec id elit non mi
              porta gravida at eget metus.
            </p>
            <p className="mb-0">
              <Link href="https://oc.app" className="button-primary">
                Go to OpenChat
              </Link>
            </p>
          </TranslatedLayout>
          <TranslatedLayout imageUrl="/img/openchat/image-2.webp">
            <h2 className="md:tw-heading-60 md:mb-6">
              Join the OpenChat community
            </h2>
            <p className="tw-lead-sm mb-6 md:mb-10">
              Maecenas faucibus mollis interdum. Praesent commodo cursus magna,
              vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel
              augue laoreet rutrum faucibus dolor auctor. Donec id elit non mi
              porta gravida at eget metus.
            </p>
            <p className="mb-0">
              <Link
                href="https://oc.app"
                className="link-primary link-with-icon"
              >
                <LinkArrowRight />
                Go to OpenChat
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
              Have an SNS Transform Your Web3 App into a True Dapp
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
              href="/docs/current/developer-docs/integrations/sns/get-sns/get-sns-intro/"
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

export default SnsPage;
