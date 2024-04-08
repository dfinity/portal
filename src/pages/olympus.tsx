import Link from "@docusaurus/Link";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";
import React, { useRef } from "react";
import AnimateSpawn from "../components/Common/AnimateSpawn";
import ShareMeta from "../components/Common/ShareMeta";
import { useDarkHeaderInHero } from "../utils/use-dark-header-in-hero";
import TranslatedLayout from "../components/Common/TranslatedLayout/TranslatedLayout";
import { ShowcaseCard } from "../components/Common/Card";
import Newsletter from "../components/Common/Newsletter/Newsletter";

const layoutData = [
  {
    id: 1,
    image: "img/accelerator/image_1.webp",
    title: "Inclusive",
    description:
      "While traditional accelerators limit interactions among stakeholders, OLYMPUS empowers founders, investors, mentors and talents to communicate and collaborate directly within the platform.",
    reverse: true,
  },
  {
    id: 2,
    image: "img/accelerator/image_2.webp",
    title: "Transparent",
    description:
      "Metrics and reputation are key factors to make informed decisions. OLYMPUS infrastructure provides on-chain growth data for projects and multi-party rating tools to ensure verifiable reputation at all levels. Startups are publicly rated on a range of parameters including team, product, value proposition, business model, and technology.",
    reverse: false,
  },
  {
    id: 3,
    image: "img/accelerator/image_3.webp",
    title: "Global + Local",
    description:
      "OLYMPUS provides global outreach and visibility, leveraging communities of investors, mentors, founders and talents across 40+ countries.",
    reverse: true,
  },
  {
    id: 4,
    image: "img/accelerator/image_4.webp",
    title: "Multichain",
    description:
      "OLYMPUS is open to all Web3 ecosystems and stakeholders, offering founders the opportunity to accelerate faster, access mentorship and talent pools, and connect with capital.",
    reverse: false,
  },
  {
    id: 5,
    image: "img/accelerator/image_5.webp",
    title: "Sustainable",
    description:
      "OLYMPUS challenges the mainstream acceleration model of perpetual funding and replaces it with a self-sustaining roadmap for both Web3 founders and the platform itself.",
    reverse: true,
  },
];

const cardsData = [
  {
    id: 1,
    imageSrc: "img/accelerator/icon_1.svg",
    title: "Founders",
    subtitle: "Think outside the box",
    description:
      "Look beyond the benefits of a legacy accelerator. Scale sustainably thanks to a collaborative ecosystem of mentors, talents, investors, users.",
  },
  {
    id: 2,
    imageSrc: "img/accelerator/icon_2.svg",
    title: "Talents",
    subtitle: "Start your journey as Web3 pro",
    description:
      "Access opportunities at early-stage projects and build a solid Web3 network.",
  },
  {
    id: 3,
    imageSrc: "img/accelerator/icon_3.svg",
    title: "Mentors",
    subtitle: "Echo your expertise in the field",
    description:
      "Share your valuable knowledge with the best founders, and get involved in the next potential killer app.",
  },
  {
    id: 4,
    imageSrc: "img/accelerator/icon_4.svg",
    title: "Investors",
    subtitle: "Lead with the right tools",
    description:
      "Access globally vetted deals involving innovative Web3 projects and leverage verified data and ratings for your decisions.",
  },
];

const MotionLink = motion(Link);

function AcceleratorPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgDark = useDarkHeaderInHero(heroRef);

  return (
    <Layout
      title="OLYMPUS | The On-chain Acceleration Platform"
      description="OLYMPUS is the first on-chain Web3 acceleration platform connecting founders, investors, mentors and talents across different ecosystems."
    >
      <ShareMeta image="/img/shareImages/share-olympus.jpg"></ShareMeta>

      <main
        className="text-black relative overflow-hidden"
        style={{
          marginTop: `calc(var(--ifm-navbar-height) * -1)`,
        }}
      >
        <section
          className="bg-infinite text-white pt-20 mb-[10vw] lg:mb-3"
          ref={heroRef}
          style={{
            background: "linear-gradient(63deg, #3B00B9 0%, #D38ED7 100%)",
          }}
        >
          {bgDark && <DarkHeroStyles bgColor="transparent"></DarkHeroStyles>}

          <div className="container-10 mb-40 pt-20 pb-12 sm:pb-40 md:pb-40 md:pt-36 relative z-10">
            <div className="relative">
              <motion.h1
                className="tw-heading-3 md:tw-heading-2 mb-1 md:mb-3"
                variants={transitions.item}
              >
                OLYMPUS
              </motion.h1>
              <motion.h2 className="tw-heading-4 md:tw-heading-3 mb-2 md:mb-6">
                The On-Chain Acceleration Platform
              </motion.h2>
              <div className="relative  md:w-5/10">
                <motion.p
                  className="tw-lead-sm md:tw-lead mb-8"
                  variants={transitions.item}
                >
                  OLYMPUS is the first on-chain Web3 acceleration platform
                  connecting founders, investors, mentors and talents across
                  different ecosystems.
                </motion.p>
              </div>
              <MotionLink
                href="https://airtable.com/app5kkXNk5jTbPn4A/shrTV2c1swnQe7DXt"
                className="button-white"
                variants={transitions.item}
              >
                Request Early Access
              </MotionLink>
            </div>

            <AnimateSpawn
              variants={null}
              el={motion.section}
              className="pointer-events-none relative md:absolute -z-1 right-0 bottom-0 -mt-60 md:mt-0 md:w-2/10"
            >
              <div className=" md:absolute md:w-[250%] md:bottom-0 md:-right-12  translate-y-1/3 ">
                <motion.img
                  src="/img/accelerator/acceleratorheader.svg"
                  alt=""
                  className="w-full h-full object-cover max-w-sm md:max-w-none"
                />
              </div>
            </AnimateSpawn>
          </div>
        </section>

        <section className="container-10 relative -mt-8 md:mt-40">
          <AnimateSpawn variants={transitions.container}>
            <motion.h2
              className="text-gradient tw-heading-4 md:tw-heading-60 mb-0 md:max-w-9/12"
              variants={transitions.item}
            >
              A new framework designed to address Web3 adoption challenges and
              accelerate the next set of unicorns.
            </motion.h2>
          </AnimateSpawn>
        </section>

        <section className="container-12 pt-20 pb-20 md:pt-30 md:pb-30">
          <div className="flex flex-col gap-8 md:gap-18">
            {layoutData.map((item) => (
              <TranslatedLayout
                key={item.id}
                imageUrl={item.image}
                reverse={item.reverse}
              >
                <aside className="mb-24 md:mb-0">
                  <h3 className="tw-heading-4 md:tw-heading-60 mb-6 -mt-6 md:mt-0">
                    {item.title}
                  </h3>
                  <p className="tw-paragraph md:tw-lead-sm mb-0">
                    {item.description}
                  </p>
                </aside>
              </TranslatedLayout>
            ))}
          </div>
        </section>

        <AnimateSpawn
          className="bg-infinite text-white"
          el={motion.section}
          variants={transitions.container}
        >
          <div className=" py-20 md:pt-40 md:pb-44">
            <motion.h2
              className="container-10 tw-heading-3 md:text-[60px] md:leading-[70px] mb-6"
              variants={transitions.item}
            >
              Value Proposition & Key Personas
            </motion.h2>

            <div className="container-12 mt-12 md:mt-20 grid grid-cols-1 gap-5 text-black sm:grid-cols-2 md:grid-cols-4">
              {cardsData.map((card) => (
                <ShowcaseCard
                  key={card.id}
                  title={card.title}
                  subtitle={card.subtitle}
                  description={card.description}
                  imgSrc={card.imageSrc}
                />
              ))}
            </div>
            <aside className="container-10 md:mt-40 md:flex md:items-center	">
              <div className="pt-24 md:w-1/3">
                <motion.h3 className="tw-heading-4">Rating Loop</motion.h3>
                <motion.p className="text-2xl mb-0 ">
                  OLYMPUS participants are in a perpetual feedback loop: users
                  rate projects, projects rate investors, and investors rate
                  mentors. Reputation is stored on the blockchain, making it
                  consistent and easily accessible. Furthermore, all OLYMPUS
                  users must pass a proof of personhood test to ensure each
                  rating comes from a verifiable source.
                </motion.p>
              </div>
              <div className="md:w-2/3 relative mt-6 md:mt-64 md:mb-64">
                <div className="pointer-events-none md:absolute w-full  md:-right-24 md:top-1/2  md:-translate-y-1/2">
                  <motion.div
                    className="absolute blob blob-white blob-md md:blob-lg blob-x-6 md:blob-x-8 blob-y-2 -z-1"
                    variants={transitions.fadeIn}
                  ></motion.div>
                  <motion.img
                    variants={transitions.fadeIn}
                    src="/img/accelerator/trustless_ratings.webp"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </aside>
          </div>
        </AnimateSpawn>
        <section className="max-w-page relative mx-auto mb-10 mt-15 px-6 md:mb-28 md:px-24 md:mt-60 text-center">
          <AnimateSpawn
            className=" relative text-white"
            variants={transitions.container}
          >
            <motion.div
              className="blob blob-purple blob-sm  blob-x-5 blob-y-7 z-[-1] md:blob-lg"
              variants={transitions.fadeIn}
            ></motion.div>
            <motion.h2
              className="tw-heading-3 text-center mb-6 w-full mx-auto md:tw-heading-60 md:mb-12 lg:w-8/12"
              variants={transitions.item}
            >
              Find out how OLYMPUS can help You accelerate
            </motion.h2>
            <div>
              <MotionLink
                href="https://airtable.com/app5kkXNk5jTbPn4A/shrTV2c1swnQe7DXt"
                className="button-white"
                variants={transitions.item}
              >
                Request Early Access
              </MotionLink>
            </div>
          </AnimateSpawn>

          <AnimateSpawn
            className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-8 md:mt-16"
            variants={transitions.container}
          ></AnimateSpawn>
        </section>
        <section className="pt-30 mb-20  md:pt-20 md:mb-30 " id="subscribe">
          <Newsletter
            fields={[
              {
                name: "EMAIL",
                placeholder: "Email",
                type: "email",
                required: true,
              },
            ]}
            ctaLabel="Get updates!"
            postUrl="https://dfinity.us16.list-manage.com/subscribe/post?u=33c727489e01ff5b6e1fb6cc6&amp;id=7e9469a315&amp;f_id=00bac2e1f0"
            decoration={
              <img
                src="/img/newsletter/email-image-2.webp"
                alt=""
                loading="lazy"
              />
            }
            className="mb-20 relative "
          >
            <h2 className="text-white tw-heading-5 md:tw-heading-4 mb-6 md:mb-8 md:pr-10">
              Sign up for email updates{" "}
              <span className="text-white-60">
                to keep up to date with the Internet Computer
              </span>
            </h2>
          </Newsletter>
        </section>
      </main>
    </Layout>
  );
}

export default AcceleratorPage;
