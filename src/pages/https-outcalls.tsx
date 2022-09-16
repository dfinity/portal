import React from "react";
import Layout from "@theme/Layout";
import { resetNavBarStyle } from "@site/src/utils/reset-navbar-style";
import Head from "@docusaurus/Head";
import shareImage from "@site/static/img/shareImages/share-https-outcalls.jpeg";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import Link from "@docusaurus/Link";
import RightPointer from "@site/static/img/svgIcons/rightPointer.svg";
import { CardWithDescription } from "@site/src/components/Common/Card";

function HTTPSOutcalls() {
  resetNavBarStyle();
  return (
    <Layout title="HTTPS Outcalls" description="">
      <Head>
        <meta property="og:image" content={shareImage} />
        <meta name="twitter:image" content={shareImage} />
      </Head>
      <main className="text-black relative">
        <section className="overflow-hidden bg-infinite text-white">
          <DarkHeroStyles></DarkHeroStyles>
          <div className="container-10 pt-12 mb-30 md:mb-52 md:pt-36 relative">
            <div className="md:w-7/10">
              <h1 className="tw-heading-3 md:tw-heading-2 mb-6">
                HTTPS Outcalls
              </h1>
              <p className="tw-lead-sm md:tw-lead mb-0">
                HTTPS outcalls is a novel feature of the Internet Computer
                blockchain that enables direct interaction with Web 2.0 and
                other blockchains without oracles. Canister smart contracts can
                make HTTPS outcalls to specified URLs to directly obtain
                off-chain data, or to interact with off-chain systems, such as
                Web 2.0 services or enterprise IT infrastructure.
              </p>
            </div>
          </div>
          <div className="container-10 relative">
            <img
              src="/img/whiteBlurredCircle.png"
              alt=""
              className="absolute pointer-events-none max-w-none w-[800px] aspect-square -right-[200px] bottom-[-400px] md:w-[1500px] md:bottom-[-680px] md:right-[-550px] object-contain object-center"
            />
          </div>
        </section>
        <section className="container-10 relative mb-20 flex flex-col sm:flex-row sm:gap-10 lg:gap-32">
          <div className="sm:order-2 sm:shrink-0 sm:flex-1 relative -top-10 md:-top-20 md:mb-10">
            <img
              src="/img/https-outcalls/ic-http-graphic.png"
              alt=""
              className="w-full block"
            />
          </div>

          <div
            className=" mt-10 lg:mt-40 sm:w-6/12 md:w-4/12
            prose
            prose-h2:tw-heading-5 prose-h2:md:tw-heading-3 prose-h2:mb-2 prose-h2:md:mb-6
            prose-p:tw-paragraph prose-p:mb-4
            prose-a:underline prose-a:text-infinite hover:prose-a:text-black hover:prose-a:no-underline
            "
          >
            <h2>How It Works</h2>
            <p>
              Today, the majority of the world's API-accessible data, such as
              stock prices, football scores, IoT-related data, or crypto
              exchange prices, is hosted on Web 2.0 services, which is outside
              the secure on-chain walls of a blockchain. As smart contract
              software often relies on external web 2-hosted data to implement
              useful functionality, it is crucial that this data be accessible,
              first to unfold the full potential of smart contracts, and second,
              to pave the way for blockchain singularity, whereby the majority
              of computations run on the blockchain. Due to the way blockchains
              work, the interaction between smart contracts and off-chain
              systems has historically been challenging for blockchain
              developers. Obtaining off-chain data requires that a smart
              contract interact with centralized oracle services such as
              Chainlink, which are in the hands of intermediaries, vulnerable to
              hacking, and subject to service fees.
            </p>
            <p className="mb-3 mt-6">
              <Link
                href="https://wiki.internetcomputer.org/wiki/HTTPS_outcalls"
                className="tw-heading-6 flex gap-2 items-center"
              >
                <RightPointer className="w-6 h-6"></RightPointer>
                Learn more to build
              </Link>
            </p>
          </div>
        </section>

        <section className="max-w-page relative mx-auto mb-20 px-6 md:mb-40 md:px-15">
          <p className="tw-heading-4 text-center mb-2 w-full mx-auto md:tw-heading-2 md:mb-6 lg:w-8/12">
            Build with HTTPS Outcalls
          </p>
          <p className="tw-lead-sm mb-2 text-center mx-auto md:mb-6 md:w-6/12">
            The power of canister HTTPS outcalls on the Internet Computer allows
            smart contracts to directly connect to the Web 2.0 world, opening up
            a plethora of use cases: Retrieve market data from crypto exchanges,
            integrate with other blockchains, and more.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-8 md:mt-20">
            {/* <CardWithDescription
              title="Feature Documentation"
              description="Start integrating the HTTPS outcalls feature in your dapps and services to connect to off-chain data."
              href="/"
            />
            <CardWithDescription
              title="Blog"
              description="Read all about HTTPS outcalls and why they are  important for blockchains."
              href="/"
            /> */}
             <CardWithDescription
              title="Deploy a 'Hello World' Dapp in 10 Minutes"
              description="Get started with your first IC dapp"
              href="/docs/current/developer-docs/quickstart/hello10mins"
            />
            <CardWithDescription
              title="Build dapps with the language of your choice"
              description="Install SDKs to build dapps."
              href="/docs/current/developer-docs/build/cdks/"
            />
            <CardWithDescription
              title="Sample Code"
              description="Build a dapp with canister outgoing HTTPS outcalls."
              href="/docs/current/samples/http-requests-exchange-rates"
            />
            <CardWithDescription
              title="IC Wiki"
              description="Get a high-level overview of how HTTPS oucalls work on the Internet Computer."
              href="https://wiki.internetcomputer.org/wiki/HTTPS_outcalls"
            />
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default HTTPSOutcalls;
