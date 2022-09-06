import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { CardWithDescription } from "@site/src/components/Common/Card";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import { resetNavBarStyle } from "@site/src/utils/reset-navbar-style";
import shareImage from "@site/static/img/shareImages/share-bitcoin-integration.jpeg";
import RightPointer from "@site/static/img/svgIcons/rightPointer.svg";
import Layout from "@theme/Layout";
import React from "react";

function FeaturePage() {
  const { siteConfig } = useDocusaurusContext();
  resetNavBarStyle();
  return (
    <Layout
      title="Bitcoin Integration"
      description="The Internet Computer enables direct integration with the Bitcoin network. By way of bridge-less communication with the Bitcoin network and a novel threshold ECDSA protocol, canisters on the Internet Computer can now securely receive, hold, and send bitcoins."
    >
      <Head>
        <meta property="og:image" content={shareImage} />
        <meta name="twitter:image" content={shareImage} />
      </Head>
      <main className="text-black relative">
        <section className="overflow-hidden bg-infinite text-white">
          <DarkHeroStyles></DarkHeroStyles>
          <div className="container-10 pt-12 mb-30 md:mb-52 md:pt-36 relative">
            <div className="md:w-7/10">
              <h1 className="tw-heading-3 md:tw-heading-2 mb-6">Web speed</h1>
              <p className="tw-lead-sm md:tw-lead mb-0">
                The Internet Computer (IC) is the only blockchain that can host
                a full dapp; frontend, backend, and data included. This is a
                crucial and distinguishing feature allowing dapps to run 100%
                on-chain inheriting the security and decentralization of
                blockchain without sacrificing speed or affordability. This is
                possible because nodes of the IC can securely serve HTTP
                requests and by leveraging the reverse gas model.
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
              src="/img/bitcoin-integration/howItWorks.png"
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
              Two key technology developments make it possible for Internet
              Computer smart contracts to create bitcoin addresses and directly
              send and receive bitcoin: inter-node communication between the
              Internet Computer network and the Bitcoin network, and the use of
              novel threshold ECDSA cryptography by its protocols.
            </p>
            <h3>Network Integration</h3>
            <p>
              When the Internet Computer blockchain creates transactions for the
              Bitcoin blockchain, its nodes directly transmit the transaction to
              the Bitcoin network's nodes, without any need for intermediaries
              that might censor them. Internet Computer nodes also directly
              pulls blocks from the Bitcoin network to maintain Bitcoin's
              current UTXO set.
            </p>
            <h3>Threshold ECDSA</h3>
            <p>
              Novel "threshold cryptography" allows the Internet Computer to
              distribute, and redistribute, secret key material among its nodes,
              and have them cooperate to create new bitcoin addresses and sign
              Bitcoin transactions, using highly fault tolerant decentralized
              network protocols that are resilient to attacks by malicious
              nodes.
            </p>
            <p>
              With the{" "}
              <Link href="/docs/current/references/ic-interface-spec/#ic-bitcoin-api">
                Bitcoin API
              </Link>{" "}
              and{" "}
              <Link href="/docs/current/references/ic-interface-spec/#ic-ecdsa_public_key">
                ECDSA API
              </Link>
              , canisters can directly securely receive, hold, and send
              bitcoins, as though they were smart contracts actually hosted{" "}
              <i>on</i> the Bitcoin network itself.
            </p>
            <p>
              This means bitcoin can be easily and securely incorporated into
              DeFi and Web3 services on the Internet Computer, without the need
              to trust bridging services that might get hacked, or taken down,
              causing the loss of the bitcoin involved.
            </p>
            <p>
              For example, DEXs (decentralized exchanges) can easily provide BTC
              trading pairs, decentralized fundraises can accept bitcoin, and a
              Web3 SocialFi service might allow satoshis to be sent using chat
              messages, say.
            </p>
            <p>
              Lightning Network-like services can also be created by wrapping
              bitcoin inside fully autonomous Internet Computer smart contracts,
              such that bitcoin can be sent between users, Web3 services and
              DeFi contracts, in only 1-2 seconds.
            </p>
            <p className="mb-3 mt-6">
              <Link
                href="/docs/current/developer-docs/integrations/bitcoin/"
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
            Build with Bitcoin Integration
          </p>
          <p className="tw-lead-sm mb-2 text-center mx-auto md:mb-6 md:w-6/12">
            The efficiency and scalability of the Internet Computer opens up a
            whole new set of possible BTC applications: fund a DAO, create DeFi
            dapps and more.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-8 md:mt-20">
            {/* add or remove CardWithDescription components on demand */}

            <CardWithDescription
              title="BTC Integration Documentation"
              description="Start building and testing Bitcoin functionality."
              href="/docs/current/developer-docs/integrations/bitcoin"
            />
            <CardWithDescription
              title="Threshold ECDSA Documentation"
              description="Learn about threshold ECDSA signing and its functions."
              href="https://internetcomputer.org/docs/current/developer-docs/integrations/t-ecdsa"
            />
            <CardWithDescription
              title="Sample Code"
              description="Deploy your first Bitcoin dapp and use threshold ECDSA signatures."
              href="/samples"
            />
            <CardWithDescription
              title="IC Wiki"
              description="Take a deep dive into how Bitcoin integration works on the Internet Computer."
              href="https://wiki.internetcomputer.org/wiki/Bitcoin_integration"
            />
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default FeaturePage;
