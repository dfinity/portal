import Link from "@docusaurus/Link";
import React from "react";

export const SliderLink: React.FC<{
  href: string;
  children: React.ReactNode;
}> = ({ href, children }) => {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 tw-heading-7 md:tw-heading-6"
    >
      {children}
    </Link>
  );
};

export const Slide: React.FC<{
  // title: string;
  backgroundImageUrl: string;
  sideImageUrl?: string;
  children: React.ReactNode;
}> = ({ backgroundImageUrl, sideImageUrl, children }) => {
  return (
    <div
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      className="
        min-w-full
        bg-right md:bg-center bg-cover 
        flex md:items-center justify-between
        pt-20 pb-12 px-10
        rounded-xl
        overflow-hidden
        snap-center
      "
    >
      <div
        className="
          md:w-6/12 md:ml-1/12 
          prose-invert
          prose
          prose-h3:tw-heading-5 md:prose-h3:tw-heading-3
          prose-ul:list-none prose-ul:p-0 prose-li:m-0
          prose-a:no-underline hover:prose-a:underline hover:prose-a:text-white-80
          prose-p:mb-4 md:prose-p:mb-6 prose-p:mt-0 prose-p:flex
        "
      >
        {children}
      </div>
      <div className="hidden md:block w-4/12 mr-1/12 text-right">
        {sideImageUrl && <img src={sideImageUrl} alt="" className="" />}
      </div>
    </div>
  );
};
