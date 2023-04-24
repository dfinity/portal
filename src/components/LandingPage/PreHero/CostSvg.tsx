import clsx from "clsx";
import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export const CostSvg: React.FC<{ className?: string }> = ({ className }) => {
  //0 0 16187 12624

  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 1.0 });
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
        initial: { viewBox: `-3 ${12624 - 14} 28 14` },
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
      <path
        fill="#fff"
        d="M2782.01 11869c11.49-19.8 30.03-19.8 41.52 0l71.57 125.7c11.49 19.8 2.08 36-20.9 36h-144.17c-22.72 0-32.12-16.2-20.89-36l72.87-125.7zm-138.43-241.8c11.5-19.9 29.78-19.9 41.27 0l15.93 28.7 37.61 66.1c9.14 18.8 9.14 41 0 59.8l-126.15 218.6c-11.49 17.8-30.55 29-51.71 30.3H2455.8c-22.98 0-32.39-15.9-20.9-36l208.68-367.5z"
      ></path>
      <text
        fill="#fff"
        style={{ whiteSpace: "pre" }}
        fontFamily="CircularXX"
        fontSize="134"
        fontWeight="450"
        letterSpacing="0em"
      >
        <tspan x="2430" y="12258.5">
          56’100x
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
      <g fill="#fff" clipPath="url(#clip1_3899_100246)">
        <path d="M339.742 12235.7c-.508 8.8 6.283 16.4 15.105 16.9h.952c8.885 0 16.057-7.2 15.993-16.1 0-8.9-7.172-16-16.057-16-8.504 0-15.549 6.7-15.993 15.2zM279.956 12231.6c-2.856-.2-5.332 2-5.458 4.9-.127 2.8 2.03 5.3 4.886 5.4 2.856.2 5.268-2 5.459-4.9.19-2.8-2.031-5.2-4.887-5.4zM338.727 12142.7c2.539-1.3 3.554-4.5 2.285-7-1.27-2.6-4.443-3.6-6.982-2.3-2.538 1.3-3.554 4.4-2.284 6.9 1.269 2.6 4.379 3.7 6.981 2.4zM354.973 12171c3.935-1.9 5.521-6.8 3.554-10.7-1.968-3.9-6.791-5.5-10.726-3.5-3.935 1.9-5.522 6.7-3.554 10.7 1.967 3.9 6.791 5.5 10.726 3.5zM300.264 12190.5a6.56 6.56 0 009.139-1.9c1.967-3 1.142-7.1-1.904-9.1a6.56 6.56 0 00-9.139 1.9c-2.031 3-1.143 7.2 1.904 9.1zM309.974 12228.7c-4.443-.2-8.187 3.1-8.441 7.6-.254 4.4 3.11 8.2 7.553 8.4 4.442.3 8.187-3.1 8.441-7.5.253-4.4-3.11-8.2-7.553-8.5zM301.152 12282.5c-3.237 1.6-4.569 5.6-2.919 8.9 1.65 3.2 5.585 4.5 8.885 2.9 3.237-1.7 4.57-5.6 2.92-8.9-1.651-3.2-5.649-4.6-8.886-2.9zM332.253 12212.2c4.379 2.8 10.218 1.6 13.01-2.8 2.856-4.3 1.651-10.2-2.729-13-4.379-2.8-10.218-1.6-13.01 2.8-2.856 4.3-1.65 10.1 2.729 13zM430.942 12170.4c3.681 2.4 8.695 1.4 11.107-2.3 2.411-3.7 1.396-8.7-2.285-11.1-3.681-2.4-8.695-1.4-11.107 2.3-2.475 3.7-1.46 8.7 2.285 11.1zM447.32 12142.2c2.411 1.5 5.585.8 7.171-1.6 1.587-2.4.889-5.6-1.523-7.1-2.412-1.6-5.585-.9-7.172 1.4-1.523 2.4-.825 5.7 1.524 7.3zM432.147 12220.4c-8.822-.5-16.438 6.3-16.882 15.1-.508 8.8 6.283 16.5 15.105 16.9h.889c8.821 0 15.993-7.2 15.993-16.1.064-8.4-6.6-15.4-15.105-15.9zM360.24 12211a16.03 16.03 0 0014.343 8.8c8.822 0 15.994-7.1 15.994-16 0-2.5-.571-5-1.714-7.3-3.998-7.9-13.645-11.1-21.515-7.1-7.933 4.1-11.106 13.7-7.108 21.6zM485.841 12190.5c3.237-1.6 4.506-5.6 2.856-8.9-1.65-3.2-5.648-4.5-8.885-2.8-3.237 1.6-4.506 5.6-2.92 8.8 1.714 3.2 5.649 4.6 8.949 2.9zM445.223 12195.6c-4.633 2.3-6.537 8-4.188 12.6 2.348 4.7 7.996 6.6 12.63 4.2 4.633-2.3 6.537-8 4.188-12.6-2.348-4.6-7.996-6.5-12.63-4.2zM392.866 12139.7c3.617.2 6.727-2.6 6.981-6.2.254-3.6-2.602-6.7-6.22-7-3.617-.1-6.727 2.6-6.981 6.2-.19 3.7 2.602 6.8 6.22 7zM392.799 12181.2c5.205.3 9.647-3.7 9.901-8.9.317-5.2-3.681-9.6-8.885-9.9-5.204-.3-9.647 3.7-9.901 8.9a9.417 9.417 0 008.885 9.9zM341.77 12277.4c4.633-2.3 6.537-8 4.189-12.6-2.348-4.7-7.997-6.6-12.63-4.2-4.633 2.3-6.537 8-4.189 12.6s7.997 6.6 12.63 4.2zM398.891 12195c-4.824 7.4-2.793 17.3 4.633 22.1 7.425 4.8 17.326 2.8 22.149-4.6 4.824-7.4 2.793-17.3-4.633-22.2a16.013 16.013 0 00-8.758-2.6c-5.395 0-10.409 2.8-13.391 7.3zM426.754 12262c-3.998-8-13.645-11.1-21.515-7.1-7.934 4-11.107 13.6-7.108 21.5 3.998 7.9 13.645 11.1 21.515 7.1 7.87-3.9 11.106-13.5 7.171-21.4 0-.1 0-.1-.063-.1zM454.741 12260.8c-4.379-2.8-10.218-1.6-13.01 2.8-2.856 4.3-1.65 10.2 2.729 13 4.379 2.8 10.218 1.6 13.01-2.7a9.462 9.462 0 00-2.729-13.1zM485.46 12236.8c.254-4.5-3.11-8.2-7.552-8.5-4.443-.2-8.188 3.2-8.441 7.6-.254 4.4 3.109 8.2 7.552 8.4 4.379.3 8.187-3.1 8.441-7.5zM507.612 12231.1c-2.856-.2-5.331 2-5.458 4.9-.127 2.8 2.031 5.3 4.887 5.4 2.856.2 5.267-2 5.458-4.9.127-2.8-2.031-5.2-4.887-5.4zM486.729 12282.5a6.561 6.561 0 00-9.14 1.9c-1.967 3-1.142 7.1 1.904 9.1 3.047 2 7.109 1.2 9.14-1.9 2.031-3 1.142-7.1-1.904-9.1zM339.613 12330.8c-2.412-1.5-5.585-.8-7.172 1.5-1.587 2.4-.889 5.6 1.46 7.2 2.411 1.6 5.585.9 7.171-1.5 1.651-2.3.952-5.6-1.459-7.2zM448.269 12330.3c-2.539 1.3-3.554 4.5-2.285 7 1.269 2.6 4.443 3.6 6.981 2.3 2.539-1.3 3.554-4.4 2.285-6.9-1.269-2.6-4.379-3.7-6.981-2.4zM388.105 12278c4.823-7.4 2.792-17.3-4.633-22.2-7.426-4.8-17.327-2.8-22.214 4.7-4.887 7.4-2.792 17.3 4.633 22.2 2.603 1.7 5.649 2.6 8.759 2.6 5.458 0 10.472-2.7 13.455-7.3zM356.052 12302.6c-3.682-2.4-8.695-1.4-11.107 2.3-2.412 3.7-1.396 8.7 2.285 11.1 3.681 2.4 8.695 1.4 11.106-2.3 2.476-3.7 1.46-8.7-2.284-11.1zM393.435 12333.3c-3.618-.2-6.728 2.6-6.982 6.2-.254 3.6 2.602 6.7 6.22 7 3.618.1 6.727-2.6 6.981-6.2.191-3.7-2.602-6.8-6.219-7zM393.497 12291.8a9.371 9.371 0 00-9.901 8.9c-.318 5.2 3.681 9.6 8.885 9.9 5.204.3 9.647-3.7 9.901-8.9.317-5.1-3.681-9.6-8.885-9.9zM432.021 12302c-3.935 2-5.522 6.8-3.491 10.8 2.031 3.9 6.854 5.5 10.789 3.4 3.935-1.9 5.522-6.7 3.554-10.7-2.03-3.9-6.854-5.6-10.852-3.5z"></path>
      </g>
      <text
        fill="#fff"
        style={{ whiteSpace: "pre" }}
        fontFamily="CircularXX"
        fontSize="70"
        fontWeight="450"
        letterSpacing="0em"
      >
        <tspan x="271.547" y="12453.1">
          13’050x
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
        <clipPath id="clip1_3899_100246">
          <path
            fill="#fff"
            d="M0 0H238V219.912H0z"
            transform="translate(274.5 12126.5)"
          ></path>
        </clipPath>
      </defs>
    </motion.svg>
  );
};
