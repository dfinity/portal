# Blob

Binary blobs

## Blob

``` motoko
type Blob = Prim.Types.Blob
```

An immutable, possibly empty sequence of bytes. Given `b : Blob`:

-   `b.size() : Nat` returns the number of bytes in the blob;

-   `b.vals() : Iter.Iter<Nat8>` returns an iterator to enumerate the bytes of the blob.

(Direct indexing of Blobs is not yet supported.)

## hash

``` motoko
let hash : (b : Blob) -> Nat32
```

Returns a (non-cryptographic) hash of 'b'

## equal

``` motoko
func equal(x : Blob, y : Blob) : Bool
```

Returns `x == y`.

## notEqual

``` motoko
func notEqual(x : Blob, y : Blob) : Bool
```

Returns `x != y`.

## less

``` motoko
func less(x : Blob, y : Blob) : Bool
```

Returns `x < y`.

## lessOrEqual

``` motoko
func lessOrEqual(x : Blob, y : Blob) : Bool
```

Returns `x ⇐ y`.

## greater

``` motoko
func greater(x : Blob, y : Blob) : Bool
```

Returns `x > y`.

## greaterOrEqual

``` motoko
func greaterOrEqual(x : Blob, y : Blob) : Bool
```

Returns `x >= y`.

## compare

``` motoko
func compare(x : Blob, y : Blob) : {#less; #equal; #greater}
```

Returns the order of `x` and `y`.

## fromArray

``` motoko
let fromArray : [Nat8] -> Blob
```

Creates a blob from an array of bytes, by copying each element.

## fromArrayMut

``` motoko
let fromArrayMut : [var Nat8] -> Blob
```

Creates a blob from a mutable array of bytes, by copying each element.

## toArray

``` motoko
let toArray : Blob -> [Nat8]
```

Creates an array of bytes from a blob, by copying each element.

## toArrayMut

``` motoko
let toArrayMut : Blob -> [var Nat8]
```

Creates a mutable array of bytes from a blob, by copying each element.
