import React, { ReactNode } from "react";
import slugify from "slugify";
import AnimateSpawn from "../AnimateSpawn";
import transitions from "@site/static/transitions.json";
import { motion } from "framer-motion";
import clsx from "clsx";

export function idFromTitle(title: string) {
  const slug = slugify(title, { strict: true, lower: true });
  if (slug.match(/^\d/)) {
    return "sns-faq-" + slug;
  }
  return slug;
}

export const Faq: React.FC<{
  title: string;
  children: ReactNode;
  id?: string;
}> = ({ children, title, id }) => {
  return (
    <article
      id={id || slugify(title, { lower: true, strict: true })}
      className="scroll-m-[110px]"
    >
      <AnimateSpawn variants={transitions.item}>
        <motion.h2
          className="tw-heading-5 md:tw-heading-3 mb-6 relative group"
          variants={transitions.item}
        >
          {title}
          <a
            className="text-infinite absolute -left-6 md:-left-8 top-0 hidden group-hover:inline-block hover:text-infinite-60 hover:no-underline md:pr-3"
            href={`#${idFromTitle(title)}`}
          >
            #
          </a>
        </motion.h2>
        <motion.div
          variants={transitions.item}
          className="
            tw-paragraph md:tw-lead-sm
            prose
            max-w-none
            prose-h3:tw-heading-6 prose-h3:md:tw-heading-5 prose-h3:mb-4
            prose-p:tw-paragraph md:prose-p:tw-lead-sm prose-p:mb-3
            prose-img:mb-0 prose-img:mt-2 prose-img:w-full prose-img:aspect-video prose-img:object-contain prose-img:object-center
            prose-a:font-normal hover:prose-a:text-infinite hover:prose-a:no-underline
            prose-ul:mb-4 prose-ul:list-none prose-ul:pl-0 prose-ul:tw-paragraph md:prose-ul:tw-lead-sm
            prose-li:bg-[url('/img/checkmark.svg')] prose-li:bg-no-repeat prose-li:bg-left-top prose-li:pl-8 prose-li:my-3 prose-li:tw-paragraph prose-li:md:tw-lead-sm
        "
        >
          {children}
        </motion.div>
      </AnimateSpawn>
    </article>
  );
};

export const FaqSection: React.FC<{
  title: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  id?: string;
}> = ({ children, title, id, className, contentClassName }) => {
  return (
    <div
      className={clsx(
        "flex flex-col md:flex-row md:gap-1/12 scroll-m-[110px]",
        className
      )}
      id={id}
    >
      <div className="md:w-4/12 flex-shrink-0">
        <AnimateSpawn
          variants={transitions.item}
          className="md:sticky md:top-10"
        >
          {title}
        </AnimateSpawn>
      </div>
      <div
        className={clsx(
          "flex-1 flex flex-col gap-12 md:gap-20 relative",
          contentClassName
        )}
      >
        {children}
      </div>
    </div>
  );
};
