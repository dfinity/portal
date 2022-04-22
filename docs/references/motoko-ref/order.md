# Order

Order

## Order

``` motoko
type Order = {#less; #equal; #greater}
```

A type to represent an order.

## isLess

``` motoko
func isLess(order : Order) : Bool
```

Check if an order is \#less.

## isEqual

``` motoko
func isEqual(order : Order) : Bool
```

Check if an order is \#equal.

## isGreater

``` motoko
func isGreater(order : Order) : Bool
```

Check if an order is \#greater.

## equal

``` motoko
func equal(o1 : Order, o2 : Order) : Bool
```

Returns true if only if `o1` and `o2` are the same ordering.
