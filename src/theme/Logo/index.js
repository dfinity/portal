import Link from "@docusaurus/Link";
import { useThemeConfig, useColorMode } from "@docusaurus/theme-common";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import React from "react";

export default function Logo(props) {
  const {
    siteConfig: { title },
  } = useDocusaurusContext();
  const {
    navbar: { title: navbarTitle, logo: originalLogo },
  } = useThemeConfig();
  const { colorMode } = useColorMode();

  const { imageClassName, titleClassName, ...propsRest } = props;
  const logo = { ...originalLogo };
  const logoLink = useBaseUrl("/");

  const isDocs = document.documentElement.classList.contains("docs-doc-page");
  const isDarkHero = document.documentElement.hasAttribute("data-hero-theme");

  let logoSrc = logo.src;
  if (isDocs && colorMode === "dark") {
    logoSrc = "/img/IC_logo_horizontal_white.svg";
  } else if (isDarkHero && !isDocs) {
    logoSrc = "/img/IC_logo_horizontal_white.svg";
  }

  const alt = logo?.alt ?? (navbarTitle ? "" : title);

  return (
    <Link
      to={logoLink}
      {...propsRest}
      {...(logo?.target && { target: logo.target })}
    >
      {logo && (
        <div className={imageClassName}>
          <img src={logoSrc} alt={alt} className="!h-[32px] md:!h-[40px]" />
        </div>
      )}
      {navbarTitle != null && <b className={titleClassName}>{navbarTitle}</b>}
    </Link>
  );
}
