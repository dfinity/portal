import React from "react";
import Layout from "@theme/Layout";
import BlobPurple from "@site/static/img/nns/WedgeShape.png";
import { motion } from "framer-motion";
import transitions from "@site/static/transitions.json";
import AnimateSpawn from "@site/src/components/Common/AnimateSpawn";
import Head from "@docusaurus/Head";
import { resetNavBarStyle } from "@site/src/utils/reset-navbar-style";
import Link from "@docusaurus/Link";
import VotingSVG from "@site/static/img/nns/voting.svg";
import SecureSVG from "@site/static/img/nns/secure.svg";
import StakeSVG from "@site/static/img/nns/stake.svg";

function NNS() {
  resetNavBarStyle();
  return (
    <Layout
      title={"Network Nervous System"}
      description={
        "An open and permissionless autonomous governance system running fully on the Internet Computer. "
      }
    >
      <Head>
        <meta
          property="og:image"
          content={
            "https://internetcomputer.org/img/shareImages/share-videos.jpeg"
          }
        />
        <meta
          name="twitter:image"
          content={
            "https://internetcomputer.org/img/shareImages/share-videos.jpeg"
          }
        />
        <title>Network Nervous System</title>
      </Head>
      <main className="text-black relative overflow-hidden">
        <img
          src={BlobPurple}
          alt=""
          className="absolute pointer-events-none max-w-none w-[800px] -right-[100px] top-[-50px] md:w-[1500px]  md:right-[-400px] 2xl:left-1/2 translate-x-[200px] md:top-[-300px] z-[-1000]"
        />
        <AnimateSpawn variants={transitions.item}>
          <section className="max-w-page relative px-6 md:px-12.5 pt-10 md:mx-auto md:pt-6 overflow-hidden">
            <motion.p
              variants={transitions.item}
              className="tw-heading-3 md:tw-heading-2 mt-16 mb-6 md:ml-1/12 md:w-6/10"
            >
              Network Nervous System
            </motion.p>
            <motion.p
              variants={transitions.item}
              className="tw-lead-sm mb-0 md:tw-lead mb-12 md:ml-1/12 md:w-6/10"
            >
              An open and permissionless autonomous governance system running
              fully on the Internet Computer.
            </motion.p>
            <Link
              className="md:ml-1/12 inline-block rounded-xl text-white tw-heading-7 py-4 px-12 hover:no-underline hover:text-white transition-colors border-none"
              to={"https://nns.ic0.app/v2/"}
              style={{
                backgroundImage:
                  "linear-gradient(96.32deg, #3B00B9 0%, #29ABE2 169.96%)",
              }}
            >
              Check this out
            </Link>
          </section>
          <section className="max-w-page relative px-6 md:px-12.5 mt-20 md:mt-36 mb-8 md:mb-20 md:mx-auto overflow-hidden">
            <div className="bg-infinite rounded-xl text-white p-6 sm:p-12">
              <div className="flex flex-col md:flex-row pt-16 mb-20 md:mb-36 gap-12">
                <img
                  src={require("../../static/img/nns/votingReward.png").default}
                  className="md:w-1/2 object-contain"
                  alt=""
                />
                <div className="md:w-1/2">
                  <p className="tw-heading-5 md:tw-heading-3 md:w-5/6 mb-8">
                    The NNS front-end dapp lets you manage ICP tokens, stake
                    them in neurons to participate in governance and earn
                    rewards, and create cycles.
                  </p>
                  <Link
                    className="inline-block rounded-xl text-infinite tw-heading-7 py-3 px-8 hover:no-underline hover:text-black transition-colors border-none"
                    to={"https://nns.ic0.app/v2/"}
                    style={{
                      backgroundImage:
                        "linear-gradient(96.32deg, #FFFFFF 0%, rgba(255, 255, 255, 0.3) 169.96%)",
                    }}
                  >
                    Check this out
                  </Link>
                </div>
              </div>
              <div className="pb-10 md:pb-36 md:mx-1/12 flex flex-col md:flex-row gap-6 md:gap-12">
                <div className="flex flex-col items-start">
                  <VotingSVG className="h-30 w-30" />
                  <p className="tw-heading-4 mb-2">Voting Rewards</p>
                  <p className="tw-lead-sm mb-0">
                    Praesent commodo cursus magna, vel scelerisque nisl
                    consectetur et.
                  </p>
                </div>
                <div>
                  <SecureSVG className="h-30 w-30" />
                  <p className="tw-heading-4 mb-2">Secure your tokens</p>
                  <p className="tw-lead-sm mb-0">
                    Praesent commodo cursus magna, vel scelerisque nisl
                    consectetur et.
                  </p>
                </div>
                <div>
                  <StakeSVG className="h-30 w-30" />
                  <p className="tw-heading-4 mb-2">Stake ICP Tokens</p>
                  <p className="tw-lead-sm mb-0">
                    Praesent commodo cursus magna, vel scelerisque nisl
                    consectetur et.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </AnimateSpawn>
      </main>
    </Layout>
  );
}

export default NNS;
