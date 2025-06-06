import React from "react";
import TabItem from "@theme/TabItem";
import { AdornedTabs } from "../Tabs/AdornedTabs";
import { motion, AnimatePresence } from "framer-motion";
import CodeBlockString from "@site/src/theme/CodeBlock/Content/String";

const codeSnippets: Record<string, string> = {
  motoko: `import LLM "mo:llm";

await LLM.chat(#Llama3_1_8B).withMessages ([
  #system_ {
    content = "You are a helpful assistant.";
  },
  #user_ {
    content = "How big is the sun?";
  },
]).send();`,
  rust: `use ic_llm::{Model, ChatMessage};

ic_llm::chat(Model::Llama3_1_8B)
  .with_messages(vec![
    ChatMessage::System {
      content: "You are a helpful assistant".to_string(),
    },
    ChatMessage::User {
      content: "How big is the sun?".to_string(),
    },
  ])
  .send()
  .await;`,
  typescript: `import * as llm from "@dfinity/llm";

await llm.chat(llm.Model.Llama3_1_8B, [
  {
    content: "You are a helpful assistant.",
    role: llm.Role.System,
  },
  {
    content: "How big is the sun?",
    role: llm.Role.User,
  }
]);`
};

const customStyles = {
  tab: {
    color: "rgb(82, 88, 96)",
  },
};

export function CodeSnippetMultipleMessages() {
  return (
    <div>
      <div className="max-w-6xl mx-auto space-y-5 ">
        <motion.div
          initial={false}
          className="rounded-md"
          transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          style={
            {
              "--ifm-tabs-color": customStyles.tab.color,
            } as React.CSSProperties
          }
        >
          <AdornedTabs>
            <TabItem value="motoko" label="Motoko" default>
              <CodeBlockString
                language="motoko"
                className="text-left"
                showLineNumbers={true}
              >
                {codeSnippets.motoko}
              </CodeBlockString>
            </TabItem>
            <TabItem value="typescript" label="Typescript" default>
              <CodeBlockString
                language="typescript"
                className="text-left"
                showLineNumbers={true}
              >
                {codeSnippets.typescript}
              </CodeBlockString>
            </TabItem>
            <TabItem value="rust" label="Rust">
              <div style={{ width: "100%", maxWidth: "none" }}>
                <CodeBlockString
                  language="rust"
                  className="text-left"
                  showLineNumbers={true}
                >
                  {codeSnippets.rust}
                </CodeBlockString>
              </div>
            </TabItem>
          </AdornedTabs>
        </motion.div>
      </div>
    </div>
  );
}
