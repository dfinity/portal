# 01 - Comments

Motoko allows you to write comments in your code.

Here’s a simple comment:

```motoko
// Hello, world!
```

In Motoko, comments must start with two slashes and continue until the end of the
line. For comments that extend beyond a single line, you’ll need to include
`//` on each line, like this:

```motoko
// Hello, world! I have a lot to say, so much that it will take multiple
// lines of text. Therefore, I will start each line with // to denote it
// as part of a multi-line comment.
```

Comments can also be placed at the end of lines containing code:

```motoko
func add(x : Nat, y :  Nat) : Nat {
  x + y // here we are adding two values together
};

add(2,3);
```

Comments may also be indented:

```motoko
func multiply(x : Nat, y : Nat) : Nat {
  // here we are multiplying x by y
  x * y
};

multiply(2, 3);
```
