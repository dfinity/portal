import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import Layout from "@theme/Layout";
import React from "react";

function FeaturePage() {
  return (
    <Layout
      title="Daemon Contracts"
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
                Daemon Contracts
              </h1>
              <p className="tw-lead-sm md:tw-lead mb-0">
                On the Internet Computer blockchain, you can create canister
                smart contracts that run like daemon processes — that is, you
                can configure them so that they are automatically activated by
                the network itself at specified block intervals.
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
              When smart contracts are hosted on traditional blockchain
              networks, computations can be only be invoked by submitting a new
              transaction to their networks. This means that if, say, a DeFi
              (decentralized finance) smart contract needs to periodically
              perform some action, such as recording the latest asset prices
              published by DEXs (decentralized exchanges), a traditional
              off-chain system such as software running on a centralized cloud
              service must be configured to periodically submit transactions.
            </p>

            <p>
              The approach that must be used with traditional blockchains is
              complex, fault prone, and introduces several problems native to
              centralization. For example, who will be responsible for running
              the centralized infrastructure, and would such a person become a
              de facto "controller" or "owner" of an otherwise decentralized
              financial system in the eyes of financial regulator?
            </p>

            <p>
              The Internet Computer provides a means to avoid such problems, by
              allowing canister smart contracts to be configured so that they
              aer invoked by the blockchain itself, at some specified block
              interval.
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default FeaturePage;
