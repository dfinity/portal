import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "@site/src/components/LandingPage/Foundation/index.module.css";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import RightArrowSVG from "@site/static/img/svgIcons/rightArrowIcon.svg";
import DownloadSVG from "@site/static/img/svgIcons/download.svg";
import TeamPhotoMobile1 from "@site/static/img/Foundation/teamPhotoMobile1.png";
import TeamPhotoMobile2 from "@site/static/img/Foundation/teamPhotoMobile2.png";
import {
  motion,
  useAnimation,
  useSpring,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import { useInView } from "react-intersection-observer";
import transitions from "@site/static/transitions.json";
import useGlobalData from "@docusaurus/useGlobalData";

const stats = [
  { title: "Team Members", value: "260+" },
  { title: "Publications", value: "1564" },
  { title: "Citations", value: "83,347" },
  { title: "Patents", value: "191" },
];

const cards = [
  {
    isMain: true,
    title: ["Roadmap"],
    body: "The DFINITY Foundation’s contributions to the IC roadmap are subject to community discussion and voting",
    link: "https://dfinity.org/roadmap",
  },
  {
    isMain: false,
    title: ["Internet Computer Infographic"],
    body: "A beautiful dream emerged in 2014. One team set itself to realizing that dream.",
    link: "https://internetcomputer.org/icig.pdf",
  },
  {
    isMain: false,
    title: ["IC for Geeks", "White Paper"],
    body: "v1.3 April 19, 2022",
    link: "https://internetcomputer.org/whitepaper.pdf",
  },
];

function shuffle(sourceArray) {
  for (let i = 0; i < sourceArray.length - 1; i++) {
    let j = i + Math.floor(Math.random() * (sourceArray.length - i));

    let temp = sourceArray[j];
    sourceArray[j] = sourceArray[i];
    sourceArray[i] = temp;
  }
  return sourceArray;
}

function Card({ isMain, title, body, link }) {
  return (
    <Link
      to={link}
      className={clsx(styles.card, styles.cardHover, isMain && styles.mainCard)}
    >
      <div className={styles.cardBodyContainer}>
        {title.map((titleLine) => (
          <p className={styles.cardTitle} key={titleLine}>
            {titleLine}
          </p>
        ))}
        <p className={styles.cardBody}>{body}</p>
      </div>
      {isMain ? (
        <RightArrowSVG className={styles.cardIcon} />
      ) : (
        <DownloadSVG className={styles.cardIcon} />
      )}
    </Link>
  );
}

function Foundation() {
  const globalData = useGlobalData();
  const teamInformation = globalData["team-information"]["default"] as any;
  const RDMembers = shuffle(
    teamInformation.find((t) => t.title === "R&D").members
  );
  const OperationMembers = shuffle(
    teamInformation.find((t) => t.title === "Operations").members
  );
  const LeadershipMembers = shuffle(
    teamInformation.find((t) => t.title === "Leadership").members
  );
  const controls = useAnimation();
  const divRef = useRef(null);
  const { scrollY } = useViewportScroll();
  const [elementTop, setElementTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const offset = 150;
  const initial = elementTop - clientHeight;
  const final = elementTop + offset;
  const yFrontRange = useTransform(
    scrollY,
    [initial, final],
    [offset, -offset]
  );
  const yMiddleRange = useTransform(
    scrollY,
    [initial, final],
    [offset * 2, -offset * 2]
  );
  const yBackRange = useTransform(
    scrollY,
    [initial, final],
    [offset * 3, -offset * 3]
  );
  const yFront = useSpring(yFrontRange, { stiffness: 400, damping: 90 });
  const yMiddle = useSpring(yMiddleRange, { stiffness: 400, damping: 90 });
  const yBack = useSpring(yBackRange, { stiffness: 400, damping: 90 });
  const { ref, inView } = useInView({ threshold: 0 });
  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [controls, inView]);

  useLayoutEffect(() => {
    const element = divRef.current;
    const onResize = () => {
      setElementTop(
        element.getBoundingClientRect().top + window.scrollY ||
          window.pageYOffset
      );
      setClientHeight(window.innerHeight);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [divRef]);
  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={transitions.container}
      className={styles.main}
    >
      <a className={styles.anchor} id="foundation" />
      <motion.div
        variants={transitions.item}
        ref={divRef}
        className={styles.container}
      >
        {LeadershipMembers.slice(0, 2).map((member) => (
          <motion.div
            className={styles.teamPhotoContainer}
            key={member.name}
            style={{ y: yFront }}
          >
            <img src={member.photo + "?w=120"} alt={member.name} />
          </motion.div>
        ))}
        {OperationMembers.slice(0, 2).map((member) => (
          <motion.div
            className={styles.teamPhotoContainer}
            key={member.name}
            style={{ y: yFront }}
          >
            <img src={member.photo + "?w=120"} alt={member.name} />
          </motion.div>
        ))}
        {RDMembers.slice(0, 1).map((member) => (
          <motion.div
            className={styles.teamPhotoContainer}
            key={member.name}
            style={{ y: yFront }}
          >
            <img src={member.photo + "?w=120"} alt={member.name} />
          </motion.div>
        ))}
        {OperationMembers.slice(2, 4).map((member) => (
          <motion.div
            className={styles.teamPhotoContainer}
            key={member.name}
            style={{ y: yMiddle }}
          >
            <img src={member.photo + "?w=120"} alt={member.name} />
          </motion.div>
        ))}
        {RDMembers.slice(1, 4).map((member) => (
          <motion.div
            className={styles.teamPhotoContainer}
            key={member.name}
            style={{ y: yMiddle }}
          >
            <img src={member.photo + "?w=120"} alt={member.name} />
          </motion.div>
        ))}
        {OperationMembers.slice(4, 6).map((member) => (
          <motion.div
            className={styles.teamPhotoContainer}
            key={member.name}
            style={{ y: yBack }}
          >
            <img src={member.photo + "?w=120"} alt={member.name} />
          </motion.div>
        ))}
        {RDMembers.slice(4, 8).map((member) => (
          <motion.div
            className={styles.teamPhotoContainer}
            key={member.name}
            style={{ y: yBack }}
          >
            <img src={member.photo + "?w=120"} alt={member.name} />
          </motion.div>
        ))}
        <img
          src={TeamPhotoMobile1}
          alt=""
          className={styles.teamPhotoMobile1}
        />
        <motion.div variants={transitions.item} className={styles.title}>
          Blockchain’s largest R&D operation
        </motion.div>
        <motion.div className={styles.statsContainer}>
          {stats.map((stat) => (
            <div className={styles.stat} key={stat.title}>
              <span className={styles.statTitle}>{stat.title}</span>
              <span className={styles.statValue}>{stat.value}</span>
            </div>
          ))}
        </motion.div>
        <motion.div
          variants={transitions.item}
          className={styles.mobileStatsContainer}
        >
          {stats.map((stat, index) => (
            <React.Fragment key={stat.title}>
              {index % 2 === 1 && (
                <div className={styles.mobileStatsHorDivider} />
              )}
              <div className={styles.mobileStat}>
                <span className={styles.statTitle}>{stat.title}</span>
                <span className={styles.statValue}>{stat.value}</span>
              </div>
              {index % 2 === 1 && index !== stats.length - 1 && (
                <div className={styles.mobileStatsVerDivider} />
              )}
            </React.Fragment>
          ))}
        </motion.div>
        <motion.div variants={transitions.item} className={styles.body}>
          The DFINITY Foundation is committed to realizing the most disruptive
          vision in tech: the adoption of public blockchain as a single
          technology stack that hosts all of humanity’s systems and services.
        </motion.div>
        <Link
          className={styles.actionButton}
          to="https://dfinity.org/foundation"
        >
          GO TO THE DFINITY FOUNDATION
        </Link>
      </motion.div>
      <motion.div
        className={styles.scrollContainer}
        variants={transitions.item}
      >
        <div className={styles.mobileCardsContainer}>
          {cards.map((card) => (
            <div className={styles.cardWrapper} key={card.link}>
              <Card
                isMain={card.isMain}
                title={card.title}
                body={card.body}
                link={card.link}
              />
            </div>
          ))}
        </div>
      </motion.div>
      <motion.div variants={transitions.item} className={styles.cards}>
        {cards.map((card) => (
          <Card
            key={card.link}
            isMain={card.isMain}
            title={card.title}
            body={card.body}
            link={card.link}
          />
        ))}
      </motion.div>
      <img src={TeamPhotoMobile2} alt="" className={styles.teamPhotoMobile2} />
    </motion.div>
  );
}

export default Foundation;
