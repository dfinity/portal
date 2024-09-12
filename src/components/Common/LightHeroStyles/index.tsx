import { css } from "@site/src/utils/dummy-css";
import React from "react";

export default ({ bgColor = "var(--ifm-color-primary)" }) => {
  return (
    <>
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
