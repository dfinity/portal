import React, { useRef, useState } from "react";

import AnimateSpawn from "../components/Common/AnimateSpawn";
import { Faq, FaqSection } from "../components/Common/Faq/Faq";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import LinkArrowRight from "../components/Common/Icons/LinkArrowRight";
import LinkArrowUpRight from "../components/Common/Icons/LinkArrowUpRight";
import LinkCardsSection from "../components/Common/LinkCardsSection";
import ShareMeta from "../components/Common/ShareMeta";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import transitions from "@site/static/transitions.json";
import { useDarkHeaderInHero } from "../utils/use-dark-header-in-hero";
import { useFontsLoaded } from "@site/src/utils/use-fonts-loaded";
import ArrowDown from "@site/static/img/svgIcons/arrowDown.svg";

const MotionLink = motion(Link);

const FaqItem = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  // Process the answer to handle links and line breaks
  const renderAnswer = () => {
    if (typeof answer === "string" && answer.includes("https://")) {
      const parts = answer.split(
        "Please visit our support page for further details:"
      );

      if (parts.length === 2) {
        return (
          <>
            {parts[0]}
            <p className="mt-4">
              Please visit our support page for further details:{" "}
              <Link
                href="https://support.dfinity.org/hc/en-us/sections/8730478311060-DFINITY-Foundation"
                className="link-white"
              >
                https://support.dfinity.org/hc/en-us/sections/8730478311060-DFINITY-Foundation
              </Link>
            </p>
          </>
        );
      }
    }

    return answer;
  };

  return (
    <motion.article
      initial={false}
      className={`border-b border-gray-700 overflow-hidden ${
        isOpen ? "pb-6" : ""
      }`}
    >
      <header
        className="flex w-full items-center gap-6 tw-lead-sm justify-between py-6 cursor-pointer select-none"
        onClick={toggleOpen}
      >
        <div className="flex-1 flex items-center">
          {index && <span className="mr-2">{index}.</span>}
          {question}
        </div>
        <motion.div
          initial={false}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowDown className="w-6 h-6 text-white" />
        </motion.div>
      </header>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="pr-6">
              <p className="tw-paragraph !mb-0">{renderAnswer()}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
};

