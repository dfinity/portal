import React from "react";
import clsx from "clsx";

const CloseButton: React.FC<{ onClick: () => void; className?: string }> = ({
  onClick,
  className,
}) => {
  return (
    <button
      className={clsx(
        "appearance-none border-none bg-transparent w-10 h-10",
        className
      )}
      onClick={onClick}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 2L18 18"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="square"
        />
        <path
          d="M18.5 2L2.5 18"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="square"
        />
      </svg>
    </button>
  );
};

export default CloseButton;
