import clsx from "clsx";
import React, { FC } from "react";

export const TitlePanel: FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div
      className={clsx(
        "px-8 py-10 md:p-10 rounded-lg bg-infinite text-white",
        className
      )}
    >
      {children}
    </div>
  );
};

export const Panel: FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div
      className={clsx(
        "px-6 py-8 sm:p-10 border border-white border-solid rounded-lg bg-white/70",
        className
      )}
    >
      {children}
    </div>
  );
};
