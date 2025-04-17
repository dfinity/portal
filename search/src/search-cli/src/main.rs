use candid::{CandidType, Encode};
use clap::{Parser, Subcommand};
use ic_agent::agent::http_transport::ReqwestHttpReplicaV2Transport;
use ic_agent::identity::Secp256k1Identity;
use ic_agent::{export::Principal, Agent};
use indicatif::ProgressBar;
use print_results::print_results;
use search::{Doc, IndexEntry};
use serde::Deserialize;
use std::fs;
use std::path::PathBuf;

mod print_results;

/// CLI for search engine
#[derive(Debug, Parser)]
#[command(name = "search-cli")]
#[command(about = "CLI for search engine", long_about = None)]
struct Cli {
    #[command(subcommand)]
    command: Commands,
}

#[derive(Debug, Subcommand)]
enum Commands {
    /// Build index from json file
    #[command(arg_required_else_help = true)]
    Index {
        /// path to JSON file
        docs: PathBuf,

        /// path to stop words file containing comma separated words
        stop_words: PathBuf,

        /// path to output file
        #[arg(default_value = "output.json")]
        output: PathBuf,
    },

    #[command(arg_required_else_help = true)]
    Search {
        /// path to index file
        index: PathBuf,

        /// search query
        query: String,
    },

    #[command(arg_required_else_help = true)]
    Upload {
        /// path to index file
        index: PathBuf,

        /// path to stop words file containing comma separated words
        stop_words: PathBuf,

        /// target canister id
        canister: String,

        /// path to identity .pem file
        identity: PathBuf,

        /// target replica URL
        #[arg(default_value = "https://icp-api.io")]
        url: String,
    },
}

#[derive(Deserialize)]
struct ParsedDoc {
    // id: String,
    content: String,
    url: String,
    page_url: String,
    title: String,
    excerpt: String,
    // title_level: i32,
    page_title: String,
}

#[derive(CandidType)]
struct SearchArgs(String);

#[derive(CandidType)]
struct UploadDocsArgs(Vec<Doc>);

#[derive(CandidType)]
struct SetStopWordsArgs(Vec<String>);
#[derive(CandidType)]
struct UploadIndexEntriesArgs(Vec<(String, Vec<IndexEntry>)>);

type AllParsedDocs = Vec<ParsedDoc>;

#[tokio::main]
async fn main() {
    let args = Cli::parse();
    match args.command {
        Commands::Index {
            docs,
            stop_words,
            output,
        } => {
            print!("Reading stop words file... ");
            let stop_words = fs::read_to_string(stop_words)
                .expect("Could not read stop words file")
                .split(",")
                .map(|s| s.trim().to_lowercase())
                .filter(|s| !s.is_empty())
                .collect::<Vec<String>>();

            println!("{} stop words", stop_words.len());

            print!("Reading docs file... ");
            let docs_json = fs::read_to_string(docs).expect("Could not read docs file");
            let docs: AllParsedDocs =
                serde_json::from_str(&docs_json).expect("Invalid JSON file or schema");

            println!("{} docs", docs.len());

            println!("Building index... ");

            let mut index = search::Index::with_stop_words(&stop_words);
            let pb = ProgressBar::new(docs.len() as u64);
            let mut id = 1;
            for doc in docs {
                index.index_doc(search::Doc {
                    id,
                    title: doc.title,
                    body: doc.content,
                    url: doc.url,
                    page_url: doc.page_url,
                    excerpt: doc.excerpt,
                    page_title: doc.page_title,
                    title_len: 0,
                    page_title_len: 0,
                });
                id += 1;
                pb.inc(1);
            }
            pb.finish();

            // serializing index into output.json
            let content = serde_json::to_string(&index).unwrap();
            fs::write(output, content).expect("Unable to write file");
        }
        Commands::Search { index, query } => {
            let index = fs::read_to_string(index).expect("Could not read index file");
            let index: search::Index = serde_json::from_str(&index).expect("Invalid index file");

            let results = index.search(&query);

            print_results(&results);
        }

        Commands::Upload {
            index,
            stop_words,
            canister,
            url,
            identity,
        } => {
            let index = fs::read_to_string(index).expect("Could not read index file");
            let index: search::Index = serde_json::from_str(&index).expect("Invalid index file");

            let identity =
                Secp256k1Identity::from_pem_file(identity).expect("Failed to load identity");

            let agent = Agent::builder()
                .with_transport(
                    ReqwestHttpReplicaV2Transport::create(url.clone())
                        .expect("Could not create transport"),
                )
                .with_identity(identity)
                .build()
                .expect("Could not create agent");

            if url != "https://icp-api.io" {
                println!("Fetching root key...");
                agent
                    .fetch_root_key()
                    .await
                    .expect("Could not fetch root key");
            }

            println!("Calling start_upload method..");
            agent
                .update(&Principal::from_text(&canister).unwrap(), "start_upload")
                .with_arg(Encode!().expect("Could not encode empty"))
                .call_and_wait()
                .await
                .expect("Could not call start_upload method");

            let stop_words = fs::read_to_string(stop_words)
                .expect("Could not read stop words file")
                .split(",")
                .map(|s| s.trim().to_lowercase())
                .filter(|s| !s.is_empty())
                .collect::<Vec<String>>();

            println!("Uploading stop words...");
            agent
                .update(&Principal::from_text(&canister).unwrap(), "set_stop_words")
                .with_arg(&Encode!(&SetStopWordsArgs(stop_words)).expect("Could not encode update"))
                .call_and_wait()
                .await
                .expect("Could not call set_stop_words method");

            println!("Uploading docs...");
            let pb = ProgressBar::new(index.docs.len() as u64);
            for chunk in index.docs.chunks(1000) {
                // println!("Uploading {} docs", chunk.len());
                agent
                    .update(
                        &Principal::from_text(&canister).unwrap(),
                        "upload_index_documents",
                    )
                    .with_arg(
                        &Encode!(&UploadDocsArgs(chunk.to_vec())).expect("Could not encode update"),
                    )
                    .call_and_wait()
                    .await
                    .expect("Could not call query method");

                pb.inc(chunk.len() as u64);
                // println!("Indexed {} docs", result);
            }
            pb.finish();

            println!("Uploading index...");
            let pb = ProgressBar::new(index.index.len() as u64);
            for chunk in index.index.into_iter().collect::<Vec<_>>().chunks(1000) {
                // println!("Uploading {} docs", chunk.len());
                agent
                    .update(
                        &Principal::from_text(&canister).unwrap(),
                        "upload_index_entries",
                    )
                    .with_arg(
                        &Encode!(&UploadIndexEntriesArgs(chunk.to_vec()))
                            .expect("Could not encode update"),
                    )
                    .call_and_wait()
                    .await
                    .expect("Could not call query method");

                pb.inc(chunk.len() as u64);
                // println!("Indexed {} docs", result);
            }
            pb.finish();

            println!("Calling commit_upload method..");
            agent
                .update(&Principal::from_text(&canister).unwrap(), "commit_upload")
                .with_arg(Encode!().expect("Could not encode empty"))
                .call_and_wait()
                .await
                .expect("Could not call commit_upload method");
        }
    }
}
