import Link from "@docusaurus/Link";
import { CardWithDescription } from "@site/src/components/Common/Card";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import YoutubeVideoEmbed from "@site/src/components/Common/YoutubeVideoEmbed";
import Layout from "@theme/Layout";
import React from "react";

function FeaturePage() {
  return (
    <Layout
      title="Serve Web Content"
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
                Serve Web Content
              </h1>
              <p className="tw-lead-sm md:tw-lead mb-0">
                The Internet Computer (IC) is the only blockchain that can host
                a full dapp; frontend, backend, and data included. This is a
                distinguishing IC feature allowing dapps to run 100% on-chain
                while inheriting the security and decentralization of
                blockchain, but without sacrificing speed or affordability.
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
          {/* <div className="sm:order-2 sm:shrink-0 sm:flex-1 mb-10"> */}
          {/* <YoutubeVideoEmbed videoId="jYrXk_hM4cA"></YoutubeVideoEmbed> */}
          {/* </div> */}

          <div
            className="
            sm:flex-1
            prose
            prose-h2:tw-heading-5 prose-h2:md:tw-heading-3 prose-h2:mb-2 prose-h2:md:mb-6
            prose-h3:tw-heading-7 prose-h3:mb-2
            prose-p:tw-paragraph prose-p:mb-4
            prose-a:underline prose-a:text-infinite hover:prose-a:text-black hover:prose-a:no-underline
            "
          >
            <h2>Enabling true Web3</h2>
            <p>
              Today, most dapps built on other blockchains rely on centralized
              cloud providers (e.g. AWS, GCP) to host their frontend, amongst
              other parts, which introduces a single point of failure. An
              example pattern in the industry is to have a smart contract
              performing some computation, yet, the frontend is often served
              from a Node server. This not only includes security risks by
              possible tampering with the frontend, but dapps running on
              centralized servers can be taken down at any point, which negates
              the censorship resistant nature of blockchain. Web3 requires that
              all parts of a dapp are realized by smart contracts. Further, Web3
              functionality is only achievable by blockchain applications
              running fully decentralized, which includes smart contract logic,
              on-chain data storage and serving frontend to the user's browser.
              <br />
              <br />
              Hosting dapps 100% on-chain provides the additional benefit of
              letting DAOs launched on the IC to completely control these
              applications with on-chain governance. This lets users be fully in
              control of these dapps realizing complete decentralization and
              democratization of web applications.
            </p>

            <YoutubeVideoEmbed
              videoId="jYrXk_hM4cA"
              className="mt-10 md:mt-10"
              altText="Community Conversations | Overview of Building a Front End on the Internet Computer"
            ></YoutubeVideoEmbed>

            <h2>Cheap Storage</h2>
            <p>
              Unlike most blockchains, the efficiency and costs of the IC
              approaches the traditional IT stack so its is economically
              feasible to host dapps with lots of data and content (not just
              small smart contracts as in other blockchains).
              <br />
              For comparison:{" "}
              <i>
                it costs hundreds of millions of dollars to store a GB of data
                on Ethereum. It only costs a few dollars on the IC.
              </i>
            </p>
            <YoutubeVideoEmbed
              videoId="JAQ1dkFvfPI"
              className="mt-10 md:mt-10"
              altText="Community Conversations | How to Host a Website on the Internet Computer"
            ></YoutubeVideoEmbed>

            <h2>Smart contracts that can process HTTP requests</h2>
            <p>
              Blockchains differ in their processing of computation from regular
              web servers, which makes serving web a difficult task. To overcome
              this, the IC introduces something called boundary nodes. These
              nodes act as a layer that translates HTTP requests from users to
              messages that can be processed by smart contracts running on the
              IC. This allows users to update the state of the blockchain simply
              by interacting with a browser.
            </p>

            <h3>SEO</h3>
            <p>
              The dapps running on the Internet Computer seamlessly integrate
              into the Web 2.0 world as crawlers are able to access them
              directly on-chain. This allows dapps to be indexed by search
              engines and for their metadata to be read in order to generate
              previews and cards on social platforms.
            </p>

            <h3>Reverse gas model</h3>
            <p>
              In dapps built on Ethereum (as an example), users require a wallet
              or tokens to use it. This slows down adoption of dapps because
              using a dapp is not as simple as clicking on a website link; it
              requires users to buy tokens, install browser plugins, etc. IC
              dapps have he "Reverse Gas model" where users can interact with a
              dapp without having to pay in tokens since the canister can store
              a certain amount of cycles and pay for the user.
              <br />
              For example,{" "}
              <Link
                href="https://m7sm4-2iaaa-aaaab-qabra-cai.raw.ic0.app/"
                target="_blank"
              >
                the Motoko Playground dapp
              </Link>{" "}
              is hosted and executed entirely on-chain and it does not require
              visitors to pay for the computation.
            </p>
            <p className="mb-3 mt-6">
              <Link
                href="https://internetcomputer.org/showcase/"
                className="tw-heading-6 flex gap-2 items-center"
              >
                the Motoko Playground dapp
              </Link>{" "}
              is hosted and executed entirely on-chain and it does not require
              visitors to pay for the computation.
            </p>
          </div>
        </section>

        <section className="max-w-page relative mx-auto mb-20 px-6 md:mb-40 md:px-15">
          <p className="tw-heading-4 text-center mb-2 w-full mx-auto md:tw-heading-2 md:mb-6 lg:w-8/12">
            Build fully on-chain dapps
          </p>
          <p className="tw-lead-sm mb-2 text-center mx-auto md:mb-6 md:w-6/12">
            Get started today.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-8 md:mt-20">
            {/* add or remove CardWithDescription components on demand */}

            <CardWithDescription
              title="Deploy a 'Hello World' Dapp in 10 Minutes"
              description="Get started with your first IC dapp"
              href="/docs/current/tutorials/developer-journey/"
            />
            <CardWithDescription
              title="Build dapps with the language of your choice"
              description="Install SDKs to build dapps."
              href="/docs/current/developer-docs/backend/choosing-language"
            />
            <CardWithDescription
              title="Sample Code"
              description="Learn about IC capabilities from community samples."
              href="/samples"
            />
            <CardWithDescription
              title="'Web Serving' article on the 'IC Wiki'"
              description="Take a deep dive into the Internet Computer's abiliy to host full dapps 100% on-chain"
              href="https://wiki.internetcomputer.org/wiki/Web_Serving"
            />
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default FeaturePage;
