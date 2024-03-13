import Link from "@docusaurus/Link";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import {
  TranslatedCard,
  TranslatedCardList,
} from "@site/src/components/Common/TranslatedCards/TranslatedCards";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";
import React, { useRef } from "react";
import AnimateSpawn from "../../components/Common/AnimateSpawn";
import ShareMeta from "../../components/Common/ShareMeta";
import { useDarkHeaderInHero } from "../../utils/use-dark-header-in-hero";

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
                  Blockchain for Sustainable Business
                </motion.h1>
                <motion.p
                  className="tw-lead-sm sm:tw-lead"
                  variants={transitions.item}
                >
                  Blockchain technology catalyzes sustainability efforts by
                  enhancing transparency, traceability, and accountability in
                  business operations.
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
              iconUrl="/img/features/sustainability/icon-1.png"
              title="Transparency"
            ></FeatureCard>
            <FeatureCard
              iconUrl="/img/features/sustainability/icon-2.png"
              title="Accountability"
            ></FeatureCard>
            <FeatureCard
              iconUrl="/img/features/sustainability/icon-3.png"
              title="Verifiability"
            ></FeatureCard>
            <FeatureCard
              iconUrl="/img/features/sustainability/icon-4.png"
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
            src="/img/features/blob-bg-hero.png"
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
              className="absolute w-30 md:w-40 top-[-150px] right-[130px] md:top-[-160px] md:right-[20px]"
            />
            <motion.img
              variants={transitions.fadeIn}
              src="/img/basics/icon-iot.svg"
              aria-hidden
              className="absolute w-30 md:w-40 top-[-220px] right-0 md:top-[-240px] md:right-[-240px]"
            />
            <motion.img
              variants={transitions.fadeIn}
              src="/img/basics/icon-plant.svg"
              aria-hidden
              className="absolute w-30 md:w-40 -top-30 right-[-30px] md:top-[70px] md:right-[-180px]"
            />
          </motion.div>
        </AnimateSpawn>

        <section className="bg-page py-20 md:py-30">
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
                    src="/img/features/sustainability/icon-5.png"
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
                    src="/img/features/sustainability/icon-6.png"
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
                    src="/img/features/sustainability/icon-7.png"
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
      </main>
    </Layout>
  );
}

export default SustainabilityPage;
