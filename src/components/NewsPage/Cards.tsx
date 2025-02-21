import Link from "@docusaurus/Link";
import React from "react";
import LinkArrowUpRight from "../Common/Icons/LinkArrowUpRight";
import RoadmapCard from "../RoadmapCard/index";
import { Press } from "./types";

export const FeaturedNewsCard: React.FC<{
  reverse?: boolean;

  news: Press;

  linkLabel?: string;
}> = ({ reverse = false, news, linkLabel = "Read Now" }) => {
  return (
    <RoadmapCard
      reverse={reverse}
      imgAlt={news.title}
      imgUrl={news.imageUrl}
      contentClassName="text-black"
    >
      <h3 className="tw-heading-5 md:tw-heading-4 mb-3">{news.title}</h3>
      <div className="tw-paragraph-sm md:tw-lead-sm text-black/60 mb-6">
        {news.dateHuman} by {news.press}
      </div>
      <div className="">
        <Link href={news.url} className="link-primary link-with-icon">
          {linkLabel}
          <LinkArrowUpRight />
        </Link>
      </div>
    </RoadmapCard>
  );
};

export const NewsCard: React.FC<{
  news: Omit<Press, "tags" | "date" | "id" | "details"> & {
    details?: string;
  };
  linkLabel?: string;
  clampText?: boolean;
}> = ({ news, linkLabel = "Read Now", clampText }) => {
  return (
    <article className="rounded-xl overflow-hidden bg-white flex flex-col w-full h-full">
      <img
        className="w-full h-[200px] object-center object-cover"
        src={news.imageUrl}
        alt={news.title}
      ></img>
      <div className="px-6 pt-8 pb-6 flex flex-col flex-1">
        <h3 className={`tw-heading-5 mb-3 ${clampText && "line-clamp-2"}`}>
          {news.title}
        </h3>

        {news.press ||
          (news.dateHuman && (
            <div className="tw-paragraph-sm text-black/60 mb-6">
              {news.dateHuman} {news.press && "by " + news.press}
            </div>
          ))}
        {news.details && (
          <div
            className={`tw-paragraph-sm text-black/60 mb-6 ${
              clampText && "line-clamp-3"
            }`}
          >
            {news.details}
          </div>
        )}
        <div className="mt-auto">
          <Link href={news.url} className="link-primary link-with-icon">
            {linkLabel}
            <LinkArrowUpRight />
          </Link>
        </div>
      </div>
    </article>
  );
};

export const PromoCard: React.FC<{
  label: string;
  mailchimpUrl: string;
  ctaLabel: string;
  placeholder: string;
}> = ({ label, mailchimpUrl, ctaLabel, placeholder }) => {
  return (
    <div className="rounded-xl text-white flex px-6 py-8 md:px-8 md:py-12  backdrop-blur-2xl bg-gradient-100 from-[#3B00B9] to-[#2586B6]">
      <div className="flex flex-col gap-2">
        <h3 className="tw-title-sm mb-0">{label}</h3>
        <div className="flex-1"></div>
        <form method="post" action={mailchimpUrl} className="">
          <input
            type="text"
            placeholder={placeholder}
            className="input-text input-text-white w-full mb-6"
            name="EMAIL"
            required
          />
          <button className="button-white">{ctaLabel}</button>
        </form>
      </div>
    </div>
  );
};
