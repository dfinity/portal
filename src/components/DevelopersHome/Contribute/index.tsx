import React, { useEffect } from "react";
import styles from "./index.module.css";
import Link from "@docusaurus/Link";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import transitions from "@site/static/transitions.json";
import RightArrowSVG from "@site/static/img/svgIcons/rightArrowIcon.svg";
import contribute from "@site/static/img/developers/contribute.png";

const cardsContent = [
  {
    title: "Community conversations",
    body: "Join the tech talks",
    link: "/",
  },
  {
    title: "Technical working groups",
    body: "Help shape IC development ",
    link: "/",
  },
  {
    title: "Join the developer forum",
    body: "Discuss with the community",
    link: "/",
  },
];

function Card({ title, body }) {
  return (
    <>
      <div className={styles.cardContainer}>
        <p className={styles.cardTitle}>{title}</p>
        <p className={styles.cardBody}>{body}</p>
      </div>
      <RightArrowSVG className={styles.informationIcon} />
    </>
  );
}

function Index() {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.2 });
  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [controls, inView]);
  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={transitions.container}
      className={styles.container}
    >
      <a id="features" />
      <motion.p variants={transitions.item} className={styles.title}>
        Contribute to the <br /> Internet Computer
      </motion.p>
      <motion.p variants={transitions.item} className={styles.subtitle}>
        Take a deeper dive into further resources in the developer ecosystem.
      </motion.p>
      <motion.div className={styles.mobileSwiper} variants={transitions.item}>
        <Swiper
          spaceBetween={4}
          centeredSlides={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          breakpoints={{
            320: { slidesPerView: 1.2 },
            768: { slidesPerView: 2 },
          }}
        >
          {cardsContent.map((card) => (
            <SwiperSlide>
              <a href={card.link} className={styles.card}>
                <Card key={card.title} title={card.title} body={card.body} />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
      <div className={styles.cards}>
        {cardsContent.map((card) => (
          <motion.a
            variants={transitions.item}
            href={card.link}
            className={styles.card}
          >
            <Card key={card.title} title={card.title} body={card.body} />
          </motion.a>
        ))}
      </div>
      <div className={styles.contributionContainer}>
        <div className={styles.leftContainer}>
          <motion.p
            variants={transitions.item}
            className={styles.callToActionTitle}
          >
            Help us make the docs better
          </motion.p>
          <motion.p
            variants={transitions.item}
            className={styles.callToActionText}
          >
            These docs are a community effort. Create a PR if you see mistakes,
            room for improvement, or new opportunities to help IC developers.
          </motion.p>
          <motion.div
            variants={transitions.item}
            className={styles.actionContainer}
          >
            <Link className={styles.actionButton} to="/">
              CONTRIBUTE
            </Link>
          </motion.div>
        </div>
        <motion.div
          variants={transitions.item}
          className={styles.rightContainer}
        >
          <img className={styles.contributeGraphic} src={contribute} alt="" />
        </motion.div>
      </div>
      <motion.div variants={transitions.item} className={styles.mobileGraphic}>
        <img
          className={styles.mobileContributeGraphic}
          src={contribute}
          alt=""
        />
      </motion.div>
    </motion.div>
  );
}

export default Index;
