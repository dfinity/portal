import clsx from "clsx";
import React, { useEffect } from "react";

const VIEWPORT_PADDING = 32;

const Tooltip: React.FC<{
  children?: React.ReactNode;
  tooltip: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
}> = ({ children, tooltip, className, wrapperClassName }) => {
  const wrapperRef = React.useRef<HTMLSpanElement>(null);
  const tooltipRef = React.useRef<HTMLSpanElement>(null);

  useEffect(() => {
    function fixPosition() {
      const wrapperRect = wrapperRef.current?.getBoundingClientRect();
      const tooltip = tooltipRef.current;

      const tooltipRect = tooltip.getBoundingClientRect();

      let left = -tooltipRect.width / 2 + wrapperRect.width / 2;

      if (
        wrapperRect.left + left + tooltipRect.width >
        window.innerWidth - VIEWPORT_PADDING
      ) {
        left -=
          wrapperRect.left +
          left +
          tooltipRect.width -
          (window.innerWidth - VIEWPORT_PADDING);
      } else if (wrapperRect.left + left < VIEWPORT_PADDING) {
        left += VIEWPORT_PADDING - (wrapperRect.left + left);
      }

      tooltip.style.left = `${left}px`;
    }

    wrapperRef.current?.addEventListener("mouseenter", fixPosition);
    window.addEventListener("resize", fixPosition);

    return () => {
      wrapperRef.current?.removeEventListener("mouseenter", fixPosition);
      window.removeEventListener("resize", fixPosition);
    };
  }, []);

  return (
    <span
      className={clsx("relative group cursor-pointer", wrapperClassName)}
      ref={wrapperRef}
    >
      <span
        ref={tooltipRef}
        className={clsx(
          "absolute z-50 -translate-y-full -top-2 bg-black-60 py-1 px-4 rounded-lg tw-paragraph-sm  opacity-0 text-white transition-opacity pointer-events-none group-hover:opacity-100",
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
