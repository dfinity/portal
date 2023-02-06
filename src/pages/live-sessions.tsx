import BlobBlue from "@site/static/img/purpleBlurredCircle.png";
import BlobWhite from "@site/static/img/whiteBlurredCircle.png";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import transitions from "@site/static/transitions.json";
import AnimateSpawn from "../components/Common/AnimateSpawn";
import useGlobalData from "@docusaurus/useGlobalData";
import Link from "@docusaurus/Link";
import { LiveSession } from "../components/LiveSessionsPage/LiveSession";
import { format, utcToZonedTime } from "date-fns-tz";
import { getMinutes, parse, getYear } from "date-fns";
import ExternalLinkIcon from "../../static/img/external-link.svg";
import ChevronRightIcon from "../../static/img/chevron-right.svg";
import slugify from "slugify";
import Head from "@docusaurus/Head";
import Newsletter from "../components/Common/Newsletter/Newsletter";

const MotionLink = motion(Link);

function idFromTitle(title: string) {
  const slug = slugify(title, { strict: true });
  if (slug.match(/^\d/)) {
    return "session-" + slug;
  }
  return slug;
}

function LiveSessionsPage(): JSX.Element {
  const formRef = useRef<HTMLDivElement>();

  const liveSessions = useGlobalData()["conversations"]
    .default as LiveSession[];

  const [initalized, setInitalized] = useState(false);
  const [upcoming, setUpcoming] = useState<LiveSession[]>([]);
  const [upcomingTbd, setUpcomingTbd] = useState<
    { tbdMonth: string; liveSessions: LiveSession[] }[]
  >([]);
  const [past, setPast] = useState<LiveSession[]>([]);

  const [showAllPast, setShowAllPast] = useState(false);

  useEffect(() => {
    const upcoming: LiveSession[] = [];
    const upcomingTbd: { tbdMonth: string; liveSessions: LiveSession[] }[] = [];
    const past: LiveSession[] = [];

    for (const liveSession of liveSessions) {
      if (liveSession.tbdMonth && !liveSession.startTimeUtc) {
        const existingMonth = upcomingTbd.find(
          (up) => up.tbdMonth === liveSession.tbdMonth
        );
        if (existingMonth) {
          existingMonth.liveSessions.push(liveSession);
        } else {
          upcomingTbd.push({
            tbdMonth: liveSession.tbdMonth,
            liveSessions: [liveSession],
          });
        }
      } else if (liveSession.startTimeUtc) {
        liveSession.startTimePt = utcToZonedTime(
          liveSession.startTimeUtc,
          "America/Los_Angeles"
        ).getTime();
        liveSession.startTimeEu = utcToZonedTime(
          liveSession.startTimeUtc,
          "Europe/Zurich"
        ).getTime();

        if (liveSession.startTimeUtc < Date.now() - 2 * 3600 * 1000) {
          past.push(liveSession);
        } else {
          upcoming.push(liveSession);
        }
      }
    }

    past.reverse();

    setPast(past);
    setUpcoming(upcoming);

    upcomingTbd.sort((a, b) => a.tbdMonth.localeCompare(b.tbdMonth));

    setUpcomingTbd(upcomingTbd);
    setTimeout(() => {
      setInitalized(true);
    });
  }, [liveSessions, setPast, setUpcoming]);

  function scrollToForm() {
    window.scroll({
      top: formRef.current.offsetTop,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    if (initalized) {
      if (location.hash === "#subscribe") {
        scrollToForm();
      } else if (location.hash) {
        const el = document.querySelector(location.hash) as HTMLElement;
        if (el) {
          window.scroll({
            top: window.scrollY + el.getBoundingClientRect().top - 100,
            behavior: "smooth",
          });
        }
      }
    }
  }, [initalized]);

  return (
    <Layout
      title="Live Sessions"
      description="Join live sessions with the DFINITY Foundation to discuss upcoming contributions to the Internet Computer roadmap."
      editPath={__filename}
    >
      <Head>
        <meta
          property="og:image"
          content={
            "https://internetcomputer.org/img/shareImages/share-live-sessions.jpeg"
          }
        />
        <meta
          name="twitter:image"
          content={
            "https://internetcomputer.org/img/shareImages/share-live-sessions.jpeg"
          }
        />
        <title>Live Sessions</title>
      </Head>
      <main className="text-black relative overflow-hidden">
        <AnimateSpawn variants={transitions.container}>
          <motion.img
            src={BlobBlue}
            alt=""
            className="absolute pointer-events-none max-w-none w-[800px] -right-[370px] top-[00px] md:w-[1500px]  md:right-[-700px] 2xl:left-1/2 translate-x-[200px] md:top-[-200px] z-[1000]"
            variants={transitions.item}
          />
          <section className="max-w-page relative px-6 pt-20 mb-20 md:mb-40 md:px-12.5 md:mx-auto  md:pt-40 ">
            <div className="md:w-7/10 lg:w-6/10 md:ml-1/12 relative z-[1001]">
              <motion.h1
                className="tw-heading-3 md:tw-heading-2 mb-10"
                variants={transitions.item}
              >
                Live Sessions
              </motion.h1>
              <motion.p
                className="tw-lead-sm md:tw-lead mb-10"
                variants={transitions.item}
              >
                Join live sessions with the DFINITY Foundation to discuss
                upcoming contributions to the Internet Computer roadmap.
              </motion.p>
              <motion.div className="" variants={transitions.item}>
                <button
                  className="button-primary text-center"
                  onClick={scrollToForm}
                >
                  Alerts for New Session Registrations
                </button>
              </motion.div>
            </div>
          </section>
        </AnimateSpawn>

        <section className="max-w-page relative px-6 md:px-12.5 md:mx-auto ||| mb-20 md:mb-40">
          <div className="md:w-10/12 md:mx-auto">
            <AnimateSpawn
              el={motion.h2}
              className="tw-heading-3 md:tw-heading-2 mb-8 md:mb-12"
              variants={transitions.item}
            >
              Schedule
            </AnimateSpawn>
            <div className="space-y-16 md:space-y-10">
              {initalized &&
                upcoming.length === 0 &&
                upcomingTbd.length === 0 && (
                  <div className="tw-lead-lg text-black-60">
                    No upcoming live sessions at the moment.
                  </div>
                )}

              {upcoming.map((session) => {
                const timeFormat =
                  getMinutes(session.startTimeUtc) !== 0 ? "h:mm aa" : "h aa";
                return (
                  <AnimateSpawn
                    variants={transitions.container}
                    key={session.title + session.startTimeUtc}
                    className="flex flex-col md:flex-row"
                    id={idFromTitle(session.title)}
                  >
                    <motion.div
                      variants={transitions.item}
                      className="mb-6 md:mb-0 md:w-3/10 flex flex-col gap-1 md:gap-2"
                    >
                      <span className="tw-paragraph-sm text-black-60">
                        {format(session.startTimePt, "EEEE")}
                      </span>
                      <span className="text-razzmatazz tw-heading-5 uppercase">
                        {format(session.startTimePt, "MMMM do")}
                      </span>
                      <span className="tw-paragraph-sm text-black-60">
                        {format(session.startTimePt, timeFormat)} PT /{" "}
                        {format(session.startTimeEu, timeFormat)} CET
                      </span>
                    </motion.div>
                    <AnimateSpawn
                      variants={transitions.item}
                      className="flex-1 flex flex-col gap-2 md:gap-4"
                    >
                      <h3 className="relative tw-heading-4 md:tw-heading-3 mb-0 group">
                        {session.title}
                        <a
                          className="text-infinite absolute -left-6 md:-left-8 top-0 hidden group-hover:inline-block hover:text-infinite-60 hover:no-underline md:pr-3"
                          href={`#${idFromTitle(session.title)}`}
                        >
                          #
                        </a>
                      </h3>
                      {session.speaker && (
                        <div className="tw-paragraph">
                          {session.speaker}
                          {session.speakerTitle
                            ? " · " + session.speakerTitle
                            : ""}
                        </div>
                      )}
                      <div
                        className="tw-paragraph text-black-60 prose prose-a:text-infinite prose-a:font-book  hover:prose-a:text-black"
                        dangerouslySetInnerHTML={{
                          __html: session.description,
                        }}
                      ></div>
                      {session.zoomLink && (
                        <div>
                          <Link
                            className="link-primary"
                            href={session.zoomLink}
                          >
                            Reserve your seat{" "}
                            <ExternalLinkIcon className="inline-block align-bottom ml-2"></ExternalLinkIcon>
                          </Link>
                        </div>
                      )}
                      {session.deck && (
                        <div>
                          <Link className="link-primary" href={session.deck}>
                            See deck{" "}
                            <ExternalLinkIcon className="inline-block align-bottom ml-2"></ExternalLinkIcon>
                          </Link>
                        </div>
                      )}
                    </AnimateSpawn>
                  </AnimateSpawn>
                );
              })}
              {upcomingTbd.map((list) => {
                return (
                  <AnimateSpawn
                    variants={transitions.container}
                    key={list.tbdMonth}
                    className="flex flex-col md:flex-row"
                  >
                    <AnimateSpawn
                      variants={transitions.item}
                      className="mb-6 md:mb-0 md:w-3/10 flex flex-col gap-1 md:gap-2"
                    >
                      <span className="tw-paragraph-sm text-black-60">
                        Coming in
                      </span>
                      <span className="text-razzmatazz tw-heading-5 uppercase">
                        {format(
                          parse(list.tbdMonth, "yyyy-MM", new Date()),
                          "MMMM"
                        )}
                      </span>
                    </AnimateSpawn>
                    <AnimateSpawn
                      variants={transitions.item}
                      className="flex-1 flex flex-col gap-8 md:gap-10"
                    >
                      {list.liveSessions.map((session) => (
                        <article
                          className="flex-1 flex flex-col gap-4"
                          key={session.title + session.tbdMonth}
                          id={idFromTitle(session.title)}
                        >
                          <h3 className="relative tw-heading-4 md:tw-heading-3 mb-0 group">
                            {session.title}
                            <a
                              className="text-infinite absolute -left-6 md:-left-8 top-0 hidden group-hover:inline-block hover:text-infinite-60 hover:no-underline pr-3"
                              href={`#${idFromTitle(session.title)}`}
                            >
                              #
                            </a>
                          </h3>
                          {session.speaker && (
                            <div className="tw-paragraph">
                              {session.speaker}
                              {session.speakerTitle
                                ? " · " + session.speakerTitle
                                : ""}
                            </div>
                          )}
                          <div
                            className="tw-paragraph text-black-60 prose prose-a:text-infinite prose-a:font-book  prose-a:hover:text-black"
                            dangerouslySetInnerHTML={{
                              __html: session.description,
                            }}
                          ></div>
                        </article>
                      ))}
                    </AnimateSpawn>
                  </AnimateSpawn>
                );
              })}
            </div>
          </div>
        </section>

        <AnimateSpawn
          el={motion.section}
          variants={transitions.item}
          className="bg-infinite mb-20 md:mb-40"
        >
          <div className="max-w-page relative px-6 md:px-12.5 md:mx-auto py-16">
            <div className="md:w-10/12 md:mx-auto text-white text-center">
              <h3 className="tw-lead  mb-6">
                Be the first to get notified as new sessions become available.
              </h3>
              <button
                className="button-outline-white"
                onClick={() =>
                  window.scroll({
                    top: formRef.current.offsetTop,
                    behavior: "smooth",
                  })
                }
              >
                Alerts for New Session Registrations
              </button>
            </div>
            <motion.img
              src={BlobWhite}
              className="absolute pointer-events-none max-w-none w-[800px] right-[-250px] top-[-150px] md:w-[1500px]  md:right-[-550px] translate-x-[200px] md:top-[-600px]"
              alt=""
              variants={transitions.item}
            />
          </div>
        </AnimateSpawn>

        <AnimateSpawn
          variants={transitions.container}
          el={motion.section}
          className="max-w-page relative px-6 md:px-12.5 md:mx-auto ||| mb-20 md:mb-40"
        >
          <div className="md:w-10/12 md:mx-auto ">
            <MotionLink
              variants={transitions.item}
              className="button-fancy mb-10"
              href="https://www.youtube.com/playlist?list=PLuhDt1vhGcrez-f3I0_hvbwGZHZzkZ7Ng"
            >
              Watch past live sessions on YouTube
              <ChevronRightIcon></ChevronRightIcon>
            </MotionLink>
            <motion.h2
              variants={transitions.item}
              className="tw-heading-3 md:tw-heading-2 mb-8 md:mb-12"
            >
              Past Live Sessions
            </motion.h2>
            <div className="space-y-16 md:space-y-10">
              {(showAllPast ? past : past.slice(0, 5)).map((session) => {
                const timeFormat =
                  getMinutes(session.startTimeUtc) !== 0 ? "h:mm aa" : "h aa";

                const sameYear =
                  getYear(session.startTimeUtc) === getYear(new Date());
                return (
                  <AnimateSpawn
                    variants={transitions.container}
                    key={session.title + session.startTimeUtc}
                    className="flex flex-col md:flex-row"
                    id={idFromTitle(session.title)}
                  >
                    <motion.div
                      className="mb-6 md:mb-0 md:w-3/10 flex flex-col gap-1 md:gap-2"
                      variants={transitions.item}
                    >
                      {!sameYear && (
                        <span className="tw-paragraph-sm text-black-60">
                          {format(session.startTimePt, "yyyy")}
                        </span>
                      )}
                      <span className="text-razzmatazz tw-heading-5 uppercase">
                        {format(session.startTimePt, "MMMM do")}
                      </span>
                      <span className="tw-paragraph-sm text-black-60">
                        {format(session.startTimePt, timeFormat)} PT /{" "}
                        {format(session.startTimeEu, timeFormat)} CET
                      </span>
                    </motion.div>
                    <motion.div
                      className="flex-1 flex flex-col gap-4"
                      variants={transitions.item}
                    >
                      <h3 className="relative tw-heading-4 md:tw-heading-3 mb-0 group">
                        {session.title}
                        <a
                          className="text-infinite absolute -left-6 md:-left-8 top-0 hidden group-hover:inline-block hover:text-infinite-60 hover:no-underline md:pr-3"
                          href={`#${idFromTitle(session.title)}`}
                        >
                          #
                        </a>
                      </h3>
                      {session.speaker && (
                        <div className="tw-paragraph">
                          {session.speaker}
                          {session.speakerTitle
                            ? " · " + session.speakerTitle
                            : ""}
                        </div>
                      )}
                      <div
                        className="tw-paragraph text-black-60 prose prose-a:text-infinite prose-a:font-book  hover:prose-a:text-black"
                        dangerouslySetInnerHTML={{
                          __html: session.description,
                        }}
                      ></div>
                      {!session.youtubeLink && !session.deck && (
                        <div>
                          <Link
                            className="tw-heading-6 text-black"
                            href={session.youtubeLink}
                          >
                            Recording Available Soon...
                          </Link>
                        </div>
                      )}
                      {session.youtubeLink && (
                        <div>
                          <Link
                            className="link-primary"
                            href={session.youtubeLink}
                          >
                            Watch Video Replay{" "}
                            <ExternalLinkIcon className="inline-block align-bottom ml-2"></ExternalLinkIcon>
                          </Link>
                        </div>
                      )}
                      {session.deck && (
                        <div>
                          <Link className="link-primary" href={session.deck}>
                            See deck{" "}
                            <ExternalLinkIcon className="inline-block align-bottom ml-2"></ExternalLinkIcon>
                          </Link>
                        </div>
                      )}
                    </motion.div>
                  </AnimateSpawn>
                );
              })}

              {!showAllPast && past.length > 5 && (
                <div className="pt-10 text-center">
                  <button
                    className="button-outline"
                    onClick={() => setShowAllPast(true)}
                  >
                    Show all past sessions
                  </button>
                </div>
              )}
            </div>
          </div>
        </AnimateSpawn>

        {/* This must not be invisible */}
        <div ref={formRef} id="subscribe"></div>
        <Newsletter
          fields={[
            {
              name: "EMAIL",
              placeholder: "Email",
              type: "email",
              required: true,
            },
            {
              name: "tags",
              type: "hidden",
              value: "1061",
            },
          ]}
          ctaLabel="Get updates!"
          postUrl="https://dfinity.us16.list-manage.com/subscribe/post?u=33c727489e01ff5b6e1fb6cc6&id=2117910e55&f_id=0052c2e1f0"
          decoration={<img src="/img/newsletter/email-image-1.webp" />}
          className="mb-20"
        >
          <h2 className="text-white tw-heading-5 md:tw-heading-4 mb-6 md:mb-8">
            Want to meet ICP enthusiasts IRL?
            <br />
            <span className="text-white-60">
              Sign up for event updates to stay connected
            </span>
          </h2>
        </Newsletter>
      </main>
    </Layout>
  );
}

export default LiveSessionsPage;
