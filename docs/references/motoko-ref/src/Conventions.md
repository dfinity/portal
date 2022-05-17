Lexical:

* Lines: 80 characters, nix newlines, no trailing spaces.

* Indentation: 2 spaces, no tabs.

* Spaces: before arguments, around operators, `:` and `=`, after comma and semicolon.


Language:

* Naming: OCaml conventions, lower snake_case for values and types, upper CamlCase for constructors, modules and module types.

* Exceptions: only for hard failures, prefer options otherwise.

* Impossible cases: use `assert false`.

* Modules: interface files, except for modules with only transparent or trivial definitions.

* Open: use sparsely, prefer module abbreviations.


Compilation:

* Warnings: there shall be none.
