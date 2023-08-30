import Link from "@docusaurus/Link";
import { CardWithDescription } from "@site/src/components/Common/Card";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import clsx from "clsx";
import { motion } from "framer-motion";
import React, { useRef } from "react";
import IconCryptography from "../../static/img/basics/icon-ii-cryptography.svg";
import IconNoPassword from "../../static/img/basics/icon-ii-no-passwords.svg";
import IconPrivacy from "../../static/img/basics/icon-ii-privacy.svg";
import IconExternalLink from "../../static/img/external-link.svg";
import AnimateSpawn from "../components/Common/AnimateSpawn";
import ShareMeta from "../components/Common/ShareMeta";
import { useDarkHeaderInHero } from "../utils/use-dark-header-in-hero";

const CardWithIcon: React.FC<{
  children: React.ReactNode;
  icon: React.ReactNode;
  title: string;
  align?: "left" | "center";
  className?: string;
}> = ({ children, title, icon, align = "left", className }) => {
  return (
    <motion.div
      variants={transitions.item}
      className={clsx(
        "flex-1 flex flex-col text-black  border-white border-solid border bg-white-60 rounded-xl",
        align === "center"
          ? "text-center py-12 px-6 md:px-8"
          : "p-6 md:px-8 md:py-12",
        className
      )}
    >
      <div
        className={clsx(
          "mb-4 md:mb-7 flex",
          align === "center" ? "justify-center" : ""
        )}
      >
        {icon}
      </div>
      <h3 className="tw-heading-5 md:tw-heading-3 mb-3">{title}</h3>
      {children}
    </motion.div>
  );
};

function InternetIdentityPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgDark = useDarkHeaderInHero(heroRef);

  return (
    <Layout
      title="Internet Identity"
      description="A Web3 authentication framework providing a Web2 login experience with blockchain security."
    >
      <ShareMeta image="/img/shareImages/share-internet-identity.jpg"></ShareMeta>

      <main
        className="text-black relative overflow-hidden"
        style={{
          marginTop: `calc(var(--ifm-navbar-height) * -1)`,
        }}
      >
        <section
          className="overflow-hidden bg-infinite text-white "
          ref={heroRef}
        >
          {bgDark && <DarkHeroStyles bgColor="transparent"></DarkHeroStyles>}
          <AnimateSpawn
            className="container-10 pt-40 md:pb-36 md:pt-64 relative"
            variants={transitions.container}
          >
            <div className="md:w-7/10">
              <motion.h1
                className="tw-heading-3 md:tw-heading-2 mb-2 md:mb-6"
                variants={transitions.item}
              >
                Internet Identity
              </motion.h1>
              <motion.p
                className="tw-lead-sm md:tw-lead mb-0"
                variants={transitions.item}
              >
                <b>
                Web 2.0 relies on usernames and passwords for authentication, in a paradigm that 
                is insecure, inconvenient and fails to protect privacy.
                </b>
                <span style={{display: "block", height: "0.6em"}}></span>
                Web3 often builds on centralized Web 2.0 infrastructure, and keeps associated tokens and NFTs 
                on blockchains, which are controlled using cumbersome cryptographic wallets like MetaMask.
                <span style={{display: "block", height: "0.6em"}}></span>
                Internet Identity is an authentication system for both Web3 amalgams and full Web 3.0 combining public
                standards such as WebAuthn and FIDO with chain key crypto technology &mdash; users conveniently create secure
                sessions using fingerprint sensors and Face ID systems on their personal computing devices, or 
                using external hardware wallets.
              </motion.p>
            </div>
            <motion.div
              className="relative flex justify-center mt-8 md:absolute md:right-0 md:bottom-0"
              variants={transitions.container}
            >
              <div className="blob left-[40%] -translate-x-1/2 -top-[270px] blob-white blob-md md:blob-xl md:-left-[700px] md:translate-x-0 md:-top-[600px]"></div>
              <img
                src="/img/internet-identity/astronaut-4.webp"
                alt=""
                className="relative w-56 md:w-[417px]"
              />
            </motion.div>
          </AnimateSpawn>
        </section>
        <section className="container-12 relative mt-24 md:mt-40 mb-20">
          <AnimateSpawn
            className="md:w-8/12 md:mx-auto"
            variants={transitions.container}
          >
            <motion.h2
              className="tw-heading-4 text-gradient mb-6 md:tw-heading-60 md:mb-8"
              variants={transitions.item}
            >
              Internet Identity authentication creates secure, convenient and privacy-enhancing sessions for Web 3.0 experiences
            </motion.h2>
            <motion.p className="mb-0" variants={transitions.item}>
              <Link
                className="link-primary link-with-icon"
                href="https://internetcomputer.org/how-it-works#Web-access"
              >
                <span>Learn how it works</span>
                <IconExternalLink></IconExternalLink>
              </Link>
            </motion.p>
          </AnimateSpawn>
          <AnimateSpawn
            className="flex gap-3 relative flex-col md:flex-row mt-20 md:mt-40"
            variants={transitions.container}
          >
            <div className="hidden md:block blob blob-infinite blob-bottom-right blob-lg z-[-1]"></div>
            <CardWithIcon
              title="Easy! (WebAuthn)"
              icon={<IconPrivacy className="h-14 md:h-16" />}
            >
              <p className="tw-paragraph text-black-60 md:tw-lead-sm mb-0">
                Internet Identity builds on the WebAuthn standard supported by web
                browsers – which is the future of secure online authentication. The
                user authorizes the creation of a secure session using, for example,
                their fingerprint sensor. The session is signed inside a TPM chip on
                their device, where cryptographic passkeys are stored. Fully
                decentralized, easy-to-use and highly secure!
              </p>
            </CardWithIcon>

            <CardWithIcon
              title="Device passkeys"
              icon={<IconNoPassword className="h-14 md:h-16" />}
            >
              <p className="tw-paragraph text-black-60 md:tw-lead-sm mb-0">
                An "internet identity" (II) transparently links cryptographic
                passkeys securely stored inside its owner's various phones and
                laptops using FIDO Alliance and W3C standards. Private keys
                remain locked inside TPM chips inside the devices, profoundly
                improving security, since even users cannot access them directly.
                In essence, possession and control of devices provides the means
                to authenticate.
              </p>
            </CardWithIcon>

            <CardWithIcon
              title="No tracking"
              icon={<IconCryptography className="h-14 md:h-16" />}
            >
              <p className="tw-paragraph text-black-60 md:tw-lead-sm mb-0">
                Today, Web2 users are often tracked across the different applications
                and services they use by single sign-on (SSO) services. Meanwhile, in
                Web3 environments involving blockchain, users can be publicly tracked by
                their public key. Internet Identity prevents users being tracked in
                both environments by using different cryptographic psuedonyms for each
                service they interact with.
              </p>
            </CardWithIcon>
          </AnimateSpawn>

          <AnimateSpawn
            className="md:mx-1/12 mt-24 md:mt-32 md:flex md:gap-1/10 md:items-center"
            variants={transitions.container}
          >
            <motion.div
              className="relative flex-[4] max-w-sm md:max-w-none"
              variants={transitions.fadeIn}
            >
              <div className="blob blob-purple blob-md blob-center-left z-[-1] opacity-70"></div>
              <img src="/img/internet-identity/astronaut-2.webp" alt="" />
            </motion.div>
            <div className="mt-12 md:mt-0 flex-[5]">
              <motion.h2
                className="tw-heading-4 mb-6 md:tw-heading-3"
                variants={transitions.item}
              >
                Web3 security, Web2 convenience
              </motion.h2>
              <motion.div variants={transitions.item}>
                <p className="mb-3 tw-paragraph">
                  We've all grown accustomed to managing hundreds of usernames
                  and passwords, recovering forgotten accounts over text or
                  email, unwittingly permitting companies to profit from our
                  data at the cost of our personal privacy, all while
                  falling victim to threats of identity theft and fraud.
                </p>
                <p className="mb-0 tw-paragraph">
                  On the Internet Computer blockchain, users can securely
                  authenticate themselves without ever needing an email,
                  username, or password. Using a passkey, users can login
                  conveniently without their information being monetized
                  by tech companies. Internet Identity is designed to prevent
                  Web3 services to track user activity across dapps.
                </p>
                <Link
                  className="link-primary link-with-icon mt-6"
                  href="https://identity.ic0.app/"
                >
                  <span>Learn how to create one</span>
                  <IconExternalLink></IconExternalLink>
                </Link>
              </motion.div>
            </div>
          </AnimateSpawn>
        </section>
        <AnimateSpawn
          className="bg-infinite"
          el={motion.section}
          variants={transitions.container}
        >
          <div className="container-10 pt-6 pb-20 md:pb-6 relative text-white flex flex-col items-start md:flex-row md:items-center md:gap-1/12">
            <div className="blob blob-white blob-md blob-center-right md:blob-bottom-right md:right-[200px] md:bottom-[-100px]"></div>
            <img
              src="/img/internet-identity/astronaut-3.webp"
              alt=""
              className="self-center md:order-2 md:flex-[4]"
            />
            <motion.div
              className="md:order-1 md:flex-[5]"
              variants={transitions.item}
            >
              <h2 className="tw-heading-4 md:tw-heading-3 mb-6 mt-6 md:mt-0">
                Focused on <br />
                privacy & security
              </h2>
              <p className="tw-lead-sm md:tw-lead text-white-60 mb-0">
                By integrating dapps with Internet Identity, websites cannot
                track online user activity coming from other websites. Users
                have full control over their identities and access to Web3
                services at their fingertips, while connections are private.
              </p>
            </motion.div>
          </div>
        </AnimateSpawn>

        <section className="container-12 relative mb-20 md:mb-40 mt-20 md:mt-40">
          <AnimateSpawn
            className="mb-12 md:max-w-[680px] md:text-center md:mx-auto md:mb-8"
            variants={transitions.container}
          >
            <motion.h2
              className="tw-heading-4 md:tw-heading-60 mb-6"
              variants={transitions.item}
            >
              Identity technologies on the Internet Computer
            </motion.h2>
            <motion.p className="tw-lead-sm mb-0" variants={transitions.item}>
              Expand a dapp with Internet Identity or build your own
              authentication solution
            </motion.p>
          </AnimateSpawn>
          <AnimateSpawn
            className="flex gap-5 items-start flex-col md:flex-row"
            variants={transitions.container}
          >
            <CardWithIcon
              title="Internet Identity"
              icon={
                <img
                  src="/img/internet-identity/astronaut-1.webp"
                  className="h-16"
                  alt=""
                ></img>
              }
              align="center"
            >
              <p className="tw-paragraph text-black-60 md:tw-lead-sm mb-3">
                Internet Identity is an out-of-the-box authentication framework
                for any Web3 developer to integrate with, or build their own
                web3 identity solution on top of.
              </p>
              <p className="mb-0">
                <Link
                  href="https://identity.ic0.app/"
                  className="link-primary link-with-icon"
                >
                  Check out Internet Identity
                  <IconExternalLink></IconExternalLink>
                </Link>
              </p>
            </CardWithIcon>
            <CardWithIcon
              title="NFID"
              icon={
                <img
                  src="/img/internet-identity/nfid.webp"
                  alt=""
                  className="h-16"
                />
              }
              align="center"
              className="mt-0 md:mt-30"
            >
              <p className="tw-paragraph text-black-60 md:tw-lead-sm mb-3">
                NFID is the digital identity for signing in to applications
                privately and securely. It builds on the cryptography of
                Internet Identity and extends it with a host of new
                functionality including a crypto wallet, Metamask
                authentication, phone verification and more.
              </p>
              <p className="mb-0">
                <Link
                  href="https://nfid.one/"
                  className="link-primary link-with-icon"
                >
                  Check out NFID
                  <IconExternalLink></IconExternalLink>
                </Link>
              </p>
            </CardWithIcon>
            <CardWithIcon
              title="AstroX ME"
              icon={
                <img
                  src="/img/internet-identity/astrox.webp"
                  alt=""
                  className="h-16"
                />
              }
              align="center"
            >
              <p className="tw-paragraph text-black-60 md:tw-lead-sm mb-3">
                AstroX’s ME wallet, a multi-chain smart wallet powered by
                advanced cryptography, provides a smooth interactive experience
                similar to Web2 applications. ME wallet, using biometric
                technologies including fingerprints and facial recognition
                instead of existing wallet’s private key management methods, is
                able to creatively restore wallets on new devices without seed
                phrases.
              </p>
              <p className="mb-0">
                <Link
                  href="https://astrox.me/"
                  className="link-primary link-with-icon"
                >
                  Check out AstroX ME
                  <IconExternalLink></IconExternalLink>
                </Link>
              </p>
            </CardWithIcon>
          </AnimateSpawn>
        </section>

        <section className="max-w-page relative mx-auto mb-20 px-6 md:mb-40 md:px-15">
          <AnimateSpawn
            className=" relative text-white"
            variants={transitions.container}
          >
            <motion.div
              className="blob blob-purple blob-md blob-center z-[-1] md:blob-xl"
              variants={transitions.fadeIn}
            ></motion.div>
            <motion.h2
              className="tw-heading-5 text-center mb-2 w-full mx-auto md:tw-heading-60 md:mb-6 lg:w-8/12"
              variants={transitions.item}
            >
              Build with Identity
            </motion.h2>
            <motion.p
              className="tw-lead-sm mb-0 text-center mx-auto md:w-6/12"
              variants={transitions.item}
            >
              Learn how to build a user-friendly dApp on the
              Internet Computer using Internet Identity, our core identity component.
            </motion.p>
          </AnimateSpawn>
          <AnimateSpawn
            className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-8 md:mt-16"
            variants={transitions.container}
          >
            <CardWithDescription
              title="Dev toolkits"
              description="See the docs, get building."
              href="/docs/current/developer-docs/integrations/internet-identity/integrate-identity"
            />
            <CardWithDescription
              title="GitHub repo"
              description="Check out the source code of Internet Identity."
              href="https://github.com/dfinity/internet-identity"
            />
            <CardWithDescription
              title="Tech dive"
              description="Resources to learn all about Internet Identity, the blockchain authentication framework supported by the Internet Computer."
              href="/how-it-works/web-authentication-identity/"
            />
            <CardWithDescription
              title="Blog"
              description="Internet Identity: Easy Web3 Authentication."
              href="https://medium.com/dfinity/internet-identity-the-end-of-usernames-and-passwords-ff45e4861bf7"
            />
          </AnimateSpawn>
        </section>
      </main>
    </Layout>
  );
}

export default InternetIdentityPage;
