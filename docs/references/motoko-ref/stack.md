# Stack

Stack collection (LIFO discipline).

Minimal LIFO (last in first out) implementation, as a class. See library `Deque` for mixed LIFO/FIFO behavior.

## Stack

``` motoko
class Stack<T>()
```

### push

``` motoko
func push(x : T)
```

Push an element on the top of the stack.

### isEmpty

``` motoko
func isEmpty() : Bool
```

True when the stack is empty.

### peek

``` motoko
func peek() : ?T
```

Return and retain the top element, or return null.

### pop

``` motoko
func pop() : ?T
```

Remove and return the top element, or return null.
