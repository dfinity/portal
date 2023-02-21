# Updating motoko content

cd portal/
git submodule update --init # if necessary
cd submodules/motoko
git checkout 0.7.6 #or whatever new tag you desire
cd ../..
git add submodule/motoko # add the change to the submodule

Now replace static/moc-interpreter-0.7.3.js with static/moc_interpreter-0.7.6.js, downloaded from motoko release page. It would be better if this wasn't checked in, but, for now, it is.

Finally, edit static/load_moc.ts to use the correct version of the interpreter and base libs.

git add -u
git commit -m "updating motoko doc"
git push

