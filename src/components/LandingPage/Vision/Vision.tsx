import Link from "@docusaurus/Link";
import transitions from "@site/static/transitions.json";
import clsx from "clsx";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import AnimateSpawn from "../../Common/AnimateSpawn";
import LinkArrowUpRight from "../../Common/Icons/LinkArrowUpRight";
import styles from "./Vision.module.css";

const HashTag: React.FC<{
  children: React.ReactNode;
  className: string;
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

const Vision: React.FC = () => {
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
    <section className="overflow-hidden" id="vision">
      <AnimateSpawn
        className="container-10 pt-20 md:pt-40"
        variants={transitions.container}
      >
        <div className="relative">
          <div
            className={clsx("tw-lead md:tw-title-sm md:w-7/10", styles.vision)}
          >
            <p>Today, blockchain hosts tokens, but only tiny amounts of compute.</p>

            <p>
              Tomorrow, blockchain will be an autonomous cloud, and{" "}
              <em>rival traditional IT</em>.
            </p>

            <p>
              In the future, this public{" "}
              <em>everything stack</em> will eat cloud, and smart contracts
              will eat software. Enterprise will be unstoppable, and Web3
              will run autonomously under DAO control...
            </p>

            <p>
              It's already happening at scale on the Internet Computer, which is
              powering a <em>blockchain singularity</em>.
            </p>

            <p>Join the movement.</p>
            <p className="pt-6 flex flex-col gap-8 items-start">
              <Link href="/capabilities" className="button-primary text-center">
                Internet Computer capabilities
              </Link>

              <Link
                href="https://wiki.internetcomputer.org/wiki/History"
                className="link-primary link-with-icon"
              >
                Wiki history of the Internet Computer
                <LinkArrowUpRight />
              </Link>
            </p>
          </div>

          <AnimateSpawn
            variants={transitions.item}
            className="hidden md:block absolute right-[-170px] bottom-[400px]"
          >
            <HashTag
              className=""
              href="https://twitter.com/search?q=%23InternetComputer"
            >
              #InternetComputer
            </HashTag>
          </AnimateSpawn>
          <AnimateSpawn
            variants={transitions.item}
            className="hidden md:block absolute right-[180px] bottom-[270px]"
          >
            <HashTag className="" href="https://twitter.com/search?q=%23ICP">
              #ICP
            </HashTag>
          </AnimateSpawn>
          <AnimateSpawn
            variants={transitions.item}
            className="hidden md:block absolute right-[-40px] bottom-[150px]"
          >
            <HashTag
              className=""
              href="https://twitter.com/search?q=%23WorldComputer"
            >
              #WorldComputer
            </HashTag>
          </AnimateSpawn>
        </div>
      </AnimateSpawn>
    </section>
  );
};

export default Vision;
