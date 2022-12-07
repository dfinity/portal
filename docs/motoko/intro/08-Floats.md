# 08 - Floats

Floats are numbers that have a decimal point. 

## Literals
```motoko
1.5 // 1.5 : Float
```
```motoko
2.0 // 2 : Float
```
You can also create Float literals by specifying the type directly:
```motoko
2 : Float // 2 : Float
```

Floats are stores in special format that save the data with a certain precision. So, the value of the literal could be different from the input value.
```motoko
-0.1 // -0.100_000_000_000_000_01 : Float 
     // The value is VERY close to -0.1 
     // but NOT exactly the same
```

Underscores can also be added to Floats for clarity.

```motoko
1_000_000.0 // One million
```

Floats support scientific exponential format:
```motoko
-0.3e+15 // -300_000_000_000_000 : Float
```

Floats also support hex format with binary exponential format is also supported. You will need to use `0x` prefix to tell the compiler that you are using hex format. The exponential prefix here is `p` instead of `e` to choose base 2 intead of 10.
```motoko
-0xFp+10 // = 16 * 2^10 = -15_360 : Float
```

## Operators
Floats support arithmetic operators.

```motoko
1.0 + 1.4 // => 2.399_999_999_999_999_9 : Float
```
```motoko
5.0 - 1.5 // => 3.5 : Float
```
```motoko
5.0 / 2.0 // => 2.5 : Float
```
```motoko
3.0 * 3.1 // => 9.300_000_000_000_000_7 : Float
```

Floats support comparison.
```motoko
2.0 > 1.0  // => true
```
```motoko
2.0 < 1.0  // => false
```
```motoko
2.0 >= 1.0 // => true
```
```motoko
2.0 <= 1.0 // => false
```

