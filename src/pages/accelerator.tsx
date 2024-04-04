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

const data = [
  {
    id: 1,
    image: "img/accelerator/image_1.webp",
    title: "Inclusive",
    description:
      "By operating in silos, traditional accelerators risk limiting interaction. Olympus encourages stakeholders from all cohorts to engage freely on a single platform. They assume collective responsibility for developing a collaborative environment.",
    reverse: true,
  },
  {
    id: 2,
    image: "img/accelerator/image_2.webp",
    title: "Transparent",
    description:
      "Metrics are vital to help stakeholders make informed decisions. Olympus records this data on-chain, which means that investors can have full confidence in its accuracy thanks to the immutability of blockchain technology. Projects are rated on nine parameters including team, product, value proposition, business model, and technology.",
    reverse: false,
  },
  {
    id: 3,
    image: "img/accelerator/image_3.webp",
    title: "Global",
    description:
      "Olympus offers stakeholders a platform with global reach. It fills its pipeline with the most innovative projects scouted from a hyperlocal pipeline in more than 40 countries.",
    reverse: true,
  },
  {
    id: 4,
    image: "img/accelerator/image_4.webp",
    title: "Multichain",
    description:
      "The Olympus platform is interoperable. Participants can scale faster by accessing a vast pool of potential investors and users from different Web3 ecosystems, including Bitcoin and Ethereum.",
    reverse: false,
  },
  {
    id: 5,
    image: "img/accelerator/image_5.webp",
    title: "Sustainable",
    description:
      "Early cohorts will receive funding and grants, but Olympus will ultimately sustain itself by issuing a native token. The tokenomics will incentivize stakeholder participation and support the long-term success of every project.",
    reverse: true,
  },
];

const cardsData = [
  {
    id: 1,
    imageSrc: "img/accelerator/icon_1.webp",
    title: "Projects",
    subtitle: "From initial idea to scale up",
    description:
      "Harness the benefits of blockchain for the growth of your startup. Launch and scale quickly by finding the right talent, community, and investors based on immutable credentials.",
  },
  {
    id: 2,
    imageSrc: "img/accelerator/icon_2.webp",
    title: "Users",
    subtitle: "From Web3 curious to crypto pioneers",
    description:
      "Become early adopters of the latest dapps and provide feedback that helps shape the final product.",
  },
  {
    id: 3,
    imageSrc: "img/accelerator/icon_3.webp",
    title: "Talent",
    subtitle: "From entry level to Web3 veterans",
    description:
      "Access employment opportunities at early-stage projects and build a Web3 startup network.",
  },
  {
    id: 4,
    imageSrc: "img/accelerator/icon_4.webp",
    title: "Mentors",
    subtitle: "Experts in tokenomics, infrastructure, marketing",
    description:
      "Support founders at the early stages of their Web3 journey and establish expertise in the field.",
  },
  {
    id: 5,
    imageSrc: "img/accelerator/icon_5.webp",
    title: "Investors",
    subtitle: "Angels or venture capital funds",
    description:
      "Access globally vetted deals involving innovative Web3 projects and leverage verified data to support decisions based on parameters scored by stakeholders.",
  },
];

const MotionLink = motion(Link);

function AcceleratorPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgDark = useDarkHeaderInHero(heroRef);

  return (
    <Layout
      title="Permissionless Web3 acceleration"
      description="Olympus is a multichain startup acceleration platform, fostering collaboration among key stakeholders and leveraging blockchain technology to enhance transparency."
    >
      <ShareMeta image="/img/shareImages/share-accelerator.jpg"></ShareMeta>

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
                className="tw-heading-3 md:tw-heading-2 mb-2 md:mb-6 md:w-8/10"
                variants={transitions.item}
              >
                Olympus - a permissionless Web3 acceleration platorm
              </motion.h1>
              <div className="relative  md:w-5/10">
                <motion.p
                  className="tw-lead-sm md:tw-lead mb-8"
                  variants={transitions.item}
                >
                  Olympus is a multichain startup acceleration platform,
                  fostering collaboration among key stakeholders and leveraging
                  blockchain technology to enhance transparency
                </motion.p>
              </div>
              <MotionLink
                href="/accelerator"
                className="button-white"
                variants={transitions.item}
              >
                GET EARLY ACCESS
              </MotionLink>
            </div>

            <AnimateSpawn
              el={motion.section}
              variants={transitions.container}
              className="pointer-events-none relative md:absolute -z-1 right-0 bottom-0 -mt-80 md:mt-0 md:w-2/10"
            >
              <div className=" md:absolute md:w-[250%] md:bottom-0 md:-right-12  translate-y-1/3 ">
                <motion.img
                  variants={transitions.fadeIn}
                  src="/img/accelerator/acceleratorheader.webp"
                  alt=""
                  className="w-full h-full object-cover max-w-sm md:max-w-none"
                />
              </div>
            </AnimateSpawn>
          </div>
        </section>

        <section className="container-10 relative mt-40 md:mt-0">
          <AnimateSpawn variants={transitions.container}>
            <motion.h2
              className="tw-heading-30 text-gradient md:tw-heading-60 mb-0 md:max-w-7/10"
              variants={transitions.item}
            >
              Uniting stakeholders to foster Web3 innovation
            </motion.h2>
            <motion.p
              className="text-gradient md:tw-lead mb-8 mt-4 md:max-w-4/10 md:font-bold font-bold"
              variants={transitions.item}
            >
              Addressing Web3 adoption challenges by introducing a new framework
              aimed at accelerating the next web3 unicorn
            </motion.p>
          </AnimateSpawn>
        </section>

        <section className="container-12 pt-20 pb-20 md:pt-30 md:pb-30">
          <div className="flex flex-col gap-16 md:gap-20">
            {data.map((item) => (
              <TranslatedLayout imageUrl={item.image} reverse={item.reverse}>
                <aside>
                  <h3 className="tw-heading-4 md:tw-heading-60 mb-6">
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
          <div className="container-10 py-20 md:pt-40 md:pb-44">
            <motion.h2
              className="tw-heading-3 md:text-[60px] md:leading-[70px] mb-10"
              variants={transitions.item}
            >
              A single platform enabling all stakeholders
            </motion.h2>

            <div className="mt-20 grid grid-cols-1 gap-5 text-black sm:grid-cols-2 md:grid-cols-3 md:mr-12">
              {cardsData.map((card) => (
                <ShowcaseCard
                  title={card.title}
                  subtitle={card.subtitle}
                  description={card.description}
                  imgSrc={card.imageSrc}
                />
              ))}
            </div>
            <aside className="mt-40 md:flex md:items-center	">
              <div className="pt-24 md:w-1/3">
                <motion.h3 className="tw-heading-4">
                  Trustless feedback for accountability and transparency
                </motion.h3>
                <motion.p className="text-2xl mb-0 ">
                  Stakeholders are in a perpetual feedback loop from day one-
                  users rate projects, projects rate investors, and investors
                  rate mentors. This data is stored on the blockchain, making it
                  immutable and easily accessible. Furthermore, all stakeholders
                  must pass a proof of personhood test to ensure each rating
                  comes from a verifiable source.
                </motion.p>
              </div>
              <div className="md:w-2/3 relative mt-12 md:mt-0 ">
                <div className="pointer-events-none md:absolute w-full  md:right-0 md:top-1/2  md:-translate-y-1/2">
                  <motion.div
                    className="absolute blob blob-white blob-md md:blob-lg blob-x-6 md:blob-x-8 blob-y-0"
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
        <section className="max-w-page relative mx-auto mb-20 mt-30 px-6 md:mb-48 md:px-24 md:mt-48 text-center">
          <AnimateSpawn
            className=" relative text-white"
            variants={transitions.container}
          >
            <motion.div
              className="blob blob-purple blob-sm  blob-x-5 blob-y-7 z-[-1] md:blob-lg"
              variants={transitions.fadeIn}
            ></motion.div>
            <motion.h2
              className="tw-heading-3 text-center mb-2 w-full mx-auto md:tw-heading-60 md:mb-6 lg:w-8/12"
              variants={transitions.item}
            >
              Get ahead of the noise
            </motion.h2>
            <div className="text-center md:w-5/10 mx-auto">
              <motion.p
                className="relative tw-text-sm md:tw-text-base mb-8 text-center"
                variants={transitions.item}
              >
                If you believe you are building the next big Web3 idea, seize
                the opportunity and explore more now.
              </motion.p>
            </div>
            <div>
              <MotionLink
                href="/accelerator"
                className="button-white"
                variants={transitions.item}
              >
                EXPLORE THE PLATFORM
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
              Stay up to date{" "}
              <span className="text-white-60">
                with the launch of the Olympus accelerator program and ICP
                related topics
              </span>
            </h2>
          </Newsletter>
        </section>
      </main>
    </Layout>
  );
}

export default AcceleratorPage;
