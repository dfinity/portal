import Link from "@docusaurus/Link";
import { CardWithDescription } from "@site/src/components/Common/Card";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import { resetNavBarStyle } from "@site/src/utils/reset-navbar-style";
import Layout from "@theme/Layout";
import React from "react";
import IconExternalLink from "../../static/img/external-link.svg";
import IconNoPassword from "../../static/img/basics/icon-ii-no-passwords.svg";
import IconPrivacy from "../../static/img/basics/icon-ii-privacy.svg";
import IconCryptography from "../../static/img/basics/icon-ii-cryptography.svg";
import Astronaut from "../../static/img/astronaut.svg";
import Head from "@docusaurus/Head";

function FeaturePage() {
  resetNavBarStyle();
  return (
    <Layout
      title="Internet Identity"
      // fill in meta description
      description=""
    >
      <Head>
        <meta
          property="og:image"
          content={
            "https://internetcomputer.org/img/shareImages/share-internet-identity.jpg"
          }
        />
        <meta
          name="twitter:image"
          content={
            "https://internetcomputer.org/img/shareImages/share-internet-identity.jpg"
          }
        />
      </Head>
      <main className="text-black relative">
        <section className="overflow-hidden bg-infinite text-white pb-20">
          <DarkHeroStyles></DarkHeroStyles>
          <div className="container-10 pt-12 mb-20 md:mb-20 md:pt-36 relative">
            <div className="md:w-7/10">
              <h1 className="tw-heading-3 md:tw-heading-2 mb-6">
                Identity on the Internet Computer
              </h1>
              <p className="tw-lead-sm md:tw-lead mb-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Blandit
                pretium magna velit nibh facilisis condimentum aliquet phasellus
                convallis ac.
              </p>
            </div>
          </div>
          <div className="container-12 flex gap-5 relative flex-col md:flex-row">
            <img
              src="/img/whiteBlurredCircle.png"
              alt=""
              className="absolute pointer-events-none max-w-none w-[800px] aspect-square -right-[280px] top-[-400px] md:w-[1500px] md:top-[-600px] md:right-[-700px] object-contain object-center"
            />
            <div className="flex-1 flex flex-col text-white p-6 border-white-20 border-solid border rounded-xl">
              <IconNoPassword className="mb-6 md:mb-12 w-16" />
              <h3 className="tw-heading-4 md:tw-heading-3">
                No passwords or usernames
              </h3>
              <p className="tw-lead-sm opacity-60 mb-3">
                Fingerprint or FaceID systems on mobile or portable HSM devices
                as YubiKey or Ledger wallet, to keep the anonymity without being
                tracked across.
              </p>
              <p className="mb-0">
                <Link
                  href="#"
                  className="tw-heading-6 text-white hover:text-white-60 hover:no-underline flex items-center gap-2"
                >
                  Learn how to use it
                  <IconExternalLink></IconExternalLink>
                </Link>
              </p>
            </div>
            <div className="flex-1 flex flex-col text-white p-6 border-white-20 border-solid border rounded-xl">
              <IconCryptography className="mb-6 md:mb-12 w-16" />
              <h3 className="tw-heading-4 md:tw-heading-3">
                Prove who you are
              </h3>
              <p className="tw-lead-sm opacity-60 mb-3">
                Giving access to open, decentralized network without
                compromising on speed, security, sovereignty.
              </p>
              <p className="mb-0">
                <Link
                  href="#"
                  className="tw-heading-6 text-white hover:text-white-60 hover:no-underline flex items-center gap-2"
                >
                  See how it works
                  <IconExternalLink></IconExternalLink>
                </Link>
              </p>
            </div>
            <div className="flex-1 flex flex-col text-white p-6 border-white-20 border-solid border rounded-xl">
              <IconPrivacy className="mb-6 md:mb-12 w-16" />
              <h3 className="tw-heading-4 md:tw-heading-3">
                Protect your privacy
              </h3>
              <p className="tw-lead-sm opacity-60 mb-3">
                Using Internet Identity authentication system, users will not
                able being tracked across dapps and services.
              </p>
              <p className="mb-0">
                <Link
                  href="#"
                  className="tw-heading-6 text-white hover:text-white-60 hover:no-underline flex items-center gap-2"
                >
                  Learn more
                  <IconExternalLink></IconExternalLink>
                </Link>
              </p>
            </div>
          </div>
        </section>
        <section className="container-12 relative mt-20 lg:mt-40 mb-20 md:mb-60">
          <div className="md:px-1/12 flex flex-col sm:flex-row sm:gap-10 md:gap-5 mb-16 md:mb-24">
            <div className="sm:w-4/10 text-center mb-10 sm:mb-0">
              <img
                src={
                  require("../../static/img/internet-identity/graphic-1.png")
                    .default
                }
                alt=""
                className="w-full sm:w-80"
              />
            </div>
            <div className="sm:w-5/10">
              <h2 className="tw-heading-4 md:tw-heading-3 mb-8">
                With Internet Computer, we want to improve experience when
                accessing internet{" "}
              </h2>
              <p className="tw-paragraph mb-0">
                We’ve all grown accustomed to managing hundreds of usernames and
                passwords, recovering forgotten accounts over text or email,
                unwittingly permitting companies to profit from our data at the
                cost of our personal privacy, and experiencing the constant
                threat of identity theft and fraud.{" "}
              </p>
            </div>
          </div>
          <div className="md:mx-1/12 bg-black text-white flex flex-col md:flex-row px-8 py-10 md:p-20 items-end rounded-xl relative">
            <img
              src="/img/whiteBlurredCircle.png"
              alt=""
              className="absolute pointer-events-none max-w-none w-[800px] aspect-square -right-[200px] bottom-[-400px] md:w-[1500px] md:bottom-[-700px] md:right-[-630px] object-contain object-center"
            />
            <div className="flex-1">
              <h2 className="tw-heading-5 md:tw-heading-3 mb-6">
                Focused on <br className="hidden md:block" />
                privacy &amp; security
              </h2>
              <p className="text-white-80 tw-paragraph mb-4">
                Using identity technology that is built on the IC, you can
                securely authenticate yourself online without ever needing an
                email, username, or password — using only your device to log in.{" "}
              </p>
              <p className="text-white-80 tw-paragraph mb-0">
                You can log in to internet services without ever being tracked
                and without your information being mined by tech companies. You
                can authenticate yourself with a greater degree of convenience
                than with practically any kind of authentication system that you
                use today.
              </p>
            </div>
            <div className="text-white-80 flex-1">
              <div className="md:pl-3/10 flex flex-col mt-12 md:mt-0">
                <IconCryptography className="mb-3 w-16 md:mb-8"></IconCryptography>
                <p className="tw-lead-sm md:tw-lead mb-0">
                  On the IC, you own your data, your connections are private,
                  and access to the web is at the tip of your fingers.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="container-12 relative mt-20 lg:mt-40 mb-20 md:mb-60">
          <div className="text-center mb-8 max-w-2xl mx-auto">
            <h2 className="tw-heading-3 mb-8">IC Identity Technologies</h2>
            <p className="tw-lead mb-0">
              Vestibulum id ligula porta felis euismod semper. Cras mattis
              consectetur purus sit amet fermentum.
            </p>
          </div>
          <div className="flex gap-5 items-start flex-col md:flex-row">
            <div className="flex-1 bg-white-50 rounded-xl border text-center border-white border-solid px-8 py-12">
              <Astronaut className="mb-3"></Astronaut>

              <h3 className="tw-title-sm mb-3">Internet Identity</h3>
              <p className="tw-paragraph-sm text-black-60">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci,
                commodo, suspendisse sit egestas et. Quam tristique ultrices
                nunc sapien. Cursus molestie porta pulvinar adipiscing lacus
                turpis vitae, dui. Massa eu pharetra malesuada mauris, bibendum
                mollis ut nunc, cursus.
              </p>
              <p className="mb-3">
                <Link
                  href="https://identity.ic0.app/"
                  className="tw-heading-6 text-infinite hover:text-black hover:no-underline"
                >
                  Check out Internet Identity
                  <IconExternalLink className="inline-block align-bottom ml-2"></IconExternalLink>
                </Link>
              </p>
            </div>
            <div className="flex-1 bg-white-50 rounded-xl border text-center border-white border-solid px-8 py-12 md:mt-30">
              <img
                src={
                  require("../../static/img/internet-identity/nfid.png").default
                }
                alt=""
                className="h-24 mb-3"
              />
              <h3 className="tw-title-sm">NFID</h3>
              <p className="tw-paragraph-sm text-black-60">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci,
                commodo, suspendisse sit egestas et. Quam tristique ultrices
                nunc sapien. Cursus molestie porta pulvinar adipiscing lacus
                turpis vitae, dui. Massa eu pharetra malesuada mauris, bibendum
                mollis ut nunc, cursus.
              </p>
              <p className="mb-3">
                <Link
                  href=""
                  className="tw-heading-6 text-infinite hover:text-black hover:no-underline"
                >
                  Check out NFID
                  <IconExternalLink className="inline-block align-bottom ml-2"></IconExternalLink>
                </Link>
              </p>
            </div>
            <div className="flex-1 bg-white-50 rounded-xl border text-center border-white border-solid px-8 py-12 md:mt-10">
              <img
                src={
                  require("../../static/img/internet-identity/astrox.png")
                    .default
                }
                alt=""
                className="h-24 mb-3"
              />
              <h3 className="tw-title-sm">Join The Conversation</h3>
              <p className="tw-paragraph-sm text-black-60">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci,
                commodo, suspendisse sit egestas et. Quam tristique ultrices
                nunc sapien. Cursus molestie porta pulvinar adipiscing lacus
                turpis vitae, dui. Massa eu pharetra malesuada mauris, bibendum
                mollis ut nunc, cursus.
              </p>
              <p className=" mb-3">
                <p className="mb-3">
                  <Link
                    href=""
                    className="tw-heading-6 text-infinite hover:text-black hover:no-underline"
                  >
                    Check out NFID
                    <IconExternalLink className="inline-block align-bottom ml-2"></IconExternalLink>
                  </Link>
                </p>
              </p>
            </div>
          </div>
        </section>
        <section className="container-12 relative mt-20 lg:mt-40 mb-20 md:mb-60">
          <img
            src="/img/internet-identity/blur-red.png"
            alt=""
            className="absolute pointer-events-none max-w-none w-[800px] aspect-square -left-[200px] bottom-[-400px] md:w-[1200px] md:top-[-350px] md:left-[-500px] object-contain object-center"
          />
          <div className="md:px-1/12 relative">
            <div className="md:w-5/10">
              <p className="tw-heading-5 md:tw-heading-4 md:mb-8">
                The Internet Computer blockchain has replaced the username and
                password model with a more advanced and much more secure method
                of cryptographic authentication that is more convenient, works
                across all of a user's devices, and helps to protect user
                privacy.{" "}
              </p>
              <p className="mb-0">
                <Link className="link-external">Learn how it works</Link>
              </p>
            </div>
          </div>
        </section>
        <section className="max-w-page relative mx-auto mb-20 px-6 md:mb-40 md:px-15">
          <p className="tw-heading-4 text-center mb-2 w-full mx-auto md:tw-heading-2 md:mb-6 lg:w-8/12">
            Build with Identity
          </p>
          <p className="tw-lead-sm mb-2 text-center mx-auto md:mb-6 md:w-6/12">
            Learn how to build a user-friendly identity products on the Internet
            Computer using our core identity component, Internet Identity.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-8 md:mt-20">
            {/* add or remove CardWithDescription components on demand */}

            <CardWithDescription
              title="Deploy a 'Hello World' Dapp in 10 Minutes"
              description="Get started with your first IC dapp"
              href="/docs/current/developer-docs/quickstart/hello10mins"
            />
            <CardWithDescription
              title="Build dapps with the language of your choice"
              description="Install SDKs to build dapps."
              href="/docs/current/developer-docs/build/cdks/"
            />
            <CardWithDescription
              title="Sample Code"
              description="Learn about IC capabilities from community samples."
              href="/samples"
            />
            <CardWithDescription
              title="Performance and Energy analysis on the IC Wiki"
              description="Take a deep dive into the Internet Computer."
              href="https://wiki.internetcomputer.org/wiki/Internet_Computer_performance_%26_power_consumption"
            />
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default FeaturePage;
