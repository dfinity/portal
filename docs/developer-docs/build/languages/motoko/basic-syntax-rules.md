One key feature of the {platform} is the Motoko programming language. The Motoko programming language is a high-level, general purpose language that is similar to other modern programming languages, but specifically designed to handle asynchronous messaging efficiently.

Although Motoko provides an interpreter that can be used interactively and a standalone compiler, you can write programs and compile your code without using either one directly. Instead, in most cases, you interact with the programming language indirectly through an editor of your choice and using the `dfx` command-line execution tool.

To help you get started using this new language, this section provides a brief overview of the language and describes a few basic conventions for writing programs using Motoko. For more complete information about programming in Motoko, including specific language features and detailed examples, see the *Language Reference Guide*.

# Actors and asynchronous messaging {#_actors_and_asynchronous_messaging}

As you start to explore the Motoko programming language, you should keep in mind that each application consists of an **actor** that communicates with other actors by passing messages asynchronously.

An actor is a special kind of object that passes its messages in an isolated state. When you define an actor, its messages are processed in sequence but in isolation from on each other. As an example of using actors, consider the following program:

``` bash
let result1 = await service1.computeAnswer(params);
let result2 = await service2.computeAnswer(params);
finalStep(result1, result2)
```

In this example, the program makes two requests to two distinct services. Each service is implemented internally as an actor (object). The program waits using the `await` keyword to wait for each result value in sequence. The program then uses the result from each request them in the final step, calling the function `finalStep`.

The actor-based programming model is particularly well-suited for writing programs intended to run on the {platform}. However, you can also write programs in Motoko to run on other platforms and inside of other frameworks. If you are writing programs to run on other platforms, you might not use actor objects or asynchronous messaging at all.

# Interface descriptions and Motoko {#_interface_descriptions_and_proglang}

To support multiple languages and cross-language communication, the Motoko compiler automates the production and consumption of interface descriptions. The Motoko compiler generates the interface descriptions using the type signatures in your Motoko programs and the structure of imported pre-defined interfaces.

# Prelude and standard library functions {#_prelude_and_standard_library_functions}

Like other languages, Motoko includes many common functions in predefined prelude and standard library files that you can import into your programs. By importing the prelude or standard library, you can use common functions like `println` without explicitly defining them in your programs.

For example, you might include a line similar to the following to import list functions from the standard library:

``` bash
import List "../../motoko/base/list";
```

# Basic language features {#_basic_language_features}

This section describes the basic language conventions you need to know for programming in Motoko.

## Comments {#_comments}

You can use single-line, multi-line, or nested multi-line comments to include descriptive non-executable text in your code. For example, use comments to add context about a code block as a note to yourself or as information you want to share with anyone reviewing or maintaining your code. Properly-formatted comments are treated as whitespace and ignored by the compiler.

### Single-line comments {#_single_line_comments}

Single-line comments begin with two forward-slashes (//) and consist of the characters following `//` to the end of the same line. For example, you can have single-line comments above, below, or on the same line as the code to which the comment applies.

``` bash
// This is a single-line comment on its own line above relevant code
import List = "ListLib";
```

### Multi-line and nested comments {#_multi_line_and_nested_comments}

You can also include single-line, multi-line, and nested multi-line comments by starting with a forward-slash followed by an asterisk (/\*) and ending with an asterisk followed by a forward-slash (\*/). For example:
