import Link from "@docusaurus/Link";
import newsData from "@site/.docusaurus/contentful/default/press.json";
import youtubeData from "@site/.docusaurus/youtube/default/youtube.json";
import AnimateSpawn from "@site/src/components/Common/AnimateSpawn";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import ShareMeta from "@site/src/components/Common/ShareMeta";
import { useDarkHeaderInHero } from "@site/src/utils/use-dark-header-in-hero";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import LinkArrowUpRight from "../components/Common/Icons/LinkArrowUpRight";
import PlusIcon from "../components/Common/Icons/Plus";
import LinkCardsSection from "../components/Common/LinkCardsSection/index";
import FilterPills from "../components/Common/Pills/PillFilter";
import VideoCard from "../components/Common/VideoCard/index";
import NewsletterSection from "../components/LandingPage/NewsletterSection/NewsletterSection";
import {
  FeaturedNewsCard,
  NewsCard,
  PromoCard,
} from "../components/NewsPage/Cards";
import { Press } from "../components/NewsPage/types";
import {
  deserializeString,
  serializeString,
  useQueryParam,
} from "../utils/use-query-param";
import DocumentIcon from "@site/static/img/svgIcons/document.svg";
import MailIcon from "@site/static/img/svgIcons/mail.svg";

const MotionLink = motion(Link);
const { mostRecentVideo } = youtubeData;
const newsItems = newsData as Press[];

const newsTypes = Array.from(
  new Set(newsItems.map((news) => news.tags).flat())
);

const DEFAULT_MAX_NEWS = 9;

function NewsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const isDark = useDarkHeaderInHero(heroRef);

  const [showMaxNews, setShowMaxNews] = useState(DEFAULT_MAX_NEWS);

  const [selectedType, setSelectedType, typeInitialized] =
    useQueryParam<string>("type", undefined, {
      serialize: serializeString,
      deserialize: deserializeString,
    });

  const [filteredEvents, setFilteredNews] = React.useState<
    (Press | "promo")[] | null
  >(null);

  useEffect(() => {
    if (!typeInitialized) {
      return;
    }

    const filtered: (Press | "promo")[] = newsItems.slice(2).filter((news) => {
      if (selectedType && !news.tags.includes(selectedType)) {
        return false;
      }

      return true;
    });

    if (filtered.length > DEFAULT_MAX_NEWS) {
      filtered.splice(DEFAULT_MAX_NEWS - 1, 0, "promo");
    } else if (filtered.length > 0) {
      filtered.push("promo");
    }

    setFilteredNews(filtered);
  }, [selectedType, typeInitialized, setFilteredNews]);

  return (
    <Layout
      title="News"
      description=" We love getting new impulses from the industry and sharing DFINITY insights and our vision about the Internet Computer. Join us at an upcoming event or check out past events, news and presentations."
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <ShareMeta image="/img/shareImages/share-news.jpg"></ShareMeta>

      <main
        className="text-black relative overflow-hidden"
        style={{
          marginTop: `calc(var(--ifm-navbar-height) * -1)`,
        }}
      >
        {isDark && <DarkHeroStyles bgColor="transparent"></DarkHeroStyles>}
        <AnimateSpawn variants={transitions.container} el={motion.section}>
          <section
            className="overflow-hidden bg-infinite text-white pt-20"
            ref={heroRef}
          >
            <div className="container-10 pt-20 mb-16 md:mb-20 md:pt-36 relative">
              <div className="blob blob-purple blob-xl md:blob-xl top-[-150px] left-full -translate-x-2/3 opacity-80"></div>
              <div className="md:w-7/10 relative">
                <motion.h1
                  className="tw-heading-3 md:tw-heading-2 mb-2 md:mb-6"
                  variants={transitions.item}
                >
                  News
                </motion.h1>
                <motion.p
                  className="tw-lead-sm md:tw-lead mb-8"
                  variants={transitions.item}
                >
                  We love getting new impulses from the industry and sharing
                  DFINITY insights and our vision about the Internet Computer.
                  Join us at an upcoming event or check out past events, news
                  and presentations.
                </motion.p>
              </div>
            </div>
            <div
              className="
              relative
              bg-[linear-gradient(0deg,#F1EEF5_0%,#F1EEF5_60%,transparent_60%,transparent_100%)]
            "
            >
              <div className="container-10 space-y-6">
                <FeaturedNewsCard news={newsItems[0]} reverse={true} />
                <FeaturedNewsCard news={newsItems[1]} reverse={false} />
              </div>
            </div>
          </section>
        </AnimateSpawn>

        <AnimateSpawn
          variants={transitions.container}
          el={motion.section}
          className="container-12 mt-20 md:mt-30"
        >
          <FilterPills
            onValueChange={setSelectedType}
            selectedValue={selectedType}
            values={newsTypes}
            variant="dark"
          />
        </AnimateSpawn>

        <AnimateSpawn
          variants={transitions.container}
          className="container-12"
          el={motion.section}
        >
          <h2 className="tw-heading-5 mt-10 mb-8">Latest News</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
            {filteredEvents
              ?.slice(0, showMaxNews)
              .map((newsOrPromo) =>
                newsOrPromo === "promo" ? (
                  <PromoCard
                    key="promo"
                    label="Sign up for event updates to stay connected"
                    mailchimpUrl="https://dfinity.us16.list-manage.com/subscribe/post?u=33c727489e01ff5b6e1fb6cc6&amp;id=7e9469a315&amp;f_id=00bac2e1f0"
                    ctaLabel="Get updates"
                    placeholder="Your Email address"
                  />
                ) : (
                  <NewsCard
                    key={newsOrPromo.id}
                    news={newsOrPromo}
                    linkLabel="Read Now"
                  />
                )
              )}
          </div>

          {filteredEvents?.length > showMaxNews && (
            <div className="pt-8 text-center">
              <button
                className="link-primary link-with-icon border-none bg-transparent font-circular"
                onClick={() => setShowMaxNews(showMaxNews + DEFAULT_MAX_NEWS)}
              >
                <PlusIcon />
                Show More
              </button>
            </div>
          )}
        </AnimateSpawn>

        <AnimateSpawn
          className="container-10 pt-20 md:pt-30"
          el={motion.section}
          variants={transitions.container}
        >
          <div className="flex flex-col gap-6 md:gap-5 mb-8 md:mb-10 md:flex-row md:w-9/10">
            <motion.h2
              className="tw-heading-4 mb-0 md:tw-heading-60 md:flex-1"
              variants={transitions.item}
            >
              Latest video
            </motion.h2>
            <div className="md:flex-1 md:pt-3">
              <motion.p
                className="mb-4 tw-paragraph md:tw-lead-sm"
                variants={transitions.item}
              >
                Insights on the Internet Computer blockchain, spotlighting its
                technology, applications, and community developments.
              </motion.p>
              <MotionLink
                variants={transitions.item}
                href="https://www.youtube.com/@DFINITY"
                className="link-primary link-with-icon"
              >
                Explore more videos on YouTube <LinkArrowUpRight />
              </MotionLink>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <motion.div
              variants={transitions.item}
              className="col-span-1 md:col-span-2"
            >
              <VideoCard
                image={mostRecentVideo.thumbnail}
                title={mostRecentVideo.title}
                label="Video"
                link={`https://www.youtube.com/watch?v=${mostRecentVideo.id}`}
                description={mostRecentVideo.description}
              />
            </motion.div>
          </div>
        </AnimateSpawn>

        <LinkCardsSection
          title="Stay up to date with all the latest news"
          cards={[
            {
              label: "Subscribe to Medium for all our latest blog posts",
              href: "https://medium.com/dfinity",
            },
            {
              label: "Follow us on CoinMarketCap",
              href: "https://coinmarketcap.com/currencies/internet-computer/",
            },
            {
              label: "Watch all the ICP videos on YouTube",
              href: "https://www.youtube.com/@DFINITY",
            },
            {
              label: "Follow ICP on X",
              href: "https://www.twitter.com/dfinity",
            },
          ]}
          className="mt-20 md:mt-30"
        />

        <AnimateSpawn
          el={motion.section}
          variants={transitions.item}
          className="container-10 mt-20 md:mt-30"
        >
          <h2 className="tw-heading-5 md:tw-heading-3 mb-4 md:mb-6">
            Please direct press inquiries to
          </h2>
          <ul className="list-none p-0 m-0 space-y-3">
            <li>
              <Link
                href="mailto:comms@dfinity.org"
                className="link-primary link-with-icon"
              >
                <MailIcon />
                comms@dfinity.org
              </Link>
            </li>
            <li>
              <Link
                href="https://dfinity.frontify.com/d/pD7yZhsmpqos/press-kit"
                className="link-primary link-with-icon"
              >
                Press Kit <LinkArrowUpRight />
              </Link>
            </li>
            <li>
              <Link
                href="https://dfinity.frontify.com/d/pD7yZhsmpqos"
                className="link-primary link-with-icon"
              >
                Brand guidelines <LinkArrowUpRight />
              </Link>
            </li>
          </ul>
        </AnimateSpawn>

        <NewsletterSection
          formUrl="https://dfinity.us16.list-manage.com/subscribe/post?u=33c727489e01ff5b6e1fb6cc6&amp;id=7e9469a315&amp;f_id=00bac2e1f0"
          className="mt-20 mb-20"
        >
          Want to meet ICP enthusiasts IRL?{" "}
          <span className="text-white-60">
            Sign up for event updates to stay connected
          </span>
        </NewsletterSection>
      </main>
    </Layout>
  );
}

export default NewsPage;
