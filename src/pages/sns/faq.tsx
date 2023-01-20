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
import IntraPageNav from "@site/src/components/Common/IntraPageNav";
import ShareMeta from "@site/src/components/Common/ShareMeta";

function idFromTitle(title: string) {
  const slug = slugify(title, { strict: true, lower: true });
  if (slug.match(/^\d/)) {
    return "sns-faq-" + slug;
  }
  return slug;
}

const Faq: React.FC<{ title: string; children: ReactNode; id?: string }> = ({
  children,
  title,
  id,
}) => {
  return (
    <article
      id={id || slugify(title, { lower: true, strict: true })}
      className="scroll-m-[110px]"
    >
      <AnimateSpawn variants={transitions.item}>
        <motion.h2
          className="tw-heading-5 md:tw-heading-3 mb-6 relative group"
          variants={transitions.item}
        >
          {title}
          <a
            className="text-infinite absolute -left-6 md:-left-8 top-0 hidden group-hover:inline-block hover:text-infinite-60 hover:no-underline md:pr-3"
            href={`#${idFromTitle(title)}`}
          >
            #
          </a>
        </motion.h2>
        <motion.div
          variants={transitions.item}
          className="
          tw-paragraph md:tw-lead-sm
          prose
          max-w-none
          prose-h3:tw-heading-6 prose-h3:md:tw-heading-5 prose-h3:mb-4
          prose-p:tw-paragraph md:prose-p:tw-lead-sm prose-p:mb-3
          prose-img:mb-0 prose-img:mt-2 prose-img:w-full prose-img:aspect-video prose-img:object-contain prose-img:object-center
          prose-a:font-normal hover:prose-a:text-infinite hover:prose-a:no-underline
          prose-ul:mb-4 prose-ul:list-none prose-ul:pl-0 prose-ul:tw-paragraph md:prose-ul:tw-lead-sm
          prose-li:bg-[url('/img/checkmark.svg')] prose-li:bg-no-repeat prose-li:bg-left-top prose-li:pl-8 prose-li:my-3 prose-li:tw-paragraph prose-li:md:tw-lead-sm
      "
        >
          {children}
        </motion.div>
      </AnimateSpawn>
    </article>
  );
};

const FaqSection: React.FC<{
  title: ReactNode;
  children: ReactNode;
  id?: string;
}> = ({ children, title, id }) => {
  return (
    <div
      className="flex flex-col md:flex-row md:gap-1/12 scroll-m-[110px]"
      id={id}
    >
      <div className="md:w-4/12 flex-shrink-0">
        <AnimateSpawn
          variants={transitions.item}
          className="md:sticky md:top-10"
        >
          {title}
        </AnimateSpawn>
      </div>
      <div className="flex flex-col gap-12 md:gap-20 relative">{children}</div>
    </div>
  );
};

