import clsx from "clsx";
import React, { FC } from "react";
import Inner from "./inner.svg";
import Outer from "./outer.svg";

export const OnChainBadge: FC<{ className?: string }> = ({ className }) => {
  return (
    <span
      className={clsx("grid grid-cols-1", className)}
      aria-label="This website is 100% on-chain"
    >
      <Inner className="col-span-full row-span-full"></Inner>
      <Outer className="col-span-full row-span-full badge-spin"></Outer>
    </span>
  );
};
