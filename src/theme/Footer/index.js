/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import { useThemeConfig } from "@docusaurus/theme-common";
import useBaseUrl from "@docusaurus/useBaseUrl";
import isInternalUrl from "@docusaurus/isInternalUrl";
import styles from "./styles.module.css";
import IconExternalLink from "@theme/IconExternalLink";
import { EditIcon } from "./EditIcon";

function FooterLink({ to, href, label, prependBaseUrlToHref, ...props }) {
  const toUrl = useBaseUrl(to);
  const normalizedHref = useBaseUrl(href, {
    forcePrependBaseUrl: true,
  });
  return (
    <Link
      className="footer__link-item"
      style={{
        color: "white",
        fontWeight: "bold",
      }}
      {...(href
        ? {
            href: prependBaseUrlToHref ? normalizedHref : href,
          }
        : {
            to: toUrl,
          })}
      {...props}
    >
      {href && !isInternalUrl(href) ? (
        <span>
          {label}
          <IconExternalLink />
        </span>
      ) : (
        label
      )}
    </Link>
  );
}

function Footer({ editPath }) {
  const { footer } = useThemeConfig();
  const { copyright, links = [] } = footer || {};

  if (!footer) {
    return null;
  }

  const mediaLinks = links
    .filter((link) => link.title === "SocialMedia")
    .map((link) => link.items)[0];
  const nonMediaLinks = links.filter((link) => link.title !== "SocialMedia");
  return (
    <div className={styles.container}>
      <footer
        className={clsx("footer", {
          "footer--dark": footer.style === "dark",
        })}
      >
        <div className={styles.editButtonContainer}>
          {editPath && (
            <Link
              className="absolute -top-8 right-0 text-white hover:text-white-80 hover:no-underline tw-title-navigation-on-page rounded-full py-1 px-4 bg-[#260F59] -translate-y-1/2 inline-flex items-center gap-1"
              href={editPath}
            >
              <EditIcon></EditIcon>
              Edit this page
            </Link>
          )}
        </div>
        <div className={styles.footerLinksContainer}>
          {nonMediaLinks.map((linkItem, i) => (
            <div key={i} className={styles.footerLinkCol}>
              {linkItem.items.map((item) => (
                <p key={item.href || item.to} className={styles.footerLink}>
                  <FooterLink {...item} />
                </p>
              ))}
            </div>
          ))}
        </div>
        <div className={styles.footerBottom}>
          <div className={styles.legalContainer}>
            <div className={styles.legalLinkContainer}>
              <div className={styles.legalLink}>
                <Link
                  style={{ color: "white", fontWeight: "bold" }}
                  to={"https://dfinity.org/privacy-policy"}
                >
                  Privacy Policy
                </Link>
              </div>
              <div className={styles.legalLink}>
                <Link
                  style={{ color: "white", fontWeight: "bold" }}
                  to={"https://dfinity.org/terms-of-use"}
                >
                  Terms of Use
                </Link>
              </div>
            </div>
            {copyright ? (
              <div
                className={styles.legalCopyright}
                style={{ color: "white" }}
                // Developer provided the HTML, so assume it's safe.
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: copyright,
                }}
              />
            ) : null}
          </div>
          <div className={styles.mediaLinksContainer}>
            {mediaLinks.map((item) => (
              <div key={item.href || item.to} className={styles.mediaLinks}>
                <Link to={item.to}>
                  <img src={item.icon} alt="" />
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.footerPadding} />
      </footer>
    </div>
  );
}

export default React.memo(Footer);
