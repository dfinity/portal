import React from "react";
const LinkArrowRight: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      width="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M16.172 11L10.808 5.63605L12.222 4.22205L20 12L12.222 19.778L10.808 18.364L16.172 13H4V11H16.172Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default LinkArrowRight;
