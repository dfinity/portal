import Link from "@docusaurus/Link";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";
import React, { useRef } from "react";
import AnimateSpawn from "../components/Common/AnimateSpawn";
import { Faq, FaqSection } from "../components/Common/Faq/Faq";
import LinkArrowRight from "../components/Common/Icons/LinkArrowRight";
import LinkArrowUpRight from "../components/Common/Icons/LinkArrowUpRight";
import LinkCardsSection from "../components/Common/LinkCardsSection";
import ShareMeta from "../components/Common/ShareMeta";
import {
  TranslatedCard,
  TranslatedCardList,
} from "../components/Common/TranslatedCards/TranslatedCards";
import TranslatedLayout from "../components/Common/TranslatedLayout/TranslatedLayout";
import VideoCard from "../components/Common/VideoCard";
import { useDarkHeaderInHero } from "../utils/use-dark-header-in-hero";

const MotionLink = motion(Link);

function InternetIdentityPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgDark = useDarkHeaderInHero(heroRef);

  return (
    <Layout
      title="Internet Identity"
      description="Internet Identity redefines user experiences by removing friction from the authentication journey and enabling data sovereignty."
    >
      <ShareMeta image="/img/shareImages/share-internet-identity.jpg"></ShareMeta>

      <main
        className="text-black relative overflow-hidden"
        style={{
          marginTop: `calc(var(--ifm-navbar-height) * -1)`,
        }}
      >
        <section className="bg-infinite text-white pt-20" ref={heroRef}>
          {bgDark && <DarkHeroStyles bgColor="transparent"></DarkHeroStyles>}

          <div className="container-10 pt-20 pb-12 sm:pb-0 md:pb-40 md:pt-36 relative">
            <div className="blob blob-white blob-xl md:blob-xl md:blob-x-8 md:blob-y-10 opacity-100"></div>
            <motion.h1
              className="tw-heading-3 md:tw-heading-2 mb-2 md:mb-6 md:w-8/10"
              variants={transitions.item}
            >
              A fully decentralized digital identity solution
            </motion.h1>
            <div className="relative  md:w-5/10">
              <motion.p
                className="tw-lead-sm md:tw-lead mb-8"
                variants={transitions.item}
              >
                Internet Identity redefines user experiences by removing
                friction from the authentication journey and enabling data
                sovereignty.
              </motion.p>
              <motion.p className="mb-0" variants={transitions.item}>
                <Link
                  className="link-white link-with-icon"
                  href="/docs/current/references/ii-spec/"
                >
                  <LinkArrowRight />
                  Start building
                </Link>
              </motion.p>
            </div>
          </div>
          <div className="container-12 relative">
            <div className="text-center md:w-5/10 relative md:absolute top-0 sm:top-40 md:top-0 translate-y-24 sm:translate-y-10 md:-translate-y-1/2 right-0 -mt-30 md:-mt-30">
              <img
                src="/img/internet-identity/internet-identity-hero.webp"
                alt="Start building on Internet Identity"
                className="w-full max-w-sm sm:max-w-[720px] md:max-w-none"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <section className="container-10 relative mt-24 sm:mt-52 md:mt-40">
          <AnimateSpawn className="md:w-6/12" variants={transitions.container}>
            <motion.h2
              className="tw-heading-4 text-gradient md:tw-heading-60 mb-0"
              variants={transitions.item}
            >
              Harness the full potential of digital identity
            </motion.h2>
          </AnimateSpawn>
        </section>

        <section className="container-12 pt-20 md:pt-30">
          <div className="flex flex-col gap-16 md:gap-40">
            <TranslatedLayout
              imageUrl="/img/internet-identity/image-1.webp"
              reverse={true}
            >
              <h3 className="tw-heading-4 md:tw-heading-60 mb-6">
                100% decentralized
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-0">
                Internet Identity is fully decentralized because apps built on
                ICP store data entirely on-chain. It's more secure and fault
                tolerant than digital identity solutions hosted on protocols
                that rely on centralized cloud providers like Amazon Web
                Services.
              </p>
            </TranslatedLayout>
            <TranslatedLayout imageUrl="/img/internet-identity/image-2.webp">
              <h3 className="tw-heading-4 md:tw-heading-60 mb-6">
                User friendly
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-0">
                Instead of using passwords to sign in to apps, users simply
                unlock their devices with FaceID, TouchID or passcodes to access
                their accounts. By unlocking their devices, users authorize the
                use of a passkey. Passkeys are built on standardized technology,
                making Internet Identity more convenient than traditional
                authentication methods.
              </p>
            </TranslatedLayout>
            <TranslatedLayout
              imageUrl="/img/internet-identity/image-3.webp"
              reverse={true}
            >
              <h3 className="tw-heading-4 md:tw-heading-60 mb-6">
                Enhanced security
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-0">
                Internet Identity removes the need for apps to store passwords
                in a database. When a user creates an Internet Identity, they're
                automatically assigned a public and private key pair. The
                private key is locked in a tamper-proof chip on the user's
                device, so nobody can retrieve it.
              </p>
            </TranslatedLayout>

            <TranslatedLayout imageUrl="/img/internet-identity/image-4.webp">
              <h3 className="tw-heading-4 md:tw-heading-60 mb-6">
                Strict privacy
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-0">
                Every time a user creates an account with an app using Internet
                Identity, a new key pair is generated and managed for that app.
                This means users can interact with an app without worrying that
                it will share their data (like Big Tech's Single Sign-On).
              </p>
            </TranslatedLayout>
            <TranslatedLayout
              imageUrl="/img/internet-identity/image-5.webp"
              reverse={true}
            >
              <h3 className="tw-heading-4 md:tw-heading-60 mb-6">Multichain</h3>
              <p className="tw-paragraph md:tw-lead-sm mb-3">
                Once ICP completes its integration with the Ethereum Virtual
                Machine, decentralized apps built on the Ethereum protocol will
                be able to integrate Internet Identity and offer users from both
                ecosystems a convenient, secure, and private way to log in and
                share verifiable credentials.
              </p>
              <p className="tw-paragraph md:tw-lead-sm mb-0">
                ICP is compatible with the Ethereum Virtual Machine. Developers
                building decentralized apps on the Ethereum protocol can
                integrate Internet Identity and offer users from both ecosystems
                a convenient, secure, and private way to log in and share
                verifiable credentials.
              </p>
            </TranslatedLayout>
            <TranslatedLayout imageUrl="/img/internet-identity/image-6.webp">
              <h3 className="tw-heading-4 md:tw-heading-60 mb-6">
                Easy integration
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-3 md:mb-6">
                Internet Identity seamlessly integrates with Web2 and Web3 apps.
                It deploys canister smart contracts to request authentication
                and verify user identities.
              </p>
              <p className="mb-0">
                <Link
                  href="/docs/current/developer-docs/integrations/internet-identity/integrate-identity"
                  className="link-primary"
                >
                  <LinkArrowRight />
                  Integrate Internet Identity
                </Link>
              </p>
            </TranslatedLayout>
          </div>
        </section>
        <section className="bg-infinite pt-24 mt-20 md:mt-30">
          <div className="container-12 text-white">
            <AnimateSpawn
              className="mx-auto md:w-6/12 text-center"
              variants={transitions.item}
            >
              <h2 className="tw-heading-3 md:tw-heading-60">
                Identity solutions for a new era
              </h2>
            </AnimateSpawn>

            <AnimateSpawn
              className="md:mx-1/12 mt-24 md:mt-0 md:flex md:gap-1/10 md:items-center"
              variants={transitions.container}
            >
              <motion.div
                className="relative flex-[4] max-w-sm md:max-w-none"
                variants={transitions.fadeIn}
              >
                <div className="blob blob-purple blob-md blob-x-2 blob-y-3 z-0 opacity-50"></div>
                <img
                  src="/img/internet-identity/astronaut-2.webp"
                  alt="Seamless authentication"
                  className="relative"
                  loading="lazy"
                />
              </motion.div>
              <div className="mt-12 md:mt-0 flex-[5] self-end">
                <motion.h2
                  className="tw-heading-4 mb-6 md:tw-heading-3"
                  variants={transitions.item}
                >
                  Seamless authentication
                </motion.h2>
                <motion.div variants={transitions.item}>
                  <p className="mb-0 tw-lead-sm md:tw-lead text-white/80">
                    Internet Identity is built on WebAuthN, a global
                    authentication standard and a key part of the FIDO
                    framework. It removes the need for usernames and passwords
                    and replaces them with passkeys: registered devices like
                    smartphones or laptops and hardware wallets such as YubiKey
                    or Ledger. To authenticate their identity, users simply
                    connect with Internet Identity and unlock their device.
                  </p>
                </motion.div>
              </div>
            </AnimateSpawn>
            <AnimateSpawn
              className="md:mx-1/12 mt-24 md:mt-12 md:flex md:gap-1/10 md:items-center"
              variants={transitions.container}
            >
              <motion.div
                className="relative flex-[5] max-w-sm md:max-w-none md:order-2"
                variants={transitions.fadeIn}
              >
                <div className="blob blob-white blob-md blob-x-8 blob-y-8 z-0 opacity-70"></div>
                <img
                  src="/img/internet-identity/astronaut-3.webp"
                  alt="Verifiable credentials"
                  loading="lazy"
                />
              </motion.div>

              <div className="mt-6 md:mt-0 flex-[5] md:order-1">
                <motion.h2
                  className="tw-heading-4 mb-6 md:tw-heading-3"
                  variants={transitions.item}
                >
                  Verifiable credentials
                </motion.h2>
                <motion.div variants={transitions.item}>
                  <p className="mb-8 tw-lead-sm md:tw-lead text-white/80">
                    Once a user registers for a credential, such as date of
                    birth or nationality, they can reuse it with any apps they
                    choose. To protect a user's privacy, Internet Identity
                    creates a temporary identifier when they share a credential,
                    which prevents issuers and verifiers from tracking their
                    activity across different apps.
                  </p>
                  <p className="mb-0">
                    <Link
                      href=""
                      className="button-white pointer-events-none !text-black/30"
                      aria-disabled
                    >
                      COMING SOON
                    </Link>
                  </p>
                </motion.div>
              </div>
            </AnimateSpawn>
          </div>

          <AnimateSpawn
            variants={transitions.container}
            className="py-20 md:py-30"
          >
            <div className="container-10 grid gap-4 grid-cols-2 md:grid-cols-4">
              <motion.div
                variants={transitions.item}
                className="flex-1 rounded-3xl bg-white/90 backdrop-blur-2xl text-center p-5 md:p-10 flex flex-col gap-5 items-center"
              >
                <img
                  src="/img/internet-identity/icon-3.svg"
                  alt="Age verification"
                  loading="lazy"
                />
                <h3 className="tw-lead-sm text-black/80 mb-0">
                  Age verification
                </h3>
              </motion.div>
              <motion.div
                variants={transitions.item}
                className="flex-1 rounded-3xl bg-white/90 backdrop-blur-2xl text-center p-5 md:p-10 flex flex-col gap-5 items-center"
              >
                <img
                  src="/img/internet-identity/icon-4.svg"
                  alt="Know your customer"
                  loading="lazy"
                />
                <h3 className="tw-lead-sm text-black/80 mb-0">
                  Know your customer
                </h3>
              </motion.div>
              <motion.div
                variants={transitions.item}
                className="flex-1 rounded-3xl bg-white/90 backdrop-blur-2xl text-center p-5 md:p-10 flex flex-col gap-5 items-center"
              >
                <img
                  src="/img/internet-identity/icon-1.svg"
                  alt="Proof of humanity"
                  loading="lazy"
                />
                <h3 className="tw-lead-sm text-black/80 mb-0">
                  Proof of humanity
                </h3>
              </motion.div>
              <motion.div
                variants={transitions.item}
                className="flex-1 rounded-3xl bg-white/90 backdrop-blur-2xl text-center p-5 md:p-10 flex flex-col gap-5 items-center"
              >
                <img
                  src="/img/internet-identity/icon-2.svg"
                  alt="Academic transcripts"
                  loading="lazy"
                />
                <h3 className="tw-lead-sm text-black/80 mb-0">
                  Academic transcripts
                </h3>
              </motion.div>
            </div>
          </AnimateSpawn>
        </section>

        <section className="container-10 mt-20 md:mt-30">
          <AnimateSpawn className="" variants={transitions.container}>
            <motion.h2
              className="tw-heading-4 text-gradient md:tw-heading-60 mb-0 text-center"
              variants={transitions.item}
            >
              A versatile solution <br className="hidden md:block" />
              for all providers
            </motion.h2>
          </AnimateSpawn>
        </section>
        <section className="container-10 mt-6 md:mt-10">
          <TranslatedCardList className="md:mx-1/12">
            <TranslatedCard
              title="Enterprises"
              icon={
                <img
                  src="/img/internet-identity/icon-5.svg"
                  loading="lazy"
                  aria-hidden="true"
                />
              }
            >
              <motion.p
                className="mb-0 tw-paragraph"
                variants={transitions.item}
              >
                Enhance the user experience by simplifying authentication and
                credential sharing and reduce costs and cyberthreats by removing
                the need to store passwords.
              </motion.p>
            </TranslatedCard>
            <TranslatedCard
              title="Developers"
              icon={
                <img
                  src="/img/internet-identity/icon-6.svg"
                  loading="lazy"
                  aria-hidden="true"
                />
              }
            >
              <motion.p
                className="mb-0 tw-paragraph"
                variants={transitions.item}
              >
                Add value when designing apps by integrating cutting-edge
                authentication and credential verification tools into their tech
                stack.
              </motion.p>
            </TranslatedCard>
            <TranslatedCard
              title="Education"
              icon={
                <img
                  src="/img/internet-identity/icon-7.svg"
                  loading="lazy"
                  aria-hidden="true"
                />
              }
            >
              <motion.p
                className="mb-0 tw-paragraph"
                variants={transitions.item}
              >
                Ensure the integrity and accuracy of academic records by issuing
                digital copies of degrees, qualifications, and certificates
              </motion.p>
            </TranslatedCard>
            <TranslatedCard
              title="Governments"
              icon={
                <img
                  src="/img/internet-identity/icon-8.svg"
                  loading="lazy"
                  aria-hidden="true"
                />
              }
            >
              <motion.p
                className="mb-0 tw-paragraph"
                variants={transitions.item}
              >
                Provide citizens with a decentralized digital identity solution
                instead of putting their data in the hands of a private company
                that may host servers in a different country or jurisdiction.
              </motion.p>
            </TranslatedCard>
          </TranslatedCardList>
        </section>

        <AnimateSpawn
          el={motion.section}
          variants={transitions.container}
          className="mt-20 md:mt-30"
        >
          <div className="container-10 mb-10">
            <motion.h2
              className="tw-heading-3 md:tw-heading-60 mb-0 text-gradient"
              variants={transitions.item}
            >
              Internet Identity in action
            </motion.h2>
          </div>
          <div className="md:container-12 grid md:grid-cols-2 gap-5 md:gap-5 pb-16 md:pb-0 bg-white md:bg-transparent">
            <motion.div
              className="md:col-span-2 md:rounded-xl backdrop-blur-2xl md:bg-white-60 relative flex flex-col md:flex-row  px-6 md:px-0 pt-10 md:pt-0"
              variants={transitions.item}
            >
              <div className=" flex-1 md:order-2 flex rounded-xl overflow-hidden md:max-w-5/10">
                <img
                  src="/img/internet-identity/helix.webp"
                  alt="Helix Markets"
                  className="w-full relative object-cover"
                  loading="lazy"
                />
              </div>
              <div className="md:flex-1 md:order-1 md:p-16 md:max-w-5/10 mt-10 md:mt-0">
                <h2 className="tw-heading-5 md:tw-heading-4 mb-6">
                  Authentication in Helix Markets
                </h2>
                <p className="tw-lead-sm mb-0 text-black/60">
                  Helix Markets is a decentralized exchange offering a unique
                  and innovative trading experience for crypto enthusiasts. It
                  introduces features like native multichain liquidity and
                  decentralized custody.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="md:rounded-xl md:bg-white/60 md:backdrop-blur-2xl px-6 pt-6 md:p-16"
              variants={transitions.item}
            >
              <h3 className="tw-heading-5 md:tw-heading-4 mb-4 md:mb-6">
                The Problem
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-0 text-black/60">
                One of Helix's biggest obstacles to adoption was the complexity
                of the authentication process, a common challenge across the
                Web3 ecosystem. Users need different wallets to log into
                different dapps, meaning they have to manage multiple key pairs.
                This friction deterred traders accustomed to the less secure but
                more convenient Web2 experience.
              </p>
            </motion.div>
            <motion.div
              className="md:rounded-xl md:bg-white/60 md:backdrop-blur-2xl px-6 pt-6 md:p-16"
              variants={transitions.item}
            >
              <h3 className="tw-heading-5 md:tw-heading-4 mb-4 md:mb-6">
                The Solution
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-3 text-black/60">
                Internet Identity provides traders with digital identifiers they
                can use throughout the Internet Computer ecosystem, streamlining
                the authentication journey on Helix's platform and offering
                quicker and easier access to their wallets. As anchors are
                portable (up to eight devices can be added as passkeys), Helix
                knows its traders wherever they log in, while public key
                cryptography eliminates the risk and burden of managing password
                databases.
              </p>
              <p className="tw-paragraph md:tw-lead-sm mb-3 text-black/60">
                <strong>
                  ”Internet Identity allows Helix to deliver a Web2 experience
                  to users of Web3 dapps”
                </strong>
              </p>
              <p className="tw-paragraph md:tw-lead-sm mb-0 text-black/60">
                <strong>– Gorazd Ocvirk, Co-Founder</strong>
              </p>
            </motion.div>
          </div>
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
              Watch & Learn
            </motion.h2>
            <div className="md:flex-1 md:pt-3">
              <motion.p
                className="mb-4 tw-paragraph md:tw-lead-sm"
                variants={transitions.item}
              >
                From concept to coding — learn all about the Bitcoin Integration
                feature on ICP through these videos.
              </motion.p>
              <MotionLink
                variants={transitions.item}
                href="https://www.youtube.com/@DFINITY"
                className="link-primary link-with-icon"
              >
                Explore more videos <LinkArrowUpRight />
              </MotionLink>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <motion.div
              variants={transitions.item}
              className="col-span-1 md:col-span-2"
            >
              <VideoCard
                image="https://img.youtube.com/vi/9eUTcCP_ELM/maxresdefault.jpg"
                title="Identity and Authentication on the Internet Computer"
                label="Interview"
                link={`https://www.youtube.com/watch?v=9eUTcCP_ELM`}
                description="With Björn Tackmann"
              />
            </motion.div>
          </div>
        </AnimateSpawn>
        <section className="container-12 mt-20 md:mt-30">
          <FaqSection
            contentClassName="md:mr-1/12"
            id="participate"
            title={
              <div className=" mb-12 md:mb-0">
                <h2 className="tw-heading-3 text-gradient mb-6 md:tw-heading-60">
                  FAQs
                </h2>
                <p className="tw-lead-sm mb-0">
                  Find answers to commonly asked questions about Internet
                  Identity.
                </p>
              </div>
            }
          >
            <Faq title="What's wrong with Web2 authentication?">
              <p>
                A website stores usernames and passwords in a database. When a
                user logs in, their device sends their password to the website
                which checks it against its records. However, databases are
                increasingly vulnerable to breaches. And while encrypting
                passwords offers an additional layer of security, storing them
                as plaintext is bad practice.
              </p>
              <p>
                To make matters worse, user-generated passwords are easily
                hackable. Cybercriminals have a host of tools at their disposal,
                including spyware, phishing or brute force attacks where
                algorithms use trial and error to guess the right combination of
                letters, numbers and symbols.
              </p>
            </Faq>
            <Faq title="What's wrong with Web3 authentication">
              <p>
                Web3 authentication may seem like progress, but users are still
                vulnerable because they're limited to a single authentication
                factor. For instance, keys are typically stored on the device
                used to install a crypto wallet. If someone steals the device or
                gains access to it, the user loses control of their wallet.
              </p>
            </Faq>
            <Faq title="What is public key cryptography?">
              <p>
                Public key cryptography is an encryption technique that uses a
                pair of keys to encrypt and decrypt messages between two
                entities. The public key is similar to a username so it can be
                shared, but the private key needs to be kept secret, like a
                password.
              </p>
              <p>
                Internet Identity leverages digital signatures, an application
                of public key cryptography, for the login process. To start, an
                app sends an authentication request to the user's device. The
                device takes the request and creates a digital signature using
                their private key and a cryptographic algorithm. The app then
                verifies the signature using the user's public key and approves
                the request.
              </p>
            </Faq>
            <Faq title="What makes Internet Identity secure?">
              <p>
                Most modern computing devices contain a TPM (Trusted Platform
                Module) chip. One of the functions of a TPM chip is storing
                sensitive information, which in Internet Identity's case is a
                copy of a user's private key. When Internet Identity prompts the
                user to unlock their device, either by entering a PIN code or
                using biometrics such as fingerprint recognition, the TPM chip
                creates a new digital signature using their private key.
              </p>
              <p>
                The user's private key is secure because the TPM chip is
                virtually impenetrable. The chip is built into their device's
                motherboard, and any attempt to tamper with it can cause
                irreparable damage.
              </p>
            </Faq>
            <Faq title="What makes Internet Identity private?">
              <p>
                A username for Web2 authentication generally links to an email
                address which acts as a unique identifier used by big tech to
                track a user's activity. In Web3's case, transparency may be one
                of the founding principles of blockchain technology, but it also
                means anyone can trace the transactions of an individual wallet
                address using a block explorer.
              </p>
              <p>
                Cryptographic pseudonyms are digital identities which protect a
                user's privacy when online. They have a wide range of use cases,
                from messaging apps to social media platforms and Web3 dapps.
                Internet Identity creates a pseudonym every time a user logs in,
                preventing apps from tracking their activity.
              </p>
            </Faq>
          </FaqSection>
        </section>

        <LinkCardsSection
          className="mb-20 md:mb-30 mt-30 md:mt-40"
          title="Get familiar with the Internet Computer"
          cards={[
            {
              label: "Blogs",
              href: "https://medium.com/dfinity/internet-identity-the-end-of-usernames-and-passwords-ff45e4861bf7",
            },
            {
              label: "ICP community events",
              href: "/events",
            },
            {
              label: "Dev docs",
              href: "/docs/current/home",
            },
            {
              label: "ICP dapps",
              href: "/ecosystem",
            },
          ]}
        />
      </main>
    </Layout>
  );
}

export default InternetIdentityPage;
