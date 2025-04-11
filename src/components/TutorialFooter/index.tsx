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
    "Did you get stuck somewhere in this tutorial, or do you feel like you need additional help understanding some of the concepts? The ICP community has several resources available for developers, like working groups and bootcamps, along with our Discord community, forum, and events such as hackathons. Here are a few to check out:",
  icon: (
    <img
      src="/img/docs/Badges.png"
      alt="ICP Astronaut"
      className="w-15 h-15"
      loading="lazy"
    />
  ),
  links: [
    { text: "Developer Discord", href: "https://discord.internetcomputer.org" },
    { text: "Developer Liftoff forum discussion", href: "https://forum.dfinity.org/t/developer-journey-feedback-and-discussion/23893" },
    { text: "Developer tooling working group", href: "https://www.google.com/calendar/event?eid=MHY0cjBubmlnYXY1cTkzZzVzcmozb3ZjZm5fMjAyMzEwMDVUMTcwMDAwWiBjX2Nnb2VxOTE3cnBlYXA3dnNlM2lzMWhsMzEwQGc&ctz=Europe/Zurich" },
    { text: "Motoko Bootcamp - The DAO Adventure", href: "https://github.com/motoko-bootcamp/dao-adventure" },
    { text: "Motoko Bootcamp - Discord community", href: "https://discord.gg/YbksCUxdzk" },
    { text: "Motoko developer working group", href: "https://www.google.com/calendar/event?eid=ZWVnb2luaHU0ZjduMTNpZHI3MWJkcWVwNWdfMjAyMzEwMTJUMTUwMDAwWiBjX2Nnb2VxOTE3cnBlYXA3dnNlM2lzMWhsMzEwQGc&ctz=Europe/Zurich" },
    { text: "Upcoming events and conferences", href: "https://dfinity.org/events-and-news/)" },
    { text: "Upcoming hackathons", href: "https://dfinity.org/hackathons/" },
    { text: "Weekly developer office hours to ask questions, get clarification, and chat with other developers live via voice chat.", href: "https://discord.internetcomputer.org" },
    { text: "Submit your feedback to the ICP Developer feedback board", href: "https://dx.internetcomputer.org" },
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
