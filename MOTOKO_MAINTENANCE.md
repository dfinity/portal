# Updating Motoko content

```
cd portal/
git submodule update --init # if necessary
cd submodules/motoko
git checkout 0.14.1 #or whatever new tag you desire
cd ../..
git add submodules/motoko # add the change to the submodule
```

Update the `.github/workflows/check_submodule.yml` file to reflect the latest version's commit hash.

Replace `static/moc-interpreter-0.14.0.js` with `static/moc_interpreter-0.14.1.js` downloaded from the Motoko release page.

Edit `static/load_moc.ts` to use the correct version of the interpreter and base libs.

```
git add -u
git commit -m "chore: updating moc version shipped with dfx"
git push
```
