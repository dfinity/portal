import Link from "@docusaurus/Link";
import { CardWithDescription } from "@site/src/components/Common/Card";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import RightPointer from "@site/static/img/svgIcons/rightPointer.svg";
import Layout from "@theme/Layout";
import React from "react";

function FeaturePage() {
  return (
    <Layout
      title="Actor Model"
      // fill in meta description
      description=""
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <main className="text-black relative">
        <section className="overflow-hidden bg-infinite text-white">
          <DarkHeroStyles></DarkHeroStyles>
          <div className="container-10 pt-12 mb-30 md:mb-52 md:pt-36 relative">
            <div className="md:w-7/10">
              <h1 className="tw-heading-3 md:tw-heading-2 mb-6">Actor Model</h1>
              <p className="tw-lead-sm md:tw-lead mb-0">
                A single canister smart contract has one thread of execution for
                updates, but the Internet Computer can execute a massive number
                of canisters in parallel. In addition, we make a distinction
                between requests that need to update the state of a canister,
                and queries, which cannot modify the state of a canister.
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
              The programming model of the Internet Computer consists of
              memory-isolated canisters communicating by asynchronous message
              passing of binary data encoding Candid values. A canister
              processes its messages one-at-a-time, preventing race conditions.
              A canister uses call-backs to register what needs to be done with
              the result of any inter-canister messages it issues.
            </p>
            <h3>Canisters as actors</h3>
            <p>
              The actor model is a mathematical model of concurrent computation,
              where, in response to a message, an actor can modify its state,
              send messages, and create more actors.
            </p>

            <p>
              A canister is like an actor in many respects. For example, an
              actor has:
            </p>

            <ul>
              <li>
                a private state that can only be modified by the canister itself
              </li>
              <li>
                a single thread of execution, so it does not need lock-based
                synchronization
              </li>
              <li>
                the ability to communicate with other canisters through
                asynchronous messages
              </li>
              <li>the ability to create new canisters</li>
            </ul>

            <p>
              An important difference between traditional actors and canisters
              is that canisters on the Internet Computer have bidirectional
              message passing. Messages are divided into requests and responses,
              where requests can be replied to and the Internet Computer keeps
              track of the callback for responses.
            </p>

            <p>
              In actor terminology, each actor has a mailing address that is
              used to receive messages. A canister also has a mailing address,
              which happens to look similar to an IPv6 address.
            </p>

            <p>
              While a canister's update throughput is limited by consensus of
              the blockchain and the single thread of execution, a canister can
              serve hundreds of queries concurrently, achieving throughput in
              the order of thousands of queries per second, and latency measured
              in milliseconds.
            </p>

            <p>
              To complete this picture, it should be added that end users also
              participate as actors in the model. This means that browsers and
              mobile apps can directly perform update and query operations on
              canisters.
            </p>

            <p>
              In addition, the Motoko programming language, which is tailored to
              the Internet Computer, is inspired by the actor model.
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
              title="'Parallelism' article on the IC Wiki"
              description="Learn about how actor model on the IC can can achieve parallelism."
              href="https://wiki.internetcomputer.org/wiki/Parallelism"
            />
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default FeaturePage;
