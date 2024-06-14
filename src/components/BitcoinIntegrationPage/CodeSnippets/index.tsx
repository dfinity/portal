import React, { useRef, useState } from "react";
import LinkArrowUp from "../../Common/Icons/LinkArrowUp";
import LinkArrowDown from "../../Common/Icons/LinkArrowDown";
import CodeBlockString from "../../../theme/CodeBlock/Content/String";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import transitions from "@site/static/transitions.json";
import AnimateSpawn from "@site/src/components/Common/AnimateSpawn";
import { motion, AnimatePresence } from "framer-motion";
import Link from "@docusaurus/Link";
import LinkArrowRight from "../../Common/Icons/LinkArrowRight";

const CodeSnippets = () => {
  const [isSubmittingCodeSnippetExpanded, toggleSubmittingCodeSnippetExpand] =
    useState(false);
  const [isReadingCodeSnippetExpanded, toggleReadingCodeSnippetExpand] =
    useState(false);
  const submittingCodeRef = useRef(null);
  const readingCodeRef = useRef(null);
  return (
    <>
      <AnimateSpawn
        className="container-12 pt-20 md:pt-40 flex flex-col md:flex-row gap-3 md:gap-1/10 items-center"
        variants={transitions.container}
        el={motion.section}
      >
        <motion.div
          ref={submittingCodeRef}
          className="md:w-4/10 "
          variants={transitions.item}
        >
          <h2 className="tw-heading-4 md:tw-heading-3 text-gradient mb-3">
            Submitting transactions
          </h2>
          <p className="tw-paragraph md:tw-lead-sm mb-3">
            This code snippet shows an ICP smart contract securely sending BTC
            to bitcoin network directly, no oracles, L2s, or intermediaries.
          </p>

          <p className="mb-0 mt-8">
            <Link
              className="link-primary link-with-icon"
              href="/docs/current/developer-docs/multi-chain/bitcoin/using-btc/submit-transactions#sending-transactions"
            >
              <LinkArrowRight />
              Learn More
            </Link>
          </p>
        </motion.div>
        <motion.div className="md:max-w-5/10 space-y-5 w-full ">
          <AnimatePresence>
            <motion.div
              initial={false}
              animate={{
                height: isSubmittingCodeSnippetExpanded ? "auto" : "24rem",
              }}
              className="overflow-hidden rounded-md"
              transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
            >
              <Tabs>
                <TabItem value="motoko" label="Motoko" default>
                  <CodeBlockString language="motoko" showLineNumbers={true}>
                    {` type ManagementCanisterActor = actor {
      bitcoin_send_transaction : SendTransactionRequest -> async ();
  };

  let management_canister_actor : ManagementCanisterActor = actor("aaaaa-aa");

  public func send_transaction(network : Network, transaction : [Nat8]) : async () {
    let transaction_fee =
        SEND_TRANSACTION_BASE_COST_CYCLES + transaction.size() * SEND_TRANSACTION_COST_CYCLES_PER_BYTE;

    ExperimentalCycles.add(transaction_fee);
    await management_canister_actor.bitcoin_send_transaction({
        network;
        transaction;
    })
  };
`}
                  </CodeBlockString>
                </TabItem>

                <TabItem value="rust" label="Rust">
                  <CodeBlockString language="rust" showLineNumbers={true}>
                    {`use ic_cdk::api::management_canister::bitcoin::{
    BitcoinNetwork, GetBalanceRequest, GetCurrentFeePercentilesRequest, GetUtxosRequest,
    GetUtxosResponse, MillisatoshiPerByte, Satoshi, SendTransactionRequest,
};

pub async fn send_transaction(network: BitcoinNetwork, transaction: Vec<u8>) {
    let transaction_fee = SEND_TRANSACTION_BASE_CYCLES
        + (transaction.len() as u64) * SEND_TRANSACTION_PER_BYTE_CYCLES;

    let res: Result<(), _> = call_with_payment(
        Principal::management_canister(),
        "bitcoin_send_transaction",
        (SendTransactionRequest {
            network: network.into(),
            transaction,
        },),
        transaction_fee,
    )
    .await;

    res.unwrap();
}`}
                  </CodeBlockString>
                </TabItem>
              </Tabs>
            </motion.div>

            <motion.div className="text-center">
              <Link
                className="link-primary link-with-icon md:hover:cursor-pointer text-center select-none"
                onClick={() =>
                  toggleSubmittingCodeSnippetExpand(
                    !isSubmittingCodeSnippetExpanded
                  )
                }
              >
                {isSubmittingCodeSnippetExpanded ? (
                  <>
                    Hide <LinkArrowUp />
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
      </AnimateSpawn>
      <AnimateSpawn
        className="container-12 pt-10 md:pt-20 flex flex-col md:flex-row gap-3 md:gap-1/10 items-center"
        variants={transitions.container}
        el={motion.section}
      >
        <motion.div
          ref={readingCodeRef}
          className="md:w-4/10 "
          variants={transitions.item}
        >
          <h2 className="tw-heading-4 md:tw-heading-3 text-gradient mb-3">
            Reading the Bitcoin state
          </h2>
          <p className="tw-paragraph md:tw-lead-sm mb-3">
            This code snippet shows an ICP smart contract securely reading UTXOs
            from bitcoin network directly, no oracles, L2s, or intermediaries.
          </p>

          <p className="mb-0 mt-8">
            <Link
              className="link-primary link-with-icon"
              href="/docs/current/developer-docs/multi-chain/bitcoin/using-btc/read-state#reading-unspent-transaction-outputs"
            >
              <LinkArrowRight />
              Learn More
            </Link>
          </p>
        </motion.div>
        <motion.div className="md:max-w-5/10 space-y-5 w-full ">
          <AnimatePresence>
            <motion.div
              initial={false}
              animate={{
                height: isReadingCodeSnippetExpanded ? "auto" : "24rem",
              }}
              className="overflow-hidden rounded-md"
              transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
            >
              <Tabs>
                <TabItem value="motoko" label="Motoko" default>
                  <CodeBlockString language="motoko" showLineNumbers={true}>
                    {`type ManagementCanisterActor = actor {
      bitcoin_get_utxos : GetUtxosRequest -> async GetUtxosResponse;
  };

 public func get_utxos(network : Network, address : BitcoinAddress) : async GetUtxosResponse {
    ExperimentalCycles.add(GET_UTXOS_COST_CYCLES);
    await management_canister_actor.bitcoin_get_utxos({
        address;
        network;
        filter = null;
    })
  };


`}
                  </CodeBlockString>
                </TabItem>

                <TabItem value="rust" label="Rust">
                  <CodeBlockString language="rust" showLineNumbers={true}>
                    {`use ic_cdk::api::management_canister::bitcoin::{
    BitcoinNetwork, GetBalanceRequest, GetCurrentFeePercentilesRequest, GetUtxosRequest,
    GetUtxosResponse, MillisatoshiPerByte, Satoshi, SendTransactionRequest,
};


pub async fn get_utxos(network: BitcoinNetwork, address: String) -> GetUtxosResponse {
    let utxos_res: Result<(GetUtxosResponse,), _> = call_with_payment(
        Principal::management_canister(),
        "bitcoin_get_utxos",
        (GetUtxosRequest {
            address,
            network: network.into(),
            filter: None,
        },),
        GET_UTXOS_COST_CYCLES,
    )
    .await;

    utxos_res.unwrap().0
}`}
                  </CodeBlockString>
                </TabItem>
              </Tabs>
            </motion.div>

            <motion.div className="text-center">
              <Link
                className="link-primary link-with-icon md:hover:cursor-pointer text-center select-none"
                onClick={() =>
                  toggleReadingCodeSnippetExpand(!isReadingCodeSnippetExpanded)
                }
              >
                {isReadingCodeSnippetExpanded ? (
                  <>
                    Hide <LinkArrowUp />
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
      </AnimateSpawn>
    </>
  );
};

export default CodeSnippets;
