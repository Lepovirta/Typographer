#!/bin/sh

cat fonts.txt | sed "s/^/\'/; s/$/\',/;" > fonts.js
