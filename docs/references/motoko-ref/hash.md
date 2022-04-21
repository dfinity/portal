# Hash

Hash values

## Hash

``` motoko
type Hash = Nat32
```

Hash values represent a string of *hash bits*, packed into a `Nat32`.

## length

``` motoko
let length : Nat
```

The hash length, always 31.

## bit

``` motoko
func bit(h : Hash, pos : Nat) : Bool
```

Project a given bit from the bit vector.

## equal

``` motoko
func equal(ha : Hash, hb : Hash) : Bool
```

Test if two hashes are equal

## hash

``` motoko
func hash(i : Nat) : Hash
```

## debugPrintBits

``` motoko
func debugPrintBits(bits : Hash)
```

## debugPrintBitsRev

``` motoko
func debugPrintBitsRev(bits : Hash)
```

## hashNat8

``` motoko
func hashNat8(key : [Hash]) : Hash
```

Jenkin’s one at a time:

<https://en.wikipedia.org/wiki/Jenkins_hash_function#one_at_a_time>

The input type should actually be `[Nat8]`. Note: Be sure to explode each `Nat8` of a `Nat32` into its own `Nat32`, and to shift into lower 8 bits.
