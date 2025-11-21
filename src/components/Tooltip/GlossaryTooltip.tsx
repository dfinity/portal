import { Tooltip } from "./Tooltip";
import { useGlossary } from "@site/src/context/GlossaryProvider";

export interface GlossaryTooltipProps {
  children: string;
}

export function GlossaryTooltip(props: GlossaryTooltipProps) {
  const glossary = useGlossary();

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
    return <>{props.children}</>;
  }
}
