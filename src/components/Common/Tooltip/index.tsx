import clsx from "clsx";
import React, { useEffect } from "react";

const Tooltip: React.FC<{
  children?: React.ReactNode;
  tooltip: React.ReactNode;
  className?: string;
}> = ({ children, tooltip, className }) => {
  const wrapperRef = React.useRef<HTMLSpanElement>(null);
  const tooltipRef = React.useRef<HTMLSpanElement>(null);

  useEffect(() => {
    function fixPosition() {
      const rect = wrapperRef.current?.getBoundingClientRect();
      const tooltip = tooltipRef.current;

      const tooltipRect = tooltip.getBoundingClientRect();

      let left = -tooltipRect.width / 2 + 8;

      if (rect.left + left + tooltipRect.width > window.innerWidth - 32) {
        left -= rect.left + left + tooltipRect.width - (window.innerWidth - 32);
      } else if (rect.left + left < 32) {
        left += 32 - (rect.left + left);
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
    <span className="relative group cursor-pointer" ref={wrapperRef}>
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
