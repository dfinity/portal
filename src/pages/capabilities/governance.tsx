import Link from "@docusaurus/Link";
import { CardWithDescription } from "@site/src/components/Common/Card";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import YoutubeVideoEmbed from "@site/src/components/Common/YoutubeVideoEmbed";
import Layout from "@theme/Layout";
import React from "react";

function FeaturePage() {
  return (
    <Layout
      title="Governance"
      // fill in meta description
      description=""
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <main className="text-black relative">
        <section className="overflow-hidden bg-infinite text-white">
          <DarkHeroStyles></DarkHeroStyles>
          <div className="container-10 pt-12 mb-30 md:mb-52 md:pt-36 relative">
            <div className="md:w-7/10">
              <h1 className="tw-heading-3 md:tw-heading-2 mb-6">
                Governance & Rapid Evolution
              </h1>
              <p className="tw-lead-sm md:tw-lead mb-0">
                The Network Nervous System (NNS) is the decentralized autonomous
                organization (DAO) that governs the Internet Computer (IC). It
                is a fully on-chain, decentralized system and is, for instance,
                responsible for making protocol level upgrades to continuously
                improve the Internet Computer. ICP neuron holders vote on
                proposals that uprade the IC. Once such a proposal is accepted,
                it is autonomously executed across the blockchain (no human
                intervention).
                <br />
                <br />
                While other blockchains take weeks or months to upgrade
                (sometimes called hard fork) and typically require substantial
                manual work and coordination to do so, the IC upgrades itself on
                a weekly basis.
                <br />
                <br />
                The IC's ability to upgrade and iterate quickly is a comparative
                "superpower."
              </p>
            </div>
          </div>
          <div className="container-10 relative">
            <img
              src="/img/whiteBlurredCircle.webp"
              alt=""
              className="absolute pointer-events-none max-w-none w-[800px] aspect-square -right-[200px] bottom-[-400px] md:w-[1500px] md:bottom-[-680px] md:right-[-550px] object-contain object-center"
            />
          </div>
        </section>
        <section className="container-10 relative  mt-20 lg:mt-40 mb-20 md:mb-60 flex flex-col sm:flex-row sm:gap-10 md:gap-48">
          {/* 
            delete this div if image is not needed 
          */}

          <div
            className="
            prose 
            prose-h2:tw-heading-5 prose-h2:md:tw-heading-3 prose-h2:mb-2 prose-h2:md:mb-6
            prose-h3:tw-heading-7 prose-h3:mb-2
            prose-p:tw-paragraph prose-p:mb-4
            prose-a:underline prose-a:text-infinite hover:prose-a:text-black hover:prose-a:no-underline
            "
          >
            <h2>How It Works</h2>
            <p>
              The purpose of the NNS is to allow the IC network to be governed
              in an open, decentralized, and secure manner. It has complete
              control over all aspects of the network. For example, it can
              upgrade the protocol and software used by the node machines that
              host the network; it can create new subnet blockchains to increase
              network capacity; and many other things. The NNS works by
              accepting proposals, and deciding to adopt or reject them based on
              voting activity by “neurons” that network participants have
              created.
            </p>

            <YoutubeVideoEmbed
              videoId="mPjiO2bk2lI"
              className="mt-10 md:mt-10"
              altText="Inside the Internet Computer | Upgrades"
            ></YoutubeVideoEmbed>

            <h3>Proposals</h3>
            <p>
              Users submit NNS proposals to the NNS to update the code of the
              IC:{" "}
              <Link href="https://dashboard.internetcomputer.org/releases">
                IC Releases
              </Link>{" "}
              . Consequently, the IC can update itself many times faster than
              other blockchains.
            </p>
          </div>
        </section>

        <section className="max-w-page relative mx-auto mb-20 px-6 md:mb-40 md:px-15">
          <p className="tw-heading-4 text-center mb-2 w-full mx-auto md:tw-heading-2 md:mb-6 lg:w-8/12">
            Learn more
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-8 md:mt-20">
            {/* add or remove CardWithDescription components on demand */}

            <CardWithDescription
              title="Upgrading the Internet Computer Protocol"
              description="Medium blog post"
              href="https://medium.com/dfinity/upgrading-the-internet-computer-protocol-45bf6424b268"
            />
            <CardWithDescription
              title="Diver deeper into the NNS"
              description="Take a deep dive into the Internet Computer's NNS and upgrading."
              href="https://wiki.internetcomputer.org/wiki/NNS_Canisters"
            />
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default FeaturePage;
