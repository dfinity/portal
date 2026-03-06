import Link from "@docusaurus/Link";
import React, { FC, ReactNode } from "react";

interface TileDescriptor {
  isGhostTile?: boolean;
  icon?: ReactNode | null;
  description?: ReactNode;
  label?: string;
  links?: { text: string; href: string }[];
}

// Single tile definition
const singleTile: TileDescriptor = {
  label: "Need help?",
  description:
    "Did you get stuck somewhere in this tutorial, or do you feel like you need additional help understanding some of the concepts? Ask AI or reach out to ICP developers via Discord or the Forum:",
  icon: (
    <img
      src="/img/docs/Badges.png"
      alt="ICP Astronaut"
      className="w-15 h-15"
      loading="lazy"
    />
  ),
  links: [
    { text: "Ask AI", href: "https://internetcomputer.org/ai" },
    { text: "Developer Discord", href: "https://discord.internetcomputer.org" },
    { text: "Developer Forum", href: "https://forum.dfinity.org" },
  ],
};

const Tile = ({ tile }: { tile: TileDescriptor }) => {
  return (
    <div
      className={`flex flex-col ${
        tile.isGhostTile
          ? "bg-white-200 border-grey-200 hidden lg:block"
          : "bg-black-80"
      } rounded-lg border p-4 min-h-[260px]`}
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
      <ul className="list-disc pl-5">
        {tile.links?.map((link, index) => (
          <li key={index}>
            <Link href={link.href} className="text-blue-500 hover:underline">
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const TutorialFooter: FC = () => {
  return (
    <div className="flex flex-col gap-10">
      <section>
        <div className="px-0 gap-3">
          {/* Render the single tile */}
          <Tile tile={singleTile} />
        </div>
      </section>
    </div>
  );
};

export default TutorialFooter;
