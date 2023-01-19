import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import AnimateSpawn from "@site/src/components/Common/AnimateSpawn";
import Breadcrumbs from "@site/src/components/Common/Breadcrumbs";
import LinkArrowRight from "@site/src/components/Common/Icons/LinkArrowRight";
import { resetNavBarStyle } from "@site/src/utils/reset-navbar-style";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";
import React, { ReactNode } from "react";
import slugify from "slugify";
import transitions from "@site/static/transitions.json";
import { SmallCardWithDescription } from "@site/src/components/Common/Card";

const MotionLink = motion(Link);

const Faq: React.FC<{ title: string; children: ReactNode; id?: string }> = ({
  children,
  title,
  id,
}) => {
  console.log(children);

  return (
    <article
      className=""
      id={id || slugify(title, { lower: true, strict: true })}
    >
      <h2 className="tw-heading-5 md:tw-heading-3 mb-6">{title}</h2>
      <div
        className="
          tw-paragraph md:tw-lead-sm
          prose
          max-w-none
          prose-h3:tw-heading-6 prose-h3:md:tw-heading-5 prose-h3:mb-4
          prose-p:tw-paragraph md:prose-p:tw-lead-sm prose-p:mb-3
          prose-img:mb-0 prose-img:mt-2
          prose-a:font-normal hover:prose-a:text-infinite hover:prose-a:no-underline
          prose-ul:mb-4 prose-ul:list-none prose-ul:pl-0 prose-ul:tw-paragraph md:prose-ul:tw-lead-sm
          prose-li:bg-[url('/img/checkmark.svg')] prose-li:bg-no-repeat prose-li:bg-left-top prose-li:pl-8 prose-li:my-3 prose-li:tw-paragraph prose-li:md:tw-lead-sm
      "
      >
        {children}
      </div>
    </article>
  );
};

const FaqSection: React.FC<{ title: ReactNode; children: ReactNode }> = ({
  children,
  title,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:gap-1/12">
      <div className="md:w-4/12 flex-shrink-0">
        <div className="md:sticky md:top-10">{title}</div>
      </div>
      <div className="flex flex-col gap-12 md:gap-20 relative">{children}</div>
    </div>
  );
};

