import React, { useEffect, useRef, useState } from "react";

export function useElementSize<T extends HTMLElement>(
  ref: React.MutableRefObject<T>
) {
  const [size, setSize] =
    useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    const calculateSize = () => {
      setSize({
        width: ref.current.scrollWidth,
        height: ref.current.scrollHeight,
      });
    };

    if (ref.current) {
      calculateSize();
    }

    window.addEventListener("resize", calculateSize);
    return () => window.removeEventListener("resize", calculateSize);
  }, []);

  return size;
}
