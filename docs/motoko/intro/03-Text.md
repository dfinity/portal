# 03 - Text and strings

In Motoko strings (type name is `Text`) can be written as text surrounded by double quotes.

```motoko
"Hello, Motoko!"
```
<!-- 
It can span multiple lines.

```motoko
"Hello
Motoko!"
``` -->

Under the hood strings are [UTF-8](https://en.wikipedia.org/wiki/UTF-8) encoded binaries
and can contain any valid unicode.

```motoko
import Debug "mo:base/Debug";
Debug.print("👩‍💻 こんにちは Motoko 💫");
```

## Concatenation

The concatenation operator `#` can be used to join strings together.

```motoko
let x = "Joe";
"Hello, " # x # "!"
// "Hello, Joe!"
```

## Escape Sequences

Motoko supports common string escape sequences. Here's all of them:

| Sequence | Result          |
| -------- | --------------- |
| `\n`     | Newline         |
| `\r`     | Carriage Return |
| `\t`     | Tab             |
| `\"`     | Double Quote    |
| `\\`     | Backslash       |

For example to include a double quote (`"`) character in a string literal it
must be escaped by placing a backslash (`\`) character before it.

Here are a few examples of using escape sequences:

```motoko
import Debug "mo:base/Debug";
Debug.print("Here is a double quote -> \" <-");
```

Similarly all backslash characters must be escaped:

```motoko
import Debug "mo:base/Debug";
// A Windows filepath C:\Users\Motoko
Debug.print("C:\\Users\\Motoko");

// A Decorative border /\/\/\/\
Debug.print("/\\/\\/\\/\\");
```

## Common methods

Strings are represented by the class Text that has a few useful methods.

You can get the size of the string by calling method `size()`:
```motoko
let myString : Text = "Hello, Motoko!";
myString.size()
```

`Text.chars()` returns an iterator that you can use to loop over the string's characters:
```motoko
import Debug "mo:base/Debug";
import Char "mo:base/Char";

let myString : Text = "Hello, Motoko!";
for (char in myString.chars()) {
    Debug.print(Char.toText(char));
}
```

String could be compared to each other using `==` operator:
```motoko
import Debug "mo:base/Debug";

let A = "A";
let B = "B";
let X = "A";

if (A == B) {
    Debug.print("A and B are the same!")
} else {
    Debug.print("A and B are different!")
};

if (A == X) {
    Debug.print("A and X are the same!")
} else {
    Debug.print("A and X are different!")
};
```