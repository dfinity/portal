import Link from "@docusaurus/Link";
import transitions from "@site/static/transitions.json";
import clsx from "clsx";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import AnimateSpawn from "../../Common/AnimateSpawn";
import styles from "./Vision.module.css";

const HashTagInner: React.FC<{
  children: React.ReactNode;
  className?: string;
  href: string;
}> = ({ children, className, href }) => (
  <Link
    className={clsx(
      "bg-[linear-gradient(250.6deg,#6A85F1_-7.42%,#C572EF_92.38%)] tw-lead-lg px-8 py-3 rounded-full text-white hover:text-white",
      className
    )}
    href={href}
  >
    {children}
  </Link>
);

export const HashTag: React.FC<{
  children: React.ReactNode;
  className?: string;
  href: string;
}> = ({ children, className, href }) => (
  <AnimateSpawn variants={transitions.item} className={className}>
    <HashTagInner href={href}>{children}</HashTagInner>
  </AnimateSpawn>
);

const Vision: React.FC<{
  children: React.ReactNode;
  hashTags: React.ReactNode[];
}> = ({ children, hashTags }) => {
  useEffect(() => {
    const vision = document.querySelector("#vision > div");

    const paragraphs = vision.querySelectorAll("p");

    function onIntersection(entries: IntersectionObserverEntry[]) {
      let showBeforeEl: HTMLElement;
      for (const entry of entries) {
        if (entry.isIntersecting) {
          // mark element that's already visible
          showBeforeEl = entry.target as HTMLElement;
          const p = entry.target as HTMLParagraphElement;
          p.style.animationPlayState = "running";

          for (const em of Array.from(p.querySelectorAll("em"))) {
            em.style.animationPlayState = "running";
          }
        }
      }

      // if there was a visible element, show all elements before it
      // this is so that the enter animation for the whole section is
      // played only when coming from the top side
      if (showBeforeEl) {
        for (const p of Array.from(paragraphs)) {
          if (p === showBeforeEl) {
            break;
          }
          p.style.animationPlayState = "running";
        }
      }
    }

    let observer = new IntersectionObserver(onIntersection, {
      rootMargin: "-10% 0px",
      threshold: 0.5,
    });
    for (const p of Array.from(paragraphs)) {
      observer.observe(p);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <AnimateSpawn
      className="container-10 pt-20 md:pt-40"
      el={motion.section}
      variants={transitions.container}
      id="vision"
    >
      <div className="relative">
        <div
          className={clsx("tw-lead md:tw-title-sm md:w-7/10", styles.vision)}
        >
          {children}
        </div>
        {hashTags.map((hashTag, index) => (
          <React.Fragment key={index}>{hashTag}</React.Fragment>
        ))}
      </div>
    </AnimateSpawn>
  );
};

export default Vision;
