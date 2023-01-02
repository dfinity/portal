import React from "react";
import useGlobalData from "@docusaurus/useGlobalData";
import { VotingRewardsPluginData } from "../../LandingPage/ICPToken/VotingRewardsPluginData";

const HeroGraphic: React.FC<{ className?: string }> = ({ className }) => {
  const globalData = useGlobalData();
  const votingRewards = globalData["voting-rewards"][
    "default"
  ] as VotingRewardsPluginData;

  const highestVotingReward =
    votingRewards[votingRewards.length - 1].reward.toFixed(1) + "%";

  return (
    <svg
      className={className}
      width="546"
      height="505"
      viewBox="0 0 546 505"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{`Stake your ICP and earn voting rewards, ${highestVotingReward} annualized.`}</title>
      <rect
        x="43.7158"
        y="190.257"
        width="269.789"
        height="252.253"
        rx="16.1873"
        fill="white"
      />
      <rect
        x="43.7158"
        y="190.257"
        width="269.789"
        height="252.253"
        rx="16.1873"
        fill="#4A13BE"
        fillOpacity="0.1"
      />
      <rect
        x="43.7158"
        y="190.257"
        width="269.789"
        height="252.253"
        rx="16.1873"
        fill="black"
        fillOpacity="0.17"
      />
      <text fill="#181818" fontSize="21.5831" fontWeight="bold">
        <tspan x="65.2988" y="231.638">
          Add or Remove
        </tspan>
        <tspan x="65.2988" y="259.966">
          Node Provider
        </tspan>
      </text>
      <rect
        x="65.2988"
        y="397.995"
        width="74.8665"
        height="22.9321"
        rx="11.466"
        fill="#18D0B5"
        fillOpacity="0.24"
      />
      <text fill="#18D0B5" fontSize="12.1405" fontWeight="bold">
        <tspan x="76.0903" y="413.564">
          Executed
        </tspan>
      </text>
      <text fill="black" fillOpacity="0.2" fontSize="12.1405" fontWeight="bold">
        <tspan x="76.0903" y="413.564">
          Executed
        </tspan>
      </text>
      <rect
        opacity="0.1"
        x="65.2988"
        y="284.683"
        width="211.11"
        height="10.7916"
        rx="5.39578"
        fill="#181818"
      />
      <rect
        opacity="0.1"
        x="65.2988"
        y="306.266"
        width="211.11"
        height="10.7916"
        rx="5.39578"
        fill="#181818"
      />
      <rect
        x="21.9463"
        y="140.961"
        width="312.971"
        height="292.627"
        rx="18.7782"
        fill="white"
      />
      <rect
        x="21.9463"
        y="140.961"
        width="312.971"
        height="292.627"
        rx="18.7782"
        fill="#4A13BE"
        fillOpacity="0.1"
      />
      <rect
        x="21.9463"
        y="140.961"
        width="312.971"
        height="292.627"
        rx="18.7782"
        fill="black"
        fillOpacity="0.1"
      />
      <text fill="#181818" fontSize="25.0376" fontWeight="bold">
        <tspan x="46.9836" y="188.72">
          Add or Remove
        </tspan>
        <tspan x="46.9836" y="221.581">
          Node Provider
        </tspan>
      </text>
      <rect
        x="46.9836"
        y="381.948"
        width="86.8493"
        height="26.6025"
        rx="13.3012"
        fill="#18D0B5"
        fillOpacity="0.24"
      />
      <text fill="#18D0B5" fontSize="14.0837" fontWeight="bold">
        <tspan x="59.5024" y="400.01">
          Executed
        </tspan>
      </text>
      <text fill="black" fillOpacity="0.2" fontSize="14.0837" fontWeight="bold">
        <tspan x="59.5024" y="400.01">
          Executed
        </tspan>
      </text>
      <rect
        opacity="0.1"
        x="46.9836"
        y="250.501"
        width="244.899"
        height="12.5188"
        rx="6.25941"
        fill="#181818"
      />
      <rect
        opacity="0.1"
        x="46.9836"
        y="275.538"
        width="244.899"
        height="12.5188"
        rx="6.25941"
        fill="#181818"
      />
      <rect y="91" width="356.863" height="333.667" rx="21.4118" fill="white" />
      <text fill="#181818" fontSize="28.549" fontWeight="bold">
        <tspan x="28.5491" y="147.934">
          Add or Remove
        </tspan>
        <tspan x="28.5491" y="185.404">
          Node Provider
        </tspan>
      </text>
      <rect
        x="28.5491"
        y="365.784"
        width="167.549"
        height="31.1373"
        rx="15.5686"
        fill="#18D0B5"
        fillOpacity="0.24"
      />
      <text fill="#18D0B5" fontSize="16.0588" fontWeight="bold">
        <tspan x="42.8235" y="386.379">
          Proposal executed
        </tspan>
      </text>
      <text fill="black" fillOpacity="0.2" fontSize="16.0588" fontWeight="bold">
        <tspan x="42.8235" y="386.379">
          Proposal executed
        </tspan>
      </text>
      <rect
        opacity="0.1"
        x="28.5491"
        y="215.902"
        width="279.245"
        height="14.2745"
        rx="7.13726"
        fill="#181818"
      />
      <rect
        opacity="0.1"
        x="28.5491"
        y="244.451"
        width="279.245"
        height="14.2745"
        rx="7.13726"
        fill="#181818"
      />
      <g filter="url(#filter0_b_3949_84779)">
        <rect
          x="250.696"
          width="245.789"
          height="158.804"
          rx="10.7059"
          fill="#3B00B9"
          fillOpacity="0.4"
        />
        <text fill="white" fontSize="14.2745" fontWeight="450">
          <tspan x="289.091" y="48.864">
            Current Annualized Voting Reward
          </tspan>
        </text>
        <text fill="white" fontSize="53.5294" fontWeight="bold">
          <tspan x="303.091" y="111.789">
            {votingRewards[votingRewards.length - 1].reward.toFixed(1)}%
          </tspan>
        </text>
        <rect
          x="251.588"
          y="0.892157"
          width="244.005"
          height="157.02"
          rx="9.81373"
          stroke="url(#paint0_linear_3949_84779)"
          strokeOpacity="0.2"
          strokeWidth="1.78431"
        />
      </g>
      <g filter="url(#filter1_b_3949_84779)">
        <rect
          x="140.069"
          y="389.412"
          width="405.931"
          height="114.818"
          rx="19.0292"
          fill="white"
          fillOpacity="0.8"
        />
      </g>
      <text fill="#181818" fontSize="21.4086" fontWeight="bold">
        <tspan x="250.366" y="437.36">
          Stake your ICP and earn&#10;
        </tspan>
        <tspan x="250.366" y="465.459">
          voting rewards
        </tspan>
      </text>
      <g filter="url(#filter2_d_3949_84779)">
        <circle cx="197.93" cy="444.561" r="33.4509" fill="white" />
      </g>
      <path
        d="M207.501 435.519C205.46 435.519 203.234 436.566 200.881 438.627C199.765 439.603 198.801 440.649 198.079 441.486C198.079 441.486 198.079 441.486 198.085 441.493V441.486C198.085 441.486 199.226 442.729 200.488 444.061C201.167 443.256 202.143 442.159 203.266 441.169C205.358 439.337 206.721 438.95 207.501 438.95C210.437 438.95 212.822 441.277 212.822 444.137C212.822 446.978 210.431 449.305 207.501 449.324C207.368 449.324 207.197 449.305 206.981 449.261C207.837 449.628 208.757 449.895 209.632 449.895C215.009 449.895 216.062 446.388 216.132 446.134C216.29 445.494 216.373 444.822 216.373 444.131C216.373 439.388 212.39 435.519 207.501 435.519Z"
        fill="url(#paint1_linear_3949_84779)"
      />
      <path
        d="M188.719 452.767C190.761 452.767 192.987 451.721 195.339 449.66C196.455 448.683 197.419 447.637 198.142 446.8C198.142 446.8 198.142 446.8 198.135 446.794V446.8C198.135 446.8 196.994 445.557 195.732 444.226C195.054 445.031 194.077 446.128 192.955 447.117C190.862 448.95 189.499 449.337 188.719 449.337C185.783 449.33 183.399 447.003 183.399 444.143C183.399 441.302 185.789 438.975 188.719 438.956C188.852 438.956 189.023 438.975 189.239 439.02C188.383 438.652 187.464 438.386 186.588 438.386C181.211 438.386 180.165 441.892 180.089 442.139C179.93 442.786 179.848 443.452 179.848 444.143C179.848 448.899 183.83 452.767 188.719 452.767Z"
        fill="url(#paint2_linear_3949_84779)"
      />
      <path
        d="M209.619 449.819C206.867 449.749 204.007 447.58 203.424 447.041C201.915 445.646 198.434 441.873 198.161 441.575C195.612 438.715 192.156 435.519 188.719 435.519H188.713H188.706C184.534 435.538 181.027 438.367 180.089 442.14C180.159 441.892 181.535 438.316 186.582 438.443C189.334 438.512 192.207 440.713 192.796 441.252C194.306 442.647 197.787 446.42 198.06 446.718C200.609 449.571 204.064 452.767 207.501 452.767H207.508H207.514C211.686 452.748 215.199 449.92 216.132 446.147C216.055 446.394 214.673 449.939 209.619 449.819Z"
        fill="#29ABE2"
      />
      <defs>
        <filter
          id="filter0_b_3949_84779"
          x="215.01"
          y="-35.6863"
          width="317.162"
          height="230.177"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="17.8431" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_3949_84779"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_3949_84779"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_b_3949_84779"
          x="111.02"
          y="360.364"
          width="464.028"
          height="172.914"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="14.5241" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_3949_84779"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_3949_84779"
            result="shape"
          />
        </filter>
        <filter
          id="filter2_d_3949_84779"
          x="151.822"
          y="398.453"
          width="92.2161"
          height="92.216"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="6.32855" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.235294 0 0 0 0 0.00392157 0 0 0 0 0.729412 0 0 0 0.16 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_3949_84779"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_3949_84779"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_3949_84779"
          x1="470.167"
          y1="158.804"
          x2="231.961"
          y2="-97.6912"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_3949_84779"
          x1="202.883"
          y1="436.657"
          x2="214.945"
          y2="449.147"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.21" stopColor="#F15A24" />
          <stop offset="0.6841" stopColor="#FBB03B" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_3949_84779"
          x1="193.337"
          y1="451.63"
          x2="181.276"
          y2="439.14"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.21" stopColor="#ED1E79" />
          <stop offset="0.8929" stopColor="#522785" />
        </linearGradient>
      </defs>
    </svg>
  );
};
export default HeroGraphic;
