import Link from "@docusaurus/Link";
import AnimateSpawn from "@site/src/components/Common/AnimateSpawn";
import Breadcrumbs from "@site/src/components/Common/Breadcrumbs";
import { SmallCardWithDescription } from "@site/src/components/Common/Card";
import { Faq, FaqSection } from "@site/src/components/Common/Faq/Faq";
import LinkArrowRight from "@site/src/components/Common/Icons/LinkArrowRight";
import IntraPageNav from "@site/src/components/Common/IntraPageNav";
import ShareMeta from "@site/src/components/Common/ShareMeta";
import YoutubeVideoEmbed from "@site/src/components/Common/YoutubeVideoEmbed";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";
import React from "react";

function SnsFaqPage() {
  return (
    <Layout
      title="SNS DAO FAQ"
      description="All you need to know about DAOs on the Internet Computer and how to participate in them."
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <ShareMeta image="/img/shareImages/share-sns.jpg"></ShareMeta>

      <main className="text-black relative overflow-hidden">
        <AnimateSpawn
          className="container-10 mb-16 md:mb-30 md:pt-8"
          el={motion.section}
          variants={transitions.container}
        >
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
          <motion.h1 className="tw-heading-3 md:tw-heading-2 mt-12 md:mt-32 md:w-8/10 mb-6">
            What you need to know about SNS DAOs
          </motion.h1>
          <motion.p className="tw-lead-sm text-black/60 mb-0">
            Disclaimer: Participation in any SNS is at your own risk
          </motion.p>
        </AnimateSpawn>
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
                  alt=""
                ></img>
              </div>
            }
          >
            <Faq title="What is a DAO?">
              <p>
                DAO stands for Decentralized Autonomous Organization. Simply
                put, a DAO is an organization formed by smart contracts where
                the members (typically token holders) collectively decide how
                the organization or the product evolves. Example scenarios:
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
                SNS stands for Service Nervous System. An SNS is a powerful form
                of DAO that allows communities to govern smart contracts and
                decentralized apps (dapps) running on the Internet Computer
                (ICP) completely on chain. Main things to note about SNS:
              </p>
              <ul>
                <li>
                  The design of SNSes is similar to that of the{" "}
                  <Link href="/nns">Network Nervous System (NNS)</Link>, which
                  is the onchain DAO that governs the whole ICP.
                </li>
                <li>
                  A dapp controlled by an SNS DAO is governed by SNS token
                  holders submitting and voting on onchain proposals. No one
                  developer or group of people controls the dapp, rather the
                  dapp is controlled by voting via tokens.
                </li>
                <li>
                  There can be many SNSes on ICP. Any developer can hand over the
                  control of their dapp to an SNS DAO. Doing so gives control to
                  DAO token holders.
                </li>
              </ul>
            </Faq>

            <Faq title="How unique are SNS DAOs in Web3?">
              <p>
                DAOs are a growing form of organization for accomplishing goals.
                For example, in the ETH ecosystem, Uniswap and MakerDAO are
                popular DAOs with billions of dollars locked in their respective
                smart contracts. However,{" "}
                <strong>
                  ICP is unique in that it can host fully-on chain dapps
                </strong>{" "}
                (frontend, backend application logic, and data), so SNS DAOs are
                unique in that they can fully control (via voting) every aspect
                of a dapp, since everything is onchain. Having fully onchain
                DAOs is important because it enables all decisions to be
                executed on the blockchain and thus facilitates true
                decentralization. This is in contrast to existing DAOs
                on other blockchains where voting takes place onchain but the
                execution of the results are often carried out by developers
                off-chain.{" "}
                <p>
                  Therefore, SNS DAOs serve as a vehicle to deliver fully
                  decentralized online services that are owned and governed by
                  their communities.{" "}
                </p>
              </p>
            </Faq>

            <Faq title="What are the advantages of SNS DAOs? ">
              <p>
                SNS DAOs facilitate a healthy exchange between developers,
                entrepreneurs, end users and VC’s. Some advantages of turning
                the control of your dapp over to a DAO include:{" "}
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
                  community-driven decentralization swap.
                </li>
              </ul>
            </Faq>

            <Faq title="Are there existing SNS DAOs?">
              The ICP community has expressed much interest and enthusiasm for
              the launch of the SNS technology. OpenChat was the first dapp that
              handed control over to an SNS DAO in Q1 of 2023. Since then, many
              ecosystem projects have followed. Currently, there are 11 SNS DAOs
              on the Internet Computer. Follow their progress on the{" "}
              <Link href="https://dashboard.internetcomputer.org/sns">
                SNS dashboard
              </Link>
              .
            </Faq>

            <Faq title="Were there any security audits on SNS?">
              Yes, the SNS framework has undergone two security audits by{" "}
              <Link href="https://www.trailofbits.com/">Trail of Bits</Link> in
              2022, and 2023 with no severe issues found.
              <p className="not-prose">
                <Link
                  href="https://medium.com/dfinity/taking-security-seriously-two-top-icp-features-assessed-by-trail-of-bits-4a0023ab1e68"
                  className="link-primary link-with-icon"
                >
                  <LinkArrowRight></LinkArrowRight>
                  Read more about these audits
                </Link>
              </p>
            </Faq>
          </FaqSection>
          <FaqSection
            id="participate"
            title={
              <h2 className="tw-heading-3 text-gradient mb-12 md:mb-0 md:tw-heading-60">
                How to participate in an SNS DAO
              </h2>
            }
          >
            <Faq title="What do I do once I am an SNS DAO member?">
              The most important thing you can do as an SNS DAO member is to
              participate in governance. Onchain governance is what
              differentiates DAOs from traditional web applications, as members
              play a key role in the DAO's success. DAO members can contribute
              in many ways, from pushing code, to designing a logo or a UI, to
              simply voting on SNS proposals that shape how the dapp evolves.
            </Faq>
            <Faq title="In what ways can I participate in an SNS DAO?">
              There are many ways members can participate in an SNS DAO, both
              onchain and off-chain. Creating proposals requires coding skills.
              Some examples include:
              <ul>
                <li>
                  <strong>Vote on SNS proposals:</strong> You can vote on
                  different types of proposals manually or follow other neurons
                  that vote.
                </li>
                <li>
                  <strong>Create upgrade proposals: </strong>
                  Submit an upgrade proposal to update the code of the dapp that
                  the SNS DAO controls. This allows anyone to contribute code to
                  an SNS DAO.
                </li>
                <li>
                  <strong>Create motion proposals:</strong> Motion proposals
                  don't upgrade the code of the dapp, instead they steer the
                  direction of the DAO in terms of new features and dapp
                  development.
                </li>
                <li>
                  <strong>Create SNS parameter update proposals: </strong>
                  You can propose upgrades for many of the DAO's parameters such
                  as maximum staking period, voting rewards and many more. See{" "}
                  <Link
                    href="/docs/building-apps/governing-apps/managing/managing-nervous-system-parameters"
                    target="_blank"
                  >
                    parameters
                  </Link>
                  .
                </li>
              </ul>
              Non-governance related examples of contributing are:
              <ul>
                <li>
                  <strong>Content moderation: </strong> Many social media dapps
                  may incorporate content moderation as they scale to millions
                  of users. Moderators review and approve content based on the
                  content policies of the DAO.
                </li>
                <li>
                  <strong>UI / UX design work: </strong> Users can contribute
                  not only by coding, but designing different aspects of the
                  dapp.
                </li>
                <li>
                  <strong>Off-chain marketing / inviting friends: </strong>
                  Members of the DAO can be advocates of the dapp and promote it
                  in different ways.
                </li>
              </ul>
            </Faq>
            <Faq title="How does voting in an SNS DAO work?">
              Once you have acquired SNS tokens, you can lock them into SNS
              neurons, which allows you to create a proposal, vote directly on one,
              delegate voting to trusted parties that have more expertise in certain topics.
              If a proposal gets adopted, the code of the SNS DAO or the dapp it controls is
              upgraded. Depending on the SNS configuration, users who vote may
              be rewarded with additional tokens for participating in
              governance. If you want to get more deeply involved, you can also
              suggest feature updates through proposals to improve the dapp
              controlled by the DAO.
            </Faq>
            <Faq
              title="How can I get SNS Tokens?"
              id="how-do-you-get-sns-tokens"
            >
              <p>
                Each SNS DAO has its own unique SNS token. For example, OpenChat
                has CHAT tokens.{" "}
              </p>
              <p>There are three main ways of acquiring SNS tokens:</p>
              <ul>
                <li>
                  <strong>Participate in a decentralization swap:</strong> When
                  an SNS launches, it has to go through a decentralization swap.
                  You can participate on the NNS frontend dapp under the{" "}
                  <Link href="https://nns.ic0.app/launchpad/">
                    Launchpad tab
                  </Link>
                  . During the swap you can buy SNS tokens with ICP.
                </li>
                <li>
                  <strong>
                    Purchase tokens on a decentralized exchange (DEX):
                  </strong>{" "}
                  After a decentralization swap has concluded, liquid tokens
                  will typically be listed on multiple DEXs, where you can buy
                  them using the ICP utility token or other tokens, depending on
                  what token pairs the DEX lists, e.g., also Bitcoin or
                  Ethereum. An SNS token in high demand may have a higher price
                  on a DEX than in its decentralization swap.{" "}
                  <Link href="http://icdex.io/">ICDex</Link>,{" "}
                  <Link href="https://sonic.ooo/">Sonic</Link> and{" "}
                  <Link href="https://icpswap.com/">ICPSwap</Link> already
                  supports SNS tokens.
                </li>
                <li>
                  <strong>Airdrops:</strong> Besides buying SNS tokens, you can
                  obtain them by receiving airdrops or by engaging with the dapp
                  and thereby earning tokens as reward. In this scenario, tokens
                  are used as an incentive to encourage active engagement with
                  the dapp which helps grow the active user base.
                </li>
                <li>
                  <strong>Voting rewards:</strong> If you already have tokens
                  and participate in governance, you can earn tokens as voting
                  rewards as you would in the NNS.
                </li>
              </ul>
            </Faq>

            <Faq title="Do I get rewards for participating in governance?">
              SNS works very similar to the NNS, however each SNS DAO can
              configure their parameters differently. Once you have locked your
              SNS governance tokens into SNS neurons for at least the minimum
              required time, you can participate in voting. Depending on the
              configuration voting may reward participants with SNS governance
              tokens.
            </Faq>

            <Faq title="What is the Neurons' fund?">
              <p>
                From the ICP ecosystem's vantage point, the Neurons' fund aids
                in bootstrapping the SNS DAO ecosystem, thereby supporting the
                continued growth of the ecosystem. The Neurons' fund itself is
                controlled by a DAO (the NNS).
              </p>
              <p>
                From a user's vantage point, the Neurons' fund is a way for
                people who stake ICP in the NNS to use their maturity to fund
                future SNSes. As the NNS decides how the Neuons' fund contributes to
                SNSes, ICP stakers participating in them can leverage the broader community's
                "wisdom of crowds" to chose which SNS tokens to acquire. This allows
                users to participate automatically in upcoming SNS launches.
              </p>
              <p>
                ICP neuron holders can opt in or out of the Neurons' fund at
                any moment. Neurons will only participate in the
                decentralization swap if they are opted in at the moment when
                the proposal to initiate the SNS decentralization swap executes. The
                propsoal executes immediately after it gets adopted by ICP neuron
                holders.
              </p>
              More about the{" "}
              <Link href="https://wiki.internetcomputer.org/wiki/Neurons_Fund">
                Neurons' fund
              </Link>
              .
            </Faq>
            <Faq title="If I am asked to send ICP to an address to participate in a decentralization swap, what should I do?">
              <p>
                If you want to participate in the swap, do not send ICP directly
                to addresses! An SNS swap will never initiate contact with you,
                e.g. via chat or email. You will never be asked to manually
                enter an ICP address to participate in a decentralization swap.
                If you find yourself entering an ICP address to participate in
                an SNS swap, then STOP. Your swap address is specific to your
                identity, and you should only interact with that address when
                participating in a swap through the{" "}
                <Link href="https://nns.ic0.app/launchpad/">NNS</Link> or other
                ICP based dapps that support the swap like{" "}
                <Link href="https://avjzx-pyaaa-aaaaj-aadmq-cai.raw.ic0.app/icsns/launchpad">
                  ICLighthouse
                </Link>
                .
              </p>
            </Faq>
          </FaqSection>
          <FaqSection
            id="decentralization-swap"
            title={
              <h2 className="tw-heading-3 text-gradient mb-12 md:mb-0 md:tw-heading-60">
                De&shy;cen&shy;tral&shy;iza&shy;tion swap
              </h2>
            }
          >
            <div className="blob blob-purple blob-md blob-top-right z-[-1]"></div>
            <Faq title="What is a decentralization swap?">
              A decentralization swap is the process by which an SNS DAO becomes
              decentralized and where users can exchange ICP for SNS tokens by
              participating. After the swap, each participant receives a basket
              of neurons. These neurons hold SNS tokens and therefore a share of
              the DAO's voting power. It is one of{" "}
              <Link href="#how-do-you-get-sns-tokens">multiple ways</Link> you
              can get SNS tokens for a particular SNS DAO.
            </Faq>

            <Faq title="Where does a decentralization swap take place?">
              <p>
                A decentralization swap is run entirely on chain. The swap is
                initiated by the NNS. Through this approach, every aspect of the
                swap, from its initiation to execution, is completely
                decentralized and not controlled by any centralized entity. Even
                the decision to create the SNS and its token is made by the NNS
                (the DAO that controls the Internet Computer) and not the developer
                in order to ensure complete decentralizion of the app.
              </p>
              <p>
                A decentralization swap follows a list of configurable
                parameters:
              </p>
              <ul>
                <li>The amount of SNS tokens to be sold</li>
                <li>
                  The amount of ICP a decentralization swap must receive to be
                  successful. If the goal is not reached, participants get their
                  ICP refunded and the swap fails.
                </li>
                <li>
                  The maximum amount of ICP a decentralization swap can receive
                  before it concludes. If the maximum ICP is reached, the swap
                  is over and the control of the dapp is turned over to the
                  token holders. As the number of tokens to be sold is fixed, it
                  is amount of ICP swapped that determines the initial price of
                  the SNS tokens.
                </li>
                <li>Minimum and maximum commitment of ICP per participant</li>
                <li></li>
              </ul>
            </Faq>

            <Faq title="What do I get from a swap?">
              <p>
                If the decentralization swap is successful, you will receive a
                basket of{" "}
                <Link href="https://wiki.internetcomputer.org/wiki/Neurons_101">
                  neurons
                </Link>{" "}
                that hold your SNS tokens. Depending on the SNS configuration,
                the basket may contain multiple neurons, each with a different{" "}
                <Link href="https://support.dfinity.org/hc/en-us/articles/4404298574612-What-is-dissolve-delay-#:~:text=The%20dissolve%20delay%20is%20a,or%20lock%20up%20your%20ICP.">
                  dissolve delay
                </Link>
                . You can use your tokens to participate in governance or, once
                neurons have dissolved, sell the liquid tokens on an exchange.
              </p>
              <p>
                The number of SNS tokens you receive, and the price of for
                each token, depends on the amount of ICP swapped.
                The more ICP are swapped, the fewer SNS tokens you receive,
                however their price will be higher.
              </p>
            </Faq>

            <Faq title="How is the price of SNS tokens calculated?">
              <p>
                SNS tokens can be exchanged for ICP during the decentralization
                swap. There is a fixed number of tokens distributed during the
                swap, which means their price is determined by the amount of ICP
                swappend. You can calculate the token price by dividing the amount
                of ICP swappend with the number of tokens distributed. Price = ICP
                swappend / number of tokens distributed.
                Note that the final price of SNS tokens
                isn't known at the time of the decentralization swap, as it is
                dependent on the total amount of ICP swapped.
                However, you can calculate the minimum and maximum price based
                on the minimum and maximum ICP that the swap accepts, which you
                can verify in the swap proposal. A few examples:
              </p>
              <ul>
                <li>
                  The decentralization swap distributed 5000 tokens for 1000 ICP.
                  You participated with 10 ICP. This means you will have
                  50 SNS tokens, each worth 0.2 ICP.
                </li>
                <li>
                  The decentralization swap distributed 1 million tokens for
                  500,000 ICP. You participated with 200 ICP. This means you
                  will have 400 SNS tokens, each worth 0.5 ICP.
                </li>
                <li>
                  The decentralization swap distributed 100 tokens for 10,000 ICP.
                  You participated with 5 ICP. This means you will have
                  0.05 SNS tokens, where a full token would be worth 100 ICP.
                </li>
              </ul>
              <p>
                Visis the ICP Wiki for a more detailed overvire of{" "}
                <Link href="https://wiki.internetcomputer.org/wiki/How-To:_SNS_tokenomics_configuration">
                  SNS tokenomics
                </Link>
              </p>
            </Faq>

            <Faq title="How do I participate in a swap?">
              <p>
                You can participate in the decentralization swap in the{" "}
                <Link href="https://nns.ic0.app/">NNS frontend dapp</Link>,
                which requires ICP utility tokens. ICP tokens can be exchanged
                for SNS tokens during the decentralization swap. If you don’t
                have ICP, go to any of the exchanges listed on{" "}
                <Link href="https://coinmarketcap.com/currencies/internet-computer/markets/">
                  CoinMarketCap
                </Link>
                .
              </p>
              <p>
                Follow these steps to participate in a decentralization swap:
              </p>
              <p>
                <strong>
                  1. Go to the NNS frontend dapp and click on the “Launchpad” in
                  the sidebar to see all ongoing SNS decentralization swap.
                </strong>
              </p>
              <p>
                <strong>
                  2. Select the SNS Swap you’re interested in under “Current
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
                After the swap ends and is successful, you receive SNS tokens.
                Note, that this may take a few hours after the swap has
                concluded. The number of SNS tokens you receive, and the price
                paid for each token, depends on the amount of ICP raised during
                the swap as well as the amount of ICP spent. The more ICP
                raised, the fewer SNS tokens you receive.
              </p>
              <p>
                If the set goals of the decentralization swap are not reached,
                participants will be refunded. The duration of a swap is
                configurable and thus, depends on the configuration of each
                individual SNS. A swap can only start after a 4 to 8-day NNS
                voting period (unless 51% majority is reached sooner) on the
                original proposal that initiates the launch the SNS.
              </p>
              <p className="not-prose">
                <Link
                  href="https://nns.ic0.app/launchpad/"
                  className="link-primary link-with-icon"
                >
                  <LinkArrowRight></LinkArrowRight>
                  Go to the Launchpad
                </Link>
              </p>
            </Faq>
            <Faq title="Who starts the decentralization swap?">
              First an NNS proposal is created for the decentralization swap.
              The swap itself starts automatically once the NNS proposal is
              adopted.
            </Faq>
            <Faq title="As a participant in the SNS decentralization swap, what do I need to trust?">
              <p>
                Before participating in an SNS decentralization swap to get a
                share of the SNS DAO’s voting power, it is highly recommended
                that you do your due diligence on the dapp in question to make
                sure the SNS DAO is trustworthy. Dapp developers are responsible
                for providing all the necessary information that allows you to
                verify the dapp and its SNS configurations. Note that in
                participating without doing due your diligence, you are
                implicitly trusting the NNS community and the developers
                decentralizing the dapp. In any case, it is crucial that you
                trust the developers will not change the dapp during the SNS
                launch. Learn what you could verify and what to look out for on{" "}
                <Link href="https://wiki.internetcomputer.org/wiki/SNS_decentralization_swap_trust">
                  the ICP Wiki.
                </Link>
              </p>
            </Faq>

            <Faq title="How can I verify the SNS decentralization swap proposal?">
              <p>
                There are multiple levels of verification you can do depending
                on your level of technical understanding. SNS canisters can be
                verified at any time, even before the decentralization swap, but
                after they have been installed on the SNS subnet. Here are some
                ways to verify:
              </p>
              <ul>
                <li>
                  <strong>Swap parameters:</strong> You can verify what the
                  parameters of the decentralization swap are in the Launchpad
                  or in the decentralization swap NNS proposal.
                </li>
                <li>
                  <strong>SNS root canister: </strong> An SNS DAO is comprised
                  of several SNS canisters that have different functions. The
                  root canister is the canister that controls the other SNS
                  canisters within a given SNS DAO. You should verify that the
                  SNS root canister is the only canister controlling other SNS
                  canisters within that SNS DAO. Verification is important for
                  making sure there no backdoors built in.
                </li>
                <li>
                  <strong>The dapp canister: </strong> You can verify that the
                  canister id of the dapp controlled by the SNS DAO is the same
                  as the one you're interacting with.
                </li>
                See Wiki for more info on{" "}
                <Link href="https://wiki.internetcomputer.org/wiki/How-to:_Verify_SNS_decentralization_swap_proposal">
                  verification
                </Link>
              </ul>
            </Faq>
          </FaqSection>

          <FaqSection
            id="treasury"
            title={
              <h2 className="tw-heading-3 text-gradient mb-12 md:mb-0 md:tw-heading-60">
                SNS DAO treasury
              </h2>
            }
          >
            <Faq title="What is the SNS treasury?">
              After a decentralization swap successfully concludes, the ICP
              collected through the swap is allocated to the SNS DAO's treasury.
              Optionally, the DAO can allocate a number of SNS tokens to be in
              the DAO's treasury, which all SNSes so far have done. The SNS
              treasury is controlled by the DAO, and can only be transferred
              using proposals that SNS token holders vote on. It is also
              possible to mint new SNS tokens at any point after the SNS launch,
              which can also only be done if the SNS DAO agrees to do so by
              proposal vote.
            </Faq>

            <Faq title="What is the purpose of the SNS treasury and how are the funds distributed?">
              <ul>
                <li>The purpose of the treasury is decided by the SNS DAO.</li>
                <li>
                  A portion of the treasury can be sent to any address by an SNS
                  proposal.
                </li>
                <li>
                  Typically, after an SNS has launched it has an SNS token
                  treasury and an ICP treasury (from the decentralization swap).
                  An SNS can, however, also own other tokens on the Internet
                  Computer.
                </li>
                <li>
                  Typically, after an SNS has launched it has an SNS token treasury and an ICP
                  treasury (from the decentralization swap). An SNS can, however, also own other
                  tokens on the Internet Computer.
                </li>
                <li>
                  The treasury funds could, for example, be used to open liquidity pools on
                  DEXs or to reward users for certain actions in the dapp.
                </li>
              </ul>
            </Faq>

            <Faq title="Do I have a say in how the treasury funds are allocated?">
              Yes, if you are a neuron holder of the respective SNS DAO, you can
              actively exercise your voting power to decide on proposals that
              allocate treasury funds.
            </Faq>

            <Faq title="Who has access to the treasury? ">
              Without an adopted SNS proposal that specifies how to allocate funds,
              no one can access the SNS treasury. The SNS DAO only grants access
              when proposals are adopted through SNS community voting. While it can happen
              that the original developer team possesses a meaningful portion of the voting
              power, they alone cannot make decisions for the DAO without the approval of
              SNS token holders. In particular, treasury proposals are considered to be
              critical proposals, which have a higher bar to be adopted, including that
              they require a higher voting participation and support of a supermajority of
              the DAO voters.
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
                Anyone can build a frontend that allows users to create or vote
                on SNS proposals, which means voting could take place within the
                dapp the SNS DAO controls, or in any other dapp that integrates
                with the SNS backend. The{" "}
                <Link href="https://nns.ic0.app/">NNS frontend dapp</Link> lists
                all SNS DAOs and their proposals. Other dapps that allow voting
                on SNS proposals are{" "}
                <Link href="https://iclight.io/icsns/proposals">
                  ICLight.house
                </Link>
                ,{" "}
                <Link href="https://oc.app/community/dgegb-daaaa-aaaar-arlhq-cai/channel/213879932851725513516678778767199309579">
                  OpenChat
                </Link>
                , and partially <Link href="https://dscvr.one/">DSCVR</Link>.{" "}
                Example on how SNS proposals appear on OpenChat:
                <img src="/img/sns/openchat-1.webp" alt="" loading="lazy" />
              </p>
              <p className="not-prose">
                <Link
                  href="https://nns.ic0.app/proposals/"
                  className="link-primary link-with-icon"
                >
                  <LinkArrowRight></LinkArrowRight>
                  See SNS proposals and vote on the NNS dapp
                </Link>
              </p>
            </Faq>
            <Faq title="How do I create a proposal for an SNS DAO?">
              <p>
                Creating an SNS proposal requires knowledge of the command line
                tools <Link href="https://github.com/dfinity/sdk">dfx</Link> and{" "}
                <Link href="https://github.com/dfinity/sns-quill">quill</Link>.
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

            <Faq title="What is voting power and how do I get it?">
              SNS DAOs have a stake-based governance system. This means the more
              tokens participants stake in their{" "}
              <Link href="https://wiki.internetcomputer.org/wiki/Neurons_101">
                neurons
              </Link>
              , the more voting power their neurons have. In addition to the
              stake, a neuron's voting power is dependent on the{" "}
              <Link href="https://wiki.internetcomputer.org/wiki/Neurons_101">
                dissolve delay
              </Link>{" "}
              bonus and age bonus. Each SNS DAO decides these bonuses in its
              parameters.
            </Faq>

            <Faq title="What is neuron following?">
              <p>
                Following neurons is a way to delegate votes both on the NNS and
                in SNSes. Each SNS neuron can either manually vote on proposals
                or follow another neuron’s voting decisions. Neurons are
                followed based on various topics, such as making SNS treasury
                transfers or upgrading the dapp. Neurons can be set to follow
                other neurons on specific topics or to follow other neurons on
                ‘All Topics’ – a catch-all which is applied for the proposal
                without any specific following choice.
              </p>
              <p>
                When you use following, you must trust that the neurons you’re following will make
                decisions that align with your views. The advantages of neuron following
                are that you don’t have to spend time manually voting on each proposal,
                and you can rely on the expertise of other neuron holders for certain topics.
              </p>
            </Faq>

            <Faq title="How can I follow or unfollow a neuron on SNS treasury proposals?">
              If you would like to learn how to follow some neuron, for example
              the SNS developer team, on some topics, while manually voting on
              others, watch this short tutorial:
              <YoutubeVideoEmbed
                videoId="bgZ2VifhNcU"
                altText="Neuron following on SNS treasury proposals"
              />
            </Faq>

            <Faq title="Is it possible to transfer SNS tokens to another person?">
              <p>
                Yes. SNS tokens are ICRC-1 tokens and can be transferred between
                any Internet Computer-based wallets that support ICRC-1,
                including your NNS wallet. Note that each SNS has its own
                ICRC-1-compliant ledger for keeping track of its tokens.
              </p>
              <p>
                When receiving your SNS tokens in the form of neurons, the
                neurons may have{" "}
                <Link href="https://support.dfinity.org/hc/en-us/articles/4404298574612-What-is-dissolve-delay-#:~:text=The%20dissolve%20delay%20is%20a,or%20lock%20up%20your%20ICP.">
                  dissolve delays
                </Link>
                , meaning your tokens may not be liquid, i.e. transferable
                immediately. Rather these tokens become liquid (transferable) in
                weeks, months, or years’ time, depending on the dissolve delay
                of the respective neuron.
              </p>
            </Faq>
            <Faq title="Is it possible to sell SNS tokens to another person?">
              <p>
                Yes. Because tokens can be sent to other people, they can
                likewise be sent to exchanges and thus, swapped for other
                tokens. The easiest way to sell SNS tokens is through a
                decentralized exchange (DEX) that lists the token. You can
                exchange SNS tokens for other tokens, depending on the token
                pairs available on any DEX.
              </p>
              <p>
                Likewise, you can acquire SNS tokens on a DEX in exchange for
                other tokens.
              </p>
            </Faq>
            <Faq title="Are SNS tokens inflationary or deflationary?">
              <p>
                This depends on the specific SNS configuration. An SNS DAO can
                have both inflationary and deflationary pressures.
              </p>
              <p>Inflationary:</p>
              <ul>
                <li>
                  An SNS DAO can be set up to mint voting rewards for people who
                  participate in governance (similar to ICP).
                </li>
                <li>
                  An SNS DAO can mint tokens if voted on by SNS token holders.
                  For example: a game mints 2% of total supply each year and
                  distributes it among players.
                </li>
              </ul>
              <p>Deflationary:</p>
              <ul>
                <li>SNS tokens are burnt for every transaction.</li>
                <li>
                  Locking SNS tokens into neurons removes them from circulation.
                  While not technically deflation, it acts as a deflationary
                  pressure.
                </li>
              </ul>
              <p className="not-prose">
                <Link
                  href="https://wiki.internetcomputer.org/wiki/How-To:_SNS_tokenomics_configuration"
                  className="link-primary link-with-icon"
                >
                  <LinkArrowRight></LinkArrowRight>
                  More on SNS tokenomics
                </Link>
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
            href="/sns"
            title="SNS DAO Basics"
          ></SmallCardWithDescription>
          <SmallCardWithDescription
            href="https://youtu.be/nZBWx6y070Y"
            title="Video: Next Generation DAOs"
          ></SmallCardWithDescription>
          <SmallCardWithDescription
            href="https://medium.com/dfinity/how-the-service-nervous-system-sns-will-bring-tokenized-governance-to-on-chain-dapps-b74fb8364a5c"
            title="SNS Blog"
          ></SmallCardWithDescription>
          <SmallCardWithDescription
            href="/how-it-works"
            title="Technical overview of ICP"
          ></SmallCardWithDescription>
          <SmallCardWithDescription
            href="https://wiki.internetcomputer.org/wiki/Service_Nervous_System_(SNS)"
            title="SNS Wiki"
          ></SmallCardWithDescription>
          <SmallCardWithDescription
            href="/docs/building-apps/governing-apps/overview"
            title="SNS Docs"
          ></SmallCardWithDescription>
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
            to: "#decentralization-swap",
            text: "Decentralization swap",
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
