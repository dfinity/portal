import React from "react";
import styles from "./index.module.css";

import Icon1 from "../../../../static/img/basics/icon-plant.svg";
import Icon2 from "../../../../static/img/basics/icon-iot.svg";
import Icon3 from "../../../../static/img/basics/icon-db.svg";

const ItsGreen = () => {
  return (
    <section className={styles.outerContainer}>
      <svg
        width="2364"
        height="2135"
        viewBox="0 0 2364 2135"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_f_1335_33702)">
          <path
            d="M500 897.86C500 584.439 982.575 500 1296.18 500C1609.78 500 1864 754.078 1864 1067.5C1864 1380.92 1609.78 1635 1296.18 1635C982.575 1635 500 1211.28 500 897.86Z"
            fill="url(#paint0_linear_1335_33702)"
          />
        </g>
        <defs>
          <filter
            id="filter0_f_1335_33702"
            x="0"
            y="0"
            width="2364"
            height="2135"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="250"
              result="effect1_foregroundBlur_1335_33702"
            />
          </filter>
          <linearGradient
            id="paint0_linear_1335_33702"
            x1="1924.45"
            y1="1451.51"
            x2="343.482"
            y2="533.45"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#4DEDD3" />
            <stop offset="1" stopColor="#60AB00" />
          </linearGradient>
        </defs>
      </svg>

      <div className={styles.container}>
        <h2 className={styles.heading}>Efficient &amp; low carbon emissions</h2>
        <p className="paragraph-large">
          The Internet Computer's advanced architecture and cryptography runs
          smart contract software with breakthrough levels of efficiency.
          Systems built 100% on the Internet Computer run with efficiency
          comparable to the traditional IT stack, providing massive savings in
          costs and protecting the environment
        </p>
        <Icon1></Icon1>
        <Icon2></Icon2>
        <Icon3></Icon3>
      </div>
    </section>
  );
};

export default ItsGreen;
