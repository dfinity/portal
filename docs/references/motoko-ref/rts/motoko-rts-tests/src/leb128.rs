use motoko_rts::buf::Buf;
use motoko_rts::leb128::{
    leb128_decode_checked, leb128_encode, sleb128_decode_checked, sleb128_encode,
};

use proptest::test_runner::{Config, TestCaseError, TestCaseResult, TestRunner};

pub unsafe fn test() {
    println!("Testing (s)leb128 encode-decode roundtrip ...");

    let mut proptest_runner = TestRunner::new(Config {
        cases: 10_000,
        failure_persistence: None,
        ..Default::default()
    });

    roundtrip_signed(1).unwrap();
    roundtrip_signed(0).unwrap();
    roundtrip_signed(-1).unwrap();
    roundtrip_signed(i32::MIN).unwrap(); // -2147483648
    roundtrip_signed(i32::MAX).unwrap(); // 2147483647

    proptest_runner
        .run(&proptest::num::i32::ANY, roundtrip_signed)
        .unwrap();

    roundtrip_unsigned(1).unwrap();
    roundtrip_unsigned(0).unwrap();
    roundtrip_unsigned(u32::MIN).unwrap();
    roundtrip_unsigned(u32::MAX).unwrap();

    proptest_runner
        .run(&proptest::num::u32::ANY, roundtrip_unsigned)
        .unwrap();

    // Check overflows
    check_signed_decode_overflow(&[
        0b1111_1111,
        0b1111_1111,
        0b1111_1111,
        0b1111_1111,
        0b0111_0111,
    ]); // i32::MIN - 1

    check_signed_decode_overflow(&[
        0b1000_0000,
        0b1000_0000,
        0b1000_0000,
        0b1000_0000,
        0b0000_1000,
    ]); // i32::MAX + 1

    check_unsigned_decode_overflow(&[
        0b1000_0000,
        0b1000_0000,
        0b1000_0000,
        0b1000_0000,
        0b0001_0000,
    ]); // u32::MAX + 1
}

fn roundtrip_signed(val: i32) -> TestCaseResult {
    unsafe {
        let mut buf = [0u8; 100];
        sleb128_encode(val, buf.as_mut_ptr());

        let mut buf_ = Buf {
            ptr: buf.as_mut_ptr(),
            end: buf.as_mut_ptr().add(100),
        };

        match sleb128_decode_checked(&mut buf_) {
            None => Err(TestCaseError::Fail(
                format!("sleb128 decoding of {} overflowed", val).into(),
            )),
            Some(val_) => {
                if val_ == val {
                    Ok(())
                } else {
                    Err(TestCaseError::Fail(
                        format!("Encode-decode roundtrip gives different value for {}", val).into(),
                    ))
                }
            }
        }
    }
}

fn roundtrip_unsigned(val: u32) -> TestCaseResult {
    unsafe {
        let mut buf = [0u8; 100];
        leb128_encode(val, buf.as_mut_ptr());

        let mut buf_ = Buf {
            ptr: buf.as_mut_ptr(),
            end: buf.as_mut_ptr().add(100),
        };

        match leb128_decode_checked(&mut buf_) {
            None => Err(TestCaseError::Fail(
                format!("leb128 decoding of {} overflowed", val).into(),
            )),
            Some(val_) => {
                if val_ == val {
                    Ok(())
                } else {
                    Err(TestCaseError::Fail(
                        format!("Encode-decode roundtrip gives different value for {}", val).into(),
                    ))
                }
            }
        }
    }
}

unsafe fn check_signed_decode_overflow(buf: &[u8]) {
    let mut buf_ = Buf {
        ptr: buf.as_ptr() as *mut _,
        end: buf.as_ptr().add(buf.len()) as *mut _,
    };

    assert_eq!(sleb128_decode_checked(&mut buf_), None);
}

unsafe fn check_unsigned_decode_overflow(buf: &[u8]) {
    let mut buf_ = Buf {
        ptr: buf.as_ptr() as *mut _,
        end: buf.as_ptr().add(buf.len()) as *mut _,
    };

    assert_eq!(leb128_decode_checked(&mut buf_), None);
}
