import React from "react";
import { Chip } from "@site/src/components/Chip/Chip";
import { ChipRow } from "@site/src/components/Chip/ChipRow";

export interface MarkdownChipRowProps {
  labels: string[];
}

export function MarkdownChipRow(props: MarkdownChipRowProps) {
  return (
    <ChipRow>
      {props.labels.map((label, index) => (
        <Chip>{label}</Chip>
      ))}
    </ChipRow>
  );
}
