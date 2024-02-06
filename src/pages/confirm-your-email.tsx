import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
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
          <section className="container-12 relative pt-20 mb-20 md:mb-40 md:pt-40 ">
            <motion.div
              variants={transitions.fadeIn}
              className="blob blob-infinite blob-md blob-x-7 blob-y-10 z-[-1]"
            ></motion.div>
            <div className="md:w-7/10 lg:w-6/10 md:ml-1/12 relative pb-20 md:pb-30">
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
