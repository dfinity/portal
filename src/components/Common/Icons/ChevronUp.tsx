import React from "react";
const ChevronUp: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2 11.5L8.5 5L15 11.5" stroke="black" />
    </svg>
  );
};

export default ChevronUp;
