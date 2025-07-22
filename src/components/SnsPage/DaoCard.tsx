import React from "react";
import { motion } from "framer-motion";
import transitions from "@site/static/transitions.json";
import Link from "@docusaurus/Link";
import TwitterIcon from "@site/static/img/svgIcons/twitter.svg";
import DashboardIcon from "@site/static/img/svgIcons/dashboard.svg";

export type DaoCardProps = {
  name: string;
  description: React.ReactNode;
  logo: string;
  url: string;
  twitter?: string;
  dashboardUrl: string;
};

export const DaoCardButtons: React.FC<{
  url: string;
  twitter?: string;
  dashboardUrl: string;
}> = ({ url, twitter, dashboardUrl }) => (
  <div className="flex gap-2.5 items-center mt-5">
    <Link className="button-round" href={url}>
      Try it
    </Link>

    <Link className="button-round-icon" href={dashboardUrl}>
      <DashboardIcon />
    </Link>

    {twitter && (
      <Link className="button-round-icon" href={twitter}>
        <TwitterIcon />
      </Link>
    )}
  </div>
);

export const SmallDaoCard: React.FC<DaoCardProps> = ({
  name,
  description,
  logo,
  url,
  twitter,
  dashboardUrl,
}) => {
  return (
    <motion.div
      variants={transitions.item}
      className="bg-white/90 p-6 rounded-2xl h-full flex flex-col"
    >
      <div className="flex items-center justify-start gap-2 mb-2">
        <img
          src={`https://3r4gx-wqaaa-aaaaq-aaaia-cai.icp0.io${logo}`}
          alt=""
          className="w-16 h-16 object-contain object-center mx-0"
        />
        <span className="tw-heading-5">{name}</span>
      </div>
      <div className="mt-4 tw-paragraph text-black/60 line-clamp-6 flex-1">
        {description}
      </div>

      <DaoCardButtons url={url} twitter={twitter} dashboardUrl={dashboardUrl} />
    </motion.div>
  );
};

export const MediumDaoCard: React.FC<
  DaoCardProps & {
    media: { imageUrl: string } | { videoUrl: string; videoType: string };
  }
> = ({ name, description, url, twitter, dashboardUrl, media }) => {
  return (
    <motion.div
      variants={transitions.item}
      className="md:rounded-[32px] md:bg-white/60 md:backdrop-blur-2xl p-6 pb-16 md:p-12"
    >
      {"imageUrl" in media ? (
        <img
          src={media.imageUrl}
          alt={name}
          loading="lazy"
          className="rounded-2xl w-full md:h-[300px] object-cover object-center"
        />
      ) : (
        <video
          loop
          autoPlay
          muted
          playsInline
          className="rounded-2xl w-full md:h-[300px] object-cover object-center"
          aria-label={name}
        >
          <source src={media.videoUrl} type={media.videoType} />
        </video>
      )}
      <div className="md:pr-20">
        <h3 className="tw-heading-5 md:tw-heading-4 text-gradient mb-4 mt-6 md:mb-6 md:mt-12">
          {name}
        </h3>
        <p className="tw-paragraph md:tw-lead-sm mb-5">{description}</p>
        <DaoCardButtons
          twitter={twitter}
          url={url}
          dashboardUrl={dashboardUrl}
        />
      </div>
    </motion.div>
  );
};

export const MediumDaoCardContainer: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="md:container-12 md:mt-5 grid grid-cols-1 md:grid-cols-2 md:gap-10 bg-white/60 backdrop-blur-2xl md:bg-transparent md:backdrop-blur-none">
      {children}
    </div>
  );
};
