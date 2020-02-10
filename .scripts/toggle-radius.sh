#!/bin/sh

BRC="bspc config border_radius"
BORDER_RADIUS="$(sys-conf get border_radius)"
RADIUS="$BORDER_RADIUS"
[ -z "$RADIUS" ] && RADIUS=20 # Sensible...

if [ "$BORDER_RADIUS" = "$($BRC)" ]; then
    $BRC 0
else
    $BRC $RADIUS
fi
