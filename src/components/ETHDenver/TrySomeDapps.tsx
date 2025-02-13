import React, { FC } from "react";

import AnimateSpawn from "../Common/AnimateSpawn";
import Link from "@docusaurus/Link";
import { motion } from "framer-motion";
import transitions from "@site/static/transitions.json";

const projects: {
  logo: string;
  name: string;
  description: string;
  agenda: string[];
}[] = [
    {
      name: "AstroX (me wallet)",
      logo: "/img/ethdenver/astrox.webp",
      description:
        "Multichain wallet securing your assets without seed phrase across any devices.",
      agenda: ["Mar 2 - 5, 2023"],
    },
    {
      name: "Hot or Not",
      logo: "/img/ethdenver/hotornot.webp",
      description: "Monetise Time on Social Media. Video platform in ICP.",
      agenda: ["Mar 2 - 5, 2023"],
    },
    {
      name: "Finterest",
      logo: "/img/ethdenver/finterest.webp",
      description: "The first truly decentralized price feed.",
      agenda: ["Mar 2 - 5, 2023"],
    },
    {
      name: "Toniq Labs",
      logo: "/img/ethdenver/toniq.webp",
      description: "We help you build, launch, and grow NFT-based businesses.",
      agenda: ["Mar 2 - 5, 2023"],
    },
    {
      name: "ORIGYN",
      logo: "/img/ethdenver/origyn.webp",
      description: "Digital verifications for physical objects through NFTs.",
      agenda: ["Mar 3 / 4, 2023"],
    },

    {
      name: "Demergent Labs",
      logo: "/img/ethdenver/demergent-labs.webp",
      description: "Accelerating the adoption of Web3 and the Internet Computer.",
      agenda: ["Mar 3 / 4, 2023"],
    },
    {
      name: "Itoka",
      logo: "/img/ethdenver/itoka-logo.webp",
      description:
        "Become a musician smooth and simple with AI and Web3 technology. Only on ICP.",
      agenda: ["Mar 3 / 4, 2023", "5:00pm - 6:00pm MST"],
    },

    {
      name: "ntagle",
      logo: "/img/ethdenver/ntagle-logo.webp",
      description:
        "Scalable and cost-effective way to trustlessly bind physical objects to canisters",
      agenda: ["Mar 4, 2023", "8:00am - 10:00am MST"],
    },
  ];

const TrySomeDapps: FC<{
  id: string;
}> = ({ id }) => {
  return (
    <section id={id} className="relative z-0 mb-20">
      <AnimateSpawn variants={transitions.item}>
        <div className="container-10 pt-20 md:pt-30">
          <div className="">
            <h2 className="tw-heading-alt-2">
              Try some Dapps
              <br />
              <span className="inline-block text-gradient-base text-gradient-denver">
                ICP Booth
              </span>
            </h2>
            <p className="tw-lead-sm md:tw-lead text-black-60 mb-6 md:w-6/10">
              Step into the exciting world of ICP with us as your guide!
              Take a look at the Web3 projects currently reinventing the
              internet on the Internet Computer blockchain.
            </p>
          </div>
        </div>
        <AnimateSpawn
          className="container-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 mt-12"
          variants={transitions.container}
        >
          {projects.map((p, i) => (
            <motion.article
              variants={transitions.item}
              key={p.name + i}
              className="rounded-xl bg-white p-6 md:p-8 no-underline text-black hover:no-underline hover:text-black flex flex-col"
            >
              <img
                src={p.logo}
                alt={p.name}
                className="w-16 sm:w-20 mb-3 h-16 sm:h-20 object-contain absolute left-6 top-6 sm:static"
              />
              <div className="ml-[86px] sm:ml-0 flex-1 flex flex-col">
                <h3 className="tw-heading-6 sm:tw-heading-5 mb-1 sm:mb-2">
                  {p.name}
                </h3>
                <p className="tw-paragraph-sm sm:tw-lead-sm mb-3 sm:mb-4 text-black-60 flex-1">
                  {p.description}
                </p>
                <p className="mb-0 tw-title-navigation text-gradient-base text-gradient-denver">
                  {p.agenda.map((a) => (
                    <span key={a} className="inline-block">
                      {a}
                    </span>
                  ))}
                </p>
              </div>
            </motion.article>
          ))}
        </AnimateSpawn>

        <div className="relative -mt-96 mb-10 md:mb-40">
          <AnimateSpawn
            className="mt-96 pt-20 md:pt-30 text-center flex flex-col items-center gap-6"
            variants={transitions.item}
          >
            <Link className="button-primary" href="/ecosystem">
              Check out the Ecosystem
            </Link>
          </AnimateSpawn>
        </div>
      </AnimateSpawn>
    </section>
  );
};

export default TrySomeDapps;
