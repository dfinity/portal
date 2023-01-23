import React from "react";
import RightArrowIcon from "@site/static/img/svgIcons/rightArrowIcon.svg";
import transitions from "@site/static/transitions.json";
import clsx from "clsx";
import { motion } from "framer-motion";
import Link from "@docusaurus/Link";

const MotionLink = motion(Link);

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
  className?: string;
}> = ({ title, description, href, className }) => {
  return (
    <MotionLink
      variants={transitions.item}
      href={href}
      className={clsx(
        "hover:no-underline flex flex-row items-stretch",
        className
      )}
    >
      <div className="flex flex-row transition-colors items-center lg:px-16 w-full mx-0 px-8 py-6  md:min-h-[258px] md:px-16 md:py-12 bg-white/50 border border-solid border-white box-border backdrop-blur-md rounded-xl group  hover:bg-infinite hover:border-infinite">
        <div className="w-9/10 group-hover:-translate-y-3 transition-transform">
          <h3 className="tw-heading-5 md:tw-heading-4 lg:tw-heading-3 mb-2 text-infinite group-hover:text-white  transition-colors">
            {title}
          </h3>
          <p className="tw-paragraph-sm md:tw-paragraph mb-0 text-black group-hover:text-white transition-colors">
            {description}
          </p>
        </div>
        <RightArrowIcon className="text-infinite m-auto h-6 w-6 group-hover:text-white  transition-colors" />
      </div>
    </MotionLink>
  );
};

export const SmallCardWithDescription: React.FC<{
  title: string;
  href: string;
  children?: React.ReactNode;
  className?: string;
}> = ({ title, children, href, className }) => {
  return (
    <MotionLink
      variants={transitions.item}
      href={href}
      className={clsx(
        "hover:no-underline flex flex-row items-stretch",
        className
      )}
    >
      <div
        className={clsx(
          `
        flex flex-row items-center gap-2 md:gap-6
        transition-colors bg-white/50 border border-solid border-white box-border backdrop-blur-md rounded-xl group hover:bg-infinite hover:border-infinite
        w-full 
        mx-0 
        py-6 md:pt-10 md:pb-12
        px-8 md:px-12
        `,
          !!children ? "md:min-h-[200px]" : "md:min-h-[160px]"
        )}
      >
        <div className="group-hover:-translate-y-2 transition-transform flex-1">
          <h3
            className={clsx(
              "tw-heading-5 text-infinite group-hover:text-white  transition-colors",
              !!children ? "mb-2" : "mb-0"
            )}
          >
            {title}
          </h3>
          {children && (
            <p className="tw-paragraph-sm md:tw-paragraph mb-0 text-black group-hover:text-white transition-colors">
              {children}
            </p>
          )}
        </div>
        <RightArrowIcon className="text-infinite h-4 w-4 md:h-6 md:w-6 group-hover:text-white  transition-colors" />
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
