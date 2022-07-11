import { useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export function useSpawnAnimation() {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0 });
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
