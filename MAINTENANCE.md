# Updating Motoko content

```
cd portal/
git submodule update --init # if necessary
cd submodules/motoko
git checkout 0.14.1 #or whatever new tag you desire
cd ../..
git add submodules/motoko # add the change to the submodule
```
Now replace static/moc-interpreter-0.14.0.js with static/moc_interpreter-0.14.1.js, downloaded from motoko release page. It would be better if this wasn't checked in, but, for now, it is.

Edit `static/load_moc.ts` to use the correct version of the interpreter and base libs.

Finally, edit `docs/motoko/version.md` to report the current version of Motoko.
```
git add -u
git commit -m "chore: updating motoko doc"
git push
```
