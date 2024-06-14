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

export const CodeSnippetsSection = ({
  title,
  description,
  link,
  codeSnippets,
  isExpanded,
  toggleExpand,
}) => {
  return (
    <AnimateSpawn
      className="pt-10 md:pt-20 flex flex-col md:flex-row gap-3 md:gap-1/10 items-center"
      variants={transitions.container}
      el={motion.section}
    >
      <motion.div className="md:w-4/10 " variants={transitions.item}>
        <h2 className="tw-heading-4 md:tw-heading-3 text-gradient mb-3">
          {title}
        </h2>
        <p className="tw-paragraph md:tw-lead-sm mb-3">{description}</p>
        <p className="mb-0 mt-8">
          <Link className="link-primary link-with-icon" href={link}>
            <LinkArrowRight />
            Learn More
          </Link>
        </p>
      </motion.div>
      <motion.div className="md:max-w-5/10 space-y-5 w-full">
        <AnimatePresence>
          <motion.div
            initial={false}
            animate={{ height: isExpanded ? "auto" : "24rem" }}
            className="overflow-hidden rounded-md"
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <Tabs>
              {codeSnippets.map((snippet) => (
                <TabItem
                  key={snippet.label}
                  value={snippet.label.toLowerCase()}
                  label={snippet.label}
                  default={snippet.default}
                >
                  <CodeBlockString
                    language={snippet.language}
                    showLineNumbers={true}
                  >
                    {snippet.code}
                  </CodeBlockString>
                </TabItem>
              ))}
            </Tabs>
          </motion.div>
          <motion.div className="text-center">
            <Link
              className="link-primary link-with-icon md:hover:cursor-pointer text-center select-none"
              onClick={toggleExpand}
            >
              {isExpanded ? (
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
  );
};

const CodeSnippets = () => {
  const [isSubmittingCodeSnippetExpanded, toggleSubmittingCodeSnippetExpand] =
    useState(false);
  const [isReadingCodeSnippetExpanded, toggleReadingCodeSnippetExpand] =
    useState(false);

  return (
    <motion.div className="container-12 mt-10 md:mt-20">
      <CodeSnippetsSection
        title="Submitting transactions"
        description="This code snippet shows an ICP smart contract securely sending BTC to bitcoin network directly, no oracles, L2s, or intermediaries."
        link="/docs/current/developer-docs/multi-chain/bitcoin/using-btc/submit-transactions#sending-transactions"
        codeSnippets={[
          {
            label: "Motoko",
            language: "motoko",
            code: `type ManagementCanisterActor = actor {
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
};`,
            default: true,
          },
          {
            label: "Rust",
            language: "rust",
            code: `use ic_cdk::api::management_canister::bitcoin::{
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
}`,
          },
        ]}
        isExpanded={isSubmittingCodeSnippetExpanded}
        toggleExpand={() =>
          toggleSubmittingCodeSnippetExpand(!isSubmittingCodeSnippetExpanded)
        }
      />
      <CodeSnippetsSection
        title="Reading the Bitcoin state"
        description="This code snippet shows an ICP smart contract securely reading UTXOs from bitcoin network directly, no oracles, L2s, or intermediaries."
        link="/docs/current/developer-docs/multi-chain/bitcoin/using-btc/read-state#reading-unspent-transaction-outputs"
        codeSnippets={[
          {
            label: "Motoko",
            language: "motoko",
            code: `type ManagementCanisterActor = actor {
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


`,
            default: true,
          },
          {
            label: "Rust",
            language: "rust",
            code: `use ic_cdk::api::management_canister::bitcoin::{
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
}`,
          },
        ]}
        isExpanded={isReadingCodeSnippetExpanded}
        toggleExpand={() =>
          toggleReadingCodeSnippetExpand(!isReadingCodeSnippetExpanded)
        }
      />
    </motion.div>
  );
};

export default CodeSnippets;
