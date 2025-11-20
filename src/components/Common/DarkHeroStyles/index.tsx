import Head from "@docusaurus/Head";
import { css } from "@site/src/utils/dummy-css";

const DarkHeroStyles = ({ bgColor = "var(--ifm-color-primary)" }) => {
  return (
    <>
      <Head>
        <html data-hero-theme="dark"></html>
      </Head>
      <style
        dangerouslySetInnerHTML={{
          __html: css`
            /* Set the navbar background color */
            nav.marketing-navbar {
              background-color: ${bgColor} !important;
            }
          `,
        }}
      ></style>
    </>
  );
};

export default DarkHeroStyles;
