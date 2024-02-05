import React from "react";
const PlusIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M11.4286 10.9286V4.5H13.5714V10.9286H20V13.0714H13.5714V19.5H11.4286V13.0714H5V10.9286H11.4286Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default PlusIcon;
