import { useEffect } from "react";

const useLockBodyScroll = () => {
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
  }, []);
};

export default useLockBodyScroll;
