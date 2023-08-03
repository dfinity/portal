import clsx from "clsx";
import React, { FC } from "react";
import inner from "./badge-inner.webp";
import outer from "./badge-outer.webp";

export const OnChainBadge: FC<{ className?: string; sizeClasses?: string }> = ({
  className,
  sizeClasses = "w-32 h-32",
}) => {
  return (
    <span
      className={clsx("grid grid-cols-1", sizeClasses, className)}
      aria-label="This website is 100% on-chain"
    >
      <img
        src={inner}
        className="col-span-full row-span-full"
        alt="This website is hosted 100% on-chain"
      ></img>
      <img
        src={outer}
        className="col-span-full row-span-full badge-spin"
        alt=""
      ></img>
    </span>
  );
};
