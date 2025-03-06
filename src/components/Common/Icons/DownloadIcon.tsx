import React from "react";
const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M3 20.5H21V22.5H3V20.5ZM13 14.672L19.071 8.6L20.485 10.014L12 18.5L3.515 10.015L4.929 8.6L11 14.67V3.5H13V14.672Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default DownloadIcon;
