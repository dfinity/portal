set -v

if [ -z "$MOTOKO_BASE" ]
then
  echo "\$MOTOKO_BASE not set. Are you running this in a nix-shell?"
  exit 1
fi

for file in count-v*.mo
do
  echo "compiling $file" ...
  moc --package base "$MOTOKO_BASE" --stable-types $file
  moc --package base "$MOTOKO_BASE" --idl $file
done

didc=/home/crusso/.cargo/bin/didc

$didc check count-v1.did count-v0.did && echo "ok"
$didc check count-v2.did count-v1.did && echo "ok"
$didc check count-v3.did count-v2.did && echo "ok"
$didc check count-v4.did count-v2.did && echo "ok"


moc --stable-compatible count-v0.most count-v1.most && echo "ok"
moc --stable-compatible count-v1.most count-v2.most && echo "ok"
moc --stable-compatible count-v2.most count-v3.most || echo "noway"
moc --stable-compatible count-v2.most count-v4.most && echo "ok"
