import React from "react";
import Head from "@docusaurus/Head";
import { useIsDocs } from "@site/src/hooks/useIsDocs";
import BrainIcon from "../../../static/img/icon-ai-brain.svg";

export function AskAIWidget() {
  const { isDocsPage, currentPath } = useIsDocs();

  return (
    (isDocsPage || currentPath === "/") && (
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
            data-modal-ask-ai-input-placeholder="Ask me a question about the Internet Computer Protocol"
            data-modal-disclaimer="This LLM provides responses are generated automatically and may be inaccurate or outdated. Please take care to verify or validate any responses before making any critical decisions."
          />
        </Head>
        <button
          className="ask-ai-widget-trigger invisible pointer-events-none docs:visible docs:pointer-events-auto button-white md:button-fancy-ai md:button-with-icon border-none transition-all md:bg-[radial-gradient(67.52%_167.71%_at_50.38%_-41.67%,#EA2B7B_0%,#3B00B9_100%)] hover:text-white/80 stat-fade-in md:button-small font-bold fixed md:relative bottom-0 my-20 md:my-0 flex rounded-full md:rounded-xl h-12 w-12 md:h-[unset] md:w-[unset] items-center p-0 md:px-3 md:py-2"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span className={"flex-1 flex flex-col items-center"}>
            <BrainIcon className={"md:text-white"} />
          </span>
          <span className={"hidden md:block font-bold"}>Ask ICP.AI</span>
        </button>
      </>
    )
  );
}
