import { useEffect, useRef, useState } from "react";

export function useCollapsible(
  {
    startingState = false,
    alwaysOpen = false,
  }: {
    startingState?: boolean;
    alwaysOpen?: boolean;
  } = {
    startingState: false,
    alwaysOpen: false,
  }
) {
  const [open, setOpen] = useState(startingState || alwaysOpen);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    updateHeight();

    function updateHeight() {
      if (!ref.current) return;

      if (open) {
        ref.current.style.maxHeight = ref.current.scrollHeight + "px";
      } else {
        ref.current.style.maxHeight = "0px";
      }
    }
    window.addEventListener("resize", updateHeight);
    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, [open]);

  return {
    open,
    setOpen,
    ref,
    className: `overflow-hidden transition-[max-height] ${
      alwaysOpen || open ? "max-h-none" : "max-h-0"
    }`,
  };
}
