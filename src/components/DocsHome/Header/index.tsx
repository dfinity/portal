import transitions from "@site/static/transitions.json";
import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import AnimateSpawn from "../../Common/AnimateSpawn";

function Index() {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.2 });
  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [controls, inView]);
  return (
    <AnimateSpawn
      variants={transitions.container}
      className="my-10 md:mt-24 md:mb-20 max-w-[min(1110px,90%)] mx-auto"
    >
      <motion.h1
        variants={transitions.item}
        className="tw-heading-4 md:tw-heading-2 mb-0"
      >
        Developer Docs
      </motion.h1>
    </AnimateSpawn>
  );
}

export default Index;
