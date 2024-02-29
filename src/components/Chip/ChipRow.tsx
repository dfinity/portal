import React from "react";
import { ReactNode } from "react";

export interface ChipRowProps {
  children: ReactNode;
}
export function ChipRow(props: ChipRowProps) {
  return <div className={"flex gap-2"}>{props.children}</div>
}