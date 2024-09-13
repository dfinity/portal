import Link from "@docusaurus/Link";
import PlaySVG from "@site/static/img/svgIcons/play.svg";
import clsx from "clsx";
import React, { ReactNode } from "react";
import LinkArrowUpRight from "../Icons/LinkArrowUpRight";

export const PlayButton: React.FC<{}> = ({}) => {
  return (
    <div className="bg-white-30 backdrop-blur-xl group-hover:bg-infinite transition-colors h-12 w-12 md:h-16 md:w-16 rounded-full z-10 absolute inset-0 m-auto flex">
      <PlaySVG className="m-auto h-5 w-5 text-white transition-colors" />
    </div>
  );
};

export const ImageOnlyVideoCard: React.FC<{
  image: string;
  href: string;
  className?: string;
}> = ({ image, href, className = "" }) => {
  return (
    <Link className={clsx("col-span-1  relative group", className)} href={href}>
      <img
        src={image}
        alt=""
        className="w-full h-full object-cover rounded-2xl"
      />
      <PlayButton />
    </Link>
  );
};

export const TitleVideoCard: React.FC<{
  image: string;
  href: string;
  title: string;
  className?: string;
}> = ({ image, href, title, className = "" }) => {
  return (
    <div className="rounded-xl overflow-hidden bg-white flex flex-col w-full">
      <Link className="aspect-video flex relative group" href={href}>
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <PlayButton />
      </Link>
      <div className="px-6 pt-8 pb-6 flex flex-col flex-1">
        <h3 className={`tw-lead mb-3 line-clamp-2`}>{title}</h3>
        <div className="flex-1"></div>
        <div>
          <Link href={href} className="link-primary link-with-icon">
            Watch now
            <LinkArrowUpRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

const VideoCard: React.FC<{
  title: string;
  label?: string;
  description?: ReactNode;
  image: string;
  link: string;
  withPlayButton?: boolean;
  className?: string;
}> = ({
  title,
  label,
  description,
  image,
  link,
  withPlayButton = true,
  className = "",
}) => {
  return (
    <div
      className={clsx(
        "md:h-[450px] flex flex-col md:flex-row rounded-xl overflow-hidden",
        className
      )}
    >
      <Link className="aspect-video md:w-7/10 flex relative group" href={link}>
        <img src={image} alt={title} className="w-full h-full object-cover" />

        {withPlayButton && <PlayButton />}
      </Link>
      <div className="md:w-3/10 flex bg-white-80 border border-solid border-white md:rounded-tr-xl rounded-br-xl p-8 md:p-12 backdrop-blur-2xl">
        <div className="self-end">
          {label && (
            <h4 className="text-razzmatazz tw-heading-7 mb-0">{label}</h4>
          )}
          <p className="mb-0 tw-heading-6 md:tw-heading-5">{title}</p>
          {description && (
            <p className="text-black-60 tw-paragraph md:tw-lead-sm mb-0 mt-3">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
