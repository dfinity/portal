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
      title="WebAssembly"
      // fill in meta description
      description=""
    >
      <main className="text-black relative">
        <section className="overflow-hidden bg-infinite text-white">
          <DarkHeroStyles></DarkHeroStyles>
          <div className="container-10 pt-12 mb-30 md:mb-52 md:pt-36 relative">
            <div className="md:w-7/10">
              <h1 className="tw-heading-3 md:tw-heading-2 mb-6">WebAssembly</h1>
              <p className="tw-lead-sm md:tw-lead mb-0">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam
                ipsum ipsa praesentium dolore. Nostrum corrupti veniam totam
                labore, excepturi hic similique porro corporis rerum nihil modi
                perferendis tempora, tenetur doloremque!
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
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Voluptate, incidunt! Minus vel impedit dolorem explicabo cum culpa
              qui mollitia? Hic{" "}
              <Link href="/docs/current/references/ic-interface-spec/#ic-ecdsa_public_key">
                ECDSA API
              </Link>{" "}
              quod itaque possimus rem. Dolorum saepe veritatis nam voluptates?
            </p>
            <h3>Lorem ipsum dolor sit amet!</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam vero
              ut totam ad,{" "}
              <Link href="/docs/current/references/ic-interface-spec/#ic-bitcoin-api">
                Bitcoin API
              </Link>{" "}
              , consequatur, sequi doloribus error nulla odit perferendis culpa
              at in quos exercitationem possimus quaerat sit fugiat. current
              UTXO set.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor ex
              eos libero unde, maxime minus quae natus iste corporis placeat
              laboriosam inventore provident veritatis magni soluta nostrum
              voluptas officiis quia!
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
            Build with Lorem Ipsum
          </p>
          <p className="tw-lead-sm mb-2 text-center mx-auto md:mb-6 md:w-6/12">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Dignissimos nobis consequuntur aspernatur quam pariatur animi quod.
            Ullam omnis ducimus, aliquam dignissimos earum dolorum aspernatur
            aliquid atque exercitationem ipsa nobis. Nemo.
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
