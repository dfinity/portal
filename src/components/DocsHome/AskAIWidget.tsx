import React from "react";
import Head from "@docusaurus/Head";
import { useIsDocs } from "@site/src/hooks/useIsDocs";
import BrainIcon from "../../../static/img/icon-ai-brain.svg";
import { useLocation } from "@docusaurus/router";

export function AskAIWidget() {
  const { isDocsPage, currentPath, docsHome } = useIsDocs();
  const location = useLocation();

  return (
    (isDocsPage || location.pathname == "/") && (
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
        <button
          className="ask-ai-widget-trigger invisible pointer-events-none docs:visible docs:pointer-events-auto button-white sm:button-with-icon sm:button-small font-bold fixed sm:relative bottom-0 my-20 sm:my-0 flex rounded-full sm:rounded-lg h-12 w-12 sm:h-[unset] sm:w-[unset] items-center p-0 sm:px-3 sm:py-2"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span className={"flex-1"}>
            <BrainIcon />
          </span>
          <span className={"hidden sm:block font-bold"}>Ask ICP.AI</span>
        </button>
      </>
    )
  );
}
