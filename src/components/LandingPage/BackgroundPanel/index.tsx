import clsx from "clsx";
import React from "react";
import { useInView } from "react-intersection-observer";
import DarkHeroStyles from "../../Common/DarkHeroStyles";

export const BackgroundPanelContext = React.createContext(false);

const BackgroundPanel: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [ref, inView] = useInView({ threshold: 0.2 });

  return (
    <div>
      {inView && <DarkHeroStyles bgColor="transparent" />}
      <div
        className={clsx(
          "fixed z-[10] inset-0 pointer-events-none bg-gradient-to-bl from-[#e07934] via-[#964680] to-[#4421a0] transition-opacity duration-500",
          inView ? "opacity-100" : "opacity-0"
        )}
      ></div>
      <div ref={ref} className="relative z-[13] " id="comparison">
        <BackgroundPanelContext.Provider value={inView}>
          {children}
        </BackgroundPanelContext.Provider>
      </div>
    </div>
  );
};

export default BackgroundPanel;
