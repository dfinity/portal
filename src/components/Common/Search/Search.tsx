import React, { FC, useEffect } from "react";
import { motion } from "framer-motion";
const Search: FC<{ onClose: () => void }> = ({ onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed inset-0 overflow-auto bg-white-80 z-[3000]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div className="container-10 bg-white rounded-xl p-10 min-h-[calc(100%-80px)] mt-10">
          <div className="relative">
            <img
              src="/img/showcase/search.svg"
              alt=""
              className="absolute w-4 left-3 top-1/2 -translate-y-1/2"
            />
            <input
              className="input-text pl-10"
              placeholder="Search the website..."
            ></input>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Search;
