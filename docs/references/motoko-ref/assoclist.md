# AssocList

Lists of key-value entries ("associations").

Implements the same operations as library `Trie`, but uses a linked-list of entries and no hashing.

## AssocList

``` motoko
type AssocList<K, V> = List.List<(K, V)>
```

polymorphic association linked lists between keys and values

## find

``` motoko
func find<K, V>(al : AssocList<K, V>, k : K, k_eq : (K, K) -> Bool) : ?V
```

Find the value associated with a given key, or null if absent.

## replace

``` motoko
func replace<K, V>(al : AssocList<K, V>, k : K, k_eq : (K, K) -> Bool, ov : ?V) : (AssocList<K, V>, ?V)
```

replace the value associated with a given key, or add it, if missing. returns old value, or null, if no prior value existed.

## diff

``` motoko
func diff<K, V, W>(al1 : AssocList<K, V>, al2 : AssocList<K, W>, keq : (K, K) -> Bool) : AssocList<K, V>
```

The entries of the final list consist of those pairs of the left list whose keys are not present in the right list; the "extra" values of the right list are irrelevant.

## mapAppend

``` motoko
func mapAppend<K, V, W, X>(al1 : AssocList<K, V>, al2 : AssocList<K, W>, vbin : (?V, ?W) -> X) : AssocList<K, X>
```

Transform and combine the entries of two association lists.

## disjDisjoint

``` motoko
func disjDisjoint<K, V, W, X>(al1 : AssocList<K, V>, al2 : AssocList<K, W>, vbin : (?V, ?W) -> X) : AssocList<K, X>
```

Specialized version of `disj`, optimized for disjoint sub-spaces of keyspace (no matching keys).

## disj

``` motoko
func disj<K, V, W, X>(al1 : AssocList<K, V>, al2 : AssocList<K, W>, keq : (K, K) -> Bool, vbin : (?V, ?W) -> X) : AssocList<K, X>
```

This operation generalizes the notion of "set union" to finite maps. Produces a "disjunctive image" of the two lists, where the values of matching keys are combined with the given binary operator.

For unmatched entries, the operator is still applied to create the value in the image. To accomodate these various situations, the operator accepts optional values, but is never applied to (null, null).

## join

``` motoko
func join<K, V, W, X>(al1 : AssocList<K, V>, al2 : AssocList<K, W>, keq : (K, K) -> Bool, vbin : (V, W) -> X) : AssocList<K, X>
```

This operation generalizes the notion of "set intersection" to finite maps. Produces a "conjuctive image" of the two lists, where the values of matching keys are combined with the given binary operator, and unmatched entries are not present in the output.

## fold

``` motoko
func fold<K, V, X>(al : AssocList<K, V>, nil : X, cons : (K, V, X) -> X) : X
```

Fold the entries based on the recursive list structure.
