use std::{collections::HashMap, process::exit};

use candid::CandidType;
use regex::Regex;
use rust_stemmers::Stemmer;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize, CandidType)]
pub struct Doc {
    pub id: usize,
    pub title: String,
    pub body: String,
    pub url: String,
    pub page_url: String,
    pub excerpt: String,
    pub page_title: String,
    pub title_len: usize,
    pub page_title_len: usize,
}

#[derive(Debug, Copy, Clone, Serialize, Deserialize, CandidType)]
pub struct IndexEntry {
    pub doc_index: usize,
    pub word_index: usize,
    pub count: usize,
    pub start: usize,
    pub end: usize,
    pub score: f32,
}

struct EnglishStemmer(Stemmer);

impl Default for EnglishStemmer {
    fn default() -> Self {
        EnglishStemmer(Stemmer::create(rust_stemmers::Algorithm::English))
    }
}

#[derive(Serialize, Deserialize)]
pub struct Index {
    pub docs: Vec<Doc>,
    pub index: HashMap<String, Vec<IndexEntry>>,
    #[serde(skip)]
    stemmer: EnglishStemmer,
    stop_words: Vec<String>,
}

#[derive(CandidType, Deserialize)]
pub struct SearchResult {
    pub doc: Doc,
    pub score: f32,
    pub term_positions: Vec<(usize, usize)>,
}

#[derive(CandidType, Deserialize)]
pub struct PageSearchResult {
    pub url: String,
    pub title: String,
    pub results: Vec<SearchResult>,
}

impl Index {
    pub fn new() -> Index {
        Index {
            docs: Vec::new(),
            index: HashMap::new(),
            stemmer: Default::default(),
            stop_words: vec![],
        }
    }

    pub fn set_stop_words(&mut self, stop_words: &[String]) {
        self.stop_words = stop_words.to_vec();
    }

    pub fn with_stop_words(stop_words: &[String]) -> Index {
        Index {
            docs: Vec::new(),
            index: HashMap::new(),
            stemmer: Default::default(),
            stop_words: stop_words.to_vec(),
        }
    }

    pub fn tokenize(&self, text: &str) -> Vec<String> {
        let splitter = Regex::new(r"[^\w\d']+").unwrap();

        splitter
            .split(&text.to_lowercase())
            .map(|s| self.stemmer.0.stem(s).to_string())
            // .filter(|s| !self.stop_words.contains(&s.as_str()))
            .filter(|s| s.len() >= 1)
            .collect()
    }

    pub fn get_token_positions(input: &str) -> Vec<(usize, usize)> {
        let tokens_regex = Regex::new(r"([\w\d']+)").unwrap();

        tokens_regex
            .find_iter(input)
            .fold(Vec::new(), |mut acc, cap| {
                acc.push((cap.start(), cap.end()));
                // println!("{}", cap.as_str());
                acc
            })
    }

    pub fn filter_out_stopwords(&self, tokens: &[String]) -> Vec<String> {
        tokens
            .iter()
            .filter(|s| !self.stop_words.contains(&s))
            .map(|s| s.to_string())
            .collect()
    }

    pub fn index_doc(&mut self, mut doc: Doc) {
        let doc_index = self.docs.len();

        let body_with_title = format!("{} {} {}", doc.title, doc.page_title, doc.body);

        let tokens = self.tokenize(&body_with_title);
        let title_tokens = self.filter_out_stopwords(&self.tokenize(&doc.title));
        let page_title_tokens = self.filter_out_stopwords(&self.tokenize(&doc.page_title));
        let positions = Index::get_token_positions(&body_with_title);

        doc.title_len = title_tokens.len();
        doc.page_title_len = page_title_tokens.len();

        self.docs.push(doc);

        if positions.len() != tokens.len() {
            println!(
                "Token count mismatch for {}.\nTokens: {}\nExiting.",
                self.docs[doc_index].body,
                tokens.join(", ")
            );
            exit(0)
        }

        // remove stop words from tokens and positions
        let mut filtered_tokens = Vec::new();
        let mut filtered_positions = Vec::new();
        for (index, token) in tokens.iter().enumerate() {
            if !self.stop_words.contains(&token) {
                filtered_tokens.push(token.clone());
                filtered_positions.push(positions[index]);
            }
        }
        let tokens = filtered_tokens;
        let positions = filtered_positions;

        let mut token_entries = HashMap::<String, IndexEntry>::new();

        for (index, token) in tokens.iter().enumerate() {
            if token == "" {
                println!(
                    "Empty token found in {}.\nTokens: {}\nExiting.",
                    self.docs[doc_index].body,
                    tokens.join(", ")
                );
                exit(0)
            }
            let all_partial_tokens = Index::generate_partial_tokens(&token, 3);

            for partial_token in all_partial_tokens {
                if let Some(entry) = token_entries.get_mut(&partial_token) {
                    entry.count += 1;
                } else {
                    let doc = &self.docs[doc_index];
                    let is_partial = token != &partial_token;
                    let is_in_title = doc.title_len + doc.page_title_len > index;
                    let is_exact_title = index == 0 && doc.title_len == 1;
                    let is_exact_page_title =
                        index == doc.page_title_len && doc.page_title_len == 1;

                    let entry = IndexEntry {
                        doc_index,
                        word_index: index,
                        count: 1,
                        start: positions[index].0,
                        end: positions[index].1,
                        score: 1.0 / (index as f32 + 1.0)
                            * (if is_partial {
                                0.5
                            } else if is_exact_title {
                                3.0
                            } else if is_exact_page_title {
                                2.5
                            } else if is_in_title {
                                2.0
                            } else {
                                1.0
                            }),
                    };
                    token_entries.insert(partial_token.clone(), entry);
                }
            }
        }

        for (token, entry) in token_entries {
            if let Some(entries) = self.index.get_mut(&token) {
                entries.push(entry);
            } else {
                self.index.insert(token, vec![entry]);
            }
        }

        // println!("{:?}", self.index);
    }

