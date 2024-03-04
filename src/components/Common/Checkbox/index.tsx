import React from "react";

const CheckBox: React.FC<{
  onChange: (checked: boolean) => void;
  checked: boolean;
  id?: string;
  name?: string;
}> = ({ onChange, checked, id, name }) => {
  return (
    <span className="relative inline-flex">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="m-0 appearance-none w-6 h-6 rounded-[3px] border border-solid border-infinite hover:border-2 peer"
        id={id}
        name={name}
      />
      <span className="opacity-0 transition-opacity peer-checked:opacity-100 rounded-sm absolute top-[6px] left-[6px] w-3 h-3 bg-infinite pointer-events-none"></span>
    </span>
  );
};

export default CheckBox;
