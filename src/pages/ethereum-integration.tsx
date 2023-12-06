import Link from "@docusaurus/Link";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import clsx from "clsx";
import { motion } from "framer-motion";
import React, { useRef } from "react";
import AnimateSpawn from "../components/Common/AnimateSpawn";
import { CardWithDescription } from "../components/Common/Card";
import LinkArrowRight from "../components/Common/Icons/LinkArrowRight";
import LinkArrowUpRight from "../components/Common/Icons/LinkArrowUpRight";
import Newsletter from "../components/Common/Newsletter/Newsletter";
import ShareMeta from "../components/Common/ShareMeta";
import TranslatedLayout from "../components/Common/TranslatedLayout/TranslatedLayout";
import VideoCard from "../components/Common/VideoCard";
import { useDarkHeaderInHero } from "../utils/use-dark-header-in-hero";

const MotionLink = motion(Link);

const Prose: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div
      className={clsx(
        `prose 
      prose-h2:tw-heading-4 prose-h2:md:tw-heading-60 prose-h2:mb-3 prose-h2:mt-0
      prose-p:tw-paragraph 
      prose-ul:tw-paragraph marker:prose-ul:text-black
      prose-a:no-underline
      prose-h3:tw-heading-5 md:prose-h3:tw-heading-4 prose-h3:mb-4 prose-h3:mt-0
      `,
        className
      )}
    >
      {children}
    </div>
  );
};

const AnimatedProse: React.FC<{
  children: React.ReactNode;
  className?: string;
  variants?: any;
}> = ({ children, className, variants = transitions.item }) => (
  <motion.div variants={variants} className={className}>
    <Prose>{children}</Prose>
  </motion.div>
);

function EthereumIntegrationPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const isDark = useDarkHeaderInHero(heroRef);
  return (
    <Layout
      title="Ethereum Integration"
      description="A true World Computer enables a multi-chain environment where centralized bridges are obsolete and smart contracts can seamlessly communicate across blockchains. ICP already integrates with the Bitcoin Network, and native ETH integration is underway."
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <ShareMeta image="/img/shareImages/share-ethereum-integration.jpg"></ShareMeta>

      <main
        className="text-black relative overflow-hidden"
        style={{
          marginTop: `calc(var(--ifm-navbar-height) * -1)`,
        }}
      >
        {isDark && <DarkHeroStyles bgColor="transparent"></DarkHeroStyles>}

        <section
          className="overflow-hidden bg-infinite text-white pt-20"
          ref={heroRef}
        >
          <AnimateSpawn
            className="container-10 pt-20 pb-40 md:pb-30 md:pt-36 relative"
            variants={transitions.container}
          >
            <div className="blob blob-white blob-xl md:blob-xl md:blob-x-8 md:blob-y-10 opacity-100"></div>
            <div className="md:w-7/10 relative">
              <motion.h1
                className="tw-heading-3 md:tw-heading-2 mb-2 md:mb-6"
                variants={transitions.item}
              >
                Ethereum &lt;&gt; ICP
              </motion.h1>
              <motion.p
                className="tw-lead-sm md:tw-lead mb-0"
                variants={transitions.item}
              >
                A true World Computer enables a multi-chain environment where
                centralized bridges are obsolete and smart contracts can
                seamlessly communicate across blockchains. ICP already
                integrates with the Bitcoin Network, and native ETH integration
                is underway.
              </motion.p>
            </div>
          </AnimateSpawn>
        </section>

        <AnimateSpawn
          className="container-12 relative"
          el={motion.section}
          variants={transitions.fadeIn}
        >
          <div className="text-center md:w-5/10 relative md:absolute top-30 sm:top-40 md:top-36 -translate-y-1/2 right-0 -mt-30 md:-mt-24">
            <img
              src="/img/ethereum-integration/hero.webp"
              alt=""
              className="w-full max-w-sm sm:max-w-lg md:max-w-none"
            />
          </div>
        </AnimateSpawn>
        <AnimateSpawn
          className="container-10 md:mt-40 relative"
          el={motion.section}
          variants={transitions.container}
        >
          <div className="md:w-5/10">
            <motion.h2
              className="tw-heading-5 sm:tw-heading-4 md:tw-heading-3 mb-0  text-gradient"
              variants={transitions.item}
            >
              Canister smart contracts on ICP are the glue between blockchains
              and the gateway to X-chain advantages.
            </motion.h2>
            {/* <motion.p className="tw-paragraph mb-0" variants={transitions.item}>
              <Link href="#subscribe" className="button-primary">
                Get updates about ETH &lt;&gt; ICP
              </Link>
            </motion.p> */}
          </div>
        </AnimateSpawn>

        <section className="container-10 my-20 sm:my-30 md:my-40">
          <AnimateSpawn
            variants={transitions.container}
            className="text-center mb-10 sm:mb-16 sm:w-[600px] md:w-7/10 sm:mx-auto"
          >
            <motion.h2
              className="tw-heading-3 sm:tw-heading-60 mb-6 sm:mb-10"
              variants={transitions.item}
            >
              Extend Ethereum with ICP capabilities
            </motion.h2>
            <motion.p
              className="mb-0 tw-paragraph md:tw-lead-sm"
              variants={transitions.item}
            >
              Ethereum is the world’s top blockchain for DeFi with TVL in the
              billions. Integrating with ICP offers X-chain benefits such as
              increased asset liquidity, expanded market access, improved
              scalability and throughput. Plus, access to ICP’s unique
              capabilities:
              {/* <Link
                className="link-primary link-with-icon"
                href="https://wiki.internetcomputer.org/wiki/Trustless_multi-chain_web3_using_the_IC"
              >
                More on trustless multi-chain
                <LinkArrowUpRight />
              </Link> */}
            </motion.p>
          </AnimateSpawn>
          <AnimateSpawn
            className=" md:mt-40 flex flex-col md:flex-row md:justify-between gap-16 sm:items-center md:gap-5"
            variants={transitions.container}
          >
            <motion.div
              variants={transitions.item}
              className="w-full sm:w-[400px] md:w-auto md:basis-[320px]"
            >
              <img
                src="/img/ethereum-integration/icon-1.svg"
                alt=""
                className="mb-6"
              ></img>
              <h3 className="sm:tw-heading-5 mb-2">100% on-chain Web3</h3>
              <p className="tw-paragraph mb-0">
                Decentralize your Ethereum dapp by hosting frontend and backend
                data on the Internet Computer.
              </p>
            </motion.div>
            <motion.div
              variants={transitions.item}
              className="w-full sm:w-[400px] md:w-auto md:basis-[320px]"
            >
              <img
                src="/img/ethereum-integration/icon-2.svg"
                alt=""
                className="mb-6"
              ></img>
              <h3 className="sm:tw-heading-5 mb-2">Gasless token swaps</h3>
              <p className="tw-paragraph mb-0">
                Using ckETH and ckERC-20 tokens, users can swap tokens for a few
                cents with 0 gas fees.
              </p>
            </motion.div>
            <motion.div
              variants={transitions.item}
              className="w-full sm:w-[400px] md:w-auto md:basis-[320px]"
            >
              <img
                src="/img/ethereum-integration/icon-3.svg"
                alt=""
                className="mb-6"
              ></img>
              <h3 className="sm:tw-heading-5 mb-2">Web2 integration</h3>
              <p className="tw-paragraph mb-0">
                Connect smart contracts to the world outside blockchain. Fetch
                real-time price data and more from Web2.
              </p>
            </motion.div>
          </AnimateSpawn>
        </section>

        <section className="container-12 flex flex-col gap-16 md:gap-40 mt-30 md:mt-60">
          <TranslatedLayout imageUrl="/img/ethereum-integration/image-1.webp">
            <h2 className="md:tw-heading-60 md:mb-6">
              Signing Ethereum transactions
            </h2>
            <p className="tw-lead-sm mb-6 md:mb-6">
              Today, ICP smart contracts are capable of offering the on-chain
              Ethereum full node API by using the{" "}
              <Link href="/https-outcalls" className="link-subtle">
                HTTPS outcalls feature
              </Link>{" "}
              to cloud API providers to securely query the Ethereum blockchain,
              and send transactions to it. 
            </p>
            <p className="tw-lead-sm mb-6 md:mb-10">
              Chain-key (ck) ECDSA , which is already available to any canister
              smart contract on the Internet Computer, can invoke smart
              contracts calls on the Ethereum blockchain by creating and signing
              transactions to be executed by the Ethereum network.
            </p>
            <p className="mb-0">
              <Link
                href="https://wiki.internetcomputer.org/wiki/Trustless_multi-chain_web3_using_the_IC"
                className="link-primary link-with-icon"
              >
                About ckECDSA signing & multi-chain <LinkArrowRight />
              </Link>
            </p>
          </TranslatedLayout>
          <TranslatedLayout
            reverse={true}
            imageUrl="/img/ethereum-integration/image-2.webp"
          >
            <h2 className="tw-heading-3 md:tw-heading-60 md:mb-6">
              X-chain DeFi
            </h2>
            <p className="tw-lead-sm mb-6 md:mb-6">
              In June 2023, average transaction fees for USDC and USDT were
              $4.21 and $5.46 respectively, making swaps below a certain amount
              is completely impractical. The Ethereum integration enables the
              use of chain-key (ck) tokens such as ckETH and ckERC-20 on the
              Internet Computer, including ckUSDC or ckUSDT. This feature allow
              users to send and receive ETH value on ICP DEXs for a few cents
              with 1-2s finality, and no gas fees.
            </p>
            <p className="tw-lead-sm mb-6 md:mb-6">
              ckETH is now live on the mainnet and exposes ICRC-1 and 2 ledger
              interfaces (the fungible token standard of ICP), making it simple
              for all ICP wallets to offer ckETH support. Total value of ckETH
              is fully backed 1:1 by ETH, and can always be verified by viewing
              the on-chain dashboard and metrics of the canisters. ckERC-20 is coming soon.
            </p>
            <p className="mb-0 flex flex-col gap-3 items-start">
              <Link href="/defi" className="link-primary link-with-icon">
                <LinkArrowRight />
                Start swapping ckETH
              </Link>

              <Link
                href="https://dashboard.internetcomputer.org/ethereum"
                className="link-primary link-with-icon"
              >
                <LinkArrowRight />
                Go to ckETH dashboard
              </Link>
            </p>
          </TranslatedLayout>
          <TranslatedLayout imageUrl="/img/ethereum-integration/image-3.webp">
            <h2 className="md:tw-heading-60 md:mb-6">
              EVM on the Internet Computer
            </h2>
            <p className="tw-lead-sm mb-6 md:mb-10">
              An Ethereum Virtual Machine (EVM) is coming to the Internet
              Computer built by Bitfinity — a team of developers from the ICP
              community. Bitfinity is delivering a turn-key solution for
              developers to operate their ETH dapps on the Internet Computer
              using Solidity, which brings ICP's 1-2s finality, and near 0
              transaction fees to established Ethereum dapps, providing an
              incredibly efficient Ethereum scaling solution.
            </p>
            <p className="mb-0">
              <Link
                href="https://bitfinity.network/"
                className="link-primary link-with-icon"
              >
                Check out Bitfinity <LinkArrowUpRight />
              </Link>
            </p>
          </TranslatedLayout>

          <TranslatedLayout
            imageUrl="/img/ethereum-integration/image-4.webp"
            reverse
          >
            <h2 className="md:tw-heading-60 md:mb-6">
              Full protocol integration
            </h2>
            <p className="tw-lead-sm mb-6 md:mb-10">
              Full protocol-level integration involves realizing an on-chain
              Ethereum API on the Internet Computer that will enble smart
              contracts on the Internet Computer to call smart contracts on
              Ethereum and vice versa. This API will be enabled by running
              Ethereum full nodes next to each ICP replica on a large ICP
              subnet, and communicating with these subnets from the replicas
              through ICP consensus. This end-to-end framework for
              protocol-level integration with Ethereum is still in development,
              although individual Internet Computer technology features can
              already be combined to interact with Ethereum.
            </p>

            <p className="mb-0">
              <Link
                href="https://forum.dfinity.org/t/long-term-r-d-integration-with-the-ethereum-network/9382"
                className="link-primary link-with-icon"
              >
                Join the Ethereum Integration discussion <LinkArrowUpRight />
              </Link>
            </p>
          </TranslatedLayout>
        </section>
        {/* <AnimateSpawn
          className="mt-6 md:mt-10 bg-infinite"
          el={motion.section}
          variants={transitions.container}
        >
          <div className="container-12 ">
            <div className="relative">
              <div className="ml-auto w-7/10 sm:w-5/10 md:w-5/10 md:absolute top-0 right-0 bottom-0 flex">
                <img
                  src="/img/ethereum-integration/community.webp"
                  alt=""
                  loading="lazy"
                  className="object-contain object-center"
                />
              </div>

              <div className="md:container-10 px-8 pb-10 md:py-30 relative text-white">
                <div className="md:w-1/2">
                  <h2 className="tw-heading-4 md:tw-heading-60 md:mb-6">
                    ICP.Lab 6.0: X-Chain
                  </h2>
                  <p className="tw-paragraph md:tw-lead mb-8">
                    ICP Lab 6.0 xChain is a program is designed for teams and
                    individuals currently building cross-chain or multi-chain
                    applications on the Internet Computer blockchain. If you’re
                    striving towards a cross-chain future, leveraging ICP’s
                    unique capabilities, then this is the right program for you.
                  </p>
                  <ul className="list-none p-0">
                    <li>
                      Date & Location: January 22nd - 25th, 2024 in Zurich
                    </li>
                    <li>Application closes on December 15th, 2023</li>
                  </ul>
                  <p className="mb-0">
                    <Link
                      href="https://dashboard.internetcomputer.org/bitcoin/transactions"
                      className="link-primary link-with-icon"
                    >
                      Track TX activity on the ICP Dashboard
                      <LinkArrowUpRight />
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimateSpawn> */}
        <AnimateSpawn
          className="mt-20 md:mt-40"
          el={motion.section}
          variants={transitions.container}
        >
          <div className="container-10 ">
            <h2 className="mb-8 tw-heading-60">
              Build your own Ethereum
              <br />
              X-chain solution
            </h2>

            <VideoCard
              image="https://i.ytimg.com/vi/ZI5I36aioVw/maxresdefault.jpg"
              link="https://www.youtube.com/watch?v=ZI5I36aioVw"
              label="Tutorial"
              title="Interacting with Ethereum"
              description={
                <>
                  Interacting with Ethereum on the Internet Computer (Beta)
                  <br />
                  // Workshop
                </>
              }
            />
          </div>
        </AnimateSpawn>
        <section className="max-w-page relative mx-auto mb-20 px-6 md:mb-20 md:px-15 md:mt-40">
          <AnimateSpawn
            className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-8 md:mt-16 relative"
            variants={transitions.container}
          >
            <CardWithDescription
              title="ETH starter tutorial"
              description=""
              href="/docs/current/tutorials/developer-journey/level-5/5.2-ICP-ETH-tutorial"
            />

            <CardWithDescription
              title="Code ckETH"
              description=""
              href="https://github.com/dfinity/ic/tree/master/rs/ethereum/cketh"
            />
            <CardWithDescription
              title="DeFi sample code"
              description=""
              href="/samples?selectedDomains=Asynchronous+DeFi"
            />
            <CardWithDescription
              title="Get inspired by ETH projects on ICP"
              description=""
              href="/ecosystem?tag=Ethereum"
            />
            <motion.div
              className="blob blob-purple blob-md blob-x-5 blob-y-7 z-[-1] md:blob-lg"
              variants={transitions.fadeIn}
            ></motion.div>
          </AnimateSpawn>
        </section>
        <section className="pt-30 mb-20  md:pt-20 md:mb-30 " id="subscribe">
          <Newsletter
            fields={[
              {
                name: "EMAIL",
                placeholder: "Email",
                type: "email",
                required: true,
              },
            ]}
            ctaLabel="Get updates!"
            postUrl="https://dfinity.us16.list-manage.com/subscribe/post?u=33c727489e01ff5b6e1fb6cc6&amp;id=7e9469a315&amp;f_id=00bac2e1f0"
            decoration={
              <img
                src="/img/newsletter/email-image-2.webp"
                alt=""
                loading="lazy"
              />
            }
            className="mb-20 relative"
          >
            {/* <div className="hidden md:block blob blob-infinite blob-lg blob-top-right z-[-1]"></div> */}
            <h2 className="text-white tw-heading-5 md:tw-heading-4 mb-6 md:mb-8 md:pr-10">
              Sign up for email updates{" "}
              <span className="text-white-60">
                to keep up to date with the Internet Computer
              </span>
            </h2>
          </Newsletter>
        </section>
      </main>
    </Layout>
  );
}

export default EthereumIntegrationPage;
