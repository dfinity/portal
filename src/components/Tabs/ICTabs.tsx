import React from "react";
import Tabs, { Props as TabsProps } from "@theme/Tabs";
import { Props as TabItemProps } from "@theme/TabItem";
import { Chip } from "@site/src/components/Chip/Chip";

export interface ICTabsProps extends TabsProps {
  betaBadgeValueIds?: Array<TabItemProps["value"]>;
}
export function ICTabs(props: ICTabsProps) {
  const values = [props.children as React.JSX.Element | React.JSX.Element[]]
    .flatMap((i) => i)
    .map((tabItem) => tabItem.props)
    .map((tabItem) => {
      return {
        ...tabItem,
        label: (
          <span className={"flex gap-2"}>
            {tabItem.label}
            {props.betaBadgeValueIds?.some(
              (value) => value === tabItem.value
            ) && (
              <Chip size={"small"} shape={"rounded"}>
                Beta
              </Chip>
            )}
          </span>
        ),
      };
    });

  return <Tabs className={"ic0-tabs"} {...props} values={values} />;
}
