# Deque

Functions for persistent, double-ended queues.

## Deque

``` motoko
type Deque<T> = (List<T>, List<T>)
```

Double-ended queue

## empty

``` motoko
func empty<T>() : Deque<T>
```

Empty queue

## isEmpty

``` motoko
func isEmpty<T>(q : Deque<T>) : Bool
```

True when the queue is empty

## pushFront

``` motoko
func pushFront<T>(q : Deque<T>, x : T) : Deque<T>
```

Insert a new element on the front end of the queue

## peekFront

``` motoko
func peekFront<T>(q : Deque<T>) : ?T
```

Inspect the (optional) first element on the front end of the queue

## popFront

``` motoko
func popFront<T>(q : Deque<T>) : ?(T, Deque<T>)
```

Remove the first element on the front end of the queue; Returns null when empty.

## pushBack

``` motoko
func pushBack<T>(q : Deque<T>, x : T) : Deque<T>
```

Insert a new element on the back end of the queue

## peekBack

``` motoko
func peekBack<T>(q : Deque<T>) : ?T
```

Inspect the (optional) first element on the back end of the queue

## popBack

``` motoko
func popBack<T>(q : Deque<T>) : ?(Deque<T>, T)
```

Remove the first element on the back end of the queue; Returns null when empty.
