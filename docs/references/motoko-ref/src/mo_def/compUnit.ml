open Mo_types

open Syntax


(* Compilation unit detection *)

let is_actor_def e =
  let open Source in
  match e.it with
  | AwaitE { it = AsyncE (_, {it = ObjBlockE ({ it = Type.Actor; _}, _fields); _ }) ; _  } -> true
  | _ -> false

let as_actor_def e =
  let open Source in
  match e.it with
  | AwaitE { it = AsyncE (_, {it = ObjBlockE ({ it = Type.Actor; _}, fields); note; at }) ; _  } ->
    fields, note, at
  | _ -> assert false

(* Happens after parsing, before type checking *)
let comp_unit_of_prog as_lib (prog : prog) : comp_unit =
  let open Source in
  let f = prog.note in

  let finish imports u =
    { it = { imports = List.rev imports; body = u }; note = f; at = no_region } in
  let prog_typ_note = { empty_typ_note with note_typ = Type.unit } in

  let rec go imports ds : comp_unit =
    match ds with
    (* imports *)
    | {it = LetD (p, ({it = ImportE (url, ri); _} as e)); _} :: ds' ->
      let i : import = { it = (p, url, ri); note = e.note.note_typ; at = e.at } in
      go (i :: imports) ds'

    (* terminal expressions *)
    | [{it = ExpD ({it = ObjBlockE ({it = Type.Module; _}, fields); _} as e); _}] when as_lib ->
      finish imports { it = ModuleU (None, fields); note = e.note; at = e.at }
    | [{it = ExpD e; _} ] when is_actor_def e ->
      let fields, note, at = as_actor_def e in
      finish imports { it = ActorU (None, fields); note; at }
    | [{it = ClassD (sp, tid, tbs, p, typ_ann, {it = Type.Actor;_}, self_id, fields); _} as d] ->
      assert (List.length tbs > 0);
      finish imports { it = ActorClassU (sp, tid, tbs, p, typ_ann, self_id, fields); note = d.note; at = d.at }
    (* let-bound terminal expressions *)
    | [{it = LetD ({it = VarP i1; _}, ({it = ObjBlockE ({it = Type.Module; _}, fields); _} as e)); _}] when as_lib ->
      finish imports { it = ModuleU (Some i1, fields); note = e.note; at = e.at }
    | [{it = LetD ({it = VarP i1; _}, e); _}] when is_actor_def e ->
      let fields, note, at = as_actor_def e in
      finish imports { it = ActorU (Some i1, fields); note; at }

    (* Everything else is a program *)
    | ds' ->
      if as_lib
      then
        (* Deprecated syntax, see Typing.check_lib *)
        let fs = List.map (fun d -> {vis = Public None @@ no_region; dec = d; stab = None} @@ d.at) ds' in
        finish imports {it = ModuleU (None, fs); at = no_region; note = empty_typ_note}
      else finish imports { it = ProgU ds; note = prog_typ_note; at = no_region }
  in
  go [] prog.it


(* Lib as decs *)
let obj_decs obj_sort at note id_opt fields =
  let open Source in
  match id_opt with
  | None -> [
    { it = ExpD {
        it = ObjBlockE ( { it = obj_sort; at; note = () }, fields);
        at;
        note };
      at; note }]
  | Some id -> [
    { it = LetD (
        { it = VarP id; at; note = note.note_typ },
        { it = ObjBlockE ({ it = obj_sort; at; note = () }, fields);
          at; note; });
      at; note
    };
    { it = ExpD { it = VarE id; at; note };
      at; note }
    ]

(* To enable uniform definedness checking, typechecking and interpretation,
   present the unit as a list of declarations.
*)
let decs_of_lib (cu : comp_unit) =
  let open Source in
  let { imports; body = cub; _ } = cu.it in
  let import_decs = List.map (fun { it = (pat, fp, ri); at; note} ->
    { it = LetD (
      pat,
      { it = ImportE (fp, ri);
        at;
        note = { note_typ = note; note_eff = Type.Triv} });
      at;
      note = { note_typ = note; note_eff = Type.Triv } }) imports
  in
  import_decs,
  match cub.it with
  | ModuleU (id_opt, fields) ->
    obj_decs Type.Module cub.at cub.note id_opt fields
  | ActorClassU (csp, i, tbs, p, t, i', efs) ->
    [{ it = ClassD (csp, i, tbs, p, t, { it = Type.Actor; at = no_region; note = ()}, i', efs);
       at = cub.at;
       note = cub.note;}];
  | ProgU _
  | ActorU _ ->
    assert false

(* a hack to support compiling multiple files *)
let combine_progs (progs : prog list) : prog =
  let open Source in
  if progs = []
  then
    { it = [];
      at = no_region;
      note = { filename = "empty"; trivia = Trivia.empty_triv_table }
    }
  else
    { it = List.concat_map (fun p -> p.it) progs;
      at = (Lib.List.last progs).at;
      note = (Lib.List.last progs).note
    }
