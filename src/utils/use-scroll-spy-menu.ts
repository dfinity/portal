import { useEffect, useRef, useState } from "react";

export function useScrollSpyMenu(selector: string, threshold = 120) {
  const elRef = useRef<HTMLElement>();
  const [highlightedIndex, setHighlightedIndex] = useState(null);

  useEffect(() => {
    if (elRef && elRef.current) {
      const headers = elRef.current.querySelectorAll(selector);

      const scroll = () => {
        for (const [i, el] of Array.from(headers).entries()) {
          const y = el.getBoundingClientRect().y;
          if (
            y > 0 ||
            i === headers.length - 1 ||
            headers[i + 1].getBoundingClientRect().y > threshold
          ) {
            return setHighlightedIndex(i);
          }
        }
      };

      scroll();

      window.addEventListener("scroll", scroll);

      return () => window.removeEventListener("scroll", scroll);
    }
  }, [elRef, setHighlightedIndex]);

  return { elRef, highlightedIndex };
}
