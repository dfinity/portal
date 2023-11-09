import Head from "@docusaurus/Head";
import { css } from "@site/src/utils/dummy-css";
import React from "react";

export default ({ bgColor = "var(--ifm-color-primary)" }) => {
  return (
    <>
      <Head>
        <html data-hero-theme="dark"></html>
      </Head>
      <style
        dangerouslySetInnerHTML={{
          __html: css`
            nav.marketing-navbar {
              background-color: ${bgColor} !important;
            }
          `,
        }}
      ></style>
    </>
  );
};
