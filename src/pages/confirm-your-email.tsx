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
                You're Almost In!
              </motion.h1>
              <motion.p
                className="tw-lead-sm md:tw-lead mb-10"
                variants={transitions.item}
              >
                We've sent a confirmation email to your inbox. To complete your subscription and start receiving updates, please click the link inside to confirm your email address.
              </motion.p>
              <motion.p
                className="tw-lead-xs mb-10"
                variants={transitions.item}
              >
                Note: If you don’t see the email in your inbox, please check your spam or promotions folder and mark it as “Not Spam” to make sure you don’t miss future updates.

              </motion.p>
            </div>
          </section>
        </AnimateSpawn>
      </main>
    </Layout>
  );
}

export default ConfirmYourEmailPage;
