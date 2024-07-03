import Link from "@docusaurus/Link";
import React from "react";
import AnimateSpawn from "../../Common/AnimateSpawn";
import transitions from "@site/static/transitions.json";
import { motion } from "framer-motion";
import HubsLogo from "../../../../static/img/home/icp-hubs-logo.svg";

const MotionLink = motion(Link);

export const CardWithImage: React.FC<{
  children?: React.ReactNode;
  image: string;
  href: string;
}> = ({ children, image, href }) => {
  return (
    <MotionLink
      variants={transitions.item}
      to={href}
      className="bg-black/60 hover:bg-black/20 backdrop-blur-2xl rounded-xl pl-6 pr-20 md:pl-16 md:pr-40 text-white hover:no-underline transition-all hover:text-white min-h-[160px] md:min-h-[220px] flex flex-col justify-center gap-2 group"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "contain",
        backgroundPosition: "bottom right",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="group-hover:-translate-y-2 transition-transform">
        {children}
      </div>
    </MotionLink>
  );
};

export const CardsSection = () => {
  return (
    <AnimateSpawn
      className="container-12 mt-30"
      variants={transitions.container}
    >
      <article className="overflow-clip relative bg-[radial-gradient(circle_at_50%,#000,#3B00B9,#1E005D)] rounded-[32px] text-white  mt-6">
        <img
          loading="lazy"
          src="img/home/chainfusion.webp"
          className="object-cover size-full absolute"
        />
        <div className="flex flex-col md:flex-row items-stretch">
          <div className="basis-1/2">
          </div>
          <div className=" basis-1/2 p-1/10">
            <h4 className="tw-heading-4 md:tw-heading-60">
              Run AI models fully on chain
            </h4>
            <div className="tw-paragraph md:tw-lead-sm mt-6">
              Nullam id dolor id nibh ultricies vehicula ut id elit. Donec
              ullamcorper nulla non metus auctor fringilla. Vivamus sagittis
              lacus vel augue laoreet rutrum faucibus dolor auctor. Donec sed
              odio dui.
            </div>
            <Link className="button-outline-white-30 mt-6" href="/ai">
              BUILD NOW
            </Link>
          </div>
        </div>
      </article>

      <article className="bg-[linear-gradient(48deg,#4DEDD3_-32.7%,#31A782_33.06%,#3B00B9_129.51%)] rounded-[32px] text-white  overflow-clip mt-6">
        <div className="flex flex-col md:flex-row items-stretch	 ">
          <div className="basis-1/2 relative ">
            <img
              loading="lazy"
              src="img/home/ai.webp"
              className="object-cover size-full"
            />
          </div>
          <div className=" basis-1/2 p-1/10">
            <h4 className="tw-heading-4 md:tw-heading-60">
              Run AI models fully on chain
            </h4>
            <div className="tw-paragraph md:tw-lead-sm mt-6">
              Nullam id dolor id nibh ultricies vehicula ut id elit. Donec
              ullamcorper nulla non metus auctor fringilla. Vivamus sagittis
              lacus vel augue laoreet rutrum faucibus dolor auctor. Donec sed
              odio dui.
            </div>
            <Link className="button-outline-white-30 mt-6" href="/ai">
              BUILD NOW
            </Link>
          </div>
        </div>
      </article>
      <div className="bg-[linear-gradient(#3B00B9,#9D80DC)] rounded-[32px] text-white overflow-clip mt-6">
        <div className="flex flex-col md:flex-row items-stretch	 ">
          <div className="basis-1/2 relative ">
            <img
              loading="lazy"
              src="img/home/icp-hubs.webp"
              className="object-cover size-full"
            />
          </div>
          <div className=" basis-1/2 p-1/10">
            <HubsLogo />

            <div className="tw-heading-4 md:tw-heading-60">
              37 countries around the globe
            </div>
            <div className="tw-paragraph md:tw-lead-sm mt-6">
              Igniting global innovation & collaboration, connecting ICP
              communities. Join builders, creators, and entrepreneurs all around
              the world.
            </div>
            <Link className="button-outline-white-30 mt-6" href="#">
              Join thriving Communities
            </Link>
          </div>
        </div>
      </div>
    </AnimateSpawn>
  );
};
