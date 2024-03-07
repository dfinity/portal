import React, { useEffect, useState } from "react";
import { Tooltip } from "./Tooltip";

export interface GlossaryTooltipProps {
  children: string;
}

export function GlossaryTooltip(props: GlossaryTooltipProps) {
  const [glossary, setGlossary] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    fetch("/glossary.txt")
      .then((res) => res.text())
      .then((glossary) => {
        const lines = glossary.split("\n");
        const map = new Map();
        for (const line of lines) {
          const [term, definition] = line.split("=");
          map.set(term.trim().toLowerCase(), definition.trim());
        }
        setGlossary(map);
      });
  }, []);

  const term = props.children;
  const definition = glossary.get(term);

  if (definition) {
    return <Tooltip text={definition}>{props.children}</Tooltip>;
  } else {
    return props.children;
  }
}
