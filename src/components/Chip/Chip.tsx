import React, { ReactNode, useMemo } from "react";

export interface ChipProps {
  className?: string;
  label?: string;
  children?: ReactNode;
  size?: "default" | "small";
  shape?: "oval" | "rounded";
}

export function Chip({
  label = "",
  children,
  className: overrides = "",
  size = "default",
  shape = "oval",
}: ChipProps) {
  const baseClassName = "bg-infinite-60 text-white font-medium";

  const sizeClassName = useMemo(() => {
    if (size === "default") {
      return "py-1 px-2 text-paragraph-sm";
    } else {
      return "py-0 px-1 text-caption h-4";
    }
  }, [size]);

  const shapeClassName = useMemo(
    () => (shape === "oval" ? "rounded-full" : "rounded"),
    [shape]
  );

  return (
    <div
      className={`${baseClassName} ${sizeClassName} ${shapeClassName} ${overrides}`.trim()}
    >
      {children ?? label}
    </div>
  );
}
