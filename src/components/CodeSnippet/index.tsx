import React, { useRef, useState } from "react";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import transitions from "@site/static/transitions.json";
import AnimateSpawn from "@site/src/components/Common/AnimateSpawn";
import { motion, AnimatePresence } from "framer-motion";
import Link from "@docusaurus/Link";
import LinkArrowRight from "../Common/Icons/LinkArrowRight";
import CodeBlockString from "@site/src/theme/CodeBlock/Content/String";

const CodeSnippet = ({
  title,
  description,
  link,
  snippet,
  isExpanded,
  toggleExpand,
}) => {
  return (
    <AnimateSpawn
      className="flex flex-col md:flex-row gap-3 md:gap-1/10 items-center"
      variants={transitions.container}
      el={motion.section}
    >
      <motion.div className="md:w-4/10 " variants={transitions.item}>
        <h2 className="tw-heading-4 md:tw-heading-3  mb-3">{title}</h2>
        <p className="tw-paragraph md:tw-lead-sm mb-3">{description}</p>
        <p className="mb-0 mt-8">
          <Link className="link-primary link-with-icon" href={link}>
            <LinkArrowRight />
            Get started now
          </Link>
        </p>
      </motion.div>
      <motion.div className="md:max-w-5/10 space-y-5 w-full">
        <AnimatePresence>
          <motion.div
            initial={false}
            animate={{ height: isExpanded ? "auto" : "24rem" }}
            className="overflow-hidden rounded-2xl"
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <CodeBlockString language={snippet.language} showLineNumbers={true}>
              {snippet.code}
            </CodeBlockString>
          </motion.div>
          {/* <motion.div className="text-center">
            <Link
              className="link-primary link-with-icon md:hover:cursor-pointer text-center select-none"
              onClick={toggleExpand}
            >
              {isExpanded ? (
                <>
                  Hide <LinkArrowUp />
                </>
              ) : (
                <>
                  Expand <LinkArrowDown />
                </>
              )}
            </Link>
          </motion.div> */}
        </AnimatePresence>
      </motion.div>
    </AnimateSpawn>
  );
};

export default CodeSnippet;
