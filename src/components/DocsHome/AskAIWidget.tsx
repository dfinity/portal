import React from "react";
import Head from "@docusaurus/Head";
import { useIsDocs } from "@site/src/hooks/useIsDocs";
import BrainIcon from "../../../static/img/icon-ai-brain.svg";
import { ProxyStubAgent } from "@dfinity/agent";

const css = `
.ai-spark {
  position: absolute;
  background: white;
  width: 10%;
  aspect-ratio: 1;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  animation: sprkle calc(var(--rnd) * 3s) infinite linear;
  animation-delay: calc(var(--i) * -3s);
  transition: background .3s;
}

.button-fancy-ai:hover .ai-spark {
  background: pink;
}

@keyframes sprkle {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(calc(var(--a) * 360deg)) translateY(calc(var(--r) * 0rem)) scale(calc(var(--rnd) * 0));
  }
  30% {
    opacity: 1;
    transform: translate(-50%, -50%) rotate(calc(var(--a) * 360deg)) translateY(calc(var(--r) * 1rem)) scale(calc(var(--rnd) * .3));
  }
  70% {
    opacity: 1;
    transform: translate(-50%, -50%) rotate(calc(var(--a) * 360deg)) translateY(calc(var(--r) * 2rem)) scale(calc(var(--rnd) * .7));
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(calc(var(--a) * 360deg)) translateY(calc(var(--r) * 3rem)) scale(calc(var(--rnd) * 1));
  }
}
`

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
          <style>{css}</style>
        </Head>
        <button
          className="relative ask-ai-widget-trigger button-white button-fancy-ai border-none transition-all
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
          {
            // add 30 <i></i> elements to create a pulsating effect
            Array.from({ length: 30 }).map((_, i) => (
              <i
                key={i}
                className="ai-spark"
                style={{
                  '--i': i/30,
                  '--rnd': Math.random(),
                  '--r': .5 + Math.random() * .5,
                  '--a': Math.random(),
                } as React.CSSProperties}
              />
            ))
          }
        </button>
      </>
    )
  );
}
