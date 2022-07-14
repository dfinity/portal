import clsx from "clsx";
import React from "react";

const Tooltip: React.FC<{
  children?: React.ReactNode;
  tooltip: React.ReactNode;
  className?: string;
}> = ({ children, tooltip, className }) => {
  return (
    <span className="relative group">
      <span
        className={clsx(
          "absolute -top-9 left-1/2 -translate-x-1/2 bg-black-60 py-1 px-4 rounded-full tw-paragraph-sm whitespace-nowrap opacity-0 text-white transition-opacity pointer-events-none group-hover:opacity-100",
          className
        )}
      >
        {tooltip}
      </span>
      {children}
    </span>
  );
};

export default Tooltip;
