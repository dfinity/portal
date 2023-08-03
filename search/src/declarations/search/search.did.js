export const idlFactory = ({ IDL }) => {
  const Doc = IDL.Record({
    'id' : IDL.Nat64,
    'url' : IDL.Text,
    'title' : IDL.Text,
    'body' : IDL.Text,
    'page_url' : IDL.Text,
    'title_len' : IDL.Nat64,
    'page_title' : IDL.Text,
    'excerpt' : IDL.Text,
    'page_title_len' : IDL.Nat64,
  });
  const SearchResult = IDL.Record({
    'doc' : Doc,
    'term_positions' : IDL.Vec(IDL.Tuple(IDL.Nat64, IDL.Nat64)),
    'score' : IDL.Float32,
  });
  const PageSearchResult = IDL.Record({
    'url' : IDL.Text,
    'title' : IDL.Text,
    'results' : IDL.Vec(SearchResult),
  });
  const IndexEntry = IDL.Record({
    'end' : IDL.Nat64,
    'doc_index' : IDL.Nat64,
    'word_index' : IDL.Nat64,
    'count' : IDL.Nat64,
    'score' : IDL.Float32,
    'start' : IDL.Nat64,
  });
  return IDL.Service({
    'commit_upload' : IDL.Func([], [], []),
    'get_admins' : IDL.Func([], [IDL.Vec(IDL.Principal)], ['query']),
    'query' : IDL.Func([IDL.Text], [IDL.Vec(PageSearchResult)], ['query']),
    'set_stop_words' : IDL.Func([IDL.Vec(IDL.Text)], [], []),
    'start_upload' : IDL.Func([], [], []),
    'upload_index_documents' : IDL.Func([IDL.Vec(Doc)], [], []),
    'upload_index_entries' : IDL.Func(
        [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Vec(IndexEntry)))],
        [],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
