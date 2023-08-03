import Link from "@docusaurus/Link";
import styles from "@site/src/components/LandingPage/StartBuilding/index.module.css";
import BackgroundGradient from "@site/static/img/startBuilding/bgGradient.webp";
import DatabaseIcon from "@site/static/img/startBuilding/database.svg";
import DfinityIcon from "@site/static/img/startBuilding/dfinity.svg";
import GamingIcon from "@site/static/img/startBuilding/gaming.svg";
import GrowthIcon from "@site/static/img/startBuilding/growth.svg";
import IotIcon from "@site/static/img/startBuilding/iot.svg";
import MotokoIcon from "@site/static/img/startBuilding/motoko.svg";
import SocialIcon from "@site/static/img/startBuilding/social.svg";
import RightArrowSVG from "@site/static/img/svgIcons/rightArrowIcon.svg";
import transitions from "@site/static/transitions.json";
import clsx from "clsx";
import { motion } from "framer-motion";
import React, { FC } from "react";
import AnimateSpawn from "../../Common/AnimateSpawn";

function Information({
  title,
  body,
  link,
  classNames = [
    styles.card,
    styles.cardContainer,
    styles.cardHover,
    styles.darkHover,
  ],
}) {
  return (
    <Link to={link} className={clsx(...classNames)}>
      <div className={styles.bodyContainer}>
        <p className={styles.informationTitle}>{title}</p>
        <p className={styles.informationBody}>{body}</p>
      </div>
      <RightArrowSVG className={styles.informationIcon} />
    </Link>
  );
}

function Event({ title, dateRange, link }) {
  return (
    <Link
      to={link}
      className={clsx(styles.card, styles.eventContainer, styles.cardHover)}
    >
      <div className={styles.bodyContainer}>
        <p className={styles.eventDate}>{dateRange}</p>
        {title.map((titleLine, index) => (
          <p key={index} className={styles.eventTitle}>
            {titleLine}
          </p>
        ))}
      </div>
    </Link>
  );
}

function MotokoPlayground({ title, body, link }) {
  return (
    <Link
      to={link}
      className={clsx(
        styles.card,
        // styles.motokoContainer,
        styles.cardContainer,
        styles.cardHover,
        styles.darkHover
      )}
    >
      <div className={styles.bodyContainer}>
        <p className={styles.informationTitle}>{title}</p>
        <p className={styles.informationBody}>{body}</p>
      </div>
      {/* <img className={styles.motokoBackground} src={motokoBG} alt="" /> */}
      <RightArrowSVG className={styles.informationIcon} />
    </Link>
  );
}

const StartBuilding: FC<{
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
      <AnimateSpawn variants={transitions.container} className={styles.main}>
        <div className={styles.anchor} />
        <div className={styles.headerContainer}>
          <img
            src={BackgroundGradient}
            className={styles.BGGradient}
            alt=""
            loading="lazy"
          />
          <motion.div
            variants={transitions.item}
            className={styles.callToActionContainer}
          >
            <MotokoIcon
              className={clsx(styles.backgroundIcon, styles.motokoIcon)}
            />
            <DfinityIcon
              className={clsx(styles.backgroundIcon, styles.dfinityIcon)}
            />
            <GamingIcon
              className={clsx(styles.backgroundIcon, styles.gamingIcon)}
            />
            <IotIcon className={clsx(styles.backgroundIcon, styles.iotIcon)} />
            <DatabaseIcon
              className={clsx(styles.backgroundIcon, styles.databaseIcon)}
            />
            <SocialIcon
              className={clsx(styles.backgroundIcon, styles.socialIcon)}
            />
            <GrowthIcon
              className={clsx(styles.backgroundIcon, styles.growthIcon)}
            />
            <h2 className={styles.callToActionTitle}>{title}</h2>
            <p className={styles.callToActionBody}>{body}</p>
            <Link className={styles.actionButton} to={ctaLink}>
              {cta}
            </Link>
          </motion.div>
        </div>
        <motion.div variants={transitions.item} className={styles.cards}>
          {cards.map((card, index) => (
            <Information
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

export default StartBuilding;
