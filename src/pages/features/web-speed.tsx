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
      title="Web Speed"
      // fill in meta description
      description=""
    >
      <main className="text-black relative">
        <section className="overflow-hidden bg-infinite text-white">
          <DarkHeroStyles></DarkHeroStyles>
          <div className="container-10 pt-12 mb-30 md:mb-52 md:pt-36 relative">
            <div className="md:w-7/10">
              <h1 className="tw-heading-3 md:tw-heading-2 mb-6">Web speed</h1>
              <p className="tw-lead-sm md:tw-lead mb-0">
              Users can interact with dapps on the Internet Computer (IC) with speeds indistinguishable from traditional web applications. 
              Developers can therefore build a much broader range of fully on-chain dapps without relying on cloud services and 
              risking single points of failure. 
              <br />
              <br />
              Concretely, query (read) calls are answered in ~200 milliseconds, and update (write) calls in ~2 seconds.
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
            
            <h3>Read vs Write calls</h3>
            <p>
            common practice in computer science and databases is to separate tasks into read 
            tasks and write tasks. As the former are less 'expensive' in terms of time, 
            categorizing types of calls can substantially help to increase the efficiency 
            of a program. As a blockchain partly acts as a distributed database, it is 
            useful to consider this separation of tasks in this case too. 
            Following this line of thinking, the Internet Computer facilitates two type of 
            transactions, query calls (read-only) and update (write) calls.

            <br />
            <br />
            From a blockchain POV, {" "}
              <Link href="https://wiki.internetcomputer.org/wiki/Internet_Computer_performance_%26_power_consumption">
              performance tests
              </Link>{" "} shows the IC latency at 200 milliseconds 
            for query calls (reads) and 2 seconds for update calls (writes). 
            As of May 24, 2022, The Internet Computer can handle more than 1 million queries per second 
            and more than 20 thousand update calls per second.
            </p>
            <h3>Chain Key Cryptography</h3>
            <p>
            The main advantage of using a blockchain or decentralized protocol is that the 
            central point of trust is removed. This advantage comes at a cost; 
            trust is not removed, it's decentralized which means that multiple 
            people (or machines or nodes) need to agree on the 'truth' at a given point in 
            time. For multiple people/nodes to agree, they each sign their version of 
            the truth, and each verify all of the others' signatures. 

            <br />
            <br />
            In most blockchain protocols, this is the large source of inefficiency as 
            verifying many individual signatures can be slow. One of the key innovations 
            of the IC is the introduction of <Link href="https://medium.com/dfinity/chain-key-technology-one-public-key-for-the-internet-computer-6a3644901e28">
            Chain Key (CK) Cryptography
            </Link> which allows IC signatures to be verified with a single public key, hence reducing friction 
            for all types of devices (node machines, laptops, mobile phones) that want to 
            efficiently interact with a blockchain with the same speed and security of web2, 
            but without the centralization.
            </p>
            
            <h3>Scalability</h3>
            <p>
            Another advantage of CK Cryptography and the Internet Computer lies in the architectural 
            design. In order to reach web speed, the IC needs to process increasingly large 
            numbers of transactions. This requires the network to be able to scale quickly in 
            order to process all those transactions. CK cryptography also facilitates nodes to 
            onboard, catch up, and recover in the event of a hardware failure which all allow 
            the IC to scale infinitely. Decentralized infinity.
            </p>

            
            <p className="mb-3 mt-6">
            <Link
                href="https://internetcomputer.org/showcase/"
                className="tw-heading-6 flex gap-2 items-center"
              >
                <RightPointer className="w-6 h-6"></RightPointer>
                See other 100% on-chain dapps
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
              href="/docs/current/developer-docs/quickstart/hello10mins."
            />
            <CardWithDescription
              title="Build dapps with the language of your choice"
              description="Install SDKs to build dapps."
              href="/docs/current/developer-docs/build/cdks/"
            />
            <CardWithDescription
              title="Sample Code"
              description="Learn about IC capabilities from community samples."
              href="/samples"
            />
            <CardWithDescription
              title="IC Wiki"
              description="Take a deep dive into the Internet Computer."
              href="https://wiki.internetcomputer.org"
            />
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default FeaturePage;
