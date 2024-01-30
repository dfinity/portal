import clsx from "clsx";
import React, { ReactNode, useEffect } from "react";
import CheckBox from "../Checkbox";
import LinkArrowDown from "../Icons/LinkArrowDown";

export const ComboSelectItem: React.FC<{
  onChange: (checked: boolean) => void;
  children?: ReactNode;
  checked: boolean;
}> = ({ onChange, children, checked }) => {
  return (
    <label className="flex items-center gap-3 whitespace-nowrap">
      <CheckBox onChange={onChange} checked={checked} />
      <span className="tw-title-navigation-on-page">{children}</span>
    </label>
  );
};

const ComboSelect: React.FC<{
  label: ReactNode;
  options: {
    label: string;
    value: string;
  }[];
  selectedValues: string[];
  onChange: (options: string[]) => void;
}> = ({ label, options, selectedValues, onChange }) => {
  const ref = React.useRef<HTMLDetailsElement>(null);

  const toggleOption = (option: string) => {
    if (selectedValues.includes(option)) {
      onChange(selectedValues.filter((v) => v !== option));
    } else {
      onChange([...selectedValues, option]);
    }
  };

  useEffect(() => {
    // handle click outside to close the details summary
    function onClickOutside(event: MouseEvent) {
      if (!ref.current?.contains(event.target as Node)) {
        ref.current?.removeAttribute("open");
      }
    }
    document.addEventListener("click", onClickOutside);
    return () => {
      document.removeEventListener("click", onClickOutside);
    };
  }, []);

  return (
    <details className="relative group" role="combobox" ref={ref}>
      <summary
        className={clsx(
          "[&::-webkit-details-marker]:hidden inline-flex items-center gap-2 tw-title-navigation border-white border border-solid bg-white/50 backdrop-blur-2xl rounded-xl py-2 px-4 cursor-pointer hover:bg-white transition-colors select-none",

          selectedValues.length > 0 ? "text-infinite" : "text-black"
        )}
      >
        {label}
        <LinkArrowDown className="transition-transform group-open:-scale-y-100" />
      </summary>

      <div className=" absolute top-10 pt-1">
        <div className="bg-white/80 p-4 rounded-xl border border-white border-solid backdrop-blur-2xl flex flex-col gap-3">
          {options.map((option) => (
            <ComboSelectItem
              onChange={() => toggleOption(option.value)}
              checked={selectedValues.includes(option.value)}
              key={option.value}
            >
              {option.label}
            </ComboSelectItem>
          ))}
        </div>
      </div>
    </details>
  );
};

export const ComboSelectUnrolled: React.FC<{
  options: {
    label: string;
    value: string;
  }[];
  selectedValues: string[];
  onChange: (options: string[]) => void;
}> = ({ options, selectedValues, onChange }) => {
  const toggleOption = (option: string) => {
    if (selectedValues.includes(option)) {
      onChange(selectedValues.filter((v) => v !== option));
    } else {
      onChange([...selectedValues, option]);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {options.map((option) => (
        <ComboSelectItem
          onChange={() => toggleOption(option.value)}
          checked={selectedValues.includes(option.value)}
          key={option.value}
        >
          {option.label}
        </ComboSelectItem>
      ))}
    </div>
  );
};

export default ComboSelect;
