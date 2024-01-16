import { useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export function useSpawnAnimation({
  threshold = 0,
}: { threshold?: number } = {}) {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold });
  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [controls, inView]);

  return {
    ref,
    controls,
    inView,
  };
}
