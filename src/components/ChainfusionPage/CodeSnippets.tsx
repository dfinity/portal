import React from "react";
import TabItem from "@theme/TabItem";
import { AdornedTabs } from "../Tabs/AdornedTabs";
// import { Link } from "@docusaurus/Link";
// import { Link } from "@tanstack/router";
import { motion, AnimatePresence } from "framer-motion";
// import { Link } from "@tanstack/router";
import Link from "@docusaurus/Link";

import LinkArrowRight from "../Common/Icons/LinkArrowRight";
import LinkArrowDown from "../Common/Icons/LinkArrowDown";
import LinkArrowUp from "../Common/Icons/LinkArrowUp";


// import LinkArrowRight from "@theme/LinkArrowRight";
// import LinkArrowDown from "@theme/LinkArrowDown";
// import LinkArrowUp from "@theme/LinkArrowUp";
// import CodeBlockString from "@theme/CodeBlockString";
import CodeBlockString from "@site/src/theme/CodeBlock/Content/String";


export interface CodeSnippetsProps {}

const sampleCodeSnippets: Record<string, string> = {
  motoko: `
    import evm "ic:a6d44-nyaaa-aaaap-abp7q-cai";
    import ic "ic:aaaaa-aa";
    import Cycles "mo:base/ExperimentalCycles";
    import Timer "mo:base/Timer";

    actor {
      let EVM_FEE = 1000;
      let BITCOIN_FEE = 1000;

      func check_evm_log() : async () {
        Cycles.add<system>(EVM_FEE);
        let log = await evm.eth_getLogs(
          #EthMainnet(null),
          null,
          {
            addresses = ["address"];
            fromBlock = ? #Finalized;
            toBlock = ? #Finalized;
            topics = ?[["topic1", "topic2"]];
          },
        );
        switch log {
          case (#Consistent(#Ok(_))) {
            await send_bitcoin();
          };
          case _ {};
        };
      };

      func send_bitcoin() : async () {
        Cycles.add<system>(BITCOIN_FEE);
        await ic.bitcoin_send_transaction({
          transaction = "\\be\\ef";
          network = #testnet;
        });
      };

      let _ = Timer.setTimer<system>(#seconds 2, check_evm_log);
    };
  `,
  rust: `
    #![allow(non_snake_case, clippy::large_enum_variant, clippy::enum_variant_names)]
    use std::time::Duration;
    use candid::{self, CandidType, Deserialize, Principal};

    pub const SCRAPING_LOGS_INTERVAL: Duration = Duration::from_secs(3 * 60);

    fn setup_timers() {
      ic_cdk_timers::set_timer(Duration::ZERO, || ic_cdk::spawn(check_evm_log()));
      ic_cdk_timers::set_timer_interval(SCRAPING_LOGS_INTERVAL, || ic_cdk::spawn(check_evm_log()));
    }

    #[ic_cdk::init]
    fn init() {
      setup_timers();
    }

    async fn check_evm_log() {
      let cycles = 10_000_000_000;
      let canister_id = Principal::from_text("a6d44-nyaaa-aaaap-abp7q-cai").expect("principal should be valid");
      let (result,) = ic_cdk::api::call::call_with_payment128::<
        (RpcServices, Option<RpcConfig>, GetLogsArgs),
        (MultiGetLogsResult,),
      >(
        canister_id,
        "eth_getLogs",
        (
          RpcServices::EthMainnet(None),
          None,
          GetLogsArgs {
            fromBlock: Some(BlockTag::Finalized),
            toBlock: Some(BlockTag::Finalized),
            addresses: vec!["dummy_address".to_string()],
            topics: Some(vec![vec!["topic1".to_string()], vec!["topic2".to_string()]]),
          },
        ),
        cycles,
      )
      .await
      .expect("Call failed");

      match result {
        MultiGetLogsResult::Consistent(_) => send_bitcoin().await,
        MultiGetLogsResult::Inconsistent(_) => {
          panic!("RPC providers gave inconsistent results")
        }
      }
    }

    async fn send_bitcoin() {
      ic_cdk::api::management_canister::bitcoin::bitcoin_send_transaction(
        ic_cdk::api::management_canister::bitcoin::SendTransactionRequest {
          transaction: b"beef".into(),
          network: ic_cdk::api::management_canister::bitcoin::BitcoinNetwork::Testnet,
        },
      )
      .await
      .expect("Call failed");
    }
  `,
};

export function CodeSnippets() {
  const [isCodeSnippetExpanded, toggleCodeSnippetExpand] = React.useState(false);

  return (
      <div >

        <motion.p className="tw-paragraph md:tw-lead mt-3 md:mt-6">
            {/* <link
            className="link-primary link-with-icon"
            href="https://play.motoko.org/?tag=3352278366"
            >
            <LinkArrowRight />
            Deploy the contract in the online editor
            </link> */}
        </motion.p>

        <motion.div className="max-w-6xl mx-auto space-y-5 ">
          <AnimatePresence>
            <motion.div
                initial={false}
                animate={{
                height: isCodeSnippetExpanded ? "auto" : "24rem",
                }}
                className="overflow-hidden rounded-md"
                transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
            >
                <AdornedTabs>
                <TabItem value="motoko" label="Motoko" default>
                    <CodeBlockString 
                      language="motoko" 
                      className="text-left"
                      showLineNumbers={true}>
                      {sampleCodeSnippets.motoko}
                    </CodeBlockString>
                </TabItem>
                <TabItem value="rust" label="Rust">
                  <div style={{ width: '100%', maxWidth: 'none' }}>
                  <CodeBlockString 
                    language="rust" 
                    className="text-left"
                    showLineNumbers={true}>
                    {sampleCodeSnippets.rust}
                  </CodeBlockString>
                </div>

                </TabItem>
                </AdornedTabs>
            </motion.div>

            <motion.div className="text-center">
                <Link
                className="link-primary link-with-icon md:hover:cursor-pointer text-center select-none"
                onClick={() => toggleCodeSnippetExpand(!isCodeSnippetExpanded)}
                >
                {isCodeSnippetExpanded ? (
                    <>
                    Hide  <LinkArrowUp />
                    </>
                ) : (
                    <>
                    Expand <LinkArrowDown />
                    </>
                )}
                </Link>
            </motion.div>
            </AnimatePresence>
        </motion.div>
    </div>
  );
}
