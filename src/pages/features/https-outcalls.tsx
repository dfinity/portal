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
      title="Multi-chain transactions"
      // fill in meta description
      description=""
    >
      <main className="text-black relative">
        <section className="overflow-hidden bg-infinite text-white">
          <DarkHeroStyles></DarkHeroStyles>
          <div className="container-10 pt-12 mb-30 md:mb-52 md:pt-36 relative">
            <div className="md:w-7/10">
              <h1 className="tw-heading-3 md:tw-heading-2 mb-6">
                HTTPS Outcalls
              </h1>
              <p className="tw-lead-sm md:tw-lead mb-0">
              On the Internet Computer blockchain, canister smart contracts can make HTTP outcalls to specified URLs, 
              either to directly obtain off-chain data, or to interact with off-chain systems, such as Web 2.0 services or 
              enterprise IT infrastructure. The results of these calls are processed and agreed by consensus, preventing nondeterminism. 
              This avoids the need for trusted oracles and bridges.
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
          <div className="sm:order-2 sm:shrink-0 sm:flex-1 mb-10">
            <img
              src="/img/features/ic-generic.png"
              alt=""
              className="w-full block"
            />
          </div>

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
            <h2>How It Works</h2>
            <p>
            Often, smart contract software needs to obtain real-world data, which originates from outside the secure and unstoppable on-chain universe that the blockchain that hosts them provides. 
            Smart contracts may also need to interact with off-chain systems that are outside this universe. 
            Because of the way blockchains work, historically this has presented major hurdles to blockchain developers.
            </p>
            <h3>A blockchain that has obtains real-world data without oracles</h3>
            <p>
            Often, smart contract software needs to obtain real-world data, which originates from outside the secure and 
            unstoppable on-chain universe that the blockchain that hosts them provides. Smart contracts may also need to 
            interact with off-chain systems that are outside this universe. Because of the way blockchains work, 
            historically this has presented major hurdles to blockchain developers.
            </p>

            <p>
            For example, to obtain off-chain data, smart contracts have traditionally interacted with centrally-operated oracle 
            services, such as Chainlink. These services are provided by trusted intermediaries, such as corporations, which perform 
            the role of copying off-chain data onto the blockchain where it can be accessed by smart contracts. The problem is 
            that these services must a) be trusted to be honest, and not get hacked, or otherwise become faulty, and b) be paid. 
            Moreover, they cannot help when smart contracts need to interact with off-chain services, for example by calling into 
            web-based APIs. To solve for these needs, the Internet Computer provides an "HTTPS outcall" feature.
            </p>

            <h3>HTTPS Outcalls</h3>
            <p>
            HTTPS outcalls allow canister smart contracts hosted on the Internet Computer to request a URL, for example to download a time series 
            recording the recent prices of an asset published by a centralized crypto exchange such as Coinbase Pro. 
            When this occurs, every node in the subnet blockchain hosting the smart contract requests the URL separately. 
            Each node then locally passes the result they obtained to a special function implemented by the requesting 
            canister smart contract using a query call, which pre-processes the result with the aim of making it consistent
            with the results the other nodes have obtained and pre-processed (in our Coinbase example, since each node would 
            request the time series at a slightly different moment, the results could be different).            
            </p>

            <p>
            If the pre-processed results obtained by query calls to the canister smart contract are sufficiently consistent across 
            all the nodes, the result is agreed by consensus, and provided back to the smart contract that requested the URL so 
            that it can continue trustlessly processing the original smart contract call (TX).         
            </p>


            <p className="mb-3 mt-6">
            <Link
                href="https://internetcomputer.org/showcase/"
                className="tw-heading-6 flex gap-2 items-center"
              >
                <RightPointer className="w-6 h-6"></RightPointer>
                See examples of dapps 100% on-chain
              </Link>
            </p>
          </div>
        </section>

        <section className="max-w-page relative mx-auto mb-20 px-6 md:mb-40 md:px-15">
          <p className="tw-heading-4 text-center mb-2 w-full mx-auto md:tw-heading-2 md:mb-6 lg:w-8/12">
            Build on the IC
          </p>
          <p className="tw-lead-sm mb-2 text-center mx-auto md:mb-6 md:w-6/12">
          Using the power of chain key cryptography, and HTTPS Outcalls, smart contracts on the IC can interact with Web2 services and Web3 blockchains.

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
              title="'HTTPS outcalls' article on the IC Wiki"
              description="Learn about how IC's smart contracts can interact with Web2 APIs and Web3 blockchains."
              href="https://wiki.internetcomputer.org/wiki/HTTPS_outcalls"
            />
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default FeaturePage;
