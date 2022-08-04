import { useSpring, useTransform, useViewportScroll } from "framer-motion";
import { useLayoutEffect, useState } from "react";

export function useParallax(containerRef, offset) {
  const { scrollY } = useViewportScroll();
  const [elementTop, setElementTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const initial = elementTop - clientHeight;
  const final = elementTop + offset;
  const yFrontRange = useTransform(
    scrollY,
    [initial, final],
    [offset * 3, -offset * 3]
  );
  const yMiddleRange = useTransform(
    scrollY,
    [initial, final],
    [offset * 2, -offset * 2]
  );
  const yBackRange = useTransform(scrollY, [initial, final], [offset, -offset]);
  const frontLayerOffset = useSpring(yFrontRange, {
    stiffness: 400,
    damping: 90,
  });
  const middleLayerOffset = useSpring(yMiddleRange, {
    stiffness: 400,
    damping: 90,
  });
  const backLayerOffset = useSpring(yBackRange, {
    stiffness: 400,
    damping: 90,
  });
  useLayoutEffect(() => {
    const element = containerRef.current;
    const onResize = () => {
      setElementTop(
        element.getBoundingClientRect().top + window.scrollY ||
          window.pageYOffset
      );
      setClientHeight(window.innerHeight);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [containerRef]);

  return { frontLayerOffset, middleLayerOffset, backLayerOffset };
}
