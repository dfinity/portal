import React from "react";
import styles from "./index.module.css";

import Icon1 from "../../../../static/img/basics/icon-plant.svg";
import Icon2 from "../../../../static/img/basics/icon-iot.svg";
import Icon3 from "../../../../static/img/basics/icon-db.svg";

const ItsGreen = () => {
  return (
    <section className={styles.outerContainer}>
      <svg
        width="3705"
        height="3252"
        viewBox="0 0 3705 3252"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_f_1950_36644)">
          <path
            d="M500 1289.41C500 667.538 1457.01 500 2078.93 500C2700.84 500 3205 1004.13 3205 1626C3205 2247.87 2700.84 2752 2078.93 2752C1457.01 2752 500 1911.28 500 1289.41Z"
            fill="url(#paint0_linear_1950_36644)"
          />
        </g>
        <defs>
          <filter
            id="filter0_f_1950_36644"
            x="0"
            y="0"
            width="3705"
            height="3252"
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
              result="effect1_foregroundBlur_1950_36644"
            />
          </filter>
          <linearGradient
            id="paint0_linear_1950_36644"
            x1="3324.88"
            y1="2387.93"
            x2="188.804"
            y2="567.747"
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
