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

  // even though we use typescript, a lot of content is MDX, which will
  // still attempt to render the component with invalid props
  if (!term || typeof term !== "string") {
    console.warn(
      "Attempted to render a tooltip with invalid content. Rendering null instead."
    );
    return null;
  }

  const definition = glossary.get(term.toLowerCase());

  if (definition) {
    return <Tooltip text={definition}>{props.children}</Tooltip>;
  } else {
    return props.children;
  }
}
