import React from "react";
import Head from "@docusaurus/Head";
import { useIsDocs } from "@site/src/hooks/useIsDocs";

export function AskAIWidget() {
  const { isDocsPage, currentPath, docsHome } = useIsDocs();

  return (
    isDocsPage && (
      // AI chatbot integration via Kapa
      <>
        <Head>
          <script
            defer
            src="https://widget.kapa.ai/kapa-widget.bundle.js"
            data-website-id="08910249-851f-465b-b60f-238d84e1afc1"
            data-project-name="Internet Computer"
            data-project-color="#172234"
            data-project-logo="https://s3.coinmarketcap.com/static-gravity/image/2fb1bc84c1494178beef0822179d137d.png"
            data-button-hide="true"
            data-modal-override-open-class="ask-ai-widget-trigger"
          />
        </Head>
        <button className="ask-ai-widget-trigger button-round button-fancy border-0 text-white font-semibold capitalize">
          Ask AI
        </button>
      </>
    )
  );
}
