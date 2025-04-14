# TrieSet
Functional set

Sets are partial maps from element type to unit type,
i.e., the partial map represents the set with its domain.

LIMITATIONS: This data structure allows at most MAX_LEAF_SIZE=8 hash collisions:
attempts to insert more than MAX_LEAF_SIZE elements (whether directly via `put` or indirectly via other operations) with the same hash value will trap.
This limitation is inherited from the underlying `Trie` data structure.

## Type `Hash`
``` motoko no-repl
type Hash = Hash.Hash
```


## Type `Set`
``` motoko no-repl
type Set<T> = Trie.Trie<T, ()>
```


## Function `empty`
``` motoko no-repl
func empty<T>() : Set<T>
```

Empty set.

## Function `put`
``` motoko no-repl
func put<T>(s : Set<T>, x : T, xh : Hash, eq : (T, T) -> Bool) : Set<T>
```

Put an element into the set.

## Function `delete`
``` motoko no-repl
func delete<T>(s : Set<T>, x : T, xh : Hash, eq : (T, T) -> Bool) : Set<T>
```

Delete an element from the set.

## Function `equal`
``` motoko no-repl
func equal<T>(s1 : Set<T>, s2 : Set<T>, eq : (T, T) -> Bool) : Bool
```

Test if two sets are equal.

## Function `size`
``` motoko no-repl
func size<T>(s : Set<T>) : Nat
```

The number of set elements, set's cardinality.

## Function `isEmpty`
``` motoko no-repl
func isEmpty<T>(s : Set<T>) : Bool
```

Test if `s` is the empty set.

## Function `isSubset`
``` motoko no-repl
func isSubset<T>(s1 : Set<T>, s2 : Set<T>, eq : (T, T) -> Bool) : Bool
```

Test if `s1` is a subset of `s2`.

## Function `mem`
``` motoko no-repl
func mem<T>(s : Set<T>, x : T, xh : Hash, eq : (T, T) -> Bool) : Bool
```

@deprecated: use `TrieSet.contains()`

Test if a set contains a given element.

## Function `contains`
``` motoko no-repl
func contains<T>(s : Set<T>, x : T, xh : Hash, eq : (T, T) -> Bool) : Bool
```

Test if a set contains a given element.

## Function `union`
``` motoko no-repl
func union<T>(s1 : Set<T>, s2 : Set<T>, eq : (T, T) -> Bool) : Set<T>
```

[Set union](https://en.wikipedia.org/wiki/Union_(set_theory)).

## Function `diff`
``` motoko no-repl
func diff<T>(s1 : Set<T>, s2 : Set<T>, eq : (T, T) -> Bool) : Set<T>
```

[Set difference](https://en.wikipedia.org/wiki/Difference_(set_theory)).

## Function `intersect`
``` motoko no-repl
func intersect<T>(s1 : Set<T>, s2 : Set<T>, eq : (T, T) -> Bool) : Set<T>
```

[Set intersection](https://en.wikipedia.org/wiki/Intersection_(set_theory)).

## Function `fromArray`
``` motoko no-repl
func fromArray<T>(arr : [T], elemHash : T -> Hash, eq : (T, T) -> Bool) : Set<T>
```


## Function `toArray`
``` motoko no-repl
func toArray<T>(s : Set<T>) : [T]
```

