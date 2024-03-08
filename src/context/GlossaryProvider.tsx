import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export interface GlossaryContext {
  glossary: Map<string, string>;
}

export const glossaryContext = createContext<GlossaryContext>({
  glossary: new Map(),
});

export const GlossaryProvider = (props: { children: ReactNode }) => {
  const [glossary, setGlossary] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    fetch("/glossary.txt")
      .then((res) => res.text())
      .then((glossary) => {
        const lines = glossary
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean);
        const map = new Map();
        for (const line of lines) {
          const [term, definition] = line.split("=");
          map.set(term.trim().toLowerCase(), definition.trim());
        }
        setGlossary(map);
      });
  }, []);

  return (
    <glossaryContext.Provider value={{ glossary }}>
      {props.children}
    </glossaryContext.Provider>
  );
};

export function useGlossary() {
  return useContext(glossaryContext).glossary;
}
