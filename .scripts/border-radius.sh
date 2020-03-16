#!/bin/sh

BR="$(sys-conf get border_radius)"

[ -z "$BR" ] && BR=17

bspc config  border_radius "$(( $BR + $1 ))"
sys-conf set border_radius "$(( $BR + $1 ))"

