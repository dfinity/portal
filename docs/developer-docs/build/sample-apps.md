# Sample code, applications, and microservices

May 2020 (Alpha) :proglang: Motoko :IC: Internet Computer :company-id: DFINITY

Sample code, applications, and microservices that have been developed by DFINITY or contributed by the community are available from the [DFINITY public repository](https://github.com/dfinity/examples).

By accessing the public repository, you can directly download, clone, fork, or share sample projects. You will also be able to contribute by suggesting updates or reporting issues for the published projects using the standard GitHub work flow.

Sample projects provide a way for you to experiment and collaborate with other developers. The projects and sample code are not, however, intended to be used as commercial applications and do not provide any explicit or implied support or warranty of any kind.

This section provides a preliminary look at some sample code for applications and microservices that you can copy and modify to jump-start your own projects.

## C

For examples of projects written in the C programming language for the IC, see [C++ sample projects](https://github.com/dfinity/examples/tree/master/c).

-   [Adventure game](https://github.com/dfinity/examples/tree/master/c/adventure)

-   [QR code generator](https://github.com/dfinity/examples/tree/master/c/qr)

-   [Reverse game](https://github.com/dfinity/examples/tree/master/c/reverse)

## Motoko

For projects that use the Motoko programming language, see [Motoko sample projects](https://github.com/dfinity/examples/tree/master/motoko).

-   [Calculator - simple functions](https://github.com/dfinity/examples/tree/master/motoko/calc)

-   [Counter](https://github.com/dfinity/examples/tree/master/motoko/counter)

-   [Echo](https://github.com/dfinity/examples/tree/master/motoko/echo)

-   [Factorial](https://github.com/dfinity/examples/tree/master/motoko/factorial)

-   [Hello, world](https://github.com/dfinity/examples/tree/master/motoko/hello-world)

-   [Hello, cycles](https://github.com/dfinity/examples/tree/master/motoko/hello_cycles)

-   [Game of Life - upgrades](https://github.com/dfinity/examples/tree/master/motoko/life)

-   [Phone book](https://github.com/dfinity/examples/tree/master/motoko/phone-book)

-   [Publish/subscribe](https://github.com/dfinity/examples/tree/master/motoko/pub-sub)

-   [Quicksort](https://github.com/dfinity/examples/tree/master/motoko/quicksort)

-   [Random maze - cryptographic randomness](https://github.com/dfinity/examples/tree/master/motoko/random_maze)

-   [To-do checklist](https://github.com/dfinity/examples/tree/master/motoko/simple-to-do)

-   [Superheroes database](https://github.com/dfinity/examples/tree/master/motoko/superheroes)

-   [whoami](https://github.com/dfinity/examples/tree/master/motoko/whoami)

## Additional sample applications

This section includes sample code from projects that are not currently available in the public repository.

### Hex encoding and decoding

The `mo-hex` project implements hexadecimal encoding and decoding routines for the Motoko programming language.

#### Source code

The project includes the [hex.mo](../_attachments/hex.mo) source code.

### Polynomial long-division in GF(256)

This program performs polynomial long division for a Galois field GF(256) element.

#### Source code

In addition to standard libraries, this project uses two main Motoko source code files.

-   The [Galois.mo](../_attachments/Galois.mo) file contains the core programming logic.

-   The [Nat.mo](../_attachments/Nat.mo) file contains additional functions that are imported for use in the `Galois.mo` file.

##### Galois.mo

    <Galois />

##### Nat.mo

    <Nat />