function SnsFaqPage() {
  resetNavBarStyle();
  return (
    <Layout
      title="DAO crypto evolved"
      description="An SNS is an advanced form of a DAO. A digital democracy that can run any dapp such as a social network in a fully decentralized way, fully on chain. No corporation, no board of directors, no CEO required."
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <Head>
        <meta
          property="og:image"
          content={"https://internetcomputer.org/img/shareImages/share-sns.jpg"}
        />
        <meta
          name="twitter:image"
          content={"https://internetcomputer.org/img/shareImages/share-sns.jpg"}
        />
      </Head>
      <main className="text-black relative" style={{ contain: "paint" }}>
        <section className="container-10 mb-16 md:mb-30 md:pt-8">
          <Breadcrumbs
            links={[
              {
                href: "/sns",
                text: "SNS",
              },
              {
                text: " What you need to know about SNS DAOs",
              },
            ]}
          ></Breadcrumbs>
          <h1 className="tw-heading-3 md:tw-heading-2 mt-12 md:mt-32 md:w-8/10">
            What you need to know about SNS DAOs
          </h1>
        </section>
        <section className="container-12 flex flex-col gap-30 ">
          <FaqSection
            title={
              <div className="relative mb-20">
                <div className="blob blob-sm md:blob-md blob-bottom-left -bottom-20 blob-infinite z-[-1] opacity-90"></div>
                <img src="/img/sns/faq-1.svg" className="w-full pr-2/12"></img>
              </div>
            }
          >
            <Faq title="What is a DAO?">
              <p>
                DAO stands for <strong>D</strong>ecentralized <strong>A</strong>
                utonomous <strong>O</strong>rganization. Simply put, a DAO is an
                organization formed by smart contracts where the members
                (typically token holders) collectively decide how the
                organization or the product evolves. Example scenarios:
              </p>
              <ul>
                <li>
                  10,000 token holders each deposit crypto into a smart contract
                  and vote on what to purchase with the total.
                </li>
                <li>
                  1 million token holders control a decentralized version of
                  Twitter where token holders propose and vote on feature
                  updates.
                </li>
              </ul>

              <p>
                A DAO can take the role of carrying out community-driven
                decisions on when and how to update the code that shapes the
                organization or product.
              </p>
            </Faq>

            <Faq title="What is an SNS?">
              <p>
                SNS stands for <strong>S</strong>ervice <strong>N</strong>
                ervous
                <strong>S</strong>ystem. An SNS is an advanced form of DAO that
                allows communities to govern decentralized apps (dapps) on the
                Internet Computer (ICP). Main things to note about SNS:
              </p>
              <ul>
                <li>
                  The design of SNS is similar to that of the{" "}
                  <Link href="https://nns.ic0.app">
                    <strong>N</strong>etwork <strong>N</strong>ervous{" "}
                    <strong>S</strong>ystem (NNS)
                  </Link>
                  , which is the on-chain DAO that governs the whole ICP.
                </li>
                <li>
                  SNS dapps are controlled by the members of its DAO submitting
                  and voting on on-chain proposals. No one developer or group of
                  people controls the dapp, rather the dapp is controlled by
                  voting via tokens.
                </li>
                <li>
                  There can be many SNSs on ICP. A developer can turn any dapp
                  they control on ICP into an SNS by handing the control of
                  their dapp entirely over to an SNS DAO.
                </li>
              </ul>
            </Faq>

            <Faq title="What does an SNS DAO solve?">
              <p>
                SNS DAOs serve as a vehicle to deliver fully decentralized
                online services that are owned and governed by their
                communities.{" "}
              </p>
              <p>Where this fits in broader Web3: </p>
              <p>
                DAOs are growing form of organization for accomplishing goals.
                For example, in the ETH ecosystem, Uniswap and MakerDAO are
                popular DAOs with billions of locked in their respective smart
                contracts. However,{" "}
                <strong>
                  <em>
                    ICP is unique in that it can host fully-on chain dapps
                  </em>
                </strong>{" "}
                (frontend, backend application logic, and state), so DAOs in in
                ICP are unique in that they can fully control (via voting) every
                aspect of a dapp, since everything is on-chain.{" "}
              </p>
            </Faq>
            <Faq title="What are the advantages of SNS DAOs? ">
              <p>
                SNS DAOs facilitate a healthy exchange between developers,
                entrepreneurs, end users and VC’s. Some advantages include:{" "}
              </p>
              <ul>
                <li>
                  <strong>Community Engagement:</strong> as co-creators of the
                  product, users become core contributors, developers deliver on
                  value proposition.{" "}
                </li>
                <li>
                  <strong>Speedy User Adoption:</strong> As co-creators, users
                  become the biggest advocates of the product.
                </li>
                <li>
                  <strong>Funding:</strong> projects are funded through a
                  community-driven decentralization sale.
                </li>
              </ul>
            </Faq>
            <Faq title="What is SNS-1?">
              SNS-1 is the first SNS DAO that DFINITY launched on the mainnet to
              test an SNS decentralization sale with involvement of the ICP
              community. The SNS-1 test exposed areas of improvement, which are
              currently being addressed. The SNS-1 dapp is now controlled by the
              community of token holders who will collectively determine its
              future. Since SNS-1 is a test, it is unusual among SNS that it was
              launched as a blank canvas without a product or developer team.
              Future SNSs will likely be derived from established ICP dapps.
              SNS-1 tokens are available on{" "}
              <Link href="https://avjzx-pyaaa-aaaaj-aadmq-cai.raw.ic0.app/ICDex/SNS1/ICP">
                ICDex
              </Link>
              .
            </Faq>
            <Faq title="Are there other existing SNS DAOs?">
              The ICP community has expressed much interest and enthusiasm for
              the launch of the SNS. OpenChat has already publicly announced
              their plans to turn their dapp into an SNS DAO in Q1 of 2023.
              Dapps like distrikt, Catalyze, Canistore, Nuance are considering
              creating their own SNSs.
            </Faq>
          </FaqSection>
          <FaqSection
            title={
              <h2 className="tw-heading-3 text-gradient mb-12 md:mb-0 md:tw-heading-60">
                How to Participate in an SNS DAO
              </h2>
            }
          >
            <Faq title="In what ways can you participate in an SNS DAO?">
              Once you have acquired SNS tokens, you can lock them into SNS
              neurons and create a proposal or vote on one. Depending on the SNS
              configuration, users who vote may be rewarded with additional
              tokens for participating in governance. If you want to get more
              deeply involved, you can also suggest feature updates through
              proposals to improve the dapp controlled by the DAO.
            </Faq>

            <Faq title="What is the Community Fund?">
              You can find out more about the community fund{" "}
              <Link href="https://wiki.internetcomputer.org/wiki/Community_Fund">
                here
              </Link>
              .
            </Faq>
            <Faq
              title="How do you get SNS Tokens?"
              id="how-do-you-get-sns-tokens"
            >
              <p>
                Each SNS DAO will have its own unique SNS token. For example,
                OpenChat will have CHAT tokens when they turn their dapp into an
                SNS DAO.{" "}
              </p>
              <p>There are three main ways of acquiring SNS tokens:</p>
              <ul>
                <li>
                  <strong>Participate in a decentralization sale:</strong> When
                  an SNS launches, it has to go through a decentralization sale
                  that takes place on the NNS frontend dapp under the{" "}
                  <Link href="https://nns.ic0.app/launchpad/">
                    Launch Pad tab
                  </Link>
                  . During the sale you can buy SNS tokens with ICP.
                </li>
                <li>
                  <strong>
                    Purchase tokens on a decentralized exchange (DEX):
                  </strong>{" "}
                  After a sale has concluded, liquid tokens will typically be
                  listed on multiple DEXs, where you can buy them using the ICP
                  utility token or other tokens, depending on what token pairs
                  the DEX lists, e.g., also Bitcoin or Ethereum. An SNS token in
                  high demand may have a higher price on a DEX than in its
                  decentralization sale.{" "}
                  <Link href="http://icdex.io/">ICDex</Link> already supports
                  SNS tokens.
                </li>
                <li>
                  <strong>Airdrops:</strong> Besides buying SNS tokens, you can
                  obtain SNS tokens by receiving airdrops or by actively
                  engaging in the SNS DAO’s community and thereby earning tokens
                  as reward. In this scenario, tokens are used to create active
                  engagement with a dApp and help grow the active user base.
                  Finally, if you already have tokens and participate in
                  governance, you can earn tokens as governance rewards like in
                  the NNS.
                </li>
              </ul>
            </Faq>
          </FaqSection>
          <FaqSection
            title={
              <h2 className="tw-heading-3 text-gradient mb-12 md:mb-0 md:tw-heading-60">
                De&shy;cen&shy;tral&shy;iza&shy;tion Sale
              </h2>
            }
          >
            <div className="blob blob-purple blob-md blob-top-right z-[-1]"></div>
            <Faq title="What is a decentralization sale?">
              A decentralization sale is the process by which an SNS DAO is
              created and where users can purchase SNS tokens by participating.
              After the sale each participant receives a basket of neurons
              holding SNS tokens. It is one of{" "}
              <Link href="#how-do-you-get-sns-tokens">multiple ways</Link> one
              can get SNS tokens for a particular SNS DAO.
            </Faq>

            <Faq title="Where does a decentralization sale take place?">
              <p>
                A decentralization sale is run entirely on chain. The sale is
                initiated by the SNS soon after the NNS has launched the SNS.
                Through this approach, every aspect of the sale, from its
                initiation to execution, is completely decentralized and not
                controlled by any centralized entity. Even the decision to
                create the SNS and its token is made by the NNS and not the
                developer in order to avoid undesirable legal implications for
                the developer who wants to decentralized their app.
              </p>
              <p>
                A decentralization sale uses a list of configured parameters:
              </p>
              <ul>
                <li>Minimum and maximum amount of SNS tokens to be sold</li>
                <li>
                  The amount of ICP a decentralization sale must earn to be
                  successful. If the goal is not reached, participants get their
                  ICP refunded and the sale fails.
                </li>
                <li>Minimum and maximum commitment of ICP per participant</li>
              </ul>
            </Faq>

            <Faq title="What do I get from a sale?">
              <p>
                If the decentralization sale is successful, you will receive a
                basket of neurons that hold your SNS tokens. The basket may
                contain multiple neurons with different dissolve delays,
                depending on the SNS configuration. You can use your tokens to
                participate in governance or, once neurons have dissolved, sell
                the liquid tokens on an exchange.
              </p>
              <p>
                The number of SNS tokens you receive and the price paid for each
                token, depends on the amount of ICP raised during the sale. The
                more ICP raised, the fewer SNS tokens you receive.
              </p>
            </Faq>

            <Faq title="How do I participate in a sale?">
              <p>
                Participation takes place on the{" "}
                <Link href="https://nns.ic0.app/">NNS Frontend Dapp</Link> and
                requires ICP utility tokens, which can be exchanged for the SNS
                tokens during the decentralization sale. If you don’t have ICP,
                you can buy some from any of the exchanges listed{" "}
                <Link href="https://support.dfinity.org/hc/en-us/articles/6646999699860-How-do-I-stake-ICP-utility-tokens-">
                  here
                </Link>
                .
              </p>
              <p>
                Follow these steps to participate in a decentralization sale:
              </p>
              <p>
                <strong>
                  1. Go to the NNS Frontend Dapp and click on the “Launch Pad”
                  in the sidebar to see all ongoing SNS decentralization sales.
                </strong>
              </p>
              <p>
                <strong>
                  2. Select the SNS Sale you’re interested under“Current
                  Launches” and click on the box.
                </strong>
                <img src="/img/sns/SNS-FAQ-participate-1.webp" alt="" />
              </p>
              <p>
                <strong>3. Click on “Participate”.</strong>
                <img src="/img/sns/SNS-FAQ-participate-2.webp" alt="" />
              </p>
              <p>
                <strong>
                  4. Type in the amount of ICP you want to participate with or
                  click “max”, then click “Execute”.
                </strong>
                <img src="/img/sns/SNS-FAQ-participate-3.webp" alt="" />
              </p>
              <p>
                <strong>
                  5. You will be prompted to review your participation. If you
                  see the correct amount of ICP, select the checkbox and click
                  “Execute”.
                </strong>
                <img src="/img/sns/SNS-FAQ-participate-4.webp" alt="" />
              </p>
              <p>
                <strong>
                  6. On the last screen, you should see the amount of ICP you
                  entered for participation. You can repeat this process if you
                  wish to contribute more.
                </strong>
              </p>
              <p>
                Once the sale ends and is successful, you receive SNS tokens.
                The number of SNS tokens you receive and the price paid for each
                token, depends on the amount of ICP raised during the sale and
                the amount of ICP spent. The more ICP raised, the fewer SNS
                tokens you receive.
              </p>
              <p>
                If the set goals of the decentralization sale is not reached,
                participants will get their ICP refunded. The duration of a sale
                is configurable and thus, depends on the configuration of each
                individual SNS. A sale can only start after a 4 to 8-day NNS
                voting period on the original proposal to launch the SNS.
              </p>
              <p className="not-prose">
                <Link
                  href="https://nns.ic0.app/launchpad/"
                  className="link-primary link-with-icon"
                >
                  <LinkArrowRight></LinkArrowRight>
                  Go to the Launch Pad
                </Link>
              </p>
            </Faq>
          </FaqSection>

          <FaqSection
            title={
              <h2 className="tw-heading-3 text-gradient mb-12 md:mb-0 md:tw-heading-60">
                Governance
              </h2>
            }
          >
            <Faq title="How do I see and vote for SNS proposals?">
              <p>
                Voting and the creation of SNS proposals takes place in the dapp
                controled by the SNS DAO, and soon in the NNS dapp. Proposals
                are listed within the dapps themselves as in this example of
                OpenChat:
                <img src="/img/sns/openchat-1.webp" alt="" />
              </p>
              <p className="not-prose">
                <Link
                  href="https://oc.app/#/vhn7y-siaaa-aaaaf-a7yxa-cai"
                  className="link-primary link-with-icon"
                >
                  <LinkArrowRight></LinkArrowRight>
                  See SNS-1 proposals on OpenChat
                </Link>
              </p>
            </Faq>
            <Faq title="How do I create a proposal for an SNS DAO?">
              <p>
                Creating an SNS proposal requires one to be familiar with dfx
                and quill.
              </p>
              <p className="not-prose">
                <Link
                  href="https://github.com/dfinity/sns-quill#submit-a-proposal"
                  className="link-primary link-with-icon"
                >
                  <LinkArrowRight></LinkArrowRight>
                  See docs
                </Link>
              </p>
            </Faq>

            <Faq title="Is it possible to transfer SNS tokens to another person?">
              <p>
                Yes. SNS tokens are ICRC-1 tokens and can be transferred between
                any ICP-based wallets that support ICRC-1. including your NNS
                wallet. Recall, that each SNS has its own ICRC-1-compliant
                ledger for keeping track of its tokens.
              </p>
              <p>
                However, note that when receiving your SNS tokens in the form of
                neurons, the neurons may have dissolve delays defined so that
                your tokens may not be liquid, i.e., transferable, immediately,
                but only in weeks, months, or years’ time, depending on the
                dissolve delay of the respective neuron.
              </p>
            </Faq>
            <Faq title="Is it possible to sell SNS tokens to another person?">
              <p>
                Yes. Because tokens can be sent to other people, they can
                likewise be sent to exchanges and thus swapped for other tokens.
                The easiest way of selling SNS tokens is through a decentralized
                exchange (DEX) that lists the token. You can exchange the SNS
                token to other tokens, depending on the token pair(s) for the
                SNS token that the DEX lists.
              </p>
              <p>
                Likewise you can acquire SNS tokens on a DEX in exchange for
                other tokens.
              </p>
            </Faq>
          </FaqSection>
        </section>
        <AnimateSpawn
          className="container-10 text-white relative mt-30 md:mt-60"
          el={motion.section}
          variants={transitions.container}
        >
          <motion.div
            variants={transitions.fadeIn}
            className="z-[-1] blob blob-purple  blob-md md:blob-lg blob-center opacity-90"
          ></motion.div>
          <div className="md:w-6/10 mx-auto text-center">
            <motion.h2
              className="tw-heading-3 md:tw-heading-60 mb-3 md:mb-6"
              variants={transitions.item}
            >
              Resource Center
            </motion.h2>
            <motion.p
              className="tw-lead-sm md:tw-lead mb-6"
              variants={transitions.item}
            >
              Everything you need to become an SNS DAO ninja.
            </motion.p>
          </div>
        </AnimateSpawn>
        <AnimateSpawn
          variants={transitions.container}
          className="container-12 mt-8 md:mt-20 mb-20 md:mb-30 grid grid-cols-1 md:grid-cols-3 gap-2"
          el={motion.section}
        >
          <SmallCardWithDescription
            href=""
            title="Service Nervous System (SNS)"
          >
            Donec ullamcorper nulla.
          </SmallCardWithDescription>
          <SmallCardWithDescription href="" title="SNS Documentation">
            Donec ullamcorper nulla.
          </SmallCardWithDescription>
          <SmallCardWithDescription href="" title="SNS Wiki">
            Donec ullamcorper nulla.
          </SmallCardWithDescription>
          <SmallCardWithDescription
            href=""
            title="How the SNS Will Bring Tokenized Governance to On-Chain Dapps"
          >
            Donec ullamcorper nulla.
          </SmallCardWithDescription>
          <SmallCardWithDescription
            href=""
            title="Fully On-chain with DFINITY – E02 | Next Generation DAOs"
          >
            Donec ullamcorper nulla.
          </SmallCardWithDescription>
          <SmallCardWithDescription
            href=""
            title="Community Conversations | SNS Initial Token Swap"
          >
            Donec ullamcorper nulla.
          </SmallCardWithDescription>
        </AnimateSpawn>
      </main>
    </Layout>
  );
}

export default SnsFaqPage;
