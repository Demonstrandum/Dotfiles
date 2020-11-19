#!/bin/sh

GAP_C="bspc config window_gap"
GAP="$($GAP_C)"

GAP_NEW="$(( $GAP + $1 ))"
$GAP_C "$GAP_NEW"
sys-conf set gaps "$GAP_NEW"