    pub fn generate_partial_tokens(token: &str, min_length: usize) -> Vec<String> {
        if token.len() <= min_length {
            return vec![token.to_string()];
        }

        let mut tokens = Vec::new();

        for (i, c) in token.chars().enumerate() {
            if i == 0 {
                tokens.push(c.to_string());
            } else {
                tokens.push(tokens.last().unwrap().to_string() + &c.to_string());
            }
        }

        tokens = tokens
            .into_iter()
            .filter(|s| s.len() >= min_length)
            .collect();

        tokens
    }

    pub fn search(&self, query: &str) -> Vec<PageSearchResult> {
        let tokens = self.tokenize(query);

        // remove stop words from tokens
        let tokens: Vec<_> = tokens
            .into_iter()
            .filter(|s| !self.stop_words.contains(&s))
            .collect();

        struct IntermediateResult {
            score: f32,
            entries: Vec<IndexEntry>,
        }

        struct PageResult {
            top_score: f32,
            title: String,
            results: HashMap<usize, IntermediateResult>,
        }

        struct SortedPageResult {
            top_score: f32,
            title: String,
            results: Vec<(usize, IntermediateResult)>,
        }

        // page URL => PageResult
        let mut results = HashMap::<String, PageResult>::new();

        let token_count = tokens.len();

        println!("Tokens: {:?}", tokens);

        for token in tokens {
            if let Some(entries) = self.index.get(&token) {
                for entry in entries {
                    let doc = &self.docs[entry.doc_index];
                    if let Some(page_result) = results.get_mut(&doc.page_url) {
                        if let Some(intermediate_result) =
                            page_result.results.get_mut(&entry.doc_index)
                        {
                            intermediate_result.entries.push(*entry);
                            intermediate_result.score += entry.score;
                            page_result.top_score =
                                page_result.top_score.max(intermediate_result.score);
                        } else {
                            let intermediate_result = IntermediateResult {
                                score: entry.score,
                                entries: vec![*entry],
                            };
                            page_result.top_score =
                                page_result.top_score.max(intermediate_result.score);
                            page_result
                                .results
                                .insert(entry.doc_index, intermediate_result);
                        }
                    } else {
                        let intermediate_result = IntermediateResult {
                            score: entry.score,
                            entries: vec![*entry],
                        };
                        let mut page_result = PageResult {
                            top_score: intermediate_result.score,
                            results: HashMap::new(),
                            title: doc.page_title.clone(),
                        };
                        page_result
                            .results
                            .insert(entry.doc_index, intermediate_result);
                        results.insert(doc.page_url.clone(), page_result);
                    }
                }
            }
        }

        let mut results: Vec<(String, SortedPageResult)> = results
            .into_iter()
            .map(|(url, page_result)| {
                let mut results: Vec<(usize, IntermediateResult)> =
                    page_result.results.into_iter().collect();
                let mut max_score = page_result.top_score;
                for (_, result) in results.iter_mut() {
                    if token_count > 1 && result.entries.len() == token_count {
                        result.score *= 2.0;
                        if max_score < result.score {
                            max_score = result.score;
                        }
                    }
                }

                results.sort_by(|a, b| b.1.score.partial_cmp(&a.1.score).unwrap());
                (
                    url,
                    SortedPageResult {
                        top_score: max_score,
                        results,
                        title: page_result.title,
                    },
                )
            })
            .collect();

        results.sort_by(|a, b| b.1.top_score.partial_cmp(&a.1.top_score).unwrap());

        let mut search_results = Vec::new();

        for (page_url, page_result) in results.into_iter().take(10) {
            search_results.push(PageSearchResult {
                url: page_url,
                title: page_result.title,
                results: page_result
                    .results
                    .iter()
                    .map(|(doc_id, intermediate_result)| {
                        let doc = &self.docs[*doc_id];
                        SearchResult {
                            doc: doc.clone(),
                            score: intermediate_result.score,
                            term_positions: intermediate_result
                                .entries
                                .iter()
                                .map(|e| (e.start, e.end))
                                .collect(),
                        }
                    })
                    .collect(),
            });
        }

        search_results
    }