function SnsFaqPage() {
  resetNavBarStyle();
  return (
    <Layout
      title="SNS DAO FAQ"
      description="All you need to know about DAOs on the Internet Computer and how to participate in them."
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <ShareMeta image="/img/shareImages/share-sns-faq.jpg"></ShareMeta>

      <main className="text-black relative overflow-hidden">
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
            id="introduction"
            title={
              <div className="relative mb-20">
                <div className="blob blob-sm md:blob-md blob-bottom-left -bottom-20 blob-infinite z-[-1] opacity-90"></div>
                <img
                  src="/img/sns/faq-1.svg"
                  className="w-full pr-2/12"
                  loading="lazy"
                ></img>
              </div>
            }
          >
            <Faq title="What is a DAO?">
              <p>
                DAO stands for Decentralized Autonomous Organization. Simply put, a DAO is an
                organization formed by smart contracts where the members
                (typically token holders) collectively decide how the
                organization or the product evolves. Example scenarios:
              </p>
              <ul>
                <li>
                  10'000 token holders each deposit crypto into a smart contract
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
                SNS stands for Service Nervous System. An SNS is an advanced
                form of DAO that allows communities to govern decentralized
                apps (dapps) on the Internet Computer (ICP). Main things to
                note about SNS:
              </p>
              <ul>
                <li>
                  The design of SNSs is similar to that of the{" "}
                  <Link href="https://nns.ic0.app">
                    Network Nervous{" "}System (NNS)
                  </Link>
                  , which is the on-chain DAO that governs the whole ICP.
                </li>
                <li>
                  A dapp controlled by an SNS DAO is governed by
                  SNS token holders submitting and voting on on-chain proposals.
                  No one developer or group of people controls the dapp, rather
                  the dapp is controlled by voting via tokens.
                </li>
                <li>
                  There can be many SNSs on ICP. A developer can turn their
                  dapp into a SNS by handing the control of their dapp over
                  to an SNS DAO.
                </li>
              </ul>
            </Faq>

            <Faq title="How unique are SNS DAOs in Web3?">
              <p>
                DAOs are a growing form of organization for accomplishing goals.
                For example, in the ETH ecosystem, Uniswap and MakerDAO are
                popular DAOs with billions of dollars locked in their respective smart
                contracts. However,{" "}
                <strong>
                    ICP is unique in that it can host fully-on chain dapps
                </strong>{" "}
                (frontend, backend application logic, and data), so SNS DAOs
                are unique in that they can fully control (via voting) every
                aspect of a dapp, since everything is on-chain.{" "}

                <p>
                Therefore, SNS DAOs serve as a vehicle to deliver fully decentralized
                online services that are owned and governed by their
                communities.{" "}
              </p>
              </p>
            </Faq>

            <Faq title="What are the advantages of SNS DAOs? ">
              <p>
                SNS DAOs facilitate a healthy exchange between developers,
                entrepreneurs, end users and VC’s. Some advantages of turning
                your dapp into a DAO include:{" "}
              </p>
              <ul>
                <li>
                  <strong>Community Engagement:</strong> as co-owners of the
                  product, users become core contributors, developers deliver on
                  value proposition.{" "}
                </li>
                <li>
                  <strong>Speedy User Adoption:</strong> As co-owners, users
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
              future. Since SNS-1 was meant as a test, it is unusual among SNSs
              in that it was launched as a blank canvas without a product or
              developer team. Future SNSs will likely be derived from established
              ICP dapps. SNS-1 tokens are available on{" "}
              <Link href="https://avjzx-pyaaa-aaaaj-aadmq-cai.raw.ic0.app/ICDex/SNS1/ICP">
                ICDex
              </Link>
              .
            </Faq>

            <Faq title="Are there other existing SNS DAOs?">
              The ICP community has expressed much interest and enthusiasm for
              the launch of the SNS technology. OpenChat has already publicly
              announced their plans to turn their dapp into an SNS DAO in Q1 of
              2023. Dapps such as distrikt, Catalyze, Canistore and Nuance are considering
              creating their own SNSs.
            </Faq>

          </FaqSection>
          <FaqSection
            id="participate"
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
                  an SNS launches, it has to go through a decentralization sale.
                  You can participate on the NNS frontend dapp under the{" "}
                  <Link href="https://nns.ic0.app/launchpad/">
                    Launch Pad tab
                  </Link>
                  . During the sale you can buy SNS tokens with ICP.
                </li>
                <li>
                  <strong>
                    Purchase tokens on a decentralized exchange (DEX):
                  </strong>{" "}
                  After a decentralization sale has concluded, liquid tokens
                  will typically be listed on multiple DEXs, where you can buy
                  them using the ICP utility token or other tokens, depending on
                  what token pairs the DEX lists, e.g., also Bitcoin or Ethereum.
                  An SNS token in high demand may have a higher price on a DEX
                  than in its decentralization sale.{" "}
                  <Link href="http://icdex.io/">ICDex</Link> already supports
                  SNS tokens.
                </li>
                <li>
                  <strong>Airdrops:</strong> Besides buying SNS tokens, you can
                  obtain them by receiving airdrops or by engaging with the dapp
                  and thereby earning tokens as reward. In this scenario, tokens
                  are used as an incentive to encourage active engagement with
                  the dapp which helps grow the active user base. Finally, if you
                  already have tokens and participate in governance, you can earn
                  tokens as voting rewards as you would in the NNS.
                </li>
              </ul>
            </Faq>

            <Faq title="What is the Community Fund?">
              The Community Fund is a way for people to who stake ICP in the NNS to
              use their maturity to fund future SNSs. You can find out more about
              the community fund{" "}
              <Link href="https://wiki.internetcomputer.org/wiki/Community_Fund">
                here
              </Link>
              .
            </Faq>

          </FaqSection>
          <FaqSection
            id="decentralization-sale"
            title={
              <h2 className="tw-heading-3 text-gradient mb-12 md:mb-0 md:tw-heading-60">
                De&shy;cen&shy;tral&shy;iza&shy;tion Sale
              </h2>
            }
          >
            <div className="blob blob-purple blob-md blob-top-right z-[-1]"></div>
            <Faq title="What is a decentralization sale?">
              A decentralization sale is the process by which an SNS DAO becomes
              decentralized and where users can purchase SNS tokens by participating.
              After the sale, each participant receives a basket of neurons
              holding SNS tokens. It is one of{" "}
              <Link href="#how-do-you-get-sns-tokens">multiple ways</Link> one
              can get SNS tokens for a particular SNS DAO.
            </Faq>

            <Faq title="Where does a decentralization sale take place?">
              <p>
                A decentralization sale is run entirely on chain. The sale is
                initiated by the NNS. Through this approach, every aspect of the
                sale, from its initiation to execution, is completely
                decentralized and not controlled by any centralized entity. Even
                the decision to create the SNS and its token is made by the NNS
                (a DAO) and not the developer in order to avoid undesirable legal
                implications for the developer who wants to decentralized their app.
              </p>
              <p>
                A decentralization sale follows a list of configurable parameters:
              </p>
              <ul>
                <li>The amount of SNS tokens to be sold</li>
                <li>
                  The amount of ICP a decentralization sale must receive to be
                  successful. If the goal is not reached, participants get their
                  ICP refunded and the sale fails.
                </li>
                <li>Minimum and maximum commitment of ICP per participant</li>
                <li></li>
              </ul>
            </Faq>

            <Faq title="What do I get from a sale?">
              <p>
                If the decentralization sale is successful, you will receive a
                basket of 
                <Link href="https://dscvr.one/post/6958037/neurons-101">
                  neurons
                </Link> that hold your SNS tokens. The basket may
                contain multiple neurons with different dissolve delays,
                depending on the SNS configuration. You can use your tokens to
                participate in governance or, once neurons have dissolved, sell
                the liquid tokens on an exchange.
              </p>
              <p>
                The number of SNS tokens you receive, and the price paid for each
                token, depends on the amount of ICP raised during the sale. The
                more ICP raised, the fewer SNS tokens you receive.
              </p>
            </Faq>

            <Faq title="How do I participate in a sale?">
              <p>
                You can participate in the decentralization sale in the {" "}
                <Link href="https://nns.ic0.app/">NNS frontend dapp</Link> and
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
                  1. Go to the NNS frontend dapp and click on the “Launch Pad”
                  in the sidebar to see all ongoing SNS decentralization sales.
                </strong>
              </p>
              <p>
                <strong>
                  2. Select the SNS Sale you’re interested in under “Current
                  Launches” and click on the box.
                </strong>
                <img
                  src="/img/sns/SNS-FAQ-participate-1.webp"
                  alt=""
                  loading="lazy"
                />
              </p>
              <p>
                <strong>3. Click on “Participate”.</strong>
                <img
                  src="/img/sns/SNS-FAQ-participate-2.webp"
                  alt=""
                  loading="lazy"
                />
              </p>
              <p>
                <strong>
                  4. Type in the amount of ICP you want to participate with or
                  click “max”, then click “Execute”.
                </strong>
                <img
                  src="/img/sns/SNS-FAQ-participate-3.webp"
                  alt=""
                  loading="lazy"
                />
              </p>
              <p>
                <strong>
                  5. You will be prompted to review your participation. If you
                  see the correct amount of ICP, select the checkbox and click
                  “Execute”.
                </strong>
                <img
                  src="/img/sns/SNS-FAQ-participate-4.webp"
                  alt=""
                  loading="lazy"
                />
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
                The number of SNS tokens you receive, and the price paid for each
                token, depends on the amount of ICP raised during the sale as well
                as the amount of ICP spent. The more ICP raised, the fewer SNS
                tokens you receive.
              </p>
              <p>
                If the set goals of the decentralization sale are not reached,
                participants will be refunded. The duration of a sale
                is configurable and thus, depends on the configuration of each
                individual SNS. A sale can only start after a 4 to 8-day NNS
                voting period (unless 51% majority is reached sooner) on the
                original proposal that initiates the launch
                the SNS.
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
            id="governance"
            title={
              <h2 className="tw-heading-3 text-gradient mb-12 md:mb-0 md:tw-heading-60">
                Governance
              </h2>
            }
          >
            <Faq title="How do I see and vote for SNS proposals?">
              <p>
                Voting and the creation of SNS proposals can take place in the dapp
                controled by the SNS DAO, and soon in the NNS dapp. Proposals are
                listed within the dapps themselves as in this example of OpenChat:
                <img src="/img/sns/openchat-1.webp" alt="" loading="lazy" />
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
                any Internet Computer-based wallets that support ICRC-1, including
                your NNS wallet. Note that each SNS has its own ICRC-1-compliant
                ledger for keeping track of its tokens.
              </p>
              <p>
                When receiving your SNS tokens in the form of neurons, the
                neurons may have dissolve delays, meaning your tokens
                may not be liquid, i.e. transferable immediately. Rather
                these tokens become liquid (transferable) in weeks,
                months, or years’ time, depending on the dissolve delay
                of the respective neuron.
              </p>
            </Faq>
            <Faq title="Is it possible to sell SNS tokens to another person?">
              <p>
                Yes. Because tokens can be sent to other people, they can
                likewise be sent to exchanges and thus swapped for other tokens.
                The easiest way to sell SNS tokens is through a decentralized
                exchange (DEX) that lists the token. You can exchange SNS
                tokens for other tokens, depending on the token pairs available
                on any DEX.
              </p>
              <p>
                Likewise, you can acquire SNS tokens on a DEX in exchange for
                other tokens.
              </p>
            </Faq>
          </FaqSection>
        </section>
        <section id="resource-center">
          <AnimateSpawn
            className="container-10 text-white relative mt-30 md:mt-60"
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
        </section>
        <AnimateSpawn
          variants={transitions.container}
          className="container-12 mt-8 md:mt-20 mb-20 md:mb-30 grid grid-cols-1 md:grid-cols-3 gap-2"
          el={motion.section}
        >
          <SmallCardWithDescription
            href="https://internetcomputer.org/sns"
            title="SNS DAO Basics"
          >
          </SmallCardWithDescription>
          <SmallCardWithDescription
            href="https://youtu.be/nZBWx6y070Y"
            title="Video: Next Generation DAOs">
          </SmallCardWithDescription>
          <SmallCardWithDescription
            href="https://medium.com/dfinity/how-the-service-nervous-system-sns-will-bring-tokenized-governance-to-on-chain-dapps-b74fb8364a5c"
            title="SNS Blog">
          </SmallCardWithDescription>
          <SmallCardWithDescription
            href="https://internetcomputer.org/how-it-works"
            title="Technical overview of ICP"
          >
          </SmallCardWithDescription>
          <SmallCardWithDescription
            href="https://wiki.internetcomputer.org/wiki/Service_Nervous_System_(SNS)"
            title="SNS Wiki"
          >
          </SmallCardWithDescription>
          <SmallCardWithDescription
            href="https://internetcomputer.org/docs/current/tokenomics/sns/sns-intro-tokens"
            title="SNS Docs"
          >
          </SmallCardWithDescription>
        </AnimateSpawn>
      </main>
      <IntraPageNav
        hasHome={false}
        links={[
          {
            text: "Introduction",
            to: "#introduction",
          },
          {
            to: "#participate",
            text: "Participate",
          },
          {
            to: "#decentralization-sale",
            text: "Decentralization Sale",
          },
          {
            to: "#governance",
            text: "Governance",
          },
          {
            to: "#resource-center",
            text: "Resource Center",
          },
        ]}
      ></IntraPageNav>
    </Layout>
  );
}

export default SnsFaqPage;
