import clsx from "clsx";
import React, { FC } from "react";
import inner from "./badge-inner.webp";
import outer from "./badge-outer.webp";

export const OnChainBadge: FC<{ className?: string }> = ({ className }) => {
  return (
    <span
      className={clsx("grid grid-cols-1 w-32 h-32", className)}
      aria-label="This website is 100% on-chain"
    >
      <img src={inner} className="col-span-full row-span-full"></img>
      <img src={outer} className="col-span-full row-span-full badge-spin"></img>
    </span>
  );
};
