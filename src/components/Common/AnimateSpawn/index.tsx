import { useSpawnAnimation } from "@site/src/utils/use-spawn-animation";
import { ForwardRefComponent, motion, Variants } from "framer-motion";
import React, { useEffect } from "react";

type Props<A, B> = {
  el?: ForwardRefComponent<A, B>;
  children?: React.ReactNode;
  variants: Variants;
  className?: string;
  id?: string;
  onShow?: () => void;
  threshold?: number;
  // todo: fix this hack
  src?: string;
  alt?: string;
};

function AnimateSpawn<A, B>({
  el = motion.div as any, // todo: fix this hack
  children,
  variants,
  className,
  onShow,
  id,
  threshold = 0,
  ...rest
}: Props<A, B>) {
  const { controls, ref, inView } = useSpawnAnimation({ threshold });
  const [started, setStarted] = React.useState(false);

  useEffect(() => {
    if (inView && !started) {
      setStarted(true);
      onShow?.();
    }
  }, [inView]);

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
