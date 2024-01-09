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

  if (paramsString) {
    // react router history.replace will reset the scroll position to the top
    window.history.replaceState("", "", "?" + paramsString);
  } else {
    // remove trailing ? if there are no query params
    window.history.replaceState("", "", location.pathname);
  }
}

export type QueryParamConfig<T> = {
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

export function serializeNumber(n: number) {
  return n.toString();
}

export function deserializeNumber(s: string) {
  return parseInt(s);
}

export function serializeBoolean(b: boolean) {
  return b ? "true" : undefined;
}

export function deserializeBoolean(s: string) {
  return s === "true";
}

export function serializeString(s: string) {
  return !s ? undefined : s;
}

export function deserializeString(s: string) {
  return s;
}

export function serializeStringList(a: string[]) {
  return a.length === 0 ? undefined : a.join(",");
}

export function deserializeStringList<T extends string>(s: string): T[] {
  return s.trim().length > 0 ? (s.split(",") as T[]) : [];
}
