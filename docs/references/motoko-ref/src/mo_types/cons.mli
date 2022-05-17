(* Generative constructors *)

type 'a t

val fresh : string -> 'a -> 'a t
val clone: 'a t -> 'a -> 'a t

val name : 'a t -> string

val to_string : bool -> string -> 'a t -> string

val kind : 'a t -> 'a
val unsafe_set_kind : 'a t -> 'a -> unit (* cf. Type.set_kind *)

val eq : 'a t -> 'a t -> bool
val compare : 'a t -> 'a t -> int
