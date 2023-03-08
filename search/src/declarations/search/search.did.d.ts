import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Doc {
  'id' : bigint,
  'url' : string,
  'title' : string,
  'body' : string,
  'page_url' : string,
  'title_len' : bigint,
  'page_title' : string,
  'excerpt' : string,
  'page_title_len' : bigint,
}
export interface IndexEntry {
  'end' : bigint,
  'doc_index' : bigint,
  'word_index' : bigint,
  'count' : bigint,
  'score' : number,
  'start' : bigint,
}
export interface PageSearchResult {
  'url' : string,
  'title' : string,
  'results' : Array<SearchResult>,
}
export interface SearchResult {
  'doc' : Doc,
  'term_positions' : Array<[bigint, bigint]>,
  'score' : number,
}
export interface _SERVICE {
  'commit_upload' : ActorMethod<[], undefined>,
  'get_admins' : ActorMethod<[], Array<Principal>>,
  'query' : ActorMethod<[string], Array<PageSearchResult>>,
  'set_stop_words' : ActorMethod<[Array<string>], undefined>,
  'start_upload' : ActorMethod<[], undefined>,
  'upload_index_documents' : ActorMethod<[Array<Doc>], undefined>,
  'upload_index_entries' : ActorMethod<
    [Array<[string, Array<IndexEntry>]>],
    undefined
  >,
}
