import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { AiIcon } from "./AiIcon";

export const ChatWidget: React.FC<{
  aiPlaceholders: string[];
  fontLoaded: boolean;
}> = ({ aiPlaceholders, fontLoaded }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [widgetLoaded, setWidgetLoaded] = useState(false);

  useEffect(() => {
    let index = 0;
    function rotateAiPlaceholder() {
      index = (index + 1) % aiPlaceholders.length;
      inputRef.current.placeholder = aiPlaceholders[index];
    }
    const interval = setInterval(rotateAiPlaceholder, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function pollWidget() {
      if (document.querySelector("#kapa-widget-container button")) {
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
        "#kapa-widget-container button"
      ) as HTMLButtonElement;
      button.click();

      while (!document.querySelector(".mantine-Modal-inner")) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      // copy input value to widget
      const inputText = inputRef.current.value;
      const targetInput = document.querySelector(
        ".mantine-Modal-inner textarea"
      ) as HTMLTextAreaElement;

      // make sure react component updates properly
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLTextAreaElement.prototype,
        "value"
      ).set;
      nativeInputValueSetter.call(targetInput, inputText);
      targetInput.dispatchEvent(new Event("input", { bubbles: true }));

      // wait for the component to update
      // await new Promise((resolve) => setTimeout(resolve, 0));

      // submit
      targetInput.parentElement.querySelector("button").click();

      // reset input
      inputRef.current.value = "";
    }
  }

  return (
    <div
      className={clsx(
        "animate-fade-up",
        widgetLoaded && fontLoaded ? "" : "pointer-events-none"
      )}
      style={{
        animationPlayState: widgetLoaded && fontLoaded ? "running" : "paused",
      }}
    >
      <style>{`
        #kapa-widget-container {
          visibility: hidden;
          pointer-events: none;
        }
      `}</style>

      <form
        className="bg-black/60 flex items-center py-3 pl-8 pr-4 gap-6 backdrop-blur-[20px] rounded-xl"
        onSubmit={onAiSubmit}
      >
        <input
          ref={inputRef}
          type="text"
          className="flex-1 font-circular tw-heading-7 text-white placeholder:text-white/30 appearance-none border-none bg-transparent w-full active:outline-none focus:outline-none py-3"
          placeholder={aiPlaceholders[0]}
          required
        />
        <button className="button-fancy-ai button-with-icon border-none transition-all bg-[radial-gradient(67.52%_167.71%_at_50.38%_-41.67%,#EA2B7B_0%,#3B00B9_100%)] hover:text-white/80">
          <AiIcon />
          ASK ICP.AI
        </button>
      </form>
    </div>
  );
};
