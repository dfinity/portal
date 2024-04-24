import clsx from "clsx";
import React from "react";
import { Pill, PillVariant } from "./Pills";

const FilterPills: React.FC<{
  onValueChange: (value: string) => void;
  values: string[];
  selectedValue: string;
  className?: string;
  allLabel?: string;
  variant: PillVariant;
}> = ({
  onValueChange,
  selectedValue,
  values,
  className,
  allLabel = "All",
  variant,
}) => {
  return (
    <div className={clsx("flex gap-2 items-center", className)}>
      <Pill
        isActive={!selectedValue}
        onClick={() => onValueChange("")}
        variant={variant}
      >
        {allLabel}
      </Pill>
      {values.map((type) => (
        <Pill
          isActive={type === selectedValue}
          onClick={() => onValueChange(type)}
          variant={variant}
          key={type}
        >
          {type}
        </Pill>
      ))}
    </div>
  );
};

export default FilterPills;
