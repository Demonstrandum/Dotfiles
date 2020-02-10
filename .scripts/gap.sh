#!/bin/sh

GAP_C="bspc config window_gap"
GAP="$($GAP_C)"

$GAP_C $(( $GAP + $1 ))
