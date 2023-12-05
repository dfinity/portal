import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { SpringCounter } from "../../LandingPage/PreHero/Counters";
import { Stat, StatsPanel } from "../Stats";

export type RotatingStat = {
  title: string;
  value: number | (() => number);
  format: (value: number) => string;
  fallbackValue?: string;
};

const FadeInOutTitle: React.FC<{
  title: string;
}> = ({ title }) => {
  const [currentTitle, setCurrentTitle] = useState(title);
  const [nextTitle, setNextTitle] = useState(title);

  useEffect(() => {
    setNextTitle(title);
    const handle = setTimeout(() => {
      setCurrentTitle(title);
    }, 300);
    return () => clearTimeout(handle);
  }, [title]);

  return (
    <span className="inline-grid text-center">
      <span
        className={clsx(
          "col-start-1 row-start-1 duration-300",
          currentTitle !== nextTitle
            ? "opacity-0 transition-opacity"
            : "opacity-1 transition-none"
        )}
      >
        {currentTitle}
      </span>
      {currentTitle !== nextTitle && (
        <span className="col-start-1 row-start-1 stat-fade-in">
          {nextTitle}
        </span>
      )}
    </span>
  );
};

const layoutClasses = {
  2: "grid grid-cols-1 sm:grid-cols-2 md:justify-between gap-10",
  3: "grid grid-cols-1 md:grid-cols-3 md:justify-between gap-10",
  4: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:justify-between gap-10",
};

const RotatingStatPanel: React.FC<{
  stats: RotatingStat[][];
  rotationIndexes: number[];
}> = ({ stats, rotationIndexes }) => {
  const [activeIndexes, setActiveIndexes] = useState(
    rotationIndexes.map(() => 0)
  );
  const [rotationIndex, setRotationIndex] = useState(0);
  const [windowFocused, setWindowFocused] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!windowFocused) {
        return;
      }

      const newActiveIndexes = [...activeIndexes];
      const nextIndexToChange = rotationIndexes[rotationIndex];
      newActiveIndexes[nextIndexToChange] =
        (newActiveIndexes[nextIndexToChange] + 1) %
        stats[nextIndexToChange].length;

      setActiveIndexes(newActiveIndexes);
      setRotationIndex((i) => (i + 1) % rotationIndexes.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [activeIndexes, rotationIndex, windowFocused]);

  useEffect(() => {
    const onVisibilityChange = () => setWindowFocused(!document.hidden);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  const statsToDisplay = activeIndexes.map((index, i) => stats[i][index]);

  const layoutClass = layoutClasses[statsToDisplay.length];

  return (
    <StatsPanel className={layoutClass}>
      {statsToDisplay.map((stat, index) => {
        const value =
          typeof stat.value === "function" ? stat.value() : stat.value;
        return (
          <Stat
            key={index}
            title={<FadeInOutTitle title={stat.title} />}
            titleClassName="whitespace-nowrap"
            value={
              <SpringCounter
                initialValue={value}
                initialTarget={value}
                target={value}
                format={stat.format}
                springConfig={[3, 1, 8]}
              />
            }
            fallbackValue={stat.fallbackValue}
          />
        );
      })}
    </StatsPanel>
  );
};

export default RotatingStatPanel;
