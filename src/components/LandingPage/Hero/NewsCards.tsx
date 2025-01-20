import AnimateSpawn from "../../Common/AnimateSpawn";
import Link from "@docusaurus/Link";
import LinkArrowUpRight from "../../Common/Icons/LinkArrowUpRight";
import React from "react";
import { de } from "date-fns/locale";
import { motion } from "framer-motion";
import transitions from "@site/static/transitions.json";

const MotionLink = motion(Link);

const cardsData = [
  {
    news: {
      linkLabel: "Join event",
      title: "World Computer Day",
      dateHuman: "January 21, 2025, 10am-10pm. ",
      press: "",
      details: `A day exploring the World Computer, AI, Web3 and the self-writing internet.`,
      url: "https://worldcomputer.com/davos2025",
      imageUrl: "/img/decentralized-ai/news-1.jpg",
    }
  },
  {
    news: {
      linkLabel: "Watch video",
      title: "The Self-Writing & Sovereign Internet Paradigm: AI on the Internet Computer",
      dateHuman: "",
      press: "",
      url: "https://twitter.com/dominic_w/status/1750886289702834539",
      imageUrl: "/img/decentralized-ai/news-1.jpg",
    }
  },
  {
    news: {
      linkLabel: "Read the press release",
      title: "UNDP Partnership: Universal Trusted Credentials",
      dateHuman: "",
      press: "",
      details: `Collaboration to enhance Financial Inclusion of MSMEs`,
      url: "https://twitter.com/dominic_w/status/1750886289702834539",
      imageUrl: "/img/decentralized-ai/news-1.jpg",
    }
  }
];


export const NewsCard: React.FC<{
  news: {
    title: string,
    dateHuman: string,
    press: string,
    details?: string,
    url: string,
    imageUrl: string,
    linkLabel?: string;
  };
  clampText?: boolean;
  inverted?: boolean;
}> = ({ news, clampText, inverted }) => {
  return (
    <article className={`rounded-xl overflow-hidden flex flex-col w-full h-full ${
      inverted ? 'bg-[#0C0025]' : 'bg-white'
    }`}>
      <img
        className="w-full h-[200px] object-center object-cover"
        src={news.imageUrl}
        alt={news.title}
      ></img>
      <div className={`px-6 pt-8 pb-6 flex flex-col flex-1 ${
        inverted ? 'text-white' : ''
      }`}>
        <h3 className={`tw-heading-5 mb-3 ${clampText && "line-clamp-2"}`}>
          {news.title}
        </h3>
        <div className="flex-1"></div>

        {news.press || news.dateHuman && (
          <div className={`tw-paragraph-sm text-black/60 mb-6 ${
            inverted ? 'text-white/60' : 'text-black/60'
          }`}>
            {news.dateHuman} {news.press && "by " + news.press}
          </div>
        )}
        {news.details && (
          <div
            className={`tw-paragraph-sm mb-6 ${
              inverted ? 'text-white/60' : 'text-black/60'
            } ${clampText && "line-clamp-3"}`}
          >
            {news.details}
          </div>
        )}
        <div className="">
          <Link 
            href={news.url} 
            className={`link-primary link-with-icon ${
              inverted ? 'text-white hover:text-white/80' : ''
            }`}>
            {news.linkLabel}
            <LinkArrowUpRight />
          </Link>
        </div>
      </div>
    </article>
  );
};


const NewsCards: React.FC = () => {
  return (
    <>
      <AnimateSpawn
          className="container-12 pt-16 md:pt-40"
          el={motion.section}
          variants={transitions.container}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {cardsData.map((card, index) => (
              <Link
                key={index}
                href={card.news.url}
                className="h-full link-primary link-with-icon no-underline cursor-pointer hover:-translate-y-2 transition-transform text-black"
              >
                <NewsCard news={card.news} inverted={true} />
              </Link>
            ))}
          </div>
        </AnimateSpawn>
    </>
  );
};

export default NewsCards;
