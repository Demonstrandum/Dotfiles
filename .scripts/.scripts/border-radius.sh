#!/bin/sh

BR="$(sys-conf get border_radius)"
BR="$(( BR + $1 ))"

[ -z "$BR" ] && BR=17

bspc config  border_radius "$BR"
PICOM_CONF="$HOME/.config/picom.conf"

query-replace.sh "$PICOM_CONF" \
	'^(corner-radius\s*=\s*).*$' \
	"\\1$BR;"

sys-conf set border_radius "$BR"

