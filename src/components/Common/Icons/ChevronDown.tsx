import React from "react";
const ChevronDown: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2 5L8.5 11.5L15 5" stroke="black" />
    </svg>
  );
};

export default ChevronDown;
