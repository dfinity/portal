import { useEffect } from "react";

const useLockBodyScroll = (modalRef: React.RefObject<HTMLDivElement>) => {
  useEffect(() => {
    // Get original body overflow
    const originalStyle = window.getComputedStyle(document.body).overflow;
    const originalTouchAction = window.getComputedStyle(
      document.body
    ).touchAction;

    // Prevent scrolling on mount
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    // Re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = originalStyle;
      document.body.style.touchAction = originalTouchAction;
    };
  }, [modalRef]); // Empty array ensures effect is only run on mount and unmount
};

export default useLockBodyScroll;
