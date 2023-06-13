import React from "react";
import Layout from "@theme/Layout";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import Link from "@docusaurus/Link";
import RightPointer from "@site/static/img/svgIcons/rightPointer.svg";
import {
  CardWithBackground,
  CardWithDescription,
} from "@site/src/components/Common/Card";
import ShareMeta from "../components/Common/ShareMeta";
import TranslatedLayout from "../components/Common/TranslatedLayout/TranslatedLayout";
import LinkArrowUpRight from "../components/Common/Icons/LinkArrowUpRight";

function HTTPSOutcalls() {
  return (
    <Layout
      title="HTTPS Outcalls"
      description="The power of HTTPS outcalls on the Internet Computer lies in
      their ability to connect smart contracts directly to the Web 2.0
      world, opening up a plethora of use cases."
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <ShareMeta image="/img/shareImages/share-https-outcalls.jpeg"></ShareMeta>

      <main className="text-black relative">
        <section className="overflow-hidden bg-infinite text-white">
          <DarkHeroStyles></DarkHeroStyles>
          <div className="container-10 pt-12 mb-30 md:mb-52 md:pt-36 relative">
            <div className="md:w-7/10">
              <h1 className="tw-heading-3 md:tw-heading-2 mb-6">
                HTTPS outcalls
              </h1>
              <p className="tw-lead-sm md:tw-lead mb-0">
                The power of HTTPS outcalls on the Internet Computer lies in
                their ability to connect smart contracts directly to the Web 2.0
                world, opening up a plethora of use cases. Retrieve market data
                from crypto exchanges, send emails, integrate with other
                blockchains, and more.
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
            <h2>How it works</h2>
            <p>
              Today, the majority of the world's API-accessible data, such as
              stock prices, football scores, IoT-related data, or crypto
              exchange prices, is hosted on Web 2.0 services, which is outside
              the secure on-chain walls of a blockchain. As smart contract
              software often relies on external web 2-hosted data to implement
              useful functionality, it is crucial that this data be accessible,
              first to unfold the full potential of smart contracts, and second,
              to pave the way for blockchain singularity, whereby the majority
              of computations run on the blockchain.
            </p>
            <h3>The oracle problem</h3>
            <p>
              A common limitation of blockchain technology is that smart
              contracts can receive messages, but cannot send them to the world
              outside the blockchain. For example, typical smart contracts can
              receive messages, but cannot send emails and SMS's, nor can they
              query wikipedia or send HTTP requests to other services.
              Historically, this has been a blocker to most software developers
              diving into Web3. For this reason, obtaining off-chain data
              requires that a smart contract interact with centralized oracle
              services, which are in the hands of intermediaries, vulnerable to
              hacking, and subject to service fees.
            </p>

            <h3>HTTPS outcalls replace oracles</h3>
            <p>
              Canister HTTPS outcalls on the Internet Computer blockchain allow
              direct interaction with Web 2.0 and other blockchains without
              oracles. Canister smart contracts can make HTTPS outcalls to
              specified URLs to directly obtain off-chain data, or to interact
              with off-chain systems, such as Web 2.0 services or enterprise IT
              infrastructure.
            </p>
            <p className="mb-3 mt-6">
              <Link
                href="https://wiki.internetcomputer.org/wiki/HTTPS_outcalls"
                className="tw-heading-6 flex gap-2 items-center"
              >
                <RightPointer className="w-6 h-6"></RightPointer>
                Visit the Wiki for more details
              </Link>
            </p>
          </div>
        </section>
        <section className="mb-20 md:mb-40 container-12 flex flex-col gap-16 md:gap-40">
          <TranslatedLayout
            reverse={true}
            imageUrl="/img/https-outcalls/outcalls.webp"
          >
            <h2 className="tw-heading-4 md:tw-heading-60 md:mb-6">
              Exchange rate canister
            </h2>
            <p className="tw-lead-sm mb-6 md:mb-10">
              Powered by HTTPS outcalls, the exchange rate canister (XRC) on the
              Internet Computer fetches data from Web 2.0 servers and lives
              entirely on chain. It interacts with major cryptocurrency
              exchanges using their public APIs to retrieve real-time or
              historical pricing information. The XRC also periodically queries
              public APIs of foreign exchange data providers around the world to
              get forex rates. The XCR can be integrated in DEXs to compare
              exchange rates against market rates and determine the value of
              assets held under management in a canister smart contract, for
              example, with respect to a fiat currency.
            </p>
            <p className="mb-6">
              <Link
                href="https://github.com/dfinity/exchange-rate-canister"
                className="link-primary link-with-icon"
              >
                Power your dapp with the XRC
                <LinkArrowUpRight />
              </Link>
            </p>
            <p className="mb-0">
              <Link
                href="https://medium.com/dfinity/exchange-rate-canister-a-smart-contract-with-oracle-capabilities-f30694753c89"
                className="link-primary link-with-icon"
              >
                Read the blog
                <LinkArrowUpRight />
              </Link>
            </p>
          </TranslatedLayout>
        </section>
        <section className="max-w-page relative mx-auto mb-20 px-6 md:mb-40 md:px-15">
          <p className="tw-heading-4 text-center mb-2 w-full mx-auto md:tw-heading-2 md:mb-6 lg:w-8/12">
            Build with HTTPS outcalls
          </p>
          <p className="tw-lead-sm mb-2 text-center mx-auto md:mb-6 md:w-6/12">
            Connect smart contracts directly with Web 2.0 to interact with other
            blockchains or to fetch IoT-related data, stock exchange prices,
            weather forecasts, etc. – all without introducing additional trust
            assumptions.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-8 md:mt-20">
            <CardWithDescription
              title="Dev docs"
              description="Start integrating the HTTPS outcalls feature in your dapps and services to connect to off-chain data."
              href="https://internetcomputer.org/docs/current/developer-docs/integrations/https-outcalls/"
            />
            <CardWithDescription
              title="Beyond oracles"
              description="Read the Medium blog why HTTPS outcalls are  important for blockchains. "
              href="https://bit.ly/3BQRBqI"
            />
            <CardWithBackground
              title="Sample Code"
              description="Build a dapp with canister outgoing HTTPS outcalls"
              href="/samples?term=https+outcalls"
              bgImageClass={"bg-https-outcalls"}
            />
            <CardWithDescription
              title="ICP Wiki"
              description="Get a high-level overview of how HTTPS outcalls work on the Internet Computer."
              href="https://wiki.internetcomputer.org/wiki/HTTPS_outcalls"
            />
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default HTTPSOutcalls;
