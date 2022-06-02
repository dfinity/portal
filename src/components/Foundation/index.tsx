import React from "react";
import styles from "@site/src/components/Foundation/index.module.css";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import RightArrowSVG from "@site/static/img/svgIcons/rightArrowIcon.svg";

const stats = [
  { title: "Team Members", value: "260+" },
  { title: "Publications", value: "1564" },
  { title: "Citations", value: "83,347" },
  { title: "Patents", value: "191" },
];

const cards = [
  {
    isMain: true,
    title: "Roadmap",
    body: "The DFINITY Foundation’s contributions to the IC roadmap are subject to community discussion and voting",
    link: "/",
  },
  {
    isMain: true,
    title: "Roadmap",
    body: "The DFINITY Foundation’s contributions to the IC roadmap are subject to community discussion and voting",
    link: "/",
  },
  {
    isMain: true,
    title: "Roadmap",
    body: "The DFINITY Foundation’s contributions to the IC roadmap are subject to community discussion and voting",
    link: "/",
  },
];
function Card({ isMain, title, body, link }) {
  return (
    <a href={link} className={clsx(styles.card, styles.cardHover)}>
      <div className={styles.cardBodyContainer}>
        <p className={styles.informationTitle}>{title}</p>
        <p className={styles.informationBody}>{body}</p>
      </div>
      <RightArrowSVG className={styles.informationIcon} />
    </a>
  );
}
function Index() {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.title}>Blockchain’s largest R&D operation</div>
        <div className={styles.statsContainer}>
          {stats.map((stat, index) => (
            <>
              {index !== 0 && <div className={styles.statsDivider} />}
              <div className={styles.stat}>
                <span className={styles.statTitle}>{stat.title}</span>
                <span className={styles.statValue}>{stat.value}</span>
              </div>
            </>
          ))}
        </div>
        <div className={styles.body}>
          The DFINITY Foundation is committed to realizing the most disruptive
          vision in tech: the adoption of public blockchain as a single
          technology stack that hosts all of humanity’s systems and services.
        </div>
        <Link className={styles.actionButton} to="/">
          GO TO THE DFINITY FOUNDATION
        </Link>
      </div>
      <div className={styles.cards}>
        {cards.map((card) => (
          <Card
            isMain={card.isMain}
            title={card.title}
            body={card.body}
            link={card.link}
          />
        ))}
      </div>
    </div>
  );
}

export default Index;
