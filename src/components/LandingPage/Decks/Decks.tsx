import Link from "@docusaurus/Link";
import clsx from "clsx";
import { motion } from "framer-motion";
import React, { FC } from "react";
import transitions from "@site/static/transitions.json";
import AnimateSpawn from "../../Common/AnimateSpawn";
import DownloadIcon from "@site/static/img/svgIcons/download.svg";

const CardLabel = ({ children }) => {
  return <span className="tw-heading-6">{children}</span>;
};

const CardTitle: FC<{
  className?: string;
  children?: React.ReactNode;
}> = ({ children, className }) => {
  return (
    <h2 className={clsx("tw-heading-4 md:tw-heading-3 mb-0", className)}>
      {children}
    </h2>
  );
};

const CardBody: FC<{
  className?: string;
  children?: React.ReactNode;
}> = ({ children, className }) => {
  return (
    <div
      className={clsx(
        "tw-paragraph-sm mb-0 md:w-7/10 lg:w-7/10 flex items-center gap-2",
        className
      )}
    >
      {children}
    </div>
  );
};

const CardImage: FC<{
  src: string;
  alt: string;
  className?: string;
}> = ({ src, alt, className }) => {
  return (
    <div
      className={clsx("hidden md:block absolute md:w-[264px] -z-1", className)}
    >
      <img src={src} alt={alt} className="w-full" />
    </div>
  );
};

const MotionLink = motion(Link);

const Card: FC<{
  className?: string;
  children?: React.ReactNode;
  href: string;
}> = ({ children, className, href }) => {
  return (
    <MotionLink
      variants={transitions.item}
      className={clsx(
        "flex-1 rounded-xl hover:no-underline relative overflow-hidden",
        className
      )}
      href={href}
      target="_blank"
    >
      <div className="flex flex-col justify-center gap-2 translate-y-0 transition-transform hover:-translate-y-4 px-8 py-12 md:p-16">
        {children}
      </div>
    </MotionLink>
  );
};

const Decks = () => {
  return (
    <AnimateSpawn
      el={motion.section}
      className="container-12 flex gap-2 flex-col md:flex-row -translate-y-1/4 md:-translate-y-1/2 -mb-30 md:-mb-40"
      variants={transitions.container}
    >
      {/* <div className="bg-[linear-gradient(48.09deg,#4DEDD3_-32.7%,#31A782_46.37%,#3B00B9_129.51%)"> */}
      <Card
        className="bg-[linear-gradient(270deg,#C772EF_6.01%,#6A85F1_100%)] text-white hover:text-white"
        href="/icp_version_12.pdf"
      >
        <CardLabel>Download Presentation</CardLabel>
        <CardTitle>Internet Computer</CardTitle>
        <CardBody>
          <DownloadIcon /> PDF - Last update: August 23rd, 2023
        </CardBody>
        <CardImage
          src="/img/home/deck-astronaut.webp"
          alt="ICP Pitch Presenation"
          className="-right-px -bottom-10"
        />
      </Card>
      <Card
        className="text-black hover:text-black bg-white"
        href="/ii_version_1.pdf"
      >
        <CardLabel>Download Presentation</CardLabel>
        <CardTitle className="text-infinite">Internet Identity</CardTitle>
        <CardBody className="text-black/60">
          <DownloadIcon /> PDF - Last update: June 20th, 2023
        </CardBody>
        <CardImage
          src="/img/home/deck-identity.webp"
          alt="Internet Identity Overview"
          className="md:-right-20 lg:-right-10 -bottom-16"
        />
      </Card>
    </AnimateSpawn>
  );
};

export default Decks;
