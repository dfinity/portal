# Updating Motoko content

```
cd portal/
git submodule update --init # if necessary
cd submodules/motoko
git checkout 0.14.1 #or whatever new tag you desire
cd ../..
git add submodules/motoko # add the change to the submodule
```
Replace `static/moc-interpreter-0.14.0.js` with `static/moc_interpreter-0.14.1.js` downloaded from the Motoko release page.

Edit `static/load_moc.ts` to use the correct version of the interpreter and base libs.

When a new version of `moc` is shipped with `dfx`, update the `README.md` and `/docs/building-apps/getting-started/install` pages to reflect the new `moc` and `dfx` versions.

```
git add -u
git commit -m "chore: updating moc version shipped with dfx"
git push
```
