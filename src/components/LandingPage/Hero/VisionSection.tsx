import { useCollapsible } from "@site/src/utils/use-collapsible";
import React from "react";
import AnimateSpawn from "../../Common/AnimateSpawn";
import transitions from "@site/static/transitions.json";
import { trackEvent } from "@site/src/utils/matomo";

export const CollapsedVisionSection: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const collapsible = useCollapsible();

  // Handler for button click
  const handleButtonClick = () => {
    
    try {
      trackEvent('Pitch', 'Expand', 'ICP Pitch');
    } catch {};

    // Change the open state of the collapsible
    collapsible.setOpen(true);
  };

  return (
    <div className="mt-8 relative">
      <button
        className={`
            absolute top-0 left-0
            flex items-center gap-2 
            font-circular 
            px-4 py-2 
            text-white tw-heading-7 md:tw-heading-6 
            border-none rounded-full 
            backdrop-blur-lg bg-transparent bg-[linear-gradient(251deg,rgba(106,133,241,0.20)_-7.42%,rgba(197,114,239,0.20)_92.38%)]
            transition-all
            hover:text-white/60
            ${
              collapsible.open
                ? "opacity-0 pointer-events-none duration-700"
                : "opacity-100"
            }
          `}
        onClick={handleButtonClick}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.9286 10.9286V4.5H13.0714V10.9286H19.5V13.0714H13.0714V19.5H10.9286V13.0714H4.5V10.9286H10.9286Z"
            fill="currentColor"
          />
        </svg>
        Read more about the ICP Pitch
      </button>
      <div
        ref={collapsible.ref}
        className={`${collapsible.className} delay-500 duration-1000`}
      >
        {children}
      </div>
    </div>
  );
};

export const VisionSection: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  return (
    <AnimateSpawn
      className="container-10 tw-lead md:tw-title-sm text-white py-24 md:pt-30 md:pb-40"
      variants={transitions.container}
      id="about-icp"
    >
      <div className="md:w-7/10">{children}</div>
    </AnimateSpawn>
  );
};
