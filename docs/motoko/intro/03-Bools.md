# 03 - Booleans

A [Bool](/motoko/main/base/Bool.md) can be either `true` or `false`.

Motoko defines a handful of operators that work with Bools.

## Logical operator `and`
```motoko
false and false // => false
```
```motoko
false and true  // => false
```
```motoko
true and false  // => false
```
```motoko
true and true   // => true
```

## Logical operator `or`
```motoko
false or false // => false
```
```motoko
false or true  // => true
```
```motoko
true or false  // => true
```
```motoko
true or true   // => true
```

## Logical operator `not`
Motoko supports negation of Bools either the `not` operator.

```motoko
not true  // => false
```

```motoko
not false // => true
```


## Evaluation strategy

`and` and `or` are _short circuiting_, meaning they don't evaluate the right
hand side if they don't have to.

`and` evaluates the right hand side if the left hand side is `true`.

`or` evaluates the right hand side if the left hand side is `false`.

## Bool variables
You need to use type [Bool](/motoko/main/base/Bool.md) to declare boolean variables:
```motoko
let amILying : Bool = true;
let canIBeTrusted = false;

let shouldYouHireMe = not amILying and canIBeTrusted;
shouldYouHireMe

```
