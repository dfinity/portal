import clsx from "clsx";
import React from "react";
import { useInView } from "react-intersection-observer";
import DarkHeroStyles from "../../Common/DarkHeroStyles";

export const BackgroundPanelContext = React.createContext(false);

const BackgroundPanel: React.FC<{
  children: React.ReactNode;
  outerClassName?: string;
  panelClassName?: string;
  threshold?: number;
  rootMargin?: string;
  id?: string;
}> = ({
  children,
  panelClassName: className,
  threshold = 0.2,
  rootMargin,
  outerClassName,
  id,
}) => {
  const [ref, inView] = useInView({ threshold, rootMargin });

  return (
    <div className={outerClassName}>
      {inView && <DarkHeroStyles bgColor="transparent" />}
      <div
        className={clsx(
          "fixed z-[10] inset-0 pointer-events-none transition-opacity duration-500",
          className,
          inView ? "opacity-100" : "opacity-0"
        )}
      ></div>
      <div ref={ref} className="relative z-[13] " id={id}>
        <BackgroundPanelContext.Provider value={inView}>
          <div
            style={{ opacity: inView ? 1 : 0 }}
            className="transition-opacity"
          >
            {children}
          </div>
        </BackgroundPanelContext.Provider>
      </div>
    </div>
  );
};

export default BackgroundPanel;
