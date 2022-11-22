import { useEffect, useState } from "react";

function setQueryParam(
  name: string,
  value: string | undefined,
  search: string
) {
  const params = new URLSearchParams(search);
  if (typeof value === "undefined") {
    params.delete(name);
  } else {
    params.set(name, value);
  }
  const paramsString = params.toString();
  // react router history.replace will reset the scroll position to the top
  window.history.replaceState("", "", "?" + paramsString);
}

export type QueryParamConfig<T> = T extends undefined
  ? {
      serialize?: (t: T) => string;
      deserialize?: (s: string) => T;
    }
  : T extends string
  ? {
      serialize?: (t: T) => string;
      deserialize?: (s: string) => T;
    }
  : {
      serialize: (t: T) => string;
      deserialize: (s: string) => T;
    };
export function useQueryParam<T>(
  name: string,
  defaultValue?: T,
  config?: QueryParamConfig<T>
): [value: T, setValue: (v: T) => void, isInitialized: boolean] {
  const [value, setValue] = useState<T>(defaultValue);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setIsInitialized(true);
    if (typeof location.search !== "string") return;
    const params = new URLSearchParams(location.search);
    if (params.has(name)) {
      const strValue = params.get(name);

      if (config && "deserialize" in config) {
        setValue(config.deserialize(strValue));
      } else {
        setValue(strValue as any);
      }
    } else setValue(defaultValue);
  }, [setIsInitialized]);

  if (config && "serialize" in config) {
    return [
      value,
      (value: T) => {
        setQueryParam(name, config.serialize(value), location.search);
        setValue(value);
      },
      isInitialized,
    ];
  }

  return [
    value,
    (value: T) => {
      setQueryParam(
        name,
        typeof value === "undefined" ? value : value.toString(),
        location.search
      );
      setValue(value);
    },
    isInitialized,
  ];
}
