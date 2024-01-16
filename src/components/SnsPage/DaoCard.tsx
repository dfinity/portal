import React from "react";
import { motion } from "framer-motion";

import transitions from "@site/static/transitions.json";
import Link from "@docusaurus/Link";
import TwitterIcon from "@site/static/img/svgIcons/twitter.svg";
import DashboardIcon from "@site/static/img/svgIcons/dashboard.svg";

export type DaoCardProps = {
  name: string;
  description: string;
  logo: string;
  url: string;
  twitter?: string;
  dashboardUrl: string;
};

const DaoCard: React.FC<DaoCardProps> = ({
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
      <div className="flex items-center gap-2 mb-2">
        <img
          src={`https://3r4gx-wqaaa-aaaaq-aaaia-cai.icp0.io${logo}`}
          alt=""
          className="w-16 h-16 object-contain object-center"
        />
        <span className="tw-heading-5">{name}</span>
      </div>
      <div className="mt-4 tw-paragraph text-black/60 line-clamp-6 flex-1">
        {description}
      </div>

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
    </motion.div>
  );
};

export default DaoCard;
