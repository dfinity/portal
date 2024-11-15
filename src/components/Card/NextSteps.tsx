import Link from "@docusaurus/Link";
import React, { FC, ReactNode } from "react";

interface TileDescriptor {
  isGhostTile?: boolean;
  action?: ReactNode | null;
  description?: ReactNode;
  label?: string;
}

const languagesTiles: TileDescriptor[] = [
  {
    label: "Smart contracts",
    description:
      "Learn more about canister smart contract development and management.",
    action: (
      <Link
        href="/docs/current/developer-docs/smart-contracts/overview/introduction"
        className="button button-ghost bg-white/90 rounded-2xl text-infinite"
        title="Get started with ICP Ninja"
      >
        <span>Learn more</span>
      </Link>
    ),
  },
  {
    label: "Dev tools",
    description:
      "Explore additional developer tools including agents, libraries, and CLI tools.",
    action: (
      <Link
        href="/docs/current/developer-docs/developer-tools/dev-tools-overview"
        className="button button-ghost bg-white/90 rounded-2xl text-infinite"
        title="Get started with dfx"
      >
        <span>Learn more</span>
      </Link>
    ),
  },
  {
    label: "HTTPS outcalls",
    description:
      "Use HTTPS outcalls in your project to obtain data from external sources.",
    action: (
      <Link
        href="/docs/current/developer-docs/smart-contracts/advanced-features/https-outcalls/https-outcalls-overview"
        className="button button-ghost bg-white/90 rounded-2xl text-infinite"
        title="Get started with ICP Ninja"
      >
        <span>Learn more</span>
      </Link>
    ),
  },
  {
    label: "Frontend canisters",
    description:
      "Build web applications using frontend canisters and frameworks like React.",
    action: (
      <Link
        href="/docs/current/developer-docs/web-apps/application-frontends/overview"
        className="button button-ghost bg-white/90 rounded-2xl text-infinite"
        title="Get started with dfx"
      >
        <span>Learn more</span>
      </Link>
    ),
  },
  {
    label: "Onchain encryption",
    description:
      "Secure your application's data with onchain encryption methods.",
    action: (
      <Link
        href="/docs/current/developer-docs/smart-contracts/encryption/vetkeys"
        className="button button-ghost bg-white/90 rounded-2xl text-infinite"
        title="Get started with dfx"
      >
        <span>Learn more</span>
      </Link>
    ),
  },
  {
    label: "Onchain signatures",
    description:
      "Sign messages using threshold ECDSA, Schnorr, and EdDSA.",
    action: (
      <Link
        href="/docs/current/developer-docs/smart-contracts/signatures/t-ecdsa"
        className="button button-ghost bg-white/90 rounded-2xl text-infinite"
        title="Get started with dfx"
      >
        <span>Learn more</span>
      </Link>
    ),
  },
  {
    label: "Best practices",
    description:
      "Review the developer best practices for building on ICP.",
    action: (
      <Link
        href="/docs/current/developer-docs/smart-contracts/best-practices/general"
        className="button button-ghost bg-white/90 rounded-2xl text-infinite"
        title="Get started with dfx"
      >
        <span>Learn more</span>
      </Link>
    ),
  },
  {
    label: "Security",
    description:
      "Learn about application security and recommendations.",
    action: (
      <Link
        href="/docs/current/developer-docs/security/security-best-practices/overview"
        className="button button-ghost bg-white/90 rounded-2xl text-infinite"
        title="Get started with dfx"
      >
        <span>Learn more</span>
      </Link>
    ),
  },
  {
    label: "Chain Fusion",
    description:
      "Explore how canister smart contracts can interact directly with other chains like Bitcoin and Ethereum.",
    action: (
      <Link
        href="/docs/current/developer-docs/multi-chain/overview"
        className="button button-ghost bg-white/90 rounded-2xl text-infinite"
        title="Get started with dfx"
      >
        <span>Learn more</span>
      </Link>
    ),
  },
  {
    label: "Authentication",
    description:
      "Integrate authentication methods into your application.",
    action: (
      <Link
        href="/docs/current/developer-docs/identity/authentication/overview"
        className="button button-ghost bg-white/90 rounded-2xl text-infinite"
        title="Get started with dfx"
      >
        <span>Learn more</span>
      </Link>
    ),
  },
  {
    label: "Tokens and assets",
    description:
      "Explore creating your own token using the ICRC token standards.",
    action: (
      <Link
        href="/docs/current/developer-docs/defi/overview"
        className="button button-ghost bg-white/90 rounded-2xl text-infinite"
        title="Get started with dfx"
      >
        <span>Learn more</span>
      </Link>
    ),
  },
  {
    label: "Decentralized AI",
    description:
      "View examples of decentralized AI running onchain.",
    action: (
      <Link
        href="/docs/current/developer-docs/ai/overview"
        className="button button-ghost bg-white/90 rounded-2xl text-infinite"
        title="Get started with dfx"
      >
        <span>Learn more</span>
      </Link>
    ),
  },
  {
    label: "Governance",
    description:
      "Learn about the ICP network's governance.",
    action: (
      <Link
        href="/docs/current/developer-docs/daos/nns/overview"
        className="button button-ghost bg-white/90 rounded-2xl text-infinite"
        title="Get started with dfx"
      >
        <span>Learn more</span>
      </Link>
    ),
  },
  {
    label: "Sample dapps",
    description:
      "View additional sample applications for Motoko, Rust, and other languages.",
    action: (
      <Link
        href="/docs/current/samples/overview"
        className="button button-ghost bg-white/90 rounded-2xl text-infinite"
        title="Get started with dfx"
      >
        <span>Learn more</span>
      </Link>
    ),
  },
];

const Tile = ({ tile }: { tile: TileDescriptor }) => {
  return (
    <div
      className={`flex flex-col ${
        tile.isGhostTile
          ? "bg-grey-200 border-grey-200 hidden lg:block"
          : "bg-black-60"
      } rounded-lg border p-4 h-[260px]`}
    >
      <div className={"flex flex-col gap-2 items-start"}>
        <div className={"flex flex-row gap-2"}>
          <span className={"tw-heading-4 mb-6 whitespace-pre-wrap"}>
            {tile.label}
          </span>
        </div>
        <p>{tile.description}</p>
      </div>
      {tile.action}
    </div>
  );
};


const NextStep1: FC = () => {
  return (
    <div className="flex flex-col gap-10">
      <section>
        <div
          className="
          grid
          auto-cols-fr
          grid-rows-1
          grid-cols-1
          sm:grid-cols-2
          px-0
          gap-3
        "
        >
          {languagesTiles.map((tile, index) => (
            <Tile tile={tile} key={index} />
          ))}
        </div>
      </section>

    </div>
  );
};

export default NextStep1;