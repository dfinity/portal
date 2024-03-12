import React, { ReactNode } from "react";

export interface ChipProps {
  className?: string;
  label?: string;
  children?: ReactNode;
}

export function Chip({ label = "", children, className = "" }: ChipProps) {
  return (
    <div
      className={`bg-infinite-60 text-white py-1 px-2 font-medium text-paragraph-sm rounded-full ${className}`.trim()}
    >
      {children ?? label}
    </div>
  );
}
