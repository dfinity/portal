import Link from "@docusaurus/Link";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";
import React, { useRef } from "react";
import ItsGreenSection from "../../components/Basics/ItsGreen";
import AnimateSpawn from "../../components/Common/AnimateSpawn";
import LinkArrowRight from "../../components/Common/Icons/LinkArrowRight";
import ShareMeta from "../../components/Common/ShareMeta";
import { useDarkHeaderInHero } from "../../utils/use-dark-header-in-hero";

function SustainabilityPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const isDark = useDarkHeaderInHero(heroRef);
  return (
    <Layout
      title="Sustainability"
      description="Scalability and utility with low carbon cost — the Internet Computer is committed to building green tech, not just making claims about it. "
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <ShareMeta image="/img/shareImages/share-sustainability.jpg"></ShareMeta>

      <main
        className="text-black relative overflow-hidden"
        style={{
          marginTop: `calc(var(--ifm-navbar-height) * -1)`,
        }}
      >
        {isDark && <DarkHeroStyles bgColor="transparent"></DarkHeroStyles>}

        <AnimateSpawn variants={transitions.container} el={motion.section}>
          <div
            className="overflow-hidden  text-white pt-20"
            style={{
              background: `linear-gradient(77.94deg, #357095 -9.34%, #348B8D 21.93%, #39B392 48.29%, #4BA89C 75.1%, #348B8D 90.37%, #357195 108.5%)`,
            }}
            ref={heroRef}
          >
            <div className="container-10 pt-12 pb-32 md:pb-20 md:pt-36 relative">
              <div className="blob blob-white-dense blob-sm md:blob-md blob-x-5 blob-y-10 md:blob-x-9 opacity-90"></div>

              <div className="sm:w-8/10 md:w-6/10">
                <motion.h1
                  className="tw-heading-3 sm:tw-heading-2 mb-6"
                  variants={transitions.item}
                >
                  Committed to
                  <br />
                  green tech
                </motion.h1>
                <motion.p
                  className="tw-lead-sm sm:tw-lead"
                  variants={transitions.item}
                >
                  Scalability and utility with low carbon cost — the Internet
                  Computer is committed to building green tech, not just making
                  claims about it.
                </motion.p>
              </div>
            </div>
          </div>
        </AnimateSpawn>

        <AnimateSpawn
          className="container-12 relative"
          el={motion.section}
          variants={transitions.container}
        >
          <div className="md:absolute text-center md:right-0 md:top-0 -translate-y-5/12 md:-translate-y-7/12">
            <img
              src="/img/features/sustainability-hero.webp"
              className="w-full sm:w-[480px] lg:w-[660px]"
              alt=""
            />
          </div>
        </AnimateSpawn>

        <AnimateSpawn
          className="container-10"
          el={motion.section}
          variants={transitions.container}
        >
          <div className="relative">
            <div className="md:w-8/10 -mt-32 md:mt-52 md:order-1">
              <motion.p
                className="tw-heading-4 sm:tw-heading-3 md:tw-heading-60 mb-0 text-gradient-green"
                variants={transitions.item}
              >
                A key goal of the Internet Computer is to provide an energy
                efficient compute platform that scales for the world to build
                systems and services.
              </motion.p>
            </div>
          </div>
        </AnimateSpawn>

        <AnimateSpawn
          className="container-10 flex mt-20 md:mt-30 flex-col sm:flex-row gap-10 md:gap-0"
          el={motion.section}
          variants={transitions.container}
        >
          <div className="flex-1 sm:order-2">
            <p className="tw-paragraph mb-10">
              The Internet Computer is not only one of the most energy efficient
              blockchains running today, it is also the first blockchain to join
              the Proof of Green (PoG) initiative — an initiative that aims to
              cut greenwashing. In collaboration with Carbon Crowd, the DFINITY
              Foundation aims to set blockchain industry standards by making
              'claims of green' transparent, verifiable and accountable through
              measuring mechanisms and scope 2 carbon emissions reporting.{" "}
            </p>
            <p className="mb-0">
              <Link
                className="link-primary link-with-icon"
                href="https://wiki.internetcomputer.org/wiki/Energy_Consumption_and_Sustainability"
              >
                <LinkArrowRight />
                Our commitment to sustainability
              </Link>
            </p>
          </div>

          <div className="flex-1 md:-translate-x-2/10 text-center relative sm:order-1 -mb-[66vw] md:mb-0">
            <img
              src="/img/features/sustainability-globe.svg"
              alt=""
              className="max-w-full sm:absolute top-0 left-0 right-0"
            />
          </div>
        </AnimateSpawn>

        <AnimateSpawn
          className="md:container-12 mt-20 md:mt-30 relative"
          el={motion.section}
          variants={transitions.container}
        >
          <div className="md:rounded-xl bg-white/60 backdrop-blur-md px-6 mx:px-1/12 py-20 md:py-40 text-center">
            <h2 className="tw-heading-4 md:tw-heading-2 mb-6 md:mb-10 md:px-10">
              ICP is{" "}
              <span className="text-gradient-base bg-[linear-gradient(180deg,#4DEDD3_-4.77%,#31A782_33.04%,#3B00B9_166.79%)]">
                transparent
              </span>{" "}
              about carbon emissions
            </h2>
            <p className="tw-lead-sm md:tw-lead mb-8 md:mx-1/10">
              Making 'claims of green' transparent and verifiable to the public,
              means environmentally friendly behavior can be recognized,
              rewarded and regulated.{" "}
            </p>
            <p className="mb-10">
              <Link
                className="button-outline"
                href="https://app.carboncrowd.io/"
              >
                See ICP's carbon footprint
              </Link>
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 md:gap-10 items-center">
              <img src="/img/features/carbon-crowd.svg" alt=""></img>
              <img
                src="/img/features/proof-of-green-badge.webp"
                className="h-12"
                alt=""
              ></img>
            </div>
          </div>
        </AnimateSpawn>
        <ItsGreenSection id="sustainable" />
      </main>
      <section className="bg-white">
        <AnimateSpawn
          className="container-10 py-20 md:py-40 relative"
          variants={transitions.container}
        >
          <img
            src="/img/features/astronaut-green.webp"
            alt=""
            className="hidden md:block absolute left-6 -bottom-10 w-[219px] z-20"
          />

          <div className="md:ml-3/10 md:mr-2/10">
            <h2 className="tw-heading-4 md:tw-heading-60 mb-6">
              Keeping the Internet Computer Sustainable{" "}
            </h2>
            <p className="mb-10 tw-paragraph">
              While the Internet Computer is one of the most sustainable
              blockchains, taking a scientific approach to measuring and
              reporting energy consumption is just the first step, there’s still
              a lot of work to do.
            </p>
            <p className="mb-0">
              <Link
                className="button-outline"
                href="https://medium.com/dfinity/the-internet-computer-embraces-real-time-energy-reporting-and-the-proof-of-green-initiative-f78fc8787d31"
              >
                Find out more
              </Link>
            </p>
          </div>
        </AnimateSpawn>
      </section>
    </Layout>
  );
}

export default SustainabilityPage;
