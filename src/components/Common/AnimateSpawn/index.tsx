import { useSpawnAnimation } from "@site/src/utils/use-spawn-animation";
import { motion, Variants } from "framer-motion";
import React from "react";

const AnimateSpawn: React.FC<{
  el?: React.ElementType;
  children: React.ReactNode;
  variants: Variants;
  className?: string;
}> = ({ el = motion.div, children, variants, className }) => {
  const { controls, ref } = useSpawnAnimation();

  const El = el;

  return (
    <El
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={variants}
      className={className}
    >
      {children}
    </El>
  );
};

export default AnimateSpawn;
