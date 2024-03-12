import React from "react";

const Toggle: React.FC<{
  id?: string;
  value?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ id, onChange, value }) => {
  return (
    <span className="relative inline-flex items-center">
      <input
        type="checkbox"
        id={id}
        className="appearance-none w-10 h-6 m-0 rounded-full bg-infinite/30 checked:bg-infinite peer transition-colors active:outline-1 cursor-pointer"
        onChange={onChange}
        checked={value}
      />
      <span className="absolute top-[2px] left-[2px] w-5 h-5 rounded-full bg-white shadow-md peer-checked:translate-x-4 transition-transform pointer-events-none"></span>
    </span>
  );
};

export default Toggle;
