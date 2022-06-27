import React from "react";
import styles from "./index.module.css";

import Icon1 from "../../../../static/img/basics/icon-plant.svg";
import Icon2 from "../../../../static/img/basics/icon-iot.svg";
import Icon3 from "../../../../static/img/basics/icon-db.svg";

const ItsGreen = () => {
  return (
    <section className={styles.outerContainer}>
      <svg
        width="2032"
        height="1859"
        viewBox="0 0 2032 1859"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_f_1950_36644)">
          <path
            d="M500 801.112C500 563.905 865.115 500 1102.38 500C1339.65 500 1532 692.294 1532 929.5C1532 1166.71 1339.65 1359 1102.38 1359C865.115 1359 500 1038.32 500 801.112Z"
            fill="url(#paint0_linear_1950_36644)"
          />
        </g>
        <defs>
          <filter
            id="filter0_f_1950_36644"
            x="0"
            y="0"
            width="2032"
            height="1859"
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
            x1="1577.74"
            y1="1220.13"
            x2="381.395"
            y2="525.632"
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
