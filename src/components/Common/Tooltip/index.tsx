import clsx from "clsx";
import React, { useEffect } from "react";

const Tooltip: React.FC<{
  children?: React.ReactNode;
  tooltip: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
}> = ({ children, tooltip, className, wrapperClassName }) => {
  const wrapperRef = React.useRef<HTMLSpanElement>(null);
  const tooltipRef = React.useRef<HTMLSpanElement>(null);

  return (
    <span
      className={clsx(
        "relative group cursor-pointer", wrapperClassName
      )}
      ref={wrapperRef}
    >
      <span
        role="tooltip"
        ref={tooltipRef}
        className={clsx(
          "absolute z-50 -top-2 bg-black-60 py-1 px-4 rounded-lg tw-paragraph-sm opacity-0 text-white transition-opacity pointer-events-none group-hover:opacity-100 left-1/2 transform -translate-x-1/2 -translate-y-full text-nowrap",
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
