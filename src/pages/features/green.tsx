import Link from "@docusaurus/Link";
import { CardWithDescription } from "@site/src/components/Common/Card";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import { resetNavBarStyle } from "@site/src/utils/reset-navbar-style";
import RightPointer from "@site/static/img/svgIcons/rightPointer.svg";
import Layout from "@theme/Layout";
import React from "react";

function FeaturePage() {
  resetNavBarStyle();
  return (
    <Layout
      title="Green"
      // fill in meta description
      description=""
    >
      <main className="text-black relative">
        <section className="overflow-hidden bg-infinite text-white">
          <DarkHeroStyles></DarkHeroStyles>
          <div className="container-10 pt-12 mb-30 md:mb-52 md:pt-36 relative">
            <div className="md:w-7/10">
              <h1 className="tw-heading-3 md:tw-heading-2 mb-6">Green</h1>
              <p className="tw-lead-sm md:tw-lead mb-0">
              While having the security of Web3 blockchains, the performance and power consumption 
              of the Internet Computer (IC) is comparable to Web2 and cloud technology stacks. 
              The IC far outperforms traditional blockchain protocols in efficiency. 
              <br />
              <br />
                * A single Google search is <i>four times more energy intensive</i> than a transaction on the IC.
              <br />
              <br />
                * A single Ethereum transaction is <i>2 million of times more energy intensive</i> than an IC transaction.
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
        <section className="container-10 relative  mt-20 lg:mt-40 mb-20 md:mb-60 flex flex-col sm:flex-row sm:gap-10 md:gap-48">
          {/* 
            delete this div if image is not needed 
          */}
          {/* <div className="sm:order-2 sm:shrink-0 sm:flex-1 mb-10">
            <img
              src="/img/features/ic-generic.png"
              alt=""
              className="w-full block"
            />
          </div> */}

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
            <h2>Energy consumption comparison</h2>
            <p>

          To better understand the impact of the efficiency of the IC, it helps to see the comparison of energy costs.
          Even with conservative estimations, the energy consumption of the Internet Computer is substantially lower than 
          competing blockchain projects, but also existing (highly optimized) web2 tech. See the table below to put IC performance in perspective.

            <ul>
              <li><strong>One Internet Computer transaction: 261 J</strong></li>
              <li>One Google search: 1'080 J</li>
              <li>One Solana transaction: 1'837 J[</li>
              <li>One Ethereum 2 transaction: 126'000 J</li>
              <li>One Cardano transaction: 1'972'440 J[</li>
              <li>One Ethereum transaction: 692'820'000 J</li> 
              <li>One Bitcoin transaction: 6'995'592'000 J</li>
            </ul>

            </p>

            <p className="mb-3 mt-6">
              <Link
                href="/docs/current/developer-docs/quickstart/hello10mins"
                className="tw-heading-6 flex gap-2 items-center"
              >
                <RightPointer className="w-6 h-6"></RightPointer>
                Start building
              </Link>
            </p>
          </div>
        </section>

        <section className="max-w-page relative mx-auto mb-20 px-6 md:mb-40 md:px-15">
          <p className="tw-heading-4 text-center mb-2 w-full mx-auto md:tw-heading-2 md:mb-6 lg:w-8/12">
            Build fast dapps. Quickly.
          </p>
          <p className="tw-lead-sm mb-2 text-center mx-auto md:mb-6 md:w-6/12">
            Get started today.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-8 md:mt-20">
            {/* add or remove CardWithDescription components on demand */}

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
              description="Learn about IC capabilities from community samples."
              href="/samples"
            />
            <CardWithDescription
              title="Performance and Energy analysis on the IC Wiki"
              description="Take a deep dive into the Internet Computer."
              href="https://wiki.internetcomputer.org/wiki/Internet_Computer_performance_%26_power_consumption"
            />
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default FeaturePage;
