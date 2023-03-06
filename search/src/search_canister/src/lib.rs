use candid::{candid_method, export_service};
use ic_cdk::trap;
use search::{Doc, Index, IndexEntry, PageSearchResult};
use std::cell::RefCell;

thread_local! {
    static INDEX: RefCell<Index> = RefCell::new(Index::new());
    static UPLOADED_INDEX: RefCell<Option<Index>> = RefCell::new(None);
}

#[candid_method(query)]
#[ic_cdk_macros::query]
fn query(term: String) -> Vec<PageSearchResult> {
    INDEX.with(|index| {
        index
            .borrow()
            .search(&term)
            .into_iter()
            .take(10)
            .collect::<Vec<_>>()
    })
}

#[candid_method(update)]
#[ic_cdk_macros::update]
async fn start_upload() {
    UPLOADED_INDEX.with(|state| {
        *state.borrow_mut() = Some(Index::new());
    });
}

#[candid_method(update)]
#[ic_cdk_macros::update]
async fn commit_upload() {
    INDEX.with(|existing_index| {
        *existing_index.borrow_mut() = match UPLOADED_INDEX.with(|state| state.borrow_mut().take())
        {
            Some(index) => index,
            None => trap("Upload not in progress"),
        };
    });
}

#[candid_method(update)]
#[ic_cdk_macros::update]
async fn set_stop_words(docs: Vec<String>) {
    UPLOADED_INDEX.with(|state| match &mut *state.borrow_mut() {
        Some(index) => index.set_stop_words(&docs),
        _ => trap("Upload not in progress"),
    });
}

#[candid_method(update)]
#[ic_cdk_macros::update]
async fn upload_index_documents(docs: Vec<Doc>) {
    UPLOADED_INDEX.with(|state| match &mut *state.borrow_mut() {
        Some(index) => index.bulk_add_docs(docs),
        _ => trap("Upload not in progress"),
    });
}

#[candid_method(update)]
#[ic_cdk_macros::update]
async fn upload_index_entries(entries: Vec<(String, Vec<IndexEntry>)>) {
    UPLOADED_INDEX.with(|state| match &mut *state.borrow_mut() {
        Some(index) => index.bulk_add_index_entries(entries),
        _ => trap("Upload not in progress"),
    });
}

#[ic_cdk_macros::query(name = "__get_candid_interface_tmp_hack")]
fn export_candid() -> String {
    export_service!();
    __export_service()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn save_candid() {
        use std::fs::write;

        write("./candid.did", export_candid()).expect("Write failed.");
    }
}
