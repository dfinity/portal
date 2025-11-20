import { GlossaryProvider } from "@site/src/context/GlossaryProvider";

export default function Root({ children }) {
  return <GlossaryProvider>{children}</GlossaryProvider>;
}
