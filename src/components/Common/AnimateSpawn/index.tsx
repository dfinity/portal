import { useSpawnAnimation } from "@site/src/utils/use-spawn-animation";
import { ForwardRefComponent, motion, Variants } from "framer-motion";
import React from "react";

type Props<A, B> = {
  el?: ForwardRefComponent<A, B>;
  children?: React.ReactNode;
  variants: Variants;
  className?: string;
  id?: string;

  // todo: fix this hack
  src?: string;
  alt?: string;
};

function AnimateSpawn<A, B>({
  el = motion.div as any, // todo: fix this hack
  children,
  variants,
  className,
  id,
  ...rest
}: Props<A, B>) {
  const { controls, ref } = useSpawnAnimation();

  const El = el as any; // todo: fix this hack

  return (
    <El
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={variants}
      className={className}
      id={id}
      {...rest}
    >
      {children}
    </El>
  );
}

export default AnimateSpawn;
