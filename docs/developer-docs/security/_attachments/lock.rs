use std::cell::RefCell;
use std::cmp::Ord;
use std::collections::BTreeSet;
use std::rc::Rc;

pub struct State<T: Ord> {
    pending_requests: BTreeSet<T>,
}

impl<T: Ord> Default for State<T> {
    fn default() -> Self {
        Self {
            pending_requests: BTreeSet::new(),
        }
    }
}

pub struct CallerGuard<T: Ord> {
    /// We use `Rc` and `RefCell` here as we need both multiple owners (every lock is an owner) and mutable borrows for the state (updating the state after releasing the lock).
    state: Rc<RefCell<State<T>>>,
    lock: T,
}

impl<T: Clone + Ord> CallerGuard<T> {
    pub fn new(state: Rc<RefCell<State<T>>>, lock: T) -> Option<Self> {
        {
            let pending_requests = &mut state.borrow_mut().pending_requests;
            if pending_requests.contains(&lock) {
                return None;
            }
            pending_requests.insert(lock.clone());
        }
        Some(Self { state, lock })
    }
}

impl<T: Ord> Drop for CallerGuard<T> {
    fn drop(&mut self) {
        self.state.borrow_mut().pending_requests.remove(&self.lock);
    }
}
