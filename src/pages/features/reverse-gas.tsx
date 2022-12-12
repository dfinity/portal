import Link from "@docusaurus/Link";
import { CardWithDescription } from "@site/src/components/Common/Card";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import YoutubeVideoEmbed from "@site/src/components/Common/YoutubeVideoEmbed";
import { resetNavBarStyle } from "@site/src/utils/reset-navbar-style";
import RightPointer from "@site/static/img/svgIcons/rightPointer.svg";
import Layout from "@theme/Layout";
import React from "react";

function FeaturePage() {
  resetNavBarStyle();
  return (
    <Layout
      title="Reverse Gas"
      // fill in meta description
      description=""
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <main className="text-black relative">
        <section className="overflow-hidden bg-infinite text-white">
          <DarkHeroStyles></DarkHeroStyles>
          <div className="container-10 pt-12 mb-30 md:mb-52 md:pt-36 relative">
            <div className="md:w-7/10">
              <h1 className="tw-heading-3 md:tw-heading-2 mb-6">Reverse Gas</h1>
              <p className="tw-lead-sm md:tw-lead mb-0">
                On the Internet Computer (IC), a browser is all you need to
                interact with canister smart contracts. You do not have to overcome any
                hurdles such as creating a wallet, hold tokens, or pay expensive
                gas fees. This is in contrast to other blockchains, where users
                need to acquire tokens first to do anything.
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
            <h2>Reverse gas model (aka "canister pays" model)</h2>
            <p>
              In the "reverse gas model" developers pre-pay costs by charging
              canisters with cycles. Then users can interact with a
              dapp without needing tokens to pay for the computations. Cycles are stable in cost — around 1.3 USD or 1 XDR per one trillion (10^12) cycles — 
              and are obtained through converting ICP tokens to cycles. This allows developers to
              know in advance how much they will need to spend on computation.
              <br />
              <br />
              As an example, the{" "}
              <Link
                href="https://m7sm4-2iaaa-aaaab-qabra-cai.raw.ic0.app/"
                target="_blank"
              >
                Motoko Playground
              </Link>{" "}
              dapp is hosted and executed entirely on chain and it does not
              require its users to pay when using it.
            </p>

            <YoutubeVideoEmbed
              videoId="YL4R4jQ78u0"
              className="mt-10 md:mt-10"
              altText="Community Conversations | Charging Canister Cycles"
            ></YoutubeVideoEmbed>
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
              title="Cycles Wallet"
              description="Learn what a cycles wallet is"
              href="https://support.dfinity.org/hc/en-us/articles/5946641657108-Cycles-Wallet"
            />
            <CardWithDescription
              title="Cycles"
              description="Learn what cycles are"
              href="https://wiki.internetcomputer.org"
            />

            <CardWithDescription
              title="DFINITY Cycles Faucet"
              description="Learn how to access free cycles to pay for IC hosting resources."
              href="https://medium.com/dfinity/internet-computer-basics-part-2-how-to-get-free-cycles-to-deploy-your-first-dapp-24f6bc5a718b"
            />

            <CardWithDescription
              title="Sample Code"
              description="Learn about IC capabilities from community samples."
              href="/samples"
            />
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default FeaturePage;
