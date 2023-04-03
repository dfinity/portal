declare module "@theme/Layout" {
  import type { ReactNode } from "react";

  export interface Props {
    readonly children?: ReactNode;
    editPath?: string;
  }
  export default function Layout(props: Props): JSX.Element;
}
