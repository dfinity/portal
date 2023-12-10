import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { AiIcon } from "./AiIcon";

export const ChatWidget: React.FC<{
  aiPlaceholders: string[];
  fontLoaded: boolean;
}> = ({ aiPlaceholders, fontLoaded }) => {
  const [widgetLoaded, setWidgetLoaded] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    function rotateAiPlaceholder() {
      setPlaceholderIndex((prev) => (prev + 1) % aiPlaceholders.length);
    }
    const interval = setInterval(rotateAiPlaceholder, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function pollWidget() {
      if (document.querySelector(".ask-ai-widget-trigger")) {
        setWidgetLoaded(true);
      }
    }

    if (!widgetLoaded) {
      const interval = setInterval(pollWidget, 300);
      return () => clearInterval(interval);
    }
  }, [widgetLoaded]);

  async function onAiSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (widgetLoaded) {
      // trigger modal widget
      const button = document.querySelector(
        ".ask-ai-widget-trigger"
      ) as HTMLButtonElement;
      button.click();
    }
  }

  return (
    <div>
      <form
        className={clsx(
          "bg-black/5 flex flex-col md:flex-row md:items-center p-0 md:pr-4 gap-0 md:gap-6 animate-blur-out rounded-xl"
        )}
        onSubmit={onAiSubmit}
        style={{
          animationPlayState: widgetLoaded && fontLoaded ? "running" : "paused",
        }}
      >
        <button
          className="button-fancy-ai py-3 justify-center button-with-icon border-none transition-all bg-[radial-gradient(67.52%_167.71%_at_50.38%_-41.67%,#EA2B7B_0%,#3B00B9_100%)] hover:text-white/80 stat-fade-in"
          style={{
            animationPlayState:
              widgetLoaded && fontLoaded ? "running" : "paused",
          }}
        >
          <AiIcon />
          ASK ICP.AI
        </button>
        <div className="flex-1 text-[14px] leading-[24px] font-bold md:tw-heading-7 text-white text-center md:text-left py-3 grid">
          {aiPlaceholders.map((placeholder, i) => (
            <span
              key={i}
              className={clsx(
                "row-start-1 col-start-1 transition-opacity duration-500 delay-200",
                fontLoaded && widgetLoaded && placeholderIndex === i
                  ? "opacity-100"
                  : "opacity-0"
              )}
            >
              {placeholder}
            </span>
          ))}
        </div>
      </form>
    </div>
  );
};
