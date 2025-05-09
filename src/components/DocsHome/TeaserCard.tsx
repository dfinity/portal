import React, { CSSProperties, ReactNode } from "react";
import Link from "@docusaurus/Link";

export interface CarouselCard {
  title: ReactNode;
  subtitle?: ReactNode;
  cta?: ReactNode;
  image?: ReactNode;
  backgroundImage?: string;
  mainImage?: string;
}

const ArrowLeft = () => {
  return (
    <svg
      width="16"
      height="13"
      viewBox="0 0 16 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.75499 0.185272C5.75499 0.185272 1.75388 4.18994 0.195566 5.74914C0.0648925 5.87892 0 6.0496 0 6.22027C0 6.39095 0.0648925 6.56163 0.195566 6.69141C1.75299 8.25061 5.75321 12.2535 5.75321 12.2535C5.8821 12.3824 6.05189 12.4464 6.22168 12.4464C6.39147 12.4455 6.56214 12.3806 6.69282 12.2499C6.95328 11.9895 6.95416 11.569 6.69637 11.3103L2.27302 6.88698H15.3333C15.7013 6.88698 16 6.58829 16 6.22027C16 5.85225 15.7013 5.55357 15.3333 5.55357H2.27302L6.69815 1.12755C6.95505 0.870643 6.95328 0.451064 6.69282 0.190605C6.56214 0.0599314 6.39147 -0.00585024 6.22168 -0.00585024C6.05189 -0.00673918 5.88388 0.0572645 5.75499 0.185272Z"
        fill="white"
      />
    </svg>
  );
};

const ArrowRight = () => {
  return (
    <svg
      width="16"
      height="13"
      viewBox="0 0 16 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.2447 12.2636C10.2447 12.2636 14.246 8.2587 15.8053 6.69852C15.9351 6.56873 16 6.39804 16 6.22736C16 6.05667 15.9351 5.88688 15.8053 5.7562C14.2469 4.19691 10.2447 0.19291 10.2447 0.19291C10.1167 0.0640071 9.94777 0 9.77886 0C9.60729 0 9.43661 0.0657848 9.30592 0.196466C9.04545 0.45605 9.04367 0.877431 9.30237 1.13524L13.7277 5.56062H0.666741C0.2987 5.56062 0 5.85932 0 6.22736C0 6.5954 0.2987 6.8941 0.666741 6.8941H13.7277L9.30148 11.3204C9.04456 11.5773 9.04723 11.9978 9.30681 12.2574C9.43838 12.3889 9.60996 12.4547 9.78064 12.4547C9.94955 12.4547 10.1167 12.3907 10.2447 12.2636Z"
        fill="white"
      />
    </svg>
  );
};

export function TeaserCard({
  card,
  onClickLeftArrow,
  onClickRightArrow,
  paginationEnabled,
  paginationLabel,
  style,
  className,
}: {
  card: CarouselCard;
  onClickRightArrow?: () => void;
  onClickLeftArrow?: () => void;
  paginationEnabled?: boolean;
  paginationLabel?: ReactNode;
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <div className={className} style={style}>
      <div className={"flex flex-col"}>
        {card.title}
        {card.subtitle}
        {card.cta}
        {card.mainImage && (
          <div className={"justify-center hidden sm:flex"}>
            <img
              className={"mt-auto"}
              src={card.mainImage}
              alt={typeof card.title === "string" ? card.title : "Card image"}
            />
          </div>
        )}
      </div>

      {paginationEnabled && (
        <div className={"flex flex-row gap-1 items-center"}>
          <Link
            className="button-transparent button-with-icon cursor-pointer"
            onClick={onClickLeftArrow}
          >
            <ArrowLeft />
          </Link>
          <span className={"text-white"}>{paginationLabel}</span>
          <Link
            className="button-transparent button-with-icon cursor-pointer"
            onClick={onClickRightArrow}
          >
            <ArrowRight />
          </Link>
        </div>
      )}
    </div>
  );
}
