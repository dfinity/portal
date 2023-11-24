import React from "react";
import data from "@site/.docusaurus/contentful/default/press.json";
import Link from "@docusaurus/Link";
import LinkArrowUpRight from "../../Common/Icons/LinkArrowUpRight";

export type Press = {
  id: string;
  title: string;
  details: string;
  date: string;
  dateHuman: string;
  press: string;
  url: string;
  tags: string[];
};

const NewsPageLink = () => {
  return (
    <Link
      className="link-white link-with-icon"
      href="https://dfinity.org/events-and-news/#news"
    >
      More News
      <LinkArrowUpRight></LinkArrowUpRight>
    </Link>
  );
};

export const NewsSection = () => {
  return (
    <div className="container-10 py-20">
      <div className="flex justify-between mb-8 items-center">
        <h2 className="tw-heading-7-caps mb-0 text-white/60">
          Latest articles
        </h2>
        <div className="hidden sm:block">
          <NewsPageLink />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 sm:-mx-6">
        {data.slice(0, 4).map((item) => (
          <Link
            key={item.id}
            className="
              text-white hover:no-underline hover:text-white/60 hidden 
              [&:nth-child(1)]:block [&:nth-child(2)]:block md:block

              border-0

              border-t sm:border-t-0 first:border-t-0 first:pt-0 first:mt-0
              pt-6 mt-6 sm:pt-0 sm:mt-0

              sm:px-6  sm:border-r border-white/30 border-solid
              last:sm:border-0
            "
            href={item.url}
          >
            <h4 className="tw-heading-6 md:tw-heading-5 mb-2">{item.title}</h4>
            <p className="tw-paragraph-sm md:tw-lead-sm mb-0 text-white/30">
              {item.dateHuman}
            </p>
          </Link>
        ))}
      </div>

      <div className="sm:hidden mt-6">
        <NewsPageLink />
      </div>
    </div>
  );
};
