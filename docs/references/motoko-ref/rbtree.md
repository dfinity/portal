# RBTree

Red-Black Trees

## Color

``` motoko
type Color = {#R; #B}
```

Node color: red or black.

## Tree

``` motoko
type Tree<X, Y> = {#node : (Color, Tree<X, Y>, (X, ?Y), Tree<X, Y>); #leaf}
```

Ordered, (red-black) tree of entries.

## RBTree

``` motoko
class RBTree<X, Y>(compareTo : (X, X) -> O.Order)
```

Create an order map from an order function for its keys.

### share

``` motoko
func share() : Tree<X, Y>
```

Tree as sharable data.

Get non-OO, purely-functional representation: for drawing, pretty-printing and non-OO contexts (e.g., async args and results):

### get

``` motoko
func get(x : X) : ?Y
```

Get the value associated with a given key.

### replace

``` motoko
func replace(x : X, y : Y) : ?Y
```

Replace the value associated with a given key.

### put

``` motoko
func put(x : X, y : Y)
```

Put an entry: A value associated with a given key.

### delete

``` motoko
func delete(x : X)
```

Delete the entry associated with a given key.

### remove

``` motoko
func remove(x : X) : ?Y
```

Remove the entry associated with a given key.

### entries

``` motoko
func entries() : I.Iter<(X, Y)>
```

An iterator for the key-value entries of the map, in ascending key order.

iterator is persistent, like the tree itself

### entriesRev

``` motoko
func entriesRev() : I.Iter<(X, Y)>
```

An iterator for the key-value entries of the map, in descending key order.

iterator is persistent, like the tree itself

## iter

``` motoko
func iter<X, Y>(t : Tree<X, Y>, dir : {#fwd; #bwd}) : I.Iter<(X, Y)>
```

An iterator for the entries of the map, in ascending (`#fwd`) or descending (`#bwd`) order.

## size

``` motoko
func size<X, Y>(t : Tree<X, Y>) : Nat
```

The size of the tree as the number of key-value entries.
