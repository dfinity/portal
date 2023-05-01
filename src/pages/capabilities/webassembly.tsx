import Link from "@docusaurus/Link";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import Layout from "@theme/Layout";
import React from "react";

function FeaturePage() {
  return (
    <Layout
      title="WebAssembly"
      // fill in meta description
      description=""
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <main className="text-black relative">
        <section className="overflow-hidden bg-infinite text-white">
          <DarkHeroStyles></DarkHeroStyles>
          <div className="container-10 pt-12 mb-30 md:mb-52 md:pt-36 relative">
            <div className="md:w-7/10">
              <h1 className="tw-heading-3 md:tw-heading-2 mb-6">WebAssembly</h1>
              <p className="tw-lead-sm md:tw-lead mb-0">
                WebAssembly is a virtual machine (VM) designed for client,
                server and blockchain applications. It is used to run canister
                smart contracts on the Internet Computer (IC). WebAssembly runs
                portable byte code instructions that are created by compiling
                software code written in programming languages such as Rust and
                Motoko. Because it's faster, more efficient, and more portable
                than the alternatives, WebAssembly is key to building efficient
                applications on the internet.
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
            <h2>
              WebAssembly has quickly established itself as the internet's
              favorite virtual machine.{" "}
            </h2>

            <h3>WebAssembly used in the IC</h3>
            <p>
              WebAssembly (or "WASM") was co-designed by Andreas Rossberg, who
              joined the Dfinity Foundation early in 2017 to work on its
              canister smart contract execution environment, and the Motoko
              language. The standard is maintained by the{" "}
              <Link href="https://en.wikipedia.org/wiki/World_Wide_Web_Consortium">
                World Wide Web Consortium.
              </Link>{" "}
            </p>

            <p>
              The Internet Computer uses the WebAssembly VM to run its canister
              smart contracts for a number of reasons, including:
            </p>

            <ul>
              <li>It is formally specified, which increases its security.</li>
              <li>
                It provides near-native performance, greatly improving smart
                contract efficiency.
              </li>
              <li>
                It is targeted by LLVM, which means large numbers of programming
                languages can easily be used for smart contract creation.
              </li>
              <li>
                It has been very widely adopted as the new standard for
                computation on the Web, and consequently a massive decentralized
                R&D effort constantly evolves and improves the standard, and a
                large variety of virtual machine implementations have been
                created.
              </li>
            </ul>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default FeaturePage;
