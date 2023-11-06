import Link from "@docusaurus/Link";
import clsx from "clsx";
import React, { ReactNode } from "react";

const PromoCard: React.FC<{
  title: ReactNode;
  href: string;
  className?: string;
}> = ({ title, href, className = "" }) => {
  return (
    <Link
      href={href}
      className={clsx(
        "relative rounded-xl tw-lead min-h-[200px] md:tw-title-sm hover:no-underline hover:text-white text-white flex p-8 backdrop-blur-2xl bg-gradient-100 from-[#3B00B9] to-[#2586B6] hover:-translate-y-3 transition-transform",
        className
      )}
    >
      <span className="w-3/4 block">{title}</span>
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-8 right-8"
      >
        <path
          d="M11.8398 30.3242L24.1631 18.001L11.8398 5.67773"
          stroke="white"
          strokeWidth="3"
        />
      </svg>
    </Link>
  );
};

export default PromoCard;
