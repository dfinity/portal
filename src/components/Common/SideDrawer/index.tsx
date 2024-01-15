import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import useLockBodyScroll from "@site/src/utils/use-lock-body-scroll";
import useWindowEvent from "@site/src/utils/use-window-event";
import CloseButton from "../CloseButton/index";

const DrawerPanel: React.FC<{
  children: React.ReactNode;
  withCloseButton: boolean;
  onClose: () => void;
}> = ({ children, withCloseButton, onClose }) => {
  useLockBodyScroll();

  return (
    <motion.aside
      className="fixed inset-0 bg-white z-[1001] overflow-auto"
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "100%" }}
      transition={{ type: "tween", bounce: 0 }}
      aria-modal="true"
    >
      {withCloseButton && (
        <div className="sticky top-4 text-right">
          <CloseButton onClick={onClose} className="mr-4" />
        </div>
      )}

      {children}
    </motion.aside>
  );
};

const SideDrawer: React.FC<{
  show: boolean;
  children: React.ReactNode;
  onClose: () => void;
  withCloseButton?: boolean;
}> = ({ children, onClose, show, withCloseButton = true }) => {
  useWindowEvent("keydown", (e) => {
    if (e.key === "Escape") {
      onClose && onClose();
    }
  });

  return (
    <AnimatePresence>
      {show && (
        <DrawerPanel withCloseButton={withCloseButton} onClose={onClose}>
          {children}
        </DrawerPanel>
      )}
    </AnimatePresence>
  );
};

export default SideDrawer;
