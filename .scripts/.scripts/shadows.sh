#!/bin/sh

PICOM_CONF="$HOME/.config/picom.conf"

SHADOW_ON="$(sed -n "s/^shadow\s*=\s*\(.*\);/\1/p" "$PICOM_CONF")"

[ "$SHADOW_ON" = false ] \
	&& SHADOW_ON=true \
	|| SHADOW_ON=false

query-replace.sh "$PICOM_CONF" \
	'^(shadow\s*=\s*).*$' \
	"\\1$SHADOW_ON;"

