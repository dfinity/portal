import Link from "@docusaurus/Link";
import { CardWithDescription } from "@site/src/components/Common/Card";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import RightPointer from "@site/static/img/svgIcons/rightPointer.svg";
import Layout from "@theme/Layout";
import React from "react";

function FeaturePage() {
  return (
    <Layout
      title="Multi-block TXs"
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
                Multi-block TXs
              </h1>
              <p className="tw-lead-sm md:tw-lead mb-0">
                The Internet Computer blockchain can stretch the execution of a
                single transaction across multiple blocks. This allows very-long
                running smart contract computations to be initiated.
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
            <h2>ICP's multi-block transaction capabilities are rare</h2>
            <p>
              Traditional blockchains that host smart contracts always need to
              finish processing a transaction within a single block. In practice,
              this means that when a smart contract function is invoked by a
              transaction, it must complete execution within the per-block "gas
              limit" (gas is the equivalent of cycles on the Internet Computer).
            </p>

            <p>
              The Internet Computer is designed to allow any online system or
              service to be built using smart contracts called canisters, to
              support a "blockchain singularity." This means that when a
              transaction invokes a smart contract, the computation involved
              must be able to run for a very long time if required, and consume
              as many computational cycles as needed.
            </p>

            <p>
              This means that on the Internet Computer, a smart contract is
              capable of performing complex AI calculations, or applying a
              graphical filter to an image, say — although there is still a "max
              cycles limit," it's just very high.
            </p>

            <p>
              Multi-block TXs are made possible by a broader aspect of the
              Internet Computer's design, called Deterministic Time Slicing
              (DTS).
            </p>

            <p className="mb-3 mt-6">
              <Link
                href="/developers"
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
            Get started today
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-8 md:mt-20">
            {/* add or remove CardWithDescription components on demand */}

            <CardWithDescription
              title="Sample Code"
              description="Learn about IC capabilities from community samples."
              href="/samples"
            />
            <CardWithDescription
              title="Deterministic Time Slicing Discussion"
              description="Join the forum dicussion"
              href="https://forum.dfinity.org/t/deterministic-time-slicing/10635"
            />
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default FeaturePage;
