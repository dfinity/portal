import React, { ReactNode, useMemo } from "react";

export interface ChipProps {
  className?: string;
  label?: string;
  children?: ReactNode;
  size?: "default" | "small";
  shape?: "oval" | "rounded";
  // a tailwind class name to use for the chip's background color
  color?: string;
}

export function Chip({
  label = "",
  children,
  className: overrides = "",
  size = "default",
  shape = "oval",
  color = "bg-infinite-60",
}: ChipProps) {
  const baseClassName = "chip text-white font-medium";

  const colorClassName = useMemo(() => color, [color]);

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
      className={`${baseClassName} ${sizeClassName} ${shapeClassName} ${colorClassName} ${overrides}`.trim()}
    >
      {children ?? label}
    </div>
  );
}
