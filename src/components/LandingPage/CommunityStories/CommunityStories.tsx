import Link from "@docusaurus/Link";
import React from "react";
import AnimateSpawn from "../../Common/AnimateSpawn";
import LinkArrowRight from "../../Common/Icons/LinkArrowRight";
import OpenChatCard, {
  OpenChatCardProps,
} from "../../Common/OpenChatCard/OpenChatCard";
import transitions from "@site/static/transitions.json";

export const englishOpenChatCopy: OpenChatCardProps = {
  title: "OpenChat raised 1M ICP in 6 hours",
  body: (
    <>
      Open Chat is an early "open internet service." An SNS DAO assumed control
      of its smart contracts, and swapped $ICP for its governance tokens,
      placing its community in control, and creating a powerful community
      treasury.
    </>
  ),
  imageUrl: "/img/openchat/oc-img.webp",
  links: [
    <Link className="link-primary link-with-icon" href="/openchat">
      <LinkArrowRight />
      See how OpenChat decentralized, fully on-chain
    </Link>,
    <Link className="link-primary link-with-icon" href="/sns">
      <LinkArrowRight />
      What is an SNS DAO
    </Link>,
    <Link
      className="link-primary link-with-icon"
      href="/sns/faq#what-is-a-decentralization-swap"
    >
      <LinkArrowRight />
      How to raise funding for an SNS DAO
    </Link>,
  ],
};

export type CommunityProjectStory = {
  title: React.ReactNode;
  body: React.ReactNode;
  imageUrl: string;
};

const CommunityStories: React.FC<{
  title: React.ReactNode;
  openChat: OpenChatCardProps;
  projects: CommunityProjectStory[];
}> = ({ openChat, projects, title }) => {
  return (
    <>
      <AnimateSpawn
        className="container-10 pt-20 md:pt-40"
        id="community"
        variants={transitions.item}
      >
        <h2 className="tw-heading-3 md:tw-heading-60 text-gradient mb-0">
          {title}
        </h2>
      </AnimateSpawn>

      <OpenChatCard className="-mt-20" {...openChat} />

      <section className="md:container-12 md:mt-16">
        <div className="grid grid-cols-1 gap-y-16 md:grid-cols-2 md:gap-10 bg-white/60 backdrop-blur-2xl md:bg-transparent md:backdrop-blur-none pb-24 md:pb-0">
          {projects.map((project, index) => (
            <div
              className={
                "md:rounded-[32px] md:bg-white/60 md:backdrop-blur-2xl p-6 md:p-12"
              }
              key={index}
            >
              <img
                src={project.imageUrl}
                alt=""
                loading="lazy"
                className="rounded-2xl w-full"
              />
              <div className="md:pr-20">
                <h3 className="tw-heading-5 md:tw-heading-4 text-gradient mb-4 mt-6 md:mb-6 md:mt-12">
                  {project.title}
                </h3>
                <p className="tw-paragraph md:tw-lead-sm mb-0">
                  {project.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default CommunityStories;
