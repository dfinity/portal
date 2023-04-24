import React from "react";

const Arrow = () => {
  return (
    <svg
      width="36"
      height="37"
      viewBox="0 0 36 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.67578 12.5884L17.999 24.9116L30.3223 12.5884"
        stroke="white"
        strokeOpacity="0.6"
        strokeWidth="3"
      />
    </svg>
  );
};

const Drawer: React.FC<{
  title: string;
  children?: React.ReactNode;
}> = ({ title, children }) => {
  return (
    <div className="bg-white/5 rounded-[32px] px-1/12 py-12 ">
      <button className="w-full flex justify-between items-center bg-transparent appearance-none border-none p-0 font-circular text-white">
        <h3 className="tw-heading-5 md:tw-heading-3 mb-0">{title}</h3>

        <Arrow />
      </button>
      {children}
    </div>
  );
};

const Highlights: React.FC = () => {
  return (
    <section>
      <div className="container-10 text-white mb-16">
        <h2 className="tw-heading-4 md:tw-heading-60">Disruption in Motion</h2>
      </div>
      <div className="container-12 space-y-8">
        {/* 
        Intelligent Blockchain
Web2 Compatible
Multi-chain
 */}
        <Drawer title="Sovereign Hardware"></Drawer>
        <Drawer title="Intelligent Blockchain"></Drawer>
        <Drawer title="Web2 Compatible"></Drawer>
        <Drawer title="Multi-chain"></Drawer>
      </div>
    </section>
  );
};

export default Highlights;
