import Link from "@docusaurus/Link";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import LinkArrowRight from "@site/src/components/Common/Icons/LinkArrowRight";
import LinkArrowUpRight from "@site/src/components/Common/Icons/LinkArrowUpRight";
import {
  TranslatedCard,
  TranslatedCardList,
} from "@site/src/components/Common/TranslatedCards/TranslatedCards";
import TranslatedLayout from "@site/src/components/Common/TranslatedLayout/TranslatedLayout";
import { NewsCard } from "@site/src/components/NewsPage/Cards";
import { Press } from "@site/src/components/NewsPage/types";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";
import React, { useRef } from "react";
import AnimateSpawn from "../../components/Common/AnimateSpawn";
import ShareMeta from "../../components/Common/ShareMeta";
import { useDarkHeaderInHero } from "../../utils/use-dark-header-in-hero";

const MotionLink = motion(Link);

const AnimatedNewsCard = ({
  news,
  linkLabel,
}: Parameters<typeof NewsCard>["0"]) => {
  return (
    <motion.div variants={transitions.item} className="flex">
      <NewsCard news={news} linkLabel={linkLabel} />
    </motion.div>
  );
};

const FeatureCard = ({ iconUrl, title }) => {
  return (
    <motion.div
      variants={transitions.item}
      className="
        flex-1 rounded-xl md:rounded-3xl 
        bg-[linear-gradient(82deg,#9ECFCF_-15.16%,#43BC9D_38.97%,#357494_100%)] 
        md:bg-[linear-gradient(0deg,#9ECFCF_-23.13%,#43BC9D_34.74%,#357494_100%)] 
        backdrop-blur-lg 
        text-center px-8 py-6 md:p-10 
        flex md:flex-col gap-8 md:gap-5 items-center
      "
    >
      <img src={iconUrl} alt={title} loading="lazy" className="h-16 md:h-24" />
      <h3 className="tw-heading-6 text-white/80 mb-0">{title}</h3>
    </motion.div>
  );
};

function SustainabilityPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const isDark = useDarkHeaderInHero(heroRef);
  return (
    <Layout
      title="Blockchain for Sustainable Business"
      description="Blockchain technology catalyzes sustainability efforts by enhancing transparency, traceability, and accountability in business operations."
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

              <motion.h1
                className="tw-heading-3 md:tw-heading-2 mb-6 md:w-8/10"
                variants={transitions.item}
              >
                Blockchain for Sustainable Business
              </motion.h1>
              <motion.p
                className="tw-lead-sm md:tw-lead md:w-6/10"
                variants={transitions.item}
              >
                Blockchain technology catalyzes sustainability efforts by
                enhancing transparency, traceability, and accountability in
                business operations.
              </motion.p>
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
            <div className="md:w-9/10 -mt-32 md:mt-52 md:order-1">
              <motion.p
                className="tw-heading-4 sm:tw-heading-3 md:tw-heading-60 mb-6 md:mb-10 text-gradient-green"
                variants={transitions.item}
              >
                Globally, the significance of sustainability is escalating,
                driven by regulatory compliance, energy consumption, climate
                change, and overall operational costs.
              </motion.p>
              <motion.p>
                <Link href="#get-report" className="button-white">
                  Read Sustainable Use Cases Report
                </Link>
              </motion.p>
            </div>
          </div>
        </AnimateSpawn>

        <AnimateSpawn
          className="container-10 flex mt-20 md:mt-30 pb-20 md:pb-40 flex-col sm:flex-row gap-10 md:gap-0"
          el={motion.section}
          variants={transitions.container}
        >
          <div className="flex-1 sm:order-2">
            <p className="tw-paragraph md:tw-lead mb-0">
              The environmental footprint of an application is only one of the
              many aspects of sustainability. Equally important are the cost of
              operating, maintaining and scaling an application as well as its
              longevity, security and privacy, resilience against attacks, and
              business model - ultimately the economic sustainability of an
              application once it is built and launched.
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
        <section className="bg-white pt-20 md:pt-30 relative">
          <AnimateSpawn
            variants={transitions.container}
            className="container-6"
          >
            <motion.h2
              variants={transitions.item}
              className="tw-heading-5 md:tw-heading-3 mb-6"
            >
              The Internet Computer as a catalyst for sustainability: paving the
              way for transformation
            </motion.h2>
            <motion.p
              variants={transitions.item}
              className="tw-lead-sm md:tw-lead mb-6"
            >
              The Internet Computer provides far better sustainability than the
              traditional IT stack, as it takes a completely different
              architectural approach that makes it more energy efficient.
            </motion.p>
            <motion.p
              variants={transitions.item}
              className="tw-heading-6 md:tw-heading-5 mb-0"
            >
              ICP provides 4 key components for sustainability use cases:
            </motion.p>
          </AnimateSpawn>
          <AnimateSpawn
            variants={transitions.container}
            className="container-10 mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-5"
          >
            <FeatureCard
              iconUrl="/img/features/sustainability/icon-1.webp"
              title="Transparency"
            ></FeatureCard>
            <FeatureCard
              iconUrl="/img/features/sustainability/icon-2.webp"
              title="Accountability"
            ></FeatureCard>
            <FeatureCard
              iconUrl="/img/features/sustainability/icon-3.webp"
              title="Verifiability"
            ></FeatureCard>
            <FeatureCard
              iconUrl="/img/features/sustainability/icon-4.webp"
              title="Efficiency"
            ></FeatureCard>
          </AnimateSpawn>
          <AnimateSpawn
            variants={transitions.container}
            className="container-10 mt-20 md:mt-30"
          >
            <div className="md:w-6/10">
              <motion.h2
                variants={transitions.item}
                className="tw-heading-5 md:tw-heading-3 mb-6"
              >
                Why ICP is the best blockchain for sustainability use cases
              </motion.h2>
              <ul className="list-none pl-0 space-y-4 md:space-y-8">
                <motion.li
                  className="tw-heading-6 md:tw-heading-5 pl-8 md:pl-16 relative bg-[url(/img/features/sustainability/icon-check-mobile.svg)] md:bg-[url(/img/features/sustainability/icon-check.svg)] bg-left-top bg-no-repeat min-h-6 md:min-h-16"
                  variants={transitions.item}
                >
                  Donec id elit non mi porta gravida at eget metus. Aenean eu
                  leo quam pellentesque ornare sem
                </motion.li>
                <motion.li
                  className="tw-heading-6 md:tw-heading-5 pl-8 md:pl-16 relative bg-[url(/img/features/sustainability/icon-check-mobile.svg)] md:bg-[url(/img/features/sustainability/icon-check.svg)] bg-left-top bg-no-repeat min-h-6 md:min-h-16"
                  variants={transitions.item}
                >
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur et
                </motion.li>
                <motion.li
                  className="tw-heading-6 md:tw-heading-5 pl-8 md:pl-16 relative bg-[url(/img/features/sustainability/icon-check-mobile.svg)] md:bg-[url(/img/features/sustainability/icon-check.svg)] bg-left-top bg-no-repeat min-h-6 md:min-h-16"
                  variants={transitions.item}
                >
                  Duis mollis, est non commodo luctus, nisi erat porttitor
                  ligula, eget lacinia odio sem nec
                </motion.li>
              </ul>
            </div>
          </AnimateSpawn>
          <div className="relative h-60 md:h-[440px]">
            <img
              src="/img/features/sustainability/large-visual.svg"
              alt="ICP visual"
              className="max-w-none w-[450px] md:w-[1200px] absolute -right-16 md:-right-0 -bottom-16 md:-bottom-52"
            />
          </div>
        </section>
        <AnimateSpawn
          className="container-10 relative"
          el={motion.section}
          variants={transitions.container}
        >
          <img
            src="/img/features/blob-bg-hero.webp"
            alt=""
            className="absolute left-1/2 -translate-x-7/12 -top-[40vmax] w-[260vmax] max-w-none md:max-w-[300vmin] z-[-1]"
          />

          <motion.div
            variants={transitions.container}
            className="text-white md:w-7/10 mt-64 md:mt-80 mb-20 md:mb-40 relative"
          >
            <motion.h2
              variants={transitions.item}
              className="tw-heading-4 md:tw-heading-60 mb-6"
            >
              The Blockchain for Sustainable Use Cases Report
            </motion.h2>

            <motion.p
              variants={transitions.item}
              className="tw-paragraph md:tw-lead mb-8"
            >
              A sustainable future is important for your business, and the world
              around you. This report, authored by the DFINITY Foundation and
              Inacta Venture, explores 10 unique business use cases where
              blockchain's inherent traits of transparency, immutability, and
              relative low cost work to improve existing practices.
            </motion.p>

            <motion.img
              variants={transitions.fadeIn}
              src="/img/basics/icon-db.svg"
              aria-hidden
              className="absolute -z-1 w-30 md:w-40 top-[-150px] right-[130px] md:top-[-160px] md:right-[20px]"
            />
            <motion.img
              variants={transitions.fadeIn}
              src="/img/basics/icon-iot.svg"
              aria-hidden
              className="absolute -z-1 w-30 md:w-40 top-[-220px] right-0 md:top-[-240px] md:right-[-240px]"
            />
            <motion.img
              variants={transitions.fadeIn}
              src="/img/basics/icon-plant.svg"
              aria-hidden
              className="absolute -z-1 w-30 md:w-40 -top-30 right-[-30px] md:top-[70px] md:right-[-180px]"
            />
          </motion.div>
        </AnimateSpawn>

        <section className="bg-page pt-20 md:pt-30">
          <AnimateSpawn
            variants={transitions.container}
            className="container-10"
          >
            <div className="md:w-8/10">
              <motion.h2
                variants={transitions.item}
                className="tw-heading-4 sm:tw-heading-3 md:tw-heading-60 mb-6 md:mb-12 text-gradient-green"
              >
                Report sneak peek into the sustainable business use cases
              </motion.h2>
            </div>

            <TranslatedCardList className="">
              <TranslatedCard
                title="Reporting & certifications"
                icon={
                  <img
                    src="/img/features/sustainability/icon-5.webp"
                    loading="lazy"
                    aria-hidden="true"
                  />
                }
              >
                <motion.p
                  className="mb-0 tw-paragraph"
                  variants={transitions.item}
                >
                  Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                  Duis mollis, est non commodo luctus, nisi erat porttitor
                  ligula, eget lacinia odio sem nec elit. Nulla vitae elit
                  libero, a pharetra augue.
                </motion.p>
              </TranslatedCard>
              <TranslatedCard
                title="Crypto donation platform"
                icon={
                  <img
                    src="/img/features/sustainability/icon-6.webp"
                    loading="lazy"
                    aria-hidden="true"
                  />
                }
              >
                <motion.p
                  className="mb-0 tw-paragraph"
                  variants={transitions.item}
                >
                  Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                  Duis mollis, est non commodo luctus, nisi erat porttitor
                  ligula, eget lacinia odio sem nec elit. Nulla vitae elit
                  libero, a pharetra augue.
                </motion.p>
              </TranslatedCard>
              <TranslatedCard
                title="Token-based carbon credit trading platform"
                icon={
                  <img
                    src="/img/features/sustainability/icon-7.webp"
                    loading="lazy"
                    aria-hidden="true"
                  />
                }
              >
                <motion.p
                  className="mb-0 tw-paragraph"
                  variants={transitions.item}
                >
                  Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                  Duis mollis, est non commodo luctus, nisi erat porttitor
                  ligula, eget lacinia odio sem nec elit. Nulla vitae elit
                  libero, a pharetra augue.
                </motion.p>
              </TranslatedCard>
            </TranslatedCardList>
          </AnimateSpawn>
        </section>

        <section
          id="get-report"
          className="md:container-12 text-white pt-20 md:py-30"
        >
          <AnimateSpawn
            className="px-6 md:px-1/12 pt-6 pb-16 md:py-20 bg-[url(/img/features/sustainability/download-report-bg.webp)] bg-cover md:rounded-[32px] overflow-hidden md:flex relative"
            variants={transitions.container}
          >
            <img
              src="/img/features/sustainability/img-sustainability-report.webp"
              alt="Download the sustainability report"
              loading="lazy"
              className="w-[130%] max-w-none relative -left-6 md:order-2 md:absolute md:w-[700px] lg:w-[900px] md:-right-20 md:bottom-0 lg:-right-40 lg:-bottom-20 md:left-auto"
            />
            <div className="md:w-1/2 md:min-w-5/10 md:order-1">
              <motion.h3 className="tw-heading-5 mt-4 mb-8 md:tw-heading-3">
                Download now: Full report of all 10 sustainable business use
                cases in detail
              </motion.h3>
              <form
                className="md:mr-2/10 grid grid-cols-1 gap-3 md:grid-cols-2"
                method="post"
                action="https://dfinity.us16.list-manage.com/subscribe/post?u=33c727489e01ff5b6e1fb6cc6&id=726e1ebe92"
              >
                <input
                  placeholder="First name"
                  name="MERGE1"
                  type="text"
                  className="input-text input-text-white w-full"
                  required
                />
                <input
                  placeholder="Last name"
                  name="MERGE2"
                  type="text"
                  className="input-text input-text-white w-full"
                  required
                />
                <input
                  placeholder="Your Email"
                  name="MERGE0"
                  type="email"
                  className="input-text input-text-white w-full md:col-span-2"
                  required
                />
                <button
                  type="submit"
                  className="button-white md:col-span-2 justify-self-start mt-3"
                >
                  Download the full report
                </button>
              </form>
              <p className="text-white/50 tw-caption mb-0 mt-6">
                By providing the contact information required in this form, you
                agree to be contacted by the DFINITY Foundation in order to
                inform you about our products and services. Unsubscribe from
                marketing email communications from DFINITY Foundation by using
                the unsubscribe link provided in the email.
              </p>
            </div>
          </AnimateSpawn>
        </section>

        <AnimateSpawn
          className="bg-infinite overflow-hidden "
          variants={transitions.container}
          el={motion.section}
        >
          <div className="container-10 py-30 md:py-40 flex flex-col sm:flex-row text-white relative">
            <div className="blob blob-white blob-sm md:blob-xl blob-x-10 blob-y-3 md:blob-y-5 opacity-70"></div>
            <div className="flex-1 mt-40 sm:mt-0">
              <h2 className="tw-heading-4 md:tw-heading-3 mb-6">
                Connect with us for your Sustainability Use Case
              </h2>
              <p className="tw-lead-sm md:tw-lead mb-6 md:mb-8">
                Write to us if you would like to develop a use case from the
                report, or a unique one.
              </p>
              <p className="mb-0">
                <Link href="mailto:comms@dfinity.org" className="button-white">
                  Get in touch
                </Link>
              </p>
            </div>
            <div className="flex-1 ">
              <img
                src="/img/features/sustainability/get-in-touch.svg"
                alt=""
                loading="lazy"
                className="absolute top-0 right-0 left-0 max-w-md md:max-w-none sm:left-auto sm:-right-30 sm:-top-6"
              ></img>
            </div>
          </div>
        </AnimateSpawn>
        <section className="container-12 pt-20 md:pt-30 relative">
          <div className="flex flex-col gap-16 md:gap-40">
            <TranslatedLayout
              imageUrl="/img/features/sustainability/vrc.webp"
              reverse={true}
            >
              <h3 className="tw-heading-4 md:tw-heading-3 mb-6">
                Revolutionizing Recycling: Blockchain-powered VRC Initiative
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-10">
                Roland Berger has formed a strategic partnership with The
                DFINITY Foundation, a Swiss non-profit renowned for its
                contributions to the Internet Computer Blockchain and extensive
                blockchain research and development, yielding over 250 patents.
                This collaboration aims to create the first global recycling
                incentive standard powered by blockchain, offering a secure and
                transparent system for tracking recycling credits.
              </p>
              <Link
                className="link-primary link-with-icon"
                href="https://gulfbusiness.com/cop28-voluntary-recycling-credits-initiative/"
              >
                Read the full article
                <LinkArrowUpRight />
              </Link>
            </TranslatedLayout>
            <TranslatedLayout imageUrl="/img/features/sustainability/cop28.webp">
              <h3 className="tw-heading-4 md:tw-heading-3 mb-6">ICP @ COP28</h3>
              <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-10">
                An international consortium in collaboration with DFINITY
                Foundation and our partners Roland Berger, BEEAH Group and
                International Solid Waste Association (ISWA) was at COP28.
              </p>

              <p className="mb-0">
                <Link
                  className="link-primary link-with-icon"
                  href="https://cryptoslate.com/dfinity-foundation-says-icp-consumes-less-energy-than-cardano-launches-proof-of-green-initiative/"
                >
                  Read the full article
                  <LinkArrowUpRight />
                </Link>
              </p>
            </TranslatedLayout>
          </div>
        </section>
        <section>
          <AnimateSpawn
            className="container-10 pt-20 md:pt-30"
            variants={transitions.container}
          >
            <div className="flex flex-col gap-6 md:gap-5 mb-8 md:mb-10 md:flex-row md:w-9/10">
              <motion.h2
                className="tw-heading-4 mb-0 md:tw-heading-60 md:flex-1"
                variants={transitions.item}
              >
                News & videos
              </motion.h2>
              <div className="md:flex-1 md:pt-3">
                <motion.p
                  className="mb-4 tw-paragraph md:tw-lead-sm"
                  variants={transitions.item}
                >
                  From industry news to videos about sustainable topics. Read
                  the latest about blockchain technology.
                </motion.p>
                <MotionLink
                  variants={transitions.item}
                  href="/news"
                  className="link-primary link-with-icon"
                >
                  <LinkArrowRight />
                  Explore more news
                </MotionLink>
              </div>
            </div>
          </AnimateSpawn>
          <AnimateSpawn
            className="container-12 mb-20 md:mb-30"
            variants={transitions.container}
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              <AnimatedNewsCard
                news={{
                  title:
                    "DFINITY founder says blockchain can bolster efforts to fight climate change",
                  dateHuman: "December 13, 2023",
                  press: "cointelegraph.com",
                  imageUrl:
                    "/img/features/sustainability/thumb-cointelegraph.webp",
                  url: "https://gulfbusiness.com/cop28-voluntary-recycling-credits-initiative/",
                }}
              />
              <AnimatedNewsCard
                news={{
                  title: "COP28 unveils voluntary recycling credits initiative",
                  dateHuman: "July 12, 2023",
                  press: "fastcompanyme.com",
                  imageUrl:
                    "/img/features/sustainability/thumb-fastcompany.webp",
                  url: "https://fastcompanyme.com/news/cop28-unveils-voluntary-recycling-credits-initiative/",
                }}
              />
              <AnimatedNewsCard
                news={{
                  title:
                    "Launch Of Voluntary Recycling Credits: Setting an Incentive Mechanism for the Waste",
                  dateHuman: "",
                  press: "",
                  imageUrl: "/img/features/sustainability/thumb-video-vrc.webp",
                  url: "https://www.youtube.com/watch?v=YdY8UQ7nrs8&ab_channel=UAEPavilionatCOP28",
                }}
                linkLabel="Watch the video"
              />
            </div>
          </AnimateSpawn>
        </section>
      </main>
    </Layout>
  );
}

export default SustainabilityPage;
