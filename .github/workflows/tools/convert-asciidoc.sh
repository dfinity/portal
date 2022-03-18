#!/bin/bash

set -e

for f in $(find $1 -name '*.adoc'); do 
  asciidoctor -b docbook -a leveloffset=+1 -o - "$f" | \
  pandoc -t markdown_strict --wrap=none -f docbook - > "${f%.adoc}.md"
done

find $1 -name "*.adoc" -type f -delete
