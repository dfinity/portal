import clsx from "clsx";
import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export const CostSvg: React.FC<{ className?: string }> = ({ className }) => {
  //0 0 16187 12624

  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0 });
  useEffect(() => {
    if (inView) {
      controls.start("animate");
    }
  }, [controls, inView]);

  return (
    <motion.svg
      ref={ref}
      animate={controls}
      initial="initial"
      variants={{
        initial: { viewBox: `0 ${12624 - 14} 28 14` },
        animate: {
          viewBox: [
            `-3 ${12624 - 14} 28 14`,
            `-3 ${12624 - 905} 1810 905`,
            `958 ${12624 - 1712} 2464 1712`,
            `1905 0 14285 12624`,
            `1905 0 14285 12624`,
            `-3 ${12624 - 14} 28 14`,
          ],
        },
      }}
      className={clsx("aspect-[16187/12624]", className)}
      transition={{
        type: "tween",
        duration: 14,

        delay: 1,
        ease: ["easeInOut", "easeInOut", "easeInOut", "easeInOut", "easeInOut"],
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 1,
      }}
      // viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="2.25"
        cy="12621.8"
        r="2.25"
        fill="url(#paint0_linear_3899_100246)"
        fillOpacity="0.4"
      ></circle>
      <circle
        cx="2.25"
        cy="12621.8"
        r="2.2"
        stroke="#fff"
        strokeOpacity="0.3"
        strokeWidth="0.1"
      ></circle>
      <circle
        cx="17"
        cy="12619"
        r="5"
        fill="url(#paint1_linear_3899_100246)"
      ></circle>
      <circle
        cx="17"
        cy="12619"
        r="4.9"
        stroke="#fff"
        strokeOpacity="0.3"
        strokeWidth="0.2"
      ></circle>
      <circle
        cx="1393"
        cy="12270"
        r="350"
        fill="url(#paint2_linear_3899_100246)"
        fillOpacity="0.4"
      ></circle>
      <circle
        cx="1393"
        cy="12270"
        r="348"
        stroke="#fff"
        strokeOpacity="0.3"
        strokeWidth="4"
      ></circle>
      <circle
        cx="393.5"
        cy="12299.5"
        r="322.5"
        fill="url(#paint3_linear_3899_100246)"
        fillOpacity="0.4"
      ></circle>
      <circle
        cx="393.5"
        cy="12299.5"
        r="320.5"
        stroke="#fff"
        strokeOpacity="0.3"
        strokeWidth="4"
      ></circle>
      <circle
        cx="2665"
        cy="11954"
        r="670"
        fill="url(#paint4_linear_3899_100246)"
        fillOpacity="0.4"
      ></circle>
      <circle
        cx="2665"
        cy="11954"
        r="666"
        stroke="#fff"
        strokeOpacity="0.3"
        strokeWidth="8"
      ></circle>
      <circle
        cx="9887"
        cy="6300"
        r="6300"
        fill="url(#paint5_linear_3899_100246)"
        fillOpacity="0.4"
      ></circle>
      <circle
        cx="9887"
        cy="6300"
        r="6280"
        stroke="#fff"
        strokeOpacity="0.3"
        strokeWidth="40"
      ></circle>
      <path
        fill="#fff"
        fillOpacity="0.6"
        d="M9886.52 3502.15v1065.26l900.38 402.33-900.38-1467.59z"
      ></path>
      <path
        fill="#fff"
        d="M9886.46 3502.15l-900.5 1467.59 900.5-402.33V3502.15z"
      ></path>
      <path
        fill="#fff"
        fillOpacity="0.6"
        d="M9886.52 5660.02v723.83l900.98-1246.49-900.98 522.66z"
      ></path>
      <path
        fill="#fff"
        d="M9886.46 6383.85V5659.9l-900.5-522.54 900.5 1246.49z"
      ></path>
      <path
        fill="#fff"
        fillOpacity="0.2"
        d="M9886.52 5492.5l900.38-522.79-900.38-402.08v924.87z"
      ></path>
      <path
        fill="#fff"
        fillOpacity="0.6"
        d="M8985.96 4969.71l900.5 522.79v-924.87l-900.5 402.08z"
      ></path>
      <text
        fill="#fff"
        style={{ whiteSpace: "pre" }}
        fontFamily="CircularXX"
        fontSize="1200"
        fontWeight="450"
        letterSpacing="0em"
      >
        <tspan x="6711.53" y="7777.45">
          5’000’000x
        </tspan>
      </text>
      <text
        fill="#fff"
        fillOpacity="0.5"
        style={{ whiteSpace: "pre" }}
        fontFamily="CircularXX"
        fontSize="600"
        fontWeight="450"
        letterSpacing="0em"
      >
        <tspan x="8116.9" y="8931.65">
          $25’000’000
        </tspan>
      </text>
      <text
        fill="#fff"
        style={{ whiteSpace: "pre" }}
        fontFamily="CircularXX"
        fontSize="64.5"
        fontWeight="450"
        letterSpacing="0em"
      >
        <tspan x="325" y="11913.3">
          ADA
        </tspan>
      </text>
      <path
        fill="url(#paint6_linear_3899_100246)"
        d="M18.427 12617.7c-.31 0-.65.1-1.008.5-.17.1-.317.3-.427.4h.001s.174.2.366.4c.103-.1.252-.3.423-.5.319-.2.526-.3.645-.3.447 0 .81.4.81.8s-.364.8-.81.8h-.08c.131 0 .271.1.404.1.82 0 .98-.6.99-.6.024-.1.037-.2.037-.3 0-.7-.606-1.3-1.351-1.3z"
      ></path>
      <path
        fill="url(#paint7_linear_3899_100246)"
        d="M15.57 12620.3c.31 0 .65-.1 1.008-.5.17-.1.316-.3.426-.4 0 0-.174-.2-.367-.4-.103.1-.252.3-.422.5-.319.2-.527.3-.645.3-.447 0-.81-.4-.81-.8s.364-.8.81-.8h.079c-.13 0-.27-.1-.404-.1-.819 0-.978.6-.99.6-.024.1-.036.2-.036.3 0 .7.606 1.3 1.35 1.3z"
      ></path>
      <path
        fill="#29ABE2"
        d="M18.755 12619.9c-.42 0-.855-.4-.944-.5-.23-.2-.76-.7-.801-.8-.388-.4-.915-.9-1.438-.9h-.002c-.635 0-1.17.4-1.312 1 .01 0 .22-.6.989-.6.419 0 .856.4.946.5.23.2.76.7.801.8.388.4.915.9 1.438.9h.001c.636 0 1.171-.4 1.313-1-.011 0-.222.6-.991.6z"
      ></path>
      <path
        fill="url(#paint8_linear_3899_100246)"
        d="M1337.76 12240.8c.99-1 2.34-1.6 3.78-1.6h130.61c2.39 0 3.58 2.9 1.89 4.6l-25.8 25.8c-.99 1-2.34 1.5-3.78 1.5h-130.61c-2.39 0-3.58-2.9-1.89-4.5l25.8-25.8z"
      ></path>
      <path
        fill="url(#paint9_linear_3899_100246)"
        d="M1337.76 12144.4c1.03-1 2.38-1.5 3.78-1.5h130.61c2.39 0 3.58 2.9 1.89 4.5l-25.8 25.8c-.99 1-2.34 1.6-3.78 1.6h-130.61c-2.39 0-3.58-2.9-1.89-4.6l25.8-25.8z"
      ></path>
      <path
        fill="url(#paint10_linear_3899_100246)"
        d="M1448.24 12192.3c-.99-1-2.34-1.6-3.78-1.6h-130.61c-2.39 0-3.58 2.9-1.89 4.6l25.8 25.8c.99 1 2.34 1.6 3.78 1.6h130.61c2.39 0 3.58-2.9 1.89-4.6l-25.8-25.8z"
      ></path>
      <text
        fill="#fff"
        style={{ whiteSpace: "pre" }}
        fontFamily="CircularXX"
        fontSize="70"
        fontWeight="450"
        letterSpacing="0em"
      >
        <tspan x="1274.43" y="12377.8">
          15’370x
        </tspan>
      </text>
      <g clipPath="url(#clip0_3899_100246)">
        <path
          fill="#fff"
          d="M1.748 12621.6h.008c.006 0 .014.1.024.1h-.009l-.048.1H1.68c-.01-.1-.02-.1-.027-.1h-.024c-.06 0-.134.1-.224.1-.065 0-.116 0-.153-.1-.038 0-.057-.1-.057-.1 0-.1.023-.1.07-.2h.356v-.1s-.012-.1-.036-.1H1.24c0-.1.002-.1.006-.1h.437c.042.1.063.1.063.2v.3h.002zm-.31.1h.078c.028 0 .052-.1.073-.1h.026c.004-.1.007-.1.007-.1h-.256c-.025 0-.037 0-.037.1h.028c.019.1.045.1.08.1zm.613.1h-.03c-.005-.1-.01-.1-.015-.1l-.18-.6H1.82h.139l.128.5.12-.5H2.355l.121.5.132-.5H2.737l-.184.6c-.004 0-.01 0-.016.1h-.124c-.007-.1-.012-.1-.015-.1l-.119-.5-.117.5c-.004 0-.009 0-.015.1h-.096zm.981 0h-.117c-.039 0-.068-.1-.088-.1h-.028c0-.1.006-.1.017-.1h.033c.026.1.054.1.084.1h.202c.026-.1.04-.1.04-.1s-.007-.1-.02-.1h-.188c-.056-.1-.097-.1-.123-.1-.025-.1-.038-.1-.038-.1 0-.1.007-.1.02-.1.015 0 .033-.1.056-.1h.382v.1H2.969c-.024 0-.036 0-.036.1h.023c.015 0 .043 0 .084.1h.108c.055 0 .095 0 .119.1.023 0 .035 0 .035.1 0 0-.007 0-.02.1h-.056c-.023 0-.052.1-.084.1h-.11z"
        ></path>
        <path
          fill="#F90"
          fillRule="evenodd"
          d="M3.174 12622.2c-.251.1-.616.2-.93.2-.44 0-.837-.1-1.136-.4h.026c.324.2.723.3 1.136.3.28 0 .585-.1.867-.2.042 0 .078 0 .037.1z"
          clipRule="evenodd"
        ></path>
        <path
          fill="#F90"
          fillRule="evenodd"
          d="M3.28 12622h-.301c.144-.1.38-.1.408 0 .027 0-.008.2-.142.3-.021.1-.041 0-.032 0 .03-.1.099-.2.067-.3z"
          clipRule="evenodd"
        ></path>
      </g>
      <path
        fill="#fff"
        d="M2796.31 11874.8c12.9-22.2 33.71-22.2 46.61 0l80.31 141c12.89 22.3 2.34 40.5-23.45 40.5h-161.8c-25.5 0-36.05-18.2-23.45-40.5l81.78-141zm-155.34-271.4c12.89-22.2 33.41-22.2 46.31 0l17.88 32.3 42.2 74.1c10.26 21.1 10.26 46 0 67.1l-141.57 245.4c-12.89 19.9-34.29 32.5-58.03 34h-117.54c-25.79 0-36.34-17.9-23.45-40.5l234.2-412.4z"
      ></path>
      <text
        fill="#fff"
        style={{ whiteSpace: "pre" }}
        fontFamily="CircularXX"
        fontSize="134"
        fontWeight="450"
        letterSpacing="0em"
      >
        <tspan x="2430" y="12284.1">
          56’100x
        </tspan>
      </text>
      <defs>
        <linearGradient
          id="paint0_linear_3899_100246"
          x1="0"
          x2="5.349"
          y1="12619.5"
          y2="12621"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" stopOpacity="0.6"></stop>
          <stop offset="0.385" stopColor="#fff" stopOpacity="0"></stop>
          <stop offset="1" stopColor="#fff" stopOpacity="0.341"></stop>
        </linearGradient>
        <linearGradient
          id="paint1_linear_3899_100246"
          x1="12"
          x2="23.886"
          y1="12614"
          y2="12617.4"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff"></stop>
          <stop offset="0.385" stopColor="#fff"></stop>
          <stop offset="1" stopColor="#fff"></stop>
        </linearGradient>
        <linearGradient
          id="paint2_linear_3899_100246"
          x1="1043"
          x2="1875.05"
          y1="11920"
          y2="12157.6"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" stopOpacity="0.6"></stop>
          <stop offset="0.385" stopColor="#fff" stopOpacity="0"></stop>
          <stop offset="1" stopColor="#fff" stopOpacity="0.341"></stop>
        </linearGradient>
        <linearGradient
          id="paint3_linear_3899_100246"
          x1="71"
          x2="837.673"
          y1="11977"
          y2="12195.9"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" stopOpacity="0.6"></stop>
          <stop offset="0.385" stopColor="#fff" stopOpacity="0"></stop>
          <stop offset="1" stopColor="#fff" stopOpacity="0.341"></stop>
        </linearGradient>
        <linearGradient
          id="paint4_linear_3899_100246"
          x1="1995"
          x2="3587.78"
          y1="11284"
          y2="11738.9"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" stopOpacity="0.6"></stop>
          <stop offset="0.385" stopColor="#fff" stopOpacity="0"></stop>
          <stop offset="1" stopColor="#fff" stopOpacity="0.341"></stop>
        </linearGradient>
        <linearGradient
          id="paint5_linear_3899_100246"
          x1="3587"
          x2="18563.9"
          y1="0"
          y2="4277.14"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" stopOpacity="0.6"></stop>
          <stop offset="0.385" stopColor="#fff" stopOpacity="0"></stop>
          <stop offset="1" stopColor="#fff" stopOpacity="0.341"></stop>
        </linearGradient>
        <linearGradient
          id="paint6_linear_3899_100246"
          x1="17.724"
          x2="19.561"
          y1="12617.9"
          y2="12619.8"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.21" stopColor="#F15A24"></stop>
          <stop offset="0.684" stopColor="#FBB03B"></stop>
        </linearGradient>
        <linearGradient
          id="paint7_linear_3899_100246"
          x1="16.273"
          x2="14.436"
          y1="12620.1"
          y2="12618.2"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.21" stopColor="#ED1E79"></stop>
          <stop offset="0.893" stopColor="#522785"></stop>
        </linearGradient>
        <linearGradient
          id="paint8_linear_3899_100246"
          x1="1459.67"
          x2="1369.28"
          y1="12127.5"
          y2="12300.6"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00FFA3"></stop>
          <stop offset="1" stopColor="#DC1FFF"></stop>
        </linearGradient>
        <linearGradient
          id="paint9_linear_3899_100246"
          x1="1420.15"
          x2="1329.76"
          y1="12106.8"
          y2="12280"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00FFA3"></stop>
          <stop offset="1" stopColor="#DC1FFF"></stop>
        </linearGradient>
        <linearGradient
          id="paint10_linear_3899_100246"
          x1="1439.78"
          x2="1349.4"
          y1="12117.1"
          y2="12290.2"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00FFA3"></stop>
          <stop offset="1" stopColor="#DC1FFF"></stop>
        </linearGradient>
        <clipPath id="clip0_3899_100246">
          <path
            fill="#fff"
            d="M0 0H2.322V1.39H0z"
            transform="translate(1.09 12621.1)"
          ></path>
        </clipPath>
      </defs>
    </motion.svg>
  );
};