function AlliancePage() {
  const fontLoaded = useFontsLoaded();
  const heroRef = useRef<HTMLDivElement>(null);
  const isDark = useDarkHeaderInHero(heroRef);

  return (
    <Layout
      title="ICP Alliance - Build sovereign clouds and apps"
      description="Join the ICP Alliance to build sovereign clouds and applications. Enterprises and governments are researching for sovereignty, security, AI and digital assets."
    >
      <style>
        {`
           footer {
            --ifm-footer-background-color: transparent;
              background: linear-gradient(97deg, #050011 69.49%, #08214C 98.09%);
            --ifm-footer-color: white;
            --ifm-footer-link-color: white;
            --ifm-footer-title-color: white;
          }
        `}
      </style>
      <ShareMeta image="/img/shareImages/share-alliance.webp"></ShareMeta>

      <main
        className="text-white bg-black relative overflow-hidden"
        style={{
          marginTop: `calc(var(--ifm-navbar-height) * -1)`,
        }}
      >
        <DarkHeroStyles bgColor="transparent"></DarkHeroStyles>
        <section
          className="text-white pt-20 mb-[10vw] lg:mb-3"
          style={{
            background: "linear-gradient(54deg, #3B00B9 0%, #0E0822 153.06%)",
          }}
          ref={heroRef}
        >
          <div className="container-10 pt-20 pb-12 sm:pb-40 md:pb-40 md:pt-36 relative z-10">
            <div className="flex justify-end mb-8">
              <img
                src="/img/alliance/icp-alliance-logo.svg"
                alt="ICP Alliance"
                className="h-12"
              />
            </div>
            <motion.h1
              className="tw-heading-3 md:tw-heading-2 mb-2 md:mb-6 md:w-2/3"
              variants={transitions.item}
            >
              Lead the Next Web.
              <br />
              Build sovereign clouds and apps.
            </motion.h1>
            <div className="relative md:w-5/10">
              <motion.p
                className="tw-lead-sm md:tw-lead mb-8"
                variants={transitions.item}
              >
                Partner with the ICP Alliance to deliver the world's most
                advanced Web3 stack to your clients. Leverage the only Web3
                platform that performs and scales like Web2.
              </motion.p>
              <MotionLink
                className="button-white"
                href="#join"
                variants={transitions.item}
              >
                JOIN ALLIANCE
              </MotionLink>
            </div>
          </div>
        </section>

        <section className="container-10 py-16 md:py-24">
          <h2 className="tw-heading-4 md:tw-heading-3 text-center mb-16">
            Enterprises and governments are researching for sovereignty,
            security, AI and digital assets
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="tw-heading-3 md:tw-heading-2 mb-2 text-[#3B00B9]">
                ~25B
              </div>
              <p className="tw-paragraph-sm text-[#666]">
                Average monthly API calls
              </p>
            </div>
            <div>
              <div className="tw-heading-3 md:tw-heading-2 mb-2 text-[#3B00B9]">
                ~10.5T
              </div>
              <p className="tw-paragraph-sm text-[#666]">
                Total on-chain API calls processed
              </p>
            </div>
            <div>
              <div className="tw-heading-3 md:tw-heading-2 mb-2 text-[#3B00B9]">
                90%+
              </div>
              <p className="tw-paragraph-sm text-[#666]">Uptime</p>
            </div>
            <div>
              <div className="tw-heading-3 md:tw-heading-2 mb-2 text-[#3B00B9]">
                ~15T
              </div>
              <p className="tw-paragraph-sm text-[#666]">Storage operations</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <p className="tw-paragraph-sm text-[#666]">
              The ICP stack was built to scale for all of this.
            </p>
          </div>
        </section>

        <section className="container-10 py-16 md:py-24 bg-[#0E0822] text-white">
          <div className="text-center mb-16">
            <img
              src="/img/alliance/infinity-logo.svg"
              alt="Infinity logo"
              className="h-16 mb-8"
            />
            <h2 className="tw-heading-4 md:tw-heading-3 mb-6">
              Why join the ICP Alliance?
            </h2>
            <p className="tw-paragraph md:w-2/3 mx-auto">
              As a member of the ICP Alliance, you'll be at the forefront of the
              next generation web technology. The Internet Computer Protocol
              provides a complete tech stack that allows you to build fully
              on-chain applications with Web2 performance and Web3 benefits.
              You'll join a growing ecosystem of innovative companies delivering
              sovereign, secure, and scalable solutions.
            </p>
          </div>
        </section>

        <section className="container-10 py-16 md:py-24">
          <h2 className="tw-heading-4 md:tw-heading-3 mb-16 text-center">
            Deliver a new technology paradigm to your clients
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#0E0822] text-white p-8 rounded-lg">
              <h3 className="tw-heading-5 mb-4">
                Alliance membership and benefits
              </h3>
              <p className="tw-paragraph-sm">
                Access educational resources, marketing support, funding
                opportunities, and a community of builders pushing the
                boundaries of what's possible on the internet.
              </p>
            </div>
            <div className="bg-[#0E0822] text-white p-8 rounded-lg">
              <h3 className="tw-heading-5 mb-4">Certifications & training</h3>
              <p className="tw-paragraph-sm">
                Get certified as an Internet Computer developer or solutions
                provider. Access training resources to upskill your team and
                deliver cutting-edge solutions.
              </p>
            </div>
            <div className="bg-[#0E0822] text-white p-8 rounded-lg">
              <h3 className="tw-heading-5 mb-4">
                Language and coding apps to build and customize
              </h3>
              <p className="tw-paragraph-sm">
                Leverage SDK support for Motoko, Rust, TypeScript, Python, and
                more to build customized solutions that meet your clients'
                specific needs.
              </p>
            </div>
            <div className="bg-[#0E0822] text-white p-8 rounded-lg">
              <h3 className="tw-heading-5 mb-4">
                Secure from local hosting and diverse access to B2B
              </h3>
              <p className="tw-paragraph-sm">
                Build applications that are secure by design, with built-in
                authentication, autonomous operation, and enterprise-grade
                security features.
              </p>
            </div>
          </div>
        </section>

        <section className="container-10 py-16 md:py-24">
          <h2 className="tw-heading-4 md:tw-heading-3 mb-16 text-center">
            An Alliance that grows your business
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
            <div>
              <div className="mb-6">
                <span className="bg-[#0E0822] text-white px-3 py-1 rounded-full text-sm">
                  Member
                </span>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg
                    className="h-6 w-6 text-green-500 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Access to educational resources</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-6 w-6 text-green-500 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Community support and networking</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-6 w-6 text-green-500 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Alliance directory listing</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-6 w-6 text-green-500 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Marketing opportunities</span>
                </li>
              </ul>
            </div>
            <div>
              <div className="mb-6">
                <span className="bg-[#3B00B9] text-white px-3 py-1 rounded-full text-sm">
                  Partner
                </span>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg
                    className="h-6 w-6 text-green-500 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>All Member benefits plus:</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-6 w-6 text-green-500 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Co-marketing opportunities</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-6 w-6 text-green-500 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Priority technical support</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-6 w-6 text-green-500 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Partnership certification</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="container-10 py-16 md:py-24">
          <h2 className="tw-heading-4 md:tw-heading-3 mb-16 text-center">
            Leverage the full ICP tech stack for your clients
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-[#0E0822] text-white p-6 rounded-lg">
              <h3 className="tw-heading-5 mb-4">Frontend</h3>
              <ul className="space-y-3">
                <li>HTML/CSS/JS</li>
                <li>React/Vue/Angular</li>
                <li>Mobile apps</li>
                <li>APIs</li>
              </ul>
            </div>
            <div className="bg-[#0E0822] text-white p-6 rounded-lg">
              <h3 className="tw-heading-5 mb-4">Middleware</h3>
              <ul className="space-y-3">
                <li>Authentication</li>
                <li>Storage</li>
                <li>Notifications</li>
                <li>API integration</li>
              </ul>
            </div>
            <div className="bg-[#0E0822] text-white p-6 rounded-lg">
              <h3 className="tw-heading-5 mb-4">Backend</h3>
              <ul className="space-y-3">
                <li>Canister smart contracts</li>
                <li>Database</li>
                <li>Chain integration</li>
                <li>Compute</li>
              </ul>
            </div>
          </div>

          <div className="mt-16">
            <h3 className="tw-heading-5 mb-4">ICP Enterprise Apps</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="border border-gray-300 p-4 rounded-lg text-center">
                <img
                  src="/img/alliance/app-icon-1.svg"
                  alt="App icon"
                  className="h-10 mx-auto mb-2"
                />
                <p className="tw-paragraph-sm">ICP Studio</p>
              </div>
              <div className="border border-gray-300 p-4 rounded-lg text-center">
                <img
                  src="/img/alliance/app-icon-2.svg"
                  alt="App icon"
                  className="h-10 mx-auto mb-2"
                />
                <p className="tw-paragraph-sm">ICP Wallet</p>
              </div>
              <div className="border border-gray-300 p-4 rounded-lg text-center">
                <img
                  src="/img/alliance/app-icon-3.svg"
                  alt="App icon"
                  className="h-10 mx-auto mb-2"
                />
                <p className="tw-paragraph-sm">ICP Dashboard</p>
              </div>
              <div className="border border-gray-300 p-4 rounded-lg text-center">
                <img
                  src="/img/alliance/app-icon-4.svg"
                  alt="App icon"
                  className="h-10 mx-auto mb-2"
                />
                <p className="tw-paragraph-sm">Internet Identity</p>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h3 className="tw-heading-5 mb-4">Developer tools</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-gray-100 p-3 rounded-lg flex items-center justify-center">
                <img
                  src="/img/alliance/tool-1.svg"
                  alt="Tool icon"
                  className="h-8"
                />
              </div>
              <div className="bg-gray-100 p-3 rounded-lg flex items-center justify-center">
                <img
                  src="/img/alliance/tool-2.svg"
                  alt="Tool icon"
                  className="h-8"
                />
              </div>
              <div className="bg-gray-100 p-3 rounded-lg flex items-center justify-center">
                <img
                  src="/img/alliance/tool-3.svg"
                  alt="Tool icon"
                  className="h-8"
                />
              </div>
              <div className="bg-gray-100 p-3 rounded-lg flex items-center justify-center">
                <img
                  src="/img/alliance/tool-4.svg"
                  alt="Tool icon"
                  className="h-8"
                />
              </div>
              <div className="bg-gray-100 p-3 rounded-lg flex items-center justify-center">
                <img
                  src="/img/alliance/tool-5.svg"
                  alt="Tool icon"
                  className="h-8"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="container-10 py-16 md:py-24 bg-[#0E0822] text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="tw-heading-4 mb-8">
              Success in the decentralized economy requires a tech powerhouse
              that breaks through the constraints of imagination.
            </h2>
          </div>
        </section>

        <section className="container-10 py-16 md:py-24 bg-black text-white">
          <h2 className="tw-heading-4 md:tw-heading-3 mb-16 text-center">
            FAQs
          </h2>

          <div className="max-w-7xl mx-auto">
            <FaqItem
              question="What types of companies qualify to join the program?"
              answer="We welcome application developers, consultancies, system integrators, cloud service providers, and Web3-native or enterprise-focused dev shops. If you're building on, servicing, or running ICP-based solutions—or planning to—we'd love to hear from you."
              index={1}
            />
            <FaqItem
              question="Do I need previous experience building on ICP to apply?"
              answer="No! If you're new to ICP but experienced in software development or consulting and eager to explore ICP opportunities, you can join as a Member. To qualify for the Partner tier, you'll need at least one successful ICP implementation and qualified ICP developers on your team."
              index={2}
            />
            <FaqItem
              question="How do we apply to become a Member or Partner, and what is the process?"
              answer="You can apply through our official online application form. After submission, the DFINITY Partner Team will review your application and get in touch. Most applicants start as Members. If you meet the criteria for the Partner tier, you may be invited to upgrade."
              index={3}
            />
            <FaqItem
              question="Is there any cost or fee to join the program?"
              answer="No. There is currently no fee to join the program at either tier. Your main investment is your time, team, and commitment to building and delivering value with ICP."
              index={4}
            />
            <FaqItem
              question="What kind of support can we expect from DFINITY once we're accepted?"
              answer="You'll get access to a partner manager, technical support resources, documentation, early feature previews, and collaboration opportunities. Partners also receive assistance with proposal development, solution architecture, and potential go-to-market campaigns."
              index={5}
            />
            <FaqItem
              question="How can we collaborate with DFINITY on enterprise opportunities or joint bids?"
              answer="As a Partner, you can co-sell with DFINITY on enterprise projects. We support joint bids, RFPs, and proposal responses with shared resources, technical input, and client introductions. There's also a structured process for registering and collaborating on opportunities."
              index={6}
            />
            <FaqItem
              question="Can we receive funding or grants through the program to support client projects?"
              answer="Yes. DFINITY offers milestone-based co-funding, grants, or cycle credits for select partner-led projects. This can reduce risk and make it easier to pitch ICP to enterprise clients. All funding is subject to proposal approval and impact evaluation. Please visit our support page for further details: https://support.dfinity.org/hc/en-us/sections/8730478311060-DFINITY-Foundation"
              index={7}
            />
          </div>
        </section>

        <section className="container-10 py-16 md:py-24 bg-black text-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="tw-heading-4 md:tw-heading-3 mb-4 text-center">
              Get in touch
            </h2>
            <p className="text-center mb-16">DFINITY Team Members</p>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
              <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="mb-6 rounded-md overflow-hidden">
                    <img
                      src="/img/alliance/team-1.webp"
                      alt="Pierre Samaties"
                      className="w-full grayscale"
                    />
                  </div>
                  <h3 className="tw-heading-5 mb-1">Pierre Samaties</h3>
                  <p className="tw-paragraph-sm text-gray-400">
                    Chief Business Officer
                  </p>
                </div>
                <div>
                  <div className="mb-6 rounded-md overflow-hidden">
                    <img
                      src="/img/alliance/team-2.webp"
                      alt="Arno Pernthaler"
                      className="w-full grayscale"
                    />
                  </div>
                  <h3 className="tw-heading-5 mb-1">Arno Pernthaler</h3>
                  <p className="tw-paragraph-sm text-gray-400">
                    ICP Alliance Lead
                  </p>
                </div>
              </div>

              <div className="md:col-span-4">
                <h3 className="tw-heading-5 mb-6">Contact us</h3>
                <Link
                  className="link-white link-with-icon !text-white  hover:text-white hover:opacity-80 duration-200 ease-in-out"
                  href="alliance@dfinity.org"
                >
                  <LinkArrowRight />
                  <span>alliance@dfinity.org</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section
          id="join"
          className="container-10 py-16 md:py-24  text-white text-center"
        >
          <h2 className="tw-heading-4 md:tw-heading-3 mb-8">
            Ready to Join the ICP Alliance?
          </h2>
          <p className="tw-paragraph md:w-2/3 mx-auto mb-8">
            Join the ICP Alliance as an Implementation Partner to grow your
            business with powerful ICP solutions and DFINITY's support, tools,
            and visibility.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <MotionLink
              className="button-white"
              href="https://form.internetcomputer.org/alliance-application"
              target="_blank"
              variants={transitions.item}
            >
              APPLY NOW
            </MotionLink>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default AlliancePage;
