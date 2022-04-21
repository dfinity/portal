# Buffer

Generic, extensible buffers

Generic, mutable sequences that grow to accommodate arbitrary numbers of elements.

Class `Buffer<X>` provides extensible, mutable sequences of elements of type `X`. that can be efficiently produced and consumed with imperative code. A buffer object can be extended by a single element or the contents of another buffer object.

When required, the current state of a buffer object can be converted to a fixed-size array of its elements.

Buffers complement Motoko’s non-extensible array types (arrays do not support efficient extension, because the size of an array is determined at construction and cannot be changed).

## Buffer

``` motoko
class Buffer<X>(initCapacity : Nat)
```

Create a stateful buffer class encapsulating a mutable array.

The argument `initCapacity` determines its initial capacity. The underlying mutable array grows by doubling when its current capacity is exceeded.

### add

``` motoko
func add(elem : X)
```

Adds a single element to the buffer.

### removeLast

``` motoko
func removeLast() : ?X
```

Removes the item that was inserted last and returns it or `null` if no elements had been added to the Buffer.

### append

``` motoko
func append(b : Buffer<X>)
```

Adds all elements in buffer `b` to this buffer.

### size

``` motoko
func size() : Nat
```

Returns the current number of elements.

### clear

``` motoko
func clear()
```

Resets the buffer.

### clone

``` motoko
func clone() : Buffer<X>
```

Returns a copy of this buffer.

### vals

``` motoko
func vals() : { next : () -> ?X }
```

Returns an `Iter` over the elements of this buffer.

### toArray

``` motoko
func toArray() : [X]
```

Creates a new array containing this buffer’s elements.

### toVarArray

``` motoko
func toVarArray() : [var X]
```

Creates a mutable array containing this buffer’s elements.

### get

``` motoko
func get(i : Nat) : X
```

Gets the `i`-th element of this buffer. Traps if `i >= count`. Indexing is zero-based.

### getOpt

``` motoko
func getOpt(i : Nat) : ?X
```

Gets the `i`-th element of the buffer as an option. Returns `null` when `i >= count`. Indexing is zero-based.

### put

``` motoko
func put(i : Nat, elem : X)
```

Overwrites the current value of the `i`-entry of this buffer with `elem`. Traps if the index is out of bounds. Indexing is zero-based.
