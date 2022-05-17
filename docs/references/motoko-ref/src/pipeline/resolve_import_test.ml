(** Given a list of filenames that should be reported as existing
   tests what a given import path resolves to *)
let import_relative_test_case files import expected =
  let actual =
    Resolve_import.append_extension (fun x -> List.mem x files) import in
  String.equal actual expected ||
    (Printf.printf "\nExpected: %s\nActual:   %s\n" expected actual;
     false)

let%test "it resolves a relative file import" =
  import_relative_test_case ["list.mo"] "list" "list.mo"

let%test "it resolves a relative file import for a file with an extension" =
  import_relative_test_case ["list.mo.mo"] "list.mo" "list.mo.mo"

let%test "it resolves a relative directory import" =
  import_relative_test_case ["list.mo"] "list/" "list/lib.mo"

let%test "it resolves to a relative directory import if no .mo file is found" =
  import_relative_test_case [] "list" "list/lib.mo"

let%test "it succeeds on a relative import with an extension" =
  import_relative_test_case [] "list.mo" "list.mo/lib.mo"
