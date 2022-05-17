use crate::memory::TestMemory;

use motoko_rts::bigint::{self, *};
use motoko_rts::buf::Buf;
use motoko_rts::types::{Bytes, Value, Words};

// mp functions below are implemented separately for tests as we can't modify mp_int source code to
// pass a generic heap argument (then monomorphise it for IC).

// This global is used to pass a reference to heap to the mp functions
static mut HEAP: *mut TestMemory = std::ptr::null_mut();

#[no_mangle]
unsafe extern "C" fn mp_calloc(n_elems: usize, elem_size: Bytes<usize>) -> *mut libc::c_void {
    bigint::mp_calloc(&mut *HEAP, n_elems, elem_size)
}

#[no_mangle]
unsafe extern "C" fn mp_realloc(
    ptr: *mut libc::c_void,
    old_size: Bytes<u32>,
    new_size: Bytes<u32>,
) -> *mut libc::c_void {
    bigint::mp_realloc(&mut *HEAP, ptr, old_size, new_size)
}

pub unsafe fn test() {
    println!("Testing BigInt ...");

    // Not sure how much we will need in these tests but 1G should be enough
    let mut heap = TestMemory::new(Words(1024 * 1024));
    HEAP = &mut heap;

    assert!(bigint_eq(
        bigint_pow(bigint_of_word32(70), bigint_of_word32(32)),
        bigint_mul(
            bigint_pow(bigint_of_word32(70), bigint_of_word32(31)),
            bigint_of_word32(70)
        )
    ));

    //
    // (s)leb128 encoding
    //

    let one = bigint_of_word32(1);
    let two = bigint_of_word32(2);
    for i in 0..100 {
        let two_pow_i = bigint_pow(two, bigint_of_word32(i));
        let minus_one = bigint_sub(two_pow_i, one);
        let plus_one = bigint_add(two_pow_i, one);

        test_bigint_leb128(minus_one);
        test_bigint_leb128(two_pow_i);
        test_bigint_leb128(plus_one);

        test_bigint_sleb128(minus_one);
        test_bigint_sleb128(two_pow_i);
        test_bigint_sleb128(plus_one);
        test_bigint_sleb128(bigint_neg(minus_one));
        test_bigint_sleb128(bigint_neg(two_pow_i));
        test_bigint_sleb128(bigint_neg(plus_one));
    }

    HEAP = std::ptr::null_mut();
    drop(heap);
}

// Check leb128 encode/decode roundtrip
unsafe fn test_bigint_leb128(n: Value) {
    let mut buf = [0u8; 100];
    let s = bigint_leb128_size(n);
    let mut buf_ = Buf {
        ptr: buf.as_mut_ptr(),
        end: buf.as_mut_ptr().add(100),
    };
    bigint_leb128_encode(n, buf.as_mut_ptr());
    let n2 = bigint_leb128_decode(&mut buf_ as *mut _);
    assert!(bigint_eq(n, n2));
    assert_eq!(buf_.ptr.offset_from(buf.as_ptr()), s as isize);
}

// Check sleb128 encode/decode roundtrip
unsafe fn test_bigint_sleb128(n: Value) {
    let mut buf = [0u8; 100];
    let s = bigint_sleb128_size(n);
    bigint_sleb128_encode(n, buf.as_mut_ptr());
    let mut buf_ = Buf {
        ptr: buf.as_mut_ptr(),
        end: buf.as_mut_ptr().add(100),
    };
    let n2 = bigint_sleb128_decode(&mut buf_ as *mut _);
    assert!(bigint_eq(n, n2));
    assert_eq!(buf_.ptr.offset_from(buf.as_ptr()), s as isize);
}
