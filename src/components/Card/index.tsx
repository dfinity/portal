import Link from "@docusaurus/Link";
import React, { FC, ReactNode } from "react";

interface TileDescriptor {
  isGhostTile?: boolean;
  action?: ReactNode | null;
  icon?: ReactNode | null;
  description?: ReactNode;
  label?: string;
}

const languagesTiles: TileDescriptor[] = [
  {
    label: "ICP Ninja",
    description:
      "Explore example projects using a web-based IDE. Create and deploy ICP smart contracts directly in your web browser.",
    icon: (
      <img
        src="/img/docs/ninja-star-logo.svg"
        alt="Motoko docs"
        className="w-10 h-10"
        loading="lazy"
      />
    ),
    action: (
      <Link
        href="/docs/building-apps/developer-tools/icp-ninja"
        className="button button-ghost bg-white/90 rounded-2xl text-infinite"
        title="Get started with ICP Ninja"
      >
        <span>Get started with ICP Ninja</span>
      </Link>
    ),
  },
  {
    label: "dfx",
    description:
      "dfx is a command line tool used to create, deploy, and manage ICP smart contracts. Jump into developing in a local environment.",
    icon: (
      <img
        src="/img/dfinity_logo.svg"
        alt="Get started with dfx"
        className="w-10 h-10"
        loading="lazy"
      />
    ),
    action: (
      <Link
        href="/docs/building-apps/getting-started/install"
        className="button button-ghost bg-white/90 rounded-2xl text-infinite"
        title="Get started with dfx"
      >
        <span>Get started with dfx</span>
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
          {tile.icon}
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


const DocsCard: FC = () => {
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

export default DocsCard;
