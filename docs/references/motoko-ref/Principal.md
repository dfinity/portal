# Principal

IC principals (user and canister smart contract IDs)

## Principal

``` motoko
type Principal = Prim.Types.Principal
```

Internet Computer principal identifiers. Convert to `Blob` for access to bytes.

## fromActor

``` motoko
let fromActor : (a : actor {  }) -> Principal
```

Conversion.

## toBlob

``` motoko
let toBlob : (p : Principal) -> Blob
```

Conversion.

## fromBlob

``` motoko
let fromBlob : (b : Blob) -> Principal
```

Conversion.

## toText

``` motoko
func toText(p : Principal) : Text
```

Conversion.

## isAnonymous

``` motoko
func isAnonymous(p : Principal) : Bool
```

## hash

``` motoko
func hash(principal : Principal) : Hash.Hash
```

## fromText

``` motoko
func fromText(t : Text) : Principal
```

## equal

``` motoko
func equal(x : Principal, y : Principal) : Bool
```

Returns `x == y`.

## notEqual

``` motoko
func notEqual(x : Principal, y : Principal) : Bool
```

Returns `x != y`.

## less

``` motoko
func less(x : Principal, y : Principal) : Bool
```

Returns `x < y`.

## lessOrEqual

``` motoko
func lessOrEqual(x : Principal, y : Principal) : Bool
```

Returns `x ⇐ y`.

## greater

``` motoko
func greater(x : Principal, y : Principal) : Bool
```

Returns `x > y`.

## greaterOrEqual

``` motoko
func greaterOrEqual(x : Principal, y : Principal) : Bool
```

Returns `x >= y`.

## compare

``` motoko
func compare(x : Principal, y : Principal) : {#less; #equal; #greater}
```

Returns the order of `x` and `y`.
