# TrieMap

Key-value hash maps.

An imperative hash map, with a general key and value type.

-   The `class` `TrieMap` exposes the same interface as `HashMap`.

-   Unlike HashMap, the internal representation uses a functional representation (via `Trie` module).

-   This class does not permit a direct `clone` operation (neither does `HashMap`), but it does permit creating iterators via `iter()`. Each iterator costs `O(1)` to create, but represents a fixed view of the mapping that does not interfere with mutations (it will *not* reflect subsequent insertions or mutations, if any).

## TrieMap

``` motoko
class TrieMap<K, V>(isEq : (K, K) -> Bool, hashOf : K -> Hash.Hash)
```

### size

``` motoko
func size() : Nat
```

Returns the number of entries in the map.

### put

``` motoko
func put(k : K, v : V)
```

Associate a key and value, overwriting any prior association for the key.

### replace

``` motoko
func replace(k : K, v : V) : ?V
```

Put the key and value, *and* return the (optional) prior value for the key.

### get

``` motoko
func get(k : K) : ?V
```

Get the (optional) value associated with the given key.

### delete

``` motoko
func delete(k : K)
```

Delete the (optional) value associated with the given key.

### remove

``` motoko
func remove(k : K) : ?V
```

Delete and return the (optional) value associated with the given key.

### keys

``` motoko
func keys() : I.Iter<K>
```

An `Iter` over the keys.

Each iterator gets a *persistent view* of the mapping, independent of concurrent updates to the iterated map.

### vals

``` motoko
func vals() : I.Iter<V>
```

An `Iter` over the values.

Each iterator gets a *persistent view* of the mapping, independent of concurrent updates to the iterated map.

### entries

``` motoko
func entries() : I.Iter<(K, V)>
```

Returns an `Iter` over the entries.

Each iterator gets a *persistent view* of the mapping, independent of concurrent updates to the iterated map.

## clone

``` motoko
func clone<K, V>(h : TrieMap<K, V>, keyEq : (K, K) -> Bool, keyHash : K -> Hash.Hash) : TrieMap<K, V>
```

Clone the map, given its key operations.

## fromEntries

``` motoko
func fromEntries<K, V>(entries : I.Iter<(K, V)>, keyEq : (K, K) -> Bool, keyHash : K -> Hash.Hash) : TrieMap<K, V>
```

Clone an iterator of key-value pairs.

## map

``` motoko
func map<K, V1, V2>(h : TrieMap<K, V1>, keyEq : (K, K) -> Bool, keyHash : K -> Hash.Hash, mapFn : (K, V1) -> V2) : TrieMap<K, V2>
```

Transform (map) the values of a map, retaining its keys.

## mapFilter

``` motoko
func mapFilter<K, V1, V2>(h : TrieMap<K, V1>, keyEq : (K, K) -> Bool, keyHash : K -> Hash.Hash, mapFn : (K, V1) -> ?V2) : TrieMap<K, V2>
```

Transform and filter the values of a map, retaining its keys.
