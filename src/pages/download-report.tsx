import Link from "@docusaurus/Link";
import AnimateSpawn from "@site/src/components/Common/AnimateSpawn";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import ShareMeta from "@site/src/components/Common/ShareMeta";
import { useDarkHeaderInHero } from "@site/src/utils/use-dark-header-in-hero";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import Download from "../components/Common/Icons/Download";

function SustainabilityPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const isDark = useDarkHeaderInHero(heroRef);

  const downloadRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (downloadRef.current) {
      downloadRef.current.click();
    }
  });

  return (
    <Layout
      title="Download report"
      description="Download now: Full report of all 10 sustainable business use cases in detail"
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <ShareMeta image="/img/shareImages/share-sustainability.jpg"></ShareMeta>

      <main className="text-black relative overflow-hidden mt-[-72px] md:mt-[-106px]">
        {isDark && <DarkHeroStyles bgColor="transparent"></DarkHeroStyles>}

        <AnimateSpawn variants={transitions.container} el={motion.section}>
          <div
            className="
              overflow-hidden text-white pt-20
              bg-[url(/img/features/sustainability/download-report-bg-mobile.webp)]
              md:bg-[url(/img/features/sustainability/download-report-bg.webp)]
              bg-[length:100%_100%]
              md:h-screen md:max-h-[760px]
            "
            ref={heroRef}
          >
            <div className="container-10 pt-12 pb-32 md:pb-30 md:pt-36 relative">
              <motion.div
                className="text-right sm:text-left"
                variants={transitions.fadeIn}
              >
                <img
                  src="/img/features/sustainability/img-sustainability-report.webp"
                  alt="Download the sustainability report"
                  loading="lazy"
                  className="w-[100%] min-w-[130%] max-w-[500px] md:max-w-none relative -left-[3%] sm:min-w-[600px] md:min-w-0 md:order-2 md:absolute md:w-[700px] md:-right-32 md:-bottom-40 md:left-auto"
                />
              </motion.div>
              <motion.h1
                className="tw-heading-5 md:tw-heading-3 mb-8 md:mb-16 md:w-5/10 mt-6"
                variants={transitions.fadeIn}
              >
                Thank you for signing up to the newsletter!
              </motion.h1>
              <motion.div variants={transitions.fadeIn}>
                <p className="tw-paragraph-sm md:tw-paragraph mb-3">
                  The report will be downloaded automatically...
                </p>
                <p className="tw-paragraph-sm md:tw-paragraph mb-0">
                  In case it doesn’t start please click the download link below.
                </p>
                <div className="mt-8">
                  <Link
                    href="https://internetcomputer.org/blockchain_for_sustainable_business_use_cases.pdf"
                    target="_blank"
                    className="link-white link-with-icon"
                    download
                    ref={downloadRef}
                  >
                    <Download />
                    Download report now
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </AnimateSpawn>
      </main>
    </Layout>
  );
}

export default SustainabilityPage;
