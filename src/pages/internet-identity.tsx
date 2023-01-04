import Link from "@docusaurus/Link";
import { CardWithDescription } from "@site/src/components/Common/Card";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import { resetNavBarStyle } from "@site/src/utils/reset-navbar-style";
import Layout from "@theme/Layout";
import clsx from "clsx";
import React, { useRef } from "react";
import IconCryptography from "../../static/img/basics/icon-ii-cryptography.svg";
import IconNoPassword from "../../static/img/basics/icon-ii-no-passwords.svg";
import IconPrivacy from "../../static/img/basics/icon-ii-privacy.svg";
import IconExternalLink from "../../static/img/external-link.svg";
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
    <div
      className={clsx(
        "flex-1 flex flex-col text-black  border-white border-solid border bg-white-60 rounded-xl",
        align === "center" ? "text-center py-12 px-6" : "p-6 md:px-8",
        className
      )}
    >
      <div
        className={clsx(
          "mb-4 md:mb-10 flex",
          align === "center" ? "justify-center" : ""
        )}
      >
        {icon}
      </div>
      <h3 className="tw-heading-5 md:tw-heading-3 mb-3">{title}</h3>
      {children}
    </div>
  );
};

function InternetIdentityPage() {
  resetNavBarStyle();

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
          <div className="container-10 pt-40 md:pb-36 md:pt-64 relative">
            <div className="md:w-7/10">
              <h1 className="tw-heading-3 md:tw-heading-2 mb-2 md:mb-6">
                Identity on the Internet Computer
              </h1>
              <p className="tw-lead-sm md:tw-lead mb-0">
                A Web3 authentication framework providing a Web2 login
                experience with blockchain security.
              </p>
            </div>
            <div className="relative flex justify-center mt-8 md:absolute md:right-0 md:bottom-0">
              <div className="blob left-[40%] -translate-x-1/2 -top-[270px] blob-white blob-md md:blob-xl md:-left-[700px] md:translate-x-0 md:-top-[600px]"></div>
              <img
                src="/img/internet-identity/astronaut-4.webp"
                alt=""
                className="relative w-56 md:w-[417px]"
              />
            </div>
          </div>
        </section>
        <section className="container-12 relative mt-24 md:mt-40 mb-20">
          <div className="md:w-8/12 md:mx-auto">
            <h2 className="tw-heading-4 text-gradient mb-6 md:tw-heading-60 md:mb-8">
              Internet Identity is an anonymous gateway to applications on the
              Internet Computer
            </h2>
            <p className="mb-0">
              <Link
                className="link-primary link-with-icon"
                href="https://internetcomputer.org/how-it-works#Web-access"
              >
                <span>Learn how it works</span>
                <IconExternalLink></IconExternalLink>
              </Link>
            </p>
          </div>
          <div className="flex gap-3 relative flex-col md:flex-row mt-20 md:mt-40">
            <div className="hidden md:block blob blob-infinite blob-bottom-right blob-lg z-[-1]"></div>
            <CardWithIcon
              title="Biometric login"
              icon={<IconNoPassword className="h-14 md:h-16" />}
            >
              <p className="tw-paragraph text-black-60 md:tw-lead-sm mb-0">
                Authenticate via FaceID, fingerprint sensor or a YubiKey. This
                provides the most security, as the cryptographic key never
                leaves your device.
              </p>
            </CardWithIcon>

            <CardWithIcon
              title="No tracking"
              icon={<IconCryptography className="h-14 md:h-16" />}
            >
              <p className="tw-paragraph text-black-60 md:tw-lead-sm mb-0">
                Remain anonymous using the Internet Identity authentication
                framework, which prevents user tracking across dapps and
                services.
              </p>
            </CardWithIcon>

            <CardWithIcon
              title="WebAuthn"
              icon={<IconPrivacy className="h-14 md:h-16" />}
            >
              <p className="tw-paragraph text-black-60 md:tw-lead-sm mb-0">
                Internet Identity integrates the widely used secure web2
                authentication framework known as WebAuthn for maximum
                compatibility.
              </p>
            </CardWithIcon>
          </div>

          <div className="md:mx-1/12 mt-24 md:mt-32 md:flex md:gap-1/10 md:items-center">
            <div className="relative flex-[4] max-w-sm md:max-w-none">
              <div className="blob blob-purple blob-md blob-center-left z-[-1] opacity-70"></div>
              <img src="/img/internet-identity/astronaut-2.webp" alt="" />
            </div>
            <div className="mt-12 md:mt-0 flex-[5]">
              <h2 className="tw-heading-4 mb-6 md:tw-heading-3">
                Web3 security, Web2 convenience
              </h2>
              <p className="mb-3 tw-paragraph">
                We've all grown accustomed to managing hundreds of usernames and
                passwords, recovering forgotten accounts over text or email,
                unwittingly permitting companies to profit from our data at the
                cost of our personal privacy, all the while falling victim
                threats of identity theft and fraud.
              </p>
              <p className="mb-0 tw-paragraph">
                On the Internet Computer blockchain, users can securely
                authenticate themselves without ever needing an email, username,
                or password. Using any WebAuthn enabled device, users can login
                conveniently without their information being monetized by tech
                companies. Internet Identity makes it cryptographically
                impossible for Web3 services to track your activity across
                dapps.
              </p>
              <Link
                className="link-primary link-with-icon mt-6"
                href="https://identity.ic0.app/"
              >
                <span>Learn how to create one</span>
                <IconExternalLink></IconExternalLink>
              </Link>
            </div>
          </div>
        </section>
        <section className="bg-infinite">
          <div className="container-10 pt-6 pb-20 md:pb-6 relative text-white flex flex-col items-start md:flex-row md:items-center md:gap-1/12">
            <div className="blob blob-white blob-md blob-center-right md:blob-bottom-right md:right-[200px] md:bottom-[-100px]"></div>
            <img
              src="/img/internet-identity/astronaut-3.webp"
              alt=""
              className="self-center md:order-2 md:flex-[4]"
            />
            <div className="md:order-1 md:flex-[5]">
              <h2 className="tw-heading-4 md:tw-heading-3 mb-6 mt-6 md:mt-0">
                Focused on <br />
                privacy & security
              </h2>
              <p className="tw-lead-sm md:tw-lead text-white-60 mb-0">
                By integrating Internet Identity in dapps, websites cannot
                collect and share user information or online activity. Users own
                their data, connections are private, and access to Web3 services
                at their fingertips.
              </p>
            </div>
          </div>
        </section>

        <section className="container-12 relative mb-20 md:mb-40 mt-20 md:mt-40">
          <div className="mb-12 md:max-w-[680px] md:text-center md:mx-auto md:mb-8">
            <h2 className="tw-heading-4 md:tw-heading-60 mb-6">
              Identity technologies on the Internet Computer
            </h2>
            <p className="tw-lead-sm mb-0">
              Expand a dapp with Internet Identity or build your own
              authentication solution
            </p>
          </div>
          <div className="flex gap-5 items-start flex-col md:flex-row">
            <CardWithIcon
              title="Internet Identity"
              icon={
                <img
                  src="/img/internet-identity/astronaut-1.webp"
                  className="h-16"
                ></img>
              }
              align="center"
            >
              <p className="tw-paragraph text-black-60 md:tw-lead-sm mb-3">
                Internet Identity is an out of the box authentication framework
                for any web3 developer to integrate with, or build their own
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
          </div>
        </section>

        <section className="max-w-page relative mx-auto mb-20 px-6 md:mb-40 md:px-15">
          <div className=" relative text-white">
            <div className="blob blob-purple blob-md blob-center z-[-1] md:blob-xl"></div>
            <h2 className="tw-heading-5 text-center mb-2 w-full mx-auto md:tw-heading-60 md:mb-6 lg:w-8/12">
              Build with Identity
            </h2>
            <p className="tw-lead-sm mb-0 text-center mx-auto md:w-6/12">
              Learn how to build a user-friendly identity products on the
              Internet Computer using our core identity component, Internet
              Identity.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-8 md:mt-16">
            <CardWithDescription
              title="Dev Toolkits"
              description="See the docs, get building."
              href="/docs/current/developer-docs/integrations/internet-identity/integrate-identity"
            />
            <CardWithDescription
              title="GitHub Repo"
              description="Check out the source code of Internet Identity."
              href="https://github.com/dfinity/internet-identity"
            />
            <CardWithDescription
              title="Tech Dive"
              description="Resources to learn all about II, the blockchain authentication framework supported by the Internet Computer."
              href="/how-it-works/web-authentication-identity/"
            />
            <CardWithDescription
              title="Blog"
              description="Internet Identity: Easy Web3 Authentication."
              href="https://medium.com/dfinity/internet-identity-the-end-of-usernames-and-passwords-ff45e4861bf7"
            />
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default InternetIdentityPage;
