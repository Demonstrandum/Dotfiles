#!/bin/sh

FILE="$1"
REGEX="$2"
TO="$3"

GLOBAL=""
[ "$4" = "global" ] && GLOBAL="g"


sed -E "s/$REGEX/$TO/$GLOBAL" "$FILE" \
	> "$FILE.tmp.bkp" \
	&& cp "$FILE.tmp.bkp" "$FILE"
