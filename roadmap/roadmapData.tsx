import Link from "@docusaurus/Link";
import React from "react";

const roadmapItems: RoadmapDomain[] = [
  {
    name: "Core Protocol",
    description:
      "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum id ligula porta felis euismod semper. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum id ligula porta felis euismod semper. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum id ligula porta felis euismod semper. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    image: {
      card: "/img/roadmap/core-protocol.card.jpg",
      overlay: "/img/roadmap/core-protocol.overlay.jpg",
    },
    groups: {
      pending: [
        {
          name: "Direct Integration with Ethereum",
          description: (
            <>
              <p>
                The Direct Integration with Ethereum and the Internet Computer
                plans to encompass a few implementations, as follows:
              </p>
              <p>
                Ethereum blockchain integration: Integrating the Internet
                Computer blockchain with the Ethereum blockchain in a trustless
                manner, i.e., without using any trusted intermediaries such as
                bridges. This will enable smart contracts on the Internet
                Computer to call smart contracts on Ethereum and vice versa.
              </p>
              <p>
                EVM support on the Internet Computer (IC): Providing an Ethereum
                execution environment (EVM) on the Internet Computer to run
                Solidity-/EVM-based smart contracts on the IC.
              </p>
            </>
          ),
          forum:
            "https://forum.dfinity.org/t/long-term-r-d-integration-with-the-ethereum-network/9382/6",
          proposal: "https://dashboard.internetcomputer.org/proposal/35635",
          is_community: false,
          eta: null,
        },
      ],
      inProgress: [
        {
          name: "Threshold ECDSA signatures",
          description:
            "ECDSA signatures are widely used in the blockchain industry. This feature will enable canister smart contracts to have an ECDSA public key and to sign with regard to it. The corresponding secret key is threshold-shared among the nodes of the subnet holding the canister smart contract. This is a prerequisite for the direct integration between the Internet Computer and Bitcoin and Ethereum.",
          forum: "https://forum.dfinity.org/t/threshold-ecdsa-signatures/6152",
          proposal: "https://dashboard.internetcomputer.org/proposal/21340",
          is_community: null,
          eta: "August 2022",
        },
        {
          name: "Bitcoin Integration to Enable Bitcoin Smart Contracts",
          description:
            "Bitcoin, the world's first blockchain, has evolved to the world's digital store of value and is therefore often referred to as a digital version of gold. We directly integrate the Internet Computer with the Bitcoin blockchain, i.e., canisters can themselves hold and transfer bitcoin. Importantly, direct integration means that no additional trust assumptions are required and indeed no additional parties, such as bridges, are needed. This feature relies on threshold ECDSA signatures that make it possible for a subnet to sign on behalf of a canister with a secret-shared key. This feature will enable for the first time smart contracts for Bitcoin leveraging the countless powerful features of canisters.",
          forum:
            "https://forum.dfinity.org/t/direct-integration-with-bitcoin/6147",
          proposal: "https://dashboard.internetcomputer.org/proposal/20586",
          is_community: null,
          eta: "August 2022",
        },
        {
          name: "Enable HTTP Requests from Canisters",
          description:
            "This feature enables canister (dapps/smart contracts) on the Internet Computer to make HTTP(S) requests to services outside the IC and thus integrates the Internet Computer with the Web 2.0 world. This enables a plurality of new use cases, e.g., directly obtaining exchange rate data from external servers for DeFi dapps, obtaining weather data for decentralized insurance services, or sending notifications to end users via traditional communications channels. The first version of this feature will cover a subset of the typical oracle service functionalities, but will do so in a trustless manner, i.e., without making any additional trust assumptions.",
          forum:
            "https://forum.dfinity.org/t/long-term-r-d-general-integration-proposal/9383",
          proposal: "https://dashboard.internetcomputer.org/proposal/35639",
          is_community: null,
          eta: null,
        },
        {
          name: "Deterministic Time Slicing",
          description:
            "Currently, the computation a canister call can perform is hard bounded per round. Deterministic time slicing allows for long(er) running, multi-round computations by suspending the execution at the end of one round and resuming it in the next.",
          proposal: "",
          forum: "https://forum.dfinity.org/t/deterministic-time-slicing/10635",
          is_community: null,
          eta: null,
        },
      ],
      deployed: [
        {
          name: "Nodes Can be Reassigned to a Different Subnet",
          description:
            "Currently, the only way to reassign a node from one subnet to another is by redeploying the node from scratch, a tedious and error-prone process. This feature will allow nodes to be reassigned to other subnets through simple NNS proposals. Nodes will leave their old subnet “gracefully”, meaning, without having to count the departing node to the budget of faulty/malicious nodes in the subnet.",
          forum: null,
          proposal: null,
          is_community: false,
          eta: "March 2022",
        },
        {
          name: "Network Performance with Larger Network: State Sync, Certification, and XNet",
          description:
            "This feature ensures that the Internet Computer meets future scalability requirements in terms of number of subnets and size of their growing canister state. The main focus is on the scalability of the XNet communication protocol and the state sync protocol, including state certification.",
          forum:
            "https://forum.dfinity.org/t/long-term-r-d-scalability-proposal/9387/3",
          proposal: "https://dashboard.internetcomputer.org/proposal/35648",
          is_community: null,
          eta: "February 2022",
        },
      ],
    },
  },
  {
    name: "Boundary Nodes",
    description:
      "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum id ligula porta felis euismod semper.",
    image: {
      card: "/img/roadmap/boundary-nodes.card.jpg",
      overlay: "/img/roadmap/boundary-nodes.overlay.jpg",
    },
    groups: {
      deployed: [
        {
          name: "ICOS Boundary Nodes",
          description:
            "Today, the installation and configuration of boundary nodes requires manual intervention by the foundation’s employees. This feature establishes a fully-automated build process to facilitate improved automated testing and deployment and thereby enables NNS-driven deployment of boundary nodes. The operating system, IC OS, currently used for replica nodes, shall also be used for boundary nodes. This solution builds the basis for ongoing decentralization efforts.",
          proposal: "https://dashboard.internetcomputer.org/proposal/35671",
          forum:
            "https://forum.dfinity.org/t/long-term-r-d-boundary-nodes-proposal/9401",
          is_community: null,
          eta: "August 2022",
        },
      ],
      inProgress: [
        {
          name: "SEO and Streaming Support",
          description:
            "This feature enables users on the IC to have their dapps indexed by search engines and to provide previews on social media (e.g., Twitter cards). To this end, boundary nodes redirect requests from crawlers and bots (e.g., Googlebot) to raw in order to avoid loading the service worker.",
          proposal: "",
          forum: "",
          is_community: null,
          eta: "Sept 2022",
        },
        {
          name: "Custom domain names",
          description:
            "This feature enables users on the IC to use their own custom domains (e.g., foo.com) instead of being restricted to the <canister id>.ic0.app domains. To this end, users configure the DNS entries of their domain to redirect the traffic to the boundary nodes and signal the boundary nodes to which canister the traffic should be forwarded. The boundary nodes automatically manage the required certificates for HTTPS.",
          proposal: "https://dashboard.internetcomputer.org/proposal/35671",
          forum:
            "https://forum.dfinity.org/t/long-term-r-d-boundary-nodes-proposal/9401",
          is_community: null,
          eta: null,
        },
        {
          name: "Boundary Node/Asset Canister Caching",
          description:
            "Boundary nodes only cache queries for a very short amount of time. Assets (HTML pages, JS sources, images, etc) are not cached. The asset canister does not provide TTL information as to when the assets should expire. This feature would give the assets time-to-live information and expose it to Nginx on the boundary nodes as well as the service worker.",
          proposal: "https://dashboard.internetcomputer.org/proposal/35671",
          forum:
            "https://forum.dfinity.org/t/long-term-r-d-boundary-nodes-proposal/9401",
          is_community: null,
          eta: "Nov 2022",
        },
      ],

      pending: [
        {
          name: "Canister Blacklisting on Boundary Nodes",
          description: (
            <ul>
              <li>
                <strong>What?</strong> Provide a means to boundary node
                providers to specify a blacklist for canisters. If a canister c
                is on the backlist of a boundary node b, then no query or update
                call to c shall be routed through b. Optional: the blacklist
                configured for a boundary node shall be publicly visible.
              </li>
              <li>
                <strong>Why?</strong> Node providers are the first to be
                contacted if questionable content is stored on the IC. If they
                can independently block such content, then they can comply with
                local regulations. If we have many different boundary nodes that
                each can make their own decision, and users can choose which
                boundary node to use, then this approach can be seen as
                decentralized.
              </li>
            </ul>
          ),
          proposal: "https://dashboard.internetcomputer.org/proposal/35671",
          forum:
            "https://forum.dfinity.org/t/long-term-r-d-boundary-nodes-proposal/9401",
          is_community: null,
          eta: null,
        },
        {
          name: "Custom Subdomains",
          description:
            "CanisterId-based URLs, such as https://7e6iv-biaaa-aaaaf-aaada-cai.ic0.app, are hard to read and memorize. This feature will enable developers on the platform to create custom subdomains on ic0.app for their canisters. For instance, a developer could create a custom canister name <name> for their canister such that <name>.ic0.app resolves to their <canister_id>.  This is the first step towards enabling arbitrary URLs.",
          proposal: "",
          forum:
            "https://forum.dfinity.org/t/custom-domains-for-ic0-app-community-consideration/6162",
          is_community: null,
          eta: null,
        },
        {
          name: "SEV-SNP protected Boundary Node VM",
          description: (
            <>
              <p>
                This feature targets secure the boundary node VM using trusted
                execution via AMD SEV-SNP. This includes the following steps:
              </p>
              <ul>
                <li>
                  Evaluate the current system support of SEV-SNP
                  <ul>
                    <li>
                      Initial evaluation steps have already shown that the
                      kernel support is not in mainline of the kernel and there
                      is currently very limited libvirt support. Issues in
                      relation to these facts have to be determined.
                    </li>
                    <li>
                      The evaluation will be performed in two steps:
                      <ul>
                        <li>Boot a vanilla SEV-SNP virtual machine</li>
                        <li>
                          Evaluate the{" "}
                          <Link href="https://github.com/AMDESE/sev-guest">
                            AMDESE / sev-guest
                          </Link>{" "}
                          demo and determine the shortcomings of this approach.
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>

                <li>
                  Transform the structure of the boundary node VM so it can be
                  booted as a SEV-SNP secured VM
                </li>
                <li>
                  Determine the necessary steps to enable remote attestation
                  <ul>
                    <li>
                      Remote attestation should be performed during deployment
                      and update of a boundary node VM
                    </li>
                    <li>
                      There should be a publicly https accessible function that
                      enables remote attestation anybody how is interested
                    </li>
                    <li>
                      Determine the necessary steps how the build process and
                      the inject of configuration needs to be change so remote
                      attestation becomes meaningful for external parties.
                    </li>
                  </ul>
                </li>
              </ul>
            </>
          ),
          proposal: "",
          forum: "",
          is_community: null,
          eta: null,
        },
      ],
    },
  },
  {
    name: "System Utils & Dapps",
    image: {
      card: "/img/roadmap/system-utility.card.jpg",
      overlay: "/img/roadmap/system-utility.overlay.jpg",
    },
    groups: {
      deployed: [
        {
          name: "NNS FE dapp re-write",
          description:
            "The NNS FE dapp introduced at genesis is built on Flutter with a mediocre useability. As we don’t intend to launch a native mobile app for the NNS in the near future, and since we believe that Svelte is a technology stack that is better suited for the IC than Flutter, we decided to reimplement the NNS FE dapp in Svelte. We proceed in two steps. This feature represents the first step where we replace the current Flutter implementation step by step with a Svelte implementation. Upon completion, we expect a significant speed-up of the dapp. The second step, introducing an improved user interface, is captured by a separate feature.",
          forum:
            "https://forum.dfinity.org/t/nns-dapp-towards-new-ui-ux-including-test-link/13952",
          proposal: null,
          is_community: false,
          eta: "July 2022",
        },
      ],
      inProgress: [
        {
          name: "Node Onboarding Improvements",
          description: null,
          proposal: null,
          forum: null,
          is_community: null,
          eta: null,
        },
      ],
      pending: [
        {
          name: "Adding NP role to NNS Frontend Dapp",
          description:
            "This feature allows existing node providers to set up and manage their nodes independently. This requires additional functionality in the NNS front-end dapp as well as their counterparts in the governance and registry canisters complemented by a deployment process and runbooks for node operation.",
          proposal: "https://dashboard.internetcomputer.org/proposal/35670",
          forum:
            "https://forum.dfinity.org/t/the-state-and-direction-of-decentralization-nodes-on-the-internet-computer/9170",
          is_community: null,
          eta: null,
        },
        {
          name: "People Parties for Validating Personhood",
          description:
            "Virtual people parties are a scalable proof of personhood, in which randomly assigned groups of users validate each other through interaction. Validation of personhood improves decentralization on the Internet Computer by providing greater voting power and thus rewards to validated users, i.e., real people as opposed to unknown entities. Users can also present the proof of personhood toward dapps, which in turn can provide the users with greater privileges and rewards.",
          proposal: "https://dashboard.internetcomputer.org/proposal/35668",
          forum:
            "https://forum.dfinity.org/t/long-term-r-d-people-parties-proof-of-human-proposal/9636",
          is_community: null,
          eta: null,
        },
      ],
    },
  },
  {
    name: "Governance/NNS",
    image: {
      card: "/img/roadmap/governance.card.jpg",
      overlay: "/img/roadmap/governance.overlay.jpg",
    },
    groups: {
      deployed: [
        {
          name: "Open Governance for Internet Services",
          description: (
            <>
              <p>
                Service nervous systems (SNSs) are algorithmic DAOs that allow
                developers to create decentralized, token-based governance
                systems for their dapps. An SNS will initially consist of a
                ledger canister, the same as in the Network Nervous System
                (NNS), a governance canister, and a root canister.
              </p>
              <p>
                This feature implements the SNS governance and the SNS root
                canister. The governance canister is similar to the NNS’s
                governance canister but has a simpler and more flexible design,
                allowing each SNS community to choose the configurations
                according to their needs. This feature will also provide tooling
                for initializing an SNS. This is the first building block for
                the SNS, which will be further evolved in the Carbon milestone.
              </p>
            </>
          ),
          forum:
            "https://forum.dfinity.org/t/open-governance-canister-for-sns-design-proposal/10224",
          proposal: "https://dashboard.internetcomputer.org/proposal/42626",
          is_community: false,
          eta: "July 2022",
        },
      ],
      inProgress: [
        {
          name: "Service Nervous System (SNS)",
          description: (
            <>
              <p>
                Service nervous systems (SNSs) are algorithmic DAOs that will
                allow developers to create decentralized, token-based governance
                systems for their dapps.
              </p>
              <p>The Carbon milestone introduces the following SNS features:</p>
              <ol>
                <li>
                  SNSs as a system function. This introduces a special SNS
                  subnet with increased security. Also, there will be tool
                  support for developers to initially deploy their SNS on this
                  subnet. Moreover, the SNSs on this subnet will be more easily
                  maintainable as the SNS canisters can only be upgraded
                  according to a blessed upgrade path maintained by the NNS
                  community
                </li>
                <li>
                  Voting rewards. This aims at introducing a first, minimal
                  version of voting rewards for SNSs that can then be further
                  customized in the future.
                </li>
                <li>
                  Decentralization sale. This introduces a way for participants
                  to provide initial funding for a dapp by exchanging ICP tokens
                  for SNS tokens during the SNS launch that decentralizes the
                  dapp.
                </li>
                <li>
                  A minimal frontend. This introduces a first version of a
                  frontend dapp that allows end users to interact with the SNS
                  in a more user friendly way. This first version will support
                  participating in the decentralization sale and a subset of the
                  governance functionalities.
                </li>
              </ol>
              <p>
                The governance canister is similar to the NNS’s governance
                canister but has a simpler and more flexible design, allowing
                each SNS community to choose the configurations according to
                their needs. This feature will also provide tooling for
                initializing an SNS. This is the first building block for the
                SNS, which will be further evolved in the Carbon milestone.
              </p>
            </>
          ),
          proposal: "https://dashboard.internetcomputer.org/proposal/65132",
          forum: [
            {
              text: "Deployment & Upgrades",
              url: "https://forum.dfinity.org/t/sns-deployment-and-upgrades-design-proposal/10816",
            },
            {
              text: "Rewards",
              url: "https://forum.dfinity.org/t/open-governance-canister-for-sns-design-proposal/10224/36",
            },
            {
              text: "Decentralization sale",
              url: "https://forum.dfinity.org/t/sns-initial-token-swap/13591",
            },
          ],
          is_community: null,
          eta: "September 2022",
        },
        {
          name: "Community Fund",
          description:
            "The community fund is going to be made up of a set of neurons, whose funds are committed to being invested in IC dapps by enabling the “community fund” flag in those neurons. These ear-marked funds will be eligible for investment into communities that use an SNS, for example by providing liquidity in the form of ICP for its tokens or funds for dapp developers. The exploration and definition of the exact form of such investments is part of this feature.",
          proposal: "",
          forum: "",
          is_community: null,
          eta: null,
        },
      ],
    },
  },
  {
    name: "Developer Experience",
    image: {
      card: "/img/roadmap/dx.card.jpg",
      overlay: "/img/roadmap/dx.overlay.jpg",
    },
    groups: {
      inProgress: [
        {
          name: "BTC Integration in dfx",
          description: null,
          forum: null,
          proposal: null,
          is_community: false,
          eta: "August 2022",
        },
        {
          name: "SNS Quill",
          description: null,
          forum: null,
          proposal: null,
          is_community: null,
          eta: "August 2022",
        },
      ],
    },
  },
  // {
  //   name: "Infrastructure & Operations",
  //   image: {
  //     card: "/img/roadmap/infrastructure.card.jpg",
  //     overlay: "/img/roadmap/infrastructure.overlay.jpg",
  //   },
  //   groups: {
  //     pending: [
  //       {
  //         name: "ECDSA",
  //         description:
  //           "In cryptography, the Elliptic Curve Digital Signature Algorithm (ECDSA) offers a variant of the Digital Signature Algorithm (DSA) which uses elliptic curve.",
  //         forum: null,
  //         proposal: null,
  //         is_community: false,
  //         eta: null,
  //       },
  //       {
  //         name: "BTC",
  //         description: null,
  //         forum: null,
  //         proposal: null,
  //         is_community: null,
  //         eta: null,
  //       },
  //     ],
  //   },
  // },
];

export type CustomUrl = {
  text: string;
  url: string;
};

export type RoadmapItemLink = string | CustomUrl | CustomUrl[];

export type RoadmapItem = {
  name: string;
  description?: React.ReactNode;
  forum?: RoadmapItemLink;
  proposal?: RoadmapItemLink;
  is_community?: boolean;
  eta?: string;
};

export type RoadmapDomain = {
  name: string;
  description?: React.ReactNode;
  image: {
    card: string;
    overlay: string;
  };
  groups: {
    pending?: RoadmapItem[];
    inProgress?: RoadmapItem[];
    deployed?: RoadmapItem[];
  };
};

export default roadmapItems;
