import Link from "@docusaurus/Link";
import { resetNavBarStyle } from "@site/src/utils/reset-navbar-style";
import ArrowRight from "@site/static/img/arrow-right.svg";
import React from "react";

export default function Hero(): JSX.Element {
  return (
    <section className="overflow-hidden relative z-10" id="home">
      <div className="container-10 mt-10 mb-20 md:my-30">
        <h1 className="tw-heading-3 md:tw-heading-2 mb-6 md:mb-8 text-transparent bg-clip-text gradient-text md:w-6/10">
          World Computer Blockchain
        </h1>
        <div className="md:ml-1/10 w-10/10 md:w-5/10">
          <p className="tw-lead-sm md:tw-lead mb-8">
            The Internet Computer provides World Computer functionality. Any
            online system or web3 service can be built 100% on-chain, in fully
            decentralized form, using smart contracts that serve web
            experiences, create transactions on other blockchains, and have
            20,000x greater efficiency. Powered by breakthrough Chain Key
            Crypto.
          </p>
          <p className="mb-6">
            <Link href="" className="button-primary">
              Create your Internet Identity
            </Link>
          </p>
          <p>
            <Link className="link-primary inline-flex items-center gap-2">
              <ArrowRight></ArrowRight>
              Start coding
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
