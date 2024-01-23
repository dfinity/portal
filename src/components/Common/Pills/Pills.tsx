import clsx from "clsx";
import React from "react";

export type PillVariant = "light" | "dark";

const baseStyles: Record<PillVariant, string> = {
  light:
    "border-white/50 hover:text-infinite hover:bg-white hover:border-transparent",
  dark: "border-infinite/50 hover:text-white hover:bg-infinite hover:border-transparent",
};

const activeStyles: Record<
  PillVariant,
  Record<"active" | "inactive", string>
> = {
  light: {
    active: "text-infinite bg-white border-transparent",
    inactive: "text-white bg-transparent border-white",
  },
  dark: {
    active: "text-white bg-infinite border-transparent",
    inactive: "text-infinite bg-transparent border-infinite",
  },
};

export const Pill: React.FC<{
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  variant: "light" | "dark";
}> = ({ children, isActive, onClick, variant }) => {
  return (
    <button
      className={clsx(
        "whitespace-nowrap rounded-full inline-flex group gap-2 px-4 py-2 appearance-none border-solid border tw-title-navigation font-circular",
        baseStyles[variant],
        isActive ? activeStyles[variant].active : activeStyles[variant].inactive
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const PillSecondaryLabel: React.FC<{
  children: React.ReactNode;
  isActive: boolean;
}> = ({ children, isActive }) => {
  return (
    <span
      className={
        isActive
          ? "text-infinite/60"
          : "text-white/50 group-hover:text-infinite/60"
      }
    >
      {children}
    </span>
  );
};
