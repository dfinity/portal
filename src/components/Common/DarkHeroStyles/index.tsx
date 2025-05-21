import Head from "@docusaurus/Head";
import { css } from "@site/src/utils/dummy-css";
import React from "react";

const DarkHeroStyles = ({
  bgColor = "var(--ifm-color-primary)",
  marquee = false,
}) => {
  return (
    <>
      <Head>
        <html
          data-hero-theme="dark"
          data-has-marquee={marquee ? "true" : null}
        ></html>
      </Head>
      <style
        dangerouslySetInnerHTML={{
          __html: css`
            /* Set the navbar background color */
            nav.marketing-navbar {
              background-color: ${bgColor} !important;
              ${marquee
                ? `
              /* Adjust the position to account for the marquee banner */
              margin-top: 48px !important;
              /* Ensure z-index is appropriate */
              z-index: 2 !important;
              `
                : ""}
            }

            ${marquee
              ? `
            /* Style adjustments for pages with the marquee banner */
            html[data-has-marquee="true"] body {
              /* Add padding to account for the marquee's height */
              padding-top: 0 !important; /* Reset any existing padding */
            }
            
            /* Adjust the hero section to eliminate the white space */
            html[data-has-marquee="true"] #home {
              margin-top: 0 !important;
              padding-top: 0 !important;
            }
            
            /* Extra adjustment for any specific elements that need it */
            html[data-has-marquee="true"] .header-offset-container {
              margin-top: 48px !important;
            }
            
            /* Fix for the white space below the banner */
            html[data-has-marquee="true"] .navbar {
              margin-top: 0 !important;
            }
            
            /* Make hero section flush against the navbar */
            html[data-has-marquee="true"] .hero-section {
              margin-top: 0 !important;
              padding-top: 0 !important;
            }
            
            /* Adjust any containers with top spacing */
            html[data-has-marquee="true"] .container-main {
              padding-top: 0 !important;
            }
            `
              : ""}
          `,
        }}
      ></style>
    </>
  );
};

export default DarkHeroStyles;
