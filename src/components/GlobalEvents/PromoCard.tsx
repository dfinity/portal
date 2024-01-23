import Link from "@docusaurus/Link";
import React from "react";

const PromoCard: React.FC<{
  label: string;
  description?: string;

  href: string;
  ctaLabel: string;
}> = ({ label, description, href, ctaLabel }) => {
  return (
    <div className="rounded-xl  text-white flex px-6 py-8 md:px-8 md:py-12  backdrop-blur-2xl bg-gradient-100 from-[#3B00B9] to-[#2586B6]">
      <div className="flex flex-col gap-2">
        <h3 className="tw-title-sm mb-0">{label}</h3>
        {description && (
          <p className="tw-paragraph text-white/60">{description}</p>
        )}
        <div className="flex-1"></div>
        <p className="mt-12 mb-0">
          <Link className="button-white text-center" href={href}>
            {ctaLabel}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PromoCard;
