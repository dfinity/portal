(*
This module implements the staticity check, needed for modules and imported
files.

The guiding principle is: Static expressions are expressions that can be
compiled to values without evaluation.

There is some mushiness around let-expressions and variables, which do form
some kind of beta-reduction, and can actually cause loops, but are required to
allow re-exporting names in modules.
*)

open Mo_def

open Source
open Syntax

let err m at =
  let open Diag in
  add_msg m
    (error_message
       at
       "M0014"
       "type"
       "non-static expression in library or module")

let pat_err m at =
  let open Diag in
  add_msg m
    (error_message
       at
       "M0015"
       "type"
       "only trivial patterns allowed in static expressions")

let rec exp m e = match e.it with
  (* Plain values *)
  | (PrimE _ | LitE _ | ActorUrlE _ | FuncE _) -> ()
  | (TagE (_, exp1) | OptE exp1) -> exp m exp1
  | TupE es -> List.iter (exp m) es
  | ArrayE (mut, es) ->
    begin
      match mut.it with
      | Const ->  List.iter (exp m) es
      | Var -> err m e.at
    end
  | ObjBlockE (_, dfs) -> dec_fields m dfs
  | ObjE efs -> exp_fields m efs

  (* Variable access. Dangerous, due to loops. *)
  | (VarE _ | ImportE _) -> ()

  (* Projections. These are a form of evaluation. *)
  | ProjE (exp1, _)
  | DotE (exp1, _) -> exp m exp1
  | IdxE (exp1, exp2) -> err m e.at

  (* Transparent *)
  | AnnotE (exp1, _) | IgnoreE exp1   | DoOptE exp1 -> exp m exp1
  | BlockE ds -> List.iter (dec m) ds

  (* Clearly non-static *)
  | UnE _
  | ShowE _
  | NotE _
  | AssertE _
  | LabelE _
  | BreakE _
  | RetE _
  | AsyncE _
  | AwaitE _
  | LoopE _
  | BinE _
  | RelE _
  | AssignE _
  | CallE _
  | AndE _
  | OrE _
  | WhileE _
  | ForE _
  | DebugE _
  | IfE _
  | SwitchE _
  | ThrowE _
  | TryE _
  | BangE _
  -> err m e.at

and dec_fields m dfs = List.iter (fun df -> dec m df.it.dec) dfs

and exp_fields m efs = List.iter (fun (ef : exp_field) -> exp m ef.it.exp) efs

and dec m d = match d.it with
  | TypD _ | ClassD _ -> ()
  | ExpD e -> exp m e
  | LetD (p, e) -> pat m p; exp m e
  | VarD _ -> err m d.at

and pat m p = match p.it with
  | (WildP | VarP _) -> ()

  (*
  If we allow projections above, then we should allow irrefutable
  patterns here.
  *)
  | TupP ps -> List.iter (pat m) ps
  | ObjP fs -> List.iter (fun (f : pat_field) -> pat m f.it.pat) fs

  (* TODO:
    claudio: what about singleton variant patterns? These are irrefutable too.
    Andreas suggests simply allowing all patterns: "The worst that can happen is that the program
    is immediately terminated, but that doesn't break anything semantically."
  *)

  (* Everything else is forbidden *)
  | _ -> pat_err m p.at

let prog p =
  Diag.with_message_store (fun m -> List.iter (dec m) p.it; Some ())
