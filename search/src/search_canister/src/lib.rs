use candid::{candid_method, export_service, Principal};
use ic_cdk::trap;
use search::{Doc, Index, IndexEntry, PageSearchResult};
use std::cell::RefCell;

thread_local! {
    static INDEX: RefCell<Index> = RefCell::new(Index::new());
    static UPLOADED_INDEX: RefCell<Option<Index>> = RefCell::new(None);
    static ADMINS: RefCell<Vec<Principal>> = RefCell::new(vec![]);
}

fn is_admin() -> bool {
    ADMINS.with(|admins| {
        admins
            .borrow()
            .iter()
            .any(|admin| admin == &ic_cdk::caller())
    })
}

#[ic_cdk::init]
fn init() {
    ADMINS.with(|admins| {
        admins.borrow_mut().push(ic_cdk::caller());
    });
}

#[candid_method(query)]
#[ic_cdk::query]
fn get_admins() -> Vec<Principal> {
    ADMINS.with(|admins| admins.borrow().clone())
}

#[candid_method(update)]
#[ic_cdk::update]
fn add_admin(admin: Principal) {
    if !is_admin() {
        trap("Only admins can add admins");
    }
    ADMINS.with(|admins| {
        if admins.borrow().iter().any(|a| a == &admin) {
            trap("Admin already exists");
        }

        admins.borrow_mut().push(admin);
    });
}

#[candid_method(update)]
#[ic_cdk::update]
fn remove_admin(admin: Principal) {
    if !is_admin() {
        trap("Only admins can remove admins");
    }
    ADMINS.with(|admins| {
        admins.borrow_mut().retain(|a| a != &admin);
    });
}

#[candid_method(query)]
#[ic_cdk::query]
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
#[ic_cdk::update]
async fn start_upload() {
    if !is_admin() {
        trap("Only admins can start an upload");
    }
    UPLOADED_INDEX.with(|state| {
        *state.borrow_mut() = Some(Index::new());
    });
}

#[candid_method(update)]
#[ic_cdk::update]
async fn commit_upload() {
    if !is_admin() {
        trap("Only admins can commit an upload");
    }
    INDEX.with(|existing_index| {
        *existing_index.borrow_mut() = match UPLOADED_INDEX.with(|state| state.borrow_mut().take())
        {
            Some(index) => index,
            None => trap("Upload not in progress"),
        };
    });
}

#[candid_method(update)]
#[ic_cdk::update]
async fn set_stop_words(docs: Vec<String>) {
    if !is_admin() {
        trap("Only admins can set stop words");
    }
    UPLOADED_INDEX.with(|state| match &mut *state.borrow_mut() {
        Some(index) => index.set_stop_words(&docs),
        _ => trap("Upload not in progress"),
    });
}

#[candid_method(update)]
#[ic_cdk::update]
async fn upload_index_documents(docs: Vec<Doc>) {
    if !is_admin() {
        trap("Only admins can upload documents");
    }
    UPLOADED_INDEX.with(|state| match &mut *state.borrow_mut() {
        Some(index) => index.bulk_add_docs(docs),
        _ => trap("Upload not in progress"),
    });
}

#[candid_method(update)]
#[ic_cdk::update]
async fn upload_index_entries(entries: Vec<(String, Vec<IndexEntry>)>) {
    if !is_admin() {
        trap("Only admins can upload index entries");
    }
    UPLOADED_INDEX.with(|state| match &mut *state.borrow_mut() {
        Some(index) => index.bulk_add_index_entries(entries),
        _ => trap("Upload not in progress"),
    });
}

#[ic_cdk::pre_upgrade]
fn pre_upgrade() {
    let admins = ADMINS.with(|n| n.take());
    ic_cdk::storage::stable_save((admins,)).expect("Saving admins to stable store must succeed.");
}

#[ic_cdk::post_upgrade]
fn post_upgrade() {
    let mut admins = ic_cdk::storage::stable_restore::<(Vec<Principal>,)>()
        .expect("Failed to read admins from stable memory.")
        .0;

    if admins.is_empty() {
        admins.push(ic_cdk::caller());
    }

    ADMINS.with(|n| *n.borrow_mut() = admins);
}

#[ic_cdk::query(name = "__get_candid_interface_tmp_hack")]
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
