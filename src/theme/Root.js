import React from "react";
import Head from "@docusaurus/Head";
import { useIsDocs } from "@site/src/hooks/useIsDocs";

export default function Root({ children }) {
  const isDocsPage = useIsDocs();

  return (
    <>
      {isDocsPage && (
        // AI chatbot integration via Kapa
        <Head>
          <meta
            http-equiv="Content-Security-Policy"
            content="default-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.matomo.cloud https://widget.kapa.ai https://www.google.com https://www.gstatic.com"
          />
          <script
            defer
            src="https://widget.kapa.ai/kapa-widget.bundle.js"
            data-website-id="08910249-851f-465b-b60f-238d84e1afc1"
            data-project-name="Internet Computer"
            data-project-color="#172234"
            data-project-logo="https://s3.coinmarketcap.com/static-gravity/image/2fb1bc84c1494178beef0822179d137d.png"
          />
        </Head>
      )}
      {children}
    </>
  );
}
