import Link from "@docusaurus/Link";
import { CardWithDescription } from "@site/src/components/Common/Card";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import RightPointer from "@site/static/img/svgIcons/rightPointer.svg";
import Layout from "@theme/Layout";
import React from "react";

function FeaturePage() {
  return (
    <Layout
      title="Sovereign Network"
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
                Sovereign Network
              </h1>
              <p className="tw-lead-sm md:tw-lead mb-0">
                The Internet Computer blockchain network is hosted by special
                node machines, which are hardware devices that are dedicated to
                the task (thus creating a sovereign network). This is
                conceptually similar to how the internet is hosted by network
                routing devices.
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
              Traditional blockchains are different. Their network nodes are
              created using simple software, which interacts with other nodes
              and maintains a copy of blockchain state. Today, software programs
              are very easy to spin up on cloud computing "instances" using
              services such as Amazon Web Services. A consequence has been that
              the majority of their nodes are typically cloud computing
              instances. Because these can be spun up in an instant the
              investment required to create or destroy a node is minimal
              (notwithstanding any cryptocurrency stake that might be required
              to add a node to the network).
            </p>
            <h3>No reliance on cloud infrastructure</h3>
            <p>
              A grave risk with these kinds of architectures is that control
              over the blockchain network is handed to a small number of giant
              corporations. These corporations might decide they must switch off
              the nodes, owing to changes in regulation, or competitive threats,
              or malicious insiders might use their access to the physical cloud
              infrastructure to steal keys, or otherwise disrupt the networks.
            </p>

            <p>
              These issues do not exist with the Internet Computer, because it
              runs on a sovereign network.
            </p>

            <p>
              Every node in the Internet Computer network is a dedicated
              physical device, called a node machine, which is run by an
              independent node provider, typically from rack space in an
              independent data center. The nodes cannot therefore be switched
              off or tampered with by a small number of corporate cloud
              computing service providers.
            </p>

            <p>
              While this is an important advantage, there are other technical
              reasons that special node machines are required to participate in
              hosting the Internet Computer network. The node machines are built
              to standardized public hardware specifications. This means that
              when the network is under load, they do not fall behind other
              nodes inside the same subnet blockchain, which statistical
              deviation the network's decentralized governance DAO might notice,
              and sanction them for.
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
              title="Build dapps with the language of your choice"
              description="Install SDKs to build dapps."
              href="/docs/current/developer-docs/backend/choosing-language"
            />
            <CardWithDescription
              title="Sample Code"
              description="Learn about IC capabilities from community samples."
              href="/samples"
            />
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default FeaturePage;
