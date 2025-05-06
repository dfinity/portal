import Link from "@docusaurus/Link";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";
import React, { useRef } from "react";
import AnimateSpawn from "@site/src/components/Common/AnimateSpawn";
import { CardWithDescription } from "@site/src/components/Common/Card";
import LinkArrowUpRight from "@site/src/components/Common/Icons/LinkArrowUpRight";
import ShareMeta from "@site/src/components/Common/ShareMeta";
import TranslatedLayout from "@site/src/components/Common/TranslatedLayout/TranslatedLayout";
import { useDarkHeaderInHero } from "@site/src/utils/use-dark-header-in-hero";

function WebAssemblyPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const isDark = useDarkHeaderInHero(heroRef);

  return (
    <Layout
      title="WebAssembly on ICP"
      description="An advantage of the Internet Computer blockchain is its use of WebAssembly for executing smart contracts and decentralized applications — written in a wide variety of languages that compile to WebAssembly."
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <ShareMeta image="/img/shareImages/share-webassembly.jpg"></ShareMeta>

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
            className="container-10 pt-20 pb-40 md:pb-52 md:pt-36 relative"
            variants={transitions.container}
          >
            <div className="blob blob-white blob-xl md:blob-xl md:blob-x-8 md:blob-y-10 opacity-100"></div>
            <div className="md:w-7/10 relative">
              <motion.h1
                className="tw-heading-3 md:tw-heading-2 mb-2 md:mb-6"
                variants={transitions.item}
              >
                WebAssembly <br className="md:hidden" />
                on ICP
              </motion.h1>
              <motion.p
                className="tw-lead-sm md:tw-lead mb-8"
                variants={transitions.item}
              >
                An advantage of the Internet Computer blockchain is its
                use of WebAssembly for executing smart contracts and
                decentralized applications — written in a wide variety of
                languages that compile to WebAssembly.
              </motion.p>
            </div>
          </AnimateSpawn>
        </section>

        <AnimateSpawn
          className="container-12 relative"
          el={motion.section}
          variants={transitions.fadeIn}
        >
          <div className="text-center md:w-5/10 relative md:absolute top-30 sm:top-40 md:top-0 -translate-y-1/2 right-0 -mt-30 md:-mt-24">
            <img
              src="/img/webassembly/webassembly-hero-image.webp"
              alt=""
              className="w-full max-w-sm sm:max-w-lg md:max-w-none"
            />
          </div>
        </AnimateSpawn>
        <AnimateSpawn
          className="container-10 md:mt-30 relative"
          el={motion.section}
          variants={transitions.container}
        >
          <div className="md:w-6/10">
            <motion.h2
              className="tw-heading-5 sm:tw-heading-4 md:tw-heading-3 mb-3 md:mb-10 text-gradient"
              variants={transitions.item}
            >
              WebAssembly was designed from the ground up to be secure, safe,
              and fast. Such characteristics enable the Internet Computer to run
              scalable decentralized applications for clients and enterprises.
            </motion.h2>

            <motion.p className="mb-0" variants={transitions.item}>
              <Link href="https://medium.com/dfinity/webassembly-on-the-internet-computer-a1d0c71c5b94" className="link-primary link-with-icon">
                Read how Internet Computer uses WebAssembly
                <LinkArrowUpRight />
              </Link>
            </motion.p>
          </div>
        </AnimateSpawn>

        <section className="container-12 py-30 md:py-48">
          <div className="flex flex-col gap-16 md:gap-40">
            <TranslatedLayout
              imageUrl="/img/webassembly/image-1.webp"
              reverse={true}
            >
              <h3 className="tw-heading-4 md:tw-heading-60 mb-6">
                Why WebAssembly
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-0">
                The Internet Computer executes the code of an application on
                multiple decentralized nodes, which are operated by node providers who are selected and vetted by the NNS token holders. This replicated
                execution works even in the presence of untrusted and
                malicious nodes. A critical property for replicated execution is
                its determinism, which refers to executing identical code with
                the same inputs, invariably yielding the same result. This
                deterministic execution is a fundamental feature upon which the
                Internet Computer depends, and it's a guarantee provided by
                WebAssembly.
                <br />
                <br />
                WebAssembly is becoming a de-facto standard for secure and safe
                computation, with benefits for both the server side of systems
                and the client browser side. Its ecosystem is continuously
                growing thanks to contributions from industry, academia, and
                open source enthusiasts. The Internet Computer is a secure
                platform to run server WebAssembly components and code in a more
                distributed and secure execution environment where developers
                and enterprises can leverage all this work to build powerful
                decentralized applications.
              </p>
            </TranslatedLayout>
            <TranslatedLayout imageUrl="/img/webassembly/image-2.webp">
              <h3 className="tw-heading-4 md:tw-heading-60 mb-6">
                WebAssembly and Cloud
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-10">
                The Internet Computer aims to bring decentralization and
                statefulness to cloud computing. Conversely, it can be also
                viewed as bringing cloud features such as fast, scalable,
                general-purpose computation into the domain of blockchain.
                WebAssembly is well suited for this mission because it is a
                general-purpose, sandboxed virtual machine that was designed to
                be secure, safe, fast, and deterministic.
              </p>
              <p className="mb-0">
                <Link
                  href="https://medium.com/dfinity/the-internet-computer-a-blockchain-that-offers-stateful-decentralized-serverless-computing-cdbbfdca4b7e"
                  className="link-primary link-with-icon"
                >
                  Read about cloud computing on ICP
                  <LinkArrowUpRight />
                </Link>
              </p>
            </TranslatedLayout>
            <TranslatedLayout
              imageUrl="/img/webassembly/image-3.webp"
              reverse={true}
            >
              <h3 className="tw-heading-4 md:tw-heading-60 mb-6">
                WebAssembly vs EVM
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-10">
                WebAssembly and EVM are similar in the sense that they both are
                virtual machines for blockchains. The main difference is that
                WebAssembly is general-purpose and supports many programming
                languages. WebAssembly on the Internet Computer provides several
                orders of magnitudes higher compute and storage capacity to its
                applications.
                <br />
                <br />
                Since WebAssembly is more expressive and performant, it can even
                emulate an EVM. This approach is currently being explored by
                Bitfinity EVM, an ICP community project.
              </p>
              <Link
                className="link-primary link-with-icon"
                href="https://docs.bitfinity.network"
              >
                Check out Bitfinity EVM
                <LinkArrowUpRight />
              </Link>
            </TranslatedLayout>
          </div>
        </section>

        <AnimateSpawn
          className="container-12 pb-30 relative"
          el={motion.section}
          variants={transitions.container}
        >
          <div className="text-center md:mx-auto md:w-5/10">
            <motion.h2
              className="tw-heading-3 md:tw-heading-60 mb-6 md:mb-8"
              variants={transitions.item}
            >
              Joining forces to develop WebAssembly
            </motion.h2>
            <motion.p
              className="tw-lead-sm md:tw-lead mb-0"
              variants={transitions.item}
            >
              Contributing to open standards, enhancing performance, and
              fostering collaborative research.
            </motion.p>
          </div>

          <div className="flex flex-col gap-5 mt-6 md:mt-8 md:flex-row md:items-start">
            <motion.div
              className="flex-1 bg-white/90 border border-white border-solid rounded-xl p-6 text-center md:p-12 flex flex-col gap-3 items-center"
              variants={transitions.item}
            >
              <img
                src="/img/webassembly/logo-1.webp"
                alt="Bytecode Alliance"
                loading="lazy"
                className="w-60"
              />
              <h3 className="tw-lead-lg md:tw-title-sm mb-0">
                Bytecode Alliance
              </h3>
              <p className="tw-paragraph-sm mb-0 text-black/60">
                DFINITY is a member of the Bytecode Alliance, an organization
                that develops the Wasmtime runtime, which is a high-performance
                implementation of the WebAssembly standard.
              </p>
              <p className="mb-0">
                <Link
                  href="https://bytecodealliance.org/articles/wasmtime-1-0-fast-safe-and-production-ready"
                  className="link-primary link-with-icon"
                >
                  About Wasmtime 1.0
                  <LinkArrowUpRight />
                </Link>
              </p>
            </motion.div>
            <motion.div
              className="flex-1 bg-white/90 border border-white border-solid rounded-xl p-6 text-center md:p-12 flex flex-col gap-3 items-center md:mt-30"
              variants={transitions.item}
            >
              <img
                src="/img/webassembly/logo-2.webp"
                alt="Open Standard"
                loading="lazy"
                className="w-60"
              />
              <h3 className="tw-lead-lg md:tw-title-sm mb-0">Open Standard</h3>
              <p className="tw-paragraph-sm mb-0 text-black/60">
                WebAssembly was co-designed by Andreas Rossberg, who also
                contributed to the development of the WebAssembly standard. The
                open standard is overseen by the World Wide Web Consortium
                (W3C), an organization with over 400 members, including DFINITY.
              </p>
              <p className="mb-0">
                <Link
                  href="https://www.w3.org/membership/list/"
                  className="link-primary link-with-icon"
                >
                  Check out W3C
                  <LinkArrowUpRight />
                </Link>
              </p>
              <p className="mb-0">
                <Link
                  href="https://people.mpi-sws.org/~rossberg/"
                  className="link-primary link-with-icon"
                >
                  Andreas Rossberg
                  <LinkArrowUpRight />
                </Link>
              </p>
            </motion.div>
            <motion.div
              className="flex-1 bg-white/90 border border-white border-solid rounded-xl p-6 text-center md:p-12 flex flex-col gap-3 items-center"
              variants={transitions.item}
            >
              <img
                src="/img/webassembly/logo-3.webp"
                alt="WebAssembly Research Center"
                loading="lazy"
                className="w-60"
              />
              <h3 className="tw-lead-lg md:tw-title-sm mb-0">
                WebAssembly Research Center
              </h3>
              <p className="tw-paragraph-sm mb-0 text-black/60">
                DFINITY is a founding member of the WebAssembly Research Center
                at Carnegie Mellon University (CMU). Under the direction of Ben
                Titzer, a co-designer of WebAssembly, this Center is the first
                to bring together researchers from academia and industry to
                explore the potential of the platform and its emerging
                applications.
              </p>
              <p className="mb-0">
                <Link
                  href="https://www.cs.cmu.edu/news/2023/webassembly-research-center"
                  className="link-primary link-with-icon"
                >
                  Read the press release
                  <LinkArrowUpRight />
                </Link>
              </p>
            </motion.div>
          </div>
        </AnimateSpawn>

        <section className="max-w-page relative mx-auto mb-20 px-6 md:mb-40 md:px-15 mt-0 md:mt-40">
          <AnimateSpawn
            className=" relative text-white"
            variants={transitions.container}
          >
            <motion.div
              className="blob blob-purple blob-sm blob-x-5 blob-y-7 z-[-1] md:blob-xl"
              variants={transitions.fadeIn}
            ></motion.div>
            <motion.h2
              className="tw-heading-3 text-center mb-2 w-full mx-auto md:tw-heading-60 md:mb-6 lg:w-6/12"
              variants={transitions.item}
            >
              Canister Development Kits
            </motion.h2>
            <motion.p
              className="tw-lead-sm md:tw-lead md:w-5/12 md:mx-auto text-center"
              variants={transitions.item}
            >
              WebAssembly allows ICP developers to write canister smart
              contracts in any of these programming languages
            </motion.p>
          </AnimateSpawn>

          <AnimateSpawn
            className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-8 md:mt-16"
            variants={transitions.container}
          >
            <CardWithDescription
              title="Rust"
              description="Offers high performance, and many libraries that the Rust community developed over the years. Supported, and maintained by DFINITY."
              href="/docs/building-apps/developer-tools/cdks/rust/intro-to-rust"
            />

            <CardWithDescription
              title="Motoko"
              description="The Internet Computer’s native language, designed to support all features ICP has to offer, and has a less steep learning curve compared to Rust. Supported, and maintained by DFINITY."
              href="/docs/motoko/home"
            />
            <CardWithDescription
              title="TypeScript"
              description="Developed by Demergent Labs, Azle is a TypeScript CDK for the Internet Computer enabling developers to write canisters using JavaScript."
              href="https://github.com/demergent-labs/azle"
            />
            <CardWithDescription
              title="Python"
              description="Developed by Demergent Labs, Kybra is a Python CDK for the Internet Computer. In other words, it's a Python runtime for building canisters on ICP."
              href="https://github.com/demergent-labs/kybra"
            />
          </AnimateSpawn>
        </section>
      </main>
    </Layout>
  );
}

export default WebAssemblyPage;
