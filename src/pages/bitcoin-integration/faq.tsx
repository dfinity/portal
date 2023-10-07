import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import AnimateSpawn from "@site/src/components/Common/AnimateSpawn";
import Breadcrumbs from "@site/src/components/Common/Breadcrumbs";
import LinkArrowRight from "@site/src/components/Common/Icons/LinkArrowRight";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";
import React, { ReactNode } from "react";
import slugify from "slugify";
import transitions from "@site/static/transitions.json";
import { SmallCardWithDescription } from "@site/src/components/Common/Card";
import IntraPageNav from "@site/src/components/Common/IntraPageNav";
import ShareMeta from "@site/src/components/Common/ShareMeta";

function idFromTitle(title: string) {
  const slug = slugify(title, { strict: true, lower: true });
  if (slug.match(/^\d/)) {
    return "sns-faq-" + slug;
  }
  return slug;
}

const Faq: React.FC<{ title: string; children: ReactNode; id?: string }> = ({
  children,
  title,
  id,
}) => {
  return (
    <article
      id={id || slugify(title, { lower: true, strict: true })}
      className="scroll-m-[110px]"
    >
      <AnimateSpawn variants={transitions.item}>
        <motion.h2
          className="tw-heading-5 md:tw-heading-3 mb-6 relative group"
          variants={transitions.item}
        >
          {title}
          <a
            className="text-infinite absolute -left-6 md:-left-8 top-0 hidden group-hover:inline-block hover:text-infinite-60 hover:no-underline md:pr-3"
            href={`#${idFromTitle(title)}`}
          >
            #
          </a>
        </motion.h2>
        <motion.div
          variants={transitions.item}
          className="
          tw-paragraph md:tw-lead-sm
          prose
          max-w-none
          prose-h3:tw-heading-6 prose-h3:md:tw-heading-5 prose-h3:mb-4
          prose-p:tw-paragraph md:prose-p:tw-lead-sm prose-p:mb-3
          prose-img:mb-0 prose-img:mt-2 prose-img:w-full prose-img:aspect-video prose-img:object-contain prose-img:object-center
          prose-a:font-normal hover:prose-a:text-infinite hover:prose-a:no-underline
          prose-ul:mb-4 prose-ul:list-none prose-ul:pl-0 prose-ul:tw-paragraph md:prose-ul:tw-lead-sm
          prose-li:bg-[url('/img/checkmark.svg')] prose-li:bg-no-repeat prose-li:bg-left-top prose-li:pl-8 prose-li:my-3 prose-li:tw-paragraph prose-li:md:tw-lead-sm
      "
        >
          {children}
        </motion.div>
      </AnimateSpawn>
    </article>
  );
};

const FaqSection: React.FC<{
  title: ReactNode;
  children: ReactNode;
  id?: string;
}> = ({ children, title, id }) => {
  return (
    <div
      className="flex flex-col md:flex-row md:gap-1/12 scroll-m-[110px]"
      id={id}
    >
      <div className="md:w-4/12 flex-shrink-0">
        <AnimateSpawn
          variants={transitions.item}
          className="md:sticky md:top-10"
        >
          {title}
        </AnimateSpawn>
      </div>
      <div className="flex flex-col gap-12 md:gap-20 relative">{children}</div>
    </div>
  );
};

