import Link from "@docusaurus/Link";
import data from "@site/.docusaurus/airtable/default/airtable-events.json";
import AnimateSpawn from "@site/src/components/Common/AnimateSpawn";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import ShareMeta from "@site/src/components/Common/ShareMeta";
import { useDarkHeaderInHero } from "@site/src/utils/use-dark-header-in-hero";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";
import React, { useEffect, useMemo, useRef, useState } from "react";
import LinkArrowRight from "../components/Common/Icons/LinkArrowRight";
import EventCard from "../components/GlobalEvents/EventCard";
import FeaturedCard, {
  getFeaturedEvent,
} from "../components/GlobalEvents/FeaturedCard";
import Filters from "../components/GlobalEvents/Filters";
import PromoCard from "../components/GlobalEvents/PromoCard";
import { AirtableEvent } from "../components/GlobalEvents/types";
import NewsletterSection from "../components/LandingPage/NewsletterSection/NewsletterSection";
import {
  deserializeBoolean,
  deserializeString,
  deserializeStringList,
  serializeBoolean,
  serializeString,
  serializeStringList,
  useQueryParam,
} from "../utils/use-query-param";

const { events, websiteCategory, regions } = data;
const DEFAULT_MAX_EVENTS = 12;

const featuredEvent = getFeaturedEvent(events);

function GlobalEventsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const isDark = useDarkHeaderInHero(heroRef);

  const [showMaxEvents, setShowMaxEvents] = useState(DEFAULT_MAX_EVENTS);

  const [selectedLocations, setSelectedLocations, locationsInitialized] =
    useQueryParam<string[]>("locations", [], {
      serialize: serializeStringList,
      deserialize: deserializeStringList,
    });
  const [selectedType, setSelectedType, typeInitialized] =
    useQueryParam<string>("type", undefined, {
      serialize: serializeString,
      deserialize: deserializeString,
    });

  const [showPastEvents, setShowPastEvents, showPastEventsInitialized] =
    useQueryParam<boolean>("showPastEvents", false, {
      serialize: serializeBoolean,
      deserialize: deserializeBoolean,
    });
  const [filteredEvents, setFilteredEvents] = React.useState<
    (AirtableEvent | "promo")[] | null
  >(null);

  const filteredCount = useMemo(
    () =>
      filteredEvents?.reduce(
        (acc, event) => (event === "promo" ? acc : acc + 1),
        0
      ),
    [filteredEvents]
  );

  useEffect(() => {
    if (
      !locationsInitialized ||
      !typeInitialized ||
      !showPastEventsInitialized
    ) {
      return;
    }
    const today = new Date().toISOString().slice(0, 10);

    const filtered: (AirtableEvent | "promo")[] = events.filter((event) => {
      if (
        (showPastEvents && event.endDate >= today) ||
        (!showPastEvents && event.endDate < today)
      ) {
        return false;
      }

      if (
        selectedLocations.length > 0 &&
        !selectedLocations.includes(event.regions)
      ) {
        return false;
      }

      if (selectedType && event.websiteCategory !== selectedType) {
        return false;
      }

      return true;
    });

    if (showPastEvents) {
      filtered.reverse();
    }

    if (filtered.length > DEFAULT_MAX_EVENTS) {
      filtered.splice(DEFAULT_MAX_EVENTS - 1, 0, "promo");
    } else if (filtered.length > 0) {
      filtered.push("promo");
    }

    setFilteredEvents(filtered);
  }, [
    selectedLocations,
    selectedType,
    showPastEvents,
    locationsInitialized,
    typeInitialized,
    showPastEventsInitialized,
    setFilteredEvents,
  ]);

  return (
    <Layout
      title="Global ICP Events"
      description="Immerse yourself in the Internet Computer community! Connect with ICP enthusiasts worldwide with cutting-edge community events."
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <ShareMeta image="/img/shareImages/share-events.jpg"></ShareMeta>

      <main
        className="text-black relative overflow-hidden"
        style={{
          marginTop: `calc(var(--ifm-navbar-height) * -1)`,
        }}
      >
        {isDark && <DarkHeroStyles bgColor="transparent"></DarkHeroStyles>}
        <AnimateSpawn variants={transitions.container}>
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
                  Global ICP Events
                </motion.h1>
                <motion.p
                  className="tw-lead-sm md:tw-lead mb-8"
                  variants={transitions.item}
                >
                  Immerse yourself in the Internet Computer community! Connect
                  with ICP enthusiasts worldwide with cutting-edge community
                  events.
                </motion.p>
              </div>
            </div>
            <div
              className="
              relative
              bg-[linear-gradient(0deg,#F1EEF5_0%,#F1EEF5_50%,transparent_50%,transparent_100%)]
            "
            >
              <div className="container-10">
                <FeaturedCard event={featuredEvent}></FeaturedCard>
              </div>
            </div>
          </section>
        </AnimateSpawn>

        <AnimateSpawn variants={transitions.container} el={motion.section}>
          <Filters
            showPastEvents={showPastEvents}
            onShowPastEventsChange={setShowPastEvents}
            types={websiteCategory}
            locations={regions}
            selectedLocations={selectedLocations}
            onLocationsChange={setSelectedLocations}
            selectedType={selectedType}
            onTypeChange={setSelectedType}
            filteredCount={filteredCount}
          />
        </AnimateSpawn>

        <AnimateSpawn variants={transitions.container}>
          <div className="container-12 grid grid-cols-1 md:grid-cols-3 gap-5 mt-8 md:mt-16">
            {filteredEvents
              ?.slice(0, showMaxEvents)
              .map((eventOrPromo) =>
                eventOrPromo === "promo" ? (
                  <PromoCard
                    key="promo"
                    label="Join ICP Community Events"
                    description="Embark on a journey with fellow innovators at the forefront of the Internet Computer space. Engage, learn, and evolve in an ecosystem rich with opportunities."
                    href="https://lu.ma/icpevents"
                    ctaLabel="Discover Upcoming Events"
                  />
                ) : (
                  <EventCard key={eventOrPromo.id} event={eventOrPromo} />
                )
              )}
          </div>

          {filteredEvents?.length > showMaxEvents && (
            <div className="container-10 py-20 text-center">
              <button
                className="button-primary"
                onClick={() =>
                  setShowMaxEvents(showMaxEvents + DEFAULT_MAX_EVENTS)
                }
              >
                Show More
              </button>
            </div>
          )}

          {filteredEvents?.length === 0 && (
            <div className="container-10 py-20">
              <div className="tw-lead text-center max-w-2xl mx-auto">
                <p className="mb-3 text-black/60">
                  No events match your filters.{" "}
                </p>
                {/* <p className="mb-8  text-black/60">
                  Is your event missing from ICP's global calendar?
                </p>
                <p className="mb-0">
                  <Link
                    className="button-primary"
                    href=""
                  >
                    Submit your event
                  </Link>
                </p> */}
              </div>
            </div>
          )}
        </AnimateSpawn>

        <section className="text-white relative pt-20 md:pt-30 container-12">
          <motion.div
            variants={transitions.fadeIn}
            className="blob blob-purple blob-xl blob-center -z-1"
          ></motion.div>

          <AnimateSpawn
            className="mx-auto text-center sm:w-6/12 "
            variants={transitions.container}
          >
            <motion.h2
              className="tw-heading-4 md:tw-heading-60 mb-3 md:mb-8"
              variants={transitions.item}
            >
              Participate with the community
            </motion.h2>
            <motion.p
              className="tw-lead-sm md:tw-lead mb-8"
              variants={transitions.item}
            >
              Welcome to the most dynamic and innovative Web3 community in the
              World. Join an inspiring tribe of creators, builders & educators
              in a journey toward the adoption of the Internet Computer as the
              default blockchain.
            </motion.p>
          </AnimateSpawn>

          <AnimateSpawn
            className=" text-black flex flex-col gap-2 md:flex-row md:items-start md:gap-5"
            variants={transitions.container}
          >
            <motion.div
              variants={transitions.item}
              className="px-8 py-12 backdrop-blur-2xl bg-white-50 rounded-xl border-white border-solid border text-center flex-1"
            >
              <h3 className="tw-lead-lg md:tw-title-sm">Event submission</h3>
              <p className="tw-paragraph-sm mb-3 text-black-60">
                Want to create your own event for the internet computer, submit
                your information to create an event where you'll find fantastic
                places to gather, socialize, celebrate, expand your knowledge,
                and form lasting bonds with fellow visionaries.
              </p>
              <p className="mb-0">
                {/* change to the Link when form is ready */}
                <span className="tw-heading-6 text-black/60">Coming soon</span>

                {/* <Link
                  href=""
                  className="link-primary link-with-icon"
                >
                  Submit your event
                  <LinkArrowUpRight />
                </Link> */}
              </p>
            </motion.div>
            <motion.div
              variants={transitions.item}
              className="px-8 py-12 backdrop-blur-2xl bg-white-50 rounded-xl border-white border-solid border text-center flex-1 md:mt-30"
            >
              <h3 className="tw-lead-lg md:tw-title-sm">
                Community initiatives
              </h3>
              <p className="tw-paragraph-sm mb-3 text-black-60">
                Find out more about our Education programmes. ICP.Hubs across
                the globe.
              </p>
              <p className="mb-0">
                <Link href="/community" className="link-primary link-with-icon">
                  <LinkArrowRight />
                  Explore initiatives
                </Link>
              </p>
            </motion.div>
            <motion.div
              variants={transitions.item}
              className="px-8 py-12 backdrop-blur-2xl bg-white-50 rounded-xl border-white border-solid border text-center flex-1"
            >
              <h3 className="tw-lead-lg md:tw-title-sm">Official ICP.Hubs</h3>
              <p className="tw-paragraph-sm mb-3 text-black-60">
                ICP communities are forming and taking shape in various regions
                around the globe, bringing entrepreneurs, developers, venture
                capitalists, educators, enthusiasts and experts under one
                regional roof.
              </p>
              <p className="mb-0">
                <Link
                  href="/community#hubs"
                  className="link-primary link-with-icon"
                >
                  <LinkArrowRight />
                  Meet the ICP.Hubs
                </Link>
              </p>
            </motion.div>
          </AnimateSpawn>
        </section>
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

export default GlobalEventsPage;
