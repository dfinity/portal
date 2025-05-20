import React, { useRef } from "react";

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
import { motion } from "framer-motion";
import transitions from "@site/static/transitions.json";
import { useDarkHeaderInHero } from "../utils/use-dark-header-in-hero";
import { useFontsLoaded } from "@site/src/utils/use-fonts-loaded";

const MotionLink = motion(Link);

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
        className="text-white bg-[#010103] relative overflow-hidden"
        style={{
          marginTop: `calc(var(--ifm-navbar-height) * -1)`,
        }}
      >
        <DarkHeroStyles bgColor="transparent"></DarkHeroStyles>
        <section
          className="text-white pt-20 mb-[10vw] lg:mb-3 relative bg-[#010103]"
          ref={heroRef}
        >
          <div className="absolute right-0 h-full top-1/2 -translate-y-1/2
            w-full bg-[url('/img/alliance/allianceglobe.jpg')] bg-no-repeat bg-[length:auto_100%]"
          
            style={{
              backgroundPosition: "right 50%"
            }}
          ></div>
          <div className="container-10 pt-20 pb-12 sm:pb-40 md:pb-40 md:pt-36 relative z-10">
            
            <motion.h1
              className="tw-heading-3 md:tw-heading-2 mb-2 md:mb-6 md:w-2/3"
              variants={transitions.item}
            >Lead the Next Web</motion.h1>
            <motion.h2
              className="tw-heading-4 md:tw-heading-3 mb-8"
              variants={transitions.item}
            >Build sovereign clouds and apps.</motion.h2>

            <div className="relative md:w-5/10">
              <motion.p
                className="tw-lead-sm md:tw-lead mb-8"
                variants={transitions.item}
              >
                Become the go-to partner for clients racing towards data sovereignty and self-writing apps. ICP Alliance offers leads, solution blueprints, early tech access, and engineering support for faster delivery.
              </motion.p>
              <MotionLink
                className="button-white mr-4"
                href="#join"
                variants={transitions.item}
              >
                Apply now
              </MotionLink>

              <MotionLink
                className="button-outline-white"
                href="#join"
                variants={transitions.item}
              >
                Get in touch
              </MotionLink>
            </div>

            <img
              src="/img/alliance/icpa-logo.png"
              alt="alliance logo"
              className="mx-auto absolute top-1/2 right-0 -translate-x-1/2 w-56 -translate-y-1/2"
            />
          </div>
        </section>

        <section className="container-10 py-16 md:py-24">
          <h2 className="tw-heading-4 md:tw-heading-3 text-center mb-16">
            Enterprises and governments are researching for sovereignty,
            security, AI and digital assets
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="tw-heading-3 md:tw-heading-2 mb-2 text-white">
                ~25B
              </div>
              <p className="tw-paragraph-sm text-[#666]">
                Average monthly API calls
              </p>
            </div>
            <div className="radius-2 outline-[#fff] outline-1">
              <div className="tw-heading-3 md:tw-heading-2 mb-2 text-white">
                ~10.5T
              </div>
              <p className="tw-paragraph-sm text-[#666]">
                Total on-chain API calls processed
              </p>
            </div>
            <div>
              <div className="tw-heading-3 md:tw-heading-2 mb-2 text-white">
                90%+
              </div>
              <p className="tw-paragraph-sm text-[#666]">Uptime</p>
            </div>
            <div>
              <div className="tw-heading-3 md:tw-heading-2 mb-2 text-white">
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

        <section className="container-10 py-16 md:py-24">
          <h2 className="tw-heading-4 md:tw-heading-3 mb-16 text-center">
            FAQs
          </h2>

          <FaqSection title={<></>} contentClassName="gap-8">
            <Faq title="What types of companies qualify to join the Alliance?">
              <p>
                The ICP Alliance welcomes technology companies, development
                agencies, system integrators, consultancies, and other
                organizations that are interested in leveraging the Internet
                Computer Protocol to deliver innovative solutions to their
                clients.
              </p>
            </Faq>
            <Faq title="Do I need previous blockchain building or ICP experience?">
              <p>
                No, previous blockchain or ICP experience is not required. We
                provide comprehensive training resources and support to help
                your team get up to speed quickly with the Internet Computer
                Protocol.
              </p>
            </Faq>
            <Faq title="How do we apply to become a Member or Partner, and what is the process?">
              <p>
                You can apply through our online application form. The process
                involves submitting your company information, describing your
                interest in the Alliance, and your technical capabilities.
                Applications are reviewed by our team, and successful applicants
                will be contacted to complete the onboarding process.
              </p>
            </Faq>
            <Faq title="Is there a cost to join the Alliance?">
              <p>
                Membership in the ICP Alliance is currently free. Partners may
                have certain requirements to maintain their partnership status,
                such as completing certifications or contributing to the
                ecosystem.
              </p>
            </Faq>
            <Faq title="What kind of support does the Alliance provide to members?">
              <p>
                The Alliance provides technical support, training resources,
                marketing assistance, networking opportunities, and access to
                funding programs. Members also gain visibility through our
                directory and can participate in co-marketing initiatives.
              </p>
            </Faq>
            <Faq title="How can we collaborate with DFINITY or ecosystem supporters to start/build?">
              <p>
                Alliance members can collaborate with DFINITY and other
                ecosystem participants through our partnership programs, joint
                development initiatives, and community events. The Alliance
                facilitates connections between members and potential
                collaborators based on complementary skills and interests.
              </p>
            </Faq>
            <Faq title="Can we receive funding or grants through the Alliance to support client projects?">
              <p>
                Yes, Alliance members may be eligible for funding through
                various grant programs and initiatives designed to support
                development on the Internet Computer Protocol. Our team can help
                you identify and apply for appropriate funding opportunities.
              </p>
            </Faq>
          </FaqSection>
        </section>

        <section className="container-10 py-16 md:py-24">
          <h2 className="tw-heading-4 md:tw-heading-3 mb-16 text-center">
            Meet the team
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <img
                src="/img/alliance/team-1.jpg"
                alt="Pierre Sammut"
                className="w-40 h-40 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="tw-heading-5 mb-1">Pierre Sammut</h3>
              <p className="tw-paragraph-sm text-[#666]">Head of Alliance</p>
            </div>
            <div className="text-center">
              <img
                src="/img/alliance/team-2.jpg"
                alt="Anna Porubhai"
                className="w-40 h-40 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="tw-heading-5 mb-1">Anna Porubhai</h3>
              <p className="tw-paragraph-sm text-[#666]">ICP Support</p>
            </div>
          </div>

          <div className="bg-gray-100 p-8 rounded-lg mt-16">
            <h3 className="tw-heading-5 mb-4">Contact us</h3>
            <p className="tw-paragraph-sm mb-4">
              Have questions about the ICP Alliance? Reach out to our team for
              more information about membership, benefits, or how to get
              started.
            </p>
            <MotionLink
              className="button-primary"
              href="mailto:alliance@internetcomputer.org"
              variants={transitions.item}
            >
              alliance@internetcomputer.org
            </MotionLink>
          </div>
        </section>

        <section
          id="join"
          className="container-10 py-16 md:py-24 bg-gradient-to-r from-[#3B00B9] to-[#0E0822] text-white text-center"
        >
          <h2 className="tw-heading-4 md:tw-heading-3 mb-8">
            Ready to Join the ICP Alliance?
          </h2>
          <p className="tw-paragraph md:w-2/3 mx-auto mb-8">
            Take the first step towards becoming part of the Internet Computer
            ecosystem. Apply now to join the Alliance and start building the
            future of the web.
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
            <MotionLink
              className="button-outline-white"
              href="https://internetcomputer.org/alliance-faq"
              target="_blank"
              variants={transitions.item}
            >
              LEARN MORE
            </MotionLink>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default AlliancePage;
