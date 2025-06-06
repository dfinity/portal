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
    label: "Download and install Motoko",
    description: "Start building with Motoko in a local development environment.",
    icon: (
      <img
        src="/img/dfinity_logo.svg"
        alt="Install Motoko"
        className="w-10 h-10"
        loading="lazy"
      />
    ),
    action: (
      <Link
        href="/docs/motoko/install"
        className="button button-ghost bg-white/90 rounded-2xl text-infinite outline outline-2 outline-black flex items-center justify-center text-center"
        title="Download and install Motoko"
      >
        Download and install
      </Link>
    ),
  },
  {
    label: "Try Motoko online",
    description: "Write, edit, deploy, and share Motoko projects directly in your browser.",
    icon: (
      <img
        src="/img/docs/ninja-star-logo.svg"
        alt="Try Motoko online"
        className="w-10 h-10"
        loading="lazy"
      />
    ),
    action: (
      <Link
        href="https://icp.ninja"
        className="button button-ghost bg-white/90 rounded-2xl text-infinite outline outline-2 outline-black flex items-center justify-center text-center"
        title="Try Motoko online"
      >
        Try Motoko online
      </Link>
    ),
  },
];

const Tile = ({ tile }: { tile: TileDescriptor }) => {
  return (
    <div
      className={`flex flex-col justify-between rounded-xl border-4 border-black outline outline-2 outline-black p-8 h-[260px]
        shadow-2xl hover:shadow-3xl transition-all`}
    >
      <div className="flex flex-col gap-2 items-start">
        <div className="flex flex-row gap-3 items-center">
          {tile.icon}
          <span className="text-lg font-bold text-gray-900">{tile.label}</span>
        </div>
        <p className="text-gray-700">{tile.description}</p>
      </div>
      <div className="mt-auto">{tile.action}</div>
    </div>
  );
};



const Card: FC = () => (
  <div className="flex flex-col gap-8">
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {languagesTiles.map((tile, index) => (
          <Tile tile={tile} key={index} />
        ))}
      </div>
    </section>
  </div>
);

export default Card;

