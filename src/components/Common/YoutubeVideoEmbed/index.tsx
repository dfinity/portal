import Link from "@docusaurus/Link";
import React from "react";
import PlaySVG from "@site/static/img/svgIcons/play.svg";

const YoutubeVideoEmbed: React.FC<{
  videoId: string;
  altText?: string;
  className?: string;
}> = ({ videoId, className = "", altText = "" }) => {
  return (
    <Link
      className={`group relative aspect-video flex ${className}`}
      href={`https://www.youtube.com/watch?v=${videoId}`}
    >
      <div className="bg-white-30 backdrop-blur-xl group-hover:bg-infinite transition-colors h-12 w-12 md:h-16 md:w-16 rounded-full z-10 absolute inset-0 m-auto flex">
        <PlaySVG className="m-auto h-5 w-5 text-white transition-colors" />
      </div>
      <img
        className="inset-0 w-full h-full z-[1] absolute object-cover my-0"
        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        alt={altText}
      />
    </Link>
  );
};

export default YoutubeVideoEmbed;
