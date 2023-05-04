import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import BlobBlue from "@site/static/img/purpleBlurredCircle.webp";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import AnimateSpawn from "../components/Common/AnimateSpawn";
import { trackEvent } from "../utils/matomo";

function ConfirmYourEmailPage(): JSX.Element {
  useEffect(() => {
    trackEvent("Email capture", "Confirm your email");
  }, []);

  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="Confirm your email"
      description={siteConfig.tagline}
      wrapperClassName="overflow-hidden"
    >
      <main className="text-black relative">
        <AnimateSpawn variants={transitions.container}>
          <motion.img
            src={BlobBlue}
            alt=""
            className="absolute pointer-events-none max-w-none w-[800px] -right-[370px] top-[-100px] md:w-[1500px]  md:right-[-700px] 2xl:left-1/2 translate-x-[200px] md:top-[-200px] z-[1000]"
            variants={transitions.item}
          />
          <section className="max-w-page relative px-6 pt-20 mb-20 md:mb-40 md:px-12.5 md:mx-auto  md:pt-40 ">
            <div className="md:w-7/10 lg:w-6/10 md:ml-1/12 relative z-[1001] pb-20 md:pb-30">
              <motion.h1
                className="tw-heading-3 md:tw-heading-2 mb-10"
                variants={transitions.item}
              >
                Almost there...
              </motion.h1>
              <motion.p
                className="tw-lead-sm md:tw-lead mb-10"
                variants={transitions.item}
              >
                Check your inbox and click the link to verify your email
                address.
              </motion.p>
            </div>
          </section>
        </AnimateSpawn>
      </main>
    </Layout>
  );
}

export default ConfirmYourEmailPage;
