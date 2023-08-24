import Link from "@docusaurus/Link";
import { CardWithDescription } from "@site/src/components/Common/Card";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import RightPointer from "@site/static/img/svgIcons/rightPointer.svg";
import Layout from "@theme/Layout";
import React from "react";

function FeaturePage() {
  return (
    <Layout
      title="Multi-chain transactions"
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
                Multi-chain transactions
              </h1>
              <p className="tw-lead-sm md:tw-lead mb-0">
                On the Internet Computer, you can create smart contracts that
                directly interact with other blockchains, without trusted
                centralized bridges that can get hacked and do rug pulls. This
                has been made possible using Chain Key Cryptography.
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
              At the time of writing, there are no other blockchains in
              existence that can create TX on other blockchains for their smart
              contracts. Blockchains that talk about "native integrations" are
              usually talking about a bridge run by the company that backs them.
            </p>
            <h3>Service Composability</h3>
            <p>
              The Web3 environment contains multiple blockchains that have
              different characteristics and excel in different roles. A key web3
              philosophy is service composability, in which different blockchain
              services are composed to create new services and functionality.
              Tokenized assets and liquidity must also be able to move between
              services, whichever blockchain they are on. The Internet Computer
              provides a means to fully support this paradigm in a multi-chain
              environment without need for trusted bridges run by central
              controllers such as companies.
            </p>

            <p>
              For example, when building a DeFi framework on the Ethereum
              blockchain today, a means must be found to create the user
              experience. Typically, this is built on centralized servers or
              cloud services today, creating a serious security vulnerability,
              and exposing the developers who pay for the servers or cloud
              services to legal liabilities (since regulators can argue that the
              service built using Ethereum is not running in the mode of a
              decentralized protocol). Therefore, it would be better if the user
              experience could be created on the Internet Computer using
              canister smart contracts, which are controlled by a DAO. A means
              has been provided to do this (please check developers docs to see
              what is in production at any one time).
            </p>

            <h3>Threshold ECDSA</h3>
            <p>
              The chain key cryptography protocol engine was extended so that
              hosted smart contracts can maintain ECDSA public keys, and make
              corresponding signatures, without need to store a private key on
              the blockchain in a way that would allow it to be stolen.
              Crucially, ECDSA is the signature scheme used to sign TX on other
              blockchains, and allows smart contracts on the Internet Computer
              to create TX that other blockchains directly execute.
            </p>

            <h3>Bitcoin Integration</h3>
            <p>
              One application has been the provision of special Bitcoin
              capabilities to canister smart contracts. This allows them to
              create bitcoin addresses, and send and receive bitcoin directly on
              the Bitcoin ledger, without any need for insecure trusted
              intermediaries such as bridges. Essentially, smart contracts on
              the Internet Computer can process bitcoin almost as though they
              are hosted by the Bitcoin network themselves.
            </p>

            <h3>Ethereum Integration</h3>
            <p>
              Another application is the signing of TX designed to invoke smart
              contracts on other blockchains, such as Ethereum. For example, to
              interact with Ethereum, an Internet Computer canister smart
              contract would first create an ECDSA public key that functions as
              an Ethereum Account (before use this should be charged with some
              ETH to pay for gas). Thereafter, the smart contract can invoke
              smart contract calls on the Ethereum blockchain, by creating and
              signing appropriate Ethereum TX that will be executed by Ethereum
              network. The smart contract can then determine the results of the
              TX by using the HTTPS outcalls feature to interact with Ethereum
              local nodes.
            </p>

            <p className="mb-3 mt-6">
              <Link
                href="https://wiki.internetcomputer.org/wiki/Trustless_multi-chain_web3_using_the_IC"
                className="tw-heading-6 flex gap-2 items-center"
              >
                <RightPointer className="w-6 h-6"></RightPointer>
                Learn more on Wiki
              </Link>
            </p>
          </div>
        </section>

        <section className="max-w-page relative mx-auto mb-20 px-6 md:mb-40 md:px-15">
          <p className="tw-heading-4 text-center mb-2 w-full mx-auto md:tw-heading-2 md:mb-6 lg:w-8/12">
            Build on the IC
          </p>
          <p className="tw-lead-sm mb-2 text-center mx-auto md:mb-6 md:w-6/12">
            Using the power of chain key cryptography, the Internet Computer can
            thus be used as an orchestration blockchain, or meta blockchain,
            upon which new services can be built that combine functionality and
            assets provided by other blockchains in the Web3 universe - all
            without the need to trust a central party, and without the
            inconvenience and risk of using wrapping and bridges.
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
              title="'Trustless multi-chain Web3' article on the IC Wiki"
              description="Learn about how IC's smart contracts directly interact with other blockchains, without trusted centralized bridges."
              href="https://wiki.internetcomputer.org/wiki/Trustless_multi-chain_web3_using_the_IC"
            />
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default FeaturePage;
