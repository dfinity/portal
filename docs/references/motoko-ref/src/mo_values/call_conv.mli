(* Calling convention *)
open Mo_types

type call_conv = {
  sort: Type.func_sort;
  control : Type.control;
  n_args : int;
  n_res : int;
}
type t = call_conv

val local_cc : int -> int -> call_conv
val message_cc : Type.shared_sort -> int -> call_conv
val async_cc : Type.shared_sort -> int -> int -> call_conv
val replies_cc : Type.shared_sort -> int -> int -> call_conv

val call_conv_of_typ : Type.typ -> call_conv

val string_of_call_conv : call_conv -> string
