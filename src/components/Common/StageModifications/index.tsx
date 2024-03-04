import React, { useEffect, useState } from "react";

function StageModifications<T extends object>({
  data,
  clone,
  onApply,
  children,
}: {
  data: T;
  clone: (data: T) => T;
  onApply: (data: T) => void;
  children: ({
    apply,
    clonedData,
    setClonedData,
  }: {
    clonedData: T;
    setClonedData: (data: T) => void;
    apply: () => void;
  }) => JSX.Element;
}) {
  const [clonedData, setClonedData] = useState<T>(data);
  useEffect(() => {
    setClonedData(clone(data));
  }, [data, clone]);

  return children({
    clonedData,
    setClonedData,
    apply: () => onApply(clonedData),
  });
}

export default StageModifications;
