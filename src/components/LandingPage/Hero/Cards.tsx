import Link from "@docusaurus/Link";
import React from "react";
import AnimateSpawn from "../../Common/AnimateSpawn";
import transitions from "@site/static/transitions.json";
import { motion } from "framer-motion";

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
      className="container-10 grid grid-cols-1 md:grid-cols-2 gap-2"
      variants={transitions.container}
    >

      <CardWithImage href="/chainfusion" image="/img/home/btc-eth.webp">
        <div className="tw-heading-7 md:tw-heading-6 mb-2">
          Native Multi-chain
        </div>
        <h2 className="tw-heading-5 md:tw-heading-4 mb-0">
          Chain Fusion technology
        </h2>
      </CardWithImage>

      <CardWithImage href="/ai" image="/img/home/ai.webp">
        <div className="tw-heading-7 md:tw-heading-6 mb-2 whitespace-nowrap">
          AI models as smart contracts
        </div>
        <h2 className="tw-heading-5 md:tw-heading-4 mb-0">Tamperproof and trustworthy AI</h2>
      </CardWithImage>

      <CardWithImage
        href="/roadmap"
        image="/img/home/roadmap-illustration.webp"
      >
        <div className="tw-heading-7 md:tw-heading-6 mb-2">
          A new era in blockchain
        </div>
        <h2 className="tw-heading-5 md:tw-heading-4 mb-0">
          Internet Computer Roadmap
        </h2>
      </CardWithImage>

      <CardWithImage href="/ecosystem" image="/img/home/ecosystem-card.webp">
        <div className="tw-heading-7 md:tw-heading-6 mb-2">Dapps</div>
        <h2 className="tw-heading-5 md:tw-heading-4 mb-0">ICP Ecosystem</h2>
      </CardWithImage>

      <CardWithImage href="/docs/current/home" image="/img/home/dev-card.svg">
        <div className="tw-heading-7 md:tw-heading-6 mb-2">Developer Docs</div>
        <h2 className="tw-heading-5 md:tw-heading-4 mb-0">Start coding</h2>
      </CardWithImage>

      <CardWithImage href="/events" image="/img/home/events-card.webp">
        <div className="tw-heading-7 md:tw-heading-6 mb-2">Global Events</div>
        <h2 className="tw-heading-5 md:tw-heading-4 mb-0">
          Meet the community worldwide
        </h2>
      </CardWithImage>
    </AnimateSpawn>
  );
};
