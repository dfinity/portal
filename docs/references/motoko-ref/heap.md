# Heap

Priority Queue

This module provides purely-functional priority queue based on leftist heap

## Tree

``` motoko
type Tree<T> = ?(Int, T, Tree<T>, Tree<T>)
```

## Heap

``` motoko
class Heap<T>(ord : (T, T) -> O.Order)
```

### share

``` motoko
func share() : Tree<T>
```

Get purely-functional representation

### unsafeUnshare

``` motoko
func unsafeUnshare(t : Tree<T>)
```

Put purely-functional representation into class. Need to make sure the tree is constructed with the same compare function

### put

``` motoko
func put(x : T)
```

Insert an element to the heap

### peekMin

``` motoko
func peekMin() : ?T
```

Return the minimal element

### deleteMin

``` motoko
func deleteMin()
```

Delete the minimal element

### removeMin

``` motoko
func removeMin() : ?T
```

Remove the minimal element and return its value

## fromIter

``` motoko
func fromIter<T>(iter : I.Iter<T>, ord : (T, T) -> O.Order) : Heap<T>
```

Convert iterator into a heap in O(N) time.