function BitcoinFaqPage() {
  return (
    <Layout
      title="Bitcoin integration FAQ"
      description="All you need to know about ckBTC and ICP's Bitcoin integration."
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <ShareMeta image="/img/shareImages/share-btc-faq.jpg"></ShareMeta>

      <main className="text-black relative overflow-hidden">
        <AnimateSpawn
          className="container-10 mb-16 md:mb-30 md:pt-8"
          el={motion.section}
          variants={transitions.container}
        >
          <Breadcrumbs
            links={[
              {
                href: "/bitcoin-integration",
                text: "Bitcoin integration",
              },
              {
                text: "What you need to know about Bitcoin integration",
              },
            ]}
          ></Breadcrumbs>
          <motion.h1 className="tw-heading-3 md:tw-heading-2 mt-12 md:mt-32 md:w-8/10">
            What you need to know about Bitcoin integration and ckBTC
          </motion.h1>
        </AnimateSpawn>
        <section className="container-12 flex flex-col gap-30 ">
          <FaqSection
            id="bitcoin-integration"
            title={
              <div className="relative mb-20">
                <div className="blob blob-sm md:blob-md blob-bottom-left -bottom-20 blob-infinite z-[-1] opacity-90"></div>
                <img
                  src="/img/sns/faq-1.svg"
                  className="w-full pr-2/12"
                  loading="lazy"
                  alt=""
                ></img>
              </div>
            }
          >
            <Faq title="What is Bitcoin integration?">
              <p>
                The Internet Computer (ICP) integrates with the Bitcoin network
                at a protocol level. This means ICP canister smart contracts can create   
                Bitcoin addresses as well as send and receive bitcoin directly on the 
                Bitcoin network. And, Bitcoin can easily and securely be incorporated
                into DeFi and Web3 services on the Internet Computer blockchain,
                without having to trust centralized bridging services, which are 
                at high risk of being taken down or hacked.
              </p>
              <p>
                This integration with the Bitcoin network is made up of two key building blocks:{" "}
                <strong>Network integration</strong> and <strong>chain-key ECDSA</strong>.
                Combining these building blocks, canisters can directly and
                securely hold, receive, and send bitcoin seamlessly as if the
                Internet Computer and the Bitcoin network were one blockchain.
                Another way of looking at it, is that the Bitcoin integration
                is the same as running a Bitcoin node on chain.
              </p>
            </Faq>

            <Faq title="What does direct integration with the Bitcoin network really mean?">
              <p>
                One key tech development allowing smart contracts on the Internet
                Computer to obtain the balances of Bitcoin addresses as well as
                directly send and receive bitcoin is inter-chain communication.
                As the ICP blockchain creates transactions for the Bitcoin
                blockchain, its nodes directly transmit these transactions to the
                nodes of the Bitcoin network, without any need for intermediaries
                that might censor them. ICP nodes also directly pull blocks from
                the Bitcoin network to maintain Bitcoin's current UTXO set,
                allowing canisters to query the balance of Bitcoin addresses
                and their UTXOs. Creating bitcoin transactions and querying UTXO
                sets are made available to canisters by the Bitcoin API.
              </p>
            </Faq>

            <Faq title="What is chain-key ECDSA?">
              <p>
                The real innovation behind Bitcoin integration is chain-key ECDSA
                signing — advanced threshold cryptography build into the Internet Computer.
                In short, chain-key ECDSA is a set of cryptographic protocols that
                allow ICP nodes to cooperatively create ECDSA signatures, 
                which can be used to sign bitcoin transactions, using
                a highly fault-tolerant, decentralized network that is resilient
                to attacks by malicious nodes. The secret key is never stored in
                one place, instead it is broken down into key shares held by ICP
                nodes that are re-shared periodically. When requested, nodes
                use their key shares to collectively sign BTC transactions without
                recreating the original secret key. This signing protocol assumes
                a threshold of nodes to be honest.
              </p>
            </Faq>
          </FaqSection>
          <FaqSection
            id="ckbtc"
            title={
              <h2 className="tw-heading-3 text-gradient mb-12 md:mb-0 md:tw-heading-60">
                Chain-key Bitcoin (ckBTC)
              </h2>
            }
          >
            <Faq title="What is ckBTC?">
              Chain-key bitcoin (ckBTC) is a multi-chain bitcoin twin that can be
              sent with 1-2 second finality and negligible fees. It is trustlessly
              created by chain-key cryptography and a pair of canister smart
              contracts that directly hold raw bitcoin without relying on
              intermediaries.
            </Faq>
            <Faq title="How can I get ckBTC?">
              <p>There are two main ways of acquiring ckBTC:</p>
              <ul>
                <li>
                  <strong>Swap on DEXs:</strong> If you have ICP, you can 
                  swap it for ckBTC on decentralized exchanges running on the Internet
                  Computer, including{" "}
                  <Link href="http://icdex.io/">
                    ICDex
                  </Link> or{" "}
                  <Link href="https://icpswap.com/">
                    ICPSwap
                  </Link>.{" "}
                </li>
                <li>
                  <strong>
                    Convert directly on the protocol:
                  </strong>{" "}
                  You can convert BTC to ckBTC by simply sending BTC to you NNS wallet (for more details, see
                  next question).{" "}
                  <Link href="http://icdex.io/">
                    ICDex
                  </Link> and {" "}
                  <Link href="https://icpswap.com/">
                    ICPSwap
                  </Link>{" "}
                  have similar functionality that allows you to convert your BTC to ckBTC, directly
                  using the ckBTC canisters.
                </li>
              </ul>
            </Faq>
            <Faq title="How do I convert BTC to ckBTC using the NNS?">
              <p className="tw-paragraph mb-3">
                Easy steps to getting ckBTC via your NNS wallet:
              </p>
              <p>
                <strong>
                  1. Go to the NNS frontend dapp and sign in with your Internet Identity.
                </strong> If you don't have one, you will be prompted to create one. Any device that supports
                WebAuthn can be used as a passkey for II. Alternatively, you can use a YubiKey or
                a Ledger device.
                <img
                  src="/img/bitcoin-integration/ckbtc-1.webp"
                  alt=""
                  loading="lazy"
                />
              </p>
              <p>
                <strong>2. Navigate to "My Tokens" and select ckBTC.</strong>
              </p>
              <p>
                <strong>3. Click on "Receive" on the bottom of the screen.</strong>
              </p>
                <img
                  src="/img/bitcoin-integration/ckbtc-2.webp"
                  alt=""
                  loading="lazy"
                />
              
              <p>
                <strong>
                  4. Send BTC to your NNS BTC address.
                </strong> Once you see this pop up window, you can copy your NNS BTC address, and send BTC there.
                Note, that since this is a real bitcoin transaction, so it will take roughly an hour, and have the Bitcoin network's
                transaction fees. Once you acquired ckBTC, you can take advantage of its near instant finality (1-2s) and
                negligible transaction fees (10 satoshis).
                <img
                  src="/img/bitcoin-integration/ckbtc-3.webp"
                  alt=""
                  loading="lazy"
                />
              </p>
            </Faq>
            <Faq title="Is ckBTC wrapped?">
              <p className="tw-paragraph mb-3">
                ckBTC isn't considered a wrapped token because it doesn't involve 
                centralized custodians or bridges to work. More than a token, while
                ckBTC implements the ICRC-1 fungible token standard, it is a pair of
                canister smart contracts that allow bitcoin to be freely sent between
                addresses either on the Bitcoin network or the Internet Computer,
                making it the first true multi-chain asset.
              </p>
            </Faq>
            <Faq
              title="How does ckBTC compare to the Lightning Network?"
              id="how-do-you-get-sns-tokens"
            >
              <p>
                The Lightning Network is the most well known Layer-2 for Bitcoin.
                Like ckBTC, it allows fast and cheap transfers of BTC value off
                the Bitcoin blockchain.
              </p>
              <p>
                Unlike Lightning, ckBTC does not require peer-to-peer payment
                channels to be established and funded. This means that your full
                ckBTC balance can always be transferred — no network liquidity
                limitations.
              </p>
              <p>
                Canister smart contracts can programmatically hold and transfer
                ckBTC, making it possible to develop fully on-chain Layer-2
                applications for Bitcoin, which is not possible using the
                Lightning Network.
              </p>
              <p>
                Another key difference is that ckBTC transaction fees are fixed,
                and not dependent on the transaction amount, variable intermediate
                forwarding, or unexpected channel funding fees.
              </p>
              <p>
                In the future, ckBTC will be available on other networks like
                Ethereum – also directly, and without bridges, thanks to chain-key
                cryptography integrations.
              </p>
            </Faq>

            <Faq title="Does ckBTC incorporate KYT?">
              <p>
                Yes, cross-chain transactions go through KYT checks to protect honest users.
                Know Your Transaction (KYT) is a process that monitors and tracks financial 
                transactions in order to detect and prevent fraudulent or criminal activity, 
                such as money laundering or terrorist financing. 
              </p>
              <p>
                If ckBTC were to operate without a KYT implementation, there would be a risk
                of 'tainted' bitcoin entering the Internet Computer, that an honest
                user could unknowingly withdraw. Such bitcoin may be rejected by CEXs, which 
                means honest users could potentially lose their bitcoin when tryng to sell.
              </p>
              <p>
                KYT is an important security component of ckBTC. Read more about how ckBTC
                implements KYT and the motivation behind it in this{" "}
                <Link href="https://forum.dfinity.org/t/ckbtc-and-kyt-compliance/18754">
                  forum post
                </Link>.
              </p>
            </Faq>
          </FaqSection>
        </section>
        <section id="resource-center">
          <AnimateSpawn
            className="container-10 text-white relative mt-30 md:mt-60"
            variants={transitions.container}
          >
            <motion.div
              variants={transitions.fadeIn}
              className="z-[-1] blob blob-purple  blob-md md:blob-lg blob-center opacity-90"
            ></motion.div>
            <div className="md:w-6/10 mx-auto text-center">
              <motion.h2
                className="tw-heading-3 md:tw-heading-60 mb-3 md:mb-6"
                variants={transitions.item}
              >
                Resource Center
              </motion.h2>
              <motion.p
                className="tw-lead-sm md:tw-lead mb-6"
                variants={transitions.item}
              >
               Navigate your way through the technical aspects of Bitcoin integration and ckBTC.
              </motion.p>
            </div>
          </AnimateSpawn>
        </section>
        <AnimateSpawn
          variants={transitions.container}
          className="container-12 mt-8 md:mt-20 mb-20 md:mb-30 grid grid-cols-1 md:grid-cols-3 gap-2"
          el={motion.section}
        >
          <SmallCardWithDescription
            href="/docs/current/developer-docs/integrations/bitcoin/bitcoin-how-it-works/"
            title="Technical overview of Bitcoin integration"
          ></SmallCardWithDescription>
          <SmallCardWithDescription
            href="/docs/current/developer-docs/integrations/bitcoin/ckbtc"
            title="Technical overview of ckBTC"
          ></SmallCardWithDescription>
          <SmallCardWithDescription
            href="https://medium.com/dfinity/chain-key-bitcoin-a-decentralized-bitcoin-twin-ceb8f4ddf95e"
            title="Blog: ckBTC"
          ></SmallCardWithDescription>
          <SmallCardWithDescription
            href="/docs/current/references/ic-interface-spec/#ic-bitcoin-api"
            title="Native bitcoin API"
          ></SmallCardWithDescription>
          <SmallCardWithDescription
            href="/docs/current/developer-docs/integrations/bitcoin/local-development"
            title="Code native bitcoin"
          ></SmallCardWithDescription>
          <SmallCardWithDescription
            href="/samples?term=bitcoin"
            title="Sample code"
          ></SmallCardWithDescription>
        </AnimateSpawn>
      </main>
      <IntraPageNav
        hasHome={false}
        links={[
          {
            text: "Introduction",
            to: "#introduction",
          },
          {
            to: "#participate",
            text: "Participate",
          },
          {
            to: "#decentralization-swap",
            text: "Decentralization swap",
          },
          {
            to: "#governance",
            text: "Governance",
          },
          {
            to: "#resource-center",
            text: "Resource Center",
          },
        ]}
      ></IntraPageNav>
    </Layout>
  );
}

export default BitcoinFaqPage;