    pub fn print_stats(&self) {
        let mut words: Vec<(String, usize)> = self
            .index
            .iter()
            .map(|(word, entries)| (word.clone(), entries.len()))
            .collect();
        words.sort_by(|a, b| b.1.cmp(&a.1));
        println!("Most common words:");
        for (word, count) in words.iter().take(10) {
            println!("  {}: {}", word, count);
        }
    }

    pub fn bulk_add_docs(&mut self, docs: Vec<Doc>) {
        self.docs.extend(docs);
    }

    pub fn bulk_add_index_entries(&mut self, entries: Vec<(String, Vec<IndexEntry>)>) {
        for (word, entries) in entries {
            if let Some(existing_entries) = self.index.get_mut(&word) {
                existing_entries.extend(entries);
            } else {
                self.index.insert(word, entries);
            }
        }
    }
}

#[cfg(test)]
mod test {

    // use crate::test_utils::print_results;

    use super::*;
    // use colored::*;

    #[test]
    fn test_tokenize() {
        let input = "World Computer is our future / Blockchain Singularity\nBlockchain Singularity Today, Web3 really runs on Big Tech's cloud. Blockchains can host tokens, but only tiny amounts of data and compute, and no web. Tomorrow, blockchains will host it all, and fully decentralize everything, from simple dApps, to billion-user social networks, the metaverse, streaming, games, orderbook exchanges, and enterprise systems. It's already happening at scale on the first true World Computer: Internet Computer #ICP Join the movement. Internet Computer basics Internet Computer capabilties Wiki history of the Internet Computer.";

        let index = Index::with_stop_words(&["a".to_owned(), "the".to_owned(), "is".to_owned()]);
        let tokens = index.tokenize(input);

        println!("Input: {}", input);
        println!("Tokens: {:?}", tokens);
    }

    #[test]
    fn test_token_positions() {
        let input = "World Computer is our future / Blockchain Singularity\nBlockchain Singularity Today, Web3 really runs on Big Tech's cloud. Blockchains can host tokens, but only tiny amounts of data and compute, and no web. Tomorrow, blockchains will host it all, and fully decentralize everything, from simple dApps, to billion-user social networks, the metaverse, streaming, games, orderbook exchanges, and enterprise systems. It's already happening at scale on the first true World Computer: Internet Computer #ICP Join the movement. Internet Computer basics Internet Computer capabilties Wiki history of the Internet Computer.";
        let index = Index::with_stop_words(&[]);

        let tokens = index.tokenize(input);
        let positions = Index::get_token_positions(input);

        assert_eq!(tokens.len(), positions.len());
    }

    #[test]
    fn test_get_token_positions() {
        let input = "World Computer is our future / Blockchain Singularity\nBlockchain Singularity Today, Web3 really runs on Big Tech's cloud. Blockchains can host tokens, but only tiny amounts of data and compute, and no web. Tomorrow, blockchains will host it all, and fully decentralize everything, from simple dApps, to billion-user social networks, the metaverse, streaming, games, orderbook exchanges, and enterprise systems. It's already happening at scale on the first true World Computer: Internet Computer #ICP Join the movement. Internet Computer basics Internet Computer capabilties Wiki history of the Internet Computer.";

        let positions = Index::get_token_positions(input);

        for (start, end) in positions {
            println!(
                "{}**{}**{}",
                &input[..start],
                &input[start..end],
                &input[end..]
            );
        }
    }

    #[test]
    fn test_generate_partial_tokens() {
        let tokens = Index::generate_partial_tokens("helloこんにちは", 3);

        for token in tokens {
            println!("{}", token);
        }
    }
    #[test]
    fn test_partial_tokens() {
        let mut index =
            Index::with_stop_words(&["a".to_owned(), "the".to_owned(), "is".to_owned()]);
        let input = "\"Financial freedom\" is the ability to live one's life on their own terms.";

        index.index_doc(Doc {
            id: 1,
            title: "Financial Freedom".to_string(),
            body: input.to_string(),
            url: "https://www.example.com".to_string(),
            excerpt: "Financial Freedom".to_string(),
            page_title: "Financial Freedom".to_string(),
            title_len: 0,
            page_title_len: 0,
            page_url: "".to_string(),
        });

        let results = index.search("abil");

        assert!(results.len() == 1);

        // println!("{:?}", index.index);

        // let results = index.search("abil");

        // print_results(&results);
    }
}
