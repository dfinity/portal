import Link from "@docusaurus/Link";
import { useThemeConfig } from "@docusaurus/theme-common";
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

  const { imageClassName, titleClassName, ...propsRest } = props;
  const logo = { ...originalLogo };

  const logoLink = useBaseUrl("/");

  // If visible title is shown, fallback alt text should be
  // an empty string to mark the logo as decorative.
  const fallbackAlt = navbarTitle ? "" : title;
  // Use logo alt text if provided (including empty string),
  // and provide a sensible fallback otherwise.
  const alt = logo?.alt ?? fallbackAlt;
  return (
    <Link
      to={logoLink}
      {...propsRest}
      {...(logo?.target && { target: logo.target })}
    >
      {logo && (
        <div className={imageClassName}>
          <img
            src={logo.src}
            alt={alt}
            className="!h-[21px] !w-[183px] md:!h-[31px] md:!w-[268px]"
          />
        </div>
      )}
      {navbarTitle != null && <b className={titleClassName}>{navbarTitle}</b>}
    </Link>
  );
}
