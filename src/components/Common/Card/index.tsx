import React from "react";
import RightArrowIcon from "@site/static/img/svgIcons/rightArrowIcon.svg";
import { MotionLink } from "@site/src/components/LandingPage/Features";
import transitions from "@site/static/transitions.json";

export const CardWithSubtitle: React.FC<{
  title: string;
  subtitle: string;
  href: string;
}> = ({ title, subtitle, href }) => {
  return (
    <MotionLink
      variants={transitions.item}
      href={href}
      className="hover:no-underline"
    >
      <div className="flex flex-row ease-in-out duration-300 items-center py-0 px-8 lg:px-12 w-full my-auto mx-0 h-44 md:h-52 bg-white/50 border border-white box-border backdrop-blur-md rounded-xl group hover:pb-8 hover:bg-infinite hover:border-infinite">
        <div className="w-9/10">
          <p className="tw-heading-6 md:tw-heading-5 mb-2 text-infinite group-hover:text-white">
            {title}
          </p>
          <p className="tw-paragraph-sm md:tw-paragraph mb-0 text-black group-hover:text-white">
            {subtitle}
          </p>
        </div>
        <RightArrowIcon className="text-infinite m-auto h-6 w-6 group-hover:text-white" />
      </div>
    </MotionLink>
  );
};
export const CardWithDescription: React.FC<{
  title: string;
  description: string;
  href: string;
}> = ({ title, description, href }) => {
  return (
    <MotionLink
      variants={transitions.item}
      href={href}
      className="hover:no-underline"
    >
      <div className="flex flex-row ease-in-out duration-300 items-center py-0 px-8 lg:px-16 w-full my-auto mx-0 h-52 md:h-64 bg-white/50 border border-white box-border backdrop-blur-md rounded-xl group hover:pb-8 hover:bg-infinite hover:border-infinite">
        <div className="w-9/10">
          <p className="tw-heading-5 md:tw-heading-4 lg:tw-heading-3 mb-2 text-infinite group-hover:text-white">
            {title}
          </p>
          <p className="tw-paragraph-sm md:tw-paragraph mb-0 text-black group-hover:text-white">
            {description}
          </p>
        </div>
        <RightArrowIcon className="text-infinite m-auto h-6 w-6 group-hover:text-white" />
      </div>
    </MotionLink>
  );
};

export const CardWithBackground: React.FC<{
  title: string;
  description: string;
  href: string;
  bgImageClass: string;
}> = ({ title, description, href, bgImageClass }) => {
  return (
    <MotionLink
      variants={transitions.item}
      href={href}
      className="hover:no-underline"
    >
      <div
        className={`${bgImageClass} bg-center flex flex-row ease-in-out duration-300 items-center py-0 px-8 lg:px-16 w-full my-auto mx-0 h-52 md:h-64 bg-white/50 border border-white box-border backdrop-blur-md rounded-xl group hover:pb-8 hover:bg-infinite hover:border-infinite`}
      >
        <div className="w-9/10">
          <p className="tw-heading-5 md:tw-heading-4 lg:tw-heading-3 mb-2 text-white">
            {title}
          </p>
          <p className="tw-paragraph-sm md:tw-paragraph mb-0 text-white">
            {description}
          </p>
        </div>
      </div>
    </MotionLink>
  );
};
