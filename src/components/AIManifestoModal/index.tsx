import Link from "@docusaurus/Link";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AIManifestoModal: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const overlayRef = useRef<HTMLDivElement>();

  return (
    <motion.div
      className="fixed inset-0 overflow-auto z-[2000] bg-black/70 backdrop-blur-lg overflow-x-hidden"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      ref={overlayRef}
    >
      <div className="fixed inset-0"></div>
      <div
        className="relative container-10 px-6 py-12 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="float-right pointer-events-none sticky top-8 md:top-20 z-10 md:pr-8">
          <button
            className="pointer-events-auto flex w-12 h-12 rounded-full border-none bg-[#181818] justify-center items-center"
            onClick={onClose}
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="30"
                height="30"
                rx="15"
                fill="#181818"
                fillOpacity="0.6"
              />
              <path d="M9.34277 9.34375L20.6565 20.6575" stroke="white" />
              <path d="M9.34277 20.6572L20.6565 9.34352" stroke="white" />
            </svg>
          </button>
        </div>
        <div className="md:top-20 z-10 pr-0 md:pr-8 "></div>
      </div>
    </motion.div>
  );
};

export default AIManifestoModal;
