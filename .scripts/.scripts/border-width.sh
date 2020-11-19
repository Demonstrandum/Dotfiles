#!/bin/sh

BW="$(sys-conf get border_width)"

[ -z "$BW" ] && BW=2

bspc config  border_width "$(( $BW + $1 ))"
sys-conf set border_width  "$(( $BW + $1 ))"

