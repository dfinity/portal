# TrieSet

Functional set

Sets are partial maps from element type to unit type, i.e., the partial map represents the set with its domain.

## Hash

``` motoko
type Hash = Hash.Hash
```

## Set

``` motoko
type Set<T> = Trie.Trie<T, ()>
```

## empty

``` motoko
func empty<T>() : Set<T>
```

Empty set.

## put

``` motoko
func put<T>(s : Set<T>, x : T, xh : Hash, eq : (T, T) -> Bool) : Set<T>
```

Put an element into the set.

## delete

``` motoko
func delete<T>(s : Set<T>, x : T, xh : Hash, eq : (T, T) -> Bool) : Set<T>
```

Delete an element from the set.

## equal

``` motoko
func equal<T>(s1 : Set<T>, s2 : Set<T>, eq : (T, T) -> Bool) : Bool
```

Test if two sets are equal.

## size

``` motoko
func size<T>(s : Set<T>) : Nat
```

The number of set elements, set’s cardinality.

## mem

``` motoko
func mem<T>(s : Set<T>, x : T, xh : Hash, eq : (T, T) -> Bool) : Bool
```

Test if a set contains a given element.

## union

``` motoko
func union<T>(s1 : Set<T>, s2 : Set<T>, eq : (T, T) -> Bool) : Set<T>
```

\[Set union\](<https://en.wikipedia.org/wiki/Union_(set_theory)>).

## diff

``` motoko
func diff<T>(s1 : Set<T>, s2 : Set<T>, eq : (T, T) -> Bool) : Set<T>
```

\[Set difference\](<https://en.wikipedia.org/wiki/Difference_(set_theory)>).

## intersect

``` motoko
func intersect<T>(s1 : Set<T>, s2 : Set<T>, eq : (T, T) -> Bool) : Set<T>
```

\[Set intersection\](<https://en.wikipedia.org/wiki/Intersection_(set_theory)>).

## fromArray

``` motoko
func fromArray<T>(arr : [T], elemHash : T -> Hash, eq : (T, T) -> Bool) : Set<T>
```

## toArray

``` motoko
func toArray<T>(s : Set<T>) : [T]
```
