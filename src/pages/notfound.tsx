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

const MotionLink = motion(Link);

function CustomNotFoundPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgDark = useDarkHeaderInHero(heroRef);

  return (
    <Layout
      title="Page Not Found"
      description="We couldn't find what you were looking for."
    >
      <main className="text-black relative overflow-hidden mt-navbar-negative bg-gradient-to-r from-[#3B00B9] to-[#D38ED7]">
        <section
          className="text-white pt-24 md:pt-60 pb-24 md:pb-60 mb-[10vw] lg:mb-3"
          ref={heroRef}
        >
          {bgDark && <DarkHeroStyles bgColor="transparent"></DarkHeroStyles>}

          <div className="container-10 mb-40 pt-20 pb-12 sm:pb-40 md:pb-40 md:pt-36 relative z-10">
            <div className="relative">
              <motion.h1 className="tw-heading-3 md:tw-heading-60 mb-2 md:mb-6">
                Page Not Found
              </motion.h1>
              <div className="relative  md:w-5/10">
                <motion.p
                  className="tw-lead-sm md:tw-lead mb-8"
                  variants={transitions.item}
                >
                  We couldn't find what you were looking for.
                </motion.p>
              </div>
              <MotionLink
                href="/"
                className="button-white"
                variants={transitions.item}
              >
                Go back to homepage
              </MotionLink>
            </div>

            <AnimateSpawn
              variants={null}
              el={motion.section}
              className="pointer-events-none relative md:absolute -z-1 right-0 bottom-0 -mt-60 md:mt-0 md:w-2/10"
            >
              <div className=" md:absolute md:w-[250%] md:bottom-0 md:-right-12  translate-y-1/3 ">
                <motion.img
                  src="/img/notfound/notfoundhero.svg"
                  alt=""
                  className="w-full h-full object-cover max-w-sm md:max-w-none"
                />
              </div>
            </AnimateSpawn>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default CustomNotFoundPage;
