#!/bin/bash

[ -z "$OUTPUT" ] && OUTPUT="eDP1"
echo "Setting mode for $OUTPUT."

modes="$(cvt 1500 1000 \
	| tail -n 1 \
	| sed 's/\(.*\)Modeline\s*//')"
mode="${modes%%\"\ *}"
mode="${mode#\"}"

echo "new mode: ($modes)"
echo "mode name: '$mode'"

if xrandr -d :0 | grep -q "$mode"; then
	echo "Mode $mode, already exists."
	current="$(xrandr | grep \* | cut -d' ' -f4)"
	if [ "$current" = "\"$mode\"" ]; then
		echo "You're already in this mode."
		echo "Reverting to default resolution."
		xrandr --output "$OUTPUT" --auto  # Back to default.
	else
		echo "Setting you to the mode."
		xrandr --output "$OUTPUT" --mode "\"$mode\""
	fi
	exit 0
fi

set -x
sudo xrandr --newmode $modes
sudo xrandr --addmode "$OUTPUT" "\"$mode\""
xrandr --output "$OUTPUT" --mode "\"$mode\""
set +x
