import Link from "@docusaurus/Link";
import clsx from "clsx";
import React, { useEffect } from "react";
import LinkArrowRight from "../../Common/Icons/LinkArrowRight";
import LinkArrowUpRight from "../../Common/Icons/LinkArrowUpRight";

const Arrow = ({ className }) => {
  return (
    <svg
      width="36"
      height="37"
      viewBox="0 0 36 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M5.67578 12.5884L17.999 24.9116L30.3223 12.5884"
        stroke="white"
        strokeOpacity="0.6"
        strokeWidth="3"
      />
    </svg>
  );
};

export const HighlightCard: React.FC<{
  title: string;
  imageUrl: string;
  children?: React.ReactNode;
  open?: boolean;
}> = ({ title, children, imageUrl, open = false }) => {
  return (
    <Drawer title={title} startingState={open}>
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 pt-10 md:pt-20 order-2 md:order-1">
          {children}
        </div>
        <div className="flex-1 order-1 md:order-2 mt-10 md:mt-0 aspect-[821/676]">
          <img src={imageUrl} alt="" loading="lazy"></img>
        </div>
      </div>
    </Drawer>
  );
};

const Drawer: React.FC<{
  title: string;
  children?: React.ReactNode;
  startingState?: boolean;
}> = ({ title, children, startingState = false }) => {
  const [open, setOpen] = React.useState(startingState);
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    updateHeight();

    function updateHeight() {
      if (open) {
        ref.current.style.maxHeight = ref.current.scrollHeight + "px";
      } else {
        ref.current.style.maxHeight = "0px";
      }
    }
    window.addEventListener("resize", updateHeight);
    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, [open]);

  return (
    <div className="bg-white/5 rounded-xl md:rounded-[32px] px-6 md:px-1/12 py-6 md:py-12 ">
      <button
        className="w-full flex justify-between items-center bg-transparent appearance-none border-none p-0 font-circular text-white"
        onClick={() => setOpen((o) => !o)}
      >
        <h3 className="tw-heading-6 md:tw-heading-3 mb-0">{title}</h3>

        <Arrow
          className={clsx(
            "transition-transform w-6 md:w-9",
            open ? "-rotate-180" : ""
          )}
        />
      </button>
      <div
        ref={ref}
        className={clsx(
          "transition-all overflow-hidden",
          open ? "max-h-none" : "max-h-0"
        )}
      >
        {children}
      </div>
    </div>
  );
};

const Highlights: React.FC<{
  title: React.ReactNode;
  children?: React.ReactNode;
}> = ({ title, children }) => {
  return (
    <section id="technology">
      <div className="container-10 text-white mb-16 md:pt-20">
        <h2 className="tw-heading-4 md:tw-heading-60">{title}</h2>
      </div>
      <div className="container-12 space-y-4 md:space-y-8">{children}</div>
    </section>
  );
};

export default Highlights;
