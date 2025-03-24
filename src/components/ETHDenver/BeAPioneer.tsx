import React, { FC } from "react";

import AnimateSpawn from "../Common/AnimateSpawn";
import Link from "@docusaurus/Link";
import { motion } from "framer-motion";
import transitions from "@site/static/transitions.json";

function Card({
  title,
  body,
  link,
}) {
  return (
    <Link to={link} className="bg-white rounded-xl p-6 md:p-8 flex flex-col gap-4 justify-between hover:no-underline hover:-translate-y-2 transition-transform">
      <div className="text-black">
        <h3 className="tw-heading-4">{title}</h3>
        <p className="tw-paragraph">{body}</p>
      </div>
      <span className="button-round-icon border border-solid w-16 h-16 p-0 inline-flex justify-center items-center">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.1716 6.9999L6.8076 1.63589L8.2218 0.22168L16 7.9999L8.2218 15.778L6.8076 14.3638L12.1716 8.9999H0V6.9999H12.1716Z" fill="currentColor"/>
        </svg>
      </span>
    </Link>
  );
}

const BeAPioneer: FC<{
  title: string;
  body: string;
  cta: string;
  ctaLink: string;
  cards: {
    title: string;
    body: string;
    link: string;
  }[];
  id?: string;
}> = ({ title, body, cta, ctaLink, cards, id }) => {
  return (
    <section id={id}>
      <AnimateSpawn variants={transitions.container} className="container-12 py-8">
        <div className="flex flex-col justify-center items-center">
          <motion.div
            variants={transitions.item}
            className="text-center"
          >
            <h2 className="md:w-6/12 mx-auto tw-heading-alt-2">{title}</h2>
            <p className="md:w-6/12 mx-auto tw-lead text-black-60">{body}</p>
            <Link className="button-outline mt-4" to={ctaLink}>
              {cta}
            </Link>
          </motion.div>
        </div>

        <motion.div variants={transitions.item} className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-2 mt-20">
          {cards.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              body={card.body}
              link={card.link}
            />
          ))}
        </motion.div>
        
      </AnimateSpawn>
    </section>
  );
};

export default BeAPioneer;
