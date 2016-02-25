#!/bin/sh
# Generate JS object containing a list of fonts from a text file.

font_source=fonts.txt
font_dest=fonts.js

if [ ! -f "$font_source" ]; then
  echo "Font source file (${font_source}) not found!"
  exit 1
fi

# Add the object.
printf "var Typographer = {\n  fontList: [\n" > "$font_dest"

# Add fonts and remove the last ',' char.
sed "s/^/    \'/; s/$/\',/;" "$font_source" >> "$font_dest"
sed -i "$ s/.$//" "$font_dest"

# Close the list and object.
printf "  ]\n};\n" >> "$font_dest"

echo "${font_dest} generated successfully."
