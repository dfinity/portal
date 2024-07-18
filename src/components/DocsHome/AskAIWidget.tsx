import React from "react";
import Head from "@docusaurus/Head";
import { useIsDocs } from "@site/src/hooks/useIsDocs";
import BrainIcon from "../../../static/img/icon-ai-brain.svg";

export function AskAIWidget() {
  const { isDocsPage, currentPath } = useIsDocs();

  return (
    currentPath === "/" && (
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
            data-modal-example-questions="What is the ICP token?, How is the Internet Computer governed?, How do I start building fully on-chain Web3?"
            data-modal-disclaimer="This LLM provides responses are generated automatically and may be inaccurate or outdated. Please take care to verify or validate any responses before making any critical decisions."
          />
        </Head>
        <button
          className="ask-ai-widget-trigger button-white button-fancy-ai border-none transition-all
           bg-[radial-gradient(67.52%_167.71%_at_50.38%_-41.67%,#EA2B7B_0%,#3B00B9_100%)]
            hover:text-white/80 stat-fade-in button-small md:button-small font-bold mr-9 md:mr-0 w-10 md:w-12 h-8 md:h-10"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span className={"flex-1 flex flex-col items-center"}>
            <BrainIcon className={"md:text-white scale-75 md:scale-100"} />{" "}
          </span>
          <span className={"hidden md:block font-bold"}></span>
        </button>
      </>
    )
  );
}
