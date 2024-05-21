import React from "react";
const LinkArrowUp: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M8.1665 7.00658L12.8334 11.6735L14.1665 10.3403L8.1665 4.34033L2.1665 10.3403L3.49963 11.6735L8.1665 7.00658Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default LinkArrowUp;
