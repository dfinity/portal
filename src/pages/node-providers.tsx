import Link from "@docusaurus/Link";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import AnimateSpawn from "../components/Common/AnimateSpawn";
import LinkArrowRight from "../components/Common/Icons/LinkArrowRight";
import LinkArrowUpRight from "../components/Common/Icons/LinkArrowUpRight";
import ShareMeta from "../components/Common/ShareMeta";
import TranslatedLayout from "../components/Common/TranslatedLayout/TranslatedLayout";
import Stats from "../components/Common/Stats";
import { useDarkHeaderInHero } from "../utils/use-dark-header-in-hero";

const queryClient = new QueryClient();

const LazyMap = React.lazy(() => import("../components/NodeProvidersPage/Map"));

function NodeProvidersPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const isDark = useDarkHeaderInHero(heroRef);

  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    setShowMap(true);
  }, []);

  return (
    <Layout
      title="Node providers"
      description="The Internet Computer is hosted by a decentralized collection of node machines — physical hardware devices run by independent node providers distributed across data centers globally"
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <ShareMeta image="/img/shareImages/share-node-providers.jpg"></ShareMeta>

      <main
        className="text-black relative overflow-hidden"
        style={{
          marginTop: `calc(var(--ifm-navbar-height) * -1)`,
        }}
      >
        {isDark && <DarkHeroStyles bgColor="transparent"></DarkHeroStyles>}

        <section
          className="overflow-hidden bg-infinite text-white pt-20"
          ref={heroRef}
        >
          <AnimateSpawn
            className="container-10 pt-20 pb-40 md:pb-52 md:pt-36 relative"
            variants={transitions.container}
          >
            <div className="blob blob-white blob-xl md:blob-xl md:blob-x-8 md:blob-y-10 opacity-100"></div>
            <div className="md:w-7/10 relative">
              <motion.h1
                className="tw-heading-3 md:tw-heading-2 mb-2 md:mb-6"
                variants={transitions.item}
              >
                Sovereign network
              </motion.h1>
              <motion.p
                className="tw-lead-sm md:tw-lead mb-8"
                variants={transitions.item}
              >
                The Internet Computer is hosted by a decentralized collection of
                node machines — physical hardware devices run by independent
                node providers distributed across data centers globally.
              </motion.p>
            </div>
          </AnimateSpawn>
        </section>
        <AnimateSpawn
          className="container-12 relative"
          el={motion.section}
          variants={transitions.fadeIn}
        >
          <div className="text-center md:w-5/10 relative md:absolute top-30 sm:top-40 md:top-0 -translate-y-1/2 right-0 -mt-30 md:-mt-24">
            <img
              src="/img/node-providers/hero.webp"
              alt=""
              className="w-full max-w-sm sm:max-w-lg md:max-w-none"
            />
          </div>
        </AnimateSpawn>
        <AnimateSpawn
          className="container-10 md:mt-30 relative"
          el={motion.section}
          variants={transitions.container}
        >
          <div className="md:w-5/10">
            <motion.h2
              className="tw-heading-5 sm:tw-heading-4 md:tw-heading-3 mb-3 md:mb-6 text-gradient"
              variants={transitions.item}
            >
              Traditional cloud relies on a single private entity. The Internet
              Computer relies on public utility and autonomous governance.
            </motion.h2>
          </div>
        </AnimateSpawn>
        <section className=" container-12 mt-20 md:mt-40">
          <div className="text-center md:w-8/12 md:mx-auto mb-12">
            <h2 className="tw-heading-3 md:tw-heading-60 mb-4 md:mb-6">
              Decentralized computing{" "}
            </h2>
            <p className="tw-paragraph md:tw-lead-sm mb-4 md:mb-6">
              The Internet Computer blockchain operates on a network of nodes
              owned and managed by a growing community of independent, vetted
              node providers distributed across the globe.{" "}
            </p>
            <p className="mb-0">
              <Link
                className="link-primary link-with-icon"
                href="https://dashboard.internetcomputer.org"
              >
                Get more data on the dashboard
                <LinkArrowUpRight />
              </Link>
            </p>
          </div>
          <QueryClientProvider client={queryClient}>
            <div className="rounded-3xl overflow-hidden relative">
              {showMap ? (
                <Suspense
                  fallback={
                    <div className="h-80 md:h-[480px] animate-pulse bg-black/10"></div>
                  }
                >
                  <LazyMap />
                </Suspense>
              ) : (
                <div className="h-80 md:h-[480px] animate-pulse bg-black/10"></div>
              )}
            </div>
            <Stats />
          </QueryClientProvider>
        </section>
        <section className="mb-20 md:mb-40 container-12 flex flex-col gap-16 md:gap-40 mt-20 md:mt-40">
          <TranslatedLayout
            reverse={true}
            imageUrl="/img/node-providers/sovereign-nodes.webp"
          >
            <h2 className="tw-heading-3 md:tw-heading-60 md:mb-6">
              Independent machines
            </h2>
            <p className="tw-lead-sm mb-6 md:mb-10">
              Every node on the Internet Computer is a dedicated physical server
              called a node machine. To provide true decentralization, each node
              machine is run by an independent node provider, typically in a
              data center. This network of nodes is sovereign, as there is no
              reliance on corporate cloud service providers. So they cannot be
              switched off or tampered with.
            </p>
            <p className="tw-lead-sm mb-6 md:mb-10">
              This is different to other blockchains where network nodes are
              created using simple software that interacts with other nodes but
              are easy to spin up on centralized cloud. Node machines on the
              Internet Computer are also technically sovereign, built to
              standardized public hardware specifications that support the
              network when under load, and do not fall behind other nodes within
              the same subnet blockchain.
            </p>
            <p className="mb-0">
              <Link
                href="https://wiki.internetcomputer.org/wiki/Sovereign_Network"
                className="link-primary link-with-icon"
              >
                <LinkArrowRight />
                About creating a sovereign network
              </Link>
            </p>
          </TranslatedLayout>
          <TranslatedLayout imageUrl="/img/node-providers/node-providers-join.webp">
            <h2 className="md:tw-heading-60 md:mb-6">Node Providers</h2>
            <p className="tw-lead-sm mb-6 md:mb-10">
              To preserve the decentralization of the network, each node
              provider is voted in by token-holders via the NNS, the DAO that
              governs the Internet Computer. Becoming a node provider entails
              submitting a proposal along with a self-declaration document that
              state provision of node machines, intent and proof of identity.
              Based on this information, the community votes on the onboarding
              proposal.
            </p>
            <p className="tw-lead-sm mb-6 md:mb-10">
              If node providers are accepted into the community and their node
              machines are up and running, they receive rewards for their
              services. Rewards are set by the NNS DAO, which follows the 30-day
              average price of ICP, and are distributed on the 15th of every
              month. The NNS DAO issues rewards depending on three main factors:
              generation of hardware (Gen 1 or Gen2), geographic location, and
              total number of nodes operated.
            </p>
            <p className="mb-0">
              <Link
                href="https://wiki.internetcomputer.org/wiki/Node_Provider_Remuneration"
                className="link-primary link-with-icon"
              >
                <LinkArrowRight />
                More on renumeration models
              </Link>
            </p>
          </TranslatedLayout>
          <TranslatedLayout
            reverse={true}
            imageUrl="/img/node-providers/hardware.webp"
          >
            <h2 className="tw-heading-3 md:tw-heading-60 md:mb-6">
              The hardware
            </h2>
            <p className="tw-lead-sm mb-6 md:mb-10">
              The Internet Computer network consist of two generations of node
              machines — Gen 1 and Gen 2 — with standardized public hardware
              specifications. Gen 1 hardware is vendor specific and used by node
              providers who joined the community before 2022. New Gen 2 node
              machines are generic to support VM memory encryption and
              attestation, which will facilitate the future development of
              features on the Internet Computer. While Gen 2 machines follow
              generic specifications, a list of hardware configurations has been
              validated by the community.
            </p>
            <p className="mb-0">
              <Link
                href="https://wiki.internetcomputer.org/wiki/Node_Provider_Machine_Hardware_Guide"
                className="link-primary link-with-icon"
              >
                <LinkArrowRight />
                See hardware guide
              </Link>
            </p>
          </TranslatedLayout>

          <TranslatedLayout imageUrl="/img/node-providers/sustainable.webp">
            <h2 className="md:tw-heading-60 md:mb-6">
              Climate friendly compute
            </h2>
            <p className="tw-lead-sm mb-6 md:mb-10">
              A key goal of the Internet Computer is to provide an energy
              efficient compute platform at low carbon costs without
              compromising scalability and utility. Operating at 0.008 kW per
              transaction, it is one of the most sustainable blockchains out
              there, and has comparable energy consumption levels to traditional
              software running on big tech cloud services. Instantaneous power
              for each node is around 0.3 kW, which is roughly between 200 and
              300 kWh a month, per node.
            </p>
            <p className="tw-lead-sm mb-6 md:mb-10">
              The Internet Computer is also the first blockchain to join the
              Proof of Green (PoG) initiative, which aims to set blockchain
              industry standards by making ‘claims of green’ transparent,
              verifiable and accountable through metrics and real-time
              reporting. PoG is still in a pilot phase but a handful of nodes
              and their carbon emissions are already represented on a live
              dashboard. Further steps towards carbon footprint transparency are
              on the roadmap, including data sourcing, validation and incentive
              mechanisms.
            </p>
            <p className="mb-0">
              <Link
                href="https://dashboard.internetcomputer.org/node/45huy-6h3k3-m7uao-7w4bu-dtcgx-4yxpc-s36gr-pq7k5-xesnw-vnjut-oae"
                className="link-primary link-with-icon"
              >
                <LinkArrowRight />
                Visit the live dashboard
              </Link>
            </p>
          </TranslatedLayout>
        </section>

        <section className="container-10 mt-20 md:mt-40">
          <AnimateSpawn
            className="md:w-6/10 md:mx-auto text-center"
            variants={transitions.container}
          >
            <motion.h2
              className="tw-heading-3 md:tw-heading-60 mb-6"
              variants={transitions.item}
            >
              Node provider community{" "}
            </motion.h2>
            <motion.p
              className="tw-lead-sm mb-6 md:mb-10"
              variants={transitions.item}
            >
              The growing ICP community of node providers includes independent
              entities across the globe, including...
            </motion.p>
            <motion.p className="mb-0" variants={transitions.item}>
              <Link
                href="https://forum.dfinity.org/t/new-node-provider-proposals/16643"
                className="button-primary"
              >
                Join the NP community
              </Link>
            </motion.p>
          </AnimateSpawn>
          <AnimateSpawn
            className="flex flex-wrap gap-5 justify-center items-center mt-12"
            variants={transitions.container}
          >
            <motion.img
              variants={transitions.item}
              src="/img/node-providers/np-electric.webp"
              alt=""
              loading="lazy"
              className="h-20 md:h-30"
            />
            <motion.img
              variants={transitions.item}
              src="/img/node-providers/np-scalar.webp"
              alt=""
              loading="lazy"
              className="h-20 md:h-30"
            />
            <motion.img
              variants={transitions.item}
              src="/img/node-providers/np-eterna.webp"
              alt=""
              loading="lazy"
              className="h-20 md:h-30"
            />
            <motion.img
              variants={transitions.item}
              src="/img/node-providers/np-signum.webp"
              alt=""
              loading="lazy"
              className="h-20 md:h-30"
            />

            <motion.img
              variants={transitions.item}
              src="/img/node-providers/np-icp-global.webp"
              alt=""
              loading="lazy"
              className="h-20 md:h-30"
            />
            <motion.img
              variants={transitions.item}
              src="/img/node-providers/np-tomahawk.webp"
              alt=""
              loading="lazy"
              className="h-20 md:h-30"
            />
            <motion.img
              variants={transitions.item}
              src="/img/node-providers/np-warburg-serres.webp"
              alt=""
              loading="lazy"
              className="h-20 md:h-30"
            />
            <motion.img
              variants={transitions.item}
              src="/img/node-providers/np-9yards.webp"
              alt=""
              loading="lazy"
              className="h-20 md:h-30"
            />
            <motion.img
              variants={transitions.item}
              src="/img/node-providers/np-kr1.webp"
              alt=""
              loading="lazy"
              className="h-20 md:h-30"
            />
            <motion.img
              variants={transitions.item}
              src="/img/node-providers/np-zondax.webp"
              alt=""
              loading="lazy"
              className="h-20 md:h-30"
            />
            <motion.img
              variants={transitions.item}
              src="/img/node-providers/np-anonstake.webp"
              alt=""
              loading="lazy"
              className="h-20 md:h-30"
            />
            <motion.img
              variants={transitions.item}
              src="/img/node-providers/np-one-sixty-two.webp"
              alt=""
              loading="lazy"
              className="h-20 md:h-30"
            />
            <motion.img
              variants={transitions.item}
              src="/img/node-providers/np-archery.webp"
              alt=""
              loading="lazy"
              className="h-20 md:h-30"
            />
            <motion.img
              variants={transitions.item}
              src="/img/node-providers/np-polychain.webp"
              alt=""
              loading="lazy"
              className="h-20 md:h-30"
            />

            <motion.img
              variants={transitions.item}
              src="/img/node-providers/np-dfinity.webp"
              alt=""
              loading="lazy"
              className="h-20 md:h-30"
            />
            <motion.img
              variants={transitions.item}
              src="/img/node-providers/np-rivram.webp"
              alt=""
              loading="lazy"
              className="h-20 md:h-30"
            />
          </AnimateSpawn>
        </section>

        <section className=" mt-20 md:mt-40 mb-30 md:mb-60">
          <AnimateSpawn
            className="container-10"
            variants={transitions.container}
          >
            <motion.img
              variants={transitions.fadeIn}
              src="/img/node-providers/faq.webp"
              loading="lazy"
              alt=""
              className="md:hidden"
            />
            <motion.h2
              className="tw-heading-3 md:tw-heading-60 mb-10 mt-10 md:mt-0 md:mb-16"
              variants={transitions.item}
            >
              What you need to know about being a node provider
            </motion.h2>
          </AnimateSpawn>

          <div className="container-12 flex flex-col md:flex-row md:items-start">
            <div className="hidden md:block flex-[4] relative">
              <div className="blob blob-infinite blob-md blob-x-0 blob-y-6 opacity-80"></div>
              <img
                src="/img/node-providers/faq.webp"
                loading="lazy"
                alt=""
                className="relative -left-1/12"
              ></img>
            </div>

            <div className="space-y-20 flex-[6]">
              <AnimateSpawn className="space-y-6" variants={transitions.fadeIn}>
                <h3 className="tw-heading-4 md:tw-heading-3">Where to start</h3>
                <p className="tw-paragraph md:tw-lead-sm">
                  Before making the decision to become a node provider, it is
                  recommended to start by familiarizing yourself with the
                  following:
                </p>
                <ul className="checklist space-y-3 tw-paragraph md:tw-lead-sm">
                  <li className="checklist-item pl-8">
                    <Link
                      href="https://wiki.internetcomputer.org/wiki/Introduction_to_ICP"
                      target="_blank"
                    >
                      Brief intro to the Internet Computer
                    </Link>
                  </li>
                  <li className="checklist-item pl-8">
                    <Link
                      href="https://wiki.internetcomputer.org/wiki/Sovereign_Network"
                      target="_blank"
                    >
                      The Internet Computer architecture
                    </Link>
                  </li>
                  <li className="checklist-item pl-8">
                    <Link
                      href="https://wiki.internetcomputer.org/wiki/Governance_of_the_Internet_Computer"
                      target="_blank"
                    >
                      Governance of the Internet Computer
                    </Link>
                  </li>
                  <li className="checklist-item pl-8">
                    <Link
                      href="https://wiki.internetcomputer.org/wiki/Node_Provider_Documentation"
                      target="_blank"
                    >
                      Node provider overview documentation
                    </Link>
                  </li>
                </ul>
                <p className="tw-paragraph md:tw-lead-sm"></p>
              </AnimateSpawn>
              <AnimateSpawn className="space-y-6" variants={transitions.fadeIn}>
                <h3 className="tw-heading-4 md:tw-heading-3">
                  Onboarding checklist
                </h3>
                <p className="tw-paragraph md:tw-lead-sm">
                  Now that you have a basic understanding of how the Internet
                  Computer works, you can begin the onboarding process with the
                  help of the following resources:
                </p>
                <ul className="checklist space-y-3 tw-paragraph md:tw-lead-sm">
                  <li className="checklist-item pl-8">
                    <Link
                      href="https://wiki.internetcomputer.org/wiki/Node_Provider_Documentation"
                      target="_blank"
                    >
                      Fill out self-declaration form
                    </Link>
                  </li>
                  <li className="checklist-item pl-8">
                    <Link
                      href="https://wiki.internetcomputer.org/wiki/Node_Provider_Onboarding"
                      target="_blank"
                    >
                      Submit proposal and onboard your nodes to the Internet
                      Computer
                    </Link>
                  </li>
                  <li className="checklist-item pl-8">
                    <Link
                      href="https://wiki.internetcomputer.org/wiki/Node_Provider_Matrix_channel"
                      target="_blank"
                    >
                      Join the node provider matrix channel
                    </Link>
                  </li>
                  <li className="checklist-item pl-8">
                    <Link
                      href="https://wiki.internetcomputer.org/wiki/Node_Provider_Machine_Hardware_Guide"
                      target="_blank"
                    >
                      Choose and purchase hardware
                    </Link>
                  </li>
                  <li className="checklist-item pl-8">
                    <Link
                      href="https://wiki.internetcomputer.org/wiki/Node_Provider_Onboarding"
                      target="_blank"
                    >
                      Set up servers in a data center
                    </Link>
                  </li>
                </ul>
                <p className="">
                  <Link
                    href="https://wiki.internetcomputer.org/wiki/Node_Provider_Documentation"
                    className="button-primary"
                  >
                    Get started
                  </Link>
                </p>
              </AnimateSpawn>
            </div>
            <div className="flex-[1]"></div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default NodeProvidersPage;
