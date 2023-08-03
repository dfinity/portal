import { css } from "@site/src/utils/dummy-css";
import React from "react";

export default ({ bgColor = "var(--ifm-color-primary)" }) => {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: css`
          nav.navbar .navbar__search-button {
            background-color: transparent;
            color: white;
          }
          nav.navbar .navbar__search-button > span:nth-of-type(1) {
            color: white;
          }
          nav.navbar .navbar__search-button > span:nth-of-type(2) {
            color: #ffffffb0;
          }

          @media (min-width: 996px) {
            nav.navbar .navbar__item.ic0-item img {
              filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(303deg)
                brightness(102%) contrast(101%);
            }
            nav.navbar .navbar__item.ic0-item:hover img {
              filter: invert(39%) sepia(90%) saturate(3865%) hue-rotate(316deg)
                brightness(90%) contrast(88%);
            }

            nav.navbar {
              background-color: ${bgColor};
              --ifm-navbar-link-color: white;
              box-shadow: none;
            }

            nav.navbar.navbar--fixed-top .navbar__logo img {
              content: url(/img/IC_logo_horizontal_white.svg);
            }

            nav.navbar
              .navbar__inner
              .navbar__item.dropdown
              .navbar__link:after {
              background-image: url('data:image/svg+xml,%3Csvg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M8.5 10.6669L13.1669 6.00001L14.5 7.33313L8.5 13.3331L2.5 7.33313L3.83312 6.00001L8.5 10.6669Z" fill="white" fill-opacity="0.5"/%3E%3C/svg%3E%0A');
            }

            nav.navbar .navbar__search-button {
              border: 2px solid #ffffff80;
            }
            nav.navbar .navbar__search-button:hover {
              background-color: white;
              color: var(--ifm-color-primary);
            }

            nav.navbar .navbar__search-button:hover span {
              color: var(--ifm-color-primary);
            }

            nav.navbar .navbar__toggle {
              color: white;
            }
          }

          @media (max-width: 996px) {
            nav.navbar {
              background-color: ${bgColor};
              --ifm-navbar-link-color: white;
              box-shadow: none;
            }
            nav.navbar .navbar__logo img {
              content: url(/img/IC_logo_horizontal_white.svg);
            }
            nav.navbar .navbar-sidebar__brand .navbar__logo img {
              content: url(/img/IC_logo_horizontal.svg);
            }
            nav .navbar__toggle {
              color: white;
            }
          }
        `,
      }}
    ></style>
  );
};
